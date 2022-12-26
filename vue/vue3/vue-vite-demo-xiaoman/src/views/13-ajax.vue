<template>
  <div>ajax</div>
  <div>姓名：{{ data.name }}</div>
  <div>年龄：{{ data.age }}</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { axios } from '../server/axios'

let data = reactive({
  name: '123',
  age: 0
})
interface Data {
  data: {
    name: string
    age: number
  }
}
// const { data: myData } = await axios.get<Data>('./data.json')
// console.log(myData)
try {
  const { data: myData } = await axios.get<Data>('./data.json')
  console.log(myData)
  Object.assign(data, myData)
} catch (error) {
  console.error(error)
}
</script>
