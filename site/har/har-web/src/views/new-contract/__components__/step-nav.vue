<template>
  <ul class="i-nav">
    <!-- <li class="active">合同信息填写</li>
    <li class="active">费用明细</li>
    <li>正式合同调整</li>
    <li>完成合同录入</li> -->
    <li
      v-for="(item, index) in stepArr"
      :key="`s-${index}`"
      :class="activeStep >= item.value ? 'active' : ''"
      >{{ item.label }}</li
    >
  </ul>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useContractStore } from '@/store/project/contract';

  defineProps({
    activeStep: {
      type: Number,
      default: 1
    }
  });
  const { contractInfo } = useContractStore();

  const stepArr = computed(() => {
    return [
      {
        label: '合同信息填写',
        value: 1
      },
      {
        label: '费用明细',
        value: 2
      },
      {
        label:
          contractInfo.contractType === 1 ? '意向合同调整' : '正式合同调整',
        value: 3
      },
      {
        label:
          contractInfo.businessStatus === 1 ? '完成合同录入' : '合同审批信息',
        value: 4
      }
    ];
  });
</script>

<style scoped lang="less">
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .i-nav {
    display: flex;
    background: #fff;
    user-select: none;
    li {
      position: relative;
      display: inline-block;
      flex: 1;
      //width: 189px;
      margin-left: 15px;
      color: #999;
      line-height: 40px;
      text-align: center;
      background: #f7f7f7;
      &.active {
        color: #fff;
        background-color: #4c8af7;
      }
      &.active::after {
        border-left-color: #4c8af7;
      }
      &::after {
        position: absolute;
        top: 0;
        right: -20px;
        z-index: 10;
        display: block;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
        border-left: 20px solid #f7f7f7;
        content: '';
      }
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
        border-left: 20px solid #fff;
        content: '';
      }
      &:first-child {
        margin-left: 0;
        &::before {
          display: none;
        }
      }
      &:last-child {
        margin-right: 22px;
      }
    }
  }
</style>
