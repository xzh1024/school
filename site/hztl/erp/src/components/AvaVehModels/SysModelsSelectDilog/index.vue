<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import {
  BaseModelData,
  SysAvaVehModelMingJueRes,
  SysAvaVehModelBeiMaiRes,
  addAvaVehModelsToPart,
  DataSource
} from "@/api/parts/partsModels";
import SysModelsSearch from "./SysModelsSearch/index.vue";
import { SearchSysFormMingJueData } from "./SysModelsSearch/MingJue";
import { SearchSysFormBeiMaiData } from "./SysModelsSearch/BeiMai";
import SysModelsTable, {
  SysSearchMingJueParams,
  SysSearchBeiMaiParams,
  SysSearchCodeParams
} from "./SysModelsTable/index.vue";
import SysModelsCodeSearch from "./SysModelsCodeSearch.vue";

interface Props {
  partId: number;
  visible: boolean;
  dataSource: DataSource;
  isMingJue: boolean;
  isBeiMai: boolean;
  customCodes: string[];
}

interface Event {
  onVisibleChange(visible: boolean): void;
}

const TABS = [
  { id: "custom", name: "自定义查询" },
  { id: "customCode", name: "图号查询" }
];

@Component
export default class SysModelsSelectDilog extends tsc.Component<Props, Event> {
  public $refs!: {
    sysModelsTableCode: SysModelsTable;
    sysModelsTable: SysModelsTable;
  };

  @Prop() readonly partId!: number;
  @Prop() readonly dataSource!: DataSource;
  @Prop() readonly isMingJue!: boolean;
  @Prop() readonly isBeiMai!: boolean;
  @Prop() readonly customCodes!: string[];
  @Prop() readonly visible!: boolean;

  changeVisible(newVal: boolean) {
    if (this.isBeiMai) {
      this.activeTab = TABS[0].id;
    }
    this.customCode = "";
    this.searchCodeParams = null;
    this.searchParams = null;
    this.$emit("visibleChange", newVal);
  }

  private loading = false;
  private activeTab: number | string | symbol = TABS[0].id;
  @Watch("activeTab")
  private onActiveTabChange() {
    if (this.activeTab === TABS[1].id && !this.searchCodeParams) {
      this.searchCodeParams = {
        signCheckedByPartId: this.partId,
        customCode: this.customCode
      };
    }
  }

  private searchCodeParams: SysSearchCodeParams | null = null;
  private customCode = "";
  private searchCodeChange(customCode: string) {
    if (customCode) {
      this.customCode = customCode;
    }
    if (this.activeTab === TABS[1].id) {
      this.searchCodeParams = {
        signCheckedByPartId: this.partId,
        customCode: this.customCode
      };
    }
  }

  private selectedRows: (SysAvaVehModelMingJueRes &
    SysAvaVehModelBeiMaiRes)[] = [];
  private searchParams:
    | SysSearchMingJueParams
    | SysSearchBeiMaiParams
    | null = null;
  private searchChange(
    data: SearchSysFormMingJueData | SearchSysFormBeiMaiData
  ) {
    this.searchParams = { signCheckedByPartId: this.partId, ...data };
  }

  private submit() {
    this.addSysModelsToPart(
      this.selectedRows.map(item => ({
        vehBrand: item.vehBrand,
        facBrand: item.facBrand,
        vehicleGroup: item.vehicleGroup,
        year: item.year,
        displacement: item.displacement,
        engine: item.engine,
        transmission: item.transmission,
        driverType: item.driverType,
        chassisNo: item.chassisNo,
        salesModel: item.salesModel
      }))
    ).then((res: boolean) => {
      if (res) {
        this.$message({
          type: "success",
          message: "添加车型成功！",
          showClose: true
        });
        if (this.isBeiMai && this.activeTab === TABS[1].id) {
          this.$refs.sysModelsTableCode?.loadData();
        } else {
          this.$refs.sysModelsTable?.loadData();
        }
      }
    });
  }

  // private tableData: (SysAvaVehModelMingJueRes &
  //   SysAvaVehModelBeiMaiRes)[] = [];
  // private handleTableDataChange(
  //   tableData: (SysAvaVehModelMingJueRes & SysAvaVehModelBeiMaiRes)[]
  // ) {
  //   this.tableData = tableData;
  // }

  private addSysModelsToPart(rows: BaseModelData[]) {
    return addAvaVehModelsToPart({
      partId: this.partId,
      dataSource: this.dataSource,
      items: rows.map(rows => ({
        ...rows,
        type: 2
      }))
    })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  // private addAllSysAvaVehModelsToPart() {
  //   // 调用接口
  // }

  render() {
    return (
      <ht-dialog
        class="sys-models"
        title="系统标准车型选择"
        width="1300px"
        top="7vh"
        visible={this.visible}
        append-to-body
        on-close={() => this.changeVisible(false)}
      >
        <div class="edit-container flex-container column-flex">
          {this.isBeiMai && (
            <ht-tabs
              v-model={this.activeTab}
              tabs={TABS}
              class="tabs-regular flex-block-bg"
              style="margin: 5px 0 0 0;"
            />
          )}

          {this.isBeiMai && (
            <el-row
              v-show={this.activeTab === TABS[1].id}
              gutter={5}
              class="auto-block flex-container flex-block-margin"
              style="margin-left: 2.5px; margin-right: 2.5px;"
            >
              <el-col span={4}>
                <div
                  class="ht-page-title page-title-divider flex-block-bg"
                  style="margin-bottom: 0;"
                >
                  配件图号
                </div>
                <SysModelsCodeSearch
                  class="flex-block-bg"
                  style="height: calc(100% - 31px);"
                  loading={this.loading}
                  visible={this.visible}
                  customCodes={this.customCodes}
                  onChange={this.searchCodeChange}
                />
              </el-col>
              <el-col span={20} class="flex-container column-flex">
                <div class="auto-block flex-container column-flex">
                  <div
                    class="ht-page-title page-title-divider flex-block-bg"
                    style="margin-bottom: 0;"
                  >
                    配件图号适用车型
                  </div>
                  <SysModelsTable
                    ref="sysModelsTableCode"
                    class="auto-block"
                    v-model={this.selectedRows}
                    dataSource={this.dataSource}
                    isMingJue={this.isMingJue}
                    isBeiMai={this.isBeiMai}
                    params={this.searchCodeParams!}
                  />
                </div>
              </el-col>
            </el-row>
          )}

          <SysModelsSearch
            v-show={this.isMingJue || this.activeTab === TABS[0].id}
            class="flex-block-bg flex-block-margin flex-block-padding"
            style="margin-top: 5px;"
            loading={this.loading}
            visible={this.visible}
            isMingJue={this.isMingJue}
            isBeiMai={this.isBeiMai}
            onChange={this.searchChange}
          />
          <div
            v-show={this.isMingJue || this.activeTab === TABS[0].id}
            class="auto-block flex-container column-flex flex-block-margin"
          >
            <SysModelsTable
              ref="sysModelsTable"
              v-model={this.selectedRows}
              dataSource={this.dataSource}
              isMingJue={this.isMingJue}
              isBeiMai={this.isBeiMai}
              params={this.searchParams!}
            />
          </div>

          <div class="dialog-footer-align flex-block-bg flex-block-padding flex-block-margin">
            <el-button
              ref="confirm"
              type="primary"
              plain
              size="mini"
              disabled={!this.selectedRows.length}
              on-click={() => this.submit()}
            >
              添加选中车型（F3）
            </el-button>
            <el-button
              ref="confirm"
              type="primary"
              plain
              size="mini"
              on-click={() => this.changeVisible(false)}
            >
              取消（Esc）
            </el-button>
          </div>
        </div>
      </ht-dialog>
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
.sys-models {
  &::v-deep .el-dialog__body {
    background-color: #e7ebed;
    padding: 0;
  }
  .edit-container {
    height: 80vh;
  }
}
</style>
