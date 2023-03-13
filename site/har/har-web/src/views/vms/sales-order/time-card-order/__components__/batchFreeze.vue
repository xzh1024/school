<template>
  <a-modal
    v-model:visible="visible"
    title="批量冻结"
    title-align="start"
    width="320px"
    :ok-button-props="{
      disabled: !(form.date && form.date.length)
    }"
    @ok="onOk"
    @cancel="visible = false"
    @close="close"
  >
    <a-range-picker
      v-model="form.date"
      :disabled-date="disabledDate"
      @change="dateChange"
    />
    <div class="description">
      所选限期卡中最小可冻结天数为2天，如果达到可冻结天数上限，则自动进行解冻
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import dayjs from 'dayjs';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  });
  const emits = defineEmits(['update:modelValue', 'submit']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  type FormModel = {
    date: string[];
  };
  const form = ref<FormModel>({
    date: []
  });
  const disabledDate = (current: Date) => {
    return dayjs(current).isBefore(dayjs().subtract(1, 'day'));
  };
  const dateChange = (value: any) => {
    console.log(value);
  };
  const onOk = () => {
    emits('submit', {
      startTime: form.value.date[0],
      endTime: form.value.date[1]
    });
  };

  // 弹框关闭后初始化数据
  const close = () => {
    form.value = {
      date: []
    };
  };
</script>

<style scoped lang="less">
  .description {
    font-size: 12px;
    color: #999999;
    line-height: 16px;
    margin-top: 12px;
  }
</style>
