<template>
  <ht-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="true"
    :width="boxWidth"
    v-bind="$attrs"
    title="编辑急件到货单明细"
    @open="openHandle"
    @closed="closedHandle"
    v-on="$listeners"
  >
    <div v-loading="pageLoading">
      <el-form
        ref="detailsForm"
        :rules="rules"
        :model="ruleForm"
        :show-message="false"
        size="mini"
        label-width="71px"
        label-position="left"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10" type="flex">
          <el-col>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="配件编码：" label-width="101px">
                  <span>{{ data.code }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="配件名称：" label-width="101px">
                  <span>{{ data.name }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="待处理急件数：" label-width="101px">
                  <span class="text-warning">{{ data.qty }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="配件品牌：" label-width="101px">
                  <span>{{ data.brand }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="产地：" label-width="101px">
                  <span>{{ data.productionPlace }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="hr-title" />
            <el-row>
              <el-col :span="22" :offset="1">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="供应商" prop="cooperatorId">
                      <CooperatorsSelect
                        v-model="ruleForm.cooperatorId"
                        :default-value.sync="ruleForm.cooperatorName"
                        :allow-create="
                          hasCompletePerm('basics.cooperators.createSupplier')
                        "
                        no-data-tips="没有查询到供应商,回车新增"
                        type="supplier"
                        placeholder="请选择"
                        @change="cooperatorChange"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="businessManId" label="业务员">
                      <ht-autoselect
                        v-model="ruleForm.businessManId"
                        :default-value.sync="ruleForm.businessManName"
                        :options="store().purchaseMen()"
                        :trigger-on-focus="false"
                        placeholder="请选择"
                        clearable
                        filter-zero
                        highlight-first-item
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      prop="enhancedSettlementType"
                      label="支付方式"
                    >
                      <ht-autoselect
                        v-model="ruleForm.enhancedSettlementType"
                        :clearable="false"
                        :options="store().enhancedSettlementTypeDictionary()"
                        :trigger-on-focus="false"
                        placeholder="请选择"
                        mnemonic
                        filter-zero
                        highlight-first-item
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="发票类型" prop="invoiceType">
                      <ht-autoselect
                        v-model="ruleForm.invoiceType"
                        :options="store().formatInvoiceTypeDictionary()"
                        @change="handleInvoiceChange"
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="订货数量" prop="qty">
                      <HtFormatNumber
                        v-model="ruleForm.qty"
                        :min="1"
                        precision-type="qty"
                        @change="qtyChange"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="property" label="配件性质">
                      <ht-autocomplete
                        v-model="ruleForm.property"
                        :fetch-suggestions="autocompleteSearchProperty"
                        :trigger-on-focus="false"
                        placeholder="配件性质"
                        highlight-first-item
                      />
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="单价" prop="taxedPrice">
                      <HtFormatNumber
                        v-model.number="ruleForm.taxedPrice"
                        :min="0"
                        precision-type="price"
                        @change="priceChange"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="金额" prop="taxedAmount">
                      <HtFormatNumber
                        v-model="ruleForm.taxedAmount"
                        :min="0"
                        precision-type="money"
                        @change="amountChange"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="未税单价" prop="untaxedPrice">
                      <HtFormatNumber
                        v-model="ruleForm.untaxedPrice"
                        disabled
                        precision-type="price"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="未税金额" prop="untaxedAmount">
                      <HtFormatNumber
                        v-model="ruleForm.untaxedAmount"
                        disabled
                        precision-type="money"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="税率" prop="taxRate">
                      <HtPercentInput v-model="ruleForm.taxRate" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="税额" prop="taxAmount">
                      <HtFormatNumber
                        v-model="ruleForm.taxAmount"
                        :min="0"
                        precision-type="money"
                        @blur="taxAmountBlur"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item label="备注" prop="remark">
                      <ht-input v-model="ruleForm.remark" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <div class="text-right">
                  <el-button
                    v-show="showPriceSetting == false"
                    type="text"
                    size="mini"
                    @click.stop="showPriceSetting = true"
                  >
                    售价设置 &gt;
                  </el-button>
                  <el-button
                    v-show="showPriceSetting == true"
                    type="text"
                    size="mini"
                    @click.stop="showPriceSetting = false"
                  >
                    &lt; 售价设置
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col v-if="showPriceSetting" style="flex:none;width:450px">
            <div class="hr-title" style="margin-top:0">
              售价设置
            </div>
            <ht-table
              :data="filterOtherPriceData"
              :set-height="false"
              height="293"
              disabled-hotkeys
            >
              <el-table-column
                v-for="(priceColumn, index) in otherPriceColumns"
                :key="index"
                :prop="priceColumn.prop"
                :label="priceColumn.label"
              >
                <template slot-scope="scope">
                  <template v-if="priceColumn.prop === 'price'">
                    <HtFormatNumber
                      v-model="scope.row.price"
                      precision-type="price"
                      size="mini"
                      :min="0"
                      @change="salePriceHandle(scope.row, 'price')"
                    />
                  </template>
                  <template v-else-if="priceColumn.prop === 'profit'">
                    <el-row type="flex">
                      <el-col>
                        <HtPercentInput
                          v-model="scope.row.profit"
                          size="mini"
                          :min="-1"
                          :max="Infinity"
                          :fixedNum="4"
                          precision-type="price"
                          @change="salePriceHandle(scope.row, 'profit')"
                        />
                      </el-col>
                    </el-row>
                  </template>
                  <template v-else>
                    {{ scope.row[priceColumn.prop] }}
                  </template>
                </template>
              </el-table-column>
            </ht-table>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <merge-dialog
      :visible.sync="mergeInfo.visible"
      :req-type="mergeInfo.reqType"
      :req-body="mergeInfo.reqBody"
      :bill-list="mergeInfo.billList"
      @done="mergeDone"
    />
    <div slot="footer" class="dialog-footer-align">
      <el-button
        :loading="sureLoading"
        :disabled="!canSubmit"
        type="primary"
        plain
        size="mini"
        @click.stop="sureHandle"
      >
        确定（F3）
      </el-button>
      <el-button
        :disabled="sureLoading2"
        type="primary"
        plain
        size="mini"
        @click.stop="hideBox"
      >
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>
<script>
import { debounce } from "lodash";
import { CooperatorsSelect } from "@/components/select";
import {
  createPurchaseDispatch,
  reqPurchaseDispatchDefaultPrice
} from "@/api/purchase/purchaseDispatch/pending";
import { reqPurchaseSupplierDefault } from "@/api/purchase/suppliersDefault";
import MergeDialog from "../components/MergeDialog";
import { mapState } from "vuex";
import { precisionsFixed, searchMixin } from "@/mixins";
import { receiveFilters } from "@/utils/tool";
import { add, divide, multiply } from "@/utils/numberAPI";
import { validMoney, validQty } from "@/utils/validate";
import getUnTaxedData from "@/utils/getUnTaxedData";
import { resetBelongsItem } from "@/mixins/permissionsMixin";
import * as store from "@/utils/store";

const defaultRuleForm = {
  enhancedSettlementType: "",
  invoiceType: "",
  property: "完好",
  qty: null,
  taxedPrice: null,
  taxedAmount: null,
  taxRate: 0,
  taxAmount: null,
  untaxedPrice: null,
  untaxedAmount: null,
  cooperatorId: null,
  cooperatorName: "",
  businessManId: null,
  businessManName: "",
  remark: "",
  retailPrice: null,
  transferPrice: null,
  platformPrice: null,
  wholeSalePrice: null,
  wholeSalePrice1: null,
  wholeSalePrice2: null,
  wholeSalePrice3: null,
  wholeSalePrice4: null
};

export default {
  name: "EditUrgentBillBox",
  components: {
    CooperatorsSelect,
    MergeDialog
  },
  mixins: [searchMixin, precisionsFixed],
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    check: {
      type: Function,
      default: () => ({})
    },
    header: {
      type: Object,
      default: () => ({})
    },
    details: {
      type: Array,
      default: () => []
    }
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
      mergeInfo: {
        reqType: "create",
        reqBody: {},
        billList: [],
        visible: false
      },
      showPriceSetting: false,
      editTitle: "",
      ruleForm: { ...defaultRuleForm },
      maxTaxAmount: 0,
      minTaxAmount: 0,
      rules: {
        cooperatorId: [{ required: true, message: "请选择供应商" }],
        enhancedSettlementType: [{ required: true, message: "请选择支付方式" }],
        qty: [
          { required: true, validator: validQty, message: "请输入订货数量" }
        ],
        taxedPrice: [
          { required: true, validator: validMoney, message: "请输入单价" }
        ],
        taxedAmount: [
          { required: true, validator: validMoney, message: "请输入金额" }
        ],
        taxAmount: [
          { required: true, validator: validTaxAmount, message: "请输入税额" }
        ],
        property: [{ required: true, message: "请选择配件性质" }]
      },
      sureLoading: false,
      sureLoading2: false,
      pageLoading: false,

      otherPriceColumns: [
        { prop: "typeName", label: "价格类型", width: "" },
        { prop: "price", label: "价格", width: "", type: "number" },
        { prop: "profit", label: "加价率", width: "", type: "number" }
      ],
      otherPriceData: [
        {
          prop: "retailPrice",
          typeName: "零售价",
          price: null,
          profit: null
        },
        {
          prop: "platformPrice",
          typeName: "平台价",
          price: null,
          profit: null
        },
        {
          prop: "transferPrice",
          typeName: "调拨价",
          price: null,
          profit: null
        },
        {
          prop: "wholeSalePrice",
          typeName: "批发价",
          price: null,
          profit: null
        },
        {
          prop: "wholeSalePrice1",
          typeName: "批发价一",
          price: null,
          profit: null
        },
        {
          prop: "wholeSalePrice2",
          typeName: "批发价二",
          price: null,
          profit: null
        },
        {
          prop: "wholeSalePrice3",
          typeName: "批发价三",
          price: null,
          profit: null
        },
        {
          prop: "wholeSalePrice4",
          typeName: "批发价四",
          price: null,
          profit: null
        }
      ],
      debounceGetPrice: debounce(this.refreshDefaultPrice, 500)
    };
  },
  computed: {
    boxWidth() {
      return this.showPriceSetting ? "1200px" : "750px";
    },
    ...mapState("admin", {
      taxAdjustRange: state => state.systemParams.precisions.taxAdjustRange
    }),
    canSubmit() {
      return this.ruleForm.cooperatorId && !this.sureLoading;
    },
    filterOtherPriceData() {
      return this.otherPriceData.filter(item =>
        this.hasBelongsPermWithoutRoute(
          item.prop,
          "specials.pricesRead",
          resetBelongsItem(this.data.belongs, ["self", "others"], "our")
        )
      );
    }
  },
  watch: {
    "ruleForm.taxedPrice"() {
      this.debounceGetPrice();
    }
  },
  methods: {
    store() {
      return store;
    },
    openHandle() {
      this.ruleForm.taxRate = this.header.taxRate || 0;
      this.ruleForm.cooperatorId = this.header.cooperatorId;
      Object.keys(this.ruleForm).forEach(key => {
        if (this.data[key]) {
          this.ruleForm[key] = this.data[key];
        }
      });
      if (this.ruleForm.cooperatorId) {
        this.cooperatorChange(this.data.cooperatorId);
      }
      if (this.data.partId) {
        this.editTitle = "编辑订货明细";
      } else {
        this.editTitle = "新增订货明细";
      }
      this.pageLoading = true;
      reqPurchaseDispatchDefaultPrice(
        this.data.urgentId,
        this.ruleForm.cooperatorId,
        this.ruleForm.taxedPrice
      )
        .then(data => {
          this.otherPriceData.forEach(item => {
            item.price = data[item.prop];
          });
          if (data.taxedPrice && !this.ruleForm.taxedPrice) {
            this.ruleForm.taxedPrice = data.taxedPrice;
          }
          if (this.data.qty) {
            this.ruleForm.qty = this.data.qty;
          }
          this.priceChange(this.ruleForm.taxedPrice);
          this.salePriceHandle();
          this.$nextTick(() => {
            this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
          });
          this.pageLoading = false;
        })
        .catch(() => {
          this.pageLoading = false;
        });
    },
    refreshDefaultPrice() {
      reqPurchaseDispatchDefaultPrice(
        this.data.urgentId,
        this.ruleForm.cooperatorId,
        this.ruleForm.taxedPrice
      ).then(data => {
        this.otherPriceData.forEach(item => {
          item.price = data[item.prop];
          item.profit = this.getProfit(item.price);
        });
      });
    },
    handleInvoiceChange(invoiceName) {
      const curInvoice = store
        .formatInvoiceTypeDictionary()
        .find(item => item.id === invoiceName);
      this.ruleForm.taxRate = curInvoice ? curInvoice.specialValue : null;
      this.setUnTaxedData();
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
    amountChange(amout) {
      this.ruleForm.taxedPrice = this.precisionFormat(
        divide(Number(amout || 0), Number(this.ruleForm.qty || 0)),
        "price"
      );
      this.setUnTaxedData();
    },
    setUnTaxedData() {
      if (Number(this.ruleForm.taxRate || 0)) {
        this.ruleForm.untaxedPrice = this.precisionFormat(
          getUnTaxedData.untaxedPrice(
            this.ruleForm.taxedPrice,
            this.ruleForm.taxRate
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

    getProfit(salesPrice) {
      if (Number(this.ruleForm.taxedPrice) && Number(salesPrice)) {
        return parseFloat(
          (
            (salesPrice - Number(this.ruleForm.taxedPrice)) /
            Number(this.ruleForm.taxedPrice)
          ).toFixed(2)
        );
      } else {
        return 0;
      }
    },
    getSalesPrice(profit) {
      if (this.ruleForm.taxedPrice) {
        profit = profit || 0;
        return this.precisionFormat(
          multiply(
            Number(this.ruleForm.taxedPrice || 0),
            add(1, Number(profit || 0))
          ),
          "price"
        );
      } else {
        return null;
      }
    },
    getForm() {
      return this.$refs["detailsForm"];
    },
    hideBox() {
      this.$emit("update:visible", false);
    },
    cooperatorChange(val) {
      if (!val) {
        return;
      }
      reqPurchaseSupplierDefault(val)
        .then(data => {
          const params = receiveFilters(data);
          this.ruleForm = { ...this.ruleForm, ...params };
          this.setUnTaxedData();
        })
        .catch(() => {});
    },
    closedHandle() {
      this.pageLoading = false;
      this.editTitle = "";
      this.clearForm();
    },
    salePriceHandle(row, type) {
      if (this.ruleForm.taxedPrice) {
        if (row) {
          if (type == "price") {
            row.profit = this.getProfit(row.price);
          } else if (type == "profit") {
            row.price = this.getSalesPrice(row.profit);
          }
        } else {
          this.otherPriceData.forEach(item => {
            if (item.price) {
              item.profit = this.getProfit(item.price);
            } else if (item.profit) {
              item.price = this.getSalesPrice(item.profit);
            }
          });
        }
      }
    },
    sureHandle() {
      if (!this.ruleForm.cooperatorId || this.sureLoading) return;
      this.getForm().validate((valid, err) => {
        if (valid) {
          const pricesInfo = {};
          this.otherPriceData.forEach(function(item) {
            pricesInfo[item.prop] = item.price || 0;
          });
          this.sureLoading = true;
          const req = {
            ...this.ruleForm,
            ...pricesInfo,
            urgentId: this.data.urgentId
          };
          createPurchaseDispatch(req)
            .then(res => {
              this.sureLoading = false;
              if (res.code === "ok") {
                this.hideBox();
                this.$emit("on-success");
                this.$message({
                  type: "success",
                  message: "创建急件到货单成功"
                });
              } else if (res.code === "merge-option") {
                this.mergeInfo.reqBody = req;
                this.mergeInfo.billList = res.data;
                this.mergeInfo.visible = true;
              } else {
                this.$message({
                  message: res.message,
                  type: "error"
                });
              }
            })
            .catch(() => {
              this.sureLoading = false;
            });
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
    },
    clearForm() {
      this.ruleForm = { ...defaultRuleForm };
    },
    mergeDone(isMerge) {
      this.hideBox();
      this.$emit("on-success", isMerge);
      this.$message({
        type: "success",
        message: "创建急件到货单成功"
      });
    }
  }
};
</script>
