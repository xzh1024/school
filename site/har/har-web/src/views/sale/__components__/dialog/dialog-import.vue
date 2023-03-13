<template>
  <Dialog
    ref="dialogRef"
    width="80%"
    success-msg="导入成功"
    background
    :form-component="Form"
    :api="cbdApiProjectSaleImportGet"
    @success="emit('success')"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { cbdApiProjectSaleImportGet } from '@/api';
  import Form from '../form/form-import.vue';
  import Dialog from '@/components/dialog/index.vue';
  import { OpenData, OpenConfig } from '@/components/dialog/interface';

  const emit = defineEmits(['success']);
  const dialogRef = ref();

  function open(config: OpenConfig, data?: OpenData) {
    dialogRef.value?.open(config, data);
  }

  function close() {
    dialogRef.value?.close();
  }

  defineExpose({
    open,
    close
  });
</script>

<style lang="less" scoped></style>
