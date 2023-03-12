<script>
import { mapState } from "vuex";
import hotkeys from "hotkeys-js";
// import { reduce } from "lodash";
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { searchMixin, precisionsFixed } from "@/mixins";
import summaries from "@/mixins/summaries";
import { CELL_WIDTH } from "@/constants";
// import { add } from "@/utils/numberAPI";
import { salesBillPlatformAudit } from "@/api/sales/salesHome";
import HeaderText from "./HeaderText";
import BoxSearchForm from "./BoxSearchForm";
import {
  TABLE_SALES_ORDER_AUDIT_TABLE,
  SALES_ORDER_DETAIL_TOTAL_FILES
} from "../constants";

let oldKeyScope;
const topHotkeys = new TopHotkeys();
const TOTAL_FILES = [...SALES_ORDER_DETAIL_TOTAL_FILES];
TOTAL_FILES.push({ file: "curTermQty", type: "qty" });
TOTAL_FILES.push({ file: "taxedPrice", type: "money" });
TOTAL_FILES.push({ file: "actualQty", type: "qty" });

const defaultSearchData = {
  code: "",
  name: "",
  brand: "",
  categoryName: "",
  property: "",
  productionPlace: "",
  vehModel: ""
};
const curTermQtyRules = {
  curTermQty: {
    required: true,
    message: "请输入取消数量",
    trigger: "change"
  }
};
const taxedPriceRules = {
  taxedPrice: {
    required: true,
    message: "请输入订货价，订货价必须大于0",
    trigger: "change"
  }
};

export default {
  name: "AuditBox",
  components: {
    HeaderText,
    BoxSearchForm,
    AvaVehModels
  },
  mixins: [summaries, searchMixin, precisionsFixed],
  props: {
    billId: {
      type: [Number, String],
      required: true
    },
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
      tableName: `${TABLE_SALES_ORDER_AUDIT_TABLE.name}AuditBox`,
      tableData: [],
      total: 0,
      page: 1,
      avaVehModelsVisible: false,
      avaVehModelsPart: null,
      batchSetWarehouseVisible: false,
      actualTotal: 0,
      priceTotal: 0,
      dialogFormVisible: false,
      remark: ""
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
      const curTermQtyColumns = {
        label: "取消数量",
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
                />
              </el-form-item>
            </el-form>
          </div>
        )
      };
      const taxedPriceColumns = {
        label: "订货价",
        prop: "taxedPrice",
        width: CELL_WIDTH.qty,
        render: (value, row) => (
          <div on-click={e => e.stopPropagation()}>
            <el-form
              attrs={{
                model: row,
                rules: taxedPriceRules,
                "show-message": false
              }}
              size="mini"
              label-width="0"
              class="form-item-small-margin-bottom"
            >
              <el-form-item prop="taxedPrice">
                <HtFormatNumber
                  v-model={row.taxedPrice}
                  min={0}
                  precision-type="money"
                />
              </el-form-item>
            </el-form>
          </div>
        )
      };
      const actualQtyColumns = {
        label: "实定数",
        prop: "actualQty",
        width: CELL_WIDTH.qty,
        type: "number",
        formatter: (value, row) => {
          if (row.curTermQty) {
            return row.bookQty - row.curTermQty;
          } else {
            return row.bookQty;
          }
        }
      };
      const columns = [...TABLE_SALES_ORDER_AUDIT_TABLE.columns];
      columns.splice(11, 0, curTermQtyColumns);
      columns.splice(12, 0, taxedPriceColumns);
      columns.splice(13, 0, actualQtyColumns);
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
    },
    totalTableData: {
      deep: true,
      handler(value) {
        let qtySum = 0,
          priceSum = 0;
        value.map(item => {
          if (item.curTermQty) {
            item.actualQty = Number(item.bookQty) - Number(item.curTermQty);
            item.taxedAmount = Number(item.actualQty) * Number(item.taxedPrice);
          } else {
            item.actualQty = item.bookQty;
            item.taxedAmount = Number(item.bookQty) * Number(item.taxedPrice);
          }
          qtySum += Number(item.actualQty);
          priceSum += Number(item.taxedAmount);
        });
        this.actualTotal = qtySum || 0;
        this.priceTotal = priceSum || 0;
      }
    }
  },
  methods: {
    // 数据初始化
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
        curTermQty: 0,
        actualQty: 0
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
    //  页码切换
    pageChange(page) {
      this.page = page;
      this.setTableData();
    },
    // 适用车型-查看
    viewAvaVehModels(row) {
      this.avaVehModelsPart = { id: row.partId, code: row.code };
      this.avaVehModelsVisible = true;
    },
    validateUseRows(useRows) {
      let flag = true;
      if (
        useRows.some(
          item => Number(item.curTermQty) != 0 && !Number(item.curTermQty)
        )
      ) {
        this.$message.warning({
          message: curTermQtyRules.curTermQty.message,
          showClose: true
        });
        flag = false;
      }
      if (useRows.some(item => !Number(item.taxedPrice))) {
        this.$message.warning({
          message: taxedPriceRules.taxedPrice.message,
          showClose: true
        });
        flag = false;
      }
      return flag;
    },
    // 取消订单
    cancelParstHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.$prompt("请输入备注", "取消订单", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "textarea"
      })
        .then(({ value }) => {
          const data = {
            billId: Number(this.billId),
            type: "order",
            pass: false,
            details: [],
            remark: value
          };
          salesBillPlatformAudit(data)
            .then(() => {
              this.$message.success({ message: "已取消", showClose: true });
              this.$emit("success");
              this.cancelHandle();
            })
            .finally(() => {
              this.loading = false;
            });
        })
        .catch(() => {
          // console.log("取消");
        });
    },
    // 审核通过
    auditSubmit(e) {
      if (e) {
        e.stopPropagation();
      }
      const useRows = this.totalTableData;
      if (!this.validateUseRows(useRows)) {
        return;
      }
      const details = [];
      this.totalTableData.map(item => {
        details.push({
          id: item.id,
          price: item.taxedPrice,
          cancelQty: item.curTermQty
        });
      });
      const data = {
        billId: Number(this.billId),
        type: "order",
        pass: true,
        details: [],
        remark: ""
      };
      data.details = details || [];
      salesBillPlatformAudit(data)
        .then(() => {
          this.$message.success({ message: "审核成功", showClose: true });
          this.$emit("success");
          this.cancelHandle();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 取消
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
        title="平台订单审核"
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
              isPlatform={true}
              onSearch={this.filterData}
              defaultFormData={this.searchParams}
            />
          </ht-card>
          <ht-card style="margin-top: -15px;">
            <ht-setting-table
              tableName={this.tableName}
              columns={this.tableColumns}
              data={this.tableData}
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
              <div style="margin-left: 20px;">
                合计实定数：
                <span class="text-font-primary">{this.actualTotal}</span>
              </div>
              <div style="margin-left: 20px;">
                合计实定金额：
                <span class="text-font-primary">{this.priceTotal}</span>
              </div>
            </div>
          </ht-card>
          <div style="margin: 10px 0 5px 0; text-align: center;">
            <el-button
              type="primary"
              size="mini"
              onClick={e => this.cancelParstHandle(e)}
            >
              取消订单
            </el-button>
            <el-button
              type="primary"
              size="mini"
              onClick={e => this.auditSubmit(e)}
            >
              审核通过
            </el-button>
            <el-button
              type="primary"
              size="mini"
              onClick={e => this.cancelHandle(e)}
            >
              关闭（Esc）
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
