import {
  workBenchMenuTableList,
  workBenchMenuTabsCount
} from "@/api/workbench";
import baseIndexJump from "@/utils/baseIndexJump";
import { uniqBy } from "lodash";

const sceneToRoutePath = {
  "franchisee.apply.reviewing": "Franchiser",
  "franchisee.quit.reviewing": "Franchiser",
  "basic.staff.reviewing": "Staffs",

  "purchase.order.submitted": "PurchaseBilling",
  "purchase.order_audit.refused": "PurchaseBilling",
  "purchase.order_audit.to_arrival": "PurchaseBilling",
  "purchase.arrival.submitting": "PurchaseReceiveBilling",
  "purchase.urgent.confirming": "PurchaseDispatch",
  "purchase.urgent.to_arrival": "PurchaseDispatch",
  "purchase.urgent.submitting": "PurchaseDispatch",
  "purchase.urgent.receiving": "PurchaseDispatch",

  "sale.order.submitted": "SalesBilling",
  "sale.order_audit.refused": "SalesBilling",
  "sale.order.finished": "SalesBilling",
  "sale.order.transferring": "SalesBilling",
  "sale.sale_detail.rejected": "SalesOutBilling",
  "sale.sale.submitting": "SalesOutBilling",

  "storage.stocktaking.warehouse_reviewing": "StocktakingBill",
  "storage.stocktaking.finance_reviewing": "StocktakingBill",
  "storage.stocktaking.reviewing": "StocktakingBill",
  "storage.stockmoving.reviewing": "StockMovingBill",

  "logistics.deliver.shipment_register": "LogisticsRegister",
  "logistics.receive.receive_register": "LogisticsRegister",

  "finance.settle_center.cash.pay": "SettleCenter",
  "finance.settle_center.cash.receive": "SettleCenter",
  "finance.settle_center.charge.sale": "SettleCenter",
  "finance.settle_center.charge.purchase": "SettleCenter",
  "finance.settle_center.collect.sale": "SettleCenter",
  "finance.settle_center.collect.purchase": "SettleCenter",
  "finance.settle_center.alloc_charge.out": "SettleCenter",
  "finance.settle_center.alloc_charge.in": "SettleCenter",

  "finance.statement.allocation.audit": "TransferStatement",
  "finance.statement.allocation.refuse": "TransferStatement",
  "finance.statement.rb.to_submit": "PaymentStatement",
  "finance.statement.lb.to_submit": "CollectionStatement",

  "platform.purchase_order.paying": "",
  "platform.purchase_order.transferring": "PurchaseBilling",
  "platform.sale_order.auditing": "SalesBilling",
  "platform.sale_order.transferring": "SalesBilling",

  "allocation.apply.auditing": "transfer/applyDetailAudit",
  "allocation.apply.returned": "transfer/applyDetail",
  "allocation.apply.to_out": "transfer/applyDetailAudit",
  "allocation.in.to_submit": "transfer/storageDetail",
  "allocation.in.auditing": "transfer/storageDetail",
  "allocation.out.to_submit": "transfer/outDetail",
  "allocation.out.returned": "transfer/outDetail",
  "allocation.in_return.returned": "transfer/stockinReturnDetail",
  "allocation.out_return.to_submit": "transfer/stockoutReturnDetail",
  "allocation.out_return.auditing": "transfer/stockoutReturnDetail",

  "repair.bill.to_offer_confirm": "WorkOrder",
  "repair.bill.to_settle_confirm": "WorkOrder",
  "repair.bill.to_settle": "WorkOrder"
};

const parameterName = {
  "franchisee.apply.reviewing": "MainStore",
  "franchisee.quit.reviewing": "MainStore",
  "basic.staff.reviewing": "Pending",

  "purchase.order.submitted": "orderId",
  "purchase.order_audit.refused": "orderId",
  "purchase.order_audit.to_arrival": "orderId",
  "purchase.arrival.submitting": "billId",
  "purchase.urgent.confirming": "ConfirmList",
  "purchase.urgent.to_arrival": "PendingList",
  "purchase.urgent.submitting": "Settlement",
  "purchase.urgent.receiving": "Settlement",

  "sale.order.submitted": "billId",
  "sale.order_audit.refused": "billId",
  "sale.order.finished": "billId",
  "sale.order.transferring": "billId",
  "sale.sale_detail.rejected": "billId",
  "sale.sale.submitting": "billId",

  "storage.stocktaking.warehouse_reviewing": "takingId",
  "storage.stocktaking.finance_reviewing": "takingId",
  "storage.stocktaking.reviewing": "takingId",
  "storage.stockmoving.reviewing": "movingId",

  "logistics.deliver.shipment_register": "DeliverTab",
  "logistics.deliver.logistics_register": "DeliverTab",
  "logistics.receive.receive_register": "ReceiveTab",
  "logistics.receive.logistics_register": "ReceiveTab",

  "finance.settle_center.cash.receive": "SettleCenter",
  "finance.settle_center.cash.pay": "SettleCenter",
  "finance.settle_center.charge.sale": "SettleCenter",
  "finance.settle_center.charge.purchase": "SettleCenter",
  "finance.settle_center.collect.sale": "SettleCenter",
  "finance.settle_center.collect.purchase": "SettleCenter",
  "finance.settle_center.alloc_charge.out": "SettleCenter",
  "finance.settle_center.alloc_charge.in": "SettleCenter",

  "finance.statement.allocation.audit": "Statement",
  "finance.statement.allocation.refuse": "Statement",
  "finance.statement.rb.to_submit": "Statement",
  "finance.statement.lb.to_submit": "Statement",

  "platform.purchase_order.transferring": "orderId",
  "platform.sale_order.auditing": "billId",
  "platform.sale_order.transferring": "billId",

  "allocation.apply.auditing": "billId",
  "allocation.apply.returned": "billId",
  "allocation.apply.to_out": "billId",
  "allocation.in.to_submit": "billId",
  "allocation.in.auditing": "billId",
  "allocation.out.to_submit": "billId",
  "allocation.out.returned": "billId",
  "allocation.in_return.returned": "billId",
  "allocation.out_return.to_submit": "billId",
  "allocation.out_return.auditing": "billId",

  "repair.bill.to_offer_confirm": "billNo",
  "repair.bill.to_settle_confirm": "billNo",
  "repair.bill.to_settle": "billNo"
};

const parameterChildName = {
  "franchisee.apply.reviewing": "AuditFranchiser",
  "franchisee.quit.reviewing": "AuditFranchiser",

  "purchase.urgent.confirming": "Sale",

  "logistics.deliver.shipment_register": "ToBeHandle",
  "logistics.deliver.logistics_register": "Logistics",
  "logistics.receive.receive_register": "ToBeHandle",
  "logistics.receive.logistics_register": "Logistics",

  "finance.settle_center.cash.receive": "pay",
  "finance.settle_center.cash.pay": "pay",
  "finance.settle_center.charge.sale": "charge",
  "finance.settle_center.charge.purchase": "charge",
  "finance.settle_center.collect.sale": "collect",
  "finance.settle_center.collect.purchase": "collect",
  "finance.settle_center.alloc_charge.out": "transfer",
  "finance.settle_center.alloc_charge.in": "transfer"
};

const parameterGrandChildName = {
  "finance.settle_center.cash.receive": "0",
  "finance.settle_center.cash.pay": "1",
  "finance.settle_center.charge.sale": "0",
  "finance.settle_center.charge.purchase": "1",
  "finance.settle_center.collect.sale": "0",
  "finance.settle_center.collect.purchase": "1",
  "finance.settle_center.alloc_charge.out": "0",
  "finance.settle_center.alloc_charge.in": "1"
};

export default {
  data() {
    return {
      noticeLoading: false,
      noticeList: [],
      curPage: 1,
      pageSize: 10,
      hasNext: false,
      noticetTotal: 0,
      isHasNotice: true
    };
  },
  methods: {
    goRouteFromNotice(notice) {
      if (notice.scene === "platform.purchase_order.paying") {
        window.open(notice.target, "platform");
      } else {
        let query = { time: `${new Date().getTime()}` };
        const toRouter = sceneToRoutePath[notice.scene];
        if (notice.target) {
          switch (toRouter) {
            case "Franchiser":
              baseIndexJump.setInfo("auditFranchiser", notice.target);
              query = {
                tabName: parameterName[notice.scene],
                childTabName: parameterChildName[notice.scene],
                ...query
              };
              break;
            case "Staffs":
              baseIndexJump.setInfo("auditStaff", notice.target);
              query = {
                tabName: parameterName[notice.scene],
                ...query
              };
              break;
            case "PurchaseDispatch":
              if (parameterName[notice.scene] === "ConfirmList") {
                baseIndexJump.setInfo("confirmPurchaseDispatch", notice.target);
              } else if (parameterName[notice.scene] === "PendingList") {
                baseIndexJump.setInfo("handlePurchaseDispatch", notice.target);
              } else if (parameterName[notice.scene] === "Settlement") {
                baseIndexJump.setInfo(
                  "submitOrReceivePurchaseDispatch",
                  notice.target
                );
              }
              query = {
                tabName: parameterName[notice.scene],
                childTabName: parameterChildName[notice.scene]
                  ? parameterChildName[notice.scene]
                  : undefined,
                ...query
              };
              break;
            case "LogisticsRegister":
              if (parameterChildName[notice.scene] === "ToBeHandle") {
                baseIndexJump.setInfo(
                  "logisticsRegisterToBeHandle",
                  notice.target
                );
              } else if (parameterChildName[notice.scene] === "Logistics") {
                baseIndexJump.setInfo(
                  "logisticsRegisterConfirmOrSignFor",
                  notice.target
                );
              }
              query = {
                tabName: parameterName[notice.scene],
                childTabName: parameterChildName[notice.scene],
                ...query
              };
              break;
            case "SettleCenter":
              baseIndexJump.setInfo("settle", notice.target);
              query = {
                tabName: parameterName[notice.scene],
                childTabName: parameterChildName[notice.scene],
                grandChildTabName: parameterGrandChildName[notice.scene],
                ...query
              };
              break;
            case "TransferStatement":
              baseIndexJump.setInfo("transferStatement", notice.target);
              query = {
                tabName: parameterName[notice.scene],
                ...query
              };
              break;
            case "PaymentStatement":
              baseIndexJump.setInfo("paymentStatement", notice.target);
              query = {
                tabName: parameterName[notice.scene],
                ...query
              };
              break;
            case "CollectionStatement":
              baseIndexJump.setInfo("collectionStatement", notice.target);
              query = {
                tabName: parameterName[notice.scene],
                ...query
              };
              break;
            case "SalesOutBilling":
              query = {
                [parameterName[notice.scene]]: notice.target,
                ...query,
                list: true
              };
              break;
            default:
              query = {
                [parameterName[notice.scene]]: notice.target,
                ...query
              };
              break;
          }
        }
        this.$router.push({ path: `/${toRouter}`, query });
      }
    },
    loadFirstPageNotices(isNotice) {
      this.curPage = 1;
      this.noticeList = [];
      this.loadNoticesNumber(isNotice);
      this.loadNotices(isNotice);
    },
    loadNoticesNumber(isNotice) {
      workBenchMenuTabsCount()
        .then(res => {
          this.noticetTotal = isNotice ? res.notification : res.toDo;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    loadNotices(isNotice) {
      this.noticeLoading = true;
      workBenchMenuTableList({
        type: isNotice ? "notification" : "toDo",
        page: this.curPage,
        pageSize: this.pageSize
      })
        .then(res => {
          this.isHasNotice = res && res.rows && res.rows.length;
          this.noticeLoading = false;
          this.noticeList = uniqBy([...this.noticeList, ...res.rows], "id");
          this.hasNext = this.curPage < res.totalPage;
          const firstNotice = this.noticeList[0];
          const lastNoticeTime = localStorage.getItem("lastNoticeTime") || 0;
          if (
            firstNotice &&
            new Date(firstNotice.createdAt) > new Date(lastNoticeTime)
          ) {
            localStorage.setItem("lastNoticeTime", firstNotice.createdAt);
            const platformNotice = this.noticeList.find(item =>
              [
                "platform.purchase_order.paying",
                "platform.purchase_order.transferring",
                "platform.sale_order.auditing",
                "platform.sale_order.transferring"
              ].includes(item.scene)
            );
            if (
              platformNotice &&
              new Date(platformNotice.createdAt) > new Date(lastNoticeTime)
            ) {
              const audio = new Audio("/notice-prompt.mp3");
              audio.play();
            }
          }
        })
        .catch(() => {
          this.noticeLoading = false;
        });
    },
    loadNextPage(isNotice) {
      if (this.hasNext && !this.noticeLoading) {
        this.curPage++;
        this.loadNotices(isNotice);
      }
    }
  }
};
