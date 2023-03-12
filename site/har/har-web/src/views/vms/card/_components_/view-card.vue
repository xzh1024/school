<template>
  <drawer v-model="visible" :title="title" width="960px" @cancel="onCancel">
    <template #footer>
      <a-button @click="onCancel">取消</a-button>
      <a-button type="primary" @click="onCancel">停售</a-button>
      <a-button type="primary"> 下架 </a-button>
    </template>
    <view-form ref="cardFormRef" :type="type" />
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, watch, nextTick } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import ViewForm from './view-form.vue';
  import { groundPcApiCardBaseDetailGet } from '@/api/ground-pc-api';
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    source: {
      type: String,
      default: 'add'
    },
    openType: {
      type: String,
      default: 'ADD'
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: Number,
      default: 1
    },
    row: {
      type: Object,
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

  function onCancel() {
    emits('reset');
    emits('update:modelValue', false);
  }

  const cardFormRef = ref();
  const [getDetail] = useFuncProxy(async () => {
    const d = await groundPcApiCardBaseDetailGet({
      id: props.row.id,
      cardType: `${props.type}`
    });
    nextTick(() => {
      cardFormRef.value?.setFormData(d);
    });
  });

  watch(
    () => props.modelValue,
    (value) => {
      if (value && props.row.id) {
        getDetail();
      }
    }
  );
</script>
