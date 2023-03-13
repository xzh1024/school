<template>
  <ht-dialog
    v-bind="$attrs"
    :title="title"
    append-to-body
    width="1000px"
    top="7vh"
    class="dialog-body"
    v-on="$listeners"
  >
    <div class="container-box">
      <ht-card no-padding>
        <ht-setting-table
          :loading="loading"
          :data="ruleForm.tableData"
          :columns="tableColumns"
          :table-name="tableName"
          height="120px"
          disabled-hotkeys
        />
      </ht-card>

      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        :disabled="!canEdit"
        :show-message="false"
        class="form-item-small-margin-bottom"
        size="mini"
        label-width="60px"
        label-position="left"
      >
        <ht-card title="托运信息" style="margin-top: 5px">
          <div slot="after-title" class="money-contaner">
            合计费用:
            <span class="text-font-primary text-container">{{ sumAmout }}</span>
          </div>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item
                prop="logisticsCompanyId"
                label="物流公司"
                label-width="71px"
              >
                <span
                  v-show="showText"
                  class="text-font-primary text-container"
                  >{{ ruleForm.logisticsCompanyName }}</span
                >
                <CooperatorsSelect
                  v-show="!showText"
                  v-model="ruleForm.logisticsCompanyId"
                  v-delay-focus="autoFocus"
                  :default-value.sync="ruleForm.logisticsCompanyName"
                  :clearable="false"
                  :allow-create="
                    hasCompletePerm('basics.cooperators.createLogistics')
                  "
                  no-data-tips="没有查询到物流公司,回车新增"
                  type="logistics"
                />
              </el-form-item>
              <el-form-item
                label="货运单号"
                prop="freightNo"
                label-width="71px"
              >
                <span
                  v-show="showText"
                  class="text-font-primary text-container"
                  >{{ ruleForm.freightNo }}</span
                >
                <ht-input v-show="!showText" v-model="ruleForm.freightNo" />
              </el-form-item>
              <el-form-item
                :label="this.isReceive ? '收货日期' : '发货日期'"
                prop="date"
                label-width="71px"
              >
                <span
                  v-show="showText"
                  class="text-font-primary text-container"
                  >{{ dateFormat(ruleForm.date) }}</span
                >
                <el-date-picker
                  v-show="!showText"
                  v-model="ruleForm.date"
                  type="date"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
              <el-form-item
                :label="this.isReceive ? '收货件数' : '发货件数'"
                prop="totalQty"
                label-width="71px"
              >
                <span
                  v-show="showText"
                  class="text-font-primary text-container"
                  >{{ totalQty }}</span
                >
                <HtFormatNumber
                  v-show="!showText"
                  v-model="totalQty"
                  :min="0"
                  precision-type="qty"
                  min-out
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="packMethod" label="包装方式">
                <span
                  v-show="showText"
                  class="text-font-primary text-container"
                  >{{ ruleForm.packMethod }}</span
                >
                <ht-autocomplete
                  v-show="!showText"
                  v-model="ruleForm.packMethod"
                  :fetch-suggestions="autocompleteSearchPackWay"
                  :trigger-on-focus="false"
                  clearable
                  highlight-first-item
                />
              </el-form-item>
              <el-form-item prop="transportMethod" label="运输方式">
                <span
                  v-show="showText"
                  class="text-font-primary text-container"
                  >{{ ruleForm.transportMethod }}</span
                >
                <ht-autocomplete
                  v-show="!showText"
                  v-model="ruleForm.transportMethod"
                  :fetch-suggestions="autocompleteSearchTransportType"
                  :trigger-on-focus="false"
                  clearable
                  highlight-first-item
                />
              </el-form-item>
              <el-form-item
                :label="this.isReceive ? '收货主题' : '发货主题'"
                prop="subject"
              >
                <span
                  v-show="showText"
                  class="text-font-primary text-container"
                  >{{ ruleForm.subject }}</span
                >
                <ht-input v-show="!showText" v-model="ruleForm.subject" />
              </el-form-item>
              <el-form-item
                :label="this.isReceive ? '收货备注' : '发货备注'"
                prop="remark"
              >
                <span
                  v-show="showText"
                  class="text-font-primary text-container"
                  >{{ ruleForm.remark }}</span
                >
                <ht-input v-show="!showText" v-model="ruleForm.remark" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="运输费用" prop="freight">
                    <span
                      v-show="showText"
                      class="text-font-primary text-container"
                      >{{ ruleForm.freight }}</span
                    >
                    <HtFormatNumber
                      v-show="!showText"
                      v-model="ruleForm.freight"
                      :min="0"
                      precision-type="money"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="包装费用" prop="packCharges">
                    <span
                      v-show="showText"
                      class="text-font-primary text-container"
                      >{{ ruleForm.packCharges }}</span
                    >
                    <HtFormatNumber
                      v-show="!showText"
                      v-model="ruleForm.packCharges"
                      :min="0"
                      precision-type="money"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="保价费用" prop="insuredCharges">
                    <span
                      v-show="showText"
                      class="text-font-primary text-container"
                      >{{ ruleForm.insuredCharges }}</span
                    >
                    <HtFormatNumber
                      v-show="!showText"
                      v-model="ruleForm.insuredCharges"
                      :min="0"
                      precision-type="money"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="其他费用" prop="otherCharges">
                    <span
                      v-show="showText"
                      class="text-font-primary text-container"
                      >{{ ruleForm.otherCharges }}</span
                    >
                    <HtFormatNumber
                      v-show="!showText"
                      v-model="ruleForm.otherCharges"
                      :min="0"
                      precision-type="money"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="付款方" prop="payer">
                <span
                  v-show="showText"
                  class="text-font-primary text-container"
                  >{{ ruleForm.payer }}</span
                >
                <el-radio-group
                  v-show="!showText"
                  v-model="ruleForm.payer"
                  class="radio-group"
                  @change="handlePayerChange"
                >
                  <el-radio label="对付" border>对付</el-radio>
                  <el-radio label="自付" border>自付</el-radio>
                  <el-radio label="垫付" border>垫付</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="支付方式" prop="enhancedSettlementType">
                <span
                  v-show="showText"
                  class="text-font-primary text-container"
                  >{{ ruleForm.enhancedSettlementType }}</span
                >
                <ht-autoselect
                  v-show="!showText"
                  v-model="ruleForm.enhancedSettlementType"
                  :options="enhancedSettlementTypeList"
                  :disabled="ruleForm.payer === '对付'"
                  :trigger-on-focus="false"
                  clearable
                  mnemonic
                  highlight-first-item
                />
              </el-form-item>
            </el-col>
          </el-row>
        </ht-card>

        <el-row :gutter="5" style="margin-top: 5px">
          <el-col :span="10">
            <ht-card title="收货方信息">
              <el-form-item label="单位名称">
                <span class="text-font-primary text-container">
                  {{
                    isReceive ? ruleForm.companyName : ruleForm.cooperatorName
                  }}
                </span>
              </el-form-item>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="联系人" prop="receiverName">
                    <span
                      v-show="showText"
                      class="text-font-primary text-container"
                      >{{ ruleForm.receiverName }}</span
                    >
                    <ht-autocomplete
                      v-if="isReceive"
                      v-show="!showText"
                      v-model="ruleForm.receiverName"
                      :fetch-suggestions="autocompleteSearchStaffs"
                      :trigger-on-focus="false"
                      clearable
                      highlight-first-item
                    />
                    <ht-input
                      v-else
                      v-show="!showText"
                      v-model="ruleForm.receiverName"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话" prop="receiverPhone">
                    <span
                      v-show="showText"
                      class="text-font-primary text-container"
                      >{{ ruleForm.receiverPhone }}</span
                    >
                    <ht-input
                      v-show="!showText"
                      v-model="ruleForm.receiverPhone"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="联系地址" prop="receiverAddress">
                <span
                  v-show="showText"
                  class="text-font-primary text-container"
                  >{{ ruleForm.receiverAddress }}</span
                >
                <ht-input
                  v-show="!showText"
                  v-model="ruleForm.receiverAddress"
                />
              </el-form-item>
              <el-form-item label="特殊说明" prop="receiverRemark">
                <span
                  v-show="showText"
                  class="text-font-primary text-container"
                  >{{ ruleForm.receiverRemark }}</span
                >
                <ht-input
                  v-show="!showText"
                  v-model="ruleForm.receiverRemark"
                />
              </el-form-item>
            </ht-card>
          </el-col>
          <el-col :span="10">
            <ht-card title="发货方信息">
              <el-form-item label="单位名称">
                <span class="text-font-primary text-container">
                  {{
                    isReceive ? ruleForm.cooperatorName : ruleForm.companyName
                  }}
                </span>
              </el-form-item>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="发货人" prop="senderName">
                    <span
                      v-show="showText"
                      class="text-font-primary text-container"
                      >{{ ruleForm.senderName }}</span
                    >
                    <ht-input
                      v-if="isReceive"
                      v-show="!showText"
                      v-model="ruleForm.senderName"
                    />
                    <ht-autocomplete
                      v-else
                      v-show="!showText"
                      v-model="ruleForm.senderName"
                      :fetch-suggestions="autocompleteSearchStaffs"
                      :trigger-on-focus="false"
                      clearable
                      highlight-first-item
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="打包员" prop="packer">
                    <span
                      v-show="showText"
                      class="text-font-primary text-container"
                      >{{ ruleForm.packer }}</span
                    >
                    <ht-input
                      v-if="isReceive"
                      v-show="!showText"
                      v-model="ruleForm.packer"
                    />
                    <ht-autocomplete
                      v-else
                      v-show="!showText"
                      v-model="ruleForm.packer"
                      :fetch-suggestions="autocompleteSearchStaffs"
                      :trigger-on-focus="false"
                      clearable
                      highlight-first-item
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="联系电话" prop="senderPhone">
                <span
                  v-show="showText"
                  class="text-font-primary text-container"
                  >{{ ruleForm.senderPhone }}</span
                >
                <ht-input v-show="!showText" v-model="ruleForm.senderPhone" />
              </el-form-item>
              <el-form-item label="联系地址" prop="senderAddress">
                <span
                  v-show="showText"
                  class="text-font-primary text-container"
                  >{{ ruleForm.senderAddress }}</span
                >
                <ht-input v-show="!showText" v-model="ruleForm.senderAddress" />
              </el-form-item>
            </ht-card>
          </el-col>
          <el-col :span="4">
            <ht-card
              title="发货单图片"
              :class="showText ? 'img-container-text' : 'img-container'"
            >
              <el-form-item label label-width="0px">
                <SrImgUpload
                  :file-list="imgFileList"
                  :disabled="showText || !canEdit"
                  :limit="1"
                  type="shard"
                  @get-file-list="handleImages"
                />
              </el-form-item>
            </ht-card>
          </el-col>
        </el-row>

        <ht-card title="代收信息" style="margin-top: 5px">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="付款单位">
                <span class="text-font-primary text-container">{{
                  isReceive ? ruleForm.companyName : ruleForm.cooperatorName
                }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="代收金额">
                <span class="text-font-primary text-container">{{
                  collectingAmount
                }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </ht-card>
      </el-form>

      <div
        v-show="showBtns"
        class="dialog-footer-align"
        style="margin: 10px 0 5px 0"
      >
        <el-button
          type="primary"
          size="mini"
          plain
          :disabled="!this.canSettle || !this.isAllowClick"
          @click="sureHandle"
        >
          {{ butText }}（F3）
        </el-button>
        <el-button type="primary" size="mini" plain @click="cancelHandle">
          取消（Esc）
        </el-button>
      </div>
    </div>
  </ht-dialog>
</template>

<script>
import { CooperatorsSelect } from "@/components/select";
import SrImgUpload from "@/components/base/SrImgUpload";
import { reqLogisticsRegisterDetail } from "@/api/store/logisticsRegister";
import { BILL_TYPE, CELL_WIDTH, PAYER_OPTINS } from "@/constants";
import { precisionsFixed, searchMixin } from "@/mixins";
import { dateFormat } from "@/utils/date";
import { reduce } from "lodash";
import {
  reqCreateLogisticsRegister,
  reqUpdateLogisticsRegister
} from "@/api/store/logisticsRegister";
import * as store from "@/utils/store";

const defaultRuleForm = {
  tableData: [],
  logisticsCompanyId: null,
  logisticsCompanyName: "",
  freightNo: "",
  date: "",
  qty: 0,
  packMethod: "",
  transportMethod: "",
  subject: "",
  remark: "",
  freight: 0,
  packCharges: 0,
  insuredCharges: 0,
  otherCharges: 0,
  payer: "对付",
  enhancedSettlementType: "现付（现金）",
  companyName: "",
  receiverName: "",
  receiverPhone: "",
  receiverAddress: "",
  receiverRemark: "",
  cooperatorName: "",
  cooperatorId: 0,
  senderName: "",
  packer: "",
  senderPhone: "",
  senderAddress: "",
  picture: "",
  collectingAmount: 0,
  status: null
};
const CONTRAPAYER_OPTINS = {
  对付: 0,
  自付: 1,
  垫付: 2
};

export default {
  name: "HandleRigisterBox",
  components: {
    CooperatorsSelect,
    SrImgUpload
  },
  mixins: [precisionsFixed, searchMixin],
  props: {
    isReceive: Boolean,
    isCheck: Boolean,
    isConfirm: Boolean,
    isSettleConfirm: Boolean,
    canSettle: Boolean,
    hasBillInfo: Boolean,
    billId: {
      type: [String, Number],
      default: 0
    },
    registerId: {
      type: [String, Number],
      default: 0
    },
    ruleData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      dateFormat,
      PAYER_OPTINS,
      originTotalAmount: 0,
      ruleForm: { ...defaultRuleForm },
      imgFileList: [],
      autoFocus: true,
      loading: false,
      tableName: "handleRigisterBoxBusinessBillList",
      tableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        { prop: "billNo", label: "业务单号", width: CELL_WIDTH.no },
        {
          prop: "billType",
          label: "业务类型",
          width: CELL_WIDTH.type,
          formatter: value => BILL_TYPE[value]
        },
        {
          prop: "enhancedSettlementType",
          label: "支付方式",
          width: CELL_WIDTH.method
        },
        {
          prop: "taxedAmount",
          label: "金额",
          width: CELL_WIDTH.money,
          type: "number"
        }
      ],
      rules: {
        logisticsCompanyId: [
          {
            required: true,
            message: "请选择物流公司！",
            trigger: "blur"
          }
        ],
        freightNo: [
          {
            required: true,
            message: "请选填写货运单号！",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    isSettle() {
      return this.ruleForm.status === 1;
    },
    isSignFor() {
      return this.ruleForm.status === 2;
    },
    isCompelte() {
      return this.ruleForm.status === 3;
    },
    isAllowClick() {
      if (this.isReceive) {
        return (
          this.hasPerm("storage.logisticsRegistration.receive.register") &&
          this.hasPerm("storage.logisticsRegistration.receive.update") &&
          this.hasPerm("storage.logisticsRegistration.receive.cofirm")
        );
      }
      return (
        this.hasPerm("storage.logisticsRegistration.send.register") &&
        this.hasPerm("storage.logisticsRegistration.send.update") &&
        this.hasPerm("storage.logisticsRegistration.send.cofirm")
      );
    },
    showBtns() {
      return (
        this.isSettleConfirm ||
        !(this.isCheck || this.isCompelte || this.isSettle)
      );
    },
    showText() {
      return (
        this.hasBillInfo ||
        (!this.isSettleConfirm &&
          (this.isConfirm ||
            this.isSettle ||
            this.isSignFor ||
            this.isCompelte ||
            this.isCheck))
      );
    },
    canEdit() {
      return (
        this.isSettleConfirm ||
        (!this.ruleForm.status &&
          ((this.isReceive && this.hasAutoPerm("send.update")) ||
            (!this.isReceive && this.hasAutoPerm("receive.update"))))
      );
    },
    title() {
      if (this.isCheck) {
        return "发货登记审核";
      } else {
        if (this.isSignFor && this.isReceive) {
          return "收货登记签收";
        } else if (this.isSignFor && !this.isReceive) {
          return "发货登记签收";
        } else if (this.isConfirm && this.isReceive) {
          return "收货登记确认";
        } else if (this.isConfirm && !this.isReceive) {
          return "发货登记确认";
        } else if (this.isReceive) {
          return "收货登记";
        } else if (!this.isReceive) {
          return "发货登记";
        } else {
          return "";
        }
      }
    },
    butText() {
      return this.canSettle &&
        this.ruleForm.payer != "对付" &&
        this.isAllowClick
        ? "确定并结算"
        : "确定";
    },
    enhancedSettlementTypeList() {
      return store
        .enhancedSettlementTypeDictionary()
        .filter(item => !["物流代收"].includes(item.name));
    },
    totalQty: {
      get() {
        return Number(this.ruleForm.qty)
          ? Number(this.ruleForm.qty)
          : this.ruleForm.tableData.length
          ? this.precisionFormat(
              reduce(
                this.ruleForm.tableData,
                (sum, item) => sum + parseFloat(item.qty ? item.qty : 0),
                0
              ),
              "qty"
            )
          : 1;
      },
      set(value) {
        this.ruleForm.qty = value || 0;
      }
    },
    collectingAmount: {
      get() {
        return Number(this.ruleForm.collectingAmount)
          ? Number(this.ruleForm.collectingAmount)
          : this.ruleForm.tableData.length
          ? this.precisionFormat(
              reduce(
                this.ruleForm.tableData,
                (sum, item) =>
                  sum +
                  parseFloat(
                    ["物流代收"].includes(item.enhancedSettlementType)
                      ? item.taxedAmount
                      : 0
                  ),
                0
              ),
              "money"
            )
          : 0;
      },
      set(value) {
        this.ruleForm.collectingAmount = value || 0;
      }
    },
    sumAmout() {
      return this.precisionFormat(
        parseFloat(this.ruleForm.freight || 0) +
          parseFloat(this.ruleForm.packCharges || 0) +
          parseFloat(this.ruleForm.insuredCharges || 0) +
          parseFloat(this.ruleForm.otherCharges || 0),
        "money"
      );
    }
  },
  // mounted() {
  //   console.log("isAllowClick", this.isAllowClick);
  //   console.log(
  //     "send.register",
  //     this.hasPerm("storage.logisticsRegistration.send.register")
  //   );
  //   console.log(
  //     "send.update",
  //     this.hasPerm("storage.logisticsRegistration.send.update")
  //   );
  //   console.log(
  //     "send.cofirm",
  //     this.hasPerm("storage.logisticsRegistration.send.cofirm")
  //   );
  //   console.log(
  //     "receive.register",
  //     this.hasPerm("storage.logisticsRegistration.receive.register")
  //   );
  //   console.log(
  //     "receive.update",
  //     this.hasPerm("storage.logisticsRegistration.receive.update")
  //   );
  //   console.log(
  //     "receive.cofirm",
  //     this.hasPerm("storage.logisticsRegistration.receive.cofirm")
  //   );
  // },
  watch: {
    "$attrs.visible": {
      handler(value, oldValue) {
        if (value) {
          this.initData();
          this.autoFocus = true;
          setTimeout(() => {
            this.$refs.ruleForm.clearValidate();
          }, 100);
        } else if (oldValue) {
          this.imgFileList = [];
          this.autoFocus = false;
        }
      },
      immediate: true
    },
    ruleData: {
      handler() {
        this.initData();
      },
      immediate: true
    }
  },
  methods: {
    setTotalAmount() {
      this.originTotalAmount = this.precisionFormat(
        parseFloat(this.ruleForm.freight || 0) +
          parseFloat(this.ruleForm.packCharges || 0) +
          parseFloat(this.ruleForm.insuredCharges || 0) +
          parseFloat(this.ruleForm.otherCharges || 0),
        "money"
      );
    },
    initData() {
      if (this.registerId) {
        reqLogisticsRegisterDetail(this.registerId)
          .then(res => {
            this.ruleForm = {
              ...defaultRuleForm,
              ...res.bill,
              payer: PAYER_OPTINS[res.bill.payer],
              tableData: res.details || []
            };
            if (res.bill.picture) {
              this.imgFileList = [
                {
                  name: "",
                  url: res.bill.picture,
                  origin: res.bill.picture
                }
              ];
            } else {
              this.imgFileList = [];
            }
            this.setTotalAmount();
          })
          .catch(() => {});
      } else {
        this.ruleForm = {
          ...defaultRuleForm,
          ...this.ruleData,
          payer: this.ruleData.freightPayer || defaultRuleForm.payer,
          enhancedSettlementType: "",
          tableData: this.ruleData.tableData || []
        };
        this.setTotalAmount();
        this.handlePayerChange(this.ruleForm.payer);
        this.imgFileList = [];
      }
    },
    handleImages(fileList) {
      this.imgFileList = fileList;
    },
    handlePayerChange(value) {
      if (value === "对付") {
        this.ruleForm.enhancedSettlementType = "";
      } else {
        this.ruleForm.enhancedSettlementType =
          defaultRuleForm.enhancedSettlementType;
      }
    },
    sureHandle() {
      // 如果用户修改了运费金额（加上包装费用、保价费用、其他费用一起），点击确定保存登记单时提示用户确认
      if (
        this.originTotalAmount != this.sumAmout &&
        this.isReceive &&
        this.ruleForm.tableData.length > 1
      ) {
        this.$confirm(
          `登记费用与原始业务单据填写的费用不一致，登记后系统会把登记费用平均分摊到本次登记的单据中。如有异议，请按业务单据分开登记。`,
          "提示",
          { type: "warning" }
        ).then(() => {
          this.confirm();
        });
      } else {
        this.confirm();
      }
    },
    confirm() {
      console.log(this.canEdit);
      if (!this.canEdit) return;
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          this.handleSureRigister({
            ...this.ruleForm,
            freight: this.ruleForm.freight ? this.ruleForm.freight : 0,
            packCharges: this.ruleForm.packCharges
              ? this.ruleForm.packCharges
              : 0,
            insuredCharges: this.ruleForm.insuredCharges
              ? this.ruleForm.insuredCharges
              : 0,
            otherCharges: this.ruleForm.otherCharges
              ? this.ruleForm.otherCharges
              : 0,
            picture: this.imgFileList.length ? this.imgFileList[0].origin : "",
            qty: this.totalQty,
            payer: CONTRAPAYER_OPTINS[this.ruleForm.payer]
          });
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({
            message: errTips,
            showClose: true
          });
        }
      });
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    },
    handleSureRigister(data) {
      const billInfo = {
        cooperatorId: data.cooperatorId,
        type: this.isReceive ? 0 : 1,
        logisticsCompanyId: data.logisticsCompanyId,
        freightNo: data.freightNo,
        date: data.date,
        qty: data.qty,
        subject: data.subject,
        remark: data.remark,
        packMethod: data.packMethod,
        transportMethod: data.transportMethod,
        freight: data.freight,
        packCharges: data.packCharges,
        insuredCharges: data.insuredCharges,
        otherCharges: data.otherCharges,
        payer: data.payer,
        enhancedSettlementType: data.enhancedSettlementType,
        receiverName: data.receiverName,
        receiverPhone: data.receiverPhone,
        receiverAddress: data.receiverAddress,
        receiverRemark: data.receiverRemark,
        senderName: data.senderName,
        packer: data.packer,
        senderPhone: data.senderPhone,
        senderAddress: data.senderAddress,
        picture: data.picture
      };
      let details = [];
      if (this.registerId) {
        this.cancelHandle();
        this.$emit("on-sure", billInfo);
        // this.updateLogisticsRegister(billInfo);
      } else {
        details = data.tableData.map(item => {
          return {
            billId: this.billId,
            billNo: item.billNo,
            billType: item.billType
          };
        });
        this.createLogisticsRegister(billInfo, details);
      }
    },
    createLogisticsRegister(billInfo, details) {
      reqCreateLogisticsRegister({
        billInfo,
        details,
        confirm: this.isSettleConfirm
      }).then(() => {
        this.$message({
          message: "添加登记单成功！",
          type: "success",
          showClose: true
        });
        this.cancelHandle();
        this.$emit("on-sure", billInfo);
      });
    },
    updateLogisticsRegister(billInfo) {
      reqUpdateLogisticsRegister(
        { billInfo, confirm: true },
        this.registerId
      ).then(() => {
        this.$message({
          message: "更新登记单成功！",
          type: "success",
          showClose: true
        });
        this.cancelHandle();
        this.$emit("on-sure", billInfo);
      });
    }
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

.money-contaner {
  margin-right: 5px;
  text-align: right;
}

.radio-group {
  &::v-deep .el-radio {
    margin: 0;
  }
}

.img-container {
  height: 184px;
  overflow: hidden;
}

.img-container-text {
  height: 181px;
  overflow: hidden;
}

.text-container {
  padding-left: 5px;
}
</style>
