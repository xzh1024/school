<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import SearchMixin from "@/mixins/searchMixin";
import { loadSearchPosition } from "@/api/store/stocks";
import { ALL_SPACE_REG_EXP, QUICK_ADD_POSITION_LEN } from "@/constants";
import quickGetPositions from "@/utils/quickGetPositions";
import BatchSetWarehouseBox from "./BatchSetWarehouseBox.vue";
import {
  BatchSetWarehouse,
  EditWarehouseItem,
  Position,
  STORAGE_EDIT_WAREHOUSE_TABLE
} from "./constants";
import { EditBillPart, TransferBillPartItem } from "../../interface";
import transferService from "../transferService";

const warehouseRules = {
  warehouseId: {
    required: true,
    message: "请选择到货仓库",
    trigger: "change"
  }
};
interface TableDataItem extends EditWarehouseItem {
  id?: number;
  groupId: number;
  warehouseId?: number;
  positionId?: number;
  cachePositionId?: number;
}

@Component({
  components: {
    BatchSetWarehouseBox
  }
})
export default class EditWarehouseBox extends Mixins(SearchMixin) {
  @Prop() readonly visible!: boolean;
  @Prop() readonly details!: TransferBillPartItem[];
  @Prop() readonly companyId!: number;
  @Prop() readonly headerId?: number;
  protected transferService = transferService;
  private tableName = STORAGE_EDIT_WAREHOUSE_TABLE.name;
  private tableData: TableDataItem[] = [];
  private selectedRows: TableDataItem[] = [];
  private columns = STORAGE_EDIT_WAREHOUSE_TABLE.columns;
  private batchSetWarehouseVisible = false;
  private loading = false;

  private get isEasyMode() {
    return this.$store.state?.admin?.systemParams?.params?.manageMode;
  }

  private get tableColumns() {
    return this.columns.map(item => {
      if (item.prop === "warehouseName") {
        return {
          ...item,
          render: (value: string, row: TableDataItem) => (
            <div on-click={(e: MouseEvent) => e.stopPropagation()}>
              <el-form
                attrs={{
                  model: row,
                  rules: warehouseRules,
                  "show-message": false
                }}
                size="mini"
                label-width="0"
                class="form-item-small-margin-bottom"
              >
                <el-form-item prop="warehouseId">
                  <ht-autoselect
                    v-model={row.warehouseId}
                    fetch-suggestions={(query: string) =>
                      this.searchLoadAllWarehouses(
                        query,
                        Number(this.companyId || 0)
                      )
                    }
                    defaultValue={row.warehouseName}
                    remote
                    filter-zero
                    trigger-on-focus={false}
                    highlight-first-item
                    placeholder="请选择"
                    on-change={(warehouseId: number) =>
                      this.handleWarehouseChange(warehouseId, row)
                    }
                  />
                </el-form-item>
              </el-form>
            </div>
          )
        };
      }
      if (item.prop === "positionName") {
        return {
          ...item,
          render: (value: string, row: TableDataItem) => (
            <div on-click={(e: MouseEvent) => e.stopPropagation()}>
              <el-form
                size="mini"
                label-width="0"
                class="form-item-small-margin-bottom"
              >
                <el-form-item>
                  {this.isEasyMode ? (
                    <ht-autoselect
                      v-model={row.positionId}
                      keepInputValue={row.positionName}
                      fetch-suggestions={(query: string) =>
                        this.getPositions(row.warehouseId || 0, query)
                      }
                      defaultValue={row.positionName}
                      remote
                      filter-zero
                      keep-input
                      clearable
                      no-match-text=""
                      trigger-on-focus={false}
                      placeholder="请选择"
                      on-input-change={(positionName: string) =>
                        this.handlePositionNameChange(positionName, row)
                      }
                      on-change={(positionId: number) =>
                        this.handlePositionIdChange(positionId, row)
                      }
                    />
                  ) : (
                    <ht-autoselect
                      v-model={row.positionId}
                      fetch-suggestions={(query: string) =>
                        this.getPositions(row.warehouseId || 0, query)
                      }
                      defaultValue={row.positionName}
                      remote
                      filter-zero
                      clearable
                      trigger-on-focus={false}
                      highlight-first-item
                      placeholder="请选择"
                      on-change={(positionId: number) =>
                        this.handlePositionIdChange(positionId, row)
                      }
                    />
                  )}
                </el-form-item>
              </el-form>
            </div>
          )
        };
      }

      return item;
    });
  }

  @Watch("visible")
  onVisibleChange(val: boolean) {
    if (!val) {
      return;
    }
    if (this.details.length) {
      this.tableData = this.details.map(item => {
        return {
          groupId: item.groupId,
          code: item.part.code,
          name: item.part.name,
          brand: item.part.brand,
          productionPlace: item.part.productionPlace,
          property: item.property,
          qty: item.qty,
          warehouseId: item.warehouseId || undefined,
          warehouseName: item.warehouseName || "",
          positionName: item.positionName || "",
          positionId: item.positionId || undefined,
          cachePositionId: item.positionId || undefined
        };
      });
    } else {
      this.tableData = [];
    }
  }

  async handleWarehouseChange(warehouseId: number, row: TableDataItem) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const positions: any = await this.getPositions(warehouseId);
    if (positions.length) {
      const position = positions.find(
        (item: Position) => item.id === row.cachePositionId
      );
      if (position) {
        row.positionId = position.id;
      } else {
        row.positionId = undefined;
      }
    } else {
      row.positionId = undefined;
    }
  }
  async getPositions(warehouseId: number, query?: string) {
    const positions = await loadSearchPosition({
      name: query,
      warehouseId
    });
    return positions || [];
  }
  handlePositionIdChange(positionId: number, row: TableDataItem) {
    if (!positionId) return;
    row.cachePositionId = positionId;
  }
  handlePositionNameChange(positionName: string, row: TableDataItem) {
    if (positionName) {
      row.positionName = positionName.replace(ALL_SPACE_REG_EXP, "");
    } else {
      row.positionName = "";
    }
  }

  inverseHandle(e?: MouseEvent) {
    e?.stopPropagation();
    const ids = this.selectedRows.map(item => item.groupId);
    this.selectedRows = this.tableData.filter(
      item => !ids.includes(item.groupId)
    );
  }
  batchSetWarehouseHandle(e?: MouseEvent) {
    e?.stopPropagation();
    if (!this.selectedRows.length) {
      return;
    }
    this.batchSetWarehouseVisible = true;
  }
  handleBatchSetWarehouseSure(data: BatchSetWarehouse) {
    const ids = this.selectedRows.map(item => item.groupId);
    this.tableData = this.tableData.map(item => {
      if (ids.includes(item.groupId)) {
        return {
          ...item,
          warehouseId: data.warehouseId,
          warehouseName: data.warehouseName,
          positionId: data.positionId,
          positionName: data.positionName,
          cachePositionId: data.positionId
        };
      } else {
        return { ...item };
      }
    });
    this.selectedRows = this.tableData.filter(item =>
      ids.includes(item.groupId)
    );
  }

  async sureHandle(e?: MouseEvent) {
    e?.stopPropagation();
    if (this.loading || !this.validateTableData()) {
      return;
    }

    this.loading = true;
    let warehouseInfos: EditBillPart[] = this.tableData.map(item => ({
      groupId: item.groupId,
      warehouseId: item.warehouseId,
      positionId: item.positionId
    }));
    if (
      this.isEasyMode &&
      this.tableData.some(item => !item.positionId && item.positionName)
    ) {
      if (
        this.tableData.some(
          item =>
            !item.positionId &&
            item.positionName &&
            item.positionName.length > QUICK_ADD_POSITION_LEN
        )
      ) {
        this.$message.warning({
          message: `货位名称字数需小于等于${QUICK_ADD_POSITION_LEN}`,
          showClose: true
        });
        this.loading = false;
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const positionIds: any = await quickGetPositions(
        this.tableData.map(item => ({
          warehouseId: item.warehouseId || 0,
          name: item.positionName || ""
        }))
      );
      if (!positionIds) {
        this.loading = false;
        return;
      }

      warehouseInfos = warehouseInfos.map((item, index) => ({
        ...item,
        positionId: positionIds[index]
      }));
    }

    this.transferService
      .updateTransferBillpart(warehouseInfos, this.headerId)
      .then(() => {
        this.$emit("edit");
        this.cancelHandle();
      })
      .finally(() => {
        this.loading = false;
      });
  }
  validateTableData() {
    let flag = true;
    if (this.tableData.some(item => !item.warehouseId)) {
      this.$message.warning({
        message: warehouseRules.warehouseId.message,
        showClose: true
      });
      flag = false;
    }
    return flag;
  }
  cancelHandle(e?: MouseEvent) {
    e?.stopPropagation();
    this.closeDialog();
  }

  private closeDialog() {
    this.$emit("close");
  }

  render() {
    return (
      <ht-dialog
        visible={this.visible}
        onClose={this.closeDialog}
        append-to-body
        title="到货仓库设置"
        width="1200px"
        top="50px"
        class="dialog-body"
      >
        <ht-setting-table
          tableName={this.tableName}
          columns={this.tableColumns}
          data={this.tableData}
          selectedRows={this.selectedRows}
          on={{
            "update:selectedRows": (val: TableDataItem[]) =>
              (this.selectedRows = val)
          }}
          selection-type="multiple"
          style="height: 565px;"
        />
        <div style="padding: 5px; background-color: #fbfbfb;">
          <el-button type="primary" size="mini" onClick={this.inverseHandle}>
            反选
          </el-button>
          <el-button
            disabled={!this.selectedRows.length}
            type="primary"
            size="mini"
            onClick={this.batchSetWarehouseHandle}
          >
            批量设置到货仓库
          </el-button>
        </div>
        <div style="margin: 10px 0 5px 0; text-align: center;">
          <el-button
            v-loading={this.loading}
            type="primary"
            size="mini"
            onClick={this.sureHandle}
          >
            确定（F3）
          </el-button>
          <el-button type="primary" size="mini" onClick={this.cancelHandle}>
            取消（Esc）
          </el-button>
        </div>

        <batch-set-warehouse-box
          visible={this.batchSetWarehouseVisible}
          onClose={() => (this.batchSetWarehouseVisible = false)}
          companyId={this.companyId}
          onSure={this.handleBatchSetWarehouseSure}
        />
      </ht-dialog>
    );
  }
}
</script>

<style lang="scss" scoped>
.dialog-body {
  &::v-deep .el-dialog__body {
    padding: 5px;
    background-color: #e7ebed;
  }
}
</style>
