<template>
  <i-sys title="活动消息" nav-bg="bg-white">
    <view class="message container">
      <z-paging
        ref="paging"
        v-model="messageList"
        auto-show-back-to-top
        class="list-container"
        :auto="false"
        :fixed="false"
        @query="queryList"
      >
        <template #empty>
          <i-empty-card text="当前暂无活动" />
        </template>
        <view
          v-for="item in messageList"
          :key="item.activityCode"
          class="message-item"
          @tap="onDetail(item.activityCode)"
        >
          <view class="message-img">
            <image
              mode="aspectFill"
              class="message-image"
              :src="item.adPictureUrl"
            />
            <view v-if="item.status !== 2" class="message-date">
              {{ activityDic[item.status] }}
            </view>
            <view v-else class="message-date">
              剩余时间：
              <yl-count-down :end-time="item.endTime" />
            </view>
          </view>
          <view class="message-info">
            <view class="message-title">{{ item.name }}</view>
            <view class="message-text">{{ item.desc }}</view>
          </view>
        </view>
      </z-paging>
    </view>
  </i-sys>
</template>

<script setup lang="ts">
  import { onLoad } from "@dcloudio/uni-app";
  import { ref, reactive } from "vue";
  import {
    svcAppletActivityPageGet,
    SvcAppletActivityPageGetResponse
  } from "@/api/card";
  import useFuncProxy from "@/hooks/useFuncProxy";

  const activityDic = {
    1: "未开始",
    2: "进行中",
    3: "已暂停",
    4: "已结束"
  } as { [key: number]: string };

  const paging = ref();
  const pageData = reactive({
    pageNum: 1,
    pageSize: 10
  });
  function queryList(pageNum: number) {
    pageData.pageNum = pageNum;
    getMessageList();
  }
  const messageList = ref<SvcAppletActivityPageGetResponse["rows"]>([]);
  const [getMessageList] = useFuncProxy(async () => {
    uni.showLoading({ title: "加载中..." });
    const d = await svcAppletActivityPageGet({
      // @ts-ignore
      startTime: null,
      // @ts-ignore
      endTime: null,
      pageNum: String(pageData.pageNum),
      pageSize: String(pageData.pageSize)
    });
    paging.value?.complete(d.rows);
    uni.hideLoading();
  });

  function onDetail(activityCode: string) {
    uni.navigateTo({
      url: `/pages/card/message/detail?activityCode=${activityCode}`
    });
  }

  onLoad(() => {
    getMessageList();
  });
</script>

<style lang="scss" src="../common.scss"></style>
<style lang="scss" scoped>
  .message {
    flex: 1;
    overflow: hidden;
    position: relative;
    &-item {
      border-radius: 24rpx;
      overflow: hidden;
      background-color: #fff;
      box-shadow: 0px 8rpx 16rpx 0px rgba(111, 111, 111, 0.08);

      & + .message-item {
        margin-top: 24rpx;
      }
    }

    &-img {
      width: 100%;
      height: 308rpx;
      border-radius: 24rpx 24rpx 0 0;
      background-color: #ddd;
      position: relative;
    }

    &-image {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    &-date {
      position: absolute;
      top: 24rpx;
      right: 24rpx;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.5);
      font-size: 24rpx;
      font-weight: 400;
      color: #ffffff;
      line-height: 40rpx;
      padding: 4rpx 24rpx;
      box-sizing: border-box;
      border-radius: 8rpx;
      overflow: hidden;
    }

    &-info {
      padding: 32rpx 24rpx;
      box-sizing: border-box;
    }

    &-title {
      font-size: 36rpx;
      font-weight: 500;
      color: #070a16;
      line-height: 52rpx;
      @include ellipsis;
    }

    &-text {
      font-size: 28rpx;
      font-weight: 400;
      color: #383840;
      line-height: 44rpx;
      margin-top: 8rpx;
      @include ellipsis;
    }
  }
</style>
