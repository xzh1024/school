<template>
  <i-sys title="搜索" nav-placeholder nav-bg="bg-white">
    <view class="container">
      <view class="container-search">
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
          <view class="search-text" @tap="handleSearch">搜索</view>
        </view>
      </view>
      <view class="container-history">
        <view class="container-history-search">
          <view class="history-search-title"> 历史搜索 </view>
          <view class="history-search-icon">
            <image
              v-if="historyList.length > 0"
              :src="trash"
              @click="handleDelHistory"
            ></image>
            <uni-popup ref="alertDialog" type="dialog">
              <uni-popup-dialog
                type="info"
                cancel-text="取消"
                confirm-text="确认"
                title="提示"
                content="是否清空当前历史数据?"
                @confirm="dialogConfirm"
              />
            </uni-popup>
          </view>
        </view>
        <view
          v-for="(item, index) in historyList"
          :key="index"
          class="history-search-tag"
        >
          <view class="i-tag" @click="onChoose(item)">{{ item.value }}</view>
        </view>
      </view>
    </view>
  </i-sys>
</template>

<script setup>
  import { ref } from "vue";
  import { onLoad, onShow } from "@dcloudio/uni-app";
  // 本地存储
  import { setStoraged, getStoraged, removeStoraged } from "@/utils/storage";

  import { trash } from "@/utils/imgUrl";

  const searchVal = ref("");

  onLoad((options) => {
    console.log(options);
    optionsNum.value = options.num;
  });

  onShow(() => {
    console.log(getStoraged("searchHistoryList"), "-----");
    historyList.value = getStoraged("searchHistoryList") || [];
    /*if (getStoraged('searchHistoryList')) historyList.value = getStoraged('searchHistoryList')*/
  });

  // const handleBack = () => {
  //   uni.navigateBack({
  //     delta: 1
  //   });
  // };
  /**
   * @param 搜索
   * @param {searchKey} 关键词
   * @param {pageNum} 当前记录起始索引（默认为1）
   * @param {pageSize} 每页显示记录数（默认为10）
   */
  const optionsNum = ref("");
  // const data = ref([]);
  const handleSearch = async () => {
    if (!searchVal.value)
      return uni.showToast({
        title: "请输入搜索内容",
        duration: 1500,
        icon: "none"
      });
    // 本地存储
    if (
      searchVal.value &&
      !historyList.value?.some((i) => i.value === searchVal.value)
    ) {
      historyList.value.push({
        searchType: optionsNum.value,
        value: searchVal.value
      });
      setStoraged("searchHistoryList", historyList.value);
    }
    uni.navigateTo({
      url: `/pages/home/search/searchDetail/searchDetail?key=${searchVal.value}&searchType=${optionsNum.value}`
    });
  };

  const onChoose = (item) => {
    console.log(item);
    const { searchType, value } = item;
    uni.navigateTo({
      url: `/pages/home/search/searchDetail/searchDetail?key=${value}&searchType=${searchType}`
    });
  };

  /**
   * @param 历史记录操作
   */
  const historyList = ref([]);

  // 打开模态框
  const alertDialog = ref(null);
  const handleDelHistory = () => {
    alertDialog.value.open();
  };
  const dialogConfirm = () => {
    historyList.value = [];
    removeStoraged("searchHistoryList");
  };
</script>

<style lang="scss" scoped>
  @import "./search.scss";
  .container {
    padding: 0;
  }
  :deep(.placeholder-class) {
    font-size: 24rpx;
    color: #999;
  }
  :deep(.uni-button-color) {
    color: #ff5f00;
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
      font-size: 24rpx;
    }
    .search-text {
      line-height: 40rpx;
      color: #ff5f00;
      font-size: 24rpx;
    }
  }
  .history-search-tag {
    .i-tag {
      height: 56rpx;
      background: #ffefe6;
      border-radius: 8rpx;
      color: #ff5f00;
      font-size: 24rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 16rpx;
      margin-right: 16rpx;
    }
  }
</style>
