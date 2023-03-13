<template>
  <view class="activity">
    <z-paging
      ref="paging"
      v-model="list"
      :fixed="false"
      :auto="false"
      inside-more
      @query="getList"
    >
      <view class="list">
        <activity-cell
          v-for="(item, index) in list"
          :key="index"
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
  import { cbdApiAppletActivityListGet } from "@/api";
  import ActivityCell from "@/components/common/activity-cell/activity-cell";

  const props = defineProps({
    sortKey: {
      type: [Number, String]
    },
    activityTypeId: {
      type: [Number, String]
    }
  });
  const list = ref([]);
  const paging = ref(null);

  async function getList(pageNo, pageSize) {
    uni.showLoading({ title: "加载中..." });
    try {
      const res = await cbdApiAppletActivityListGet({
        activityTypeId: props.activityTypeId,
        sortKey: props.sortKey,
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
  .activity {
    height: 100%;
  }
  .list {
    padding: 32rpx;
  }
</style>
