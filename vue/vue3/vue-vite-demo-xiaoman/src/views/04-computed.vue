<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(1)
const count2 = ref(1)
const plusOne = computed<number>(() => {
  console.log(count.value)
  return count.value + 1
})
const plusOne2 = computed({
  get: () => {
    return count2.value
  },
  set: (val) => {
    count2.value = val
  }
})

console.log(plusOne)

const add = () => {
  count.value++
}
const add2 = () => {
  plusOne2.value++
}
</script>

<template>
  <div>{{ count }}</div>
  <div><button @click="add">add</button>{{ plusOne }}</div>
  <div><button @click="add2">add2</button>{{ plusOne2 }}</div>
</template>
