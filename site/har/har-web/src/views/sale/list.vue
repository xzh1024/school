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
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div>
            <a-space>
              <!--v-permission="['contract:clear:bill:save']"-->
              <a-button
                type="primary"
                @click="dialogChoiceGoods.open({ type: 'ADD' })"
              >
                添加
              </a-button>
              <!--          <a-button-->
              <!--            type="primary"-->
              <!--            :disabled="selectedDeleteKeys.length === 0"-->
              <!--            @click="handleDelete(selectedDeleteKeys)"-->
              <!--          >-->
              <!--            删除-->
              <!--          </a-button>-->
              <a-button
                type="primary"
                :disabled="selectedConfirmKeys.length === 0"
                @click="handleConfirm"
              >
                确认
              </a-button>
              <a-button type="primary" @click="handleImport">
                批量导入
              </a-button>
              <a-button type="primary" @click="handleExport">
                批量导出
              </a-button>

              <a-button
                type="primary"
                :disabled="selectedApprovalKeys.length === 0"
                @click="handleApproval"
              >
                审批
              </a-button>
            </a-space>
          </div>
          <div>
            <a-space>
              <div>
                <strong style="font-size: 18px"
                  >销售额￥{{ formatPrice(saleCount.totalSaleAmount) }}
                </strong>
                <span>（{{ priceShowComma(saleCount.saleNum) }}笔）</span>
              </div>
              <div>
                <strong style="font-size: 18px"
                  >审批中￥{{ saleCount.verifySaleAmount }}
                </strong>
                <span>（{{ priceShowComma(saleCount.verifySaleNum) }}笔）</span>
              </div>
              <div>
                <strong style="font-size: 18px"
                  >已出账￥{{ saleCount.completeSaleAmount }}
                </strong>
                <span
                  >（{{ priceShowComma(saleCount.completeSaleNum) }}笔）</span
                >
              </div>
            </a-space>
          </div>
        </div>
      </template>
      <!--      <template #statusCell="{ record }">-->
      <!--        <span>{{ valueFindLabel(options.status, record.status) }}</span>-->
      <!--      </template>-->
      <!--      <template #categoryCell="{ record }">-->
      <!--        <span>{{ valueFindLabel(options.category, record.category) }}</span>-->
      <!--      </template>-->
      <!--      <template #messageLevelCell="{ record }">-->
      <!--        <span>{{-->
      <!--          valueFindLabel(options.messageLevel, record.messageLevel)-->
      <!--        }}</span>-->
      <!--      </template>-->
      <!--      <template #onTopCell="{ record }">-->
      <!--        <span>{{ valueFindLabel(options.onTop, record.onTop) }}</span>-->
      <!--      </template>-->
      <!--      <template #targetTypeCell="{ record }">-->
      <!--        <span>{{ valueFindLabel(options.targetType, record.targetType) }}</span>-->
      <!--      </template>-->
      <template #menu="{ record }">
        <div class="flex" style="margin-left: -15px">
          <!--contract:clear:bill:info-->
          <a-button
            v-if="editAction.show(record)"
            type="text"
            @click="
              dialogCUD.open({ type: 'EDIT' }, { recordId: record.recordId })
            "
            >编辑</a-button
          >
          <a-button
            type="text"
            @click="
              dialogCUD.open({ type: 'DETAIL' }, { recordId: record.recordId })
            "
            >查看</a-button
          >
          <!--contract:clear:bill:delete-->
          <a-button
            v-if="deleteAction.show(record)"
            type="text"
            @click="handleDelete(record.recordId)"
          >
            删除
          </a-button>
        </div>
      </template>
    </i-table>

    <!-- 新增&修改&详情 -->
    <DialogCUD ref="dialogCUD" @success="refresh = true" />
    <DialogImport ref="dialogImport" @success="refresh = true" />
    <DialogChoiceGoods ref="dialogChoiceGoods" @success="refresh = true" />
    <DialogApproval ref="dialogApprovalRef" @success="refresh = true" />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Sale'
  };
</script>

<script setup lang="ts">
  import { Message } from '@arco-design/web-vue';
  import { ref, Ref, reactive, onMounted, computed } from 'vue';
  import {
    cbdApiProjectSaleListGet,
    cbdApiProjectSaleExportGet,
    CbdApiProjectSaleAddPostRequest,
    CbdApiProjectSaleListGetRequest,
    CbdApiProjectSaleListGetResponse,
    cbdApiProjectSaleCountGet,
    CbdApiProjectSaleInfoGetResponse
  } from '@/api';
  import useActions from './use-action';
  import useOptions from './use-options';
  import {
    exportDownload,
    formatPrice,
    getOptionLabel,
    modalConfirm,
    priceShowComma
  } from '@/utils';
  import ITable from '@/components/i-table/index.vue';
  import DialogCUD from './__components__/dialog/dialog-cud.vue';
  import DialogImport from './__components__/dialog/dialog-import.vue';
  import DialogApproval from './__components__/dialog/dialog-approval.vue';
  import DialogChoiceGoods from './__components__/dialog/dialog-choice-goods.vue';
  import { cloneDeep } from 'lodash';

  type TableDataList = Required<CbdApiProjectSaleListGetResponse>['rows'];

  const dialogCUD = ref();
  const dialogImport = ref();
  const dialogChoiceGoods = ref();
  const dialogApprovalRef = ref();
  const refresh = ref<boolean>(false);
  const tableData = ref<TableDataList>([]);
  const selectedKeys = ref([]);
  const saleCount = ref<Record<string, number>>({
    totalSaleAmount: 0,
    saleNum: 0,
    verifySaleAmount: 0,
    verifySaleNum: 0,
    completeSaleAmount: 0,
    completeSaleNum: 0
  });

  const queryParams = ref({
    recordId: '',
    projectId: '',
    businessStatusList: [],
    verifyStatusList: [],
    merchantId: '',
    storeId: '',
    brandId: '',
    saleDateList: [],
    startSaleDate: '',
    endSaleDate: '',
    dateList: [],
    startDate: '',
    endDate: '',
    contractCode: '',
    sourceTypeList: [],
    showCancel: [],
    saleNo: '',
    recordIds: ''
  });
  const {
    options,
    handleChangeProjectId,
    handleChangeMerchantId,
    handleChangeStoreId,
    optionsRelevancyTableColumns
  } = useOptions(
    {},
    queryParams as unknown as Ref<CbdApiProjectSaleAddPostRequest>,
    false
  );
  const { editAction, approvalAction, deleteAction, confirmAction } =
    useActions();

  // const selectedDeleteKeys = computed(() => {
  //   return selectedKeys.value.filter((id) => {
  //     const row = tableData.value.find((itm) => itm.recordId === id);
  //     return row && row?.businessStatus <= 2;
  //   });
  // });
  const selectedConfirmKeys = computed(() => {
    return selectedKeys.value.filter((id) => {
      const row = tableData.value.find((itm) => itm.recordId === id);
      return (
        row &&
        confirmAction.show(row as unknown as CbdApiProjectSaleInfoGetResponse)
      );
    });
  });
  const selectedApprovalKeys = computed(() => {
    return selectedKeys.value.filter((id) => {
      const row = tableData.value.find((itm) => itm.recordId === id);
      return (
        row &&
        approvalAction.show(row as unknown as CbdApiProjectSaleInfoGetResponse)
      );
    });
  });
  const tableConfig = reactive({
    index: true,
    menuSpan: 12,
    tableCard: true,
    submitText: '搜索',
    autoLabelWidth: true,
    menuOptions: {
      width: 220
    },
    menuOtherOptions: {
      'row-key': 'recordId',
      'row-selection': {
        type: 'checkbox',
        showCheckedAll: true,
        onlyCurrent: true
      }
    },
    columns: [
      {
        label: '销售单据号',
        prop: 'saleNo',
        searchSort: 110,
        search: true
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
            handleChangeProjectId();
          }
        }
      },
      {
        label: '合同号',
        prop: 'contractCode',
        searchSort: 90,
        search: true
      },
      {
        label: '商户',
        prop: 'merchantName'
      },
      {
        label: '商户',
        prop: 'merchantId',
        type: 'select',
        searchSort: 40,
        hide: true,
        search: true,
        dic: options.value.merchantId,
        on: {
          change() {
            handleChangeMerchantId();
          }
        }
      },
      {
        label: '店铺',
        prop: 'storeName'
      },
      {
        label: '店铺',
        prop: 'storeId',
        type: 'select',
        searchSort: 50,
        hide: true,
        search: true,
        dic: options.value.storeId,
        on: {
          change() {
            handleChangeStoreId();
          }
        }
      },
      {
        label: '品牌',
        prop: 'brandName'
      },
      {
        label: '品牌',
        prop: 'brandId',
        type: 'select',
        searchSort: 60,
        hide: true,
        search: true,
        dic: options.value.brandId
      },
      {
        label: '业务状态',
        prop: 'businessStatusList',
        type: 'select',
        searchSort: 20,
        dic: options.value.businessStatus,
        search: true,
        options: {
          'multiple': true,
          'max-tag-count': 1
        },
        formatter(record: Recordable) {
          return getOptionLabel(
            options.value.businessStatus,
            record.businessStatus
          );
        }
      },
      {
        label: '审批状态',
        prop: 'verifyStatusList',
        type: 'select',
        searchSort: 30,
        dic: options.value.verifyStatus,
        search: true,
        options: {
          'multiple': true,
          'max-tag-count': 1
        },
        formatter(record: Recordable) {
          return getOptionLabel(
            options.value.verifyStatus,
            record.verifyStatus
          );
        }
      },
      {
        label: '来源',
        prop: 'sourceTypeList',
        options: {
          'multiple': true,
          'max-tag-count': 1
        },
        formatter(record: Recordable) {
          return getOptionLabel(options.value.sourceType, record.sourceType);
        }
      },
      {
        label: '销售额',
        prop: 'saleAmount'
      },
      {
        label: '销售日期',
        prop: 'saleDate'
      },
      {
        label: '销售日期',
        prop: 'saleDateList',
        hide: true,
        search: true,
        searchSort: 70,
        type: 'dateRange'
      },
      {
        label: '录入日期',
        prop: 'dateList',
        hide: true,
        search: true,
        searchSort: 80,
        type: 'dateRange'
      },
      {
        label: '数据来源',
        prop: 'sourceTypeList',
        hide: true,
        search: true,
        type: 'select',
        searchSort: 100,
        options: {
          'multiple': true,
          'max-tag-count': 2
        },
        dic: options.value.sourceType
      },
      {
        label: '显示已作废数据',
        prop: 'showCancel',
        hide: true,
        search: true,
        type: 'checkbox',
        dic: [{ label: '', value: 1 }],
        span: 12
      }
    ]
  });

  function handleImport() {
    dialogImport.value.open();
  }

  async function handleExport() {
    const hasSelected = selectedKeys.value.length > 0;
    const tableIds = tableData.value.map((itm) => itm.recordId);
    const exportIds = hasSelected ? selectedKeys.value : tableIds;
    if (exportIds.length === 0) {
      return Message.warning('没有可以导出的数据');
    }
    await modalConfirm(
      hasSelected ? '是否导出选中数据？' : '是否导出结果页全部数据？'
    );
    const url = cbdApiProjectSaleExportGet.requestConfig.path;
    await exportDownload(
      url,
      {
        ...queryParams.value,
        exportIds: exportIds
      },
      '销售列表.xlsx'
    );
    selectedKeys.value = [];
  }

  async function handleApproval() {
    if (selectedApprovalKeys.value.length) {
      dialogApprovalRef.value.open(
        { type: 'ADD', title: '审批' },
        {
          recordIds: selectedApprovalKeys.value
        }
      );
    }
  }

  async function handleConfirm() {
    await confirmAction({
      recordIds: selectedConfirmKeys.value
    });
    refresh.value = true;
    selectedKeys.value = [];
  }
  async function handleDelete(id: number | Array<number>) {
    await deleteAction(id);
    refresh.value = true;
    selectedKeys.value = [];
  }

  async function fetchTableData(
    params: CbdApiProjectSaleListGetRequest & {
      saleDateList: string[];
      dateList: string[];
    }
  ) {
    params = cloneDeep(params);
    const tasks = [];
    let saleCountMap: Recordable = {};
    let res: Recordable = {
      total: 0,
      rows: []
    };
    if (Array.isArray(params.showCancel)) {
      params.showCancel = params.showCancel[0];
    }
    params.startSaleDate = params?.saleDateList?.[0] ?? '';
    params.endSaleDate = params?.saleDateList?.[1] ?? '';
    params.startDate = params?.dateList?.[0] ?? '';
    params.endDate = params?.dateList?.[1] ?? '';

    params.businessStatusList =
      (params.businessStatusList as unknown as string[])?.join?.(',') ?? '';
    params.verifyStatusList =
      (params.verifyStatusList as unknown as string[])?.join?.(',') ?? '';
    params.sourceTypeList =
      (params.sourceTypeList as unknown as string[])?.join?.(',') ?? '';

    tasks.push(
      cbdApiProjectSaleCountGet(params as CbdApiProjectSaleListGetRequest).then(
        (v) => {
          saleCountMap = v;
        }
      ),
      cbdApiProjectSaleListGet(params).then((v) => (res = v))
    );
    try {
      await Promise.all(tasks);
    } finally {
      saleCount.value = saleCountMap as Record<string, number>;
      tableData.value = res.rows as TableDataList;
    }
    return res;
  }

  onMounted(() => {
    optionsRelevancyTableColumns(tableConfig);
  });
</script>

<style scoped lang="less">
  .form-tip {
    margin-top: 0;
    padding-top: 0;
    padding-left: 20px;
  }
</style>
