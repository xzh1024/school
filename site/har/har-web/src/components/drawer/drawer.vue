<template>
  <a-drawer
    :visible="modelValue"
    unmount-on-close
    :mask-closable="maskClose"
    :title="title"
    :width="width"
    :footer="footer"
    :on-before-ok="handleBeforeOk"
    v-bind="options"
    class="drawer"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div class="drawer-wrapper">
      <div class="drawer-box" :class="{ p0: noPadding }">
        <slot></slot>
      </div>
      <i-logs v-if="showLog" :visible="logVisible" :options="logOptions" />
    </div>
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
    <template v-if="$slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import ILogs from '../i-logs/index.vue';
  defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    maskClose: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: '60vw'
    },
    options: {
      type: Object,
      default: () => {
        return {};
      }
    },
    //log组件配置参数
    logOptions: {
      type: Object,
      default: () => {
        return {};
      }
    },
    showLog: {
      type: Boolean,
      default: false
    },
    noPadding: {
      type: Boolean,
      default: false
    }
  });
  const emits = defineEmits(['update:modelValue', 'ok', 'before', 'cancel']);
  const handleOk = () => {
    emits('ok');
  };
  const handleBeforeOk = (done: (closed: boolean) => void) => {
    done(false);
    emits('before');
  };
  const handleCancel = () => {
    emits('cancel');
    emits('update:modelValue', false);
  };

  const logVisible = ref(false);
  function toggleLog() {
    logVisible.value = !logVisible.value;
  }
</script>

<style lang="less" scoped>
  .drawer-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: flex-start;
  }
  .drawer-box {
    width: 100%;
    height: 100%;
    overflow: hidden auto;
    position: relative;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 12px 16px;
    background-color: #efefef;
    &.p0 {
      padding: 0;
    }
  }

  .fixed-btn {
    // position: absolute;
    // right: 16px;
    // top: 12px;
    // z-index: 1;
    display: flex;
    align-items: center;
  }

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
</style>

<style lang="less">
  .drawer {
    .arco-drawer {
      overflow: visible;
    }
    .arco-drawer-header {
      position: relative;
      justify-content: space-between;
    }
    .arco-drawer-body {
      padding: 0;
    }
  }

  .log-drawer {
    .arco-drawer-header,
    .arco-drawer-footer {
      display: none;
    }

    .arco-drawer-body {
      padding: 0;
      border-left: 1px solid #ddd;
    }
  }
</style>
