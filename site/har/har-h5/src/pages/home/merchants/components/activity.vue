<template>
  <view class="activity">
    <z-paging
      ref="paging"
      v-model="list"
      use-page-scroll
      :refresher-enabled="false"
      inside-more
      @query="getList"
    >
      <view class="list">
        <activity-cell
          v-for="item in list"
          :key="item.id"
          :item="item"
        ></activity-cell>
      </view>
    </z-paging>
  </view>
</template>

<script>
  export default {
    name: "Activity"
  };
</script>
<script setup>
  import { ref } from "vue";
  import ActivityCell from "@/components/common/activity-cell/activity-cell";
  import { cbdApiAppletActivityListGet } from "@/api";

  const props = defineProps({
    storeId: {
      type: [String, Number]
    }
  });
  const list = ref([]);
  const paging = ref(null);

  async function getList(pageNo, pageSize) {
    uni.showLoading({ title: "加载中..." });
    try {
      console.log(pageNo, pageSize);
      const res = await cbdApiAppletActivityListGet({
        storeId: props.storeId,
        sortKey: 2,
        pageNum: pageNo,
        pageSize
      });
      console.log(res);
      paging.value.complete(res?.rows || []);
    } catch (e) {
      console.error(e);
      paging.value.complete(false);
    } finally {
      uni.hideLoading();
    }
  }
  // function itemClick({ id }) {
  //   uni.navigateTo({
  //     url: `/pages/activity/detail?id=${id}`
  //   });
  // }
</script>
<style scoped lang="scss">
  .list {
    padding: 32rpx;
  }
  .activity {
    padding-bottom: 40rpx;
  }
</style>
