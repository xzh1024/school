
<template>
  <div v-show="visible" class="mask">
    <a-spin :spinning="visible" :delay="300" />
    <div v-if="tip" class="loading-tip">{{ tip }}</div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  data() {
    return {
      tip: '',
      visible: false
    }
  }
}
</script>
<style lang="less" scoped>
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.65);
  }
</style>
