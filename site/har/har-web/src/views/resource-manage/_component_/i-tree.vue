<template>
  <div class="tree-box">
    <ul v-for="item in data" :key="item.label">
      <li class="tree-box-info">
        <div class="tree-bar" @click="onSelectHandler(item)">
          <div class="open-box">
            <icon-caret-down v-if="chooseNameIcon !== item.label" />
            <icon-caret-up v-else style="color: #4c8af7" />
          </div>
          <div
            class="tree-content"
            :class="chooseName === item.label ? 'text-blue' : 'text-black'"
            >{{ item.label }}</div
          >
        </div>
      </li>
      <div v-if="chooseNameIcon === item.label">
        <slot></slot>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { computed, PropType, ref } from 'vue';

  interface treeData {
    canAdd?: boolean;
    canDelete?: boolean;
    canUpdate?: boolean;
    label: string;
    showInfo?: boolean;
    value: string | number;
  }

  const props = defineProps({
    data: {
      type: Array as PropType<any>,
      default: () => []
    },
    selectContent: {
      type: String,
      default: ''
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'label'
        };
      }
    }
  });
  const emits = defineEmits(['onSelectHandler']);

  const label = computed(() => {
    return props.defaultProps?.label;
  });

  const chooseName = ref(props.selectContent);
  const chooseNameIcon = ref(props.selectContent);
  const onSelectHandler = (item: treeData) => {
    chooseName.value = item.label;
    chooseNameIcon.value =
      item.label === chooseNameIcon.value ? '' : item.label;
    emits('onSelectHandler', {
      ...item
    });
  };
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
  .text-blue {
    color: #4c8af7;
  }
  .text-black {
    color: #333;
  }
  .tree-box {
    &-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 32px;
      margin-bottom: 4px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      user-select: none;
      .tree-bar {
        display: flex;
        flex: 1;
        align-items: center;
        height: 100%;
        .open-box {
          margin-right: 8px;
          cursor: pointer;
        }
        .tree-content {
          flex: 1;
          width: 0;
          overflow: hidden;
          font-size: 14px;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-break: break-all;
          cursor: pointer;
        }
      }
      //.tree-select {
      //  box-sizing: border-box;
      //  padding: 5px;
      //  color: red;
      //}
    }
  }
</style>
