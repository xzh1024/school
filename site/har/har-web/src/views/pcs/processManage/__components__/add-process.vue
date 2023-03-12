<template>
  <drawer v-model="visible" title="审批流设计" @cancel="onCancel">
    <template #footer>
      <a-button @click="onCancel">取消</a-button>
      <a-button type="primary" @click="onSave">保存</a-button>
    </template>
    <div style="width: 100%">
      <a-divider orientation="left">
        {{ row.projectName }}
        【{{ row.approvalTypeName }}】
      </a-divider>
      <a-form :model="processData" class="single-form">
        <template v-for="(item, i) in processData.modelInfoList" :key="item.id">
          <a-row>
            <a-col
              v-for="(form, index) in formOptions.columns"
              :key="`${item.id}_${form.prop}`"
              :span="6"
              :style="{ padding: '6px' }"
            >
              <template v-if="form.type === 'select'">
                <a-select
                  v-model="item[form.prop]"
                  :options="form.dic"
                  :placeholder="`请选择${form.label}`"
                />
              </template>
              <template v-else-if="form.prop === 'action'">
                <a-button type="outline" shape="circle" @click="addFormItem">
                  <icon-plus />
                </a-button>
                &nbsp;&nbsp;
                <a-button
                  v-if="i > 0"
                  type="outline"
                  status="danger"
                  shape="circle"
                  @click="subFormItem(i)"
                >
                  <icon-minus />
                </a-button>
              </template>

              <template v-else>
                <a-input
                  v-model="item[form.prop]"
                  :max-length="20"
                  :placeholder="`请输入${form.label}`"
                />
              </template>
            </a-col>
          </a-row>
        </template>
      </a-form>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, watch, PropType, onMounted } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    flowableEngineProjectModelInfoIdGet,
    flowableEngineProjectModelEditPost,
    flowableEngineModelListGet,
    FlowableEngineModelListGetResponse,
    flowableEngineCommonFunctionTypeSelectGet,
    FlowableEngineCommonFunctionTypeSelectGetResponse
  } from '@/api/flowable-engine';
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    source: {
      type: String,
      default: 'view'
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
    emits('update:modelValue', false);
    emits('reset');
  }

  const actionTypeList = ref<FlowableEngineCommonFunctionTypeSelectGetResponse>(
    []
  );
  const [getActionTypeList] = useFuncProxy(async () => {
    const d = await flowableEngineCommonFunctionTypeSelectGet();
    actionTypeList.value = d;
  });
  const formOptions = computed<{
    columns: {
      label?: string;
      prop: 'name' | 'modelKey' | 'functionType' | 'action';
      type?: string;
      dic?: any;
    }[];
  }>(() => {
    return {
      columns: [
        {
          label: '流程名称',
          prop: 'name'
        },
        {
          label: '流程模型',
          prop: 'modelKey',
          type: 'select',
          dic:
            modelList.value?.map((item) => {
              return {
                label: item.name,
                value: item.key
              };
            }) || []
        },
        {
          label: '触发功能',
          prop: 'functionType',
          type: 'select',
          dic: actionTypeList.value
        },
        {
          label: '操作',
          prop: 'action'
        }
      ]
    };
  });

  const processData = ref<any>({
    projectId: 0,
    approvalType: '',
    approvalTypeName: '',
    modelInfoList: []
  });
  const [getProcessData] = useFuncProxy(async () => {
    const d = await flowableEngineProjectModelInfoIdGet({
      id: props.row.id
    });

    if (d.modelInfoList?.length === 0) {
      d.modelInfoList.push({
        name: '',
        modelKey: '',
        // @ts-ignore
        functionType: ''
      });
    }
    processData.value = d;
  });

  function addFormItem() {
    processData.value.modelInfoList?.push({
      name: '',
      modelKey: '',
      functionType: ''
    });
  }

  watch(
    () => props.modelValue,
    () => {
      if (props.modelValue) {
        getProcessData();
      }
    }
  );

  function subFormItem(index: number) {
    console.log(index);

    processData.value?.modelInfoList?.splice(index, 1);
  }

  const [onSave] = useFuncProxy(async () => {
    for (
      let index = 0;
      index < processData.value.modelInfoList.length;
      index++
    ) {
      const item = processData.value.modelInfoList[index];
      if (!item.name) {
        Message.error(`请输入第${index + 1}条流程名称`);
        return;
      }
      if (!item.modelKey) {
        Message.error(`请选择第${index + 1}条流程模型`);
        return;
      }
      if (!item.functionType) {
        Message.error(`请选择第${index + 1}条触发功能`);
        return;
      }
    }

    await flowableEngineProjectModelEditPost({
      id: props.row.id,
      approvalType: String(processData.value.approvalType),
      // @ts-ignore
      modelInfoList: processData.value.modelInfoList
    });

    Message.success('操作成功');
    emits('reset');
    onCancel();
  });

  const modelList = ref<FlowableEngineModelListGetResponse>([]);
  const [getModelList] = useFuncProxy(async () => {
    const d = await flowableEngineModelListGet();
    modelList.value = d;
  });

  onMounted(() => {
    getModelList();
    getActionTypeList();
  });
</script>

<style scoped lang="less">
  .single-form {
    background-color: #fff;

    :deep(.form-action) {
      .arco-form-item-label-col {
        visibility: hidden;
      }
    }

    :deep(.card) {
      width: 100%;
      margin-bottom: 0;
    }
  }
</style>
