<script>
import ResizeBox from "@/components/resizeBox";
import Search from "./Search";
import Purchase from "./Purchase";
import Sales from "./Sales";

export default {
  name: "quotation",
  components: {
    ResizeBox,
    Purchase,
    Sales
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
    saleHeader: {
      type: Object,
      default() {
        return {};
      }
    },
    purchaseHeader: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      purchaseSearchData: {},
      salesSearchData: {}
    };
  },
  methods: {
    onPurchaseSearchChange(searchData) {
      this.purchaseSearchData = { ...searchData };
    },
    onSalesSearchChange(searchData) {
      this.salesSearchData = { ...searchData };
    }
  },
  render() {
    return (
      <ResizeBox defaultLen={282} is-column direction-contrary>
        <div slot="block1" style="height: 100%;">
          <Search
            onSearch={this.onPurchaseSearchChange}
            header={this.purchaseHeader}
            style="padding: 5px 0 3px 5px;"
          />
          <div class="container-box" style="height: calc(100% - 45px);">
            <ht-card no-padding title="询价历史" class="auto-card">
              <Purchase
                partId={this.partId}
                searchData={this.purchaseSearchData}
              />
            </ht-card>
          </div>
        </div>
        <div slot="block2" style="height: 100%;">
          <Search
            onSearch={this.onSalesSearchChange}
            header={this.saleHeader}
            isSales
            style="padding: 5px 0 3px 5px;"
          />
          <div class="container-box" style="height: calc(100% - 45px);">
            <ht-card no-padding title="报价历史" class="auto-card">
              <Sales partId={this.partId} searchData={this.salesSearchData} />
            </ht-card>
          </div>
        </div>
      </ResizeBox>
    );
  }
};
</script>
