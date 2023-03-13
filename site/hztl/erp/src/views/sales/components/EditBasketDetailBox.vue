<script>
import { mapState } from "vuex";
import hotkeys from "hotkeys-js";
import { CooperatorsSelect } from "@/components/select";
import { precisionsFixed, searchMixin } from "@/mixins";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { beforeAddNewSalesBill } from "@/api/sales/salesHome";
import { multiply } from "@/utils/numberAPI";
import { validQty } from "@/utils/validate";
import { getSalePriceOptions } from "@/utils/tool";
import { NO_PRICE_PERM_VALUE } from "@/constants";

const topHotkeys = new TopHotkeys();

const defaultRuleForm = {
  cooperatorId: null,
  cooperatorName: "",
  isTaxed: true,
  bookQty: 1,
  price: "",
  amount: "",
  saleVehModel: "",
  remark: ""
};
let oldKeyScope;

export default {
  name: "EditBasketDetailBox",
  components: { CooperatorsSelect },
  mixins: [precisionsFixed, searchMixin],
  props: {
    visible: Boolean,
    isEdit: Boolean,
    partData: {
      type: Object,
      required: true
    }
  },
  data() {
    const validPrice = (rule, value, callback) => {
      if (String(value).trim() === "") {
        return callback(new Error("请输入售价"));
      }
      const currentRange = {
        max: this.infoData.bargainUpperPrice,
        min: this.infoData.bargainLowerPrice
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
    return {
      tableName: "EditBasketDetailBoxPartInofList",
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
        price: [{ validator: validPrice, trigger: ["change", "blur"] }]
      },
      lastSaveData: {},
      cooperatorFocus: false,
      bookQtyFocus: false
    };
  },
  computed: {
    ...mapState("admin/user", {
      myCompanyId: state => state.userInfoMsg.companyId
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
          name1: "实际数",
          content1: this.infoData.qty
        },
        {
          name: "配件名称",
          content: this.infoData.name,
          name1: "锁定数",
          content1: this.infoData.lockedQty
        },
        {
          name: "配件品牌",
          content: this.infoData.brand,
          name1: "动态数",
          content1: this.infoData.dynaQty
        },
        {
          name: "配件性质",
          content: this.infoData.property,
          name1: "上次售价",
          content1: this.infoData.lastTaxedPrice
        },
        {
          name: "产地",
          content: this.infoData.productionPlace,
          name1: "上次未税售价",
          content1: this.infoData.lastUntaxedPrice
        },
        {
          name: "采购在途数",
          content: this.infoData.onPurchaseTransitQty,
          name1: "上次开单价",
          content1: this.infoData.lastBillPrice
        },
        {
          name: "采购在订数",
          content: this.infoData.onPurchaseOrderingQty,
          name1: "销售金额",
          content1: this.ruleForm.amount
        },
        { name: "销售在订数", content: this.infoData.onSaleOrderingQty },
        { name: "销售待交货数", content: this.infoData.onSaleWayQty }
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
        this.cooperatorFocus = false;
        this.bookQtyFocus = false;
        this.lastSaveData = {};
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
        ...this.partData,
        saleVehModel:
          this.partData.saleVehModel && this.partData.saleVehModel.length
            ? this.partData.saleVehModel[0]
            : defaultRuleForm.saleVehModel
      };
      if (this.isEdit) {
        this.getLastData(this.ruleForm.cooperatorId, true);
      } else {
        this.ruleForm = {
          ...this.ruleForm,
          saleVehModel: this.partData.vehModel || defaultRuleForm.saleVehModel,
          remark: defaultRuleForm.remark
        };
        this.cooperatorFocus = true;
      }
      this.$nextTick(() => {
        this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
      });
      if (this.lastSaveData.cooperatorId) {
        this.ruleForm = { ...this.ruleForm, ...this.lastSaveData };
        this.getLastData(this.ruleForm.cooperatorId, true);
      }
    },
    getLastData(cooperatorId, isInit) {
      // const params = {
      //   cooperatorId,
      //   sourceType: this.partData.sourceType,
      //   ownerCompanyId: this.partData.sellerId,
      //   partId: this.partData.partId,
      //   property: this.partData.property,
      //   code: this.partData.code,
      //   brand: this.partData.brand,
      //   name: this.partData.name,
      //   productionPlace: this.partData.productionPlace
      // };
      return beforeAddNewSalesBill(this.getPartsPrams(cooperatorId)).then(
        res => {
          this.infoData = { ...this.infoData, ...res };
          if (!isInit) {
            this.ruleForm.price =
              res.defaultTaxedPrice ||
              res.lastTaxedPrice ||
              defaultRuleForm.price;
            this.priceChange(this.ruleForm.price);
          }
          this.cooperatorFocus = false;
          this.bookQtyFocus = true;
          if (isInit) {
            this.$nextTick(() => {
              this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
            });
          }
        }
      );
    },
    getPartsPrams(cooperatorId) {
      const warehouseIds = this.searchParams?.stocks?.warehouseIds || [];
      const isNegative = false;
      const params = {
        isNegative,
        companyId: this.myCompanyId,
        cooperatorId,
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
    cooperatorChange(cooperatorId) {
      this.getLastData(cooperatorId, false);
    },
    bookQtyChange(bookQty) {
      this.ruleForm.amount = this.precisionFormat(
        multiply(Number(bookQty || 0), Number(this.ruleForm.price || 0)),
        "money"
      );
    },
    priceChange(price) {
      this.ruleForm.amount = this.precisionFormat(
        multiply(Number(price || 0), Number(this.ruleForm.bookQty || 0)),
        "money"
      );
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
      this.ruleForm.price = price;
      this.priceChange(this.ruleForm.price);
    },
    sureHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (!this.ruleForm.cooperatorId) return;
      this.$refs.ruleForm.validate(async (valid, err) => {
        if (valid) {
          this.lastSaveData = {
            cooperatorId: this.ruleForm.cooperatorId,
            bookQty: this.ruleForm.bookQty,
            price: this.ruleForm.price,
            saleVehModel: this.ruleForm.saleVehModel,
            remark: this.ruleForm.remark
          };
          if ([0, "0"].includes(this.ruleForm.price)) {
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
        title="编辑快速报价明细"
        append-to-body
        width="820px"
        class="dialog-body ignore-top-hotkeys"
      >
        <div class="container-box">
          <el-row gutter={5} style="height: 310px;">
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
              <ht-card
                title={this.isEdit ? "编辑报价篮信息" : "加入报价篮信息"}
                style="height: 100%;"
              >
                <el-form
                  ref="ruleForm"
                  attrs={{
                    model: this.ruleForm,
                    rules: this.rules
                  }}
                  size="mini"
                  show-message={false}
                  label-position="left"
                  label-width="75px"
                  class="form-item-small-margin-bottom"
                >
                  <el-form-item prop="cooperatorId" label="客户名称">
                    <CooperatorsSelect
                      v-model={this.ruleForm.cooperatorId}
                      v-delay-focus={this.cooperatorFocus}
                      defaultValue={this.ruleForm.cooperatorName}
                      on={{
                        "update:defaultValue": val =>
                          (this.ruleForm.cooperatorName = val)
                      }}
                      allow-create={this.hasCompletePerm(
                        "basics.cooperators.createCustomer"
                      )}
                      type="customer"
                      no-data-tips="没有查询到客户,回车新增"
                      placeholder="客户名称"
                      on-change={this.cooperatorChange}
                    />
                  </el-form-item>
                  <el-form-item prop="bookQty" label="销售数量">
                    <HtFormatNumber
                      v-model={this.ruleForm.bookQty}
                      v-delay-focus={this.bookQtyFocus}
                      min={1}
                      precision-type="qty"
                      on-change={this.bookQtyChange}
                    />
                  </el-form-item>
                  <el-form-item prop="price" label="售价">
                    <HtFormatNumber
                      v-model={this.ruleForm.price}
                      min={0}
                      precision-type="price"
                      on-change={this.priceChange}
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
              disabled={!this.ruleForm.cooperatorId}
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
