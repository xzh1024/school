<template>
  <i-sys :title="title" :nav-placeholder="true">
    <view class="page">
      <z-paging ref="paging" v-model="info" inside-more @query="getList">
        <template #top>
          <calc-top />
        </template>
        <view class="info-box">
          <view v-for="(item, index) in info" :key="index">
            <coupon-item :item="item" @click="onClick" />
          </view>
        </view>
      </z-paging>
    </view>
  </i-sys>
</template>

<script>
  export default {
    name: "List"
  };
</script>
<script setup>
  import { onLoad } from "@dcloudio/uni-app";
  import { ref } from "vue";
  import {
    cbdApiAppletCouponCouponListGet,
    cbdApiAppletCouponReceiveCouponIdGet
  } from "@/api";
  import CouponItem from "../../components/coupon-item/index.vue";

  const type = ref("");
  const id = ref("");
  const title = ref("");
  onLoad(async (option) => {
    console.log(option);
    type.value = option.type || "";
    id.value = option.id || "";
    title.value = option.title || "优惠券";
  });

  const paging = ref(null);
  const info = ref([]);
  const getList = async (pageNo, pageSize) => {
    try {
      const d = await cbdApiAppletCouponCouponListGet({
        sceneId: id.value,
        type: type.value,
        pageNum: pageNo,
        pageSize
      });
      paging.value.complete(d?.rows || []);
    } catch (e) {
      console.error(e);
      paging.value.complete(false);
    }
  };

  const onClick = (item) => {
    console.log(item);
    const { id, type, code, handleType } = item;
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
  };

  const getReceiveCoupon = async (id) => {
    uni.showLoading({
      title: "领取中..."
    });
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
          const idIndex = info.value.findIndex((item) => item.id === id);
          console.log(info.value[idIndex]);
          info.value[idIndex] = {
            ...info.value[idIndex],
            received: true,
            status: 0,
            startTime,
            expireTime
          };
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
</script>

<style scoped lang="scss">
  .info-box {
    padding: 32rpx;
  }
</style>
