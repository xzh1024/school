<template>
  <div class="i-card detail-box">
    <div class="block-title" style="padding-top: 0">原铺位信息</div>
    <a-descriptions
      table-layout="fixed"
      :column="4"
      layout="vertical"
      style="width: 100%"
    >
      <a-descriptions-item label="归属项目：">{{
        data.projectName
      }}</a-descriptions-item>
      <a-descriptions-item label="编号：">{{
        data.code || '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="计划名称：">{{
        data.planName
      }}</a-descriptions-item>
      <a-descriptions-item label="铺位类型：">{{
        data.estateTypeName
      }}</a-descriptions-item>
      <a-descriptions-item label="目标商户：">{{
        handleArrToString(data.merchantName || [])
      }}</a-descriptions-item>
      <a-descriptions-item label="目标品牌：">{{
        handleArrToString(data.brandName || [])
      }}</a-descriptions-item>
      <a-descriptions-item label="渠道：">{{
        data.channelName
      }}</a-descriptions-item>
      <a-descriptions-item label="开始时间：">{{
        data.startDate
      }}</a-descriptions-item>
      <a-descriptions-item label="结束时间：">{{
        data.endDate
      }}</a-descriptions-item>
    </a-descriptions>
    <i-table
      style="padding-bottom: 16px"
      :options="tableProps"
      :data="data.floorList"
    ></i-table>
    <template v-if="!hideCommission">
      <div class="split-bg"></div>
      <div class="block-title">佣金政策</div>
      <a-descriptions table-layout="fixed" :column="4" layout="vertical" style="width: 100%">
        <a-descriptions-item label="奖励挂钩：">{{
          valueFindLabel(calculationList, data.settleMode)
        }}</a-descriptions-item>
        <a-descriptions-item v-if="data.settleMode === 2" label="比例：">{{
          valueFindLabel(ratioLabelList, data.ratioType) +
          '' +
          (data.ratio || 0) +
          '%'
        }}</a-descriptions-item>
        <a-descriptions-item v-else label="金额：">{{
          data.amount || '--'
        }}</a-descriptions-item>
        <a-descriptions-item v-if="data.settleMode === 2" label="费用项目：">{{
          data.feeTypeNames || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="账单生成日期：">{{
          handleBillDate
        }}</a-descriptions-item>
        <a-descriptions-item label="是否含税：">{{
          data.taxIncluded === 1 ? '是' : '否'
        }}</a-descriptions-item>
        <a-descriptions-item label="税率：">{{
          data.taxFee ? data.taxFee + '%' : '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="备注：">{{
          data.remark
        }}</a-descriptions-item>
      </a-descriptions>
    </template>
    <template v-if="showChannel">
      <div class="split-bg"></div>
      <div class="block-title">渠道人员</div>
      <i-table
        style="padding-bottom: 16px"
        :options="personTableProps"
        :data="data.personnelList"
      ></i-table>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { handleArrToString } from '@/utils';
  import { ratioLabelList, calculationList } from '@/utils/dic';
  import { valueFindLabel } from '@/utils';
  const props = defineProps({
    hideCommission: {
      type: Boolean,
      default: false
    },
    showChannel: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return { personnelList: [] };
      }
    }
  });
  const tableProps = ref<Recordable>({
    tableCard: false,
    menu: false,
    pageShow: false,
    columns: [
      {
        label: '楼宇',
        prop: 'buildingName'
      },
      {
        label: '楼层',
        prop: 'floorName'
      },
      {
        label: '铺位号',
        prop: 'estateName'
      },
      {
        label: '建筑面积（㎡）',
        prop: 'acreage'
      },
      {
        label: '使用面积（㎡）',
        prop: 'useAcreage',
        formatter: (e: Recordable) => e.useAcreage || '--'
      }
    ]
  });
  const personTableProps = ref<Recordable>({
    tableCard: false,
    menu: false,
    index: true,
    indexTitle: '序号',
    pageShow: false,
    columns: [
      {
        label: '姓名',
        prop: 'name'
      },
      {
        label: '电话',
        prop: 'phone'
      },
      {
        label: '等级',
        prop: 'level'
      }
    ]
  });
  const handleBillDate = computed(() => {
    {
      const billTypeList1: any = {
        1: '合同签订次月',
        2: '合同生效次月',
        3: '合同执行完毕次月'
      };
      const billTypeList2: any = {
        1: '租金账单生成次月',
        2: '租金账单收取次月'
      };

      const key = props.data.settleMode === 1 ? 'billGenType1' : 'billGenType2';
      if (props.data.settleMode === 1) {
        return (
          billTypeList1[props.data[key]] +
          (props.data.billGenDate === -1
            ? '自然月底'
            : props.data.billGenDate + '日')
        );
      } else {
        return (
          billTypeList2[props.data[key]] +
          (props.data.billGenDate === -1
            ? '自然月底'
            : props.data.billGenDate + '日')
        );
      }
    }
  });
</script>
<style lang="less" scoped>
  .i-card {
    &.detail-box {
      padding: 16px;
      margin-bottom: 0;
    }
  }
</style>
