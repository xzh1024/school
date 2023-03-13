<template>
  <i-sys title="订单预览" nav-placeholder nav-bg="bg-white">
    <view class="order-preview">
      <view class="order-list">
        <view v-for="(item, index) in orderList" :key="index">
          <i-card
            :title="item.storeName"
            body-padding="0 32rpx"
            @title-click="titleClick(item)"
          >
            <shop-gym-item
              v-for="(pg, gIndex) in item.skuList"
              :key="gIndex"
              class="shop-gym-item"
              :item="pg"
              :type="orderType"
            />
          </i-card>
          <view class="cell-box">
            <i-cell
              label="支付方式"
              :right-icon="true"
              :value="`微信支付  ${surplusPay(item.totalPrice, item.key)}  元`"
              @click="
                toChoosePaymentMethod(
                  item.orderMark,
                  item.storeId,
                  item.totalPrice,
                  item.key,
                  item.venueId
                )
              "
            />
            <i-cell
              v-for="cardItem in useCashCardStore.orderPaymentArr[index]
                .cardPay"
              :key="cardItem.memberCardCode"
              :label="cardItem.cardName"
              right-icon
              :value-color="'#F45858'"
              :value="`${cardItem.amount}元，已优惠${cardItem.discountAmount}元`"
              @click="
                toChoosePaymentMethod(
                  item.orderMark,
                  item.storeId,
                  item.totalPrice,
                  item.key,
                  item.venueId
                )
              "
            ></i-cell>
          </view>
          <!-- <i-cell label="小计"></i-cell> -->
          <i-card title="优惠" :left-icon="false" body-padding="0 32rpx">
            <i-cell
              v-if="item.memberDisct === 1"
              badge-text="惠"
              label="会员折扣"
              right-icon
              :value="
                item.memberDisctAmt > 0
                  ? `-￥${item.memberDisctAmt}`
                  : '不使用优惠'
              "
              :value-color="item.memberDisctAmt > 0 ? '#F45858' : '#999999'"
              @click="vipHandle(item, 'vip')"
            ></i-cell>
            <i-cell
              badge-text="券"
              label="优惠券"
              right-icon
              :value="
                item.couponAmt > 0 ? `-￥${item.couponAmt}` : '不使用优惠'
              "
              :value-color="item.couponAmt > 0 ? '#F45858' : '#999999'"
              @click="couponHandle(item, 'coupon')"
            ></i-cell>
            <i-cell
              v-if="orderInfo.integral"
              badge-text="积"
              label="积分抵现"
              right-icon
              :value="
                item.integralAmt > 0 ? `-￥${item.integralAmt}` : '不使用优惠'
              "
              :value-color="item.integralAmt > 0 ? '#F45858' : '#999999'"
              @click="integralHandle(item, 'integral')"
            ></i-cell>
            <i-cell
              badge-text="卡"
              label="储值卡优惠"
              right-icon
              :value-color="
                getCardDiscount(
                  useCashCardStore.orderPaymentArr[index].cardPay
                ) > 0
                  ? '#F45858'
                  : '#999999'
              "
              :value="
                getCardDiscount(
                  useCashCardStore.orderPaymentArr[index].cardPay
                ) > 0
                  ? `-￥${getCardDiscount(
                      useCashCardStore.orderPaymentArr[index].cardPay
                    )}`
                  : '无'
              "
              @click="onShowCard(item.key)"
            />
            <view class="flex padding-top justify-end">
              <view class="flex">
                <view class="discount">已优惠:</view>
                <view class="discount-price"
                  >￥{{
                    getDiscount(
                      item.discountTotal,
                      useCashCardStore.orderPaymentArr[index].cardPay
                    )
                  }}</view
                >
              </view>
              <view class="total-price"
                >小计:￥{{
                  formatPrice(
                    NP.minus(
                      skuListTotalPrice(item.skuList, 0),
                      getDiscount(
                        item.discountTotal,
                        useCashCardStore.orderPaymentArr[index].cardPay
                      )
                    )
                  )
                }}</view
              >
            </view>
          </i-card>
          <i-card :title-show="false" body-padding="24rpx 32rpx 0">
            <view class="flex align-start">
              <view class="remark">备注</view>
              <textarea
                v-model="item.buyerMsg"
                class="textarea"
                placeholder="请输入备注"
                placeholder-class="placeholder"
              ></textarea>
            </view>
          </i-card>
        </view>
      </view>
      <view class="footer-accounts flex space-between align-center">
        <view class="flex">
          <view class="image-box">
            <image
              class="image"
              src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/order/shop-bag.png"
            ></image>
          </view>
          <view>
            <view class="real-price"
              >￥ <text class="p">{{ orderTotalPrice }}</text></view
            >
            <view class="total-discount-price">￥{{ originalPice }}</view>
          </view>
        </view>
        <view>
          <i-button
            type="primary"
            size="medium"
            :width="172"
            round
            @click="submit"
            >去结算</i-button
          >
        </view>
      </view>
    </view>
    <i-dialog v-if="showPayLoading" :has-footer="false">
      <uni-load-more :status="loadingStatus" :content-text="contentText" />
    </i-dialog>
    <uni-popup ref="refPopup" type="bottom">
      <view class="head flex space-between align-center">
        <view class="title">{{ expendTitle }}</view>
        <view @click="close">
          <image
            class="image"
            src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/coupon-close.png"
          ></image>
        </view>
      </view>
      <template v-if="expendType === 'coupon'">
        <scroll-view class="scroll-view" scroll-y>
          <view class="coupon-list">
            <coupon-item
              v-for="(item, index) in currentItem.couponList"
              :key="index"
              :checked="currentItem.cpId === item.cpId"
              checkbox
              :item="item"
              source="order"
              @change="(v) => couponChange(v, item)"
            ></coupon-item>
          </view>
        </scroll-view>
      </template>
      <template v-else>
        <view class="coupon-list">
          <view class="flex align-center space-between">
            <view v-if="expendType === 'vip'" class="coupon-title">{{
              orderInfo.memberDisctRate
                ? `不使用${orderInfo.memberDisctRate * 10}折优惠`
                : `无折扣优惠`
            }}</view>
            <view v-else class="coupon-title">不使用积分折扣</view>
            <image
              v-if="expendType === 'vip'"
              class="check-image"
              :src="
                vipDiscount <= 0
                  ? 'https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/coupon-checked.png'
                  : 'https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/coupon-check.png'
              "
              @click="vipChange"
            ></image>
            <image
              v-else
              class="check-image"
              :src="
                NotUseIntegral
                  ? 'https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/coupon-checked.png'
                  : 'https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/coupon-check.png'
              "
              @click="integralChange"
            ></image>
          </view>
        </view>
      </template>
      <view class="bot-btn">
        <i-button type="primary" size="medium" round @click="confirm"
          >确认</i-button
        >
      </view>
    </uni-popup>
  </i-sys>
</template>
<script setup lang="ts">
  import IButton from "@/components/i-button/index.vue";
  import ICard from "@/components/i-card/index.vue";
  import ICell from "@/components/i-cell/index.vue";
  import { onLoad, onUnload } from "@dcloudio/uni-app";
  import { computed, reactive, ref, watch } from "vue";
  import {
    cbdApiAppletOrderCouponPost,
    cbdApiAppletOrderGeneratePost,
    cbdApiAppletOrderPreviewPost
  } from "@/api";
  import NP from "number-precision";
  import { formatPrice } from "@/utils";
  import CouponItem from "../../components/coupon-item/index.vue";
  import ShopGymItem from "../../components/common/shop-gym-item/index.vue";
  import { useShopCartStore } from "@/stores/shopCart";
  import { usePlaceStore } from "@/stores/place";
  import { useCashCard } from "@/stores/cashCard";
  import IDialog from "@/components/i-dialog/i-dialog.vue";
  import { delCartBySkuId } from "@/utils/shopCart";

  // todo  整体计算 代码优化  可复用比较多

  // type: 1商品 2场馆; gymType: 22时段 23包场
  onLoad((e: any) => {
    const { type, gymType: t } = e;
    orderType.value = Number(type);
    gymType.value = Number(t);
    getLocalSku();
    getOrderInfo(false);
    // 重置储蓄卡选择
    useCashCardStore.clearOrderPaymentArr();
  });

  onUnload(() => {
    if (timer) {
      clearInterval(timer);
    }
    // useCashCardStore.clearOrderPaymentArr();
  });

  const orderType = ref();
  const gymType = ref();
  const orderInfo: any = ref({});

  const currentItem: any = ref({});
  const refPopup: any = ref(null);
  const expendType = ref(""); // coupon 优惠券   vip 会员折扣  integral 积分
  const vipDiscount = ref(0);
  // 是否是用积分抵扣
  const NotUseIntegral = ref(false);

  // const btnDisabled = ref(false);
  // const skuList = ref([]);

  const initialStoreList: any = ref([]);

  // 排列hash组
  const rankHash: any = {};
  // 原始价格
  const initPrice: any = {};

  const shopCartStore = useShopCartStore();
  const placeStore = usePlaceStore();
  const storeList = computed(() => {
    return shopCartStore.storeList || [];
  });
  const placeInfo = computed(() => {
    return placeStore.$state;
  });
  function getLocalSku() {
    if (orderType.value === 1) {
      initialStoreList.value = storeList.value;
    } else {
      const {
        venueId,
        chooseTimeArr = [],
        storeId,
        placeCard
      } = placeInfo.value;
      // console.log(placeInfo.value);
      const t = gymType.value;
      initialStoreList.value = [
        {
          venueId,
          storeId,
          type: gymType.value,
          timeList: t === 22 ? chooseTimeArr : null,
          venue: t === 23 ? placeCard : null
        }
      ];
    }
  }

  //获取已优惠金额
  const getDiscount = (discountTotal: any, cardPay: any) => {
    return formatPrice(NP.plus(discountTotal, getCardDiscount(cardPay)));
  };

  // 获取总价  计算小计 添加KEY  初始化 积分抵扣
  async function getOrderInfo(b = true) {
    try {
      b && uni.showLoading({ title: "加载中..." });
      const res = await cbdApiAppletOrderPreviewPost({
        storeList: initialStoreList.value,
        orderType: orderType.value
      });
      const { orderList = [] } = res;
      const { integral, integralRule } = res;
      // 使用计算积分
      let calcIntegral = integral;
      let totalPrice = 0;
      const newOrderList: any = [];
      orderList.forEach((i: any, index) => {
        const key = new Date().getTime() + index;
        let { couponAmt } = i;
        const { memberDisctAmt } = i;

        const { skuList = [] } = i;
        totalPrice = skuListTotalPrice(skuList, 0);

        if (NP.minus(totalPrice, couponAmt) < 0) {
          couponAmt = NP.minus(totalPrice, memberDisctAmt, 0.01);
        }

        // 除去优惠券 会员折扣
        const surplusPrice = NP.minus(totalPrice, couponAmt, memberDisctAmt);
        const { integralDiscount, surplusIntegral, maxUseIntegral } =
          calcIntegralDiscount(integralRule, surplusPrice, calcIntegral);

        calcIntegral = surplusIntegral;
        // 存入初始优惠内容
        initPrice[key] = { couponAmt, memberDisctAmt };

        let discountTotal: any = formatPrice(
          NP.plus(couponAmt, memberDisctAmt, integralDiscount)
        );
        if (discountTotal >= totalPrice)
          discountTotal = NP.minus(totalPrice, 0.01);
        totalPrice = NP.minus(totalPrice, discountTotal);
        // console.log(totalPrice,"totalPrice")
        totalPrice = totalPrice <= 0 ? 0.01 : totalPrice;
        // console.log(totalPrice,"totalPrice")
        newOrderList.push({
          ...i,
          discountTotal,
          totalPrice: formatPrice(totalPrice),
          key,
          integralAmt: integralDiscount,
          integral: maxUseIntegral
        });
      });
      setOrderPaymentArr(newOrderList);
      orderInfo.value = {
        ...res,
        orderList: newOrderList,
        calcIntegral
      };
      rankList(newOrderList);
    } catch (e) {
      console.error(e);
    } finally {
      b && uni.hideLoading();
    }
  }
  const orderList = computed(() => {
    return orderInfo.value?.orderList || [];
  });

  const useCashCardStore = useCashCard();
  console.log(useCashCardStore.orderPaymentArr);

  //设置每笔订单支付方式
  const setOrderPaymentArr = (data: any) => {
    console.log(data, "--data--");
    data.forEach((item: any) => {
      const { key, storeId, totalPrice: wxPay, orderMark } = item;
      useCashCardStore.setOrderPaymentArr({
        key,
        orderMark,
        storeId,
        wxPay,
        cardPay: []
      });
    });
  };

  // 订单总价
  const orderTotalPrice = computed(() => {
    const p = orderList.value.reduce((prev: any, next: any) => {
      return NP.plus(prev, next.totalPrice);
    }, 0);
    const d = NP.minus(p, Number(useCashCardStore.cardPayTotal));
    return formatPrice(d > 0 ? d : 0);
  });

  // 优惠总价
  // const totalDiscountPrice = computed(() => {
  //   const cardDiscount = useCashCardStore.orderPaymentArr.reduce(
  //     (pre, current) => {
  //       return pre + getCardDiscount(current.cardPay);
  //     },
  //     0
  //   );
  //   const p = orderList.value.reduce((prev: any, next: any) => {
  //     return NP.plus(prev, next.discountTotal);
  //   }, 0);
  //   return formatPrice(p + cardDiscount);
  // });
  //原价
  const originalPice = computed(() => {
    return formatPrice(
      orderList.value.reduce((pre: number, current: any) => {
        return NP.plus(pre, skuListTotalPrice(current.skuList, 0));
      }, 0)
    );
  });

  // 弹窗标题
  const expendTitle = computed(() => {
    const t = expendType.value;
    if (t === "coupon") return "选择优惠券";
    if (t === "vip") return "会员折扣";
    return "积分抵现";
  });

  async function couponHandle(item: any, typeSting: any) {
    expendType.value = typeSting;
    try {
      let res = [];
      res = await cbdApiAppletOrderCouponPost({
        storeId: item.storeId,
        list: item.skuList,
        type: item.type
      });
      const { key } = item;
      console.log(key, "couponList key");
      console.log(rankHash, "couponList rankHash");
      const currentRule = rankHash[key];
      // 可使用list
      const availableList: any = [];
      // 不可用list
      const notAvailableList: any = [];
      console.log(currentRule, "currentRule");
      res.forEach((i) => {
        // 是否可使用
        let available = true;
        const { prdList = [], thresholdAmount = 0 } = i;
        const prdStr = prdList.join();
        const index = currentRule.findIndex(
          (j: any) => (j.skuIds || j.venueIds)?.join() === prdStr
        );
        // 描述
        const availableDesc = "未达到满减金额";
        // 命中规则 并且 一定能命中其中某一规则
        /*  if(index===-1) {
          available = false
          availableDesc = '该商品不可用'
        }*/
        if (thresholdAmount > 0) {
          const price = currentRule[index]?.disctdPrice;
          if (thresholdAmount > price) available = false;
        }
        const p = {
          ...i,
          available,
          availableDesc: available ? "" : availableDesc,
          rule: currentRule[index]
        };
        if (available) {
          availableList.push(p);
        } else {
          notAvailableList.push(p);
        }
      });
      currentItem.value = {
        ...item,
        couponList: availableList.concat(notAvailableList)
      };

      refPopup.value.open();
    } catch (e) {
      console.error(e);
    }
  }

  function confirm() {
    refPopup.value.close();
    const t = expendType.value;
    if (t === "coupon") {
      const { couponList = [], cpId } = currentItem.value;
      const item = couponList.find((i: any) => i.cpId === cpId);
      calcCouponPrice(item);
    } else if (t === "vip") {
      calcVipDiscount();
    } else {
      const { integralAmt } = currentItem.value;
      if (Boolean(!integralAmt) === NotUseIntegral.value) return;
      calcTotalIntegralDiscount();
    }
  }
  function close() {
    refPopup.value.close();
  }

  function couponChange(v: any, item: any) {
    currentItem.value.cpId = v ? item.cpId : "";
  }

  function calcCouponPrice(item: any = {}) {
    let { calcIntegral } = orderInfo.value;
    const { discount = 0, type, thresholdAmount = 0 } = item;
    const { skuList = [], memberDisctAmt, integralAmt } = currentItem.value;

    // 优惠总价
    let discountTotalPrice = discount;

    // 商品总价
    const initTotalPrice = skuListTotalPrice(skuList, 0);
    let totalPrice = initTotalPrice;
    if (
      thresholdAmount === 0 ||
      (thresholdAmount > 0 && totalPrice >= thresholdAmount)
    ) {
      totalPrice = NP.minus(totalPrice, memberDisctAmt, discount);
    }
    if (totalPrice <= 0 && type) {
      // 优惠
      discountTotalPrice = NP.minus(initTotalPrice, 0.01);
      // 最低支付0.01
      totalPrice = 0.01;
    }

    if (integralAmt > 0) {
      calcIntegral = NP.plus(calcIntegral, integralReturn(integralAmt));
    }

    currentItem.value.totalPrice = totalPrice;
    currentItem.value.integralAmt = 0;
    // 总计优惠
    currentItem.value.discountTotal = NP.plus(
      memberDisctAmt,
      discountTotalPrice
    );
    // 优惠券展示金额 （字段不一）
    currentItem.value.couponAmt = discount;
    const list = orderList.value;
    const index = list.findIndex((i: any) => i.key === currentItem.value.key);
    list[index] = currentItem.value;
    orderInfo.value = {
      ...orderInfo.value,
      orderList: list,
      calcIntegral
    };
  }

  function getPriceGroup(data: any, index = 0, group: any = []): any {
    const need_apply = [];
    const { skuId, disctdPrice, venueId } = data[index];
    if (orderType.value === 1) {
      need_apply.push({ skuIds: [skuId], disctdPrice: Number(disctdPrice) });
    } else {
      need_apply.push({
        venueIds: [venueId],
        disctdPrice: Number(disctdPrice)
      });
    }

    for (let i = 0; i < group.length; i++) {
      const {
        skuIds: sku = [],
        disctdPrice: price = 0,
        venueIds = []
      } = group[i];
      // console.log(sku,'skuIdsskuIds')
      const p = Number(NP.plus(disctdPrice, price));
      if (orderType.value === 1) {
        need_apply.push({ skuIds: [...sku, skuId], disctdPrice: p });
      } else {
        need_apply.push({ venueIds: [...venueIds, skuId], disctdPrice: p });
      }
    }
    group.push(need_apply);
    if (index + 1 >= data.length) {
      return group;
    }
    return getPriceGroup(data, index + 1, group);
  }

  // 排列单笔订单中所有商品组合和组合总价；
  // 优惠券根据命中组合的总价计算优惠
  function rankList(arr: any) {
    const list = arr ? arr : orderList.value;
    // console.log(list, "list");
    list.forEach((i: any) => {
      const { key, skuList = [] } = i;
      rankHash[key] = getPriceGroup(skuList);
    });
  }

  function vipHandle(item: any, type: any) {
    currentItem.value = item;
    expendType.value = type;
    vipDiscount.value = item.memberDisctAmt;
    refPopup.value.open();
  }

  function vipChange() {
    const { key } = currentItem.value;
    // 取消优惠
    if (vipDiscount.value > 0) {
      vipDiscount.value = 0;
    } else {
      vipDiscount.value = initPrice[key]?.memberDisctAmt || 0;
    }
  }
  function integralChange() {
    NotUseIntegral.value = !NotUseIntegral.value;
    console.log(NotUseIntegral.value, "NotUseIntegral.value");
  }

  function integralHandle(item: any, type: any) {
    currentItem.value = item;
    expendType.value = type;
    NotUseIntegral.value = !item.integralAmt;
    refPopup.value.open();
  }

  function calcVipDiscount() {
    const { key } = currentItem.value;
    let { orderList = [], calcIntegral } = orderInfo.value;
    const discount = vipDiscount.value;
    orderList = orderList.map((i: any) => {
      let { memberDisctAmt } = i;
      const { integralAmt } = i;
      if (key === i.key) memberDisctAmt = discount;
      const { skuList = [] } = i;
      let totalPrice = skuListTotalPrice(skuList, 0);
      totalPrice = NP.minus(totalPrice, memberDisctAmt);
      if (integralAmt > 0) {
        calcIntegral = NP.plus(calcIntegral, integralReturn(integralAmt));
      }
      return {
        ...i,
        cpId: "",
        couponAmt: 0,
        integralAmt: 0,
        memberDisctAmt,
        totalPrice: formatPrice(totalPrice),
        discountTotal: formatPrice(memberDisctAmt)
      };
    });
    orderInfo.value.orderList = orderList;
    orderInfo.value.calcIntegral = calcIntegral;
  }

  function integralReturn(integralAmt: any) {
    const { integralRule = {} } = orderInfo.value;
    const { rate = 0 } = integralRule;
    return NP.times(integralAmt, rate);
  }

  function skuListTotalPrice(skuList = [], discount: any) {
    return skuList.reduce((prev: any, next: any) => {
      if (discount <= 0) {
        return NP.plus(prev, NP.times(next.prdNum, next.prdPrice));
      }
      return NP.plus(prev, NP.times(next.prdNum, next.disctdPrice));
    }, 0);
  }

  // 积分计算  返回可优惠金额
  function calcIntegralDiscount(rule: any, totalPrice: any, integral: any) {
    const { rate, minAmt, limitType, limitAmt, ruleStatus = 1 } = rule; //ruleStatus 默认关闭

    if (integral <= 0 || ruleStatus === 1)
      return { integralDiscount: 0, surplusIntegral: integral };
    // console.log(totalPrice < minAmt, "totalPrice < minAmt");
    // 小于门槛   门槛默认为1
    if (totalPrice < minAmt)
      return { integralDiscount: 0, surplusIntegral: integral };
    // console.log("calcIntegralDiscount  inner");
    // 已积分为点
    let max = 0;
    if (limitType === 1) {
      max = Math.floor(NP.times(totalPrice, rate));
      console.log(max, "max");
    } else if (limitType === 2) {
      max = Math.floor(NP.times(limitAmt, rate));
    } else {
      max = Math.floor(
        NP.times(NP.times(totalPrice, NP.divide(limitAmt, 100)), rate)
      );
    }
    if (max > integral) {
      max = integral;
    }
    // 优惠价格
    let integralDiscount = NP.divide(
      Math.floor(NP.times(NP.divide(max, rate), 100)),
      100
    );
    if (integralDiscount >= totalPrice) {
      const maxDiscount = NP.minus(totalPrice, 0.01);
      max = Math.floor(NP.times(maxDiscount, rate));
      integralDiscount = NP.divide(
        Math.floor(NP.times(NP.divide(max, rate), 100)),
        100
      );
    }
    // 剩余积分
    integral = NP.minus(integral, max);
    return { integralDiscount, surplusIntegral: integral, maxUseIntegral: max };
  }

  // 计算总计所有积分
  function calcTotalIntegralDiscount() {
    const { integralRule = {}, calcIntegral = 0 } = orderInfo.value;
    const { rate } = integralRule;
    let { orderList = [] } = orderInfo.value;
    let newCalcIntegral = calcIntegral;
    console.log(NotUseIntegral.value, "NotUseIntegral.value");
    if (!NotUseIntegral.value) {
      const { totalPrice, key } = currentItem.value;
      const { integralDiscount, surplusIntegral, maxUseIntegral } =
        calcIntegralDiscount(integralRule, totalPrice, calcIntegral);
      // 直接重置积分所有
      let flag = false;
      orderList = orderList.map((i: any) => {
        let { integralAmt } = i;
        const { couponAmt, memberDisctAmt, skuList } = i;
        let integral: any = 0;
        if (key === i.key) flag = true;
        if (flag) {
          if (key === i.key) {
            integral = maxUseIntegral;
            integralAmt = integralDiscount;
            newCalcIntegral = surplusIntegral;
          } else {
            newCalcIntegral = NP.plus(
              newCalcIntegral,
              NP.times(integralAmt, rate)
            );
            integralAmt = 0;
          }
        }
        let newTotalPrice = skuListTotalPrice(skuList, 0);
        newTotalPrice = NP.minus(
          newTotalPrice,
          memberDisctAmt,
          couponAmt,
          integralAmt
        );
        const discountTotal = formatPrice(
          NP.plus(couponAmt, memberDisctAmt, integralAmt)
        );
        return {
          ...i,
          integralAmt,
          discountTotal,
          totalPrice: newTotalPrice,
          integral
        };
      });
    } else {
      // 不使用积分
      const { key } = currentItem.value;
      const { rate } = integralRule;
      // newCalcIntegral = NP.times(integralAmt,rate)

      // 直接重置积分所有
      let flag = false;
      orderList = orderList.map((i: any) => {
        let { integralAmt, integral = 0 } = i;
        const { couponAmt, memberDisctAmt, skuList } = i;
        if (key === i.key) flag = true;
        if (flag) {
          // 退还所有积分
          newCalcIntegral = NP.plus(
            newCalcIntegral,
            NP.times(integralAmt, rate)
          );
          integralAmt = 0;
          integral = 0;
        }
        let totalPrice: any = skuListTotalPrice(skuList, 0);
        totalPrice = formatPrice(
          NP.minus(totalPrice, memberDisctAmt, couponAmt, integralAmt)
        );
        const discountTotal = formatPrice(
          NP.plus(couponAmt, memberDisctAmt, integralAmt)
        );
        return { ...i, integralAmt: 0, discountTotal, totalPrice, integral };
      });
    }
    orderInfo.value = {
      ...orderInfo.value,
      calcIntegral: newCalcIntegral,
      orderList
    };
  }

  const showPayLoading = ref(false); //支付状态弹窗
  const loadingStatus = ref("loading");
  const contentText = reactive({
    contentdown: "查看更多",
    contentrefresh: "支付中...",
    contentnomore: "没有更多"
  });
  async function submit() {
    showPayLoading.value = true;
    loadingStatus.value = "loading";
    try {
      const d = await cbdApiAppletOrderGeneratePost({
        orderList: orderList.value
      });
      if (orderType.value === 1) {
        const delArr: any = [];
        orderList.value.forEach((i: any) => {
          const { skuList = [] } = i;
          skuList.forEach((j: any) => {
            delArr.push({
              skuId: j.skuId,
              type: j.type === 21 ? 2 : j.type
            });
          });
        });
        delCartBySkuId(delArr);
      }
      const flag = getPaymentMethod(
        orderList.value.map((item: any) => item.key)
      );
      if (flag) {
        //储蓄卡支付
        const serveData = handleGiveServeData(d);
        console.log(serveData, "----");
        await toCardPay(serveData);
      } else {
        //微信支付
        await wxPaySign(d.serialNo || "");
      }
      // console.log(d, "--*--");
      /*const res = await cbdApiAppletOrderSubmitPost({
          orderList: orderList.value
        });
        if (orderType.value === 1) {
          const delArr: any = [];
          orderList.value.forEach((i: any) => {
            const { skuList = [] } = i;
            skuList.forEach((j: any) => {
              delArr.push({
                skuId: j.skuId,
                type: j.type === 21 ? 2 : j.type
              });
            });
          });
          delCartBySkuId(delArr);
        }
        wxPay(
          res,
          () => {
            uni.redirectTo({
              url: `/pages/order/pay-result?serverNo=${res.serverRspNo}&price=${orderTotalPrice.value}&orderNo=${res.orderNo}`
            });
          },
          () => {}
        );*/
    } catch (e) {
      console.error(e);
      //订单生成异常
      // 重置储蓄卡选择
      useCashCardStore.clearOrderPaymentArr();
      loadingStatus.value = "noMore";
      contentText.contentnomore = "订单生成异常";
      setTimeout(() => {
        showPayLoading.value = false;
        getOrderInfo(false);
      }, 1500);
    }
  }

  //储蓄卡支付
  let timer: any = null;
  const toCardPay = async (data: any) => {
    try {
      const d = await useCashCardStore.cardPay(data);
      console.log(d, "--d--");
      timer = setInterval(() => {
        getCardPayResult(d.orderNo);
      }, 1000);
    } catch (e) {
      console.error(e);
      showPayLoading.value = false;
      setTimeout(() => {
        uni.redirectTo({
          url: `/pages/order/index?status=0`
        });
      }, 1500);
    }
  };

  const cardPayResult = ref(0);
  const cardPayOrderNo = ref("");
  //轮询储蓄卡支付结果
  const getCardPayResult = async (orderNo: string) => {
    try {
      const d = await useCashCardStore.getCardPayResult(orderNo);
      if (d.payStatus !== 0) {
        clearInterval(timer);
        timer = null;
        if (d.payStatus === 2) {
          cardPayOrderNo.value = d.orderNo;
          cardPayResult.value = d.payStatus;
        } else if (d.payStatus === 1) {
          loadingStatus.value = "nomore";
          contentText.contentnomore = "储蓄卡支付失败";
          setTimeout(() => {
            uni.redirectTo({
              url: `/pages/order/index?status=0`
            });
          }, 1500);
        } else {
          loadingStatus.value = "nomore";
          contentText.contentnomore = "储蓄卡支付异常";
          setTimeout(() => {
            uni.redirectTo({
              url: `/pages/order/index?status=0`
            });
          }, 1500);
        }
      }
    } catch (e) {
      console.error(e);
      clearInterval(timer);
      timer = null;
      setTimeout(() => {
        uni.redirectTo({
          url: `/pages/order/index?status=0`
        });
      }, 1500);
    }
  };
  watch(
    () => cardPayResult.value,
    (val) => {
      if (val === 2) {
        if (Number(orderTotalPrice.value) > 0) {
          wxPaySign(cardPayOrderNo.value);
        } else {
          console.log("跳转结果页");
          uni.redirectTo({
            url: `/pages/order/pay-result?serverNo=${cardPayOrderNo.value}&payType=2&orderNo=${cardPayOrderNo.value}&price=${useCashCardStore.cardPayTotal}`
          });
        }
      }
    }
  );
  //微信支付
  const wxPaySign = async (data: string) => {
    try {
      const d = await useCashCardStore.getWXPaySign(data);
      console.log(d, "---*---");
      showPayLoading.value = false;
      useCashCardStore.doWXPay(d, orderTotalPrice.value);
    } catch (e) {
      console.error(e);
      showPayLoading.value = false;
      setTimeout(() => {
        uni.redirectTo({
          url: `/pages/order/index?status=0`
        });
      }, 1500);
    }
  };
  //所有订单中是否包含储蓄卡支付
  const getPaymentMethod = (orderKeyArr: string[]) => {
    return useCashCardStore.orderPaymentArr.some(
      (item: any) => item.cardPay.length > 0 && orderKeyArr.includes(item.key)
    );
  };
  const handleGiveServeData = (d: any) => {
    const orderPaymentArr = useCashCardStore.orderPaymentArr;
    const orderList = d.orderList;
    const orderRemarkArr = orderList?.map((item: any) => item.orderRemark);
    orderRemarkArr.forEach((item: any) => {
      const obj: any = orderPaymentArr.find(
        (sub: any) => sub.orderMark === item
      );
      if (obj) {
        const index = orderList.findIndex(
          (sub: any) => sub.orderRemark === item
        );
        orderList[index] = {
          ...orderList[index],
          wechatAmt: obj.wxPay,
          memberCardList: obj.cardPay
        };
      }
    });
    return { ...d, orderList };
  };

  function titleClick(item: any) {
    const { storeId } = item;
    uni.navigateTo({
      url: `/pages/home/merchants/merchants?storeId=${storeId}&type=2`
    });
  }

  //支付方式
  // const paymentMethod = computed(() => (value: string) => {
  //   if (useCashCardStore.orderPaymentArr.length) {
  //     const obj = useCashCardStore.orderPaymentArr.find(
  //       (item) => item.key === value
  //     );
  //     if (obj && obj.cardPay.length) {
  //       return "微信支付+储蓄卡支付";
  //     } else {
  //       return "微信支付";
  //     }
  //   } else {
  //     return "微信支付";
  //   }
  // });

  //储蓄卡支付金额
  const cardDiscount = computed(() => (value: string) => {
    if (useCashCardStore.orderPaymentArr.length) {
      const obj = useCashCardStore.orderPaymentArr.find(
        (item) => item.key === value
      );
      if (obj && obj.cardPay.length) {
        return obj.cardPay.reduce((pre, cur) => {
          return NP.plus(pre, cur.amount);
        }, 0);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  });
  //单笔订单剩余付款金额
  const surplusPay = computed(() => (totalPrice: string, key: string) => {
    const money = NP.minus(totalPrice, cardDiscount.value(key));
    return money > 0 ? formatPrice(money) : 0;
  });

  //选择支付方式
  const toChoosePaymentMethod = (
    orderMark: string,
    storeId: string,
    payAmt: string,
    onlyKey: string,
    venueId: string
  ) => {
    uni.navigateTo({
      url: `/pages/order/payment-method?orderMark=${orderMark}&&storeId=${storeId}&&payAmt=${payAmt}&&onlyKey=${onlyKey}&&venueId=${venueId}`
    });
  };
  //查看储蓄卡优惠
  const onShowCard = (onlyKey: string) => {
    uni.navigateTo({
      url: `/pages/order/card-offer-preview?onlyKey=${onlyKey}`
    });
  };

  // 小计储值卡优惠
  function getCardDiscount(item: any) {
    return item.reduce((pre: number, current: any) => {
      return pre + current.discountAmount;
    }, 0);
  }
</script>

<style scoped lang="scss">
  .coupon-title {
    font-size: 28rpx;
    color: #333333;
  }
  .check-image {
    width: 32rpx;
    height: 32rpx;
  }
  .head {
    padding: 24rpx 32rpx;
    border-radius: 16rpx 16rpx 0 0;
    background-color: #fff;
    .title {
      font-size: 32rpx;
      color: #2b2d32;
      line-height: 48rpx;
    }
    .image {
      width: 32rpx;
      height: 32rpx;
    }
  }
  .scroll-view {
    height: 900rpx;
    background-color: #f7f7f7;
    box-sizing: border-box;
    padding-bottom: 160rpx;
  }
  .coupon-list {
    height: 900rpx;
    box-sizing: border-box;
    background-color: #f7f7f7;
    padding: 32rpx 32rpx 0 32rpx;
  }
  .bot-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    box-sizing: border-box;
    padding: 24rpx;
    box-shadow: 0 6rpx 12rpx 12rpx rgba(0, 0, 0, 0.1);
    background: #fff;
  }
  .order-preview {
    padding-bottom: 162rpx;
  }
  .order-list {
    padding: 24rpx 32rpx;
    .shop-gym-item {
      &:last-child {
        :deep(.shop-item) {
          border-bottom: none;
        }
      }
    }
    .cell-box {
      box-shadow: 0 8rpx 16rpx 0 rgba(0, 0, 0, 0.08);
      border-radius: 16rpx;
      background: #ffffff;
      padding: 0 32rpx;
      margin-bottom: 32rpx;
    }
    .pay-card {
      padding: 0 32rpx;
      .pay-items {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .footer-accounts {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    padding: 28rpx 32rpx;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0 6rpx 12rpx 12rpx rgba(0, 0, 0, 0.1);
    .image-box {
      width: 112rpx;
      height: 112rpx;
      margin-right: 12rpx;
      .image {
        width: 100%;
        height: 100%;
      }
    }
    .real-price {
      padding-top: 12rpx;
      color: #d93044;
      font-size: 28rpx;
      font-weight: bold;
      line-height: 44rpx;
      .p {
        font-size: 32rpx;
      }
    }
    .total-discount-price {
      text-decoration: line-through;
      font-size: 24rpx;
      color: #999999;
      line-height: 40rpx;
    }
  }
  .remark {
    font-size: 24rpx;
    color: #3e4958;
    line-height: 40rpx;
    padding: 28rpx 24rpx 28rpx 0;
  }
  .placeholder {
    color: #9b9b9b;
    font-size: 24rpx;
  }
  .textarea {
    flex: 1;
    background-color: #ebebeb;
    border-radius: 16rpx;
    padding: 24rpx;
    height: 176rpx;
  }
  .order-preview {
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
</style>
