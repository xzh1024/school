<script>
import { mapState } from "vuex";
import hotkeys from "hotkeys-js";
import { precisionsFixed, searchMixin } from "@/mixins";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { reqReturnBillingDetails } from "@/api/purchase/purchaseReturn";
import { multiply } from "@/utils/numberAPI";
import { validMoney } from "@/utils/validate";
import getUnTaxedData from "@/utils/getUnTaxedData";

const topHotkeys = new TopHotkeys();

const defaultRuleForm = {
  qty: 1,
  taxedPrice: null,
  taxAmount: "",
  untaxedPrice: "",
  untaxedAmount: "",
  reason: "",
  remark: ""
};
let oldKeyScope;

export default {
  name: "EditDetailBox",
  mixins: [precisionsFixed, searchMixin],
  props: {
    visible: Boolean,
    isEdit: Boolean,
    partData: {
      type: Object,
      required: true
    },
    header: {
      type: Object,
      required: true
    }
  },
  data() {
    const validReturnQty = (rule, value, callback) => {
      if (Number(value) > 0) {
        if (Number(value) > Number(this.infoData.returnableQty)) {
          callback(new Error("退货数量需小于等于可退数量"));
        } else {
          callback();
        }
      } else if (Number(value) <= 0) {
        callback(new Error("退货数量需大于0"));
      } else {
        callback(new Error(rule.message));
      }
    };
    const validTaxAmount = (rule, value, callback) => {
      const errTips = "税额不能超出参数设置范围";
      if (value || [0, "0"].includes(value)) {
        if (
          Number(value) > this.maxTaxAmount ||
          Number(value) < this.minTaxAmount
        ) {
          callback(new Error(errTips));
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          callback();
        }
      } else {
        if (this.ruleForm.taxedAmount) {
          callback(new Error(errTips));
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          callback();
        }
      }
    };

    return {
      tableName: "PurchaseReturnEditDetailBoxPartInofList",
      tableColumns: [
        { prop: "name", label: "", width: "130" },
        { prop: "content", label: "", width: "120" },
        { prop: "name1", label: "", width: "100" },
        { prop: "content1", label: "", width: "120" }
      ],
      isCollapse: false,
      infoData: {},
      ruleForm: { ...defaultRuleForm },
      maxTaxAmount: 0,
      minTaxAmount: 0,
      rules: {
        qty: [
          {
            required: true,
            validator: validReturnQty,
            message: "请输入退货数量"
          }
        ],
        taxedPrice: [
          { required: true, validator: validMoney, message: "请输入退货价" }
        ],
        taxAmount: [{ validator: validTaxAmount, trigger: "blur" }]
      },
      qtyFocus: false
    };
  },
  computed: {
    ...mapState("admin/systemParams", {
      taxAdjustRange: state => state.precisions.taxAdjustRange
    }),
    relVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    },
    tableData() {
      return [
        {
          name: "配件编码",
          content: this.infoData.code,
          name1: "已退数",
          content1: this.infoData.returnedQty
        },
        {
          name: "配件名称",
          content: this.infoData.name,
          name1: "可退数",
          content1: this.infoData.returnableQty
        },
        {
          name: "配件品牌",
          content: this.infoData.brand,
          name1: "退货数",
          content1: this.ruleForm.qty
        },
        {
          name: "配件性质",
          content: this.infoData.property,
          name1: "发票税率",
          content1: `${this.infoData.invoiceType}（${multiply(
            this.infoData.taxRate,
            100
          )}%）`
        },
        {
          name: "供应商",
          content: this.infoData.cooperatorName,
          name1: "退货价",
          content1: this.ruleForm.taxedPrice
        },
        {
          name: "仓库",
          content: this.infoData.warehouseName,
          name1: "退货金额",
          content1: this.ruleForm.taxedAmount
        },
        {
          name: "货位",
          content: this.infoData.positionName,
          name1: "未税退货价",
          content1: this.ruleForm.untaxedPrice
        },
        {
          name: "进价",
          content: this.partData.isHasHistory
            ? this.isEdit
              ? this.infoData.sourceTaxedPrice
              : this.infoData.taxedPrice
            : "--",
          name1: "未税退货金额",
          content1: this.ruleForm.untaxedAmount
        },
        {
          name: "进价*退货数量",
          content: this.partData.isHasHistory
            ? multiply(
                this.isEdit
                  ? this.infoData.sourceTaxedPrice
                  : this.infoData.taxedPrice,
                this.ruleForm.qty || 0
              )
            : "--"
        },
        {
          name: "未税进价",
          content: this.partData.isHasHistory
            ? this.isEdit
              ? this.infoData.sourceUntaxedPrice
              : this.infoData.untaxedPrice
            : "--"
        },
        {
          name: "未税进价*退货数量",
          content: this.partData.isHasHistory
            ? multiply(
                this.isEdit
                  ? this.infoData.sourceUntaxedPrice
                  : this.infoData.untaxedPrice,
                this.ruleForm.qty || 0
              )
            : "--"
        }
      ];
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val) {
        oldKeyScope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el);
        this.initData();
      } else if (oldVal) {
        this.qtyFocus = false;
        topHotkeys.unbindHotkeys(this.$el);
        hotkeys.setScope(oldKeyScope);
      }
    }
  },
  methods: {
    cellClassName({ columnIndex }) {
      if (columnIndex % 2 === 1) {
        return "text-font-primary";
      }
    },
    initData() {
      this.infoData = { ...this.partData };
      this.ruleForm = {
        ...defaultRuleForm,
        ...this.partData
      };
      reqReturnBillingDetails({
        arrivalDetailId: this.partData.arrivalDetailId,
        stockId: this.partData.stockId,
        returnDetailId: this.partData.returnDetailId,
        sourceType: this.partData.sourceType
      }).then(res => {
        this.infoData = {
          ...this.partData,
          returnableQty: res.returnableQty,
          returnedQty: res.returnedQty
        };
        if (!this.isEdit) {
          this.ruleForm = {
            ...this.ruleForm,
            qty: defaultRuleForm.qty,
            remark: defaultRuleForm.remark
          };
          this.priceChange(this.ruleForm.taxedPrice);
        }
        this.setTaxAdjustRange();
        this.qtyFocus = true;
        this.$nextTick(() => {
          this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
        });
      });
    },
    qtyChange(qty) {
      this.ruleForm.taxedAmount = this.precisionFormat(
        multiply(Number(qty || 0), Number(this.ruleForm.taxedPrice || 0)),
        "money"
      );
      this.setUnTaxedData();
    },
    priceChange(price) {
      this.ruleForm.taxedAmount = this.precisionFormat(
        multiply(Number(price || 0), Number(this.ruleForm.qty || 0)),
        "money"
      );
      this.setUnTaxedData();
    },
    setUnTaxedData() {
      if (Number(this.infoData.taxRate || 0)) {
        this.ruleForm.untaxedPrice = this.precisionFormat(
          getUnTaxedData.untaxedPrice(
            this.ruleForm.taxedPrice,
            this.infoData.taxRate
          ),
          "untaxedPrice"
        );
        this.ruleForm.untaxedAmount = this.precisionFormat(
          getUnTaxedData.untaxedAmount(
            this.ruleForm.untaxedPrice,
            this.ruleForm.qty
          ),
          "money"
        );
        this.ruleForm.taxAmount = this.precisionFormat(
          getUnTaxedData.taxAmount(
            this.ruleForm.taxedAmount,
            this.ruleForm.untaxedAmount
          ),
          "money"
        );
      } else {
        this.ruleForm.untaxedPrice = this.ruleForm.taxedPrice;
        this.ruleForm.untaxedAmount = this.ruleForm.taxedAmount;
        this.ruleForm.taxAmount = 0;
      }
      this.setTaxAdjustRange();
    },
    setTaxAdjustRange() {
      this.minTaxAmount = this.precisionFormat(
        getUnTaxedData.minTaxAmount(
          this.ruleForm.taxedAmount,
          this.ruleForm.untaxedAmount,
          this.taxAdjustRange
        ),
        "money"
      );
      this.maxTaxAmount = this.precisionFormat(
        getUnTaxedData.maxTaxAmount(
          this.ruleForm.taxedAmount,
          this.ruleForm.untaxedAmount,
          this.taxAdjustRange
        ),
        "money"
      );
    },
    taxAmountBlur() {
      if (
        !this.ruleForm.taxAmount &&
        [0, "0"].includes(this.ruleForm.taxAmount)
      ) {
        this.ruleForm.taxAmount = this.minTaxAmount || 0;
      } else if (this.ruleForm.taxAmount < this.minTaxAmount) {
        this.ruleForm.taxAmount = this.minTaxAmount;
      } else if (this.ruleForm.taxAmount > this.maxTaxAmount) {
        this.ruleForm.taxAmount = this.maxTaxAmount;
      }
    },

    sureHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          this.$emit("sure", {
            ...this.ruleForm,
            partId: this.partData.partId
          });
          this.cancelHandle();
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
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
        title="编辑采购退货单明细"
        append-to-body
        width="860px"
        class="dialog-body ignore-top-hotkeys"
      >
        <div class="container-box">
          <el-row gutter={5} style="height: 370px;">
            <el-col span={14} style="height: 100%;">
              <ht-card title="配件信息" style="height: 100%;">
                <ht-setting-table
                  tableName={this.tableName}
                  columns={this.tableColumns}
                  data={this.tableData}
                  show-header={false}
                  index-column={false}
                  selection-type={null}
                  cell-class-name={this.cellClassName}
                  disabled-hotkeys
                />
              </ht-card>
            </el-col>
            <el-col span={10} style="height: 100%;">
              <ht-card title="采购退货信息" style="height: 100%;">
                <el-form
                  ref="ruleForm"
                  attrs={{
                    model: this.ruleForm,
                    rules: this.rules
                  }}
                  size="mini"
                  show-message={false}
                  label-position="left"
                  label-width="113px"
                  class="form-item-small-margin-bottom"
                >
                  <el-form-item label="退货数量" prop="qty">
                    <HtFormatNumber
                      v-model={this.ruleForm.qty}
                      v-delay-focus={this.qtyFocus}
                      min={1}
                      max={Number(this.infoData.returnableQty)}
                      precision-type="qty"
                      on-change={this.qtyChange}
                    />
                  </el-form-item>
                  <el-form-item label="退货价（含税）" prop="taxedPrice">
                    <HtFormatNumber
                      v-model={this.ruleForm.taxedPrice}
                      min={0}
                      precision-type="price"
                      on-change={this.priceChange}
                    />
                  </el-form-item>
                  <el-form-item label="税额" prop="taxAmount">
                    <HtFormatNumber
                      v-model={this.ruleForm.taxAmount}
                      min={0}
                      precision-type="money"
                      on-blur={this.taxAmountBlur}
                    />
                  </el-form-item>
                  <el-form-item label="退货原因" prop="reason">
                    <ht-autocomplete
                      v-model={this.ruleForm.reason}
                      fetch-suggestions={this.autocompleteSearchReturnReasons}
                      trigger-on-focus={false}
                      mnemonic
                      highlight-first-item
                    />
                  </el-form-item>
                  <el-form-item label="备注" prop="remark">
                    <ht-input
                      v-model={this.ruleForm.remark}
                      placeholder="最大支持100个字符"
                      maxlength="100"
                    />
                  </el-form-item>
                </el-form>
              </ht-card>
            </el-col>
          </el-row>

          <div style="margin: 10px 0 5px 0; text-align: center;">
            <el-button
              type="primary"
              size="mini"
              plain
              on-click={e => this.sureHandle(e)}
            >
              确定（F3）
            </el-button>
            <el-button
              type="primary"
              size="mini"
              plain
              on-click={e => this.cancelHandle(e)}
            >
              取消（Esc）
            </el-button>
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
}
.set-price-type {
  width: 180px !important;

  &::v-deep .el-input__inner {
    height: 20px;
    line-height: 20px;
    border: 0;
    background-color: #fbfbfb;
    padding: 0 0 0 3px;
    color: #3aa7ff;
    font-size: 14px;
  }

  &::v-deep .el-input__suffix {
    display: none;
  }
}
</style>
