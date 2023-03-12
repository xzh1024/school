<script>
import { pick } from "lodash";
import hotkeys from "hotkeys-js";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { getKeys } from "@/utils/tool";
import { updateCompanySystemParamsDetail } from "@/api/base/base";
import Form from "./Form";
import PrintView from "./PrintView";
import {
  getSalesPrintGoodsLabelInfo,
  getPurchaseReturnPrintGoodsLabelInfo,
  getTransferPrintGoodsLabelInfo,
  getLogisticsDeliverReturnPrintGoodsLabelInfo
} from "./services";

let oldKeyScope;
const topHotkeys = new TopHotkeys();
const defaultFormData = {
  cooperatorName: "",
  receiverName: "",
  receiverPhone: "",
  receiverAreaId: null,
  receiverAreaNames: [],
  receiverAddress: "",

  senderName: "",
  senderPhone: "",
  senderAreaId: null,
  senderAreaNames: [],
  senderAddress: "",

  name: "",
  nums: 1,
  qty: 1,
  billAmount: 0,

  remark: "",
  customText: ""
};

export default {
  name: "PrintGoodsLabelBox",
  components: {
    Form,
    PrintView
  },
  props: {
    visible: Boolean,
    value: {
      type: Object,
      required: true
    },
    isReturn: Boolean,
    showQrCode: Boolean
  },
  data() {
    return {
      formData: { ...defaultFormData }
    };
  },
  computed: {
    viewlist() {
      const viewlist = [];
      let total = 1;
      if (this.formData.nums) {
        total = Number(this.formData.nums);
      }
      for (let i = 1; i <= total; i++) {
        viewlist.push({ ...this.formData, nums: `${i}/${total}` });
      }
      return viewlist;
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val) {
        oldKeyScope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el);
        this.initData();
      } else if (oldVal) {
        topHotkeys.unbindHotkeys(this.$el);
        hotkeys.setScope(oldKeyScope);
      }
    }
  },
  mounted() {
    window.addEventListener("afterprint", this.removePrinView);
  },
  destroyed() {
    window.removeEventListener("afterprint", this.removePrinView);
  },
  methods: {
    initData() {
      let loadFomData = null;
      switch (this.value.billType) {
        case "XS":
          loadFomData = getSalesPrintGoodsLabelInfo;
          break;
        case "CT":
          loadFomData = getPurchaseReturnPrintGoodsLabelInfo;
          break;
        case "KD":
        case "RT":
          loadFomData = getTransferPrintGoodsLabelInfo;
          break;
        case "FHDJ":
          loadFomData = getLogisticsDeliverReturnPrintGoodsLabelInfo;
          break;
        default:
          break;
      }
      loadFomData(this.value).then(res => {
        this.formData = {
          ...defaultFormData,
          ...pick(res, getKeys(defaultFormData))
        };
      });
      setTimeout(() => {
        this.$refs.form?.clearValid();
      });
    },
    printHandle(e) {
      e?.stopPropagation();
      if (!this.$refs.form?.getValid()) {
        return;
      }
      this.setPrinView();
      setTimeout(() => {
        window.print();
      });
      updateCompanySystemParamsDetail({
        module: "common",
        type: "billPrintCustomContent",
        value: this.formData.customText
      });
    },
    setPrinView() {
      const style = document.createElement("style");
      const isMac = navigator.platform.includes("Mac");
      const warp = document.getElementsByClassName("print-view-item")[0];
      const clientHeight = warp?.clientHeight || 0;
      const printViewStyle = `{ height: calc(${clientHeight}px + 1px) !important; margin-left: ${
        isMac ? 0 : 1.48
      }mm !important }`;
      style.innerText = `@media print { .print-view-item ${printViewStyle} }`;
      document.head.append(style);
      this.createPrinView();
    },
    createPrinView() {
      const body = this.getBody();
      const printDivs = this.getPrintDivs();
      const printDiv = printDivs[printDivs.length - 1].cloneNode(true);
      printDiv.style.cssText = "display: none";
      body.append(printDiv);
    },
    removePrinView() {
      const body = this.getBody();
      const lastNode = body.childNodes[body.childNodes.length - 1];
      if (lastNode.getAttribute("class").includes("print-view")) {
        body.removeChild(lastNode);
      }
      const printDivs = this.getPrintDivs();
      const printDiv = printDivs[printDivs.length - 1];
      if (printDiv.parentNode == body) {
        body.removeChild(printDiv);
      }
    },
    getBody() {
      return document.getElementsByTagName("body")[0];
    },
    getPrintDivs() {
      return document.getElementsByClassName("print-view");
    },
    closeBox(e) {
      e?.stopPropagation();
      this.$emit("update:visible", false);
      this.$emit("close", false);
    }
  },
  render() {
    return (
      <ht-dialog
        visible={this.visible}
        on-close={this.closeBox}
        append-to-body
        title="发货标签打印"
        top="50px"
        width="1300px"
        class="dialog-body ignore-top-hotkeys"
      >
        <div class="flex-container block-container">
          <div class="flex-block-bg flex-block-padding auto-block flex-container column-flex print-content-block">
            <div class="ht-page-title page-title-divider">打印内容设置</div>

            <div class="auto-block">
              <Form ref="form" v-model={this.formData} />
            </div>
          </div>

          <div class="flex-block-bg flex-block-padding auto-block flex-container column-flex print-view-block">
            <div class="ht-page-title page-title-divider">打印预览</div>

            <div class="auto-block flex-container column-flex print-view-container">
              <div class="auto-block print-view">
                {this.viewlist.map((item, index) => (
                  <PrintView
                    value={item}
                    bill={this.value}
                    showQrCode={this.showQrCode}
                    key={index}
                  />
                ))}
              </div>

              <div class="text-font-danger">
                * 请注意，目前支持标签尺寸为 100mm*100mm
              </div>
              <div class="button-container">
                <el-button
                  type="primary"
                  size="mini"
                  plain
                  on-click={e => this.printHandle(e)}
                >
                  打印（F11）
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  plain
                  on-click={e => this.closeBox(e)}
                >
                  取消（Esc）
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </ht-dialog>
    );
  }
};
</script>

<style lang="scss" scoped>
.dialog-body {
  &::v-deep .el-dialog__body {
    padding: 5px;
    background-color: #e7ebed;
  }

  .block-container {
    margin: 0;
    padding: 0;
    height: 640px;

    .print-content-block,
    .print-view-block {
      border-radius: 4px;
    }

    .print-content-block {
      flex: none;
      margin-right: 5px;
      width: 450px;
    }

    .print-view-block {
      min-height: 100%;

      .print-view-container {
        min-width: calc(100% - 56px);

        .print-view {
          min-width: calc(100% - 34px);
          margin-bottom: 10px;
          overflow: auto;
          background-color: #000000;
        }
      }

      .button-container {
        margin-top: -24px;
        margin-left: 5px;
        text-align: center;
      }
    }
  }
}
</style>

<style lang="scss">
@media print {
  @page {
    margin: 0;
  }

  #app,
  #qimo_chatpup,
  #chatBtn,
  #qimo_showNewMsg,
  #qimo_inviteBox,
  #qimo_screenpop,
  #qimo_videopup,
  .v-modal,
  .el-dialog__wrapper,
  .el-message {
    display: none !important;
  }

  body {
    margin: 0 !important;
    padding: 0 !important;

    .print-view {
      display: block !important;
      margin: 0 !important;
      padding: 0 !important;

      .print-view-item {
        margin: 0 !important;
        width: 100mm !important;
        height: 100mm !important;
      }
    }
  }
}
</style>
