<template>
  <!-- 洗车业务 -->
  <div class="container-box">
    <div class="wash-car-business" v-loading="loading">
      <!-- 洗车业务 -->
      <resize-box :default-len="460">
        <template v-slot:block1>
          <div class="list-wrap">
            <ht-card class="auto-card" title="洗车列表" padding>
              <div slot="after-title">
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
          <div class="list-wrap">
            <OrderInfo :orderInfo="currentOrder" @updata="updata" />
          </div>
        </template>
      </resize-box>
    </div>
  </div>
</template>

<script>
import ResizeBox from "@/components/resizeBox";
import OrderList from "./orderList/orderList";
import OrderInfo from "./orderInfo/orderInfo";
const defaultOrderForm = {
  plateNumber: "",
  customerName: "",
  customerPhone: "",
  billNo: "",
  sourceBillNo: "",
  status: "",
  type: "",
  amount: "",
  washers: []
};

export default {
  name: "washCarBusiness",
  components: { ResizeBox, OrderList, OrderInfo },
  mixins: [],
  data() {
    return {
      loading: false,
      currentOrder: {}
    };
  },
  activated() {
    this.updata(0);
  },
  methods: {
    selectOrderChange(e) {
      if (!e || !e.id) return;
      this.$nextTick(() => {
        this.currentOrder = { ...e };
        this.$forceUpdate();
      });
    },
    createOrder() {
      this.currentOrder = { ...defaultOrderForm };
    },
    updata(id) {
      this.$refs.orderList.updata(id);
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .wash-car-business {
    padding: 5px;
    height: 100%;
    .list-wrap {
      height: 100%;
    }
  }
}
</style>
