<template>
  <drawer v-model="visible" :title="title" width="350px" @cancel="onCancel">
    <template #footer>
      <!-- <a-button @click="onSubmit('draft')">保存草稿</a-button> -->
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
    flowableEngineCategoryAddPost,
    flowableEngineCategoryUpdatePut
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
    defaultValue: {
      type: Object,
      default: () => {}
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
      formRef.value.resetFields();
      emits('update:modelValue', v);
    }
  });

  watch(
    () => props.defaultValue,
    (data) => {
      form.name = data.name || '';
      form.code = data.code || '';
      form.remark = data.remark || '';
    },
    {
      deep: true
    }
  );

  function onCancel() {
    emits('update:modelValue', false);
  }

  const form = reactive({
    name: '',
    code: '',
    remark: ''
  });
  const formOptions = computed(() => {
    return {
      menuForm: false,
      layout: 'vertical',
      columns: [
        {
          label: '分类名称',
          prop: 'name',
          span: 24,
          options: {
            'max-length': 20
          }
        },
        {
          label: '分类编码',
          prop: 'code',
          span: 24,
          options: {
            'max-length': 20
          }
        },
        {
          label: '备注',
          prop: 'remark',
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
      Message.error('分类名称不能为空');
      return;
    }
    if (!form.code.trim()) {
      Message.error('分类编码不能为空');
      return;
    }
    if (!/^[A-Za-z0-9]+$/.test(form.code)) {
      Message.error('分类编码填写错误(只能输入数字和字母)');
      return;
    }
    onSubmit();
    // const valid = await formRef.value.validateField();
    // console.log(valid, form);
  }
  const [onSubmit, loading] = useFuncProxy(async () => {
    if (['add', 'edit'].includes(props.source)) {
      if (props.source === 'add') {
        await flowableEngineCategoryAddPost(form);
      } else if (props.source === 'edit') {
        await flowableEngineCategoryUpdatePut(form);
      }
      Message.success('操作成功!');
      formRef.value.resetFields();
      visible.value = false;
      emits('reset');
    }
  });
</script>
