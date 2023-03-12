<template>
  <div>
    <div class="fixed-form">
      <i-form ref="refSetForm" v-model="setForm" :options="options">
        <template #amountForm>
          <a-form-item
            field="chargingRule.amount"
            hide-label
            :rules="[
              { required: true, message: '请选择类型并输入金额' },
              { validator: amountValidator }
            ]"
          >
            <radio-amount
              v-model:method="setForm.chargingRule.method"
              v-model:amount="setForm.chargingRule.amount"
            ></radio-amount>
          </a-form-item>
        </template>
        <template #paySchemeForm>
          <a-select v-model="setForm.payScheme" placeholder="请选择缴费方案">
            <a-option
              v-for="(item, index) in payTypeList"
              :key="index"
              :disabled="item.value > month"
              :value="item.value"
              >{{ item.label }}</a-option
            >
          </a-select>
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
    name: 'FixedAmount'
  };
</script>
<script setup lang="ts">
  import { nextTick, onMounted, ref, Ref } from 'vue';
  import IForm from '@/components/i-form/index.vue';
  import RadioAmount from './radio-amount.vue';
  import { payTypeList } from '@/utils/dic';
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
    if (type === 1)
      setForm.value = {
        chargingRule: {
          method: 1
        },
        ...props.defaultValue
      };
  }
  const setForm: Ref = ref({
    chargingRule: {
      method: 1
    }
  });
  const refSetForm: Ref = ref(null);
  const visible = ref(false);

  const emits = defineEmits(['cancel', 'confirm']);
  const options: Ref = ref({
    submitBtn: false,
    cancelBtn: false,
    menuForm: false,
    columns: [
      {
        label: '',
        prop: 'amount',
        span: 24,
        hideLabel: true
        /*  rules: [
          { required: true, message: '请选择类型并输入金额' },
          { match: /^[1-9](\d?)+$/, message: '请输入正整数' }
        ]*/
      },
      {
        label: '缴费方案',
        prop: 'payScheme',
        dic: payTypeList,
        span: 12,
        rules: [{ required: true, message: '请选择缴费方案' }]
      },
      {
        prop: 'ruleSlot',
        hideLabel: true,
        span: 24
      }
    ]
  });
  function cancel() {
    visible.value = true;
  }
  function handleOk() {
    emits('cancel');
  }
  async function confirm() {
    const res = await refSetForm.value.submit();
    console.log(res);
    if (!res) {
      emits('confirm', setForm.value);
    }
  }
  function amountValidator(val: number, callback: (e?: string) => void) {
    return new Promise((resolve: any) => {
      nextTick(() => {
        const v = setForm.value.chargingRule.amount;
        if (v) {
          callback();
        } else {
          callback('请填写正整数');
        }
        resolve();
      });
    });
  }
</script>

<style scoped lang="less">
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
