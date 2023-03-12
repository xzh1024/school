<template>
  <i-share-change v-model="showShareModal" :canvas-config="shareConfig" />
  <slot>
    <view v-if="$slots.icon" @click="handleShare">
      <slot name="icon" class="share-btn"></slot>
    </view>
    <image
      v-else
      class="shareBtn"
      mode="widthFix"
      src="https://har-cbd-cdn.huianrong.com/har-cbd/har-cbd/applet/share/share-icon.png"
      @click="handleShare"
    ></image>
  </slot>
</template>

<script setup>
  import { ref } from "vue";
  import IShareChange from "@/components/i-share-change/i-share-change.vue";
  import { validateHasUserInfo, validatePhone } from "../../utils/user";

  const showShareModal = ref(false);
  defineProps({
    shareConfig: {
      type: Object,
      default: () => {}
    }
  });

  async function handleShare() {
    await validateHasUserInfo();
    await validatePhone();
    showShareModal.value = true;
  }
</script>

<style scoped>
  .shareBtn {
    position: fixed;
    bottom: 184rpx;
    right: 24rpx;
    width: 104rpx;
  }
</style>
