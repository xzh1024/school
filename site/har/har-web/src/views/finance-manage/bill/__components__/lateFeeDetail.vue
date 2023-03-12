<template>
  <drawer
    v-model="visible"
    title="查看"
    show-log
    no-padding
    @cancel="visible = false"
  >
    <!--    <div class="orderNo">{{ data.billNum || '&#45;&#45;' }}</div>-->
    <a-tabs
      v-model="active"
      default-active-key="1"
      style="width: 100%; height: 100%; background-color: #fff"
    >
      <a-tab-pane key="1" title="账单信息" style="height: 100%">
        <div style="overflow-y: scroll">
          <div class="i-card">
            <a-descriptions
              layout="vertical"
              :value-style="{ color: '#333333', fontSize: '16px' }"
            >
              <a-descriptions-item label="账单编号：">
                {{ data.billNum || '--' }}
              </a-descriptions-item>
            </a-descriptions>
          </div>
          <div class="i-card" style="width: 100%">
            <a-descriptions
              title="基础信息"
              layout="vertical"
              style="width: 100%; padding-bottom: 16px"
              :column="4"
            >
              <a-descriptions-item label="归属项目：">{{
                data.projectName || '--'
              }}</a-descriptions-item>
              <a-descriptions-item label="商户名称：">
                {{ data.merchantName || '--' }}</a-descriptions-item
              >
              <a-descriptions-item label="店铺名称：">{{
                data.storeName || '--'
              }}</a-descriptions-item>
              <a-descriptions-item label="合同号：">{{
                data.contractCode || '--'
              }}</a-descriptions-item>
              <a-descriptions-item label="账单类型：">{{
                valueFindLabel(billTypeList, data.billType)
              }}</a-descriptions-item>
              <a-descriptions-item label="审批状态：">{{
                valueFindLabel(examine_status, data.auditStat)
              }}</a-descriptions-item>
              <a-descriptions-item label="支付状态：">{{
                valueFindLabel(business_status, data.businessStat)
              }}</a-descriptions-item>
            </a-descriptions>
          </div>
          <div class="i-card">
            <a-descriptions
              style="width: 100%"
              title="原始账单"
              :column="5"
              layout="vertical"
              bordered
            >
              <a-descriptions-item label="费用项目：">{{
                data.expenseItemsName || '--'
              }}</a-descriptions-item>
              <a-descriptions-item label="原费用项目：">
                {{ data.originExpenseItemsName || '--' }}
              </a-descriptions-item>
              <a-descriptions-item label="本次收款金额：">{{
                formatPrice(data.thisTimeCollection)
              }}</a-descriptions-item>
              <a-descriptions-item label="滞纳金区间：">{{
                data.overdueFinePeriod || '--'
              }}</a-descriptions-item>
              <a-descriptions-item label="滞纳金方式：">
                {{ data.unitAmount }}
              </a-descriptions-item>
              <a-descriptions-item label="滞纳金金额：">{{
                formatPrice(data.overdueFineAmount)
              }}</a-descriptions-item>
              <a-descriptions-item label="税率：">{{
                (Number(data.taxRate || 0).toFixed(2) || 0) + '%'
              }}</a-descriptions-item>
              <a-descriptions-item label="不含税金额：">
                {{ formatPrice(data.taxExclusiveAmount || '') }}
              </a-descriptions-item>
              <a-descriptions-item label="税额：">
                {{ formatPrice(data.taxAmount || '') }}
              </a-descriptions-item>
              <a-descriptions-item
                :label="data.billType === 1 ? '应收金额：' : '应付金额：'"
              >
                {{ formatPrice(data.receivableAmount || '') }}
              </a-descriptions-item>
            </a-descriptions>
          </div>
          <div class="i-card">
            <i-table :options="billOptions" :data="data.billAdjustableDetails">
              <template #header>
                <div style="font-size: 16px">账单调整</div>
              </template>
              <template #changeAmountCell="scope">
                <a-input-group>
                  <a-select
                    v-model="scope.record.changeType"
                    :options="changeTypeList"
                    placeholder="请选择"
                    disabled
                  />
                  <a-input v-model="scope.record.changeAmount" disabled />
                </a-input-group>
              </template>
            </i-table>
          </div>
          <div v-if="isCollect" class="i-card">
            <i-table :options="collectOptions" :data="data.paymentBillModel">
              <template #header>
                <div style="font-size: 16px">收款记录</div>
              </template>
              <template #optionCell="{ record }">
                <a-button
                  :disabled="disabled"
                  type="text"
                  @click="onShowCP(record.id)"
                  >查看</a-button
                >
              </template>
            </i-table>
          </div>
          <div class="i-card">
            <i-table
              :options="refundOptions"
              :data="data.paymentRefundBillModel"
            >
              <template #header>
                <div style="font-size: 16px">退款记录</div>
              </template>
              <template #optionCell="{ record }">
                <a-button
                  :disabled="disabled"
                  type="text"
                  @click="onShowRefund(record)"
                  >查看</a-button
                >
              </template>
            </i-table>
          </div>
          <template v-if="isCollect">
            <div class="i-card">
              <i-table :options="receiptOptions" :data="data.invoiceList">
                <template #header>
                  <div style="font-size: 16px">发票记录</div>
                </template>
                <template #typeCell="{ record }">
                  {{ valueFindLabel(invoiceTypeList, record.type) || '--' }}
                </template>
              </i-table>
            </div>
            <div class="i-card">
              <a-descriptions
                :column="4"
                layout="vertical"
                table-layout="fixed"
              >
                <a-descriptions-item
                  :label="data.billType === 1 ? '应收金额：' : '应付金额：'"
                  >{{ formatPrice(data.initReceivableAmount || '') }}
                </a-descriptions-item>
                <a-descriptions-item
                  v-if="data.billType === 1"
                  label="抵扣金额："
                >
                  {{ formatPrice(data.deductionAmount || '') }}
                </a-descriptions-item>
                <a-descriptions-item
                  :label="data.billType === 1 ? '已收金额：' : '已付金额：'"
                >
                  {{ hasCollectExcludeDiscount }}
                </a-descriptions-item>
                <a-descriptions-item
                  :label="data.billType === 1 ? '未收金额：' : '未付金额：'"
                >
                  {{ formatPrice(data.amountNotReceived || '') }}
                </a-descriptions-item>
              </a-descriptions>
            </div>
          </template>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" title="审批详情">
        <div class="i-card">
          <a-descriptions
            layout="vertical"
            :value-style="{ color: '#333333', fontSize: '16px' }"
          >
            <a-descriptions-item label="账单编号：">
              {{ data.billNum || '--' }}
            </a-descriptions-item>
          </a-descriptions>
        </div>
        <div class="exam-detail">
          <exam-title
            title="账单审批"
            :code="examCode"
            :status="status"
          ></exam-title>
          <examine-detail :process-list="processList" :xml-data="XMLData" />
        </div>
      </a-tab-pane>
    </a-tabs>
    <template v-if="!disabled" #footer>
      <a-button
        v-if="showEditBtn"
        v-permission="['formal:bill:adjustable']"
        type="primary"
        @click="update"
        >修改</a-button
      >
      <a-popconfirm
        v-if="showDelete"
        v-permission="['formal:bill:delete']"
        content="数据删除后无法恢复，是否删除？"
        @ok="onDelete({ id: String(props.id || '') })"
      >
        <a-button status="danger">删除</a-button>
      </a-popconfirm>
      <a-popconfirm
        v-if="showConfirmBtn"
        v-permission="['formal:bill:confirm']"
        content="确认提交审批吗？"
        @ok="onCertain({ idList: [Number(props.id)] })"
      >
        <a-button type="primary">确认审批</a-button>
      </a-popconfirm>
      <a-popconfirm
        v-if="data.auditStat === 2"
        v-permission="['formal:bill:cancelAudit']"
        content="确定撤销审批吗?"
        @ok="revokeExam({ billId: Number(props.id) })"
      >
        <a-button type="primary">撤销</a-button>
      </a-popconfirm>
      <a-popconfirm
        v-if="
          isCollect &&
          data.auditStat === 3 &&
          isArrIncludes([2, 4], data.businessStat)
        "
        content="确定发送嘛"
      >
        <a-button type="primary">发送催款单</a-button>
      </a-popconfirm>
      <a-popconfirm
        v-if="data.auditStat === 3 && data.businessStat === 2"
        v-permission="['formal:bill:doScrap']"
        content="数据已通过审批，是否作废？"
        @ok="abort"
      >
        <a-button type="primary">作废</a-button>
      </a-popconfirm>
      <a-button
        v-if="
          isCollect &&
          (data.businessStat === 2 || data.businessStat === 4) &&
          data.auditStat === 3
        "
        v-permission="['mis:payment:commit']"
        type="primary"
        @click="getBillInfo({ idList: [Number(props.id)] })"
        >收款</a-button
      >
      <a-button
        v-if="
          !isCollect &&
          isArrIncludes([2, 4], data.businessStat) &&
          data.auditStat === 3
        "
        v-permission="['mis:payment:commit']"
        type="primary"
        @click="getBillInfo({ idList: [Number(props.id)] })"
        >付款</a-button
      >
      <a-button @click="visible = false">返回</a-button>
      <a-button
        v-if="
          data.auditStat === 3 && isArrIncludes([2, 4, 5], data.businessStat)
        "
        v-permission="['formal:bill:print']"
        type="primary"
        @click="onPrint"
        >打印</a-button
      >
    </template>
    <template v-else #footer>
      <a-button @click="visible = false">返回</a-button>
    </template>
    <collect-pay-detail
      v-if="showDetail"
      :id="cpId"
      v-model="showDetail"
      disabled
    />
    <print v-if="showPrint" v-model="showPrint" :ids="ids" source="bill" />
    <add-page
      v-if="showAddPage"
      v-model="showAddPage"
      hide-select
      :data="selectBills"
    />
    <refund-detail
      v-if="showRefund"
      :id="Number(refundId)"
      v-model="showRefund"
    >
    </refund-detail>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import ExamineDetail from '@/views/homePage/_components_/examine-detail.vue';
  import ExamTitle from '@/components/exam-title/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import CollectPayDetail from '../../collect-pay/__components__/detail.vue';
  import RefundDetail from '../../collect-pay-refund/__components__/detail.vue';
  import AddPage from '../../collect-pay/__components__/addPage.vue';
  import Print from './print.vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message } from '@arco-design/web-vue';
  import {
    valueFindLabel,
    formatPrice,
    formatTime,
    isArrIncludes
  } from '@/utils';
  import { invoiceTypeList } from '@/utils/dic';
  import {
    cbdApiProjectMisBillAddCollectionPost,
    CbdApiProjectMisBillAddCollectionPostResponse,
    cbdApiProjectMisBillCancelAuditPost,
    cbdApiProjectMisBillConfirmPost,
    cbdApiProjectMisBillDeleteGet,
    cbdApiProjectMisBillDoScrapPost,
    cbdApiProjectMisBillViewGet,
    CbdApiProjectMisBillViewGetResponse,
    cbdApiProjectPageApprovalInfoGet
  } from '@/api';
  import {
    changeTypeList,
    chargingMethodList,
    business_status,
    billTypeList,
    examine_status
  } from '@/utils/dic';
  import { useRequest } from '@har/use';
  import NP from 'number-precision';
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue', 'update', 'refresh']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const showAddPage = ref(false);
  const showDetail = ref(false);
  const cpId = ref('');
  const onShowCP = (id: string) => {
    cpId.value = id;
    showDetail.value = true;
  };
  const hasCollectExcludeDiscount = computed(() => {
    const t = NP.minus(
      data.value.collectionAndPaymentAmount || 0,
      data.value.deductionAmount || 0
    );
    return formatPrice(t);
  });
  const isCollect = computed(() => {
    return data.value.billType === 1;
  });
  const active = ref('1');
  const update = () => {
    emits('update', props.id);
  };
  const billOptions = computed(() => {
    return {
      tableCard: false,
      pageShow: false,
      index: true,
      indexTitle: '序号',
      menu: false,
      columns: [
        {
          label: '原账单金额',
          prop: 'originalBillAmount',
          formatter: (e: Recordable) => formatPrice(e.originalBillAmount),
          width: 120
        },
        {
          label: '可调整金额',
          prop: 'adjustableAmount',
          formatter: (e: Recordable) => formatPrice(e.adjustableAmount),
          width: 120
        },
        {
          label: '调整金额',
          prop: 'changeAmount',
          formatter: (e: Recordable) => formatPrice(e.changeAmount),
          width: 120
        },
        {
          label: '调整税额',
          prop: 'afterAdjustableTaxAmount',
          formatter: (e: Recordable) => formatPrice(e.afterAdjustableTaxAmount),
          width: 120,
          hide: !isCollect.value
        },
        {
          label: isCollect.value ? '调整后应收金额' : '调整后应付金额',
          prop: 'afterShouldAmount',
          formatter: (e: Recordable) => formatPrice(e.afterShouldAmount),
          width: 150
        },
        {
          label: isCollect.value ? '调整后未收金额' : '调整后未付金额',
          prop: 'afterNotAmount',
          formatter: (e: Recordable) => formatPrice(e.afterNotAmount),
          width: 150
        },
        {
          label: '备注',
          prop: 'remarks',
          width: 150
        }
      ]
    };
  });
  const collectOptions = computed(() => {
    return {
      tableCard: false,
      pageShow: false,
      menu: false,
      columns: [
        {
          label: '收款单据号',
          prop: 'paymentNum',
          width: 120
        },
        {
          label: '费用项目',
          prop: 'expenseItemName',
          width: 120
        },
        {
          label: '收款金额',
          prop: 'amount',
          formatter: (e: Recordable) =>
            formatPrice(NP.plus(Number(e.amount), Number(e.cutAmount))),
          width: 120
        },
        {
          label: '到账日期',
          prop: 'payDay',
          width: 120
        },
        {
          label: '付款人',
          prop: 'payAccountName',
          width: 100
        },
        {
          label: '操作人',
          prop: 'updateBy',
          width: 100
        },
        {
          label: '操作时间',
          prop: 'updateTime',
          width: 150,
          formatter: (e: Recordable) => formatTime(e.updateTime)
        },
        {
          label: '操作',
          prop: 'option',
          width: 80,
          fixed: 'right'
        }
      ]
    };
  });
  const refundOptions = computed(() => {
    return {
      tableCard: false,
      pageShow: false,
      menu: false,
      columns: [
        {
          label: '收款单据号',
          prop: 'refundCode',
          width: 120
        },
        {
          label: '费用项目',
          prop: 'expenseItemName',
          width: 120
        },
        {
          label: '退款金额',
          prop: 'refundAmount',
          formatter: (e: Recordable) => formatPrice(e.refundAmount),
          width: 120
        },
        {
          label: '到账日期',
          prop: 'refundAt',
          width: 120,
          formatter: (e: Recordable) => formatTime(e.refundAt, 'YYYY-MM-DD')
        },
        {
          label: '退款方式',
          prop: 'payMethodName',
          width: 100
        },
        {
          label: '操作人',
          prop: 'updateBy',
          width: 100
        },
        {
          label: '操作时间',
          prop: 'updateTime',
          width: 150,
          formatter: (e: Recordable) => formatTime(e.updateTime)
        },
        {
          label: '操作',
          prop: 'option',
          width: 80,
          hide: !isCollect.value,
          fixed: 'right'
        }
      ]
    };
  });
  const receiptOptions = computed(() => {
    return {
      tableCard: false,
      pageShow: false,
      index: true,
      indexTitle: '序号',
      menu: false,
      columns: [
        {
          label: '发票单据号',
          prop: 'misPaymentCode',
          width: 120
        },
        {
          label: '发票分类',
          prop: 'type',
          width: 120
        },
        {
          label: '开票金额',
          prop: 'amount',
          formatter: (e: Recordable) => formatPrice(e.amount),
          width: 120
        },
        {
          label: '开票日期',
          prop: 'updateTime',
          width: 120
        },
        {
          label: '操作人',
          prop: 'updateBy',
          width: 80
        }
      ]
    };
  });
  const { run: onDelete } = useRequest(cbdApiProjectMisBillDeleteGet, {
    manual: true,
    onSuccess() {
      emits('refresh');
      visible.value = false;
    }
  });
  const { run: onCertain } = useRequest(cbdApiProjectMisBillConfirmPost, {
    manual: true,
    onSuccess() {
      emits('refresh');
      visible.value = false;
    }
  });
  const { run: revokeExam } = useRequest(cbdApiProjectMisBillCancelAuditPost, {
    manual: true,
    onSuccess() {
      emits('refresh');
      visible.value = false;
    }
  });
  const abort = async () => {
    if (props.id) {
      await cbdApiProjectMisBillDoScrapPost({
        idList: [Number(props.id)]
      });
      Message.success('操作成功!');
      emits('refresh');
      visible.value = false;
    } else {
      Message.error('删除失败,请稍后重试');
    }
  };
  const showPrint = ref(false);
  const ids = computed(() => [Number(props.id)]);
  async function onPrint() {
    showPrint.value = true;
  }
  const data = ref<CbdApiProjectMisBillViewGetResponse>({
    billType: 1,
    flowId: ''
  } as CbdApiProjectMisBillViewGetResponse);
  const { run: getEditInfo } = useRequest(cbdApiProjectMisBillViewGet, {
    manual: true,
    onSuccess(res) {
      data.value = {
        ...res
      };
    }
  });
  const XMLData = ref('');
  const examCode = ref('');
  const status = ref<number | undefined>(0);
  const processList = ref<any>([]);
  //流程引擎详情接口
  const getApprovalInfoEngine = async () => {
    try {
      const d = await cbdApiProjectPageApprovalInfoGet({
        procInsId: data.value.flowId
      });
      processList.value = d?.historyInstanceInfoList;
      XMLData.value = d.nodeImg || '';
      status.value = d?.status;
      examCode.value = d?.code || '';
    } catch (e) {
      console.error(e);
    }
  };
  const selectBills = ref<CbdApiProjectMisBillAddCollectionPostResponse>([]);
  const { run: getBillInfo } = useRequest(
    cbdApiProjectMisBillAddCollectionPost,
    {
      manual: true,
      onSuccess(res) {
        selectBills.value = res;
        if (!res.length) {
          Message.error('当前账单不能收付款');
          return false;
        }
        showAddPage.value = true;
      }
    }
  );
  const refundId = ref('');
  const showRefund = ref(false);
  const onShowRefund = (record: any) => {
    refundId.value = record.id;
    showRefund.value = true;
  };
  onMounted(async () => {
    if (props.id) {
      await getEditInfo({ id: props.id });
      await getApprovalInfoEngine();
    }
  });
  const showDelete = computed(
    () =>
      ![2, 3].includes(data.value.auditStat!) &&
      [0, 1].includes(data.value.businessStat!)
  );

  const showEditBtn = computed(
    () =>
      !(data.value.auditStat === 2 || [3, 5].includes(data.value.businessStat!))
  );
  const showConfirmBtn = computed(
    () =>
      [0, 1].includes(data.value.businessStat!) &&
      [1, 4, 5].includes(data.value.auditStat!)
  );
</script>
<style scoped lang="less">
  .orderNo {
    width: 100%;
    padding: 10px 20px;
    font-weight: bold;
    background-color: #fff;
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
