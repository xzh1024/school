<template>
  <i-sys
    title="购卡"
    :nav-placeholder="true"
    nav-bg="bg-white"
    class="card-purchase"
  >
    <view class="card-purchase-head">
      <CardItem :item="cardData" class="card-item"></CardItem>
    </view>
    <view class="card-purchase-content">
      <i-card :title-show="false" body-padding="0 32rpx" :left-icon="false">
        <i-cell
          label="项目名称"
          :value="info.projectName"
          value-color="#333333"
          no-bottom
        ></i-cell>
        <i-cell
          label="店铺名称"
          :value="info.storeName"
          value-color="#333333"
          no-bottom
        ></i-cell>
        <i-cell
          label="卡名称"
          :value="info.cardName"
          value-color="#333333"
          no-bottom
        ></i-cell>
        <i-cell
          label="产品介绍"
          :value="info.productDescription"
          value-color="#333333"
          no-bottom
        ></i-cell>
        <i-cell
          label="销售时间"
          :value="
            info.saleDateType === 2
              ? `${info.saleDateStart}至${info.saleDateEnd}`
              : '不限时'
          "
          value-color="#333333"
          no-bottom
        ></i-cell>
      </i-card>
      <i-card
        v-if="info.salePriceDataList && info.salePriceDataList.length"
        title="售价信息"
        body-padding="0 32rpx"
        :left-icon="false"
      >
        <template #title>
          <view class="card-head">
            <view class="card-title">售价信息</view>
            <view class="card-head-after">
              <text class="lebel">赠送{{ unit }}数：</text>
              <text class="value">
                {{ selectSalePrice.id ? selectSalePrice.giveNums : 0 }}
              </text>
            </view>
          </view>
        </template>
        <view class="scroll-wrap">
          <scroll-view scroll-x class="scroll-box">
            <view
              v-for="(item, index) in info.salePriceDataList"
              :key="index"
              class="scroll-cell"
              :class="{ active: selectSalePrice.id === item.id }"
              @click="onSalePrice(item)"
            >
              <view class="use-nums">{{ item.useNums + unit }}</view>
              <view class="cell-row">
                <view class="sale-price">￥{{ item.salePrice }}</view>
                <view class="line-price">￥{{ item.listPrice }}</view>
              </view>
            </view>
          </scroll-view>
        </view>
      </i-card>
      <i-card :title-show="false" body-padding="0 32rpx" :left-icon="false">
        <i-cell
          label="支付方式"
          :value="
            cardPayData && cardPayData.payType === 3 ? '储值卡支付' : '微信支付'
          "
          value-color="#333333"
          no-bottom
          right-icon
          @click="toChoosePayment"
        ></i-cell>
      </i-card>

      <i-card :title-show="false" body-padding="0 32rpx" :left-icon="false">
        <i-cell
          label="使用场馆"
          :value="info.venueName"
          value-color="#333333"
          no-bottom
          right-icon
          @click="venueVisible = true"
        ></i-cell>
        <i-cell
          label="激活方式"
          :value="info.activeMethod === 2 ? '指定日期激活' : '全时段'"
          value-color="#333333"
          no-bottom
        ></i-cell>

        <picker
          mode="date"
          :value="activeTime"
          fields="day"
          @change="dateChange"
        >
          <i-cell
            v-if="info.admission === 2"
            label="激活日期"
            :value="activeTime || '请选择日期'"
            value-color="#333333"
            no-bottom
            right-icon
          >
          </i-cell>
        </picker>
        <i-cell
          v-if="info.admission === 1"
          label="使用时间段"
          value="全时段"
          value-color="#333333"
          no-bottom
        ></i-cell>
        <i-cell
          v-if="info.admission === 2"
          label="使用时间段"
          value="特定时段"
          value-color="#333333"
          no-bottom
          right-icon
          @click="admissionTimesVisible = true"
        ></i-cell>
        <i-cell
          label="卡说明"
          :value="info.cardContent"
          value-color="#333333"
          no-bottom
        ></i-cell>
      </i-card>
    </view>
    <view class="card-purchase-footer">
      <view class="footer-content">
        <view class="price-item">
          <view class="label">应付：</view>
          <view class="value">￥{{ selectSalePrice.salePrice || 0 }}</view>
        </view>

        <view class="count-item">
          <view class="label">合计：</view>
          <view class="value">
            {{ countNumber }}
          </view>
        </view>
      </view>
      <view class="footer-button" @click="onSubmit">结算</view>
    </view>
    <!-- <i-date-picker @date-change="dateChange">
      <image
        ref="datePickerBtn"
        class="img-right"
        src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/icons/arrow.png"
      ></image>
    </i-date-picker> -->

    <i-dialog
      v-if="venueVisible"
      title="使用场馆"
      :content="info.venueName"
      :show-cancel="false"
      @dialog-confirm="hideVenue"
    ></i-dialog>
    <i-dialog
      v-if="admissionTimesVisible"
      title="特定使用时段"
      :show-cancel="false"
      :content-height="300"
      @dialog-confirm="hideAdmissionTimes"
    >
      <view style="width: 100%">
        <view v-for="(item, index) in info.admissionTimes" :key="index">
          {{ `${item.weekChinese}：${item.time.join("-")}` }}
        </view>
      </view>
    </i-dialog>
  </i-sys>
</template>

<script setup>
  import { onLoad } from "@dcloudio/uni-app";
  import { ref, computed } from "vue";
  import ICard from "@/components/i-card/index.vue";
  import ICell from "@/components/i-cell/index.vue";
  import CardItem from "@/components/card-item/index";
  import {
    cbdApiAppletGroundCardOrderWxPayPost,
    cbdApiAppletGroundCardOrderCardPayPost
  } from "@/api";
  import {
    groundMpApiCardSaleInfoIdCardTypeGet,
    groundMpApiCardSaleSubmitWxPayPost,
    groundMpApiCardSaleSubmitCardPayPost,
    groundMpApiCardSaleGetPayStatusGet
  } from "@/api/ground-mp-api";
  import { useCashCard } from "@/stores/cashCard";
  import NP from "number-precision";
  import { wxPay } from "@/utils";

  const cashCardStore = useCashCard();
  const id = ref(0);
  const cardType = ref(1); // 1、限期卡 2、次卡
  onLoad((option) => {
    id.value = option.id;
    cardType.value = Number(option.cardType);
    getInfo();
  });

  const activeTime = ref("");

  const dateChange = (data) => {
    console.log(data.detail.value);
    activeTime.value = data.detail.value;
    // if (endTime && compareData(data, endTime))
    //   return uni.showToast({ title: "请选择正确的时间", icon: "none" });
    // startTime = data;
    // //@todo 开始时间 结束时间选择校验
    // emits("update:dateRange", { startDate: data, endDate: endTime });
  };

  const cardPayData = computed(() => {
    return cashCardStore.cardPayData;
  });

  const unit = computed(() => {
    return cardType.value === 2 ? "次" : "天";
  });
  const countNumber = computed(() => {
    return (
      NP.minus(
        selectSalePrice.value.useNums || 0,
        selectSalePrice.value.giveNums || 0
      ) + unit.value
    );
  });

  const venueVisible = ref(false);
  const admissionTimesVisible = ref(false);

  const selectSalePrice = ref({});
  const info = ref({});
  const cardData = computed(() => {
    const data = info.value || {};
    return data.respDto || {};
  });

  const onSalePrice = (data) => {
    if (data.id !== selectSalePrice.value.id) {
      selectSalePrice.value = data;
    }
  };

  //选择支付方式
  const toChoosePayment = () => {
    if (!selectSalePrice.value.salePrice) return;
    uni.navigateTo({
      url: `/pages/card/pay/payment?amount=${selectSalePrice.value.salePrice}`
    });
  };

  async function getInfo() {
    uni.showLoading({
      title: "加载中"
    });
    try {
      const res = await groundMpApiCardSaleInfoIdCardTypeGet({
        id: id.value,
        cardType: cardType.value
      });
      console.log(res);
      info.value = res;
      if (res.salePriceDataList.length) {
        selectSalePrice.value = res.salePriceDataList[0];
        console.log(selectSalePrice);
      }
    } catch (e) {
      console.error(e);
      info.value = {};
    } finally {
      uni.hideLoading();
    }
  }

  function hideVenue() {
    venueVisible.value = false;
  }
  function hideAdmissionTimes() {
    admissionTimesVisible.value = false;
  }

  async function doSubmit() {
    const params = {
      projectId: info.value.projectId, // 项目id
      projectName: info.value.projectName, // 项目名称
      storeId: info.value.storeId, // 商铺id
      storeName: info.value.storeName, // 商铺名字
      membersId: info.value.membersId, // 会员id
      membersName: info.value.membersName, // 购卡人姓名
      membersCode: info.value.membersCode, // 会员号
      membersPhone: info.value.membersPhone, // 购卡人手机号
      cardId: info.value.cardId, // 卡id
      priceId: info.value.priceId, // 价格Id
      cardName: info.value.cardName, // 卡名称
      cardType: info.value.cardType, // 卡类型 1:期限卡 2:次卡
      activeType: info.value.activeType, // 激活方式 1购买激活 2第一次到店激活 3指定日期激活
      activeTime: info.value.activeTime, // 激活时间 方式为指定激活时，该值就是设置的指定激活日期
      salesStaffId: info.value.salesStaffId, // 销售人员编号
      salesStaffName: info.value.salesStaffName, // 销售人员姓名
      signStoreName: info.value.signStoreName, // 签单门店(操作人所属门店)
      payMethodType: info.value.payMethodType, // 支付类别  1微信  2支付宝  3储值卡
      svcCardId: info.value.svcCardId, // 储值卡id（仅支付方式为 3：储值卡时必填）
      receivedAmount: info.value.receivedAmount, // 收款金额(实收金额)
      receivableAmount: info.value.receivableAmount, // 应收金额
      purchaseChannel: info.value.purchaseChannel, // 购买渠道 1:线上 2:线下
      contractRemark: info.value.contractRemark, // 合同备注
      openId: info.value.openId, // 微信支付openId(微信支付传此字段)
      cardNo: info.value.cardNo // 储值卡卡号(储值卡支付传此字段)
    };
    uni.showLoading({
      title: "提交中"
    });
    try {
      const res = await groundMpApiCardSaleInfoIdCardTypeGet({
        id: id.value,
        cardType: cardType.value
      });
      console.log(res);
      info.value = res;
      if (res.salePriceDataList.length) {
        selectSalePrice.value = res.salePriceDataList[0];
        console.log(selectSalePrice);
      }
    } catch (e) {
      console.error(e);
      info.value = {};
    } finally {
      uni.hideLoading();
    }
  }

  const onSubmit = async () => {
    const params = {
      projectId: info.value.projectId, // 项目id
      projectName: info.value.projectName, // 项目名称
      // storeId: info.value.storeId, // 商铺id
      // storeName: info.value.storeName, // 商铺名字
      // membersId: info.value.id, // 会员id //
      // membersName: info.value.membersName, // 购卡人姓名 //
      // membersCode: info.value.membersCode, // 会员号 //
      // membersPhone: info.value.membersPhone, // 购卡人手机号
      cardId: info.value.id, // 卡id
      priceId: selectSalePrice.value.id, // 价格Id
      cardName: info.value.cardName, // 卡名称
      cardType: info.value.cardType, // 卡类型 1:期限卡 2:次卡
      activeType: info.value.activeMethod, // 激活方式 1购买激活 2第一次到店激活 3指定日期激活
      activeTime: activeTime.value, // 激活时间 方式为指定激活时，该值就是设置的指定激活日期
      // salesStaffId: info.value.salesStaffId, // 销售人员编号
      // salesStaffName: info.value.salesStaffName, // 销售人员姓名
      // signStoreName: info.value.signStoreName, // 签单门店(操作人所属门店)
      payMethodType: cardPayData.value.payType, // 支付类别  1微信  2支付宝  3储值卡
      // svcCardId: info.value.svcCardId, // 储值卡id（仅支付方式为 3：储值卡时必填）
      receivedAmount: selectSalePrice.value.salePrice, // 收款金额(实收金额)
      receivableAmount: selectSalePrice.value.listPrice, // 应收金额
      // purchaseChannel: 1, // 购买渠道 1:线上 2:线下
      contractRemark: info.value.contractRemark // 合同备注
      // openId: info.value.openId, // 微信支付openId(微信支付传此字段)
      // cardNo: '' // 储值卡卡号(储值卡支付传此字段)
    };

    // let api = groundMpApiCardSaleSubmitWxPayPost;
    // if (cardPayData.value.payType === 3) {
    //   console.log("储值卡支付");
    //   api = groundMpApiCardSaleSubmitCardPayPost;
    //   params.cardNo = cardPayData.value.svcCard?.memberCardCode;
    //   submitCardPay(params);
    // } else {
    //   // params.openId =
    // }

    console.log(cardPayData.value.payType);
    switch (cardPayData.value.payType) {
      case 1: {
        submitWxPay(params);
        break;
      }
      case 3: {
        params.cardNo = cardPayData.value.svcCard?.memberCardCode;
        submitCardPay(params);
        break;
      }
      default: {
        break;
      }
    }

    // uni.showLoading({
    //   title: "提交中"
    // });
    // try {
    //   const res = await api(params);
    //   console.log(res);
    // } catch (e) {
    //   console.error(e);
    //   info.value = {};
    // } finally {
    //   uni.hideLoading();
    // }
  };
  const submitWxPay = async (params) => {
    uni.showLoading({
      title: "提交中"
    });
    try {
      const data = await groundMpApiCardSaleSubmitWxPayPost(params);
      const info = await cbdApiAppletGroundCardOrderWxPayPost(data);
      wxPay(
        info,
        () => {},
        () => {
          uni.showToast({
            title: "微信支付失败",
            icon: "none"
          });
        }
      );
      const res = await groundMpApiCardSaleGetPayStatusGet({
        orderNo: data.orderNo
      });
      let title = "微信支付失败";
      if (res === 1) {
        title = "微信支付成功";
        uni.showToast({
          title: title,
          icon: "none"
        });
        uni.redirectTo({
          url: `/pages/card/timeCard/index?cardType=${cardType.value}`
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      uni.hideLoading();
    }
  };
  const submitCardPay = async (params) => {
    uni.showLoading({
      title: "提交中"
    });
    try {
      const data = await groundMpApiCardSaleSubmitCardPayPost(params);
      const info = await cbdApiAppletGroundCardOrderCardPayPost(data);
      wxPay(
        info,
        () => {},
        () => {
          uni.showToast({
            title: "储值卡支付失败",
            icon: "none"
          });
        }
      );
      const res = await groundMpApiCardSaleGetPayStatusGet({
        orderNo: data.orderNo
      });
      let title = "储值卡支付失败";
      if (res === 1) {
        title = "储值卡支付成功";
        uni.showToast({
          title: title,
          icon: "none"
        });
        uni.redirectTo({
          url: `/pages/card/timeCard/index?cardType=${cardType.value}`
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      uni.hideLoading();
    }
  };
</script>

<style scoped lang="scss">
  .card-purchase {
    .card-purchase-head {
      padding: 32rpx;
      background: #ffffff;
      position: relative;
      z-index: 1;
    }
    .card-purchase-content {
      padding: 32rpx 32rpx 120rpx;
      :deep(.card) {
        padding: 8rpx 0 32rpx;
        .item {
          padding: 24rpx 0 0;
        }
        .head {
          border-bottom: none;
          .card-head {
            width: 100%;
            display: flex;
            align-items: center;
            .card-title {
              flex: 1;
              color: #070a16;
              font-weight: 500;
            }
            .card-head-after {
              flex: none;
              line-height: 44rpx;
              font-size: 28rpx;
              .lebel {
                color: #333333;
              }
              .value {
                color: #fb5f05;
              }
            }
          }
        }
        .scroll-wrap {
          width: 100%;
          white-space: nowrap;
          .scroll-box {
            display: flex;
            .scroll-cell {
              display: inline-block;
              box-sizing: border-box;
              width: 196rpx;
              height: 100rpx;
              padding: 8rpx;
              margin-right: 16rpx;
              border-radius: 16rpx;
              border: 1px solid transparent;
              overflow: hidden;
              color: #333333;
              background: #f7f7f7;
              &:last-child {
                margin-right: 0;
              }
              &.active {
                border-color: #fb5f05;
                background: #ffffff;
                .use-nums {
                  color: #fb5f05;
                }
              }
              .use-nums {
                line-height: 44rpx;
                font-size: 28rpx;
                text-align: center;
              }
              .cell-row {
                display: flex;
                align-items: center;
                line-height: 40rpx;
                font-size: 24rpx;
                .sale-price {
                  flex: 1;
                }
                .line-price {
                  text-decoration: line-through;
                  color: #999999;
                }
              }
            }
          }
        }
      }
    }
    .card-purchase-footer {
      background-color: #ffffff;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 1000;
      box-sizing: border-box;
      padding: 32rpx;
      width: 100%;
      height: 120rpx;
      border-top: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      .footer-content {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        color: #333333;
        .price-item {
          display: flex;
          align-items: center;
          margin-right: 16rpx;
          font-weight: 600;
          .label {
            font-size: 32rpx;
          }
          .value {
            font-size: 36rpx;
            color: #f03020;
          }
        }
        .count-item {
          display: flex;
          align-items: center;
          font-size: 28rpx;
          font-weight: 400;
        }
      }
      .footer-button {
        flex: none;
        width: 188rpx;
        height: 80rpx;
        line-height: 48rpx;
        background: #fb5f05;
        border-radius: 120rpx;

        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        color: #ffffff;
        font-size: 32rpx;
      }
    }
  }
</style>
