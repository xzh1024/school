<template>
  <div class="wrap flex-container column-flex">
    <div class="btns" v-if="currentOrderInfo">
      <el-button
        type="primary"
        v-if="hasConfirmPerm"
        :disabled="orderStatus !== 'recepting' || isNeworder"
        size="small"
        @click="showQuoteDialog = true"
        >报价确认</el-button
      >
      <el-button
        type="primary"
        size="small"
        v-if="hasDeletePerm"
        :disabled="isNeworder"
        @click="deleteBills"
        >删除（F4）</el-button
      >
      <el-button
        v-if="hasInspectPerm"
        :disabled="orderStatus !== 'repairing' || isNeworder"
        type="primary"
        size="small"
        @click="inspect"
        >完检</el-button
      >
      <el-button
        v-if="hasSettleConfirmPerm"
        type="primary"
        size="small"
        :disabled="orderStatus !== 'toFinancialConfirm' || isNeworder"
        @click="showSettleCommitDialog = true"
        >结算确认</el-button
      >
      <el-button
        v-if="hasReinspect"
        :disabled="orderStatus !== 'toFinancialConfirm' || isNeworder"
        type="primary"
        size="small"
        @click="reinspect"
        >返车间</el-button
      >
      <el-button
        v-if="hasSettlePerm"
        :disabled="orderStatus !== 'toFinancial' || isNeworder"
        type="primary"
        size="small"
        style="margin-right:5px;"
        @click="deliveCar"
        >收款交车（F9）</el-button
      >
      <el-dropdown
        split-button
        v-if="hasPrintPerm"
        v-show="!isNeworder"
        @command="handleCommand"
        type="primary"
        size="small"
        style="margin-right:5px;"
        @click="print"
      >
        {{ currentBtnType }}
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in commandList"
            :command="item"
            :key="index"
            >{{ item }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        type="primary"
        size="small"
        :disabled="isNeworder"
        @click="showHistory = true"
        >维修履历</el-button
      >
      <div class="log">
        <el-checkbox
          :disabled="isNeworder"
          v-model="checked"
          @change="changeResumeSetting"
          >自动弹出维修履历</el-checkbox
        >
      </div>
    </div>
    <div class="info-group" v-if="currentOrderInfo && !isNeworder">
      <span class="item">
        <span class="item-label">车牌号:</span>
        <span class="item-value">{{
          currentOrderInfo.vehicle ? currentOrderInfo.vehicle.plateNumber : ""
        }}</span>
      </span>
      <span class="item">
        <span class="item-label">工单号:</span>
        <span class="item-value">{{ currentOrderInfo.billNo }}</span>
      </span>
      <span class="item">
        <span class="item-label">业务类型:</span>
        <span class="item-value">{{
          currentOrderInfo.businessCategoryName
        }}</span>
      </span>
      <span class="item">
        <span class="item-label">接待顾问:</span>
        <span class="item-value">{{ currentOrderInfo.receptionManName }}</span>
      </span>
      <span class="item">
        <span class="item-label">状态:</span>
        <span class="item-value">{{
          ORDER_STATUS[currentOrderInfo.status]
        }}</span>
      </span>
      <span class="info" v-if="currentOrderInfo && currentOrderInfo.flags">
        <span v-if="getStatusInfo">
          <i class="el-icon-success" style="color:#67c23a;"></i>
          <span>{{ getStatusInfo }}</span>
        </span>
      </span>
    </div>
    <div
      class="detail-wrap auto-block flex-block-bg"
      style="overFlow:hidden"
      v-if="currentOrderInfo"
    >
      <div class="header">
        <ht-tabs
          v-if="currentOrderInfo && !isNeworder"
          v-model="activeTab"
          :tabs="tabs"
          class="tabs-regular"
        />
      </div>
      <component
        ref="compo"
        :is="activeTab"
        :orderInfo="currentOrderInfo"
        :editAble="hasEditPerm"
        @updateOrder="updateOrder"
        @updateCount="getAmount"
        @addComplete="addComplete"
      />
    </div>
    <!-- 确认报价单弹窗 -->
    <QuoteDialog
      :visible="showQuoteDialog"
      :orderInfo="currentOrderInfo"
      @updateOrder="updateOrder"
      @close="showQuoteDialog = false"
    />
    <!-- 结算确认弹窗 -->
    <SettleCommitDialog
      :visible="showSettleCommitDialog"
      :orderInfo="currentOrderInfo"
      @updateOrder="updateOrder"
      @close="showSettleCommitDialog = false"
    />
    <!-- 完检无异常 -->
    <InspectSuccess
      :visible="showInsSuccessDialog"
      :orderInfo="currentOrderInfo"
      @updateOrder="updateOrder"
      @close="showInsSuccessDialog = false"
    />
    <!-- 完检有异常 -->
    <InspectFail
      :visible="showInsFailDialog"
      :orderInfo="currentOrderInfo"
      :errorsList="errorsList"
      :noNextMaintenance="noNextMaintenance"
      @updateOrder="updateOrder"
      @showItems="setTab('ServiceItem')"
      @showPart="setTab('Part')"
      @close="showInsFailDialog = false"
    />
    <!-- 维修履历 -->
    <RepaireHistory
      :visible="showHistory"
      :orderInfo="currentOrderInfo"
      :hisType="'order'"
      :billType="billType"
      @addItem="addItem"
      @addPart="addPart"
      @addAdvice="addAdvice"
      @close="showHistory = false"
    />
    <settle-dialog
      v-if="showDeliverCar"
      :visible.sync="showDeliverCar"
      :showInvince="true"
      :isLogistics="true"
      :informationList="informationList"
      :companyId="currentOrderInfo && currentOrderInfo.companyId"
      :settlData="settleBillData"
      @settleSuccess="updateOrder"
      @visibleChange="settleClose"
    />
  </div>
</template>

<script>
import CarInfo from "./carInfo/carInfo";
import VehicleDetection from "./vehicleDetection/vehicleDetection";
import ServiceItem from "./serviceItem/serviceItem";
import Part from "./part/part";
import Advices from "./advices/advices";
import OtherFee from "./otherFee/otherFee";
import QuoteConfirmOrder from "./quoteConfirmOrder/quoteConfirmOrder";
import SettlementConfirmOrder from "./settlementConfirmOrder/settlementConfirmOrder";
import QuoteDialog from "./components/quoteDialog";
import SettleCommitDialog from "./components/settleCommitDialog";
import InspectSuccess from "./components/inspectSuccess";
import InspectFail from "./components/inspectFail";
import { SettleDialog } from "@/components/business";
import RepaireHistory from "@/components/repair/repairHistory/repairHistory";
import { ORDER_STATUS, ORDER_STEP_STATUS } from "../const/columns";
import { openNewWindow } from "@/utils/tool";
import { getDisCountInfo } from "@/utils/discount";
import {
  createBillsItems,
  createBillsParts,
  inspectBills,
  reinspect,
  deleteBills,
  getBillsExtraInfo
} from "@/api/repairs/bills";
import { settlesView } from "@/api/repairs/bills";
import {
  getStaffSystemParamsDetail,
  updateStaffSystemParamsDetail
} from "@/api/base/base";

export default {
  name: "orderInfo",
  props: {
    orderInfo: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    orderInfo: {
      handler(value) {
        console.log("详情组件获取到", value);
        if (value) {
          this.billType = value.billType;
          this.currentOrderInfo = { ...value };
          this.orderStatus = value.status;
          this.getAmount();
          this.getResumeSetting();
          this.$forceUpdate();
        }
        if (value.id) {
          this.isNeworder = false;
        } else {
          this.isNeworder = true;
        }
      },
      deep: true
    }
  },
  components: {
    CarInfo,
    VehicleDetection,
    ServiceItem,
    Part,
    Advices,
    OtherFee,
    QuoteConfirmOrder,
    SettlementConfirmOrder,
    QuoteDialog,
    SettleCommitDialog,
    RepaireHistory,
    InspectSuccess,
    InspectFail,
    SettleDialog
  },
  computed: {
    commandList() {
      let list = [];
      switch (this.orderStatus) {
        case "recepting":
          list = ["打印报价单（F10）"];
          break;
        case "repairing":
          list = ["打印报价单（F10）"];
          break;
        default:
          list = ["打印报价单（F10）", "打印结算单（F10）"];
          break;
      }
      return list;
    },
    getStatusInfo() {
      let show = "";
      if (!this.currentOrderInfo.flags) return show;
      const data = this.currentOrderInfo.flags;
      if (data.customerPaied) {
        show = "客户已支付";
      } else if (data.customerSettleConfirmed) {
        show = "客户已确认结算单";
      } else if (data.customerOfferConfirmed) {
        show = "客户已确认报价单";
      } else {
        show = null;
      }
      return show;
    },
    informationList() {
      if (!this.currentOrderInfo) {
        return [];
      }
      const columns = [
        { name: "客户名称", content: this.currentOrderInfo.cooperatorName },
        { type: "billType" },
        { name: "工单号", content: this.currentOrderInfo.billNo },
        {
          name: "工时费",
          content: this.currentOrderInfo.itemTotalDueAmount
        },
        { name: "材料费", content: this.currentOrderInfo.partTotalDueAmount },
        {
          name: "其他费用",
          content: this.currentOrderInfo.extraFeeTotalDueAmount
        },
        { name: "应收金额", type: "amount" },
        { name: "结算金额", type: "settledAmount" },
        { name: "未结金额", type: "unSettledAmount" }
      ];
      return columns;
    },
    tabs() {
      const { itemCount, partCount, extraFeeCount, suggestionCount } = this;
      return [
        {
          name: "客户/车辆信息",
          id: "CarInfo"
        },
        { name: "车辆检测", id: "VehicleDetection" },
        {
          name: "服务项目",
          id: "ServiceItem",
          render: value => {
            return itemCount ? (
              <span>
                {value}
                <span style="color:#3AA7FF">({itemCount})</span>
              </span>
            ) : (
              value
            );
          }
        },
        {
          name: "配件材料",
          id: "Part",
          render: value => {
            return partCount ? (
              <span>
                {value}
                <span style="color:#3AA7FF">({partCount})</span>
              </span>
            ) : (
              value
            );
          }
        },
        {
          name: "建议项目",
          id: "Advices",
          render: value => {
            return suggestionCount ? (
              <span>
                {value}
                <span style="color:#3AA7FF">({suggestionCount})</span>
              </span>
            ) : (
              value
            );
          }
        },
        {
          name: "其他费用",
          id: "OtherFee",
          render: value => {
            return extraFeeCount ? (
              <span>
                {value}
                <span style="color:#3AA7FF">({extraFeeCount})</span>
              </span>
            ) : (
              value
            );
          }
        },
        { name: "报价确认单", id: "QuoteConfirmOrder" },
        { name: "结算确认单", id: "SettlementConfirmOrder" }
      ];
    },
    settleBillData() {
      return (
        this.currentOrderInfo && {
          ...this.currentOrderInfo,
          sourceBillType: this.currentOrderInfo.billType,
          sourceBillId: this.currentOrderInfo.billId,
          enhancedSettlementType:
            this.currentOrderInfo.paymentTypes &&
            this.currentOrderInfo.paymentTypes.length
              ? `${this.currentOrderInfo.settlementType}（${this.currentOrderInfo.paymentTypes[0]}）`
              : `${this.currentOrderInfo.settlementType}`,
          isSettleIn: true
        }
      );
    },
    hasConfirmPerm() {
      // 报价确认
      return this.hasBelongsPerm("offerConfirm", ["self", "others"]);
    },
    hasSettleConfirmPerm() {
      // 结算确认
      return this.hasBelongsPerm("settleConfirm", ["self", "others"]);
    },
    hasInspectPerm() {
      return this.hasBelongsPerm("inspect", ["self", "others"]);
    },
    hasReinspect() {
      // 返车间
      return this.hasBelongsPerm("reinspect", ["self", "others"]);
    },
    hasSettlePerm() {
      // 收款交车
      return this.hasBelongsPerm("settle", ["self", "others"]);
    },
    hasDeletePerm() {
      // 删除工单
      return this.hasBelongsPerm("delete", ["self", "others"]);
    },
    hasPrintPerm() {
      // 打印权限
      return this.hasBelongsPerm("print", ["self", "others"]);
    },
    hasEditPerm() {
      return this.hasBelongsPerm("update", ["self", "others"]);
    }
  },
  data() {
    return {
      currentBtnType: "打印报价单（F10）",
      billType: "",
      errorsList: [],
      noNextMaintenance: false,
      ORDER_STATUS,
      ORDER_STEP_STATUS,
      isNeworder: false,
      showDeliverCar: false,
      showQuoteDialog: false,
      showSettleCommitDialog: false,
      showInsSuccessDialog: false,
      showInsFailDialog: false,
      showHistory: false,
      checked: false,
      orderStatus: "",
      itemCount: 0,
      partCount: 0,
      extraFeeCount: 0,
      suggestionCount: 0,
      currentOrderInfo: null,
      activeTab: "CarInfo"
    };
  },
  deactivated() {
    this.showHistory = false;
  },
  methods: {
    getResumeSetting() {
      getStaffSystemParamsDetail({
        module: "repair",
        type: "repairBillAlterResume"
      }).then(res => {
        this.checked = res.value;
        if (res.value && !this.isNeworder) {
          this.showHistory = true;
        }
      });
    },
    changeResumeSetting(e) {
      updateStaffSystemParamsDetail({
        module: "repair",
        type: "repairBillAlterResume",
        value: e
      }).then(() => {
        this.$message.success("设置成功！");
      });
    },
    print() {
      const { id } = this.orderInfo;
      let path = "";
      switch (this.currentBtnType) {
        case "打印报价单（F10）":
          path = "repair/billConfirm";
          break;
        case "打印结算单（F10）":
          path = "repair/billSettle";
          break;
        default:
          path = "repair/billConfirm";
          break;
      }
      openNewWindow(
        this.$router.resolve({
          path: `/Print/${path}/${id}`
        }).href,
        "print"
      );
    },
    handleCommand(command) {
      this.currentBtnType = command;
    },
    getAmount() {
      console.log("请求额外信息");
      if (!this.orderInfo || !this.orderInfo.id) return;
      getBillsExtraInfo(this.orderInfo.id).then(res => {
        if (!res) return;
        const { itemCount, partCount, extraFeeCount, suggestionCount } = res;
        this.itemCount = itemCount;
        this.partCount = partCount;
        this.extraFeeCount = extraFeeCount;
        this.suggestionCount = suggestionCount;
      });
    },
    settleClose() {
      this.showDeliverCar = false;
    },
    addComplete(e) {
      this.$emit("addComplete", e);
    },
    updateOrder() {
      this.showQuoteDialog = false;
      this.showInsSuccessDialog = false;
      this.showInsFailDialog = false;
      this.showSettleCommitDialog = false;
      this.showDeliverCar = false;
      this.getAmount();
      this.$emit("updateOrder", this.orderInfo);
    },
    inspect() {
      const { id } = this.orderInfo;
      inspectBills({ id, action: "view" }).then(res => {
        const { has } = res;
        if (!has) {
          this.showInsSuccessDialog = true;
        } else {
          this.showInsFailDialog = true;
          let resItems = [];
          let resParts = [];
          if (res.items) {
            resItems = res.items.map(item => {
              if (item == "notSetChargeMan") return "itemNotSetChargeMan";
              return item;
            });
          }
          if (res.parts) {
            resParts = res.parts.map(item => {
              if (item == "notSetChargeMan") return "partNotSetChargeMan";
              return item;
            });
          }

          console.log(resItems);
          console.log(resParts);
          const bills = res.bills || [];
          const items = resItems || [];
          const parts = resParts || [];
          this.errorsList = [...items, ...parts];
          this.noNextMaintenance = bills && bills[0] === "noNextMaintenance";
        }
      });
    },
    reinspect() {
      this.$confirm(`确定将此工单返车间？`, "提示").then(() => {
        const { id } = this.orderInfo;
        reinspect({ id, action: "view" }).then(() => {
          this.$message.success("返车间成功！");
          this.$emit("updateOrder", this.orderInfo);
        });
      });
    },
    deliveCar() {
      // 请求结算预览接口，获取单据详情
      settlesView({
        id: this.currentOrderInfo.id,
        useBillToParam: true
      }).then(res => {
        const { total, amount, invoiceNumber, invoiceType, taxRate } = res;
        if (total) {
          let selfPay = {};
          if (total.rows) {
            const self = total.rows.filter(item => item.feeProperty == "self");
            if (self && self.length) {
              selfPay = { ...self[0] };
            }
          }
          const { extraFeeDueAmount, itemAmount, partDueAmount } = selfPay;
          this.currentOrderInfo = {
            ...this.currentOrderInfo,
            extraFeeTotalDueAmount: extraFeeDueAmount || 0,
            itemTotalDueAmount: itemAmount || 0,
            partTotalDueAmount: partDueAmount || 0,
            amount,
            invoiceNumber,
            invoiceType,
            taxRate,
            discountAmount: 0 // 优惠金额需要默认为0
          };
        }
        this.showDeliverCar = true;
      });
    },
    deleteBills() {
      this.$confirm(`确定删除此工单？`, "提示").then(() => {
        const { id } = this.orderInfo;
        deleteBills({ id, action: "view" }).then(() => {
          this.$message.success("删除工单成功！");
          this.$emit("updateOrder");
        });
      });
    },
    setTab(e) {
      this.showInsFailDialog = false;
      this.activeTab = e;
    },
    addItem(e) {
      console.log("维修履历新增项目", e);
      const { id: billId } = this.orderInfo;
      const { itemId, remark, discount } = e;
      const discountInfo = getDisCountInfo(this.orderInfo, "item", discount);
      const data = {
        billId,
        type: "item",
        feeProperty: "self",
        discountRate: discountInfo.discount,
        qty: 1,
        itemId,
        remark
      };
      createBillsItems(data).then(() => {
        this.$message.success("添加成功");
        this.getAmount();
        if (this.activeTab == "ServiceItem") {
          this.$refs.compo.list();
        }
      });
    },
    addPart(e) {
      const { id: billId } = this.orderInfo;
      // const discountInfo = getDisCountInfo(this.orderInfo, "part");
      const {
        qty,
        partId,
        remark,
        price,
        feeProperty,
        lockPrice,
        discountRate
      } = e;
      const data = {
        billId,
        type: "part",
        qty,
        price,
        feeProperty: feeProperty,
        partId,
        remark,
        lockPrice,
        discountRate
      };
      createBillsParts(data).then(() => {
        this.$message.success("添加成功");
        this.getAmount();
        if (this.activeTab == "Part") {
          this.$refs.compo.list();
        }
      });
    },
    addAdvice(e) {
      console.log(e);
      const { id: billId } = this.orderInfo;
      const { setId, itemId, remark, setType, itemDiscount } = e;
      let discountRate = null;
      const discountInfo = getDisCountInfo(
        this.orderInfo,
        setId > 0 ? "set" : "item",
        itemDiscount
      );
      discountRate = discountInfo.discount;
      const data = {
        billId,
        type:
          setId > 0 ? (setType == "tree" ? "treeSet" : "normalSet") : "item",
        qty: 1,
        feeProperty: "self",
        itemId,
        discountRate: discountRate,
        normalSetId: setId,
        treeSetId: setId,
        remark
      };
      createBillsItems(data).then(() => {
        this.$message.success("添加成功");
        this.getAmount();
        if (this.activeTab == "ServiceItem") {
          this.$refs.compo.list();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-right: 10px;
}
.btns {
  // box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  background: #fff;
  padding: 5px;
  border-radius: 2px;
  .log {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  ::v-deep {
    .el-button--small {
      // height: 20px;
      // line-height: 20px;
      padding: 9px 12px;
    }
  }
}
.info-group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 10px;
  border: solid 1px #fff;
  background: #fff;
  border-radius: 5px;
  margin: 5px 0;
  .item {
    margin-right: 15px;
    .item-label {
      margin-right: 5px;
    }
    .item-value {
      color: #409eff;
    }
  }
  .info {
    width: 100%;
    display: block;
    flex: 1;
    text-align: right;
  }
}
.detail-wrap {
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  background: #fff;
  border-radius: 5px;

  .header {
    padding: 5px 10px;
  }
}
</style>
