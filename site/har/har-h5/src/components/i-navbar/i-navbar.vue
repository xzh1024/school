<template>
  <i-fixed
    :no-fixed="noFixed"
    :index="1000"
    no-nav
    :bg="bg"
    :ui="ui"
    :opacity="opacity"
    :opacity-val="opacityVal"
    :placeholder="placeholder"
  >
    <view
      class="i-navbar-box"
      :class="{
        'border-bottom': !opacity && bg !== 'bg-none' && bg !== 'bg-coupon'
      }"
      :style="boxStyle"
    >
      <view
        class="i-bar"
        :style="barStyle"
        :class="theme === 'light' ? 'text-white' : 'text-black'"
      >
        <slot>
          <view class="left">
            <template v-if="back">
              <view v-if="capsule" class="capsule" :style="capsuleBack">
                <view v-if="!isFirstPage" class="capsule-back" @tap="navback">
                  <!--                  <text class="_icon-back"></text>-->
                  <uni-icons type="back" size="24" />
                  <!-- <image
                    class="home-icon"
                    src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/icon/back-icon.png"
                  /> -->
                </view>
                <view class="capsule-home" @tap="toHome">
                  <uni-icons type="home" size="24" />
                  <!-- <image
                    class="home-icon"
                    src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/icon/home-icon.png"
                  /> -->
                  <!--                  <text :class="isFirstPage ? '_icon-home' : '_icon-home-o'"/>-->
                </view>
              </view>
              <view v-else class="back" @tap="navback">
                <uni-icons v-if="isFirstPage" type="home" size="24" />
                <uni-icons v-else type="back" size="24" />
                <!-- <image
                  class="home-icon"
                  :src="
                    isFirstPage
                      ? 'https://har-cbd-cdn.huianrong.com/har-cbd/applet/icon/home-icon.png'
                      : 'https://har-cbd-cdn.huianrong.com/har-cbd/applet/icon/back-icon.png'
                  "
                ></image> -->
                <!--                <view class="back-icon" :class="[isFirstPage ? '_icon-home-o': '_icon-back', { opacityIcon: opacityBg }]">-->
                <!--                </view>-->
                <view>{{ backText }}</view>
              </view>
            </template>
            <slot name="left"></slot>
          </view>
          <view v-if="$slots.center" class="center">
            <slot name="center" class="center"></slot>
          </view>
          <view
            v-if="$slots.right || (!$slots.right && $slots.center)"
            class="right"
          >
            <view v-if="$slots.right" class="right-content">
              <slot name="right"></slot>
            </view>
            <!-- #ifdef MP -->
            <view :style="[capsuleStyle]"></view>
            <!-- #endif -->
          </view>
        </slot>
      </view>
    </view>
  </i-fixed>
</template>
<script setup>
  import { ref, computed, watch, getCurrentInstance } from "vue";
  import { useSysScrollTop } from "@/hooks/useSysScrollTop";
  import IFixed from "@/components/i-fixed/i-fixed";
  import { useAppStore } from "../../stores/app";
  const { statusBarHeight, windowWidth } = uni.getSystemInfoSync();
  // const frontColor = {
  //   light: "#ffffff",
  //   dark: "#000000"
  // }
  const props = defineProps({
    back: {
      //是否返回上一页
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: "dark",
      validate(val) {
        return ["light", "dark"].include(val);
      }
    },
    capsule: {
      //是否开启胶囊返回
      type: Boolean,
      default: false
    },
    backText: {
      //返回文本
      type: String,
      default: ""
    },
    noFixed: {
      //是否浮动
      type: Boolean,
      default: false
    },
    opacity: {
      //是否开启滑动渐变
      type: Boolean,
      default: false
    },
    opacityBg: {
      //开启滑动渐变后 返回按钮是否添加背景
      type: Boolean,
      default: false
    },
    bg: {
      type: String,
      default: "bg-blur"
    },
    ui: {
      type: String,
      default: ""
    },
    placeholder: {
      type: Boolean,
      default: true
    },
    stopBack: {
      type: Boolean,
      default: false
    }
  });
  const isFirstPage = computed(() => {
    return getCurrentPages().length === 1;
  });
  // watch(() => props.theme, (val) => {
  //   setTheme();
  // })
  // function setTheme() {
  //   uni.setNavigationBarColor({
  //     frontColor: frontColor[val],
  //     backgroundColor: "#FFFFFF"
  //   })
  // }

  const emit = defineEmits(["navback"]);
  function toHome() {
    // 根据实际情况调整；
    uni.switchTab({
      url: "/pages/home/home",
      fail(res) {
        console.log(res);
      }
    });
  }
  function navback() {
    if (props.stopBack) {
      emit("navback");
    } else {
      if (isFirstPage.value) {
        toHome();
      } else {
        uni.navigateBack({
          delta: 1,
          fail(res) {
            console.log(res);
          }
        });
      }
    }
  }

  const opacityVal = ref(0);
  const store = useAppStore();
  const boxStyle = computed(() => {
    return {
      paddingTop: statusBarHeight + "px",
      height: store.sysNavBar + "px"
    };
  });
  const barStyle = computed(() => {
    return { height: store.sysNavBar - statusBarHeight + "px" };
  });
  const capsuleStyle = computed(() => {
    const { sysCapsule } = store;
    return {
      width: sysCapsule.width + "px",
      height: sysCapsule.height + "px",
      margin: "0 " + (windowWidth - sysCapsule.right) + "px"
    };
  });
  const capsuleBack = computed(() => {
    const temp = { ...capsuleStyle.value };
    if (isFirstPage.value) {
      temp.width = temp.height;
    }
    return temp;
  });

  function opacityChangeStatus(e) {
    opacityVal.value = e > store.sysNavBar ? 1 : e * 0.01;
  }
  const { sysScrollTop } = useSysScrollTop();
  const instance = getCurrentInstance();
  const rootUid = instance.root.uid;
  watch(() => sysScrollTop[rootUid], opacityChangeStatus);
  // const type = "_scrollTop_" + rootUid;
  // onMounted(() => {
  //   uni.$on(type, opacityChangeStatus);
  // })
  // onUnmounted(() => {
  //   uni.$off(type, opacityChangeStatus);
  // })
</script>
<script>
  export default {
    name: "INavbar"
  };
</script>

<style lang="scss">
  .i-navbar-box {
    background-color: transparent;
    width: 100%;
    box-sizing: border-box;
    .i-bar {
      z-index: 2;
      white-space: nowrap;
      @include flex-bar;
      .left {
        @include flex-bar;
        flex: 1;
        .back {
          @include flex-bar;
          padding-left: 24rpx;
          &-icon {
            @include flex-center;
            margin: 0 10rpx;
            font-size: 20px;
            padding: 2px;
            &.opacityIcon {
              position: relative;
              border-radius: 50%;
              background-color: rgba(127, 127, 127, 0.5);
              &::after {
                content: "";
                display: block;
                position: absolute;
                height: 200%;
                width: 200%;
                left: 0;
                top: 0;
                border-radius: inherit;
                transform: scale(0.5);
                transform-origin: 0 0;
                opacity: 0.1;
                border: 1px solid currentColor;
                pointer-events: none;
              }
              &::before {
                transform: scale(0.9);
              }
            }
          }
        }

        .capsule {
          @include flex-bar;
          border-radius: 100px;
          position: relative;
          //padding-left: 24rpx;
          &.dark {
            background-color: rgba(255, 255, 255, 0.5);
          }
          &.light {
            background-color: rgba(0, 0, 0, 0.15);
          }
          &::after {
            content: "";
            display: block;
            position: absolute;
            height: 60%;
            width: 1px;
            left: 50%;
            top: 20%;
            background-color: currentColor;
            opacity: 0.1;
            pointer-events: none;
          }
          &::before {
            content: "";
            display: block;
            position: absolute;
            height: 200%;
            width: 200%;
            left: 0;
            top: 0;
            border-radius: inherit;
            transform: scale(0.5);
            transform-origin: 0 0;
            opacity: 0.1;
            border: 1px solid currentColor;
            pointer-events: none;
          }
          .capsule-back,
          .capsule-home {
            font-size: 20px;
            @include flex-center;
            flex: 1;
          }
          // &.isFristPage {
          //   .capsule-back {
          //     display: none;
          //   }
          // }
        }
      }
      .center {
        @include flex-center;
        text-overflow: ellipsis;
        text-align: center;
        flex: 2;
        .image {
          display: block;
          height: 36px;
          max-width: calc(100vw - 200px);
        }
      }
      .right {
        @include flex-bar;
        flex: 1;
        &-content {
          @include flex;
          flex-direction: row-reverse;
          flex: 1;
        }
      }
    }
    .i-bar-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      z-index: 1;
      pointer-events: none;
    }
  }
  .home-icon {
    width: 40rpx;
    height: 40rpx;
  }
</style>
