<template>
  <Dialog
    ref="dialogRef"
    width="800px"
    background
    :type="type"
    :hide-ok="true"
    :form-component="FormCUD"
    :detail-api="dialogProps.detailApi"
    :success-msg="dialogProps.successMsg"
    @success="emit('success')"
  >
    <template #footer="{ record }">
      <template v-if="type === 'ADD'">
        <a-button type="primary" @click="handleSave()">保存</a-button>
        <a-button type="primary" @click="handleSave(true)">发布</a-button>
      </template>
      <template v-else-if="type === 'EDIT'">
        <a-button
          v-if="record.status !== 4"
          type="primary"
          @click="handleSave()"
          >保存</a-button
        >
        <a-button
          v-if="switchStatusAction.show(record, 1)"
          type="primary"
          @click="handleSave(true)"
          >发布</a-button
        >
      </template>
      <template v-else-if="type === 'DETAIL'">
        <a-button
          v-if="editAction.show(record)"
          type="primary"
          @click="type = 'EDIT'"
          >编辑</a-button
        >
        <a-button
          v-if="deleteAction.show(record)"
          type="primary"
          @click="handleDelete(record.id)"
        >
          删除
        </a-button>
        <a-button
          v-if="switchStatusAction.show(record, 1)"
          type="primary"
          @click="handleSwitchStatus(record.id, 1)"
        >
          发布
        </a-button>
        <a-button
          v-if="switchStatusAction.show(record, 2)"
          type="primary"
          @click="handleSwitchStatus(record.id, 2)"
        >
          撤回
        </a-button>
        <a-button
          v-if="switchStatusAction.show(record, 3)"
          type="primary"
          @click="handleSwitchStatus(record.id, 3)"
        >
          下架
        </a-button>
      </template>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
  import { computed, nextTick, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import {
    cbdApiProjectMessageManageInfoIdGet,
    cbdApiProjectMessageManageAddOrUpdateMessagePost
  } from '@/api';
  import useActions from '../../use-action';
  import FormCUD from '../form/form-cud.vue';
  import Dialog from '@/components/dialog/index.vue';
  import { OpenData, OpenConfig } from '@/components/dialog/interface';

  const emit = defineEmits(['success']);
  const dialogRef = ref();
  const type = ref('DETAIL');
  const loadingSave = ref(false);
  const loadingPublish = ref(false);
  const { editAction, deleteAction, switchStatusAction } = useActions();

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
        dp.detailApi = cbdApiProjectMessageManageInfoIdGet;
        break;
      case 'DETAIL':
        dp.cancelText = '返回';
        dp.detailApi = cbdApiProjectMessageManageInfoIdGet;
        break;
    }
    return dp;
  });

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

  async function handleSwitchStatus(
    id: number | Array<number>,
    operateStatus: 1 | 2 | 3
  ) {
    switchStatusAction(
      {
        id,
        operateStatus
      },
      {
        textMap: {
          2: '撤回后，再次编辑可再次发布，是否撤回？'
        },
        completeCallback() {
          close();
          emit('success');
        }
      }
    );
  }

  async function handleDelete(id: number | Array<number>) {
    deleteAction(id, {
      completeCallback() {
        close();
        emit('success');
      }
    });
  }

  async function handleSave(publishFlag = false) {
    dialogRef.value.execAsyncTask({
      async executor() {
        if (publishFlag) {
          loadingPublish.value = true;
        } else {
          loadingSave.value = true;
        }
        const data = await dialogRef.value.getFormRef().validate?.();
        data.publishFlag = publishFlag;
        await cbdApiProjectMessageManageAddOrUpdateMessagePost(data);
      },
      completeCallback() {
        Message.success((publishFlag ? '发布' : '保存') + '成功');
        dialogRef.value.close();
        emit('success');
      },
      finallyCallback() {
        if (publishFlag) {
          loadingPublish.value = false;
        } else {
          loadingSave.value = false;
        }
      }
    });
  }

  defineExpose({
    open,
    close
  });
</script>

<style lang="less" scoped></style>
