<template>
  <i-sys title="我的会员码" :nav-placeholder="true">
    <view class="page">
      <view>
        <member-info :member-info="userInfo" />
      </view>
      <view class="qr-code-box">
        <view class="title">会员码</view>
        <view class="qr-code flex">
          <Qrcode :value="memberInfo.memberCode" :size="160" />
        </view>
      </view>
    </view>
  </i-sys>
</template>

<script setup>
  import { ref, onMounted, computed } from "vue";
  import Qrcode from "@/components/qrcode/qrcode";
  // import { onLoad } from "@dcloudio/uni-app";
  import { cbdApiAppletMemberInfoGet } from "@/api";

  onMounted(async () => {
    await initMemberInfo();
  });

  const memberInfo = ref({});
  const initMemberInfo = async () => {
    try {
      memberInfo.value = await cbdApiAppletMemberInfoGet();
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
  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .page {
    padding: 32rpx;
    width: stretch;
    .qr-code-box {
      margin-top: 24rpx;
      width: 100%;
      height: 510rpx;
      background: #ffffff;
      box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.08);
      border-radius: 8rpx;
      display: flex;
      flex-direction: column;
      .title {
        padding: 24rpx 32rpx;
        font-size: 28rpx;
        color: #222222;
        border-bottom: 1px solid #eaeaea;
      }
      .qr-code {
        flex: 1;
      }
    }
  }
</style>
