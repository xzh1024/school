<template>
  <div class="old-table-box">
    <div class="table-title">原铺位信息</div>
    <div class="flex margin-bottom-16">
      <i-cell label="归属项目" value="无锡体投项目组" type="vertical" />
      <i-cell label="铺位类型" value="商铺" type="vertical" />
    </div>
    <div>
      <a-table
        :pagination="false"
        class="margin-bottom-16"
        :columns="columns"
        :data="oldTable"
      />
      <div class="flex justify-end">
        <i-cell
          label="总建筑面积："
          :value="'925233m²'"
          width="auto"
          class="margin-right-16"
        />
        <i-cell label="总使用面积：" :value="'125233m²'" width="auto" />
      </div>
    </div>
  </div>
  <div class="new-table-box margin-top-16">
    <div class="table-title">新建铺位信息</div>
    <a-table :pagination="false" :columns="columns" :data="newTable" />
  </div>
</template>

<script setup lang="ts">
  import ICell from './i-cell.vue';
  import { PropType } from 'vue';
  const props = defineProps({
    oldTable: {
      type: Array as PropType<any>,
      default: () => []
    },
    newTable: {
      type: Array as PropType<any>,
      default: () => []
    }
  });

  const columns = [
    {
      title: '铺位号',
      dataIndex: 'berthNo'
    },
    {
      title: '楼层',
      dataIndex: 'floor'
    },
    {
      title: '建筑面积(m²)',
      dataIndex: 'buildAreaNum'
    },
    {
      title: '使用面积(m²)',
      dataIndex: 'useAreaNum'
    }
  ];
</script>

<style scoped lang="less">
  .margin-top-16 {
    margin-top: 16px;
  }
  .margin-bottom-16 {
    margin-bottom: 16px;
  }
  .margin-right-16 {
    margin-right: 16px;
  }
  .old-table-box {
    padding: 12px 16px;
    background: #fff;
    .table-title {
      margin-bottom: 24px;
      color: #333;
      font-size: 16px;
    }
  }
  .new-table-box {
    padding: 12px 16px;
    background: #fff;
    .table-title {
      margin-bottom: 16px;
      color: #333;
      font-size: 16px;
    }
  }
</style>
