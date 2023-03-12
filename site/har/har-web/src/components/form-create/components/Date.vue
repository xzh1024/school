<template>
  <div>
    <component :is="computedComponent" v-bind="computedProps" />
  </div>
</template>

<script setup lang="ts" name="Date">
  import { computed, PropType } from 'vue';
  import { DatePicker } from '@arco-design/web-vue';
  const { MonthPicker, YearPicker, QuarterPicker, WeekPicker, RangePicker } =
    DatePicker;

  const props = defineProps({
    formCreateInject: Object as PropType<any>
  });

  const computedProps = computed(() => {
    return (
      props.formCreateInject?.rule?.props || {
        mode: 'default',
        range: false
      }
    );
  });

  const keymap = {
    year: YearPicker,
    month: MonthPicker,
    quarter: QuarterPicker,
    week: WeekPicker
  } as any;
  const computedComponent = computed(() => {
    if (computedProps.value.range) {
      return RangePicker;
    }
    return keymap[computedProps.value?.mode] || DatePicker;
  });
</script>
