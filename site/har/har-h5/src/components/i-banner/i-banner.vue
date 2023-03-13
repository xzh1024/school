<template>
  <view class="banner-container">
    <swiper
      :style="{ width: '100%', height: '340rpx' }"
      :indicator-dots="swiperConfig.indicatorDots"
      :indicator-color="swiperConfig.indicatorColor"
      :indicator-active-color="swiperConfig.indicatorActiveColor"
      :autoplay="swiperConfig.autoplay"
      :interval="swiperConfig.interval"
      :duration="swiperConfig.duration"
      :circular="swiperConfig.circular"
      :previous-margin="swiperConfig.previousMargin"
      :next-margin="swiperConfig.nextMargin"
      @change="swiperChange"
      @animationfinish="animationfinish"
    >
      <swiper-item v-for="(item, i) in bannerList" :key="i">
        <!-- 1.当前展示为第1项时，bannerList最后一项和第二项的justifyContent值分别为flex-end和flex-start，其余项值为center -->
        <!-- 2.当前展示为最后一项时，bannerList倒数第2项和第1项的justifyContent值分别为flex-end和flex-start，其余项值为center -->
        <!-- 3.当前展示为其他项（非第1和最后1项）时，bannerList当前项的前1项和后1项的justifyContent值分别为flex-end和flex-start，其余项值为center -->
        <!-- 4.padding值也需要根据不同项设定不同值，但理同justifyContent -->
        <view
          class="image-container"
          :class="[
            curIndex === 0
              ? i === listLen - 1
                ? 'item-left'
                : i === 1
                ? 'item-right'
                : 'item-center'
              : curIndex === listLen - 1
              ? i === 0
                ? 'item-right'
                : i === listLen - 2
                ? 'item-left'
                : 'item-center'
              : i === curIndex - 1
              ? 'item-left'
              : i === curIndex + 1
              ? 'item-right'
              : 'item-center'
          ]"
        >
          <view
            class="slide-image"
            :style="{
              transform: curIndex === i ? 'scale(1,1)' : `scale(${scale})`,
              transitionDuration: '.3s',
              transitionTimingFunction: 'ease'
            }"
          >
            <slot name="item" :index="i" :item="item"></slot>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script setup lang="ts">
  import { computed, ref } from "vue";

  const props = defineProps({
    bannerList: {
      type: Array,
      default() {
        return [];
      }
    }
  });
  const emits = defineEmits(["change"]);
  const listLen = computed(() => props.bannerList.length);

  const scale = 0.96;
  const swiperConfig = {
    indicatorDots: false,
    indicatorColor: "rgba(255, 255, 255, .4)",
    indicatorActiveColor: "rgba(255, 255, 255, 1)",
    autoplay: false,
    interval: 3000,
    duration: 300,
    circular: false,
    previousMargin: "58rpx",
    nextMargin: "58rpx"
  };

  const curIndex = ref(0);
  const descIndex = ref(0);
  const isDescAnimating = ref(false);

  function swiperChange(e: any) {
    curIndex.value = e.detail.current;
    isDescAnimating.value = true;
    emits("change", curIndex.value);
    const timer = setTimeout(function () {
      descIndex.value = e.detail.current;
      clearTimeout(timer);
    }, 150);
  }

  function animationfinish() {
    isDescAnimating.value = false;
  }
</script>
<style lang="scss" scoped>
  .banner-container {
    width: 100%;
    margin-top: 32rpx;
    .image-container {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      .slide-image {
        // width: 638rpx;
        // height: 340rpx;
        width: 100%;
        height: 100%;
        z-index: 200;
        border-radius: 24rpx;
        overflow: hidden;
        background-color: #ddd;
      }
    }
    .item-left {
      justify-content: flex-end;
      padding: 0 12rpx 0 0;
    }
    .item-right {
      justify-content: flex-start;
      padding: 0 0 0 12rpx;
    }
    .item-center {
      justify-content: center;
      padding: 0;
    }

    @keyframes descAnimation {
      0% {
        opacity: 1;
      }
      25% {
        opacity: 0.5;
      }
      50% {
        opacity: 0;
      }
      75% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
    @-webkit-keyframes descAnimation {
      0% {
        opacity: 1;
      }
      25% {
        opacity: 0.5;
      }
      50% {
        opacity: 0;
      }
      75% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
    .hideAndShowDesc {
      animation: descAnimation 0.3s ease 1;
      -webkit-animation: descAnimation 0.3s ease 1;
    }
  }
</style>
