<template>
  <view class="coupon-item">
    <view class="coupon-content" :class="itemDisabled ? 'coupon-disabled' : ''">
      <view class="flex align-center">
        <view
          v-if="checkbox"
          class="flex space-center align-center padding-right"
        >
          <view>
            <image
              class="check-image"
              :src="
                checked
                  ? 'https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/coupon-checked.png'
                  : 'https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/coupon-check.png'
              "
              @click="changeRadio(!checked)"
            ></image>
          </view>
        </view>
        <view>
          <view class="title-box flex align-center">
            <view class="coupon-type">{{ couponType }}</view>
            <view
              class="coupon-name"
              :class="source === 'order' && 'coupon-order-name'"
              >{{ item.name }}</view
            >
          </view>
          <view v-if="source === 'order'" class="coupon-time">
            <text class="text-xs">
              {{ showTime }}
            </text>
          </view>
          <view v-else class="coupon-time">
            <text v-if="item.received && item.expireTime" class="text-xs">
              {{ showTime }}
            </text>
            <template v-if="!item.received">
              <view class="margin-bottom-4"></view>
              <view class="text-xs">{{
                item.quantity > 0 ? `仅剩${item.quantity}张` : "已领完"
              }}</view>
            </template>
          </view>
          <view class="rule" @click="expend">
            <text>使用规则</text>
            <image
              class="image"
              :class="expended ? 'top' : ''"
              src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/icons/arrow.png"
            ></image>
          </view>
        </view>
      </view>
      <view class="coupon-right">
        <view class="flex space-center align-center">
          <view v-if="[1, 4].includes(item.type)" class="symbol">￥</view>
          <view class="price">{{ priceType }}</view>
        </view>
        <view class="condition">{{
          item.thresholdAmount === 0
            ? "无门槛"
            : `满${item.thresholdAmount || 0}可用`
        }}</view>
        <view
          v-if="source === 'detail' && item.type !== 4"
          class="flex space-center"
        >
          <i-button
            v-if="!item.received"
            :width="150"
            round
            :height="45"
            type="danger"
            size="mini"
            @click="onClick({ ...item, handleType: 2 })"
            >立即领取</i-button
          >
        </view>
        <view
          v-if="source === 'order' && item.status === 0"
          class="flex space-center"
        >
          <i-button
            :height="45"
            :width="150"
            round
            type="danger"
            size="mini"
            @click="onClick({ ...item, handleType: 1 })"
            >去使用</i-button
          >
        </view>
        <view v-if="source === 'coupon'" class="flex space-center">
          <i-button
            v-if="item.received && item.status === 0"
            round
            :height="45"
            :width="150"
            type="danger"
            size="mini"
            @click="onClick({ ...item, handleType: 1 })"
            >去使用</i-button
          >
          <i-button
            v-if="!item.received"
            round
            :height="45"
            :width="150"
            type="danger"
            size="mini"
            @click="onClick({ ...item, handleType: 2 })"
          >
            {{ item.type === 4 ? "立即购买" : "立即领取" }}
          </i-button>
        </view>
        <view
          v-if="[1, 2].includes(item.status) && item.received"
          class="barge"
        >
          <image
            v-if="item.status === 1"
            class="image"
            src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/coupon-used.png"
          />
          <image
            v-else-if="item.status === 2"
            class="image"
            src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/coupon-expire.png"
          />
          <image
            v-else-if="!item.received && item.quantity === 0"
            class="image"
            src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/coupon-over.png"
          ></image>
        </view>
      </view>
    </view>
    <view class="coupon-detail" :class="expended ? 'coupon-detail-show' : ''">
      <view class="top-blank"></view>
      <view class="detail-content">
        <view class="margin-bottom-4">{{
          item.thresholdAmount === 0
            ? "无门槛"
            : `订单满${item.thresholdAmount}元可用`
        }}</view>
        <view v-if="item.received" class="margin-bottom-4"
          >{{ item.startTime }}至{{ item.expireTime }}有效</view
        >
        <view>使用说明：{{ item.instruction }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "CouponItem"
  };
</script>
<script setup>
  import { computed, onMounted, ref, watch } from "vue";
  import dayjs from "dayjs";
  import { useCountDown } from "@har/use";
  import IButton from "@/components/i-button/index.vue";
  import { couponTypeList } from "../../utils/dic";

  const props = defineProps({
    item: {
      type: Object,
      default: () => {
        return {};
      }
    },
    source: {
      type: String,
      default: "coupon" // coupon 优惠券  order 订单 //detail 详情
    },
    checkbox: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    }
  });
  const emits = defineEmits(["change", "click"]);
  const expended = ref(false);
  const { current, reset, start } = useCountDown({
    time: 0
  });

  /**
   * 优惠券点击事件
   * @param item
   */
  const onClick = (item) => {
    emits("click", item);
  };

  onMounted(() => {
    // if(props.source === 'order' || props.item.status === 2) getTime()
    if (
      props.source === "order" ||
      (props.item.received && props.item.status === 0)
    )
      getTime();
  });

  const time = computed(() => {
    let { hours = 0, minutes = 0, seconds = 0 } = current.value;
    const { days } = current.value;
    let t = "";
    if (days > 0) {
      t += days + "天";
    }
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    t += ` ${hours}:${minutes}:${seconds}`;
    return t;
  });

  const showTime = computed(() => {
    return props.item.received && props.item.status === 0
      ? time.value
      : `${dayjs(props.item.expireTime).format("YYYY-MM-DD")}到期`;
    /*return (props.source === 'order' || props.item.status === 2) ?
    time.value :
    `${dayjs(props.item.expireTime).format("YYYY-MM-DD")}到期`*/
  });

  const itemDisabled = computed(() => {
    return (
      [1, 2].includes(props.item.status) ||
      (props.source === "order" && !props.item.available)
    );
  });

  function getTime() {
    const { expireTime } = props.item;
    const diff = dayjs(expireTime).diff();
    reset(diff);
    start();
  }

  function expend() {
    expended.value = !expended.value;
  }

  const couponType = computed(() => {
    return couponTypeList.find((i) => i.value === props.item.type)?.label;
  });

  const priceType = computed(() => {
    const { type, discount, discountDesc } = props.item;
    if (type === 2) {
      if (props.source === "order") {
        return discountDesc + "折";
      } else {
        return discount + "折";
      }
    } else if (type === 3) {
      return "赠";
    } else {
      return discount;
    }
  });

  function changeRadio(v) {
    if (itemDisabled.value) return;
    emits("change", v);
  }

  /**
   * 监听数据变化时，调用倒计时方法
   */
  watch(
    () => props.item,
    () => {
      // console.log(newVal, "--watch--");
      getTime();
    },
    {
      deep: true
    }
  );
</script>

<style scoped lang="scss">
  .visibility-hidden {
    visibility: hidden;
  }
  .text-xs {
    font-size: 24rpx !important;
  }
  .margin-bottom-4 {
    margin-bottom: 8rpx;
  }
  .check-image {
    width: 32rpx;
    height: 32rpx;
  }
  .padding-right {
    padding-right: 32rpx;
  }
  .barge {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 10;
    width: 102rpx;
    height: 80rpx;
    .image {
      width: 100%;
      height: 100%;
    }
  }
  .coupon-detail {
    display: none;
    margin-top: -8rpx;
    background: #fff;
    border-radius: 0 0 16rpx 16rpx;
    font-size: 24rpx;
    color: #999;
    font-weight: 400;
    transition: all 1s;
    .detail-content {
      padding: 16rpx 32rpx 32rpx;
    }
  }
  .coupon-detail-show {
    display: block;
  }
  .top-blank {
    border-top: 2rpx solid #e6e6e6;
    height: 16rpx;
  }
  .rule {
    font-size: 24rpx;
    color: #999999;
    .image {
      width: 12rpx;
      height: 18rpx;
      margin-left: 10rpx;
      transform: rotate(90deg);
      transition: all 0.5s;
      &.top {
        transform: rotate(-90deg);
      }
    }
  }
  .coupon-item {
    margin-bottom: 32rpx;
    position: relative;
    box-shadow: 0 8rpx 16rpx 2rpx rgba(0, 0, 0, 0.1);
    border-radius: 16rpx;
  }
  .coupon-right {
    width: 202rpx;
    .symbol {
      font-size: 24rpx;
      color: #fa0e33;
    }
    .price {
      font-size: 40rpx;
      color: #fa0e33;
      font-weight: bold;
      line-height: 58rpx;
    }
    .condition {
      font-size: 24rpx;
      color: #999;
      font-weight: 400;
      margin-bottom: 32rpx;
      text-align: center;
    }
  }
  .coupon-content {
    background: url(https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/coupon-bg.png)
      no-repeat;
    background-size: 100% 100%;
    padding: 32rpx 0 32rpx 32rpx;
    display: flex;
    justify-content: space-between;
    .coupon-type {
      padding: 6rpx 14rpx;
      white-space: nowrap;
      border-radius: 8rpx;
      background-color: #fedbb0;
      font-size: 24rpx;
      color: #955b2a;
      line-height: 24rpx;
      margin-right: 18rpx;
    }
    .coupon-name {
      font-size: 28rpx;
      color: #333;
      max-width: 316rpx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .coupon-order-name {
      max-width: 240rpx;
    }
    .title-box {
      margin-bottom: 20rpx;
    }
    .coupon-time {
      font-size: 24rpx;
      color: #999999;
      margin-bottom: 16rpx;
    }
  }
  .coupon-disabled {
    .coupon-type {
      color: #e4b288;
      background: #fff0de;
    }
    .coupon-name,
    .symbol,
    .price {
      color: #999999;
    }
  }
</style>
