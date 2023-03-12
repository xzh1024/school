<script>
import { mapState } from "vuex";
import hotkeys from "hotkeys-js";
import { CooperatorsSelect } from "@/components/select";
import { precisionsFixed, searchMixin } from "@/mixins";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import {
  beforeAddNewSalesBill,
  beforeAddNewSalesBillHasId
} from "@/api/sales/salesHome";
import { divide, multiply } from "@/utils/numberAPI";
import { validMoney, validQty } from "@/utils/validate";
import getUnTaxedData from "@/utils/getUnTaxedData";
import { getSalePriceOptions } from "@/utils/tool";
import { NO_PRICE_PERM_VALUE } from "@/constants";
import { dateFormat } from "@/utils/date";
const priceTypeMap = {
  0: "固定价格",
  1: "公式: 指定配件",
  2: "公式: 按品牌",
  3: "公式: 按分类",
  4: "公式: 全部配件",
  5: "库存售价",
  6: "客户享受",
  null: ""
};
const defaultRuleForm = {
  bookQty: 1,
  preDiscountTaxedPrice: 0,
  preDiscountTaxedAmount: 0,
  taxAmount: 0,
  saleVehModel: "",
  arrivalDate: dateFormat(new Date()),
  remark: ""
};
let oldKeyScope;
const topHotkeys = new TopHotkeys();

export default {
  name: "EditDetailBox",
  components: { CooperatorsSelect },
  mixins: [precisionsFixed, searchMixin],
  props: {
    visible: Boolean,
    isEdit: Boolean,
    isPlatform: Boolean,
    header: {
      type: Object,
      required: true
    },
    partData: {
      type: Object,
      required: true
    },
    searchParams: {
      type: Object
    },
    companyId: {
      type: [Number, String]
    }
  },
  data() {
    const validPrice = (rule, value, callback) => {
      if (String(value).trim() === "") {
        return callback(new Error("请输入售价"));
      }
      const currentRange = {
        max: this.ruleForm.bargainUpperPrice,
        min: this.ruleForm.bargainLowerPrice
      };
      if (
        currentRange.max !== null &&
        currentRange.max !== undefined &&
        Number(value) > Number(currentRange.max || 0)
      ) {
        return callback(
          new Error(`售价高于议价上限：${currentRange.max}，不允许销售`)
        );
      }
      if (
        currentRange.min !== null &&
        currentRange.min !== undefined &&
        Number(value) < Number(currentRange.min || 0)
      ) {
        return callback(new Error(`售价低于议价下限，不允许销售`));
      }
      //验证通过
      return callback();
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
        if (this.ruleForm.preDiscountTaxedAmount) {
          callback(new Error(errTips));
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          callback();
        }
      }
    };
    return {
      tableName: "SalesBillingEditDetailBoxPartInofList",
      tableColumns: [
        { prop: "name", label: "", width: "100" },
        { prop: "content", label: "", width: "120" },
        { prop: "name1", label: "", width: "100" },
        { prop: "content1", label: "", width: "120" }
      ],
      infoData: {},
      ruleForm: { ...defaultRuleForm },
      rules: {
        cooperatorId: [{ required: true, message: "请选择客户" }],
        bookQty: [
          { required: true, validator: validQty, message: "请输入销售数量" }
        ],
        preDiscountTaxedPrice: [{ validator: validPrice, trigger: "blur" }],
        preDiscountTaxedAmount: [
          { required: true, validator: validMoney, message: "请输入金额" }
        ],
        taxAmount: [{ validator: validTaxAmount, trigger: "blur" }]
      },
      bookQtyFocus: false,
      saveSrcData: {
        bookQty: "",
        preDiscountTaxedPrice: "",
        arrivalDate: "",
        remark: "",
        saleVehModel: ""
      },
      mode: 3
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
          name1: "上次售价",
          content1: this.infoData.lastTaxedPrice
            ? this.infoData.lastTaxedPrice
            : this.infoData.preDiscountTaxedPrice
        },
        {
          name: "配件名称",
          content: this.infoData.name,
          name1: "上次未税售价",
          content1: this.infoData.lastUntaxedPrice
            ? this.infoData.lastUntaxedPrice
            : this.infoData.preDiscountUntaxedPrice
        },
        {
          name: "配件品牌",
          content: this.infoData.brand,
          name1: "上次开单价",
          content1: this.infoData.lastBillPrice
        },
        {
          name: "配件性质",
          content: this.infoData.property,
          name1: "发票税率",
          content1: `${this.header.invoiceType}（${multiply(
            this.header.taxRate,
            100
          )}%）`
        },
        {
          name: "产地",
          content: this.infoData.productionPlace,
          name1: "售价",
          content1: this.ruleForm.preDiscountTaxedPrice
        },
        {
          name: "实际库存",
          content: this.infoData.qty,
          name1: "销售金额",
          content1: this.ruleForm.preDiscountTaxedAmount
        },
        {
          name: "动态库存",
          content: this.infoData.dynaQty,
          name1: "未税售价",
          content1: this.ruleForm.preDiscountUntaxedPrice
        },
        {
          name: "锁定数",
          content: this.infoData.lockedQty,
          name1: "未税销售金额",
          content1: this.ruleForm.preDiscountUntaxedAmount
        }
      ];
    },
    otherPrices() {
      return getSalePriceOptions({
        retailPrice: this.infoData?.salePrices?.retail || 0,
        platformPrice: this.infoData?.salePrices?.platform || 0,
        transferPrice: this.infoData?.salePrices?.allot || 0,
        wholeSalePrice: this.infoData?.salePrices?.wholesale || 0,
        wholeSalePrice1: this.infoData?.salePrices?.wholesale1 || 0,
        wholeSalePrice2: this.infoData?.salePrices?.wholesale2 || 0,
        wholeSalePrice3: this.infoData?.salePrices?.wholesale3 || 0,
        wholeSalePrice4: this.infoData?.salePrices?.wholesale4 || 0
      });
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val) {
        oldKeyScope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el);
        this.initData();
      } else if (oldVal) {
        this.bookQtyFocus = false;
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
    async initData() {
      this.infoData = { ...this.partData };
      this.ruleForm = {
        ...defaultRuleForm,
        ...this.partData,
        saleVehModel:
          this.partData.saleVehModel && this.partData.saleVehModel.length
            ? this.partData.saleVehModel[0]
            : defaultRuleForm.saleVehModel
      };
      await this.getLastData();
    },
    async refreshData() {
      //错误，重新刷新数据，保留已填写的数据
      this.saveSrcData = {
        bookQty: this.ruleForm.bookQty,
        preDiscountTaxedPrice: this.ruleForm.preDiscountTaxedPrice,
        arrivalDate: this.ruleForm.arrivalDate,
        remark: this.ruleForm.remark,
        saleVehModel: this.ruleForm.saleVehModel
      };
      await this.initData();
      this.ruleForm = Object.assign(this.ruleForm, this.saveSrcData);
    },
    async getLastData() {
      if (this.isEdit) {
        // const params = {
        //   billId: this.header.id,
        //   detailId: this.partData.id,
        //   cooperatorId: this.header.cooperatorId,
        //   ownerCompanyId: this.partData.ownerCompanyId,
        //   partId: this.partData.partId,
        //   property: this.partData.property
        // };
        const res = await beforeAddNewSalesBillHasId(this.getPartsPrams());
        this.infoData = { ...this.infoData, ...res };
        this.setTaxAdjustRange();
        this.bookQtyFocus = true;
        this.$nextTick(() => {
          this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
        });
      } else {
        // const params = {
        //   sourceType: this.header.sourceType,
        //   cooperatorId: this.header.cooperatorId,
        //   ownerCompanyId: this.partData.ownerCompanyId,
        //   partId: this.partData.partId,
        //   property: this.partData.property,
        //   code: this.partData.code,
        //   brand: this.partData.brand,
        //   name: this.partData.name,
        //   productionPlace: this.partData.productionPlace
        // };
        const res = await beforeAddNewSalesBill(this.getPartsPrams());
        this.infoData = { ...this.infoData, ...res };
        this.ruleForm = {
          ...this.ruleForm,
          preDiscountTaxedPrice:
            res.defaultTaxedPrice ||
            res.lastTaxedPrice ||
            defaultRuleForm.preDiscountTaxedPrice,
          bookQty: defaultRuleForm.bookQty,
          saleVehModel: this.partData.vehModel || defaultRuleForm.saleVehModel,
          arrivalDate: dateFormat(new Date()),
          remark: defaultRuleForm.remark
        };
        this.priceChange(this.ruleForm.preDiscountTaxedPrice);
        this.bookQtyFocus = true;
        this.$nextTick(() => {
          this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
        });
      }
    },
    getPartsPrams() {
      const warehouseIds = this.searchParams?.stocks?.warehouseIds || [];
      const isNegative = false;
      const params = {
        isNegative,
        companyId: this.companyId,
        cooperatorId: this.header.cooperatorId,
        partId: this.partData.partId,
        ownerCompanyId: this.partData.ownerCompanyId,
        property: this.partData.property,
        detailType: this.isEdit ? this.partData.type : undefined,
        mode: 3
      };

      switch (this.mode) {
        case 0: {
          params.warehouseId = this.partData.warehouseId || null;
          params.positionId = this.partData.positionId || null;
          params.stockId = this.partData.stockId || null;
          break;
        }
        case 1: {
          params.warehouseId = this.partData.warehouseId || null;
          params.positionId = this.partData.positionId || null;
          break;
        }
        case 2: {
          params.warehouseId = this.partData.warehouseId || null;
          break;
        }
        default:
          params.warehouseIds = warehouseIds;
          break;
      }
      return params;
    },
    bookQtyChange(bookQty) {
      this.ruleForm.preDiscountTaxedAmount = this.precisionFormat(
        multiply(
          Number(bookQty || 0),
          Number(this.ruleForm.preDiscountTaxedPrice || 0)
        ),
        "money"
      );
      this.setUnTaxedData();
    },
    priceChange(price) {
      this.ruleForm.preDiscountTaxedAmount = this.precisionFormat(
        multiply(Number(price || 0), Number(this.ruleForm.bookQty || 0)),
        "money"
      );
      this.setUnTaxedData();
    },
    amountChange(amout) {
      this.ruleForm.preDiscountTaxedPrice = this.precisionFormat(
        divide(Number(amout || 0), Number(this.ruleForm.bookQty || 0)),
        "price"
      );
      this.setUnTaxedData();
    },
    setUnTaxedData() {
      if (Number(this.header.taxRate || 0)) {
        this.ruleForm.preDiscountUntaxedPrice = this.precisionFormat(
          getUnTaxedData.untaxedPrice(
            this.ruleForm.preDiscountTaxedPrice,
            this.header.taxRate
          ),
          "untaxedPrice"
        );
        this.ruleForm.preDiscountUntaxedAmount = this.precisionFormat(
          getUnTaxedData.untaxedAmount(
            this.ruleForm.preDiscountUntaxedPrice,
            this.ruleForm.bookQty
          ),
          "money"
        );
        this.ruleForm.taxAmount = this.precisionFormat(
          getUnTaxedData.taxAmount(
            this.ruleForm.preDiscountTaxedAmount,
            this.ruleForm.preDiscountUntaxedAmount
          ),
          "money"
        );
      } else {
        this.ruleForm.preDiscountUntaxedPrice = this.ruleForm.preDiscountTaxedPrice;
        this.ruleForm.preDiscountUntaxedAmount = this.ruleForm.preDiscountTaxedAmount;
        this.ruleForm.taxAmount = 0;
      }
      this.setTaxAdjustRange();
    },
    setTaxAdjustRange() {
      this.minTaxAmount = this.precisionFormat(
        getUnTaxedData.minTaxAmount(
          this.ruleForm.preDiscountTaxedAmount,
          this.ruleForm.preDiscountUntaxedAmount,
          this.taxAdjustRange
        ),
        "money"
      );
      this.maxTaxAmount = this.precisionFormat(
        getUnTaxedData.maxTaxAmount(
          this.ruleForm.preDiscountTaxedAmount,
          this.ruleForm.preDiscountUntaxedAmount,
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
    otherPriceChange(id) {
      this.otherPrices.forEach(item => {
        if (id === item.id) {
          if (item.value === NO_PRICE_PERM_VALUE) {
            this.$message.warning({
              message: "您没有权限查看该价格",
              showClose: true
            });
          } else {
            this.applyCurrentPrice(Number(item.value));
          }
        }
      });
    },
    applyCurrentPrice(price) {
      this.ruleForm.preDiscountTaxedPrice = price;
      this.priceChange(this.ruleForm.preDiscountTaxedPrice);
    },
    sureHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.$refs.ruleForm.validate(async (valid, err) => {
        if (valid) {
          //是否负库存销售
          const hasQty = Number(this.infoData.dynaQty || 0) <= 0 ? "预估" : "";
          //有低于成本价销售权限
          // const hasPermSellBelow = this.hasBelongsPerm(
          //   "sellBelowCost",
          //   this.header.belongs
          // );
          //非精确到批次
          const hasAvg = this.mode > 0 && !hasQty ? "平均" : "";
          // //不是固定价格，客户享受价格，不是负库存，有进货价且 没权限，或者不是负库存销售，拦截并提示无权限
          // //无进货价不做权限验证
          // if (
          //   this.infoData.needCostPriceCheck &&
          //   Number(this.ruleForm.preDiscountTaxedPrice) <
          //     Number(this.infoData.costPrices?.taxed || 0) &&
          //   (this.infoData.costPrices?.taxed ||
          //     String(this.infoData.costPrices?.taxed) === "0") &&
          //   !hasPermSellBelow
          // ) {
          //   return this.$message.warning(
          //     `当前售价低于${hasQty}${hasAvg}进货价,您无权销售！`
          //   );
          // }
          // if (
          //   this.infoData.needCostPriceCheck &&
          //   Number(this.ruleForm.preDiscountTaxedPrice) <
          //     Number(this.infoData.costPrices?.taxed || 0) &&
          //   (this.infoData.costPrices?.taxed ||
          //     String(this.infoData.costPrices?.taxed) === "0") &&
          //   !hasPermSellBelow
          // ) {
          //   return this.$message.warning(
          //     `当前售价低于${hasQty}${hasAvg}进货价,您无权销售！`
          //   );
          // }
          if (
            //hasPermSellBelow &&
            this.ruleForm.preDiscountTaxedPrice &&
            Number(this.ruleForm.preDiscountTaxedPrice) <
              Number(this.infoData.costPrices?.taxed || 0)
          ) {
            const tipText = this.infoData.hideCostPrice
              ? `当前售价低于${hasQty}${hasAvg}进货价, 是否继续？`
              : `当前售价低于${hasQty}${hasAvg}进货价「${Number(
                  this.infoData.costPrices?.taxed || 0
                )}」, 是否继续？`;
            await this.$confirm(tipText, "提示", {
              type: "warning"
            });
          } else if ([0, "0"].includes(this.ruleForm.preDiscountTaxedPrice)) {
            await this.$confirm("当前售价为0, 是否继续？", "提示", {
              type: "warning"
            });
          }
          this.$emit("sure", {
            ...this.ruleForm,
            partId: this.partData.partId,
            saleVehModel: this.ruleForm.saleVehModel
              ? [this.ruleForm.saleVehModel]
              : [""]
          });
          //this.cancelHandle();
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
        title="编辑客户订单明细"
        append-to-body
        width="820px"
        class="dialog-body ignore-top-hotkeys"
      >
        <div class="container-box">
          <el-row gutter={5} style="height: 315px;">
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
              <ht-card title={"销售信息"} style="height: 100%;">
                <div
                  slot="after-title"
                  class="text-font-primary"
                  style="text-align: right;font-size: 12px;"
                >
                  {priceTypeMap[this.infoData.defaultPriorityType]
                    ? `售价取值方式：${
                        priceTypeMap[this.infoData.defaultPriorityType]
                      }`
                    : ""}
                </div>
                <el-form
                  ref="ruleForm"
                  disabled={this.isPlatform}
                  attrs={{
                    model: this.ruleForm,
                    rules: this.rules
                  }}
                  size="mini"
                  show-message={false}
                  label-position="left"
                  label-width="88px"
                  class="form-item-small-margin-bottom"
                >
                  <el-form-item prop="bookQty" label="销售数量">
                    <HtFormatNumber
                      v-model={this.ruleForm.bookQty}
                      v-delay-focus={this.bookQtyFocus}
                      min={1}
                      precision-type="qty"
                      on-change={this.bookQtyChange}
                    />
                  </el-form-item>
                  <el-form-item prop="preDiscountTaxedPrice" label="售价">
                    <HtFormatNumber
                      v-model={this.ruleForm.preDiscountTaxedPrice}
                      min={0}
                      precision-type="price"
                      on-change={this.priceChange}
                    ></HtFormatNumber>
                  </el-form-item>
                  <el-form-item prop="preDiscountTaxedAmount" label="金额">
                    <HtFormatNumber
                      v-model={this.ruleForm.preDiscountTaxedAmount}
                      min={0}
                      precision-type="money"
                      on-change={this.amountChange}
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
                  <el-form-item prop="saleVehModel" label="销售车型">
                    <ht-autocomplete
                      v-model={this.ruleForm.saleVehModel}
                      fetch-suggestions={this.autocompleteSearchSaleVehModel}
                      trigger-on-focus={false}
                      highlight-first-item
                      placeholder="销售车型"
                    />
                  </el-form-item>
                  <el-form-item label="预计交货日期" prop="arrivalDate">
                    <el-date-picker
                      v-model={this.ruleForm.arrivalDate}
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                    />
                  </el-form-item>
                  <el-form-item prop="remark" label="备注">
                    <ht-input
                      v-model={this.ruleForm.remark}
                      placeholder="最大支持100个字符"
                      maxlength="100"
                    />
                  </el-form-item>
                  <el-form-item class="other-price">
                    <ht-select
                      value="其他售价"
                      options={this.otherPrices}
                      clearable={false}
                      default-value="其他售价"
                      style="width: 62px;"
                      on-change={this.otherPriceChange}
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
@import "@/assets/css/var";

.dialog-body {
  &::v-deep .el-dialog__body {
    padding: 5px;
    background-color: #e7ebed;
  }
}
.other-price {
  text-align: right;

  &::v-deep .el-input__inner {
    border: 0;
    background-color: transparent;
    padding: 0 0 0 3px;
    color: #3aa7ff;
    @include font_color("color-primary");
    font-size: 14px;
  }

  &::v-deep .el-input__suffix {
    display: none;
  }
}
</style>
