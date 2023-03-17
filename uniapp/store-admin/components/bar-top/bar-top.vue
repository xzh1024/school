<template>
  <view :style="{ height: statusBarHeight + 'px' }">bar-top</view>
</template>

<script setup>
const { statusBarHeight } = uni.getSystemInfoSync();
</script>
