export default {
  props: {
    query: {
      type: Object,
      default: () => {}
    },
    currentRow: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    currentRow(newVal) {
      this.selectedDetailsRows = newVal;
    },
    query: {
      handler: function(newVal) {
        this.localQuery = { ...newVal };
      },
      deep: true
    }
  },
  data() {
    return {
      selectedDetailsRows: [],
      rawData: [],
      tableData: [],
      page: 1,
      pageSize: 20,
      totalSize: 0,
      totalPage: 0,
      summaryData: {}
    };
  },
  mounted() {
    this.localQuery = { ...this.query };
    this.getDetails();
  },
  methods: {
    selectChange(row) {
      this.$emit("rowChange", row);
    },
    getSummaries(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "小计";
          return;
        }
        switch (column.property) {
          case "billNo":
            sums[index] = this.summaryData["totalSize"];
            break;
          case "settleAmount":
            sums[index] = this.summaryData["settleAmount"];
            break;
          case "discountAmount":
            sums[index] = this.summaryData["discountAmount"];
            break;
        }
      });
      return sums;
    },
    loadMore() {
      if (this.page >= this.totalPage) {
        console.log("没有更多了");
        return;
      }
      this.page++;
      this.getDetails();
    }
  }
};
