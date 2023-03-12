<template>
  <div class="list">
    <template v-for="(item, index) in list" :key="index">
      <row-item
        :list="list"
        :item="item"
        :index="index"
        :type="type"
        @blur="onBlur"
        @add="onAdd"
        @copy="onCopy"
        @sub-add="onSubAdd"
        @delete="onDelete"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { ItemType } from '../types';
  import RowItem from './RowItem.vue';
  defineProps({
    list: {
      type: Array as PropType<ItemType[]>,
      required: true
    },
    type: {
      type: String,
      default: 'single'
    }
  });

  // 新增
  function onAdd(list: ItemType[]) {
    list.push({
      text: '',
      label: '',
      value: ''
    });
  }
  // 添加子项
  function onSubAdd(row: ItemType) {
    if (!row.children) {
      row.children = [];
    }
    row.children.push({
      text: '',
      label: '',
      value: ''
    });

    console.log(row);
  }
  // 复制
  function onCopy(row: ItemType, list: ItemType[]) {
    list.push({ ...row });
  }
  // 删除
  function onDelete(index: number, list: ItemType[]) {
    list.splice(index, 1);
  }

  function onBlur(row: ItemType) {
    row.label = row.value;
    row.text = row.value;
  }
</script>
