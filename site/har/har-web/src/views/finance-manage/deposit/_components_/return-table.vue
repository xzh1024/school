<template>
  <div class="table-container">
    <div class="title flex align-center justify-between">
      <div>归还记录</div>
      <a-button v-if="needEdit" type="primary" @click="onAddRow"
        >添加行</a-button
      >
    </div>
    <div class="table-box">
      <i-table :data="tableData" :options="options">
        <template #expenseItemIdCell="{ record }">
          <a-select
            v-model="record.expenseItemId"
            placeholder="请选择"
            :disabled="!record.isEdit"
            allow-clear
            @popup-visible-change="onSelectChange"
            @change="expenseOnChange"
          >
            <a-option
              v-for="(item, index) in costFeeArr"
              :key="`c_${index}`"
              :value="item.value"
              >{{ item.label }}</a-option
            >
          </a-select>
        </template>
        <template #changeAmountCell="{ record }">
          <!-- <i-number-input
            v-model:input-value="record.changeAmount"
            :disabled="!record.isEdit"
            value-type="plus"
            :max-value="maxReturnAmount(record.expenseItemId)"
          /> -->
          <a-input
            v-model="record.changeAmount"
            placeholder="请输入"
            :disabled="!record.isEdit"
          ></a-input>
        </template>
        <template #changeDateCell="{ record }">
          <a-date-picker
            v-model="record.changeDate"
            :disabled="!record.isEdit"
          />
        </template>
        <template #payMethodIdCell="{ record }">
          <a-select
            v-model="record.payMethodId"
            placeholder="请选择"
            :disabled="!record.isEdit"
          >
            <a-option
              v-for="(item, index) in payMethodArr"
              :key="`p_${index}`"
              :value="item.value"
              >{{ item.label }}</a-option
            >
          </a-select>
        </template>
        <template #operationNameCell="{ record }">
          <a-input
            v-model="record.operationName"
            placeholder="请输入"
            :disabled="!record.isEdit"
          ></a-input>
        </template>
        <template #operationDateCell="{ record }">
          <a-date-picker
            v-model="record.operationDate"
            :disabled="!record.isEdit"
          />
        </template>
        <template #optionalCell="{ record, rowIndex }">
          <a-space>
            <div class="s-btn" @click="onEdit(record, rowIndex)">{{
              record.isEdit ? '完成' : '编辑'
            }}</div>
            <div class="s-btn" @click="onDel(record, rowIndex)">删除</div>
          </a-space>
        </template>
      </i-table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, ref, watch } from 'vue';
  import { modalConfirm } from '@/utils';
  import { useDepositStore } from '@/store/project/deposit';
  import { Message } from '@arco-design/web-vue';
  import { useRequest } from '@har/use';
  import { cbdApiProjectCommonMisPayMethodBillGet } from '@/api';
  import INumberInput from '@/views/new-contract/__components__/i-number-input.vue';
  import NP from 'number-precision';

  const emits = defineEmits(['update:tableData']);

  type ReturnList = {
    isEdit?: number;
    expenseItemId: number | string;
    availableAmount?: string;
    changeAmount: number | string;
    changeDate: string;
    payMethodId: number | string;
    payMethodName?: string;
    operationName: string;
    operationDate: string;
  };
  const props = defineProps({
    returnTableData: {
      type: Array<ReturnList>
    },
    needEdit: {
      type: Boolean,
      default: true
    }
  });

  const depositStore = useDepositStore();

  const tableData = computed({
    get() {
      return props.returnTableData || [];
    },
    set(v) {
      console.log(v);
      emits('update:tableData', v);
    }
  });

  watch(
    () => tableData.value,
    (val) => {
      if (val.length) {
        const projectId = depositStore.costInfo.projectId + '';
        getPayMethod({ projectId });
      }
    },
    { deep: true }
  );

  type PayMethod = {
    label: string;
    value: number;
    feeRate: number;
  };
  const payMethodArr = ref<Array<PayMethod>>([]);

  const { run: getPayMethod } = useRequest(
    cbdApiProjectCommonMisPayMethodBillGet,
    {
      manual: true,
      onSuccess(e) {
        payMethodArr.value = e;
      }
    }
  );

  const costFeeArr = computed({
    get() {
      return (
        depositStore.costInfo?.constProjectList?.map((item) => {
          return {
            label: item.expenseItemName,
            value: item.expenseItemId,
            availableAmount: item.availableAmount
          };
        }) || []
      );
    },
    set(v) {
      console.log(v);
    }
  });
  // const optionsForm = ref({
  //   menuForm: false,
  //   formCard: false,
  //   columns: [
  //     {
  //       label: '',
  //       prop: 'data',
  //       span: 24,
  //       hideLabel: true
  //     }
  //   ]
  // });

  const onSelectChange = (visible: boolean) => {
    if (visible) {
    }
  };
  //
  const expenseOnChange = (value: any) => {
    console.log(value, '----*---');
  };

  // const maxReturnAmount = computed(() => (expenseItemId: number) => {
  //   // //已选择的待处理费用项目对象
  //   // const expenseItemObj = costFeeArr.value.find(
  //   //   (item) => item.value === expenseItemId
  //   // );
  //   // //当前费用项目已归还记录
  //   // const list = tableData.value.find(
  //   //   (item) => item.expenseItemId === expenseItemId
  //   // );
  //   // return (
  //   //   costFeeArr.value.find((item) => item.value === expenseItemId)
  //   //     ?.availableAmount + '' || '0'
  //   // );
  // });

  const onAddRow = () => {
    const hasEditLine = tableData.value.some((item) => item.isEdit);
    if (hasEditLine) {
      return Message.error({ content: '请先完成当前处于编辑行' });
    }
    tableData.value.push({
      isEdit: 1,
      expenseItemId: '',
      changeAmount: '',
      changeDate: '',
      payMethodId: '',
      operationName: '',
      operationDate: ''
    });
  };

  //总可处理金额
  // const totalMoney = ref(0);

  const onEdit = (record: ReturnList, index: number) => {
    if (tableData.value[index].isEdit === 1) {
      const values = Object.values(record);
      const flag = values.every((sub, i) => {
        if (sub === '') {
          Message.error({ content: `第${index + 1}行中第${i + 1}列不能为空` });
          return false;
        } else {
          return true;
        }
      });
      if (flag && isOver(record)) {
        const tempArr = tableData.value.map((item) => item.expenseItemId);
        const indexArr = tempArr
          .map((item, i) => {
            if (item === record.expenseItemId) return i;
          })
          .filter(
            (item) => item !== undefined && Number(item) > index
          ) as number[];
        console.log(indexArr, '---indexArr---');
        if (indexArr.length > 0) {
          modalConfirm('当前修改可能会影响后续相关项目金额，确认修改？', () => {
            doUpDateNextInfo(
              indexArr,
              Number(record.changeAmount),
              Number(record.availableAmount),
              0
            );
            tableData.value[index].isEdit =
              tableData.value[index].isEdit === 1 ? 0 : 1;
          });
        } else {
          tableData.value[index].isEdit =
            tableData.value[index].isEdit === 1 ? 0 : 1;
        }
      }
    } else {
      const hasEditLine = tableData.value.some((item) => item.isEdit);
      if (hasEditLine) {
        return Message.error({ content: '请先完成当前处于编辑行' });
      }
      //获取当前项总处理金额
      // calcAllAmount(record);
      tableData.value[index].isEdit = 1;
    }
    console.log(record, '---编辑---', index);
  };

  //校验当前输入金额是否超出可处理金额
  const isOver = (nowInfo: ReturnList) => {
    console.log(nowInfo.changeAmount, '当前输入的归还金额');
    //费用项目总共可处理金额
    console.log(depositStore.costInfo.constProjectList, '---*---');
    const tempObj = depositStore.costInfo.constProjectList.find(
      (item) => item.expenseItemId === nowInfo.expenseItemId
    );
    const allAmount =
      tempObj?.currentAvailableAmount || tempObj?.availableAmount || 0;
    console.log(allAmount, '总金额');
    //当前项已归还金额
    const listTotalMoney = tableData.value
      .filter(
        (item) =>
          item.expenseItemId === nowInfo.expenseItemId && item.isEdit !== 1
      )
      .reduce((pre, cur) => {
        return NP.plus(cur.changeAmount, pre);
      }, 0);
    console.log(listTotalMoney, '已归还金额');
    if (NP.minus(allAmount, listTotalMoney) < nowInfo.changeAmount) {
      Message.error({ content: '归还金额不能大于可处理金额' });
      return false;
    } else {
      return true;
    }
  };

  const doUpDateNextInfo = (
    indexArr: number[],
    nowIndexChangeMoney: number,
    availableAmount: number,
    startIndex: number
  ) => {
    tableData.value[indexArr[startIndex]].availableAmount =
      NP.minus(availableAmount, nowIndexChangeMoney) + '';
    const num = startIndex + 1;
    if (num > indexArr.length - 1) return;
    doUpDateNextInfo(
      indexArr,
      Number(tableData.value[indexArr[startIndex]].changeAmount),
      Number(tableData.value[indexArr[startIndex]].availableAmount),
      num
    );
  };

  const onDel = (record: ReturnList, index: number) => {
    console.log(record, '---删除---', index);
    modalConfirm('确认删除？', () => {
      tableData.value.splice(index, 1);
    });
  };

  // watch(
  //   () => props.returnTableData,
  //   (val: any) => {
  //     console.log(val, '---------------');
  //     val.length
  //       ? (options.menuOtherOptions.scroll.x = '140%')
  //       : (options.menuOtherOptions.scroll.x = ' ');
  //   },
  //   { deep: true }
  // );

  const options = reactive({
    menuOtherOptions: {
      scroll: {
        x: '140%'
      }
    },
    menu: false,
    menuSpan: 24,
    pageShow: false,
    tableCard: false,
    index: true,
    indexTitle: '序号',
    columns: [
      {
        label: '待处理费用项目',
        prop: 'expenseItemId',
        width: 180
      },
      {
        label: '归还金额',
        prop: 'changeAmount',
        width: 180
      },
      {
        label: '归还日期',
        prop: 'changeDate',
        width: 180
      },
      {
        label: '归还方式',
        prop: 'payMethodId',
        width: 180
      },
      {
        label: '操作人',
        prop: 'operationName',
        width: 180
      },
      {
        label: '操作时间',
        prop: 'operationDate',
        width: 180
      },
      {
        label: '操作',
        prop: 'optional',
        width: 100,
        fixed: 'right',
        hide: !props.needEdit
      }
    ]
  });
</script>

<style scoped lang="less">
  .s-btn {
    color: #4c8af7;
    font-size: 14px;
    cursor: pointer;
  }
  .table-container {
    margin: 0 0 16px;
    padding: 16px;
    background: #fff;
    .title {
      margin-bottom: 16px;
      font-size: 16px;
    }
    .table-box {
      width: 100%;
    }
  }
</style>
