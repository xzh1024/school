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
        <view class="right-box">{{ `￥${wxPayMoney}` }}</view>
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
    <i-dialog v-if="showPayLoading" :has-footer="false">
      <uni-load-more :status="loadingStatus" :content-text="contentText" />
    </i-dialog>
  </i-sys>
</template>

<script setup lang="ts">
  import ICard from "@/components/i-card/index.vue";
  import CardCell from "@/pages/order/components/card-cell.vue";
  import { onLoad, onUnload } from "@dcloudio/uni-app";
  import useFuncProxy from "@/hooks/useFuncProxy";
  import {
    cbdApiAppletOrderMemberCardConsumerPreviewGet,
    CbdApiAppletOrderMemberCardConsumerPreviewGetResponse,
    CbdApiAppletOrderSubmitPaymentPostRequest
  } from "@/api";
  import { computed, reactive, ref } from "vue";
  import { useCashCard } from "../../stores/cashCard";
  import IFooter from "@/components/i-footer/i-footer.vue";
  import ICardButton from "@/components/i-card-button/i-card-button.vue";
  import NP from "number-precision";
  import IDialog from "@/components/i-dialog/i-dialog.vue";

  const searchData = reactive({
    blockMemberCardCodes: [] as string[],
    amount: "",
    storeId: "",
    venueId: ""
  });
  const onlyKey = ref(""); //店铺对应唯一标识
  const orderMark = ref(""); //临时订单标识

  const payAmount = ref("");

  const payData = reactive({
    storeId: "",
    venueId: "",
    serialNo: "",
    orderNo: "",
    payAmt: ""
  });

  const allChoose = ref<string[]>([]); //所有选择的储值卡id;
  onLoad((options) => {
    console.log(options, "--*--");
    onlyKey.value = options?.onlyKey;
    orderMark.value = options?.orderMark;
    searchData.amount = options?.payAmt;
    payAmount.value = options?.payAmt;
    searchData.storeId = options?.storeId;
    searchData.venueId = options?.venueId;

    console.log("orderMark:" + options?.orderMark);
    console.log("storeId:" + options?.storeId);
    console.log("payAmt:" + options?.payAmt);
    console.log("onlyKey:" + options?.onlyKey);
    console.log("venueId:" + options?.venueId);

    payData.storeId = options?.storeId;
    payData.venueId = options?.venueId;
    payData.serialNo = options?.serialNo;
    payData.orderNo = options?.orderNo;
    payData.payAmt = options?.payAmt;

    cashCardStore.orderPaymentArr.forEach((item) => {
      item.cardPay.forEach((sub) => {
        allChoose.value.push(sub.memberCardCode);
      });
    });

    const index = cashCardStore.orderPaymentArr.findIndex(
      (item) => Number(item.key) === Number(onlyKey.value)
    );
    if (index > -1) {
      chooseCardArr.value = cashCardStore.orderPaymentArr[index].cardPay;
    }

    getList();
  });

  onUnload(() => {
    if (timer) {
      return clearInterval(timer);
    }
  });

  const wxPayChecked = ref(true);
  const chooseWxPay = () => {
    // wxPayChecked.value = !wxPayChecked.value;
  };

  const chooseCardArr = ref<CardList[]>([]);
  const cashCardStore = useCashCard();
  const cardChoose = (
    data: CbdApiAppletOrderMemberCardConsumerPreviewGetResponse[0]
  ) => {
    const index = cardList.value.findIndex(
      (item) => item.memberCardCode === data.memberCardCode
    );
    if (wxPayMoney.value === 0 && !cardList.value[index].checked)
      return uni.showToast({ title: "储蓄卡付款已超出", icon: "none" });
    cardList.value[index].checked = !cardList.value[index].checked;
    setChooseCardArr();
    cardList.value = [];
    if (chooseCardTotalMoney.value > 0) {
      payAmount.value = String(wxPayMoney.value);
    } else {
      payAmount.value = searchData.amount;
    }

    getList();
  };
  const setChooseCardArr = () => {
    const arr: CardList[] = [];
    cardList.value.forEach((item: CardList) => {
      item.checked ? arr.push(item) : "";
    });
    chooseCardArr.value = arr;
  };

  //微信付款金额
  const wxPayMoney = computed(() => {
    const num = NP.minus(searchData.amount, chooseCardTotalMoney.value);
    return num > 0 ? num : 0;
  });

  //储蓄卡总共付款金额
  const chooseCardTotalMoney = computed(() => {
    return chooseCardArr.value.reduce((pre, cur) => {
      return NP.plus(pre, cur.amount);
    }, 0);
  });

  //当前订单所选的储值卡id
  const chooseCardIdArr = computed(() => {
    return chooseCardArr.value.map((item) => item.memberCardCode);
  });

  // function fn(arr: string[]) {
  //   const newArr: string[] = [];
  //   arr.sort((a: string, b: string) => {
  //     return NP.minus(a, b);
  //   });
  //   arr.forEach((val, index) => {
  //     if (val != arr[index + 1]) {
  //       newArr.push(val);
  //     }
  //   });
  //   return newArr;
  // }

  interface Checked {
    checked?: boolean;
  }
  type CardList = Checked &
    CbdApiAppletOrderMemberCardConsumerPreviewGetResponse[0];
  const cardList = ref<CardList[]>([]);

  const [getList] = useFuncProxy(async () => {
    uni.showLoading({ title: "加载中..." });
    const d = await cbdApiAppletOrderMemberCardConsumerPreviewGet({
      ...searchData,
      amount: payAmount.value,
      blockMemberCardCodes: chooseCardIdArr.value.join(",")
    });
    cardList.value = d.map((item) => {
      return {
        ...item,
        checked: chooseCardIdArr.value.includes(item.memberCardCode)
      };
    });
    if (chooseCardArr.value.length) {
      chooseCardArr.value.forEach((item) => {
        cardList.value.unshift({ ...item, checked: true });
      });
    }
    uni.hideLoading();
  });

  const onConfirm = async () => {
    if (payData.orderNo) {
      if (chooseCardArr.value.length) {
        console.log("储蓄卡支付");
        const cardPayData: CbdApiAppletOrderSubmitPaymentPostRequest = {
          serialNo: payData.serialNo,
          orderList: [
            {
              storeId: Number(payData.storeId),
              venueId: Number(payData.venueId),
              orderNo: payData.orderNo,
              orderRemark: "",
              wechatAmt: Number(wxPayMoney.value),
              memberCardList: chooseCardArr.value
            }
          ]
        };
        console.log(cardPayData, "---*---");
        showPayLoading.value = true;
        await toCardPay(cardPayData);
      } else {
        console.log("wx支付");
        const res = await cashCardStore.getWXPaySign(payData.orderNo);
        setTimeout(() => {
          cashCardStore.doWXPay(res, payData.payAmt);
        }, 1000);
      }
    } else {
      cashCardStore.setOrderPaymentCard(
        Number(wxPayMoney.value),
        chooseCardArr.value,
        onlyKey.value
      );
      uni.navigateBack();
    }
  };

  let timer: any = null;
  //储蓄卡支付
  const toCardPay = async (data: CbdApiAppletOrderSubmitPaymentPostRequest) => {
    try {
      const d = await cashCardStore.cardPay(data);
      timer = setInterval(() => {
        getCardPayResult(d.orderNo);
      }, 1000);
    } catch (e) {
      console.error(e);
      showPayLoading.value = false;
    }
  };

  const cardPayResult = ref(0);
  const cardPayOrderNo = ref("");

  const showPayLoading = ref(false); //支付状态弹窗
  const loadingStatus = ref("loading");
  const contentText = reactive({
    contentdown: "查看更多",
    contentrefresh: "支付中...",
    contentnomore: "没有更多"
  });

  //储蓄卡支付结果
  const getCardPayResult = async (orderNo: string) => {
    try {
      const d = await cashCardStore.getCardPayResult(orderNo);
      if (d.payStatus !== 0) {
        clearInterval(timer);
        timer = null;
        if (d.payStatus === 2) {
          cardPayOrderNo.value = d.orderNo;
          cardPayResult.value = d.payStatus;
          console.log("是否需要微信支付");
          uni.navigateBack();
        } else if (d.payStatus === 1) {
          loadingStatus.value = "nomore";
          contentText.contentnomore = "储蓄卡支付失败";
          showPayLoading.value = false;
        } else {
          loadingStatus.value = "nomore";
          contentText.contentnomore = "储蓄卡支付异常";
          showPayLoading.value = false;
        }
      }
    } catch (e) {
      console.error(e);
      clearInterval(timer);
      timer = null;
      showPayLoading.value = false;
    }
  };
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
