<template>
  <resize-box :default-len="390">
    <template v-slot:block1>
      <div class="list-wrap">
        <ht-card class="auto-card" title="保险理赔申请单" padding>
          <OrderList ref="list" @selectChange="selectOrderChange" />
        </ht-card>
      </div>
    </template>
    <template v-slot:block2>
      <div class="list-wrap">
        <OrderInfo :billInfo="currentOrder" @updateList="updateList" />
      </div>
    </template>
  </resize-box>
</template>

<script>
import ResizeBox from "@/components/resizeBox";
import OrderList from "./orderList/orderList";
import OrderInfo from "./orderInfo/orderInfo";
import { hotkeyMixin } from "@/mixins";
export default {
  name: "Insurance",
  data() {
    return {
      currentOrder: {}
    };
  },
  mixins: [hotkeyMixin],
  components: {
    ResizeBox,
    OrderList,
    OrderInfo
  },
  methods: {
    selectOrderChange(e) {
      this.currentOrder = { ...e };
    },
    updateList(id) {
      this.$refs.list.listAndSelect(id);
    }
  }
};
</script>

<style lang="scss" scoped>
.list-wrap {
  height: 100%;
  padding: 10px 0 10px 10px;
}
</style>
