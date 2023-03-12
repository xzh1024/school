<template>
  <div>
    <i-table
      ref="tableListRef"
      v-model="page.search"
      v-model:selectedKeys="selectedKeys"
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :api="cbdApiProjectEstateWorkOrderRecordListGet"
      @reset="onReset"
    >
      <template #urgencyCell="{ record }">
        <span :style="{ color: record.urgency === 3 ? 'red' : '#333333' }">{{
          valueFindLabel(urgencyType, record.urgency)
        }}</span>
      </template>
      <template #menu="{ record }">
        <a-space>
          <div
            v-if="editStatusList.includes(record.status)"
            class="s-btn"
            @click="onEdit(record)"
          >
            编辑
          </div>
          <div class="s-btn" @click="onView(record)"> 查看 </div>
          <div
            v-if="deleteStatusList.includes(record.status)"
            class="s-btn"
            @click="onDelete(record.id)"
          >
            删除
          </div>
        </a-space>
      </template>
      <template #header>
        <div class="table-header">
          <a-space>
            <a-button type="primary" @click="onAdd"> 添加 </a-button>
            <a-tooltip content="已超时的数据">
              <a-button
                type="primary"
                :disabled="!selectedKeys.length"
                @click="onUrge"
              >
                催办
              </a-button>
            </a-tooltip>
          </a-space>
          <a-radio-group
            v-model="page.search.approvalType"
            type="button"
            class="radio-group"
            size="large"
            :options="approvalType"
            @change="onChange"
          />
        </div>
      </template>
    </i-table>

    <add-record
      v-model="visible"
      :open-type="openType"
      :row="currentRow"
      @reset="reset"
    />

    <Info ref="infoRef" @reset="reset" @show-edit="onEdit"></Info>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, onMounted } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import {
    cbdApiProjectEstateWorkOrderRecordListGet,
    CbdApiProjectEstateWorkOrderRecordListGetResponse,
    cbdApiProjectEstateWorkOrderRecordRemoveIdDelete,
    cbdApiProjectEstateWorkOrderRecordUrgePut
  } from '@/api';
  import {
    projectList,
    getProjectListData
  } from '@/views/finance-manage/useGetCommonData';
  import AddRecord from './_components_/add-record.vue';
  import Info from './_components_/info.vue';
  import {
    timeoutStateType,
    urgencyType,
    workerStatusData,
    workerType,
    approvalType
  } from './dic';
  import { useRequest } from '@har/use';
  import { valueFindLabel } from '@/utils';
  onMounted(() => {
    getProjectListData();
  });

  type RowModel =
    Required<CbdApiProjectEstateWorkOrderRecordListGetResponse>['rows'][0];

  const tableListRef = ref<InstanceType<typeof ITable>>();
  const infoRef = ref<InstanceType<typeof Info>>();

  // 删除
  function onDelete(id: string) {
    Modal.open({
      title: '删除确认',
      content: '请确认是否删除？',
      onOk: async () => {
        await cbdApiProjectEstateWorkOrderRecordRemoveIdDelete({
          id
        });
        Message.success('操作成功!');
        page.refresh = true;
      }
    });
  }

  const editStatusList = reactive([0, 3]);
  const deleteStatusList = reactive([0, 3]);

  const selectedKeys = ref<number[]>([]);
  const page = reactive({
    search: {
      approvalType: 2,
      subStartTime: '',
      subEndTime: ''
    },
    refresh: false,
    options: {
      indexTitle: '序号',
      indexWidth: 20,
      index: true,
      menuSpan: 24,
      menuOptions: {
        width: 110,
        fixed: 'right',
        align: 'left'
      },
      menuOtherOptions: {
        'row-selection': {
          type: 'checkbox',
          showCheckedAll: true,
          onlyCurrent: false
        },
        'row-key': 'id'
      },
      columns: [
        {
          label: '项目名称',
          width: 100,
          prop: 'projectId',
          search: true,
          type: 'select',
          dic: projectList,
          formatter({ projectName }: RowModel) {
            return projectName;
          }
        },
        {
          label: '工单编号',
          width: 170,
          prop: 'recordCode'
        },
        {
          label: '工单类型',
          width: 90,
          search: true,
          prop: 'type',
          type: 'select',
          formatter({ typeName }: { typeName: string }) {
            return typeName;
          },
          dic: workerType
        },
        {
          label: '工单名称',
          width: 90,
          search: true,
          prop: 'name'
        },
        {
          label: '紧急程度',
          width: 90,
          search: true,
          prop: 'urgency',
          type: 'select',
          dic: urgencyType
          // formatter({ urgencyName }: RowModel) {
          //   return urgencyName;
          // }
        },
        {
          label: '提交人',
          width: 90,
          search: true,
          prop: 'userName'
        },
        {
          label: '提交时间',
          prop: 'subTime',
          width: 120,
          search: true,
          type: 'dateRange',
          hide: true,
          options: {
            onChange: (val: string[]) => {
              const [subStartTime, subEndTime] = val;
              page.search.subStartTime = subStartTime;
              page.search.subEndTime = subEndTime;
            }
          }
        },
        {
          label: '当前节点',
          width: 90,
          prop: 'currentNode'
        },
        {
          label: '工单状态',
          search: true,
          width: 90,
          type: 'select',
          prop: 'status',
          dic: workerStatusData,
          formatter({ statusName }: RowModel) {
            return statusName;
          }
        },
        {
          label: '完成时间',
          width: 140,
          type: 'date',
          prop: 'completeTime'
        },
        {
          label: '是否超时',
          search: true,
          width: 90,
          prop: 'timeoutState',
          type: 'select',
          dic: timeoutStateType,
          formatter({ timeoutStateName }: RowModel) {
            return timeoutStateName;
          }
        }
      ]
    }
  });

  const openType = ref('ADD');
  const currentRow = ref<any>({});
  // 新增
  const visible = ref(false);
  function onAdd() {
    openType.value = 'ADD';
    currentRow.value = {
      id: null,
      templateId: '',
      urgency: 1,
      instanceId: null
    };
    visible.value = true;
  }

  function onEdit(row = {}) {
    openType.value = 'EDIT';
    currentRow.value = { ...row };
    visible.value = true;
  }

  function onView(row: RowModel) {
    currentRow.value = { ...row };
    infoRef.value?.show(currentRow.value);
  }
  const onReset = () => {
    Object.assign(page.search, {
      approvalType: 2,
      subStartTime: '',
      subEndTime: ''
    });
  };

  function reset() {
    page.refresh = true;
  }

  const { run: doUrge } = useRequest(
    cbdApiProjectEstateWorkOrderRecordUrgePut,
    {
      manual: true,
      onSuccess() {
        Message.success('操作成功!');
        page.refresh = true;
        selectedKeys.value = [];
      }
    }
  );

  const onUrge = () => {
    const flag = selectedKeys.value.every((id) => {
      const obj = tableListRef.value?.data.find(
        (row: RowModel) => row.id === id
      );
      return obj && obj.timeoutState === 1;
    });
    if (!flag) return Message.error({ content: '存在不能催办的数据' });
    doUrge({
      ids: selectedKeys.value
    });
  };

  function onChange(value: string | number | boolean) {
    selectedKeys.value = [];
    page.search.approvalType = value as number;
    page.refresh = true;
  }
</script>

<style scoped lang="less">
  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .radio-group {
    --color-text-1: #ffffff;
    --primary-6: 255, 255, 255;
    --color-bg-5: #4c8af7;
    --color-text-2: #333333;
  }

  .s-btn {
    color: #4c8af7;
    font-size: 14px;
    cursor: pointer;
  }
</style>
