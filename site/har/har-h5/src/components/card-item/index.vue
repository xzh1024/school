<template>
  <!-- <view
    class="card-container"
    :style="{
      'background-color': item.cardFaceType === 1 ? item.cardFaceColor : '#000'
    }"
    @click="onClick"
  > -->
  <view
    class="card-container"
    :style="{
      'background-color': '#000'
    }"
    @click="onClick"
  >
    <image
      v-if="item.cardFaceType === 2 && item.cardFaceColor"
      class="card-bg"
      :src="item.cardFaceColor"
    ></image>
    <view class="card-contnet">
      <view class="card-text">
        <view class="card-project-name">{{ item.projectName }}</view>
        <view class="card-name">
          {{ cardName || item.cardName || item.name }}
        </view>
      </view>
      <image
        v-if="
          item.cardFaceType === 1 && (item.cardFaceIcon || item.defaultLogoImg)
        "
        class="card-icon"
        mode="aspectFill"
        :src="item.cardFaceIcon || item.defaultLogoImg"
      ></image>
    </view>
    <view class="card-footer">
      <view class="card-footer-content">
        <view v-if="item.activeStatus" class="card-status">
          {{ item.activeStatus === 2 ? "已激活" : "未激活" }}
        </view>
        <view v-if="showProjectName" class="m-t-8">
          {{ `${item.projectName}·${item.cardName || item.name}` }}
        </view>
        <view class="m-t-8">{{ item.cardContent }}</view>

        <view v-if="item.cardDetail" class="card-detail">
          {{ item.cardDetail }}
        </view>
      </view>
      <view v-if="item.salePrice" class="card-footer-append">
        <text class="card-price"> {{ item.salePrice }} </text>
        <!-- <text class="card-price-unit">起</text> -->
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  const props = defineProps({
    item: {
      type: Object,
      default: () => {
        return {};
      }
    },
    disabled: {
      type: Boolean
    },
    cardName: {
      type: String,
      default: ""
    },
    showProjectName: {
      type: Boolean
    }
  });
  const emits = defineEmits(["onClick"]);
  const onClick = () => {
    emits("onClick", props.item);
  };
</script>

<style scoped lang="scss">
  .m-t-8 {
    margin-top: 16rpx;
  }
  .card-container {
    width: 100%;
    height: 320rpx;
    padding: 32rpx;
    border-radius: 16rpx;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 28rpx;
    word-break: break-all;
    .card-bg {
      position: absolute;
      z-index: -1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    color: #ffffff;
    .card-contnet {
      display: flex;
      align-items: center;
      .card-text {
        flex: 1;
        .card-project-name {
          font-size: 32rpx;
          line-height: 48rpx;
        }
        .card-name {
          font-size: 28rpx;
          line-height: 44rpx;
        }
      }
      .card-icon {
        width: 88rpx;
        height: 88rpx;
        border-radius: 90rpx;
      }
    }
    .card-footer {
      display: flex;
      align-items: flex-end;
      .card-footer-content {
        flex: 1;
        .card-status {
          flex: none;
          font-size: 24rpx;
          line-height: 40rpx;
        }
        .card-detail {
          font-size: 24rpx;
          line-height: 40rpx;
        }
      }
      .card-footer-append {
        flex: none;
        .card-price {
          line-height: 48rpx;
          font-size: 32rpx;
          font-weight: bold;
        }
        .card-price-unit {
          font-size: 24rpx;
        }
      }
    }
  }
</style>
