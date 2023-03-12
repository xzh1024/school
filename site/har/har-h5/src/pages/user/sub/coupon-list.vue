<template>
  <i-sys title="优惠券" :nav-placeholder="true" nav-bg="bg-white">
    <view class="page">
      <view class="tab-box" :style="{ top: testHeight }">
        <view
          v-for="(item, index) in tabArr"
          :key="index"
          class="tab-item"
          @click="onChange(item)"
        >
          <view :class="active === item.id ? 'text-orange' : ''">{{
            item.name
          }}</view>
          <view v-if="active === item.id" class="i-active-box">
            <view class="i-round"></view>
            <view class="i-active"></view>
          </view>
        </view>
      </view>
      <z-paging ref="paging" v-model="info" inside-more @query="getList">
        <template #top>
          <calc-top />
          <view class="tab-height"></view>
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

<script setup>
  import { onLoad } from "@dcloudio/uni-app";
  import { ref } from "vue";
  import { cbdApiAppletCouponMyCouponListGet } from "@/api";
  import CouponItem from "../../../components/coupon-item/index.vue";

  const tabArr = [
    {
      name: "全部",
      id: ""
    },
    {
      name: "未使用",
      id: 0
    },
    {
      name: "已使用",
      id: 1
    },
    {
      name: "已过期",
      id: 2
    }
  ];
  const testHeight = ref(0);
  onLoad(async () => {
    const { statusBarHeight } = uni.getSystemInfoSync();
    const { top, height } = uni.getMenuButtonBoundingClientRect();
    testHeight.value =
      (top - statusBarHeight) * 2 + height + statusBarHeight + "px";
  });

  const active = ref("");

  const paging = ref(null);
  const info = ref([]);

  const getList = async (pageNo, pageSize) => {
    uni.showLoading({
      title: "加载中"
    });
    try {
      const d = await cbdApiAppletCouponMyCouponListGet({
        status: active.value,
        pageNum: pageNo,
        pageSize
      });
      paging.value.complete(d?.rows || []);
    } catch (e) {
      console.error(e);
      paging.value.complete(false);
    } finally {
      uni.hideLoading();
    }
  };

  const onChange = (item) => {
    const { id } = item;
    if (active.value === id) return;
    active.value = id;
    paging.value.reload();
  };

  const onClick = (value) => {
    // 我的优惠券 应该只有去使用操作
    const { id, code } = value;
    uni.navigateTo({
      url: `/pages/coupon/apply-store?id=${id}&code=${code}`
    });
  };
</script>

<style scoped lang="scss">
  .text-orange {
    color: #ff5f00;
  }
  .tab-height {
    height: 72rpx;
  }
  .page {
    .tab-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32rpx;
      background: #ffffff;
      position: fixed;
      width: stretch;
      height: 72rpx;
      left: 0;
      z-index: 999;
      font-size: 28rpx;
      .tab-item {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        .i-active-box {
          display: flex;
          align-items: center;
          position: absolute;
          bottom: 0;
          .i-round {
            width: 4rpx;
            height: 4rpx;
            background: #ff5f00;
            border-radius: 50%;
          }
          .i-active {
            width: 42rpx;
            height: 4rpx;
            background: #ff5f00;
            border-radius: 2px 2px 2px 2px;
            margin-left: 2rpx;
          }
        }
        /*.i-active {
        position: absolute;
        bottom: 0;
        width: 21px;
        height: 2px;
        background: #FF5F00;
        border-radius: 2px 2px 2px 2px;
      }*/
      }
    }
    .info-box {
      padding: 32rpx;
    }
  }
</style>
