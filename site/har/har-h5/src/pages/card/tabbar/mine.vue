<template>
  <i-sys class="mine-page" title="统计" nav-bg="navBg" nav-theme="dark">
    <view class="container">
      <view class="price-wrapper">
        <view class="price-title">
          <text class="price">
            {{ formatPrice(userPriceInfo.totalBalance) }}
          </text>
          <text class="price-text">当前余额</text>
        </view>
        <view class="price-info">
          <view class="price-item">
            <text class="price">
              {{ formatPrice(userPriceInfo.totalRecharge) }}
            </text>
            <text class="price-text">累计充值</text>
          </view>
          <view class="price-item">
            <text class="price">
              {{ formatPrice(userPriceInfo.totalConsume) }}
            </text>
            <text class="price-text">累计消费</text>
          </view>
        </view>
      </view>
      <!-- zpaging -->
      <z-paging
        ref="paging"
        v-model="cardList"
        auto-show-back-to-top
        class="list-container card-center"
        :auto="false"
        :fixed="false"
        @query="queryList"
      >
        <template #empty>
          <i-empty-card text="暂无储值卡" />
        </template>
        <store-card
          v-for="(item, index) in cardList"
          :key="index"
          :item="item"
          page-type="default"
          @tap="cardChange(item)"
        />
      </z-paging>
    </view>

    <i-tabbar :data="tabbarData" :active="1" />
  </i-sys>
</template>

<script setup lang="ts">
  import { onLoad } from "@dcloudio/uni-app";
  import {
    svcAppletMemberInfoGet,
    SvcAppletMemberInfoGetResponse
  } from "@/api/card";
  import useFuncProxy from "@/hooks/useFuncProxy";
  import StoreCard from "@/components/store-card/index.vue";
  import { formatPrice } from "@/utils";
  import { ref } from "vue";

  import { useTabbar } from "./useTabbar";
  import { useCard } from "../card/useCard";
  const tabbarData = useTabbar("mine");

  const userPriceInfo = ref<SvcAppletMemberInfoGetResponse>({
    memberCode: "",
    nickName: "",
    avatar: "",
    totalBalance: 0,
    totalRecharge: 0,
    totalConsume: 0
  });
  const [getUserPriceInfo] = useFuncProxy(async () => {
    const d = await svcAppletMemberInfoGet();
    userPriceInfo.value = d;
  });

  const { paging, pageData, cardList, getCardList, queryList } = useCard();
  function cardChange(item: { memberCardCode: string }) {
    uni.navigateTo({
      url: `/pages/card/cardRecord/cardRecord?cardNo=${item.memberCardCode}`
    });
  }

  onLoad(() => {
    getCardList(pageData);
    getUserPriceInfo();
  });
</script>

<style lang="scss" src="../common.scss"></style>
<style lang="scss" scoped>
  .price-wrapper {
    width: 100%;
    height: 392rpx;
    background-color: #ffffff;
    box-shadow: 0px 16rpx 16rpx 0px rgba(255, 166, 148, 0.17);
    border-radius: 40rpx;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin-top: 24rpx;
  }

  .price-title {
    width: 100%;
    height: 208rpx;
    border-bottom: 2rpx solid #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .price {
      font-size: 60rpx;
      font-weight: bold;
      color: #ff7200;
      line-height: 76rpx;
    }

    .price-text {
      font-size: 28rpx;
      font-weight: 400;
      color: #383840;
      line-height: 44rpx;
      margin-top: 8rpx;

      &::after {
        content: "(￥)";
      }
    }
  }

  .price-item {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .price {
      font-size: 36rpx;
      color: #ff7200;
      font-weight: bold;
      line-height: 52rpx;
    }

    .price-text {
      font-size: 28rpx;
      font-weight: 400;
      color: #606066;
      line-height: 44rpx;
      margin-top: 8rpx;

      &::after {
        content: "(￥)";
      }
    }

    &:last-child {
      border-left: 2rpx solid #f0f0f0;
      box-sizing: border-box;
    }
  }

  .price-info {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .container {
    // flex: 1;
    padding-top: 0;
    padding-bottom: calc(constant(safe-area-inset-bottom) + 120rpx);
    padding-bottom: calc(env(safe-area-inset-bottom) + 120rpx);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: linear-gradient(180deg, #ff846a 0%, #ffedea 53%, #ffffff 100%);
  }

  .list-container {
    flex: 1;
    margin-top: 24rpx;
  }

  .mine-page {
    :deep(.i-page) {
      .i-page-body {
        display: block;
        overflow: hidden;
      }

      .page-body {
        background-color: #ffffff;
      }

      .i-fixed-box {
        background-color: #ff846a;
      }

      .i-navbar-box {
        &::after {
          border: none;
        }
      }

      .center {
        color: #ffffff;
      }

      .uni-icons {
        color: #ffffff !important;
      }
    }
  }
</style>
