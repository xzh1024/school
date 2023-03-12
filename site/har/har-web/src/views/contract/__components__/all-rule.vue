<template>
  <div class="flex-1">
    <div class="rule">
      <div class="rule-title">账单生成规则</div>
      <a-form-item
        field="chargingRule.ruleDay"
        label="缴费截止日到期前"
        :rules="[{ required: true, message: '请填写出账日' }]"
      >
        <div class="flex align-center">
          <a-input-number
            v-model="form.chargingRule.ruleDay"
            placeholder="请填写出账日"
          >
            <template #suffix>天</template>
          </a-input-number>
          <div class="tip">生成账单</div>
        </div>
      </a-form-item>
    </div>
    <div class="rule">
      <div class="rule-title">合同终止规则</div>
      <div class="flex align-center">
        <a-form-item
          field="chargingRule.expireDay"
          :rules="[
            { required: true, message: '请输入' },
            { match: /^[1-9](\d?)+$/, message: '请填写正整数' }
          ]"
          label="当逾期"
        >
          <div class="flex align-center">
            <a-input-number
              :model-value="form.chargingRule.expireDay"
              placeholder="请输入"
              @change="expireChange"
            >
              <template #suffix>天</template>
            </a-input-number>
            <div class="tip">或者当保证金扣除到</div>
          </div>
        </a-form-item>
        <a-form-item
          hide-label
          field="chargingRule.bondRatio"
          :rules="[
            { required: true, message: '请输入' },
            { match: /^[1-9](\d?)+$/, message: '请填写正整数' }
          ]"
        >
          <a-input-number
            v-model="form.chargingRule.bondRatio"
            placeholder="请输入"
          >
            <template #suffix>‰</template>
          </a-input-number>
          <div class="tip">合同终止</div>
        </a-form-item>
      </div>
    </div>
    <div v-if="expireRules.length" class="rule">
      <div class="rule-title">逾期处罚规则</div>
      <div class="rule-list">
        <div
          v-for="(item, index) in expireRules"
          :key="index"
          class="rule-item margin-bottom-xs"
        >
          <!--规则-->
          <a-form-item
            :field="`expireRules.${index}.endDay`"
            :label="`规则${numToString(
              index + 1
            )}:当缴费截止日未收到租金，则逾期`"
            :rules="[{ required: true, message: '请选择天数' }]"
          >
            <div class="flex align-center justify-between flex-1">
              <div class="flex align-center">
                <a-select
                  v-model="expireRules[index].startDay"
                  placeholder="选择天数"
                  disabled
                >
                  <a-option>1</a-option>
                </a-select>
                <div class="tip">天 至</div>
                <a-select
                  :model-value="expireRules[index].endDay"
                  placeholder="选择天数"
                  :virtual-list-props="{ height: 200 }"
                  :options="maxValue"
                  @change="(v) => changeDay(v, index)"
                >
                </a-select>
                <div class="tip">天</div>
              </div>
              <div v-if="index + 1 !== expireRules.length">
                <a-popconfirm content="确认删除?" @ok="deleteItemRule(index)">
                  <icon-minus-circle class="icon" />
                </a-popconfirm>
              </div>
            </div>
          </a-form-item>

          <!--处罚内容-->
          <div class="item-sub">
            <div class="item-sub-title"
              >滞纳金处罚规则（本金以未缴纳金额为准）</div
            >
            <!--滞纳金处罚-->
            <div class="flex align-center">
              <a-form-item
                hide-label
                :rules="[{ required: true, message: '请选择天数' }]"
                :field="`expireRules.${index}.periodOverdueDay`"
              >
                <div class="flex align-center">
                  <div class="tip">每</div>
                  <a-select
                    v-model="expireRules[index].periodOverdueDay"
                    placeholder="选择天数"
                    :virtual-list-props="{ height: 200 }"
                    :options="maxValue"
                  >
                  </a-select>
                  <div class="tip">天，收取</div>
                </div>
              </a-form-item>
              <a-form-item
                hide-label
                :rules="[{ required: true, message: '请填写扣除滞纳金' }]"
                :field="`expireRules.${index}.overdueRatio`"
              >
                <a-input-number v-model="expireRules[index].overdueRatio">
                  <template #suffix>‰</template>
                </a-input-number>
                <div class="tip">的滞纳金</div>
              </a-form-item>
            </div>
            <!--保证金处罚-->
            <div class="item-sub-title">保证金处罚规则</div>
            <div class="flex align-center">
              <a-form-item
                hide-label
                :rules="[{ required: true, message: '请选择天数' }]"
                :field="`expireRules.${index}.periodBondDay`"
              >
                <div class="flex align-center">
                  <div class="tip">每</div>
                  <a-select
                    v-model="expireRules[index].periodBondDay"
                    placeholder="选择天数"
                    :virtual-list-props="{ height: 200 }"
                    :options="maxValue"
                  >
                  </a-select>
                  <div class="tip">天，扣除</div>
                </div>
              </a-form-item>
              <a-form-item
                hide-label
                :rules="[{ required: true, message: '请填写扣除保证金' }]"
                :field="`expireRules.${index}.bondRatio`"
              >
                <a-input-number v-model="expireRules[index].bondRatio">
                  <template #suffix>‰</template>
                </a-input-number>
                <div class="tip">的保证金</div>
              </a-form-item>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'AllRule'
  };
</script>
<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import { numToString } from '@/utils/';
  import { Message, Modal } from '@arco-design/web-vue';

  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => {
        return {};
      }
    }
  });
  const original = ref<Array<number>>([]);
  const maxValue = ref<Array<number>>([]);
  const emits = defineEmits(['update:modelValue']);
  const form = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  interface expireRulesType {
    startDay: number;
    endDay: number;
    periodOverdueDay: number;
    overdueRatio: number;
    periodBondDay: number;
    bondRatio: number;
  }

  const expireRules = computed<Array<Partial<expireRulesType>>>({
    get() {
      return props.modelValue?.expireRules || [];
    },
    set(v) {
      form.value.expireRules = v;
    }
  });

  onMounted(() => {
    initOriginal();
  });

  function initOriginal() {
    const arr = expireRules.value;
    const newArr: any = [];
    arr.forEach((i) => {
      const { startDay, endDay } = i;
      newArr.push(startDay, endDay);
    });
    original.value = newArr;
  }

  function expireChange(v: number | undefined) {
    const oldValue = form.value.chargingRule.expireDay;
    if (oldValue && v) {
      Modal.warning({
        title: '提示',
        simple: false,
        hideCancel: false,
        content: '此操作将会更改逾期规则结束日期！',
        mask: true,
        onOk: () => {
          resetDay(v);
          const arr = original.value;
          arr.splice(arr.length - 1, 1, v);
          original.value = arr;
          console.log(original.value);
          setNewRules(getOriginalArr());
        }
      });
    } else {
      resetDay(v);
      if (v && v > 0 && !expireRules.value.length) {
        original.value = [1, v];
        expireRules.value = [
          {
            startDay: 1,
            endDay: v
          }
        ];
      }
    }
  }
  //重置过期时间
  function resetDay(v = 0) {
    form.value.chargingRule.expireDay = v!;
    maxValue.value = Array(v)
      .fill(null)
      .map((i, index) => index + 1);
  }

  function changeDay(v: any, index: number) {
    console.log(v, index);
    const { chargingRule = {} } = form.value;
    const { expireDay } = chargingRule;
    const arrIndex = 2 * index + 1;
    const origin = [...original.value];
    console.log(original.value, 'original.value');
    // 插入当前选择值
    const current = origin[arrIndex];
    const nextStart = origin[arrIndex + 1];
    const nextEnd = origin[arrIndex + 2];
    const prevStart = origin[arrIndex - 1];
    if (v < prevStart) {
      return Message.error('必须大于或当前规则开始值');
    }
    if (nextEnd <= v) {
      return Message.error('必须小于下一规则结束值');
    }

    origin[arrIndex] = v;
    if (current < v) {
      origin[arrIndex + 1] = v + 1;
    } else {
      // 设值小于当前值
      console.log(nextStart, 'nextStart');
      if (nextStart) {
        console.log(1111, nextStart);
        origin.splice(arrIndex + 1, 0, nextStart - 1, nextStart - 1);
      }
      console.log(original.value, 'original.value');
      //插入下一条开始值
      origin[arrIndex + 1] = v + 1;
      if (!origin.some((i) => i === expireDay)) {
        origin.push(expireDay);
      }
      if (origin.length % 2) {
        origin.push(expireDay);
      }
      expireRules.value.splice(index + 1, 0, {});
    }
    console.log(origin, 'origin');
    original.value = origin;
    setNewRules(getOriginalArr());
  }
  function getOriginalArr(): Array<Array<number>> {
    const newOriginal: Array<Array<number>> = [];
    original.value.forEach((i, index) => {
      const res = Math.floor(index / 2);
      if (newOriginal[res]) newOriginal[res].push(i);
      else newOriginal[res] = [i];
    });
    return newOriginal;
  }

  function setNewRules(newOriginal: Array<Array<number>>) {
    const rules = [...expireRules.value];
    newOriginal.forEach((i, index) => {
      const [startDay, endDay] = i;
      rules[index] = {
        ...rules[index],
        startDay,
        endDay
      };
    });
    expireRules.value = rules;
  }

  function deleteItemRule(index: number) {
    const item = expireRules.value.splice(index, 1);
    const { endDay = 0 } = item[0] || {};
    const e1 = endDay + 1;
    original.value = original.value.filter((i: number, index: number) => {
      const prev = index > 0 ? original.value[index - 1] : 0;
      return (i !== endDay && i !== e1) || i === prev;
    });
    setNewRules(getOriginalArr());
  }
</script>

<style scoped lang="less">
  .fix-width {
    width: 150px;
  }

  .rule {
    .icon {
      color: #fd6868;
      font-size: 30px;
    }

    .rule-title {
      margin-bottom: 12px;
      font-weight: bold;
      font-size: 14px;
      line-height: 36px;
      border-bottom: 1px solid #eaeaea;
    }

    .tip {
      margin: 0 12px;
      color: #666;
      font-size: 14px;
      white-space: nowrap;
    }

    .item-sub {
      padding: 10px;
      background: #fafafa;
    }

    .item-sub-title {
      font-weight: bold;
      font-size: 14px;
      line-height: 36px;
    }
  }

  :deep(.arco-form-item-label-col.arco-form-item-label-col-flex) {
    flex: 1 !important;
  }

  :deep(.arco-select) {
    width: 150px;
  }

  :deep(.arco-input-wrapper) {
    width: 150px;
  }

  :deep(.arco-form-item) {
    flex: 0;
  }
</style>
