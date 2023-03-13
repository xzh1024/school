<script>
import { mapState } from "vuex";
import hotkeys from "hotkeys-js";
import { reduce } from "lodash";
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { searchMixin } from "@/mixins";
import summaries from "@/mixins/summaries";
import { getStorageStocksByBatch } from "@/api/base/search";
import { salesBillTransSale } from "@/api/sales/salesHome/";
import { CELL_WIDTH } from "@/constants";
import HeaderText from "./HeaderText";
import BoxSearchForm from "./BoxSearchForm";
import BatchSetWarehouseBox from "./BatchSetWarehouseBox";
import BatchEditStockLackBox from "./BatchEditStockLackBox";
import {
  TABLE_SALES_ORDER_DETAIL_TABLE,
  SALES_ORDER_DETAIL_TOTAL_FILES
} from "../constants";

let oldKeyScope;
const topHotkeys = new TopHotkeys();
const TOTAL_FILES = [...SALES_ORDER_DETAIL_TOTAL_FILES];
TOTAL_FILES.push({ file: "curTransferQty", type: "qty" });
const LACK_HANDLES = [
  { id: "urgent", name: "急件销售" },
  { id: "terminate", name: "配件取消" },
  { id: "negative", name: "负库存销售" }
];
const defaultSearchData = {
  code: "",
  name: "",
  brand: "",
  categoryName: "",
  property: "",
  productionPlace: "",
  vehModel: "",
  onlyWaitSale: true,
  lackStatus: [0, 1]
};
const curTransferQtyRules = {
  curTransferQty: {
    required: true,
    message: "请输入本次转销售数量",
    trigger: "change"
  }
};
const outWarehouseRules = {
  outWarehouseIds: {
    required: true,
    message: "请选择出库仓库",
    trigger: "change"
  }
};
const wayRules = {
  way: {
    required: true,
    message: "请选择缺货处理",
    trigger: "change"
  }
};
const lackWarehouseRules = {
  lackWarehouseId: {
    required: true,
    message: "请选择缺货处理到货仓库",
    trigger: "change"
  }
};

export default {
  name: "TransferBox",
  components: {
    HeaderText,
    BoxSearchForm,
    AvaVehModels,
    BatchSetWarehouseBox,
    BatchEditStockLackBox
  },
  mixins: [summaries, searchMixin],
  props: {
    visible: Boolean,
    headerData: {
      type: Object,
      required: true
    },
    totalData: {
      type: Array,
      required: true
    },
    mapData: {
      type: Object,
      default() {
        return {};
      }
    },
    companyId: [String, Number]
  },
  data() {
    return {
      loading: false,
      searchParams: { ...defaultSearchData },
      totalTableData: [],
      isAllSelected: false,
      relTotalData: [],
      tableName: `${TABLE_SALES_ORDER_DETAIL_TABLE.name}TransferBox`,
      tableData: [],
      selectedRows: [],
      total: 0,
      page: 1,
      avaVehModelsVisible: false,
      avaVehModelsPart: null,
      batchSetWarehouseBoxVisible: false,
      batchEditStockLackBoxVisible: false,
      outWarehouseIdsOptions: []
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    ...mapState("admin/systemParams", {
      isAllowNegativeStock: state => state.params.negativeStockOut
    }),
    relVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    },
    tableColumns() {
      const multipleColumn = {
        prop: "multiple",
        label: "选择",
        type: "multiple",
        width: CELL_WIDTH.multiple,
        cantExport: true
      };
      const curTransferQtyColumn = {
        label: "本次转销售数量",
        prop: "curTransferQty",
        width: 110,
        render: (value, row) => (
          <div on-click={e => e.stopPropagation()}>
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
                <HtFormatNumber
                  v-model={row.curTransferQty}
                  min={0}
                  precision-type="qty"
                  on-blur={() => this.handleCurTransferQtyBlur(row)}
                />
              </el-form-item>
            </el-form>
          </div>
        )
      };
      const outWarehouseColumn = {
        label: "出库仓库",
        prop: "outWarehouseIds",
        width: 240,
        render: (value, row) => (
          <div on-click={e => e.stopPropagation()}>
            <el-form
              attrs={{
                model: row,
                rules: outWarehouseRules,
                "show-message": false
              }}
              disabled={!this.selectable(row)}
              size="mini"
              label-width="0"
              class="form-item-small-margin-bottom"
            >
              <el-form-item prop="outWarehouseIds">
                <ht-select
                  v-model={row.outWarehouseIds}
                  options={this.outWarehouseIdsOptions}
                  clearable
                  collapse-tags
                  filterable
                  multiple
                  has-selecte-all-val
                  placeholder="请选择"
                  on-visible-change={isAppear =>
                    this.handleOutWarehouseIdsBlur(
                      isAppear,
                      row.outWarehouseIds
                    )
                  }
                />
              </el-form-item>
            </el-form>
          </div>
        )
      };
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
      const lackHandleColumn = {
        label: "缺货处理",
        prop: "way",
        width: 140,
        render: (value, row) => (
          <div on-click={e => e.stopPropagation()}>
            <el-form
              attrs={{
                model: row,
                rules: wayRules,
                "show-message": false
              }}
              disabled={!this.selectable(row)}
              size="mini"
              label-width="0"
              class="form-item-small-margin-bottom"
            >
              <el-form-item prop="way">
                <ht-autoselect
                  disabled={Number(row.lackQty || 0) <= 0}
                  v-model={row.way}
                  options={this.hasPermLackHandles}
                  trigger-on-focus={false}
                  filter-zero
                  highlight-first-item
                  placeholder="请选择"
                />
              </el-form-item>
            </el-form>
          </div>
        )
      };
      const inWarehouseColumn = {
        label: "缺货处理到货仓库",
        prop: "lackWarehouseId",
        width: CELL_WIDTH.warehouseName,
        render: (value, row) => (
          <div on-click={e => e.stopPropagation()}>
            <el-form
              attrs={{
                model: row,
                rules: lackWarehouseRules,
                "show-message": false
              }}
              disabled={!["urgent", "negative"].includes(row.way)}
              size="mini"
              label-width="0"
              class="form-item-small-margin-bottom"
            >
              <el-form-item prop="lackWarehouseId">
                <ht-autoselect
                  v-model={row.lackWarehouseId}
                  fetch-suggestions={query =>
                    this.searchLoadAllWarehouses(
                      query,
                      Number(this.companyId || 0)
                    )
                  }
                  defaultValue={row.lackWarehouseName}
                  on={{
                    "update:defaultValue": val => (row.lackWarehouseName = val)
                  }}
                  trigger-on-focus={false}
                  remote
                  filter-zero
                  highlight-first-item
                  placeholder="请选择"
                />
              </el-form-item>
            </el-form>
          </div>
        )
      };
      const urgentSupplierColumn = {
        label: "急件供应商",
        prop: "urgentSupplierId",
        width: CELL_WIDTH.companyName,
        render: (value, row) => (
          <div on-click={e => e.stopPropagation()}>
            <el-form
              attrs={{ model: row }}
              disabled={row.way !== "urgent"}
              size="mini"
              label-width="0"
              class="form-item-small-margin-bottom"
            >
              <el-form-item prop="urgentSupplierId">
                <ht-autoselect
                  v-model={row.urgentSupplierId}
                  fetch-suggestions={this.searchLoadAllSupplierCooperators}
                  defaultValue={row.urgentSupplierName}
                  on={{
                    "update:defaultValue": val => (row.urgentSupplierName = val)
                  }}
                  trigger-on-focus={false}
                  remote
                  filter-zero
                  highlight-first-item
                  placeholder="请选择"
                />
              </el-form-item>
            </el-form>
          </div>
        )
      };
      const urgentPriceColumn = {
        label: "急件进价",
        prop: "urgentPrice",
        width: CELL_WIDTH.money,
        render: (value, row) => (
          <div on-click={e => e.stopPropagation()}>
            <el-form
              attrs={{ model: row }}
              disabled={row.way !== "urgent"}
              size="mini"
              label-width="0"
              class="form-item-small-margin-bottom"
            >
              <el-form-item prop="urgentPrice">
                <ht-format-number
                  v-model={row.urgentPrice}
                  min={0}
                  precision-type="price"
                />
              </el-form-item>
            </el-form>
          </div>
        )
      };

      const columns = [...TABLE_SALES_ORDER_DETAIL_TABLE.columns];
      columns.splice(1, 1, multipleColumn);
      columns.splice(
        14,
        0,
        curTransferQtyColumn,
        outWarehouseColumn,
        dynaQtyColumn,
        lackQtyColumn,
        lackHandleColumn,
        inWarehouseColumn,
        urgentSupplierColumn,
        urgentPriceColumn
      );

      return columns.map(item => {
        if (item.type === "avaVehModels") {
          return {
            ...item,
            render: (value, row) => (
              <a onClick={() => this.viewAvaVehModels(row)} class="ht-link">
                查看
              </a>
            )
          };
        }
        return item;
      });
    },
    canBatchHandle() {
      return this.isAllSelected || this.selectedRows.length;
    },
    canBatchEditStockLack() {
      return (
        (this.isAllSelected &&
          this.totalTableData.length &&
          reduce(
            this.totalTableData,
            (sum, item) => (sum += Number(item.lackQty || 0)),
            0
          ) > 0) ||
        (this.selectedRows.length &&
          reduce(
            this.selectedRows,
            (sum, item) => (sum += Number(item.lackQty || 0)),
            0
          ) > 0)
      );
    },
    hasPermLackHandles() {
      return this.isAllowNegativeStock
        ? LACK_HANDLES.slice()
        : LACK_HANDLES.slice(0, 2);
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val) {
        oldKeyScope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el);
        this.searchParams = { ...defaultSearchData };
        this.searchLoadAllWarehouses("", Number(this.companyId || 0)).then(
          res => {
            this.outWarehouseIdsOptions = res || [];
            const totalData = this.totalData.map(item => ({
              ...item,
              curTransferQty: Number(item.onTransSaleQty || 0),
              outWarehouseIds: this.outWarehouseIdsOptions.map(
                warehouse => warehouse.id
              ),
              partId:
                (this.mapData.detailId2PartId &&
                  this.mapData.detailId2PartId[item.id]) ||
                item.partId
            }));
            this.initData(totalData).finally(() => {
              this.$nextTick(() => {
                this.filterData(this.searchParams);
              });
            });
          }
        );
      } else if (oldVal) {
        topHotkeys.unbindHotkeys(this.$el);
        hotkeys.setScope(oldKeyScope);
      }
    },
    selectedRows() {
      this.isAllSelected = this.selectedRows.length === this.tableData.length;
    }
  },
  methods: {
    selectable(row) {
      return Number(row.onTransSaleQty || 0) > 0;
    },
    initData(totalData) {
      this.loading = true;
      const details = totalData.map(item => ({
        detailId: item.id,
        property: item.property,
        needQty: item.curTransferQty,
        warehouseIds: item.outWarehouseIds,
        partId: item.partId
      }));
      return getStorageStocksByBatch({
        isAlloc: false,
        ownerCompanyId: this.headerData.companyId,
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
    },
    handleSearchFormChange(params) {
      this.filterData(params);
      this.isAllSelected = true;
      this.page = 1;
      this.setTableData();
      this.setSelectedRos();
    },
    filterData(params) {
      let totalTableData = [];
      if (params) {
        this.searchParams = { ...params };
        const paramsKeys = Object.keys(params);
        totalTableData = this.relTotalData.filter(item => {
          return paramsKeys.every(key => {
            if (key === "onlyWaitSale") {
              return params[key] ? Number(item.onTransSaleQty || 0) > 0 : true;
            } else if (key === "lackStatus") {
              if (params[key].includes(0) && params[key].includes(1)) {
                return true;
              } else if (params[key].includes(0)) {
                return Number(item.lackQty || 0) === 0;
              } else if (params[key].includes(1)) {
                return Number(item.lackQty || 0) > 0;
              } else {
                return true;
              }
            } else if (key === "vehModel") {
              return params[key]
                ? (item.vehModel || "").indexOf(params[key]) > -1 ||
                    (item.avaVehModel || "").indexOf(params[key]) > -1
                : true;
            } else {
              return params[key]
                ? (item[key] || "").indexOf(params[key]) > -1
                : true;
            }
          });
        });
      } else {
        totalTableData = [...this.relTotalData];
      }
      this.totalTableData = totalTableData.map(item => ({
        ...item,
        outWarehouseIds: item.hasStockWarehouseIds
          ? [...item.hasStockWarehouseIds]
          : [],
        way: "",
        lackWarehouseId: item.defaultWarehouseId || null,
        lackWarehouseName: item.defaultWarehouseName || "",
        urgentSupplierId: item.defaultSupplierId || null,
        urgentSupplierName: item.defaultSupplierName || "",
        urgentPrice: null
      }));
      this.isAllSelected = true;
      this.page = 1;
      this.setTableData();
      this.setSelectedRos();
    },
    setTableData() {
      this.total = this.totalTableData.length;
      this.tableData = this.totalTableData.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    },
    setSelectedRos() {
      this.selectedRows = this.tableData.filter(item => this.selectable(item));
    },
    pageChange(page) {
      this.page = page;
      this.setTableData();
      this.setSelectedRos();
    },

    setTotalTableData(selectedRows) {
      this.loading = true;
      const details = selectedRows.map(item => ({
        detailId: item.id,
        property: item.property,
        needQty: item.curTransferQty,
        warehouseIds: item.outWarehouseIds,
        partId: item.partId
      }));
      return getStorageStocksByBatch({
        isAlloc: false,
        ownerCompanyId: this.headerData.companyId,
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
              return { ...obj[item.id] };
            } else {
              return { ...item };
            }
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCurTransferQtyBlur(row) {
      this.setTotalTableData(this.selectedRows).then(() => {
        this.$nextTick(() => {
          this.setTableData();
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
        });
      });
    },
    handleOutWarehouseIdsBlur(isAppear, warehouseIds) {
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
    },
    viewAvaVehModels(row) {
      this.avaVehModelsPart = { id: row.partId, code: row.code };
      this.avaVehModelsVisible = true;
    },

    handleIsAllSelectedChange() {
      this.selectedRows = this.tableData.filter(item => this.selectable(item));
    },
    inverseHandle(e) {
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
    },

    batchSetWarehouseHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (!this.canBatchHandle) {
        return;
      }
      this.batchSetWarehouseBoxVisible = true;
    },
    handleBatchSetWarehouseSure(data) {
      const ids = this.selectedRows.map(item => item.id);
      this.totalTableData = this.totalTableData.map(item => {
        if (this.isAllSelected || ids.includes(item.id)) {
          return {
            ...item,
            outWarehouseIds: data.warehouseIds
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
    },
    batchEditStockLackHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (!this.canBatchEditStockLack) {
        return;
      }
      this.batchEditStockLackBoxVisible = true;
    },
    handleEditStockLackSure(data) {
      const ids = this.selectedRows.map(item => item.id);
      this.totalTableData = this.totalTableData.map(item => {
        if (
          (this.isAllSelected || ids.includes(item.id)) &&
          Number(item.lackQty || 0) > 0
        ) {
          if (data.way === "urgent") {
            return {
              ...item,
              way: data.way,
              lackWarehouseId: data.urgentWarehouseId,
              lackWarehouseName: data.urgentWarehouseName,
              urgentSupplierId: data.urgentSupplierId,
              urgentSupplierName: data.urgentSupplierName,
              urgentPrice: data.urgentPrice
            };
          } else if (data.way === "negative") {
            return {
              ...item,
              way: data.way,
              lackWarehouseId: data.negativeWarehouseId,
              lackWarehouseName: data.negativeWarehouseName
            };
          } else if (data.way === "terminate") {
            return { ...item, way: data.way };
          }
        } else {
          return { ...item };
        }
      });
      this.setTableData();
      this.selectedRows = this.tableData.filter(item => ids.includes(item.id));
    },
    batchTranferDemandsHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (!this.canBatchHandle) {
        return;
      }
      this.$confirm("您确定要将选中的配件缺货数量全部转需求吗？", {
        type: "warning"
      })
        .then(() => {
          // 调用接口
        })
        .catch(() => {});
    },

    transferPartsHandle(e) {
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
      console.log(useRows);
      if (!this.validateUseRows(useRows)) {
        return;
      }

      this.loading = true;
      const details = {};
      useRows.forEach(item => {
        details[item.id] = {
          transQty: item.curTransferQty,
          warehouseIds: item.outWarehouseIds,
          lackProcess:
            Number(item.lackQty || 0) > 0
              ? {
                  qty: item.lackQty,
                  way: item.way,
                  warehouseId: item.lackWarehouseId,
                  urgentSupplierId: item.urgentSupplierId,
                  urgentTaxedPurchasePrice: item.urgentPrice
                }
              : undefined,
          partId:
            this.mapData.detailId2PartId &&
            this.mapData.detailId2PartId[item.id]
        };
      });

      salesBillTransSale({
        orderId: this.headerData.id,
        cooperatorId: this.mapData.cooperatorId,
        details
      })
        .then(res => {
          this.loading = false;
          this.$emit("success");
          this.cancelHandle();
          if (res.saleBillId) {
            const msg = `成功生成销售单，单据号【${res.saleBillNo}】是否打开？`;
            this.$confirm(msg, { type: "success" })
              .then(() => {
                this.$router.push({
                  path: "/SalesOutBilling",
                  query: { billId: res.saleBillId, list: "true" }
                });
              })
              .catch(() => {});
          } else {
            this.$message.success({ message: "取消配件成功", showClose: true });
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    validateUseRows(useRows) {
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
        useRows.some(
          item => this.selectable(item) && !item.outWarehouseIds.length
        )
      ) {
        this.$message.warning({
          message: outWarehouseRules.outWarehouseIds.message,
          showClose: true
        });
        flag = false;
      }
      if (
        flag &&
        useRows.some(
          item =>
            this.selectable(item) && Number(item.lackQty || 0) > 0 && !item.way
        )
      ) {
        this.$message.warning({
          message: wayRules.way.message,
          showClose: true
        });
        flag = false;
      }
      if (
        flag &&
        useRows.some(
          item =>
            this.selectable(item) &&
            Number(item.lackQty || 0) > 0 &&
            !item.lackWarehouseId
        )
      ) {
        this.$message.warning({
          message: lackWarehouseRules.lackWarehouseId.message,
          showClose: true
        });
        flag = false;
      }

      return flag;
    },
    cancelHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.relVisible = false;
    }
  },

  render() {
    return (
      <ht-dialog
        visible={this.relVisible}
        on={{
          "update:visible": val => (this.relVisible = val)
        }}
        append-to-body
        title="转销售单"
        width="1320px"
        top="50px"
        class="dialog-body ignore-top-hotkeys"
      >
        <div class="container-box" v-loading={this.loading}>
          <ht-card title="单据信息">
            <HeaderText headerData={this.headerData} />
          </ht-card>
          <ht-card title="配件明细" style="margin-top: 5px;">
            <BoxSearchForm
              onSearch={this.handleSearchFormChange}
              defaultFormData={defaultSearchData}
              isTransfer
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
                "update:selectedRows": val => (this.selectedRows = val)
              }}
              pagination
              total={this.total}
              current-page={this.page}
              onPageChange={this.pageChange}
              selection-type="multiple"
              show-summary
              summary-method={params =>
                this.getSummariesByCalculate(params, TOTAL_FILES)
              }
              style="height: 335px;"
            />
            <div style="margin: -31px 0 0 5px;">
              <el-button
                disabled={!this.tableData.length}
                type="primary"
                size="mini"
                onClick={e => this.inverseHandle(e)}
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
                onClick={e => this.batchSetWarehouseHandle(e)}
              >
                选中配件设置出库仓库
              </el-button>
              <el-button
                disabled={!this.canBatchEditStockLack}
                type="primary"
                size="mini"
                onClick={e => this.batchEditStockLackHandle(e)}
              >
                选中配件缺货处理
              </el-button>
              <el-button
                disabled={!this.canBatchHandle}
                type="primary"
                size="mini"
                onClick={e => this.batchTranferDemandsHandle(e)}
              >
                选中配件转需求
              </el-button>
            </div>
          </ht-card>
          <div style="margin: 10px 0 5px 0; text-align: center;">
            <el-button
              disabled={!this.canBatchHandle}
              type="primary"
              size="mini"
              onClick={e => this.transferPartsHandle(e)}
            >
              选中配件转销售单
            </el-button>
            <el-button
              type="primary"
              size="mini"
              onClick={e => this.cancelHandle(e)}
            >
              取消（Esc）
            </el-button>
          </div>
        </div>

        <AvaVehModels
          visible={this.avaVehModelsVisible}
          on={{
            "update:visible": val => (this.avaVehModelsVisible = val)
          }}
          part={this.avaVehModelsPart}
        />
        <BatchSetWarehouseBox
          visible={this.batchSetWarehouseBoxVisible}
          on={{
            "update:visible": val => (this.batchSetWarehouseBoxVisible = val)
          }}
          companyId={this.companyId}
          onSure={this.handleBatchSetWarehouseSure}
        />
        <BatchEditStockLackBox
          visible={this.batchEditStockLackBoxVisible}
          on={{
            "update:visible": val => (this.batchEditStockLackBoxVisible = val)
          }}
          companyId={this.companyId}
          onSure={this.handleEditStockLackSure}
        />
      </ht-dialog>
    );
  }
};
</script>

<style lang="scss" scoped>
.dialog-body {
  &::v-deep .el-dialog__body {
    padding: 5px;
    background-color: #e7ebed;
  }
}
</style>
