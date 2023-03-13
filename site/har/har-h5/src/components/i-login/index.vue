<template>
  <uni-popup ref="popup" type="bottom" @change="change">
    <view class="dialog-box">
      <view class="safe-area-inset-bottom">
        <!--        <view class="top-head">
          <image
            class="avatar"
            :src=" info.logoUrl || '/static/default-logo.png'"
          ></image>
        </view>
        <view class="content">{{ info.name }}</view>-->
        <view class="btns"
          ><button
            class="login-btn"
            open-type="getPhoneNumber"
            @getphonenumber="login"
            >一键登录</button
          ></view
        >
        <!--        <view class="check flex space-center">
          <radio class="radio" color="#E6332F" @click="changeCheck" :checked="checked" />
          <view class="check-content flex align-center">
            注册/登录即代表同意
            <view class="red-text">《服务协议》</view>
            及
            <view class="red-text">《隐私政策》</view>
          </view>
        </view>-->
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { cbdApiAppletUserGetPhonePost } from "../../api";
  import { callbackReady } from "../../utils/user";
  import { useAppStore } from "@/stores/app";
  import ls from "@/ls";
  const store = useAppStore();
  const popup = ref(null);
  // const checked = ref(false);
  // const info = ref({});

  async function login(e) {
    console.log(e);
    /*if(!checked.value) return uni.showToast({
    title: "请先勾选协议",
    icon: "none"
  })*/
    if (!e.detail.code) {
      await callbackReady(false);
      throw Error(e.detail.errMsg);
    }
    try {
      const { token } = await cbdApiAppletUserGetPhonePost({
        code: e.detail.code
      });
      if (token) ls.set("token", token);
      await store.getUserInfo(true);
      store.updateShowLogin(false);
      popup.value.close();
      await callbackReady(true);
    } catch (e) {
      await callbackReady(false);
      console.error(e);
    }
  }

  function change(e) {
    const { show } = e;
    if (!show) store.updateShowLogin(false);
  }

  // function changeCheck(e) {
  //   checked.value = !checked.value;
  // }

  onMounted(() => {
    popup.value.open();
  });
</script>

<style scoped lang="scss">
  .dialog-box {
    width: 100%;
    background: #ffffff;
    border-radius: 32rpx 32rpx 0 0;
    padding: 32rpx 0;
    .check-content {
      font-size: 24rpx;
      color: #888888;
      font-weight: 500;
      .red-text {
        color: #f13642;
      }
    }
    .top-head {
      width: 160rpx;
      height: 160rpx;
      border-radius: 16rpx;
      box-shadow: 0 4rpx 24rpx 2rpx rgba(111, 81, 83, 0.1);
      margin: 0 auto 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .avatar {
      width: 144rpx;
      height: 144rpx;
      border-radius: 8rpx;
    }
    .content {
      font-size: 40rpx;
      font-weight: bold;
      line-height: 56rpx;
      text-align: center;
      color: #333;
    }
  }
  .btns {
    padding: 0 0 24rpx;
    text-align: center;
    .login-btn {
      border: none;
      width: 622rpx;
      height: 92rpx;
      line-height: 96rpx;
      text-align: center;
      border-radius: 48rpx;
      background: #f13642;
      color: #fff;
      font-size: 34rpx;
      font-weight: 500;
    }
  }
</style>
