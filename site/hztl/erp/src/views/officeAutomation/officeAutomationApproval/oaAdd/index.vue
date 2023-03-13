<template>
  <div class="scroll-container audit-add">
    <el-collapse v-model="collapses">
      <el-collapse-item name="fundApply">
        <template slot="title">
          <span class="audit-title-name">资金申请</span>
          <span class="audit-title-count">(3)</span>
        </template>
        <div class="list-oa-button">
          <OaButton
            iconClass="icon-oa-collect"
            text="预收/付款"
            :disabled="!hasAutoPerm('advancePayment.create')"
            @click="showPaymentReceivedDialog"
          ></OaButton>
          <OaButton
            iconClass="icon-oa-retreat"
            text="退预收/付款"
            :disabled="!hasAutoPerm('refundAdvancePayment.create')"
            @click="showRefundPaymentReceivedDialog"
          ></OaButton>
          <OaButton
            iconClass="icon-oa-withdraw"
            text="员工预支款"
            :disabled="!hasAutoPerm('estimatedExpenditure.create')"
            @click="showStaffAdvanceDialog"
          ></OaButton>
        </div>
      </el-collapse-item>
      <el-collapse-item name="expenseAccount">
        <template slot="title">
          <span class="audit-title-name">费用报销</span>
          <span class="audit-title-count">(2)</span>
        </template>
        <div class="list-oa-button">
          <OaButton
            iconClass="icon-oa-reimbursement"
            text="预支费用报销"
            :disabled="!hasAutoPerm('estimatedExpenditure.create')"
            @click="showAdvanceAccountDialog"
          ></OaButton>
          <OaButton
            iconClass="icon-oa-generation"
            text="普通费用报销"
            :disabled="!hasAutoPerm('reimbursement.create')"
            @click="showCostsReimbursedDialog"
          ></OaButton>
        </div>
      </el-collapse-item>
      <el-collapse-item name="businessApply">
        <template slot="title">
          <span class="audit-title-name">业务申请</span>
          <span class="audit-title-count">(1)</span>
        </template>
        <div class="list-oa-button">
          <OaButton
            iconClass="icon-oa-requisition"
            text="调拨对账补充登记"
            :disabled="!hasAutoPerm('allocationRegistration.create')"
            @click="showTransferRegisterDialog"
          ></OaButton>
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- 预收/付款 -->
    <PaymentReceivedDialog
      ref="paymentReceivedDialog"
      :paymentTypeOptions="paymentTypeOptions"
    ></PaymentReceivedDialog>
    <!-- 退预收/付款 -->
    <RefundPaymentReceivedDialog
      ref="refundPaymentReceivedDialog"
      :paymentTypeOptions="paymentTypeOptions"
    ></RefundPaymentReceivedDialog>
    <!-- 员工预支款 -->
    <StaffAdvanceDialog
      ref="staffAdvanceDialog"
      :paymentTypeOptions="paymentTypeOptions"
    ></StaffAdvanceDialog>
    <!-- 代付费用报销 -->
    <CostsReimbursedDialog
      ref="costsReimbursedDialog"
      :paymentTypeOptions="paymentTypeOptions"
    ></CostsReimbursedDialog>
    <!-- 待报销预支款 -->
    <AdvanceAccountDialog
      ref="advanceAccountDialog"
      @showAdvanceReimbursementDialog="showAdvanceReimbursementDialog"
    ></AdvanceAccountDialog>
    <!-- 预支报销款 -->
    <AdvanceReimbursementDialog
      ref="advanceReimbursementDialog"
      :paymentTypeOptions="paymentTypeOptions"
      @showAdvanceAccountDialog="showAdvanceAccountDialog"
    ></AdvanceReimbursementDialog>
    <!-- 调拨对账补充登记 -->
    <TransferRegisterDialog
      ref="transferRegisterDialog"
      :paymentTypeOptions="paymentTypeOptions"
    >
    </TransferRegisterDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import OaButton from "./components/oaButton.vue";
import PaymentReceivedDialog from "./components/paymentReceivedDialog.vue";
import RefundPaymentReceivedDialog from "./components/refundPaymentReceivedDialog.vue";
import StaffAdvanceDialog from "./components/staffAdvanceDialog.vue";
import CostsReimbursedDialog from "./components/costsReimbursedDialog.vue";
import AdvanceAccountDialog from "./components/advanceAccountDialog.vue";
import AdvanceReimbursementDialog from "./components/advanceReimbursementDialog.vue";
import TransferRegisterDialog from "./components/transferRegisterDialog.vue";
import { TagModel } from "../constant/interfaces";
import { namespace } from "vuex-class";
const dictionary = namespace("baseData/dictionary");

@Component({
  name: "OaAdd",
  components: {
    OaButton,
    PaymentReceivedDialog,
    RefundPaymentReceivedDialog,
    StaffAdvanceDialog,
    CostsReimbursedDialog,
    AdvanceAccountDialog,
    AdvanceReimbursementDialog,
    TransferRegisterDialog
  }
})
export default class OaAdd extends Vue {
  // 获取支付方式选项
  @dictionary.State("enhancedSettlementType")
  private enhancedSettlementType!: TagModel[];

  private paymentTypeOptions: TagModel[] = [];

  @Watch("enhancedSettlementType", { immediate: true })
  private onEnhancedSettlementType(list: TagModel[]) {
    list = list || [];
    this.paymentTypeOptions = list
      .filter(item => item.name.match("现付"))
      .map(item => {
        return {
          id: item.name,
          name: item.name
        };
      });
  }
  private collapses: string[] = [
    "fundApply",
    "expenseAccount",
    "businessApply"
  ];

  // 显示'预收/付款'弹框
  private get paymentReceivedDialog(): PaymentReceivedDialog {
    return this.$refs.paymentReceivedDialog as PaymentReceivedDialog;
  }
  private showPaymentReceivedDialog() {
    this.paymentReceivedDialog.show();
  }
  get refundPaymentReceivedDialog(): RefundPaymentReceivedDialog {
    return this.$refs
      .refundPaymentReceivedDialog as RefundPaymentReceivedDialog;
  }
  // 显示'退预收/付款'弹框
  private showRefundPaymentReceivedDialog() {
    this.refundPaymentReceivedDialog.show();
  }
  // 显示‘员工预支款’弹框
  get staffAdvanceDialog(): StaffAdvanceDialog {
    return this.$refs.staffAdvanceDialog as StaffAdvanceDialog;
  }
  private showStaffAdvanceDialog() {
    this.staffAdvanceDialog.show();
  }
  // 显示‘代付费用报销’弹框
  get costsReimbursedDialog(): CostsReimbursedDialog {
    return this.$refs.costsReimbursedDialog as CostsReimbursedDialog;
  }
  private showCostsReimbursedDialog() {
    this.costsReimbursedDialog.show();
  }
  // 显示‘待报销预支款’弹框
  get advanceAccountDialog(): AdvanceAccountDialog {
    return this.$refs.advanceAccountDialog as AdvanceAccountDialog;
  }
  private showAdvanceAccountDialog() {
    this.advanceAccountDialog.show();
  }
  // 显示‘预支报销款’弹框
  get advanceReimbursementDialog(): AdvanceReimbursementDialog {
    return this.$refs.advanceReimbursementDialog as AdvanceReimbursementDialog;
  }
  private showAdvanceReimbursementDialog(id: number) {
    this.advanceReimbursementDialog.show(id);
  }
  // 显示‘预支报销款’弹框
  get transferRegisterDialog(): TransferRegisterDialog {
    return this.$refs.transferRegisterDialog as TransferRegisterDialog;
  }
  private showTransferRegisterDialog() {
    this.transferRegisterDialog.show();
  }
}
</script>

<style lang="scss" scoped>
.audit-add {
  padding: 8px;
  .audit-title-name {
    font-size: 16px;
  }
  .audit-title-count {
    font-size: 14px;
    margin-left: 5px;
  }
  ::v-deep .el-collapse-item__header {
    padding: 0 10px;
  }
  ::v-deep .el-collapse {
    border-color: transparent;
  }
  ::v-deep .el-collapse-item {
    margin-bottom: 8px;
  }
  ::v-deep .el-collapse-item__wrap {
    background-color: transparent; /*  */
    margin-top: 2px;
    border-color: transparent;
  }
  ::v-deep .el-collapse-item__content {
    padding-bottom: 0;
  }

  .list-oa-button {
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
    .oa-button {
      margin-left: 10px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
