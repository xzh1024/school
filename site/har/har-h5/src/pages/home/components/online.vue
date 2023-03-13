<template>
  <view class="online">
    <z-paging
      ref="paging"
      v-model="list"
      :fixed="false"
      :auto="false"
      inside-more
      @query="getList"
    >
      <view class="list">
        <store-cell
          v-for="(item, index) in list"
          :key="index"
          :item="item"
        ></store-cell>
      </view>
    </z-paging>
  </view>
</template>

<script>
  export default {
    name: "Online"
  };
</script>
<script setup>
  import { ref } from "vue";
  import { cbdApiAppletReserveHomePageGet } from "@/api";
  import StoreCell from "./store-cell";

  const props = defineProps({
    venueClassifyId: {
      type: [Number, String]
    },
    sortType: {
      type: [Number, String]
    }
  });

  const list = ref([]);
  const paging = ref(null);

  async function getList(pageNo, pageSize) {
    uni.showLoading({ title: "加载中..." });
    try {
      // console.log(pageNo, pageSize)
      const res = await cbdApiAppletReserveHomePageGet({
        venueClassifyId: props.venueClassifyId,
        sortType: props.sortType,
        pageNum: pageNo,
        pageSize
      });
      // console.log(res)
      paging.value.complete(res?.rows || []);
    } catch (e) {
      console.error(e);
      paging.value.complete(false);
    } finally {
      uni.hideLoading();
    }
  }

  function reload() {
    paging.value.reload();
  }
  defineExpose({ reload });
</script>

<style scoped lang="scss">
  .online {
    height: 100%;
  }
  .list {
    padding: 32rpx;
  }
</style>
