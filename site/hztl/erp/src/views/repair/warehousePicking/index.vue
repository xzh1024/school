<template>
  <resize-box :default-len="460">
    <template v-slot:block1>
      <div class="list-wrap">
        <ht-card
          class="auto-card"
          title="工单列表"
          padding
          style="background:#fff;"
        >
          <WorkOrderList @selectChange="selectOrderChange" />
        </ht-card>
      </div>
    </template>
    <template v-slot:block2>
      <div class="list-wrap" v-if="currentOrder">
        <OrderInfo :orderInfo="currentOrder" />
      </div>
    </template>
  </resize-box>
</template>

<script>
import ResizeBox from "@/components/resizeBox";
import WorkOrderList from "./orderList/orderList";
import OrderInfo from "./orderInfo/orderInfo";
import { hotkeyMixin } from "@/mixins";
export default {
  name: "WarehousePicking",
  data() {
    return {
      currentOrder: null
    };
  },
  mixins: [hotkeyMixin],
  components: {
    ResizeBox,
    WorkOrderList,
    OrderInfo
  },
  methods: {
    selectOrderChange(e) {
      this.currentOrder = { ...e };
    }
  }
};
</script>

<style lang="scss" scoped>
.list-wrap {
  height: 100%;
  padding: 5px 0 5px 5px;
}
</style>
