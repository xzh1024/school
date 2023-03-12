<script lang="tsx">
import { Component, Prop } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { Fragment } from "vue-fragment";
import {
  AutoAvaVehModelRes,
  BaseModelData,
  addAvaVehModelsToPart,
  DataSource
} from "@/api/parts/partsModels";
import AutoModelsSearch, {
  SearchAutoModelsFormData
} from "./AutoModelsSearch.vue";
import AutoModelsTable, { AutoModelsSearchParams } from "./AutoModelsTable.vue";
import EditAutoModels, { EditAutoModelData } from "../EditAutoModels/index.vue";

interface Props {
  partId?: number;
  dataSource: DataSource;
  visible: boolean;
}

interface Event {
  onVisibleChange(visible: boolean): void;
}

@Component
export default class AvaVehModelsDialog extends tsc.Component<Props, Event> {
  $refs!: {
    autoModelsTable: AutoModelsTable;
  };
  get autoModelsTableRef() {
    return this.$refs.autoModelsTable;
  }
  @Prop() readonly partId!: number;
  @Prop() readonly dataSource!: DataSource;
  @Prop() readonly visible!: boolean;
  private changeVisible(visible: boolean) {
    this.$emit("visibleChange", visible);
  }
  private editVisible = false;

  private selectedRows: AutoAvaVehModelRes[] = [];
  private searchParams: AutoModelsSearchParams | null = null;
  private loading = false;
  private searchChange(data: SearchAutoModelsFormData) {
    this.searchParams = { signCheckedByPartId: this.partId, ...data };
  }
  private submit() {
    this.addAutoModelsToPart(
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
        this.changeVisible(false);
      }
    });
  }

  private addAutoModelsToPart(rows: BaseModelData[]) {
    this.loading = true;
    return addAvaVehModelsToPart({
      dataSource: this.dataSource,
      partId: this.partId,
      items: rows.map(rows => ({
        ...rows,
        type: 1
      }))
    })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private changeEditVisible(visible: boolean) {
    this.editVisible = visible;
  }

  private createAutoModels(data: EditAutoModelData) {
    this.addAutoModelsToPart([data])
      .then(async () => {
        this.changeEditVisible(false);
        this.autoModelsTableRef?.goFirstPage();
      })
      .catch(() => {});
  }

  render() {
    return (
      <Fragment>
        <ht-dialog
          class="auto-models "
          title="自定义车型选择"
          width="1200px"
          top="7vh"
          visible={this.visible}
          append-to-body
          on-close={() => this.changeVisible(false)}
        >
          <div class="edit-container flex-container column-flex">
            <div class="flex-block-bg flex-block-margin flex-block-padding">
              <el-button
                type="primary"
                size="mini"
                onClick={() => this.changeEditVisible(true)}
              >
                新增自定义车型
              </el-button>
            </div>
            <AutoModelsSearch
              class="flex-block-bg flex-block-margin flex-block-padding"
              loading={this.loading}
              visible={this.visible}
              onChange={this.searchChange}
            />
            <div class="auto-block flex-container detail-container flex-block-margin">
              <AutoModelsTable
                ref="autoModelsTable"
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
                loading={this.loading}
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
        <EditAutoModels
          loading={this.loading}
          visible={this.editVisible}
          onVisibleChange={this.changeEditVisible}
          onConfirm={this.createAutoModels}
        />
      </Fragment>
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
.auto-models {
  &::v-deep .el-dialog__body {
    background-color: #e7ebed;
    padding: 0;
  }
  .edit-container {
    height: 80vh;
  }
}
</style>
