<template>
  <uni-tag
    :text="text"
    :size="size"
    :type="type"
    :disabled="disabled"
    :inverted="inverted"
    :circle="circle"
    :custom-style="customStyle"
    @click="click"
  />
</template>

<script>
  export default {
    name: "Index"
  };
</script>

<script setup>
  import { computed } from "vue";
  const props = defineProps({
    text: {
      type: String
    },
    size: {
      type: String,
      default: "normal"
    },
    type: {
      type: String,
      default: "default"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inverted: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String
    },
    color: {
      type: String
    },
    border: {
      type: String,
      default: "none"
    },
    fontsize: {
      type: Number,
      default: 24
    }
  });

  const customStyle = computed(() => {
    return `background-color: ${props.backgroundColor}; border: ${props.border}; color: ${props.color}; font-size: ${props.fontsize}rpx`;
  });

  const emits = defineEmits(["click"]);

  const click = () => {
    if (props.disabled) return;
    emits("click");
  };
</script>

<style scoped></style>
