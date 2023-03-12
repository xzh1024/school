<template>
  <view class="card-list">
    <z-paging
      ref="paging"
      v-model="list"
      :fixed="false"
      :auto="true"
      :created-reload="true"
      inside-more
      @query="getList"
    >
      <view class="list">
        <CardItem
          v-for="(item, index) in list"
          :key="index"
          :item="item"
          class="card-item"
          show-project-name
          @on-click="onClick"
        ></CardItem>
      </view>
    </z-paging>
  </view>
</template>

<script>
  export default {
    name: "CardList"
  };
</script>
<script setup>
  import { ref } from "vue";
  import { groundMpApiCardSaleListGet } from "@/api/ground-mp-api";
  import CardItem from "@/components/card-item/index";
  const props = defineProps({
    cardType: {
      type: Number
    }
  });

  const list = ref([]);
  const paging = ref(null);

  async function getList(pageNo, pageSize) {
    uni.showLoading({ title: "加载中..." });
    try {
      const res = await groundMpApiCardSaleListGet({
        type: props.cardType, // 类型（1：期限卡、2：次卡）
        pageNum: pageNo,
        pageSize
      });
      paging.value.complete(res?.rows || []);
    } catch (e) {
      console.error(e);
      paging.value.complete(false);
    } finally {
      uni.hideLoading();
    }
  }

  const onClick = (data) => {
    console.log(data);
    if (props.cardType === 3) {
      // 储值卡
    } else {
      uni.navigateTo({
        // url: `/pages/card/cardPurchase/index?id=${data.id}&cardType=${data.cardType}`
        url: `/pages/card/cardPurchase/index?id=${data.id}&cardType=${props.cardType}`
      });
    }
  };

  function reload() {
    paging.value.reload();
  }
  defineExpose({ reload });
</script>

<style scoped lang="scss">
  .card-list {
    height: 100%;
  }
  .list {
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
</style>
