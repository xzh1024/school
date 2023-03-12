<template>
  <i-sys title="用户信息">
    <calc-top />
    <button
      class="avatar-wrapper"
      open-type="chooseAvatar"
      @chooseavatar="onChooseAvatar"
    >
      <image class="avatar" :src="avatar" mode="aspectFill" />
    </button>

    <label class="nickName-box">
      <text class="nickName-label">昵称</text>
      <input
        :value="nickName"
        type="nickname"
        class="nickName-input"
        placeholder="请输入昵称"
        @change="inputChange"
      />
    </label>

    <view class="container">
      <i-card-button @tap="saveUserInfo">保存</i-card-button>
    </view>
  </i-sys>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import CalcTop from "@/components/calc-top/calc-top.vue";
  import ICardButton from "@/components/i-card-button/i-card-button.vue";
  import { useAppStore } from "@/stores/app";
  import {
    cbdApiAppletUserEditNickInfoPost,
    cbdApiAppletFileDirectUploadSignGet,
    CbdApiAppletFileDirectUploadSignGetResponse
  } from "@/api";

  const userStore = useAppStore();

  const nickName = ref(userStore.memberInfo?.nickName || "");
  const avatar = ref(userStore.memberInfo?.avatarUrl || "");

  function inputChange(e: any) {
    const { value } = e.detail;
    nickName.value = value;
  }

  async function saveUserInfo() {
    if (nickName.value === "")
      return uni.showToast({ title: "昵称不能为空", icon: "none" });
    // if (avatarCode.value === "")
    //   return uni.showToast({ title: "头像不能为空", icon: "none" });
    try {
      await cbdApiAppletUserEditNickInfoPost({
        nickName: nickName.value,
        avatarCode: avatarCode.value
      });
      userStore.getMemberInfo(true);
      uni.showToast({
        title: "保存成功"
      });
      uni.navigateBack();
    } catch (e) {
      console.error(e);
    }
  }

  function onChooseAvatar(e: any) {
    const { avatarUrl } = e.detail;
    avatar.value = avatarUrl;
    console.log(avatarUrl, "--*--");
    getFileSign();
  }

  const fileSignInfo = ref({}); //oss上传需要内容
  const uploadFileUrl = ref(""); //上传地址
  const avatarCode = ref(""); //文件key
  const getFileSign = async () => {
    try {
      const d: CbdApiAppletFileDirectUploadSignGetResponse =
        await cbdApiAppletFileDirectUploadSignGet();
      uploadFileUrl.value = d.host || "";
      avatarCode.value = d.key || "";
      fileSignInfo.value = {
        key: `${d.dir}${d.key}`,
        policy: d.policy,
        OSSAccessKeyId: d.accessid,
        success_action_status: "200",
        signature: d.signature,
        callback: d.callback
      };
      uni.uploadFile({
        url: d.host || "",
        filePath: avatar.value,
        name: "file",
        formData: fileSignInfo.value,
        success: (res) => {
          console.log(res, "--上传成功--");
          uni.showToast({
            title: "上传成功"
          });
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
</script>

<style lang="scss" scoped>
  .nickName-box {
    display: flex;
    align-items: center;
    background-color: #fff;
  }

  .nickName-label {
    width: 180rpx;
    text-align: left;
    padding: 12px;
    box-sizing: border-box;
  }

  .nickName-input {
    flex: 1;
    padding: 12px;
  }

  .avatar-wrapper {
    width: 96rpx;
    height: 96rpx;
    padding: 0;
    box-sizing: border-box;
    border-radius: 50%;
    background-color: transparent;
    margin: 50rpx auto;
    border: 2rpx solid #ddd;
  }

  .avatar {
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
  }
</style>
