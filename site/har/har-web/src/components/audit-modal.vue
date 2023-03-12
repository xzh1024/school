<template>
  <a-modal
    :visible="modelValue"
    :title="topTitle"
    unmount-on-close
    :mask-closable="false"
    :footer="false"
    @cancel="handleCancel"
  >
    <a-form
      ref="receiveForm"
      :model="comp.form"
      layout="vertical"
      :rules="comp.rules"
      @submit="handleSub"
    >
      <a-form-item field="remark" :label="title">
        <a-textarea
          v-model="comp.form.remark"
          placeholder="请填写备注信息"
          allow-clear
        />
      </a-form-item>
      <a-form-item>
        <div class="flex justify-end" style="width: 100%">
          <a-button style="margin-right: 15px" @click="handleCancel"
            >取消</a-button
          >
          <a-button html-type="submit" type="primary">提交</a-button>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import type { FieldRule, ValidatedError } from '@arco-design/web-vue';

  const emits = defineEmits(['submit', 'update:modelValue']);
  defineProps({
    title: {
      type: String,
      default: '确认拒绝当前收款单?'
    },
    topTitle: {
      type: String,
      default: '审核收款'
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  });
  const receiveForm = ref<any>(null);

  const comp = reactive<{
    isOkLoading: boolean;
    rules: Record<string, FieldRule | FieldRule[]>;
    form: {
      remark: string;
    };
  }>({
    isOkLoading: false,
    rules: { remark: {} },
    form: {
      remark: ''
    }
  });
  function reset() {
    receiveForm.value?.resetFields();
  }
  const handleCancel = () => {
    emits('update:modelValue', false);
    reset();
  };
  function handleSub(e: {
    values: Record<string, any>;
    errors: Record<string, ValidatedError> | undefined;
  }) {
    const { errors } = e;
    if (!errors) {
      emits('submit', comp.form);
      reset();
    }
  }
</script>

<style scoped lang="less">
  .top-box {
    box-sizing: border-box;
    height: 90px;
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 5px;

    .amount-mark {
      display: flex;
      align-items: center;
      width: 10%;
      font-size: 50px;
    }

    .amount-right {
      flex-wrap: wrap;
      justify-content: space-between;
      width: 90%;

      .amount-each {
        width: 48%;
        margin-bottom: 10px;

        &.current {
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }
</style>
