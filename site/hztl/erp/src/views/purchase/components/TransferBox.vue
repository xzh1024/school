<script>
import { mapState } from "vuex";
import hotkeys from "hotkeys-js";
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { searchMixin } from "@/mixins";
import summaries from "@/mixins/summaries";
import { getDefaultWarehouses } from "@/api/base/search";
import { loadSearchPosition } from "@/api/store/stocks";
import { reqReceiveTrans } from "@/api/purchase/purchaseReceive";
import {
  CELL_WIDTH,
  ALL_SPACE_REG_EXP,
  QUICK_ADD_POSITION_LEN
} from "@/constants";
import quickGetPositions from "@/utils/quickGetPositions";
import HeaderText from "./HeaderText";
import BoxSearchForm from "./BoxSearchForm";
import BatchSetWarehouseBox from "./BatchSetWarehouseBox";
import {
  PURCHASE_BILLING_DETAILS,
  PURCHASE_ORDER_DETAIL_TOTAL_FILES
} from "../constants";

let oldKeyScope;
const topHotkeys = new TopHotkeys();
const TOTAL_FILES = [...PURCHASE_ORDER_DETAIL_TOTAL_FILES];
TOTAL_FILES.push({ file: "curTransferQty", type: "qty" });
const defaultSearchData = {
  code: "",
  name: "",
  brand: "",
  categoryName: "",
  property: "",
  productionPlace: "",
  vehModel: "",
  onlyWaitPurchase: true
};
const curTransferQtyRules = {
  curTransferQty: {
    required: true,
    message: "请输入本次转采购数量",
    trigger: "change"
  }
};
const warehouseRules = {
  warehouseId: {
    required: true,
    message: "请选择到货仓库",
    trigger: "change"
  }
};

export default {
  name: "TransferBox",
  components: {
    HeaderText,
    BoxSearchForm,
    AvaVehModels,
    BatchSetWarehouseBox
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
      relTotalData: [],
      totalTableData: [],
      isAllSelected: false,
      tableName: `${PURCHASE_BILLING_DETAILS.name}TransferBox`,
      tableData: [],
      selectedRows: [],
      total: 0,
      page: 1,
      avaVehModelsVisible: false,
      avaVehModelsPart: null,
      batchSetWarehouseBoxVisible: false
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    ...mapState("admin/systemParams", {
      isEasyMode: state => !!state.params.manageMode
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
        label: "本次转采购数量",
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
      const warehouseColumn = {
        label: "到货仓库",
        prop: "warehouseName",
        width: CELL_WIDTH.warehouseName,
        render: (value, row) => (
          <div on-click={e => e.stopPropagation()}>
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
              <el-form-item prop="warehouseId">
                <ht-autoselect
                  v-model={row.warehouseId}
                  fetch-suggestions={query =>
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
                  on-change={warehouseId =>
                    this.handleWarehouseChange(warehouseId, row)
                  }
                />
              </el-form-item>
            </el-form>
          </div>
        )
      };
      const positionColumn = {
        label: "货位",
        prop: "positionName",
        width: CELL_WIDTH.positionName,
        render: (value, row) => (
          <div on-click={e => e.stopPropagation()}>
            <el-form
              disabled={!this.selectable(row)}
              size="mini"
              label-width="0"
              class="form-item-small-margin-bottom"
            >
              <el-form-item>
                {this.isEasyMode ? (
                  <ht-autoselect
                    v-model={row.positionId}
                    keepInputValue={row.positionName}
                    fetch-suggestions={query =>
                      this.getPositions(row.warehouseId, query)
                    }
                    defaultValue={row.positionName}
                    remote
                    keep-input
                    filter-zero
                    clearable
                    no-match-text=""
                    trigger-on-focus={false}
                    placeholder="请选择"
                    on-input-change={positionName =>
                      this.handlePositionNameChange(positionName, row)
                    }
                    on-change={positionId =>
                      this.handlePositionIdChange(positionId, row)
                    }
                  />
                ) : (
                  <ht-autoselect
                    v-model={row.positionId}
                    fetch-suggestions={query =>
                      this.getPositions(row.warehouseId, query)
                    }
                    defaultValue={row.positionName}
                    remote
                    filter-zero
                    clearable
                    trigger-on-focus={false}
                    highlight-first-item
                    placeholder="请选择"
                    on-change={positionId =>
                      this.handlePositionIdChange(positionId, row)
                    }
                  />
                )}
              </el-form-item>
            </el-form>
          </div>
        )
      };
      const columns = [...PURCHASE_BILLING_DETAILS.columns];
      columns.splice(1, 1, multipleColumn);
      columns.splice(
        14,
        0,
        curTransferQtyColumn,
        warehouseColumn,
        positionColumn
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
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val) {
        oldKeyScope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el);
        this.searchParams = { ...defaultSearchData };
        this.initData().finally(() => {
          this.$nextTick(() => {
            this.filterData(this.searchParams);
          });
        });
      } else if (oldVal) {
        topHotkeys.unbindHotkeys(this.$el);
        hotkeys.setScope(oldKeyScope);
      }
    }
  },
  methods: {
    selectable(row) {
      return Number(row.waitPurchaseQty || 0) > 0;
    },
    initData() {
      const parts = this.totalData.map(item => {
        return {
          partId: item.partId,
          property: item.property
        };
      });
      return getDefaultWarehouses({
        ownerCompanyId: this.headerData.companyId,
        parts
      })
        .then(res => {
          this.relTotalData = this.totalData.map(item => ({
            ...item,
            ...res[item.partId]
          }));
        })
        .catch(() => {
          this.relTotalData = [...this.totalData];
        });
    },
    filterData(params) {
      let tableData = [];
      if (params) {
        const paramsKeys = Object.keys(params);
        tableData = this.relTotalData.filter(item => {
          return paramsKeys.every(key => {
            if (key === "onlyWaitPurchase") {
              return params[key] ? Number(item.waitPurchaseQty || 0) > 0 : true;
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
        tableData = [...this.relTotalData];
      }
      this.totalTableData = tableData.map(item => ({
        ...item,
        curTransferQty: Number(item.waitPurchaseQty || 0),
        warehouseId: item.warehouseId || null,
        warehouseName: item.warehouseName || "",
        positionId: item.positionId || null,
        cachePositionId: item.positionId || null,
        positionName: item.positionName || ""
      }));
      this.isAllSelected = false;
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

    handleCurTransferQtyBlur(row) {
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
    },
    async handleWarehouseChange(warehouseId, row) {
      const positions = await this.getPositions(warehouseId);
      if (positions.length) {
        const position = positions.find(
          item => item.id === row.cachePositionId
        );
        if (position) {
          row.positionId = row.cachePositionId;
        } else {
          row.positionId = null;
        }
      } else {
        row.positionId = null;
      }
    },
    async getPositions(warehouseId, query) {
      const positions = await loadSearchPosition({
        name: query,
        warehouseId
      });
      return positions || [];
    },
    handlePositionIdChange(positionId, row) {
      if (!positionId) return;
      row.cachePositionId = positionId;
    },
    handlePositionNameChange(positionName, row) {
      if (positionName) {
        row.positionName = positionName.replace(ALL_SPACE_REG_EXP, "");
      } else {
        row.positionName = "";
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
            warehouseId: data.warehouseId,
            warehouseName: data.warehouseName,
            positionId: data.positionId,
            positionName: data.positionName
          };
        } else {
          return { ...item };
        }
      });
      this.setTableData();
      this.selectedRows = this.tableData.filter(item => ids.includes(item.id));
    },

    async transferPartsHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (!this.canBatchHandle || this.loading) {
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
      useRows.forEach(item => {
        details[item.id] = {
          qty: item.curTransferQty,
          warehouseId: item.warehouseId,
          positionId: item.positionId,
          partId:
            this.mapData.detailId2PartId &&
            this.mapData.detailId2PartId[item.id]
        };
      });

      if (
        this.isEasyMode &&
        useRows.some(item => !item.positionId && item.positionName)
      ) {
        if (
          useRows.some(
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

        const positionIds = await quickGetPositions(
          this.tableData.map(item => ({
            warehouseId: item.warehouseId,
            name: item.positionName
          }))
        );
        if (!positionIds) {
          this.loading = false;
          return;
        }

        useRows.forEach((item, index) => {
          details[item.id] = {
            ...details[item.id],
            positionId: positionIds[index]
          };
        });
      }

      reqReceiveTrans({
        orderId: this.headerData.id,
        cooperatorId: this.mapData.cooperatorId,
        details
      })
        .then(res => {
          this.$emit("success");
          this.cancelHandle();
          const msg = `成功生成采购单，单据号【${res.header.billNo}】是否打开？`;
          this.$confirm(msg, { type: "success" })
            .then(() => {
              this.$router.push({
                path: "/PurchaseReceiveBilling",
                query: { billId: res.header.id }
              });
            })
            .catch(() => {});
        })
        .finally(() => {
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
        useRows.some(item => this.selectable(item) && !item.warehouseId)
      ) {
        this.$message.warning({
          message: warehouseRules.warehouseId.message,
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
        title="转采购单"
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
              onSearch={this.filterData}
              defaultFormData={this.searchParams}
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
                选中配件设置到货仓库
              </el-button>
            </div>
          </ht-card>
          <div style="margin: 10px 0 5px 0; text-align: center;">
            <el-button
              v-loading={this.loading}
              disabled={!this.canBatchHandle}
              type="primary"
              size="mini"
              onClick={e => this.transferPartsHandle(e)}
            >
              选中配件转采购单
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
