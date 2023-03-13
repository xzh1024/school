<template>
  <div class="assetsConfig">
    <a-tabs default-active-key="2" size="large" lazy-load destroy-on-hide>
      <a-tab-pane key="2" title="楼宇配置"><Building /></a-tab-pane>
<!--      <a-tab-pane key="3" title="房源配置"></a-tab-pane>-->
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
  import Building from './__components__/buildingConfig.vue';
</script>

<style scoped lang="less">
  .assetsConfig {
    background-color: #fff;
  }

  :deep(.arco-tabs-nav-tab-list) {
    width: 100%;

    .arco-tabs-tab {
      width: 33%;

      span {
        margin: 0 auto;
        font-size: 18px;
      }
    }

    .arco-tabs-nav-ink {
      width: 30%;
    }
  }
</style>
