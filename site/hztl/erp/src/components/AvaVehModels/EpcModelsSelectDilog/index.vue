<script lang="tsx">
import { Component, Prop } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { Fragment } from "vue-fragment";
import {
  BaseModelData,
  SysAvaVehModelMingJueRes,
  addAvaVehModelsToPart,
  DataSource
} from "@/api/parts/partsModels";
import { BasicPartByCode } from "@/api/epc";
import { SearchEpcModelsFormData } from "./EpcModelsSearch.vue";
import EpcModelsTable, { EpcModelsSearchParams } from "./EpcModelsTable.vue";

import EpcSearchBycode, {
  controlsEnum
} from "../../epc-search-by-code/index.vue";
interface PartData {
  id: number;
  code: string;
}

interface Props {
  part?: PartData;
  dataSource: DataSource;
  visible: boolean;
}

interface Event {
  onVisibleChange(visible: boolean): void;
}

@Component
export default class EpcModelsSelectDilog extends tsc.Component<Props, Event> {
  $refs!: {
    epcModelsTable: EpcModelsTable;
  };
  get epcModelsTableRef() {
    return this.$refs.epcModelsTable;
  }
  private dataList: SysAvaVehModelMingJueRes[] = [];
  @Prop() readonly part!: PartData;
  @Prop() readonly dataSource!: DataSource;
  @Prop() readonly visible!: boolean;
  changeVisible(visible: boolean) {
    this.$emit("visibleChange", visible);
  }
  private selectedRows: SysAvaVehModelMingJueRes[] = [];
  private searchParams: EpcModelsSearchParams | null = null;
  private loading = false;
  private changeDataList(row: BasicPartByCode) {
    this.dataList = row.avaVehModels as SysAvaVehModelMingJueRes[];
    this.changeModelsVisible(true);
  }

  private modelsVisible = false;
  private changeModelsVisible(visible: boolean) {
    this.modelsVisible = visible;
    if (!visible) {
      this.changeVisible(false);
    }
  }
  private searchChange(data: SearchEpcModelsFormData) {
    this.searchParams = { signCheckedByPartId: this.part?.id, ...data };
  }
  private submit() {
    this.addEpcModelsToPart(
      this.selectedRows.map(item => ({
        vehBrand: item.vehBrand,
        facBrand: item.facBrand,
        vehicleGroup: item.vehicleGroup,
        year: item.year,
        displacement: item.displacement,
        engine: item.engine,
        transmission: item.transmission,
        salesModel: item.salesModel
      }))
    ).then((res: boolean) => {
      if (res) {
        this.changeModelsVisible(false);
      }
    });
  }

  private addEpcModelsToPart(rows: BaseModelData[]) {
    return addAvaVehModelsToPart({
      dataSource: this.dataSource,
      partId: this.part?.id,
      items: rows.map(rows => ({
        ...rows,
        type: 3
      }))
    })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  render() {
    return (
      <Fragment>
        <EpcSearchBycode
          visible={this.visible}
          code={this.part?.code}
          controls={[controlsEnum.vueModel]}
          onSelectedChange={this.changeDataList}
          onVisibleChange={this.changeVisible}
          partId={this.part?.id}
          isAuaVeh
          disInternalHotKeys
        />
        <ht-dialog
          class="epc-models"
          title="EPC适用车型导入"
          width="1200px"
          top="7vh"
          visible={this.modelsVisible}
          append-to-body
          on-close={() => this.changeModelsVisible(false)}
        >
          <div class="edit-container flex-container column-flex">
            {/** <EpcModelsSearch
              class="flex-block-bg flex-block-margin flex-block-padding"
              loading={this.loading}
              visible={this.visible}
              onChange={this.searchChange}
            />*/}
            <div class="auto-block flex-container detail-container flex-block-margin">
              <EpcModelsTable
                ref="epcModelsTable"
                dataList={this.dataList}
                v-model={this.selectedRows}
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
                on-click={() => this.changeModelsVisible(false)}
              >
                取消（Esc）
              </el-button>
            </div>
          </div>
        </ht-dialog>
      </Fragment>
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
.epc-models {
  &::v-deep .el-dialog__body {
    background-color: #e7ebed;
    padding: 0;
  }
  .edit-container {
    height: 80vh;
  }
}
</style>
