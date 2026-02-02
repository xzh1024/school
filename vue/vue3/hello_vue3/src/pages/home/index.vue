<template>
  <div>
    <div>home-{{ countStore.sum }}</div>
    <Count />
  </div>
</template>

<script setup>
import Count from '../../components/Count.vue'
import { useCountStore } from '@/store/count'

const countStore = useCountStore()
</script>

<style scoped></style>
