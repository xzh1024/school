<template>
  <!-- html -->
  <div class="app">
    <h3>{{ title }}</h3>
    <!-- <Person :color="'red'" :height="100" @updateTitle="updateTitle" /> -->
    <div class="list">
      <!-- <router-link to="/">home</router-link><br /> -->
      <div class="item" @click="$router.push('/')">home</div>
      <!-- <router-link to="/about">about</router-link> -->
      <div class="item" @click="$router.push('/about')">about</div>
      <div class="item" @click="$router.push('/news')">news</div>
      <br />
    </div>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// import Person from './components/Person.vue'

const title = ref('标题')
// const updateTitle = (newTitle: string) => {
//   console.log('newTitle--')
//   console.log(newTitle)
//   title.value = newTitle
// }
</script>

<style>
.app > .list {
  display: flex;
  align-items: center;
}
.app > .list > .item {
  margin-right: 20px;
  cursor: pointer;
}
</style>
