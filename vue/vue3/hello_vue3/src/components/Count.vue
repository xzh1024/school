<template>
  <div>
    <div>当前求和为：{{ sum }}</div>
    <div>{{ countStore.bigSum }}</div>

    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>

    <button @click="add">加</button>
    <button @click="minus">减</button>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { useCountStore } from '@/store/count'

const countStore = useCountStore()
console.log('countStore--')
console.log(countStore)
// storeToRefs只会关注sotre中的数据，不会对方法进行ref包裹
const { sum } = storeToRefs(countStore)
console.log(storeToRefs(countStore))

// const sum = ref(0) // 当前求和
const n = ref(1) // 选择的数字

const add = () => {
  //   sum.value += n.value
  //   countStore.increment()
  //   countStore.sum += n.value
  //   countStore.$patch((state) => {
  //     state.sum += n.value
  //   })
  countStore.add(n.value)
}
const minus = () => {
  //   sum.value -= n.value
  //   countStore.decrement()
  countStore.minus(n.value)
}
</script>

<style lang="scss" scoped></style>
