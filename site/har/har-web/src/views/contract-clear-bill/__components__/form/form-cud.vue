<template>
  <a-form
    ref="formRef"
    layout="vertical"
    style="width: 100%"
    :model="formModel"
    :rules="formRules"
    :disabled="type === 'DETAIL'"
    auto-label-width
  >
    <template v-if="type === 'DETAIL'">
      <a-tabs
        class="a-tabs--har"
        style="margin: -12px -16px 16px -16px"
        :active-key="tabActiveKey"
        @change="(v) => (tabActiveKey = v)"
      >
        <a-tab-pane :key="1" title="清算单信息" />
        <a-tab-pane :key="2" title="审批详情" />
      </a-tabs>
    </template>

    <template v-if="tabActiveKey === 1">
      <a-card class="a-card--har" title="合同信息">
        <a-row :gutter="30">
          <a-col :span="span">
            <a-form-item
              :rules="[{ required: true, message: '必选项' }]"
              :validate-trigger="['change', 'blur']"
              field="projectId"
              label="项目名称"
            >
              <template v-if="isDetail">
                {{ formModel.projectName }}
              </template>
              <template v-else>
                <i-select
                  v-model="formModel.projectId"
                  :options="options.projectId"
                  @change="handleChangeProject"
                />
              </template>
            </a-form-item>
          </a-col>
          <a-col :span="span">
            <a-form-item
              :rules="[{ required: true, message: '必选项' }]"
              :validate-trigger="['change', 'blur']"
              field="merchantId"
              label="商户"
            >
              <template v-if="isDetail">
                {{ formModel.merchantName }}
              </template>
              <template v-else>
                <i-select
                  v-model="formModel.merchantId"
                  :options="options.merchantId"
                  @change="handleChangeMerchant"
                />
              </template>
            </a-form-item>
          </a-col>
          <a-col :span="span">
            <a-form-item
              :rules="[{ required: true, message: '必选项' }]"
              :validate-trigger="['change', 'blur']"
              field="storeId"
              label="店铺"
            >
              <template v-if="isDetail">
                {{ formModel.storeName }}
              </template>
              <template v-else>
                <i-select
                  v-model="formModel.storeId"
                  :options="options.storeId"
                  @change="handleChangeStore"
                />
              </template>
            </a-form-item>
          </a-col>
          <a-col :span="span">
            <a-form-item
              :rules="[{ required: true, message: '必选项' }]"
              :validate-trigger="['change', 'blur']"
              label="合同号"
              field="contractCode"
            >
              <template v-if="isDetail">
                {{ formModel.contractCode }}
              </template>
              <template v-else>
                <i-select
                  v-model="formModel.contractCode"
                  :options="options.contractCode"
                  @change="handleChangeContractCode"
                />
              </template>
            </a-form-item>
          </a-col>
          <a-col :span="span">
            <a-form-item label="品牌" field="brandName">
              <template v-if="isDetail">
                {{ formModel.brandName }}
              </template>
              <template v-else>
                <a-input
                  :model-value="formModel.brandName"
                  :max-length="200"
                  disabled
                />
              </template>
            </a-form-item>
          </a-col>
          <a-col :span="span">
            <a-form-item label="租赁铺位" field="doorPlates">
              <template v-if="isDetail">
                {{ formModel.doorPlates.join('、') }}
              </template>
              <template v-else>
                <a-input
                  :model-value="formModel.doorPlates.join('、')"
                  :max-length="200"
                  disabled
                />
              </template>
            </a-form-item>
          </a-col>
          <a-col :span="span">
            <a-form-item
              v-if="!isDetail"
              label="合同租期"
              style="margin-bottom: 0"
            >
              <!-- <template v-if="isDetail">
                {{
                  [formModel.leaseStartDate, formModel.leaseEndDate]
                    .filter((t) => t)
                    .join(' ~ ') || '--'
                }}
              </template> -->

              <a-input
                :model-value="
                  [formModel.leaseStartDate, formModel.leaseEndDate]
                    .filter((t) => t)
                    .join(' ~ ')
                "
                :max-length="200"
                disabled
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
      <a-card class="a-card--har" title="应收费用">
        <i-table :data="receivableFeeList" :options="tableConfig1">
          <template #indexCell="{ record, index }">
            <div v-if="record.receivableAmountTotal != null" class="text-center"
              >合计</div
            >
            <div v-else class="text-center">{{ index }}</div>
          </template>
          <template #expenseItemsNameCell="{ record }">
            <span :class="{ 'warn-color': processWarnColor(record) }">{{
              record.expenseItemsName
            }}</span>
          </template>
          <template #chargingMethodCell="{ record }">
            <span :class="{ 'warn-color': processWarnColor(record) }">{{
              record.chargingMethod || '--'
            }}</span>
          </template>
          <template #receivableAmountCell="{ record }">
            <span
              :class="{
                'warn-color':
                  processWarnColor(record) &&
                  record.receivableAmountTotal == null
              }"
            >
              {{
                processPrice(
                  record,
                  record.receivableAmountTotal != null
                    ? 'receivableAmountTotal'
                    : 'receivableAmount'
                )
              }}
            </span>
          </template>
          <template #actualAmountCell="{ record }">
            <span
              :class="{
                'warn-color':
                  processWarnColor(record) && record.actualAmountTotal == null
              }"
            >
              {{
                processPrice(
                  record,
                  record.actualAmountTotal != null
                    ? 'actualAmountTotal'
                    : 'actualAmount'
                )
              }}
            </span>
          </template>
          <template #arrearsAmountCell="{ record }">
            <span
              :class="{
                'warn-color':
                  processWarnColor(record) && record.arrearsAmountTotal == null
              }"
            >
              {{
                processPrice(
                  record,
                  record.arrearsAmountTotal != null
                    ? 'arrearsAmountTotal'
                    : 'arrearsAmount'
                )
              }}
            </span>
          </template>
          <template #menu="{ record }">
            <a-button
              type="text"
              :disabled="
                record.arrearsAmount <= 0 || record.arrearsAmountTotal <= 0
              "
              @click="handlePay(record)"
            >
              收款
            </a-button>
          </template>
        </i-table>
      </a-card>
      <a-card class="a-card--har" :title="isDetail ? '销售返款' : '应付费用'">
        <i-table :data="backFeeList" :options="tableConfig2">
          <template #indexCell="{ record, index }">
            <div v-if="record.receivableAmountTotal != null" class="text-center"
              >合计</div
            >
            <div v-else class="text-center">{{ index }}</div>
          </template>
          <template #expenseItemsNameCell="{ record }">
            <span :class="{ 'warn-color': processWarnColor(record) }">{{
              record.expenseItemsName
            }}</span>
          </template>
          <template #salesAmountCell="{ record }">
            <span
              :class="{
                'warn-color':
                  processWarnColor(record) && record.salesAmountTotal == null
              }"
              >{{
                processPrice(
                  record,
                  record.salesAmountTotal != null
                    ? 'salesAmountTotal'
                    : 'salesAmount'
                )
              }}
            </span>
          </template>
          <template #transferAmountCell="{ record }">
            <span
              :class="{
                'warn-color':
                  processWarnColor(record) && record.transferAmountTotal == null
              }"
              >{{
                processPrice(
                  record,
                  record.transferAmountTotal != null
                    ? 'transferAmountTotal'
                    : 'transferAmount'
                )
              }}</span
            ></template
          >
          <template #receivableAmountCell="{ record }">
            <span
              :class="{
                'warn-color':
                  processWarnColor(record) &&
                  record.receivableAmountTotal == null
              }"
              >{{
                processPrice(
                  record,
                  record.receivableAmountTotal != null
                    ? 'receivableAmountTotal'
                    : 'receivableAmount'
                )
              }}</span
            ></template
          >
          <template #actualAmountCell="{ record }">
            <span
              :class="{
                'warn-color':
                  processWarnColor(record) && record.actualAmountTotal == null
              }"
              >{{
                processPrice(
                  record,
                  record.actualAmountTotal != null
                    ? 'actualAmountTotal'
                    : 'actualAmount'
                )
              }}</span
            ></template
          >
          <template #arrearsAmountCell="{ record }">
            <span
              :class="{
                'warn-color':
                  processWarnColor(record) && record.arrearsAmountTotal == null
              }"
              >{{
                processPrice(
                  record,
                  record.arrearsAmountTotal != null
                    ? 'arrearsAmountTotal'
                    : 'arrearsAmount'
                )
              }}
            </span></template
          >
          <template #menu="{ record }">
            <a-button
              type="text"
              :disabled="
                record.arrearsAmount <= 0 || record.arrearsAmountTotal <= 0
              "
              @click="handlePay(record)"
            >
              付款
            </a-button>
          </template>
        </i-table>
      </a-card>

      <a-card class="a-card--har" title="存款费用">
        <i-table :data="depositFeeList" :options="tableConfig3">
          <template #indexCell="{ record, index }">
            <div v-if="record.receivableAmountTotal != null" class="text-center"
              >合计</div
            >
            <div v-else class="text-center">{{ index }}</div>
          </template>
          <template #expenseItemNameCell="{ record }">
            <span
              :class="{
                'warn-color': processWarnColor(record)
              }"
              >{{ record.expenseItemName }}</span
            >
          </template>
          <template #receivableAmountCell="{ record }">
            <span
              :class="{
                'warn-color':
                  processWarnColor(record) &&
                  record.receivableAmountTotal == null
              }"
              >{{
                processPrice(
                  record,
                  record.receivableAmountTotal != null
                    ? 'receivableAmountTotal'
                    : 'receivableAmount'
                )
              }}</span
            >
          </template>
          <template #actualAmountCell="{ record }">
            <span
              :class="{
                'warn-color':
                  processWarnColor(record) && record.actualAmountTotal == null
              }"
              >{{
                processPrice(
                  record,
                  record.actualAmountTotal != null
                    ? 'actualAmountTotal'
                    : 'actualAmount'
                )
              }}</span
            >
          </template>
          <template #arrearsAmountCell="{ record }">
            <span
              :class="{
                'warn-color':
                  processWarnColor(record) && record.arrearsAmountTotal == null
              }"
            >
              {{
                processPrice(
                  record,
                  record.arrearsAmountTotal != null
                    ? 'arrearsAmountTotal'
                    : 'arrearsAmount'
                )
              }}
            </span></template
          >
          <template #menu="{ record }">
            <a-button
              :disabled="
                record.arrearsAmount <= 0 || record.arrearsAmountTotal <= 0
              "
              type="text"
              @click="handleRestore(record)"
            >
              归还
            </a-button>
          </template>
        </i-table>
      </a-card>
    </template>

    <template v-else-if="tabActiveKey === 2">
      <a-card
        class="a-card--har"
        style="width: 100%; margin-bottom: 16px"
        title="清算单号"
      >
        {{ formModel.code }}
      </a-card>
      <examine-detail :process-list="processList" :xml-data="xmlData" />
    </template>

    <batch-collect-pay
      v-if="showBatchCP"
      v-model="showBatchCP"
      disabled-select
      :data="selectBills"
    />

    <ServeDrawer
      v-model:show-drawer="showDrawer"
      title="归还"
      :can-choose-project="false"
      :handle-type="1"
      :record-type="1"
    />
  </a-form>
</template>

<script setup lang="ts">
  import {
    ref,
    toRef,
    watch,
    computed,
    reactive,
    PropType,
    onMounted,
    defineProps,
    defineExpose
  } from 'vue';
  import { cloneDeep } from 'lodash';

  import {
    cbdApiProjectPageApprovalInfoGet,
    cbdApiProjectContractClearBillQueryPost,
    cbdApiProjectMisBillAddCollectionPost,
    CbdApiProjectMisBillAddCollectionPostResponse,
    cbdApiProjectContractClearBillDetailGet
  } from '@/api';
  import { formatPrice } from '@/utils';
  import { useForm } from '@/hooks/use-form';
  import { BillInfoResp } from '../../interface';
  import ITable from '@/components/i-table/index.vue';
  import ISelect from '@/components/i-select/index.vue';
  import { SelectOptions } from '@/components/i-select/interface';
  import useOptions from '@/views/contract-clear-bill/use-options';
  import useFetchContractDict from '@/hooks/use-fetch-contract-dict';
  import ExamineDetail from '@/views/homePage/_components_/examine-detail.vue';
  import ServeDrawer from '@/views/finance-manage/deposit/_components_/serve-drawer.vue';
  import BatchCollectPay from '@/views/finance-manage/collect-pay/__components__/addPage.vue';
  import { useDepositStore } from '@/store/project/deposit';

  const props = defineProps({
    data: {
      type: Object as PropType<BillInfoResp>,
      default: () => ({})
    },
    // ADD = '新增', EDIT = '修改'
    type: {
      type: String as PropType<'ADD' | 'EDIT' | 'DETAIL'>,
      default: 'ADD'
    },
    visible: Boolean
  });
  const emits = defineEmits(['success']);
  const {
    formRef,
    formModel,
    formRules,

    // 以下对外暴露的方法
    validate,
    validateField,
    setFields,
    resetFields,
    getFormModel,
    setFormModel,
    clearValidate,
    getReactiveFormModel
  } = useForm(new BillInfoResp(), {
    visible: toRef(props, 'visible'),
    watchFormModel: toRef(props, 'data')
  });

  const span = ref(6);
  const showBatchCP = ref(false);
  const showDrawer = ref(false);
  const { options } = useOptions();
  const xmlData = ref('');
  const processList = ref<Recordable[]>([]);
  const tabActiveKey = ref<number | string>(1);
  const isDetail = computed(
    () => props.type === 'DETAIL' || props.data.without
  );
  const selectBills = ref<CbdApiProjectMisBillAddCollectionPostResponse>([]);
  const { setCostInfo } = useDepositStore();

  const {
    fetchProjectData,
    fetchMerchantData,
    fetchStoreData,
    fetchContractCodeData
  } = useFetchContractDict(formModel, options, { allowEmptyQuery: false });
  const receivableFeeList = computed(() => {
    const feeList = [
      ...(formModel.value.receivableFeeList as Array<Recordable>)
    ];
    if (feeList.length > 0) {
      const totalMap = feeList.reduce(
        (totalMap: Recordable, item: Recordable) => {
          totalMap.receivableAmountTotal += item.receivableAmount;
          totalMap.actualAmountTotal += item.actualAmount;
          totalMap.arrearsAmountTotal += item.arrearsAmount;
          totalMap.billIdList = [...totalMap.billIdList, ...item.billIdList];
          totalMap.isAdopt = true;
          return totalMap;
        },
        {
          receivableAmountTotal: 0,
          actualAmountTotal: 0,
          arrearsAmountTotal: 0,
          billIdList: []
        }
      );
      feeList.push(totalMap);
    }

    return feeList;
  });
  const backFeeList = computed(() => {
    const feeList = [...(formModel.value.backFeeList as Array<Recordable>)];
    if (feeList.length > 0) {
      const totalMap = feeList.reduce(
        (totalMap: Recordable, item: Recordable) => {
          totalMap.salesAmountTotal += item.salesAmount;
          totalMap.transferAmountTotal += item.transferAmount;
          totalMap.receivableAmountTotal += item.receivableAmount;
          totalMap.actualAmountTotal += item.actualAmount;
          totalMap.arrearsAmountTotal += item.arrearsAmount;
          totalMap.billIdList = [...totalMap.billIdList, ...item.billIdList];
          totalMap.isAdopt = true;
          return totalMap;
        },
        {
          salesAmountTotal: 0,
          transferAmountTotal: 0,
          receivableAmountTotal: 0,
          actualAmountTotal: 0,
          arrearsAmountTotal: 0,
          billIdList: []
        }
      );
      feeList.push(totalMap);
    }
    return feeList;
  });
  const depositFeeList = computed(() => {
    const feeList = [...(formModel.value.depositFeeList as Array<Recordable>)];
    if (feeList.length > 0) {
      const totalMap = feeList.reduce(
        (totalMap: Recordable, item: Recordable) => {
          item.costInfo = cloneDeep(formModel.value);
          item.costInfo.constProjectList = [cloneDeep(item)];

          totalMap.receivableAmountTotal += item.receivableAmount;
          totalMap.actualAmountTotal += item.actualAmount;
          totalMap.arrearsAmountTotal += item.arrearsAmount;
          totalMap.isAdopt = true;
          return totalMap;
        },
        {
          receivableAmountTotal: 0,
          actualAmountTotal: 0,
          arrearsAmountTotal: 0
        }
      );
      feeList.push(totalMap);
    }
    return feeList;
  });

  const tableConfig1 = reactive({
    tableCard: false,
    index: true,
    pageShow: false,
    menuOptions: { width: 80 },
    columns: [
      {
        label: '费用项目',
        prop: 'expenseItemsName'
      },
      {
        label: '收费方式',
        prop: 'chargingMethod'
      },
      {
        label: '应收金额',
        prop: 'receivableAmount'
      },
      {
        label: '实收金额',
        prop: 'actualAmount'
      },
      {
        label: '欠缴金额',
        prop: 'arrearsAmount'
      }
    ],
    menuOtherOptions: {
      spanMethod(params: Recordable) {
        const { columnIndex, record } = params;
        if (columnIndex === 0 && record.receivableAmountTotal != null) {
          return {
            colspan: 3
          };
        }
      }
    }
  });
  const tableConfig2 = reactive({
    tableCard: false,
    index: true,
    pageShow: false,
    menuOptions: { width: 80 },
    columns: [
      {
        label: '费用项目',
        prop: 'expenseItemsName'
      },
      {
        label: '销售额',
        prop: 'salesAmount'
      },
      {
        label: '转预付款金额',
        prop: 'transferAmount'
      },
      {
        label: '应付金额',
        prop: 'receivableAmount'
      },
      {
        label: '已付金额',
        prop: 'actualAmount'
      },
      {
        label: '未付金额',
        prop: 'arrearsAmount'
      }
    ],
    menuOtherOptions: {
      spanMethod(params: Recordable) {
        const { columnIndex, record } = params;
        if (columnIndex === 0 && record.receivableAmountTotal != null) {
          return {
            colspan: 2
          };
        }
      }
    }
  });
  const tableConfig3 = reactive({
    index: true,
    pageShow: false,
    tableCard: false,
    menuOptions: { width: 80 },
    columns: [
      {
        label: '费用项目',
        prop: 'expenseItemName'
      },
      {
        label: '实收金额',
        prop: 'receivableAmount'
      },
      {
        label: '已处理金额',
        prop: 'actualAmount'
      },
      {
        label: '可处理余额',
        prop: 'arrearsAmount'
      }
    ],
    menuOtherOptions: {
      spanMethod(params: Recordable) {
        const { columnIndex, record } = params;
        if (columnIndex === 0 && record.receivableAmountTotal != null) {
          return {
            colspan: 2
          };
        }
      }
    }
  });

  watch(
    () => props.visible,
    (val) => {
      if (val) {
        fetchDetail();
      } else {
        formModel.value = new BillInfoResp();
      }
    }
  );
  watch(
    () => showDrawer.value,
    (val) => {
      emits('success');
      !val && fetchDetail();
    }
  );
  watch(
    () => showBatchCP.value,
    (val) => {
      emits('success');
      !val && fetchDetail();
    }
  );

  function fetchDetail() {
    // 通过合同ID查询详情
    if (props.data?.without) {
      fetchProjectContractClearBillDetail();
    } else {
      fetchProjectContractClearBill();
    }
  }

  function handleChangeProject() {
    fetchMerchantData();
    fetchStoreData();
    fetchContractCodeData();
  }

  function handleChangeMerchant() {
    fetchStoreData();
    fetchContractCodeData();
  }

  function handleChangeStore() {
    fetchContractCodeData();
  }

  function handleChangeContractCode() {
    const contractId = formModel.value.contractCode;
    const contractCodeRow = options.value.contractCode.find(
      (itm: SelectOptions[number]) => itm.value === contractId
    );
    formModel.value.contractId = (contractId as unknown as number) ?? '';
    formModel.value.brandName = contractCodeRow?.brandName ?? '';
    formModel.value.doorPlates = contractCodeRow?.doorPlates ?? [];
    formModel.value.leaseStartDate = contractCodeRow?.leaseStartDate ?? '';
    formModel.value.leaseEndDate = contractCodeRow?.leaseEndDate ?? '';
    if (!contractId) return;
    cbdApiProjectContractClearBillDetailGet({
      contractId: formModel.value.contractId as any
    }).then((res) => {
      formModel.value = res as unknown as BillInfoResp;
    });
  }

  function processPrice(row: Recordable, key: string, emptyText = '--') {
    if (row[key] != null) {
      return formatPrice(row[key]);
    }
    return emptyText;
  }

  function fetchProjectContractClearBill() {
    const val = props.data.contractId;
    if (!val) return false;
    if (props.type === 'ADD') {
      const emptyValue = !val || val === -1;
      if (emptyValue) {
        formModel.value.receivableFeeList = [];
        formModel.value.backFeeList = [];
        formModel.value.depositFeeList = [];
        return;
      }
      cbdApiProjectContractClearBillQueryPost({
        contractId: val
      }).then((res) => {
        formModel.value.receivableFeeList =
          res.receivableFeeList as BillInfoResp['receivableFeeList'];
        formModel.value.backFeeList =
          res.backFeeList as BillInfoResp['backFeeList'];
        formModel.value.depositFeeList =
          res.depositFeeList as BillInfoResp['depositFeeList'];
      });
    } else {
      fetchFlowableEngineData(formModel.value.flowProcessId);
    }
  }

  function fetchProjectContractClearBillDetail() {
    if (!props.data.contractId) return;
    cbdApiProjectContractClearBillDetailGet({
      contractId: props.data.contractId as unknown as string
    }).then((res) => {
      formModel.value = res as unknown as BillInfoResp;
    });
  }

  async function fetchFlowableEngineData(flowProcessId: string) {
    if (!flowProcessId) {
      processList.value = [];
      xmlData.value = '';
      return;
    }
    const d = await cbdApiProjectPageApprovalInfoGet({
      procInsId: flowProcessId
    });
    processList.value = d.historyInstanceInfoList || [];
    xmlData.value = d.nodeImg || '';
  }

  async function handlePay(row: Recordable) {
    const res = await cbdApiProjectMisBillAddCollectionPost({
      idList: (Array.isArray(row.billIdList)
        ? row.billIdList
        : typeof row.billIdList === 'string'
        ? row.billIdList.split(',')
        : []
      ).filter(Boolean)
    });
    showBatchCP.value = true;
    selectBills.value = res;
  }

  function handleRestore(record: Recordable) {
    let costInfo = cloneDeep(record.costInfo);
    // 批量操作
    if (record.receivableAmountTotal != null) {
      costInfo = cloneDeep(formModel.value) as Recordable;
      costInfo.constProjectList = depositFeeList.value.filter(
        (itm) => itm.receivableAmountTotal == null
      );
    }
    costInfo.constProjectList = costInfo.constProjectList.map(
      (itm: Recordable) => {
        itm = { ...itm };
        // 已收
        itm.receivedAmount = itm.receivableAmount;
        // 已处理金额
        itm.processedAmount = itm.actualAmount;
        // 可处理金额
        itm.availableAmount = itm.arrearsAmount;
        return itm;
      }
    );
    setCostInfo(costInfo as any);
    showDrawer.value = true;
  }

  function processWarnColor(record: Recordable) {
    return record && (record.arrearsAmount > 0 || !record.isAdopt);
  }

  onMounted(() => {
    fetchProjectData();
  });

  defineExpose({
    validate,
    validateField,
    setFields,
    resetFields,
    getFormModel,
    setFormModel,
    clearValidate,
    getReactiveFormModel
  });
</script>

<style lang="less" scoped>
  :v-deep(.space-box) {
    background: #f7f7f7;
  }
  :v-deep(.model-content) {
    background: #f7f7f7;
  }
  :v-deep(.model-box) > .title {
    color: #333;
  }
  .warn-color {
    color: red;
  }
</style>
