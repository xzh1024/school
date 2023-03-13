<template>
  <i-sys :title="title" nav-placeholder nav-bg="bg-white">
    <z-paging
      ref="paging"
      v-model="storeList"
      inside-more
      @query="initStoreList"
    >
      <view class="page-detail">
        <template #top>
          <calc-top />
          <view v-if="list.length > 0" class="bg-white">
            <view class="grid-box">
              <classify-grid :list="list" @on-detail="onDetail" />
            </view>
            <view class="condition-box">
              <top-popup-tabs
                :parent-id="parentId"
                :popup-padding-top="newTop"
                @on-select-change="onSelectChange"
              />
            </view>
          </view>
        </template>
        <view class="content-box">
          <view
            v-for="(item, index) in storeList"
            :key="index"
            class="store-cell-box"
          >
            <store-cell :item="item" />
          </view>
        </view>
      </view>
    </z-paging>
  </i-sys>
</template>

<script>
  export default {
    name: "ClassifyDetailSecond"
  };
</script>
<script setup>
  import { ref } from "vue";
  import { onLoad } from "@dcloudio/uni-app";
  import {
    cbdApiAppletFormatSelectFormatGet,
    cbdApiAppletStoreListGet
  } from "../../../api";
  import StoreCell from "../../../components/common/store-cell/store-cell";
  import CalcTop from "../../../components/calc-top/calc-top";
  import TopPopupTabs from "../_component_/top-popup-tabs";
  import ClassifyGrid from "../_component_/classify-grid";

  const newTop = ref(0);
  const id = ref(""); //标题对应的id
  const title = ref(""); //标题
  const parentId = ref(""); //标题的父级id
  onLoad((options) => {
    id.value = Number(options.id);
    formatId.value = options.id;
    parentId.value = Number(options.parentId);
    title.value = options.title || "业态";
    const { top, height } = uni.getMenuButtonBoundingClientRect();
    newTop.value = top + height + 4 + "px";
    console.log(options, "--url--");
    getClassify();
  });

  const paging = ref(null);
  const storeList = ref([]);
  const formatId = ref("");
  const sortType = ref(0);
  const initStoreList = async (pageNo, pageSize) => {
    try {
      const d = await cbdApiAppletStoreListGet({
        formatId: formatId.value,
        sortType: sortType.value,
        pageNum: pageNo,
        pageSize
      });
      paging.value.complete(d?.rows || []);
    } catch (e) {
      console.error(e);
      paging.value.complete(false);
    }
  };

  const onSelectChange = ({ classify, sort }) => {
    // console.log(item, "搜索条件变化");
    formatId.value = classify.value;
    sortType.value = sort.value;
    paging.value.reload();
  };

  const onDetail = (item) => {
    console.log(item, "---");
    formatId.value = item.id;
    paging.value.reload();
  };

  const list = ref([]);
  const getClassify = async () => {
    try {
      const d = await cbdApiAppletFormatSelectFormatGet({
        parentId: id.value
      });
      list.value = d.map((item) => {
        return {
          id: item.value,
          name: item.label,
          icon: item.icon
        };
      });
    } catch (e) {
      console.error(e);
    }
  };
</script>

<style scoped lang="scss">
  .page-detail {
    .grid-box {
      padding: 32rpx;
    }
    .condition-box {
      .tabs-box {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-around;
      }
      .icon-arrow {
        height: 28rpx;
        width: 28rpx;
        margin-left: 8rpx;
      }
    }
    .content-box {
      .store-cell-box {
        margin-left: 32rpx;
        margin-right: 32rpx;
        margin-bottom: 32rpx;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
