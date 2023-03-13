<template>
  <view class="level-box">
    <view class="title-box">
      <view class="text-sm text-brown-light">我的会员</view>
      <view class="text-xs text-brown">
        <slot></slot>
      </view>
    </view>
    <view class="content-box">
      <view class="level-name flex">
        <view class="text-lg text-brown-light">{{ memberInfo.levelName }}</view>
        <view class="level-tag flex">{{ memberInfo.levelDefaultName }}</view>
      </view>
      <view class="exp-box flex">
        <view class="text-sm text-brown-light">{{ memberInfo.levelBean }}</view>
        <view class="text-brown">&nbsp;|&nbsp;</view>
        <view class="text-xs text-brown">{{ memberInfo.nextLevelBean }}</view>
      </view>
      <view class="progress-box">
        <view class="progress" :style="{ background: newBackGround }"></view>
        <view class="progress-name-box">
          <view
            v-for="(item, index) in showLevelArr"
            :key="index"
            class="name-cell"
          >
            {{ item.levelDefaultName }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "MemberLevel"
  };
</script>
<script setup>
  import { computed } from "vue";
  const props = defineProps({
    memberInfo: {
      type: Object,
      default: () => {}
    },
    levelInfo: {
      type: Object,
      default: () => {}
    }
  });

  const newBackGround = computed(() => {
    let value = 0;
    if (nowLevelIndex.value > 0) {
      value = nowLevelIndex.value * 25;
      const { nextLevelBean, levelBean } = props.memberInfo;
      // console.log(nowLevelBean.value.levelBean, "当前等级起始点");
      // console.log(levelBean, "当前等级等级豆");
      // console.log(nextLevelBean, "下级等级等级豆");
      value +=
        ((levelBean - nowLevelBean.value.levelBean) /
          (nextLevelBean - levelBean)) *
        10;
      // nextLevelBean - levelBean
      // console.log(nowLevelIndex.value, "--nowLevelIndex--");
      // console.log((nowLevelIndex.value + 1) % 5);
      //value = (nowLevelIndex.value + 1) % 5 * 20
      // const { nextLevelBean, levelBean } = props.memberInfo;
      // value += ((levelBean - nowLevelBean.value.levelBean)/(nextLevelBean - levelBean)) * 10
      // const [nextLevelBean, levelBean] = [150, 300];
      // value += (180 - levelBean)/(nextLevelBean - levelBean) * 10;
    }
    return "linear-gradient(to right, #FCE6BD " + value + "%, #6C5842 0%)";
  });

  /**
   * 等级体系总长度
   */
  const levelArrLength = computed(() => {
    return props.levelInfo.length;
  });

  const nowLevelBean = computed(() => {
    return props.memberInfo.levelId
      ? props.levelInfo.find(
          (item) => item.levelId === props.memberInfo.levelId
        )
      : "";
  });

  /**
   * 当前等级所处下标
   */
  const nowLevelIndex = computed(() => {
    return props.memberInfo.levelId
      ? props.levelInfo.findIndex(
          (item) => item.levelId === props.memberInfo.levelId
        )
      : "";
  });

  /**
   * 展示的等级体系
   */
  const showLevelArr = computed(() => {
    if (levelArrLength.value.length < 5) {
      return props.levelInfo;
    } else {
      if (nowLevelIndex.value >= 4) {
        if (levelArrLength.value < 10) {
          console.log("长度小于10");
          return props.levelInfo.slice(-5);
        } else {
          console.log("长度大于10");
          const start = Math.floor(nowLevelIndex.value / 5) * 5;
          const end = (Math.floor(nowLevelIndex.value / 5) + 1) * 5;
          return props.levelInfo.slice(start, end);
        }
      } else {
        return props.levelInfo.slice(0, 5);
      }
    }
  });
</script>

<style scoped lang="scss">
  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .text-xs {
    font-size: 24rpx;
  }
  .text-sm {
    font-size: 28rpx;
  }
  .text-lg {
    font-size: 32rpx;
  }
  .text-brown-light {
    color: #f8d8ab;
  }
  .text-brown {
    color: #8c683e;
  }
  .level-box {
    border-radius: 12rpx;
    background: #30271d;
    box-shadow: 0 8rpx 16rpx 2rpx rgba(0, 0, 0, 0.08);
    .title-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #523f2a;
      padding: 24rpx 32rpx;
    }
    .content-box {
      padding: 24rpx 32rpx;
      .level-name {
        .level-tag {
          width: 72rpx;
          height: 40rpx;
          background: #ff5f00;
          border-radius: 8rpx;
          font-size: 24rpx;
          color: #ffffff;
          margin-left: 16rpx;
        }
      }
      .exp-box {
        margin: 12px 0 9px 0;
      }
      .progress-box {
        display: flex;
        flex-direction: column;
        .progress {
          height: 4rpx;
          overflow: hidden;
          border-radius: 2px;
        }
        .progress-name-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 16rpx;
          .name-cell {
            font-size: 24rpx;
            color: #8c683e;
          }
        }
      }
    }
  }
</style>
