<template>
  <a-modal
    v-model:visible="examineVisible"
    title="批量审批"
    title-align="start"
    :footer="false"
    unmount-on-close
    @close="onClose"
  >
    <div class="textarea-box">
      <div class="prompt-title">备注：</div>
      <a-textarea
        v-model="remarks"
        placeholder="请输入长度不超过200个字符的内容"
        :max-length="200"
        allow-clear
        show-word-limit
      />
    </div>
    <div class="prompt-title">转签/加签人</div>
    <a-select
      v-model:model-value="selectArr"
      :options="selectOptions"
      placeholder="请选择"
      :field-names="{ value: 'userCode', label: 'username' }"
      allow-search
      multiple
      :max-tag-count="1"
    >
      <template #option="{ data }">
        <div class="select-cell flex align-center">
          <a-avatar v-if="data.avatar" class="margin-right-16">
            {{ data.avatar }}
          </a-avatar>
          <div class="margin-right-16">
            {{ data.username || data.userName }}
          </div>
          <div class="margin-right-16">{{ data.phoneNumber }}</div>
          <div class="margin-right-16">{{ data.deptName }}</div>
          <div>{{ data.roleName }}</div>
        </div>
      </template>
    </a-select>
    <div class="btn-box">
      <a-button
        class="h-btn h-disabled"
        type="primary"
        :loading="btnLoading"
        @click="onBitchReject"
        >驳回</a-button
      >
      <a-button
        class="h-btn"
        type="primary"
        :loading="btnLoading"
        :disabled="selectArr.length < 1"
        @click="onBitchTurn"
        >转签</a-button
      >
      <a-button
        class="h-btn"
        type="primary"
        :loading="btnLoading"
        :disabled="selectArr.length < 1"
        @click="onBitchPlus"
        >加签</a-button
      >
      <a-button
        class="h-btn"
        type="primary"
        :loading="btnLoading"
        @click="onBitchAgree"
        >同意</a-button
      >
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, PropType } from 'vue';
  import { useRequest } from '@har/use';
  import {
    cbdApiProjectMisPaymentRefundAuditPost,
    cbdApiProjectMisPaymentRefundAuditBeforePost,
    CbdApiProjectMisPaymentRefundAuditBeforePostResponse,
    cbdApiProjectPageApprovalUserGet,
    CbdApiProjectPageApprovalUserGetResponse
  } from '@/api';
  import { modalConfirm } from '@/utils';
  import { Message } from '@arco-design/web-vue';

  const props = defineProps({
    selectData: {
      type: Array as PropType<number[]>,
      default: () => []
    }
  });
  const emits = defineEmits(['update:modelValue', 'success']);
  const examineVisible = ref(false);
  const remarks = ref(''); //备注
  const approvalTaskList =
    ref<CbdApiProjectMisPaymentRefundAuditBeforePostResponse>([]);
  //获取可审批数量
  const { run: getTaskStatus } = useRequest(
    cbdApiProjectMisPaymentRefundAuditBeforePost,
    {
      manual: true,
      onSuccess(e) {
        modalConfirm(
          `${
            props.selectData.length - e.length
          }条数据不在您的审批范围内，是否对可审批数据进行审批？`,
          () => {
            examineVisible.value = true;
            getApprovalUser({ processInstanceId: '' });
            approvalTaskList.value = e;
          }
        );
      }
    }
  );
  const selectOptions = ref<CbdApiProjectPageApprovalUserGetResponse>([]);
  const selectArr = ref([]);
  const { run: getApprovalUser } = useRequest(
    cbdApiProjectPageApprovalUserGet,
    {
      manual: true,
      onSuccess(e) {
        selectOptions.value = e;
      }
    }
  );
  const btnLoading = ref(false);

  //驳回
  const onBitchReject = () => {
    doExamineServe({
      approvalTaskList: approvalTaskList.value,
      comment: remarks.value,
      approvalType: 3,
      userCode: ''
    });
  };

  //转签
  const onBitchTurn = () => {
    doExamineServe({
      approvalTaskList: approvalTaskList.value,
      comment: remarks.value,
      approvalType: 1, // 操作类型，1转签2审批通过3审批驳回4加签
      userCode: selectArr.value.toString() // 转签或加签人，多个用逗号隔开
    });
  };

  //加签
  const onBitchPlus = () => {
    doExamineServe({
      approvalTaskList: approvalTaskList.value,
      comment: remarks.value,
      approvalType: 4,
      userCode: selectArr.value.toString()
    });
  };

  //同意
  const onBitchAgree = async () => {
    doExamineServe({
      approvalTaskList: approvalTaskList.value,
      comment: remarks.value,
      approvalType: 2,
      userCode: ''
    });
  };

  const { run: doExamineServe } = useRequest(
    cbdApiProjectMisPaymentRefundAuditPost,
    {
      manual: true,
      onBefore() {
        btnLoading.value = true;
      },
      onSuccess() {
        Message.success({ content: '审批成功' });
        examineVisible.value = false;
        emits('success');
      },
      onFinally() {
        btnLoading.value = false;
      }
    }
  );
  const onClose = () => {
    remarks.value = '';
    selectArr.value = [];
  };

  const show = () => {
    if (props.selectData && props.selectData.length) {
      getTaskStatus({ list: props.selectData });
    }
  };

  defineExpose({ show: show });
</script>

<style scoped lang="less">
  .margin-right-16 {
    margin-right: 16px;
  }
  .i-btn {
    //min-width: 80px;
    //height: 30px;
    //border-radius: 4px;
  }
  .s-btn {
    color: #4c8af7;
    font-size: 14px;
    cursor: pointer;
  }
  .textarea-box {
    margin-bottom: 12px;
  }
  .prompt-title {
    margin-bottom: 12px;
  }
  .select-cell {
    height: 50px;
  }
  .btn-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    .h-disabled {
      color: #4c8af7;
      background: #dbe8fd;
    }
    .h-btn {
      width: 104px;
      height: 40px;
      border-radius: 4px;
    }
  }
</style>
