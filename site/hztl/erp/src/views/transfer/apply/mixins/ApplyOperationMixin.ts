import { Component, Mixins } from "vue-property-decorator";
import OperationMixin from "@/views/transfer/mixins/OperationMixin";
import { openNewWindow } from "@/utils/tool";

@Component
export default class ApplyOperationMixin extends Mixins(OperationMixin) {
  protected get createDisabled() {
    return !this.hasBelongsTagsPerm("create");
  }
  protected get readDisabled() {
    return !this.hasBelongsTagsPerm("read");
  }

  protected cancelBoxVisible = false;
  protected cancelBillPart() {
    if (this.cancelDisabled) {
      return;
    }
    this.cancelBoxVisible = true;
  }

  protected transferBoxVisible = false;
  protected transOutBill() {
    if (this.transDisabled) {
      return;
    }
    this.transferBoxVisible = true;
  }

  protected printHandle() {
    if (this.printDisabled) {
      return;
    }
    openNewWindow(
      this.$router.resolve({
        path: `/Print/Transfer/Apply/${this.curData?.id}`
      }).href,
      "print"
    );
  }

  protected goDetail(id?: number) {
    this.$router.push({
      path: "./applyDetail",
      query: {
        billId: id?.toString(),
        time: new Date().getTime().toString()
      }
    });
  }
  protected goDetailAudit(id: number) {
    this.$router.push({
      path: "./applyDetailAudit",
      query: {
        billId: id?.toString(),
        time: new Date().getTime().toString()
      }
    });
  }
  protected gotoList() {
    this.$router.push({
      path: "./applyList"
    });
  }
}
