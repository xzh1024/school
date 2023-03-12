<template>
  <i-sys title="积分中心" :nav-placeholder="true">
    <view class="page">
      <view class="member-info">
        <view class="avatar-box">
          <view class="avatar">
            <image class="image-style" :src="memberInfo.avatarUrl" />
          </view>
          <view class="level-name">{{ memberInfo.levelDefaultName }}</view>
        </view>
        <view class="integral-box">
          <view class="text-xs margin-bottom-4 text-color-3">总积分</view>
          <view class="text-xl text-color-red">{{ memberInfo.integral }}</view>
        </view>
      </view>
      <view class="integral-record-box">
        <view class="title">积分明细</view>
        <view class="record-box">
          <z-paging
            ref="paging"
            v-model="list"
            height="700rpx"
            :fixed="false"
            inside-more
            @query="initIntegralList"
          >
            <view v-for="(item, index) in list" :key="index" class="item-cell">
              <view class="i-tag"></view>
              <view class="flex-sub flex">
                <view class="dec-box">
                  <view class="margin-bottom-4 text-color-3">{{
                    item.remark
                  }}</view>
                  <view class="text-color-9">{{ item.createTime }}</view>
                </view>
                <view
                  :class="item.negative ? 'text-color-9' : 'text-color-orange'"
                >
                  {{ item.integralNum > 0 ? "+" : ""
                  }}{{ item.integralNum }}积分
                </view>
              </view>
            </view>
          </z-paging>
        </view>
      </view>
    </view>
  </i-sys>
</template>

<script setup>
  import {
    cbdApiAppletMemberInfoGet,
    cbdApiAppletMemberIntegralRecordsGet
  } from "@/api";
  import { onMounted, ref } from "vue";

  onMounted(() => {
    initMemberInfo();
    initIntegralList();
  });

  const memberInfo = ref({});
  const initMemberInfo = async () => {
    try {
      memberInfo.value = await cbdApiAppletMemberInfoGet();
    } catch (e) {
      console.error(e);
    }
  };

  const paging = ref(null);
  const list = ref([]);
  const initIntegralList = async (pageNo, pageSize) => {
    try {
      const d = await cbdApiAppletMemberIntegralRecordsGet({
        pageNum: pageNo,
        pageSize
      });
      paging.value.complete(d?.rows || []);
    } catch (e) {
      console.error(e);
      paging.value.complete(false);
    }
  };
</script>

<style scoped lang="scss">
  .text-color-3 {
    color: #333333;
  }
  .text-color-9 {
    color: #999999;
  }
  .text-color-orange {
    color: #ff5f00;
  }
  .text-color-red {
    color: #d93044;
  }
  .text-xs {
    font-size: 24rpx;
  }
  .text-xl {
    font-size: 40rpx;
  }
  .image-style {
    height: 100%;
    width: 100%;
  }
  .margin-bottom-4 {
    margin-bottom: 8rpx;
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .flex-sub {
    flex: 1;
  }
  .page {
    .member-info {
      background: #ffffff;
      padding: 32rpx;
      display: flex;
      align-items: center;
      .avatar-box {
        position: relative;
        .avatar {
          height: 120rpx;
          width: 120rpx;
          border-radius: 50%;
          overflow: hidden;
        }
        .level-name {
          width: 72rpx;
          height: 40rpx;
          background: #ff5f00;
          border-radius: 8rpx;
          font-size: 24rpx;
          color: #ffffff;
          position: absolute;
          bottom: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .integral-box {
        margin-left: 28rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
    .integral-record-box {
      margin: 32rpx;
      border-radius: 8rpx;
      box-shadow: 0 8rpx 16rpx 2rpx rgba(0, 0, 0, 0.08);
      background: #ffffff;
      .title {
        padding: 24rpx 32rpx;
        font-size: 28rpx;
        color: #333333;
        border-bottom: 2rpx solid #eaeaea;
      }
      .record-box {
        padding: 24rpx 32rpx;
        .item-cell {
          display: flex;
          justify-content: space-between;
          font-size: 24rpx;
          margin-bottom: 40rpx;
          .i-tag {
            width: 8rpx;
            height: 32rpx;
            background: #ff5f00;
            border-radius: 2rpx;
            margin-right: 16rpx;
          }
          .dec-box {
            flex: 1;
            margin-right: 20rpx;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>
