<script>
import {
  YX_INVOICE_TREE,
  BASE_INVOICE_TREE,
  INVOICE_TYPE_EMUN
} from "../constants";
import TemsContainer from "./tems-container";
import { isYx } from "@/utils/store";
import VideoPopover from "@/components/VideoPopover";

const videoUrl = "https://dl.hztl3.com/videos/yp_videos/print_templates.mp4";
const videoPopoverRemark =
  "单据打印模板页面，用户可根据自己的需求对各种业务单据的打印模板进行自定义设置，每个单据都提供默认模版供参考。";

const defaultProps = {
  label(data) {
    return INVOICE_TYPE_EMUN[data.key];
  }
};

export default {
  components: { VideoPopover },
  computed: {
    invoicesTreeRef() {
      return this.$refs.invoicesTree;
    },
    hasYx() {
      return isYx();
    },
    invoicesTreeData() {
      return this.hasYx
        ? [...BASE_INVOICE_TREE, ...YX_INVOICE_TREE]
        : [...BASE_INVOICE_TREE];
    }
  },
  data() {
    return {
      currentInvoiceKey: ""
    };
  },
  mounted() {
    this.currentInvoiceKey = this.invoicesTreeData[0].children[0].key;
  },
  activated() {
    this.currentInvoiceKey = this.invoicesTreeData[0].children[0].key;
  },
  methods: {
    handleCheckedChange(current) {
      if (!current.disabled) {
        this.currentInvoiceKey = current.key;
        this.$refs.invoicesTree.setCheckedKeys([this.currentInvoiceKey]);
      }
    }
  },
  render() {
    return (
      <div class="invoice-container flex-container">
        <div class="list-card">
          <div class="ht-page-title">模板类型</div>
          <div class="divider"></div>
          <el-tree
            ref="invoicesTree"
            class="ht-single-tree"
            data={this.invoicesTreeData}
            attrs={{
              props: defaultProps
            }}
            // default-expand-all
            default-expanded-keys={["purchase"]}
            node-key="key"
            on-node-click={this.handleCheckedChange}
            default-checked-keys={[this.currentInvoiceKey]}
          />
        </div>
        <TemsContainer type={this.currentInvoiceKey} class="auto-block" />
        <VideoPopover
          videoUrl={videoUrl}
          remark={videoPopoverRemark}
          class="video-popover"
        />
      </div>
    );
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var.scss";

.invoice-container {
  width: 100%;
  height: 100%;
  padding: 5px;
  position: relative;

  ::v-deep .divider {
    height: 1px;
    width: 100%;
    background-color: $border-color-base;
    margin-bottom: 5px;
  }

  .video-popover {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}

.list-card {
  width: 170px;
  height: 100%;
  flex: none;
  background: #fff;
  overflow-y: hidden;

  .ht-page-title {
    margin: 5px;
  }

  .ht-single-tree {
    height: calc(100% - 40px);
    overflow-y: auto;
  }
}
</style>
