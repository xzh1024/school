<template>
  <i-sys title="我的储值卡" nav-bg="bg-white">
    <view class="container">
      <z-paging
        ref="paging"
        v-model="cardList"
        auto-show-back-to-top
        class="list-container"
        :auto="false"
        :fixed="false"
        @query="queryList"
      >
        <template #empty>
          <i-empty-card text="暂无储值卡" />
          <i-card-button width="478rpx" @tap="onBuyCard">去购卡</i-card-button>
        </template>
        <template v-for="(item, index) in cardList" :key="index">
          <store-card
            :item="item"
            :page-type="pageType"
            @tap="cardChange(item)"
          />
        </template>
      </z-paging>
    </view>
  </i-sys>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import StoreCard from "@/components/store-card/index.vue";
  import { onLoad } from "@dcloudio/uni-app";
  import { useCard } from "./useCard";
  const pageType = ref("default");
  const { paging, pageData, cardList, getCardList, queryList } = useCard();

  function cardChange(item: { cardCode: string; memberCardCode: string }) {
    if (pageType.value === "recharge") {
      // 充值
      uni.navigateTo({
        url: `/pages/card/recharge/recharge?cardNo=${item.cardCode}&type=recharge&memberCardCode=${item.memberCardCode}`
      });
    } else if (pageType.value === "pay") {
      // 付款
      uni.navigateTo({
        url: `/pages/card/pay/pay?&memberCardCode=${item.memberCardCode}`
      });
    } else {
      uni.navigateTo({
        url: `/pages/card/cardRecord/cardRecord?cardNo=${item.memberCardCode}`
      });
    }
  }

  // 去购卡
  function onBuyCard() {
    uni.navigateTo({
      url: "/pages/card/recharge/recharge"
    });
  }

  onLoad((options: any) => {
    const { type } = options;
    if (type) {
      pageType.value = type;
      pageData.pageType = type;
    }
    getCardList(pageData);
  });
</script>

<style lang="scss" src="../common.scss"></style>
<style lang="scss" scoped>
  .container {
    flex: 1;
    overflow: hidden;
  }
</style>
