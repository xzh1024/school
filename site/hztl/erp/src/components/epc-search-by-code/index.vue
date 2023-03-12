<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { Fragment } from "vue-fragment";
import hotkeys from "hotkeys-js";
import {
  BasicPartByCode,
  PartVehModel,
  getAuaVehModelsPartByCodes,
  getBasicPartByCodes
} from "@/api/epc";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { EPC_SEARCH_BY_CODE_DIALOG_BRAND_TABLE } from "./constants";
import VehModelSelectBox from "./components/VehModelSelectBox.vue";
import { TableColumn } from "@/constants/interface";

export enum controlsEnum {
  view,
  useData,
  vueModel
}

interface Props {
  visible: boolean;
  code: string;
  partId?: number;
  controls: number[];
  isAuaVeh?: boolean;
  useOutType?: boolean;
  type?: 0 | 1;
  disInternalHotKeys?: boolean;
}

interface Event {
  onSelectedChange(row: BasicPartByCode): void;
  onVisibleChange(visible: boolean): void;
}

const tabs = [
  { id: 0, name: "原厂件" },
  { id: 1, name: "品牌件" }
];

let lastKeyscope: symbol | string;
const topHotkeys = new TopHotkeys();

@Component({
  components: {
    VehModelSelectBox
  }
})
export default class EpcSearchByCode extends tsc.Component<Props, Event> {
  @Prop() readonly visible!: boolean;
  @Prop() readonly code!: string;
  @Prop() readonly partId!: number;
  @Prop() readonly controls!: number[];
  @Prop() readonly isAuaVeh!: boolean;
  @Prop(Boolean) readonly useOutType?: boolean;
  @Prop() readonly type?: 0 | 1;
  @Prop() disInternalHotKeys!: boolean;

  private activeType: 0 | 1 = 0;
  private totalData: BasicPartByCode[] = [];
  private selectedRows: BasicPartByCode[] = [];
  private columns: TableColumn<BasicPartByCode>[] = [];
  private get tableData() {
    return this.totalData.filter(item => item.brand.includes(this.activeBrand));
  }

  private get brandList() {
    const brandList = Array.from(
      new Set(this.totalData.map(item => item.brand))
    );
    return brandList;
  }

  private activeBrand = "";

  private loading = false;
  private vehModleSelectBoxVisible = false;
  private vehModleData: PartVehModel[] = [];

  @Watch("brandList")
  onBrandListChange() {
    this.activeBrand = "";
  }

  @Watch("visible", { immediate: true })
  onVisibleChange(newVal: boolean, oldVal: boolean) {
    if (newVal) {
      this.loadData();
    } else {
      this.activeBrand = "";
      this.totalData = [];
    }
    if (!this.disInternalHotKeys) {
      if (newVal) {
        this.loadData();
        lastKeyscope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el as HTMLElement);
      } else if (oldVal) {
        this.activeBrand = "";
        this.totalData = [];
        topHotkeys.unbindHotkeys(this.$el as HTMLElement);
        hotkeys.setScope(lastKeyscope);
      }
    }
  }
  loadData() {
    this.loading = true;
    const promise = this.isAuaVeh
      ? getAuaVehModelsPartByCodes({
          oeCode: this.code,
          type: this.activeType,
          signCheckedByPartId: this.partId
        })
      : getBasicPartByCodes({
          code: this.code,
          type: this.activeType
        });
    promise
      .then(res => {
        this.activeBrand = "";
        this.totalData = res || [];
      })
      .catch(() => {
        this.activeBrand = "";
        this.totalData = [];
      })
      .finally(() => {
        this.loading = false;
      });
  }
  private toggleActiveBrand(brand: string) {
    this.activeBrand = brand;
  }
  private changeVisible(visible: boolean) {
    this.$emit("update:visible", visible);
    this.$emit("visibleChange", visible);
  }
  private showVehModleSelectBox(row: BasicPartByCode) {
    this.vehModleData = row.vehModels || row.avaVehModels;
    this.vehModleSelectBoxVisible = true;
  }
  private formateCloumns() {
    this.columns = EPC_SEARCH_BY_CODE_DIALOG_BRAND_TABLE.columns.map(item => {
      const showVehModleSelectBox = (row: BasicPartByCode, e: MouseEvent) => {
        e?.stopPropagation();
        this.showVehModleSelectBox(row);
      };
      const sendCurData = (row: BasicPartByCode, e: MouseEvent) => {
        const vehModels = row.vehModels || row.avaVehModels;
        e?.stopPropagation();
        this.$emit("selectedChange", {
          ...row,
          avaVehModel: vehModels
            .map(item => `${item.facBrand} ${item.vehGroup} ${item.modeYear}`)
            .join("/")
        });
        this.changeVisible(false);
      };
      if (item.type === "controls") {
        const column: TableColumn<BasicPartByCode> = {
          ...item,
          width: (item.width as number) * this.controls.length,
          render: (value, row) => (
            <Fragment>
              {this.controls.includes(controlsEnum.useData) ? (
                <el-tooltip
                  placement="top"
                  content="使用此数据"
                  enterable={false}
                >
                  <span
                    class="icon operation-icon icon-apply-info"
                    on-click={(e: MouseEvent) => sendCurData(row, e)}
                  ></span>
                </el-tooltip>
              ) : null}
              {this.controls.includes(controlsEnum.vueModel) ? (
                <el-tooltip
                  placement="top"
                  content="查看适用车型"
                  enterable={false}
                >
                  <span
                    class="icon operation-icon icon-vehmodel-info"
                    on-click={(e: MouseEvent) => sendCurData(row, e)}
                  ></span>
                </el-tooltip>
              ) : null}
              {this.controls.includes(controlsEnum.view) &&
              this.activeType === 0 ? (
                <el-tooltip
                  placement="top"
                  content="查看装配图"
                  enterable={false}
                >
                  <span
                    class="icon operation-icon icon-dwg-info"
                    on-click={(e: MouseEvent) => showVehModleSelectBox(row, e)}
                  ></span>
                </el-tooltip>
              ) : null}
            </Fragment>
          )
        };
        return column;
      }
      return item;
    });
  }
  mounted() {
    if (this.useOutType) {
      this.activeType = this.type!;
    }
    this.formateCloumns();
  }
  render() {
    return (
      <Fragment>
        <ht-dialog
          visible={this.visible}
          width="1200px"
          top="7vh"
          on={{ "update:visible": this.changeVisible }}
          title={`EPC查询「配件编码：${this.code}」`}
          append-to-body
          class="ignore-top-hotkeys"
        >
          <div class="dialog-container flex-container column-flex">
            {!this.useOutType ? (
              <ht-tabs
                v-model={this.activeType}
                tabs={tabs}
                onChange={this.loadData}
              />
            ) : null}
            <div
              v-loading={this.loading}
              class="auto-block flex-container column-flex"
            >
              <div class="brand-container">
                <div
                  onClick={() => this.toggleActiveBrand("")}
                  class={`brand-content ${!this.activeBrand ? "active" : ""}`}
                >
                  全部
                </div>
                {this.brandList.map(item => (
                  <div
                    onClick={() => this.toggleActiveBrand(item)}
                    class={`brand-content ${
                      this.activeBrand === item ? "active" : ""
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <ht-setting-table
                data={this.tableData}
                columns={this.columns}
                tableName={`${
                  EPC_SEARCH_BY_CODE_DIALOG_BRAND_TABLE.name
                }${this.controls.toString()}`}
                selectedRows={this.selectedRows}
                class="auto-block"
              />
            </div>
          </div>
        </ht-dialog>
        <veh-model-select-box
          visible={this.vehModleSelectBoxVisible}
          on={{
            "update:visible": (val: boolean) =>
              (this.vehModleSelectBoxVisible = val)
          }}
          tableData={this.vehModleData}
        />
      </Fragment>
    );
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.dialog-container {
  height: 80vh;
}

.btn {
  cursor: pointer;
}
.brand-container {
  flex: none;
  margin-bottom: 10px;
  padding-right: 10px;
  width: 100%;

  .brand-content {
    display: inline-block;
    margin: 10px 0 0 10px;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    color: $color-text-regular;
    background: #f9f9f9;
    border: solid 1px rgba(222, 225, 231, 1);
    border-radius: 4px;
    cursor: pointer;
    &.active {
      color: $color-primary;
      @include font_color("color-primary");
      background: rgba(0, 155, 242, 0.156862745098039);
      border: solid 1px $color-primary;
      @include border_color("color-primary");
    }
  }
}
</style>
