<template>
  <i-sys title="搜索" nav-placeholder @load="load">
    <view class="search">
      <view class="search-box">
        <view class="box">
          <input
            v-model="searchVal"
            placeholder-class="placeholder-class"
            class="search-input"
            type="text"
            placeholder="请输入关键词搜索"
          />
          <image
            class="search-icon"
            src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/search.png"
          ></image>
        </view>
        <view class="search-text" @tap="search">搜索</view>
      </view>
      <view class="search-content">
        <view class="head">
          <view class="title">历史搜索</view>
          <image
            class="delete-icon"
            src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/home_img/trash.png"
            @tap="deleteIcon"
          ></image>
        </view>
        <view class="tags-list">
          <view
            v-for="(item, index) in historyTagList"
            :key="index"
            class="tag"
            @tap="toPath(item)"
            >{{ item }}</view
          >
        </view>
      </view>
    </view>
    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog
        type="info"
        cancel-text="取消"
        confirm-text="确认"
        title="提示"
        content="确认清空历史记录?"
        @confirm="dialogConfirm"
        @close="dialogClose"
      ></uni-popup-dialog>
    </uni-popup>
  </i-sys>
</template>

<script>
  export default {
    name: "Search"
  };
</script>
<script setup>
  import { ref } from "vue";
  import ls from "@/ls";

  const alertDialog = ref(null);
  const historyTagList = ref([]);
  const searchVal = ref("");
  const storeId = ref();
  const type = ref();

  function load(e) {
    getLocation();
    const { storeId: id, type: t } = e;
    storeId.value = id;
    type.value = t;
  }
  function dialogClose() {
    alertDialog.value.close();
  }
  function deleteIcon() {
    alertDialog.value.open();
  }
  function dialogConfirm() {
    historyTagList.value = [];
  }
  function getLocation() {
    const v = ls.get("historyTagList");
    if (v) {
      historyTagList.value = v;
    }
  }
  function toPath(v) {
    uni.navigateTo({
      url: `/pages/home/merchants/search-result?storeId=${storeId.value}&keyWords=${v}&type=${type.value}`
    });
  }
  function search() {
    if (searchVal.value) {
      setLocation(searchVal.value);
    }
    uni.navigateTo({
      url: `/pages/home/merchants/search-result?storeId=${storeId.value}&keyWords=${searchVal.value}&type=${type.value}`
    });
  }

  function setLocation(v) {
    if (historyTagList.value.some((i) => i === v)) return;
    historyTagList.value.push(v);
    ls.set("historyTagList", historyTagList.value);
  }
</script>

<style scoped lang="scss">
  .search-content {
    padding: 44rpx 32rpx;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 24rpx;
        color: #333333;
      }
      .delete-icon {
        width: 36rpx;
        height: 36rpx;
      }
    }
    .tags-list {
      padding-top: 36rpx;
    }
    .tag {
      font-size: 24rpx;
      display: inline-block;
      color: #ff5f00;
      line-height: 40rpx;
      padding: 8rpx 16rpx;
      border-radius: 8rpx;
      margin: 0 16rpx 16rpx 0;
      background: #ffefe6;
    }
  }
  .search-box {
    background-color: #fff;
    padding: 24rpx 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .box {
      position: relative;
    }
    .search-icon {
      position: absolute;
      top: 16rpx;
      left: 36rpx;
      z-index: 10;
      width: 28rpx;
      height: 28rpx;
    }
    .search-input {
      width: 614rpx;
      box-sizing: border-box;
      border-radius: 60rpx;
      height: 56rpx;
      line-height: 56rpx;
      background: #eee;
      padding: 0 24rpx 0 72rpx;
    }
    .search-text {
      line-height: 40rpx;
      color: #ff5f00;
      font-size: 24rpx;
    }
  }
  :deep(.placeholder-class) {
    font-size: 24rpx;
    color: #999;
  }
</style>
