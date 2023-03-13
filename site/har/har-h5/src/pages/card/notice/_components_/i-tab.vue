<template>
  <view class="tab-box">
    <view
      v-for="(item, index) in list"
      :key="`l_${index}`"
      :style="{ color: value === item.value ? activeColor : '' }"
      class="tab-cell"
      @click="onClick(item.value)"
    >
      {{ item.label }}
      <view
        v-if="value === item.value"
        class="i-solid"
        :style="{ background: activeColor }"
      ></view>
    </view>
  </view>
</template>

<script setup lang="ts">
  const emits = defineEmits(["update:value"]);
  defineProps({
    list: {
      type: Array,
      default: () => []
    },
    value: {
      type: [Number, String],
      default: 0
    },
    activeColor: {
      type: String,
      default: "#FF7200"
    }
  });

  const onClick = (value: string | number) => {
    emits("update:value", value);
  };
</script>

<style scoped lang="scss">
  .tab-box {
    display: flex;
    align-items: center;
    background: #ffffff;
    border-bottom: 1px solid #f0f0f0;
    .tab-cell {
      padding: 24rpx 42rpx;
      font-size: 32rpx;
      color: #383840;
      position: relative;
    }
    .i-solid {
      position: absolute;
      bottom: 0;
      height: 4rpx;
      width: 64rpx;
    }
  }
</style>
