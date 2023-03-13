<script>
import ResizeBox from "@/components/resizeBox";
import Search from "./Search";
import Bill from "./Bill";
import Order from "./Order";

export default {
  name: "Purchase",
  components: {
    ResizeBox,
    Search,
    Bill,
    Order
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
    }
  },
  data() {
    return {
      searchData: {}
    };
  },
  methods: {
    onSearchChange(searchData) {
      this.searchData = { ...searchData };
    }
  },
  render() {
    return (
      <ResizeBox defaultLen={282} is-column direction-contrary>
        <div slot="block1" style="height: 100%;">
          <Search
            onSearch={this.onSearchChange}
            header={this.header}
            style="padding: 5px 0 3px 5px;"
          />
          <div class="container-box" style="height: calc(100% - 45px);">
            <ht-card no-padding title="采购单" class="auto-card">
              <Bill partId={this.partId} searchData={this.searchData} />
            </ht-card>
          </div>
        </div>
        <div slot="block2" class="container-box" style="height: 100%;">
          <ht-card no-padding title="未转入库订货计划" class="auto-card">
            <Order partId={this.partId} searchData={this.searchData} />
          </ht-card>
        </div>
      </ResizeBox>
    );
  }
};
</script>
