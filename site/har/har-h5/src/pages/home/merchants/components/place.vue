<template>
  <view class="place">
    <view class="type-v-box">
      <scroll-view scroll-y class="type-v-scroll" :style="{ height }">
        <view class="type-v-list">
          <view
            v-for="(item, index) in typeList"
            :key="index"
            class="type-v-item"
            :class="activeId === item.value && 'type-v-item-active'"
            @tap="typeChange(item)"
          >
            {{ item.label }}</view
          >
        </view>
      </scroll-view>
    </view>
    <view class="zpaging">
      <z-paging
        ref="paging"
        v-model="list"
        :refresher-enabled="false"
        inside-more
        :fixed="false"
        @query="getList"
      >
        <view class="list">
          <place-item
            v-for="item in list"
            :key="item.venueId"
            :item="item"
          ></place-item>
        </view>
      </z-paging>
    </view>
  </view>
</template>

<script>
  export default {
    name: "Place"
  };
</script>

<script setup>
  import { ref, onMounted, computed } from "vue";
  import {
    cbdApiAppletReserveVenueListGet,
    cbdApiAppletCommonSelectVenueClassifyGet
  } from "@/api";
  import PlaceItem from "./place-item.vue";
  import useFuncProxy from "@/hooks/useFuncProxy";

  const props = defineProps({
    storeId: {
      type: [String, Number]
    },
    height: {
      type: Number
    }
  });
  const height = computed(() => props.height + "px");
  const list = ref([]);
  const paging = ref(null);

  async function getList(pageNo, pageSize) {
    uni.showLoading({ title: "加载中..." });
    try {
      console.log(pageNo, pageSize);
      const res = await cbdApiAppletReserveVenueListGet({
        storeId: props.storeId,
        classifyId: activeId.value,
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

  const activeId = ref("");
  const typeList = ref([{ label: "全部", value: "" }]);
  const [getTypeList] = useFuncProxy(async () => {
    const d = await cbdApiAppletCommonSelectVenueClassifyGet();
    typeList.value = [...typeList.value, ...d];
  });

  function typeChange({ value }) {
    activeId.value = value;
    paging.value?.reload();
  }

  onMounted(() => {
    getTypeList();
  });
</script>
<style lang="scss" scoped>
  .place {
    display: flex;
  }

  .type-v-box {
    display: flex;
    align-items: flex-start;
    width: 176rpx;
    background-color: #f7f7f7;
  }
  .type-v-scroll {
    position: relative;
    z-index: 12;
    overflow: hidden;
    //height: 900rpx;
    //padding-bottom: 160rpx;
  }
  .type-v-list {
    width: 176rpx;
    //border-radius: 0 16rpx 0 0;
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 160rpx;
    overflow: hidden auto;
    //padding-top: 20rpx;
  }
  .type-v-item {
    width: 100%;
    height: 92rpx;
    line-height: 92rpx;
    text-align: center;
    color: #666;
    font-size: 28rpx;
    &-active {
      background: #ffffff;
      color: #fb5f05;
    }
  }

  .zpaging {
    flex: 1;
    height: v-bind(height);
    overflow: hidden auto;
  }
</style>
