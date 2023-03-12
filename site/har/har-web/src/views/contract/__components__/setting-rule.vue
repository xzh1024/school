<template>
  <div class="setting-rule">
    <a-tabs v-if="allowCommission" v-model:active-key="tabValue" type="capsule">
      <a-tab-pane :key="1" title="固定金额"></a-tab-pane>
      <a-tab-pane :key="2" title="流水抽佣"></a-tab-pane>
    </a-tabs>
    <fixed-amount
      v-show="tabValue === 1"
      :month="month"
      :default-value="defaultValue"
      @cancel="cancel"
      @confirm="confirm"
    ></fixed-amount>
    <commission
      v-show="tabValue === 2"
      :month="month"
      :default-value="defaultValue"
      @cancel="cancel"
      @confirm="confirm"
    />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'SettingRule'
  };
</script>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import FixedAmount from '@/views/contract/__components__/fixed-amount.vue';
  import Commission from '@/views/contract/__components__/commission.vue';

  const props = defineProps({
    defaultValue: {
      type: Object,
      default: () => {
        return {};
      }
    },
    code: {
      type: String
    },
    month: {
      type: Number,
      default: 0
    }
  });
  const tabValue = ref(0);

  onMounted(() => {
    const { chargingRule = {} } = props.defaultValue;
    const { type = 1 } = chargingRule;
    tabValue.value = type;
  });

  const allowCommission = computed(() => {
    return props.code === '20220810000000001';
  });

  const emits = defineEmits(['cancel', 'confirm']);
  function cancel() {
    emits('cancel');
  }

  function confirm(f: any) {
    const { chargingRule = {} } = f;
    emits('confirm', {
      ...f,
      chargingRule: {
        ...chargingRule,
        type: tabValue.value
      }
    });
  }
</script>

<style scoped lang="less">
  :deep(.arco-tabs-nav-type-capsule .arco-tabs-nav-tab) {
    justify-content: flex-start;
  }

  .setting-rule {
    position: relative;
    //padding-bottom: 84px;
  }

  .title-label {
    width: 110px;
    margin-right: 8px;
    line-height: 32px;
    white-space: nowrap;
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;

    .desc {
      color: #999;
      font-size: 12px;
    }
  }

  :deep(.arco-input-number-step) {
    display: none;
  }

  :deep(.arco-form-item-label-col.arco-form-item-label-col-flex) {
    flex: 1 !important;
  }
</style>
