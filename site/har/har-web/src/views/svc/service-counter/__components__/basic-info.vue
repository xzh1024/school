<template>
  <div class="basic-info">
    <a-descriptions
      title="基本信息"
      layout="vertical"
      :column="{ xs: 1, md: 3, lg: 4 }"
    >
      <a-descriptions-item v-if="info.orderNo" label="单号">
        <span>{{ info.orderNo }}</span>
      </a-descriptions-item>
      <a-descriptions-item label="项目">
        <span>{{ info.projectName || '--' }}</span>
      </a-descriptions-item>
      <a-descriptions-item label="卡名">
        <span>{{ info.cardName || '--' }}</span>
      </a-descriptions-item>
      <a-descriptions-item label="卡号">
        <span>{{ info.memberCardCode || '--' }}</span>
      </a-descriptions-item>
      <a-descriptions-item label="姓名">
        <span>{{ info.memberName || '--' }}</span>
      </a-descriptions-item>
      <a-descriptions-item label="电话">
        <span>{{ info.memberPhone || '--' }}</span>
      </a-descriptions-item>
      <a-descriptions-item label="卡内余额">
        <span>{{ info.balance >= 0 ? formatPrice(info.balance) : '--' }}</span>
      </a-descriptions-item>
      <template v-if="[1, 3].includes(activeKey)">
        <a-descriptions-item label="当前状态">
          <span>{{ statusFilter(info.status) }}</span>
        </a-descriptions-item>
        <a-descriptions-item label="更改前状态">
          <span>{{ statusFilter(info.beforeStatus) }}</span>
        </a-descriptions-item>
      </template>
      <template v-if="activeKey === 3">
        <a-descriptions-item label="退卡人">
          <span>{{ info.returnMemberName || '--' }}</span>
        </a-descriptions-item>
        <a-descriptions-item label="退卡时间">
          <span>{{ info.returnTime || '--' }}</span>
        </a-descriptions-item>
      </template>
      <template v-if="source === 'freeze'">
        <a-descriptions-item label="更改前状态">
          <span>{{ statusFilter(info.beforeStatus) }}</span>
        </a-descriptions-item>
        <a-descriptions-item v-if="info.freezeBy" label="冻结人">
          <span>{{ info.freezeBy || '--' }}</span>
        </a-descriptions-item>
        <a-descriptions-item v-if="info.freezeTime" label="冻结时间">
          <span>{{ info.freezeTime || '--' }}</span>
        </a-descriptions-item>
        <a-descriptions-item v-if="info.unfreezeBy" label="解冻人">
          <span>{{ info.unfreezeBy || '--' }}</span>
        </a-descriptions-item>
        <a-descriptions-item v-if="info.unfreezeTime" label="解冻时间">
          <span>{{ info.unfreezeTime || '--' }}</span>
        </a-descriptions-item>
      </template>
      <template v-if="source === 'topUp'">
        <a-descriptions-item v-if="info.createBy" label="充值人">
          <span>{{ info.createBy || '--' }}</span>
        </a-descriptions-item>
        <a-descriptions-item v-if="info.createTime" label="充值时间">
          <span>{{ info.createTime || '--' }}</span>
        </a-descriptions-item>
      </template>
    </a-descriptions>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  import { valueCardStatusList } from '@/utils/dic';
  import { formatPrice } from '@/utils';
  defineProps({
    info: {
      type: Object,
      default: () => {
        return {};
      }
    },
    activeKey: {
      type: Number,
      default: -1
    },
    source: {
      type: String
    }
  });
  function statusFilter(v: number | string) {
    return valueCardStatusList.find((i) => i.value === v)?.label || '';
  }
</script>
<style lang="less" scoped>
  .basic-info {
    //padding: 16px;
    background-color: #fff;
  }
  :deep(.arco-descriptions-title) {
    display: none;
  }
</style>
