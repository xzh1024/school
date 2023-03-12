<template>
  <drawer
    v-model="visible"
    :title="isEdit ? '编辑' : '查看'"
    no-padding
    show-log
    :mask-close="false"
    :log-options="{
      modeId: props.id,
      logUrl: cbdApiProjectSysOptPageOptListPost,
      mode: 'cbd_invest_expenses'
    }"
    @cancel="visible = false"
  >
    <a-tabs
      v-model="active"
      default-active-key="1"
      style="width: 100%; height: 100%; background-color: #fff"
    >
      <a-tab-pane key="1" title="账单信息">
        <div class="i-card" style="width: 100%">
          <div class="block-title">基础信息</div>
          <a-descriptions
            layout="vertical"
            style="width: 100%; padding-bottom: 16px"
            :column="4"
          >
            <a-descriptions-item label="归属项目：">{{
              data.basicInfo.projectName
            }}</a-descriptions-item>
            <a-descriptions-item label="计划名称：">{{
              data.basicInfo.planName
            }}</a-descriptions-item>
            <a-descriptions-item label="渠道名称：">{{
              data.basicInfo.channelName
            }}</a-descriptions-item>
            <a-descriptions-item label="奖励措施：">{{
              valueFindLabel(calculateTypeList, data.basicInfo.settleMode)
            }}</a-descriptions-item>
            <a-descriptions-item label="比例：">{{
              data.basicInfo.paymentMethod
            }}</a-descriptions-item>
            <a-descriptions-item label="账单生成日期：">{{
              data.basicInfo.billGenDate
            }}</a-descriptions-item>
            <a-descriptions-item label="合同号：">{{
              data.basicInfo.contractCode
            }}</a-descriptions-item>
          </a-descriptions>
        </div>
        <div class="i-card">
          <div class="block-title">原始账单</div>
          <a-descriptions
            style="width: 100%"
            :column="5"
            layout="vertical"
            bordered
          >
            <a-descriptions-item label="费用项目：">
              {{ valueFindLabel(attractBillTypeList, data.originalBill.type) }}
            </a-descriptions-item>
            <a-descriptions-item label="计算方式：">
              {{
                valueFindLabel(calculateTypeList, data.originalBill.settleMode)
              }}
            </a-descriptions-item>
            <a-descriptions-item label="比例：">
              {{ data.originalBill.paymentMethod || '--' }}
            </a-descriptions-item>
            <a-descriptions-item label="账单生成日期：">{{
              data.originalBill.billGenDate || '--'
            }}</a-descriptions-item>
            <a-descriptions-item label="账期：">
              {{ data.originalBill.period || '--' }}
            </a-descriptions-item>
            <a-descriptions-item label="金额：">{{
              formatPrice(data.originalBill.amount)
            }}</a-descriptions-item>
            <a-descriptions-item label="税率：">{{
              data.originalBill.taxRate ? data.originalBill.taxRate + '%' : '--'
            }}</a-descriptions-item>
            <a-descriptions-item label="不含税金额：">
              {{ formatPrice(data.originalBill.taxExcludedAmount) }}
            </a-descriptions-item>
            <a-descriptions-item label="税额：">
              {{ formatPrice(data.originalBill.taxAmount) }}
            </a-descriptions-item>
            <a-descriptions-item label="总金额：">
              {{ formatPrice(data.originalBill.totalAmount) }}
            </a-descriptions-item>
          </a-descriptions>
        </div>
        <div class="i-card">
          <i-table ref="TableData" :options="options" :data="tableList">
            <template #header>
              <div class="flex justify-between align-center">
                <div class="block-title">账单调整</div>
                <a-button
                  v-if="
                    isEdit &&
                    data.businessStatus !== 3 &&
                    data.verifyStatus !== 2
                  "
                  type="primary"
                  @click="onAddOne"
                  >添加行</a-button
                >
              </div>
            </template>
            <template #typeCell="{ record }">
              {{ record.type === 1 ? '招商费' : '' }}
            </template>
            <template #afterAmountCell="{ record, rowIndex }">
              <a-input-number
                v-model="record.afterAmount"
                :min="0"
                :precision="2"
                :disabled="!isEdit || record.history === 1"
                @blur="onBlur(record.afterAmount, rowIndex)"
              ></a-input-number>
            </template>
            <template #taxAmountCell="{ record }">
              {{ formatPrice(record.taxAmount) }}
            </template>
            <template #totalAmountCell="{ record }">
              {{ formatPrice(record.totalAmount) }}
            </template>
            <template #remarkCell="{ record }">
              <a-textarea
                v-model="record.remark"
                :disabled="!isEdit || record.history === 1"
              ></a-textarea>
            </template>
            <template #menuCell="{ record, rowIndex }">
              <a-popconfirm
                v-if="record.history !== 1"
                content="数据删除后无法恢复，是否删除？"
                @ok="onDelete(record, rowIndex)"
              >
                <a-button type="text" status="danger">删除</a-button>
              </a-popconfirm>
            </template>
          </i-table>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" title="审批详情">
        <examine-detail :process-list="processList" :xml-data="XMLData" />
      </a-tab-pane>
    </a-tabs>
    <template v-if="active === '1'" #footer>
      <a-space v-if="isEdit">
        <a-button
          v-if="[1, 3, 4, 5].includes(data.verifyStatus)"
          v-permission="['invest:expenses:confirm']"
          type="primary"
          :loading="certainLoading"
          @click="onCertainClick"
          >确认</a-button
        >
        <a-button
          v-if="data.businessStatus !== 3 && data.verifyStatus !== 2"
          v-permission="['invest:expenses:save']"
          type="primary"
          :loading="saveLoading"
          @click="onSaveClick"
          >保存</a-button
        >
        <a-button @click="visible = false">返回</a-button>
      </a-space>
      <a-space v-else>
        <a-button
          v-if="!isEdit && data.businessStatus !== 3 && data.verifyStatus !== 2"
          type="primary"
          @click="onEdit"
          >账单调整</a-button
        >
        <a-popconfirm
          v-if="data.verifyStatus === 2"
          v-permission="['invest:plan:revoke']"
          content="数据审批中,确认要撤销审批吗"
          @ok="onRevoke({ id: String(props.id) })"
        >
          <a-button status="danger">撤销</a-button>
        </a-popconfirm>
        <a-button @click="visible = false">返回</a-button>
      </a-space>
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, Ref, watch, onMounted } from 'vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import Drawer from '@/components/drawer/drawer.vue';
  import ITable from '@/components/i-table/index.vue';
  import ExamineDetail from '@/views/homePage/_components_/examine-detail.vue';
  import {
    cbdApiProjectInvestExpensesConfirmPost,
    cbdApiProjectInvestExpensesInfoGet,
    type CbdApiProjectInvestExpensesInfoGetResponse,
    cbdApiProjectInvestExpensesRevokeIdDelete,
    cbdApiProjectInvestExpensesSavePost,
    cbdApiProjectPageApprovalInfoGet,
    cbdApiProjectSysOptPageOptListPost
  } from '@/api';
  import { useRequest } from '@har/use';
  import { calculateTypeList, attractBillTypeList } from '@/utils/dic';
  import { valueFindLabel, formatPrice } from '@/utils';
  import { Modal } from '@arco-design/web-vue';
  import NP from 'number-precision';
  type Detail = CbdApiProjectInvestExpensesInfoGetResponse;
  type RowData = {
    type: number;
    beforeAmount: number;
    afterAmount: number;
    adjustAmount: number;
    taxAmount: number;
    totalAmount: number;
    remark?: string;
    history: number;
  };

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue', 'update:isEdit', 'refresh']);
  const TableData: Ref = ref(null);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const isEdit = computed({
    get() {
      return props.isEdit;
    },
    set(v) {
      emits('update:isEdit', v);
    }
  });
  const data = ref<Detail>({
    id: 0,
    basicInfo: {},
    originalBill: {},
    expensesAdjust: []
  } as unknown as Detail);
  const active = ref('1');
  const options = computed(() => {
    return {
      tableCard: false,
      pageShow: false,
      menu: false,
      index: true,
      indexTitle: '序号',
      columns: [
        {
          label: '费用项目',
          prop: 'type',
          width: 100
        },
        {
          label: '可调整金额',
          prop: 'beforeAmount',
          width: 140
        },
        {
          label: '调整后金额',
          prop: 'afterAmount',
          width: 140
        },
        {
          label: '调整金额',
          prop: 'adjustAmount',
          width: 100
        },
        {
          label: '税额',
          prop: 'taxAmount',
          width: 100
        },
        {
          label: '总金额',
          prop: 'totalAmount',
          width: 100
        },
        {
          label: '备注',
          prop: 'remark',
          width: 100
        },
        {
          label: '操作',
          prop: 'menu',
          width: 100,
          hide:
            !isEdit.value ||
            data.value.businessStatus === 3 ||
            data.value.verifyStatus === 2,
          fixed: 'right'
        }
      ]
    };
  });
  const onEdit = () => {
    isEdit.value = true;
  };
  const tableList = ref<RowData[]>([]);
  const onAddOne = () => {
    const last = tableList.value[tableList.value.length - 1];
    const base = data.value.originalBill;
    if (!last) {
      // 第一条
      tableList.value.push({
        type: base.type!,
        beforeAmount: base.taxExcludedAmount,
        afterAmount: 0,
        adjustAmount: 0,
        taxAmount: 0,
        totalAmount: 0,
        remark: '',
        history: 0
      });
    } else {
      tableList.value.push({
        type: last.type,
        beforeAmount: last.afterAmount,
        afterAmount: 0,
        adjustAmount: 0,
        taxAmount: 0,
        totalAmount: 0,
        remark: '',
        history: 0
      });
    }
  };
  const onDelete = (record: RowData, idx: number) => {
    const hasNext = !!tableList.value[idx + 1];
    tableList.value.splice(idx, 1);
    if (hasNext) {
      const current = tableList.value[idx];
      tableList.value[idx].beforeAmount = tableList.value[idx - 1].afterAmount;
      current.adjustAmount = NP.minus(
        current.afterAmount,
        current.beforeAmount
      );
      current.taxAmount = NP.times(
        current.afterAmount,
        data.value.originalBill.taxRate / 100
      );
    }
  };
  const onBlur = (a: number, idx: number) => {
    if (tableList.value[idx + 1]) {
      // 下一行可调整
      tableList.value[idx + 1].beforeAmount = a;
    }
    const current = tableList.value[idx];
    current.adjustAmount = NP.minus(a, current.beforeAmount);
    current.taxAmount = NP.times(a, data.value.originalBill.taxRate / 100);
    current.totalAmount = NP.plus(a, current.taxAmount);
  };
  const [getDetailData] = useFuncProxy(async () => {
    data.value = await cbdApiProjectInvestExpensesInfoGet({
      id: props.id
    });
    tableList.value = data.value.expensesAdjust || [];
  });
  const onCertainClick = () => {
    Modal.open({
      title: '警告',
      content: '数据将重新审批, 确定要提交审批吗',
      onOk: () => {
        handleCertain({
          id: Number(props.id),
          expensesAdjust: tableList.value.filter(
            (el: RowData) => el.history === 0
          )
        });
      }
    });
  };

  const { run: onRevoke } = useRequest(
    cbdApiProjectInvestExpensesRevokeIdDelete,
    {
      manual: true,
      onSuccess() {
        visible.value = false;
        emits('refresh');
      }
    }
  );
  const { run: handleCertain, loading: certainLoading } = useRequest(
    cbdApiProjectInvestExpensesConfirmPost,
    {
      manual: true,
      onSuccess() {
        isEdit.value = false;
        visible.value = false;
        emits('refresh');
      }
    }
  );
  const { run: handleSave, loading: saveLoading } = useRequest(
    cbdApiProjectInvestExpensesSavePost,
    {
      manual: true,
      onSuccess() {
        visible.value = false;
        isEdit.value = false;
        emits('refresh');
      }
    }
  );
  const onSaveClick = () => {
    handleSave({
      id: Number(props.id),
      expensesAdjust: tableList.value.filter((el: RowData) => el.history === 0)
    });
  };
  const XMLData = ref('');
  const processList = ref<any>([]);
  //流程引擎详情接口
  const { run: getApprovalInfoEngine } = useRequest(
    cbdApiProjectPageApprovalInfoGet,
    {
      manual: true,
      onSuccess(res) {
        processList.value = res?.historyInstanceInfoList;
        XMLData.value = res?.nodeImg || '';
      }
    }
  );
  onMounted(async () => {
    if (props.id) {
      await getDetailData();
      await getApprovalInfoEngine({
        procInsId: data.value.flowProcessId || ''
      });
    }
  });
  watch(
    () => props.refresh,
    async () => {
      if (props.id) {
        await getDetailData();
        await getApprovalInfoEngine({
          procInsId: data.value.flowProcessId || ''
        });
      }
    }
  );
</script>
<style scoped lang="less">
  .i-card {
    margin-bottom: 16px;
    padding-top: 0;
  }
  :deep(.arco-tabs-pane) {
    max-height: 80vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  :deep(.arco-card-actions) {
    margin-top: 0;
  }
  :deep(.arco-tabs-content) {
    padding: 12px 16px;
    background-color: #efefef;
  }
  :deep(.arco-tabs-nav-tab-list) {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
</style>
