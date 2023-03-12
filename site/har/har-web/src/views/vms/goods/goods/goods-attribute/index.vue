<template>
  <div class="goods-attribute">
    <a-tabs v-model:active-key="activeKey">
      <a-tab-pane key="1" title="分类管理"><classification /></a-tab-pane>
      <a-tab-pane key="2" title="规格管理"><specs /></a-tab-pane>
      <a-tab-pane key="3" title="品牌管理"><brand /></a-tab-pane>
      <a-tab-pane key="4" title="单位管理"><unit /></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'GoodsAttribute'
  };
</script>

<script setup lang="ts">
  import { ref, Ref } from 'vue';
  import Classification from './__components__/classification.vue';
  import Specs from './__components__/specs.vue';
  import Brand from './__components__/brand.vue';
  import Unit from './__components__/unit.vue';

  const activeKey: Ref<string> = ref('1');
</script>

<style scoped lang="less">
  .goods-attribute {
    background: #fff;
  }

  :deep(.arco-tabs-content) {
    padding-top: 0;
  }
</style>
