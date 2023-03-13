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
            @click="dialogImportRef.open({ type: 'ADD' })"
          >
            批量导入
          </a-button>
          <a-button type="primary" @click="handleExport"> 批量导出 </a-button>
          <a-button
            type="primary"
            :loading="loadingResetPassword"
            :disabled="selectedKeys.length <= 0"
            @click="handleResetPassword"
          >
            重置密码
          </a-button>
        </a-space>
      </template>
      <template #statusCell="{ record }">
        <span>{{ valueFindLabel(options.status, record.status) }}</span>
      </template>
      <template #menu="{ record }">
        <div class="flex" style="margin-left: -15px">
          <!--contract:clear:bill:info-->
          <a-button
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
          <a-button type="text" @click="handleDelete(record.id)">
            删除
          </a-button>
        </div>
      </template>
    </i-table>

    <!-- 新增&修改&详情 -->
    <DialogCUD ref="dialogCUD" @success="refresh = true" />

    <!-- 导入 -->
    <DialogImport ref="dialogImportRef" @success="refresh = true" />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'MerchantEmployee'
  };
</script>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import {
    cbdApiProjectMerchantEmployeeResetPwdPut,
    cbdApiProjectMerchantEmployeeListGet,
    CbdApiProjectMerchantEmployeeListGetRequest,
    CbdApiProjectMerchantEmployeeListGetResponse,
    cbdApiProjectMerchantEmployeeRemoveDelete,
    cbdApiProjectMerchantEmployeeExportGet
  } from '@/api';
  import useOptions from './use-options';
  import { EmployeeListReq } from './interface';
  import ITable from '@/components/i-table/index.vue';
  import { modalConfirm, valueFindLabel, exportDownload } from '@/utils';
  import DialogCUD from './__components__/dialog/dialog-cud.vue';
  import DialogImport from './__components__/dialog/dialog-import.vue';
  import useFetchContractDict from '@/hooks/use-fetch-contract-dict';
  import { useStorageProjectId } from '@/hooks/use-storage-project-id';

  type TableData =
    Required<CbdApiProjectMerchantEmployeeListGetResponse>['rows'];

  const dialogCUD = ref();
  const dialogImportRef = ref();
  const refresh = ref<boolean>(false);
  const loadingResetPassword = ref(false);
  const tableData = ref<TableData>([]);
  const selectedKeys = ref([]);

  const { storageProjectId, setStorageProjectId } = useStorageProjectId();
  const { options } = useOptions();
  const queryParams = ref(new EmployeeListReq());
  const {
    fetchProjectData,
    fetchMerchantData,
    fetchStoreData,
    fetchBrandData,
    processTableOptions
  } = useFetchContractDict(queryParams, options);

  const tableConfig = reactive({
    index: true,
    menuSpan: 12,
    tableCard: true,
    submitText: '搜索',
    autoLabelWidth: true,
    menuOptions: {
      width: 220,
      align: 'left'
    },
    menuOtherOptions: {
      'row-key': 'id',
      'row-selection': {
        type: 'checkbox',
        showCheckedAll: true,
        onlyCurrent: true
      }
    },
    columns: [
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
            setStorageProjectId(val);
            fetchMerchantData();
            fetchStoreData();
            fetchBrandData();
          }
        }
      },
      {
        hide: true,
        label: '商户',
        prop: 'merchantId',
        search: true,
        searchSort: 40,
        type: 'select',
        dic: options.value.merchantId,
        on: {
          change() {
            fetchStoreData();
            fetchBrandData();
          }
        }
      },
      {
        hide: true,
        label: '店铺',
        prop: 'storeId',
        search: true,
        searchSort: 50,
        type: 'select',
        dic: options.value.storeId,
        on: {
          change() {
            fetchBrandData();
          }
        }
      },
      {
        hide: true,
        search: true,
        label: '品牌',
        prop: 'brandId',
        searchSort: 60,
        type: 'select',
        options: {
          maxLength: 20
        },
        dic: options.value.brandId
      },
      {
        label: '账号',
        prop: 'accountName',
        search: true,
        searchSort: 80
      },
      {
        label: '状态',
        prop: 'status',
        search: true,
        type: 'select',
        dic: options.value.status
      },
      {
        label: '商户',
        prop: 'merchantName'
      },
      {
        label: '权限店铺',
        prop: 'storeNames'
      },
      {
        label: '品牌',
        prop: 'brandNames'
      },
      {
        label: '身份',
        prop: 'identityName'
      }
    ]
  });

  async function handleResetPassword() {
    if (selectedKeys.value.length > 0) {
      modalConfirm('确认重置密码？', async () => {
        try {
          loadingResetPassword.value = true;
          await cbdApiProjectMerchantEmployeeResetPwdPut({
            ids: selectedKeys.value.join(',')
          });
          Message.success('密码已重置为“132456”');
        } finally {
          loadingResetPassword.value = false;
        }
      });
    }
  }

  async function handleExport() {
    const hasSelected = selectedKeys.value.length > 0;
    const tableIds = tableData.value.map((itm) => itm.id);
    const exportIds = hasSelected ? selectedKeys.value : tableIds;
    if (exportIds.length === 0) {
      return Message.warning('没有可以导出的数据');
    }
    await modalConfirm(
      hasSelected ? '是否导出选中数据？' : '是否导出结果页全部数据？'
    );
    const url = cbdApiProjectMerchantEmployeeExportGet.requestConfig.path;
    await exportDownload(
      url,
      {
        ...queryParams.value,
        exportIds: exportIds
      },
      '商户账号.xlsx'
    );
    selectedKeys.value = [];
  }

  async function handleDelete(id: string) {
    await modalConfirm('删除后数据无法恢复，是否删除？');
    await cbdApiProjectMerchantEmployeeRemoveDelete({ id });
    refresh.value = true;
    Message.success('删除成功');
  }

  async function fetchTableData(
    params: CbdApiProjectMerchantEmployeeListGetRequest
  ) {
    const res = await cbdApiProjectMerchantEmployeeListGet(params);
    tableData.value = res.rows as TableData;
    return res;
  }

  onMounted(async () => {
    fetchProjectData();
    fetchMerchantData();
    fetchStoreData();
    fetchBrandData();

    // options数据变化作用到查询项中
    processTableOptions(tableConfig, [
      'projectId',
      'merchantId',
      'contractCode',
      'brandId',
      'storeId'
    ]);

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
