<template>
  <button @click="show">show</button>
  <teleport to="body">
    hello
    <Notice ref="noticeVue" title="提示" message="校验失败" :duration="2000" />
  </teleport>
</template>

<script setup lang="ts">
import { ref as myRef } from 'vue'
import Notice from '../components/Notice.vue'
const noticeVue = myRef<InstanceType<typeof Notice>>()
const show = () => {
  console.log(noticeVue.value?.show())
}
</script>
