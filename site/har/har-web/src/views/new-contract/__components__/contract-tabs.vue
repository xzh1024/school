<template>
  <div class="tabs-box">
    <div class="tabs-list">
      <div
        v-for="(item, index) in tabOptions"
        :key="`t_${index}`"
        class="tabs-item"
        :class="item.value === activeValue ? 'i-active' : ''"
        @click="onChangeTab(item)"
        >{{ item.label }}</div
      >
    </div>
    <div class="tabs-content">
      <div v-for="(item, index) in tabOptions" :key="`s_${index}`">
        <div v-if="item.value === activeValue">
          <slot :name="`${item.value}`"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, PropType } from 'vue';
  import { useContractStore } from '@/store/project/contract';
  import { Message } from '@arco-design/web-vue';

  interface optionTypeItem {
    label: string | number;
    value: string | number;
  }

  const props = defineProps({
    tabOptions: {
      type: Array as PropType<optionTypeItem[]>
    },
    active: {
      type: Number,
      default: 1
    }
  });
  const emits = defineEmits(['update:active', 'change']);

  const contractStore = useContractStore();
  const onChangeTab = (item: optionTypeItem) => {
    console.log(item);
    // if (contractStore.contractInfo.contractId === '')
    //   return Message.error({ content: '请先完成主体信息录入' });
    // if (
    //   [1, 2, 3].includes(activeValue.value) &&
    //   contractStore.contractInfo.handleType === 1
    // )
    //   return;
    // activeValue.value = Number(item.value);
    // emits('update:active', item.value);
    //单独使用change事件，避免影响合同主体信息切换
    emits('change', item);
  };

  const activeValue = computed({
    get() {
      return props.active;
    },
    set(value) {
      emits('update:active', value);
    }
  });
</script>

<style scoped lang="less">
  .tabs-box {
  }
  .tabs-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 160px;
    background: #fff;
    //overflow-x: auto;
    user-select: none;
    .tabs-item {
      min-width: 64px;
      height: 48px;
      margin-right: 32px;
      overflow: hidden;
      color: #999;
      font-size: 16px;
      line-height: 48px;
      white-space: nowrap;
      text-align: center;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .i-active {
      color: #4c8af7;
      border-bottom: 2px solid #4c8af7;
    }
  }
  .tabs-content {
    height: calc(100vh - 47px - 64px - 48px - 56px);
    overflow-y: auto;
  }
</style>
