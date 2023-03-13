<template>
  <div>
    <div class="fixed-form">
      <i-form ref="refSetForm" v-model="setForm" :options="options">
        <template #commissionRatioForm>
          <a-form-item
            label="抽佣规则"
            field="chargingRule.commissionRatio"
            :rules="[{ required: true, message: '请填写抽佣比例' }]"
          >
            <div class="flex align-center">
              <div class="tip">每比流水抽取</div>
              <a-input-number v-model="setForm.chargingRule.commissionRatio">
                <template #suffix>‰</template>
              </a-input-number>
              <div class="tip">的佣金</div>
            </div>
          </a-form-item>
        </template>
        <template #isGuaranteeForm>
          <a-checkbox
            :model-value="isGuarantee"
            :value="1"
            @change="checkChange"
          >
            含保底租金</a-checkbox
          >
        </template>
        <template #amountForm>
          <radio-amount
            v-model:method="setForm.chargingRule.method"
            v-model:amount="setForm.chargingRule.amount"
          ></radio-amount>
        </template>
        <template #keepCommissionForm>
          <div class="keep flex flex-1 flex-column">
            <div class="keep-title">达到保底金额执行规则</div>
            <div class="keep-cont">
              <a-radio-group
                v-model="setForm.chargingRule.keepCommission"
                direction="vertical"
              >
                <a-radio :value="0">抽佣达到保底租金后，不再继续抽佣</a-radio>
                <a-radio :value="1"
                  >抽佣达到保底租金后，继续按照抽佣规则抽佣</a-radio
                >
              </a-radio-group>
            </div>
          </div>
        </template>
        <template #ruleSlotForm>
          <all-rule v-model="setForm"></all-rule>
        </template>
      </i-form>
    </div>
    <div class="tips"
      >说明：所有计费规则，时间单位均为【月】（如：设置每平方固定金额100.00元，则100平的资产每月都会生成10000.00元的账单）。</div
    >
    <div class="footer">
      <a-button type="outline" class="btn" @click="cancel">取消</a-button>
      <a-button type="primary" class="btn" @click="confirm">确认</a-button>
    </div>
    <a-modal
      v-model:visible="visible"
      title="提示"
      @ok="handleOk"
      @cancel="visible = false"
    >
      <div>确认取消？取消后内容将可能被清除！</div>
    </a-modal>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Commission'
  };
</script>
<script setup lang="ts">
  import { computed, onMounted, ref, Ref, toRaw } from 'vue';
  import IForm from '@/components/i-form/index.vue';
  import RadioAmount from './radio-amount.vue';
  import AllRule from '@/views/contract/__components__/all-rule.vue';

  const props = defineProps({
    month: {
      type: Number,
      default: 0
    },
    defaultValue: {
      type: Object,
      default: () => {
        return {};
      }
    }
  });

  onMounted(() => {
    init();
  });

  function init() {
    const { chargingRule = {} } = props.defaultValue;
    const { type = 1 } = chargingRule;
    if (type === 2) {
      setForm.value = {
        chargingRule: {},
        ...JSON.parse(JSON.stringify(props.defaultValue))
      };
    }
  }
  const setForm: Ref = ref({
    chargingRule: {
      keepCommission: 0
    }
  });
  const refSetForm: Ref = ref(null);
  const visible = ref(false);

  const emits = defineEmits(['cancel', 'confirm']);
  const options: Ref = computed(() => {
    const { chargingRule = {} } = setForm.value;
    const { isGuarantee = false } = chargingRule;
    return {
      submitBtn: false,
      cancelBtn: false,
      menuForm: false,
      columns: [
        {
          prop: 'commissionRatio',
          hideLabel: true,
          span: 24
          // rules: [{ required: true, message: '请选择类型并输入金额' }]
        },
        {
          prop: 'isGuarantee',
          hideLabel: true,
          span: 24
        },
        {
          label: '',
          prop: 'amount',
          display: isGuarantee,
          span: 24,
          hideLabel: true
          // rules: [{ required: true, message: '请选择类型并输入金额' }]
        },
        {
          prop: 'keepCommission',
          span: 24,
          display: isGuarantee,
          hideLabel: true
        },
        {
          prop: 'ruleSlot',
          hideLabel: true,
          span: 24
        }
      ]
    };
  });
  function cancel() {
    visible.value = true;
  }
  function handleOk() {
    emits('cancel');
  }

  const isGuarantee = computed(() => {
    return !!setForm.value?.chargingRule?.isGuarantee;
  });
  async function confirm() {
    const res = await refSetForm.value.submit();
    if (!res) {
      emits('confirm', JSON.parse(JSON.stringify(toRaw(setForm.value))));
    }
  }
  function checkChange(e: any) {
    if (e) {
      setForm.value.chargingRule.method = 1;
      setForm.value.chargingRule.keepCommission = 0;
    } else {
      setForm.value.chargingRule = {
        ...setForm.value.chargingRule,
        keepCommission: null,
        method: 0,
        amount: 0
      };
    }
    setForm.value.chargingRule.isGuarantee = e ? 1 : 0;
  }
</script>

<style scoped lang="less">
  :deep(.arco-form-item) {
    margin-bottom: 0;
  }

  .flex-column {
    flex-direction: column;
  }

  .keep-cont {
    padding: 0 12px;
  }

  .tip {
    margin: 0 12px;
    color: #666;
    font-size: 12px;
    white-space: nowrap;
  }

  .keep {
    background: #fafafa;

    &-title {
      margin-bottom: 12px;
      padding: 0 12px;
      font-weight: bold;
      font-size: 14px;
      line-height: 40px;
      border-bottom: 1px solid #eaeaea;
    }
  }

  .fixed-form {
    max-height: 740px;
    overflow-y: auto;
  }

  .footer {
    padding-top: 12px;
    text-align: right;
  }

  .btn {
    width: 150px;
    margin-left: 12px;
  }

  .tips {
    color: #999;
    font-size: 12px;
  }
</style>
