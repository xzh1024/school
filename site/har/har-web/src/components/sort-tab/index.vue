<template>
  <a-space justify="flex">
    <div v-if="title" class="title">{{ title }}</div>
    <a-button-group v-if="sort">
      <a-button
        v-for="(item, index) in btnList"
        :key="item.value"
        :type="current_btn_index === index ? 'primary' : undefined"
        @click="onBtnChange(index, item.value)"
      >
        {{ item.label }}
      </a-button>
    </a-button-group>
  </a-space>
</template>

<script setup lang="ts">
  import { ref, PropType } from 'vue';

  defineProps({
    title: {
      type: String,
      default: ''
    },
    sort: {
      type: Boolean,
      default: true
    },
    btnList: {
      type: Array as PropType<{ label: string; value: string }[]>,
      default: () => []
    }
  });
  const emits = defineEmits(['tab']);
  const current_btn_index = ref<number>(0);
  const onBtnChange = (idx: number, v: string) => {
    current_btn_index.value = idx;
    emits('tab', v);
  };
</script>

<style scoped lang="less">
  .title {
    font-size: 20px;
    margin-right: 20px;
    font-weight: 600;
    color: #000000;
  }
</style>
