<template>
  <div
    class="drag-tool"
    :class="{ active: state.active === id }"
    @click.stop="active"
  >
    <div v-if="mask" class="drag-mask"></div>
    <div class="drag-l">
      <div
        v-if="state.active === id && dragBtn !== false"
        class="drag-btn _fc-drag-btn"
        style="cursor: move"
      >
        <i class="fc-icon icon-move"></i>
      </div>
    </div>
    <template v-if="unique !== 'project'">
      <div class="drag-r">
        <div class="drag-btn" title="新增" @click="$emit('create')">
          <i class="fc-icon icon-add"></i>
        </div>
        <div class="drag-btn" title="复制" @click="$emit('copy')">
          <i class="fc-icon icon-copy"></i>
        </div>
        <div
          v-if="children"
          class="drag-btn"
          title="添加子项"
          @click="$emit('addChild')"
        >
          <i class="fc-icon icon-add-child"></i>
        </div>
        <div
          class="drag-btn drag-btn-danger"
          title="删除"
          @click="$emit('delete')"
        >
          <i class="fc-icon icon-delete"></i>
        </div>
      </div>
    </template>
    <slot name="default"></slot>
  </div>
</template>

<script setup lang="ts" name="DragTool">
  import { computed, inject, toRefs } from 'vue';
  let uni = 1;
  const props = defineProps({
    dragBtn: {
      type: Boolean,
      default: false
    },
    children: {
      type: String,
      default: ''
    },
    unique: {
      type: String,
      default: ''
    },
    mask: {
      type: Boolean,
      default: false
    }
  });

  const emits = defineEmits(['active', 'delete', 'create', 'copy', 'addChild']);

  const { unique } = toRefs(props);
  const id = computed(() => unique.value || uni++);
  const state = inject<any>('fcx');

  function active() {
    if (state.active === id.value) return;
    state.value.active = id.value;
    emits('active');
  }
</script>

<style lang="less" scoped>
  .drag-tool {
    position: relative;
    min-height: 20px;
    box-sizing: border-box;
    padding: 2px;
    outline: 1px dashed #2e73ff;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
  }

  .drag-tool .drag-tool {
    margin: 5px;
  }

  .drag-tool + .drag-tool {
    margin-top: 5px;
  }

  .drag-tool.active {
    outline: 2px solid #2e73ff;
  }

  .drag-tool.active > div > .drag-btn {
    display: flex;
  }

  .drag-tool .drag-btn {
    display: none;
  }

  .drag-r {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 104;
  }

  .drag-l {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 104;
  }

  .drag-btn {
    height: 18px;
    width: 18px;
    color: #fff;
    background-color: #2e73ff;
    text-align: center;
    line-height: 20px;
    padding-bottom: 1px;
    float: left;
    cursor: pointer;
    justify-content: center;
  }

  .drag-btn + .drag-btn {
    margin-left: 2px;
  }

  .drag-btn-danger {
    background-color: #ff2e2e;
  }

  .drag-btn i {
    font-size: 13px;
  }

  .drag-mask {
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
