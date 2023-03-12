<template>
  <a-modal
    v-model:visible="visible"
    :mask-closable="false"
    :title="title"
    v-bind="options"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title>
      <slot name="title"></slot>
    </template>
    <slot></slot>
  </a-modal>
</template>

<script lang="ts">
  export default {
    name: 'IModal'
  };
</script>

<script lang="ts" setup>
  import { computed } from 'vue';

  interface propsType {
    modelValue: boolean;
    title: string;
    options?: any;
  }

  const props = withDefaults(defineProps<propsType>(), {
    modelValue: false,
    options: {}
  });

  const emits = defineEmits(['update:modelValue', 'ok', 'cancel']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  function handleOk() {
    emits('ok');
  }
  function handleCancel() {
    emits('cancel');
  }
</script>

<style scoped></style>
