<script>
import ResizeBox from "@/components/resizeBox";
import Search from "./Search";
import Sum from "./Sum";
import Detail from "./Detail";

export default {
  name: "BranchStock",
  components: {
    ResizeBox,
    Search,
    Sum,
    Detail
  },
  props: {
    partId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      searchData: {},
      companyId: null
    };
  },
  methods: {
    onSearchChange(searchData) {
      this.searchData = { ...searchData };
    },
    handleSumRowsChange(rows) {
      this.companyId = rows && rows.length ? rows[0].companyId : null;
    }
  },
  render() {
    return (
      <ResizeBox defaultLen={282} is-column direction-contrary>
        <div slot="block1" style="height: 100%;">
          <Search
            onSearch={this.onSearchChange}
            style="padding: 5px 0 3px 5px;"
          />
          <div class="container-box" style="height: calc(100% - 45px);">
            <ht-card no-padding title="库存汇总" class="auto-card">
              <Sum
                partId={this.partId}
                searchData={this.searchData}
                on-rows-change={this.handleSumRowsChange}
              />
            </ht-card>
          </div>
        </div>
        <div slot="block2" class="container-box" style="height: 100%;">
          <ht-card no-padding title="库存明细" class="auto-card">
            <Detail partId={this.partId} companyId={this.companyId} />
          </ht-card>
        </div>
      </ResizeBox>
    );
  }
};
</script>
