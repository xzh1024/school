<script lang="tsx">
// element对ts支持差，暂时用any
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { Form } from "hztl-ui";
// import { Fragment } from "vue-fragment";
import { dateFormat } from "@/utils/date";
// import { isBusinessBillType } from "@/utils/businessBillType";
import { subtract, add } from "@/utils/numberAPI";
import PrecisionsFixedMixin from "@/mixins/PrecisionsFixedMixin";
import SearchMixin from "@/mixins/searchMixin";
import BaseDataMixin from "@/mixins/baseDataMixin";
import { loadCompanyFundAccounts } from "@/api/finance/basicSetting";
import { balance } from "@/api/finance/prevFunds";
import * as store from "@/utils/store";

export interface InformationRow {
  name?: string;
  content?: string | number;
  type?:
    | "billType"
    | "amount"
    | "settledAmount"
    | "discountAmount"
    | "unSettledAmount";
}

export interface SettlData {
  id: number;
  billType: string;
  amount: number | string;
  discountAmount: number | string;
  enhancedSettlementType: string;
  totalAmount?: number | string;
  settledAmount?: number | string;
  paymentBy?: string;
  confirmDate?: string;
  fundAccountId?: number;
  fundAccounts?: any;
  oldAmount?: number;
  changeStatus?: boolean; // 单账户价格是否手动更改过
  brokerageAmount?: number; // 佣金
  remark?: string;
  isUsePrepayedAmount?: boolean;
  prepayedAmount?: number | string;
  isUseTransPrepayedAmount?: boolean;
  transPrepayedAmount?: number | string;
  preAccountBalance?: number | string;

  billNo?: string; // 单据号
  invoiceType?: string; // 发票类型
  invoiceNumber?: string; // 发票号
  taxRate?: number; // 税率
  isUnsettle?: boolean; // 是否反结算
  cooperatorId?: number; // 往来单位
  sourceBillType?: string; // 来源单据类型，获取专款使用
  sourceBillId?: string; // 来源单据ID，获取专款使用
  isSettleIn?: boolean; // 应收付，是否是收
}

export interface SettleProps {
  loading: boolean;
  reset: boolean;
  showInvince: boolean;
  InformationList: InformationRow[];
  settlData?: SettlData;
  companyId?: number;
}

export interface SettleEvent {
  onSolve: (isSubmit: number) => void;
}

const defaultFormData: SettlData = {
  id: 0,
  billType: "DZ",
  enhancedSettlementType: "现付（现金）",
  amount: 0,
  totalAmount: 0,
  settledAmount: 0,
  discountAmount: 0,
  confirmDate: dateFormat(new Date()),
  paymentBy: "",
  remark: "",
  fundAccountId: 0,
  fundAccounts: [],
  oldAmount: 0,
  changeStatus: false,
  brokerageAmount: 0,
  isUsePrepayedAmount: false,
  prepayedAmount: 0,
  isUseTransPrepayedAmount: false,
  transPrepayedAmount: 0,
  preAccountBalance: 0,
  isSettleIn: false
};

const tableColumns = [
  { prop: "name", label: "", width: "80" },
  { prop: "content", label: "", width: "200" }
];

@Component
export default class Settle extends Mixins(
  PrecisionsFixedMixin,
  SearchMixin,
  BaseDataMixin
) {
  public $refs!: {
    form: Form;
  };
  @Prop() readonly loading!: boolean;
  @Prop() readonly reset?: boolean;
  @Prop() readonly showInvince!: boolean;
  @Prop() readonly informationList?: InformationRow[];
  @Prop() readonly settlData?: SettlData;
  @Prop(Boolean) readonly cantEditMoney!: boolean;
  @Prop(Boolean) readonly isLogistics!: boolean; // 是否是业务单据类型的物流结算
  @Prop() readonly companyId?: number;

  private get formatInvoiceTypeDictionary() {
    return store.formatInvoiceTypeDictionary();
  }

  private get financialsSettles() {
    return this.$store.state.admin.systemParams.financialsSettles;
  }
  private get enhancedSettlementTypeList() {
    // console.log(this.$store.state.admin.systemParams.financialsSettles);
    // if (this.cantEditMoney || this.isLogistics) {
    //   return store
    //     .enhancedSettlementTypeDictionary()
    //     .filter(item => !["物流代收"].includes(item.name));
    // } else {
    //   return this.formData.billType &&
    //     isBusinessBillType(this.formData.billType)
    //     ? store.enhancedSettlementTypeDictionary()
    //     : store
    //         .enhancedSettlementTypeDictionary()
    //         .filter(item => item.name.indexOf("现付") > -1);
    // }
    const settlementTypes =
      this.formData.billType && this.financialsSettles
        ? this.financialsSettles[this.formData.billType]?.allowSettlementTypes
        : [];
    return this.formData.billType && settlementTypes
      ? store
          .enhancedSettlementTypeDictionary()
          .filter((item: any) =>
            settlementTypes.includes(
              item.name.indexOf("现付") > -1
                ? item.name.substring(0, 2)
                : item.name
            )
          )
      : store
          .enhancedSettlementTypeDictionary()
          .filter((item: any) => item.name.indexOf("现付") > -1);
  }
  private get isPreSettleBill() {
    return ["YS", "YF", "YBX"].includes(this.formData.billType);
  }
  private get isNowPay() {
    if (!(this.formData.enhancedSettlementType.substring(0, 2) === "现付")) {
      this.resetData();
    } else {
      this.initData();
    }
    return this.formData.enhancedSettlementType.substring(0, 2) === "现付";
  }
  private get isPreSettleIn() {
    let flag = false;
    if (["XS", "CT", "XC", "WX", "FX"].includes(this.formData.billType)) {
      flag = true;
    } else if (["DZ", "DS"].includes(this.formData.billType)) {
      flag = !!this.settlData?.isSettleIn;
    }
    return flag && this.isNowPay;
  }
  private get isPreSettleOut() {
    let flag = false;
    if (["CG", "JJ", "XT", "XC", "WX", "TG"].includes(this.formData.billType)) {
      flag = true;
    } else if (["DZ", "DS"].includes(this.formData.billType)) {
      flag = !this.settlData?.isSettleIn;
    }
    return flag && this.isNowPay;
  }
  private get isPreSettle() {
    return this.isPreSettleIn || this.isPreSettleOut;
  }
  private get preSettleText() {
    return this.isPreSettleIn ? "收" : "付";
  }

  // 是否可以选择支付方式
  private get isInternal() {
    return ["KD", "RD", "RT", "KT"].includes(this.formData.billType);
  }

  private get unSettledAmount() {
    if (!this.settlData) {
      return 0;
    }
    let amout = 0;
    if (this.isPreSettle) {
      amout = this.precisionFormat(
        subtract(
          this.formData.amount,
          add(
            add(this.formData.totalAmount || 0, this.formData.discountAmount),
            this.formData.isUsePrepayedAmount
              ? this.formData.prepayedAmount || 0
              : 0
          )
        ),
        "money"
      );
      amout = amout < 0 ? 0 : amout;
    } else {
      amout = this.precisionFormat(
        subtract(
          this.formData.amount,
          add(this.formData.totalAmount || 0, this.formData.discountAmount)
        ),
        "money"
      );
    }
    return amout;
  }

  private get formRef() {
    return this.$refs.form;
  }
  public invoiceTypeChange(e: any) {
    if (e.indexOf(")") > -1) {
      const types = /(.+)?(?:\(|（)(.+)(?=\)|）)/.exec(e);
      if (types) {
        this.formData.invoiceType = types[0];
        this.formData.taxRate = Number(types[1]);
      }
    } else {
      this.formData.invoiceType = e;
      this.formData.taxRate = undefined;
    }
  }
  public getValidateParams(): Promise<false | SettlData> {
    return new Promise((resolve: Function) => {
      let params: false | SettlData = false;
      if (this.isPreSettleBill && this.unSettledAmount !== 0) {
        this.$message.warning({
          message:
            "预收付单据结算只能一次性全额结算，请重新输入结算金额或优惠金额！",
          showClose: true
        });
        resolve(params);
      } else if (!this.isPreSettle && this.unSettledAmount < 0) {
        this.$message.warning({
          message: "应结余额不能小于0，请重新输入结算金额或优惠金额！",
          showClose: true
        });
        resolve(params);
      } else {
        if (this.getFormValid()) {
          if (
            this.isPreSettle &&
            !this.formData.isUseTransPrepayedAmount &&
            Number(this.formData.transPrepayedAmount || 0) > 0
          ) {
            // 配置-允许转结于收付款
            if (
              this.financialsSettles[this.formData.billType]?.allowTransPrepayed
            ) {
              this.$confirm(
                `转结预${this.preSettleText}大于0, 确定转结预${this.preSettleText}`,
                "提示",
                { type: "warning" }
              )
                .then(() => {
                  this.formData.isUseTransPrepayedAmount = true;
                  params = this.formData;
                  resolve(params);
                })
                .catch(() => {
                  resolve(params);
                });
            } else {
              this.$message.warning({
                message: `合计${this.preSettleText}款大于应结款，请检查！`,
                showClose: true
              });
              resolve(params);
            }
          } else {
            params = this.formData;
            resolve(params);
          }
        } else {
          resolve(params);
        }
      }
    });
  }

  public getFormValid() {
    let flag = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.formRef.validate((valid, err: any) => {
      flag = valid;
      if (!valid) {
        const errTips = err[Object.keys(err)[0]][0].message;
        this.$message.warning({ message: errTips });
        setTimeout(() => {
          const input: HTMLElement | null = this.formRef.$el.querySelector(
            ".is-error input"
          );
          input?.focus();
        });
      }
    });
    return flag;
  }
  private get rules() {
    const validateDiscountAmount = (
      rule: any,
      value: any,
      callback: Function
    ) => {
      if (["", undefined, null].includes(this.formData.discountAmount as any)) {
        callback(new Error("请输入优惠金额！"));
      } else if (
        this.isPreSettle &&
        add(
          this.formData.discountAmount || 0,
          this.formData.prepayedAmount || 0
        ) > this.formData.amount &&
        this.formData.isUsePrepayedAmount
      ) {
        callback(
          new Error(`优惠金额+预${this.preSettleText}结算不能超出应结金额！`)
        );
      } else if (
        !this.isPreSettle &&
        add(this.formData.discountAmount || 0, this.formData.totalAmount || 0) >
          this.formData.amount
      ) {
        callback(new Error("优惠金额+结算金额不能超出应结金额！"));
      } else if (Number(this.formData.discountAmount || 0) < 0) {
        callback("优惠金额不能小于0！");
      } else {
        callback();
      }
    };

    const validatePrepayedAmount = (
      rule: any,
      value: any,
      callback: Function
    ) => {
      if (
        this.isPreSettle &&
        add(
          this.formData.discountAmount || 0,
          this.formData.prepayedAmount || 0
        ) > this.formData.amount &&
        this.formData.isUsePrepayedAmount
      ) {
        callback(
          new Error(`优惠金额+预${this.preSettleText}结算不能超出应结金额！`)
        );
      } else if (
        this.isPreSettle &&
        Number(this.formData.prepayedAmount || 0) < 0
      ) {
        callback(`预${this.preSettleText}结算不能小于0！`);
      } else {
        callback();
      }
    };

    const validateSettledAmount = (
      rule: any,
      value: any,
      callback: Function
    ) => {
      if (["", undefined, null].includes(this.formData.settledAmount as any)) {
        callback(new Error("请输入结算金额！"));
      } else if (
        !this.isPreSettle &&
        add(
          this.formData.settledAmount || 0,
          this.formData.discountAmount || 0
        ) > this.formData.amount
      ) {
        callback(new Error("优惠金额+结算金额不能超出应结金额！"));
      } else if (Number(this.formData.settledAmount || 0) < 0) {
        callback("结算金额不能小于0！");
      } else {
        callback();
      }
    };

    return {
      confirmDate: [
        {
          required: true,
          message: "请选择结算日期！",
          trigger: "change"
        }
      ],
      enhancedSettlementType: [
        {
          required: true,
          message: "请选择支付方式！",
          trigger: "change"
        }
      ],
      totalAmount: [
        {
          required: true,
          message: ""
        }
      ],
      settledAmount: [
        {
          required: true,
          message: "请输入结算金额！",
          trigger: "change"
        },
        {
          validator: validateSettledAmount,
          trigger: "change"
        }
      ],
      invoiceType: [
        {
          required: true,
          message: "请选择发票类型！",
          trigger: "change"
        }
      ],
      fundAccountId: [
        {
          required: true,
          message: "请到出纳菜单资金账户设置里新增账户开账后再结算！",
          trigger: "change"
        }
      ],
      discountAmount: [
        {
          required: true,
          message: "请输入优惠金额！",
          trigger: "change"
        },
        {
          validator: validateDiscountAmount,
          trigger: "change"
        }
      ],
      prepayedAmount: [
        {
          validator: validatePrepayedAmount,
          trigger: "change"
        }
      ]
    };
  }
  private accountsOptions: {
    id: number;
    name: string;
    isDefault?: boolean;
    disabled?: boolean;
  }[] = [];
  private formData: SettlData = {
    ...defaultFormData
  };
  private get relInformationList(): InformationRow[] {
    if (!this.informationList) {
      return [];
    }
    return this.informationList.map(item => {
      let data: InformationRow;
      switch (item.type) {
        case "billType":
          data = {
            name: "业务类型",
            ...item,
            content: this.financialsSettles[this.formData.billType]?.cn || ""
          };
          break;
        case "amount":
          data = {
            name: `应${this.preSettleText}金额`,
            ...item,
            content: this.formData.amount
          };
          break;
        case "settledAmount":
          data = {
            name: "结算金额",
            ...item,
            content: this.isNowPay ? this.formData.settledAmount : 0
          };
          break;
        case "discountAmount":
          data = {
            name: "优惠金额",
            ...item,
            content: this.isNowPay ? this.formData.discountAmount : 0
          };
          break;
        case "unSettledAmount":
          data = {
            name: "未结金额",
            ...item,
            content: this.unSettledAmount
          };
          break;
        default:
          data = item;
      }
      return data;
    });
  }

  @Watch("reset")
  private isReset() {
    if (this.reset) {
      this.formData.preAccountBalance = 0;
      this.getPrepayedAmount();
      this.prepayedChange();
    }
  }

  @Watch("companyId")
  private async loadAccounts() {
    this.accountsOptions =
      (
        await loadCompanyFundAccounts({
          companyId: this.companyId || null
        })
      ).accounts.map((item: any) => ({
        id: item.id,
        name: item.fundAccountName,
        isDefault: item.isDefault,
        disabled: false
      })) || [];
    this.setDefultAccount();
  }

  @Watch("settlData", { immediate: true })
  private initFormData() {
    if (!this.settlData) {
      return;
    }
    console.log(this.settlData);
    this.formData = {
      ...defaultFormData,
      ...this.settlData,
      amount: Math.abs(Number(this.settlData.amount || 0)),
      discountAmount: 0, // Math.abs(Number(this.settlData.discountAmount || 0))
      enhancedSettlementType: this.settlData.enhancedSettlementType
        ? this.settlData.enhancedSettlementType
        : defaultFormData.enhancedSettlementType,
      billType: this.settlData.billType
        ? this.settlData.billType
        : defaultFormData.billType
    };
    // 佣金
    this.relInformationList.forEach(item => {
      if (item.name == "佣金") {
        this.formData.brokerageAmount = Number(item.content);
      }
    });
    this.formData.settledAmount = this.precisionFormat(
      this.formData.amount,
      "money"
    );
    this.formData.confirmDate = dateFormat(new Date());
    this.setTransPrepayedAmount();
    this.setDefultAccount();
    if (
      ["CG", "JJ", "XT", "XS", "CT", "DZ", "DS", "WX", "XC", "FX"].includes(
        this.formData.billType
      )
    ) {
      this.getPrepayedAmount();
    }
  }
  private resetData() {
    this.formData.discountAmount = 0;
    this.formData.isUsePrepayedAmount = false;
    this.formData.prepayedAmount = 0;
    this.formData.isUseTransPrepayedAmount = false;
    this.formData.transPrepayedAmount = 0;
    this.formData.settledAmount = 0;
    this.formData.totalAmount = 0;
    if (this.accountsOptions && this.accountsOptions.length) {
      let fundAccount = this.accountsOptions.find(item => item.isDefault);
      if (!fundAccount) {
        fundAccount = this.accountsOptions[0];
      }
      this.formData.fundAccounts = [
        {
          id: fundAccount.id,
          amount: this.formData.amount || 0
        }
      ];
    } else {
      this.formData.fundAccounts = [
        {
          id: null,
          amount: this.formData.amount || 0
        }
      ];
    }
  }
  private initData() {
    this.accountAmountChange();
  }
  // 默认账户
  private setDefultAccount() {
    let fundAccount =
      this.accountsOptions &&
      this.accountsOptions.length &&
      this.accountsOptions.find(item => item.isDefault);
    if (!fundAccount) {
      fundAccount = this.accountsOptions[0];
    }
    if (!this.formData.fundAccountId) {
      this.formData.fundAccountId = fundAccount && fundAccount.id;
    }
    if (this.formData.fundAccounts.length == 0) {
      const arr = fundAccount
        ? [{ id: fundAccount.id, amount: this.formData.amount }]
        : [];
      this.$set(this.formData, "fundAccounts", arr);
      this.$set(this.formData, "oldAmount", this.formData.amount);
      this.$set(this.formData, "changeStatus", false);
      this.accountAmountChange();
    }
  }
  // 预收付
  private getPrepayedAmount() {
    balance({
      billType: this.isPreSettleIn ? "YS" : "YF",
      companyId: this.companyId,
      cooperatorId: this.settlData?.cooperatorId,
      sourceBillType: this.settlData?.sourceBillType,
      sourceBillId: this.settlData?.sourceBillId
    }).then((res: any) => {
      this.formData.preAccountBalance = add(
        res.commonBalance,
        res.specialBalance
      );
    });
  }
  // 优惠价格变化
  private discountChange() {
    // prepayedAmount 预收结算金额  discountAmount 优惠金额
    this.formData.discountAmount = this.formData.discountAmount || 0;
    const amount: any = this.precisionFormat(
      add(this.formData.discountAmount || 0, this.formData.prepayedAmount || 0),
      "money"
    );
    // 用户没有操作过账户价格 并且 资金账户为单账户时 才联动处理
    if (!this.formData.changeStatus && this.formData.fundAccounts.length == 1) {
      if (amount >= this.formData.amount) {
        this.formData.totalAmount = 0;
        this.formData.fundAccounts.filter((item: any) => (item.amount = 0));
        this.formData.prepayedAmount = subtract(
          this.formData.amount || 0,
          this.formData.discountAmount || 0
        );
      } else {
        this.formData.totalAmount = subtract(
          this.formData.amount,
          add(
            this.formData.discountAmount || 0,
            this.formData.prepayedAmount || 0
          )
        );
        const nums = this.formData.fundAccounts.map((item: any) => item.amount);
        const sum = nums.reduce(this.getSum, 0);
        if (subtract(this.formData.totalAmount, sum) < 0) {
          // 减
          for (let i = this.formData.fundAccounts.length - 1; i >= 0; i--) {
            const nums = this.formData.fundAccounts.map(
              (item: any) => item.amount
            );
            const sum = nums.reduce(this.getSum, 0);
            let money = this.precisionFormat(
              subtract(sum, this.formData.totalAmount || 0),
              "money"
            );
            if (money > 0) {
              if (this.formData.fundAccounts[i].amount >= money) {
                this.formData.fundAccounts[i].amount = this.precisionFormat(
                  subtract(this.formData.fundAccounts[i].amount || 0, money),
                  "money"
                );
                money = 0;
              } else {
                this.formData.fundAccounts[i].amount = 0;
                money = this.precisionFormat(
                  subtract(money, this.formData.fundAccounts[i].amount),
                  "money"
                );
              }
            }
          }
        }
        if (subtract(this.formData.totalAmount, sum) > 0) {
          // 加
          this.formData.fundAccounts[
            this.formData.fundAccounts.length - 1
          ].amount += subtract(this.formData.totalAmount, sum);
        }
      }
    }
    this.setTransPrepayedAmount();
  }
  // 预收/付选中变化
  private isPrepayedChange() {
    if (this.formData.isUsePrepayedAmount) {
      // 可以预收的最大值
      const maxPrepayedAmount = subtract(
        this.formData.amount,
        this.formData.discountAmount
      );
      // 判断账户余额是否大于最大值
      if (
        subtract(
          this.formData.preAccountBalance || 0,
          maxPrepayedAmount || 0
        ) >= 0
      ) {
        this.formData.prepayedAmount = maxPrepayedAmount;
      } else {
        this.formData.prepayedAmount = this.formData.preAccountBalance;
      }
    } else {
      this.formData.prepayedAmount = 0;
    }
    this.prepayedChange();
  }
  // 预收/付价格变化
  private prepayedChange() {
    // 合计收款=应收金额 并且 资金账户为单账户时 才联动处理
    if (!this.formData.changeStatus && this.formData.fundAccounts.length == 1) {
      if (
        add(
          this.formData.prepayedAmount || 0,
          this.formData.discountAmount || 0
        ) >= this.formData.amount
      ) {
        // 变化后的预收结算金额 +  优惠金额  >=  应收金额
        this.formData.settledAmount = 0;
        this.formData.totalAmount = 0;
        this.formData.fundAccounts.filter((item: any) => (item.amount = 0));
        this.formData.discountAmount = subtract(
          this.formData.amount || 0,
          this.formData.prepayedAmount || 0
        );
      } else {
        this.formData.totalAmount = subtract(
          this.formData.amount,
          add(
            this.formData.prepayedAmount || 0,
            this.formData.discountAmount || 0
          )
        );
        this.formData.fundAccounts[0].amount = this.formData.totalAmount;
        this.discountChange();
      }
    }
    this.setTransPrepayedAmount();
  }
  // 价格合
  private getSum(total: any, num: any) {
    return num >= 0
      ? this.precisionFormat(add(total, num), "money")
      : this.precisionFormat(add(total, 0), "money");
  }
  // 账户价格获取焦点
  private accountAmountFocus() {
    if (this.formData.fundAccounts && this.formData.fundAccounts.length == 1) {
      this.formData.oldAmount = this.formData.fundAccounts[0].amount;
    }
  }
  private accountAmountBlur() {
    if (this.formData.fundAccounts && this.formData.fundAccounts.length == 1) {
      if (this.formData.oldAmount != this.formData.fundAccounts[0].amount) {
        this.formData.changeStatus = true;
      }
    }
  }
  // 账户价格变化
  private accountAmountChange() {
    const nums = this.formData.fundAccounts.map((item: any) => item.amount);
    this.formData.totalAmount = nums.reduce(this.getSum, 0);
    this.setTransPrepayedAmount();
  }
  // 转结预收付计算
  private setTransPrepayedAmount() {
    // discountAmount 优惠金额  settledAmount 结算金额  totalAmount 合计金额
    // isUsePrepayedAmount 是否预收付  prepayedAmount 预收付金额
    let amout = 0;
    // （输入的金额总合 + 预收？金额）- 应收金额
    amout = this.precisionFormat(
      subtract(
        add(
          add(this.formData.totalAmount || 0, this.formData.discountAmount),
          this.formData.isUsePrepayedAmount
            ? this.formData.prepayedAmount || 0
            : 0
        ),
        this.formData.amount
      ),
      "money"
    );
    // transPrepayedAmount 转结预收付
    this.formData.transPrepayedAmount = amout < 0 ? 0 : amout;
    const sum = this.precisionFormat(
      add(
        add(this.formData.totalAmount || 0, this.formData.discountAmount || 0),
        this.formData.prepayedAmount || 0
      ),
      "money"
    );
    if (this.formData.amount > sum) {
      this.formData.settledAmount = sum;
    } else {
      this.formData.settledAmount = this.formData.amount || 0;
    }
  }

  private close(isSubmit: boolean) {
    if (isSubmit && this.formData.fundAccounts) {
      if (Number(this.formData.settledAmount) > 0) {
        // 有收款金额
        for (let i = 0; i < this.formData.fundAccounts.length; i++) {
          const item = this.formData.fundAccounts[i];
          if (item.id == null || item.id == 0) {
            // 未选账户
            this.$message.warning({
              message: "请选择结算账户！",
              showClose: true
            });
            return false;
          } else {
            // 已选账户
            if (item.amount == undefined) {
              this.$message.warning({
                message: "请输入账户金额！",
                showClose: true
              });
              return false;
            }
          }
        }
        if (this.formData.fundAccounts.length > 1) {
          let count = 0;
          for (let i = 0; i < this.formData.fundAccounts.length; i++) {
            const item = this.formData.fundAccounts[i];
            if (item.amount == 0) {
              this.formData.fundAccounts.splice(i--, 1);
              this.$message.warning({
                message: "已自动去除账户金额为0的无效账户！",
                showClose: true
              });
              count++;
            }
          }
          if (count > 0) {
            return false;
          }
        }
      } else {
        for (let i = 0; i < this.formData.fundAccounts.length; i++) {
          const item = this.formData.fundAccounts[i];
          item.amount = 0;
          if (i > 0) {
            this.formData.fundAccounts.splice(i--, 1);
          }
        }
      }
      this.accountAmountChange();
    }
    // 现付时-是否允许部分结算
    if (
      isSubmit &&
      !this.financialsSettles[this.formData.billType]?.allowPartSettle &&
      this.formData.enhancedSettlementType.substring(0, 2) === "现付"
    ) {
      if (this.unSettledAmount !== 0) {
        this.$message.warning({
          message:
            "此单据结算只能一次性全额结算，请重新输入结算金额或优惠金额！",
          showClose: true
        });
        return;
      }
    }
    this.$emit("settleSolve", isSubmit);
  }
  private cellClassName({ columnIndex, row }: any) {
    if (columnIndex !== 1) return;
    switch (row.type) {
      case "amount":
        return "text-font-primary";
      case "settledAmount":
        return "text-font-warning";
      case "discountAmount":
        return "text-font-success";
      case "unSettledAmount":
        return "text-font-danger";
      default:
        return;
    }
  }
  private addAccount() {
    this.formData.fundAccounts.push({
      id: null,
      amount: this.unSettledAmount ? this.unSettledAmount : 0
    });
    this.selectChange();
    this.accountAmountChange();
  }
  private delAccount(i: number) {
    this.formData.fundAccounts.splice(i, 1);
    this.selectChange();
    this.accountAmountChange();
  }
  private selectChange() {
    this.accountsOptions.map((item: any) => (item.disabled = false));
    this.accountsOptions.forEach((item: any) => {
      this.formData.fundAccounts.forEach((item2: any) => {
        if (item2.id && item.id === item2.id) {
          item.disabled = true;
        }
      });
    });
  }
  mounted() {
    this.loadAccounts();
  }

  activated() {
    this.loadAccounts();
  }

  render() {
    return (
      <div>
        <el-row gutter={5}>
          <el-col span={9}>
            <ht-card title="单据详情">
              <ht-table
                disabledHotkeys
                data={this.relInformationList}
                columns={tableColumns}
                show-header={false}
                index-column={false}
                selection-type={null}
                cell-class-name={this.cellClassName}
              />
            </ht-card>
          </el-col>
          <el-col span={15}>
            <ht-card title="结算信息">
              <el-form
                ref="form"
                attrs={{
                  model: this.formData
                }}
                rules={this.rules}
                show-message={false}
                class="settle-form form-item-small-margin-bottom"
                label-width="88px"
                size="mini"
                label-position="left"
              >
                <el-row gutter={5}>
                  <el-col span={13}>
                    <el-form-item label="结算日期" prop="confirmDate">
                      <el-date-picker
                        v-model={this.formData.confirmDate}
                        clearable={false}
                        editable={false}
                        type="date"
                        value-format="yyyy-MM-dd"
                      />
                    </el-form-item>
                    <el-form-item
                      label="支付方式"
                      prop="enhancedSettlementType"
                    >
                      {this.isInternal ? (
                        <ht-input
                          v-model={this.formData.enhancedSettlementType}
                          disabled
                        />
                      ) : (
                        <ht-autoselect
                          v-model={this.formData.enhancedSettlementType}
                          clearable={false}
                          trigger-on-focus={false}
                          options={this.enhancedSettlementTypeList}
                          placeholder="请选择"
                          mnemonic
                          highlight-first-item
                        />
                      )}
                    </el-form-item>
                  </el-col>
                </el-row>
                {this.isNowPay && (
                  <table
                    cellspacing="0"
                    cellpadding="0"
                    style="width: 100%;"
                    class="settle-fundAccounts-table"
                  >
                    <tr>
                      <th
                        rowspan={Number(this.formData.fundAccounts.length + 1)}
                        style="width:38px"
                      >
                        {this.preSettleText}款账户
                      </th>
                      <th style="width:40px"></th>
                      <th style="width:204px">账户</th>
                      <th>{this.preSettleText}款金额</th>
                      <th style="width:64px"></th>
                    </tr>
                    {this.formData.fundAccounts.map(
                      (row: any, index: number) => (
                        <tr>
                          <td>{Number(index + 1)}</td>
                          <td>
                            <el-select
                              v-model={row.id}
                              filterable
                              size="mini"
                              placeholder="请选择账户"
                              on-change={() => this.selectChange()}
                            >
                              {this.accountsOptions.map(
                                (option: any, ind: number) => {
                                  return (
                                    <el-option
                                      key={ind}
                                      label={option.name}
                                      value={option.id}
                                      disabled={option.disabled}
                                    ></el-option>
                                  );
                                }
                              )}
                            </el-select>
                          </td>
                          <td>
                            <ht-format-number
                              v-model={row.amount}
                              disabled={!row.id}
                              min={0}
                              max={
                                this.isPreSettle
                                  ? Infinity
                                  : this.formData.amount
                              }
                              precision-type="money"
                              size="mini"
                              style="width: 140px"
                              onChange={this.accountAmountChange}
                              onFocus={this.accountAmountFocus}
                              onBlur={this.accountAmountBlur}
                            />
                          </td>
                          <td>
                            {index == this.formData.fundAccounts.length - 1 &&
                            this.formData.fundAccounts.length < 5 ? (
                              <el-link underline={false} type="primary">
                                <i
                                  class="el-icon-circle-plus-outline"
                                  onClick={() => this.addAccount()}
                                ></i>
                              </el-link>
                            ) : null}
                            {this.formData.fundAccounts.length > 1 ? (
                              <el-link underline={false} type="danger">
                                <i
                                  class="el-icon-delete"
                                  onClick={() => this.delAccount(index)}
                                ></i>
                              </el-link>
                            ) : null}
                          </td>
                        </tr>
                      )
                    )}
                  </table>
                )}
                {this.isNowPay && (
                  <div>
                    <el-row gutter={5}>
                      <el-col span={13}>
                        <el-form-item
                          label={`合计` + this.preSettleText + `款`}
                          prop="totalAmount"
                        >
                          {this.isPreSettle ? (
                            <ht-format-number
                              v-model={this.formData.totalAmount}
                              disabled // ={this.cantEditMoney}
                              min={0}
                              precision-type="money"
                              onBlur={this.setTransPrepayedAmount}
                            />
                          ) : (
                            <ht-format-number
                              v-model={this.formData.totalAmount}
                              disabled // ={this.cantEditMoney}
                              min={0}
                              max={this.formData.amount}
                              precision-type="money"
                              onBlur={this.setTransPrepayedAmount}
                            />
                          )}
                        </el-form-item>
                        {this.financialsSettles[this.formData.billType]
                          ?.allowDiscount && (
                          <el-form-item label="优惠金额" prop="discountAmount">
                            <ht-format-number
                              v-model={this.formData.discountAmount}
                              disabled={this.cantEditMoney}
                              min={0}
                              max={
                                Number(this.formData.brokerageAmount || 0) > 0
                                  ? Number(this.formData.amount || 0) -
                                    Number(this.formData.brokerageAmount || 0)
                                  : this.formData.amount
                              }
                              precision-type="money"
                              onBlur={this.discountChange}
                            />
                          </el-form-item>
                        )}
                      </el-col>
                    </el-row>
                    {this.isPreSettle && (
                      <div>
                        {this.financialsSettles[this.formData.billType]
                          ?.allowPrepayed && (
                          <el-row gutter={5}>
                            <el-col span={13}>
                              <el-form-item prop="prepayedAmount">
                                <el-checkbox
                                  slot="label"
                                  v-model={this.formData.isUsePrepayedAmount}
                                  disabled={
                                    !Number(
                                      this.formData.preAccountBalance || 0
                                    )
                                  }
                                  onChange={this.isPrepayedChange}
                                >
                                  预{this.preSettleText}结算
                                </el-checkbox>
                                <ht-format-number
                                  v-model={this.formData.prepayedAmount}
                                  disabled={!this.formData.isUsePrepayedAmount}
                                  min={0}
                                  max={
                                    this.formData.amount >
                                    Number(this.formData.preAccountBalance || 0)
                                      ? Number(
                                          this.formData.preAccountBalance || 0
                                        )
                                      : this.formData.amount
                                  }
                                  precision-type="money"
                                  onBlur={this.prepayedChange}
                                />
                              </el-form-item>
                            </el-col>
                            <el-col span={11}>
                              <el-form-item
                                label={`账户余额`} // 预${this.preSettleText}账户
                                prop="preAccountBalance"
                                label-width="70px"
                              >
                                <ht-input
                                  value={this.formData.preAccountBalance}
                                  disabled
                                />
                              </el-form-item>
                            </el-col>
                          </el-row>
                        )}
                        <el-row gutter={5}>
                          <el-col span={13}>
                            <el-form-item label="未结金额">
                              <ht-input
                                v-model={this.unSettledAmount}
                                disabled
                              />
                            </el-form-item>
                            {this.financialsSettles[this.formData.billType]
                              ?.allowTransPrepayed && (
                              <el-form-item prop="transPrepayedAmount">
                                <el-checkbox
                                  class="more-checkbox"
                                  slot="label"
                                  disabled={!this.formData.transPrepayedAmount}
                                  v-model={
                                    this.formData.isUseTransPrepayedAmount
                                  }
                                >
                                  {`多${this.preSettleText}转预${this.preSettleText}`}
                                </el-checkbox>
                                <ht-input
                                  v-model={this.formData.transPrepayedAmount}
                                  disabled
                                />
                              </el-form-item>
                            )}
                          </el-col>
                        </el-row>
                      </div>
                    )}
                    <el-row gutter={5}>
                      <el-col span={13}>
                        {this.showInvince && (
                          <el-form-item label="发票类型" prop="invoiceType">
                            <ht-autoselect
                              v-model={this.formData.invoiceType}
                              clearable={false}
                              options={this.formatInvoiceTypeDictionary}
                              trigger-on-focus={false}
                              format-name={() =>
                                this.getFormatInvoiceType(
                                  this.formData.invoiceType,
                                  this.formData.taxRate
                                )
                              }
                              on-change={this.invoiceTypeChange}
                              class="switch-focus focus-invoiceType"
                              placeholder="请选择"
                              mnemonic
                              filter-zero
                            />
                          </el-form-item>
                        )}
                        {this.showInvince && (
                          <el-form-item prop="invoiceNumber" label="发票号">
                            <ht-input
                              v-model={this.formData.invoiceNumber}
                              placeholder="最大支持100个字符"
                              maxlength="100"
                            />
                          </el-form-item>
                        )}
                        <el-form-item label="收/付款人" prop="paymentBy">
                          <ht-autocomplete
                            v-model={this.formData.paymentBy}
                            show-suffix={false}
                            fetch-suggestions={this.autocompleteSearchStaffs}
                            trigger-on-focus={false}
                            highlight-first-item
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                )}
                <el-form-item label="备注" prop="remark">
                  <ht-input v-model={this.formData.remark} />
                </el-form-item>
              </el-form>
            </ht-card>
          </el-col>
        </el-row>
        <div class="dialog-footer-align" style="margin: 10px 0 5px 0">
          <el-button
            loading={this.loading}
            type="primary"
            size="mini"
            plain
            onClick={() => this.close(true)}
          >
            确定（F3）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            plain
            onClick={() => this.close(false)}
          >
            取消（Esc）
          </el-button>
        </div>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .settle-form {
    .settle-fundAccounts-table {
      border: 1px solid #ebeef5;
      border-width: 1px 0 0 1px;
      margin: 2px 0 5px;
      padding: 0;
      tr {
        th {
          border: 1px solid #ebeef5;
          border-width: 0 1px 1px 0;
          font-size: 12px;
          height: 30px;
          background: rgb(245, 247, 250);
          font-weight: 400;
          text-align: left;
          padding: 0 8px;
          &:first-child {
            text-align: center;
          }
        }
        td {
          border: 1px solid #ebeef5;
          border-width: 0 1px 1px 0;
          height: 30px;
          padding: 5px 10px;
          text-align: center;
          .el-link {
            float: left;
            &:first-child {
              margin-right: 5px;
            }
          }
          i {
            font-size: 18px;
            cursor: pointer;
          }
        }
      }
    }
    .more-checkbox {
      .el-checkbox__label {
        padding-left: 2px;
      }
    }
  }
}
</style>
