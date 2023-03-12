<script>
import Purchase from "./purchase";
import Sales from "./sales";
import Quotation from "./quotation";
import SalesVolume from "./salesVolume";
import BranchStock from "./branchStock";
import Transfer from "./transfer";

export default {
  name: "PartsInfoSearch",
  components: {
    Purchase,
    Sales,
    Quotation,
    SalesVolume,
    BranchStock,
    Transfer
  },
  props: {
    partId: {
      type: Number,
      default: null
    },
    resetedActiveTab: {
      type: [Number, String, Symbol],
      default: "Purchase"
    },
    header: {
      type: Object,
      default() {
        return {};
      }
    },
    type: {
      // purchase || sale ,销售传过来的cooperateId为客户，不初始化供应商
      type: String,
      default: ""
    }
  },
  watch: {
    header: {
      handler(val) {
        const isSale = this.type === "sale";
        if (isSale) {
          this.saleHeader = { ...val };
          this.purchaseHeader = { ...val, cooperatorId: 0, cooperatorName: "" };
        } else {
          this.purchaseHeader = { ...val };
          this.saleHeader = { ...val, cooperatorId: 0, cooperatorName: "" };
        }
      },
      deep: true
    },
    sale: {
      handler(val) {
        const isSale = val === "sale";
        if (isSale) {
          this.saleHeader = { ...this.header };
          this.purchaseHeader = {
            ...this.header,
            cooperatorId: 0,
            cooperatorName: ""
          };
        } else {
          this.purchaseHeader = { ...this.header };
          this.saleHeader = {
            ...this.header,
            cooperatorId: 0,
            cooperatorName: ""
          };
        }
      }
    }
  },
  data() {
    return {
      activeTab: this.resetedActiveTab,
      tabs: [
        { id: "Purchase", name: "采购历史" },
        { id: "Sales", name: "销售历史" },
        { id: "Quotation", name: "询报价历史" },
        { id: "SalesVolume", name: "每月销量" },
        { id: "BranchStock", name: "分公司库存" },
        { id: "Transfer", name: "调拨历史" }
      ],
      purchaseHeader: {},
      saleHeader: {}
    };
  },
  mounted() {
    this.activeTab = this.resetedActiveTab;
    const isSale = this.type === "sale";
    if (isSale) {
      this.saleHeader = { ...this.header };
      this.purchaseHeader = {
        ...this.header,
        cooperatorId: 0,
        cooperatorName: ""
      };
    } else {
      this.purchaseHeader = { ...this.header };
      this.saleHeader = {
        ...this.header,
        cooperatorId: 0,
        cooperatorName: ""
      };
    }
  },
  render() {
    return (
      <div style="height: calc(100% - 36px);">
        <ht-tabs
          v-model={this.activeTab}
          tabs={this.tabs}
          class="tabs-regular"
          style="margin: 0;"
        />
        <Purchase
          v-show={this.activeTab === "Purchase"}
          partId={this.partId}
          header={this.purchaseHeader}
        />
        <Sales
          v-show={this.activeTab === "Sales"}
          partId={this.partId}
          header={this.saleHeader}
        />
        <Quotation
          v-show={this.activeTab === "Quotation"}
          partId={this.partId}
          header={this.header}
          purchaseHeader={this.purchaseHeader}
          saleHeader={this.saleHeader}
        />
        <SalesVolume
          v-show={this.activeTab === "SalesVolume"}
          partId={this.partId}
        />
        <BranchStock
          v-show={this.activeTab === "BranchStock"}
          partId={this.partId}
        />
        <Transfer
          v-show={this.activeTab === "Transfer"}
          partId={this.partId}
          header={this.header}
        />
      </div>
    );
  }
};
</script>
