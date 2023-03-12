<template>
  <ht-dialog
    :visible.sync="visible"
    title="发起审批 - 员工预支款"
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
          <el-form-item prop="applyDate" label="申请日期">
            <el-date-picker
              v-model="formData.applyDate"
              type="date"
              value-format="yyyy-MM-dd"
              :clearable="false"
            />
          </el-form-item>
          <el-form-item prop="fundCategoryId" label="收支类目">
            <ht-autoselect
              v-model="formData.fundCategoryId"
              :defaultValue="fundCategoryName"
              :fetch-suggestions="query => searchFundCategoriesOptions(query)"
              :trigger-on-focus="false"
              filterZero
              remote
              placeholder="请选择"
              filter-zero
              highlight-first-item
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
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { Form } from "element-ui";
import { cloneDeep } from "lodash";
import { dateFormat } from "@/utils/date";
import { BILL_TYPE } from "../../constant";
import {
  TagModel,
  FeeApplicationCreateParams,
  FeeApplicationInfoModel,
  FundCategoriesOptionModel
} from "../../constant/interfaces";
import { OfficeAutomationService } from "../../constant/services";
const officeAutomationService = new OfficeAutomationService();

const defaultFormData: FeeApplicationCreateParams = {
  billType: BILL_TYPE.YZ, // 费用类型
  applyDate: dateFormat(new Date()), // 申请日期
  fundCategoryId: "", // 收支类目
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

@Component({ name: "StaffAdvanceDialog" })
export default class StaffAdvanceDialog extends Vue {
  // 支付方式选项
  @Prop() private paymentTypeOptions!: TagModel[];
  // 收支类目选项
  // @Prop() private fundCategoryOptions!: OptionModel[];
  @Emit("update") private update() {
    return;
  }

  public visible = false;

  get ruleForm(): Form {
    return this.$refs.ruleForm as Form;
  }

  protected fundCategoryName = "";

  protected formData: FeeApplicationCreateParams = cloneDeep(defaultFormData);
  protected rules = {
    applyDate: [
      {
        required: true,
        message: "请选择申请日期",
        trigger: "change"
      }
    ],
    fundCategoryId: [
      {
        required: true,
        message: "请选择收支类目",
        trigger: "change"
      }
    ],
    applyAmount: [
      {
        required: true,
        message: "请选择申请金额",
        trigger: "change"
      }
    ]
  };

  // 获取收支类目选项
  async searchFundCategoriesOptions(query = "") {
    const options =
      (await officeAutomationService.getFundCategoriesOptions(query)) || [];
    return options.map((item: FundCategoriesOptionModel) => {
      return {
        id: item.id,
        name: item.fullName
      };
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
      this.$message.success("操作成功");
      this.update();
      this.handleCancel();
    });
  }

  protected handleCancel() {
    this.visible = false;
  }

  public show(model?: FeeApplicationInfoModel) {
    if (model) {
      const {
        billType,
        applyDate,
        fundCategoryId,
        fundCategoryName,
        applyAmount,
        remark,
        accountInfo
      } = model;
      this.formData.billType = billType || "";
      this.formData.applyDate = applyDate || "";
      this.formData.fundCategoryId = fundCategoryId || "";
      this.formData.applyAmount = applyAmount || "";
      this.formData.remark = remark || "";
      this.fundCategoryName = fundCategoryName || "";
      if (accountInfo) {
        Object.assign(this.formData.accountInfo, accountInfo);
      }
    }
    this.visible = true;
  }

  protected closed() {
    this.formData = cloneDeep(defaultFormData);
    this.fundCategoryName = "";
    this.$nextTick(() => {
      this.ruleForm.clearValidate();
    });
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
::v-deep .img-medium {
  height: 120px;
  overflow-y: hidden;
}
</style>
