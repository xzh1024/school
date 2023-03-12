<script>
import { mapState } from "vuex";
import hotkeys from "hotkeys-js";
import Collapse from "@/components/collapse";
import { precisionsFixed, searchMixin } from "@/mixins";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { loadSearchPosition } from "@/api/store/stocks";
import {
  getBillsPurchaseBySingle,
  getBillsPurchaseDefaultPosition
} from "@/api/base/search";
import { reqPurchasePriceSettings } from "@/api/purchase/purchasePrice";
import { cacheIsCollapse, loadIsCollapse } from "@/utils/isCollapse";
import { divide, multiply } from "@/utils/numberAPI";
import { validMoney, validQty } from "@/utils/validate";
import getUnTaxedData from "@/utils/getUnTaxedData";
import { PRIORITY_CATEGORYS } from "@/constants/states/purchase";
import { cloneDeep } from "lodash";
import { dateFormat } from "@/utils/date";
import { resetBelongsItem } from "@/mixins/permissionsMixin";
import { ALL_SPACE_REG_EXP, QUICK_ADD_POSITION_LEN } from "@/constants";
import quickGetPositions from "@/utils/quickGetPositions";
import * as store from "@/utils/store";
import { debounce } from "lodash";
const defaultRuleForm = {
  qty: 1,
  taxedPrice: 0,
  taxedAmount: 0,
  taxAmount: 0,
  property: "完好",
  warehouseId: null,
  warehouseName: "",
  positionId: null,
  positionName: "",
  arrivalDate: dateFormat(new Date()),
  remark: "",
  salePrices: {
    retail: "",
    platform: "",
    allot: "",
    wholesale: "",
    wholesale1: "",
    wholesale2: "",
    wholesale3: "",
    wholesale4: ""
  }
};
const defaultPriorityCategory = "售价取值方式";
let oldKeyScope;
const topHotkeys = new TopHotkeys();
const CURRENT_BELONGS = ["self", "others"];
const NEW_BELONGS = "our";

export default {
  name: "EditDetailBox",
  components: { Collapse },
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
    },
    details: {
      type: Array,
      required: true
    },
    mode: {
      type: Number
    },
    companyId: [String, Number]
  },
  data() {
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
      loading: false,
      warningMsg: "",
      tableName: "PurchaseReceiveEditDetailBoxPartInofList",
      tableColumns: [
        { prop: "name", label: "", width: "100" },
        { prop: "content", label: "", width: "120" }
      ],
      isCollapse: false,
      infoData: {},
      ruleForm: cloneDeep(defaultRuleForm),
      cachePositionId: null,
      maxTaxAmount: 0,
      minTaxAmount: 0,
      displayPriorityCategory: defaultPriorityCategory,
      priorityCategory: 0,
      priorityCategorys: PRIORITY_CATEGORYS,
      rules: {
        qty: [
          { required: true, validator: validQty, message: "请输入采购数量" }
        ],
        taxedPrice: [
          { required: true, validator: validMoney, message: "请输入进价" }
        ],
        taxedAmount: [
          { required: true, validator: validMoney, message: "请输入金额" }
        ],
        taxAmount: [{ validator: validTaxAmount, trigger: "blur" }],
        warehouseId: [{ required: true, message: "请选择到货仓库" }]
      },
      salePricesMarkUpRate: {},
      defaultPriceType: "售价取值方式",
      refreshData: true,
      debouncePriceChange: debounce(this.priceChange, 500)
    };
  },
  computed: {
    ...mapState("admin/systemParams", {
      taxAdjustRange: state => state.precisions.taxAdjustRange,
      isEasyMode: state => !!state.params.manageMode
    }),
    relVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    },
    canEdit() {
      return !(
        this.header.platformKey ||
        (this.header && this.header.id && [1, 2].includes(this.header.type))
      );
    },
    tableData() {
      return [
        { name: "配件编码", content: this.infoData.code },
        { name: "配件名称", content: this.infoData.name },
        { name: "配件品牌", content: this.infoData.brand },
        { name: "实际库存", content: this.infoData.qty },
        { name: "动态库存", content: this.infoData.dynaQty },
        { name: "锁定数", content: this.infoData.lockedQty },
        { name: "上次进价", content: this.infoData.lastTaxedPrice },
        { name: "上次未税进价", content: this.infoData.lastUntaxedPrice },
        {
          name: "发票税率",
          content: `${this.header.invoiceType}（${multiply(
            this.header.taxRate,
            100
          )}%）`
        },
        { name: "进价", content: this.ruleForm.taxedPrice },
        { name: "金额", content: this.ruleForm.taxedAmount },
        { name: "未税进价", content: this.ruleForm.untaxedPrice },
        { name: "未税金额", content: this.ruleForm.untaxedAmount }
      ];
    },
    showPurchasedPrice() {
      return this.hasBelongsPermWithoutRoute(
        "purchasedPrice",
        "specials.pricesRead",
        resetBelongsItem(this.header.belongs, CURRENT_BELONGS, NEW_BELONGS)
      );
    },
    showRetailPrice() {
      return this.hasBelongsPermWithoutRoute(
        "retailPrice",
        "specials.pricesRead",
        resetBelongsItem(this.header.belongs, CURRENT_BELONGS, NEW_BELONGS)
      );
    },
    showPlatformPrice() {
      return this.hasBelongsPermWithoutRoute(
        "platformPrice",
        "specials.pricesRead",
        resetBelongsItem(this.header.belongs, CURRENT_BELONGS, NEW_BELONGS)
      );
    },
    showTransferPrice() {
      return this.hasBelongsPermWithoutRoute(
        "transferPrice",
        "specials.pricesRead",
        resetBelongsItem(this.header.belongs, CURRENT_BELONGS, NEW_BELONGS)
      );
    },
    showWholeSalePrice() {
      return this.hasBelongsPermWithoutRoute(
        "wholeSalePrice",
        "specials.pricesRead",
        resetBelongsItem(this.header.belongs, CURRENT_BELONGS, NEW_BELONGS)
      );
    },
    showWholeSalePrice1() {
      return this.hasBelongsPermWithoutRoute(
        "wholeSalePrice1",
        "specials.pricesRead",
        resetBelongsItem(this.header.belongs, CURRENT_BELONGS, NEW_BELONGS)
      );
    },
    showWholeSalePrice2() {
      return this.hasBelongsPermWithoutRoute(
        "wholeSalePrice2",
        "specials.pricesRead",
        resetBelongsItem(this.header.belongs, CURRENT_BELONGS, NEW_BELONGS)
      );
    },
    showWholeSalePrice3() {
      return this.hasBelongsPermWithoutRoute(
        "wholeSalePrice3",
        "specials.pricesRead",
        resetBelongsItem(this.header.belongs, CURRENT_BELONGS, NEW_BELONGS)
      );
    },
    showWholeSalePrice4() {
      return this.hasBelongsPermWithoutRoute(
        "wholeSalePrice4",
        "specials.pricesRead",
        resetBelongsItem(this.header.belongs, CURRENT_BELONGS, NEW_BELONGS)
      );
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val) {
        oldKeyScope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el);
        this.warningMsg = "";
        this.initData();
      } else if (oldVal) {
        topHotkeys.unbindHotkeys(this.$el);
        hotkeys.setScope(oldKeyScope);
      }
    },
    isCollapse() {
      cacheIsCollapse(this.isCollapse, "PurchaseReceiveBillingBasketBilling");
    }
  },
  mounted() {
    this.isCollapse = loadIsCollapse(
      this.isCollapse,
      "PurchaseReceiveBillingBasketBilling"
    );
  },
  methods: {
    cellClassName({ columnIndex }) {
      if (columnIndex % 2 === 1) {
        return "text-font-primary";
      }
    },
    initData() {
      this.salePricesMarkUpRate = {};
      this.priorityCategory = 0;
      this.displayPriorityCategory = defaultPriorityCategory;
      this.infoData = { ...this.partData };
      this.ruleForm = {
        ...cloneDeep(defaultRuleForm),
        ...cloneDeep(this.partData),
        warehouseId: this.partData.warehouseId || defaultRuleForm.warehouseId
      };
      this.getLastData(this.header.cooperatorId);
    },
    getLastData(cooperatorId) {
      this.loading = true;
      const params = {
        cooperatorId,
        mode: this.mode,
        partId: this.partData.partId,
        property: this.ruleForm.property
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
          break;
      }
      getBillsPurchaseBySingle(params)
        .then(res => {
          this.infoData = { ...this.infoData, ...res };
          if (!this.isEdit) {
            this.ruleForm = {
              ...this.ruleForm,
              qty: defaultRuleForm.qty,
              taxedPrice: res.costPrices?.taxed || defaultRuleForm.taxedPrice,
              warehouseId:
                res.defaultWarehouseId || defaultRuleForm.warehouseId,
              warehouseName:
                res.defaultWarehouseName || defaultRuleForm.warehouseName,
              positionId: res.defaultPositionId || defaultRuleForm.positionId,
              positionName:
                res.defaultPositionName || defaultRuleForm.positionName,
              arrivalDate: dateFormat(new Date()),
              remark: defaultRuleForm.remark,
              //添加的时候，默认配件性质为完好
              property: "完好"
            };
            this.priceChange(this.ruleForm.taxedPrice);
          }
          this.cachePositionId = this.ruleForm.positionId;
          this.setTaxAdjustRange();
          this.$nextTick(() => {
            this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
          });
          this.setAllMarkUpRate();
        })
        .catch(err => {
          if (err.code === "part-out-of-scope") {
            this.warningMsg = err.message;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async handleWarehouseChange(warehouseId) {
      const res = await getBillsPurchaseDefaultPosition({
        warehouseId,
        partId: this.partData.partId,
        property: this.ruleForm.property
      });
      this.ruleForm.positionId = res.positionId;
      this.ruleForm.positionName = res.positionName;
    },
    async getPositions(warehouseId, query) {
      const positions = await loadSearchPosition({
        name: query,
        warehouseId
      });
      return positions || [];
    },
    handlePositionIdChange(positionId) {
      if (!positionId) return;
      this.cachePositionId = positionId;
    },
    handlePositionNameChange(positionName) {
      if (positionName) {
        this.ruleForm.positionName = positionName.replace(
          ALL_SPACE_REG_EXP,
          ""
        );
      } else {
        this.ruleForm.positionName = "";
      }
    },
    priorityCategoryChange(id) {
      if (id) {
        this.priorityCategory = id;
        const option = this.priorityCategorys.find(item => id == item.id);
        if (option) {
          this.displayPriorityCategory = `${defaultPriorityCategory}（${option.name}）`;
        } else {
          this.displayPriorityCategory = defaultPriorityCategory;
        }
      } else {
        this.displayPriorityCategory = defaultPriorityCategory;
        this.priorityCategory = 0;
      }
      this.setSalePrices(this.ruleForm.taxedPrice);
    },
    setSalePrices(price) {
      if (price || [0, "0"].includes(price)) {
        const params = {
          cooperatorId: this.header.cooperatorId,
          companyId: this.header.companyId || store.userInfoMsg().companyId,
          partId: this.partData.partId,
          taxedPurchasePrice: price,
          property: this.partData.property,
          priorityCategory: this.priorityCategory,
          mode: this.mode
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
            break;
        }
        reqPurchasePriceSettings(params).then(res => {
          this.refreshData = false;
          this.ruleForm = Object.assign(this.ruleForm, {
            priorityCategory: res?.priorityCategory ?? this.priorityCategory,
            salePrices: Object.assign(
              this.ruleForm.salePrices,
              res.salePrices ?? {}
            )
          });
          for (const price in this.ruleForm.salePrices) {
            this.ruleForm.salePrices[price] = res.salePrices[price] || 0;
            this.setMarkUpRate(this.ruleForm.salePrices[price], price);
          }
          const option = this.priorityCategorys.find(
            item => res?.priorityCategory == item.id
          );
          if (option) {
            this.displayPriorityCategory = `${defaultPriorityCategory}（${option?.name}）`;
          }
          this.$nextTick(() => {
            this.refreshData = true;
          });
        });
      } else {
        this.clearSalePrices();
      }
    },
    clearSalePrices() {
      this.ruleForm.salePrices.retail = "";
      this.ruleForm.salePrices.platform = "";
      this.ruleForm.salePrices.allot = "";
      this.ruleForm.salePrices.wholesale = "";
      this.ruleForm.salePrices.wholesale1 = "";
      this.ruleForm.salePrices.wholesale2 = "";
      this.ruleForm.salePrices.wholesale3 = "";
      this.ruleForm.salePrices.wholesale4 = "";
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
      this.setSalePrices(this.ruleForm.taxedPrice);
    },
    amountChange(amout) {
      this.ruleForm.taxedPrice = this.precisionFormat(
        divide(Number(amout || 0), Number(this.ruleForm.qty || 0)),
        "price"
      );
      this.setUnTaxedData();
      this.setSalePrices(this.ruleForm.taxedPrice);
    },
    setUnTaxedData() {
      if (Number(this.header.taxRate || 0)) {
        this.ruleForm.untaxedPrice = this.precisionFormat(
          getUnTaxedData.untaxedPrice(
            this.ruleForm.taxedPrice,
            this.header.taxRate
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
      if (this.loading) {
        return;
      }

      if (this.details.length && !this.isEdit) {
        if (
          this.details.find(item => {
            return (
              item.partId == this.ruleForm.partId &&
              item.positionId == this.ruleForm.positionId &&
              item.warehouseId == this.ruleForm.warehouseId
            );
          })
        ) {
          this.$confirm("[配件+仓库+货位]明细重复，是否继续添加？", {
            isFocusCancel: true
          }).then(() => {
            this.afterSureHandle();
          });
        } else {
          this.afterSureHandle();
        }
      } else {
        this.afterSureHandle();
      }
    },
    afterSureHandle() {
      this.$refs.ruleForm.validate(async (valid, err) => {
        if (valid) {
          if ([0, "0"].includes(this.ruleForm.taxedPrice)) {
            await this.$confirm("当前进价为0, 是否继续？", "提示", {
              type: "warning"
            });
          }

          if (
            this.isEasyMode &&
            !this.ruleForm.positionId &&
            this.ruleForm.positionName
          ) {
            this.loading = true;
            if (
              this.ruleForm.positionName &&
              this.ruleForm.positionName.length > QUICK_ADD_POSITION_LEN
            ) {
              this.$message.warning({
                message: `货位名称字数需小于等于${QUICK_ADD_POSITION_LEN}`,
                showClose: true
              });
              this.loading = false;
              return;
            }

            const positionIds = await quickGetPositions([
              {
                warehouseId: this.ruleForm.warehouseId,
                name: this.ruleForm.positionName
              }
            ]);
            this.loading = false;
            if (!positionIds) {
              return;
            }

            this.ruleForm.positionId = positionIds[0];
          }

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
    },
    setAllMarkUpRate() {
      for (const k in this.ruleForm.salePrices) {
        this.salePricesMarkUpRate[k] = this.getSaleProfit(
          this.ruleForm.salePrices[k]
        );
      }
    },
    setMarkUpRate(value, key) {
      this.$set(this.salePricesMarkUpRate, key, this.getSaleProfit(value));
    },
    getSaleProfit(price) {
      if (Number(this.ruleForm.taxedPrice || 0) && Number(price || 0)) {
        return parseFloat(
          Number(
            ((Number(price || 0) - Number(this.ruleForm.taxedPrice || 0)) /
              Number(this.ruleForm.taxedPrice || 0)) *
              100
          ).toPrecision(12)
        ).toFixed(2);
      } else {
        return 0;
      }
    },
    resetSalePrice(value, key) {
      if (Number(this.ruleForm.taxedPrice || 0) && Number(value)) {
        this.ruleForm.salePrices[key] = Number(
          Number(
            (value / 100) * Number(this.ruleForm.taxedPrice || 0) +
              Number(this.ruleForm.taxedPrice || 0)
          ).toPrecision(12)
        ).toFixed(2);
      } else {
        this.ruleForm.salePrices[key] = 0;
      }
    }
  },
  render() {
    return (
      <ht-dialog
        visible={this.relVisible}
        on={{
          "update:visible": val => (this.relVisible = val)
        }}
        title="编辑采购单明细"
        append-to-body
        width="660px"
        top="7vh"
        class="dialog-body ignore-top-hotkeys editReceiveBill"
      >
        <div class="container-box">
          {!this.warningMsg ? (
            <el-row gutter={5} style="height: 600px;">
              <el-col span={9} style="height: 100%;">
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
              <el-col span={15} style="height: 100%;">
                <ht-card title="采购信息" style="height: 100%;">
                  <div slot="after-title" style="text-align: right;">
                    <ht-select
                      v-model={this.displayPriorityCategory}
                      options={this.priorityCategorys}
                      clearable={false}
                      class="set-price-type"
                      default-value={this.defaultPriceType}
                      on-change={this.priorityCategoryChange}
                    />
                  </div>
                  <el-form
                    ref="ruleForm"
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
                    <Collapse
                      isCollapse={this.isCollapse}
                      on={{
                        "update:isCollapse": val => (this.isCollapse = val)
                      }}
                    >
                      <el-form-item prop="qty" label="进货数量">
                        <HtFormatNumber
                          v-model={this.ruleForm.qty}
                          v-delay-focus={this.visible}
                          min={1}
                          precision-type="qty"
                          on-change={this.qtyChange}
                        />
                      </el-form-item>
                      <el-form-item prop="taxedPrice" label="进价">
                        <div class="flex">
                          <HtFormatNumber
                            style="width:80px"
                            v-model={this.ruleForm.taxedPrice}
                            disabled={!this.canEdit}
                            min={0}
                            precision-type="price"
                            on-change={this.debouncePriceChange}
                          />
                          <div class="flex p-l-6" style="width:131px">
                            <div style="width:70px">正厂价</div>
                            <HtFormatNumber
                              value={this.partData.priceFactory}
                              disabled
                              min={0}
                              precision-type="price"
                            />
                          </div>
                        </div>
                      </el-form-item>
                      {this.showRetailPrice ? (
                        <el-form-item label="零售价">
                          <div class="flex">
                            <HtFormatNumber
                              style="width:80px"
                              v-model={this.ruleForm.salePrices.retail}
                              min={0}
                              precision-type="price"
                              on-change={val => {
                                this.setMarkUpRate(val, "retail");
                              }}
                            />
                            <div class="flex p-l-6" style="width:131px">
                              <div style="width:70px">加价率</div>
                              <HtFormatNumber
                                value={this.salePricesMarkUpRate.retail}
                                min={-100}
                                precision-type="price"
                                on-change={val => {
                                  this.resetSalePrice(val, "retail");
                                }}
                              >
                                <span slot="append">%</span>
                              </HtFormatNumber>
                            </div>
                          </div>
                        </el-form-item>
                      ) : null}
                      <el-form-item prop="taxedAmount" label="金额">
                        <HtFormatNumber
                          v-model={this.ruleForm.taxedAmount}
                          disabled={!this.canEdit}
                          min={0}
                          precision-type="money"
                          on-change={this.amountChange}
                        />
                      </el-form-item>
                      <el-form-item prop="property" label="配件性质">
                        <ht-autocomplete
                          v-model={this.ruleForm.property}
                          fetch-suggestions={this.autocompleteSearchProperty}
                          trigger-on-focus={false}
                          highlight-first-item
                          placeholder="配件性质"
                        />
                      </el-form-item>
                      <el-form-item prop="warehouseId" label="到货仓库">
                        <ht-autoselect
                          v-model={this.ruleForm.warehouseId}
                          fetch-suggestions={query =>
                            this.searchLoadAssignWarehouses({
                              name: query,
                              status: 0,
                              assignCompanyId: this.companyId
                            })
                          }
                          defaultValue={this.ruleForm.warehouseName}
                          remote
                          filter-zero
                          trigger-on-focus={false}
                          highlight-first-item
                          placeholder="请选择"
                          on-change={this.handleWarehouseChange}
                        />
                      </el-form-item>
                      <el-form-item label="货位" prop="positionId">
                        {this.isEasyMode ? (
                          <ht-autoselect
                            v-model={this.ruleForm.positionId}
                            keepInputValue={this.ruleForm.positionName}
                            fetch-suggestions={query =>
                              this.getPositions(
                                this.ruleForm.warehouseId,
                                query
                              )
                            }
                            defaultValue={this.ruleForm.positionName}
                            remote
                            filter-zero
                            keep-input
                            clearable
                            no-match-text=""
                            highlight-first-item
                            trigger-on-focus={false}
                            placeholder="请选择"
                            on-input-change={this.handlePositionNameChange}
                            on-change={this.handlePositionIdChange}
                          />
                        ) : (
                          <ht-autoselect
                            v-model={this.ruleForm.positionId}
                            fetch-suggestions={query =>
                              this.getPositions(
                                this.ruleForm.warehouseId,
                                query
                              )
                            }
                            defaultValue={this.ruleForm.positionName}
                            remote
                            filter-zero
                            clearable
                            trigger-on-focus={false}
                            highlight-first-item
                            placeholder="请选择"
                            on-change={this.handlePositionIdChange}
                          />
                        )}
                      </el-form-item>
                      <el-form-item label="预计到货日期" prop="arrivalDate">
                        <el-date-picker
                          v-model={this.ruleForm.arrivalDate}
                          type="date"
                          placeholder="选择日期"
                          value-format="yyyy-MM-dd"
                        />
                      </el-form-item>
                      {this.refreshData ? (
                        <div slot="collapse">
                          {this.showPlatformPrice ? (
                            <el-form-item label="平台价">
                              <div class="flex">
                                <HtFormatNumber
                                  style="width: 80px"
                                  v-model={this.ruleForm.salePrices.platform}
                                  min={0}
                                  precision-type="price"
                                  on-change={val => {
                                    this.setMarkUpRate(val, "platform");
                                  }}
                                />
                                <div class="flex p-l-6" style="width:131px">
                                  <div style="width:70px">加价率</div>
                                  <HtFormatNumber
                                    value={this.salePricesMarkUpRate.platform}
                                    min={-100}
                                    precision-type="price"
                                    on-change={val => {
                                      this.resetSalePrice(val, "platform");
                                    }}
                                  >
                                    <span slot="append">%</span>
                                  </HtFormatNumber>
                                </div>
                              </div>
                            </el-form-item>
                          ) : null}
                          {this.showTransferPrice ? (
                            <el-form-item label="调拨价">
                              <div class="flex">
                                <HtFormatNumber
                                  style="width: 80px"
                                  v-model={this.ruleForm.salePrices.allot}
                                  min={0}
                                  precision-type="price"
                                  on-change={val => {
                                    this.setMarkUpRate(val, "allot");
                                  }}
                                />
                                <div class="flex p-l-6" style="width:131px">
                                  <div style="width:70px">加价率</div>
                                  <HtFormatNumber
                                    value={this.salePricesMarkUpRate.allot}
                                    min={-100}
                                    precision-type="price"
                                    on-change={val => {
                                      this.resetSalePrice(val, "allot");
                                    }}
                                  >
                                    <span slot="append">%</span>
                                  </HtFormatNumber>
                                </div>
                              </div>
                            </el-form-item>
                          ) : null}
                          {this.showWholeSalePrice ? (
                            <el-form-item label="批发价">
                              <div class="flex">
                                <HtFormatNumber
                                  style="width: 80px"
                                  v-model={this.ruleForm.salePrices.wholesale}
                                  min={0}
                                  precision-type="price"
                                  on-change={val => {
                                    this.setMarkUpRate(val, "wholesale");
                                  }}
                                />
                                <div class="flex p-l-6" style="width:131px">
                                  <div style="width:70px">加价率</div>
                                  <HtFormatNumber
                                    value={this.salePricesMarkUpRate.wholesale}
                                    min={-100}
                                    precision-type="price"
                                    on-change={val => {
                                      this.resetSalePrice(val, "wholesale");
                                    }}
                                  >
                                    <span slot="append">%</span>
                                  </HtFormatNumber>
                                </div>
                              </div>
                            </el-form-item>
                          ) : null}
                          {this.showWholeSalePrice1 ? (
                            <el-form-item label="批发价一">
                              <div class="flex">
                                <HtFormatNumber
                                  style="width: 80px"
                                  v-model={this.ruleForm.salePrices.wholesale1}
                                  min={0}
                                  precision-type="price"
                                  on-change={val => {
                                    this.setMarkUpRate(val, "wholesale1");
                                  }}
                                />
                                <div class="flex p-l-6" style="width:131px">
                                  <div style="width:70px">加价率</div>
                                  <HtFormatNumber
                                    value={this.salePricesMarkUpRate.wholesale1}
                                    min={-100}
                                    precision-type="price"
                                    on-change={val => {
                                      this.resetSalePrice(val, "wholesale1");
                                    }}
                                  >
                                    <span slot="append">%</span>
                                  </HtFormatNumber>
                                </div>
                              </div>
                            </el-form-item>
                          ) : null}
                          {this.showWholeSalePrice2 ? (
                            <el-form-item label="批发价二">
                              <div class="flex">
                                <HtFormatNumber
                                  style="width: 80px"
                                  v-model={this.ruleForm.salePrices.wholesale2}
                                  min={0}
                                  precision-type="price"
                                  on-change={val => {
                                    this.setMarkUpRate(val, "wholesale2");
                                  }}
                                />
                                <div class="flex p-l-6" style="width:131px">
                                  <div style="width:70px">加价率</div>
                                  <HtFormatNumber
                                    value={this.salePricesMarkUpRate.wholesale2}
                                    min={-100}
                                    precision-type="price"
                                    on-change={val => {
                                      this.resetSalePrice(val, "wholesale2");
                                    }}
                                  >
                                    <span slot="append">%</span>
                                  </HtFormatNumber>
                                </div>
                              </div>
                            </el-form-item>
                          ) : null}
                          {this.showWholeSalePrice3 ? (
                            <el-form-item label="批发价三">
                              <div class="flex">
                                <HtFormatNumber
                                  style="width: 80px"
                                  v-model={this.ruleForm.salePrices.wholesale3}
                                  min={0}
                                  precision-type="price"
                                  on-change={val => {
                                    this.setMarkUpRate(val, "wholesale3");
                                  }}
                                />
                                <div class="flex p-l-6" style="width:131px">
                                  <div style="width:70px">加价率</div>
                                  <HtFormatNumber
                                    value={this.salePricesMarkUpRate.wholesale3}
                                    min={-100}
                                    precision-type="price"
                                    on-change={val => {
                                      this.resetSalePrice(val, "wholesale3");
                                    }}
                                  >
                                    <span slot="append">%</span>
                                  </HtFormatNumber>
                                </div>
                              </div>
                            </el-form-item>
                          ) : null}
                          {this.showWholeSalePrice4 ? (
                            <el-form-item label="批发价四">
                              <div class="flex">
                                <HtFormatNumber
                                  style="width: 80px"
                                  v-model={this.ruleForm.salePrices.wholesale4}
                                  min={0}
                                  precision-type="price"
                                  on-change={val => {
                                    this.setMarkUpRate(val, "wholesale4");
                                  }}
                                />
                                <div class="flex p-l-6" style="width:131px">
                                  <div style="width:70px">加价率</div>
                                  <HtFormatNumber
                                    value={this.salePricesMarkUpRate.wholesale4}
                                    min={-100}
                                    precision-type="price"
                                    on-change={val => {
                                      this.resetSalePrice(val, "wholesale4");
                                    }}
                                  >
                                    <span slot="append">%</span>
                                  </HtFormatNumber>
                                </div>
                              </div>
                            </el-form-item>
                          ) : null}
                          <el-form-item label="税额" prop="taxAmount">
                            <HtFormatNumber
                              v-model={this.ruleForm.taxAmount}
                              min={0}
                              precision-type="money"
                              on-blur={this.taxAmountBlur}
                            />
                          </el-form-item>
                          <el-form-item label="备注" prop="remark">
                            <ht-input
                              v-model={this.ruleForm.remark}
                              placeholder="最大支持100个字符"
                              maxlength="100"
                            />
                          </el-form-item>
                        </div>
                      ) : null}
                    </Collapse>
                  </el-form>
                </ht-card>
              </el-col>
            </el-row>
          ) : (
            <ht-card style="text-align: center;">{this.warningMsg}</ht-card>
          )}

          <div style="margin: 10px 0 5px 0; text-align: center;">
            {!this.warningMsg ? (
              <el-button
                v-loading={this.loading}
                type="primary"
                size="mini"
                plain
                on-click={e => this.sureHandle(e)}
              >
                确定（F3）
              </el-button>
            ) : null}
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
.editReceiveBill {
  &::v-deep .el-input-group__append {
    padding: 0 4px;
  }
  &::v-deep .el-input__inner {
    padding-left: 8px;
    padding-right: 4px;
  }
  &::v-deep .el-input__icon.el-icon-date {
    display: none;
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
