import { TABLE_COLUMN_PURCHASE_SUMMARY } from "@/constants/report/purchase";

export default {
  props: {
    query: {
      type: Object,
      default: () => {}
    },
    activetab: {
      type: Number,
      default: 1
    },
    currentRow: {
      type: Array,
      default: []
    }
  },
  watch: {
    activetab(newVal) {
      if (newVal === 1) {
        this.getSummary();
      } else {
        this.getGroups();
      }
    },
    currentRow(newVal) {
      this.selectedDetailsRows = newVal;
    },
    query: {
      handler: function(newVal) {
        this.initQuery(newVal);
      },
      deep: true
    }
  },
  computed: {
    columns() {
      return TABLE_COLUMN_PURCHASE_SUMMARY.columns;
    }
  },
  data() {
    return {
      selectedDetailsRows: [],
      pageDataByCode: {},
      localQuery: {},
      loading: false,
      pageSize: 20,
      totalSize: 0,
      page: 1,
      rawData: [],
      tableData: [],
      sumData: [],
      summaryData: [],
      detail: [], // 明细
      calTotalSize: 0,
      calTotalSettleAmount: 0,
      calTotalDiscountAmount: 0,
      totalTaxAmount: 0,
      totalTaxedAmount: 0,
      totalUntaxedAmount: 0,
      totalDiscountAmount: 0,
      totalSettleAmount: 0,
      totalThisPeriodSettleAmount: 0,
      totalThisPeriodDiscountAmount: 0,
      totalBills: 0
    };
  },
  mounted() {
    this.initQuery(this.query);
  },
  methods: {
    selectChange(row) {
      this.$emit("rowChange", row);
    },
    initQuery(query) {
      // 根据当前项目类型来处理请求参数
      const { billDate, companyIds, dateType1, statuses } = query;
      const startDate = this.formatTime(billDate[0]);
      const endDate = this.formatTime(billDate[1]);
      this.localQuery = {
        companyIds,
        startDate,
        endDate,
        dateType: dateType1,
        statuses
      };
    },
    formatTime(date) {
      let nowYear = new Date(date).getFullYear().toString();
      let nowMonth = (new Date(date).getMonth() + 1).toString();
      let nowDay = new Date(date).getDate().toString();
      function timeAdd0(str) {
        if (str.length <= 1) {
          str = "0" + str;
        }
        return str;
      }
      nowYear = timeAdd0(nowYear);
      nowMonth = timeAdd0(nowMonth);
      nowDay = timeAdd0(nowDay);
      return nowYear + "-" + nowMonth + "-" + nowDay;
    },
    // 生成合计
    getSummaries(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        switch (column.property) {
          case "billCount":
            sums[index] = this.summaryData["billCount"];
            break;
          case "financialBillCount":
            sums[index] = this.summaryData["financialBillCount"];
            break;
          case "untaxedAmount":
            sums[index] = this.summaryData["untaxedAmount"];
            break;
          case "taxAmount":
            sums[index] = this.summaryData["taxAmount"];
            break;
          case "taxedAmount":
            sums[index] = this.summaryData["taxedAmount"];
            break;
          case "thisPeriodSettleAmount":
            sums[index] = this.summaryData["thisPeriodSettleAmount"];
            break;
          case "thisPeriodDiscountAmount":
            sums[index] = this.summaryData["thisPeriodDiscountAmount"];
            break;
          case "settleAmount":
            sums[index] = this.summaryData["settleAmount"];
            break;
          case "discountAmount":
            sums[index] = this.summaryData["discountAmount"];
            break;
          default:
            break;
        }
      });
      return sums;
    }
  }
};
