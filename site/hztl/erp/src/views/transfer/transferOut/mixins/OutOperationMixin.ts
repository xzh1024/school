import { Component, Mixins } from "vue-property-decorator";
import OperationMixin from "@/views/transfer/mixins/OperationMixin";
import { openNewWindow } from "@/utils/tool";

@Component
export default class OutOperationMixin extends Mixins(OperationMixin) {
  protected printHandle() {
    if (this.printDisabled) {
      return;
    }
    openNewWindow(
      this.$router.resolve({
        path: `/Print/Transfer/Out/${this.curData?.id}`
      }).href,
      "print"
    );
  }
  protected goDetail(id?: number, create = false) {
    const query: {
      billId?: string;
      list?: string;
      time?: string;
    } = {
      billId: id?.toString()
    };
    if (create) {
      query.time = Date.now().toString();
      delete query.billId;
    }
    this.$router.replace({
      path: "./outDetail",
      query
    });
  }
}
