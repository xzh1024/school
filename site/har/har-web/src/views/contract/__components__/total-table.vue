<template>
  <div v-if="form.contractEstateList && form.contractEstateList.length">
    <i-table :options="options" :data="form.contractEstateList">
      <template #leasePurposeIdCell="{ record }">
        <a-select
          v-if="record.menu !== 'total'"
          v-model="record.leasePurposeId"
          placeholder="请选择租赁用途"
          @change="(v) => leaseChange(v, record)"
        >
          <a-option
            v-for="(item, index) in leaseList"
            :key="index"
            :value="item.id"
            >{{ item.dataName }}</a-option
          >
        </a-select>
        <span v-else>-</span>
      </template>
      <template #manageIdCell="{ record }">
        <a-cascader
          v-if="record.menu !== 'total'"
          v-model="record.manageId"
          :options="businessTypeList"
          path-mode
          :field-names="{
            value: 'id'
          }"
          placeholder="请选择业态"
          @change="(v) => manageChange(v, record)"
        >
        </a-cascader>
        <span v-else>-</span>
      </template>
      <template #menu="{ record, rowIndex }">
        <template v-if="record.menu !== 'total'">
          <a-button type="text" @click="firstDeduction(record, rowIndex)"
            >优先扣款</a-button
          >
          <a-button type="text" @click="endDeduction(record, rowIndex)"
            >延后扣款</a-button
          >
          <a-button type="text" @click="viewDetails(record)">查看</a-button>
        </template>
        <span v-else>-</span>
      </template>
    </i-table>
    <i-modal
      v-model="visible"
      title="查看"
      :width="1000"
      :options="{ okText: '关闭', hideCancel: true }"
    >
      <view-detail v-if="visible" :info="currentView" />
    </i-modal>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'TotalTable'
  };
</script>

<script lang="ts" setup>
  import ITable from '@/components/i-table/index.vue';
  import { computed, nextTick, onMounted, Ref, ref } from 'vue';
  import IModal from '@/components/i-modal/index.vue';
  import ViewDetail from '@/views/contract/__components__/view-detail.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import NP from 'number-precision';
  import {
    cbdApiProjectCommonFormatSelectListGet,
    cbdApiProjectCommonGetDictDataCodeGet,
    CbdApiProjectCommonGetDictDataCodeGetResponse
  } from '@/api';

  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => {
        return {};
      }
    }
  });
  const businessTypeList: Ref = ref([]);
  const currentView = ref({});
  const visible: Ref<boolean> = ref(false);
  const emits = defineEmits(['update:modelValue', 'calcChange']);
  const leaseList = ref<CbdApiProjectCommonGetDictDataCodeGetResponse>([]);
  const form: Ref = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  interface countDataType {
    estateName: string;
    acreage: number;
    receivableAmount: number | string;
    manageId: string;
    leasePurposeId: string;
    menu: string;
  }
  const options = ref({
    pageShow: false,
    tableCard: false,
    align: 'center',
    menuOtherOptions: {
      summary({ data = [] }) {
        const countData: countDataType = {
          estateName: '合计',
          acreage: 0,
          receivableAmount: 0,
          manageId: 'total',
          leasePurposeId: 'total',
          menu: 'total'
        };
        let isCommission = false;
        data.forEach((record: any) => {
          countData.acreage = NP.plus(countData.acreage, record.acreage);
          countData.receivableAmount = NP.plus(
            countData.receivableAmount,
            record.receivableAmount || 0
          );
          const { estatePayPlanList = [] } = record;
          isCommission = estatePayPlanList.some((i: any) => {
            const { chargingRule = {} } = i;
            return chargingRule.type === 2;
          });
        });
        if (isCommission) {
          const { receivableAmount } = countData;
          countData.receivableAmount =
            receivableAmount > 0 ? `${receivableAmount} + 抽佣` : '抽佣';
        }
        return [countData];
      }
    },
    columns: [
      {
        label: '资产',
        prop: 'estateName',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '面积(㎡)',
        prop: 'acreage',
        options: {
          width: 90
        }
      },
      {
        label: '应收金额（¥）',
        prop: 'receivableAmount',
        formatter: (record: any) => {
          const { estatePayPlanList = [], receivableAmount } = record;
          const hasCommission = estatePayPlanList.some((i: any) => {
            const { chargingRule = {} } = i;
            return chargingRule.type === 2;
          });
          if (hasCommission) {
            return receivableAmount > 0 ? `${receivableAmount} + 抽佣` : '抽佣';
          }
          return receivableAmount;
        },
        options: {
          width: 100
        }
      },
      {
        label: '租赁用途',
        prop: 'leasePurposeId'
      },
      {
        label: '经营业态',
        prop: 'manageId'
      }
    ]
  });

  const [getBusiness] = useFuncProxy(async () => {
    const res = await cbdApiProjectCommonFormatSelectListGet(
      {},
      { cache: true, cacheKey: 'formatSelect', cacheTime: 300000 }
    );
    businessTypeList.value = filterList(res);
    // console.log('字典请求完成');
  });
  const [getLeaseList] = useFuncProxy(async () => {
    leaseList.value = await cbdApiProjectCommonGetDictDataCodeGet(
      {
        code: `00008`
      },
      { cache: true, cacheKey: '00008', cacheTime: 60000 }
    );
    // console.log('字典请求完成');
  });
  onMounted(() => {
    getBusiness();
    getLeaseList();
  });
  function firstDeduction(record: any, index: number) {
    if (!index) return false;
    const contractEstateList = form.value?.contractEstateList || [];
    // 先存前一个
    const temp = contractEstateList[index - 1];
    contractEstateList[index - 1] = {
      ...contractEstateList[index],
      deductionSort: index - 1
    };
    contractEstateList[index] = { ...temp, deductionSort: index };
    //替换计算预案数据位置

    const contract = form.value?.contract || [];
    const temp1 = contract[index - 1];
    contract[index - 1] = contract[index];
    contract[index] = temp1;

    nextTick(() => {
      console.log('calcChange更改');
      emits('calcChange');
    });
    return true;
  }

  // 后置
  function endDeduction(record: any, index: number) {
    const contractEstateList = form.value?.contractEstateList || [];
    if (index === contractEstateList.length - 1) return false;
    const temp = contractEstateList[index + 1];
    contractEstateList[index + 1] = contractEstateList[index];
    contractEstateList[index] = temp;

    //替换计算预案数据位置
    const contract = form.value?.contract || [];
    const temp1 = contract[index + 1];
    contract[index + 1] = {
      ...contract[index],
      deductionSort: index + 1
    };
    contract[index] = temp1;
    return true;
  }

  function viewDetails(record: any) {
    currentView.value = record;
    visible.value = true;
  }

  function leaseChange(v: any, record: any) {
    // console.log('leaseChange', v, record);
    const item: any = leaseList.value.find((i) => i.id === v);
    const contractEstateList = form.value?.contractEstateList || [];
    const index = contractEstateList.findIndex(
      (v: any) => v.estateId === record.estateId
    );
    if (!item) return;
    contractEstateList[index].leasePurposeId = v;
    contractEstateList[index].leasePurposeName = item?.dataName;

    //  record.leasePurposeName = item?.dataName;
  }
  function manageChange(v: any, record: any) {
    if (!Array.isArray(v)) v = v ? [v] : [];
    const contractEstateList = form.value?.contractEstateList || [];
    // const lastId = v[v.length - 1];
    const index = contractEstateList.findIndex(
      (v: any) => v.estateId === record.estateId
    );
    // 取label
    const arr: string[] = [];
    let list: any[] = businessTypeList.value;
    v.forEach((i: any, index: number) => {
      const item = list.find((j) => j.id === i);
      arr.push(item?.label);
      if (item) {
        list = item.children;
      }
    });
    contractEstateList[index].manageId = v;
    contractEstateList[index].manageName = arr.join('/');
  }

  // 业态字典处理
  function filterList(arr: any) {
    return arr.map((i: any) => {
      if (i.children && i.children.length) {
        i.children = filterList(i.children);
      } else {
        i.children = null;
      }
      return { ...i, label: i.formatData };
    });
  }
</script>

<style scoped></style>
