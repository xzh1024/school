<template>
  <i-sys :show-nav="false" class="mine-page">
    <text class="nav-title" :style="boxStyle">我的</text>
    <!-- <i-navbar theme="light">
      <template #center>
      </template>
    </i-navbar> -->
    <view class="user-info">
      <image class="user-info-bg" src="@/static/card/Rectangle@2x.png" />
      <view class="flex">
        <image class="user-avatar" :src="userInfo?.avatarUrl" />
        <label class="user-name">{{ userInfo?.nickName }}</label>
      </view>
      <i-badge :value="0">
        <image
          class="message"
          src="@/static/card/message@2x.png"
          @tap="linkMessage"
        />
      </i-badge>
    </view>

    <view class="container">
      <view class="price-info">
        <image class="price-info-bg" src="@/static/card/Group@2x.png" />
        <view class="price-item">
          <text class="price">
            {{ formatPrice(userPriceInfo.totalBalance) }}
          </text>
          <text class="price-text">当前余额</text>
        </view>
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
      <view class="sub-title">我的储值卡</view>

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
          @tap="cardChange(item)"
        />
      </z-paging>
    </view>

    <i-tabbar :data="tabbarData" :active="1" />
  </i-sys>
</template>

<script setup lang="ts">
  import { onLoad } from "@dcloudio/uni-app";
  // import { useUserInfo } from '@/composables/useLogin';
  import StoreCard from "@/components/store-card/index.vue";
  import { useCard } from "../card/useCard";
  import {
    svcAppletMemberInfoGet,
    SvcAppletMemberInfoGetResponse
  } from "@/api/card";
  import useFuncProxy from "@/hooks/useFuncProxy";
  import { formatPrice } from "@/utils";
  import { computed, ref } from "vue";
  import { useAppStore } from "@/stores/app";

  import { useTabbar } from "./useTabbar";
  const tabbarData = useTabbar("mine");
  const { paging, pageData, cardList, getCardList, queryList } = useCard();

  // const { userInfo, linkName } = useUserInfo();
  const store = useAppStore();
  const userInfo = computed(() => {
    console.log(store.userInfo);

    return (
      store.userInfo || {
        avatarUrl: "",
        nickName: ""
      }
    );
  });
  function linkMessage() {
    uni.navigateTo({
      url: "/pages/card/notice/list"
    });
  }

  function cardChange(item: { cardCode: string }) {
    uni.navigateTo({
      url: `/pages/card/cardRecord/cardRecord?cardNo=${item.cardCode}`
    });
  }

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

  onLoad(() => {
    getCardList(pageData);
    getUserPriceInfo();
  });

  const { statusBarHeight } = uni.getSystemInfoSync();
  const boxStyle = computed(() => {
    return {
      paddingTop: statusBarHeight + "px",
      height: store.sysNavBar + "px"
    };
  });
</script>

<style lang="scss" src="../common.scss"></style>
<style lang="scss" scoped>
  .user-info {
    flex-shrink: 0;
    // width: 100%;
    height: 388rpx;
    height: calc(388rpx + var(--status-bar-height));
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--status-bar-height) 32rpx 0;
    box-sizing: content-box;
    position: relative;
  }

  .user-info-bg,
  .price-info-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  .user-avatar {
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
    background-color: #d9d9d9;
    margin-right: 32rpx;
    position: relative;
    z-index: 2;
  }

  .user-name {
    font-size: 32rpx;
    font-weight: 500;
    color: #ffffff;
    line-height: 48rpx;
    position: relative;
    z-index: 2;
  }

  .price-info {
    width: 686rpx;
    height: 196rpx;
    border-radius: 24rpx;
    margin: 0 auto;
    // background-image: url('@static/Group@2x.png');
    background-size: cover;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  .price-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffffff;
    position: relative;
    z-index: 2;

    .price {
      font-size: 36rpx;
      font-weight: bold;
      line-height: 52rpx;
    }

    .price-text {
      font-size: 24rpx;
      font-weight: 400;
      color: #ffffff;
      line-height: 40rpx;
      margin-top: 8rpx;

      &::after {
        content: "(￥)";
      }
    }
  }

  .container {
    flex: 1;
    padding-top: 0;
    height: calc(100% - 388rpx + 116rpx - 64rpx);
    overflow: hidden;
    transform: translateY(-116rpx);
    display: flex;
    flex-direction: column;
  }

  .sub-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #383840;
    line-height: 48rpx;
    margin-top: 32rpx;
  }

  .message {
    width: 48rpx;
    height: 48rpx;
  }

  .card-center {
    margin-top: 24rpx;
    width: 100%;
    flex: 1;
    overflow: auto;
  }

  .mine-page {
    :deep(.i-page) {
      .i-page-body {
        display: block;
        overflow: hidden;
      }

      .page-body {
        padding-top: 0;
        padding-bottom: 60rpx;
        box-sizing: border-box;
        position: relative;
      }
    }
  }

  .nav-title {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    font-size: 34rpx;
    font-weight: bold;
    color: #ffffff;
    line-height: 40rpx;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
