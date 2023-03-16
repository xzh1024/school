<template>
  <el-container class="common-layout">
    <el-header>Header</el-header>
    <el-container class="common-body">
      <el-aside width="260px">
        <MenuMain></MenuMain>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
// import { RouterView } from "vue-router";
import MenuMain from "@/components/menu/MenuMain.vue";
</script>

<style lang="scss" scoped>
.common-layout {
  width: 100vw;
  height: 100vh;
  // display: flex;
  // flex-direction: column;
  // .common-body {
  //   flex: 1;

  // }
}
</style>
