<script setup lang="ts">
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onErrorCaptured,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onUnmounted,
  onUpdated,
  ref
} from 'vue'
import A from '../components/A.vue'

const flag = ref(true)
onBeforeMount(() => {})
onMounted(() => {})
onBeforeUpdate(() => {})
onUpdated(() => {})
onBeforeUnmount(() => {})
onUnmounted(() => {})
onErrorCaptured(() => {})
onRenderTracked((e) => {
  console.log('onRenderTracked：')
  console.log(e)
})
onRenderTriggered((e) => {
  console.log('onRenderTriggered：')
  console.log(e)
})
</script>

<template>
  <div>
    <A v-if="flag"></A>
    <button @click="() => (flag = !flag)">创建/销毁</button>
  </div>
</template>
