<template>
  <div>
    <div>09-defineProps</div>
    <ChildVue
      ref="child"
      :title="childTitle"
      :visible="childVisible"
      @handleClick="getChildAge"
    />

    <button @click="changeChildVisible">按钮</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ChildVue from '../components/Child.vue'

const child = ref<InstanceType<typeof ChildVue>>()

onMounted(() => {
  console.log(child.value?.name)
})

const childTitle = ref('子组件title')
const childVisible = ref(true)

const changeChildVisible = () => {
  childVisible.value = !childVisible.value
}
const getChildAge = (age: number) => {
  console.log(age)
}
</script>
