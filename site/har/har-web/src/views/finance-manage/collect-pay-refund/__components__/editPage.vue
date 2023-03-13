<template>
  <drawer
    v-model="visible"
    show-log
    title="修改退款"
    :log-options="{
      modeId: props.id,
      logUrl: cbdApiProjectSysOptPageOptListPost,
      mode: 'cbd_mis_payment_refund'
    }"
  >
    <div class="add-box">
      <div class="i-card">
        <a-descriptions layout="vertical">
          <a-descriptions-item label="退款单编号">
            {{ info?.refundDetail.refundCode }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="i-card">
        <a-descriptions :column="4" layout="vertical" title="账单信息">
          <a-descriptions-item label="归属项目：">{{
            billOutput.projectName
          }}</a-descriptions-item>
          <a-descriptions-item label="商户名称：">{{
            billOutput.merchantName
          }}</a-descriptions-item>
          <a-descriptions-item label="店铺名：">{{
            billOutput.storeName
          }}</a-descriptions-item>
          <a-descriptions-item label="合同号：">{{
            billOutput.contractCode
          }}</a-descriptions-item>
        </a-descriptions>
        <div style="margin-top: 20px">
          <i-table
            :options="billOptions"
            :data="info?.billOutput ? [info.billOutput] : []"
          >
            <template #header>
              <div class="flex align-center justify-between">
                <div style="font-size: 16px">账单详情</div>
              </div>
            </template>
            <template #expenseItemsNameCell="{ record }">
              {{ `${record.expenseItemsName}(${record.paymentDays})` }}
            </template>
            <template #optionalCell="{ record }">
              <a-button type="text" @click="onBillDetail(record)"
                >查看</a-button
              >
            </template>
          </i-table>
        </div>
      </div>
      <div class="i-card">
        <i-table
          :options="backOptions"
          :data="info?.paymentInfo ? [info.paymentInfo] : []"
        >
          <template #header>
            <div class="flex align-center justify-between">
              <div style="font-size: 16px"
                >{{ isPay ? '返款记录' : '收款记录' }}
              </div>
            </div>
          </template>
          <template #optionalCell="{ record }">
            <a-button type="text" @click="onCollectPayDetail(record)"
              >查看</a-button
            >
          </template>
        </i-table>
      </div>
      <div class="i-card">
        <i-table :options="refundOptions" :data="refundList">
          <template #header>
            <div class="flex align-center justify-between">
              <div style="font-size: 16px">退款记录</div>
            </div>
          </template>
          <!-- 退款金额 -->
          <template #refundAmountCell="{ record }">
            <a-input-number
              v-model="record.refundAmount"
              :min="0"
              :max="100"
              placeholder=""
            />
          </template>
          <!-- 退款日期 -->
          <template #refundAtCell="{ record }">
            <a-date-picker
              v-model="record.refundAt"
              :value-format="'YYYY-MM-DD'"
              :allow-clear="false"
            />
          </template>
          <!-- 退款方式 -->
          <template #payMethodIdCell="{ record }">
            <a-select v-model="record.payMethodId" placeholder="请选择">
              <a-option
                v-for="item in payMethodList"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </a-select>
          </template>
        </i-table>
      </div>
      <div class="i-card">
        <div class="block-title" style="padding-top: 0">附件信息</div>
        <i-custom-upload
          v-model="resourceList"
          list-type="picture-card"
          url-key="previewAddress"
          :options="{ limit: 1 }"
        ></i-custom-upload>
      </div>
    </div>
    <template #footer>
      <a-button @click="visible = false">取消</a-button>
      <a-button
        v-permission="['mis:payment_refund:modify']"
        :loading="cerLoading"
        type="primary"
        @click="onCertain('save')"
      >
        保存
      </a-button>
      <a-button
        v-permission="['mis:payment_refund:modify']"
        :loading="cerLoading"
        type="primary"
        @click="onCertain()"
      >
        确认
      </a-button>
    </template>
  </drawer>

  <batch-confirm
    v-model:visible="batchConfirmVisible"
    @submit="onSubmitExamine"
  />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message } from '@arco-design/web-vue';
  import { useRequest } from '@har/use';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import { formatPrice } from '@/utils';
  import {
    cbdApiProjectMisPaymentRefundDetailGet,
    CbdApiProjectMisPaymentRefundDetailGetResponse,
    cbdApiProjectMisPaymentRefundModifyPost,
    CbdApiProjectMisPaymentRefundModifyPostRequest,
    cbdApiProjectSysOptPageOptListPost,
    cbdApiProjectMisPayMethodListPost,
    CbdApiProjectMisPayMethodListPostResponse
  } from '@/api';
  import BatchConfirm from './batchConfirm.vue';

  type BillModel =
    Required<CbdApiProjectMisPaymentRefundDetailGetResponse>['billOutput'];
  type PaymentModel =
    Required<CbdApiProjectMisPaymentRefundDetailGetResponse>['paymentInfo'];
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: undefined
    }
  });
  const emits = defineEmits([
    'update:modelValue',
    'refresh',
    'showBillDetail',
    'showCollectPayDetail'
  ]);
  const visible = computed({
    get() {
      if (props.modelValue && props.id) {
        getInfo();
      }
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  const batchConfirmVisible = ref(false);

  const payMethodList = ref<{ value: number; label: string }[]>([]);
  type PayMethod = Required<CbdApiProjectMisPayMethodListPostResponse>[0];
  type MethodDetail = Required<PayMethod>['methodDetails'][0];
  const { run: getPayMethodList } = useRequest(
    cbdApiProjectMisPayMethodListPost,
    {
      manual: true,
      onSuccess(res) {
        payMethodList.value = [];
        res.forEach((el: PayMethod) => {
          el.methodDetails?.forEach((each: MethodDetail) => {
            if (each.switchs === 1) {
              payMethodList.value.push({
                value: Number(each.id),
                label: String(each.paymentMethod)
              });
            }
          });
        });
      }
    }
  );

  const info = ref<CbdApiProjectMisPaymentRefundDetailGetResponse>();
  // 获取详情
  const { run: getInfo } = useRequest(
    () => cbdApiProjectMisPaymentRefundDetailGet({ id: String(props.id) }),
    {
      manual: true,
      onSuccess(data: CbdApiProjectMisPaymentRefundDetailGetResponse) {
        info.value = data;
        resourceList.value = data.resourceFilesRespList || [];
        getPayMethodList({
          projectId: data.billOutput.projectId,
          scenes: 1
        });
      }
    }
  );

  const isPay = computed(() => {
    return !!(info.value &&
    info.value.billOutput &&
    info.value.billOutput.billType === 1
      ? false
      : true);
  });
  const billOutput = computed(() => {
    return (info.value?.billOutput || {}) as BillModel;
  });
  const billOptions = computed(() => {
    return {
      pageShow: false,
      menu: false,
      tableCard: false,
      columns: [
        {
          label: '账单编号',
          width: 120,
          prop: 'billNum'
        },
        {
          label: '费用项目',
          width: 200,
          prop: 'expenseItemsName'
        },
        {
          label: '费用期间',
          width: 220,
          prop: 'expensePeriod'
        },
        {
          label: isPay.value ? '应付' : '应收',
          width: 120,
          prop: 'receivableAmount',
          formatter: (row: BillModel): string => {
            return row.receivableAmount
              ? `￥${formatPrice(row.receivableAmount)}`
              : '--';
          }
        },
        {
          label: isPay.value ? '已付' : '已收',
          width: 120,
          prop: 'collectionAndPaymentAmount',
          formatter: (row: BillModel): string => {
            return row.collectionAndPaymentAmount
              ? `￥${formatPrice(row.collectionAndPaymentAmount)}`
              : '--';
          }
        },
        {
          label: isPay.value ? '未付' : '未收',
          width: 120,
          prop: 'amountNotReceived',
          formatter: (row: BillModel): string => {
            return row.amountNotReceived
              ? `￥${formatPrice(row.amountNotReceived)}`
              : '--';
          }
        },
        {
          label: '操作',
          width: 120,
          fixed: 'right',
          prop: 'optional'
        }
      ]
    };
  });
  const backOptions = computed(() => {
    return {
      pageShow: false,
      menu: false,
      index: true,
      indexTitle: '序号',
      tableCard: false,
      columns: [
        {
          // label: isPay.value ? '返款单据号' : '收款单据号',
          label: '交易流水号',
          width: 120,
          prop: 'paymentNum'
        },
        {
          label: '费用项目',
          width: 120,
          prop: 'expenseItemName'
        },
        {
          label: '支付金额',
          width: 120,
          prop: 'amount'
        },
        {
          label: '到账日期',
          width: 120,
          prop: 'payDay'
        },
        {
          label: '支付方式',
          width: 120,
          prop: 'payMethodStr'
        },
        {
          label: '操作人',
          width: 120,
          prop: 'updateBy'
        },
        {
          label: '操作时间',
          width: 120,
          prop: 'updateTime'
        },
        {
          label: '操作',
          width: 120,
          prop: 'optional'
        }
      ]
    };
  });
  const refundOptions = computed(() => {
    return {
      pageShow: false,
      menu: false,
      index: true,
      indexTitle: '序号',
      tableCard: false,
      columns: [
        {
          label: '退款单号',
          width: 230,
          prop: 'refundCode'
        },
        {
          label: '费用项目',
          width: 160,
          prop: 'expenseItemName'
        },
        {
          label: '可退金额',
          width: 120,
          prop: 'refundAbleAmount'
        },
        {
          label: '退款金额',
          width: 120,
          prop: 'refundAmount'
        },
        {
          label: '退款日期',
          width: 160,
          prop: 'refundAt'
        },
        {
          label: '退款方式',
          width: 130,
          prop: 'payMethodId'
        },
        {
          label: '操作人',
          width: 130,
          prop: 'updateBy'
        },
        {
          label: '操作时间',
          width: 130,
          prop: 'updateTime'
        }
      ]
    };
  });

  const refundList = computed(() => {
    return info.value?.refundDetail ? [info.value.refundDetail] : [];
  });

  /* 附件 */
  const resourceList = ref<any[]>([]);

  // 确认
  const { run: submitRefund, loading: cerLoading } = useRequest(
    cbdApiProjectMisPaymentRefundModifyPost,
    {
      manual: true,
      onSuccess() {
        Message.success('操作成功!');
        emits('refresh');
      }
    }
  );
  // 账单详情
  const onBillDetail = (record: BillModel) => {
    emits('showBillDetail', String(record.id));
  };
  const onCollectPayDetail = (record: PaymentModel) => {
    emits('showCollectPayDetail', String(record.id));
  };
  const onCertain = (type = 'certain') => {
    if (!refundList.value.length) return;
    const data = refundList.value[0];
    if (!data.refundAmount) {
      Message.error({ content: '请输入有效的退款金额' });
      return;
    }
    if (!data.refundAt) {
      Message.error({ content: '退款日期不能为空' });
      return;
    }
    if (data.payMethodId) {
      data.payMethodName =
        payMethodList.value.find((pay) => pay.value === data.payMethodId)
          ?.label || '';
    } else {
      Message.error({ content: '退款方式不能为空' });
      return;
    }

    if (type === 'save') {
      onSubmit();
    } else {
      batchConfirmVisible.value = true;
    }
  };

  const onSubmit = (params = {}, actionType = 1) => {
    const data = refundList.value[0];
    submitRefund({
      ...params,
      actionType, // 动作类型1保存2确认
      id: data.id,
      refundAmount: data.refundAmount,
      refundAt: data.refundAt,
      payMethodId: data.payMethodId,
      payMethodName: data.payMethodName,
      resourceList: resourceList.value.map((item) => item.id)
    } as CbdApiProjectMisPaymentRefundModifyPostRequest);
  };

  const onSubmitExamine = (data = {}) => {
    onSubmit(data, 2);
  };
</script>
<style scoped lang="less">
  .add-box {
    width: 100%;
  }
</style>
