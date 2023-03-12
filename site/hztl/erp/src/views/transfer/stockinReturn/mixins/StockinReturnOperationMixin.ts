import { Component, Mixins } from "vue-property-decorator";
import OperationMixin from "@/views/transfer/mixins/OperationMixin";
import { openNewWindow } from "@/utils/tool";
import { InformationRow, SettlData } from "@/components/business/interface";

@Component
export default class StockinReturnOperationMixin extends Mixins(
  OperationMixin
) {
  protected printBill() {
    if (this.printDisabled) {
      return;
    }
    openNewWindow(
      this.$router.resolve({
        path: `/Print/Transfer/StorageReturn/${this.curData?.id}`
      }).href,
      "print"
    );
  }

  protected settleDialogVisible = false;
  protected settleData: SettlData = {
    id: 0,
    billType: "",
    billNo: "",
    cooperatorId: 0,
    enhancedSettlementType: "",
    amount: 0,
    discountAmount: 0
  };
  protected settleList: InformationRow[] = [];
  protected settleBill() {
    if (this.settleDisabled) {
      return;
    }
    this.settleData = {
      id: this.curData?.id || 0,
      billType: this.curData?.type || "",
      billNo: this.curData?.billNo,
      cooperatorId: this.curData?.relatedBill?.companyId,
      enhancedSettlementType: this.curData?.paymentType || "",
      amount: this.curData?.amount || 0,
      discountAmount: 0
    };
    this.settleList = [
      {
        name: "单号",
        content: this.curData?.billNo
      },
      {
        type: "billType"
      },
      {
        name: "往来公司",
        content: this.curData?.relatedBill?.companyName
      },
      {
        type: "amount"
      },
      {
        type: "settledAmount"
      },
      // {
      //   type: "discountAmount"
      // },
      {
        type: "unSettledAmount"
      }
    ];
    this.settleDialogVisible = true;
  }
}
