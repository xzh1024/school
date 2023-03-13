<template>
  <i-sys :title="pageTitle" class="recharge-page" nav-theme="light">
    <template v-if="bannerList.length > 0">
      <view class="banner-wrapper">
        <i-banner :banner-list="bannerList" @change="bannerChange">
          <template #item="{ index, item }">
            <view :class="{ active: index === bannerActive }">
              <card-cell style="width: 100%" :info="item" />
            </view>
          </template>
        </i-banner>
      </view>

      <view class="drawer container">
        <view class="scroll-box">
          <i-card-box v-show="amountList.length">
            <view class="sub-title">选择面值</view>
            <view class="list-box">
              <view
                v-for="(item, index) in amountList"
                :key="`${item}-${index}-`"
                class="list-item list-vertical"
                :class="{ 'active-item': activeIndex === item }"
                @tap="amountFastChange(item)"
              >
                {{ item }}元
              </view>
              <view
                class="list-item list-vertical"
                :class="{ 'active-item': activeIndex === 'other' }"
                @tap="openPopup"
              >
                {{ otherValue ? formatPrice(otherValue) : "其他金额" }}
              </view>
            </view>
          </i-card-box>
          <!-- 购卡/充值活动 -->
          <i-card-box v-if="disCountList && disCountList.length > 0">
            <view class="sub-title">{{ pageTitle }}活动</view>
            <view class="list-box list-horizontal">
              <view
                v-for="(item, index) in disCountList"
                :key="item.activityDiscountCode"
                class="list-item list-horizontal-item"
                :class="{
                  'active-item': amountActive === index
                }"
                @tap="amountActive = amountActive === index ? -1 : index"
              >
                {{ item.discountName }}
              </view>
            </view>
          </i-card-box>
          <!-- 消费活动 -->
          <i-card-box
            v-if="
              consumeActivityDiscountList &&
              consumeActivityDiscountList.length > 0
            "
          >
            <view class="sub-title">折扣活动</view>
            <view class="list-box list-horizontal">
              <view
                v-for="item in consumeActivityDiscountList"
                :key="item.activityDiscountCode"
                class="list-item list-horizontal-item"
                :class="{
                  'active-item':
                    consumeActivityDiscountCode === item.activityDiscountCode
                }"
                @tap="
                  consumeActivityDiscountCode =
                    consumeActivityDiscountCode === item.activityDiscountCode
                      ? ''
                      : item.activityDiscountCode
                "
              >
                {{ item.discountName }}
              </view>
            </view>
          </i-card-box>

          <view class="flex agreement">
            <radio
              id="agree"
              :checked="agree"
              color="#FF7200"
              style="transform: scale(0.7)"
              @tap="toggleAgreement"
            />
            <label for="agree" @tap="toggleAgreement">已阅读并同意</label>
            <text class="text-color" @tap="linkInfo">
              &laquo;单用途储值卡使用规范和范围&raquo;
            </text>
          </view>
        </view>
      </view>

      <i-footer>
        <i-card-button
          v-if="pageType === 'recharge'"
          :disabled="!agree"
          style="width: 100%"
          @tap="onRecharge"
        >
          支付￥{{ computedPayAmount }}
        </i-card-button>
        <template v-else>
          <view class="price">￥{{ computedPayAmount }}</view>
          <i-card-button width="240rpx" :disabled="!agree" @tap="toBuy">
            购买
          </i-card-button>
        </template>
      </i-footer>
    </template>

    <i-empty-card v-else />

    <uni-popup
      ref="popup"
      class="popup"
      style="z-index: 101"
      background-color="#ffffff"
    >
      <i-keyboard
        ref="keyboard"
        v-model="otherValue"
        value-type="price"
        @on-confirm="inputChange"
        @cancel="onCancelPopup"
      />
    </uni-popup>
  </i-sys>
</template>

<script setup lang="ts">
  import NP from "number-precision";
  import { onLoad } from "@dcloudio/uni-app";
  import { computed, ref } from "vue";
  import { formatPrice } from "@/utils";
  import {
    svcAppletCardListGet,
    SvcAppletCardListGetResponse,
    svcAppletActivityDiscountListGet,
    SvcAppletActivityDiscountListGetResponse,
    svcAppletMemberCardBuyPost,
    svcAppletMemberCardRechargePost,
    SvcAppletMemberCardRechargePostResponse
  } from "@/api/card";
  import useFuncProxy from "@/hooks/useFuncProxy";
  import CardCell from "../cardRecord/_component_/card-cell.vue";
  // banner
  const bannerActive = ref(0);
  const bannerList = ref<SvcAppletCardListGetResponse>([]);
  function bannerChange(index: number) {
    bannerActive.value = index;
    otherValue.value = "";
    const list = bannerList.value[bannerActive.value]?.amounts || [];
    activeIndex.value = list[0] || 0;
    payAmount.value = list[0] || 0;
    getDisCountList();
  }
  // 充值金额
  const payAmount = ref(0);
  const activeIndex = ref<string | number>(0);
  const otherValue = ref("");
  function amountFastChange(price: number) {
    if (activeIndex.value === price) return;
    activeIndex.value = price;
    payAmount.value = price;
    otherValue.value = "";
    getDisCountList();
  }

  const popup = ref();
  const keyboard = ref();
  function openPopup() {
    amountActive.value = "";
    disCountList.value = [];
    consumeActivityDiscountCode.value = "";
    consumeActivityDiscountList.value = [];
    payAmount.value = 0;
    activeIndex.value = "other";
    keyboard.value?.reset();
    popup.value?.open("bottom");
  }
  function inputChange(value: string) {
    payAmount.value = Number(value);
    otherValue.value = value;
    getDisCountList();
    onCancelPopup();
  }

  function onCancelPopup() {
    popup.value?.close();
    keyboard.value?.reset();
  }

  // 活动优惠
  const amountActive = ref();
  const amountList = computed(() => {
    return bannerList.value[bannerActive.value]?.amounts || [];
  });

  const computedPayAmount = computed(() => {
    if (!!disCountList.value?.length && amountActive.value > -1) {
      const currentDiscount = disCountList.value[amountActive.value];
      // 1:满减；2：满赠；3：满折
      if (currentDiscount.type === 1) {
        return formatPrice(
          NP.minus(payAmount.value, currentDiscount.discountAmount)
        );
      } else if (currentDiscount.type === 3) {
        return formatPrice(
          NP.times(payAmount.value, NP.minus(1, currentDiscount.discountAmount))
        );
      }
    }
    return formatPrice(payAmount.value);
  });

  // 消费活动
  const consumeActivityDiscountCode = ref();
  const consumeActivityDiscountList = ref<
    SvcAppletActivityDiscountListGetResponse["consumeActivityDiscounts"]
  >([]);
  // 优惠信息
  const disCountList = ref<
    SvcAppletActivityDiscountListGetResponse["activityDiscounts"]
  >([]);
  const [getDisCountList] = useFuncProxy(async () => {
    amountActive.value = "";
    disCountList.value = [];
    uni.showLoading({ title: "加载中..." });
    const d = await svcAppletActivityDiscountListGet({
      cardCode: bannerList.value[bannerActive.value].cardCode,
      amount: String(payAmount.value),
      // 场景:1购卡；2充值；3消费
      scene: pageType.value === "recharge" ? "2" : "1"
    });
    // 活动优惠
    const findIndex =
      d?.activityDiscounts?.findIndex((item) => item.defaultOne === true) ?? -1;

    if (findIndex > -1) {
      amountActive.value = findIndex;
    }
    // console.log(amountActive.value, findIndex);

    disCountList.value = d.activityDiscounts || [];
    // 消费活动
    const findItem = d?.consumeActivityDiscounts?.find(
      (item) => item.defaultOne === true
    );

    if (findItem) {
      consumeActivityDiscountCode.value = findItem.activityDiscountCode;
    } else {
      consumeActivityDiscountCode.value = "";
    }
    consumeActivityDiscountList.value = d.consumeActivityDiscounts || [];
    uni.hideLoading();
  });

  // 协议
  const agree = ref(false);
  function toggleAgreement() {
    agree.value = !agree.value;
  }
  // 校验参数
  function validate() {
    if (activeIndex.value === 0) {
      uni.showToast({ title: "请选择面值", icon: "none" });
      return false;
    }
    if (Number(computedPayAmount.value) <= 0) {
      uni.showToast({ title: "面值金额不能为0", icon: "none" });
      return false;
    }
    if (!agree.value) {
      uni.showToast({ title: "请阅读并勾选协议内容", icon: "none" });
      return false;
    }
    // if (amountActive.value === "") return false;
    return true;
  }
  // 购买
  async function toBuy() {
    if (validate()) {
      uni.showLoading({ title: "请求中..." });
      try {
        const d = await svcAppletMemberCardBuyPost({
          cardCode: bannerList.value[bannerActive.value].cardCode,
          activityDiscountCode:
            // @ts-ignore
            disCountList.value[amountActive.value]?.activityDiscountCode || "",
          // @ts-ignore
          actAmount: computedPayAmount.value,
          consumeActivityDiscountCode: consumeActivityDiscountCode.value,
          amount: payAmount.value
        });
        toPay(d);
        uni.hideLoading();
      } catch (e) {
        console.log(e);
      }
    }
  }
  const memberCardCodeData = ref("");
  // 充值
  async function onRecharge() {
    if (validate()) {
      uni.showLoading({ title: "请求中..." });
      try {
        const d = await svcAppletMemberCardRechargePost({
          // @ts-ignore
          memberCardCode: memberCardCodeData.value,
          activityDiscountCode:
            // @ts-ignore
            disCountList.value[amountActive.value]?.activityDiscountCode || "",
          // @ts-ignore
          actAmount: computedPayAmount.value,
          consumeActivityDiscountCode: consumeActivityDiscountCode.value,
          amount: payAmount.value
        });
        toPay(d);
        uni.hideLoading();
      } catch (e) {
        uni.hideLoading();
      }
    }
  }
  // 支付
  function toPay(payData: SvcAppletMemberCardRechargePostResponse) {
    uni.requestPayment({
      provider: "wxpay",
      orderInfo: payData.orderNo,
      timeStamp: payData.timestamp,
      nonceStr: payData.noncestr,
      package: payData.dataPackage,
      signType: payData.signType,
      paySign: payData.paysign,
      success() {
        uni.navigateTo({
          url: `/pages/card/recharge/result?orderNo=${payData.orderNo}&pageType=${pageType.value}`
        });
      },
      fail() {
        uni.showToast({ title: "支付已取消", icon: "none" });
      },
      complete() {}
    });
  }
  // 储值卡指引
  function linkInfo() {
    uni.navigateTo({
      url: "/pages/card/agreement/agreement"
    });
  }

  const cardNoSearch = ref("");
  const activityCodeSearch = ref("");
  const sceneSearch = ref(1);
  const [getCardList] = useFuncProxy(async () => {
    const d = await svcAppletCardListGet({
      cardCode: cardNoSearch.value,
      activityCode: activityCodeSearch.value,
      status: "1",
      scene: String(sceneSearch.value)
    });
    bannerActive.value = 0;
    bannerList.value = d;
    if (d[0]?.amounts) {
      amountFastChange(d[0].amounts[0]);
    }
  });

  const pageType = ref("");
  const pageTitle = computed(() => {
    return pageType.value === "recharge" ? "充值" : "购卡";
  });
  onLoad((options: any) => {
    const { type, cardNo, activityCode, memberCardCode } = options;
    if (type) {
      pageType.value = type;
      sceneSearch.value = type === "recharge" ? 2 : 1;
    }
    if (cardNo) {
      cardNoSearch.value = cardNo;
    }
    if (activityCode) {
      activityCodeSearch.value = activityCode;
    }
    if (memberCardCode) {
      memberCardCodeData.value = memberCardCode;
    }

    getCardList();
  });
</script>

<style lang="scss" src="../common.scss"></style>
<style lang="scss" scoped>
  .active {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .drawer {
    position: absolute;
    width: 100%;
    height: calc(100% - 370rpx - 32rpx - 100rpx);
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background: #fff linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%);
    border-radius: 32rpx 32rpx 0px 0px;
    padding-bottom: calc(160rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(160rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
    overflow: hidden auto;
  }

  .scroll-box {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .list-box {
    margin-top: 24rpx;
    display: flex;
    flex-wrap: wrap;
  }

  .list-item {
    border: 2rpx solid #f7f8fa;
    background-color: #f7f8fa;
    border-radius: 16rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    font-weight: 400;
    color: #383840;
    line-height: 44rpx;
    text-align: center;

    &.active-item {
      border-color: #ff811a;
      color: #ff811a;
      background-color: #ffffff;
    }

    &.disabled-item {
      border-color: #f7f8fa;
      color: #9c9ca0;
      background-color: #f7f8fa;
    }
  }

  .list-vertical {
    width: 202rpx;
    height: 76rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    &:not(:nth-child(3n)) {
      margin-right: 16rpx;
    }

    &:nth-child(n + 4) {
      margin-top: 16rpx;
    }
  }

  .list-horizontal {
    flex-direction: column;
  }

  .list-horizontal-item {
    padding: 16rpx 24rpx;
    box-sizing: border-box;

    & + .list-horizontal-item {
      margin-top: 24rpx;
    }
  }

  .agreement {
    margin-top: 32rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #383840;
  }

  .text-color {
    color: #ff811a;
  }

  .price {
    flex: 1;
    font-size: 40rpx;
    color: #f03020;
    font-weight: 500;
    line-height: 48rpx;
    &::before {
      content: "实付:";
      font-size: 32rpx;
      color: #383840;
    }
  }

  .banner-wrapper {
    background: linear-gradient(0deg, #232323 0%, #323232 100%);
  }

  .recharge-page {
    :deep(.page-body) {
      background-color: #323232;
    }
    :deep(.i-navbar-box) {
      background-color: #323232;

      .center {
        color: #fff;
      }

      .uni-icons {
        color: #ffffff !important;
      }

      &::after {
        border: none;
      }
    }
  }
</style>
