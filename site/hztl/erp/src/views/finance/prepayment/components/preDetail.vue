<template>
  <div style="height:70%">
    <ht-card>
      <el-form
        :model="searchData"
        label-position="left"
        label-width="60px"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="20" style="width:100%">
          <el-col :span="6">
            <el-form-item label-width="100px">
              <ht-select
                slot="label"
                v-model="searchData.timeType"
                class="date-label"
                :clearable="false"
                :options="dateTypeOptions"
              />
              <ht-date-range
                v-if="searchData.timeType == 1"
                v-model="searchData.settleTimeRange"
              />
              <ht-date-range
                v-if="searchData.timeType == 2"
                v-model="searchData.createTimeRange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="单据号">
              <ht-input
                v-model="searchData.billNo"
                class="switch-focus focus-phone"
                placeholder="请输入单据号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="this.type == 'YS' ? '预收来源' : '预付来源'">
              <ht-select
                v-model="searchData.sourceBillTypes"
                :options="originOption"
                :placeholder="this.type == 'YS' ? '预收来源' : '预付来源'"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="单据状态">
              <ht-select
                v-model="searchData.settleStatuses"
                :options="BILL_SATUS"
                placeholder="单据状态"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="冲销状态">
              <ht-select
                v-model="rowData.deductStatuses"
                :options="CHARGE_STATUS"
                placeholder="冲销情况"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <div style="text-align: right;">
              <el-button type="primary" size="mini" @click.stop="loadData">
                查询
              </el-button>
              <el-button type="primary" size="mini" @click.stop="resetHandle">
                重置
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card no-padding class="auto-card">
      <ht-setting-table
        class="edit-swap-group-parts"
        :total="totalSize"
        :current-page="page"
        :data="tableData"
        :columns="columns"
        setting-all-column
        pagination
        show-table-setting
        :enableTableSetting="true"
        show-summary
        :summary-method="getSummaries"
        @pageChange="_handleSizeChange"
        :table-name="'pre-collect-detail'"
      />
    </ht-card>
    <!-- 冲销登记弹窗 -->
    <ht-dialog
      :visible.sync="chargeDialogVisible"
      v-if="chargeDialogVisible"
      title="冲销补登"
      class="dialog-body"
      width="350px"
      append-to-body
    >
      <CharDialog
        :defaultForm="charFormDisplay"
        :type="type"
        :fromDetail="true"
        @submitForm="updateList"
        @hide="chargeDialogVisible = false"
      />
    </ht-dialog>
  </div>
</template>

<script>
import { CHARGE_STATUS, BILL_SATUS } from "@/views/finance/constans";
import { BILL_TYPE } from "@/constants/store";
import eventBus from "@/event";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { detail } from "@/api/finance/prevFunds";
import CharDialog from "./charDialog";
import { dateFormat } from "@/utils/date";
import { mapGetters, mapState } from "vuex";
import { cloneDeep } from "lodash";

const currentDate = () => {
  const now = new Date();
  const currentMonth =
    now.getMonth() + 1 > 9 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1);
  const currentDay = now.getDate() > 9 ? now.getDate() : "0" + now.getDate();
  return now.getFullYear() + "-" + currentMonth + "-" + currentDay;
};
const defaultSearch = {
  timeType: 1,
  billNo: "",
  createTimeRange: [],
  settleTimeRange: [],
  sourceBillTypes: ["资金申请", "定金", "补充登记", "余额结转"],
  settleStatuses: ["toSettle", "settled", "partialSettle"],
  deductStatuses: ["notDeducted", "partialDeducted"]
};
// 冲销登记弹窗的默认填充内容
const defaultChargeForm = {
  billType: "YF",
  deductType: "relationship",
  prevFundId: null,
  companyId: [],
  cooperatorId: [],
  commonBalance: null,
  amount: null,
  settleDate: currentDate(),
  voucherCode: "",
  paymentBy: "",
  remark: ""
};
const ORIGIN_OPTION = [
  {
    id: ["OAYS", "OAYF"],
    name: "资金申请"
  },
  {
    id: ["CD", "XD"],
    name: "定金"
  },
  {
    id: ["YS", "YF"],
    name: "补充登记"
  },
  {
    id: [""],
    name: "余额结转"
  }
];
export default {
  props: {
    summaryData: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: "YS"
    },
    subStatus: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    summaryData: {
      handler: function(val) {
        this.rowData = cloneDeep({ ...val });
        this.loadData();
      },
      deep: true
    },
    subStatus: {
      handler: function(val) {
        this.searchData.deductStatuses = val;
      },
      deep: true
    },
    billQueryDefaultDateRange(val) {
      defaultSearch.createTimeRange = val;
      defaultSearch.settleTimeRange = val;
      this.searchData.createTimeRange = val;
      this.searchData.settleTimeRange = val;
    }
  },
  components: {
    CharDialog
  },
  computed: {
    ...mapGetters("admin/systemParams", ["billQueryDefaultDateRange"]),
    ...mapState("admin/table", ["pageSize"])
  },
  data() {
    return {
      CHARGE_STATUS,
      BILL_SATUS,
      chargeDialogVisible: false,
      totalData: {},
      dateTypeOptions: [
        { id: 1, name: "结算日期" },
        { id: 2, name: "登记日期" }
      ],
      originOption: [
        {
          id: "资金申请",
          name: "资金申请"
        },
        {
          id: "定金",
          name: "定金"
        },
        {
          id: "补充登记",
          name: "补充登记"
        },
        {
          id: "余额结转",
          name: "余额结转"
        }
      ],
      charFormDisplay: {},
      rowData: {},
      searchData: {
        ...defaultSearch
      },
      loading: false,
      currentPage: 1,
      page: 1,
      totalSize: 0,
      tableData: [],
      columns: [
        {
          prop: "index",
          label: "序号",
          width: CELL_WIDTH.index,
          type: "index",
          cantHide: false,
          cantExport: true
        },
        {
          prop: "",
          label: "操作",
          width: CELL_WIDTH.no,
          render: (_, row) => {
            const { purpose, settleStatus, deductStatus } = row;
            // 结算状态为已结算，冲销状态不是全部冲销的，且用途不是专款的，才显示冲销登记按钮
            if (
              settleStatus == "settled" &&
              deductStatus != "deducted" &&
              purpose !== "special"
            ) {
              return (
                <el-row class="op-btns">
                  <span
                    onClick={e => this.showDetail(row, e)}
                    style="marginRight:10px;"
                  >
                    查看冲销明细
                  </span>
                  <span onClick={e => this.charge(row, e)}>冲销登记</span>
                </el-row>
              );
            } else {
              return (
                <el-row class="op-btns">
                  <span
                    onClick={e => this.showDetail(row, e)}
                    style="marginRight:10px;"
                  >
                    查看冲销明细
                  </span>
                </el-row>
              );
            }
          }
        },
        {
          prop: "billNo",
          label: "预收单号",
          width: CELL_WIDTH.personName
        },
        {
          prop: "settleStatus",
          label: "结算状态",
          width: CELL_WIDTH.personName,
          formatter: value => {
            const status = BILL_SATUS.find(item => item.id === value);
            return status ? status.name : "";
          }
        },
        {
          prop: "amount",
          label: "金额",
          width: CELL_WIDTH.personName
        },
        {
          prop: "deductedAmount",
          label: "已冲金额",
          width: CELL_WIDTH.personName
        },
        {
          prop: "balanceAmount",
          label: "余额",
          width: CELL_WIDTH.personName
        },
        {
          prop: "deductStatus",
          label: "冲销状态",
          width: CELL_WIDTH.personName,
          formatter: value => {
            const status = CHARGE_STATUS.find(item => item.id === value);
            return status ? status.name : "";
          }
        },
        {
          prop: "paymentType",
          label: "支付方式",
          width: CELL_WIDTH.personName
        },
        {
          prop: "sourceBillTypeCn",
          label: "预收来源",
          width: CELL_WIDTH.personName
        },
        {
          prop: "sourceBillNo",
          label: "来源单号",
          width: CELL_WIDTH.personName
        },
        {
          prop: "sourceBillType",
          label: "来源单据类型",
          width: CELL_WIDTH.personName,
          formatter: value => {
            return BILL_TYPE[value] || "-";
          }
        },
        {
          prop: "q",
          label: "来源单据状态",
          width: CELL_WIDTH.personName,
          render: (_, row) => <span>{row.sourceBillStatus.name || "-"}</span>
        },
        {
          prop: "createdByName",
          label: "登记人",
          width: CELL_WIDTH.personName
        },
        {
          prop: "createdAt",
          label: "登记日期",
          width: CELL_WIDTH.personName,
          formatter: value => {
            return dateFormat(value);
          }
        },
        {
          prop: "remark",
          label: "备注",
          width: CELL_WIDTH.personName
        },
        {
          prop: "settleByName",
          label: "最后结算人",
          width: CELL_WIDTH.personName
        },
        {
          prop: "settleDate",
          label: "最后结算时间",
          width: CELL_WIDTH.personName,
          formatter: value => {
            return dateFormat(value);
          }
        }
      ]
    };
  },
  mounted() {
    // 设置默认时间
    defaultSearch.createTimeRange = this.billQueryDefaultDateRange;
    defaultSearch.settleTimeRange = this.billQueryDefaultDateRange;
    this.searchData.createTimeRange = this.billQueryDefaultDateRange;
    this.searchData.settleTimeRange = this.billQueryDefaultDateRange;
    this.rowData = { ...this.summaryData };
    this.searchData.deductStatuses = this.subStatus;
    this.loadData();
  },
  methods: {
    updateList() {
      this.chargeDialogVisible = false;
      this.loadData();
    },
    reset() {
      this.tableData = [];
      this.resetHandle();
    },
    getPrePayOrigin() {
      let arr = [];
      this.searchData.sourceBillTypes.forEach(orgin => {
        ORIGIN_OPTION.forEach(options => {
          if (options.name === orgin) {
            if (options) arr = arr.concat(options.id);
          }
        });
      });
      return arr;
    },
    loadData() {
      this.columns[2].label = this.type == "YS" ? "预收单号" : "预付单号";
      this.columns[9].label = this.type == "YS" ? "预收来源" : "预付来源";
      // 根据选择的预付来源生成数组
      const sourceBillTypes = this.getPrePayOrigin();
      this.loading = true;
      const { page, pageSize } = this;
      const {
        billNo,
        timeType,
        settleTimeRange,
        createTimeRange,
        settleStatuses
      } = this.searchData;
      const {
        billType,
        companyId,
        cooperatorId,
        deductStatuses
      } = this.rowData;
      if (!billType) {
        return;
      }
      const query = {
        billType,
        companyIds: [companyId],
        cooperatorIds: [cooperatorId],
        settleStatuses,
        deductStatuses,
        billNo,
        sourceBillTypes,
        page,
        pageSize
      };
      let finalQuery = {};
      // 根据timeType不同来构建query
      if (timeType === 1) {
        finalQuery = {
          ...query,
          settleDateStart: settleTimeRange[0],
          settleDateEnd: settleTimeRange[1]
        };
      } else {
        finalQuery = {
          ...query,
          sourceBillTypes,
          createdAtStart: createTimeRange[0],
          createdAtEnd: createTimeRange[1]
        };
      }
      detail(finalQuery)
        .then(res => {
          const {
            rows,
            totalSize,
            totalAmount,
            totalBalanceAmount,
            totalDeductedAmount
          } = res;
          this.tableData = rows || [];
          this.totalSize = totalSize || 0;
          this.loading = false;
          this.totalData = {
            amount: totalAmount,
            balanceAmount: totalBalanceAmount,
            deductedAmount: totalDeductedAmount
          };
        })
        .catch(() => {
          this.loading = false;
        });
    },
    resetHandle() {
      this.searchData = {
        ...defaultSearch
      };
    },
    getSummaries(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "amount":
            sums[index] = this.totalData["amount"];
            break;
          case "deductedAmount":
            sums[index] = this.totalData["deductedAmount"];
            break;
          case "balanceAmount":
            sums[index] = this.totalData["balanceAmount"];
            break;
          default:
            break;
        }
      });
      return sums;
    },
    showDetail(row) {
      this.$emit("showDetail", row ? row.billNo : "");
    },
    charge(row) {
      // 明细的冲销登记需要
      const {
        id,
        companyId,
        cooperatorId,
        balanceAmount,
        cooperatorName
      } = row;
      const { billType } = this.rowData;
      this.charFormDisplay = {
        ...defaultChargeForm,
        deductType: "specific",
        billType,
        prevFundId: id,
        cooperatorName,
        commonBalance: balanceAmount,
        companyId,
        cooperatorId
      };
      this.chargeDialogVisible = true;
    },
    _handleSizeChange(page) {
      // 分页操作
      this.currentPage = page;
      this.loadData(page);
    }
  }
};
</script>

<style lang="scss" scoped>
.op-btns {
  color: #409eff;
  span {
    cursor: pointer;
  }
}
.edit-swap-group-parts {
  ::v-deep .el-table__footer-wrapper {
    .cell {
      text-align: left;
    }
  }
}
</style>
