<template>
  <ht-dialog
    :visible.sync="visible"
    title="发起审批 - 调拨对账补充登记"
    width="400px"
    append-to-body
    v-on="$listeners"
    @closed="closed"
  >
    <el-form
      ref="ruleForm"
      :model="formData"
      :rules="rules"
      :show-message="false"
      label-width="90px"
      label-position="right"
      size="mini"
      class="form-item-small-margin-bottom"
    >
      <el-form-item prop="relatedCompanyId" label="往来分公司">
        <ht-select
          v-model="formData.relatedCompanyId"
          :options="businessCompanyOptions"
          :clearable="false"
          filterable
        />
      </el-form-item>
      <el-form-item prop="billType" label="收付标识">
        <el-radio-group v-model="formData.billType">
          <el-radio v-for="item in billTypes" :key="item.id" :label="item.id">
            {{ item.name }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="applyDate" label="业务日期">
        <el-date-picker
          v-model="formData.applyDate"
          type="date"
          value-format="yyyy-MM-dd"
          :clearable="false"
        />
      </el-form-item>
      <el-form-item prop="applyAmount" label="金额">
        <ht-format-number
          v-model="formData.applyAmount"
          :min="0"
          precision-type="price"
        />
      </el-form-item>
      <el-form-item prop="businessManId" label="业务员">
        <ht-autoselect
          v-model="formData.businessManId"
          :options="businessManOptions"
          :triggerOnFocus="false"
          placeholder="请选择"
          clearable
          filter-zero
          highlight-first-item
        />
      </el-form-item>
      <el-form-item prop="remark" label="备注">
        <ht-input v-model="formData.remark" />
      </el-form-item>
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
import { Component, Mixins, Emit } from "vue-property-decorator";
import { Form } from "element-ui";
import { cloneDeep } from "lodash";
import searchMixin from "@/mixins/searchMixin";
import { dateFormat } from "@/utils/date";
import {
  TagModel,
  OptionModel,
  FeeApplicationCreateParams,
  FeeApplicationInfoModel
} from "../../constant/interfaces";
import { TRANSFER_TYPES } from "../../constant";
import { OfficeAutomationService } from "../../constant/services";
const officeAutomationService = new OfficeAutomationService();
import { selectCompanys, searchTypeStaffs } from "@/api/company/company";

const defaultFormData: FeeApplicationCreateParams = {
  relatedCompanyId: "", // 往来分公司
  billType: TRANSFER_TYPES[0].id, // 资金类型
  applyDate: dateFormat(new Date()), // 申请日期
  applyAmount: "", // 金额
  businessManId: null, // 业务员
  remark: "" // 备注
};

@Component({ name: "TransferRegisterDialog" })
export default class TransferRegisterDialog extends Mixins(searchMixin) {
  @Emit("update") private update() {
    return;
  }

  public visible = false;

  get ruleForm(): Form {
    return this.$refs.ruleForm as Form;
  }

  private billTypes: TagModel[] = TRANSFER_TYPES;

  protected formData: FeeApplicationCreateParams = cloneDeep(defaultFormData);
  protected rules = {
    relatedCompanyId: [
      {
        required: true,
        message: "请选择往来分公司",
        trigger: "change"
      }
    ],
    billType: [
      {
        required: true,
        message: "请选择资金类型",
        trigger: "change"
      }
    ],
    applyDate: [
      {
        required: true,
        message: "请选择业务日期",
        trigger: "change"
      }
    ],
    applyAmount: [
      {
        required: true,
        message: "请输入金额",
        trigger: "change"
      }
    ]
  };

  private businessCompanyOptions: TagModel[] = [];
  // 获取业务分公司选项列表
  private getBusinessCompanyOptions() {
    selectCompanys({
      type: "allocation"
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        this.businessCompanyOptions = res || [];
      })
      .catch(() => (this.businessCompanyOptions = []));
  }

  // 获取业务员列表
  private businessManOptions: OptionModel[] = [];
  private getBusinessManOptions() {
    searchTypeStaffs({
      company: "self"
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        this.businessManOptions = res || [];
      })
      .catch(() => (this.businessManOptions = []));
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
    this.getBusinessManOptions();
    if (model) {
      const {
        relatedCompanyId,
        billType,
        applyDate,
        applyAmount,
        businessManId,
        remark
      } = model;
      this.formData.relatedCompanyId = relatedCompanyId || "";
      this.formData.billType = billType || "";
      this.formData.applyDate = applyDate || "";
      this.formData.applyAmount = applyAmount || "";
      this.formData.businessManId = businessManId || null;
      this.formData.remark = remark || "";
    }
    this.visible = true;
  }

  protected closed() {
    this.formData = cloneDeep(defaultFormData);
    this.$nextTick(() => {
      this.ruleForm.clearValidate();
    });
  }
}
</script>
