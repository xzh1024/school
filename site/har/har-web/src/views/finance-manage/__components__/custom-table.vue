<template>
  <div class="table-wrapper">
    <!--    每一行 -->
    <div
      v-for="(row, index) in data"
      :key="row.id || index"
      class="flex row align-center"
    >
      <!--      每一列-->
      <div
        v-for="column in tempColumns"
        :key="column['prop']"
        class="column"
        :style="{ width: 100 / columnNum + '%' }"
      >
        <div class="cell">
          <div class="header">{{ column.label }}</div>
          <div v-if="column.formatter" class="value">
            {{ column.formatter(row) }}
          </div>
          <div v-else class="value">{{
            row[column['prop']] === undefined || row[column['prop']] === ''
              ? '--'
              : row[column['prop']]
          }}</div>
        </div>
      </div>
    </div>
    <div class="flex row align-center">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, PropType } from 'vue';

  const props = defineProps({
    columns: {
      type: Array as PropType<any>,
      default: () => []
    },
    data: {
      type: Array as PropType<any>,
      default: () => []
    },
    columnNum: {
      type: Number,
      default: 7
    }
  });
  const tempColumns = computed(() => {
    const needLength = props.columnNum - (props.columns.length % 7);
    const tempArr = new Array(needLength).fill({
      label: '--',
      prop: '--'
    });
    return [...props.columns, ...tempArr];
  });
</script>

<style scoped lang="less">
  .table-wrapper {
    border: 1px solid #f2f2f2;
  }
  .row {
    width: 100%;
    flex-wrap: wrap;
    .column {
      //width: 14.285%;
      .cell {
        text-align: center;
        .header {
          padding: 10px;
          display: flex;
          align-items: center;
          height: 60px;
          background-color: #f2f2f2;
        }
        .value {
          display: flex;
          align-items: center;
          padding: 10px;
          height: 60px;
          word-break: break-all;
        }
      }
    }
  }
</style>
