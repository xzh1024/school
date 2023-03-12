import { Component, Mixins } from "vue-property-decorator";
import OperationMixin from "@/views/transfer/mixins/OperationMixin";
import { openNewWindow } from "@/utils/tool";

@Component
export default class StorageOperationMixin extends Mixins(OperationMixin) {
  protected printHandle() {
    if (this.printDisabled) {
      return;
    }
    openNewWindow(
      this.$router.resolve({
        path: `/Print/Transfer/Storage/${this.curData?.id}`
      }).href,
      "print"
    );
  }
}
