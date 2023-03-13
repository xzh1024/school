<template>
  <i-sys title="收藏" :nav-placeholder="true" nav-bg="bg-white">
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
      <view>
        <view>
          <z-paging
            v-if="active === 0"
            ref="paging1"
            v-model="infoData1"
            inside-more
            @query="getCollectStore"
          >
            <template #top>
              <calc-top />
              <view class="tab-height"></view>
            </template>
            <view class="padding-16">
              <view
                v-for="(item, index) in infoData1"
                :key="index"
                class="margin-bottom-12"
              >
                <store-cell :item="item" :index="index" />
              </view>
            </view>
          </z-paging>
        </view>
        <view>
          <z-paging
            v-if="active === 1"
            ref="paging2"
            v-model="infoData2"
            inside-more
            @query="getCollectProduct"
          >
            <template #top>
              <calc-top />
              <view class="tab-height"></view>
            </template>
            <view class="padding-16">
              <view
                v-for="(item, index) in infoData2"
                :key="index"
                class="margin-bottom-12"
              >
                <goods-cell :item="item" />
              </view>
            </view>
          </z-paging>
        </view>
        <view>
          <z-paging
            v-if="active === 2"
            ref="paging3"
            v-model="infoData3"
            inside-more
            @query="getCollectActivity"
          >
            <template #top>
              <calc-top />
              <view class="tab-height"></view>
            </template>
            <view class="content-info">
              <view v-for="(item, index) in infoData3" :key="index">
                <activity-cell :item="item" />
              </view>
            </view>
          </z-paging>
        </view>
      </view>
    </view>
  </i-sys>
</template>

<script setup>
  import { onLoad } from "@dcloudio/uni-app";
  import ActivityCell from "../../../components/common/activity-cell/activity-cell";
  import { ref } from "vue";
  import {
    cbdApiAppletActivityListGet,
    cbdApiAppletCollectProductGet,
    cbdApiAppletCollectStoreGet
  } from "@/api";
  import GoodsCell from "../_components_/goods-cell";
  import StoreCell from "../../../components/common/store-cell/store-cell";
  // import ShopItem from "@/components/common/shop-item/shop-item";
  // import GymItem from "@/components/common/gym-item/gym-item";

  const tabArr = [
    {
      name: "收藏的店铺",
      id: 0
    },
    {
      name: "收藏的商品",
      id: 1
    }
    // {
    //   name: "收藏的活动",
    //   id: 2
    // }
  ];

  const testHeight = ref(0);
  onLoad(async () => {
    const { statusBarHeight } = uni.getSystemInfoSync();
    const { top, height } = uni.getMenuButtonBoundingClientRect();
    testHeight.value =
      (top - statusBarHeight) * 2 + height + statusBarHeight + "px";
  });

  const active = ref(0);
  const paging1 = ref(null);
  const infoData1 = ref([]);

  const paging2 = ref(null);
  const infoData2 = ref([]);

  const paging3 = ref(null);
  const infoData3 = ref([]);

  // const getList = (pageNo, pageSize) => {
  //   if (active.value === 0) {
  //     getCollectStore(pageNo, pageSize);
  //   } else if (active.value === 1) {
  //     getCollectProduct(pageNo, pageSize);
  //   } else if (active.value === 2) {
  //     getCollectActivity(pageNo, pageSize);
  //   }
  // };

  const getCollectStore = async (pageNo, pageSize) => {
    uni.showLoading({
      title: "加载中"
    });
    try {
      const d = await cbdApiAppletCollectStoreGet({
        pageNum: pageNo,
        pageSize
      });
      paging1.value.complete(d?.rows || []);
    } catch (e) {
      console.error(e);
      paging1.value.complete(false);
    } finally {
      uni.hideLoading();
    }
  };

  const getCollectProduct = async (pageNo, pageSize) => {
    uni.showLoading({
      title: "加载中"
    });
    try {
      const d = await cbdApiAppletCollectProductGet({
        pageNum: pageNo,
        pageSize
      });
      paging2.value.complete(d?.rows || []);
    } catch (e) {
      console.error(e);
      paging2.value.complete(false);
    } finally {
      uni.hideLoading();
    }
  };

  const getCollectActivity = async (pageNo, pageSize) => {
    uni.showLoading({
      title: "加载中"
    });
    try {
      const d = await cbdApiAppletActivityListGet({
        sortKey: 3,
        pageNum: pageNo,
        pageSize
      });
      paging3.value.complete(d?.rows || []);
    } catch (e) {
      console.error(e);
      paging3.value.complete(false);
    } finally {
      uni.hideLoading();
    }
  };

  const onChange = (item) => {
    const { id } = item;
    active.value = id;
  };

  // const onClick = (item) => {
  //   uni.navigateTo({
  //     url: "/pages/activity/detail?id=" + item.id
  //   })
  // }
</script>

<style scoped lang="scss">
  .padding-16 {
    padding: 32rpx;
  }
  .margin-bottom-12 {
    margin-bottom: 24rpx;
  }
  .text-orange {
    color: #ff5f00;
  }
  .tab-height {
    height: 72rpx;
  }
  .page {
    height: 100vh;
    .tab-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      //padding: 0 32rpx;
      padding: 0 120rpx;
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
        //.i-active {
        //  position: absolute;
        //  bottom: 0;
        //  width: 21px;
        //  height: 2px;
        //  background: #FF5F00;
        //  border-radius: 2px 2px 2px 2px;
        //}
      }
    }
    .content-info {
      padding: 32rpx;
    }
  }
</style>
