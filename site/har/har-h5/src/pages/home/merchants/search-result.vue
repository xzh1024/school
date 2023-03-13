<template>
  <i-sys title="搜索结果" nav-bg="bg-white" @load="load">
    <z-paging
      ref="paging"
      v-model="list"
      inside-more
      :auto="false"
      @query="getList"
    >
      <template #top>
        <calc-top />
      </template>
      <view class="list">
        <template v-for="(item, index) in list" :key="index">
          <search-result-item
            :item="item"
            :type="type"
            @add-click="addClick"
            @receive-click="receive"
          ></search-result-item>
        </template>
      </view>
    </z-paging>
    <add-cart
      ref="popup"
      :item="currentItem"
      :store-id="currentItem.storeId"
      :store-name="currentItem.storeName"
    />
  </i-sys>
</template>

<script>
  export default {
    name: "SearchResult"
  };
</script>
<script setup>
  import {
    cbdApiAppletActivityListGet,
    cbdApiAppletCouponReceiveCouponIdGet,
    cbdApiAppletCouponStoreCouponListGet,
    cbdApiAppletReserveProductListGet,
    cbdApiAppletReserveVenueListGet
  } from "../../../api";
  import { ref, nextTick } from "vue";
  import AddCart from "@/components/common/add-cart";
  import SearchResultItem from "./components/search-result-item";

  const list = ref([]);
  const storeId = ref();
  const type = ref();
  const words = ref();
  const paging = ref(null);
  const popup = ref(null);
  const currentItem = ref({});

  function load(e) {
    const { keyWords, storeId: id, type: t } = e;
    type.value = Number(t);
    storeId.value = id;
    words.value = keyWords;
    paging.value.reload();
  }
  async function getList(pageNo, pageSize) {
    try {
      let res = [];
      const p = {
        storeId: storeId.value,
        keyWords: words.value,
        pageNum: pageNo,
        pageSize
      };
      switch (type.value) {
        case 1:
          res = await getShopList(p);
          break;
        case 2:
          res = await getPlaceList(p);
          break;
        case 3:
          res = await getCouponList(p);
          break;
        case 4:
          res = await getActivityList(p);
          break;
      }

      console.log(res, "123123");
      paging.value.complete(res?.rows || []);
    } catch (e) {
      console.error(e);
      paging.value.complete(false);
    }
  }

  async function getShopList(p) {
    return await cbdApiAppletReserveProductListGet(p);
  }
  async function getPlaceList(p) {
    return await cbdApiAppletReserveVenueListGet(p);
  }
  async function getCouponList(p) {
    return await cbdApiAppletCouponStoreCouponListGet(p);
  }
  async function getActivityList(p) {
    return await cbdApiAppletActivityListGet(p);
  }

  function addClick(item) {
    currentItem.value = item;
    nextTick(() => {
      popup.value.open();
    });
  }

  function receive({ type, id, code, handleType }) {
    // handleType 1 去使用 2 领取和购买
    if (handleType === 1) {
      uni.navigateTo({
        url: `/pages/coupon/apply-store?id=${id}&code=${code}`
      });
    } else {
      if (type === 4) {
        //积分券 去购买
        uni.navigateTo({
          url: `/pages/coupon/detail?id=${id}&code=${code}`
        });
      } else {
        //领取操作
        getReceiveCoupon(id);
      }
    }
  }
  async function getReceiveCoupon(id) {
    try {
      await cbdApiAppletCouponReceiveCouponIdGet({
        id
      });
      const index = list.value.findIndex((i) => i.id === id);
      list.value[index] = {
        ...list.value[index],
        received: true,
        status: 0
      };
    } catch (e) {
      console.error(e);
    }
  }
</script>
<style scoped>
  .list {
    padding: 32rpx;
  }
</style>
