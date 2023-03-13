<template>
  <view class="tab-box" :class="flex && 'tab-box-flex'">
    <view
      v-for="(item, index) in data"
      :key="index"
      class="tab-item"
      :class="active === index && 'tab-item-active'"
      @tap="onChange(item, index)"
    >
      <view
        :style="{ color: active === index ? selectedColor : defaultColor }"
        >{{ item[labelKey] }}</view
      >
      <view v-if="active === index" class="i-active-box">
        <view class="i-round"></view>
        <view class="i-active"></view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "ITabs"
  };
</script>
<script setup>
  import { computed } from "vue";
  const props = defineProps({
    modelValue: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => []
    },
    valueKey: {
      type: String,
      default: "value"
    },
    labelKey: {
      type: String,
      default: "label"
    },
    defaultColor: {
      type: String,
      default: "#333"
    },
    selectedColor: {
      type: String,
      default: "#FB5F05"
    },
    selectedUnderLineColor: {
      type: String,
      default: "#FB5F05"
    },
    // todo  后续扩展
    scroll: {
      type: Boolean,
      default: false
    },
    flex: {
      type: Boolean,
      default: false
    }
  });

  const emits = defineEmits(["update:modelValue", "change"]);

  const active = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits("update:modelValue", v);
    }
  });

  function onChange(item, index) {
    active.value = index;
    emits("change", item);
  }
</script>

<style scoped lang="scss">
  .tab-box {
    background: #ffffff;
    font-size: 28rpx;
    height: 72rpx;
    .tab-item {
      display: inline-block;
      padding: 0 32rpx;
      line-height: 72rpx;
      white-space: nowrap;
      position: relative;
      .i-active-box {
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        .i-round {
          width: 4rpx;
          height: 4rpx;
          background: #ff5f00;
          border-radius: 50%;
        }
        .i-active {
          width: 42rpx;
          height: 4rpx;
          background: #ff5f00;
          border-radius: 2px 2px 2px 2px;
          margin-left: 2rpx;
        }
      }
    }
  }
  .tab-box-flex {
    display: flex;
    align-items: center;
    .tab-item {
      flex: 1;
      text-align: center;
    }
  }
</style>
