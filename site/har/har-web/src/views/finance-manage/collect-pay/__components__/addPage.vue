<template>
  <drawer
    v-model="visible"
    show-log
    :title="isPay ? '添加付款' : '添加收款'"
    @cancel="onCancel"
  >
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
            formatPrice(billInfo.receivableAmount)
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
            formatPrice(billInfo.receivableAmount)
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
              <div class="flex align-center justify-between">
                <div style="font-size: 16px">账单详情</div>
                <a-button
                  v-if="!hideSelect"
                  type="primary"
                  :disabled="disabledSelect"
                  @click="onChooseBill"
                  >选择账单</a-button
                >
              </div>
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
            <template #optionalCell="{ record }">
              <a-button type="text" @click="deleteOneBill(record)"
                >删除</a-button
              >
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
              <template #expenseItemIdCell="{ rowIndex }">
                <a-form-item
                  hide-label
                  :field="`collectList.${rowIndex}.expenseItemId`"
                  :rules="[{ required: true, message: '费用项目不能为空' }]"
                >
                  <a-select
                    :model-value="form.collectList[rowIndex].billId"
                    :field-names="{
                      value: 'billId'
                    }"
                    @change="onCollectRecordFeeChange($event, rowIndex)"
                  >
                    <a-option
                      v-for="i in billItemList"
                      :key="i.billId"
                      :value="i.billId"
                      >{{ i.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </template>
              <template #remarkCell="{ record }">
                <a-textarea v-model="record.remark"></a-textarea>
              </template>
              <template #amountCell="{ record, rowIndex }">
                <a-form-item
                  hide-label
                  :field="`collectList.${rowIndex}.amount`"
                  :rules="[{ required: true, message: '支付金额不能为空' }]"
                >
                  <a-input-number v-model="record.amount" hide-button />
                </a-form-item>
              </template>
              <template #doneDateCell="{ record, rowIndex }">
                <a-form-item
                  hide-label
                  :field="`collectList.${rowIndex}.amount`"
                  :rules="[{ required: true, message: '到账日期不能为空' }]"
                >
                  <a-date-picker
                    v-model="record.doneDate"
                    style="width: 130px"
                  />
                </a-form-item>
              </template>
              <template #payMethodIdCell="{ record, rowIndex }">
                <a-form-item
                  hide-label
                  :field="`collectList.${rowIndex}.payMethodId`"
                  :rules="[{ required: true, message: '支付方式不能为空' }]"
                >
                  <a-select
                    v-model="record.payMethodId"
                    @change="onPayMethodChange(record, rowIndex)"
                  >
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
                  content="确认删除当前返款信息吗?"
                  @ok="deleteCollect(rowIndex)"
                >
                  <a-button type="text">删除</a-button>
                </a-popconfirm>
              </template>
            </i-table>
          </div>
          <div v-else style="width: 100%">
            <div v-if="isShowDiscount" class="i-card">
              <i-table :options="discountOptions" :data="form.discountList">
                <template #header>
                  <div class="flex align-center justify-between">
                    <div style="font-size: 16px">抵扣记录</div>
                    <a-button type="primary" @click="onAddDiscountList"
                      >添加行</a-button
                    >
                  </div>
                </template>
                <template #billItemIdCell="{ record, rowIndex }">
                  <a-form-item
                    hide-label
                    :field="`discountList.${rowIndex}.billItemId`"
                    :rules="[{ required: true, message: '费用项目不能为空' }]"
                  >
                    <a-select
                      :model-value="form.discountList[rowIndex].billId"
                      :field-names="{
                        value: 'billId'
                      }"
                      @change="onDisCountFeeChange(record, rowIndex, $event)"
                    >
                      <a-option
                        v-for="i in disCountItemList"
                        :key="i.billId"
                        :value="i.billId"
                        >{{ i.label }}</a-option
                      >
                    </a-select>
                  </a-form-item>
                </template>
                <template #expenseItemCell="{ record, rowIndex }">
                  <a-form-item
                    hide-label
                    :field="`discountList.${rowIndex}.expenseItemId`"
                    :rules="[{ required: true, message: '抵扣费用项目' }]"
                  >
                    <a-select
                      v-model="record.expenseItemId"
                      @change="
                        onDisCountFeeItemChange($event, rowIndex, record)
                      "
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
                      :disabled="!form.discountList[rowIndex].usableAmount"
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
                <template #expenseItemIdCell="{ rowIndex }">
                  <a-form-item
                    hide-label
                    :field="`collectList.${rowIndex}.expenseItemId`"
                    :rules="[{ required: true, message: '费用项目不能为空' }]"
                  >
                    <a-select
                      :model-value="form.collectList[rowIndex].billId"
                      :field-names="{ value: 'billId' }"
                      @change="onCollectRecordFeeChange($event, rowIndex)"
                    >
                      <a-option
                        v-for="i in billItemList"
                        :key="i.billId"
                        :value="i.billId"
                        >{{ i.label }}</a-option
                      >
                    </a-select>
                  </a-form-item>
                </template>
                <template #remarkCell="{ record }">
                  <a-textarea v-model="record.remark"></a-textarea>
                </template>
                <template #amountCell="{ record, rowIndex }">
                  <a-form-item
                    hide-label
                    :field="`collectList.${rowIndex}.amount`"
                    :rules="[{ required: true, message: '支付金额不能为空' }]"
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
                      format="YYYY-MM-DD"
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
                    <a-select
                      v-model="record.payMethodId"
                      @change="onPayMethodChange(record, rowIndex)"
                    >
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
        :project-id="billInfo.projectId"
        :merchant-id="String(billInfo.merchantId || '')"
        :source="isPay ? 'pay' : 'collect'"
        :bill-list="billList"
      ></add-form>
    </div>
    <template #footer>
      <a-button @click="onCancel">取消</a-button>
      <a-button
        v-permission="['mis:payment:commit']"
        :loading="cerLoading"
        type="primary"
        @click="onSave(1)"
        >保存</a-button
      >
      <a-button
        v-permission="['mis:payment:commit']"
        :loading="cerLoading"
        type="primary"
        @click="onCertain"
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
  import { ref, computed, watch, onMounted, Ref, PropType } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ITable from '@/components/i-table/index.vue';
  import IForm from '@/components/i-form/index.vue';
  import AddForm from './addForm.vue';
  import NP from 'number-precision';
  import Bus from '../event';
  import SubConfirm from './subConfirm.vue';
  import {
    CbdApiProjectMisBillAddCollectionPostResponse,
    cbdApiProjectMisPaymentCommitPost,
    CbdApiProjectMisPaymentCommitPostRequest,
    cbdApiProjectMisPaymentQueryDepositAccountGet,
    CbdApiProjectMisPaymentQueryDepositAccountGetResponse,
    cbdApiProjectMisPayMethodListPost,
    CbdApiProjectMisPayMethodListPostResponse
  } from '@/api';
  import { getExpenseList } from '@/views/finance-manage/useGetCommonData';
  import { Message, Modal } from '@arco-design/web-vue';
  import { useRequest } from '@har/use';
  import { formatPrice } from '@/utils';
  import lsStore from '@/utils/ls-store';

  type SelectData = CbdApiProjectMisBillAddCollectionPostResponse[0];
  type DisCountItem = {
    billId: number;
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
    amount: number;
    billId: number;
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
  const billList = ref<SelectData[]>([]);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    hideSelect: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array as PropType<SelectData[]>,
      default: () => []
    },
    disabledSelect: {
      type: Boolean,
      default: false
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
  const isPay = computed(() => {
    return billInfo.value.billType === 2;
  });
  const BIPArr = ['202212270004', '202212270003', '202212270009'];
  const isShowDiscount = computed(() => {
    if (billList.value.length !== 1) {
      return true;
    } else {
      return !BIPArr.includes(billList.value[0].expenseKey!);
    }
  });
  const disCountItemList = computed(() => {
    const arr: any = [];
    billList.value.forEach((el: SelectData) => {
      if (!BIPArr.includes(el.expenseKey!)) {
        arr.push({
          label: `${el.expenseItemsName}(${el.paymentDays})`,
          expenseItemsId: el.expenseItemsId,
          billId: el.id,
          expenseName: el.expenseItemsName
        });
      }
    });
    return arr;
  });
  const billItemList = computed(() => {
    const arr: any = [];
    billList.value.forEach((el: SelectData) => {
      arr.push({
        label: `${el.expenseItemsName}(${el.paymentDays})`,
        expenseItemsId: el.expenseItemsId,
        billId: el.id,
        expenseName: el.expenseItemsName
      });
    });
    return arr;
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
          width: 140,
          prop: 'billItemId'
        },
        {
          label: '抵扣费用项目',
          width: 140,
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
  const expenseItemsList =
    ref<CbdApiProjectMisPaymentQueryDepositAccountGetResponse>([]);
  const onAddDiscountList = () => {
    form.value.discountList.push({} as DisCountItem);
  };
  const onDisCountFeeChange = (record: DisCountItem, idx: number, e: any) => {
    const item = billItemList.value.find((el: any) => el.billId === e);
    form.value.discountList[idx].billItemName = item!.expenseName!;
    form.value.discountList[idx].billItemId = item!.expenseItemsId!;
    form.value.discountList[idx].billId = item!.billId!;
  };
  const onDisCountFeeItemChange = (
    v: any,
    index: number,
    record: DisCountItem
  ) => {
    form.value.discountList[index].usableAmount = 0;
    const tempArr = form.value.discountList
      .filter((el) => el.expenseItemId === v)
      .map(({ usableAmount }: DisCountItem) => usableAmount)
      .filter((el) => el);
    const t: number = Math.min.apply(null, tempArr || []);
    const item = expenseItemsList.value.find((el) => el.expenseItemId === v);
    form.value.discountList[index].usableAmount =
      tempArr && tempArr.length ? t : item!.availableAmount!;
    form.value.discountList[index].expenseItemName = item!.expenseItemName;
    form.value.discountList[index].billItemName = record.billItemName;
    form.value.discountList[index].billItemId = record.billItemId;
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
          width: 140,
          prop: 'expenseItemId'
        },
        {
          label: '支付金额',
          width: 140,
          prop: 'amount'
        },
        {
          label: '到账日期',
          width: 130,
          prop: 'doneDate'
        },
        {
          label: '支付方式',
          width: 140,
          prop: 'payMethodId'
        },
        {
          label: '付款人',
          width: 120,
          prop: 'payUserName',
          rules: [{ required: true, message: '请完善付款人信息后' }]
        },
        {
          label: '操作人',
          width: 120,
          prop: ''
        },
        {
          label: '操作时间',
          width: 120,
          prop: ''
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
  const onCollectRecordFeeChange = (e: any, idx: number) => {
    const item = billItemList.value.find((el: any) => el.billId === e);
    form.value.collectList[idx].billId = item!.billId!;
    form.value.collectList[idx].expenseItemId = item!.expenseItemsId!;
    form.value.collectList[idx].expenseItemName = item!.expenseName!;
  };
  const onPayMethodChange = (e: any, idx: number) => {
    const item = payMethodsList.value.find(
      (el: PayItem) => el.value === e.payMethodId
    );
    form.value.collectList[idx].payMethodName = item!.label!;
  };
  const deleteCollect = (idx: number) => {
    form.value.collectList.splice(idx, 1);
    dataForm.value.clearValidate();
  };
  const onChooseBill = () => {
    // 找到 添加了折扣信息或者收付款信息的
    const disableKeys: number[] =
      billList.value
        .filter(
          (el: SelectData) =>
            form.value.discountList.some(
              (a: DisCountItem) => a.billId === el.id
            ) ||
            form.value.collectList.some(
              (a: CollectRecord) => a.billId === el.id
            )
        )
        .map((b: SelectData) => b.id) || [];
    Bus.$emit('disable', disableKeys);
    lsStore.setItem('discountList', form.value.discountList);
    lsStore.setItem('collectList', form.value.collectList);
    lsStore.setItem('cpAccount', cpInfo.value);
    visible.value = false;
  };
  const onCancel = () => {
    console.log(1111111111);
    Bus.$emit('disable', []);
    lsStore.setItem('discountList', []);
    lsStore.setItem('collectList', []);
    lsStore.setItem('cpAccount', {});
    visible.value = false;
  };
  // 返款相关
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
          width: 140,
          prop: 'expenseItemId'
        },
        {
          label: '支付金额',
          width: 140,
          prop: 'amount'
        },
        {
          label: '到账日期',
          width: 130,
          prop: 'doneDate'
        },
        {
          label: '支付方式',
          width: 140,
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
  // 公共数据
  const sumData = (
    arr: SelectData[],
    key:
      | 'amountShouldReceived'
      | 'deductionAmount'
      | 'collectionAndPaymentAmount'
      | 'amountNotReceived'
  ) => {
    let t = 0;
    if (arr.length) {
      arr.forEach((el: SelectData) => {
        t = NP.plus(el[key]! || 0, t);
      });
    }
    return t;
  };
  const billInfo = computed(() => {
    return {
      ...((props.data && props.data[0]) || {}),
      receivableAmount: sumData(billList.value, 'amountShouldReceived'),
      deductionAmount: sumData(billList.value, 'deductionAmount'),
      collectionAndPaymentAmount: sumData(
        billList.value,
        'collectionAndPaymentAmount'
      ),
      amountNotReceived: sumData(billList.value, 'amountNotReceived')
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
          width: 210,
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
          formatter: (e: SelectData) => formatPrice(e.amountShouldReceived)
        },
        {
          label: isPay.value ? '已付' : '已收',
          width: 120,
          prop: 'collectionAndPaymentAmount',
          formatter: (e: SelectData) =>
            formatPrice(e.collectionAndPaymentAmount)
        },
        {
          label: isPay.value ? '未付' : '未收',
          width: 120,
          prop: 'amountNotReceived',
          formatter: (e: SelectData) => formatPrice(e.amountNotReceived)
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

  // 确认
  const { run: onSaveSubmit, loading: cerLoading } = useRequest(
    cbdApiProjectMisPaymentCommitPost,
    {
      manual: true,
      onSuccess() {
        visible.value = false;
        Message.success('保存成功!');
        lsStore.setItem('discountList', []);
        lsStore.setItem('collectList', []);
        emits('refresh');
      }
    }
  );
  // 删除某行
  const deleteOneBill = (record: SelectData) => {
    const flag: boolean =
      form.value.collectList.some(
        (el: CollectRecord) => el.billId === record.id
      ) ||
      form.value.discountList.some(
        (el: DisCountItem) => el.billId === record.id
      );
    if (flag) {
      Message.error('账单存在抵扣记录或收返款记录，无法删除');
      return false;
    }
    Modal.open({
      title: '警告',
      content: '数据删除后无法恢复,是否删除?',
      onOk() {
        Bus.$emit('delete', record.id);
        billList.value = billList.value.filter(
          (el: SelectData) => el.id !== record.id
        );
      }
    });
  };
  const configData = ref({
    autoOpenInvoice: 1,
    remark: ''
  });
  // 提交
  const onSave = async (type = 1) => {
    const t = await dataForm.value.submit();
    if (t) return false;
    const res = await AddFormRef.value!.submit();
    if (res) return false;
    const temp = {
      ...cpInfo.value,
      resourceList: (cpInfo.value.resourceList || []).map(
        (el: any) => el.key || el.id
      )
    };
    const tempArr = billList.value.map((el: SelectData) => {
      return {
        billId: el.id,
        paymentType: el.billType,
        ...temp,
        payAccountId:
          el.billType === 1 ? billInfo.value.merchantId : temp.payAccountId,
        receiptAccountId:
          el.billType === 2 ? billInfo.value.merchantId : temp.payAccountId
      };
    });
    // 根据账单聚合收款记录
    tempArr.forEach((el: any) => {
      const recordList: any[] = [];
      const cutList: any[] = [];
      form.value.collectList.forEach((each: CollectRecord) => {
        if (el.billId === each.billId) {
          recordList.push(each);
        }
      });
      form.value.discountList.forEach((every: DisCountItem) => {
        if (el.billId === every.billId) {
          cutList.push(every);
        }
      });
      el.recordList = recordList;
      el.cutList = cutList;
    });
    const tempList = tempArr.filter(
      (a: any) => a.recordList?.length || a.cutList?.length
    );
    if (!tempList.length) {
      Message.error('请添加收付款记录或抵扣记录');
      return false;
    }
    const query = {
      actionType: type,
      autoOpenInvoice:
        type === 1 ? undefined : configData.value.autoOpenInvoice,
      remark: configData.value.remark,
      dataList: tempList
    };

    onSaveSubmit({
      ...query
    } as unknown as CbdApiProjectMisPaymentCommitPostRequest);
  };
  // 确认
  const submitCertainVisible = ref(false);
  const onCertain = async () => {
    const t = await dataForm.value.submit();
    if (t) return false;
    const res = await AddFormRef.value!.submit();
    if (res) return false;
    submitCertainVisible.value = true;
  };
  type FormItems = {
    autoOpenInvoice: number;
    remark: string;
  };
  const getDataAndSub = (d: FormItems) => {
    configData.value = d;
    onSave(2);
  };
  const { run: getExpenseItems } = useRequest(
    cbdApiProjectMisPaymentQueryDepositAccountGet,
    {
      manual: true,
      onSuccess(res) {
        expenseItemsList.value = res;
      }
    }
  );
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
  onMounted(async () => {
    getExpenseList({ parentExpenseCode: '0' });
    form.value.discountList = lsStore.getItem('discountList') || [];
    form.value.collectList = lsStore.getItem('collectList') || [];
    cpInfo.value = lsStore.getItem('cpAccount') || {
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
    };
  });
  watch(
    () => props.data,
    (v) => {
      billList.value = v;
    },
    { immediate: true }
  );
  watch(
    () => billInfo.value.contractCode,
    (v) => {
      if (v) {
        getExpenseItems({
          contractCode: v
        });
        getPayMethodsList({
          projectId: billInfo.value.projectId!,
          scenes: 1
        });
      }
    },
    { immediate: true }
  );
</script>
<style scoped lang="less">
  .add-box {
    width: 100%;
  }
</style>
