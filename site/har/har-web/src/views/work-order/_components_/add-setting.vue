<template>
  <drawer v-model="visible" :title="title" width="960px" @cancel="onCancel">
    <template #footer>
      <!-- <a-button @click="onSubmit('draft')">保存草稿</a-button> -->
      <a-button @click="onCancel">取消</a-button>
      <a-button
        v-show="source !== 'view'"
        type="primary"
        :loading="loading"
        @click="onSave"
      >
        保存
      </a-button>
    </template>
    <i-form ref="formRef" v-model="workerInfo" :options="formOptions" />
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, computed, watch, onMounted, PropType } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectEstateWorkOrderTemplateAddPost,
    cbdApiProjectEstateWorkOrderTemplateUpdateInfoPut
  } from '@/api';
  import { useWorkerDetails } from './hooks/useWorkerDetail';
  import { workerType } from '../dic';
  import { useFilter } from '@/views/assetsManage/hooks/common';
  import type { TableRowItemType } from '../types';
  const { projectList, getProjectList } = useFilter(() => {
    workerInfo.value.projectId = projectList.value[0]?.value;
  });
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
    row: {
      type: Object as PropType<TableRowItemType>,
      default: () => {}
    }
  });
  const emits = defineEmits(['update:modelValue', 'reset']);

  const { workerInfo, getWorkerDetails, formReset } = useWorkerDetails();

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
    () => props.modelValue,
    (value) => {
      if (props.source === 'add') {
        formReset();
        workerInfo.value.projectId = projectList.value[0]?.value;
        return;
      }
      if (value && props.row.id) {
        getWorkerDetails(String(props.row.id));
      }
    },
    {
      deep: true
    }
  );

  function onCancel() {
    formReset();
    emits('update:modelValue', false);
  }

  const formOptions = computed(() => {
    const isDisabled = props.row?.id !== -1;
    return {
      menuForm: false,
      disabled: props.title === '查看表单',
      layout: 'vertical',
      columns: [
        {
          label: '项目名称',
          prop: 'projectId',
          span: 6,
          type: isDisabled ? 'span' : 'select',
          dic: projectList,
          formatter: () => {
            const findItem = projectList.value.find(
              (item) => item.value === workerInfo.value.projectId
            );
            return findItem?.label;
          }
        },
        {
          label: '工单类型',
          prop: 'type',
          span: 6,
          type: isDisabled ? 'span' : 'select',
          dic: workerType,
          options: {
            disabled: props.row?.id !== -1
          },
          formatter: () => {
            const findItem = workerType.find(
              (item) => item.value === workerInfo.value.type
            );
            return findItem?.label;
          }
        },
        {
          label: '工单名称',
          prop: 'name',
          span: 6,
          type: isDisabled ? 'span' : '',
          options: {
            'min-length': 2,
            'max-length': 60
          }
        },
        {
          label: '工单说明',
          prop: 'remark',
          span: 24,
          type: isDisabled ? 'span' : 'textarea',
          options: {
            'max-length': 200
          }
        },
        {
          label: '是否允许商户发起',
          prop: 'merchantCreateState',
          span: 12,
          type: 'switch',
          options: {
            'checked-value': 1,
            'unchecked-value': 2
          }
          // on: {
          //   change(v) {
          //     console.log(v);
          //   }
          // }
        },
        {
          label: '应用范围',
          prop: 'applyScope',
          span: 12,
          type: 'radio',
          dic: [
            { label: '所有人可发起', value: 1 },
            { label: '指定人可发起', value: 2 }
          ],
          options: {}
        },
        {
          label: '关闭规则',
          prop: 'closeRule',
          span: 24,
          type: 'radio',
          dic: [
            { label: '流程结束自动关闭', value: 1 },
            { label: '发起人可关闭', value: 2 }
          ],
          options: {}
        }
      ]
    };
  });

  async function onSave() {
    onSubmit();
    // const valid = await formRef.value.validateField();
    // console.log(valid, form);
  }
  const [onSubmit, loading] = useFuncProxy(async () => {
    if (['add', 'edit'].includes(props.source)) {
      const params = {
        projectId: Number(workerInfo.value.projectId),
        type: Number(workerInfo.value.type),
        name: String(workerInfo.value.name),
        remark: workerInfo.value.remark,
        merchantCreateState: Number(workerInfo.value.merchantCreateState),
        applyScope: Number(workerInfo.value.applyScope),
        closeRule: Number(workerInfo.value.closeRule)
      };
      if (props.source === 'add') {
        await cbdApiProjectEstateWorkOrderTemplateAddPost({ ...params });
      } else if (props.source === 'edit') {
        await cbdApiProjectEstateWorkOrderTemplateUpdateInfoPut({
          ...params,
          id: props.row.id
        });
      }
      Message.success('操作成功!');
      formRef.value.resetFields();
      visible.value = false;
      emits('reset');
    }
  });

  onMounted(() => {
    getProjectList();
  });
</script>
