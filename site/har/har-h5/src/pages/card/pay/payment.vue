<template>
  <i-sys title="支付方式" nav-placeholder nav-bg="bg-white">
    <view class="container-box">
      <view class="wx-box" @click="chooseWxPay">
        <view class="left-box">
          <view v-if="!wxPayChecked" class="i-round"></view>
          <view v-else class="i-round">
            <image
              src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/coupon-checked.png"
            />
          </view>
          <image class="i-wxPay" src="@/static/order/icon-wxPay.png" />
          <view>微信支付</view>
        </view>
        <view class="right-box">{{ `￥${searchData.amount}` }}</view>
      </view>
      <i-card
        v-if="cardList.length"
        title="储值卡支付"
        :left-icon="false"
        :body-padding="'0 32rpx'"
      >
        <template v-for="(item, index) in cardList" :key="`c_${index}`">
          <card-cell :item="item" class="card-cell" @on-choose="cardChoose" />
        </template>
      </i-card>
    </view>
    <view class="space-box"></view>
    <i-footer>
      <i-card-button class="i-btn" :radius="'40rpx'" @tap="onConfirm">
        确定
      </i-card-button>
    </i-footer>
  </i-sys>
</template>

<script setup lang="ts">
  import ICard from "@/components/i-card/index.vue";
  import CardCell from "./card-cell.vue";
  import { onLoad } from "@dcloudio/uni-app";
  import useFuncProxy from "@/hooks/useFuncProxy";
  import {
    cbdApiAppletOrderMemberCardConsumerPreviewGet,
    CbdApiAppletOrderMemberCardConsumerPreviewGetResponse
  } from "@/api";
  import { computed, reactive, ref } from "vue";
  import { usePurchaseCard, CardPayment } from "@/stores/purchaseCard";
  import IFooter from "@/components/i-footer/i-footer.vue";
  import ICardButton from "@/components/i-card-button/i-card-button.vue";

  const usePurchaseCardStore = usePurchaseCard();
  const searchData = reactive({
    blockMemberCardCodes: "",
    amount: "",
    storeId: "",
    venueId: ""
  });

  const payData = ref<CardPayment>({
    payType: 1 // 支付类别  1微信  2支付宝  3储值卡
    // svcCard: {}
  });
  const cardPayData = computed(() => {
    return usePurchaseCardStore.cardPayData;
  });

  onLoad((options) => {
    searchData.amount = options?.amount;
    getList();
  });

  const wxPayChecked = ref(true);
  const chooseWxPay = () => {
    cardList.value.forEach((item: RowData) => {
      item.checked = false;
    });
    wxPayChecked.value = true;
    payData.value = {
      payType: 1
    };
  };

  const cardChoose = (data: RowData) => {
    console.log(data);
    if (data.amount < Number(searchData.amount))
      return uni.showToast({ title: "储蓄卡余额不足", icon: "none" });
    wxPayChecked.value = false;
    cardList.value.forEach((item: RowData) => {
      item.checked = false;
    });
    data.checked = true;
    payData.value = {
      payType: 3,
      svcCard: { ...data }
    };
  };

  interface Checked {
    checked?: boolean;
  }
  type RowData = Checked &
    CbdApiAppletOrderMemberCardConsumerPreviewGetResponse[0];
  const cardList = ref<RowData[]>([]);

  const [getList] = useFuncProxy(async () => {
    uni.showLoading({ title: "加载中..." });
    const d = await cbdApiAppletOrderMemberCardConsumerPreviewGet({
      ...searchData
    });
    cardList.value = d.map((item) => {
      let checked = false;
      if (cardPayData.value.svcCard?.memberCardCode === item.memberCardCode) {
        checked = true;
        payData.value = { ...cardPayData.value };
      }
      return {
        ...item,
        checked
      };
    });
    uni.hideLoading();
  });

  const onConfirm = async () => {
    usePurchaseCardStore.setCardPaymentData(payData.value);
    uni.navigateBack();
  };

  function wxPay(
    info: Record<string, any>,
    sucCallback: any,
    errCallback: any
  ) {
    const { serverRspNo, timestamp, noncestr, dataPackage, signType, paysign } =
      info;
    uni.requestPayment({
      provider: "wxpay",
      orderInfo: serverRspNo,
      nonceStr: noncestr,
      timeStamp: timestamp,
      package: dataPackage,
      signType,
      paySign: paysign,
      success: (res) => {
        console.log(res);
        sucCallback(res);
      },
      fail: (err) => {
        console.error(err);
        if (errCallback) {
          errCallback(err);
        } else {
          const title =
            err["errMsg"].indexOf("cancel") > -1
              ? "支付取消"
              : "支付失败，请前往订单中心查看";
          uni.showToast({
            title: title,
            icon: "none"
          });
        }
      }
    });
  }
</script>

<style scoped lang="scss">
  .container-box {
    padding: 32rpx;
  }
  .space-box {
    height: 200rpx;
    box-sizing: border-box;
    background: transparent;
    padding: 24rpx 32rpx calc(24rpx + env(safe-area-inset-bottom));
  }
  .i-btn {
    width: 100%;
  }
  .i-round {
    height: 32rpx;
    width: 32rpx;
    border-radius: 50%;
    background: #e6e6e6;
    overflow: hidden;
    image {
      height: 100%;
      width: 100%;
    }
  }
  .wx-box {
    background: #ffffff;
    box-shadow: 0 8rpx 16rpx 0 rgba(0, 0, 0, 0.08);
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32rpx;
    margin-bottom: 32rpx;
    .left-box {
      display: flex;
      align-items: center;
      .i-wxPay {
        height: 64rpx;
        width: 64rpx;
        padding: 0 16rpx;
      }
    }
  }
  .card-cell {
    &:last-child {
      :deep(.card-box) {
        border-bottom: 0;
        padding: 24rpx 0 0 0;
      }
    }
  }
</style>
