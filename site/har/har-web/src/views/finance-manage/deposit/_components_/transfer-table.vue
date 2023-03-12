<template>
  <div class="table-container">
    <div class="title flex align-center justify-between">
      <div>转移记录</div>
      <a-button v-if="needEdit" type="primary" @click="onAddRow"
        >添加行</a-button
      >
    </div>
    <div class="table-box">
      <i-table :data="tableData" :options="options">
        <template #expenseItemIdCell="{ record, rowIndex }">
          <a-select
            v-model="record.expenseItemId"
            placeholder="请选择"
            :disabled="!record.isEdit"
            @change="(e) => expenseItemChange(e, rowIndex)"
          >
            <a-option
              v-for="(item, index) in costFeeArr"
              :key="`c_${index}`"
              :value="item.value"
              >{{ item.label }}</a-option
            >
          </a-select>
        </template>
        <template #changeAmountCell="{ record, rowIndex }">
          <i-number-input
            v-model:input-value="record.changeAmount"
            :disabled="!record.isEdit"
            value-type="plus"
            :max-value="maxNum(record.expenseItemId, rowIndex)"
          />
          <!-- <a-input
            v-model="record.changeAmount"
            placeholder="请输入"
            :disabled="!record.isEdit"
          ></a-input> -->
        </template>
        <template #acceptExpenseItemIdCell="{ record }">
          <a-cascader
            v-model="record.acceptExpenseItemId"
            :disabled="!record.isEdit"
            :field-names="{ value: 'expenseCode', label: 'expenseName' }"
            :options="optionsTree"
            placeholder="请选择"
          />
        </template>
        <template #changeDateCell="{ record }">
          <a-date-picker
            v-model="record.changeDate"
            :disabled="!record.isEdit"
          />
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
  import { useDepositStore } from '@/store/project/deposit';
  import { delChildrenByLength, modalConfirm } from '@/utils';
  import { Message } from '@arco-design/web-vue';
  import { useRequest } from '@har/use';
  import { cbdApiProjectCommonMisDepositTreeExpenseProjectIdGet } from '@/api';
  import INumberInput from '@/views/new-contract/__components__/i-number-input.vue';
  import NP from 'number-precision';

  const emits = defineEmits(['update:transferTableData']);

  type TransferList = {
    isEdit?: number;
    expenseItemId: number | string;
    expenseItemName?: string;
    availableAmount?: string;
    changeAmount: number | string;
    changeDate: string;
    acceptExpenseItemId: number | string;
    acceptExpenseItemName?: string;
    operationName: string;
    operationDate: string;
  };
  const props = defineProps({
    transferTableData: {
      type: Array<TransferList>
    },
    needEdit: {
      type: Boolean,
      default: true
    }
  });

  const depositStore = useDepositStore();

  const tableData = computed({
    get() {
      return props.transferTableData || [];
    },
    set(v) {
      console.log(v);
      emits('update:transferTableData', v);
    }
  });

  watch(
    () => tableData.value,
    (val) => {
      console.log(tableData.value, '----tableData------');
      if (val.length) {
        const projectId = depositStore.costInfo.projectId + '';
        getExpenseList({ projectId });
        //处理转移记录中异常数据
        // formatErrorInfo();
      }
    },
    { deep: true }
  );

  const formatErrorInfo = () => {
    //处理可处理余额为负数的情况
    const availableIndexArr = tableData.value
      .map((item, i) => {
        if (Number(item.availableAmount) < 0) return i;
      })
      .filter((item) => item !== undefined) as number[];
    console.log(availableIndexArr, '----');
    for (const i of availableIndexArr) {
      tableData.value.splice(i, 1);
    }
    //处理转移金额大于可处理余额
    // const changeIndexArr = tableData.value
    //   .map((item, i) => {
    //     if (Number(item.availableAmount) < Number(item.changeAmount)) return i;
    //   })
    //   .filter((item) => item !== undefined) as number[];
    // console.log(changeIndexArr, '----');
    // for (const i of changeIndexArr) {
    //   tableData.value[i].changeAmount = '';
    //   tableData.value[i].isEdit = 1;
    // }
  };

  //转移金额最大值
  const maxNum = computed(() => (val: number, index: number) => {
    console.log(index, '--row--');
    const tempObj = depositStore.costInfo.constProjectList.find(
      (item) => item.expenseItemId === val
    );
    return tempObj?.currentAvailableAmount
      ? String(tempObj?.currentAvailableAmount)
      : String(tempObj?.availableAmount);
  });

  type ExpenseList = {
    expenseCode: string;
    expenseName?: string;
    children?: Array<any>;
  };
  const optionsTree = ref<Array<ExpenseList>>([]);
  const { run: getExpenseList } = useRequest(
    cbdApiProjectCommonMisDepositTreeExpenseProjectIdGet,
    {
      manual: true,
      onSuccess(e) {
        optionsTree.value = delChildrenByLength(e);
      }
    }
  );

  const costFeeArr = computed({
    get() {
      return (
        depositStore.costInfo?.constProjectList?.map((item) => {
          return {
            label: item.expenseItemName,
            value: item.expenseItemId
          };
        }) || []
      );
    },
    set(v) {
      console.log(v);
    }
  });

  const expenseItemChange = (value: any, index: number) => {
    const d = depositStore.costInfo.constProjectList.find(
      (item) => Number(item.expenseItemId) === Number(value)
    );
    console.log(d, '---d---');
    tableData.value[index].availableAmount =
      (d?.currentAvailableAmount || d?.availableAmount) + '';
    //选择后计算当前费用项目剩余金额
    /*
    //转移列表中与value一样的项目
    const tempArr = tableData.value.filter(
      (item) => Number(item.expenseItemId) === Number(value)
    );
    console.log(tempArr, '-----*------');
    const sum = tempArr
      .map((item) => Number(item.changeAmount))
      .reduce((pre: number, cur: number) => {
        return NP.plus(pre, cur);
      }, 0);
    console.log(sum, '-----sum------');
    if (
      tableData.value[index] &&
      tableData.value[index].availableAmount !== undefined
    ) {
      tableData.value[index].availableAmount =
        NP.minus(d?.availableAmount || 0, sum) + '';
    }*/
  };

  //计算当前记录实际可处理金额
  // const calcAvailableAmount = () => {
  //
  // };

  const onAddRow = () => {
    const hasEditLine = tableData.value.some((item) => item.isEdit);
    if (hasEditLine) {
      return Message.error({ content: '请先完成当前处于编辑行' });
    }
    tableData.value.push({
      isEdit: 1,
      expenseItemId: '',
      // expenseItemName: '',
      availableAmount: '',
      changeAmount: '',
      changeDate: '',
      acceptExpenseItemId: '',
      // acceptExpenseItemName: '',
      operationName: '',
      operationDate: ''
    });
  };

  const onEdit = (record: TransferList, index: number) => {
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
      if (flag) {
        const tempObj = depositStore.costInfo.constProjectList.find(
          (item) => item.expenseItemId === record.expenseItemId
        );
        const realAvailableAmount = tempObj?.currentAvailableAmount
          ? tempObj?.currentAvailableAmount
          : tempObj?.availableAmount;
        console.log(realAvailableAmount, '--实际可处理金额--');
        const writeTotal = tableData.value
          .filter((item) => item.expenseItemId === record.expenseItemId)
          .reduce((pre, cur) => {
            return NP.plus(pre, Number(cur.changeAmount));
          }, 0);
        console.log(writeTotal, '--输入总金额--');
        if (writeTotal > Number(realAvailableAmount)) {
          Message.error({
            content: `转移总金额￥${writeTotal}大于可处理总金额￥${realAvailableAmount}`
          });
        } else {
          tableData.value[index].isEdit =
            tableData.value[index].isEdit === 1 ? 0 : 1;
        }

        /*const tempArr = tableData.value.map((item) => item.expenseItemId);
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
        }*/
      }
    } else {
      const hasEditLine = tableData.value.some((item) => item.isEdit);
      if (hasEditLine) {
        return Message.error({ content: '请先完成当前处于编辑行' });
      }
      tableData.value[index].isEdit = 1;
    }
    console.log(record, '---编辑---', index);
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

  const onDel = (record: TransferList, index: number) => {
    console.log(record, '---删除---', index);
    modalConfirm('确认删除？', () => {
      updateUnderOfIndex(record.expenseItemId, index);
    });
  };

  //更新删除项目之下的金额相关信息
  const updateUnderOfIndex = (
    expenseItemId: string | number,
    index: number
  ) => {
    //找出当前项目在列表中出现的所有下标
    const tempArr = tableData.value.map((item) => item.expenseItemId);
    const a = tempArr
      .map((item, i) => {
        if (item === expenseItemId) return i;
      })
      .filter((item) => item !== undefined);
    const b = a.filter((item) => Number(item) > index) as number[];
    //删除项的转移金额
    const delMoney = tableData.value[index].changeAmount;
    if (b.length) {
      for (const i of b) {
        tableData.value[i].availableAmount =
          NP.plus(tableData.value[i].availableAmount || 0, delMoney) + '';
      }
    }
    //删除该项
    tableData.value.splice(index, 1);
  };

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
        label: '可处理余额',
        prop: 'availableAmount',
        width: 180
      },
      {
        label: '转移金额',
        prop: 'changeAmount',
        width: 180
      },
      {
        label: '接受费用项目',
        prop: 'acceptExpenseItemId',
        width: 180
      },
      {
        label: '转移日期',
        prop: 'changeDate',
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
        align: 'center',
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
    //margin: 0 16px 16px 16px;
    margin-bottom: 16px;
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
