<template>
  <div class="row">
    <a-input :model-value="item.value" placeholder="请输入" @input="onBlur" />
    <div class="drag-btn" title="新增" @click="onAdd">
      <i class="fc-icon icon-add" />
    </div>
    <div class="drag-btn" title="复制" @click="onCopy(item)">
      <i class="fc-icon icon-copy" />
    </div>
    <div
      v-if="type === 'multiple'"
      class="drag-btn"
      title="添加子项"
      @click="onSubAdd(item)"
    >
      <i class="fc-icon icon-add-child" />
    </div>
    <div
      v-if="index > 0"
      class="drag-btn drag-btn-danger"
      title="删除"
      @click="onDelete(index)"
    >
      <i class="fc-icon icon-delete" />
    </div>
  </div>
  <div v-if="item.children?.length" class="sub-row">
    <struct-list :list="item.children" :type="type" />
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { ItemType } from '../types';
  import StructList from './StructList.vue';

  const props = defineProps({
    item: {
      type: Object as PropType<ItemType>,
      required: true
    },
    index: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'single'
    },
    list: {
      type: Array as PropType<ItemType[]>,
      default: () => [],
      required: true
    }
  });

  const emits = defineEmits(['blur', 'add', 'delete', 'subAdd', 'copy']);

  function onBlur(v: string) {
    // eslint-disable-next-line vue/no-mutating-props
    props.item.value = v;
    emits('blur', props.item);
  }

  function onAdd() {
    emits('add', props.list);
  }

  function onCopy(item: ItemType) {
    emits('copy', item, props.list);
  }

  function onSubAdd(item: ItemType) {
    emits('subAdd', item);
  }

  function onDelete(index: number) {
    emits('delete', index, props.list);
  }
</script>

<style lang="less" scoped>
  .row {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .drag-btn {
    margin-left: 6px;
    cursor: pointer;
  }

  .sub-row {
    padding-left: 30px;
    box-sizing: border-box;
    margin-top: 15px;
  }
</style>
