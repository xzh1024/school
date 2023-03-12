<template>
  <view class="time-item">
    <view class="title">
      <view> {{ cellInfo.title }}{{ `（${cellInfo.timeRange}）` }} </view>
      <view class="price">
        <view class="text-xs">每小时</view>
        <view class="price-num">
          <view class="text-xs">￥</view>
          <view class="text-lg">{{ cellInfo.salePrice }}</view>
        </view>
      </view>
    </view>
    <view class="time-box">
      <view
        v-for="(item, index) in newTimeRange"
        :key="index"
        :class="[
          item.state === 2 ? 'disabled' : '',
          item.checked ? 'active' : ''
        ]"
        class="time-cell"
        @click="onChoose(item, cellInfo.salePrice, cellInfo.skuId)"
      >
        {{ `${item.start}-${item.end}` }}
      </view>
    </view>
  </view>
</template>

<script setup>
  import { computed } from "vue";
  import { usePlaceStore } from "@/stores/place";
  const store = usePlaceStore();
  const props = defineProps({
    cellInfo: {
      type: Object,
      default: () => {}
    }
  });

  const newTimeRange = computed(() => {
    const storeTimeArr = store.chooseTimeArr;
    const isExist = storeTimeArr
      .map((item) => item.skuId)
      .includes(props.cellInfo.skuId);
    return props.cellInfo.timesList.map((item) => {
      let checked = false;
      const dateIndex = storeTimeArr.findIndex(
        (sub) => sub.date === item.dayTimes && isExist
      );
      if (dateIndex > -1) {
        const timeIndex = storeTimeArr[dateIndex].timeArr.findIndex(
          (i) => i.start === item.start && i.end === item.end
        );
        checked = timeIndex > -1;
      }
      return {
        ...item,
        checked
      };
    });
  });

  /**
   * 选择时间
   */
  const onChoose = (item, salePrice, skuId) => {
    const { dayTimes, start, end, checked, state } = item;
    if (state === 2 && !checked) return;
    if (checked) {
      store.delTimeArr({ dayTimes, start, end, salePrice, skuId });
    } else {
      store.addTimeArr({ dayTimes, start, end, salePrice, skuId });
    }
  };
</script>

<style scoped lang="scss">
  .text-xs {
    font-size: 24rpx;
  }
  .text-sm {
    font-size: 28rpx;
  }
  .text-lg {
    font-size: 32rpx;
  }
  .disabled {
    background: #e6e6e6 !important;
    color: #999999 !important;
  }
  .active {
    background: rgba(251, 95, 5, 0.2) !important;
    border: 1px solid #fb5f05 !important;
    color: #fb5f05 !important;
  }
  .time-item {
    border-top: 1px solid #e6e6e6;
    padding: 32rpx 0 0 0;
    background: #ffffff;
    margin: 0 32rpx;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28rpx;
      .price {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .price-num {
          display: flex;
          align-items: flex-end;
          color: #ea3d41;
        }
      }
    }
    .time-box {
      display: grid;
      column-gap: 74rpx;
      grid-template-columns: repeat(3, calc(33.33% - 46rpx));
      margin-top: 32rpx;
      .time-cell {
        width: 180rpx;
        height: 60rpx;
        background: #ffffff;
        border-radius: 8rpx;
        opacity: 1;
        border: 2rpx solid #999999;
        margin-bottom: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28rpx;
        color: #333333;
      }
    }
  }
</style>
