<script>
import BillPanel from "@/components/bill-panel/BillPanel";
import FormMixin from "@/mixins/FormMixin";
import { add, subtract } from "@/utils/numberAPI";
import { openNewWindow } from "@/utils/tool";
import { PRINT_LABEL_MAX, PRINT_LABEL_TIPS } from "@/constants";

export const PART_DETAIL_ENUM = [
  { label: "配件编码", value: "partInfoCode" },
  { label: "配件名称", value: "partInfoName" },
  { label: "配件品牌", value: "partInfoBrand" },
  { label: "产地", value: "partInfoProductionPlace" },
  { label: "批次号", value: "batchNo" },
  { label: "实际数", value: "qty" },
  { label: "动态数", value: "autoQty" },
  { label: "锁定数", value: "lockedQty" },
  { label: "仓库", value: "warehouseName" },
  { label: "货位", value: "positionName" }
];

const defaultFormData = {
  printCount: 1,
  startIndex: 1,
  totalIndex: 1
};
const formDataRules = {
  printCount: [{ required: true, message: "请输入补打数量", trigger: "change" }]
};

export default {
  name: "StockPartLabelPrint",
  components: { BillPanel },
  mixins: [FormMixin],
  props: {
    visible: Boolean,
    partInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      formData: { ...defaultFormData }
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.formData = { ...defaultFormData };
        this.$nextTick(() => {
          this.$refs.form?.clearValidate();
        });
      }
    }
  },
  methods: {
    onPrint(e) {
      e?.stopPropagation();
      if (!this.getFormValid("form") || !this.getFormDataValid()) {
        return;
      }
      if (this.formData.printCount > Number(this.partInfo.qty)) {
        this.$confirm("补打数超过库存实际数，确定要继续打印吗？", {
          type: "warning"
        })
          .then(() => {
            this.printHandle();
          })
          .catch(() => {});
      } else {
        this.printHandle();
      }
    },
    printHandle() {
      this.setPrintLabelLateInfo();
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Label/Part/Late/" + this.partInfo?.stockId || 0
        }).href,
        "print",
        process.env.NODE_ENV === "development" ? "http" : "https"
      );
    },
    setPrintLabelLateInfo() {
      localStorage.setItem("printLabelLateInfo", JSON.stringify(this.formData));
    },
    getFormDataValid() {
      let flag = true;
      if (this.formData.startIndex > this.formData.totalIndex) {
        flag = false;
        this.$message({
          type: "success",
          message: "起始分子应小于等于分母",
          showClose: true
        });
      }
      return flag;
    },
    onClose(e) {
      e?.stopPropagation();
      this.$emit("close");
      this.$emit("update:visible", false);
    }
  },
  render() {
    return (
      <ht-dialog
        title="库存配件标签补打"
        visible={this.visible}
        on-close={this.onClose}
        append-to-body
        width="770px"
        class="ht-dialog-box"
      >
        <div class="flex-container block-container">
          <div class="ht-detail-form flex-block-margin flex-block-bg flex-block-padding">
            <div class="ht-page-title page-title-divider">配件信息</div>
            <bill-panel billData={this.partInfo} billEnum={PART_DETAIL_ENUM} />
          </div>

          <div class="flex-block-margin flex-block-bg flex-block-padding auto-block flex-container column-flex">
            <div class="ht-page-title page-title-divider">
              打印设置（{PRINT_LABEL_TIPS}）
            </div>
            <div class="auto-block">
              <el-form
                ref="form"
                attrs={{
                  model: this.formData,
                  rules: formDataRules,
                  "show-message": false
                }}
                label-position="left"
                label-width="71px"
                size="mini"
                class="form-item-small-margin-bottom"
              >
                <el-form-item prop="printCount" label="补打数量">
                  <ht-format-number
                    v-model={this.formData.printCount}
                    v-delay-focus={this.visible}
                    min={1}
                    max={PRINT_LABEL_MAX}
                    placeholder={formDataRules.printCount[0].message}
                  />
                </el-form-item>
                <el-form-item label="打印序号" class="print-index-container">
                  <ht-format-number
                    v-model={this.formData.startIndex}
                    min={1}
                    placeholder="请输入起始分子"
                  >
                    <div slot="prepend">起始分子</div>
                  </ht-format-number>
                  <ht-format-number
                    v-model={this.formData.totalIndex}
                    min={1}
                    placeholder="请输入分母"
                  >
                    <div slot="prepend">分母</div>
                  </ht-format-number>
                  <div class="print-index-tips">
                    序号预览：{this.formData.startIndex}/
                    {this.formData.totalIndex} ~{" "}
                    {subtract(
                      add(this.formData.startIndex, this.formData.printCount),
                      1
                    )}
                    /{this.formData.totalIndex}
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div class="dialog-footer-align">
          <el-button type="primary" size="mini" plain on-click={this.onPrint}>
            打印（F11）
          </el-button>
          <el-button type="primary" size="mini" plain on-click={this.onClose}>
            取消（Esc）
          </el-button>
        </div>
      </ht-dialog>
    );
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.ht-dialog-box {
  ::v-deep .el-dialog__body {
    height: 405px;
  }

  .block-container {
    height: calc(100% - 40px);

    .ht-detail-form {
      flex: 1;
    }
  }

  .print-index-container {
    ::v-deep .el-input-group__prepend {
      width: 89px;
    }

    .print-index-tips {
      margin-top: 5px;
      color: $color-text-secondary;
    }
  }
}
</style>
