<template>
  <a-tabs type="line" :class="{ mb: mb }">
    <template v-if="$slots.extra" #extra>
      <slot name="extra"></slot>
    </template>
    <a-tab-pane
      v-for="(item, idx) in dataList"
      :key="idx + 1"
      :title="handleStr(item)"
    >
      <a-descriptions
        v-if="Object.keys(item.chargingRule || {}).length"
        layout="vertical"
        :column="10"
        :label-style="{ color: '#333', fontWeight: 'bold' }"
      >
        <a-descriptions-item
          v-if="item.chargingRule.type === 1"
          label="计费规则"
          :span="3"
        >
          {{ item.chargingRule.method === 1 ? '每平米固定金额' : '固定金额' }}
          {{ item.chargingRule.amount || '--' }}元 / 月
        </a-descriptions-item>
        <a-descriptions-item
          v-if="item.chargingRule.type === 2"
          label="抽佣规则"
          :span="3"
        >
          每笔流水流水抽收取 {{ item.chargingRule.commissionRatio }}‰ 的佣金
        </a-descriptions-item>
        <a-descriptions-item
          v-if="item.chargingRule.type === 1"
          label="账单生成规则"
          :span="3"
          >缴费截止日到期前 {{ item.chargingRule.ruleDay }} 天生成账单
        </a-descriptions-item>
        <a-descriptions-item
          v-if="item.chargingRule.type === 2"
          label="账单生成规则"
          :span="3"
          >出账日期为合同签订日，还款截止日为出账后
          {{ item.chargingRule.ruleDay }} 天
        </a-descriptions-item>
        <a-descriptions-item
          label="合同终止规则"
          :span="item.chargingRule.type === 1 ? 2 : 4"
        >
          {{ handleEndContactRule(item) }}
        </a-descriptions-item>
        <a-descriptions-item
          v-if="item.chargingRule.type === 1"
          label="缴费方案"
          :span="2"
        >
          {{ payTypeList.find((el) => el.value === item.payScheme)?.label }}
        </a-descriptions-item>
        <a-descriptions-item
          v-if="isCommissionWithGuarantee(item)"
          label="保底租金规则"
          :span="3"
        >
          {{ item.chargingRule.method === 1 ? '每平米固定金额' : '固定金额' }}
          {{ item.chargingRule.amount || '--' }}元 / 月
        </a-descriptions-item>
        <a-descriptions-item
          v-if="isCommissionWithGuarantee(item)"
          label="缴费方案达到保底租金执行规则"
          :span="3"
        >
          抽佣达到保底租金后，<span
            v-if="item.chargingRule.keepCommission === 0"
            >不再</span
          >继续按照抽佣规则抽佣
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions
        v-if="item.expireRules && item.expireRules.length"
        layout="vertical"
        style="margin-top: 10px"
        :label-style="{ color: '#333', fontWeight: 'bold' }"
      >
        <a-descriptions-item label="逾期触发规则（逾期本金以租金差价金额为准）">
          <div v-for="(rule, expireIdx) in item.expireRules" :key="expireIdx"
            >规则{{ numToString(expireIdx + 1) }}：当生成租金差价账单后，第
            {{ rule.startDay }} 天至 {{ rule.endDay }} 天，每
            {{ rule.overduePeriodDay }} 天收取 {{ rule.overdueRatio }} ‰
            的滞纳金，每 {{ rule.bondPeriodDay }} 天扣除 {{ rule.bondRatio }} ‰
            的保证金</div
          >
        </a-descriptions-item>
      </a-descriptions>
      <i-table :options="config" :data="handleItem(item)">
        <template #statusCell="{ record }">
          {{ enumHash[record.status] || '--' }}
        </template>
        <template #menu="{ record }">
          <a-button v-if="record.id" type="text" @click="showBillCount(record)">
            {{ btnTxt }}</a-button
          >
        </template>
      </i-table>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
  import ITable from '@/components/i-table/index.vue';

  /**
   * @params dataKey 子数组的字段名
   */
  import { payTypeList } from '@/utils/dic';
  import { PropType } from 'vue';
  import { numToString } from '@/utils';
  type DataListItem = {
    costType?: string;
    totalAmount?: number;
    payScheme?: number;
    chargingRule?: {
      /**
       * 计费类型(1-固定金额；2-保底金额+抽佣)当计费类型dataCode为20220810000000001时才可以选择抽佣
       */
      type: number;
      /**
       * 计费方式(1-每平米固定金额；2-固定金额)，计费类型为1时不可为空
       */
      method?: number;
      /**
       * 计费金额，计费类型为1时不可为空
       */
      amount?: number;
      /**
       * 抽佣比例抽佣时不可为空
       */
      commissionRatio?: number;
      /**
       * 是否保底1是;0否;计费类型为2时有用
       */
      isGuarantee?: number;
      /**
       * 是否继续抽佣1是；0否；达到保底后，计费类型为2
       */
      keepCommission?: number;
      /**
       * 出账日规则天数截止还款日
       */
      ruleDay: number;
      /**
       * 可逾期天数
       */
      expireDay: number;
      /**
       * 最高扣除保证金比例
       */
      bondRatio: number;
    };
    expireRules?: {
      /**
       * id
       */
      id?: number;
      /**
       * 合同编号
       */
      contractCode?: string;
      /**
       * 缴费方案编号
       */
      schemeCode?: string;
      /**
       * 规则范围起始天
       */
      startDay?: number;
      /**
       * 规则范围终止天
       */
      endDay?: number;
      /**
       * 滞纳金收取周期天
       */
      overduePeriodDay?: number;
      /**
       * 滞纳金收取比例
       */
      overdueRatio?: number;
      /**
       * 保证金扣除周期天
       */
      bondPeriodDay?: number;
      /**
       * 保证金扣除比例
       */
      bondRatio?: number;
      /**
       * 规则顺序
       */
      order?: number;
      /**
       * 项目ID
       */
      projectId?: number;
    }[];
    billDetailList?: {
      /**
       * 缴费日期
       */
      billLastRepaymentDate?: string;
      /**
       * 期数
       */
      billCycle?: string;
      /**
       * 缴费金额
       */
      totalAmount?: number;
      /**
       * 优惠金额
       */
      discountAmount?: number;
      /**
       * 应收金额
       */
      actualAmount?: number;
    }[];
  };
  const emits = defineEmits(['modal']);
  const props = defineProps({
    btnTxt: {
      type: String,
      default: '查看账单'
    },
    dataList: {
      type: Array as PropType<Array<any>>,
      default: () => []
    },
    config: {
      type: Object,
      default: () => {
        return {} as any;
      }
    },
    mb: {
      type: Boolean,
      default: true
    },
    dataKey: {
      type: String,
      default: 'billDetailList'
    },
    rmbMark: {
      type: Boolean,
      default: true
    },
    enumHash: {
      type: Object,
      default: () => {
        return {};
      }
    }
  });
  const showBillCount = (v: DataListItem) => {
    emits('modal', v);
  };
  const handleStr = (item: DataListItem) => {
    return `${item.costType}${props.rmbMark ? ' ￥' : ''} ${item.totalAmount}`;
  };
  const handleEndContactRule = (item: DataListItem): string => {
    return `逾期${item.chargingRule!.expireDay}天或保证金扣除到${
      item.chargingRule!.bondRatio
    }‰合同终止`;
  };
  const handleItem = (item: any) => {
    return item[props.dataKey];
  };
  function isCommissionWithGuarantee(item: DataListItem) {
    return (
      item.chargingRule?.type === 2 && item.chargingRule?.isGuarantee === 1
    );
  }
</script>

<style scoped>
  .mb {
    margin-bottom: 15px;
  }
</style>
