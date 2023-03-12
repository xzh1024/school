<template>
  <i-sys title="商圈切换" nav-placeholder nav-bg="bg-white">
    <view class="container">
      <view
        v-for="(item, index) in locationList"
        :key="index"
        class="container-location-box"
      >
        <view class="location-box-top">
          <view class="box-top-title">
            {{ item.label }}
          </view>
          <view class="box-top-switch" @click="handleSwitchAddress(item)">
            切换
            <image :src="jump" mode="widthFix"></image>
          </view>
        </view>
        <view class="location-box-footer">
          <view class="flex align-center">
            <image class="address-image" :src="address" mode="widthFix"></image>
            <view class="box-top-title">
              {{ item.fullAddress }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </i-sys>
</template>

<script setup>
  // 图片引入
  import { jump, address } from "@/utils/imgUrl";
  import { ref, onMounted } from "vue";

  import { cbdApiAppletProjectSelectProjectGet } from "@/api/index";
  import ls from "../../../ls";
  onMounted(() => {
    handleGetDataList();
  });

  // const handleBack = () => {
  //   uni.navigateBack({
  //     delta: 1
  //   });
  // };
  /**
   * @param  获取数据
   */
  const locationList = ref([]);
  const handleGetDataList = async () => {
    uni.showLoading({
      title: "加载中...."
    });
    try {
      locationList.value = await cbdApiAppletProjectSelectProjectGet({});
    } catch (e) {
      console.error(e);
    } finally {
      uni.hideLoading();
    }
  };

  /**
   * @param 切换地址
   */
  const handleSwitchAddress = (item) => {
    console.log(item);
    ls.set("projectId", item.value);
    ls.set("projectName", item.label);
    uni.$emit("switchItem", item);
    uni.navigateBack({
      delta: 1 //返回层数，2则上上页
    });
  };
</script>

<style lang="scss" scoped>
  @import "locaition.scss";
  .container-location-box {
    box-shadow: inset 0px -2rpx 0rpx 2rpx #eaeaea;
    border-radius: 16rpx;
  }
  .box-top-title {
    max-width: 500rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .address-image {
    width: 24rpx;
    height: 26rpx;
    margin-right: 8rpx;
  }
</style>
