<template>
  <a-drawer
    :visible="visible"
    title="流程设计"
    width="100%"
    :footer="false"
    @cancel="reset"
  >
    <fc-designer ref="designer" @save="onSave">
      <template #handle>
        <!-- <a-button size="small" @click="setJson">导入JSON</a-button>
        <a-button size="small" @click="setOption">导入Options</a-button>
        <a-button size="small" @click="showJson">生成JSON</a-button>
        <a-button size="small" @click="showOption">生成Options</a-button> -->
      </template>
    </fc-designer>
  </a-drawer>
</template>

<script setup lang="ts">
  import { computed, PropType, ref, watch } from 'vue';
  import {
    cbdApiProjectEstateWorkOrderTemplateUpdateOtherPut,
    cbdApiProjectEstateWorkOrderTemplateInfoIdGet
  } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { TableRowItemType } from '../types';
  import { Message } from '@arco-design/web-vue';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object as PropType<TableRowItemType>,
      default: () => {}
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

  function reset() {
    visible.value = false;
    emits('reset');
  }

  const designer = ref();
  const [getDetail] = useFuncProxy(async () => {
    if (!props.row.id || !props.modelValue) return;
    const d = await cbdApiProjectEstateWorkOrderTemplateInfoIdGet({
      id: String(props.row.id)
    });
    try {
      const fromContent = d.fromContent ? JSON.parse(d.fromContent) : [];
      // console.log(fromContent);
      designer.value?.setRule(fromContent.rule);
    } catch (e) {
      console.log(e);
      designer.value?.clearDragRule();
    }
  });

  const [onSave] = useFuncProxy(async (params: unknown) => {
    // console.log(params);
    await cbdApiProjectEstateWorkOrderTemplateUpdateOtherPut({
      id: props.row.id,
      fromContent: JSON.stringify(params)
    });
    Message.success('操作成功!');
    visible.value = false;
    emits('reset');
  });

  watch(
    () => props.modelValue,
    () => {
      getDetail();
    }
  );
</script>
