<template>
  <ht-dialog v-bind="$attrs" title="工单详情" width="1200px" v-on="$listeners">
    <div class="wrap">
      <div class="info-group" v-if="currentOrderInfo">
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
          <span class="item-value">{{
            currentOrderInfo.receptionManName
          }}</span>
        </span>
        <span class="item">
          <span class="item-label">状态:</span>
          <span class="item-value">{{
            ORDER_STATUS[currentOrderInfo.status]
          }}</span>
        </span>
      </div>
      <div class="detail-wrap">
        <div class="header">
          <ht-tabs v-model="activeTab" :tabs="tabs" class="tabs-regular" />
        </div>
        <component
          :is="activeTab"
          :orderInfo="currentOrderInfo"
          :billId="billId"
        />
      </div>
    </div>
  </ht-dialog>
</template>

<script>
import { getBillsDetail } from "@/api/repairs/bills";
import {
  ORDER_STATUS,
  ORDER_STEP_STATUS
} from "@/views/repair/workOrder/const/columns";
import CarInfo from "./carInfo/carInfo";
import vehicleDetectionPreview from "./vehicleDetection/vehicleDetectionPreview";
import ServiceItem from "./serviceItem/serviceItem";
import Part from "./part/part";
import Advices from "./advices/advices";
import OtherFee from "./otherFee/otherFee";
import QuoteConfirmOrder from "./quoteConfirmOrder/quoteConfirmOrder";
import SettlementConfirmOrder from "./settlementConfirmOrder/settlementConfirmOrder";
export default {
  name: "dialog-name",
  props: {
    billId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    billId: {
      handler(value) {
        if (value) {
          this.activeTab = "CarInfo";
          this.billId = value;
          this.getBillInfo();
        }
      },
      deep: true
    }
  },
  components: {
    CarInfo,
    vehicleDetectionPreview,
    ServiceItem,
    Part,
    Advices,
    OtherFee,
    QuoteConfirmOrder,
    SettlementConfirmOrder
  },
  computed: {
    tabs() {
      return [
        {
          name: "客户/车辆信息",
          id: "CarInfo"
        },
        { name: "车辆检测", id: "vehicleDetectionPreview" },
        {
          name: "服务项目",
          id: "ServiceItem"
        },
        {
          name: "配件材料",
          id: "Part"
        },
        {
          name: "建议项目",
          id: "Advices"
        },
        {
          name: "其他费用",
          id: "OtherFee"
        },
        { name: "报价确认单", id: "QuoteConfirmOrder" },
        { name: "结算确认单", id: "SettlementConfirmOrder" }
      ];
    }
  },
  data() {
    return {
      ORDER_STATUS,
      ORDER_STEP_STATUS,
      currentOrderInfo: null,
      activeTab: "CarInfo"
    };
  },
  methods: {
    getBillInfo() {
      getBillsDetail(this.billId).then(res => {
        this.currentOrderInfo = { ...res };
      });
    },
    cancelHandle() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
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
  height: 600px;
}
</style>
