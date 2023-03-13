<template>
  <teleport to="body">
    <div
      v-show="visible"
      class="i-context-menu"
      :style="{
        top: `${top}px`,
        left: `${left}px`
      }"
    >
      <div
        v-for="(item, index) in menu"
        :key="index"
        class="context-menu-item"
        :class="{ disabled: item.disabled }"
        @click="!item.disabled && item.event()"
      >
        {{ item.text }}
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, PropType, ref } from 'vue';
  type ContextMenuItemType = {
    text: string;
    event: Function;
    disabled?: boolean;
  };
  defineProps({
    menu: {
      type: Array as PropType<ContextMenuItemType[]>,
      default: () => []
    },
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    }
  });

  const visible = ref(false);
  const bodyEvent = (e: any) => {
    const { className } = e.target;
    if (
      typeof className !== 'string' ||
      (className.indexOf('i-context-menu') === -1 &&
        className.indexOf('context-menu-item') === -1)
    ) {
      visible.value = false;
    }
  };

  defineExpose({ visible });

  onMounted(() => {
    document.body.addEventListener('click', bodyEvent);
  });
  onUnmounted(() => {
    document.body.removeEventListener('click', bodyEvent);
  });
</script>

<style lang="less" scoped>
  .i-context-menu {
    position: absolute;
    // top: -9999px;
    // left: -9999px;
    top: 300px;
    left: 600px;
    z-index: 10;
    background-color: #ffffff;
    min-width: 150px;
    border-radius: 4px;
  }

  .context-menu-item {
    padding: 10px 15px;
    font-size: 14px;
    user-select: none;
    cursor: pointer;

    & + .context-menu-item {
      border-top: 1px solid #ddd;
    }

    &:hover {
      background-color: #f0f0f0;
    }

    &.disabled {
      background-color: #f3f3f3;
      cursor: not-allowed;
    }
  }
</style>
