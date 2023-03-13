<template>
  <drawer
    v-model="visible"
    title="修改积分通用规则"
    :options="{
      okLoading: isLoading
    }"
    @before-ok="onBeforeOk"
  >
    <div class="white-detail-box">
      <a-divider orientation="left">积分通用规则</a-divider>
      <h4>积分有效期： </h4>
      <a-radio-group
        v-model="form.validType"
        style="width: 100%"
        direction="vertical"
      >
        <a-radio :value="1" style="width: 100px">永久有效</a-radio>
        <a-row
          style="
            display: flex;
            align-items: center;
            width: 100%;
            margin: 10px 0;
          "
        >
          <a-col :span="4">
            <a-radio :value="2"> 每笔积分从获得起</a-radio>
          </a-col>
          <a-col :span="2">
            <a-select
              v-model="form.tempYear"
              placeholder="请选择时间期限"
              :disabled="form.validType !== 2"
            >
              <a-option v-for="i in 5" :key="i" :value="i">{{ i }}</a-option>
            </a-select></a-col
          >
          <a-col :span="1" :offset="1"> 年后 </a-col>
          <a-col :span="2">
            <a-select
              v-model="form.fixedMonth"
              placeholder="请选择月份"
              :disabled="form.validType !== 2"
            >
              <a-option v-for="i in 12" :key="i" :value="i">{{ i }}</a-option>
            </a-select></a-col
          >
          <a-col :span="1" :offset="1"> 月 </a-col>
          <a-col :span="2">
            <a-select
              v-model="form.fixedDay"
              placeholder="请选择日期"
              :disabled="form.validType !== 2"
            >
              <a-option v-for="i in daysInMonth" :key="i" :value="i">{{
                i
              }}</a-option>
            </a-select></a-col
          >
          <a-col :span="1" :offset="1"> 日 </a-col>
        </a-row>
        <p class="tip"
          >如：设置为2年后5月5日，则用户在2020年1月1日获得的积分将在2022年5月5日失效。</p
        >
        <a-row
          style="
            display: flex;
            align-items: center;
            width: 100%;
            margin: 10px 0;
          "
        >
          <a-col :span="4">
            <a-radio :value="3"> 每笔积分有效期为</a-radio>
          </a-col>
          <a-col :span="3">
            <a-input
              v-model="form.tempValid"
              :disabled="form.validType !== 3"
              @blur="onIntegralBlur"
              @keyup="form.tempValid = form.tempValid.replace(/\D|^0/g, '')"
          /></a-col>
          <a-col :span="2" :offset="1">
            <a-select
              v-model="form.validUnit"
              placeholder="请选择单位"
              :disabled="form.validType !== 3"
              @change="onUnitChange"
            >
              <a-option :value="1">年</a-option>
              <a-option :value="2">月</a-option>
              <a-option :value="3">日</a-option>
            </a-select>
          </a-col>
        </a-row>
        <p class="tip"
          >规则设置好后，“年”支持1～5年，“月”支持1～18个月，“日”支持1～365天。</p
        >
      </a-radio-group>
      <h4>积分保护期： </h4>
      <a-radio-group
        v-model="form.protectStatus"
        style="width: 100%"
        direction="vertical"
      >
        <a-radio :value="1">关闭</a-radio>
        <a-row
          style="
            display: flex;
            align-items: center;
            width: 100%;
            margin: 10px 0;
          "
        >
          <a-col :span="2">
            <a-radio :value="2"> 开启</a-radio>
          </a-col>
          <a-col :span="2">积分在发放</a-col>
          <a-col :span="2">
            <a-input
              v-model="form.protectDay"
              maxlength="3"
              :disabled="form.protectStatus !== 2"
              @input="form.protectDay = form.protectDay.replace(/\D|^0/g, '')"
          /></a-col>
          <a-col :span="8" :offset="1"
            >天内，进入保护期，保护期内无法使用</a-col
          >
        </a-row>
        <p class="tip"
          >仅针对消费金额与消费笔数产生的积分有效，其他方式来源的积分不适用于当前规则。</p
        >
      </a-radio-group>
      <h4>消费积分获取上限： </h4>
      <a-radio-group
        v-model="form.limitStatus"
        style="width: 100%"
        direction="vertical"
      >
        <a-radio :value="1">关闭</a-radio>
        <a-row
          style="
            display: flex;
            align-items: center;
            width: 100%;
            margin: 10px 0;
          "
        >
          <a-col :span="2">
            <a-radio :value="2"> 开启</a-radio>
          </a-col>
          <a-col :span="6">每个客户每天通过消费最多可获取</a-col>
          <a-col :span="2">
            <a-input
              v-model="form.maxIntegral"
              max-length="9"
              :disabled="form.limitStatus !== 2"
              @input="
                form.maxIntegral = form.maxIntegral.replace(/\D|^0/g, '')
              "
          /></a-col>
          <a-col :span="2" :offset="1">积分</a-col>
        </a-row>
        <p class="tip"
          >仅针对消费金额与消费笔数产生的积分有效，其他方式来源的积分不适用于当前规则。</p
        >
      </a-radio-group>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, onMounted, Ref, computed } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { Message } from '@arco-design/web-vue';
  import {
    cbdApiProjectMembersIntegralIntegralCommonGet,
    cbdApiProjectMembersIntegralIntegralCommonSavePost
  } from '@/api';

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
  // 处理天数下拉数据
  const daysInMonth = computed(() => {
    return [1, 3, 5, 7, 8, 10, 12].includes(form.value.fixedMonth)
      ? 31
      : [4, 6, 9, 11].includes(form.value.fixedMonth)
      ? 30
      : 29;
  });
  const form: Ref = ref({
    exchangeRate: '',
    ruleStatus: '',
    cillType: '',
    cillAmount: '',
    limitType: '',
    limitAmount: '',
    tempValid: '',
    tempYear: ''
  });
  const [getData] = useFuncProxy(async () => {
    form.value = await cbdApiProjectMembersIntegralIntegralCommonGet({});
    if (form.value.validType === 2) {
      form.value.tempYear = form.value.valid;
    }
    if (form.value.validType === 3) {
      form.value.tempValid = form.value.valid;
      form.value.fixedMonth = '';
      form.value.fixedDay = '';
    }
  });
  const isLoading = ref(false);
  async function onBeforeOk(done: (closed: boolean) => void) {
    done(false);
    let validType2Unit: undefined | number = form.value.validUnit;
    // 如果是固定到期的,需要手动将validUnit设置为年<1>
    if (form.value.validType === 2) {
      validType2Unit = 1;
    }
    try {
      isLoading.value = true;
      await cbdApiProjectMembersIntegralIntegralCommonSavePost({
        ...form.value,
        validUnit: validType2Unit,
        valid:
          form.value.validType === 3
            ? form.value.tempValid
            : form.value.validType === 2
            ? form.value.tempYear
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
  function onUnitChange() {
    form.value.tempValid = '';
  }
  function onIntegralBlur() {
    if (form.value.validUnit === 1) {
      if (!/^[1-5]$/.test(form.value.tempValid)) {
        Message.error('只能是1-5之间的正整数');
      }
    }
    if (form.value.validUnit === 2) {
      if (
        !/^[0-9]{1,2}$/.test(form.value.tempValid) ||
        form.value.tempValid > 18
      ) {
        Message.error('只能在1-18之间');
      }
    }
    if (form.value.validUnit === 3) {
      if (
        !/^[0-9]{1,3}$/.test(form.value.tempValid) ||
        form.value.tempValid > 365
      ) {
        Message.error('只能在1-365之间');
      }
    }
  }
  onMounted(() => {
    getData();
  });
</script>
<style scoped lang="less">
  .tip {
    color: #999;
  }
</style>
