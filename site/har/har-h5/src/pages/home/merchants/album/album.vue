<template>
  <i-sys title="相册" nav-placeholder nav-bg="bg-white">
    <view class="container-wrapper">
      <i-fixed sticky style="overflow-x: auto; background: #ffffff">
        <i-tabs
          v-model="tabsIndex"
          :data="tabs"
          flex
          default-color="#666"
          @change="handleTabsChange"
        ></i-tabs>
      </i-fixed>
      <view class="container-album-box">
        <view>
          <view class="box-list flex align-center flex-wrap space-between">
            <view
              v-for="(item, index) in imageList"
              :key="index"
              class="cell-box"
            >
              <image
                class="box-image"
                :src="fixImage(item, { w: 332 })"
                mode="aspectFill"
              ></image>
            </view>
          </view>
        </view>
      </view>
    </view>
  </i-sys>
</template>

<script setup>
  import { cbdApiAppletReserveStorePicStoreIdGet } from "@/api/index";
  import { ref, computed } from "vue";
  import { onLoad } from "@dcloudio/uni-app";
  import ITabs from "@/components/i-tabs";
  import IFixed from "../../../../components/i-fixed/i-fixed";
  import { fixImage } from "@/utils";

  onLoad((options) => {
    handleGetImageList(options.id);
  });
  const list = ref([]);
  const tabsIndex = ref(0);

  const handleGetImageList = async (id) => {
    list.value = await cbdApiAppletReserveStorePicStoreIdGet({
      storeId: id
    });
  };

  const tabs = computed(() => {
    return list.value.map((i, index) => {
      return {
        value: index,
        label: `${i.type}(${i.num})`
      };
    });
  });

  const imageList = computed(() => {
    const item = list.value[tabsIndex.value];
    return item?.storePics || [];
  });

  const handleTabsChange = (item) => {
    tabsIndex.value = item.value;
    console.log("tabsIndex", tabsIndex.value);
  };
</script>

<style lang="scss" scoped>
  .box-image {
    width: 332rpx;
    height: 332rpx;
    border-radius: 8rpx;
  }
  .icon-back {
    height: 40rpx;
    width: 40rpx;
  }
  :deep(.tab-box) {
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
      width: 0 !important;
      height: 0 !important;
      -webkit-appearance: none;
      background: transparent;
      color: transparent;
    }
  }
  .container-wrapper {
    .container-album-box {
      padding: 108rpx 32rpx 32rpx 32rpx;
      .box-list {
        margin-bottom: 22rpx;
        border-radius: 8rpx;
        .cell-box {
          margin-bottom: 22rpx;
        }
      }
    }
  }
</style>
