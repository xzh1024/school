<template>
  <div>
    <div>child</div>
    <div>年龄：{{ age }}</div>
    <button @click="send">给父组件传值</button>
    <div v-show="visible">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, defineExpose } from 'vue'
const age = ref(10)

const props = defineProps({
  title: {
    type: String,
    default: '默认值'
  },
  visible: {
    type: Boolean,
    default: true
  }
})

console.log(props)
console.log(props.title)
console.log(props.visible)

// const emit = defineEmits(['handleClick'])
const emit = defineEmits<{
  (e: 'handleClick', age: number): void
  (e: 'handleUpdate'): void
}>()

const send = () => {
  emit('handleClick', age.value)
}

defineExpose({
  name: '小满'
})
</script>
