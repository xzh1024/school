<template>
  <view class="i-btn" :class="{ disabled: disabled }" :disabled="disabled">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
  import { computed } from "vue";

  const props = defineProps({
    width: String,
    height: String,
    bgColor: String,
    size: String,
    color: String,
    radius: String,
    disabled: Boolean
  });

  const width = computed(() => props.width || "100%");
  const height = computed(() => props.height || "80rpx");
  const color = computed(() => props.color || "#ffffff");
  const bgColor = computed(() => props.bgColor || "#FF811A");
  const size = computed(() => props.size || "32rpx");
  const radius = computed(() => props.radius || "16rpx");
</script>

<style lang="scss" scoped>
  .i-btn {
    display: block;
    margin: 0 auto;
    width: v-bind(width);
    height: v-bind(height);
    line-height: v-bind(height);
    background-color: v-bind(bgColor);
    font-size: v-bind(size);
    color: v-bind(color);
    text-align: center;
    border-radius: v-bind(radius);
    &:active {
      background: darken(#ff811a, 10%);
    }

    &::after {
      border: none;
    }

    &.disabled {
      background-color: #ffb980;
    }
  }
</style>
