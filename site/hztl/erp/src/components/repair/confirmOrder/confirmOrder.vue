<template>
  <div class="confirm-order-wrap">
    <div
      class="flex-block-bg btns"
      style="margin-bottom:10px;"
      v-if="!hideBtn && !isCheck"
    >
      <el-button
        type="primary"
        size="small"
        :disabled="!enableEdit"
        @click="save"
        >保存</el-button
      >
      <el-button
        type="primary"
        size="small"
        :disabled="!enableEdit"
        @click="push"
        >提交</el-button
      >
      <el-button
        v-if="showCheck"
        type="primary"
        size="small"
        :disabled="!enableEdit"
        @click="$emit('check')"
        >查看</el-button
      >
      <span style="marginLeft:10px;">{{
        isQuote
          ? "提交后报价确认单将以当前报价明细发送至车主端供车主查看与签字确认"
          : "提交后结算确认单将以当前结算明细发送至车主端供车主查看与签字确认"
      }}</span>
    </div>
    <!-- 费用合计 -->
    <div class="confirm-table" v-if="info.total">
      <div class="confirm-table-title"><span>费用合计</span></div>
      <div class="confirm-table-content">
        <div class="sub-header">
          <div class="line" v-if="isQuote">
            <div class="sub-heaeder-item line-title"></div>
            <div class="sub-heaeder-item line-colums">工时费（1）</div>
            <div class="sub-heaeder-item line-colums">材料费（2）</div>
            <div class="sub-heaeder-item line-colums">其他费用（3）</div>
            <div class="sub-heaeder-item line-colums">小计（1+2+3）</div>
          </div>
          <div class="line" v-else>
            <div class="sub-heaeder-item line-title"></div>
            <div class="sub-heaeder-item line-colums">工时费（1）</div>
            <div class="sub-heaeder-item line-colums">预计材料费（2）</div>
            <div class="sub-heaeder-item line-colums">已领材料费（3）</div>
            <div class="sub-heaeder-item line-colums">其他费用（4）</div>
            <div class="sub-heaeder-item line-colums">小计（1+2+4）</div>
            <div class="sub-heaeder-item line-colums">小计（1+3+4）</div>
          </div>
        </div>
        <div class="sub-body" v-if="isQuote">
          <div
            class="sub-body-line line"
            v-for="(subTotal, index) in info.total.rows"
            :key="index"
          >
            <div class="line-title">
              {{ FEE_PROPERTY[subTotal.feeProperty] }}
            </div>
            <div class="line-colums">
              {{ subTotal.itemAmount }}
            </div>
            <div class="line-colums">
              {{ subTotal.partAmount }}
            </div>
            <div class="line-colums">
              {{ subTotal.extraFeeAmount }}
            </div>
            <div class="line-colums">
              {{ subTotal.totalAmount }}
            </div>
          </div>
          <div class="sub-body-total line">
            <div class="line-title">
              合计
            </div>
            <div class="line-colums">
              {{ info.total.itemAmount }}
            </div>
            <div class="line-colums">
              {{ info.total.partTotalAmount }}
            </div>

            <div class="line-colums">
              {{ info.total.extraFeeTotalAmount }}
            </div>

            <div class="line-colums">
              {{ info.total.totalAmount }}
            </div>
          </div>
        </div>
        <div class="sub-body" v-else>
          <div
            class="sub-body-line line"
            v-for="(subTotal, index) in info.total.rows"
            :key="index"
          >
            <div class="line-title">
              {{ FEE_PROPERTY[subTotal.feeProperty] }}
            </div>
            <div class="line-colums">
              {{ subTotal.itemAmount }}
            </div>
            <div class="line-colums">
              {{ subTotal.partAmount }}
            </div>
            <div class="line-colums">
              {{ subTotal.partDueAmount }}
            </div>
            <div class="line-colums">
              {{ subTotal.extraFeeDueAmount }}
            </div>
            <div class="line-colums">
              {{ subTotal.totalAmount }}
            </div>
            <div class="line-colums">
              {{ subTotal.totalDueAmount }}
            </div>
          </div>
          <div class="sub-body-total line">
            <div class="line-title">
              合计
            </div>
            <div class="line-colums">
              {{ info.total.itemTotalDueAmount }}
            </div>
            <div class="line-colums">
              {{ info.total.partTotalAmount }}
            </div>
            <div class="line-colums">
              {{ info.total.partTotalDueAmount }}
            </div>
            <div class="line-colums">
              {{ info.total.extraFeeTotalDueAmount }}
            </div>

            <div class="line-colums">
              {{ info.total.totalAmount }}
            </div>
            <div class="line-colums">
              {{ info.total.totalDueAmount }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 服务工时费用 -->
    <div class="confirm-table" v-if="itemData">
      <div class="confirm-table-title">
        <span>服务工时费用</span>
        <span class="input-wrap">
          <span v-if="enableEdit">批量设置折扣</span>
          <HtFormatNumber
            v-if="enableEdit"
            v-model="itemDiscount"
            :min="0"
            size="mini"
            :precision-type="'price'"
            @set="patchItemDiscountChange($event)"
          />
        </span>
      </div>
      <div class="confirm-table-content">
        <el-table :data="itemData" border style="width: 100%">
          <el-table-column prop="index" label="序号" width="50">
          </el-table-column>
          <el-table-column label="项目编号" width="180">
            <template slot-scope="scope">
              {{ scope.row.itemCode }}
            </template>
          </el-table-column>
          <el-table-column label="项目名称">
            <template slot-scope="scope">
              {{
                scope.row.setId > 0
                  ? `${scope.row.itemName}(${scope.row.setName})`
                  : scope.row.itemName
              }}
            </template>
          </el-table-column>
          <el-table-column label="收费性质">
            <template slot-scope="scope">
              {{ FEE_PROPERTY[scope.row.feeProperty] }}
            </template>
          </el-table-column>
          <el-table-column
            prop="chargeManHour"
            label="收费工时"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="manHourPrice"
            label="工时单价"
            width="180"
          ></el-table-column>
          <el-table-column prop="discountRateLabel" label="折扣" width="180">
            <template slot-scope="scope">
              <HtFormatNumber
                v-if="showDiscountInput(scope.row)"
                v-model="scope.row.discountRateLabel"
                size="mini"
                :min="0"
                :precisionNumber="2"
                :precision-type="'price'"
                @set="
                  itemDiscountChange(scope.$index, 'discountRateLabel', $event)
                "
              />
              <span v-else>
                {{
                  scope.row.index !== "小计"
                    ? scope.row.discountRate
                      ? scope.row.discountRateLabel
                      : "-"
                    : ""
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="discountManHourPrice"
            label="折后单价"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="amount"
            label="收费金额"
            width="180"
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 配件材料费用 -->
    <div class="confirm-table" v-if="partData">
      <div class="confirm-table-title">
        <span>配件材料费用</span>
        <span class="input-wrap">
          <span v-if="enableEdit">批量设置折扣</span>
          <HtFormatNumber
            v-if="enableEdit"
            v-model="partDiscount"
            :min="0"
            size="mini"
            :precision-type="'price'"
            @set="patchPartDiscountChange($event)"
          />
        </span>
      </div>
      <div class="confirm-table-content">
        <el-table :data="partData" border style="width: 100%">
          <el-table-column prop="index" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="partCode" label="配件编号" width="180">
          </el-table-column>
          <el-table-column prop="partName" label="配件名称" width="220">
            <template slot-scope="scope" v-if="scope.row.index !== '小计'">
              {{
                scope.row.setId > 0
                  ? `${scope.row.partName}(${scope.row.setName})`
                  : `${scope.row.partName}`
              }}
            </template>
          </el-table-column>
          <el-table-column label="收费性质">
            <template slot-scope="scope">
              {{ FEE_PROPERTY[scope.row.feeProperty] }}
            </template>
          </el-table-column>
          <el-table-column
            :label="isQuote ? '(预计）数量' : '已领数量'"
            width="180"
          >
            <template slot-scope="scope" v-if="scope.row.index !== '小计'">
              {{ isQuote ? `${scope.row.qty}` : `${scope.row.dueQty}` }}
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价"
            width="180"
          ></el-table-column>
          <el-table-column prop="discountRateLabel" label="折扣" width="180">
            <template slot-scope="scope">
              <HtFormatNumber
                v-if="showDiscountInput(scope.row)"
                v-model="scope.row.discountRateLabel"
                size="mini"
                :min="1"
                :precision-number="2"
                :precision-type="'price'"
                @set="
                  partDiscountChange(scope.$index, 'discountRateLabel', $event)
                "
              />
              <span v-else>
                {{
                  scope.row.index !== "小计"
                    ? scope.row.discountRate
                      ? scope.row.discountRateLabel
                      : "-"
                    : ""
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="discountPrice"
            label="折后单价"
            width="180"
          ></el-table-column>
          <el-table-column prop="amount" label="收费金额" width="180">
            <template slot-scope="scope">
              {{
                isQuote
                  ? `${scope.row.amount}`
                  : `${
                      scope.row.index == "小计"
                        ? scope.row.amount
                        : scope.row.dueAmount
                    }`
              }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 其他费用 -->
    <div class="confirm-table" v-if="otherData">
      <div class="confirm-table-title">
        <span>其他费用</span>
      </div>
      <div class="confirm-table-content">
        <el-table :data="otherData" border style="width: 100%">
          <el-table-column prop="index" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="name" label="费用名称"></el-table-column>
          <el-table-column label="收费性质" width="180">
            <template slot-scope="scope">
              {{ FEE_PROPERTY[scope.row.feeProperty] }}
            </template>
          </el-table-column>
          <el-table-column prop="qty" label="收费数量"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
          <el-table-column prop="price" label="单价"></el-table-column>
          <el-table-column
            prop="amount"
            label="收费金额"
            width="180"
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 其他信息 -->
    <div class="co-line" style="margin-top:25px;">
      <span class="co-label">合计报价金额</span>
      <span style="font-size:18px;font-wifht:bold;color:#3AA7FF;"
        >¥ {{ totalAmount }}</span
      >
      <span style="margin-left:10px;color:#999;"
        >合计服务工时费用收费金额（自费） + 合计配件材料费用收费金额（自费） +
        其他费用</span
      >
    </div>
    <div class="co-line">
      <span class="co-label"
        ><el-checkbox
          v-if="!hideBtn"
          v-model="isCustomerSelect"
          @change="isUseCustomerChange"
          >使用会员权益</el-checkbox
        ><span v-else>使用会员权益</span></span
      >
      <div>
        <ht-autoselect
          :disabled="!enableEdit || !isCustomerSelect"
          v-model="formData.memberDiscountName"
          :default-value.sync="formData.memberDiscountCardLabel"
          :fetch-suggestions="query => setOptions(query)"
          @select="memberDiscountChange"
          size="small"
          remote
          clearable
          style="width:500px"
          :trigger-on-focus="false"
          class="switch-focus focus-number"
          placeholder="请选择折扣"
          highlight-first-item
        />
      </div>
    </div>
    <div class="co-line">
      <span class="co-label"
        ><el-checkbox
          v-if="!hideBtn"
          v-model="isUseDiscount"
          @change="isUseDiscountChange"
          >整单优惠</el-checkbox
        ><span v-else>整单优惠</span></span
      >
      <HtFormatNumber
        :disabled="!enableEdit || !isUseDiscount"
        style="width:200px"
        v-model="discountAmount"
        :min="0"
        :max="discountAmountLimit"
        size="mini"
        :precision-type="'price'"
        @set="discountAmountChange($event)"
      />
      <span style="margin-left:10px;color:#999;"
        >（优惠后：{{ Number(totalAmount - discountAmount).toFixed(2) }}）</span
      >
    </div>
    <div class="co-line">
      <span class="co-label">应结金额</span>
      <div class="lay">
        <p>
          <span style="font-size:18px;font-wifht:bold;color:#3AA7FF;"
            >¥ {{ amount }}</span
          >
          <span style="margin-left:10px;color:#999;"
            >（合计费用 - 整单优惠 - 会员卡余额抵扣 - 抹零金额）</span
          >
        </p>
        <el-form
          ref="headerForm"
          :show-message="false"
          :model="formData"
          class="form-item-small-margin-bottom"
          label-width="75px"
          label-position="left"
          size="mini"
        >
          <el-form-item
            label-width="71px"
            prop="enhanceSettlementType"
            label="支付方式"
          >
            <ht-autoselect
              :disabled="!enableEdit"
              v-model="formData.enhanceSettlementType"
              :clearable="false"
              :trigger-on-focus="false"
              :options="enhancedSettlementTypeOption"
              :format-name="
                value =>
                  getSettleType(formData.settlementType, formData.paymentTypes)
              "
              @change="settlementTypeChange"
              class="switch-focus focus-settlementType"
              placeholder="请选择"
              mnemonic
              filter-zero
            />
          </el-form-item>
          <el-form-item label-width="71px" prop="invoiceType" label="发票类型">
            <ht-autoselect
              :disabled="!enableEdit"
              v-model="formData.invoiceType"
              :clearable="false"
              :options="store().formatInvoiceTypeDictionary()"
              :trigger-on-focus="false"
              :format-name="
                value =>
                  getFormatInvoiceType(formData.invoiceType, formData.taxRate)
              "
              @change="invoiceTypeChange"
              class="switch-focus focus-invoiceType"
              placeholder="请选择"
              mnemonic
              filter-zero
            />
          </el-form-item>
          <el-form-item label="发票号" prop="invoiceNumber">
            <ht-input
              :disabled="!enableEdit"
              v-model="formData.invoiceNumber"
              class="switch-focus focus-remark"
              placeholder="最大支持100个字符"
              maxlength="100"
            />
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <ht-input
              :disabled="!enableEdit"
              v-model="formData.remark"
              class="switch-focus focus-remark"
              placeholder="最大支持100个字符"
              maxlength="100"
            />
            <p style="color:#999;">
              客户欠款：<span style="color:#3AA7FF;"
                >¥{{ info.customerUsedCreditAmount }}</span
              >， 信用额度：<span style="color:#3AA7FF;"
                >¥{{ info.customerCreditAmount }}</span
              >
            </p>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="co-line fe" v-if="showCheck">
      <div>
        <CustomQrcode
          :value="barcodeUrl"
          :configure="{
            width: 100,
            height: 100
          }"
        />
        <span style="textAlign:center;display: block;">客户扫码签字</span>
      </div>
    </div>
  </div>
</template>

<script>
import { precisionsFixed } from "@/mixins";
import { FEE_PROPERTY } from "@/views/repair/workOrder/const/columns";
import { baseDataMixin } from "@/mixins";
import { getPlatformUrl } from "@/api/platform/index";
import CustomQrcode from "@/components/CustomQrcode/index";
import * as store from "@/utils/store";
import debounce from "throttle-debounce/debounce";
import { baseDictionary } from "@/api/base/base";

export default {
  mixins: [precisionsFixed, baseDataMixin],
  props: {
    hideBtn: {
      type: Boolean,
      default: false
    },
    isQuote: {
      type: Boolean,
      default: false
    },
    isCheck: {
      type: Boolean,
      default: false
    },
    showCheck: {
      type: Boolean,
      default: false
    },
    enableEdit: {
      type: Boolean,
      default: false
    },
    confirmInfo: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    confirmInfo: {
      handler(value) {
        if (value) {
          this.init(value);
          // this.initBarcode();
        }
      },
      deep: true
    },
    showCheck: {
      handler(value) {
        if (value) {
          this.initBarcode();
        }
      }
    }
  },
  data() {
    return {
      barcodeUrl: "",
      isCustomerSelect: false,
      isUseDiscount: false,
      isPatchChange: false,
      FEE_PROPERTY: FEE_PROPERTY,
      info: {},
      enhancedSettlementTypeOption: [],
      formData: {},
      discountOptions: [],
      itemData: [],
      partData: [],
      otherData: [],
      memberDiscountOptions: [],
      currentDiscount: {},
      itemDiscount: 0,
      partDiscount: 0,
      discountAmount: 0,
      amount: 0,
      totalAmount: 0,
      debounceUpdate: debounce(500, this.updateTable)
    };
  },
  components: {
    CustomQrcode
  },
  computed: {
    discountAmountLimit() {
      // return Number(this.totalAmount).toFixed(2);
      return parseFloat(this.totalAmount);
    }
  },
  mounted() {
    this.initEnhancedSettlementTypeOption();
    this.init(this.confirmInfo);
    this.initBarcode();
  },
  methods: {
    store() {
      return store;
    },
    initEnhancedSettlementTypeOption() {
      baseDictionary({
        type: "enhancedSettlementType",
        hasCode: true
      }).then(res => {
        try {
          this.enhancedSettlementTypeOption = res.options
            .filter(item => item.code == "nowPay" || item.code == "onTick")
            .map(item2 => {
              return {
                ...item2,
                id: item2.name
              };
            });
          console.log(this.enhancedSettlementTypeOption);
        } catch {
          this.enhancedSettlementTypeOption = [];
        }
      });
    },
    showDiscountInput(data) {
      return (
        data.index !== "小计" &&
        this.enableEdit &&
        data.feeProperty != "paid" &&
        !data.setId &&
        !data.notDiscount
      );
    },
    initBarcode() {
      if (!this.showCheck) return;
      getPlatformUrl({
        type: this.isQuote
          ? "repairBillCustomerOffer"
          : "repairBillCustomerSettle",
        id: this.confirmInfo.billId
      }).then(res => {
        const { zysc } = res;
        this.barcodeUrl = zysc;
      });
    },
    init(value) {
      this.info = { ...value };
      const {
        item,
        part,
        extraFee,
        discountAmount,
        invoiceType,
        taxRate,
        invoiceNumber,
        settlementType,
        paymentTypes,
        remark,
        totalAmount,
        amount
      } = this.info;
      const itemArr = item ? item.rows || [] : [];
      const partArr = part ? part.rows || [] : [];
      const extraFeeArr = extraFee ? extraFee.rows || [] : [];
      if (item) {
        this.itemData = this.initData(
          itemArr,
          this.isQuote ? item.totalAmount : item.totalDueAmount
        );
      }
      if (part) {
        this.partData = this.initData(
          partArr,
          this.isQuote ? part.totalAmount : part.totalDueAmount
        );
      }
      if (extraFee) {
        this.otherData = this.initData(
          extraFeeArr,
          this.isQuote ? extraFee.totalAmount : extraFee.totalDueAmount
        );
      }
      this.discountAmount = discountAmount;
      this.totalAmount = totalAmount;
      this.amount = amount;
      console.log(this.getSettleType(settlementType, paymentTypes));
      this.formData = {
        enhanceSettlementType: this.getSettleType(settlementType, paymentTypes),
        settlementType,
        paymentTypes,
        invoiceType,
        taxRate,
        invoiceNumber,
        remark
      };
      this.makeOptions({ ...value });
      this.$forceUpdate();
    },
    setOptions() {
      return this.discountOptions;
    },
    makeOptions(value) {
      const {
        memberDiscountName,
        memberDiscountPart,
        memberDiscountItem,
        memberDiscountOptions,
        memberDiscountType,
        memberDiscountCardId,
        memberDiscountSet
      } = value;
      let options = [];
      if (memberDiscountOptions) {
        this.memberDiscountOptions = memberDiscountOptions;
        options = memberDiscountOptions.map(item => {
          return {
            name: `${item.memberDiscountName}${
              item.memberDiscountItem
                ? "（服务项目" +
                  Number(item.memberDiscountItem * 10).toFixed(2) +
                  "折）"
                : ""
            }${
              item.memberDiscountSet
                ? "（服务套餐" +
                  Number(item.memberDiscountSet * 10).toFixed(2) +
                  "折）"
                : ""
            }${
              item.memberDiscountPart
                ? "（配件" +
                  Number(item.memberDiscountPart * 10).toFixed(2) +
                  "折）"
                : ""
            }`,
            value: item.memberDiscountName,
            type: item.memberDiscountType
          };
        });
      }
      if (memberDiscountName != "") {
        this.isCustomerSelect = true;
        this.formData.memberDiscountName = memberDiscountName;
        this.formData.memberDiscountCardLabel = `${memberDiscountName}${
          memberDiscountItem
            ? "（服务项目" + Number(memberDiscountItem * 10).toFixed(2) + "折）"
            : ""
        }${
          memberDiscountSet
            ? "（服务套餐" + Number(memberDiscountSet * 10).toFixed(2) + "折）"
            : ""
        }${
          memberDiscountPart
            ? "（配件" + Number(memberDiscountPart * 10).toFixed(2) + "折）"
            : ""
        }`;
        options = options.filter(option => {
          return option.value != this.formData.memberDiscountName;
        });
        options.unshift({
          name: this.formData.memberDiscountCardLabel,
          value: this.formData.memberDiscountName,
          type: this.formData.memberDiscountType
        });
        this.currentDiscount = {
          memberDiscountType,
          memberDiscountCardId,
          memberDiscountName,
          memberDiscountPart,
          memberDiscountItem,
          memberDiscountSet
        };
      } else {
        this.isCustomerSelect = false;
      }
      this.discountOptions = options;
      this.$forceUpdate();
    },
    initData(arr, totalAmount) {
      const temArr = [...arr];
      temArr.forEach((item, index) => {
        item.index = index + 1;
        item.discountRateLabel = item.discountRate
          ? Number(item.discountRate * 10).toFixed(2)
          : item.discountRate;
      });
      temArr.push({
        index: "小计",
        amount: totalAmount
      });
      return temArr;
    },
    isUseCustomerChange(e) {
      if (!e) {
        this.formData.memberDiscountCardLabel = "";
        this.formData.memberDiscountName = "";
        this.formData.memberDiscountType = "";
        this.formData.memberDiscountCardId = null;
        this.formData.memberDiscountPart = "";
        this.formData.memberDiscountItem = "";
        this.formData.memberDiscountSet = "";
        this.patchItemDiscountChange(10.0);
        this.patchPartDiscountChange(10.0);
      } else {
        this.formData.memberDiscountName = "";
        this.formData.memberDiscountCardLabel = "";
        // memberDiscountChange
      }
    },
    isUseDiscountChange(e) {
      if (!e) {
        this.discountAmount = 0;
        this.debounceUpdate();
      }
    },
    memberDiscountChange(data) {
      const { type, name, value } = data;
      if (!type) return;
      this.formData.memberDiscountName = name;
      const currentDiscount = this.memberDiscountOptions.filter(
        item =>
          item.memberDiscountType == type &&
          value.indexOf(item.memberDiscountName) > -1
      )[0];
      // console.log("修改会员权益");
      if (!currentDiscount) return;
      this.currentDiscount = currentDiscount;
      // console.log(currentDiscount);
      if (currentDiscount.memberDiscountItem) {
        // console.log("批量修改项目");
        this.patchItemDiscountChange(
          Number(currentDiscount.memberDiscountItem * 10).toFixed(2)
        );
      }
      if (currentDiscount.memberDiscountPart) {
        // console.log("批量修改配件");
        this.patchPartDiscountChange(
          Number(currentDiscount.memberDiscountPart * 10).toFixed(2)
        );
      }
      this.debounceUpdate();
    },
    patchItemDiscountChange(value) {
      if (value == null || value == undefined) {
        return;
      }
      // 用个flag阻止因批量修改带来的批量请求
      this.isPatchChange = true;
      // const value = this.precisionFormat(e, "money");
      this.itemDiscount = Number(value).toFixed(2);
      const temArr = [...this.itemData];
      temArr.forEach(item => {
        if (item.setId) return;
        if (item.feeProperty == "paid") return;
        if (item.notDiscount) return;
        item.discountRateLabel = Number(value).toFixed(2);
      });
      this.itemData = [...temArr];
      this.$forceUpdate();
      this.$nextTick(() => {
        // console.log("批量在触发");
        this.debounceUpdate();
      });
      this.isPatchChange = false;
    },
    getSettleType(s, p) {
      if (!p || p.length == 0) {
        return `${s}`;
      }
      return `${s}（${p[0]}）`;
    },
    patchPartDiscountChange(value) {
      if (value == null || value == undefined) {
        return;
      }
      // 用个flag阻止因批量修改带来的批量请求
      this.isPatchChange = true;
      // const value = this.precisionFormat(e, "money");
      this.partDiscount = Number(value).toFixed(2);
      const temArr = [...this.partData];
      temArr.forEach(item => {
        if (item.setId) return;
        if (item.feeProperty == "paid") return;
        if (item.notDiscount) return;
        item.discountRateLabel = Number(value).toFixed(2);
      });
      this.partData = [...temArr];
      this.$forceUpdate();
      this.$nextTick(() => {
        this.debounceUpdate();
      });
      this.isPatchChange = false;
    },
    discountAmountChange(e) {
      const value = this.precisionFormat(e, "money");
      this.discountAmount = Number(value).toFixed(2);
      this.$forceUpdate();
      if (this.isPatchChange) return;
      this.debounceUpdate();
    },
    itemDiscountChange(index, key, e) {
      const value = e ? this.precisionFormat(e, "money") : null;
      this.itemData[index][key] = value ? Number(value).toFixed(2) : null;
      if (this.isPatchChange) return;
      this.debounceUpdate();
    },

    partDiscountChange(index, key, e) {
      const value = e ? this.precisionFormat(e, "money") : null;
      this.partData[index][key] = value ? Number(value).toFixed(2) : null;
      if (this.isPatchChange) return;
      this.debounceUpdate();
    },
    updateTable() {
      this.$emit("updateTable", this.makeData());
    },
    makeData() {
      const { billId: id } = this.confirmInfo;
      const { discountAmount } = this;
      const {
        settlementType,
        paymentTypes,
        invoiceType,
        taxRate,
        invoiceNumber,
        remark
      } = this.formData;
      const itemDiscountRateMap = {};
      const partDiscountRateMap = {};
      const extraFeeDiscountRateMap = {};
      this.itemData.forEach(item => {
        if (!item.id) return;
        if (item.feeProperty == "paid") return;
        if (item.notDiscount) return;
        itemDiscountRateMap[item.id] = item.discountRateLabel
          ? Number(item.discountRateLabel / 10).toFixed(3)
          : item.discountRateLabel;
      });
      this.partData.forEach(item => {
        if (!item.id) return;
        if (item.feeProperty == "paid") return;
        if (item.notDiscount) return;
        partDiscountRateMap[item.id] = item.discountRateLabel
          ? Number(item.discountRateLabel / 10).toFixed(3)
          : item.discountRateLabel;
      });
      this.otherData.forEach(item => {
        if (!item.id) return;
        if (item.notDiscount) return;
        extraFeeDiscountRateMap[item.id] = null;
      });
      if (this.isCustomerSelect) {
        return {
          id,
          useBillToParam: false,
          discountAmount,
          itemDiscountRateMap,
          partDiscountRateMap,
          extraFeeDiscountRateMap,
          settlementType,
          paymentTypes,
          invoiceType,
          taxRate,
          invoiceNumber,
          remark,
          ...this.currentDiscount
        };
      } else {
        return {
          id,
          useBillToParam: false,
          discountAmount,
          itemDiscountRateMap,
          partDiscountRateMap,
          extraFeeDiscountRateMap,
          settlementType,
          paymentTypes,
          invoiceType,
          taxRate,
          invoiceNumber,
          remark
        };
      }
    },
    settlementTypeChange(e) {
      console.log(e);
      if (e.indexOf("）") > -1) {
        const types = /(.+)?(?:\(|（)(.+)(?=\)|）)/.exec(e);
        this.formData.settlementType = types[1];
        this.formData.paymentTypes = [types[2]];
      } else {
        this.formData.settlementType = e;
        this.formData.paymentTypes = null;
      }
    },
    invoiceTypeChange(e) {
      const invoice = this.store()
        .formatInvoiceTypeDictionary()
        .filter(item => item.id == e);
      this.formData.invoiceType = invoice[0].id;
      this.formData.taxRate = invoice[0].specialValue;
    },
    save() {
      this.$emit("saveTable", this.makeData());
    },
    push() {
      this.$emit("pushTable", this.makeData());
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./confirmOrder.scss";
</style>
