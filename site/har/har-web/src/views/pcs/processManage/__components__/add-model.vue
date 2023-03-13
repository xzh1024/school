<template>
  <drawer v-model="visible" :title="title" width="350px" @cancel="onCancel">
    <template #footer>
      <a-button @click="onCancel">取消</a-button>
      <a-button type="primary" :loading="loading" @click="onSave">
        保存
      </a-button>
    </template>
    <i-form ref="formRef" v-model="form" :options="formOptions" />
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, computed, watch, reactive } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    flowableEngineModelAddPost,
    flowableEngineModelUpdatePost
  } from '@/api/flowable-engine';

  const formRef: Ref = ref(null);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: 'add'
    },
    rowId: {
      type: String,
      default: ''
    },
    defaultValue: {
      type: Object,
      default: () => {}
    },
    processGroupList: {
      type: Array,
      default: () => []
    }
  });

  const emits = defineEmits(['update:modelValue', 'reset']);

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      formRef.value.resetFields();
      emits('update:modelValue', v);
    }
  });

  function onCancel() {
    emits('update:modelValue', false);
  }

  const form = reactive({
    key: '',
    name: '',
    category: '',
    description: ''
  });

  watch(
    () => props.defaultValue,
    (data) => {
      form.key = data.key || '';
      form.name = data.name || '';
      form.category = data.category || '';
      form.description = data.description || '';
    },
    {
      deep: true
    }
  );

  const formOptions = computed(() => {
    return {
      menuForm: false,
      layout: 'vertical',
      columns: [
        // {
        //   label: 'Key',
        //   prop: 'key',
        //   span: 24
        // },
        {
          label: '流程名称',
          prop: 'name',
          span: 24,
          options: {
            'max-length': 20
          }
        },
        {
          label: '流程分类',
          prop: 'category',
          span: 24,
          type: 'select',
          dic: props.processGroupList,
          options: {
            'max-length': 20
          }
        },
        {
          label: '备注',
          prop: 'description',
          span: 24,
          options: {
            'max-length': 100
          }
        }
      ]
    };
  });

  async function onSave() {
    if (!form.name.trim()) {
      Message.error('流程名称不能为空');
      return;
    }
    if (!form.category) {
      Message.error('请选择流程分类');
      return;
    }
    onSubmit();
  }
  const [onSubmit, loading] = useFuncProxy(async () => {
    if (props.rowId) {
      await flowableEngineModelUpdatePost({
        id: props.rowId,
        ...form
      });
    } else {
      await flowableEngineModelAddPost(form);
    }
    Message.success('操作成功!');
    formRef.value.resetFields();
    visible.value = false;
    emits('reset');
  });
</script>
