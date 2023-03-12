<template>
  <drawer v-model="visible" title="流程图" width="900px" @cancel="onCancel">
    <template #footer>
      <a-button type="primary" @click="onCancel">关闭</a-button>
    </template>
    <bpmn-svg :xml="xml" />
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, watch, onMounted } from 'vue';
  import BpmnSvg from '@/components/i-bpmn-view/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { flowableEngineModelBpmnIdGet } from '@/api/flowable-engine';
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    rowId: {
      type: String,
      default: ''
    }
  });

  const emits = defineEmits(['update:modelValue', 'reset']);

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  function onCancel() {
    xml.value = '';
    // emits('reset');
    emits('update:modelValue', false);
  }

  const xml = ref(``);
  const [getBpmn] = useFuncProxy(async () => {
    if (!props.rowId || !props.modelValue) return;
    const d = await flowableEngineModelBpmnIdGet({
      id: props.rowId
    });
    xml.value = d;
  });

  onMounted(() => {
    getBpmn();
  });

  watch(
    () => props.modelValue,
    () => {
      getBpmn();
    }
  );
</script>

<style scoped lang="less">
  .single-form {
    :deep(.card) {
      padding: 0;
    }
  }
</style>
