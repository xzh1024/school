<template>
  <!-- 确认 -->
  <Dialog
    ref="dialogRef"
    :form-component="Form"
    :api="fetchSave"
    :type="type"
    width="50%"
    success-msg="操作成功"
  />
</template>

<script setup lang="ts">
  import { nextTick, ref } from 'vue';
  import {
    cbdApiProjectSaleApprovalPost,
    CbdApiProjectSaleApprovalPostRequest,
  } from '@/api';
  import Form from '../form/form-approval.vue';
  import Dialog from '@/components/dialog/index.vue';
  import { OpenData, OpenConfig } from '@/components/dialog/interface';
  import { modalConfirm } from '@/utils';

  const emit = defineEmits(['success']);
  const dialogRef = ref();
  const type = ref('DETAIL');
  const loadingSave = ref(false);
  const loadingPublish = ref(false);

  function open(config: OpenConfig, data?: OpenData) {
    loadingSave.value = false;
    loadingPublish.value = false;
    type.value = config.type;
    nextTick(() => {
      dialogRef.value?.open(
        {
          ...config,
          title: config.title ?? '确认'
        },
        data
      );
    });
  }

  function close() {
    dialogRef.value?.close();
  }

  async function fetchSave(params: CbdApiProjectSaleApprovalPostRequest) {
    await modalConfirm('数据确认后无法删除，是否提交审批？');
    await cbdApiProjectSaleApprovalPost(params);
    emit('success');
  }

  defineExpose({
    open,
    close
  });
</script>

<style lang="less" scoped></style>
