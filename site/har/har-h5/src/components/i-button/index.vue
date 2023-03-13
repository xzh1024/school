<template>
  <view
    class="i-button"
    :class="btnClass"
    :style="btnStyle"
    :disabled="disabled"
    @tap.stop="handle"
  >
    <slot>{{ text }}</slot>
  </view>
</template>

<script setup>
  import { computed } from "vue";
  import { authUserInfo } from "@/utils/user";
  import useThrottle from "@/hooks/useThrottle";

  const props = defineProps({
    text: {
      type: String,
      default: ""
    },
    // 宽度
    width: {
      type: Number
    },
    // 圆角rpx
    radius: {
      type: Number
    },
    // 朴素按钮
    plan: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "primary" // primary  info  text
    },
    // 按钮大小
    size: {
      type: String,
      default: "small" //medium small
    },
    // 圆角
    round: {
      type: Boolean,
      default: false
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 无边框
    noBorder: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 0
    },
    fontSize: {
      type: Number,
      default: 28
    },
    opacity: {
      type: Number
    }
  });

  const emits = defineEmits(["click"]);

  const btnStyle = computed(() => {
    const width = props.width;
    const height = props.height;
    const radius = props.radius;
    const fontSize = props.fontSize;
    const opacity = props.opacity;
    const res = {};
    if (width) res.width = width + "rpx";
    if (opacity) res.opacity = opacity;
    if (height) res.height = height + "rpx";
    if (radius) res.borderRadius = radius + "rpx";
    if (fontSize) res.fontSize = fontSize + "rpx";
    return res;
  });
  const btnClass = computed(() => {
    const { round, size, type, plan, disabled, noBorder } = props;
    const res = [size, type];
    if (noBorder) res.push("border-none");
    if (round) res.push("round");
    if (plan) res.push("plan");
    if (disabled) res.push("disabled");
    return res;
  });

  const throttle = useThrottle();

  async function handle() {
    if (props.disabled) return;
    try {
      await authUserInfo();
      throttle(() => {
        emits("click");
      }, 500);
    } catch (e) {
      console.error(e);
    }
  }
</script>

<style lang="scss" scoped>
  .i-button {
    min-width: 126rpx;
    display: flex;
    white-space: nowrap;
    justify-content: center;
    align-items: center;
    height: 60rpx;
    //line-height:50rpx;
    box-sizing: border-box;
    padding: 0 24rpx;
    //border-radius: 100rpx;
    //font-size: 24rpx;
    font-weight: 500;
    &::after {
      display: none;
    }
    &.medium {
      //line-height: 78rpx;
      height: 72rpx;
      &.round {
        border-radius: 100rpx;
      }
    }
    &.mini {
      height: 36rpx;
    }
    &.disabled {
      opacity: 0.5;
      background: transparent !important;
    }
    &.round {
      border-radius: 40rpx;
    }
  }
  .i-button.primary {
    background: #ff5f00;
    color: #fff;
    &.plan {
      border: 1rpx solid #ff5f00;
      transform: rotateZ(360deg);
      color: #ff5f00;
      background: #ffefe6;
      &.border-none {
        border: none;
      }
    }
  }
  .i-button.danger {
    background: #fa0e33;
    color: #fff;
    width: 108rpx;
    &.plan {
      border: 1rpx solid #fa0e33;
      transform: rotateZ(360deg);
      color: #fa0e33;
      background: #fff;
      &.border-none {
        border: none;
      }
    }
  }
  .i-button.info {
    background: #c9cdd4;
    color: #fff;
    &.plan {
      border: 1rpx solid #c9cdd4;
      transform: rotateZ(360deg);
      color: #c9cdd4;
      background: #fff;
      &.border-none {
        border: none;
      }
    }
  }
  .i-button.text {
    background: none;
    color: #ff5f00;
    border: none;
  }
</style>
