<template>
  <view class="safe-bottom" :style="{ height: safeArea + 'px' }"></view>
</template>

<script>
  export default {
    name: "SafeBottom"
  };
</script>
<script setup>
  import { onMounted, ref } from "vue";

  const safeArea = ref();
  onMounted(() => {
    init();
  });
  function init() {
    safeArea.value = uni.getSystemInfoSync().safeAreaInsets?.bottom;
    // console.log(safeArea.value,"safeArea.value")
  }
</script>

<style scoped lang="scss">
  .safe-bottom {
    width: 100%;
  }
</style>
