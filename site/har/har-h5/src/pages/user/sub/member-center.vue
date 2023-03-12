<template>
  <i-sys title="会员中心" :nav-placeholder="true" nav-bg="bg" nav-theme="light">
    <view class="page">
      <view>
        <member-info :member-info="userInfo" />
      </view>
      <view class="margin-top-16">
        <member-level :member-info="userInfo" :level-info="levelInfo">
          <view @click="toMyDetail">会员攻略 ></view>
        </member-level>
      </view>
      <view class="power-box margin-top-16">
        <view class="title">我的权益</view>
        <view class="content-box">
          <view
            v-for="(item, index) in memberInfo.memberRightsInfoList"
            :key="index"
            class="cell-item"
          >
            <view class="icon-box">
              <image
                class="image-style"
                :src="fixImage(item.fileUrl, { w: 40 })"
              />
            </view>
            <view class="icon-name">{{ item.showName }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="page-overflow bg"></view>
  </i-sys>
</template>

<script setup>
  import { onMounted, ref, computed } from "vue";
  import {
    cbdApiAppletMemberInfoGet,
    cbdApiAppletMemberLevelInfoGet
  } from "@/api";
  import MemberLevel from "../_components_/member-level";

  onMounted(async () => {
    await initMemberInfo();
    await initLevelInfo();
  });

  const memberInfo = ref({});
  const initMemberInfo = async () => {
    try {
      memberInfo.value = await cbdApiAppletMemberInfoGet();
    } catch (e) {
      console.error(e);
    }
  };

  const toMyDetail = () => {
    uni.navigateTo({
      url: "/pages/user/sub/member-center-detail"
    });
  };

  const levelInfo = ref([]);
  const initLevelInfo = async () => {
    try {
      const d = await cbdApiAppletMemberLevelInfoGet();
      levelInfo.value = d.levels;
    } catch (e) {
      console.error(e);
    }
  };

  const userInfo = computed(() => {
    const {
      avatarUrl,
      nickName,
      levelDefaultName,
      levelBean,
      integral,
      levelName,
      nextLevelBean,
      levelId
    } = memberInfo.value;
    return {
      nickName,
      avatarUrl,
      levelDefaultName,
      levelBean,
      integral,
      levelName,
      nextLevelBean,
      levelId
    };
  });
</script>

<style scoped lang="scss">
  :deep(.border-bottom) {
    &::after {
      border: none;
    }
  }
  .margin-top-16 {
    margin-top: 32rpx;
  }
  .image-style {
    height: 100%;
    width: 100%;
  }
  .bg {
    background: linear-gradient(180deg, #342c21 0%, #0f0f0f 100%);
  }
  .page-overflow {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .page {
    padding: 32rpx;
    .power-box {
      border-radius: 12rpx;
      background: #30271d;
      box-shadow: 0 8rpx 16rpx 2rpx rgba(0, 0, 0, 0.08);
      .title {
        padding: 24rpx 32rpx;
        color: #f8d8ab;
        font-size: 28rpx;
        border-bottom: 1px solid #40301e;
      }
      .content-box {
        display: grid;
        grid-template-columns: repeat(4, 25%);
        grid-row-gap: 20rpx;
        padding: 32rpx;
        .cell-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          .icon-box {
            height: 40rpx;
            width: 40rpx;
          }
          .icon-name {
            font-size: 24rpx;
            color: #8c683e;
            margin-top: 16rpx;
          }
        }
      }
    }
  }
</style>
