<template>
  <view class="item-box" @click="onClick">
    <!--封面图 -->
    <view class="cover-box">
      <image
        class="image-style"
        :src="fixImage(bgImage, { h: 440 })"
        mode="aspectFill"
      />
    </view>
    <!--活动状态-->
    <view class="status-tag" :style="{ background: activityStatus?.color }">{{
      activityStatus?.name
    }}</view>
    <!--活动报名倒计时-->
    <view v-if="item.status === 4" class="join-count-down-box">
      <template v-if="isEndSignUp">
        <view class="text-orange">活动报名已开始</view>
      </template>
      <template v-else>
        <view>{{ signUpCountDown }}</view>
      </template>
    </view>
    <!--活动信息-->
    <view class="info-box">
      <view class="activity-name">{{ item.name }}</view>
      <view class="flex">
        <!-- 活动信息区域 -->
        <view class="left-info-box">
          <view class="text-xs text-color-9 margin-bottom-8"
            >{{ item.activityType }}|{{ item.signupNum }}人参与</view
          >
          <view
            v-if="[3, 4, 5, 6].includes(item.status)"
            class="flex text-xs text-color-9"
          >
            <template v-if="isEndActivity">
              <view class="text-orange">活动进行中</view>
            </template>
            <view v-else>
              <view>{{ activityStartCountDown }}</view>
            </view>
          </view>
        </view>
        <!-- 按钮区域 -->
        <view class="right-btn-box">
          <button
            v-if="item.signupStatus === 0"
            :class="item.status === 4 ? 'i-active' : ''"
            type="primary"
            class="i-button"
            >立即报名</button
          >
          <button
            v-else-if="item.signupStatus === 1"
            type="primary"
            class="i-active i-button"
            >去付款</button
          >
          <button
            v-else-if="item.signupStatus === 2"
            type="primary"
            class="i-button"
            >已报名</button
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { computed, ref, onMounted, watch } from "vue";
  import { activityStatusArr } from "@/pages/user/dic";
  import dayjs from "dayjs";
  import { CurrentTime, useCountDown } from "@har/use";
  import { fixImage } from "@/utils";

  defineEmits(["click"]);

  const props = defineProps({
    item: {
      type: Object,
      default: () => {}
    }
  });
  // const props = defineProps<{
  //   item: {
  //     name: string;
  //     activityType: string;
  //     signupStartTime: number;
  //     activityStartTime: number;
  //     signupStatus: 0 | 1 | 2;
  //     status: number;
  //     signupNum: number;
  //   };
  // }>();
  onMounted(() => {
    activityJoinTime(props.item.signupStartTime);
    activityStartTime(props.item.activityStartTime);
  });

  //----------活动报名开始倒计时 start-----------//
  const signUpCountDown = ref("");
  const isEndSignUp = ref(false); //倒计时是否停止
  const {
    start: startSignUp,
    current: currentSignUp,
    reset: resetSignUp
  } = useCountDown({
    time: 0,
    onFinish: () => {
      isEndSignUp.value = true;
    }
  });
  const activityJoinTime = (timeStamp: number) => {
    const nowTimeStamp = dayjs().valueOf();
    const diffTime = timeStamp - nowTimeStamp;
    if (diffTime > 0) {
      resetSignUp(diffTime);
      startSignUp();
    } else {
      signUpCountDown.value = "活动报名已开始";
      isEndSignUp.value = true;
    }
  };
  watch(
    () => currentSignUp.value,
    (newVal) => {
      signUpCountDown.value = getDate(newVal, "活动报名开始");
    },
    {
      deep: true
    }
  );
  //----------活动报名倒计时 end-----------//

  //----------活动开始倒计时 start-----------//
  const activityStartCountDown = ref("");
  const isEndActivity = ref(false); //倒计时是否停止
  const {
    start: startActivity,
    current: currentActivity,
    reset: resetActivity
  } = useCountDown({
    time: 0,
    onFinish: () => {
      isEndActivity.value = true;
    }
  });
  const activityStartTime = (timeStamp: number) => {
    const nowTimeStamp = dayjs().valueOf();
    const diffTime = timeStamp - nowTimeStamp;
    if (diffTime > 0) {
      resetActivity(diffTime);
      startActivity();
    } else {
      activityStartCountDown.value = "活动进行中";
      isEndActivity.value = true;
    }
  };
  watch(
    () => currentActivity.value,
    (newVal) => {
      activityStartCountDown.value = getDate(newVal, "活动开始");
    },
    {
      deep: true
    }
  );
  //----------活动开始倒计时 end-----------//

  const getDate = (data: CurrentTime, moreContent: string) => {
    const { days, hours, minutes, seconds } = data;
    return `${formatNum(days)}天${formatNum(hours)}时${formatNum(
      minutes
    )}分${formatNum(seconds)}秒${moreContent}`;
  };

  const formatNum = (num: number) => {
    return num > 9 ? num : "0" + num;
  };

  /**
   * 点击事件
   */
  const onClick = () => {
    // emits("click", props.item)
    uni.navigateTo({
      url: "/pages/activity/detail?id=" + props.item.id
    });
  };

  const bgImage = computed(() => {
    return props.item?.coverPic;
  });

  const activityStatus = computed(() => {
    return activityStatusArr.find(
      (item) => Number(item.value) === Number(props.item.status)
    );
  });
</script>

<style scoped lang="scss">
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .text-lg {
    font-size: 32rpx;
  }
  .text-xs {
    font-size: 24rpx;
  }
  .text-b6 {
    color: #b6b6b6;
  }
  .text-color-9 {
    color: #999999;
  }
  .text-orange {
    color: #ff5f00;
  }
  .margin-bottom-8 {
    margin-bottom: 16rpx;
  }
  .i-active {
    background: #ff5f00 !important;
    color: #ffffff !important;
  }
  .i-button {
    width: 234rpx;
    height: 60rpx;
    background: #e6e6e6;
    border-radius: 30rpx;
    font-size: 24rpx;
    margin: 0;
    color: #999999;
    &::after {
      border: none;
    }
  }
  .item-box {
    width: 100%;
    border-radius: 16rpx;
    background: #ffffff;
    margin-bottom: 24rpx;
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
    .cover-box {
      width: 100%;
      height: 440rpx;
      background: #e6e6e6;
      .image-style {
        height: 100%;
        width: 100%;
      }
    }
    .info-box {
      height: 136rpx;
      width: stretch;
      background: #ffffff;
      padding: 24rpx 32rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .activity-name {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #333333;
      }
    }
  }
  .status-tag {
    position: absolute;
    top: 0;
    left: 0;
    height: 36px;
    padding: 0 20rpx;
    border-radius: 16rpx 0 16rpx 0;
    color: #ffffff;
    font-size: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .join-count-down-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 24rpx;
    color: #ffffff;
    position: absolute;
    top: 16rpx;
    right: 32rpx;
  }
</style>
