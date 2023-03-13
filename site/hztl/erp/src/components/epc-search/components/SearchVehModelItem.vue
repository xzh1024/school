<script>
export default {
  name: "SearchVehModelItem",
  props: {
    totalData: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    listTypes: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      searchData: "",
      list: []
    };
  },
  watch: {
    totalData(val) {
      if (val && val.length) {
        this.getFilteredList();
      } else {
        this.list = [];
      }
    }
  },
  methods: {
    handleItemClick(row, e) {
      if (e) {
        e.stopPropagation();
      }
      if (this.title === this.listTypes.otherAttribute) {
        if (!row.isActived) {
          this.list = this.list.map(item => ({
            ...item,
            isActived: row.id === item.id
          }));
        }
        this.$emit("change", row, this.title);
      } else {
        if (!row.isActived) {
          this.list = this.list.map(item => ({
            ...item,
            isActived: row.id === item.id
          }));
          this.$emit("change", row, this.title);
        }
      }
    },
    searchHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.getFilteredList();
    },
    getFilteredList() {
      this.searchData = this.searchData.replace(/\s*/g, "");
      if (this.searchData) {
        this.list = this.totalData.filter(
          item =>
            item.name.indexOf(this.searchData) > -1 ||
            (item.mnemonic &&
              item.mnemonic.indexOf(this.searchData.toUpperCase()) > -1)
        );
      } else {
        this.list = this.totalData.map((item, index) => ({
          ...item,
          id: index + 1,
          isActived: false
        }));
      }
    },
    clearData() {
      this.searchData = "";
    }
  },

  render() {
    return (
      <ht-card
        title={this.title}
        no-padding
        no-background
        class="block-container"
      >
        <ht-input
          v-model={this.searchData}
          placeholder="请输入查询条件"
          size="mini"
        >
          <el-button
            slot="append"
            size="mini"
            icon="el-icon-search"
            class="search-btn"
            on-click={e => this.searchHandle(e)}
          />
        </ht-input>
        <div class="list-container">
          {this.list.map(item => (
            <div
              class={
                item.isActived
                  ? "list-item text-font-primary background-primary"
                  : "list-item"
              }
              on-click={e => this.handleItemClick(item, e)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </ht-card>
    );
  }
};
</script>

<style lang="scss" scoped>
.block-container {
  margin-left: 5px;
  height: 100%;
  border: solid 1px #dcdfe6;

  &::v-deep .el-card__body {
    height: calc(100% - 30px);
  }

  .search-btn {
    padding: 12px;
    width: 30px;
  }

  .list-container {
    height: calc(100% - 35px);
    overflow-y: auto;

    .list-item {
      padding: 5px 0;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
