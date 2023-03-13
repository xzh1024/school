<template>
  <div class="tabs-list">
    <div
      v-for="(item, index) in options"
      :key="index"
      ref="listRef"
      class="tabs-item"
      :class="item.value === active ? 'tabs-item-active' : ''"
      @click="changeTab(item, index)"
      >{{ item.label }}</div
    >
    <div
      class="tabs-ink"
      :style="{ left: left + 'px', width: width + 'px' }"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, onMounted } from 'vue';

  interface optionTypeItem {
    label: string | number;
    value: string | number;
  }

  interface Props {
    options: optionTypeItem[];
    modelValue: string | number;
  }

  const props = withDefaults(defineProps<Props>(), {
    options: () => []
  });

  const listRef = ref<HTMLDivElement[]>([]);

  onMounted(() => {
    // console.log(listRef.value);
    getCurrentDom(currentIndex.value);
  });

  const currentIndex = computed(() => {
    return props.options.findIndex(
      (i: optionTypeItem) => i.value === props.modelValue
    );
  });
  const emits = defineEmits(['update:modelValue', 'change']);
  const active = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emits('update:modelValue', value);
    }
  });
  const left = ref(0);
  const width = ref(0);
  function getCurrentDom(index: number) {
    const { offsetWidth = 0, offsetLeft = 0 } = listRef.value[index];
    left.value = offsetLeft;
    width.value = offsetWidth;
  }

  function changeTab(item: optionTypeItem, index: number) {
    active.value = item.value;
    emits('change', item);
    getCurrentDom(index);
  }
</script>

<style scoped lang="less">
  .tabs-list {
    position: relative;
    white-space: nowrap;
    display: flex;
    justify-content: space-between;
    padding: 0 160px;
    transition: transform 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }
  .tabs-item {
    margin: 0 16px;
    padding: 8px 0;
    line-height: 1.5715;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    color: var(--color-text-2);
    font-size: 14px;
    outline: none;
    cursor: pointer;
    transition: color 0.2s cubic-bezier(0, 0, 1, 1);
  }
  .tabs-item-active {
    color: rgb(var(--primary-6));
  }
  .tabs-ink {
    position: absolute;
    top: initial;
    right: initial;
    bottom: 0;
    height: 2px;
    background-color: rgb(var(--primary-6));
    transition: left 0.2s cubic-bezier(0.34, 0.69, 0.1, 1),
      width 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }
</style>
