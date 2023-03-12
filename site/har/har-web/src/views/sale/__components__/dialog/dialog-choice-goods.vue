<template>
  <Dialog
    ref="dialogRef"
    :hide-ok="true"
    :form-component="Form"
    :type="type"
    width="50%"
    success-msg="添加成功"
    background
    @success="emit('success')"
  >
    <template #footer>
      <a-button type="primary" @click="handleSave()">保存</a-button>
    </template>
  </Dialog>
  <DialogCUD ref="dialogCUD" @success="handleSuccess" />
</template>

<script setup lang="ts">
  import { nextTick, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';

  import DialogCUD from './dialog-cud.vue';
  import Form from '../form/form-choice-goods.vue';
  import Dialog from '@/components/dialog/index.vue';
  import { OpenData, OpenConfig } from '@/components/dialog/interface';

  const emit = defineEmits(['success']);
  const dialogRef = ref();
  const dialogCUD = ref();
  const type = ref('DETAIL');
  const loadingSave = ref(false);
  const loadingPublish = ref(false);

  function open(config: OpenConfig, data?: OpenData) {
    loadingSave.value = false;
    loadingPublish.value = false;
    type.value = config.type;
    nextTick(() => {
      dialogRef.value?.open(config, data);
    });
  }

  function close() {
    dialogRef.value?.close();
  }

  async function handleSave() {
    const data = await dialogRef.value.getFormRef().validate();
    if (data.goodsList.length === 0) {
      return Message.error('请选择货品');
    }
    data.brandId = data.goodsList[0].brandId;
    data.brandName = data.goodsList[0].brandName;
    data.contractCode = data.goodsList[0].contractCode;
    dialogCUD.value.open({ type: 'ADD' }, data);
  }

  function handleSuccess() {
    dialogRef.value.close();
    emit('success');
  }

  defineExpose({
    open,
    close
  });
</script>

<style lang="less" scoped></style>
