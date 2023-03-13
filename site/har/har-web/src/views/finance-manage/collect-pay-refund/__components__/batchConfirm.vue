<template>
  <a-modal
    v-model:visible="visible"
    title="确认提示"
    title-align="start"
    @ok="onOk"
    @cancel="visible = false"
    @close="close"
  >
    <div>确认后是否执行以下操作：</div>
    <a-checkbox-group
      v-model="confirmForm.autoList"
      direction="vertical"
      style="margin-top: 10px"
    >
      <a-checkbox value="autoOpenInvoice">自动开票</a-checkbox>
      <!-- <a-checkbox value="autoModifyBill">自动调整账单应收</a-checkbox> -->
    </a-checkbox-group>
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
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  });

  const emits = defineEmits(['update:modelValue', 'submit']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  type ConfirmFormModel = {
    autoList: Array<'autoModifyBill' | 'autoOpenInvoice'>;
    remark: string;
  };
  const confirmForm = ref<ConfirmFormModel>({
    autoList: [],
    remark: ''
  });
  const onOk = () => {
    const params = {
      autoModifyBill: 0, // 是否自动修改账单金额1是0否
      autoOpenInvoice: 0, // 是否自动开票1是0否
      remark: confirmForm.value.remark
    };
    confirmForm.value.autoList.forEach(
      (key: 'autoModifyBill' | 'autoOpenInvoice') => {
        params[key] = 1;
      }
    );
    emits('submit', params);
  };

  // 弹框关闭后初始化数据
  const close = () => {
    confirmForm.value = {
      autoList: [],
      remark: ''
    };
  };
</script>
