<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import SearchMixin from "@/mixins/searchMixin";
import Summaries from "@/mixins/summaries";
import { CELL_WIDTH } from "@/constants";
import { divide, multiply } from "@/utils/numberAPI";
import { getStorageStocksByBatch } from "@/api/base/search";
import { searchAllocOutWarehouses } from "@/api/base/base";
import {
  TransferBillItem,
  TransferBillPartItem
} from "@/views/transfer/interface";
import BatchSetWarehouseBox from "./BatchSetWarehouseBox.vue";
import HeaderText from "../HeaderText.vue";
import BoxSearchForm from "../BoxSearchForm.vue";
import {
  APPLY_DETAL_TABLE_TRANSFERBOX,
  APPLY_DETAL_TABLE_TOTAL_FILES,
  BoxSearchFormData
} from "../constants";
import transferService from "../transferService";

export interface TableItem extends TransferBillPartItem {
  dynaQty?: number;
  lackQty?: number;
  curTransferQty?: number;
  curTransferPrice?: number;
  curTransferAmount?: number;
  hasStockWarehouseIds?: number[];
  enoughWarehouseIds?: number[];
  warehouseIds?: number[];
}
export interface Warehouse {
  id: number;
  name: string;
}

const TOTAL_FILES = [...APPLY_DETAL_TABLE_TOTAL_FILES];
TOTAL_FILES.push({ file: "curTransferQty", type: "qty" });
const defaultSearchData: BoxSearchFormData = {
  code: "",
  name: "",
  brand: "",
  categoryName: "",
  productionPlace: "",
  vehModel: "",
  onlyWaitAlloc: true,
  lackStatus: [0, 1]
};
const curTransferQtyRules = {
  curTransferQty: {
    required: true,
    message: "请输入本次转调拨出库数量",
    trigger: "change"
  }
};
const warehouseRules = {
  warehouseIds: {
    required: true,
    message: "请选择出库仓库",
    trigger: "change"
  }
};

@Component({
  components: {
    HeaderText,
    BoxSearchForm,
    BatchSetWarehouseBox
  }
})
export default class TransferBox extends Mixins(SearchMixin, Summaries) {
  @Prop() readonly visible!: boolean;
  @Prop() readonly headerData!: TransferBillItem;
  @Prop() readonly totalData!: TableItem[];

  protected transferService = transferService;
  private loading = false;
  private searchParams: BoxSearchFormData = { ...defaultSearchData };
  private isAllSelected = false;
  private relTotalData: TableItem[] = [];
  private totalTableData: TableItem[] = [];
  private tableName = `${APPLY_DETAL_TABLE_TRANSFERBOX.name}TransferBox`;
  private tableData: TableItem[] = [];
  private selectedRows: TableItem[] = [];
  private total = 0;
  private page = 1;
  private batchSetWarehouseBoxVisible = false;

  protected get pageSize() {
    return (this.$store && this.$store.state.admin.table.pageSize) || 20;
  }
  private get relVisible() {
    return this.visible;
  }
  private set relVisible(val: boolean) {
    this.$emit("update:visible", val);
  }
  private get canBatchHandle() {
    return this.isAllSelected || this.selectedRows.length;
  }
  private get tableColumns() {
    const multipleColumn = {
      prop: "multiple",
      label: "选择",
      type: "multiple",
      width: CELL_WIDTH.multiple,
      cantExport: true
    };
    const curTransferQtyColumn = {
      label: "本次转调拨出库数量",
      prop: "curTransferQty",
      width: 130
    };
    const outWarehouseColumn = {
      label: "出库仓库",
      prop: "warehouseIds",
      width: 240
    };
    // const curTransferPriceColumn = {
    //   label: "单价",
    //   prop: "curTransferPrice",
    //   width: 130
    // };
    // const curTransferAmoutColumn = {
    //   label: "本次转调拨出库金额",
    //   prop: "curTransferAmount",
    //   width: 130
    // };
    const dynaQtyColumn = {
      label: "库存动态数量",
      prop: "dynaQty",
      width: CELL_WIDTH.qty,
      type: "number"
    };
    const lackQtyColumn = {
      label: "本次转单缺货数量",
      prop: "lackQty",
      width: 120,
      type: "number"
    };

    const columns = [...APPLY_DETAL_TABLE_TRANSFERBOX.columns];
    columns.splice(1, 1, multipleColumn);
    columns.splice(
      14,
      0,
      curTransferQtyColumn,
      outWarehouseColumn,
      //curTransferPriceColumn,
      //curTransferAmoutColumn,
      dynaQtyColumn,
      lackQtyColumn
    );

    return columns.map((item: any) => {
      if (item.prop === "curTransferQty") {
        return {
          ...item,
          render: (value: number, row: TableItem) => (
            <div on-click={(e: MouseEvent) => e.stopPropagation()}>
              <el-form
                attrs={{
                  model: row,
                  rules: curTransferQtyRules,
                  "show-message": false
                }}
                disabled={!this.selectable(row)}
                size="mini"
                label-width="0"
                class="form-item-small-margin-bottom"
              >
                <el-form-item prop="curTransferQty">
                  <ht-format-number
                    v-model={row.curTransferQty}
                    min={0}
                    max={Number(row.onTransQty || 0)}
                    precision-type="qty"
                    on-blur={() => this.handleCurTransferQtyBlur(row)}
                    on-change={(qty: number) =>
                      this.handleCurTransferQtyChange(qty, row)
                    }
                  />
                </el-form-item>
              </el-form>
            </div>
          )
        };
      }
      if (item.prop === "warehouseIds") {
        return {
          ...item,
          render: (value: number[], row: TableItem) => (
            <div on-click={(e: MouseEvent) => e.stopPropagation()}>
              <el-form
                attrs={{
                  model: row,
                  rules: warehouseRules,
                  "show-message": false
                }}
                disabled={!this.selectable(row)}
                size="mini"
                label-width="0"
                class="form-item-small-margin-bottom"
              >
                <el-form-item prop="warehouseIds">
                  <ht-select
                    v-model={row.warehouseIds}
                    options={this.allocOutWarehouses}
                    collapse-tags
                    filterable
                    multiple
                    has-selecte-all-val
                    placeholder="请选择"
                    on-visible-change={(isAppear: boolean) =>
                      this.handleWarehouseIdsBlur(isAppear, row.warehouseIds)
                    }
                  />
                </el-form-item>
              </el-form>
            </div>
          )
        };
      }
      // if (item.prop === "curTransferPrice") {
      //   return {
      //     ...item,
      //     render: (value: number, row: TableItem) => (
      //       <div on-click={(e: MouseEvent) => e.stopPropagation()}>
      //         <el-form
      //           attrs={{
      //             model: row,
      //             rules: curTransferPriceRules,
      //             "show-message": false
      //           }}
      //           disabled={!this.selectable(row)}
      //           size="mini"
      //           label-width="0"
      //           class="form-item-small-margin-bottom"
      //         >
      //           <el-form-item prop="curTransferPrice">
      //             <ht-format-number
      //               v-model={row.curTransferPrice}
      //               min={0}
      //               precision-type="price"
      //               on-change={(price: number) =>
      //                 this.handleCurTransferPriceChange(price, row)
      //               }
      //             />
      //           </el-form-item>
      //         </el-form>
      //       </div>
      //     )
      //   };
      // }
      // if (item.prop === "curTransferAmount") {
      //   return {
      //     ...item,
      //     render: (value: number, row: TableItem) => (
      //       <div on-click={(e: MouseEvent) => e.stopPropagation()}>
      //         <el-form
      //           attrs={{
      //             model: row,
      //             rules: curTransferAmountRules,
      //             "show-message": false
      //           }}
      //           disabled={!this.selectable(row)}
      //           size="mini"
      //           label-width="0"
      //           class="form-item-small-margin-bottom"
      //         >
      //           <el-form-item prop="curTransferAmount">
      //             <ht-format-number
      //               v-model={row.curTransferAmount}
      //               min={0}
      //               precision-type="money"
      //               on-change={(amount: number) =>
      //                 this.handleCurTransferAmountChange(amount, row)
      //               }
      //             />
      //           </el-form-item>
      //         </el-form>
      //       </div>
      //     )
      //   };
      // }
      delete item.attrs;
      return item;
    });
  }

  private allocOutWarehouses: Warehouse[] = [];
  @Watch("visible")
  private async onVisibleChange(val: boolean) {
    if (val) {
      this.searchParams = { ...defaultSearchData };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await searchAllocOutWarehouses({
        name: "",
        companyId: this.headerData.outCompanyId,
        businessCompanyId: this.headerData.inCompanyId
      });
      this.allocOutWarehouses = res || [];
      const totalData = this.totalData.map(item => {
        const warehouseIds = this.allocOutWarehouses.map(
          (warehouse: Warehouse) => warehouse.id
        );
        return {
          ...item,
          curTransferQty: Number(item.onTransQty || 0),
          warehouseIds: item.outWarehouseId
            ? warehouseIds.filter(
                warehouseId => warehouseId === item.outWarehouseId
              )
            : warehouseIds
        };
      });
      this.initData(totalData).finally(() => {
        this.$nextTick(() => {
          this.filterData(this.searchParams);
        });
      });
    }
  }

  private selectable(row: TableItem) {
    return Number(row.onTransQty || 0) > 0;
  }

  private initData(totalData: TableItem[]) {
    this.loading = true;
    const details = totalData.map(item => ({
      detailId: item.id,
      property: item.property,
      needQty: item.curTransferQty,
      warehouseIds: item.warehouseIds,
      partId: item.part.partId,
      outWarehouseId: item.outWarehouseId
    }));
    return getStorageStocksByBatch({
      isAlloc: true,
      excludeSrcCompanyId: this.headerData.relatedCompanyId,
      details
    })
      .then(res => {
        this.relTotalData = totalData.map(item => ({
          ...item,
          ...res[item.id]
        }));
      })
      .catch(() => {
        this.relTotalData = [...totalData];
      })
      .finally(() => {
        this.loading = false;
      });
  }
  private handleSearchFormChange(params?: BoxSearchFormData) {
    this.filterData(params);
    this.isAllSelected = true;
    this.page = 1;
    this.setTableData();
    this.setSelectedRos();
  }
  private filterData(params?: BoxSearchFormData) {
    let totalTableData = [];
    if (params) {
      this.searchParams = { ...params };
      const paramsKeys = Object.keys(params);
      totalTableData = this.relTotalData.filter((item: TableItem) => {
        return paramsKeys.every(key => {
          if (key === "onlyWaitAlloc") {
            return params[key] ? Number(item.onTransQty || 0) > 0 : true;
          } else if (key === "lackStatus") {
            if (params[key]?.includes(0) && params[key]?.includes(1)) {
              return true;
            } else if (params[key]?.includes(0)) {
              return Number(item.lackQty || 0) === 0;
            } else if (params[key]?.includes(1)) {
              return Number(item.lackQty || 0) > 0;
            } else {
              return true;
            }
          } else if (key === "categoryName") {
            return (item[key] || "").indexOf(params[key]) > -1;
          } else if (key === "vehModel") {
            return params[key]
              ? (item.part.vehModel || "").indexOf(params[key]) > -1 ||
                  (item.part.avaVehModel || "").indexOf(params[key]) > -1
              : true;
          } else {
            return params[key]
              ? (item.part[key] || "").indexOf(params[key]) > -1
              : true;
          }
        });
      });
    } else {
      totalTableData = [...this.relTotalData];
    }
    this.totalTableData = totalTableData.map(item => ({
      ...item,
      curTransferPrice: Number(item.maxAllocPrice || 0),
      curTransferAmount: this.precisionFormat(
        multiply(Number(item.maxAllocPrice || 0), Number(item.onTransQty || 0)),
        "money"
      ),
      warehouseIds: item.enoughWarehouseIds ? [...item.enoughWarehouseIds] : []
    }));
    this.isAllSelected = true;
    this.page = 1;
    this.setTableData();
    this.setSelectedRos();
  }
  private setTableData() {
    this.total = this.totalTableData.length;
    this.tableData = this.totalTableData.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
  }
  private setSelectedRos() {
    this.selectedRows = this.tableData.filter(item => this.selectable(item));
  }
  private pageChange(page: number) {
    this.page = page;
    this.setTableData();
    this.setSelectedRos();
  }

  private setTotalTableData(selectedRows: TableItem[]) {
    this.loading = true;
    const details = selectedRows.map(item => ({
      detailId: item.id,
      property: item.property,
      needQty: item.curTransferQty,
      warehouseIds: item.warehouseIds,
      partId: item.part.partId,
      outWarehouseId: item.outWarehouseId
    }));
    return getStorageStocksByBatch({
      isAlloc: true,
      excludeSrcCompanyId: this.headerData.relatedCompanyId,
      details
    })
      .then(res => {
        const obj = {};
        selectedRows.forEach(item => {
          obj[item.id] = {
            ...item,
            ...res[item.id]
          };
        });
        this.totalTableData = this.totalTableData.map(item => {
          if (obj[item.id]) {
            return {
              ...obj[item.id],
              warehouseIds: obj[item.id].enoughWarehouseIds
                ? [...obj[item.id].enoughWarehouseIds]
                : []
            };
          } else {
            return { ...item };
          }
        });
      })
      .finally(() => {
        this.loading = false;
      });
  }
  private handleCurTransferQtyBlur(row: TableItem) {
    const ids = this.selectedRows.map(item => item.id);
    if (Number(row.curTransferQty || 0) > 0) {
      this.selectedRows = this.tableData.filter(
        item => ids.includes(item.id) || item.id === row.id
      );
    } else {
      this.selectedRows = this.tableData.filter(
        item => ids.includes(item.id) && item.id !== row.id
      );
    }
    this.setTotalTableData(this.selectedRows).then(() => {
      this.$nextTick(() => {
        this.setTableData();
        const laterIds = this.selectedRows.map(item => item.id);
        this.selectedRows = this.tableData.filter(item =>
          laterIds.includes(item.id)
        );
      });
    });
  }
  private handleWarehouseIdsBlur(isAppear: boolean, warehouseIds?: number[]) {
    if (isAppear) {
      return;
    }
    if (warehouseIds && warehouseIds.length) {
      this.setTotalTableData(this.selectedRows).then(() => {
        this.$nextTick(() => {
          this.setTableData();
          const ids = this.selectedRows.map(item => item.id);
          this.selectedRows = this.tableData.filter(item =>
            ids.includes(item.id)
          );
        });
      });
    }
  }
  private handleCurTransferQtyChange(qty: number, row: TableItem) {
    row.curTransferAmount = this.precisionFormat(
      multiply(Number(qty || 0), Number(row.curTransferPrice || 0)),
      "money"
    );
    row.amount2Price = false;
  }
  private handleCurTransferPriceChange(price: number, row: TableItem) {
    row.curTransferAmount = this.precisionFormat(
      multiply(Number(price || 0), Number(row.curTransferQty || 0)),
      "money"
    );
    row.amount2Price = false;
  }
  private handleCurTransferAmountChange(amount: number, row: TableItem) {
    if (Number(row.curTransferQty || 0)) {
      row.curTransferPrice = this.precisionFormat(
        divide(Number(amount || 0), Number(row.curTransferQty)),
        "money"
      );
    } else {
      row.curTransferPrice = 0;
    }
    row.amount2Price = true;
  }

  private handleIsAllSelectedChange() {
    this.selectedRows = this.tableData.filter(item => this.selectable(item));
  }
  private inverseHandle(e?: MouseEvent) {
    if (e) {
      e.stopPropagation();
    }
    if (!this.totalTableData.length) {
      return;
    }
    if (this.isAllSelected) {
      this.isAllSelected = false;
      this.selectedRows = [];
    } else {
      const ids = this.selectedRows.map(item => item.id);
      this.selectedRows = this.tableData.filter(
        item => this.selectable(item) && !ids.includes(item.id)
      );
    }
  }

  private batchSetWarehouseHandle(e?: MouseEvent) {
    if (e) {
      e.stopPropagation();
    }
    if (!this.canBatchHandle) {
      return;
    }
    this.batchSetWarehouseBoxVisible = true;
  }
  handleBatchSetWarehouseSure(data: { warehouseIds: number[] }) {
    const ids = this.selectedRows.map(item => item.id);
    this.totalTableData = this.totalTableData.map(item => {
      if (this.isAllSelected || ids.includes(item.id)) {
        return {
          ...item,
          warehouseIds: data.warehouseIds
        };
      } else {
        return { ...item };
      }
    });
    this.setTableData();
    let selectedRows = [];
    if (this.isAllSelected) {
      selectedRows = this.totalTableData;
    } else {
      selectedRows = this.tableData.filter(item => ids.includes(item.id));
    }
    this.setTotalTableData(selectedRows).then(() => {
      this.$nextTick(() => {
        this.setTableData();
        this.selectedRows = this.tableData.filter(item =>
          ids.includes(item.id)
        );
      });
    });
  }
  private transferPartsHandle(e?: MouseEvent) {
    if (e) {
      e.stopPropagation();
    }
    if (!this.canBatchHandle) {
      return;
    }

    let selectedRows = [...this.selectedRows];
    if (this.isAllSelected) {
      const obj = {};
      this.tableData.forEach(item => {
        obj[item.id] = { ...item };
      });
      this.totalTableData = this.totalTableData.map(item => {
        if (obj[item.id]) {
          return { ...obj[item.id] };
        } else {
          return { ...item };
        }
      });
      selectedRows = [...this.totalTableData];
    }
    const useRows = selectedRows.filter(item => this.selectable(item));
    if (!this.validateUseRows(useRows)) {
      return;
    }

    this.loading = true;
    const details = {};
    useRows.forEach((item: TableItem) => {
      details[item.id] = {
        qty: item.curTransferQty,
        // price: item.curTransferPrice,
        // amount: item.curTransferAmount,
        amount2Price: item.amount2Price,
        warehouseIds: item.warehouseIds
      };
    });

    this.transferService
      .transBill(this.headerData.id, details)
      .then(res => {
        this.loading = false;
        this.$emit("success");
        this.cancelHandle();
        const msg = `成功生成调拨出库单，单据号【${res.billNo}】是否打开？`;
        this.$confirm(msg, { type: "success" })
          .then(() => {
            this.$router.push({
              path: "./outDetail",
              query: {
                billId: res.id.toString(),
                time: new Date().getTime().toString()
              }
            });
          })
          .catch(() => {});
      })
      .catch(() => {
        this.loading = false;
      });
  }
  private validateUseRows(useRows: TableItem[]) {
    let flag = true;

    if (
      useRows.some(
        item => this.selectable(item) && !Number(item.curTransferQty || 0)
      )
    ) {
      this.$message.warning({
        message: curTransferQtyRules.curTransferQty.message,
        showClose: true
      });
      flag = false;
    }
    if (
      flag &&
      useRows.some(item => this.selectable(item) && !item.warehouseIds?.length)
    ) {
      this.$message.warning({
        message: warehouseRules.warehouseIds.message,
        showClose: true
      });
      flag = false;
    }
    return flag;
  }
  private cancelHandle(e?: MouseEvent) {
    if (e) {
      e.stopPropagation();
    }
    this.relVisible = false;
  }

  render() {
    return (
      <ht-dialog
        visible={this.relVisible}
        on={{
          "update:visible": (val: boolean) => (this.relVisible = val)
        }}
        append-to-body
        title="转调拨出库单"
        width="1320px"
        top="50px"
        class="dialog-body"
      >
        <div class="container-box" v-loading={this.loading}>
          <ht-card title="单据信息">
            <header-text headerData={this.headerData} />
          </ht-card>
          <ht-card title="配件明细" style="margin-top: 5px;">
            <box-search-form
              onSearch={this.handleSearchFormChange}
              defaultFormData={defaultSearchData}
              isTransfer={true}
            />
          </ht-card>
          <ht-card style="margin-top: -15px;">
            <ht-setting-table
              tableName={this.tableName}
              columns={this.tableColumns}
              data={this.tableData}
              selectable={this.selectable}
              selectedRows={this.selectedRows}
              on={{
                "update:selectedRows": (val: TableItem[]) =>
                  (this.selectedRows = val)
              }}
              pagination
              total={this.total}
              current-page={this.page}
              onPageChange={this.pageChange}
              selection-type="multiple"
              show-summary
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              summary-method={(params: any) =>
                this.getSummariesByCalculate(params, TOTAL_FILES)
              }
              style="height: 335px;"
            />
            <div style="margin: -31px 0 0 5px;">
              <el-button
                type="primary"
                size="mini"
                onClick={(e: MouseEvent) => this.inverseHandle(e)}
              >
                反选
              </el-button>
              <el-checkbox
                disabled={!this.totalTableData.length}
                v-model={this.isAllSelected}
                style="margin-left: 20px;"
                onChange={this.handleIsAllSelectedChange}
              >
                全选当前查询结果
              </el-checkbox>
            </div>
            <div style="margin-top: 10px;">
              <el-button
                disabled={!this.canBatchHandle}
                type="primary"
                size="mini"
                onClick={(e: MouseEvent) => this.batchSetWarehouseHandle(e)}
              >
                选中配件设置出库仓库
              </el-button>
            </div>
          </ht-card>
          <div style="margin: 10px 0 5px 0; text-align: center;">
            <el-button
              disabled={!this.canBatchHandle}
              type="primary"
              size="mini"
              onClick={(e: MouseEvent) => this.transferPartsHandle(e)}
            >
              选中配件转调拨出库单
            </el-button>
            <el-button
              type="primary"
              size="mini"
              onClick={(e: MouseEvent) => this.cancelHandle(e)}
            >
              取消（Esc）
            </el-button>
          </div>
        </div>

        <batch-set-warehouse-box
          visible={this.batchSetWarehouseBoxVisible}
          on={{
            "update:visible": (val: boolean) =>
              (this.batchSetWarehouseBoxVisible = val)
          }}
          onSure={this.handleBatchSetWarehouseSure}
          allocOutWarehouses={this.allocOutWarehouses}
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
