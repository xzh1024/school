import { Component, Vue } from "vue-property-decorator";
import { FEES_BILL_STATUS } from "./constants";

@Component
export default class BtnDisableMixin extends Vue {
  // 默认设置为空值在外部设置值
  public get curData():
    | undefined
    | {
        status?: number;
        belongs?: string[];
      } {
    return {};
  }

  private get curBelongs() {
    return this.curData?.belongs;
  }
  private get curStatus() {
    return this.curData?.status;
  }
  private btnCanClick(status: number[]) {
    return status.includes(this.curStatus!);
  }

  protected get createDisabled() {
    return !this.hasBelongsPerm("createSubmit", ["our.self"]);
  }

  protected get delDisabled() {
    return !(
      this.btnCanClick([
        FEES_BILL_STATUS.unSubmit,
        FEES_BILL_STATUS.rejected
      ]) && this.hasBelongsPerm("delete", this.curBelongs)
    );
  }

  protected get updateDisabled() {
    return !(
      this.btnCanClick([
        FEES_BILL_STATUS.unSubmit,
        FEES_BILL_STATUS.rejected
      ]) && this.hasBelongsPerm("update", this.curBelongs)
    );
  }

  protected get submitDisabled() {
    return !(
      this.btnCanClick([
        FEES_BILL_STATUS.unSubmit,
        FEES_BILL_STATUS.rejected
      ]) && this.hasBelongsPerm("createSubmit", this.curBelongs)
    );
  }

  protected get recallDisabled() {
    return !(
      this.btnCanClick([FEES_BILL_STATUS.submited]) &&
      this.hasBelongsPerm("submitRecall", this.curBelongs)
    );
  }
  protected get auditDisabled() {
    return !(
      this.btnCanClick([FEES_BILL_STATUS.submited]) &&
      this.hasBelongsPerm("audit", this.curBelongs)
    );
  }

  protected get settleDisabled() {
    return !(
      this.btnCanClick([
        FEES_BILL_STATUS.unSettlement,
        FEES_BILL_STATUS.hasSettlement
      ]) && this.hasCompletePerm("financials.settlements.our.settle")
    );
  }
}
