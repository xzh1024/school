<template>
  <a-modal
    :visible="submitCertainVisible"
    title="确认提示"
    @ok="onBatchCertain"
    @cancel="submitCertainVisible = false"
    @close="submitExamineClose"
  >
    <div>是否开票：</div>
    <a-radio-group
      v-model="confirmForm.autoOpenInvoice"
      style="margin-top: 10px"
    >
      <a-radio :value="1">是</a-radio>
      <a-radio :value="0">否</a-radio>
    </a-radio-group>
    <div class="margin-top-xl">
      <div class="margin-bottom-xs">备注：</div>
      <a-textarea
        v-model="confirmForm.remark"
        placeholder="请输入长度不超过200个字符的内容"
        :max-length="200"
        allow-clear
        show-word-limit
      />
    </div>
    <div
      style="
        width: 100%;
        text-align: right;
        padding-right: 10px;
        font-size: 12px;
        color: red;
      "
    >注：预收款、保证金、意向金收款后不开具发票！</div
    >
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, watch, computed } from 'vue';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: true
    }
  });
  const emits = defineEmits(['success', 'data', 'update:modelValue']);
  const submitCertainVisible = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emits('update:modelValue', value);
    }
  });
  type FormItems = {
    autoOpenInvoice: number;
    remark: string;
  };
  const confirmForm = ref<FormItems>({
    autoOpenInvoice: 1,
    remark: ''
  });
  const onBatchCertain = () => {
    emits('data', confirmForm.value);
  };
  // 弹框关闭后初始化数据
  const submitExamineClose = () => {
    confirmForm.value = {
      autoOpenInvoice: 1,
      remark: ''
    };
  };
</script>

<style scoped lang="less"></style>
