<template>
  <i-sys title="优惠券详情" :nav-placeholder="true">
    <view class="page">
      <z-paging ref="paging" v-model="info" inside-more @query="getList">
        <template #top>
          <calc-top />
          <view class="coupon-box">
            <coupon-item
              :item="couponDetail"
              source="detail"
              @click="onGetCoupon"
            />
          </view>
        </template>
        <view class="info-box">
          <view
            v-for="(item, index) in info"
            :key="index"
            class="margin-bottom-12"
          >
            <store-cell :item="item" :index="index" />
          </view>
        </view>
      </z-paging>
    </view>
  </i-sys>
</template>

<script>
  export default {
    name: "ApplyStore"
  };
</script>

<script setup>
  import { onLoad } from "@dcloudio/uni-app";
  import CouponItem from "../../components/coupon-item";
  import { ref } from "vue";
  import {
    cbdApiAppletCouponCouponInfoGet,
    cbdApiAppletCouponCouponUseStoreListGet,
    cbdApiAppletCouponReceiveCouponIdGet
  } from "@/api";
  import StoreCell from "../../components/common/store-cell/store-cell";

  const id = ref("");
  const code = ref("");
  onLoad(async (option) => {
    id.value = option.id || "";
    code.value = option.code || "";
    await getCouponDetail();
  });

  const couponDetail = ref({});
  const getCouponDetail = async () => {
    try {
      couponDetail.value = await cbdApiAppletCouponCouponInfoGet({
        id: id.value,
        code: code.value
      });
    } catch (e) {
      console.error(e);
    }
  };

  const paging = ref(null);
  const info = ref([]);

  const getList = async (pageNo, pageSize) => {
    try {
      const d = await cbdApiAppletCouponCouponUseStoreListGet({
        id: id.value,
        pageNum: pageNo,
        pageSize
      });
      paging.value.complete(d?.rows || []);
    } catch (e) {
      console.error(e);
      paging.value.complete(false);
    }
  };

  /**
   * 领取优惠券
   */
  const onGetCoupon = async ({ id }) => {
    uni.showLoading({ title: "领取中..." });
    try {
      const { startTime, expireTime } =
        await cbdApiAppletCouponReceiveCouponIdGet({
          id
        });
      uni.hideLoading();
      uni.showToast({
        icon: "success",
        title: "领取成功!",
        success: () => {
          couponDetail.value.received = true;
          couponDetail.value.status = 0;
          couponDetail.value.startTime = startTime;
          couponDetail.value.expireTime = expireTime;
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
</script>

<style scoped lang="scss">
  .margin-bottom-12 {
    margin-bottom: 24rpx;
  }
  .page {
    .coupon-box {
      padding: 32rpx 32rpx 0 32rpx;
    }
    .info-box {
      padding: 0 32rpx;
    }
  }
</style>
