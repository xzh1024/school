<script lang="tsx">
import { Component, Mixins, Prop } from "vue-property-decorator";
import PaginationDataMixin from "@/mixins/PaginationDataMixin";
import SearchForm from "./SearchForm.vue";
import { COMMUNION_MERGE_LOG_TABLE, MergeLogListFilters } from "./constants";
import MergeLogService from "./services";

@Component({
  components: { SearchForm }
})
export default class MergeLog extends Mixins(PaginationDataMixin) {
  public $refs!: {
    searchForm: SearchForm;
  };

  @Prop() readonly id!: number;
  @Prop() readonly keyScope!: symbol | string;

  private searchData: MergeLogListFilters = {};

  public searchHandle(params: MergeLogListFilters = this.searchData) {
    this.searchData = params;
    this.page = 1;
    this.refreshData();
  }

  protected loadData() {
    return MergeLogService.fetchList({
      ...this.searchData,
      page: this.page,
      pageSize: this.pageSize,
      coopId: this.id
    });
  }

  handleTableKeyCode(e: KeyboardEvent) {
    switch (e.code) {
      case "F5":
        this.$refs.searchForm?.searchHandle();
        break;
      case "F6":
        this.$refs.searchForm?.resetHandle();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div class="flex-container column-flex">
        <div class="flex-block-bg flex-block-margin flex-block-padding">
          <search-form ref="searchForm" onSearchChange={this.searchHandle} />
        </div>
        <div class="auto-block flex-block-bg flex-block-margin">
          <ht-setting-table
            table-name={COMMUNION_MERGE_LOG_TABLE.name}
            columns={COMMUNION_MERGE_LOG_TABLE.columns}
            pagination
            current-page={this.page}
            total={this.totalSize}
            data={this.tableData}
            loading={this.loading}
            onPageChange={this.pageChange}
            key-scope={this.keyScope}
            onHotkeysUp={this.handleTableKeyCode}
          />
        </div>
      </div>
    );
  }
}
</script>
