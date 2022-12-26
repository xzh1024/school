<template>
  <div>
    <div>
      <slot name="title" :data="data">title</slot>
    </div>
    <div>
      <slot>内容内容</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const data = reactive({
  name: '小满',
  age: 18
})
</script>
