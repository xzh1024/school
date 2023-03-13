<template>
  <Dialog
    ref="dialogRef"
    width="70%"
    hide-ok
    background
    :type="type"
    :form-component="Form"
    :success-msg="dialogProps.successMsg"
    :cancel-text="dialogProps.cancelText"
    :detail-api="dialogProps.detailApi"
    auto-requset-detail
  >
    <template #footer="{ record }">
      <!------------------------- 添加 ------------------------->
      <template v-if="type === 'ADD' || (openData && openData.without)">
        <a-button type="primary" :loading="loadingSave" @click="handleSave">
          保存
        </a-button>
        <a-button
          type="primary"
          :loading="loadingConfirm"
          @click="handleConfirm(true)"
        >
          确定
        </a-button>
      </template>
      <!------------------------- 详情 ------------------------->
      <template v-else>
        <a-button
          v-if="deleteAction.show(record)"
          type="primary"
          :loading="loadingDelete"
          @click="handleDelete(record.id)"
        >
          删除
        </a-button>
        <a-button
          v-if="confirmAction.show(record)"
          type="primary"
          :loading="loadingConfirm"
          @click="handleConfirm(false)"
        >
          确定
        </a-button>
        <a-button
          v-if="repealAction.show(record)"
          type="primary"
          :loading="loadingRepeal"
          @click="handleRepeal(record)"
        >
          作废
        </a-button>
        <a-button
          v-if="revokeAction.show(record)"
          type="primary"
          :loading="loadingRevoke"
          @click="handleRevoke(record)"
        >
          撤销
        </a-button>
      </template>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
  import { ref, nextTick, computed } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import {
    cbdApiProjectContractClearBillSavePost,
    cbdApiProjectContractClearBillInfoIdGet,
    cbdApiProjectContractClearBillRepealPost,
    cbdApiProjectContractClearBillRevokePost,
    cbdApiProjectContractClearBillConfirmPost,
    CbdApiProjectContractClearBillRepealPostRequest,
    CbdApiProjectContractClearBillInfoIdGetResponse
  } from '@/api';
  import { modalConfirm } from '@/utils';
  import Form from '../form/form-cud.vue';
  import Dialog from '@/components/dialog/index.vue';
  import useActions from '@/views/contract-clear-bill/use-actions';
  import { OpenData, OpenConfig } from '@/components/dialog/interface';
  import { cloneDeep } from 'lodash';

  const emit = defineEmits(['success']);
  const dialogRef = ref();
  const type = ref('DETAIL');
  const loadingSave = ref(false);
  const loadingConfirm = ref(false);
  const loadingRevoke = ref(false);
  const loadingDelete = ref(false);
  const loadingRepeal = ref(false);
  const openData = ref<OpenData>(null);

  const { repealAction, revokeAction, deleteAction, confirmAction } =
    useActions();

  const dialogProps = computed(() => {
    const dp: Recordable = {
      successMsg: '',
      cancelText: '',
      detailApi: undefined
    };
    switch (type.value) {
      case 'ADD':
        dp.successMsg = '添加成功';
        break;
      case 'EDIT':
        dp.successMsg = '修改成功';
        dp.detailApi = cbdApiProjectContractClearBillInfoIdGet;
        break;
      case 'DETAIL':
        dp.cancelText = '返回';
        if (!openData.value || !openData.value.without) {
          dp.detailApi = cbdApiProjectContractClearBillInfoIdGet;
        }
        break;
    }
    return dp;
  });

  function close() {
    openData.value = null;
    dialogRef.value?.close();
  }

  function open(config: OpenConfig, data?: OpenData) {
    data = data ? cloneDeep(data) : null;
    type.value = config.type;
    loadingSave.value = false;
    loadingRevoke.value = false;
    loadingRepeal.value = false;
    loadingDelete.value = false;
    loadingConfirm.value = false;
    openData.value = data as OpenData;
    nextTick(() => {
      dialogRef.value?.open(config, data);
    });
  }

  async function handleDelete(id: number | Array<number>) {
    dialogRef.value.execAsyncTask({
      async executor() {
        // 执行异步任务
        loadingDelete.value = true;
        await deleteAction(id);
      },
      completeCallback() {
        dialogRef.value.close();
        Message.success('操作成功');
        emit('success');
      },
      finallyCallback() {
        loadingDelete.value = false;
      }
    });
  }

  async function handleRepeal(
    data: CbdApiProjectContractClearBillRepealPostRequest
  ) {
    await modalConfirm('作废后，合同将回到已终止状态，是否作废？');
    dialogRef.value.execAsyncTask({
      async executor() {
        // 执行异步任务
        loadingRepeal.value = true;
        await cbdApiProjectContractClearBillRepealPost(data);
      },
      completeCallback() {
        dialogRef.value.close();
        Message.success('操作成功');
        emit('success');
      },
      finallyCallback() {
        loadingRepeal.value = false;
      }
    });
  }

  async function handleRevoke(
    data: CbdApiProjectContractClearBillInfoIdGetResponse
  ) {
    await modalConfirm('撤销后，将结束审批流程，是否撤销？');
    dialogRef.value.execAsyncTask({
      async executor() {
        // 执行异步任务
        loadingRevoke.value = true;
        await cbdApiProjectContractClearBillRevokePost({ id: data.id });
      },
      completeCallback() {
        dialogRef.value.close();
        Message.success('操作成功');
        emit('success');
      },
      finallyCallback() {
        loadingRevoke.value = false;
      }
    });
  }

  async function handleSave() {
    dialogRef.value.execAsyncTask({
      async executor() {
        // 执行异步任务
        loadingSave.value = true;
        const entity = await dialogRef.value.getFormRef().validate();
        await cbdApiProjectContractClearBillSavePost(entity);
      },
      completeCallback() {
        dialogRef.value.close();
        Message.success('操作成功');
        emit('success');
      },
      finallyCallback() {
        loadingSave.value = false;
      }
    });
  }

  async function handleConfirm(validateForm = true) {
    dialogRef.value.execAsyncTask({
      async executor() {
        // 执行异步任务
        const data = validateForm
          ? await dialogRef.value.getFormRef().validate()
          : await dialogRef.value.getFormRef().getFormModel();
        await modalConfirm(
          '数据确认后无法删除，是否提交审批？',
          async () => {}
        );
        loadingConfirm.value = true;
        await cbdApiProjectContractClearBillConfirmPost({
          contractId: data.contractId ?? data.contractCode,
          id: data.id
        });
      },
      completeCallback() {
        Message.success('操作成功');
        // 执行完成关闭弹窗，emit成功事件
        dialogRef.value.close();
        emit('success');
      },
      finallyCallback() {
        // 关闭loading状态
        loadingConfirm.value = false;
      }
    });
  }

  defineExpose({
    open,
    close
  });
</script>

<style lang="less" scoped></style>
