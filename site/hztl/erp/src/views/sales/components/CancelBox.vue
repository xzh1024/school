<script>
import { mapState } from "vuex";
import hotkeys from "hotkeys-js";
import { reduce } from "lodash";
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { searchMixin, precisionsFixed } from "@/mixins";
import summaries from "@/mixins/summaries";
import { CELL_WIDTH } from "@/constants";
import { add } from "@/utils/numberAPI";
import { salesBillCancelParts } from "@/api/sales/salesHome";
import HeaderText from "./HeaderText";
import BoxSearchForm from "./BoxSearchForm";
import {
  TABLE_SALES_ORDER_DETAIL_TABLE,
  SALES_ORDER_DETAIL_TOTAL_FILES
} from "../constants";

let oldKeyScope;
const topHotkeys = new TopHotkeys();
const TOTAL_FILES = [...SALES_ORDER_DETAIL_TOTAL_FILES];
TOTAL_FILES.push({ file: "curTermQty", type: "qty" });
const defaultSearchData = {
  code: "",
  name: "",
  brand: "",
  categoryName: "",
  property: "",
  productionPlace: "",
  vehModel: "",
  onlyWaitSale: true
};
const curTermQtyRules = {
  curTermQty: {
    required: true,
    message: "请输入本次取消数量",
    trigger: "change"
  }
};

export default {
  name: "CancelBox",
  components: {
    HeaderText,
    BoxSearchForm,
    AvaVehModels
  },
  mixins: [summaries, searchMixin, precisionsFixed],
  props: {
    visible: Boolean,
    headerData: {
      type: Object,
      required: true
    },
    totalData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      searchParams: { ...defaultSearchData },
      totalTableData: [],
      tableName: `${TABLE_SALES_ORDER_DETAIL_TABLE.name}CancelBox`,
      tableData: [],
      selectedRows: [],
      total: 0,
      page: 1,
      avaVehModelsVisible: false,
      avaVehModelsPart: null,
      batchSetWarehouseVisible: false
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
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
      const curTermQtyColumns = {
        label: "本次取消数量",
        prop: "curTermQty",
        width: CELL_WIDTH.qty,
        render: (value, row) => (
          <div on-click={e => e.stopPropagation()}>
            <el-form
              attrs={{
                model: row,
                rules: curTermQtyRules,
                "show-message": false
              }}
              disabled={!this.selectable(row)}
              size="mini"
              label-width="0"
              class="form-item-small-margin-bottom"
            >
              <el-form-item prop="curTermQty">
                <HtFormatNumber
                  v-model={row.curTermQty}
                  min={0}
                  max={Number(row.onTransSaleQty || 0)}
                  precision-type="qty"
                  on-blur={() => this.handleCurTransferQtyBlur(row)}
                />
              </el-form-item>
            </el-form>
          </div>
        )
      };
      const columns = [...TABLE_SALES_ORDER_DETAIL_TABLE.columns];
      columns.splice(1, 1, multipleColumn);
      columns.splice(15, 0, curTermQtyColumns);
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
    curTotalTermQty() {
      let total = 0;
      if (this.selectedRows.length) {
        total = this.precisionFormat(
          reduce(
            this.selectedRows,
            (sum, item) => add(sum, Number(item.curTermQty || 0)),
            0
          ),
          "qty"
        );
      }
      return total;
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val) {
        oldKeyScope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el);
        this.searchParams = { ...defaultSearchData };
        this.filterData(this.searchParams);
      } else if (oldVal) {
        topHotkeys.unbindHotkeys(this.$el);
        hotkeys.setScope(oldKeyScope);
      }
    }
  },
  methods: {
    selectable(row) {
      return Number(row.onTransSaleQty || 0) > 0;
    },
    filterData(params) {
      let tableData = [];
      if (params) {
        const paramsKeys = Object.keys(params);
        tableData = this.totalData.filter(item => {
          return paramsKeys.every(key => {
            if (key === "onlyWaitSale") {
              return params[key] ? Number(item.onTransSaleQty) > 0 : true;
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
        tableData = [...this.totalData];
      }
      this.totalTableData = tableData.map(item => ({
        ...item,
        curTermQty: 0
      }));
      this.page = 1;
      this.setTableData();
    },
    setTableData() {
      this.total = this.totalTableData.length;
      this.tableData = this.totalTableData.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    },
    pageChange(page) {
      this.page = page;
      this.setTableData();
    },

    handleCurTransferQtyBlur(row) {
      const ids = this.selectedRows.map(item => item.id);
      if (Number(row.curTermQty || 0) > 0) {
        this.selectedRows = this.tableData.filter(
          item => ids.includes(item.id) || item.id === row.id
        );
      } else {
        this.selectedRows = this.tableData.filter(
          item => ids.includes(item.id) && item.id !== row.id
        );
      }
    },
    viewAvaVehModels(row) {
      this.avaVehModelsPart = { id: row.partId, code: row.code };
      this.avaVehModelsVisible = true;
    },

    inverseHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      const ids = this.selectedRows.map(item => item.id);
      this.selectedRows = this.tableData.filter(
        item => this.selectable(item) && !ids.includes(item.id)
      );
    },

    cancelAllParstHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      const totalData = this.totalData.map(item => ({
        ...item,
        curTermQty: Number(item.onTransSaleQty || 0)
      }));
      this.cancelParstHandle(totalData);
    },
    cancelParstHandle(selectedRows, e) {
      if (e) {
        e.stopPropagation();
      }
      const useRows = selectedRows.filter(item => this.selectable(item));
      if (!this.validateUseRows(useRows)) {
        return;
      }

      this.loading = true;
      const details = {};
      useRows.forEach(item => {
        details[item.id] = item.curTermQty;
      });

      salesBillCancelParts(this.headerData.id, { details })
        .then(() => {
          this.$message.success({ message: "取消配件成功", showClose: true });
          this.$emit("success");
          this.cancelHandle();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    validateUseRows(useRows) {
      let flag = true;
      if (
        useRows.some(item => this.selectable(item) && !Number(item.curTermQty))
      ) {
        this.$message.warning({
          message: curTermQtyRules.curTermQty.message,
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
        title="配件取消"
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
              style="height: 375px;"
            />
            <div style="display: flex; align-items: center; margin: -31px 0 0 5px;">
              <el-button
                type="primary"
                size="mini"
                onClick={e => this.inverseHandle(e)}
              >
                反选
              </el-button>
              <div style="margin-left: 20px;">
                选中配件数：
                <span class="text-font-primary">
                  {this.selectedRows.length}
                </span>
              </div>
              <div style="margin-left: 20px;">
                本次取消数合计：
                <span class="text-font-primary">{this.curTotalTermQty}</span>
              </div>
            </div>
          </ht-card>
          <div style="margin: 10px 0 5px 0; text-align: center;">
            <el-button
              disabled={!this.selectedRows.length}
              type="primary"
              size="mini"
              onClick={e => this.cancelParstHandle(this.selectedRows, e)}
            >
              取消选中配件
            </el-button>
            <el-button
              type="primary"
              size="mini"
              onClick={e => this.cancelAllParstHandle(e)}
            >
              取消所有待转配件
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
