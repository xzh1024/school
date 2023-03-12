<template>
  <check-process-modal
    v-if="visible"
    ref="checkProcessModalRef"
    v-model="visible"
    title="查阅工单"
    :action-button-list="actionButtonList"
  >
    <record-form v-model="form" disabled />
  </check-process-modal>

  <deliver
    :id="Number(row.id)"
    ref="deliverRef"
    :node-name="nodeName"
    @finish="onHide"
  />
  <assign
    :id="Number(row.id)"
    ref="assignRef"
    :node-name="nodeName"
    @finish="onHide"
  />
  <a-modal
    v-model:visible="cancelVisible"
    title="提示"
    @ok="onCancel"
    @cancel="cancelVisible = false"
  >
    <div>工单撤销后，流程不再继续，是否撤销？</div>
  </a-modal>
  <a-modal
    v-model:visible="closeVisible"
    title="提示"
    @ok="onClose"
    @cancel="closeVisible = false"
  >
    <div>工单关闭后，不可再进行任何操作，是否关闭？</div>
  </a-modal>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import RecordForm from '@/views/work-order/_components_/record-form.vue';
  import CheckProcessModal from '@/components/check-process-modal/index.vue';
  import Deliver from '@/views/work-order/_components_/deliver.vue';
  import Assign from '@/views/work-order/_components_/assign.vue';
  import { useRequest } from '@har/use';
  import {
    cbdApiProjectEstateWorkOrderRecordInfoIdGet,
    CbdApiProjectEstateWorkOrderRecordInfoIdGetResponse,
    cbdApiProjectEstateWorkOrderRecordUrgePut,
    cbdApiProjectEstateWorkOrderRecordCancelPut,
    cbdApiProjectEstateWorkOrderRecordClosePut,
    cbdApiProjectEstateWorkOrderRecordSubmitPost,
    CbdApiProjectEstateWorkOrderRecordSubmitPostRequest,
    cbdApiProjectEstateWorkOrderRecordAgreePut,
    CbdApiProjectEstateWorkOrderRecordListGetResponse
  } from '@/api';

  const emits = defineEmits(['reset', 'showEdit']);

  type RowModel =
    Required<CbdApiProjectEstateWorkOrderRecordListGetResponse>['rows'][0];
  const row = ref<RowModel>({});

  const assignRef = ref<InstanceType<typeof Assign> | null>(null);
  const deliverRef = ref<InstanceType<typeof Deliver> | null>(null);
  const checkProcessModalRef = ref<InstanceType<
    typeof CheckProcessModal
  > | null>(null);

  const visible = ref(false);
  const show = (data: RowModel) => {
    row.value = data;
    getDetail({
      id: String(data.id)
    });
    visible.value = true;
  };
  defineExpose({
    show
  });

  const cancelVisible = ref(false);
  const closeVisible = ref(false);

  const actionType = ref('');
  const actionButtonList = computed<
    {
      label: string;
      action: Function;
      props?: { [key: string]: unknown };
      show?: boolean;
    }[]
  >(() => {
    return [
      {
        label: '修改',
        action: () => {
          actionType.value = 'edit';
          emits('showEdit', row.value);
          visible.value = false;
        },
        props: { status: 'normal', type: 'primary' },
        show: [0, 3].includes(Number(row.value.status))
      },
      {
        label: '转交',
        action: () => {
          actionType.value = 'forward';
          onForward();
        },
        props: { status: 'normal', type: 'primary' },
        show: info.value?.nodeProcessorState && row.value.status === 2
      },
      {
        label: '提交',
        action: () => {
          actionType.value = 'submit';
          onSubmit();
        },
        props: { status: 'normal', type: 'primary' },
        show: [0, 3].includes(Number(row.value.status))
      },
      {
        label: '提交', // 同意
        action: () => {
          actionType.value = 'submit';
          onAgree();
        },
        props: { status: 'normal', type: 'primary' },
        show: info.value?.nodeProcessorState && row.value.status === 2
      },
      {
        label: '指派',
        action: () => {
          actionType.value = 'assign';
          onAssign();
        },
        props: { status: 'normal', type: 'primary' },
        show:
          info.value?.currentNodeInfo?.assignRule === 2 &&
          row.value.status === 2
      },
      {
        label: '催办',
        action: () => {
          actionType.value = 'urge';
          onUrge();
        },
        props: { status: 'normal', type: 'primary' },
        show: row.value.timeoutState === 1 && row.value.status === 2
      },
      {
        label: '撤销',
        action: () => {
          actionType.value = 'cancel';
          cancelVisible.value = true;
        },
        props: { status: 'normal' },
        show:
          info.value?.creatorState && [1, 2].includes(Number(row.value.status))
      },
      {
        label: '关闭',
        action: () => {
          actionType.value = 'close';
          closeVisible.value = true;
        },
        props: { status: 'normal' },
        show: info.value?.creatorState && row.value.status === 4
      }
    ];
  });

  const nodeName = ref('');
  const info = ref<CbdApiProjectEstateWorkOrderRecordInfoIdGetResponse>();
  const form = ref({
    id: null,
    templateId: '',
    urgency: 1,
    instanceId: null,
    fromDataContent: ''
  });
  const { run: getDetail } = useRequest(
    cbdApiProjectEstateWorkOrderRecordInfoIdGet,
    {
      manual: true,
      onSuccess: (d) => {
        // @ts-ignore
        form.value = d;
        info.value = d;
        if (d.currentNodeInfo && d.currentNodeInfo.nodeName) {
          nodeName.value = d.currentNodeInfo.nodeName;
        }
        if (d.instanceId) {
          checkProcessModalRef.value?.getApprovalInfoEngine({
            instanceId: d.instanceId
          });
        }
      }
    }
  );
  // 提交
  const { run: doSubmit } = useRequest(
    cbdApiProjectEstateWorkOrderRecordSubmitPost,
    {
      manual: true,
      onSuccess: () => {
        Message.success({ content: '提交成功' });
        onHide();
      }
    }
  );
  // 提交（同意）
  const { run: doAgree } = useRequest(
    cbdApiProjectEstateWorkOrderRecordAgreePut,
    {
      manual: true,
      onSuccess: () => {
        Message.success({ content: '操作成功' });
        onHide();
      }
    }
  );
  // 催办
  const { run: doUrge } = useRequest(
    cbdApiProjectEstateWorkOrderRecordUrgePut,
    {
      manual: true,
      onSuccess: () => {
        Message.success({ content: '催办成功' });
        onHide();
      }
    }
  );
  // 撤销
  const { run: doCancel } = useRequest(
    cbdApiProjectEstateWorkOrderRecordCancelPut,
    {
      manual: true,
      onSuccess: () => {
        Message.success({ content: '撤销成功' });
        onHide();
      }
    }
  );
  // 关闭
  const { run: doClose } = useRequest(
    cbdApiProjectEstateWorkOrderRecordClosePut,
    {
      manual: true,
      onSuccess: () => {
        Message.success({ content: '关闭成功' });
        onHide();
      }
    }
  );
  // 提交
  const onSubmit = () => {
    if (!form.value.id) return;
    const params = {
      templateId: +form.value.templateId,
      urgency: form.value.urgency,
      fromDataContent: form.value.fromDataContent
    } as CbdApiProjectEstateWorkOrderRecordSubmitPostRequest;
    // 草稿状态才传id，已撤销状态不传id走创建的逻辑
    if (row.value.status === 0) {
      params.id = form.value.id;
    }
    doSubmit(params);
  };
  // 提交（同意）
  const onAgree = () => {
    if (!form.value.id) return;
    doAgree({
      id: form.value.id
    });
  };

  // 转交
  const onForward = () => {
    deliverRef.value?.show();
  };
  // 指派
  const onAssign = () => {
    assignRef.value?.show();
  };
  // 催办
  const onUrge = () => {
    if (!form.value.id) return;
    doUrge({ ids: [form.value.id] });
  };
  // 撤销
  const onCancel = () => {
    if (!form.value.id) return;
    doCancel({ id: form.value.id });
  };
  // 关闭
  const onClose = () => {
    if (!form.value.id) return;
    doClose({ id: form.value.id });
  };
  const onHide = () => {
    emits('reset');
    visible.value = false;
  };
</script>
