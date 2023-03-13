<template>
  <ht-dialog
    :visible.sync="visible"
    title="发起审批 - 预收/付款"
    width="712px"
    append-to-body
    v-on="$listeners"
    @closed="closed"
  >
    <el-form
      ref="ruleForm"
      :model="formData"
      :rules="rules"
      :show-message="false"
      label-width="71px"
      label-position="right"
      size="mini"
      class="form-item-small-margin-bottom"
    >
      <div class="card-layout">
        <ht-card title="申请信息">
          <el-form-item prop="billType" label="资金类型">
            <el-radio-group v-model="formData.billType">
              <el-radio
                v-for="item in billTypes"
                :key="item.id"
                :label="item.id"
              >
                {{ item.name }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="cooperatorId" label="往来单位">
            <ht-autoselect
              v-model="formData.cooperatorId"
              :defaultValue="cooperatorName"
              :fetch-suggestions="query => searchFundCategoriesOptions(query)"
              :trigger-on-focus="false"
              filterZero
              remote
              placeholder="请选择"
              filter-zero
              highlight-first-item
            />
          </el-form-item>
          <el-form-item prop="companyId" label="分公司">
            <ht-select
              v-model="formData.companyId"
              :options="businessCompanyOptions"
              :clearable="false"
              disabled
              filterable
            />
          </el-form-item>
          <el-form-item prop="applyDate" label="申请日期">
            <el-date-picker
              v-model="formData.applyDate"
              type="date"
              value-format="yyyy-MM-dd"
              :clearable="false"
            />
          </el-form-item>
          <el-form-item prop="applyAmount" label="申请金额">
            <ht-format-number
              v-model="formData.applyAmount"
              :min="0"
              precision-type="price"
            />
          </el-form-item>
          <el-form-item prop="remark" label="备注">
            <ht-input v-model="formData.remark" />
          </el-form-item>
        </ht-card>
        <ht-card title="支付信息">
          <el-form-item prop="accountInfo.paymentType" label="支付方式">
            <ht-select
              v-model="formData.accountInfo.paymentType"
              :options="paymentTypeOptions"
              clearable
              filterable
            />
          </el-form-item>
          <el-form-item prop="accountInfo.bank" label="支付银行">
            <ht-input v-model="formData.accountInfo.bank" clearable />
          </el-form-item>
          <el-form-item prop="accountInfo.bankAccount" label="银行账户">
            <ht-input v-model="formData.accountInfo.bankAccount" clearable />
          </el-form-item>
          <el-form-item prop="accountInfo.contact" label="联系人">
            <ht-input v-model="formData.accountInfo.contact" clearable />
          </el-form-item>
          <el-form-item prop="accountInfo.phone" label="联系电话">
            <ht-input v-model="formData.accountInfo.phone" clearable />
          </el-form-item>
        </ht-card>
      </div>
    </el-form>
    <div style="margin-top: 10px;" class="dialog-footer-align">
      <el-button type="primary" size="mini" @click="handleSure">
        确定（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click="handleCancel">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Emit, Watch } from "vue-property-decorator";
import { Form } from "element-ui";
import { cloneDeep } from "lodash";
import searchMixin from "@/mixins/searchMixin";
import { dateFormat } from "@/utils/date";
import {
  TagModel,
  FeeApplicationCreateParams,
  FeeApplicationInfoModel
} from "../../constant/interfaces";
import { IN_BILL_TYPES } from "../../constant";
import { OfficeAutomationService } from "../../constant/services";
const officeAutomationService = new OfficeAutomationService();
import { selectCompanys } from "@/api/company/company";
import * as store from "@/utils/store";

const defaultFormData: FeeApplicationCreateParams = {
  billType: IN_BILL_TYPES[0].id, // 资金类型
  cooperatorId: "", // 往来单位
  companyId: "", // 分公司
  applyDate: dateFormat(new Date()), // 申请日期
  applyAmount: "", // 申请金额
  remark: "", // 备注
  accountInfo: {
    paymentType: "", // 支付方式
    bank: "", // 银行
    bankAccount: "", // 银行账户
    contact: "", // 联系人
    phone: "" // 联系电话
  }
};

interface UserInfoMsgModel {
  companyId: number;
}

@Component({ name: "PaymentReceivedDialog" })
export default class PaymentReceivedDialog extends Mixins(searchMixin) {
  @Watch("userInfoMsg", { immediate: true })
  private onUserInfoMsg(data: UserInfoMsgModel) {
    if (data.companyId) {
      defaultFormData.companyId = data.companyId;
    }
    this.formData = cloneDeep(defaultFormData);
  }

  // 支付方式列表
  @Prop() private paymentTypeOptions!: TagModel[];
  @Emit("update") private update() {
    return;
  }

  public visible = false;

  get ruleForm(): Form {
    return this.$refs.ruleForm as Form;
  }

  private billTypes: TagModel[] = IN_BILL_TYPES;

  protected formData: FeeApplicationCreateParams = cloneDeep(defaultFormData);
  protected rules = {
    billType: [
      {
        required: true,
        message: "请选择资金类型",
        trigger: "change"
      }
    ],
    cooperatorId: [
      {
        required: true,
        message: "请选择往来单位",
        trigger: "change"
      }
    ],
    companyId: [
      {
        required: true,
        message: "请选择分公司",
        trigger: "change"
      }
    ],
    applyDate: [
      {
        required: true,
        message: "请选择申请日期",
        trigger: "change"
      }
    ],
    applyAmount: [
      {
        required: true,
        message: "请输入申请金额",
        trigger: "change"
      }
    ]
  };

  protected cooperatorName = "";

  // 获取往来单位选项列表
  async searchFundCategoriesOptions(query = "") {
    return (await this.searchLoadAllTypesCooperators(query)) || [];
  }

  private businessCompanyOptions: TagModel[] = [];
  // 获取业务分公司选项列表
  private getBusinessCompanyOptions() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectCompanys("").then((res: any) => {
      this.businessCompanyOptions = res || [];
    });
  }

  protected handleSure() {
    this.ruleForm.validate((valid, err) => {
      if (valid) {
        this.createFeeApplication();
      } else {
        const errTips = err[Object.keys(err)[0]][0].message;
        this.$message.warning({ message: errTips, showClose: true });
      }
    });
  }

  protected createFeeApplication() {
    officeAutomationService.createFeeApplication(this.formData).then(() => {
      this.handleCancel();
      this.update();
      this.$message.success("操作成功");
    });
  }

  protected handleCancel() {
    this.visible = false;
  }

  public show(model?: FeeApplicationInfoModel) {
    this.getBusinessCompanyOptions();
    if (model) {
      const {
        billType,
        cooperatorId,
        cooperatorName,
        companyId,
        applyDate,
        applyAmount,
        remark,
        accountInfo
      } = model;
      this.formData.billType = billType || "";
      this.formData.cooperatorId = cooperatorId || "";
      this.cooperatorName = cooperatorName || "";
      this.formData.companyId = companyId || "";
      this.formData.applyDate = applyDate || "";
      this.formData.applyAmount = applyAmount || "";
      this.formData.remark = remark || "";
      if (accountInfo) {
        Object.assign(this.formData.accountInfo, accountInfo);
      }
    }
    this.visible = true;
  }

  protected closed() {
    this.formData = cloneDeep(defaultFormData);
    this.cooperatorName = "";
    this.$nextTick(() => {
      this.ruleForm.clearValidate();
    });
  }

  // created() {
  //   this.getCooperatorOptions();
  // }
  get userInfoMsg() {
    return store.userInfoMsg();
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  background-color: #e0e0e0;
}
.card-layout {
  display: flex;
  .el-card {
    flex: 1;
    &:first-child {
      margin-right: 4px;
    }
    &:last-child {
      margin-left: 4px;
    }
  }
}
</style>
