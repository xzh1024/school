// 列表页、详情页的公共操作
import * as stocktakingAPI from "@/api/store/stocktaking";
import { openNewWindow } from "@/utils/tool";

import CanDo from "./CanDo";

export default {
  mixins: [CanDo],
  methods: {
    doSubmit() {
      if (this.canSubmit) {
        return this.doOperation("Submit", "提交");
      }
    },
    doRevoke() {
      if (this.canRevoke) {
        this.doOperation("Revoke", "撤回");
      }
    },
    doDelete() {
      if (this.canDelete) {
        this.doOperation("Delete", "删除");
      }
    },
    doWarehouseAudit() {
      if (this.canWarehouseAudit) {
        this.doOperation("WarehouseAudit", "库房审核");
      }
    },
    doFinancialAudit() {
      if (this.canFinancialAudit) {
        this.doOperation("FinancialAudit", "财务审核");
      }
    },
    doPrint() {
      if (!this.canPrint) return;
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Store/Take/" + this.header.takingId
        }).href,
        "print"
      );
    },

    // 提交、撤回、删除、库房审核、财务审核
    doOperation(type, message) {
      if (!this["can" + type]) return;

      if (["Submit", "Revoke"].includes(type)) {
        return stocktakingAPI[`stocktaking${type}`]({
          takingId: this.header.takingId
        }).then(() => {
          this.$message({
            type: "success",
            message: `${message}成功！`,
            showClose: true
          });
          this.refreshPage(type);
        });
      } else {
        this.$confirm(`您确定要${message}此单据么？`, "提示", {
          type: "warning"
        }).then(() => {
          return stocktakingAPI[`stocktaking${type}`]({
            takingId: this.header.takingId
          }).then(() => {
            this.$message({
              type: "success",
              message: `${message}成功！`,
              showClose: true
            });
            this.refreshPage(type);
          });
        });
      }
    }
  }
};
