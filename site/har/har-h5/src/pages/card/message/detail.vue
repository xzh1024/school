<template>
  <i-sys title="活动详情" class="detail-page" nav-bg="bg-white">
    <image mode="aspectFill" class="banner" :src="detailInfo.adPictureUrl" />

    <view class="container" :class="{}">
      <view class="scroll-box">
        <i-card-box>
          <view class="title">{{ detailInfo.name }}</view>
          <view class="date">
            {{ detailInfo.startTime }} 至 {{ detailInfo.endTime }}
          </view>
        </i-card-box>

        <i-card-box>
          <view class="sub-title">活动场景</view>
          <view class="description">
            {{ scene_status[detailInfo.scene] || "无活动场景" }}
          </view>

          <view class="sub-title">活动对象</view>
          <view class="description">
            {{ active_target[detailInfo.target] || "无活动对象" }}
          </view>

          <view class="sub-title">活动规则</view>
          <view
            v-for="item in detailInfo.rules"
            :key="item"
            class="description"
          >
            {{ item }}
          </view>

          <view class="sub-title">活动描述</view>
          <view class="description">
            {{ detailInfo.desc || "无活动描述" }}
          </view>
        </i-card-box>

        <i-card-box>
          <view class="sub-title">适用店铺</view>
          <view
            v-for="(item, index) in detailInfo.cardRanges"
            :key="index"
            class="description"
          >
            {{ item.cardName }}
            <!--            <view v-if="item?.storeApplyType">-->
            <!--              {{ storeApplyType[item.storeApplyType] }}-->
            <!--              <view v-if="item?.storeApplyType > 1">-->
            <!--                {{ item.storeRanges?.join(",") }}-->
            <!--              </view>-->
            <!--            </view>-->
            <view v-if="item.storeApplyType === 1"> 全部店铺可用 </view>
            <view v-else-if="item.storeApplyType === 2">
              <view v-for="(it, idx) in item.storeRanges" :key="idx">
                <text>{{ it.storeName }};</text>
                <text v-if="it.venueApplyType === 1"> 全部场地可用 ;</text>
                <text v-else-if="it.venueApplyType === 2"
                  >{{ it.ranges.join("、") + "可用" }};</text
                >
                <text v-else>{{ it.ranges.join("、") + "不可用" }};</text>
              </view>
            </view>
            <view v-else> 全部场地不可用; </view>
          </view>
        </i-card-box>
      </view>
    </view>

    <i-footer>
      <i-card-button style="width: 100%" bg-color="#FF811A" @tap="onActive">
        参加活动
      </i-card-button>
    </i-footer>
  </i-sys>
</template>

<script setup lang="ts">
  import { onLoad } from "@dcloudio/uni-app";
  import { ref } from "vue";
  import {
    svcAppletActivityInfoGet,
    SvcAppletActivityInfoGetResponse
  } from "@/api/card";
  import useFuncProxy from "@/hooks/useFuncProxy";
  import { scene_status, active_target } from "@/dic";
  const detailInfo = ref<SvcAppletActivityInfoGetResponse>({
    name: "",
    adPictureUrl: "",
    startTime: "",
    endTime: "",
    scene: 1,
    target: 1,
    rules: [],
    cardRanges: [],
    desc: ""
  });

  const activityCode = ref("");
  const [getDetailInfo] = useFuncProxy(async (activityCode: string) => {
    uni.showLoading({ title: "加载中..." });
    const d = await svcAppletActivityInfoGet({ activityCode });
    detailInfo.value = d;

    uni.hideLoading();
  });

  function onActive() {
    uni.navigateTo({
      url: `/pages/card/recharge/recharge?activityCode=${
        activityCode.value
      }&scene=${detailInfo.value.scene === 1 ? "buy" : "recharge"}`
    });
  }

  onLoad((options: any) => {
    activityCode.value = options.activityCode;
    getDetailInfo(options.activityCode || "");
  });
</script>

<style lang="scss" src="../common.scss"></style>
<style lang="scss" scoped>
  .banner {
    width: 100%;
    height: 336rpx;
    background-color: #ddd;
  }

  .title {
    font-size: 36rpx;
    font-weight: 500;
    color: #070a16;
    line-height: 52rpx;
  }

  .date {
    font-size: 28rpx;
    font-weight: 400;
    color: #383840;
    line-height: 44rpx;
    margin-top: 8rpx;
  }

  .sub-title {
    font-size: 28rpx;
    font-weight: 500;
    color: #070a16;
    line-height: 44rpx;
  }

  .description {
    font-size: 28rpx;
    font-weight: 400;
    color: #383840;
    line-height: 44rpx;
    margin-top: 8rpx;
    word-break: break-all;

    &::before {
      content: "";
      display: inline-block;
      width: 12rpx;
      height: 12rpx;
      background-color: #ff811a;
      border-radius: 50%;
      margin-right: 16rpx;
      vertical-align: middle;
    }

    & + .sub-title {
      margin-top: 24rpx;
    }
  }

  .container {
    flex: 1;
    overflow: hidden;
    background-color: #f7f8fa;
    padding-bottom: calc(130rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(130rpx + env(safe-area-inset-bottom));

    // &.has-btn {}
  }

  .scroll-box {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .detail-page {
    :deep(.page-body) {
      overflow: hidden;
    }
  }
</style>
