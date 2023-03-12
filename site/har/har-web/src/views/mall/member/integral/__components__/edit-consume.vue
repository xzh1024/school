<template>
  <drawer
    v-model="visible"
    title="修改积分消费规则"
    :options="{
      okLoading: isLoading
    }"
    @before-ok="onBeforeOk"
  >
    <div class="white-detail-box">
      <a-divider orientation="left">积分消费规则</a-divider>
      <div style="margin-bottom: 30px">
        <span>兑换比例：</span>
        <a-input
          v-model="form.exchangeRate"
          style="width: 150px"
          max-length="10"
          @input="form.exchangeRate = form.exchangeRate.replace(/\D|^0/g, '')"
        ></a-input>
        积分可抵扣1元人民币
      </div>
      <div> 积分抵现： </div>
      <a-radio-group
        v-model="form.ruleStatus"
        style="width: 60px"
        direction="vertical"
      >
        <a-radio :value="1">关闭</a-radio>
        <a-row style="width: 100%; margin: 10px 0">
          <a-col :span="24">
            <a-radio :value="2"> 开启</a-radio>
          </a-col>
        </a-row>
      </a-radio-group>
      <template v-if="form.ruleStatus === 2">
        <a-row>
          <a-col :span="3">订单金额门槛：</a-col>
          <a-col :span="20">
            <a-radio-group
              v-model="form.cillType"
              style="width: 100%"
              direction="vertical"
              @change="onCillTypeChange"
            >
              <a-radio :value="1">不限制 （订单金额最低为1元）</a-radio>
              <a-row
                style="
                  display: flex;
                  align-items: center;
                  width: 100%;
                  margin: 10px 0;
                "
              >
                <a-col :span="4">
                  <a-radio :value="2"> 订单金额最低为</a-radio>
                </a-col>
                <a-col :span="3">
                  <a-input
                    v-model="form.cillAmount"
                    max-length="5"
                    :disabled="form.cillType !== 2"
                    @blur="onCillAmountBlur"
                /></a-col>
                <a-col :span="2" :offset="1">元时可抵现</a-col>
              </a-row>
            </a-radio-group>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="3">抵现金额上限：</a-col>
          <a-col :span="20">
            <a-radio-group
              v-model="form.limitType"
              style="width: 100%"
              direction="vertical"
            >
              <a-radio :value="1">不限制</a-radio>
              <a-row style="width: 100%; margin: 10px 0">
                <a-col :span="5">
                  <a-radio :value="2"> 每笔订单最多抵扣</a-radio>
                </a-col>
                <a-col :span="4">
                  <a-input
                    v-model="form.temp2LimitAmount"
                    max-length="18"
                    :disabled="form.limitType !== 2"
                    @blur="onLimit2AmountBlur"
                  >
                    <template #append>元</template></a-input
                  ></a-col
                >
              </a-row>
              <a-row style="width: 100%; margin: 10px 0">
                <a-col :span="5">
                  <a-radio :value="3"> 每笔订单最多抵扣</a-radio>
                </a-col>
                <a-col :span="4">
                  <a-input
                    v-model="form.temp3LimitAmount"
                    :disabled="form.limitType !== 3"
                    max-length="2"
                    @input="
                      form.temp3LimitAmount = form.temp3LimitAmount.replace(
                        /^\D*(\d+).*$/g,
                        '$1'
                      )
                    "
                  >
                    <template #append>%</template></a-input
                  ></a-col
                >
              </a-row>
            </a-radio-group>
          </a-col>
        </a-row>
      </template>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, onMounted, Ref, computed } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectMembersIntegralIntegralConsumeGet,
    cbdApiProjectMembersIntegralIntegralConsumeSavePost
  } from '@/api';
  import { Message } from '@arco-design/web-vue';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v: boolean) {
      emits('update:modelValue', v);
    }
  });
  const form: Ref = ref({
    exchangeRate: '',
    ruleStatus: '',
    cillType: '',
    cillAmount: '',
    limitType: '',
    limitAmount: '',
    temp2LimitAmount: '',
    temp3LimitAmount: ''
  });
  const [getData] = useFuncProxy(async () => {
    form.value = await cbdApiProjectMembersIntegralIntegralConsumeGet({});
    if (form.value.limitType === 2) {
      form.value.temp2LimitAmount = form.value.limitAmount;
      form.value.temp3LimitAmount = '';
    } else if (form.value.limitType === 3) {
      form.value.temp2LimitAmount = '';
      form.value.temp3LimitAmount = form.value.limitAmount;
    }
  });
  function onCillTypeChange(v: string | number | boolean) {
    if (v === 1) {
      form.value.cillAmount = 1;
    }
  }
  const isLoading = ref(false);
  async function onBeforeOk(done: (closed: boolean) => void) {
    try {
      isLoading.value = true;
      done(false);
      await cbdApiProjectMembersIntegralIntegralConsumeSavePost({
        ...form.value,
        limitAmount:
          form.value.limitType === 2
            ? form.value.temp2LimitAmount
            : form.value.limitType === 3
            ? form.value.temp3LimitAmount
            : ''
      });
      done(true);
      emits('refresh');
      visible.value = false;
    } catch (e) {
    } finally {
      isLoading.value = false;
    }
  }
  function onLimit2AmountBlur() {
    if (!/^\d+(\.\d{1,2})?$/.test(form.value.temp2LimitAmount)) {
      form.value.temp2LimitAmount = '';
      Message.error('请输入大于0的数,最多包含两位小数');
    }
  }
  function onCillAmountBlur() {
    if (!/^[1-9]+(\.?\d{1,2})?$/.test(form.value.cillAmount)) {
      form.value.cillAmount = '';
      Message.error('请输入大于1的数,最多包含两位小数');
    }
  }
  onMounted(() => {
    getData();
  });
</script>
