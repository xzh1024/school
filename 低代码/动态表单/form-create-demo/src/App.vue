<script setup>
import { RouterLink, RouterView } from "vue-router";
// import HelloWorld from './components/HelloWorld.vue'
// import { routeList } from "@/router/index.js";
</script>

<template>
    <!-- <div class="header">
      <div class="nav-list">
        <div
          class="nav-item"
          v-for="(route, index) in routeList"
          :key="index"
          @click="navClick()"
        >
          {{ route.name }}
        </div>
      </div>
    </div> -->

    <RouterView />
</template>

<style scoped lang="scss">
.header {
  height: 100px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .nav-list {
    display: flex;
    align-items: center;
    .nav-item {
      font-size: 14px;
      line-height: 20px;
      padding: 0 24px;
      cursor: pointer;
      &.is-active {
      color: $color-primary;

      }
    }
  }
}
</style>
