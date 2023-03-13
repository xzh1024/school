<template>
  <fc-designer ref="designer" @save="onSave">
    <template #handle>
      <!-- <a-button size="small" @click="setJson">导入JSON</a-button>
        <a-button size="small" @click="setOption">导入Options</a-button>
        <a-button size="small" @click="showJson">生成JSON</a-button>
        <a-button size="small" @click="showOption">生成Options</a-button> -->
    </template>
  </fc-designer>
</template>

<script setup lang="ts">
  import { computed, PropType } from 'vue';

  function onSave(params: unknown) {
    console.log(params);
  }
</script>
