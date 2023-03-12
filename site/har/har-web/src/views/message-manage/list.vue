<template>
  <div>
    <i-table
      v-model="queryParams"
      v-model:refresh-now="refresh"
      v-model:selectedKeys="selectedKeys"
      :options="tableConfig"
      :api="fetchTableData"
    >
      <template #header>
        <a-space>
          <!--v-permission="['contract:clear:bill:save']"-->
          <a-button type="primary" @click="dialogCUD.open({ type: 'ADD' })">
            添加
          </a-button>
          <a-button
            type="primary"
            :disabled="selectedDeleteKeys.length === 0"
            @click="handleDelete(selectedDeleteKeys)"
          >
            删除
          </a-button>
          <a-button
            type="primary"
            :disabled="selectedWaitPublishKeys.length === 0"
            @click="handleSwitchStatus(selectedWaitPublishKeys, 1)"
          >
            发布
          </a-button>
          <a-button
            type="primary"
            :disabled="selectedRevokeKeys.length === 0"
            @click="handleSwitchStatus(selectedRevokeKeys, 2)"
          >
            撤回
          </a-button>
          <a-button
            type="primary"
            :disabled="selectedUnShelveKeys.length === 0"
            @click="handleSwitchStatus(selectedUnShelveKeys, 3)"
          >
            下架
          </a-button>
        </a-space>
      </template>
      <template #statusCell="{ record }">
        <span>{{ valueFindLabel(options.status, record.status) }}</span>
      </template>
      <template #categoryCell="{ record }">
        <span>{{ valueFindLabel(options.category, record.category) }}</span>
      </template>
      <template #messageLevelCell="{ record }">
        <span>{{
          valueFindLabel(options.messageLevel, record.messageLevel)
        }}</span>
      </template>
      <template #onTopCell="{ record }">
        <span>{{ valueFindLabel(options.onTop, record.onTop) }}</span>
      </template>
      <template #targetTypeCell="{ record }">
        <span>{{ valueFindLabel(options.targetType, record.targetType) }}</span>
      </template>
      <template #menu="{ record }">
        <div class="flex" style="margin-left: -15px;">
          <!--contract:clear:bill:info-->
          <a-button
            v-if="editAction.show(record)"
            type="text"
            @click="dialogCUD.open({ type: 'EDIT' }, { id: record.id })"
          >编辑</a-button
          >
          <a-button
            type="text"
            @click="dialogCUD.open({ type: 'DETAIL' }, { id: record.id })"
          >查看</a-button
          >
          <!--contract:clear:bill:delete-->
          <a-button
            v-if="deleteAction.show(record)"
            type="text"
            @click="handleDelete(record.id)"
          >
            删除
          </a-button>
        </div>
      </template>
    </i-table>

    <!-- 新增&修改&详情 -->
    <DialogCUD ref="dialogCUD" @success="refresh = true" />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'MerchantEmployee'
  };
</script>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed } from 'vue';
  import {
    cbdApiProjectMessageManageListGet,
    CbdApiProjectMessageManageListGetResponse,
    CbdApiProjectMessageManageListGetRequest,
    cbdApiProjectCommonContractStoreSelectGet
  } from '@/api';
  import useActions from './use-action';
  import useOptions from './use-options';
  import { resetOptionsData, valueFindLabel } from '@/utils';
  import { MessageManageListReq } from './interface';
  import ITable from '@/components/i-table/index.vue';
  import DialogCUD from './__components__/dialog/dialog-cud.vue';
  import useFetchContractDict from '@/hooks/use-fetch-contract-dict';
  import { SelectOptions } from '@/components/i-select/interface';
  import { useStorageProjectId } from '@/hooks/use-storage-project-id';

  type TableDataList =
    Required<CbdApiProjectMessageManageListGetResponse>['rows'];

  const dialogCUD = ref();
  const refresh = ref<boolean>(false);
  const tableData = ref<TableDataList>([]);
  const selectedKeys = ref([]);

  const queryParams = ref(new MessageManageListReq());
  const { options } = useOptions({
    storeIds: [] as SelectOptions
  });
  const { editAction, deleteAction, switchStatusAction } = useActions();
  const { storageProjectId, setStorageProjectId } = useStorageProjectId();
  const { fetchProjectData } = useFetchContractDict(queryParams, options);

  const selectedDeleteKeys = computed(() => {
    return selectedKeys.value.filter((id) => {
      const row = tableData.value.find((itm) => itm.id === id);
      return row && deleteAction.show(row);
    });
  });
  const selectedWaitPublishKeys = computed(() => {
    return selectedKeys.value.filter((id) => {
      const row = tableData.value.find((itm) => itm.id === id);
      return row && switchStatusAction.show(row, 1);
    });
  });
  const selectedRevokeKeys = computed(() => {
    return selectedKeys.value.filter((id) => {
      const row = tableData.value.find((itm) => itm.id === id);
      return row && switchStatusAction.show(row, 2);
    });
  });
  const selectedUnShelveKeys = computed(() => {
    return selectedKeys.value.filter((id) => {
      const row = tableData.value.find((itm) => itm.id === id);
      return row && switchStatusAction.show(row, 3);
    });
  });

  const tableColumns = computed(() => {
    return [
      {
        label: '项目名称',
        prop: 'projectName'
      },
      {
        hide: true,
        label: '项目名称',
        prop: 'projectId',
        search: true,
        searchSort: 10,
        type: 'select',
        dic: options.value.projectId,
        on: {
          change(val: string) {
            fetchStoreData();
            setStorageProjectId(val);
          }
        }
      },
      {
        label: '消息标题',
        prop: 'title',
        search: true
      },
      {
        label: '状态',
        prop: 'status',
        search: true,
        type: 'select',
        dic: options.value.status
      },
      {
        label: '消息类型',
        prop: 'category',
        search: true,
        type: 'select',
        dic: options.value.category
      },
      {
        label: '重要程度',
        prop: 'messageLevel',
        search: true,
        type: 'select',
        dic: options.value.messageLevel
      },
      {
        label: '是否顶置',
        prop: 'onTop',
        search: true,
        type: 'select',
        dic: options.value.onTop
      },
      {
        label: '接收对象',
        prop: 'targetType',
        search: true,
        type: 'select',
        dic: options.value.targetType
      },
      queryParams.value.targetType === 0
        ? {
            label: '接收店铺',
            prop: 'storeIds',
            search: true,
            type: 'select',
            options: {
              multiple: true,
              allowClear: true,
              maxTagCount: 1
            },
            dic: options.value.storeIds
          }
        : null,
      {
        label: '发布时间',
        prop: 'publishStartTime',
        search: true,
        type: 'dateRange',
        dic: options.value.status,
        options: {
          showTime: true
        }
      }
    ].filter((t) => t);
  });

  const tableConfig = reactive({
    index: true,
    menuSpan: 24,
    tableCard: true,
    submitText: '搜索',
    autoLabelWidth: true,
    menuOptions: {
      width: 220
    },
    menuOtherOptions: {
      'row-key': 'id',
      'row-selection': {
        type: 'checkbox',
        showCheckedAll: true,
        onlyCurrent: true
      }
    },
    columns: tableColumns
  });

  async function handleSwitchStatus(
    id: number | Array<number>,
    operateStatus: 1 | 2 | 3
  ) {
    switchStatusAction(
      {
        id,
        operateStatus
      },
      {
        completeCallback() {
          refresh.value = true;
          selectedKeys.value = [];
        }
      }
    );
  }

  async function handleDelete(id: number | Array<number>) {
    deleteAction(id, {
      completeCallback() {
        refresh.value = true;
        selectedKeys.value = [];
      }
    });
  }

  async function fetchTableData(
    params: CbdApiProjectMessageManageListGetRequest
  ) {
    if (Array.isArray(params.publishStartTime)) {
      const timeList = params.publishStartTime;
      params.publishStartTime = timeList[0];
      params.publishEndTime = timeList[1];
    }
    const res = await cbdApiProjectMessageManageListGet(params);
    tableData.value = res.rows as TableDataList;
    return res;
  }

  function fetchStoreData() {
    cbdApiProjectCommonContractStoreSelectGet({
      projectId: queryParams.value.projectId
    }).then((res) => {
      const data = res as SelectOptions;
      options.value.storeIds = data;
      resetOptionsData(queryParams, data, 'storeIds', 'value');
    });
  }

  onMounted(() => {
    fetchProjectData();
    fetchStoreData();
    setTimeout(() => {
      // @ts-ignore
      queryParams.value.projectId = storageProjectId.value
        ? Number(storageProjectId.value)
        : '';
    }, 100);
  });
</script>

<style scoped lang="less">
  .form-tip {
    margin-top: 0;
    padding-top: 0;
    padding-left: 20px;
  }
</style>
