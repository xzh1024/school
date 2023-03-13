<template>
  <div class="footer-box">
    <div class="left-box">
      <template
        v-if="
          handleType === 3 &&
          needLeftBtn &&
          !contractStore.contractInfo.onlyShowDetail
        "
      >
        <a-button
          v-if="showRevokeBtn"
          v-permission="
            contractType === 2
              ? ['formal:contract:approval:confirm']
              : ['intention:contract:approval:revoke']
          "
          class="i-btn"
          type="primary"
          :loading="btnLoading"
          :disabled="btnLoading"
          @click="onRevoke"
          >撤销</a-button
        >
        <a-button
          v-if="showUpdateBtn && needUpdateBtn && isModify"
          class="i-btn"
          type="primary"
          :loading="btnLoading"
          :disabled="btnLoading"
          @click="onUpdate"
          >修改</a-button
        >
        <a-button
          v-if="showDelBtn"
          v-permission="
            contractType === 2
              ? ['formal:contract:delete']
              : ['intention:contract:delete']
          "
          class="i-btn"
          type="primary"
          :loading="btnLoading"
          :disabled="btnLoading"
          @click="onDel"
          >删除</a-button
        >
        <a-button
          v-if="showConfirmBtn"
          v-permission="
            contractType === 2
              ? ['formal:contract:approval:confirm']
              : ['intention:contract:approval:confirm']
          "
          class="i-btn"
          type="primary"
          :loading="btnLoading"
          :disabled="btnLoading"
          @click="onConfirm"
          >确认</a-button
        >
        <a-button
          v-if="showChangeFormal && contractType === 1"
          v-permission="['intention:contract:approval:trans']"
          class="i-btn"
          type="primary"
          :loading="btnLoading"
          :disabled="btnLoading"
          @click="onChangeFormal"
          >转正式合同</a-button
        >
        <a-button
          v-if="showStopBtn && contractType === 2"
          v-permission="['formal:contract:approval:termination']"
          class="i-btn"
          type="primary"
          :loading="btnLoading"
          :disabled="btnLoading"
          @click="onStop"
          >终止</a-button
        >
        <a-button
          v-if="showCancel"
          v-permission="
            contractType === 2
              ? ['formal:contract:approval:cancel']
              : ['intention:contract:approval:cancel']
          "
          class="i-btn"
          type="primary"
          :loading="btnLoading"
          :disabled="btnLoading"
          @click="onContractCancel"
          >作废</a-button
        >
        <a-button
          v-if="showSettle && contractType === 2"
          v-permission="['formal:contract:approval:clear']"
          class="i-btn"
          type="primary"
          :loading="btnLoading"
          :disabled="btnLoading"
          @click="onSettle"
          >清算</a-button
        >
      </template>
    </div>
    <div class="right-box">
      <a-button class="i-btn active" type="primary" @click="onCancel"
        >取消</a-button
      >
      <a-button
        v-if="needSave && !contractStore.contractInfo.onlyShowDetail"
        class="i-btn"
        type="primary"
        :loading="btnLoading"
        :disabled="btnLoading"
        @click="onSave"
        >保存</a-button
      >
      <a-button
        v-if="needPre"
        class="i-btn"
        type="primary"
        :loading="btnLoading"
        :disabled="btnLoading"
        @click="onPre"
        >上一步</a-button
      >
      <a-button
        v-if="needExamine && !contractStore.contractInfo.onlyShowDetail"
        class="i-btn"
        type="primary"
        :loading="btnLoading"
        :disabled="btnLoading"
        @click="onExamine"
        >确认审批</a-button
      >
      <a-button
        v-if="needNext"
        class="i-btn"
        type="primary"
        :loading="btnLoading"
        :disabled="btnLoading"
        @click="onNext"
        >下一步</a-button
      >
    </div>
  </div>
  <a-modal
    v-model:visible="promptVisible"
    title="提示"
    title-align="start"
    @ok="confirmOk"
    @cancel="promptVisible = false"
  >
    <div>{{ content }}</div>
  </a-modal>
  <drawer
    v-model:model-value="drawerVisible"
    title="提请审核"
    width="40%"
    :no-padding="true"
    unmount-on-close
  >
    <template #footer>
      <a-button @click="drawerVisible = false">取消</a-button>
      <a-button type="primary" @click="onOk">确定</a-button>
    </template>
    <div class="drawer-content">
      <div>数据确认后无法删除，是否提交审批？</div>
      <div class="write-box margin-top-xl">
        <div class="margin-bottom-xs">备注：</div>
        <a-textarea
          v-model="remarks"
          placeholder="请输入长度不超过200个字符的内容"
          :max-length="200"
          allow-clear
          show-word-limit
        />
      </div>
      <div class="margin-top-xl">
        <div class="margin-bottom-xs">附件：</div>
        <i-custom-upload
          v-model="file"
          :options="{
            draggable: true,
            listType: 'text',
            accept:
              'application/vnd.ms-excel,' +
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' +
              'image/jpeg,image/png,image/jpg' +
              'application/vnd.msword,' +
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document,' +
              'application/pdf'
          }"
        />
      </div>
    </div>
  </drawer>

  <DialogCUD ref="dialogCUDRef" @success="onSuccess" />
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useContractStore } from '@/store/project/contract';
  import { Message } from '@arco-design/web-vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import { modalConfirm } from '@/utils';
  import DialogCUD from '@/views/contract-clear-bill/__components__/dialog/dialog-cud.vue';
  import { useRouter } from 'vue-router';

  defineProps({
    needLeftBtn: {
      type: Boolean,
      default: true
    },
    needUpdateBtn: {
      type: Boolean,
      default: true
    },
    needPre: {
      type: Boolean,
      default: true
    },
    needNext: {
      type: Boolean,
      default: true
    },
    needSave: {
      type: Boolean,
      default: true
    },
    needExamine: {
      type: Boolean,
      default: false
    },
    btnLoading: {
      type: Boolean,
      default: false
    }
  });
  const emits = defineEmits([
    'onUpdate',
    'onDel',
    'onConfirm',
    'onStop',
    'onContractCancel',
    'onSettle',
    'onCancel',
    'onSave',
    'onPre',
    'onNext',
    'onExamine'
  ]);

  const contractStore = useContractStore();
  //合同类型
  const contractType = computed(() => {
    return contractStore.contractInfo.contractType;
  });
  //合同id
  const contractId = computed(() => {
    return Number(contractStore.contractInfo.contractId);
  });
  //操作类型
  const handleType = computed(() => {
    return contractStore.contractInfo.handleType;
  });
  //业务状态
  const contractBusinessStatus = computed(() => {
    return contractStore.contractInfo.businessStatus;
  });
  //审批状态
  const contractVerifyStatus = computed(() => {
    return contractStore.contractInfo.verifyStatus;
  });
  //是否可编辑
  const isModify = computed(() => {
    return contractStore.contractInfo.isModify;
  });

  //撤销按钮 审批中
  const showRevokeBtn = computed(() => {
    return contractVerifyStatus.value === 2;
  });

  //展示转正式合同按钮 1.已确认 已审核
  const showChangeFormal = computed(() => {
    return (
      contractBusinessStatus.value === 3 && contractVerifyStatus.value === 5
    );
  });
  // 1.草稿-未提交 2.待确认-未提交 3待确认-已驳回/撤销 4.已确认-已通过
  const showUpdateBtn = computed(() => {
    return (
      (contractBusinessStatus.value === 1 &&
        contractVerifyStatus.value === 1) ||
      (contractBusinessStatus.value === 2 &&
        contractVerifyStatus.value === 1) ||
      (contractBusinessStatus.value === 2 &&
        [3, 4].includes(contractVerifyStatus.value)) ||
      (contractBusinessStatus.value === 3 && contractVerifyStatus.value === 5)
    );
  });
  // 1.草稿-未提交 2.待确认-未提交 3待确认-已驳回/撤销
  const showDelBtn = computed(() => {
    return (
      (contractBusinessStatus.value === 1 &&
        contractVerifyStatus.value === 1) ||
      (contractBusinessStatus.value === 2 &&
        contractVerifyStatus.value === 1) ||
      (contractBusinessStatus.value === 2 &&
        [3, 4].includes(contractVerifyStatus.value))
    );
  });
  //1.待确认-未提交
  const showConfirmBtn = computed(() => {
    return (
      contractBusinessStatus.value === 2 && contractVerifyStatus.value === 1
    );
  });
  //1.已确认-已通过
  const showStopBtn = computed(() => {
    return (
      contractBusinessStatus.value === 3 && contractVerifyStatus.value === 5
    );
  });
  //1.已确认-已通过
  const showCancel = computed(() => {
    return (
      contractBusinessStatus.value === 3 && contractVerifyStatus.value === 5
    );
  });
  //1.已终止-已通过
  const showSettle = computed(() => {
    return (
      contractBusinessStatus.value === 6 && contractVerifyStatus.value === 5
    );
  });

  const promptVisible = ref(false);
  const confirmType = ref('');
  const content = ref('');
  const onCancel = () => {
    if (handleType.value !== 3) {
      content.value = '取消后不保存本次编辑内容';
      confirmType.value = 'cancel';
      promptVisible.value = true;
    } else {
      confirmType.value = 'cancel';
      confirmOk();
    }
  };

  const onRevoke = () => {
    modalConfirm('确认撤销？', async () => {
      const d =
        contractType.value === 2
          ? await contractStore.revokeContract(String(contractId.value))
          : await contractStore.revokeIntentionContract(
              String(contractId.value)
            );
      if (d) {
        Message.success({ content: '撤销成功' });
        drawerVisible.value = false;
        contractStore.drawerVisibleChange();
        contractStore.tableRefreshChange();
      }
    });
  };

  const onUpdate = () => {
    emits('onUpdate');
  };
  const onDel = () => {
    content.value = '删除后数据无法恢复，是否删除？';
    confirmType.value = 'del';
    promptVisible.value = true;
  };

  const drawerVisible = ref(false);
  const remarks = ref('');
  const file: any = ref([]);
  const onConfirm = () => {
    drawerVisible.value = true;
  };
  const onOk = async () => {
    console.log(Number(contractStore.contractInfo.contractId), '合同id');
    console.log(remarks.value, '备注');
    const sourceCodeList = file.value.map((item: any) => item.key);
    console.log(sourceCodeList, '文件列表');
    const d =
      contractType.value === 2
        ? await contractStore.confirmContract(
            [String(contractId.value)],
            sourceCodeList,
            remarks.value
          )
        : await contractStore.confirmIntentionContract(
            [String(contractId.value)],
            sourceCodeList,
            remarks.value
          );
    if (d) {
      Message.success({ content: '提交审批成功' });
      drawerVisible.value = false;
      contractStore.drawerVisibleChange();
      contractStore.tableRefreshChange();
    }
  };

  //转正式合同
  const onChangeFormal = () => {
    content.value = '是否转为正式合同？';
    confirmType.value = 'changeFormal';
    promptVisible.value = true;
  };

  const onStop = () => {
    content.value = '是否终止合同？';
    confirmType.value = 'stop';
    promptVisible.value = true;
  };
  const onContractCancel = () => {
    content.value = '数据作废后无法恢复，是否作废？';
    confirmType.value = 'toVoid';
    promptVisible.value = true;
  };

  const dialogCUDRef = ref();
  const onSettle = () => {
    dialogCUDRef.value.open(
      { type: 'DETAIL' },
      { without: true, contractId: contractId.value }
    );
    // contractStore.drawerVisibleChange();
    // content.value = '合同清算后，不能对其数据进行查看外的其他操作，是否清算？';
    // confirmType.value = 'settle';
    // promptVisible.value = true;
  };
  //清算之后回调
  const router = useRouter();
  const onSuccess = () => {
    contractStore.drawerVisibleChange();
    router.push({
      path: '/contract-clear-bill/list'
    });
  };

  const confirmOk = async () => {
    if (confirmType.value === 'cancel') {
      emits('onCancel');
    } else if (confirmType.value === 'del') {
      const d =
        contractType.value === 2
          ? await contractStore.delContract([contractId.value])
          : await contractStore.delIntentionContract([contractId.value]);
      if (d) {
        console.log('关闭弹窗并刷新列表');
        Message.success({ content: '删除成功' });
        contractStore.drawerVisibleChange();
        contractStore.tableRefreshChange();
      }
    } else if (confirmType.value === 'confirm') {
    } else if (confirmType.value === 'stop') {
      const d = await contractStore.terminationContract(
        String(contractId.value)
      );
      if (d) {
        Message.success({ content: '合同已终止' });
        contractStore.drawerVisibleChange();
        contractStore.tableRefreshChange();
      }
    } else if (confirmType.value === 'toVoid') {
      const d =
        contractType.value === 2
          ? await contractStore.cancelContract(String(contractId.value))
          : await contractStore.cancelIntentionContract(
              String(contractId.value)
            );
      if (d) {
        Message.success({ content: '合同已作废' });
        contractStore.drawerVisibleChange();
        contractStore.tableRefreshChange();
      }
    } else if (confirmType.value === 'settle') {
      const d = await contractStore.clearContract(String(contractId.value));
      if (d) {
        Message.success({ content: '合同已清算' });
        contractStore.drawerVisibleChange();
        contractStore.tableRefreshChange();
      }
    } else if (confirmType.value === 'changeFormal') {
      const d = await contractStore.changeFormal(String(contractId.value));
      if (d) {
        Message.success({ content: '当前意向合同已转为正式合同!' });
        contractStore.drawerVisibleChange();
        contractStore.tableRefreshChange();
      }
    }
  };

  const onSave = () => {
    emits('onSave');
  };

  const onPre = () => {
    emits('onPre');
  };

  const onNext = () => {
    emits('onNext');
  };

  const onExamine = () => {
    onConfirm();
    // emits('onExamine');
  };
</script>

<style scoped lang="less">
  .footer-box {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 12px 16px;
    background: #fff;
    .left-box {
      display: flex;
      justify-content: flex-start;
    }
    .right-box {
      display: flex;
      justify-content: flex-end;
    }
    .i-btn {
      //width: 104px;
      //height: 40px;
      margin-right: 8px;
      //border-radius: 4px;
      &:last-child {
        margin-right: 0;
      }
      &.active {
        color: #4c8af7;
        background: #dbe8fd;
      }
    }
  }
  .drawer-content {
    width: 100%;
    padding: 16px;
    background: #fff;
    //.write-box {
    //  width: 100%;
    //  display: flex;
    //  flex-direction: column;
    //}
  }
</style>
