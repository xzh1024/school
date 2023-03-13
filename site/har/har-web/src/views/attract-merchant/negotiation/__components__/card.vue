<template>
  <div class="card-out">
    <i-card>
      <template #title>
        <h4 class="card-title" :class="[`type${info.type || ''}`]">{{
          info.planName
        }}</h4>
      </template>
      <div class="flex align-center justify-between">
        <div>
          <h4 class="times">{{ info.num || 0 }}</h4>
          <span v-if="[1, 2, 3].includes(negotiateStage)">谈判次数</span>
          <span v-else>合计谈判次数</span>
        </div>
        <div v-if="negotiateStage !== 5" class="text-center">
          <h4 v-if="negotiateStage === 1" class="times"
            >{{ info.minArea || 0 }}~{{ info.maxArea || 0 }}㎡</h4
          >
          <h4 v-else class="times">{{ info.storeName || '--' }}</h4>
          <span>{{ handleTextShow(negotiateStage) }}</span>
        </div>
        <div v-if="negotiateStage !== 5" class="text-center">
          <h4 class="times">{{ info.brandName || '--' }}</h4>
          <span>品牌</span>
        </div>
        <div v-else class="text-center">
          <h4 class="times">{{ info.endDate || '--' }}</h4>
          <span>计划结束时间</span>
        </div>
      </div>
    </i-card>
  </div>
</template>

<script setup lang="ts">
  import ICard from '@/components/i-card/i-card.vue';
  defineProps({
    info: {
      type: Object,
      default: () => {
        return {};
      }
    },
    negotiateStage: {
      type: Number,
      default: 1
    },
    titleBg: {
      type: String,
      default: '#ffffff'
    }
  });
  const statusHash: Record<number, string> = {
    1: '面积要求',
    2: '意向铺位',
    3: '意向铺位',
    4: '已签铺位'
  };
  function handleTextShow(status: number) {
    return statusHash[status];
  }
</script>
<style scoped lang="less">
  .card-out {
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 16px;
  }
  .card-out {
    :deep(.arco-card-header) {
      padding: 0;
      height: 38px;
    }
  }
  .card-title {
    padding: 0 0 0 15px;
    margin: 0;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    color: #ffffff;
  }
  .times {
    margin: 0;
    padding: 0 0 5px;
    text-align: center;
  }
  :deep(.arco-card-actions) {
    margin: 0;
  }
  .type {
    background: #cccccc;
  }
  .type1 {
    background: #4c8af7;
  }
  .type2 {
    background: #ffb44c;
  }
  .type3 {
    background: #69af0f;
  }
  .type4 {
    background: #fa4e40;
  }
  .type5 {
    background: #cccccc;
  }
  .type6 {
    background: #cccccc;
  }
  .text-center {
    text-align: center;
  }
</style>
