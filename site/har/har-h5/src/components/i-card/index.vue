<template>
  <view class="card" @tap="cardClick">
    <view v-if="titleShow" class="head">
      <slot name="title">
        <view class="flex align-center" @tap.stop="titleClick">
          <view class="title">{{ title }}</view>
          <image
            v-if="leftIcon"
            class="img-right"
            src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/icons/arrow.png"
          ></image>
        </view>
      </slot>
      <slot name="extra">
        <view class="status" @tap.stop="extraClick">{{ extraText }}</view>
      </slot>
    </view>
    <view class="item-cont" :style="{ padding: bodyPadding }">
      <slot></slot>
    </view>
    <view v-if="$slots.footer" class="footer">
      <view :class="footerBorderTop ? 'footer-border' : ''">
        <slot name="footer"></slot>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "ICard"
  };
</script>
<script setup>
  defineProps({
    // 标题
    title: {
      type: String,
      default: ""
    },
    titleShow: {
      type: Boolean,
      default: true
    },
    // 标题后 >图标是否展示
    leftIcon: {
      type: Boolean,
      default: true
    },
    // 右侧扩展文字展示
    extraText: {
      type: String,
      default: ""
    },
    // footer borderTop
    footerBorderTop: {
      type: Boolean,
      default: true
    },
    bodyPadding: {
      type: String,
      default: "24rpx 32rpx"
    }
  });
  const emits = defineEmits(["cardClick", "titleClick", "extraClick"]);
  function cardClick() {
    emits("cardClick");
  }
  function titleClick() {
    emits("titleClick");
  }
  function extraClick() {
    emits("extraClick");
  }
</script>

<style scoped lang="scss">
  .card {
    background-color: #fff;
    border-radius: 16rpx;
    padding-bottom: 24rpx;
    box-shadow: 0 4rpx 8rpx 0 rgba(0, 0, 0, 0.1);
    // margin-bottom: 24rpx;
    margin-bottom: 32rpx;
    .head {
      border-bottom: 1rpx solid #eaeaea;
      padding: 24rpx 32rpx;
      display: flex;
      justify-content: space-between;
    }

    .title {
      max-width: 340rpx;
      font-size: 28rpx;
      color: #333;
      line-height: 44rpx;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .status {
      color: #ff5f00;
      line-height: 44rpx;
      font-size: 28rpx;
    }

    .img-right {
      width: 10rpx;
      height: 16rpx;
      margin-left: 20rpx;
    }

    .item-cont {
      //padding: 24rpx 32rpx;
    }
    .footer {
      padding: 0 32rpx;
      .footer-border {
        border-top: 1px dashed #eaeaea;
        padding-top: 24rpx;
      }
    }
  }
</style>
