<template>
  <i-sys :title="title" nav-placeholder nav-bg="bg-white">
    <view class="page-more">
      <classify-grid :list="list" @on-detail="onDetail" />
    </view>
  </i-sys>
</template>

<script>
  export default {
    name: "MoreClassify"
  };
</script>
<script setup>
  import { onLoad } from "@dcloudio/uni-app";
  import { ref } from "vue";
  import {
    cbdApiAppletFormatSelectFormatGet,
    cbdApiAppletHotHotFormatGet
  } from "../../../api";
  import ClassifyGrid from "../_component_/classify-grid";

  const title = ref("");
  onLoad((options) => {
    const type = Number(options.type); //1全部品类券 2全部业态
    if (type === 1) {
      title.value = "全部品类";
      getAllClassify();
    } else if (type === 2) {
      title.value = "全部业态";
      getAllFormat();
    }
  });

  const onDetail = (item) => {
    const { type, id, name } = item;
    if (type === 1) {
      uni.navigateTo({
        url: `/pages/coupon/list?id=${id}&type=6`
      });
    } else if (type === 2) {
      uni.navigateTo({
        url: `/pages/business/others/classify-detail?id=${id}&title=${name}`
      });
    }
  };

  const list = ref([]);

  /**
   * 所有一级业态
   * @returns {Promise<void>}
   */
  const getAllFormat = async () => {
    try {
      const d = await cbdApiAppletFormatSelectFormatGet({
        parentId: ""
      });
      list.value = d.map((item) => {
        return {
          id: item.value,
          name: item.label,
          icon: item.icon,
          leaf: item.leaf,
          type: 2
        };
      });
    } catch (e) {
      console.error(e);
    }
  };

  const getAllClassify = async () => {
    try {
      const d = await cbdApiAppletHotHotFormatGet();
      list.value = d.map((item) => {
        return {
          id: item.formatId,
          name: item.formatName,
          icon: item.pic,
          type: 1
        };
      });
    } catch (e) {
      console.error(e);
    }
  };
</script>

<style scoped lang="scss">
  .page-more {
    padding: 32rpx;
    background: #ffffff;
  }
</style>
