<template>
  <i-sys title="搜索结果" nav-placeholder>
    <z-paging
      v-if="searchType === 1"
      ref="pagingStore"
      v-model="storeList"
      inside-more
      @query="getList"
    >
      <template #top>
        <view :style="{ height: topBoxHeight }"></view>
      </template>
      <view class="store-container">
        <view v-for="(item, index) in storeList" :key="index" class="store-box">
          <store-cell :item="item" />
        </view>
      </view>
    </z-paging>
    <z-paging
      v-else-if="searchType === 2"
      ref="pagingActivity"
      v-model="activityList"
      inside-more
      @query="getList"
    >
      <template #top>
        <view :style="{ height: topBoxHeight }"></view>
      </template>
      <view class="activity-container">
        <view
          v-for="(item, index) in activityList"
          :key="index"
          class="activity-box"
        >
          <activity-cell :item="item" />
        </view>
      </view>
    </z-paging>
    <view v-else class="empty-box">
      <i-empty />
    </view>
  </i-sys>
</template>

<script setup>
  import { ref } from "vue";
  import { onLoad } from "@dcloudio/uni-app";
  import {
    cbdApiAppletActivitySearchGet,
    cbdApiAppletStoreSearchGet
  } from "../../../../api";
  import StoreCell from "../../../../components/common/store-cell/store-cell";
  import IEmpty from "../../../../components/i-empty";
  import ActivityCell from "../../../../components/common/activity-cell/activity-cell";

  const topBoxHeight = ref(0);

  const searchKey = ref("");
  const searchType = ref("");
  onLoad((options) => {
    console.log(options);
    searchKey.value = options.key;
    searchType.value = Number(options.searchType);
    const { top, height } = uni.getMenuButtonBoundingClientRect();
    topBoxHeight.value = top + height + "px";
  });

  const getList = async (pageNo, pageSize) => {
    console.log(pageNo, pageSize);
    if (searchType.value === 1) {
      await getSearchStore(pageNo, pageSize);
    } else if (searchType.value === 2) {
      await getSearchActivity(pageNo, pageSize);
    }
  };

  const storeList = ref([]);
  const pagingStore = ref(null);
  const getSearchStore = async (pageNum, pageSize) => {
    try {
      const d = await cbdApiAppletStoreSearchGet({
        searchKey: searchKey.value,
        pageNum,
        pageSize
      });
      pagingStore.value.complete(d?.rows || []);
    } catch (e) {
      console.error(e);
      pagingStore.value.complete(false);
    }
  };

  const activityList = ref([]);
  const pagingActivity = ref(null);
  const getSearchActivity = async (pageNum, pageSize) => {
    try {
      const d = await cbdApiAppletActivitySearchGet({
        searchKey: searchKey.value,
        pageNum,
        pageSize
      });
      pagingActivity.value.complete(d?.rows || []);
    } catch (e) {
      console.error(e);
      pagingActivity.value.complete(false);
    }
  };
</script>

<style lang="scss" scoped>
  @import "./searchDetail.scss";
  .store-container {
    padding: 38rpx 32rpx 0 32rpx;
    .store-box {
      margin-bottom: 24rpx;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .activity-container {
    padding: 38rpx 32rpx 0 32rpx;
    .activity-box {
      margin-bottom: 24rpx;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .empty-box {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
