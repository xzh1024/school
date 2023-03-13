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
        this.getDetails();
      },
      deep: true
    }
  },
  data() {
    return {
      localQuery: {},
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
    getSummaries() {
      const sum = [];
      for (const key in this.summaryData) {
        sum.push(this.summaryData[key]);
      }
      return sum;
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
