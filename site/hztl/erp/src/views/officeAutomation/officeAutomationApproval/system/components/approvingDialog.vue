<template>
  <ht-dialog
    :visible.sync="visible"
    :title="title"
    width="440px"
    append-to-body
    v-on="$listeners"
    @close="hide"
    @closed="closed"
    v-loading="loading"
  >
    <div class="dialog-container">
      <bill-panel :billData="billPanelData" :billEnum="billEnum"></bill-panel>
      <div v-if="infoData.voucherImages && infoData.voucherImages.length">
        <div class="img-label">
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
    <div style="margin-top: 10px;" class="dialog-footer-align">
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
      <el-button size="mini" @click="hide">
        取消（Esc）
      </el-button>
    </div>

    <el-dialog
      :visible.sync="imgPreviewVisible"
      append-to-body
      :show-close="false"
      class="ht-light-box"
      @close="imgPreviewClose"
    >
      <img v-show="imgPreviewUrl" :src="imgPreviewUrl" alt="正在加载..." />
    </el-dialog>

    <AuditRejectDialog
      ref="auditRejectDialog"
      :rowData="infoData"
      @update="update"
    ></AuditRejectDialog>
  </ht-dialog>
</template>

<script lang="ts">
import { Component, Mixins, Emit } from "vue-property-decorator";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import BillPanel from "@/components/bill-panel/BillPanel";
import AuditRejectDialog from "../../components/auditRejectDialog.vue";
import { BILL_TYPE, APPROVAL_BILL_ENUM } from "../../constant";
import {
  FeeApplicationInfoModel,
  FeeApplicationModel,
  ApprovalParams
} from "../../constant/interfaces";
import { OfficeAutomationService } from "../../constant/services";
const officeAutomationService = new OfficeAutomationService();

interface BillEnumModel {
  label: string;
  value: string;
}

@Component({
  name: "ApprovingDialog",
  components: { BillPanel, AuditRejectDialog }
})
export default class ApprovingDialog extends Mixins(HotkeyMixin) {
  @Emit() protected update() {
    this.hide();
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected billPanelData: any = {};

  get billEnum(): BillEnumModel[] {
    let list = [] as BillEnumModel[];
    switch (this.infoData.billType) {
      case BILL_TYPE.OAYS:
      case BILL_TYPE.OAYF:
      case BILL_TYPE.OATS:
      case BILL_TYPE.OATF:
        list = APPROVAL_BILL_ENUM.filter(item => {
          return !["fundCategoryName", "relatedCompanyName"].includes(
            item.value
          );
        });
        break;
      case BILL_TYPE.YZ:
      case BILL_TYPE.YBX:
      case BILL_TYPE.BX:
        list = APPROVAL_BILL_ENUM.filter(item => {
          return !["cooperatorName", "relatedCompanyName"].includes(item.value);
        });
        break;
      case BILL_TYPE.OAAS:
      case BILL_TYPE.OAAF:
        list = APPROVAL_BILL_ENUM.filter(item => {
          return [
            "applyDate",
            "applyAmount",
            "relatedCompanyName",
            "remark"
          ].includes(item.value);
        });
        break;
      default:
        break;
    }
    return list;
  }

  public visible = false;

  private loading = false;

  private infoData = {} as FeeApplicationInfoModel;

  protected billData = {} as ApprovalParams;

  get title(): string {
    return `审批 - ${this.infoData.applicantName || ""}`;
  }

  // 审批权限
  get isApprove(): boolean {
    return !!(this.infoData.actions && this.infoData.actions.approve);
  }

  get auditRejectDialog(): AuditRejectDialog {
    return this.$refs.auditRejectDialog as AuditRejectDialog;
  }

  public show(row: FeeApplicationModel) {
    this.billData = {
      id: row.id,
      billType: row.billType
    };
    this.loadData(row.id);
    this.visible = true;
  }

  public hide() {
    this.visible = false;
  }

  public loadData(id: number) {
    if (id) {
      this.loading = true;
      officeAutomationService
        .getFeeApplicationInfo(id)
        .then(res => {
          this.infoData = res || {};
          this.billPanelData = {
            ...this.infoData,
            ...this.infoData.accountInfo
          };
          delete this.billPanelData.accountInfo;
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    }
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

  protected showAuditRejectDialog() {
    this.auditRejectDialog.show(this.billData);
  }

  protected imgPreviewVisible = false;
  protected imgPreviewUrl = "";
  protected showImgDialog(url: string) {
    this.imgPreviewUrl = url;
    this.imgPreviewVisible = true;
  }
  protected imgPreviewClose() {
    this.imgPreviewUrl = "";
  }

  protected closed() {
    this.infoData = {} as FeeApplicationInfoModel;
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  .el-dialog__title {
    display: inline-block;
    width: 380px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
::v-deep .el-dialog__body {
  .dialog-container {
    .oa-row {
      display: flex;
      align-items: center;
      padding: 4px 0;
      .oa-label {
        display: inline-block;
        width: 105px;
        text-align: right;
        color: #666666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .oa-content {
        flex: 1;
        margin-left: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .img-label {
      margin: 16px 10px;
      color: #303133;
    }
    .img-item {
      display: inline-block;
      width: 80px;
      height: 80px;
      box-sizing: border-box;
      border: 1px solid #c0ccda;
      margin-right: 4px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
