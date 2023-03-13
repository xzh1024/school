<template>
  <i-sys
    class="order-wrapper"
    title="订单详情"
    :nav-placeholder="true"
    nav-bg="bg-white"
  >
    <view class="detail">
      <i-card
        v-if="status === 0"
        :title="title"
        :left-icon="false"
        :body-padding="currentText ? '24rpx 32rpx' : 0"
      >
        <view v-if="currentText">
          <view class="count-down">请在 {{ currentText }} 内完成付款</view>
          <view class="count-tips">逾期未付，订单将自动取消</view>
        </view>
        <template #footer>
          <view class="flex space-between align-center">
            <i-button
              type="primary"
              size="medium"
              no-border
              round
              plan
              :width="176"
              @click="cancelOrder = true"
              >取消订单</i-button
            >
            <i-button
              type="primary"
              size="medium"
              round
              :width="422"
              @click="goPay"
              >去付款 ￥{{ info.goodsTotalAmt }}</i-button
            >
          </view>
        </template>
      </i-card>
      <view v-else-if="[-1, 2, 3].includes(status)" class="bg-white again-box">
        <i-cell :label="title" no-bottom>
          <template #value>
            <i-button type="text" @click="againOrder">再来一单</i-button>
          </template>
        </i-cell>
      </view>
      <i-card v-else :title="title" :left-icon="false">
        <view>
          <template v-if="status === 2">
            <view class="refund-title">商家退款审核中</view>
            <view class="refund-loading">请耐心等待</view>
          </template>
          <view v-if="[1, 10, 11].includes(status)" class="code-box">
            <view class="qr-code">
              <qrcode
                v-if="info.pickUpCode"
                :size="131"
                :value="info.pickUpCode"
              ></qrcode>
            </view>
            <view class="code" :class="status === 1 ? '' : 'under-line'"
              >核销码：{{ info.pickUpCode }}</view
            >
            <!--            <view class="mask" v-if="[2,3,10,11].includes(status)"></view>-->
            <view
              class="code-box-barge"
              :class="status === 2 ? 'barge-refund' : ''"
            >
              <image v-if="imageSrc" class="image" :src="imageSrc"></image>
            </view>
          </view>
        </view>
        <template v-if="[1, 10, 11].includes(status)" #footer>
          <view
            class="flex align-center"
            :class="
              [11, -1, 3].includes(status) ? 'space-center' : 'space-between'
            "
          >
            <i-button
              v-if="status === 1"
              type="primary"
              round
              size="medium"
              no-border
              plan
              :width="176"
              @click="visible = true"
              >申请退款</i-button
            >
            <i-button
              v-if="[1, 11, -1, 3].includes(status)"
              type="primary"
              round
              size="medium"
              :width="422"
              @click="againOrder"
              >再来一单</i-button
            >
            <template v-if="status === 2">
              <i-button
                type="primary"
                round
                size="medium"
                no-border
                plan
                :width="176"
                @click="cancelVisible = true"
                >取消退款</i-button
              >
              <i-button type="primary" round size="medium" :width="422"
                >联系商家</i-button
              >
            </template>
          </view>
        </template>
      </i-card>
      <i-card
        :title="info.storeName"
        body-padding="0 32rpx"
        @title-click="titleClick"
      >
        <view v-for="(item, index) in prdList" :key="index" class="shop-list">
          <gym-item
            v-if="info.orderType === 2"
            :item="item"
            type="shop"
          ></gym-item>
          <shop-item v-else :item="item" type="shop"></shop-item>
        </view>
      </i-card>
      <i-card
        v-if="disctItemList.length"
        title="优惠"
        body-padding="0 32rpx"
        :left-icon="false"
      >
        <i-cell
          v-for="(item, index) in disctItemList"
          :key="index"
          :badge-text="filterBadgeName(item.name)"
          :label="filterName(item.name)"
        >
          <template #value>
            <view class="price">-￥{{ item.amount }}</view>
          </template>
        </i-cell>
        <view class="flex padding-top justify-end">
          <view class="flex">
            <view class="discount">已优惠:</view>
            <view class="discount-price">￥{{ info.discount || 0 }}</view>
          </view>
          <view class="total-price">小计:￥{{ info.goodsTotalAmt || 0 }}</view>
        </view>
      </i-card>
      <i-card
        title="订单基础信息"
        class="card-order"
        body-padding="0 32rpx"
        :left-icon="false"
      >
        <i-cell label="订单号" :value="info.orderNo"></i-cell>
        <i-cell
          label="订单金额"
          :value="`￥${info.orderTotalPrice || 0}`"
        ></i-cell>
        <i-cell
          v-if="info.payAmt"
          label="实付金额"
          :value="`￥${info.payAmt}`"
        ></i-cell>
        <i-cell
          label="下单时间"
          :value="dayjs(info.createTime).format('YYYY-MM-DD HH:mm')"
        ></i-cell>
        <i-cell
          v-if="info.payTime"
          label="支付时间"
          :value="dayjs(info.payTime).format('YYYY-MM-DD HH:mm')"
        ></i-cell>
        <i-cell
          v-if="info.fundFlowNo"
          label="支付单号"
          no-bottom
          :value="info.fundFlowNo"
        ></i-cell>
        <i-cell
          v-if="info.cancelTime"
          label="取消时间"
          :value="dayjs(info.cancelTime).format('YYYY-MM-DD HH:mm')"
        ></i-cell>
        <i-cell
          v-if="info.refundTime"
          label="退款时间"
          no-bottom
          :value="dayjs(info.refundTime).format('YYYY-MM-DD HH:mm')"
        ></i-cell>
        <i-cell
          v-if="info.refundFlowNo"
          label="退款单号"
          no-bottom
          :value="info.refundFlowNo"
        ></i-cell>
      </i-card>
      <i-button v-if="status === 2" :radius="10" @click="cancelVisible = true"
        >取消退款</i-button
      >
    </view>
    <i-dialog
      v-if="visible"
      :show-cancel="false"
      :has-footer="false"
      @dialog-confirm="visible = false"
    >
      <view style="width: 460rpx">
        <textarea
          v-model="remark"
          class="textarea"
          placeholder-class="placeholder"
          placeholder="请输入退款原因"
        ></textarea>
        <view class="flex space-center">
          <i-button type="primary" plan :width="214" @click="visible = false"
            >取消</i-button
          >
          <i-button
            type="primary"
            class="margin-left"
            :width="214"
            @click="confirm"
            >确定</i-button
          >
        </view>
      </view>
      <!--        <view class="model-desc-title">退款请联系商家</view>-->
      <!--    <view>-->
      <!--      <view class="modal-title">退款请联系商家</view>-->
      <!--      <view class="model-desc" @click="callPhone">联系电话：{{info.linkTel}}</view>-->
      <!--    </view>-->
    </i-dialog>

    <i-dialog
      v-if="cancelVisible"
      title="取消退款"
      content="请确认是否取消退款"
      @dialog-confirm="notRefund"
      @dialog-close="cancelVisible = false"
    ></i-dialog>
    <i-dialog
      v-if="cancelOrder"
      title="提示"
      content="确认取消订单？"
      @dialog-confirm="dialogConfirm"
      @dialog-close="cancelOrder = false"
    ></i-dialog>
  </i-sys>
</template>

<script setup>
  import IButton from "@/components/i-button/index.vue";
  import ICard from "@/components/i-card/index.vue";
  import Qrcode from "../../components/qrcode/qrcode";
  import GymItem from "../../components/common/gym-item/gym-item";
  import ICell from "../../components/i-cell";
  import { onLoad, onShow, onHide, onUnload } from "@dcloudio/uni-app";
  import { ref, computed, watch } from "vue";
  import {
    cbdApiAppletOrderCancelGet,
    cbdApiAppletOrderInfoGet,
    cbdApiAppletOrderRefundPost,
    cbdApiAppletOrderRefundCancelGet
  } from "@/api";
  import ShopItem from "../../components/common/shop-item/shop-item";
  import dayjs from "dayjs";
  import { useCountDown } from "@har/use";
  import { orderAllListStatus } from "@/utils/dic";
  import IDialog from "../../components/i-dialog/i-dialog";
  import { useCashCard } from "../../stores/cashCard";

  const orderNo = ref("");
  const info = ref({});
  const currentText = ref("");
  const remark = ref("");
  const visible = ref(false);
  const cancelVisible = ref(false);
  const cancelOrder = ref(false);

  onLoad((e) => {
    const { orderNo: no } = e;
    orderNo.value = no;
    getInfo();
  });

  const timer = ref("");
  onShow(() => {
    // if (orderNo.value){
    //   getInfo()
    // }
  });
  onUnload(() => {
    clearInterval(timer.value);
  });
  onHide(() => {
    clearInterval(timer.value);
  });
  const { start, current, reset } = useCountDown({
    time: 0,
    onFinish: getInfo
  });

  watch(
    current,
    () => {
      getDate();
    },
    { deep: true }
  );

  function getDate() {
    const { minutes, seconds } = current.value;
    let t = "";
    if (minutes > 0) {
      t = minutes + "分 ";
    }
    if (seconds) {
      t += seconds + "秒";
    }
    // console.log(t,"ttttt")
    currentText.value = t;
  }

  const status = computed(() => {
    return info.value.orderStatus;
  });
  const prdList = computed(() => {
    return info.value?.prdList || [];
  });
  const disctItemList = computed(() => {
    return info.value?.disctItemList || [];
  });

  function filterBadgeName(v) {
    if (v === "integral") {
      return "积";
    } else if (v === "coupon") {
      return "券";
    } else {
      return "惠";
    }
  }
  function filterName(v) {
    if (v === "integral") {
      return "会员积分";
    } else if (v === "coupon") {
      return "优惠券";
    } else {
      return "会员折扣";
    }
  }

  async function getInfo() {
    try {
      if (!Object.keys(info.value).length) {
        uni.showLoading("加载中...");
      }
      const res = await cbdApiAppletOrderInfoGet({
        orderNo: orderNo.value
      });
      info.value = res;
      // 设置倒计时
      // reset(res?.closeCountdown || 0)
      // 待使用的轮询状态判断是否核销
      if (timer.value) clearInterval(timer.value);
      if (status.value === 1) {
        timer.value = setInterval(() => {
          getInfo();
        }, 2000);
      }
      const { closeCountdown } = res;
      if (closeCountdown) {
        reset(closeCountdown);
        // 开始倒计时
        start();
      }
      // console.log(info.value)
    } catch (e) {
      console.error(e);
    } finally {
      uni.hideLoading();
    }
  }

  function dialogConfirm() {
    cancelOrderHandle();
  }
  // 取消订单
  async function cancelOrderHandle() {
    try {
      uni.showLoading("处理中...");
      await cbdApiAppletOrderCancelGet({
        orderNo: info.value.orderNo
      });
      remark.value = "";
      uni.hideLoading();
      cancelOrder.value = false;
      await getInfo();
    } catch (e) {
      uni.showToast({
        title: e.value?.message,
        duration: 2000,
        icon: "none"
      });
      console.error(e);
    }
  }
  const title = computed(() => {
    return orderAllListStatus.find((i) => i.value === status.value)?.label;
  });
  async function applyRefund() {
    try {
      uni.showLoading("处理中...");
      await cbdApiAppletOrderRefundPost({
        orderNo: info.value.orderNo,
        remark: remark.value
      });
      uni.hideLoading();
      await getInfo();
    } catch (e) {
      uni.hideLoading();
      console.error(e);
    }
  }

  function confirm() {
    if (!remark.value)
      return uni.showToast({ icon: "none", title: "请填写退款原因" });
    applyRefund();
    visible.value = false;
  }
  // async function cancelConfirm() {
  //   try {
  //     uni.showLoading("处理中...");
  //     await cbdApiAppletOrderCancelGet({
  //       orderNo: info.value.orderNo
  //     });
  //     uni.hideLoading();
  //
  //     await getInfo();
  //   } catch (e) {
  //     console.error(e);
  //     uni.hideLoading();
  //   }
  // }

  const imageSrc = computed(() => {
    let url = "";
    const { orderStatus } = info.value;
    switch (orderStatus) {
      case 2:
        url =
          "https://har-cbd-cdn.huianrong.com/har-cbd/applet/order/refunding.png";
        break;
      case 3:
        url =
          "https://har-cbd-cdn.huianrong.com/har-cbd/applet/order/refunded.png";
        break;
      case 11:
        url = "https://har-cbd-cdn.huianrong.com/har-cbd/applet/order/used.png";
        break;
      case -1:
        url =
          "https://har-cbd-cdn.huianrong.com/har-cbd/applet/order/cancel.png";
        break;
    }
    return url;
  });

  // function callPhone() {
  //   uni.makePhoneCall({
  //     phoneNumber: info.value.linkTel
  //   });
  // }

  function againOrder() {
    const { storeId, orderType } = info.value;
    uni.navigateTo({
      url: `/pages/home/merchants/merchants?storeId=${storeId}&type=${orderType}`
    });
  }

  const useCashCardStore = useCashCard();
  async function goPay() {
    useCashCardStore.orderRetryPay(orderNo.value, 2);
    // try {
    //   const res = await cbdApiAppletOrderPayGet({
    //     orderNo: orderNo.value,
    //     type: 2
    //   });
    //   wxPay(
    //     res,
    //     () => {
    //       getInfo();
    //       uni.showToast({ title: "支付结果可能存在延迟,请刷新后查看" });
    //     },
    //     () => {},
    //     false
    //   );
    // } catch (e) {
    //   console.error(e);
    // }
  }
  function titleClick() {
    const { storeId } = info.value;
    uni.navigateTo({
      url: `/pages/home/merchants/merchants?storeId=${storeId}`
    });
  }
  async function notRefund() {
    try {
      uni.showLoading("处理中...");
      await cbdApiAppletOrderRefundCancelGet({
        orderNo: info.value.orderNo
      });
      uni.hideLoading();
      cancelVisible.value = false;
      await getInfo();
    } catch (e) {
      uni.showToast({
        title: e.value?.message,
        duration: 2000,
        icon: "none",
        complete: () => {
          cancelVisible.value = false;
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  .again-box {
    padding: 0 8rpx 0 32rpx;
    border-radius: 16rpx;
    margin-bottom: 24rpx;
  }
  .model-desc-title {
    font-size: 26rpx;
    color: #333;
    line-height: 48rpx;
  }
  .model-desc {
    color: #666;
    font-size: 24rpx;
    line-height: 40rpx;
  }
  .border-no {
    :deep(.item) {
      color: red;
    }
  }
  .under-line {
    text-decoration: line-through;
  }
  .refund-title {
    font-size: 32rpx;
    color: #333;
    line-height: 48rpx;
    text-align: center;
  }
  .refund-loading {
    font-size: 24rpx;
    color: #666;
    line-height: 40rpx;
    text-align: center;
    padding: 8rpx 0 24rpx;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.6);
    width: 268rpx;
    height: 268rpx;
  }
  .code-box-barge {
    position: absolute;
    right: -32rpx;
    top: 0rpx;
    z-index: 5;
    width: 180rpx;
    height: 200rpx;
    .image {
      width: 100%;
      height: 100%;
    }
  }
  .barge-refund {
    top: -120rpx;
  }
  .code-box {
    position: relative;
  }
  .modal-title {
    text-align: center;
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
    line-height: 44rpx;
    padding: 0 12rpx;
    margin-bottom: 24rpx;
  }
  .margin-left {
    margin-left: 24rpx;
  }
  :deep(.placeholder) {
    color: #999999;
  }
  .textarea {
    background-color: #f7f7f7;
    border-radius: 8rpx;
    font-size: 24rpx;
    color: #333;
    width: auto;
    padding: 24rpx;
    max-height: 164rpx;
    margin-bottom: 24rpx;
  }
  .shop-list:last-child {
    :deep(.shop-item) {
      border-bottom: none;
    }
  }
  .discount,
  .discount-price {
    font-size: 28rpx;
    color: #999999;
    line-height: 44rpx;
  }
  .discount-price {
    color: #d93044;
  }
  .total-price {
    font-size: 24rpx;
    color: #333333;
    line-height: 40rpx;
    margin-left: 24rpx;
  }
  .price {
    font-size: 24rpx;
    color: #d93044;
    line-height: 40rpx;
  }

  .detail {
    padding: 32rpx;
  }
  .count-down {
    font-size: 32rpx;
    color: #333;
    line-height: 48rpx;
    text-align: center;
  }
  .count-tips {
    padding-top: 8rpx;
    font-size: 24rpx;
    color: #666666;
    line-height: 40rpx;
    text-align: center;
  }
  .qr-code {
    width: 262rpx;
    height: 262rpx;
    position: relative;
    z-index: 1;
    margin: 0 auto;
  }
  .code {
    text-align: center;
    font-size: 24rpx;
    color: #666;
    line-height: 40rpx;
    padding-top: 24rpx;
  }
</style>
