import { Component, Vue } from "vue-property-decorator";
import { selectCompanys } from "@/api/company/company";
import { Company, TransferBillItem, TransferBillPartItem } from "../interface";
import { TransferService } from "../services";
import { TransferBillAction } from "../interface";

export interface PrintGoodsLabel {
  companyName?: string;
  cooperatorId?: number;
  cooperatorName?: string;
  receiverName?: string;
  receiverPhone?: string;
  receiverAreaId?: number;
  receiverAreaNames?: string[];
  receiverAddress?: string;
  qty?: string;
  amount?: string;
  remark?: string;
}

export const TRANSFER_BILL_ACTION: {
  [key in TransferBillAction]: TransferBillAction;
} = {
  submit: "submit",
  revoke: "revoke",
  pass: "pass",
  return: "return",
  refuse: "refuse",
  financial: "financial"
};

@Component
export default class OperationMixin extends Vue {
  protected transferService!: TransferService;
  protected loading = false;
  // 在删除的时候需要跳转到首页
  protected page = 1;
  // 在设置仓库时适用
  protected curDetails: TransferBillPartItem[] = [];
  protected curHeader?: TransferBillItem;
  protected hasSubmit = false;
  protected editWarehouseBoxVisible = false;

  protected async refreshData() {}
  // 默认设置为空值在外部设置值
  protected get curData(): undefined | null | TransferBillItem {
    return null;
  }

  private get curActions() {
    return this.curData?.actions;
  }

  protected get createDisabled() {
    return !this.hasBelongsPerm("create");
  }

  protected get readDisabled() {
    return !this.hasBelongsPerm("read");
  }

  protected get delDisabled() {
    return !this.curActions?.delete;
  }

  protected get updateDisabled() {
    return !this.curActions?.edit;
  }

  protected get submitDisabled() {
    return !this.curActions?.submit;
  }

  protected get recallDisabled() {
    return !this.curActions?.revoke;
  }

  protected get auditDisabled() {
    return !this.curActions?.audit;
  }

  protected get settleDisabled() {
    return !this.curActions?.financial;
  }

  protected get cancelDisabled() {
    return !this.curActions?.cancel;
  }

  protected get transDisabled() {
    return !this.curActions?.trans;
  }

  protected get printDisabled() {
    return !this.curData?.canPrint;
  }

  protected get importDisabled() {
    return !!this.curActions?.import;
  }

  protected setWarehouseHandle() {
    if (this.updateDisabled) {
      return;
    }
    this.hasSubmit = false;
    this.showWarehouseEditBox();
  }

  protected async showWarehouseEditBox() {
    this.loading = true;
    const res = await this.transferService.fetchTransferBill(
      this.curData?.id || 0
    );
    this.loading = false;
    this.curDetails = res.details || [];
    this.curHeader = res.header || {};
    this.editWarehouseBoxVisible = true;
  }

  protected handleWarehouseEdit() {
    if (this.hasSubmit) {
      this.submitReq();
    } else {
      this.refreshData();
    }
  }

  protected async submitBill() {
    if (this.submitDisabled) {
      return;
    }
    if (this.curData?.hasNoWarehouse) {
      if (this.updateDisabled) {
        this.$message.warning({ message: "请设置到货仓库！", showClose: true });
      } else {
        this.hasSubmit = true;
        this.showWarehouseEditBox();
      }
      return;
    }
    return this.submitReq();
  }

  protected submitReq() {
    this.loading = true;
    return this.transferService
      .updateTransferBillStatus({
        id: this.curData!.id,
        action: TRANSFER_BILL_ACTION.submit
      })
      .then(() => {
        this.loading = false;
        this.$message.success({
          message: "提交成功!",
          showClose: true
        });
        return this.refreshData();
      })
      .catch(res => {
        this.loading = false;
        if (res.code === "to-confirm") {
          return this.$confirm("所提交订单包含金额为0配件，确认提交？", {
            type: "warning"
          }).then(() => {
            this.loading = true;
            return this.transferService
              .updateTransferBillStatus({
                id: this.curData!.id,
                action: TRANSFER_BILL_ACTION.submit,
                confirm: true
              })
              .finally(() => {
                this.loading = false;
                this.refreshData();
              });
          });
        } else {
          return Promise.reject(res);
        }
      });
  }

  protected removeBill(row?: TransferBillItem, tips?: string) {
    const removeRow = row || this.curData;
    if (!removeRow?.actions?.delete) {
      this.$message.error({
        message: "您没有权限删除该单据！",
        showClose: true
      });
      return Promise.reject();
    }
    return this.$confirm(tips || `确定删除单据 ${removeRow?.billNo} `, {
      type: "warning"
    }).then(() => {
      this.loading = true;
      return this.transferService
        .removeTransferBill(removeRow!.id)
        .then(() => {
          this.$message.success({
            message: "删除成功!"
          });
        })
        .finally(() => {
          this.loading = false;
        });
    });
  }

  protected recallBill() {
    if (this.recallDisabled) {
      return;
    }
    this.loading = true;
    return this.transferService
      .updateTransferBillStatus({
        id: this.curData!.id,
        action: TRANSFER_BILL_ACTION.revoke
      })
      .then(() => {
        this.$message.success({
          message: "撤回成功!",
          showClose: true
        });
        return this.refreshData();
      })
      .finally(() => {
        this.loading = false;
      });
  }

  protected transBill() {
    if (this.transDisabled) {
      return;
    }
    this.transferService
      .transBill(this.curData!.id)
      .then(() => {
        this.$message.success({
          message: "转单成功!",
          showClose: true
        });
        this.page = 1;
        return this.refreshData();
      })
      .finally(() => {
        this.loading = false;
      });
  }
  protected auditBill() {
    if (this.auditDisabled) {
      return;
    }
    this.$promiseDialog({
      title: "审核",
      model: {
        reason: "",
        action: TRANSFER_BILL_ACTION.pass
      },
      width: "400px",
      beforeConfirm: data => {
        if (
          [TRANSFER_BILL_ACTION.return, TRANSFER_BILL_ACTION.refuse].includes(
            data!.action
          ) &&
          !data?.reason
        ) {
          this.$message.error({
            message: "请填写驳回原因！",
            showClose: true
          });
          return false;
        }
        return true;
      },
      contentRender: data => (
        <el-form size="mini">
          <el-form-item>
            <el-radio-group v-model={data.action}>
              <el-radio label={TRANSFER_BILL_ACTION.pass}>通过</el-radio>
              <el-radio label={TRANSFER_BILL_ACTION.return}>驳回</el-radio>
              <el-radio label={TRANSFER_BILL_ACTION.refuse}>拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
          {[TRANSFER_BILL_ACTION.refuse, TRANSFER_BILL_ACTION.return].includes(
            data.action
          ) && (
            <el-form-item>
              <ht-input
                v-model={data.reason}
                rows={4}
                type="textarea"
                size="medium"
                maxlength={100}
                placeholder="请填写驳回或者拒绝原因！"
              />
            </el-form-item>
          )}
        </el-form>
      )
    })
      .then(res => {
        this.loading = true;
        return this.transferService.updateTransferBillStatus({
          id: this.curData!.id,
          ...res,
          reason:
            res.action === TRANSFER_BILL_ACTION.pass ? undefined : res.reason
        });
      })
      .then(() => {
        this.$message.success({
          message: "提交成功!",
          showClose: true
        });
        return this.refreshData();
      })
      .finally(() => {
        this.loading = false;
      });
  }

  protected relatedCompanies: Company[] = [];
  loadRelatedCompanies() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectCompanys({ type: "allocation" }).then((res: any) => {
      this.relatedCompanies = res.filter(
        (item: Company) => item.id !== this.curData?.companyId
      );
    });
  }

  protected mounted() {
    this.loadRelatedCompanies();
  }

  protected printGoodsLabelBoxVisible = false;
  protected printGoodsLabelData: PrintGoodsLabel = {};
  protected printGoodsLabelHandle() {
    if (this.printDisabled) {
      return;
    }
    this.printGoodsLabelBoxVisible = true;
  }
}
