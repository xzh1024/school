<template>
  <a-modal
    :visible="isVisible"
    title="确定是否分账"
    title-align="start"
    @cancel="emits('cancel')"
  >
    <div class="flex align-center">
      <icon-exclamation-circle-fill />
      <p class="split-account-tip">{{ title }}</p>
    </div>
    <template #footer>
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="save">确认</a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      default: '发起分账后将不可撤回'
    },
    isVisible: {
      type: Boolean,
      default: false
    }
  });
  const emits = defineEmits(['save', 'cancel']);

  const handleCancel = () => {
    emits('cancel');
  };
  const save = () => {
    emits('save');
  };
</script>

<style scoped>
  .split-account-tip {
    padding-left: 10px;
  }
</style>
