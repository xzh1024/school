<template>
  <a-drawer
    v-model:visible="visible"
    :width="width"
    v-bind="options"
    :title="title"
    @ok="ok"
    @cancel="cancel"
    @open="open"
    @close="close"
  >
    <slot></slot>
    <template #header>
      <span>{{ title }}</span>
      <a-button v-if="showLog" type="text" class="fixed-btn" @click="toggleLog">
        操作记录
        <icon-double-left v-show="!logVisible" />
        <icon-double-right v-show="logVisible" />
      </a-button>
      <span class="icon-close" @click="handleCancel">
        <icon-close />
      </span>
    </template>
    <i-logs v-if="showLog" :visible="logVisible" :options="logOptions" />
    <template #footer>
      <slot name="footer"></slot>
    </template>
    <template #title>
      <slot name="title"></slot>
    </template>
  </a-drawer>
</template>

<script lang="ts">
  export default {
    name: 'IDrawer'
  };
</script>

<script setup lang="ts">
  import { computed, ref, Ref } from 'vue';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '查看'
    },
    showLog: {
      type: Boolean,
      default: false
    },
    //log组件配置参数
    logOptions: {
      type: Object,
      default: () => {
        return {};
      }
    },
    width: {
      type: Number,
      default: 800
    },
    options: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 关闭回调处理
    close: {
      type: Function
    }
  });
  const emits = defineEmits([
    'update:modelValue',
    'ok',
    'cancel',
    'open',
    'close'
  ]);
  const visible: Ref<boolean> = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  function ok() {
    emits('ok');
  }
  function cancel() {
    visible.value = false;
    emits('cancel');
  }
  function open() {
    emits('open');
  }

  const handleCancel = () => {
    emits('cancel');
    emits('update:modelValue', false);
  };
  function close() {
    if (props.close) {
      emits('close', false);
    } else {
      visible.value = false;
    }
  }
  const logVisible = ref(false);
  function toggleLog() {
    logVisible.value = !logVisible.value;
  }
</script>

<style lang="less" scoped>
  .icon-close {
    width: 46px;
    height: 46px;
    position: absolute;
    left: -46px;
    top: 0;
    z-index: 11;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px 0px 0px 4px;
    color: #fff;
    text-align: center;
    line-height: 46px;
    font-size: 24px;
    cursor: pointer;
  }

  .fixed-btn {
    position: absolute;
    right: 16px;
    top: 12px;
    z-index: 1;
    display: flex;
    align-items: center;
  }
</style>
