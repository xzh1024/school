<template>
  <drawer v-model="visible" :title="title" width="960px" @cancel="onCancel">
    <template #footer>
      <a-button @click="onCancel">取消</a-button>
      <a-button type="primary" :loading="loading" @click="onSave">
        保存
      </a-button>
      <a-button
        v-show="!props.row.id || [0, 3].includes(Number(row.status))"
        type="primary"
        :loading="loading"
        @click="onSubmit"
      >
        提交
      </a-button>
      <!-- 同意 -->
      <a-button
        v-show="
          props.row.id &&
          [1, 2].includes(Number(row.status)) &&
          info?.nodeProcessorState
        "
        type="primary"
        :loading="loading"
        @click="onAgree"
      >
        提交
      </a-button>
      <a-button
        v-show="
          row.id &&
          info?.currentNodeInfo?.assignRule === 2 &&
          [1, 2].includes(Number(row.status))
        "
        type="primary"
        :loading="loading"
        @click="onAssign"
      >
        指派
      </a-button>
    </template>
    <record-form v-if="visible" ref="recordFormRef" v-model="form" />
  </drawer>

  <assign :id="row.id" ref="assignRef" :node-name="nodeName"></assign>
</template>

<script setup lang="ts">
  import { ref, computed, PropType, watch } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import RecordForm from './record-form.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { useRequest } from '@har/use';
  import { Message } from '@arco-design/web-vue';
  import Assign from './assign.vue';
  import {
    cbdApiProjectEstateWorkOrderRecordSavePost,
    cbdApiProjectEstateWorkOrderRecordUpdatePut,
    cbdApiProjectEstateWorkOrderRecordSubmitPost,
    CbdApiProjectEstateWorkOrderRecordSubmitPostRequest,
    cbdApiProjectEstateWorkOrderRecordInfoIdGet,
    CbdApiProjectEstateWorkOrderRecordInfoIdGetResponse,
    CbdApiProjectEstateWorkOrderTemplateListGetResponse,
    cbdApiProjectEstateWorkOrderRecordAgreePut
  } from '@/api';
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
    row: {
      type: Object as PropType<
        Required<CbdApiProjectEstateWorkOrderTemplateListGetResponse>['rows'][0]
      >,
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
  const title = computed(() => {
    let t = '';
    switch (props.openType) {
      case 'ADD': {
        t = '添加工单';
        break;
      }
      case 'EDIT': {
        t = '编辑工单';
        break;
      }
      default: {
        break;
      }
    }
    return t;
  });

  const recordFormRef = ref<InstanceType<typeof RecordForm> | null>(null);
  const assignRef = ref<InstanceType<typeof Assign> | null>(null);

  function onCancel() {
    emits('reset');
    emits('update:modelValue', false);
  }

  watch(
    () => props.modelValue,
    (value) => {
      if (value && props.row.id) {
        getDetail();
      } else {
        form.value = {
          id: null,
          templateId: '',
          urgency: 1,
          instanceId: null,
          fromDataContent: ''
        };
      }
    }
  );

  const info = ref<CbdApiProjectEstateWorkOrderRecordInfoIdGetResponse>();
  const form = ref({
    id: null,
    templateId: '',
    urgency: 1,
    instanceId: null,
    fromDataContent: ''
  });
  const nodeName = ref('');
  function onSave() {
    recordFormRef.value?.validateForm(async () => {
      const params = {
        templateId: +form.value.templateId,
        urgency: form.value.urgency,
        fromDataContent: JSON.stringify({
          rule: recordFormRef.value?.rule,
          form: recordFormRef.value?.form
        })
      };
      if (props.row.id) {
        await cbdApiProjectEstateWorkOrderRecordUpdatePut({
          id: props.row.id,
          ...params
        });
      } else {
        await cbdApiProjectEstateWorkOrderRecordSavePost(params);
      }
      Message.success('操作成功!');
      visible.value = false;
      emits('reset');
    });
  }
  const [onSubmit, loading] = useFuncProxy(async () => {
    recordFormRef.value?.validateForm(async () => {
      const params = {
        templateId: +form.value.templateId,
        urgency: form.value.urgency,
        fromDataContent: JSON.stringify({
          rule: recordFormRef.value?.rule,
          form: recordFormRef.value?.form
        })
      } as CbdApiProjectEstateWorkOrderRecordSubmitPostRequest;
      // 草稿状态才传id，已撤销状态不传id走创建的逻辑
      if (props.row.status === 0) {
        params.id = props.row.id;
      }
      await cbdApiProjectEstateWorkOrderRecordSubmitPost(params);
      Message.success('操作成功!');
      visible.value = false;
      emits('reset');
    });
  });
  // 同意
  const onAgree = () => {
    recordFormRef.value?.validateForm(async () => {
      doAgree({
        id: Number(props.row.id)
      });
    });
  };
  const { run: doAgree } = useRequest(
    cbdApiProjectEstateWorkOrderRecordAgreePut,
    {
      manual: true,
      onSuccess: () => {
        Message.success({ content: '操作成功!' });
        visible.value = false;
      }
    }
  );

  const [getDetail] = useFuncProxy(async () => {
    const d = await cbdApiProjectEstateWorkOrderRecordInfoIdGet({
      id: String(props.row.id)
    });
    // @ts-ignore
    form.value = d;
    info.value = d;
    if (d.currentNodeInfo && d.currentNodeInfo.nodeName) {
      nodeName.value = d.currentNodeInfo.nodeName;
    }
  });

  const onAssign = () => {
    assignRef.value?.show();
  };
</script>
