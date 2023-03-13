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
          <a-button type="primary" @click="dialogCUDRef.open({ type: 'ADD' })">
            添加
          </a-button>
          <!--v-permission="['contract:clear:bill:confirm']"-->
          <a-button
            type="primary"
            :disabled="selectedConfirmIds.length === 0"
            @click="handleConfirm"
          >
            确认
          </a-button>
          <!--v-permission="['contract:clear:bill:export']"-->
          <a-button
            type="primary"
            :disabled="selectedKeys.length === 0"
            @click="handleExport"
          >
            批量导出
          </a-button>
        </a-space>
      </template>
      <template #businessStatusCell="{ record }">
        <span v-if="BUSINESS_STATUS[record.businessStatus]">{{
          BUSINESS_STATUS[record.businessStatus]
        }}</span>
      </template>
      <template #verifyStatusCell="{ record }">
        <span v-if="VERIFY_STATUS[record.verifyStatus]">{{
          VERIFY_STATUS[record.verifyStatus]
        }}</span>
      </template>
      <template #menu="{ record }">
        <div class="flex" style="margin-left: -15px;">
          <!--contract:clear:bill:info-->
          <a-button
            type="text"
            @click="dialogCUDRef.open({ type: 'DETAIL' }, record)"
          >
            查看
          </a-button>
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
    <DialogCUD ref="dialogCUDRef" @success="refresh = true" />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ContractClearBill'
  };
</script>

<script setup lang="ts">
  import { Message } from '@arco-design/web-vue';
  import { ref, reactive, computed, watch, onMounted } from 'vue';
  import {
    cbdApiProjectContractClearBillListGet,
    cbdApiProjectContractClearBillExportGet,
    CbdApiProjectContractClearBillListGetRequest,
    CbdApiProjectContractClearBillListGetResponse,
    CbdApiProjectContractClearBillInfoIdGetResponse
  } from '@/api';
  import useActions from './use-actions';
  import { useOptions } from './use-options';
  import ITable from '@/components/i-table/index.vue';
  import { BUSINESS_STATUS, VERIFY_STATUS } from './interface';
  import DialogCUD from './__components__/dialog/dialog-cud.vue';
  import { exportDownload, modalConfirm } from '@/utils';
  import useFetchContractDict from '@/hooks/use-fetch-contract-dict';

  type TableData =
    Required<CbdApiProjectContractClearBillListGetResponse>['rows'];

  const dialogCUDRef = ref();
  const selectedKeys = ref([]);
  const refresh = ref<boolean>(false);
  const tableData = ref<TableData>([]);
  const loadingConfirmAll = ref(false);
  const { options } = useOptions();
  const { deleteAction, confirmAction } = useActions();
  const queryParams = ref({
    // { string } 项目
    projectId: '',
    // { string } 业务状态1、草稿2、待确认3、已确认4、已作废
    businessStatus: '',
    // { string } 审批状态1、未提交2、审批中3、已驳回4、已撤销5、已通过
    verifyStatus: '',
    // { string } 商户
    merchantId: '',
    // { string } 店铺id
    storeId: '',
    // { string } 品牌
    brandId: '',
    // { string } 合同号
    contractCode: '',
    cancel: []
  });
  const {
    fetchProjectData,
    fetchMerchantData,
    fetchStoreData,
    fetchBrandData,
    processTableOptions
  } = useFetchContractDict(queryParams, options);

  const tableConfig = reactive({
    submitText: '搜索',
    tableCard: true,
    index: true,
    autoLabelWidth: true,
    menuSpan: 24,
    menuOtherOptions: {
      'row-key': 'id',
      'row-selection': {
        type: 'checkbox',
        showCheckedAll: true,
        onlyCurrent: true
      }
    },
    menuOptions: {
      width: 160
    },
    columns: [
      {
        label: '清算单号',
        prop: 'code'
      },
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
          change() {
            fetchMerchantData();
            fetchStoreData();
            fetchBrandData();
          }
        }
      },
      {
        label: '合同号',
        prop: 'contractCode',
        search: true,
        searchSort: 70,
        options: {
          maxLength: 20
        }
      },
      {
        label: '商户',
        prop: 'merchantName'
      },
      {
        hide: true,
        label: '商户',
        prop: 'merchantId',
        search: true,
        searchSort: 40,
        type: 'select',
        dic: options.value.merchantId,
        options: {
          maxLength: 20
        },
        on: {
          change() {
            fetchStoreData();
            fetchBrandData();
          }
        }
      },
      {
        label: '店铺',
        prop: 'storeName'
      },
      {
        hide: true,
        label: '店铺',
        prop: 'storeId',
        search: true,
        searchSort: 50,
        type: 'select',
        dic: options.value.storeId,
        options: {
          maxLength: 20
        },
        on: {
          change() {
            fetchBrandData();
          }
        }
      },
      {
        label: '品牌',
        prop: 'brandName'
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
        label: '业务状态',
        prop: 'businessStatus',
        search: true,
        searchSort: 20,
        type: 'select',
        dic: options.value.businessStatus
      },
      {
        label: '审批状态',
        prop: 'verifyStatus',
        search: true,
        searchSort: 30,
        type: 'select',
        dic: options.value.verifyStatus
      },
      {
        label: '显示已作废数据',
        prop: 'cancel',
        type: 'checkbox',
        hide: true,
        dic: [{ label: '', value: 1 }],
        search: true
      }
    ]
  });

  // 确认数据过滤
  const selectedConfirmIds = computed<Array<number>>(() => {
    return selectedKeys.value
      .map((key) => {
        const row = tableData.value.find((itm) => itm.id === key);
        if (
          row &&
          confirmAction.show(
            row as unknown as CbdApiProjectContractClearBillInfoIdGetResponse
          )
        ) {
          return key;
        }
        return undefined;
      })
      .filter((t) => t) as unknown as number[];
  });

  watch(
    () => options.value.projectId,
    (val) => {
      const column = tableConfig.columns.find(
        (itm) => itm.prop === 'projectId'
      );
      if (column) {
        column.dic = val;
      }
    }
  );

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
    const url = cbdApiProjectContractClearBillExportGet.requestConfig.path;
    await exportDownload(
      url,
      { ids: selectedKeys.value.join(',') },
      '合同清算.xlsx'
    );
    selectedKeys.value = [];
  }

  async function handleDelete(id: number | Array<number>) {
    await deleteAction(id);
    refresh.value = true;
    Message.success('操作成功');
  }

  async function handleConfirm() {
    if (selectedConfirmIds.value.length === 0) {
      return;
    }
    loadingConfirmAll.value = true;
    try {
      await confirmAction(selectedConfirmIds.value);
    } finally {
      loadingConfirmAll.value = false;
    }
  }

  async function fetchTableData(
    params: CbdApiProjectContractClearBillListGetRequest
  ) {
    params.cancel = params.cancel ? params.cancel[0] : '0';
    const res = await cbdApiProjectContractClearBillListGet(params);
    tableData.value = res.rows as TableData;
    return res;
  }

  onMounted(() => {
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
  });
</script>

<style scoped lang="less">
  .form-tip {
    margin-top: 0;
    padding-top: 0;
    padding-left: 20px;
  }
</style>
