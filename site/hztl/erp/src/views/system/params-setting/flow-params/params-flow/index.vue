<script>
import PurchaseOrderFlow from "./PurchaseOrderFlow";
import PurchaseFlow from "./PurchaseFlow";
import PurchaseReturnFlow from "./PurchaseReturnFlow";
import SaleOrderFlow from "./SaleOrderFlow";
import SaleFlow from "./SaleFlow";
import SaleReturnFlow from "./SaleReturnFlow";
import SaleUrgentsConfirmFlow from "./SaleUrgentsConfirmFlow";
import StockTakingFlow from "./StockTakingFlow";
import ReceiveSettlementFlow from "./ReceiveSettlementFlow";
import LogisticReconciliationFlow from "./LogisticReconciliationFlow";

export default {
  name: "ParamsFlow",
  props: {
    paramsType: {
      type: String,
      required: true
    }
  },
  render() {
    return (
      <div>
        <PurchaseOrderFlow v-show={this.paramsType === "purchaseOrder"} />
        <PurchaseFlow v-show={this.paramsType === "purchase"} />
        <PurchaseReturnFlow v-show={this.paramsType === "purchaseReturn"} />
        <SaleOrderFlow v-show={this.paramsType === "saleOrder"} />
        <SaleFlow v-show={this.paramsType === "sale"} />
        <SaleReturnFlow v-show={this.paramsType === "saleReturn"} />
        <SaleUrgentsConfirmFlow v-show={this.paramsType === "urgent"} />
        <StockTakingFlow v-show={this.paramsType === "stockTaking"} />
        <ReceiveSettlementFlow
          v-show={this.paramsType === "receiveSettlement"}
        />
        <LogisticReconciliationFlow
          v-show={this.paramsType === "logisticReconciliation"}
        />
      </div>
    );
  }
};
</script>
