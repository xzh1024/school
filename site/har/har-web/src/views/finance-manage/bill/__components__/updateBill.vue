<template>
  <drawer
    v-model="visible"
    :mask-close="false"
    title="账单修改"
    @cancel="visible = false"
  >
    <div class="detail">
      <div class="i-card">
        <a-descriptions
          layout="vertical"
          style="padding-top: 15px"
          :value-style="{ color: '#333333', fontSize: '16px' }"
        >
          <a-descriptions-item label="账单编号：">
            {{ data.billNum || '--' }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="i-card" style="width: 100%; padding-top: 15px">
        <a-descriptions
          title="基础信息"
          layout="vertical"
          style="width: 100%; padding-bottom: 16px"
          :column="3"
        >
          <a-descriptions-item label="归属项目：">{{
            data.projectName
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
          <a-descriptions-item label="审批状态：">{{
            valueFindLabel(examine_status, data.auditStat)
          }}</a-descriptions-item>
          <a-descriptions-item label="支付状态：">{{
            valueFindLabel(business_status, data.businessStat)
          }}</a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="i-card">
        <div class="block-title">原始账单</div>
        <a-descriptions
          v-if="data.billType === 1"
          style="width: 100%"
          :column="5"
          layout="vertical"
          bordered
        >
          <a-descriptions-item label="费用项目：">{{
            data.projectName || '--'
          }}</a-descriptions-item>
          <a-descriptions-item label="收费方式：">
            {{ valueFindLabel(chargingMethodList, data.billType) }}
          </a-descriptions-item>
          <a-descriptions-item label="账单生成日期：">{{
            data.billCreateAt || '--'
          }}</a-descriptions-item>
          <a-descriptions-item label="账期：">
            {{ data.paymentDays || '--' }}
          </a-descriptions-item>
          <a-descriptions-item label="费用期间：">{{
            data.expensePeriod || '--'
          }}</a-descriptions-item>
          <a-descriptions-item label="合同金额：">{{
            formatPrice(data.amount || '')
          }}</a-descriptions-item>
          <a-descriptions-item label="税率：">{{
            (data.taxRate ? Number(data.taxRate).toFixed(2) : 0) + '%'
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
        <a-descriptions
          v-else
          style="width: 100%"
          :column="5"
          layout="vertical"
          bordered
        >
          <a-descriptions-item label="费用项目：">{{
            data.projectName || '--'
          }}</a-descriptions-item>
          <a-descriptions-item label="账单生成日期：">{{
            data.billCreateAt || '--'
          }}</a-descriptions-item>
          <a-descriptions-item label="账期：">
            {{ data.paymentDays || '--' }}
          </a-descriptions-item>
          <a-descriptions-item label="费用期间：">{{
            data.expensePeriod || '--'
          }}</a-descriptions-item>
          <a-descriptions-item label="返款金额：">{{
            formatPrice(data.revertAmount || '')
          }}</a-descriptions-item>
          <a-descriptions-item label="转预付款：">
            {{ formatPrice(data.advanceAmount || '') }}
          </a-descriptions-item>
          <a-descriptions-item label="应返金额">
            {{ formatPrice(data.shouldRevertAmount || '') }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="i-card">
        <i-table ref="TableData" :options="options" :data="tableList">
          <template #header>
            <div class="flex justify-between align-center">
              <div class="block-title">账单调整</div>
              <a-button type="primary" @click="onAddOne">添加行</a-button>
            </div>
          </template>
          <template #changeAmountCell="{ record, rowIndex }">
            <a-input-group>
              <a-select
                v-model="record.changeType"
                :options="changeTypeList"
                placeholder="请选择"
                :disabled="!record.isDelete"
                @change="onChange(record.changeAmount, rowIndex)"
              />
              <a-input-number
                :precision="2"
                hide-button
                :default-value="Number(Number(record.changeAmount).toFixed(2))"
                :disabled="!record.isDelete"
                @input="onInput($event, rowIndex)"
                @blur="onBlur(record.changeAmount, rowIndex)"
              />
            </a-input-group>
          </template>
          <template #originalBillAmountCell="{ record }">
            {{ Number(record.originalBillAmount).toFixed(2) }}
          </template>
          <template #adjustableAmountCell="{ record }">
            {{ Number(record.adjustableAmount).toFixed(2) }}
          </template>
          <template #afterAdjustableTaxAmountCell="{ record }">
            {{ Number(record.afterAdjustableTaxAmount).toFixed(2) }}
          </template>
          <template #afterShouldAmountCell="{ record }">
            {{ Number(record.afterShouldAmount).toFixed(2) }}
          </template>
          <template #afterNotAmountCell="{ record }">
            {{ Number(record.afterNotAmount).toFixed(2) }}
          </template>
          <template #remarksCell="{ record }">
            <a-textarea v-model="record.remarks" :max-length="100"></a-textarea>
          </template>
          <template #optionalCell="{ record, rowIndex }">
            <a-popconfirm
              v-if="record.history !== 1"
              content="数据删除后无法恢复，是否删除？"
              @ok="onDelete(record, rowIndex)"
            >
              <a-button :disabled="!record.isDelete" type="text" status="danger"
                >删除</a-button
              >
            </a-popconfirm>
          </template>
        </i-table>
      </div>
      <div class="i-card" style="padding-top: 16px; margin-bottom: 4px">
        <a-descriptions :column="4" table-layout="fixed" layout="vertical">
          <a-descriptions-item
            :label="data.billType === 1 ? '应收金额：' : '应付金额：'"
          >
            {{ parseFloat(String(initReceivableAmount) || '0').toFixed(2) }}
          </a-descriptions-item>
          <a-descriptions-item v-if="data.billType === 1" label="抵扣金额：">
            {{ parseFloat(String(data.deductionAmount) || '0').toFixed(2) }}
          </a-descriptions-item>
          <a-descriptions-item
            :label="data.billType === 1 ? '已收金额：' : '已付金额：'"
          >
            {{ hasCollectExcludeDiscount }}
          </a-descriptions-item>
          <a-descriptions-item
            :label="data.billType === 1 ? '未收金额：' : '未付金额：'"
          >
            {{ parseFloat(String(amountNotReceived) || '0').toFixed(2) }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
    <template #footer>
      <a-button @click="visible = false">取消</a-button>
      <a-button
        v-permission="['formal:bill:adjustable']"
        type="primary"
        @click="onSaveClick"
        >保存</a-button
      >
      <a-button
        v-permission="['formal:bill:saveAndConfirm']"
        :loading="loading"
        type="primary"
        @click="onConfirmClick"
        >确认</a-button
      >
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, Ref, onMounted } from 'vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import Drawer from '@/components/drawer/drawer.vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message } from '@arco-design/web-vue';
  import NP from 'number-precision';
  import {
    cbdApiProjectMisBillAdjustableAndConfirmPost,
    CbdApiProjectMisBillAdjustableAndConfirmPostRequest,
    cbdApiProjectMisBillAdjustablePost,
    CbdApiProjectMisBillAdjustablePostRequest,
    cbdApiProjectMisBillDetailGet,
    CbdApiProjectMisBillDetailGetResponse
  } from '@/api';
  import { valueFindLabel, formatPrice } from '@/utils';
  import {
    changeTypeList,
    chargingMethodList,
    business_status,
    examine_status
  } from '@/utils/dic';
  import { Modal } from '@arco-design/web-vue';
  import { useRequest } from '@har/use';
  type Detail = CbdApiProjectMisBillDetailGetResponse;
  type RowData = {
    id?: number;
    order?: number;
    originalBillAmount?: number;
    adjustableAmount?: number;
    changeAmount?: number;
    changeType?: number;
    afterAdjustableTaxAmount?: number;
    afterShouldAmount?: number;
    afterNotAmount?: number;
    remarks?: string;
    isDelete?: number;
  };
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
  const emits = defineEmits(['update:modelValue', 'success']);
  const TableData: Ref = ref(null);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const data = ref<Detail>({
    id: 0,
    expensesAdjust: []
  } as unknown as Detail);
  const initReceivableAmount = ref<number | undefined>(undefined);
  // const amountNotReceived = computed(() => {
  //   return tableList.value.length
  //     ? tableList.value[tableList.value.length - 1].afterNotAmount
  //     : data.value.amountNotReceived;
  // });
  const hasCollectExcludeDiscount = computed(() => {
    const t = NP.minus(
      data.value.collectionAndPaymentAmount || 0,
      data.value.deductionAmount || 0
    );
    return formatPrice(t);
  });
  const amountNotReceived = ref<number | undefined>(undefined);

  const options = computed(() => {
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
          width: 150
        },
        {
          label: '可调整金额',
          prop: 'adjustableAmount',
          width: 150
        },
        {
          label: '调整金额',
          prop: 'changeAmount',
          width: 250
        },
        {
          label: '调整税额',
          prop: 'afterAdjustableTaxAmount',
          width: 150
        },
        {
          label:
            data.value.billType === 1 ? '调整后应收金额' : '调整后应付金额',
          prop: 'afterShouldAmount',
          width: 150
        },
        {
          label:
            data.value.billType === 1 ? '调整后未收金额' : '调整后未付金额',
          prop: 'afterNotAmount',
          width: 150
        },
        {
          label: '备注',
          prop: 'remarks',
          width: 150
        },
        {
          label: '操作',
          prop: 'optional',
          width: 140,
          fixed: 'right'
        }
      ]
    };
  });
  const tableList = ref<RowData[]>([]);
  const onAddOne = () => {
    const last = tableList.value[tableList.value.length - 1];
    tableList.value.push({
      // originalBillAmount: tableList.value.length
      //   ? last.afterShouldAmount
      //   : data.value.initReceivableAmount,
      originalBillAmount: tableList.value.length
        ? last.afterShouldAmount
        : data.value.receivableAmount,
      adjustableAmount: tableList.value.length
        ? NP.minus(
            last.afterShouldAmount!,
            data.value.collectionAndPaymentAmount!
          )
        : data.value.amountNotReceived,
      changeAmount: 0,
      changeType: 1,
      afterAdjustableTaxAmount: 0,
      afterShouldAmount: 0,
      afterNotAmount: 0,
      remarks: '',
      isDelete: 1
    });
    onBlur(0, tableList.value.length - 1);
  };
  const onDelete = (record: RowData, idx: number) => {
    const hasNext = !!tableList.value[idx + 1];
    tableList.value.splice(idx, 1);
    // 有下一行处理下一行
    if (hasNext) {
      // 是第一条?
      if (idx === 0) {
        tableList.value[0].originalBillAmount = data.value.initReceivableAmount;
        tableList.value[0].adjustableAmount = data.value.amountNotReceived;
      } else {
        const last = tableList.value[idx - 1];
        tableList.value[idx].originalBillAmount = last.afterShouldAmount;
        tableList.value[idx].adjustableAmount = last.afterNotAmount;
      }
      onBlur(tableList.value[idx].changeAmount || 0, idx);
    }
  };
  const onChange = (a: number, idx: number) => {
    onBlur(a, idx);
  };
  const onInput = (e: any, idx: number) => {
    tableList.value[idx].changeAmount = e;
  };
  const onBlur = (num: number, idx: number) => {
    const current = tableList.value[idx];
    const pre = tableList.value[idx - 1];
    const a = num;
    // 调整类型1，调增 2，调减
    const adjustAmount = current.changeType == 2 ? -a : a;
    const taxAmount = NP.times(adjustAmount, data.value.taxRate!) / 100;
    if (pre) {
      tableList.value[idx].adjustableAmount = NP.minus(
        pre.afterShouldAmount!,
        data.value.collectionAndPaymentAmount!
      );
    } else {
      // 第一次添加
      // tableList.value[idx].originalBillAmount = NP.minus(
      //   Number(data.value.amount),
      //   Number(data.value.collectionAndPaymentAmount)
      // );
    }
    // 调整税额 调整金额*税率
    tableList.value[idx].afterAdjustableTaxAmount = taxAmount;
    // 计算调整后的应收/应付金额 = 原账单金额 + 调整金额 + 调整税额
    tableList.value[idx].afterShouldAmount = NP.plus(
      tableList.value[idx].originalBillAmount!,
      adjustAmount,
      taxAmount
    );
    // 计算调整后的未收金额 = 可调整金额 + 调整金额 + 调整税额
    tableList.value[idx].afterNotAmount = NP.plus(
      current.adjustableAmount!,
      adjustAmount,
      taxAmount
    );
    // 修改页面底部显示数据
    amountNotReceived.value =
      tableList.value[tableList.value.length - 1].afterNotAmount;
    initReceivableAmount.value =
      tableList.value[tableList.value.length - 1].afterShouldAmount;
    if (tableList.value[idx + 1]) {
      onBlur(tableList.value[idx + 1].changeAmount || 0, idx + 1);
    }
  };
  const [getDetailData] = useFuncProxy(async () => {
    data.value = await cbdApiProjectMisBillDetailGet({
      id: props.id
    });
    tableList.value = data.value.billAdjustableDetails || [];
    amountNotReceived.value = data.value.amountNotReceived;
    initReceivableAmount.value = data.value.initReceivableAmount;
  });
  const { run: onConfirm, loading } = useRequest(
    cbdApiProjectMisBillAdjustableAndConfirmPost,
    {
      manual: true,
      onSuccess() {
        Message.success('保存成功!');
        emits('success');
        visible.value = false;
      }
    }
  );
  const findFirstUnHandleAble = () => {
    let firstHandleIdx = 0;
    if (tableList.value[0] && tableList.value[0].isDelete === 1) {
      return firstHandleIdx;
    }
    tableList.value.forEach((el: RowData, idx) => {
      if (
        el.isDelete === 0 &&
        tableList.value[idx + 1] &&
        tableList.value[idx + 1].isDelete === 1
      ) {
        firstHandleIdx = idx + 1;
      }
    });
    return firstHandleIdx;
  };
  const onConfirmClick = () => {
    Modal.open({
      title: '警告',
      content: '数据将重新审批, 确定要提交审批吗',
      onOk: async () => {
        const idx = findFirstUnHandleAble();
        if (tableList.value.length) {
          onBlur(tableList.value[idx].changeAmount!, idx);
        }
        let isOverSize = false;
        tableList.value.forEach((el: RowData, idx: number) => {
          el.order = idx;
          if (
            el.changeType === 2 &&
            Number(el.changeAmount!) > Number(el.adjustableAmount!)
          ) {
            isOverSize = true;
          }
        });
        if (isOverSize) {
          Message.error('调整金额不能大于可调整金额');
          return false;
        }
        await onConfirm({
          id: Number(props.id),
          billId: Number(props.id),
          expenseItemsId: data.value.expenseItemsId!,
          billAdjustableDetailReqList: tableList.value
        } as CbdApiProjectMisBillAdjustableAndConfirmPostRequest);
      }
    });
  };
  const onSaveClick = async () => {
    const idx = findFirstUnHandleAble();
    if (tableList.value && tableList.value.length) {
      onBlur(tableList.value[idx].changeAmount!, idx);
    }
    let isOverSize = false;
    tableList.value.forEach((el: RowData, idx: number) => {
      el.order = idx;
      if (
        el.changeType === 2 &&
        Number(el.changeAmount!) > Number(el.adjustableAmount!)
      ) {
        isOverSize = true;
      }
    });
    if (isOverSize) {
      Message.error('调整金额不能大于可调整金额');
      return false;
    }
    await cbdApiProjectMisBillAdjustablePost({
      id: Number(props.id),
      billId: Number(props.id),
      expenseItemsId: data.value.expenseItemsId!,
      billAdjustableDetailReqList: tableList.value
    } as CbdApiProjectMisBillAdjustablePostRequest);
    Message.success('保存成功!');
    emits('success');
    visible.value = false;
  };
  onMounted(() => {
    console.log(props.id);
    if (props.id) {
      getDetailData();
    }
  });
</script>
<style scoped lang="less">
  .detail {
    width: 100%;
  }
  .i-card {
    margin-bottom: 16px;
    padding-top: 0;
  }
</style>
