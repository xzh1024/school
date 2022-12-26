<script setup lang="ts">
import { ref, reactive } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
console.log(count)
console.log(count.value)

const person = reactive({name: 'hhh', age: 18})
console.log(person);
console.log(person.name);
console.log(person.age);

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
