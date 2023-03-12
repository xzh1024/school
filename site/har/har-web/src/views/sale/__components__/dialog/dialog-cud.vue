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
  >
    <template #footer="{ record }">
      <!-- 添加 -->
      <template v-if="type === 'ADD'">
        <a-button
          type="primary"
          :loading="loadingAdd"
          @click="handleAdd(false)"
        >
          保存
        </a-button>
        <a-button type="primary" :loading="loadingAdd" @click="handleAdd(true)"
          >确认</a-button
        >
      </template>
      <!-- 修改 -->
      <template v-else-if="type === 'EDIT'">
        <a-button
          type="primary"
          :loading="loadingEdit"
          @click="handleEdit(false)"
          >保存</a-button
        >
        <a-button
          v-if="confirmAction.show(record)"
          type="primary"
          :loading="loadingEdit"
          @click="handleEdit(true)"
          >确认</a-button
        >
      </template>
      <!-- 详情 -->
      <template v-else>
        <!--v-if="-->
        <!--record.businessStatus !== 5 ||-->
        <!--record.businessStatus !== 4 ||-->
        <!--record.verifyStatus !== 2-->
        <!--"-->
        <a-button
          v-if="editAction.show(record)"
          type="primary"
          @click="type = 'EDIT'"
          >编辑</a-button
        >
        <!--v-if="-->
        <!--record.verifyStatus === 1 ||-->
        <!--record.verifyStatus === 3 ||-->
        <!--record.verifyStatus === 4-->
        <!--"-->
        <a-button
          v-if="deleteAction.show(record)"
          :loading="loadingDelete"
          type="primary"
          @click="handleDelete(record.recordId)"
        >
          删除
        </a-button>
        <a-button
          v-if="confirmAction.show(record)"
          type="primary"
          @click="handleConfirm([record.recordId])"
        >
          确认
        </a-button>
        <a-button
          v-if="cancelAction.show(record)"
          :loading="loadingCancel"
          type="primary"
          @click="handleCancel(record.recordId)"
        >
          作废
        </a-button>
        <a-button
          v-if="revokeAction.show(record)"
          :loading="loadingRevoke"
          type="primary"
          @click="handleRevoke(record.recordId)"
        >
          撤销
        </a-button>
      </template>
    </template>
  </Dialog>
  <DialogConfirmRef ref="dialogConfirmRef" @success="dialogRef.close()" />
</template>

<script setup lang="ts">
  import { ref, computed, nextTick } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import {
    cbdApiProjectSaleInfoGet,
    cbdApiProjectSaleCancelGet,
    cbdApiProjectSaleRevokeGet,
    CbdApiProjectSaleInfoGetRequest,
    cbdApiProjectSaleUpdatePost,
    cbdApiProjectSaleAddPost
  } from '@/api';
  import { modalConfirm } from '@/utils';
  import Form from '../form/form-cud.vue';
  import useActions from '../../use-action';
  import Dialog from '@/components/dialog/index.vue';
  import DialogConfirmRef from './dialog-approval.vue';
  import { OpenData, OpenConfig } from '@/components/dialog/interface';

  const emit = defineEmits(['success']);
  const dialogRef = ref();
  const dialogConfirmRef = ref();
  const type = ref('DETAIL');
  const loadingCancel = ref(false);
  const loadingRevoke = ref(false);
  const loadingDelete = ref(false);

  const loadingAdd = ref(false);
  const loadingEdit = ref(false);
  const {
    editAction,
    cancelAction,
    revokeAction,
    deleteAction,
    confirmAction
  } = useActions();

  type DialogPropsType = ComponentPropsType<typeof Dialog>;
  const dialogProps = computed<DialogPropsType>(() => {
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
        dp.detailApi = fetchDetail;
        break;
      case 'DETAIL':
        dp.cancelText = '返回';
        dp.detailApi = fetchDetail;
        break;
    }
    return dp as DialogPropsType;
  });

  function close() {
    dialogRef.value?.close();
  }

  function open(config: OpenConfig, data?: OpenData) {
    type.value = config.type;
    loadingCancel.value = false;
    loadingRevoke.value = false;
    loadingDelete.value = false;

    loadingAdd.value = false;
    loadingEdit.value = false;
    nextTick(() => {
      dialogRef.value?.open(config, data);
    });
  }

  async function handleAdd(hasConfirm = false) {
    dialogRef.value.execAsyncTask({
      async executor() {
        const data = await dialogRef.value.getFormRef().validate?.();
        data.type = hasConfirm === true ? 2 : 1;
        if (hasConfirm === true) {
          await modalConfirm('数据确认后无法删除，是否提交审批？');
        }
        loadingAdd.value = true;
        await cbdApiProjectSaleAddPost(data);
      },
      completeCallback() {
        Message.success('操作成功');
        dialogRef.value.close();
        emit('success');
      },
      finallyCallback() {
        loadingAdd.value = false;
      }
    });
  }

  async function handleEdit(hasConfirm = false) {
    dialogRef.value.execAsyncTask({
      async executor() {
        const data = await dialogRef.value.getFormRef().validate?.();
        data.type = hasConfirm === true ? 2 : 1;
        if (hasConfirm === true) {
          await modalConfirm('数据确认后无法删除，是否提交审批？');
        }
        loadingEdit.value = true;
        await cbdApiProjectSaleUpdatePost(data);
      },
      completeCallback() {
        Message.success('操作成功');
        dialogRef.value.close();
        emit('success');
      },
      finallyCallback() {
        loadingEdit.value = false;
      }
    });
  }

  async function handleConfirm(ids: Array<number>) {
    await confirmAction({
      recordIds: ids
    });
    close();
    emit('success');
  }

  function handleCancel(id: string) {
    modalConfirm('是否作废？', async () => {
      dialogRef.value.execAsyncTask({
        async executor() {
          // 执行异步任务
          loadingCancel.value = true;
          await cbdApiProjectSaleCancelGet({
            recordId: id
          });
        },
        completeCallback() {
          // 执行完成关闭弹窗，emit成功事件
          dialogRef.value.close();
          emit('success');
        },
        finallyCallback() {
          // 关闭loading状态
          loadingCancel.value = false;
        }
      });
    });
  }

  function handleRevoke(id: string) {
    modalConfirm('是否撤销？', async () => {
      dialogRef.value.execAsyncTask({
        async executor() {
          // 执行异步任务
          loadingRevoke.value = true;
          await cbdApiProjectSaleRevokeGet({
            recordId: id
          });
        },
        completeCallback() {
          // 执行完成关闭弹窗，emit成功事件
          dialogRef.value.close();
          emit('success');
        },
        finallyCallback() {
          // 关闭loading状态
          loadingRevoke.value = false;
        }
      });
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
        // 执行完成关闭弹窗，emit成功事件
        dialogRef.value.close();
        emit('success');
      },
      finallyCallback() {
        // 关闭loading状态
        loadingDelete.value = false;
      }
    });
  }

  async function fetchDetail(params: CbdApiProjectSaleInfoGetRequest) {
    const res = await cbdApiProjectSaleInfoGet(params);
    // @ts-ignore
    res.annexList = res.resourceList?.map((itm) => itm.id) ?? [];
    return res;
  }
  defineExpose({
    open,
    close
  });
</script>

<style lang="less" scoped></style>
