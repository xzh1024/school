<template>
  <div style="height:80%">
    <ht-card>
      <el-form
        :model="searchData"
        label-position="left"
        label-width="60px"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="15" style="width:100%">
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
                v-model="searchData.chargeTimeRange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="单据号">
              <ht-input
                v-model="searchData.billNo"
                class="switch-focus focus-phone"
                placeholder="请输入冲销单号/预收单号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="冲销单类型" label-width="80px">
              <ht-select
                v-model="searchData.sourceBillTypes"
                :options="billTypeOption"
                placeholder="冲销单类型"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="冲销单状态" label-width="80px">
              <ht-select
                v-model="searchData.settleStatuses"
                :options="SETTLE_STATUS"
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
        <el-row :gutter="20" style="width:100%"> </el-row>
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
      class="dialog-body ignore-top-hotkeys"
      width="350px"
      append-to-body
    >
      <CharDialog
        :defaultForm="charFormDisplay"
        :type="type"
        :fromDetail="true"
        @submitForm="chargeDialogVisible = false"
        @hide="chargeDialogVisible = false"
      />
    </ht-dialog>
  </div>
</template>

<script>
import {
  SETTLE_STATUS,
  BILL_SATUS,
  PREPAY_ORIGIN
} from "@/views/finance/constans";
import eventBus from "@/event";
import { BILL_TYPE, YX_BILL_TYPE } from "../const/billType";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { chargeDetail } from "@/api/finance/prevFunds";
import { CHARGE_STATUS } from "@/views/finance/constans";
import CharDialog from "./charDialog";
import { dateFormat } from "@/utils/date";
import { mapGetters, mapState } from "vuex";
import * as store from "@/utils/store";
const defaultSearch = {
  timeType: 1,
  billNo: "",
  sourceBillTypes: [],
  chargeTimeRange: [],
  settleTimeRange: [],
  settleStatuses: ["toSettle", "partialSettle", "settled"]
};
// 冲销登记弹窗的默认填充内容
const defaultChargeForm = {
  billType: "YF",
  billNo: "",
  deductType: "relationship",
  prevFundId: null,
  companyId: "",
  cooperatorId: "",
  commonBalance: null,
  amount: null,
  settleDate: "",
  voucherCode: "",
  paymentBy: "",
  remark: ""
};
export default {
  props: {
    summaryData: {
      type: Object,
      default: () => {}
    },
    billNo: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "YS"
    }
  },
  watch: {
    summaryData: {
      handler: function(val) {
        this.rowData = { ...val };
        this.loadData();
      },
      deep: true
    },
    billNo(newVal) {
      this.searchData.billNo = newVal || "";
      this.localBillNo = newVal || "";
      this.loadData();
    },
    type() {
      this.loadData();
    },
    billQueryDefaultDateRange(val) {
      defaultSearch.chargeTimeRange = val;
      defaultSearch.settleTimeRange = val;
      this.searchData.chargeTimeRange = val;
      this.searchData.settleTimeRange = val;
    }
  },
  computed: {
    ...mapGetters("admin/systemParams", ["billQueryDefaultDateRange"]),
    ...mapState("admin/table", ["pageSize"])
  },
  components: {
    CharDialog
  },
  data() {
    return {
      SETTLE_STATUS,
      BILL_SATUS,
      PREPAY_ORIGIN,
      BILL_TYPE,
      YX_BILL_TYPE,
      billTypeOption: [],
      chargeDialogVisible: false,
      localBillNo: "",
      charFormDisplay: {},
      dateTypeOptions: [
        { id: 1, name: "结算日期" },
        { id: 2, name: "冲销日期" }
      ],
      rowData: {},
      searchData: {
        ...defaultSearch
      },
      loading: false,
      currentPage: 1,
      page: 1,
      totalSize: 0,
      tableData: [],
      totalData: {},
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
          prop: "billNo",
          label: "冲销单号",
          width: CELL_WIDTH.personName
        },
        {
          prop: "settleStatus",
          label: "冲销单状态",
          width: CELL_WIDTH.personName,
          formatter: value => {
            return SETTLE_STATUS.find(item => item.id === value).name;
          }
        },
        {
          prop: "amount",
          label: "冲销金额",
          width: CELL_WIDTH.personName
        },
        {
          prop: "createdAt",
          label: "冲销登记日期",
          width: CELL_WIDTH.personName,
          type: "time"
        },
        {
          prop: "createdByName",
          label: "冲销登记人",
          width: CELL_WIDTH.personName
        },
        {
          prop: "settleDate",
          label: "冲销日期",
          width: CELL_WIDTH.personName,
          formatter: value => {
            return dateFormat(value);
          }
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
            return YX_BILL_TYPE[value] || "-";
          }
        },
        {
          prop: "settleByName",
          label: "冲销结算人",
          width: CELL_WIDTH.personName
        },
        {
          prop: "remark",
          label: "冲销备注",
          width: CELL_WIDTH.personName
        },
        {
          prop: "a",
          label: "预收单号",
          width: CELL_WIDTH.personName,
          formatter: (_, row) => {
            const { header } = row;
            return header ? header.billNo : "";
          }
        },
        {
          prop: "b",
          label: "冲销状态",
          width: CELL_WIDTH.personName,
          formatter: (_, row) => {
            const { header } = row;
            if (!header) {
              return "";
            }
            const statu = CHARGE_STATUS.find(
              item => item.id === header.deductStatus
            );
            // return CHARGE_STATUS.find(item => item.id === header.deductStatus).name;
            return statu ? statu.name : "";
          }
        },
        {
          prop: "c",
          label: "预付登记人",
          width: CELL_WIDTH.personName,
          formatter: (_, row) => {
            const { header } = row;
            return header ? header.createdByName : "";
          }
        },
        {
          prop: "d",
          label: "预付登记日期",
          width: CELL_WIDTH.personName,
          formatter: (_, row) => {
            const { header } = row;
            return header ? dateFormat(header.createdAt) : "";
          }
        },
        {
          prop: "e",
          label: "预付备注",
          width: CELL_WIDTH.personName,
          formatter: (_, row) => {
            const { header } = row;
            return header ? header.remark : "";
          }
        },
        {
          prop: "f",
          label: "预付最后结算人",
          width: CELL_WIDTH.personName,
          formatter: (_, row) => {
            const { header } = row;
            return header ? header.settleByName : "";
          }
        },
        {
          prop: "g",
          label: "最后结算时间",
          width: CELL_WIDTH.personName,
          formatter: (_, row) => {
            const { header } = row;
            return header ? dateFormat(header.settleDate) : "";
          }
        }
      ]
    };
  },
  mounted() {
    // 设置默认时间
    defaultSearch.chargeTimeRange = this.billQueryDefaultDateRange;
    defaultSearch.settleTimeRange = this.billQueryDefaultDateRange;
    this.searchData.chargeTimeRange = this.billQueryDefaultDateRange;
    this.searchData.settleTimeRange = this.billQueryDefaultDateRange;
    this.rowData = { ...this.summaryData };
    this.searchData.billNo = this.billNo || "";
    this.localBillNo = this.billNo || "";
    this.initBillTypesOption();
    this.loadData();
  },
  methods: {
    initBillTypesOption() {
      const defaultOptions = [];
      const options = [];
      const TYPE =
        store.isYx() && this.type == "YS" ? this.YX_BILL_TYPE : this.BILL_TYPE;
      for (const key in TYPE) {
        if (Object.hasOwnProperty.call(TYPE, key)) {
          const value = TYPE[key];
          defaultOptions.push(key);
          options.push({
            id: key,
            name: value
          });
        }
      }
      this.searchData.sourceBillTypes = defaultOptions;
      this.billTypeOption = options;
    },
    reset() {
      this.tableData = [];
      this.resetHandle();
    },
    loadData() {
      this.columns[11].label = this.type == "YS" ? "预收单号" : "预付单号";
      this.columns[13].label = this.type == "YS" ? "预收登记人" : "预付登记人";
      this.columns[14].label =
        this.type == "YS" ? "预收登记日期" : "预付登记日期";
      this.columns[15].label = this.type == "YS" ? "预收备注" : "预付备注";
      this.columns[16].label =
        this.type == "YS" ? "预收最后结算人" : "预付最后结算人";
      this.loading = true;
      const { page, pageSize } = this;
      const {
        timeType,
        settleStatuses,
        sourceBillTypes,
        settleTimeRange,
        chargeTimeRange,
        billNo
      } = this.searchData;
      const { billType, companyId, cooperatorId } = this.rowData;
      if (!billType) {
        return;
      }
      const convertObj = {
        YS: "TS",
        YF: "TF"
      };
      const query = {
        billType: convertObj[billType],
        companyIds: [companyId],
        cooperatorIds: [cooperatorId],
        settleStatuses,
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
          createdAtStart: chargeTimeRange[0],
          createdAtEnd: chargeTimeRange[1]
        };
      }
      chargeDetail(finalQuery)
        .then(res => {
          const { rows, totalSize, totalAmount } = res;
          this.tableData = rows || [];
          this.totalSize = totalSize || 0;
          this.loading = false;
          this.totalData = {
            amount: totalAmount
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
          default:
            break;
        }
      });
      return sums;
    },
    showDetail(row) {
      this.$emit("showDetail", row.id);
    },
    charge(row) {
      // 明细的冲销登记需要
      const { id, companyId, cooperatorId } = row;
      const { billType } = this.rowData;
      this.charFormDisplay = {
        ...defaultChargeForm,
        billType,
        prevFundId: id,
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
