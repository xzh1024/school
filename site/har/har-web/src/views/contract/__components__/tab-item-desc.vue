<template>
  <div class="margin-top">
    <a-descriptions v-show="type === 1" :column="4">
      <DescriptionsItem label="计费规则">{{ calcRule }}</DescriptionsItem>
      <DescriptionsItem label="账单生成规则">{{
        `缴费截止日到期前 ${chargingRule.ruleDay} 天生成账单`
      }}</DescriptionsItem>
      <DescriptionsItem label="合同终止规则">{{
        `逾期${chargingRule.expireDay || 0}天或保证金扣除到${
          chargingRule.bondRatio || 0
        }‰合同终止`
      }}</DescriptionsItem>
      <DescriptionsItem label="缴费方案">{{ paySchemeText }}</DescriptionsItem>
    </a-descriptions>
    <a-descriptions v-show="type === 2" :column="3">
      <DescriptionsItem label="抽佣规则">{{
        `每笔流水流水抽收取 ${chargingRule.commissionRatio}‰ 的佣金`
      }}</DescriptionsItem>
      <DescriptionsItem label="账单生成规则">{{
        `缴费截止日到期前 ${chargingRule.ruleDay} 天生成账单`
      }}</DescriptionsItem>
      <DescriptionsItem label=""> </DescriptionsItem>
      <template v-if="isGuarantee">
        <DescriptionsItem label="保底租金规则">{{ calcRule }}</DescriptionsItem>
        <DescriptionsItem
          v-if="achieveRule"
          label="缴费方案达到保底租金执行规则"
          >{{ achieveRule }}</DescriptionsItem
        >
      </template>
      <DescriptionsItem label="合同终止规则">{{
        `逾期${chargingRule.expireDay}天或保证金扣除到${chargingRule.bondRatio}‰合同终止`
      }}</DescriptionsItem>
      <DescriptionsItem v-if="!achieveRule" :label="'\n'"></DescriptionsItem>
    </a-descriptions>

    <a-descriptions :column="type === 1 ? 4 : 3" layout="vertical">
      <!--- 统一逾期规则  --->
      <DescriptionsItem
        label="逾期触发规则（逾期本金以未缴纳金额为准）"
        :span="3"
      >
        <div class="list">
          <div v-for="(item, index) in expireRules" :key="index" class="item">
            {{
              `规则${numToString(index + 1)}：当缴费截止日未收到租金，则逾期  ${
                item.startDay
              } 天至 ${item.endDay} 天，每 ${item.periodOverdueDay} 天收取${
                item.overdueRatio
              }‰  的滞纳金，每  ${item.periodBondDay} 天扣除 ${
                item.bondRatio
              }‰ 的保证金`
            }}
          </div>
        </div>
      </DescriptionsItem>
    </a-descriptions>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'TabItemDesc'
  };
</script>
<script setup lang="ts">
  import { computed } from 'vue';
  import { numToString } from '@/utils';
  import { DescriptionsItem } from '@arco-design/web-vue';
  import { payTypeList } from '@/utils/dic';

  const props = defineProps({
    tabItemInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    paySchemeText: {
      type: String
    }
  });

  const paySchemeText = computed(() => {
    const { payScheme } = props.tabItemInfo;
    return payTypeList.find((i) => i.value === payScheme)?.label;
  });
  const chargingRule = computed(() => {
    return props.tabItemInfo?.chargingRule || {};
  });
  const type = computed(() => {
    return chargingRule.value?.type;
  });
  const expireRules = computed(() => {
    return props.tabItemInfo?.expireRules || [];
  });
  const isGuarantee = computed(() => {
    return chargingRule.value?.isGuarantee;
  });

  const calcRule = computed(() => {
    const { method, amount = 0 } = chargingRule.value;
    if (method === 1) {
      return `每平方米固定金额 ${amount} 元/月`;
    } else {
      return `固定金额${amount} 元`;
    }
  });
  const achieveRule = computed(() => {
    const { keepCommission } = chargingRule.value;
    if (keepCommission === null) return '';
    if (keepCommission === 1) {
      return `抽佣达到保底租金后，继续按照抽佣规则抽佣`;
    }
    return `抽佣达到保底租金后，不再继续抽佣`;
  });
</script>
