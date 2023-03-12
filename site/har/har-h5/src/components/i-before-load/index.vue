<template>
  <!---默认未加载展示-->
  <!--加载错误展示--->
  <!----->
  <!----->
  <view>
    <slot v-if="status === 'loaded'"></slot>
    <view v-else>
      <view
        class="before"
        :class="status === 'loaded' ? '' : 'fixed'"
        @click="refresh"
      >
        <view class="content">
          <view
            class="content-loading"
            :class="status === 'loading' ? 'animated' : ''"
          >
            <image
              v-if="status === 'loading'"
              class="img"
              src="https://har-cbd-cdn.huianrong.com/har-cbd/har-cbd/applet/icons/loading.png"
            ></image>
            <image
              v-else
              class="img"
              src="https://har-cbd-cdn.huianrong.com/har-cbd/har-cbd/applet/icons/loading-error.png"
            ></image>
          </view>
          <view
            >{{ status === "loading" ? "努力加载中..." : "加载失败,轻触刷新" }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import { ref, watch } from "vue";

  const count = ref(0);
  const props = defineProps({
    status: {
      type: String,
      default: "loading",
      validator: (v) => {
        return ["loading", "fail", "loaded"].includes(v);
      }
    }
  });

  watch(props.status, (v) => {
    if (v) count.value++;
  });

  const emits = defineEmits(["refresh"]);
  function refresh() {
    if (props.status === "fail") {
      emits("refresh");
    }
  }
</script>

<style lang="scss" scoped>
  .fixed.before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    color: #ddd;
    font-size: 28rpx;
    line-height: 40rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .content-loading {
    margin-bottom: 12rpx;
    width: 60rpx;
    height: 60rpx;
    .img {
      width: 100%;
      height: 100%;
    }
    &.animated {
      animation: rotate-name 3s ease infinite;
    }
  }
  @keyframes rotate-name {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
