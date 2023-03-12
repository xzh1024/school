<template>
  <drawer v-model="visible" :title="title" no-padding @cancel="onBack">
    <template #footer>
      <a-space>
        <template v-for="item in actionBtns">
          <a-button
            v-if="item.show"
            :key="item.label"
            v-bind="item.props"
            @click="item.action && item.action()"
          >
            {{ item.label }}
          </a-button>
        </template>
        <a-button @click="onBack">返回</a-button>
      </a-space>
    </template>

    <a-tabs
      v-model="active"
      default-active-key="1"
      style="width: 100%; height: 100%"
      class="tabs-base"
    >
      <a-tab-pane key="1" title="账单信息" style="height: 100%">
        <slot></slot>
      </a-tab-pane>
      <a-tab-pane key="2" title="审批详情">
        <div class="exam-detail">
          <exam-title
            title="工单审批"
            :code="examCode"
            :status="status"
          ></exam-title>
          <examine-detail :process-list="processList" :xml-data="XMLData" />
        </div>
      </a-tab-pane>
    </a-tabs>
  </drawer>
</template>

<script setup lang="ts">
  import { computed, ref, PropType } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ExamineDetail from '@/views/homePage/_components_/examine-detail.vue';
  import ExamTitle from '@/components/exam-title/index.vue';
  import { useRequest } from '@har/use';
  import { cbdApiProjectEstateWorkOrderRecordInstanceInfoInstanceIdGet } from '@/api';
  type ActionButtonModel = {
    label: string;
    action: Function;
    props?: { [key: string]: unknown };
    show?: boolean;
  };
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    actionButtonList: {
      type: Array as PropType<ActionButtonModel[]>,
      default: () => []
    },
    title: {
      type: String,
      default: '流程审批'
    }
  });
  const emits = defineEmits(['update:modelValue', 'select']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  const actionBtns = computed<ActionButtonModel[]>(() => {
    return [...props.actionButtonList];
  });

  const active = ref('1');

  const XMLData = ref('');
  const examCode = ref('');
  const status = ref<number | undefined>(0);
  const processList = ref<any>([]);
  //流程引擎详情接口
  const { run: getApprovalInfoEngine } = useRequest(
    cbdApiProjectEstateWorkOrderRecordInstanceInfoInstanceIdGet,
    {
      manual: true,
      onSuccess: (d) => {
        processList.value = d?.historyInstanceInfoList;
        XMLData.value = d.nodeImg || '';
        status.value = d?.status;
        examCode.value = d?.code || '';
      }
    }
  );

  function onBack() {
    visible.value = false;
  }

  defineExpose({
    getApprovalInfoEngine
  });
</script>

<style scoped lang="less">
  .exam-detail {
    background-color: #fff;
  }
  .tabs-base {
    display: flex;
    flex-direction: column;
    :deep(.arco-tabs-nav-type-line) {
      background-color: #ffffff;
      .arco-tabs-nav-tab-list {
        width: 100%;
        display: flex;
        justify-content: space-around;
        .arco-tabs-tab {
          line-height: 26px;
          font-size: 16px;
          padding: 10px 0 !important;
        }
      }
    }
    :deep(.arco-tabs-content) {
      flex: 1;
      overflow-y: scroll;
      width: auto;
      margin: 16px;
      padding: 0;
    }
  }
</style>
