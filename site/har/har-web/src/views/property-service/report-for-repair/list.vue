<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      v-model:selectedKeys="selectedKeys"
      v-permission="['workOrder:list']"
      :options="page.options"
      :api="cbdApiProjectWorkOrderListGet"
      @reset="tableFormReset"
    >
      <template #faultTypeIdCell="{ record }">
        {{ record.faultType?.name }}
      </template>
      <template #statusCell="{ record }">
        {{ statusData[record.status] }}
      </template>
      <template #chargeTypeCell="{ record }">
        {{ chargeTypeData[record.chargeType] }}
      </template>
      <template #reporterCell="{ record }">
        <!-- {{ getUserName(record.reporterName) }} -->
        {{ record.reporterName }}
      </template>
      <template #handlerCell="{ record }">
        <!-- {{ getUserName(record.handlerName) }} -->
        {{ record.handlerName }}
      </template>
      <template #checkStatusCell="{ record }">
        <a-tag
          v-if="record.status == 2"
          :color="['red', 'arcoblue'][record.checkStatus]"
          default-checked
        >
          {{ checkStatusData[record.checkStatus] }}
        </a-tag>
      </template>
      <template #menu="{ record }">
        <a-button
          v-if="record.checkStatus == 1 && record.checkStatus == 1"
          v-permission="['workOrder:info', 'workOrder:list']"
          type="text"
          @click="handleWatch(record)"
        >
          查看
        </a-button>
        <a-button
          v-else
          v-permission="['workOrder:info', 'workOrder:edit']"
          type="text"
          @click="handleEdit(record)"
          >编辑</a-button
        >
      </template>
      <template #header>
        <a-button
          v-permission="['workOrder:add']"
          type="primary"
          @click="handleAdd"
        >
          <slot name="icon">
            <icon-plus />
          </slot>
          新增
        </a-button>
        <a-button
          v-permission="['workOrder:batch:remove']"
          type="primary"
          style="margin-left: 15px"
          :disabled="selectedKeys.length === 0"
          @click="handleDelete"
        >
          <slot name="icon">
            <icon-delete />
          </slot>
          删除
        </a-button>
      </template>
    </i-table>

    <add-model
      v-model="modelVisible"
      :row-id="rowId"
      :source="modelSource"
      :options="{
        faultTypeData: configDic,
        userList: userList
      }"
      @reset="reset"
      @close="close"
    />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import useDictData from '@/hooks/useDictData';
  import {
    cbdApiProjectWorkOrderListGet,
    cbdApiProjectWorkOrderBatchRemoveDataTypeDelete,
    cbdApiProjectCommonUserSelectListGet
  } from '@/api';
  import AddModel from './__components__/add-model.vue';
  import { useAddModel } from './useAddModel';
  import useFuncProxy from '@/hooks/useFuncProxy';
  const {
    modelVisible,
    modelSource,
    rowId,

    handleEdit,
    handleAdd,
    handleWatch
  } = useAddModel();

  function handleDelete() {
    Modal.open({
      title: '删除确认',
      content: '请确认是否删除已选择保修信息？',
      onOk: async () => {
        await cbdApiProjectWorkOrderBatchRemoveDataTypeDelete({
          dataType: '0',
          ids: selectedKeys.value.join(',')
        });
        Message.success('操作成功!');
        page.refresh = true;
      }
    });
  }

  interface PageConfig {
    search?: any;
    options?: any;
    showEditModal?: boolean;
    showConfigModal?: boolean;
    refresh?: boolean;
    showDetail?: boolean;
    modelTitle?: string;
    menuOtherOptions?: any;
  }

  const [configDic] = useDictData('00012');

  const selectedKeys = ref([]);

  const statusData = ['未处理', '处理中', '已完成'];
  const chargeTypeData = ['否', '是'];
  const checkStatusData = ['不通过', '通过'];

  type UserItemType = {
    label?: string;
    value?: number;
  };
  const userList = ref<UserItemType[]>([]);
  const [getUserList] = useFuncProxy(async () => {
    const res = await cbdApiProjectCommonUserSelectListGet({});
    // console.log(page.options.columns);
    page.options.columns[5].dic = res;
    page.options.columns[8].dic = res;
    userList.value = res;
  });

  // function getUserName(value: number) {
  //   const find = userList.value.find((it) => it.value === value);
  //   return find?.label;
  // }

  const page = reactive<PageConfig>({
    search: {
      reporter: '',
      status: '',
      faultTypeId: '',
      handler: '',
      workNo: '',
      reportTimeStart: '',
      reportTimeEnd: ''
    },
    showEditModal: false,
    showConfigModal: false,
    refresh: false,
    showDetail: false,
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      menuOtherOptions: {
        'row-key': 'id',
        'row-selection': {
          type: 'checkbox',
          showCheckedAll: true,
          fixed: 'left',
          checkStrictly: true
        }
      },
      menuSpan: 12,
      menuOptions: {
        width: 150,
        fixed: 'right'
      },
      columns: [
        {
          label: '维修单号',
          search: true,
          prop: 'workNo',
          width: 100
        },
        {
          label: '报修时间',
          prop: 'reportTime',
          width: 120,
          search: true,
          type: 'dateRange',
          on: {
            change(v: string[]) {
              page.search = {
                ...page.search,
                reportTimeStart: v ? v[0] : '',
                reportTimeEnd: v ? v[1] : ''
              };
            }
          }
        },
        {
          label: '故障类型',
          prop: 'faultTypeId',
          type: 'select',
          width: 100,
          search: true,
          dic: configDic.value,
          on: {
            change(v: string) {
              page.search = {
                ...page.search,
                faultTypeId: v
              };
            }
          }
        },
        {
          label: '状态',
          search: true,
          prop: 'status',
          width: 80,
          type: 'select',
          dic: statusData.map((item, index) => {
            return {
              label: item,
              value: index
            };
          }),
          on: {
            change(v: number) {
              page.search = {
                ...page.search,
                status: v
              };
            }
          }
        },
        {
          label: '提报人',
          width: 100,
          search: true,
          prop: 'reporter',
          type: 'select',
          on: {
            change(v: string) {
              page.search = {
                ...page.search,
                reporter: v
              };
            }
          },
          dic: userList.value
        },
        {
          label: '是否付费',
          prop: 'chargeType',
          width: 100
        },
        {
          label: '金额',
          width: 80,
          prop: 'expense'
        },
        {
          label: '维修人',
          width: 100,
          search: true,
          type: 'select',
          prop: 'handler',
          on: {
            change(v: number) {
              page.search = {
                ...page.search,
                handler: v
              };
            }
          },
          dic: userList.value
        },
        {
          label: '验收结果',
          prop: 'checkStatus',
          width: 100,
          type: 'select',
          dic: checkStatusData.map((item, index) => {
            return {
              label: item,
              value: index
            };
          })
        },
        {
          label: '完成时间',
          prop: 'finishTime',
          width: 120
        },
        {
          label: '耗时(小时)',
          width: 100,
          prop: 'consumingHours'
        }
      ]
    }
  });

  function tableFormReset() {
    delete page.search.reportTimeStart;
    delete page.search.reportTimeEnd;
  }

  // 新增
  function reset() {
    rowId.value = '';
    modelVisible.value = false;
    page.refresh = true;
  }

  function close() {
    rowId.value = '';
    modelVisible.value = false;
  }

  onMounted(() => {
    getUserList();
  });
</script>

<style scoped></style>
