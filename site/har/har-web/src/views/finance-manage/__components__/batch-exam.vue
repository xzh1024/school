<template>
  <a-modal
    v-model:visible="examineVisible"
    title="批量审批"
    title-align="start"
    :footer="false"
    unmount-on-close
  >
    <a-form ref="examForm" layout="vertical" :model="form">
      <a-form-item field="remarks" label="备注：">
        <a-textarea
          v-model="form.remarks"
          placeholder="请输入长度不超过200个字符的内容"
          :max-length="200"
          allow-clear
          show-word-limit
        />
      </a-form-item>
      <div class="prompt-title">转签/加签人</div>
      <a-select
        v-model:model-value="selectArr"
        :options="selectOptions"
        placeholder="请选择"
        :field-names="{ value: 'userCode', label: 'username' }"
        allow-search
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
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, onMounted, PropType, Ref, computed } from 'vue';
  import { useRequest } from '@har/use';
  import {
    cbdApiProjectPageApprovalUserGet,
    CbdApiProjectPageApprovalUserGetResponse
  } from '@/api';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  type Tasks = {
    processInstanceId: string;
    taskId: string;
  };
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    source: {
      type: String,
      default: ''
    },
    tasks: {
      type: Array as PropType<Tasks[]>,
      default: () => []
    },
    selectData: {
      type: Array as PropType<number[]>,
      default: () => []
    },
    api: {
      type: Function,
      required: true
    }
  });
  const emits = defineEmits(['update:modelValue', 'success']);
  const examineVisible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const examForm: Ref = ref(null);
  const form = ref({
    remarks: ''
  }); //备注

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
      billIds: props.selectData,
      approvalTaskList: props.tasks || [],
      comment: form.value.remarks,
      approvalType: 3,
      userCode: ''
    });
  };

  //转签
  const onBitchTurn = () => {
    doExamineServe({
      billIds: props.selectData,
      approvalTaskList: props.tasks || [],
      comment: form.value.remarks,
      approvalType: 1,
      userCode: selectArr.value.toString()
    });
  };

  //加签
  const onBitchPlus = () => {
    doExamineServe({
      billIds: props.selectData,
      approvalTaskList: props.tasks || [],
      comment: form.value.remarks,
      approvalType: 2,
      userCode: selectArr.value.toString()
    });
  };

  //同意
  const onBitchAgree = async () => {
    console.log('--确认审批--');
    doExamineServe({
      billIds: props.selectData,
      approvalTaskList: props.tasks || [],
      comment: form.value.remarks,
      approvalType: 2,
      userCode: ''
    });
  };

  const [doExamineServe] = useFuncProxy(async (p) => {
    try {
      const res = await examForm.value?.validate();
      if (res) return false;
      btnLoading.value = true;
      await props.api({ ...p });
      Message.success({ content: '审批成功' });
      examineVisible.value = false;
      emits('success');
    } catch (e) {
    } finally {
      btnLoading.value = false;
    }
  });
  onMounted(() => {
    getApprovalUser({ processInstanceId: '' });
  });
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
