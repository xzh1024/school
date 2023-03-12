<script>
import ResizeBox from "@/components/resizeBox";
import Search from "./Search";
import TransferIn from "./TransferIn";
import TransferOut from "./TransferOut";

export default {
  name: "quotation",
  components: {
    ResizeBox,
    Search,
    TransferIn,
    TransferOut
  },
  props: {
    partId: {
      type: Number,
      default: null
    },
    header: {
      type: Object,
      default() {
        return {};
      }
    },
    isOut: Boolean
  },
  data() {
    return {
      inSearchData: {},
      outSearchData: {}
    };
  },
  methods: {
    onInSearchChange(searchData) {
      this.inSearchData = { ...searchData };
    },
    onOutSearchChange(searchData) {
      this.outSearchData = { ...searchData };
    }
  },
  render() {
    return (
      <ResizeBox defaultLen={282} is-column direction-contrary>
        <div slot="block1" class="container-box" style="height: 100%;">
          <ht-card no-padding title="调拨入库历史" class="auto-card">
            <Search
              onSearch={this.onInSearchChange}
              header={this.header}
              style="padding: 5px 0 3px 5px;"
            />
            <TransferIn
              partId={this.partId}
              searchData={this.inSearchData}
              style="height: calc(100% - 45px)"
            />
          </ht-card>
        </div>

        <div slot="block2" class="container-box" style="height: 100%;">
          <ht-card no-padding title="调拨出库历史" class="auto-card">
            <Search
              onSearch={this.onOutSearchChange}
              header={this.header}
              isOut
              style="padding: 5px 0 3px 5px;"
            />
            <TransferOut
              partId={this.partId}
              searchData={this.outSearchData}
              style="height: calc(100% - 45px);"
            />
          </ht-card>
        </div>
      </ResizeBox>
    );
  }
};
</script>
