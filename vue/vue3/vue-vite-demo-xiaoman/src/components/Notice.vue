<template>
  <div class="notice" v-if="isShow">
    <div class="notice-title">{{ props.title }}</div>
    <div class="notice-body">{{ props.message }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineExpose } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 1000
  }
})

const isShow = ref(false)
const show = () => {
  isShow.value = true
  console.log(props.duration);
  setTimeout(hide, props.duration)
}

const hide = () => {
  isShow.value = false
}

defineExpose({
  show: show
})
</script>

<style scoped>
.notice {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 2000;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 300px;
  height: 100px;
  border: 1px solid red;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.notice-title {
  padding: 12px;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  border-bottom: 1px solid #dfdfdf;
}
.notice-body {
  flex: 1;
  font-size: 14px;
}
</style>
