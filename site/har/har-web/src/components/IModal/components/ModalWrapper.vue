<template>
  <div class="scrollbar">
    <a-spin
      ref="spinRef"
      class="scrollbar__wrap"
      :style="spinStyle"
      :loading="loading"
      :tip="loadingTip"
    >
      <slot></slot>
    </a-spin>
  </div>
</template>
<script setup lang="ts">
  import {
    computed,
    CSSProperties,
    ref,
    unref,
    watch,
    watchEffect,
    nextTick
  } from 'vue';
  import { useWindowSize } from '@har/use';
  import { useMutationObserver } from '@/composables/useMutationObserver';

  const props = defineProps({
    height: Number,
    minHeight: {
      type: Number,
      default: 70
    },
    loading: Boolean,
    loadingTip: String,
    useWrapper: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean
    },
    modalHeaderHeight: { type: Number, default: 48 },
    modalFooterHeight: { type: Number, default: 65 }
  });
  const emit = defineEmits(['height-change']);
  const spinRef = ref();
  const realHeightRef = ref(0);
  const size = useWindowSize();
  useMutationObserver(
    spinRef,
    () => {
      console.log(111);
      setModalHeight();
    },
    {
      attributes: true,
      subtree: true
    }
  );
  watch(size.height, () => {
    setModalHeight();
  });
  watchEffect(() => {
    if (props.visible && props.useWrapper && spinRef.value) {
      nextTick(setModalHeight);
    }
  });
  function scrollTop(top = 0) {
    const el = unref(spinRef)?.$el as HTMLDivElement;
    if (el) {
      el.scrollTop = top;
    }
  }
  defineExpose({ scrollTop });
  async function setModalHeight() {
    if (!props.visible) return;
    const spinEl = unref(spinRef)?.$el as HTMLDivElement;
    if (!spinEl) return;
    const realHeight = spinEl.scrollHeight;
    const maxHeight =
      Math.floor(size.height.value * 0.85) -
      props.modalHeaderHeight -
      props.modalFooterHeight;
    const height = props.height
      ? props.height
      : realHeight > maxHeight
      ? maxHeight
      : realHeight;
    if (realHeightRef.value !== height) {
      realHeightRef.value = height;
      emit('height-change', height);
    }
  }
  const spinStyle = computed<CSSProperties>(() => {
    return {
      minHeight: `${props.minHeight}px`,
      maxHeight: `${unref(realHeightRef)}px`
    };
  });
</script>
<style lang="less" scoped>
  .scrollbar {
    position: relative;
    height: 100%;
    overflow: hidden;

    &__wrap {
      display: block;
      overflow-x: hidden;
      overflow-y: auto;

      &::-webkit-scrollbar-track {
        position: absolute;
        background: #e7e7e7;
        border-radius: 0;
      }

      &::-webkit-scrollbar {
        position: absolute;
        width: 8px;
        height: 8px;
      }

      &::-webkit-scrollbar-thumb {
        position: absolute;
        background: #ccc;
        border-radius: 4px;
      }
    }
  }
</style>
