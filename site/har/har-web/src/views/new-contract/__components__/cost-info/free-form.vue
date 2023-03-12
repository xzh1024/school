<template>
  <div class="free-form">
    <i-form ref="formRef" v-model="form" :options="options">
      <template #freeValueForm>
        <a-row class="width-100">
          <a-col :span="16">
            <a-input
              v-model="form.freeValue"
              class="border-radius-right-no"
              :max-length="14"
              :disabled="!props.everyAllTrue"
              :placeholder="placeholderText"
            ></a-input>
          </a-col>
          <a-col :span="8">
            <a-form-item
              hide-label
              field="freeMethod"
              :rules="[{ required: true, message: '请选择类型' }]"
            >
              <a-select
                v-model="form.freeMethod"
                class="bg-grey border-radius-left-no"
                :options="contractIncreaseMethodList"
                :disabled="!props.everyAllTrue"
                placeholder="请选择"
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </template>
      <template #freePaymentsForm>
        <a-select
          :model-value="selectedIds"
          multiple
          :placeholder="placeholder"
          :disabled="!props.everyAllTrue"
          :options="props.freeList"
          :field-names="{
            value: 'paymentPeriod',
            label: 'paymentPeriod'
          }"
          :virtual-list-props="{
            height: 200
          }"
          @change="changeSelect"
        >
        </a-select>
      </template>
    </i-form>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, withDefaults } from 'vue';
  import {
    regularDecimalAndInteger,
    regularDecimalAndIntegerMessage
  } from '@/utils/regularDic';
  import { contractIncreaseMethodList } from '@/utils/dic';
  import { CbdApiProjectFormalContractPayGetPeriodsByPaySchemePostResponse } from '@/api';

  interface freeItemType {
    id?: number;
    freePayments?: {
      id?: number;
      paymentPeriod?: string;
      startDate?: string;
      endDate?: string;
    }[];
    freeMethod?: number;
    freeValue?: string;
  }
  interface propsType {
    modelValue: freeItemType;
    freeList: CbdApiProjectFormalContractPayGetPeriodsByPaySchemePostResponse;
    everyAllTrue: boolean;
  }
  const props = withDefaults(defineProps<propsType>(), {
    modelValue: () => {
      return {};
    },
    freeList: () => [],
    everyAllTrue: false
  });
  const formRef = ref();
  const emits = defineEmits(['update:modelValue']);
  const form = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  const placeholder = computed(() => {
    return props.everyAllTrue ? '请选择' : '请将阶段内容填写完整再选择';
  });
  const placeholderText = computed(() => {
    return props.everyAllTrue ? '请填写' : '请将阶段内容填写完整再选择';
  });

  const selectedIds = computed(() => {
    const { freePayments = [] } = form.value;
    return freePayments.map((i) => i.paymentPeriod) as
      | string
      | number
      | Record<string, unknown>
      | (string | number | Record<string, unknown>)[];
  });
  const options = computed(() => {
    return {
      menuForm: false,
      formCard: false,
      layout: 'vertical',
      columns: [
        {
          label: '免租方式',
          prop: 'freeValue',
          rules: [
            { required: true, message: '请填写免租方式' },
            {
              match: regularDecimalAndInteger,
              message: regularDecimalAndIntegerMessage
            },
            {
              validator(
                v: string | undefined,
                callback: (error?: string) => void
              ) {
                const { freeMethod } = form.value;
                if (freeMethod === 2 && Number(v) > 100) {
                  callback('免租比例不能大于100%');
                } else {
                  callback();
                }
              }
            }
          ]
        },
        {
          label: '免租账期',
          prop: 'freePayments',
          span: 12,
          rules: [{ required: true, message: '请选择免租账期' }]
        }
      ]
    };
  });

  function changeSelect(
    e:
      | string
      | number
      | Record<string, any>
      | (string | number | Record<string, any>)[] = []
  ) {
    console.log(e);
    const { freeList } = props;
    const selected = e as string[];
    form.value.freePayments = freeList.filter((i) =>
      selected.includes(i.paymentPeriod)
    );
  }

  function submit() {
    return formRef.value.submit();
  }
  defineExpose({ submit });
</script>

<style scoped lang="less">
  .width-100 {
    width: 100%;
  }
  .free-form {
    :deep(.bg-grey) {
      background: #f7f7f7;
    }
    :deep(.border-radius-right-no) {
      border-radius: 4px 0 0 4px;
      border-right: none;
      .arco-input-wrapper {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    :deep(.border-radius-no) {
      border-radius: 0;
      border-right: none;
      .arco-input-wrapper {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    :deep(.border-radius-left-no) {
      border-radius: 0 4px 4px 0;
      .arco-input-wrapper {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
</style>
