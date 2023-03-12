<template>
  <view class="choose-time">
    <view class="title-box">
      <view>选择时间</view>
      <view v-if="startTime || endTime" class="icon-clear" @click="onClear"
        >清除</view
      >
    </view>
    <view class="select-box">
      <i-date-picker @date-change="onStart">
        <view
          class="flex-select"
          :class="{ 'flex-selected': dateRange.startDate }"
        >
          {{ startTime === "" ? "开始时间" : startTime }}
          <image
            v-if="startTime"
            class="icon-down"
            src="@/static/card/record/icon-caret-down.png"
          />
          <image
            v-else
            class="icon-down"
            src="@/static/card/record/icon-caret-down-off.png"
          />
        </view>
      </i-date-picker>
      <view> 至 </view>
      <i-date-picker @date-change="onEnd">
        <view
          class="margin-l-4 flex-select"
          :class="{ 'flex-selected': dateRange.endDate }"
        >
          {{ endTime === "" ? "结束时间" : endTime }}
          <image
            v-if="endTime"
            class="icon-down"
            src="@/static/card/record/icon-caret-down.png"
          />
          <image
            v-else
            class="icon-down"
            src="@/static/card/record/icon-caret-down-off.png"
          />
        </view>
      </i-date-picker>
    </view>
  </view>
</template>

<script setup lang="ts">
  import IDatePicker from "@/components/i-date-picker/i-date-picker.vue";
  const props = defineProps({
    dateRange: {
      type: Object,
      default: () => {}
    }
  });

  const emits = defineEmits(["update:dateRange"]);

  let startTime = props.dateRange.startDate;
  let endTime = props.dateRange.endDate;

  const onStart = (data: string) => {
    if (endTime && compareData(data, endTime))
      return uni.showToast({ title: "请选择正确的时间", icon: "none" });
    startTime = data;
    //@todo 开始时间 结束时间选择校验
    emits("update:dateRange", { startDate: data, endDate: endTime });
  };

  const onEnd = (data: string) => {
    if (startTime === "")
      return uni.showToast({ title: "请选择开始时间", icon: "none" });
    if (compareData(startTime, data))
      return uni.showToast({ title: "请选择正确的时间", icon: "none" });
    endTime = data;
    //@todo 开始时间 结束时间选择校验
    emits("update:dateRange", { startDate: startTime, endDate: data });
  };

  const compareData = (start: any, end: any) => {
    const temp1 = new Date(start);
    const temp2 = new Date(end);
    return temp1 > temp2;
  };

  const onClear = () => {
    startTime = "";
    endTime = "";
    emits("update:dateRange", { startDate: "", endDate: "" });
  };
</script>

<style scoped lang="scss">
  .margin-l-4 {
    margin-left: 8rpx;
  }
  .choose-time {
    // border-bottom: 1px solid #f0f0f0;
    .title-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 36rpx;
      color: #383840;
      .icon-clear {
        font-size: 28rpx;
        color: #ff7200;
      }
    }
    .select-box {
      font-size: 28rpx;
      color: #9c9ca0;
      margin-top: 16rpx;
      display: flex;
      align-items: center;
      .flex-select {
        min-width: 170rpx;
        display: flex;
        align-items: center;

        &.flex-selected {
          color: #070a16;
        }
      }
      .icon-down {
        height: 40rpx;
        width: 40rpx;
      }
    }
  }
</style>
