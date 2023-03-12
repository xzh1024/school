<template>
  <div>
    <a-button type="primary" @click="editRules">{{ calcText }}</a-button>
    <tab-item-desc
      v-show="chargingRule.type"
      :tab-item-info="typeInfo"
    ></tab-item-desc>
    <i-table
      v-if="
        chargingRule.type === 1 && typeInfo.payPlan && typeInfo.payPlan.length
      "
      :options="options"
      :data="typeInfo.payPlan"
    >
      <template #payStartDateCell="{ record, rowIndex }">
        <div v-if="record.payStartDate === 'total'">合计</div>
        <a-date-picker
          v-else
          :model-value="record.payStartDate"
          allow-clear
          placeholder="请选择时间"
          @change="(e) => dateChange(e, record, rowIndex)"
        ></a-date-picker>
      </template>
      <template #discountAmountCell="{ record, rowIndex }">
        <div class="input-n">
          <a-input-number
            v-model="record.discountAmount"
            @change="(v) => inputBlur(v, record, rowIndex)"
          ></a-input-number>
        </div>
      </template>
    </i-table>
    <i-modal
      v-model="ruleVisible"
      :width="900"
      :options="{ footer: false }"
      title="计费规则"
    >
      <setting-rule
        v-if="ruleVisible"
        :code="typeInfo.costTypeCode"
        :default-value="typeInfo"
        :month="month"
        @cancel="ruleVisible = false"
        @confirm="confirm"
      ></setting-rule>
    </i-modal>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'TabItem'
  };
</script>

<script lang="ts" setup>
  import { computed, ref, Ref } from 'vue';
  import IModal from '@/components/i-modal/index.vue';
  import ITable from '@/components/i-table/index.vue';
  import SettingRule from '@/views/contract/__components__/setting-rule.vue';
  import { sectionToChinese } from '@/utils';
  import { Message } from '@arco-design/web-vue';
  import NP from 'number-precision';
  import dayjs from 'dayjs';
  import TabItemDesc from './tab-item-desc.vue';

  const props = defineProps({
    modelValue: {
      type: Object
    },
    validateFunc: {
      type: Function
    },
    month: {
      type: Number,
      default: 0
    },
    areaArr: {
      type: Array,
      default: () => []
    },
    contractDate: {
      type: Array
    },
    isHouseRental: {
      type: Boolean,
      default: false
    }
  });
  const emits = defineEmits(['update:modelValue', 'calcChange', 'dateChange']);
  const typeInfo: Ref = computed({
    get() {
      return props.modelValue || {};
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const chargingRule = computed(() => {
    return typeInfo.value?.chargingRule || {};
  });
  const contractStartTime: Ref = computed(() => {
    const [start] = props.contractDate || [];
    return start;
  });
  const ruleVisible = ref(false);
  const options = ref({
    pageShow: false,
    align: 'center',
    menu: false,
    tableCard: false,
    // summary: true,
    menuOtherOptions: {
      summary({ data = [] }) {
        const countData = {
          payEndDate: 'total',
          cycle: '',
          totalAmount: 0,
          discountAmount: 0,
          receivableAmount: 0
        };
        data.forEach((record: any) => {
          countData.totalAmount = NP.plus(
            countData.totalAmount,
            record.totalAmount
          );
          countData.discountAmount = NP.plus(
            countData.discountAmount,
            record.discountAmount
          );
          countData.receivableAmount = NP.plus(
            countData.receivableAmount,
            record.receivableAmount
          );
        });
        return [countData];
      }
    },
    columns: [
      {
        label: '缴费截止日期',
        prop: 'payEndDate'
      },
      {
        label: '期数',
        prop: 'cycle',
        formatter: (v: any) => {
          const i = sectionToChinese(v.cycle);
          return v.cycle ? `第${i}期` : '-';
        }
      },
      {
        label: '优惠前金额（¥）',
        prop: 'totalAmount'
      },
      {
        label: '优惠金额',
        prop: 'discountAmount'
      },
      {
        label: '应收金额（¥）',
        prop: 'receivableAmount'
      }
    ]
  });
  const calcLoading: Ref<boolean> = ref(false);
  interface ruleType {
    costTypeId: number;
    costTypeName: string;
    payScheme?: number;
    chargingRule: {
      [key: string]: any;
    };
    expireRules: Array<any>;
    payPlan?: Array<any>;
  }
  function confirm(obj: ruleType) {
    typeInfo.value.payScheme = obj.payScheme;
    confirmGenerate(obj);
    ruleVisible.value = false;
  }
  const calcText = computed(() => {
    const { type } = chargingRule.value;
    if (type) return '修改计费规则';
    return '添加计费规则';
  });

  async function editRules() {
    if (await props.validateFunc?.()) {
      return false;
    }
    if (props.isHouseRental) return Message.error('房源已出租,请选择其他房源');
    ruleVisible.value = true;
  }

  // eslint-disable-next-line consistent-return
  async function confirmGenerate(obj: any) {
    const { chargingRule = {} } = obj;
    const { method, type } = chargingRule;
    // console.log(await props.validateFunc?.());
    calcLoading.value = true;
    let tempArr = [];
    if (type === 1) {
      switch (method) {
        case 1:
          tempArr = squareCalc('square', obj);
          break;
        case 2:
          tempArr = squareCalc('quota', obj);
          break;
        default:
          console.log('暂无当前类型');
      }
    }
    typeInfo.value = {
      ...typeInfo.value,
      ...obj,
      payPlan: tempArr
    };

    calcLoading.value = false;
    emits('calcChange');
  }

  // 根据选择月份 和缴费方案 获取期数（每一期有几个月）
  const getPeriod = computed(() => {
    const { month } = props;
    const { payScheme = 0 } = typeInfo.value;
    // 期数
    const numberPeriod: Array<number> = [];
    // 取余
    const surplus = month % payScheme;

    if (surplus === 0) {
      const res = NP.divide(month, payScheme);
      for (let i = 0; i < res; i++) {
        numberPeriod.push(payScheme);
      }
    } else {
      const res = Math.floor(NP.divide(month, payScheme));
      for (let i = 0; i < res; i++) {
        numberPeriod.push(payScheme);
      }
      numberPeriod.push(surplus);
    }
    return numberPeriod;
  });

  // quota 定额  square 平方价格
  function squareCalc(type: string, obj: any = {}) {
    const area = props.areaArr as Array<number>;
    const {
      chargingRule: { amount = 0 }
    } = obj;
    console.log(amount, 'amount', getPeriod.value);
    //  总面积
    const newArea = area.reduce((prev, next) => {
      return NP.plus(prev, next);
    }, 0);
    // 生成table表
    const arr: Array<any> = [];
    let temporary = 0;
    getPeriod.value.forEach((i, index) => {
      let allPrice = 0;
      if (type === 'quota') {
        allPrice = NP.times(amount, i);
      } else {
        allPrice = NP.times(newArea, amount, i);
      }
      const date = contractStartTime.value
        ? dayjs(contractStartTime.value)
            .add(temporary, 'month')
            .format('YYYY-MM-DD')
        : '';
      temporary = NP.plus(temporary, i);
      arr.push({
        date,
        payStartDate: date,
        payEndDate: date,
        code: new Date().getTime() + index,
        monthCount: i,
        cycle: index + 1,
        totalAmount: allPrice,
        discountAmount: 0,
        receivableAmount: allPrice
      });
    });

    console.log(arr);
    // typeInfo.value.payPlan = arr;
    return arr;
  }
  // 失去焦点重新计算
  function inputBlur(v: any, item: any, index: number) {
    const { totalAmount } = item;
    let res = NP.minus(totalAmount, v);
    if (res < 0) res = 0;
    typeInfo.value.payPlan[index] = {
      ...item,
      receivableAmount: res
    };
    console.log('触发计算');
    emits('calcChange');
  }

  function dateChange(
    value: Date | string | number | undefined,
    item: any,
    index: number
  ) {
    // const timer = setTimeout(() => {
    console.log(value, index, 'item');
    const newItem = {
      ...item,
      date: value,
      payStartDate: value,
      payEndDate: value
    };
    typeInfo.value.payPlan[index] = newItem;
    emits('dateChange', newItem);
    // clearTimeout(timer);
    // }, 0);
  }
</script>

<style scoped lang="less">
  :deep(.arco-input-number-step) {
    display: none;
  }

  .input-n {
    :deep(.arco-input) {
      text-align: center;
    }

    :deep(.arco-input-wrapper) {
      padding-right: 0;
    }
  }

  :deep(.select-min-width) {
    width: 180px;
  }
</style>
