<template>
  <drawer v-model="visible" show-log :title="isPay ? '编辑付款' : '编辑收款'">
    <div class="add-box">
      <div class="i-card">
        <a-descriptions layout="vertical">
          <a-descriptions-item :label="isPay ? '付款单编号：' : '收款单编号：'"
            >系统自动生成</a-descriptions-item
          >
        </a-descriptions>
      </div>
      <div v-if="isPay" class="i-card">
        <a-descriptions layout="vertical" :column="3">
          <a-descriptions-item label="应付金额：">{{
            formatPrice(billInfo.amountShouldReceived)
          }}</a-descriptions-item>
          <a-descriptions-item label="已付金额：">{{
            formatPrice(billInfo.collectionAndPaymentAmount)
          }}</a-descriptions-item>
          <a-descriptions-item label="未付金额：">{{
            formatPrice(billInfo.amountNotReceived)
          }}</a-descriptions-item>
        </a-descriptions>
      </div>
      <div v-else class="i-card">
        <a-descriptions layout="vertical" :column="4">
          <a-descriptions-item label="应收金额：">{{
            formatPrice(billInfo.amountShouldReceived)
          }}</a-descriptions-item>
          <a-descriptions-item label="抵扣金额：">{{
            formatPrice(billInfo.deductionAmount)
          }}</a-descriptions-item>
          <a-descriptions-item label="已收金额：">{{
            formatPrice(billInfo.collectionAndPaymentAmount)
          }}</a-descriptions-item>
          <a-descriptions-item label="未收金额：">{{
            formatPrice(billInfo.amountNotReceived)
          }}</a-descriptions-item>
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
              <div style="font-size: 16px">账单信息</div>
            </template>
            <template #expenseItemsNameCell="{ record }">
              {{ `${record.expenseItemsName}(${record.paymentDays})` }}
            </template>
            <template #amountShouldReceivedCell="{ record }">
              ￥{{ record.amountShouldReceived }}
            </template>
            <template #collectionAndPaymentAmountCell="{ record }">
              ￥{{ record.collectionAndPaymentAmount }}
            </template>
            <template #amountNotReceivedCell="{ record }">
              ￥{{ record.amountNotReceived }}
            </template>
          </i-table>
        </div>
      </div>
      <i-form
        ref="dataForm"
        v-model="form"
        :options="formOptions"
        style="width: 100%"
      >
        <template #recordListForm>
          <div v-if="isPay" style="width: 100%" class="i-card">
            <i-table :options="backOptions" :data="form.collectList">
              <template #header>
                <div class="flex align-center justify-between">
                  <div style="font-size: 16px">返款信息</div>
                  <a-button type="primary" @click="addCollect">添加行</a-button>
                </div>
              </template>
              <template #expenseItemIdCell>
                {{
                  detail.billOutput.expenseItemsName +
                  `(${detail.billOutput.paymentDays})`
                }}
              </template>
              <template #remarkCell="{ record }">
                <a-textarea v-model="record.remark"></a-textarea>
              </template>
              <template #amountCell="{ record }">
                <a-input-number
                  v-model="record.amount"
                  hide-button
                ></a-input-number>
              </template>
              <template #doneDateCell="{ record }">
                <a-date-picker v-model="record.doneDate" style="width: 130px" />
              </template>
              <template #payUserNameCell="{ record }">
                <a-input v-model="record.payUserName" style="width: 150px" />
              </template>
              <template #payMethodIdCell="{ record }">
                <a-select v-model="record.payMethodId">
                  <a-option
                    v-for="i in payMethodsList"
                    :key="i.value"
                    :value="i.value"
                    >{{ i.label }}</a-option
                  >
                </a-select>
              </template>
              <template #optionalCell="{ rowIndex }">
                <a-popconfirm
                  content="确认删除当前返款信息吗?"
                  @ok="deleteCollect(rowIndex)"
                >
                  <a-button type="text">删除</a-button>
                </a-popconfirm>
              </template>
            </i-table>
          </div>
          <div v-else style="width: 100%">
            <div v-if="!isBIP" class="i-card">
              <i-table :options="discountOptions" :data="form.discountList">
                <template #header>
                  <div class="flex align-center justify-between">
                    <div style="font-size: 16px">抵扣记录</div>
                    <a-button type="primary" @click="onAddDiscountList"
                      >添加行</a-button
                    >
                  </div>
                </template>
                <template #billItemIdCell>
                  {{
                    detail.billOutput.expenseItemsName +
                    `(${detail.billOutput.paymentDays})`
                  }}
                </template>
                <template #expenseItemCell="{ record, rowIndex }">
                  <a-form-item
                    hide-label
                    :field="`discountList.${rowIndex}.expenseItemId`"
                    :rules="[{ required: true, message: '抵扣费用项目' }]"
                  >
                    <a-select
                      v-model="record.expenseItemId"
                      @change="onDisCountChange($event, rowIndex)"
                    >
                      <a-option
                        v-for="i in expenseItemsList"
                        :key="i.expenseItemId"
                        :value="i.expenseItemId"
                        >{{ i.expenseItemName }}</a-option
                      >
                    </a-select>
                  </a-form-item>
                </template>
                <template #cutAmountCell="{ record, rowIndex }">
                  <a-form-item
                    hide-label
                    :field="`discountList.${rowIndex}.cutAmount`"
                    :rules="[
                      { required: true, message: '抵扣金额不能为空' },
                      {
                        validator: checkDiscount.bind(null, record)
                      }
                    ]"
                  >
                    <a-input-number
                      v-model="record.cutAmount"
                      hide-button
                      @blur="onDisCountBlur(record, rowIndex, $event)"
                    />
                  </a-form-item>
                </template>
                <template #remarkCell="{ record }">
                  <a-textarea v-model="record.remark"></a-textarea>
                </template>
                <template #optionalCell="{ record, rowIndex }">
                  <a-popconfirm
                    content="确认删除当前抵扣信息吗?"
                    @ok="deleteDiscount(record, rowIndex)"
                  >
                    <a-button type="text">删除</a-button>
                  </a-popconfirm>
                </template>
              </i-table>
            </div>
            <div class="i-card">
              <i-table :options="collectRecordOptions" :data="form.collectList">
                <template #header>
                  <div class="flex align-center justify-between">
                    <div style="font-size: 16px">收款记录</div>
                    <a-button type="primary" @click="addCollect"
                      >添加行</a-button
                    >
                  </div>
                </template>
                <template #expenseItemIdCell>
                  {{
                    detail.billOutput.expenseItemsName +
                    `(${detail.billOutput.paymentDays})`
                  }}
                </template>
                <template #remarkCell="{ record }">
                  <a-textarea v-model="record.remark"></a-textarea>
                </template>
                <template #amountCell="{ record, rowIndex }">
                  <a-form-item
                    hide-label
                    :field="`collectList.${rowIndex}.amount`"
                    :rules="[{ required: true, message: '金额不能为空' }]"
                  >
                    <a-input-number v-model="record.amount" hide-button />
                  </a-form-item>
                </template>
                <template #doneDateCell="{ record, rowIndex }">
                  <a-form-item
                    hide-label
                    :field="`collectList.${rowIndex}.doneDate`"
                    :rules="[{ required: true, message: '到账日期不能为空' }]"
                  >
                    <a-date-picker
                      v-model="record.doneDate"
                      style="width: 130px"
                    />
                  </a-form-item>
                </template>
                <template #payUserNameCell="{ record, rowIndex }">
                  <a-form-item
                    hide-label
                    :field="`collectList.${rowIndex}.payUserName`"
                    :rules="[{ required: true, message: '付款人不能为空' }]"
                  >
                    <a-input
                      v-model="record.payUserName"
                      style="width: 150px"
                    />
                  </a-form-item>
                </template>
                <template #payMethodIdCell="{ record, rowIndex }">
                  <a-form-item
                    hide-label
                    :field="`collectList.${rowIndex}.payMethodId`"
                    :rules="[{ required: true, message: '支付方式不能为空' }]"
                  >
                    <a-select v-model="record.payMethodId">
                      <a-option
                        v-for="i in payMethodsList"
                        :key="i.value"
                        :value="i.value"
                        >{{ i.label }}</a-option
                      >
                    </a-select>
                  </a-form-item>
                </template>
                <template #optionalCell="{ rowIndex }">
                  <a-popconfirm
                    content="确认删除当前收款信息吗?"
                    @ok="deleteCollect(rowIndex)"
                  >
                    <a-button type="text">删除</a-button>
                  </a-popconfirm>
                </template>
                <template #menu>
                  <a-button type="text">删除</a-button>
                </template>
              </i-table>
            </div>
          </div>
        </template>
      </i-form>
      <add-form
        ref="AddFormRef"
        v-model="cpInfo"
        :project-id="detail.projectId"
        :merchant-id="String(detail.merchantId || '')"
        :source="isPay ? 'pay' : 'collect'"
      ></add-form>
    </div>
    <template #footer>
      <a-button @click="visible = false">取消</a-button>
      <a-button :loading="cerLoading" type="primary" @click="onSave(1)"
        >保存</a-button
      >
      <a-button :loading="cerLoading" type="primary" @click="onCertain"
        >确认</a-button
      >
    </template>
    <sub-confirm
      v-if="submitCertainVisible"
      v-model="submitCertainVisible"
      @data="getDataAndSub"
    />
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, Ref } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ITable from '@/components/i-table/index.vue';
  import IForm from '@/components/i-form/index.vue';
  import AddForm from './addForm.vue';
  import NP from 'number-precision';
  import SubConfirm from './subConfirm.vue';
  import {
    CbdApiProjectMisBillAddCollectionPostResponse,
    cbdApiProjectMisPaymentDetailGet,
    CbdApiProjectMisPaymentDetailGetResponse,
    cbdApiProjectMisPaymentModifyPost,
    CbdApiProjectMisPaymentModifyPostRequest,
    cbdApiProjectMisPaymentQueryDepositAccountGet,
    CbdApiProjectMisPaymentQueryDepositAccountGetResponse,
    cbdApiProjectMisPayMethodListPost,
    CbdApiProjectMisPayMethodListPostResponse
  } from '@/api';
  import { getExpenseList } from '@/views/finance-manage/useGetCommonData';
  import { Message } from '@arco-design/web-vue';
  import { useRequest } from '@har/use';
  import { formatPrice } from '@/utils';

  type SelectData = CbdApiProjectMisBillAddCollectionPostResponse[0];
  type DisCountItem = {
    billId?: number;
    expenseItemId: number;
    cutAmount: number;
    usableAmount: number;
    expenseItemName: string;
    billItemName: string;
    billItemId: number;
    depositHandleAmount: number;
    remark: string;
  };
  type CollectRecord = {
    billId?: number;
    amount: number;
    doneDate: string;
    payMethodId: number;
    payMethodName: string;
    expenseItemId: number;
    expenseItemName: string;
    payUserName: string;
    remark: string;
  };
  const cpInfo = ref({
    hasSignature: true,
    payAccountName: '',
    payAccountNum: '',
    payBankName: '',
    payRemark: '',
    payAccountId: '',
    receiptAccountId: '',
    receiptAccountName: '',
    receiptBankName: '',
    receiptAccountNum: '',
    resourceList: []
  });
  const AddFormRef: Ref = ref(null);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const isPay = computed(() => {
    return detail.value?.billOutput?.billType === 2;
  });
  const isBIP = computed(() =>
    ['202212270004', '202212270003', '202212270009'].includes(
      detail.value.billOutput.expenseKey!
    )
  );
  const form = ref<{
    discountList: DisCountItem[];
    collectList: CollectRecord[];
  }>({
    discountList: [],
    collectList: []
  });
  const dataForm: Ref = ref(null);
  const formOptions = computed<any>(() => {
    return {
      menuForm: false,
      formCard: false,
      layout: 'vertical',
      columns: [
        {
          label: '',
          prop: 'recordList',
          span: 24
        }
      ]
    };
  });
  const detail = ref({
    billOutput: {}
  } as CbdApiProjectMisPaymentDetailGetResponse);
  const billInfo = computed(() => detail.value.billOutput || {});
  const billList = computed(() => {
    return [detail.value.billOutput || {}];
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
          prop: 'amountShouldReceived',
          formatter: (e: Recordable) => formatPrice(e.amountShouldReceived)
        },
        {
          label: isPay.value ? '已付' : '已收',
          width: 120,
          prop: 'collectionAndPaymentAmount',
          formatter: (e: Recordable) =>
            formatPrice(e.collectionAndPaymentAmount)
        },
        {
          label: isPay.value ? '未付' : '未收',
          width: 120,
          prop: 'amountNotReceived',
          formatter: (e: Recordable) => formatPrice(e.amountNotReceived)
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
          label: '费用项目',
          width: 120,
          prop: 'expenseItemId'
        },
        {
          label: '支付金额',
          width: 120,
          prop: 'amount'
        },
        {
          label: '到账日期',
          width: 120,
          prop: 'doneDate'
        },
        {
          label: '支付方式',
          width: 120,
          prop: 'payMethodId'
        },
        {
          label: '操作人',
          width: 120,
          prop: 'code'
        },
        {
          label: '操作时间',
          width: 120,
          prop: 'code'
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
  // 抵扣记录相关
  const discountOptions = computed(() => {
    return {
      pageShow: false,
      menu: false,
      index: true,
      indexWidth: 60,
      indexTitle: '序号',
      tableCard: false,
      columns: [
        {
          label: '费用项目',
          width: 200,
          prop: 'billItemId'
        },
        {
          label: '抵扣费用项目',
          width: 120,
          prop: 'expenseItem'
        },
        {
          label: '抵扣金额',
          width: 120,
          prop: 'cutAmount'
        },
        {
          label: '可用余额',
          width: 120,
          prop: 'usableAmount'
        },
        {
          label: '备注',
          width: 120,
          prop: 'remark'
        },
        {
          label: '操作',
          width: 80,
          fixed: 'right',
          prop: 'optional'
        }
      ]
    };
  });
  type ExpenseItem = CbdApiProjectMisPaymentQueryDepositAccountGetResponse[0];
  const expenseItemsList = ref<ExpenseItem[]>([]);
  const onAddDiscountList = () => {
    form.value.discountList.push({} as DisCountItem);
  };
  const onDisCountChange = (v: any, index: number) => {
    form.value.discountList[index].usableAmount = 0;
    const tempArr = form.value.discountList
      .filter((el) => el.expenseItemId === v)
      .map(({ usableAmount }: DisCountItem) => usableAmount)
      .filter((el) => el);
    const t: number = Math.min.apply(null, tempArr || []);
    const item: ExpenseItem = expenseItemsList.value.find(
      (el) => el.expenseItemId === v
    )!;
    form.value.discountList[index].usableAmount =
      tempArr && tempArr.length ? t : item.availableAmount;
    form.value.discountList[index].expenseItemName = item.expenseItemName;
    form.value.discountList[index].billItemName =
      detail.value.billOutput.expenseItemsName;
    form.value.discountList[index].billItemId =
      detail.value.billOutput.expenseItemsId;
  };
  const checkDiscount = (
    record: Recordable,
    value: number | undefined | null,
    callback: Function
  ) => {
    const item = billList.value.find(
      (el: SelectData) => el.id === record.billId
    );
    if (!value) {
      callback('抵扣金额不能为空');
    } else if (
      record.usableAmount &&
      Number(value) > Number(record.usableAmount)
    ) {
      callback('抵扣金额不能大于可用余额');
    } else if (item && Number(value) > Number(record.amountNotReceived)) {
      callback('抵扣金额不能大于未收余额');
    }
  };
  const onDisCountBlur = (v: DisCountItem, index: number, e: any) => {
    const amount = form.value.discountList[index].usableAmount;
    const previousCut = form.value.discountList[index].cutAmount;
    const t: number = e.target.value;
    if (!t) return;
    // 本次和原来的一样,那就不计算了
    if (v.cutAmount === t) return false;
    if (v.cutAmount > t) {
      Message.error('抵扣金额不能大于可用余额');
      return false;
    }
    // 第一次为这行添加折扣金额
    if (!previousCut) {
      form.value.discountList.forEach((el) => {
        if (el.expenseItemId === v.expenseItemId) {
          el.usableAmount = NP.minus(amount, v.cutAmount);
        }
      });
    } else {
      // 修改金额
      const gap = NP.minus(t, previousCut);
      form.value.discountList.forEach((el) => {
        if (el.expenseItemId === v.expenseItemId) {
          el.usableAmount = NP.minus(amount, gap);
        }
      });
    }
  };
  const deleteDiscount = (v: DisCountItem, idx: number) => {
    if (v.cutAmount) {
      form.value.discountList.forEach((el) => {
        if (el.expenseItemId === v.expenseItemId) {
          el.usableAmount = NP.plus(el.usableAmount, v.cutAmount);
        }
      });
    }
    form.value.discountList.splice(idx, 1);
    dataForm.value.clearValidate();
  };
  // 收款信息相关
  type PayItem = {
    label: string;
    value: number;
  };
  const payMethodsList = ref<PayItem[]>([]);
  const collectRecordOptions = computed(() => {
    return {
      pageShow: false,
      menu: false,
      index: true,
      indexTitle: '序号',
      indexWidth: 60,
      tableCard: false,
      columns: [
        {
          label: '费用项目',
          width: 120,
          prop: 'expenseItemId'
        },
        {
          label: '支付金额',
          width: 120,
          prop: 'amount'
        },
        {
          label: '到账日期',
          width: 120,
          prop: 'doneDate'
        },
        {
          label: '支付方式',
          width: 120,
          prop: 'payMethodId'
        },
        {
          label: '付款人',
          width: 120,
          prop: 'payUserName'
        },
        {
          label: '操作人',
          width: 120,
          prop: 'createBy'
        },
        {
          label: '操作时间',
          width: 120,
          prop: 'createTime'
        },
        {
          label: '备注',
          width: 120,
          prop: 'remark'
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
  const addCollect = () => {
    form.value.collectList.push({} as CollectRecord);
  };
  const deleteCollect = (idx: number) => {
    form.value.collectList.splice(idx, 1);
    dataForm.value.clearValidate();
  };
  // 确认
  const { run: onCertainSubmit, loading: cerLoading } = useRequest(
    cbdApiProjectMisPaymentModifyPost,
    {
      manual: true,
      onSuccess() {
        Message.success('保存成功!');
        visible.value = false;
        emits('refresh');
      }
    }
  );
  // 获取详情以回显
  const { run: getDetailData } = useRequest(cbdApiProjectMisPaymentDetailGet, {
    manual: true,
    onSuccess(res) {
      detail.value = res;
      form.value.collectList =
        res.recordOutputList as unknown as CollectRecord[];
      form.value.discountList = res.cutOutputList as unknown as DisCountItem[];
      cpInfo.value = {
        ...res,
        resourceList: res.resourceFilesRespList || []
      } as unknown as any;
      getExpenseItems({
        contractCode: detail.value.contractCode
      });
      getPayMethodsList({
        projectId: billInfo.value.projectId,
        scenes: 1
      });
    }
  });
  type FormItems = {
    autoOpenInvoice: number;
    remark: string;
  };
  const configData = ref({
    autoOpenInvoice: 1,
    remark: ''
  });
  // 确认
  const submitCertainVisible = ref(false);
  const onCertain = async () => {
    const t = await dataForm.value.submit();
    if (t) return false;
    const res = await AddFormRef.value!.submit();
    if (res) return false;
    submitCertainVisible.value = true;
  };
  const getDataAndSub = (d: FormItems) => {
    configData.value = d;
    onSave(2);
  };
  const onSave = async (type = 1) => {
    const t = await dataForm.value.submit();
    if (t) return false;
    const res = await AddFormRef.value!.submit();
    if (res) return false;
    const temp = {
      id: detail.value.billId,
      ...cpInfo.value,
      recordList: form.value.collectList,
      cutList: form.value.discountList,
      resourceList: cpInfo.value.resourceList.map((el: any) => el.key || el.id),
      actionType: type,
      autoOpenInvoice:
        type === 1 ? undefined : configData.value.autoOpenInvoice,
      remark: configData.value.remark
    };
    onCertainSubmit({
      ...temp
    } as unknown as CbdApiProjectMisPaymentModifyPostRequest);
  };
  type payResponseItem = CbdApiProjectMisPayMethodListPostResponse[0];
  type PayTypeInner = {
    id?: number;
    scenes?: number;
    switchs?: number;
    code?: string;
    paymentMethod?: string;
    serviceRate?: number;
    sorts?: number;
  };
  const { run: getPayMethodsList } = useRequest(
    cbdApiProjectMisPayMethodListPost,
    {
      manual: true,
      onSuccess(res) {
        payMethodsList.value = [];
        res.forEach((el: payResponseItem) => {
          el.methodDetails!.forEach((each: PayTypeInner) => {
            if (each.switchs === 1) {
              payMethodsList.value.push({
                value: each.id!,
                label: each.paymentMethod!
              });
            }
          });
        });
      }
    }
  );
  const { run: getExpenseItems } = useRequest(
    cbdApiProjectMisPaymentQueryDepositAccountGet,
    {
      manual: true,
      onSuccess(res) {
        expenseItemsList.value = res;
      }
    }
  );
  onMounted(async () => {
    getExpenseList({ parentExpenseCode: '0' });
    if (props.id) {
      await getDetailData({ id: props.id! });
    }
  });
</script>
<style scoped lang="less">
  .add-box {
    width: 100%;
  }
</style>
