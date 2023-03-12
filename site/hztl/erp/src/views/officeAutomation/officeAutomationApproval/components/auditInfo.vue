<template>
  <ht-card
    :loading="loading"
    title="审批处理"
    no-padding
    class="container-body"
  >
    <template v-if="infoId">
      <div class="audit-main">
        <div class="oa-row">
          <div class="oa-label">审批单号</div>
          <div class="oa-content oa-orange">
            {{ infoData.billNo }}
            <span v-if="infoData.status"
              >({{ APPROVAL_STATUS_NAME[infoData.status] }})</span
            >
          </div>
        </div>
        <div class="oa-row">
          <div class="oa-label">申请人/日期</div>
          <div class="oa-content">
            {{ infoData.applicantName }}
            <span v-if="infoData.applyDate"> ({{ infoData.applyDate }}) </span>
          </div>
        </div>
        <div class="oa-row">
          <div class="oa-label">申请人分公司</div>
          <div class="oa-content">{{ infoData.createdByCompanyName }}</div>
        </div>
        <div class="oa-row">
          <div class="oa-label">业务分公司</div>
          <div class="oa-content">{{ infoData.companyName }}</div>
        </div>
        <!-- <div
          class="oa-row"
          v-if="['OAYS', 'OAYF', 'OATS', 'OATF'].includes(infoData.billType)"
        >
          <div class="oa-label">资金类型</div>
          <div class="oa-content"></div>
        </div> -->
        <div
          class="oa-row"
          v-if="['OAYS', 'OAYF', 'OATS', 'OATF'].includes(infoData.billType)"
        >
          <div class="oa-label">往来单位</div>
          <div class="oa-content">
            {{ infoData.cooperatorName }}
          </div>
        </div>
        <!-- <div class="oa-row" v-if="infoData.billType === 'YBX'">
          <div class="oa-label">预支单信息</div>
          <div class="oa-content"></div>
        </div> -->
        <div
          class="oa-row"
          v-if="['YZ', 'YBX', 'BX'].includes(infoData.billType)"
        >
          <div class="oa-label">收支类目</div>
          <div class="oa-content oa-blue">
            {{ infoData.fundCategoryName }}
          </div>
        </div>
        <div class="oa-row" v-if="['OAAS', 'OAAF'].includes(infoData.billType)">
          <div class="oa-label">业务员</div>
          <div class="oa-content">
            {{ infoData.businessManName }}
          </div>
        </div>
        <!-- <div class="oa-row" v-if="['OAAS', 'OAAF'].includes(infoData.billType)">
          <div class="oa-label">收付标识</div>
          <div class="oa-content"></div>
        </div> -->
        <div class="oa-row" v-if="['OAAS', 'OAAF'].includes(infoData.billType)">
          <div class="oa-label">往来分公司</div>
          <div class="oa-content">
            {{ infoData.relatedCompanyName }}
          </div>
        </div>
        <!-- <div class="oa-row" v-if="['OAAS', 'OAAF'].includes(infoData.billType)">
          <div class="oa-label">业务日期</div>
          <div class="oa-content"></div>
        </div> -->
        <div class="oa-row">
          <div class="oa-label">申请金额</div>
          <div class="oa-content oa-blue">{{ infoData.applyAmount }}</div>
        </div>
        <div
          class="oa-row"
          v-if="
            ['OAYS', 'OAYF', 'OATS', 'OATF', 'YZ', 'YBX', 'BX'].includes(
              infoData.billType
            )
          "
        >
          <div class="oa-label">备注</div>
          <div class="oa-content">{{ infoData.remark }}</div>
        </div>
        <div class="oa-row">
          <div class="oa-label">审核人/时间</div>
          <div class="oa-content">
            {{ infoData.approvedByName }}
            <span v-if="infoData.approvedAt">
              ({{ dateFormatToSecond(infoData.approvedAt) }})
            </span>
          </div>
        </div>
        <div class="oa-row">
          <div class="oa-label">审核人分公司</div>
          <div class="oa-content">{{ infoData.approvedByCompanyName }}</div>
        </div>
        <div class="oa-row">
          <div class="oa-label">驳回原因</div>
          <div class="oa-content">{{ infoData.reason || "" }}</div>
        </div>
        <template
          v-if="
            ['OAYS', 'OAYF', 'OATS', 'OATF', 'YZ', 'YBX', 'BX'].includes(
              infoData.billType
            )
          "
        >
          <div class="oa-row">
            <div class="oa-label">支付方式</div>
            <div class="oa-content">
              {{ infoData.accountInfo && infoData.accountInfo.paymentType }}
            </div>
          </div>
          <div class="oa-row">
            <div class="oa-label">支付银行</div>
            <div class="oa-content">
              {{ infoData.accountInfo && infoData.accountInfo.bank }}
            </div>
          </div>
          <div class="oa-row">
            <div class="oa-label">银行账户</div>
            <div class="oa-content">
              {{ infoData.accountInfo && infoData.accountInfo.bankAccount }}
            </div>
          </div>
          <div class="oa-row">
            <div class="oa-label">联系人/联系电话</div>
            <div class="oa-content" v-if="infoData.accountInfo">
              {{ infoData.accountInfo.contact }}
              <span v-if="infoData.accountInfo.phone">
                ({{ infoData.accountInfo.phone }})
              </span>
            </div>
          </div>
        </template>

        <div>
          <div
            class="img-label"
            v-show="infoData.voucherImages && infoData.voucherImages.length"
          >
            凭证信息（点击查看大图）
          </div>
          <img
            class="img-item"
            v-for="(item, index) in infoData.voucherImages"
            :key="index"
            :src="item"
            @click="showImgDialog(item)"
          />
        </div>
      </div>
      <div
        class="audit-bottom"
        v-show="isToProcess && infoData.status === 'toAudit'"
      >
        <el-button
          type="primary"
          size="mini"
          :disabled="!isApprove"
          @click="passApproved"
        >
          通过（F3）
        </el-button>
        <el-button
          type="primary"
          size="mini"
          plain
          :disabled="!isApprove"
          @click="showAuditRejectDialog"
        >
          拒绝（F4）
        </el-button>
      </div>
      <div class="audit-bottom" v-show="isInitiated && resubmitVisible">
        <el-button
          type="primary"
          size="mini"
          :disabled="!isCreate"
          @click="resubmitApproved"
        >
          重新提交（F2）
        </el-button>
      </div>
      <div class="audit-bottom" v-show="isInitiated && cancelApprovedVisible">
        <el-button
          type="primary"
          size="mini"
          :disabled="!isCancel"
          @click="cancelApproved"
        >
          取消审批（F9）
        </el-button>
      </div>
    </template>
    <div class="no-data" v-else>
      暂无数据
    </div>

    <AuditRejectDialog
      ref="auditRejectDialog"
      @update="update"
    ></AuditRejectDialog>

    <el-dialog
      :visible.sync="imgPreviewVisible"
      append-to-body
      :show-close="false"
      class="ht-light-box"
      @close="imgPreviewClose"
    >
      <img v-show="imgPreviewUrl" :src="imgPreviewUrl" alt="正在加载..." />
    </el-dialog>

    <!-- 预收/付款 -->
    <PaymentReceivedDialog
      ref="paymentReceivedDialog"
      :paymentTypeOptions="paymentTypeOptions"
      @update="update"
    ></PaymentReceivedDialog>
    <!-- 退预收/付款 -->
    <RefundPaymentReceivedDialog
      ref="refundPaymentReceivedDialog"
      :paymentTypeOptions="paymentTypeOptions"
      @update="update"
    ></RefundPaymentReceivedDialog>
    <!-- 员工预支款 -->
    <StaffAdvanceDialog
      ref="staffAdvanceDialog"
      :paymentTypeOptions="paymentTypeOptions"
      @update="update"
    ></StaffAdvanceDialog>
    <!-- 代付费用报销 -->
    <CostsReimbursedDialog
      ref="costsReimbursedDialog"
      :paymentTypeOptions="paymentTypeOptions"
      @update="update"
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
      @update="update"
      @showAdvanceAccountDialog="showAdvanceAccountDialog"
    ></AdvanceReimbursementDialog>
    <!-- 调拨对账补充登记 -->
    <TransferRegisterDialog ref="transferRegisterDialog" @update="update">
    </TransferRegisterDialog>
  </ht-card>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Emit, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cloneDeep } from "lodash";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import AuditRejectDialog from "./auditRejectDialog.vue";
import {
  QUERY_TYPE,
  BILL_TYPE,
  APPROVAL_STATUS,
  APPROVAL_STATUS_NAME
} from "../constant";
import {
  TagModel,
  FeeApplicationInfoModel,
  ImageFileModel,
  FeeApplicationModel,
  ApprovalParams
} from "../constant/interfaces";
import { OfficeAutomationService } from "../constant/services";
const officeAutomationService = new OfficeAutomationService();
import PaymentReceivedDialog from "../oaAdd/components/paymentReceivedDialog.vue";
import RefundPaymentReceivedDialog from "../oaAdd/components/refundPaymentReceivedDialog.vue";
import StaffAdvanceDialog from "../oaAdd/components/staffAdvanceDialog.vue";
import CostsReimbursedDialog from "../oaAdd/components/costsReimbursedDialog.vue";
import AdvanceAccountDialog from "../oaAdd/components/advanceAccountDialog.vue";
import AdvanceReimbursementDialog from "../oaAdd/components/advanceReimbursementDialog.vue";
import TransferRegisterDialog from "../oaAdd/components/transferRegisterDialog.vue";
const dictionary = namespace("baseData/dictionary");
import { dateFormatToSecond } from "@/utils/date";

@Component({
  name: "AuditInfo",
  components: {
    AuditRejectDialog,
    PaymentReceivedDialog,
    RefundPaymentReceivedDialog,
    StaffAdvanceDialog,
    CostsReimbursedDialog,
    AdvanceAccountDialog,
    AdvanceReimbursementDialog,
    TransferRegisterDialog
  }
})
export default class AuditInfo extends Mixins(HotkeyMixin) {
  @Prop() readonly type!: string; // 待处理：toProcess、已发起：initiated、审批查询：approvalQuery
  @Prop() protected rowData!: FeeApplicationModel;
  @Emit() protected update() {
    return;
  }

  get infoId(): number {
    let id = 0;
    if (this.rowData && this.rowData.id) {
      id = this.rowData.id;
    }
    return id;
  }

  get isToProcess(): boolean {
    return this.type === QUERY_TYPE.toProcess;
  }
  get isInitiated(): boolean {
    return this.type === QUERY_TYPE.initiated;
  }

  // 重新提交的判断
  get resubmitVisible(): boolean {
    let visible = false;
    if (["OAAS", "OAAF"].includes(this.infoData.billType)) {
      visible = ["otherRejected", "cancelled"].includes(this.infoData.status);
    } else {
      visible = ["rejected", "cancelled"].includes(this.infoData.status);
    }
    return visible;
  }
  // 取消审批的判断
  get cancelApprovedVisible(): boolean {
    let visible = false;
    if (["OAAS", "OAAF"].includes(this.infoData.billType)) {
      visible = this.infoData.status === APPROVAL_STATUS.otherToAudit;
    } else {
      visible = this.infoData.status === APPROVAL_STATUS.toAudit;
    }
    return visible;
  }

  dateFormatToSecond = dateFormatToSecond;

  @Watch("rowData", { deep: true })
  async getFeeApplicationInfo(value: FeeApplicationModel) {
    this.infoData = {} as FeeApplicationInfoModel;
    if (value && value.id) {
      this.loading = true;
      const data = await officeAutomationService.getFeeApplicationInfo(
        value.id
      );
      this.infoData = data;
      this.loading = false;
    }
  }

  // 创建权限
  get isCreate(): boolean {
    return !!(this.infoData.actions && this.infoData.actions.create);
  }
  // 取消权限
  get isCancel(): boolean {
    return !!(this.infoData.actions && this.infoData.actions.cancel);
  }
  // 审批权限
  get isApprove(): boolean {
    return !!(this.infoData.actions && this.infoData.actions.approve);
  }

  // 获取支付方式选项
  private paymentTypeOptions: TagModel[] = [];

  @dictionary.State("enhancedSettlementTypeList")
  private enhancedSettlementTypeList!: TagModel[];

  @Watch("enhancedSettlementTypeList", { immediate: true })
  private onEnhancedSettlementTypeList(list: TagModel[]) {
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

  private infoData = {} as FeeApplicationInfoModel;
  private loading = false;
  // protected auditRejectDialogVisible = false;
  protected APPROVAL_STATUS_NAME = APPROVAL_STATUS_NAME;

  get auditRejectDialog(): AuditRejectDialog {
    return this.$refs.auditRejectDialog as AuditRejectDialog;
  }
  // '预收/付款'弹框
  get paymentReceivedDialog(): PaymentReceivedDialog {
    return this.$refs.paymentReceivedDialog as PaymentReceivedDialog;
  }
  // '退预收/付款'弹框
  get refundPaymentReceivedDialog(): RefundPaymentReceivedDialog {
    return this.$refs
      .refundPaymentReceivedDialog as RefundPaymentReceivedDialog;
  }
  // 显示‘员工预支款’弹框
  get staffAdvanceDialog(): StaffAdvanceDialog {
    return this.$refs.staffAdvanceDialog as StaffAdvanceDialog;
  }
  // 显示‘待报销预支款’弹框
  get advanceAccountDialog(): AdvanceAccountDialog {
    return this.$refs.advanceAccountDialog as AdvanceAccountDialog;
  }
  private showAdvanceAccountDialog() {
    this.advanceAccountDialog.show();
  }
  // 显示‘代付费用报销’弹框
  get costsReimbursedDialog(): CostsReimbursedDialog {
    return this.$refs.costsReimbursedDialog as CostsReimbursedDialog;
  }
  // 显示‘调拨对账补充登记’弹框
  get transferRegisterDialog(): TransferRegisterDialog {
    return this.$refs.transferRegisterDialog as TransferRegisterDialog;
  }

  private advanceReimbursementModel = {} as FeeApplicationInfoModel;
  // 显示‘预支报销款’弹框
  get advanceReimbursementDialog(): AdvanceReimbursementDialog {
    return this.$refs.advanceReimbursementDialog as AdvanceReimbursementDialog;
  }
  private showAdvanceReimbursementDialog(id: number, isEdit = false) {
    this.advanceReimbursementDialog.show(id, isEdit);
  }

  private showAuditRejectDialog() {
    this.auditRejectDialog.show({
      id: this.infoData.id,
      billType: this.infoData.billType
    });
  }

  protected imgFileList: ImageFileModel[] = [];

  protected imgPreviewVisible = false;
  protected imgPreviewUrl = "";
  protected showImgDialog(url: string) {
    this.imgPreviewUrl = url;
    this.imgPreviewVisible = true;
  }
  protected imgPreviewClose() {
    this.imgPreviewUrl = "";
  }

  protected agreeFeeApplications() {
    const { id, billType } = this.infoData;
    const params = {
      id,
      billType
    } as ApprovalParams;
    officeAutomationService.agreeFeeApplications(params).then(() => {
      this.$message.success("通过审批成功");
      this.update();
    });
  }
  protected cancelFeeApplications() {
    const { id, billType } = this.infoData;
    const params = {
      id,
      billType
    } as ApprovalParams;
    officeAutomationService.cancelFeeApplications(params).then(() => {
      this.$message.success("取消审批成功");
      this.update();
    });
  }

  // 通过审批
  protected passApproved() {
    this.$confirm("是否通过审批?", "提示", {
      type: "warning"
    })
      .then(() => {
        this.agreeFeeApplications();
      })
      .catch(() => {});
  }
  // 取消审批
  protected cancelApproved() {
    this.$confirm("是否取消审批?", "提示", {
      type: "warning"
    })
      .then(() => {
        this.cancelFeeApplications();
      })
      .catch(() => {});
  }

  // 重新提交
  protected resubmitApproved() {
    if (!this.infoData.id) return;
    switch (BILL_TYPE[this.infoData.billType]) {
      case BILL_TYPE.OAYS:
      case BILL_TYPE.OAYF:
        this.paymentReceivedDialog.show(cloneDeep(this.infoData));
        break;
      case BILL_TYPE.OATS:
      case BILL_TYPE.OATF:
        this.refundPaymentReceivedDialog.show(cloneDeep(this.infoData));
        break;
      case BILL_TYPE.YZ:
        this.staffAdvanceDialog.show(cloneDeep(this.infoData));
        break;
      case BILL_TYPE.YBX:
        this.showAdvanceReimbursementDialog(this.infoData.id, true);
        break;
      case BILL_TYPE.BX:
        this.costsReimbursedDialog.show(cloneDeep(this.infoData));
        break;
      case BILL_TYPE.OAAS:
      case BILL_TYPE.OAAF:
        this.transferRegisterDialog.show(cloneDeep(this.infoData));
        break;
      default:
        break;
    }
  }
}
</script>

<style lang="scss" scoped>
.cut {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.oa-orange {
  color: #fb7c31;
}
.oa-blue {
  color: #3d7bff;
}
.container-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 4px 4px;
  ::v-deep .el-card__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .no-data {
      flex: 1;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #909399;
    }
    .audit-main {
      flex: 1;
      overflow-y: auto;
      .img-label {
        margin: 16px 10px;
      }
      .img-item {
        display: inline-block;
        width: 80px;
        height: 80px;
        box-sizing: border-box;
        border: 1px solid #c0ccda;
        margin-right: 2px;
        cursor: pointer;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .audit-bottom {
      text-align: center;
      padding: 10px;
      border-top: 1px solid #e6e6e6;
    }
  }
  .oa-row {
    display: flex;
    align-items: center;
    padding: 4px 0;
    .oa-label {
      display: inline-block;
      width: 105px;
      @extend .cut;
      text-align: right;
      color: #666666;
    }
    .oa-content {
      flex: 1;
      margin-left: 20px;
      @extend .cut;
    }
  }
}
</style>
