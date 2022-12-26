<script setup lang="ts">
import { reactive, toRef, toRefs, toRaw } from 'vue';

const person = reactive({
  name: "小满",
  age: 23,
  link: 'JK'
})

// const toRefs = <T extends object>(object: T) => {
//   const map: any = {}

//   for (let key in object) {
//     map[key] = object[key];
//     map[key] = toRef(object, key);
//   }

//   return map
// }

let { name, age, link } = toRefs(person)

const change = () => {
  name.value = "修改后的" + name.value
  console.log(name, age, link);
  // 获取原始对象
  console.log(person)
  const toRawPerson = toRaw(person)
  console.log(toRawPerson)
  // toRawPerson.name = "满";
}
</script>

<template>
  <div>
    <div>03-toRef</div>
    <div>{{ person }}</div>
    <div>{{ name }}--{{ age }}--{{ link }}</div>
    <button @click="change">修改</button>
  </div>
</template>

<style scoped></style>
