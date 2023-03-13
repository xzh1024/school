// 状态
const statusToSubmit = 0; // 待提交
const statusToFinancialAudit = 1; // 待财务审核
const statusToWarehouseAudit = 2; // 待库房审核
const statusToFinancialAndWarehouseAudit = 3; // 待财务和库房审核
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const statusFinished = 4; // 完成

// 审核流程
const flowOnlyFinancialAudit = 1; // 仅财务审核
const flowFinancialBeforeWarehouseAudit = 3; // 先财务审核，后库房审核
const flowWarehouseBeforeFinancialAudit = 4; // 先库房审核，后财务审核
const flowFinancialAndWarehouseAudit = 5; // 财务和库房审核，不控制先后顺序

// 依赖header（data或props)，从header取盘点单单头信息
export default {
  computed: {
    canCreate() {
      return this.hasAutoPerm("create");
    },
    canRead() {
      return this.header && this.header.takingId && this.hasAutoPerm("read");
    },
    canEdit() {
      // 创建或更新
      return (
        (this.header.Status === undefined && this.hasAutoPerm("create")) ||
        (this.header.Status === statusToSubmit && this.hasAutoPerm("update"))
      );
    },
    canDelete() {
      return (
        this.header.Status === statusToSubmit && this.hasAutoPerm("delete")
      );
    },
    canSubmit() {
      return (
        this.header.Status === statusToSubmit && this.hasAutoPerm("commit")
      );
    },
    canRevoke() {
      return (
        (((this.header.workFlow === flowOnlyFinancialAudit ||
          this.header.workFlow === flowFinancialBeforeWarehouseAudit) &&
          this.header.Status === statusToFinancialAudit) ||
          (this.header.workFlow === flowWarehouseBeforeFinancialAudit &&
            this.header.Status === statusToWarehouseAudit) ||
          (this.header.workFlow === flowFinancialAndWarehouseAudit &&
            this.header.Status === statusToFinancialAndWarehouseAudit)) &&
        this.hasAutoPerm("revoke")
      );
    },
    canExport() {
      return this.header.takingId > 0 && this.hasAutoPerm("export");
    },
    canPrint() {
      return this.header.takingId > 0 && this.hasAutoPerm("print");
    },
    canFinancialAudit() {
      return (
        (this.header.Status === statusToFinancialAudit ||
          this.header.Status === statusToFinancialAndWarehouseAudit) &&
        this.hasAutoPerm("financialAudit")
      );
    },
    canWarehouseAudit() {
      return (
        (this.header.Status === statusToWarehouseAudit ||
          this.header.Status === statusToFinancialAndWarehouseAudit) &&
        this.hasAutoPerm("warehouseAudit")
      );
    }
  }
};
