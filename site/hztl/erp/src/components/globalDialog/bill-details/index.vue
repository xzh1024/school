<template>
  <Fragment>
    <purchase-detail-dialog :visible.sync="billVisibles.CD" :bill-id="billId" />
    <purchase-receive-dialog
      :visible.sync="billVisibles.CG"
      :bill-id="billId"
    />
    <purchase-return-dialog :visible.sync="billVisibles.CT" :bill-id="billId" />
    <purchase-urgent-dialog :visible.sync="billVisibles.JJ" :bill-id="billId" />

    <sales-detail-dialog :visible.sync="billVisibles.XD" :bill-id="billId" />
    <sales-out-dialog :visible.sync="billVisibles.XS" :bill-id="billId" />
    <sales-out-dialog :visible.sync="billVisibles.YJXS" :bill-id="billId" />
    <sales-return-dialog :visible.sync="billVisibles.XT" :bill-id="billId" />
    <sales-return-dialog :visible.sync="billVisibles.YJXT" :bill-id="billId" />

    <storage-out-dialog :visible.sync="billVisibles.CK" :bill-id="billId" />
    <storage-enter-dialog :visible.sync="billVisibles.RK" :bill-id="billId" />

    <FeesReimbursement :visible.sync="billVisibles.BX" :bill-id="billId" />

    <transfer-apply-dialog :visible.sync="billVisibles.QD" :bill-id="billId" />
    <transfer-stockin-dialog
      :visible.sync="billVisibles.RD"
      :bill-id="billId"
    />
    <transfer-stockin-return-dialog
      :visible.sync="billVisibles.RT"
      :bill-id="billId"
    />
    <transfer-stockout-dialog
      :visible.sync="billVisibles.KD"
      :bill-id="billId"
    />
    <transfer-stockout-return-dialog
      :visible.sync="billVisibles.KT"
      :bill-id="billId"
    />

    <handle-goods-rigister-dialog
      :visible.sync="rigisterVisible"
      :register-id="registerId"
    />
  </Fragment>
</template>

<script>
import eventBus from "@/event";
import { businessBillTypeList } from "@/utils/businessBillType";
import { Fragment } from "vue-fragment";

import PurchaseDetailDialog from "./purchase-detail";
import PurchaseReceiveDialog from "./purchase-receive";
import PurchaseReturnDialog from "./purchase-return";
import PurchaseUrgentDialog from "./purchase-urgent";
import SalesDetailDialog from "./sales-detail";
import SalesOutDialog from "./sales-out";
import SalesReturnDialog from "./sales-return";
import FeesReimbursement from "./FeesReimbursement.vue";
import HandleGoodsRigisterDialog from "./handle-goods-rigister";
import StorageOutDialog from "./storage-out";
import StorageEnterDialog from "./storage-enter";

import TransferApplyDialog from "./transfer/TransferApply";
import TransferStockinDialog from "./transfer/TransferStockin";
import TransferStockinReturnDialog from "./transfer/TransferStockinReturn";
import TransferStockoutDialog from "./transfer/TransferStockout";
import TransferStockoutReturnDialog from "./transfer/TransferStockoutReturn";

export default {
  name: "BillDetails",
  components: {
    Fragment,
    PurchaseDetailDialog,
    PurchaseReceiveDialog,
    PurchaseReturnDialog,
    PurchaseUrgentDialog,
    SalesDetailDialog,
    SalesOutDialog,
    SalesReturnDialog,
    HandleGoodsRigisterDialog,
    FeesReimbursement,
    StorageOutDialog,
    StorageEnterDialog,
    TransferApplyDialog,
    TransferStockinDialog,
    TransferStockinReturnDialog,
    TransferStockoutDialog,
    TransferStockoutReturnDialog
  },
  data() {
    // BX暂时不加入普通列表
    const billVisibles = {
      BX: false
    };
    businessBillTypeList.forEach(billType => {
      billVisibles[billType] = false;
    });
    return {
      billVisibles: {
        ...billVisibles
      },
      billId: 0,
      registerId: 0,
      rigisterVisible: false
    };
  },
  beforeMount() {
    eventBus.$on("showBillDetail", this.handleShowBillDetail);
    eventBus.$on("showFreightNoBillDetail", this.handleshowFreightNoBillDetail);
  },
  destroyed() {
    eventBus.$off("showBillDetail", this.handleShowBillDetail);
  },
  methods: {
    handleShowBillDetail(data) {
      this.billVisibles[data.billType] = true;
      businessBillTypeList.forEach(billType => {
        this.billVisibles[billType] = billType === data.billType;
      });
      this.billId = data.billId;
    },
    handleshowFreightNoBillDetail(data) {
      this.registerId = data.registerId;
      this.rigisterVisible = true;
    }
  }
};
</script>
