<template>
  <drawer v-model="visible" title="添加退款">
    <div class="add-box">
      <div class="i-card">
        <a-descriptions layout="vertical">
          <a-descriptions-item label="退款单编号">
            系统自动生成
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="i-card">
        <a-descriptions :column="4" layout="vertical" title="账单信息">
          <a-descriptions-item label="归属项目：">{{
            billInfo.projectName
          }}</a-descriptions-item>
          <a-descriptions-item label="商户名称：">{{
            billInfo.merchantName
          }}</a-descriptions-item>
          <a-descriptions-item label="店铺名：">{{
            billInfo.storeName
          }}</a-descriptions-item>
          <a-descriptions-item label="合同号：">{{
            billInfo.contractCode
          }}</a-descriptions-item>
        </a-descriptions>
        <div style="margin-top: 20px">
          <i-table :options="billOptions" :data="billList">
            <template #header>
              <div class="flex align-center justify-between">
                <div style="font-size: 16px">账单详情</div>
                <!-- <a-button type="primary" @click="visible = false"
                  >选择账单</a-button
                > -->
              </div>
            </template>
            <template #expenseItemsNameCell="{ record }">
              {{ `${record.expenseItemsName}(${record.paymentDays})` }}
            </template>
            <template #optionalCell="{ record }">
              <a-button type="text" @click="onBillDetail(record)">
                查看
              </a-button>
            </template>
          </i-table>
        </div>
      </div>
      <div class="i-card">
        <i-table :options="backOptions" :data="data">
          <template #header>
            <div class="flex align-center justify-between">
              <div style="font-size: 16px">
                {{ isPay ? '返款记录' : '收款记录' }}
              </div>
            </div>
          </template>
          <template #optionalCell="{ record }">
            <a-button type="text" @click="onCollectPayDetail(record)">
              查看
            </a-button>
          </template>
        </i-table>
      </div>
      <div class="i-card">
        <i-table :options="refundOptions" :data="refundList">
          <template #header>
            <div class="flex align-center justify-between">
              <div style="font-size: 16px">退款记录</div>
              <a-button type="primary" @click="addRefund">添加</a-button>
            </div>
          </template>
          <template #optionalCell="{ rowIndex }">
            <a-button type="text" @click="deleteRefund(rowIndex)">
              删除
            </a-button>
          </template>
          <template #paymentIdCell="{ record }">
            <a-select
              v-model="record.paymentId"
              placeholder="请选择"
              @change="changePaymentId"
            >
              <a-option
                v-for="item in paymentOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
                :disabled="item.disabled"
              />
            </a-select>
          </template>
          <template #expenseItemNameCell="{ record }">
            {{
              record.paymentId
                ? data.find((item) => item.paymentId === record.paymentId)
                    ?.expenseItemName
                : ''
            }}
          </template>
          <template #refundAbleAmountCell="{ record }">
            {{
              record.paymentId
                ? data.find((item) => item.paymentId === record.paymentId)
                    ?.refundAbleAmount
                : ''
            }}
          </template>
          <!-- 退款金额 -->
          <template #refundAmountCell="{ record }">
            <a-input-number
              v-model="record.refundAmount"
              :disabled="!record.paymentId"
              :min="0"
              :max="
                data.find((item) => item.paymentId === record.paymentId)
                  ?.refundAbleAmount || 0
              "
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
      <!-- <add-form></add-form> -->
      <div class="i-card">
        <div class="block-title" style="padding-top: 0">附件信息</div>
        <i-custom-upload
          v-model="resourceList"
          list-type="picture-card"
          :options="{ limit: 1 }"
        ></i-custom-upload>
      </div>
    </div>
    <template #footer>
      <a-button @click="visible = false">取消</a-button>
      <a-button
        type="primary"
        :loading="loading"
        :disabled="!refundList.filter((item) => item.paymentId).length"
        @click="onCertain('save')"
      >
        保存
      </a-button>
      <a-button
        type="primary"
        :loading="loading"
        :disabled="!refundList.filter((item) => item.paymentId).length"
        @click="onCertain('certain')"
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
  import { ref, computed, watch, onMounted, PropType } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ITable from '@/components/i-table/index.vue';
  import NP from 'number-precision';
  import {
    cbdApiProjectMisPaymentRefundCommitPost,
    CbdApiProjectMisPaymentRefundCommitPostRequest,
    CbdApiProjectMisPaymentRefundGetListBeforeAddGetResponse,
    cbdApiProjectMisPayMethodListPost,
    CbdApiProjectMisPayMethodListPostResponse
  } from '@/api';
  import { getExpenseList } from '@/views/finance-manage/useGetCommonData';
  import { Message } from '@arco-design/web-vue';
  import { useRequest } from '@har/use';
  import { formatPrice } from '@/utils';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import BatchConfirm from './batchConfirm.vue';

  type BillModel =
    Required<CbdApiProjectMisPaymentRefundGetListBeforeAddGetResponse>['rows'][0]['billOutput'] & {
      refundAbleAmount?: number;
    };
  type PaymentModel =
    Required<CbdApiProjectMisPaymentRefundGetListBeforeAddGetResponse>['rows'][0];
  const billList = ref<BillModel[]>([]);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array as PropType<PaymentModel[]>,
      default: () => []
    },
    isPay: {
      type: Boolean
    }
  });
  const isPay = computed(() => {
    return props.isPay;
  });
  const emits = defineEmits([
    'update:modelValue',
    'refresh',
    'showBillDetail',
    'showCollectPayDetail'
  ]);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const sumData = (
    arr: PaymentModel[],
    key:
      | 'receivableAmount'
      | 'deductionAmount'
      | 'collectionAndPaymentAmount'
      | 'amountNotReceived'
  ) => {
    let t = 0;
    if (arr.length) {
      arr.forEach((el: PaymentModel) => {
        t = NP.plus(el.billOutput[key] || 0, t);
      });
    }
    return t;
  };
  const billInfo = computed(() => {
    return {
      ...((props.data && props.data[0] && props.data[0].billOutput) || {}),
      receivableAmount: sumData(props.data, 'receivableAmount'),
      deductionAmount: sumData(props.data, 'deductionAmount'),
      collectionAndPaymentAmount: sumData(
        props.data,
        'collectionAndPaymentAmount'
      ),
      amountNotReceived: sumData(props.data, 'amountNotReceived')
    };
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
          label: isPay.value ? '返款单据号' : '收款单据号',
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
          label: props.isPay ? '付款单据号' : '收款单据号',
          width: 230,
          prop: 'paymentId'
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
          label: '操作',
          width: 80,
          prop: 'optional',
          fixed: 'right'
        }
      ]
    };
  });

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

  type RefundItemModel =
    Required<CbdApiProjectMisPaymentRefundCommitPostRequest>['dataList'][0];
  const refundList = ref<RefundItemModel[]>([]);
  const addRefund = () => {
    refundList.value.push({} as RefundItemModel);
  };
  const deleteRefund = (index: number) => {
    refundList.value.splice(index, 1);
    paymentOptionsInstall();
  };
  // 保存/确认
  const { run: submitRefund, loading } = useRequest(
    cbdApiProjectMisPaymentRefundCommitPost,
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
    emits('showCollectPayDetail', String(record.paymentId));
  };
  const onSubmit = (data = {}, actionType = 1) => {
    submitRefund({
      ...data,
      actionType, // 动作类型1保存2确认
      dataList: refundList.value.filter((item) => item.paymentId)
    } as CbdApiProjectMisPaymentRefundCommitPostRequest);
  };
  const batchConfirmVisible = ref(false);
  const onCertain = (type: string) => {
    const list = refundList.value.filter((item) => item.paymentId);
    for (let index = 0; index < list.length; index++) {
      const item = list[index];
      if (!item.refundAmount) {
        Message.error({ content: '请输入有效的退款金额' });
        return;
      }
      if (!item.refundAt) {
        Message.error({ content: '退款日期不能为空' });
        return;
      }
      if (item.payMethodId) {
        item.payMethodName =
          payMethodList.value.find((pay) => pay.value === item.payMethodId)
            ?.label || '';
      } else {
        Message.error({ content: '退款方式不能为空' });
        return;
      }
      if (resourceList.value.length) {
        item.resourceList = resourceList.value.map((item) => item.key);
      } else {
        item.resourceList = [];
      }
    }
    if (type === 'save') {
      onSubmit();
    } else {
      batchConfirmVisible.value = true;
    }
  };
  const onSubmitExamine = (data = {}) => {
    onSubmit(data, 2);
  };

  onMounted(async () => {
    getExpenseList({ parentExpenseCode: '0' });
  });

  type OptionModel = { label: string; value: number; disabled?: boolean };
  const paymentOptions = ref<OptionModel[]>([]);
  watch(
    () => props.data,
    (v) => {
      // 获取支付方式列表
      if (v && v.length) {
        getPayMethodList &&
          getPayMethodList({
            projectId: v[0].billOutput.projectId,
            scenes: 1
          });
      }
      const list: BillModel[] = [];
      v.forEach((item) => {
        const findData = list.find((billItem) => billItem.id === item.billId);
        if (findData) {
          // 可退金额
          findData.refundAbleAmount = NP.plus(
            item.refundAbleAmount || 0,
            findData.refundAbleAmount || 0
          );
          // 应收金额
          findData.receivableAmount = NP.plus(
            item.billOutput.receivableAmount || 0,
            findData.receivableAmount || 0
          );
          // 抵扣金额
          findData.deductionAmount = NP.plus(
            item.billOutput.deductionAmount || 0,
            findData.deductionAmount || 0
          );
          // 已收已付金额
          findData.collectionAndPaymentAmount = NP.plus(
            item.billOutput.collectionAndPaymentAmount || 0,
            findData.collectionAndPaymentAmount || 0
          );
          // 未收金额
          findData.amountNotReceived = NP.plus(
            item.billOutput.amountNotReceived || 0,
            findData.amountNotReceived || 0
          );
        } else {
          list.push({ ...item.billOutput, refundAbleAmount: 0 });
        }
      });
      billList.value = list;
      paymentOptions.value = v.map((item) => {
        return {
          label: item.paymentNum,
          value: item.paymentId,
          disabled: false
        };
      });
    },
    { immediate: true }
  );
  const changePaymentId = () => {
    paymentOptionsInstall();
  };

  const paymentOptionsInstall = () => {
    paymentOptions.value.forEach((option: OptionModel) => {
      option.disabled = refundList.value.some((item) => {
        return item.paymentId === option.value;
      });
      return option;
    });
  };

  /* 附件 */
  const resourceList = ref<any[]>([]);
</script>
<style scoped lang="less">
  .add-box {
    width: 100%;
  }
</style>
