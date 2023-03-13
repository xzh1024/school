<template>
  <view class="coupon">
    <z-paging
      ref="paging"
      v-model="list"
      use-page-scroll
      :refresher-enabled="false"
      inside-more
      @query="getList"
    >
      <view class="list">
        <coupon-item
          v-for="item in list"
          :key="item.couponId"
          :item="item"
          @click="receive"
        ></coupon-item>
      </view>
    </z-paging>
  </view>
</template>
<script>
  export default {
    name: "Coupon"
  };
</script>
<script setup>
  import { ref } from "vue";
  import { cbdApiAppletCouponStoreCouponListGet } from "@/api";
  import CouponItem from "@/components/coupon-item";
  import { cbdApiAppletCouponReceiveCouponIdGet } from "../../../../api";

  const props = defineProps({
    storeId: {
      type: [String, Number]
    }
  });
  const list = ref([]);
  const paging = ref(null);

  async function getList(pageNo, pageSize) {
    uni.showLoading({ title: "加载中..." });
    try {
      console.log(pageNo, pageSize);
      const res = await cbdApiAppletCouponStoreCouponListGet({
        storeId: props.storeId,
        pageNum: pageNo,
        pageSize
      });
      console.log(res);
      paging.value.complete(res?.rows || []);
    } catch (e) {
      console.error(e);
      paging.value.complete(false);
    } finally {
      uni.hideLoading();
    }
  }
  function receive({ type, id, code, handleType }) {
    // handleType 1 去使用 2 领取和购买
    if (handleType === 1) {
      uni.navigateTo({
        url: `/pages/coupon/apply-store?id=${id}&code=${code}`
      });
    } else {
      if (type === 4) {
        //积分券 去购买
        uni.navigateTo({
          url: `/pages/coupon/detail?id=${id}&code=${code}`
        });
      } else {
        //领取操作
        getReceiveCoupon(id);
      }
    }
  }
  async function getReceiveCoupon(id) {
    uni.showLoading({
      title: "领取中"
    });
    try {
      const { startTime, expireTime } =
        await cbdApiAppletCouponReceiveCouponIdGet({
          id
        });
      uni.hideLoading();
      const index = list.value.findIndex((i) => i.id === id);
      list.value[index] = {
        ...list.value[index],
        received: true,
        status: 0,
        startTime,
        expireTime
      };
    } catch (e) {
      console.error(e);
    }
  }
</script>
<style scoped lang="scss">
  .list {
    padding: 32rpx;
  }
</style>
