<script>
import {
  LOGISTIC_RECONCILIATION_OPTIONS,
  PURCHASE_OPTIONS,
  PURCHASE_ORDER_OPTIONS,
  PURCHASE_RETURN_OPTIONS,
  RECEIVE_SETTLEMENT_OPTIONS,
  SALE_OPTIONS,
  SALE_ORDER_OPTIONS,
  SALE_RETURN_OPTIONS,
  STOCK_TAKING_OPTIONS,
  URGENT_OPTIONS
} from "../constants";

export default {
  name: "BatchSetBox",
  props: {
    visible: Boolean,
    paramsType: {
      type: String,
      required: true
    },
    defaultParams: {
      type: Object,
      required: true
    },
    canSave: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      ruleForm: { ...this.defaultParams }
    };
  },
  computed: {
    relVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.ruleForm = { ...this.defaultParams };
      }
    }
  },
  methods: {
    sureHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (!this.canSave) {
        return;
      }
      this.$emit("sure", this.ruleForm);
      this.cancelHandle();
    },
    cancelHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.relVisible = false;
    }
  },
  render() {
    return (
      <ht-dialog
        visible={this.relVisible}
        on={{
          "update:visible": val => (this.relVisible = val)
        }}
        title="批量设置参数"
        width="450px"
      >
        <el-form
          attrs={{
            model: this.ruleForm
          }}
          size="mini"
          label-width="60px"
          label-position="left"
          size="mini"
          class="form-item-small-margin-bottom"
        >
          <el-form-item label="参数值">
            <ht-autoselect
              v-show={this.paramsType === "purchaseOrder"}
              v-model={this.ruleForm.purchaseOrder}
              options={PURCHASE_ORDER_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
            <ht-autoselect
              v-show={this.paramsType === "purchase"}
              v-model={this.ruleForm.purchase}
              options={PURCHASE_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
            <ht-autoselect
              v-show={this.paramsType === "purchaseReturn"}
              v-model={this.ruleForm.purchaseReturn}
              options={PURCHASE_RETURN_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
            <ht-autoselect
              v-show={this.paramsType === "saleOrder"}
              v-model={this.ruleForm.saleOrder}
              options={SALE_ORDER_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
            <ht-autoselect
              v-show={this.paramsType === "sale"}
              v-model={this.ruleForm.sale}
              options={SALE_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
            <ht-autoselect
              v-show={this.paramsType === "saleReturn"}
              v-model={this.ruleForm.saleReturn}
              options={SALE_RETURN_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
            <ht-autoselect
              v-show={this.paramsType === "urgent"}
              v-model={this.ruleForm.urgent}
              options={URGENT_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
            <ht-autoselect
              v-show={this.paramsType === "stockTaking"}
              v-model={this.ruleForm.stockTaking}
              options={STOCK_TAKING_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
            <ht-autoselect
              v-show={this.paramsType === "receiveSettlement"}
              v-model={this.ruleForm.receiveSettlement}
              options={RECEIVE_SETTLEMENT_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
            <ht-autoselect
              v-show={this.paramsType === "logisticReconciliation"}
              v-model={this.ruleForm.logisticReconciliation}
              options={LOGISTIC_RECONCILIATION_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
          </el-form-item>
        </el-form>

        <div style="margin-top: 10px; text-align: center;">
          <el-button
            disabled={!this.canSave}
            plain
            type="primary"
            size="mini"
            on-click={e => this.sureHandle(e)}
          >
            确定（F3）
          </el-button>
          <el-button
            plain
            type="primary"
            size="mini"
            on-click={e => this.cancelHandle(e)}
          >
            取消（Esc）
          </el-button>
        </div>
      </ht-dialog>
    );
  }
};
</script>

<style lang="scss" scoped>
.slider-container {
  display: flex;
  align-items: top;

  &::v-deep .el-slider__runway {
    margin: 11px 0;
    width: 300px;
  }
}
</style>
