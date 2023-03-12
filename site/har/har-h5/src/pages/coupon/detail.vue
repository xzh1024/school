<template>
  <i-sys title="购买优惠券" :nav-placeholder="true">
    <view class="page">
      <coupon-item :item="couponDetail" source="detail" />
      <view class="bottom-box">
        <view class="content">{{ couponDetail.integral }}积分</view>
        <i-button
          :class="couponDetail.received ? 'i-btn-disabled' : ''"
          :disabled="couponDetail.received"
          round
          :width="190"
          :height="76"
          :font-size="30"
          @click="onBuy"
        >
          立即购买
        </i-button>
      </view>
      <!--确认购买弹窗-->
      <uni-popup ref="buyDialog" type="dialog">
        <view class="dialog-box">
          <view class="title">立即购买</view>
          <view class="content">
            <view class="prompt-word">请确认是否购买当前积分现金券</view>
            <view class="num-box">{{ couponDetail.integral }}积分</view>
            <i-button
              round
              :width="448"
              :height="76"
              :font-size="30"
              @click="onConfirm"
            >
              确定
            </i-button>
          </view>
        </view>
      </uni-popup>
    </view>
  </i-sys>
</template>

<script>
  export default {
    name: "Detail"
  };
</script>
<script setup>
  import { onLoad } from "@dcloudio/uni-app";
  import { ref } from "vue";
  import {
    cbdApiAppletCouponCouponInfoGet,
    cbdApiAppletCouponBuyCouponPost
  } from "@/api";
  import CouponItem from "../../components/coupon-item";
  import IButton from "../../components/i-button";

  const id = ref("");
  const code = ref("");
  onLoad(async (option) => {
    id.value = option.id || "";
    code.value = option.code || "";
    await getCouponDetail();
  });

  const couponDetail = ref({});
  const getCouponDetail = async () => {
    try {
      couponDetail.value = await cbdApiAppletCouponCouponInfoGet({
        id: id.value,
        code: code.value
      });
    } catch (e) {
      console.error(e);
    }
  };

  const buyDialog = ref(null);
  const onBuy = () => {
    // if (couponDetail.received) return;
    buyDialog.value.open("center");
  };
  const onConfirm = async () => {
    try {
      await cbdApiAppletCouponBuyCouponPost({
        id: couponDetail.value.id,
        integral: couponDetail.value.integral
      });
      uni.showToast({
        icon: "success",
        title: "购买成功!"
      });
      buyDialog.value.close();
      await getCouponDetail();
    } catch (e) {
      console.error(e);
    }
  };
</script>

<style scoped lang="scss">
  .i-btn-disabled {
    background: #e6e6e6 !important;
  }
  .page {
    padding: 32rpx;
    .bottom-box {
      width: stretch;
      height: 160rpx;
      background: #ffffff;
      box-shadow: 0 3px 6px 1px rgba(0, 0, 0, 0.1);
      position: fixed;
      left: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32rpx;
      .content {
        font-size: 32rpx;
        color: #333333;
        font-weight: bold;
      }
      //.i-btn {
      //  width: 95px;
      //  height: 38px;
      //  background: #FB5F05;
      //  border-radius: 38rpx;
      //  color: #FFFFFF;
      //  font-size: 32rpx;
      //  display: flex;
      //  align-items: center;
      //  justify-content: center;
      //}
    }
    .dialog-box {
      background: #ffffff;
      width: 343px;
      border-radius: 16rpx;
      .title {
        font-size: 32rpx;
        color: #333333;
        text-align: center;
        padding-top: 24px;
        padding-bottom: 9px;
        border-bottom: 1px solid #e6e6e6;
      }
      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 24px 0;
        .prompt-word {
          font-size: 32rpx;
          color: #333333;
        }
        .num-box {
          margin: 32rpx 0;
          font-size: 48rpx;
          color: #333333;
          font-weight: bold;
        }
        //.i-confirm-btn {
        //  width: 224px;
        //  height: 38px;
        //  background: #FB5F05;
        //  border-radius: 38rpx;
        //  font-size: 32rpx;
        //  display: flex;
        //  align-items: center;
        //  justify-content: center;
        //}
      }
    }
  }
</style>
