<template>
  <a-modal
    v-model:visible="visible"
    :mask-closable="false"
    :closable="false"
    :width="700"
    title="场地定价"
    :on-before-ok="onBeforeOk"
  >
    <a-form ref="refForm" layout="vertical" :model="form" auto-label-width>
      <div v-if="form.rule === 1">
        <template v-if="form.configs">
          <div v-for="(item, index) in form.configs" :key="index">
            <a-row class="flex align-center justify-between">
              <div class="rule_title">{{ `计费规则${index + 1}` }}</div>
              <div class="btn_icon_box">
                <img
                  src="@/assets/images/member/icon_add.png"
                  alt=""
                  @click="priceRulesAdd"
                />
                <img
                  v-if="form.configs.length > 1"
                  src="@/assets/images/member/icon_del.png"
                  alt=""
                  @click="deletePriceItem(index)"
                />
              </div>
            </a-row>
            <a-row v-for="(j, jIndex) in item.priceRules" :key="jIndex">
              <a-col :span="24">
                <a-form-item
                  label="每人:"
                  :field="`configs.${index}.priceRules.${jIndex}.price`"
                  :rules="[{ required: true, message: '请填写价格' }]"
                >
                  <a-input-number
                    v-model="j.price"
                    placeholder="请输入散客价格"
                  >
                    <template #append> 元 </template>
                  </a-input-number>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-form-item
                  label="时间(周):"
                  :field="`configs.${index}.week`"
                  :rules="[{ required: true, message: '请选择时间' }]"
                >
                  <a-checkbox-group v-model="item.week">
                    <a-checkbox
                      v-for="single in weekList"
                      :key="single.value"
                      :value="single.value"
                    >
                      {{ single.label }}
                    </a-checkbox>
                  </a-checkbox-group>
                </a-form-item>
              </a-col>
            </a-row>
          </div>
        </template>
      </div>
      <div v-else-if="[2, 3].includes(form.rule)">
        <template v-if="form.configs">
          <a-form-item
            field="day"
            class="line_col"
            :rules="[{ required: true, message: '请输入天数' }]"
            label="最多可预定近"
          >
            <a-input-number
              v-model="form.day"
              :min="1"
              :max="30"
              class="line_input"
            >
              <template #append> 天 </template>
            </a-input-number>
            <div class="margin_left_8">的日期</div>
          </a-form-item>
          <a-form-item
            field="hour"
            class="line_col"
            :rules="[{ required: true, message: '请输入小时数' }]"
            label="距开场时间"
          >
            <a-input-number
              v-model="form.hour"
              class="line_input"
              :min="0"
              :max="24"
            >
              <template #append> 小时 </template>
            </a-input-number>
            <div class="flex margin_left_8 openTime">
              <span>前用户才可退款</span>
              <a-tooltip
                content="如果距离开场小于该时间用户将不可申请退款，输入0则用户可随时退款"
              >
                <img src="@/assets/images/member/toast_icon.png" alt="" />
              </a-tooltip>
            </div>
          </a-form-item>
          <div v-for="(item, index) in form.configs" :key="index">
            <a-row class="flex align-center justify-between">
              <div class="rule_title">{{ `计费规则${index + 1}` }}</div>
              <div class="btn_icon_box">
                <img
                  src="@/assets/images/member/icon_add.png"
                  alt=""
                  @click="priceRulesAdd"
                />
                <img
                  v-if="form.configs.length > 1"
                  src="@/assets/images/member/icon_del.png"
                  alt=""
                  @click="deletePriceItem(index)"
                />
              </div>
            </a-row>
            <a-row
              v-for="(single, idx) in item.priceRules"
              :key="idx"
              class="flex justify-between"
              style="width: 100%"
            >
              <a-col :span="12">
                <a-form-item
                  :field="`configs.${index}.priceRules.${idx}.timeRange`"
                  :rules="[{ required: true, message: '请选择时间范围' }]"
                  :label="form.rule === 2 ? `时段${idx + 1}` : `场次${idx + 1}`"
                >
                  <a-time-picker
                    v-model="single.timeRange"
                    format="HH:mm"
                    type="time-range"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="9">
                <a-form-item
                  :label="form.rule === 2 ? '每小时' : '-'"
                  :field="`configs.${index}.priceRules.${idx}.price`"
                  :hide-asterisk="true"
                  :rules="[{ required: true, message: '请填写价格' }]"
                >
                  <a-input-number v-model="single.price">
                    <template #append> 元 </template>
                  </a-input-number>
                </a-form-item>
              </a-col>
              <a-col :span="2">
                <div class="btn_icon_box son_col">
                  <img
                    src="@/assets/images/member/icon_add_plus.png"
                    alt=""
                    @click="addTimeItem(index)"
                  />
                  <img
                    v-if="item.priceRules.length > 1"
                    src="@/assets/images/member/icon_del_plus.png"
                    alt=""
                    @click="deleteTimeItem(index, idx, item.priceRules)"
                  />
                </div>
              </a-col>
            </a-row>
            <a-form-item
              label="时间(周):"
              :field="`configs.${index}.week`"
              :rules="[{ required: true, message: '请选择时间(周)' }]"
            >
              <a-checkbox-group v-model="item.week">
                <a-checkbox
                  v-for="single in weekList"
                  :key="single.value"
                  :value="single.value"
                >
                  {{ single.label }}
                </a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </div>
        </template>
      </div>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
  export default {
    name: 'ChargeRules'
  };
</script>

<script setup lang="ts">
  import { computed, onMounted, ref, Ref, toRaw, watch } from 'vue';
  import { weekList } from '@/utils/dic';

  const props = defineProps({
    modelValue: {
      type: Boolean
    },
    info: {
      type: Object
    }
  });
  const emits = defineEmits(['update:modelValue', 'change']);

  // 暂做处理  拷贝
  const form = ref<any>(JSON.parse(JSON.stringify(props.info)));
  const refForm: Ref = ref(null);
  const visible: Ref<boolean> = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  onMounted(() => {
    if (!form.value?.configs) {
      priceRulesAdd();
    }
  });
  async function priceRulesAdd() {
    let { configs = [] } = form.value;
    const p = {
      week: [],
      priceRules: [{}]
    };
    if (configs.length) {
      configs.push(p);
    } else {
      configs = [p];
    }
    form.value.configs = configs;
  }
  function addTimeItem(parentIndex: number) {
    const { configs = [] } = form.value;
    configs[parentIndex].priceRules.push({});
  }
  function deleteTimeItem(
    parentIndex: number,
    index: number,
    priceRules: any[]
  ) {
    const { configs = [] } = form.value;
    if (priceRules.length === 1) {
      configs.splice(parentIndex, 1);
    } else {
      priceRules.splice(index, 1);
    }
  }
  function deletePriceItem(parentIndex: number) {
    const { configs = [] } = form.value;
    configs.splice(parentIndex, 1);
  }
  function onBeforeOk(done: (closed: boolean) => void) {
    form.value.configs.forEach((itemConfigs: any) => {
      itemConfigs.priceRules.forEach((item: any) => {
        if (item.timeRange) {
          item.startTime = item.timeRange?.[0];
          item.endTime = item.timeRange?.[1];
        }
      });
    });
    console.log(form.value, 'form.value');
    async function submit() {
      const res = await refForm.value.validate();
      console.log(res);
      if (!res) {
        emits('change', JSON.stringify(form.value));
        done(true);
      } else {
        done(false);
      }
    }
    submit();
  }
</script>

<style scoped lang="less">
  .line_col {
    display: flex;
    height: 52px !important;
    margin-bottom: 0 !important;
    .openTime {
      display: flex;
      align-items: center;
      & > img {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-left: 8px;
      }
    }
    .margin_left_8 {
      margin-left: 8px;
    }
    :deep(.arco-form-item-label) {
      width: 92px;
      height: 32px;
      line-height: 32px;
      margin-right: 8px;
    }
    .line_input {
      width: 144px;
      height: 32px;
    }
  }
  .rule_title {
    font-size: 16px;
    color: #333333;
    margin-bottom: 8px;
  }
  .btn_icon_box {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    & > img {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-left: 4px;
    }
  }
  .son_col {
    justify-content: flex-end;
    margin-top: 30px;
    & > img {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-left: 4px;
    }
  }
  .little-left {
    margin-left: 10px;
  }

  :deep(.width-picker) {
    width: 120px;
  }
</style>
