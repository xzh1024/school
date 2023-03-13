<template>
  <drawer v-model="visible" title="新增" width="350px" @cancel="onCancel">
    <template #footer>
      <a-button @click="onCancel">取消</a-button>
      <a-button type="primary" @click="onSave">保存</a-button>
    </template>
    <i-form
      ref="formRef"
      v-model="form"
      :options="formOptions"
      class="single-form"
    >
    </i-form>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, computed, reactive, PropType } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { flowableEngineProjectModelSavePost } from '@/api/flowable-engine';
  const formRef: Ref = ref();
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    projectList: {
      type: Array as PropType<{ label: string; value: string }[]>,
      default: () => []
    },
    categoryList: {
      type: Array as PropType<{ label: string; value: string }[]>,
      default: () => []
    },
    row: {
      type: Object as PropType<any>,
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
    form.projectId = '';
    form.approvalType = '';
    emits('reset');
    emits('update:modelValue', false);
  }

  const form = reactive({
    projectId: '',
    approvalType: ''
  });

  const formOptions = computed(() => {
    return {
      menuForm: false,
      layout: 'vertical',
      columns: [
        {
          label: '项目',
          prop: 'projectId',
          type: 'select',
          dic: props.projectList,
          span: 24,
          on: {
            change(v: string) {
              form.projectId = v;
            }
          }
        },
        {
          label: '审批类型',
          prop: 'approvalType',
          type: 'select',
          dic: props.categoryList,
          span: 24,
          on: {
            change(v: string) {
              form.approvalType = v;
            }
          }
        }
      ]
    };
  });

  const [onSave] = useFuncProxy(async () => {
    await flowableEngineProjectModelSavePost({
      projectId: Number(form.projectId),
      approvalType: form.approvalType,
      modelInfoList: []
    });

    Message.success('保存成功');
    onCancel();
  });
</script>

<style lang="less" scoped>
  .single-form {
    width: 100%;
  }
</style>
