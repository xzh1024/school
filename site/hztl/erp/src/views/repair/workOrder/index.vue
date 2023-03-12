<template>
  <div class="order-container">
    <resize-box :default-len="width">
      <!-- 435 -->
      <template v-slot:block1>
        <div class="list-wrap">
          <ht-card
            class="auto-card"
            title="在厂工单列表"
            style="background:#fff"
            padding
          >
            <div slot="after-title" style="color:#999">
              （双击单据查看详情）
            </div>
            <OrderList
              ref="orderList"
              @selectChange="selectOrderChange"
              @newOrder="createOrder"
            />
          </ht-card>
        </div>
      </template>
      <template v-slot:block2>
        <div class="list-wrap" style="over-flow:hidden;">
          <OrderInfo
            ref="orderInfo"
            :orderInfo="currentOrder"
            @addComplete="afterAdd"
            @updateOrder="updateOrder"
          />
        </div>
      </template>
    </resize-box>
  </div>
</template>

<script>
import ResizeBox from "@/components/resizeBox";
import OrderList from "./orderList/orderList";
import OrderInfo from "./orderInfo/orderInfo";
import { getBillsDetail } from "@/api/repairs/bills";
import { hotkeyMixin } from "@/mixins";
const defaultOrderForm = {
  id: null,
  businessCategoryId: null,
  oilDegree: "",
  mileage: "",
  contactsName: "",
  contactsPhone: "",
  contactsCertNumber: "",
  contactsRemark: "",
  receptionMan: null,
  receptionTime: new Date(),
  receptionRemark: "",
  nextMaintenanceMileage: "",
  nextMaintenanceDate: null,
  expectedDeliveryTime: null,
  insuranceCompany: null,
  insuranceNo: "",
  insuranceDeductionRate: "",
  flags: {
    wash: false,
    recovery: false
  }
};
export default {
  name: "WorkOrder",
  data() {
    return {
      currentOrder: null,
      width: 365
    };
  },
  mixins: [hotkeyMixin],
  components: {
    ResizeBox,
    OrderList,
    OrderInfo
  },
  created() {
    if (window.screen.width <= 1440) {
      this.width = 365;
    } else {
      this.width = 500;
    }
    console.log(this.width);
  },
  methods: {
    selectOrderChange(e) {
      if (!e || !e.id) return;
      // this.$refs.orderInfo.activeTab = "CarInfo";
      getBillsDetail(e.id).then(res => {
        this.$nextTick(() => {
          this.currentOrder = { ...res };
          this.$forceUpdate();
        });
      });
    },
    updateOrder(order) {
      this.$refs.orderList.refreshAndSelect(order);
    },
    createOrder() {
      this.$refs.orderInfo.activeTab = "CarInfo";
      this.currentOrder = { ...defaultOrderForm };
    },
    afterAdd(e) {
      this.$refs.orderList.refreshAndSelect(e);
    }
  }
};
</script>

<style lang="scss" scoped>
.order-container {
  width: 100%;
  height: 100%;
  ::v-deep {
    .block2 {
      overflow: hidden;
    }
  }
}
.list-wrap {
  height: 100%;
  padding: 5px 0 5px 5px;
}
</style>
