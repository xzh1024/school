<template>
  <view class="record-cell-box">
    <view
      class="record-top-box"
      :class="cardType === 1 ? 'borderBottom padding-b-32' : ''"
    >
      <view class="i-icon">
        <image class="logo" :src="newType.logo" />
      </view>
      <view class="info-box">
        <view class="top-box">
          <view class="text-black">{{ newType.label }}</view>
          <view
            :style="{
              color: Number(item.tradeAmount) > 0 ? '#fa4e40' : '#549502'
            }"
            >{{ showPrice }}
          </view>
        </view>
        <view class="bottom-box" :class="cardType === 1 ? 'margin-b-4' : ''">
          <view>{{ `时间：${item.tradeTime}` }}</view>
          <view>{{ newStatus(item.tradeStatus) }}</view>
        </view>
      </view>
    </view>
    <view v-if="cardType === 1" class="record-bottom-box">
      <template v-if="item.discount">
        <view class="bottom-box margin-b-4">
          <view>{{ `活动：` }}</view>
          <view class="flex-1 value-content">{{ item.activityName }}</view>
        </view>
        <view class="bottom-box margin-b-4">
          <view v-if="item.type === 1">{{ `满减：` }}</view>
          <view v-else-if="item.type === 2">{{ `满赠：` }}</view>
          <view v-else-if="item.type === 3">{{ `满折：` }}</view>
          <view class="flex-1 value-content"
            >{{ item.activityDiscountName }}
          </view>
        </view>
        <view class="bottom-box margin-b-4">
          <view>{{ `优惠金额：` }}</view>
          <view class="flex-1 value-content"
            >{{ formatPrice(item.discountAmount) }}
          </view>
        </view>
      </template>
      <view class="bottom-box margin-b-4">
        <view>{{ `单号：` }}</view>
        <view class="flex-1 value-content">{{ item.tradeNo }}</view>
      </view>
      <view class="bottom-box margin-b-4">
        <view>{{ `储蓄卡余额：` }}</view>
        <view class="flex-1 value-content">{{ item.balance }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { computed } from "vue";
  import { fee_classify, feeType } from "@/dic";
  import { formatPrice } from "@/utils";

  const props = defineProps({
    item: {
      type: Object,
      default: () => {}
    },
    showBottom: {
      type: Boolean,
      default: true
    },
    //卡片类型 1充值记录 2消息记录
    cardType: {
      type: Number,
      default: 1
    }
  });

  const newType = computed<feeType>(() => {
    const { source } = props.item;
    return fee_classify.find((v: feeType) => v.value === source) || {};
  });
  const newStatus = computed(() => (val: number) => {
    return val === 1 ? "交易成功" : "交易失败";
    // return fee_classify.find((item) => item.value === val)?.label + "成功"
  });

  const showPrice = computed(() => {
    const { tradeAmount } = props.item;
    const res = formatPrice(tradeAmount);
    return Number(tradeAmount) > 0 ? `+${res}` : res;
  });
</script>

<style scoped lang="scss">
  .text-black {
    color: #070a16;
  }

  .text-red {
    color: #fa4e40;
  }

  .margin-b-4 {
    margin-bottom: 8rpx;
  }

  .padding-b-32 {
    padding-bottom: 16rpx;
  }

  .borderBottom {
    border-bottom: 1px solid #f0f0f0;
  }

  .record-cell-box {
    box-shadow: 0 8rpx 16rpx 0 rgba(111, 111, 111, 0.08);
    border-radius: 16rpx;
    padding: 24rpx;
    background: #ffffff;
    margin-bottom: 24rpx;

    .record-top-box {
      display: flex;

      .i-icon {
        height: 40rpx;
        width: 40rpx;

        .logo {
          height: 100%;
          width: 100%;
        }
      }

      .info-box {
        flex: 1;
        margin-left: 32rpx;

        .top-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 32rpx;
          margin-bottom: 16rpx;
        }
      }
    }

    .record-bottom-box {
      padding-left: 80rpx;
      padding-top: 16rpx;
    }

    .bottom-box {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #606066;

      .value-content {
        text-align: right;
      }
    }
  }
</style>
