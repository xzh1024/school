<template>
  <div>
    <a-descriptions :column="2">
      <a-descriptions-item label="房源门牌号" :span="1">{{
        info.doorPlate
      }}</a-descriptions-item>
      <a-descriptions-item label="项目名称" :span="2">{{
        info.projectName
      }}</a-descriptions-item>
      <a-descriptions-item label="归属楼宇" :span="1">{{
        info.buildingName
      }}</a-descriptions-item>
      <a-descriptions-item label="房源面积" :span="1"
        >{{ info.acreage }}㎡</a-descriptions-item
      >
      <a-descriptions-item label="房源类型" :span="1">{{
        info.categoryName
      }}</a-descriptions-item>
      <a-descriptions-item label="房源编号" :span="1">{{
        info.code
      }}</a-descriptions-item>
      <a-descriptions-item label="租赁用途" :span="1">{{
        info.leasePurposeName
      }}</a-descriptions-item>
      <a-descriptions-item label="经营业态" :span="1">{{
        info.manageName
      }}</a-descriptions-item>
      <a-descriptions-item label="地址" :span="2"
        >{{ info.provinceName || '' }}{{ info.cityName || ''
        }}{{ info.districtName || ''
        }}{{ info.address || '' }}</a-descriptions-item
      >
    </a-descriptions>

    <div>
      <div class="tabs">
        <a-tabs :default-active-key="0" justify>
          <a-tab-pane
            v-for="(item, index) in estatePayPlanList"
            :key="index"
            :title="item.title"
          >
            <tab-item-desc
              v-if="item.chargingRule.type === 2"
              :tab-item-info="item"
            ></tab-item-desc>
            <i-table
              v-else
              :options="options"
              :data="item.squarePlan || item.payPlan"
            ></i-table>
          </a-tab-pane>
        </a-tabs>
        <div class="total">合计：￥{{ totalPrice }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ViewDetail'
  };
</script>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { sectionToChinese } from '@/utils';
  import ITable from '@/components/i-table/index.vue';
  import dayjs from 'dayjs';
  import NP from 'number-precision';
  import TabItemDesc from './tab-item-desc.vue';

  const totalPrice = ref(0);
  const props = defineProps({
    info: {
      type: Object,
      default: () => {
        return {};
      }
    }
  });
  const options = ref({
    pageShow: false,
    menu: false,
    align: 'center',
    tableCard: false,
    columns: [
      {
        label: '缴费日期',
        prop: 'payEndDate',
        formatter: (v: any) => {
          return dayjs(v.payStartDate).format('YYYY-MM-DD');
        }
      },
      {
        label: '期数',
        prop: 'cycle',
        formatter: (v: any) => {
          const i = sectionToChinese(v.cycle);
          return `第${i}期`;
        }
      },
      {
        label: '应收金额(￥)',
        prop: 'receivableAmount'
      }
    ]
  });
  const estatePayPlanList = computed(() => {
    const { estatePayPlanList = [] } = props.info;
    return calcList(estatePayPlanList);
  });

  function calcList(arr: Array<any>) {
    let total = 0;
    arr = arr.map((i: any) => {
      let title = '';
      const { payPlan = [], costTypeName, chargingRule = {} } = i;
      let totalPrice = 0;
      payPlan.forEach((j: any) => {
        totalPrice = NP.plus(totalPrice, j.receivableAmount);
        total = NP.plus(total, j.receivableAmount);
      });
      title = `${costTypeName}  ￥${totalPrice || 0} `;
      if (chargingRule.type === 2) {
        title += '抽佣';
      }
      return { ...i, title };
    });
    totalPrice.value = total;
    return arr;
  }
</script>

<style scoped lang="less">
  .tabs {
    position: relative;

    .total {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      color: #333;
      font-size: 14px;
      line-height: 42px;
    }
  }

  :deep(.arco-tabs) {
    width: 100%;
  }

  :deep(.arco-tabs-nav-tab) {
    display: block;
    flex: none;
  }

  :deep(.arco-tabs-nav-tab-list) {
    //display: flex;
    //flex: 1;
  }

  :deep(.arco-tabs-nav-type-line .arco-tabs-tab) {
    flex: 1;
    justify-content: center;
  }

  :deep(.arco-tabs-nav-ink) {
    display: none;
  }

  :deep(.arco-tabs-tab) {
    border-bottom: 2px solid transparent;
  }

  :deep(.arco-tabs-tab-active) {
    border-bottom: 1px solid rgb(var(--primary-6));
  }
</style>
