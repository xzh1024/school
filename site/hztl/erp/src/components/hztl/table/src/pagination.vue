<script>
import { DEFAULT_CURRENT_PAGE } from "@/constants";
import { mapState } from "vuex";

export default {
  name: "HtPagination",
  componentName: "HtPagination",
  computed: {
    ...mapState("admin/table", ["pageSize", "pageSizeList", "layout"])
  },
  methods: {
    handleSizeChange(size) {
      this.$store.commit("admin/table/changePageSize", size);
      this.pageChangeHandle(DEFAULT_CURRENT_PAGE);
    },
    pageChangeHandle(page) {
      this.$emit("pageChange", page);
    }
  },
  render() {
    return (
      <div class="pagination">
        <div class="before-pagination">
          {this.$scopedSlots.default && this.$scopedSlots.default()}
        </div>
        <el-pagination
          ref="pagination"
          attrs={this.$attrs}
          page-sizes={this.pageSizeList}
          pageSize={this.pageSize}
          layout={this.layout}
          on-current-change={this.pageChangeHandle}
          on-size-change={this.handleSizeChange}
        />
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.pagination {
  background-color: $color-content-bg;
  @include background_color("color-content-bg");
  display: flex;
  justify-content: flex-end;
  border: 1px solid $border-color-table;
  @include border_color("border-color-table");
  border-top: 0px;

  ::v-deep .el-pagination * {
    flex: none;
    background-color: $color-content-bg;
    @include background_color("color-content-bg");
  }

  .before-pagination {
    flex: auto;
    height: 1px;
  }
}
</style>
