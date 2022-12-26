<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
// 侦听一个getter
const message = reactive({
  foo: {
    bar: {
      name: '小满',
      age: 18
    }
  }
})
watch(
  () => message.foo.bar.name,
  (newVal, oldVal) => {
    console.log(newVal)
    console.log(oldVal)
  },
  {
    deep: true,
    immediate: true,
    flush: "pre" //pre-组件更新之前调用 sync-同步执行 post-组件更新之后执行
  }
)

// 直接侦听一个ref
const count = ref(0)
watch(count, (count, prevCount) => {
  console.log(count)
  console.log(prevCount)
})

const changeMessage = () => {
  message.foo.bar.name = "大满贯"
}
const changeCount = () => {
  count.value++
}
</script>

<template>
  <div>
    <div>
      {{ message }}
      <button @click="changeMessage">修改</button>
    </div>
    <div>
      {{ count }}
      <button @click="changeCount">add</button>
    </div>
  </div>
</template>
