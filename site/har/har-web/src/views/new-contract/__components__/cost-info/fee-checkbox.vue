<template>
  <div class="icon-check-box flex align-center" @click="onCheckChange">
    <img v-if="checked" class="img" src="@/assets/images/hook.png" alt="" />
    <div v-else class="i-round"></div>
    {{ label }}
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue']);
  const checked = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  function onCheckChange() {
    checked.value = !checked.value;
  }
</script>

<style scoped lang="less">
  .icon-check-box {
    cursor: pointer;
    user-select: none;
    .icon-check {
      width: 20px;
      height: 20px;
      font-size: 16px;
      background: #fff;
      margin-right: 6px;
      border-radius: 50%;
    }
  }
  .icon-color-blue {
    color: #6ea0f8;
  }
  .i-round {
    width: 16px;
    height: 16px;
    margin-right: 4px;
    background: #fff;
    border: 1px solid #dcdcdc;
    border-radius: 50%;
  }
  .img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
</style>
