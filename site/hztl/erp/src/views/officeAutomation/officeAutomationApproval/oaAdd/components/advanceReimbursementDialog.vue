<template>
  <ht-dialog
    :visible.sync="visible"
    :loading="loading"
    title="发起审批 - 预支报销款"
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
          <el-form-item label="预支单号">
            <ht-input v-model="selectData.billNo" disabled>
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="showAdvanceAccountDialog"
              ></el-button>
            </ht-input>
          </el-form-item>
          <el-form-item label="预支金额">
            <ht-input v-model="selectData.amount" disabled />
          </el-form-item>
          <el-form-item label="收支类目">
            <ht-input v-model="selectData.fundCategoryName" disabled />
          </el-form-item>
          <el-form-item prop="applyDate" label="申请日期">
            <el-date-picker
              v-model="formData.applyDate"
              type="date"
              value-format="yyyy-MM-dd"
              :clearable="false"
            />
          </el-form-item>
          <el-form-item prop="applyAmount" label="报销金额">
            <ht-format-number
              v-model="formData.applyAmount"
              :min="0"
              precision-type="price"
            />
          </el-form-item>
          <el-form-item label="待结算">
            <ht-input v-model="selectData.toFinancialAmount" disabled />
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
      <ht-card title="凭证信息" style="margin-top: 10px;">
        <div slot="after-title" class="after-title">
          （最多支持添加五张凭证）
        </div>
        <SrImgUpload
          :file-list="formData.voucherImages"
          :limit="5"
          :max-size="2"
          type="shard"
          @get-file-list="getFileList"
        />
      </ht-card>
    </el-form>
    <div style="margin-top: 10px;" class="dialog-footer-align">
      <el-button
        type="primary"
        size="mini"
        :disabled="!selectData.amount"
        @click="handleSure"
      >
        确定（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click="handleCancel">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import { Form } from "element-ui";
import { cloneDeep } from "lodash";
import { dateFormat } from "@/utils/date";
import { subtract } from "@/utils/numberAPI";
import SrImgUpload from "@/components/base/SrImgUpload"; // OA审批 发起审批 - 预支报销款
import { BILL_TYPE } from "../../constant";
import {
  TagModel,
  ImageFileModel,
  FeeApplicationCreateParams,
  FeeApplicationInfoModel,
  FeeApplicationSelectModel
} from "../../constant/interfaces";
import { OfficeAutomationService } from "../../constant/services";
const officeAutomationService = new OfficeAutomationService();

const defaultSelectData = {
  billId: 0, // 单据id
  billNo: "", // 预支单号
  amount: "", // 预支金额
  fundCategoryName: "", // 收支类目名称
  toFinancialAmount: 0
} as FeeApplicationSelectModel;

const defaultFormData: FeeApplicationCreateParams = {
  billType: BILL_TYPE.YBX, // 费用类型
  applyDate: dateFormat(new Date()), // 申请日期
  applyAmount: "", // 申请金额、报销金额
  remark: "", // 备注
  accountInfo: {
    paymentType: "", // 支付方式
    bank: "", // 银行
    bankAccount: "", // 银行账户
    contact: "", // 联系人
    phone: "" // 联系电话
  },
  voucherImages: [],
  fundCategoryId: ""
};

@Component({ name: "AdvanceReimbursementDialog", components: { SrImgUpload } })
export default class AdvanceReimbursementDialog extends Vue {
  // 支付方式列表
  @Prop() private paymentTypeOptions!: TagModel[];

  @Emit("update") private update() {
    return;
  }
  @Emit("showAdvanceAccountDialog")
  private showAdvanceAccountDialog() {
    this.handleCancel();
    return;
  }

  public visible = false;
  private loading = false;

  private infoData = {} as FeeApplicationInfoModel;
  private selectData = { ...defaultSelectData };

  get ruleForm(): Form {
    return this.$refs.ruleForm as Form;
  }

  // 计算带结算金额
  // get toFinancialAmount(): number {
  //   const toFinancial = this.selectData.amount
  //     ? Number(this.selectData.amount)
  //     : 0;
  //   const applyAmount = this.infoData.applyAmount
  //     ? Number(this.infoData.applyAmount)
  //     : 0;
  //   return subtract(toFinancial, applyAmount);
  // }

  protected formData: FeeApplicationCreateParams = cloneDeep(defaultFormData);

  @Watch("formData.applyAmount")
  protected applyAmountChange(value: number) {
    value = value || 0;
    const amount = this.selectData.amount ? Number(this.selectData.amount) : 0;
    this.selectData.toFinancialAmount = subtract(amount, value);
  }
  protected rules = {
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
        trigger: "change",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validator: (rule: any, value: number | string, callback: Function) => {
          const amount = this.selectData.amount
            ? Number(this.selectData.amount)
            : 0;
          this.selectData.toFinancialAmount = subtract(amount, value);
          if (value === "") {
            callback(new Error("请输入报销金额"));
          } else if (value <= 0) {
            callback(new Error("报销金额不能小于等于0"));
          }
          callback();
        }
      }
    ]
  };

  protected createFeeApplication() {
    const params = { ...this.formData };
    params.advanceBillId = this.selectData.billId;
    params.voucherImages = params.voucherImages?.map(
      item => (item as ImageFileModel).origin
    );
    officeAutomationService.createFeeApplication(params).then(() => {
      this.update();
      // this.showAdvanceAccountDialog();
      this.$message.success("操作成功");
      this.handleCancel();
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

  protected handleCancel() {
    this.visible = false;
  }

  public show(id: number, isEdit?: boolean) {
    if (!id) return;
    this.loading = true;
    officeAutomationService
      .getFeeApplicationInfo(id)
      .then((res: FeeApplicationInfoModel) => {
        if (res) {
          this.infoData = res;
          const {
            id,
            billNo,
            applyAmount,
            fundCategoryName,
            fundCategoryId
          } = res;
          this.selectData.billId = id;
          this.selectData.billNo = billNo;
          this.selectData.amount = applyAmount;
          this.selectData.fundCategoryName = fundCategoryName;
          this.formData.fundCategoryId = fundCategoryId;
          if (isEdit) {
            const {
              sourceBillId,
              sourceBillNo,
              sourceAmount,
              billType,
              applyDate,
              remark,
              accountInfo,
              voucherImages
            } = res;
            this.selectData.billId = sourceBillId;
            this.selectData.billNo = sourceBillNo;
            this.selectData.amount = sourceAmount;
            this.formData.billType = billType || "";
            this.formData.applyDate = applyDate || "";
            this.formData.applyAmount = applyAmount || "";
            this.formData.remark = remark || "";
            if (accountInfo) {
              Object.assign(this.formData.accountInfo, accountInfo);
            }
            if (voucherImages) {
              this.formData.voucherImages = voucherImages.map(item => {
                return {
                  name: "",
                  url: item,
                  origin: item
                };
              });
            }
          }
        }
        this.loading = false;
      })
      .catch(() => (this.loading = false))
      .finally(() => (this.visible = true));
  }

  protected closed() {
    this.formData = cloneDeep(defaultFormData);
    this.infoData = {} as FeeApplicationInfoModel;
    this.$nextTick(() => {
      this.ruleForm.clearValidate();
    });
  }

  protected getFileList(fileList: ImageFileModel[]) {
    this.formData.voucherImages = fileList;
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  background-color: #e0e0e0;
}
.after-title {
  margin-top: 2px;
  font-size: 12px;
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
