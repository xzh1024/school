<template>
  <div style="padding-left: 16px">
    <div class="block-title">{{ title }}</div>
    <a-row>
      <a-col :span="12">
        <div>审批单编号：{{ code || '--' }}</div>
      </a-col>
      <a-col :span="12">
        <div
          >审批状态：<span
            :style="{ color: status === 1 ? 'green' : '#999999' }"
          >
            {{ status ? valueFindLabel(examStatusList, status) : '--' }}
          </span>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { valueFindLabel } from '@/utils';
  import { examStatusList } from '@/utils/dic';
  interface StatusNumberListType {
    label: string;
    value: number;
  }
  defineProps({
    title: {
      type: String as PropType<string>,
      default: '招商计划审批'
    },
    code: {
      type: String as PropType<string>,
      default: ''
    },
    status: {
      type: Number
    }
  });
  const emits = defineEmits([]);
</script>
