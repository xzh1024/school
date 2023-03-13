<template>
  <i-sys
    title=""
    :nav-capsule="false"
    :back="false"
    :nav-opacity="true"
    @load="load"
  >
    <view class="page">
      <view class="top-bg"></view>
      <view class="content-box" :style="{ paddingTop: testHeight }">
        <view class="user-info-box">
          <view class="left-box" @click="onUserInfo">
            <view class="avatar-box">
              <view class="avatar">
                <image
                  class="icon-style"
                  :src="memberInfo?.avatarUrl"
                  mode="aspectFill"
                />
              </view>
              <view v-if="memberInfo?.levelDefaultName" class="vip-tag">{{
                memberInfo?.levelDefaultName
              }}</view>
            </view>
            <view class="name-box">
              <view v-if="memberInfo?.nickName" class="user-name text-lg">
                {{ memberInfo?.nickName }}
              </view>
              <view v-else>
                <view class="login-content" @click="loginAndGetMemberInfo"
                  >请先登录</view
                >
              </view>
              <view
                v-if="
                  memberInfo?.levelName ||
                  memberInfo?.memberRightsInfoList?.length
                "
                class="user-tag-box"
                @click="toMemberCenter"
              >
                <view class="user-tag">{{ memberInfo?.levelName }}</view>
                <view class="user-tag"
                  >{{
                    memberInfo?.memberRightsInfoList?.length || 0
                  }}项权益</view
                >
              </view>
            </view>
          </view>
          <view class="right-box" @click="toMemberShipCode">
            <view class="QR-code-box">
              <image
                class="icon-style"
                :src="iconQRCode"
                mode="aspectFit"
              ></image>
            </view>
            <view class="text-xs">会员码</view>
          </view>
        </view>
        <view class="handle-box">
          <view
            v-for="(item, index) in handleArr"
            :key="index"
            class="handle-item"
            @click="toInfo(item.path)"
          >
            <view class="icon-box">
              <image
                class="icon-style"
                :src="fixImage(item.icon, { w: 96 })"
                mode="aspectFit"
              ></image>
            </view>
            <view class="text-xs margin-top-8">{{ item.name }}</view>
          </view>
        </view>
        <view class="order-box margin-top-16">
          <view class="order-title">
            <view class="text-lg">我的订单</view>
            <view class="all-order text-xs text-color-6" @click="onDetail('')">
              <view>全部订单</view>
              <image :src="iconRight" mode="aspectFit" class="icon-right" />
            </view>
          </view>
          <view class="order-status-box">
            <view
              v-for="(item, index) in orderStatusArr"
              :key="index"
              class="order-status-item"
              @click="onDetail(item.status)"
            >
              <view class="status-icon-box">
                <image
                  class="icon-style"
                  :src="fixImage(item.icon, { w: 64 })"
                  mode="aspectFit"
                ></image>
              </view>
              <view class="text-xs margin-top-8 text-color-6">{{
                item.name
              }}</view>
            </view>
          </view>
        </view>
        <view
          v-if="memberInfo?.banners?.length"
          class="banner-box margin-top-16"
        >
          <swiper class="swiper" circular>
            <swiper-item
              v-for="(item, index) in memberInfo?.banners"
              :key="index"
            >
              <image
                class="icon-style"
                :src="fixImage(item.coverPic, { w: 686 })"
                mode="aspectFill"
              />
            </swiper-item>
          </swiper>
        </view>
        <view class="serve-box">
          <view
            v-for="(item, index) in sysServeArr"
            :key="index"
            class="serve-item"
            @click="onHandle(item)"
          >
            <view class="left-icon-box">
              <image :src="item.icon" class="icon-style" />
            </view>
            <view class="right-dec-box">
              <view class="text-xs">{{ item.name }}</view>
              <image :src="iconRight" mode="aspectFit" class="icon-right" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </i-sys>
</template>

<script setup>
  import { onLoad } from "@dcloudio/uni-app";
  import { ref, computed } from "vue";
  import {
    orderStatusArr,
    iconRight,
    handleArr,
    sysServeArr,
    iconQRCode
  } from "./dic/index";
  import {
    cbdApiAppletCustomerServiceListGet,
    cbdApiAppletMemberInfoGet
  } from "@/api";
  import { authUserInfo } from "@/utils/user";
  import { useAppStore } from "@/stores/app";
  import { fixImage } from "@/utils";

  const testHeight = ref(0);
  async function load() {
    const { nickName, phone } = userInfo.value;
    if (nickName && phone) await store.getMemberInfo(true);
  }
  onLoad(async () => {
    const { top, height } = uni.getMenuButtonBoundingClientRect();
    testHeight.value = top + height + "px";
  });

  const memberInfo = computed(() => {
    return store.memberInfo || {};
  });

  // const memberInfo = ref({});
  const initMemberInfo = async () => {
    try {
      store.memberInfo = await cbdApiAppletMemberInfoGet();
    } catch (e) {
      console.error(e);
    }
  };

  const onHandle = async ({ handleType = "", path }) => {
    if (handleType === "phone") {
      try {
        const d = await getCustomerService();
        if (d.length < 1)
          return uni.showToast({
            title: "暂无客服电话",
            icon: "none",
            duration: 1500
          });
        // console.log(d.length);
        // console.log(d[0].telephone);
        uni.makePhoneCall({
          phoneNumber: d[0].telephone
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      console.log("跳转", path);
    }
  };

  const getCustomerService = async () => {
    try {
      return await cbdApiAppletCustomerServiceListGet();
    } catch (e) {
      console.error(e);
    }
  };

  const onUserInfo = () => {
    uni.navigateTo({
      url: "/pages/user/sub/user-info"
    });
  };

  const toInfo = (url) => {
    isLogin.value
      ? uni.navigateTo({
          url
        })
      : loginAndGetMemberInfo();
  };

  /**
   * 订单列表详情
   * @param status
   */
  const onDetail = (status) => {
    isLogin.value
      ? uni.navigateTo({
          url: `/pages/order/index?status=${status}`
        })
      : loginAndGetMemberInfo();
  };

  const toMemberShipCode = () => {
    isLogin.value
      ? uni.navigateTo({ url: "../user/sub/membership-code" })
      : loginAndGetMemberInfo();
  };

  const toMemberCenter = () => {
    isLogin.value
      ? uni.navigateTo({
          url: "../user/sub/member-center"
        })
      : loginAndGetMemberInfo();
  };

  const loginAndGetMemberInfo = async () => {
    try {
      await authUserInfo();
      await initMemberInfo();
    } catch (e) {
      console.error(e);
    }
  };

  const isLogin = computed(() => {
    const { nickName, phone } = userInfo.value;
    return nickName && phone;
  });
  const store = useAppStore();
  const userInfo = computed(() => {
    return store.userInfo;
  });

  // 储值卡
  // function linkStoreCard() {
  //   uni.navigateTo({
  //     url: "/pages/card/tabbar/home"
  //   });
  // }

  // onShow(() => {
  //   if (!memberInfo.value?.nickName) {
  //     const { nickName, phone } = userInfo.value;
  //     if (nickName && phone) initMemberInfo();
  //   }
  // });
</script>

<style lang="scss" scoped>
  .text-xs {
    font-size: 24rpx;
  }
  .text-sm {
    font-size: 28rpx;
  }
  .text-lg {
    font-size: 32rpx;
  }
  .text-color-6 {
    color: #666666;
  }
  .margin-top-8 {
    margin-top: 16rpx;
  }
  .margin-top-16 {
    margin-top: 32rpx;
  }
  .icon-style {
    width: 100%;
    height: 100%;
  }
  .icon-right {
    width: 16rpx;
    height: 16rpx;
  }
  .login-content {
    font-size: 36rpx;
    font-weight: bold;
    color: #333333;
    padding: 20rpx 0;
  }
  .page {
    .top-bg {
      height: 410rpx;
      width: 100%;
      background: #fb5f05;
    }
    .content-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .user-info-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 32rpx 32rpx 0 32rpx;
        .left-box {
          display: flex;
          align-items: center;
          .avatar-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            .avatar {
              height: 80rpx;
              width: 80rpx;
              border-radius: 50%;
              background: #ffffff;
              overflow: hidden;
            }
            .vip-tag {
              width: 64rpx;
              height: 32rpx;
              background: #fedbb0;
              border-radius: 16rpx;
              font-size: 24rpx;
              text-align: center;
              line-height: 32rpx;
              margin-top: -15rpx;
            }
          }
          .name-box {
            margin-left: 32rpx;
            display: flex;
            flex-direction: column;
            .user-name {
              color: #ffffff;
            }
            .user-tag-box {
              margin-top: 14rpx;
              display: flex;
              align-items: center;
              .user-tag {
                width: 116rpx;
                font-size: 24rpx;
                height: 32rpx;
                line-height: 32rpx;
                background: #fbe8d1;
                border-radius: 16rpx;
                color: #9f6837;
                text-align: center;
                margin-right: 20rpx;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                padding: 0 8rpx;
              }
            }
          }
        }
        .right-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #ffffff;
          .QR-code-box {
            height: 50rpx;
            width: 50rpx;
            margin-bottom: 8rpx;
          }
        }
      }
      .handle-box {
        background: #ffffff;
        margin: 44rpx 32rpx 0 32rpx;
        // padding: 32rpx 0;
        padding: 32rpx 0 16rpx;
        border-radius: 16rpx;
        display: grid;
        grid-template-columns: repeat(4, 25%);
        .handle-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 16rpx;
          .icon-box {
            height: 96rpx;
            width: 96rpx;
            border-radius: 50%;
          }
        }
      }
      .order-box {
        margin: 32rpx 32rpx 0 32rpx;
        background: #ffffff;
        border-radius: 16rpx;
        padding-bottom: 28rpx;
        .order-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28rpx;
          .all-order {
            display: flex;
            align-items: center;
          }
        }
        .order-status-box {
          display: grid;
          grid-template-columns: repeat(4, 25%);
          .order-status-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            .status-icon-box {
              height: 64rpx;
              width: 64rpx;
            }
          }
        }
      }
      .banner-box {
        height: 320rpx;
        margin: 32rpx 32rpx 0;
        border-radius: 16rpx;
        .swiper {
          width: 100%;
          height: 100%;
        }
      }
      .serve-box {
        margin: 32rpx;
        padding: 32rpx;
        background: #ffffff;
        border-radius: 16rpx;
        .serve-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 32rpx;
          .left-icon-box {
            height: 44rpx;
            width: 44rpx;
          }
          .right-dec-box {
            margin-left: 16rpx;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e6e6e6;
            padding-bottom: 40rpx;
          }
          &:last-child {
            margin-bottom: 0;
            .right-dec-box {
              border-bottom: none;
              padding-bottom: 0;
            }
          }
        }
      }
    }
  }
</style>
