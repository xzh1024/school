<template>
  <i-sys
    class="order-list"
    title="我的订单"
    nav-bg="bg-white"
    :nav-placeholder="true"
  >
    <view>
      <z-paging ref="paging" v-model="list" inside-more @query="getList">
        <template #top>
          <calc-top />
          <i-tabs
            v-model="activeIndex"
            :data="orderListStatus"
            flex
            default-color="#666"
            @change="tabChange"
          ></i-tabs>
        </template>
        <view class="list">
          <template v-for="item in list" :key="item.orderNo">
            <order-shop-item
              v-if="item.orderType === 1"
              :info="item"
              type="order"
            ></order-shop-item>
            <order-gym-item v-else :info="item" type="order"></order-gym-item>
          </template>
        </view>
      </z-paging>
    </view>
  </i-sys>
</template>

<script setup>
  import { ref, computed } from "vue";
  import OrderShopItem from "./components/order-shop-item";
  import OrderGymItem from "./components/order-gym-item";
  import { onLoad, onShow } from "@dcloudio/uni-app";
  import { cbdApiAppletOrderListGet } from "@/api";
  import { orderListStatus } from "@/utils/dic";
  import ITabs from "@/components/i-tabs";

  const activeIndex = ref(0);
  // const  tabsList = orderListStatus
  const list = ref([]);
  const paging = ref(null);

  onLoad((e) => {
    const { status } = e;
    console.log(status, "----");
    const index = orderListStatus.findIndex((i) => i.value === Number(status));
    console.log(index, "--**--");
    if (status) activeIndex.value = index < 0 ? 0 : index;
  });

  onShow(() => {
    paging.value?.reload();
  });
  async function getList(pageNo, pageSize) {
    try {
      console.log(pageNo, pageSize);
      const res = await cbdApiAppletOrderListGet({
        orderStatus: orderStatus.value,
        pageNum: pageNo,
        pageSize
      });
      console.log(res);
      paging.value.complete(res?.rows || []);
    } catch (e) {
      console.error(e);
      paging.value.complete(false);
    }
  }
  const orderStatus = computed(() => {
    return orderListStatus[activeIndex.value]?.value;
  });
  function tabChange() {
    paging.value.reload();
  }
</script>

<style scoped lang="scss">
  .list {
    padding: 32rpx;
  }
</style>
