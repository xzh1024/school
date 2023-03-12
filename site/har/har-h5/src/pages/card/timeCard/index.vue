<template>
  <i-sys
    :title="cardType === 2 ? '次卡' : '限期卡'"
    :nav-placeholder="true"
    nav-bg="bg-white"
  >
    <view class="page">
      <view class="tab-box" :style="{ top: testHeight }">
        <i-tabs
          v-model="active"
          style="width: 100%"
          :data="tabArr"
          flex
          @change="onTabChange"
        ></i-tabs>
      </view>
      <view>
        <view>
          <z-paging
            v-if="active === 0"
            ref="paging1"
            v-model="cardList"
            :default-page-size="20"
            inside-more
            @query="getList"
          >
            <template #top>
              <calc-top />
              <view class="tab-height"></view>
            </template>
            <view class="card-list">
              <CardItem
                v-for="(item, index) in cardList"
                :key="index"
                :item="item"
                class="card-item"
                @on-click="onClickCard"
              ></CardItem>
            </view>
          </z-paging>
        </view>
        <view>
          <z-paging
            v-if="active === 1"
            ref="paging2"
            v-model="cardList2"
            :default-page-size="20"
            inside-more
            @query="getList2"
          >
            <template #top>
              <calc-top />
              <view class="tab-height"></view>
            </template>
            <view class="card-list">
              <CardItem
                v-for="(item, index) in cardList2"
                :key="index"
                :item="item"
                disabled
                class="card-item"
                @on-click="onClickCard"
              ></CardItem>
            </view>
          </z-paging>
        </view>
      </view>
    </view>
  </i-sys>
</template>

<script setup>
  import { onLoad } from "@dcloudio/uni-app";
  import { ref } from "vue";
  import { groundMpApiMemberCardHoldListCardHoldPost } from "@/api/ground-mp-api";
  import ITabs from "@/components/i-tabs";
  import CardItem from "@/components/card-item/index";

  const tabArr = [
    {
      label: "正常使用",
      value: 0
    },
    {
      label: "已过期",
      value: 1
    }
  ];

  const paging1 = ref(null);
  const cardList = ref([]);
  const cardList2 = ref([]);
  const testHeight = ref(0);
  const cardType = ref(1); // 卡类型，1:期限卡 2:次卡
  onLoad(async (option) => {
    cardType.value = Number(option.cardType);
    const { statusBarHeight } = uni.getSystemInfoSync();
    const { top, height } = uni.getMenuButtonBoundingClientRect();
    testHeight.value =
      (top - statusBarHeight) * 2 + height + statusBarHeight + "px";
  });

  const active = ref(0);
  const paging2 = ref(null);

  const getList = async (pageNo, pageSize) => {
    uni.showLoading({
      title: "加载中"
    });
    try {
      const d = await groundMpApiMemberCardHoldListCardHoldPost({
        cardType: cardType.value, // 卡类型，1:期限卡 2:次卡
        expiredStatus: active.value,
        pageNum: pageNo,
        pageSize
      });
      paging1.value.complete(d?.rows || []);
    } catch (e) {
      console.error(e);
      paging1.value.complete(false);
    } finally {
      uni.hideLoading();
    }
  };

  const getList2 = async (pageNo, pageSize) => {
    uni.showLoading({
      title: "加载中"
    });
    try {
      const d = await groundMpApiMemberCardHoldListCardHoldPost({
        cardType: cardType.value, // 卡类型，1:期限卡 2:次卡
        expiredStatus: active.value,
        pageNum: pageNo,
        pageSize
      });
      paging2.value.complete(d?.rows || []);
    } catch (e) {
      console.error(e);
      paging2.value.complete(false);
    } finally {
      uni.hideLoading();
    }
  };

  const onTabChange = (value) => {
    console.log(value);
  };

  const onClickCard = (data) => {
    console.log(data);
    console.log(cardType.value);
    uni.navigateTo({
      url: `/pages/card/timeCardInfo/index?id=${data.id}&cardType=${String(
        cardType.value
      )}`
    });
  };
</script>

<style scoped lang="scss">
  .tab-height {
    height: 72rpx;
  }
  .page {
    height: 100vh;
    .card-list {
      padding: 32rpx;
      overflow: hidden;
      .card-item {
        display: block;
        margin-bottom: 32rpx;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .tab-box {
      box-sizing: border-box;
      width: 100%;
      height: 72rpx;
      padding: 0 32rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #ffffff;
      position: fixed;
      left: 0;
      z-index: 999;
    }
  }
</style>
