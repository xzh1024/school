<template>
  <a-slider
    ref="sliderRef"
    v-model="value"
    :min="0"
    :max="split"
    :disabled="disabled"
    range
    :style="{ width: '100%', height: '22px' }"
    :format-tooltip="formatter"
    @change="calcSliderText"
  />
</template>

<script setup lang="ts">
  import { computed, onMounted, PropType, ref } from 'vue';

  const props = defineProps({
    modelValue: {
      type: Array as unknown as PropType<[number, number]>,
      default: () => [0, 24]
    },
    split: {
      type: Number,
      default: 24
    },
    disabled: {
      type: Boolean,
      default: false
    }
  });
  const emits = defineEmits(['update:modelValue']);

  function formatter(value: number) {
    return `${value > 9 ? value : '0' + value}:00`;
  }

  const value = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  const sliderRef = ref();
  function calcSliderText() {
    const text = `共${Math.abs(props.modelValue[1] - props.modelValue[0])}小时`;
    const sliderBarEl = sliderRef.value?.$el?.querySelector('.arco-slider-bar');
    if (sliderBarEl) {
      sliderBarEl.innerHTML = text;
    }
  }

  onMounted(() => {
    calcSliderText();
  });
</script>

<style lang="less" scoped>
  :deep(.arco-slider-track) {
    height: 22px;
    &::before {
      height: 22px !important;
    }
  }

  :deep(.arco-slider-bar) {
    height: 22px;
    background-color: #4c8af7;
    border-radius: 4px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    line-height: 22px;
  }

  :deep(.arco-slider-btn) {
    top: 5px;
  }
</style>
