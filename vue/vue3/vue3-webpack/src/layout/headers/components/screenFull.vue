<template>
  <div id="screenFull" class="screen-full">
    <el-icon :size="20" @click="handleFullToggle">
      <Rank v-if="icon" />
      <FullScreen v-else />
    </el-icon>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import screenfull from 'screenfull';

const icon = ref(screenfull.isFullscreen);

const handleFullToggle = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  }
};

const changeIcon = () => {
  icon.value = screenfull.isFullscreen;
};

onMounted(() => {
  screenfull.on('change', changeIcon);
});

onBeforeMount(() => {
  screenfull.off('change');
});
</script>

<style lang="scss" scoped>
.screen-full {
  cursor: pointer;
}
</style>
