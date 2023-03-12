<template>
  <Dialog
    ref="dialogRef"
    width="60%"
    background
    :type="type"
    :form-component="FormCUD"
    :api="dialogProps.api"
    :detail-api="dialogProps.detailApi"
    :success-msg="dialogProps.successMsg"
    @success="emit('success')"
  >
    <template #footer="{ record }">
      <template v-if="type === 'DETAIL'">
        <a-button type="primary" @click="handleDelete(record.id)"
          >删除</a-button
        >
        <a-button type="primary" @click="type = 'EDIT'">编辑</a-button>
        <a-button type="primary" @click="handleResetPassword(record.id)">重置密码</a-button>
      </template>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
  import { computed, nextTick, ref } from 'vue';
  import {
    cbdApiProjectMerchantEmployeeInfoGet,
    cbdApiProjectMerchantEmployeeAddOrUpdatePost,
    cbdApiProjectMerchantEmployeeRemoveDelete, cbdApiProjectMerchantEmployeeResetPwdPut
  } from '@/api';
  import FormCUD from '../form/form-cud.vue';
  import Dialog from '@/components/dialog/index.vue';
  import { OpenData, OpenConfig } from '@/components/dialog/interface';
  import { modalConfirm } from '@/utils';
  import { Message } from '@arco-design/web-vue';

  const emit = defineEmits(['success']);
  const dialogRef = ref();
  const type = ref('DETAIL');

  const dialogProps = computed(() => {
    const dp: Recordable = {
      successMsg: '',
      cancelText: '',
      api: undefined,
      detailApi: undefined
    };
    switch (type.value) {
      case 'ADD':
        dp.api = cbdApiProjectMerchantEmployeeAddOrUpdatePost;
        dp.successMsg = '添加成功';
        break;
      case 'EDIT':
        dp.successMsg = '修改成功';
        dp.api = cbdApiProjectMerchantEmployeeAddOrUpdatePost;
        dp.detailApi = cbdApiProjectMerchantEmployeeInfoGet;
        break;
      case 'DETAIL':
        dp.cancelText = '返回';
        dp.api = undefined;
        dp.detailApi = cbdApiProjectMerchantEmployeeInfoGet;
        break;
    }
    return dp;
  });

  function open(config: OpenConfig, data?: OpenData) {
    type.value = config.type;
    nextTick(() => {
      dialogRef.value?.open(config, data);
    });
  }

  function close() {
    dialogRef.value?.close();
  }

  async function handleResetPassword(id: string) {
    await modalConfirm('确认重置密码？');
    await cbdApiProjectMerchantEmployeeResetPwdPut({
      ids: id
    });
    Message.success('操作成功');
    close();
    emit('success');
  }

  async function handleDelete(id: string) {
    await modalConfirm('删除后数据无法恢复，是否删除？');
    await cbdApiProjectMerchantEmployeeRemoveDelete({ id });
    close();
    emit('success');
  }

  defineExpose({
    open,
    close
  });
</script>

<style lang="less" scoped></style>
