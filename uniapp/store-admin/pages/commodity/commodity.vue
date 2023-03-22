<template>
  <view class="sort-view">
    <!-- 左边 -->
    <view class="sort-left">
      <view>膨化食品</view>
    </view>
    <!-- 右边 -->
    <view class="sort-right">
      <view class="commodity-item">
        <view class="com-image">
          <image src="" mode="aspectFit" />
        </view>
        <view class="com-price">
          <text class="com-title over-text">良品铺子 猪事顺利巨型大礼包</text>
          <text class="stock-view">库存 100</text>
          <text class="real-price">¥10.00</text>
          <view class="button-rig">
            <text>下架</text>
          </view>
        </view>
      </view>
    </view>
  </view>
  <view class="sort-bottom">
    <text @click="goF">管理分类</text>
    <text>添加商品</text>
  </view>
</template>

<script setup>
const goF = () => {
  uni.navigateTo({
    url: '/pages/sort-admin/sort'
  })
}
</script>

<style scoped lang="scss">
.sort-view {
  height: 100vh;
  display: flex;
  .sort-left {
    width: 200rpx;
    flex: none;
  }
  .sort-right {
    // height: 100%;
    // background-color: #ffffff;
    flex: 1;
    margin: 0 20rpx 0 20rpx;
    .commodity-item {
      display: flex;
      flex-direction: row;
      .com-image {
        display: block;
        width: 150rpx;
        height: 150rpx;
        border-radius: 10rpx;
        margin-right: 10rpx;
        background-color: red;
      }
      .com-price {
        flex: 1;
        display: flex;
        flex-direction: column;
        .com-title {
          font-weight: bold;
        }
        .stock-view {
          padding: 10rpx 0;
          color: #c1c1c1;
          font-size: 26rpx;
        }
        .real-price {
          color: #b1865b;
          font-weight: bold;
        }
        .button-rig {
          padding-top: 20rpx;
          text-align: right;
          text {
            margin-right: 10rpx;
            border-radius: 7rpx;
            padding: 7rpx 20rpx;
            font-size: 26rpx;
            padding: 4rpx 10rpx;
            background-color: #b1865b;
            color: #ffffff;
          }
        }
      }
    }
  }
}
.sort-bottom {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 200rpx;
  display: flex;
  justify-content: space-between;
  text {
    flex: 1;
    text-align: center;
    line-height: 60rpx;
    background-color: antiquewhite;
    &:last-child {
      background-color: aquamarine;
    }
  }
}
</style>
