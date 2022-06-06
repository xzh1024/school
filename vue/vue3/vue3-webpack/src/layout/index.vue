<template>
  <el-container class="app-wrapper">
    <el-aside class="sidebar-container"><Menu /></el-aside>
    <el-container class="layout-container">
      <el-header class="header-main">
        <Headers />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default { name: 'layoutContainer' };
</script>
<script setup>
import Menu from './Menu';
import Headers from './headers';
</script>

<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
  // overflow: hidden;
  .sidebar-container {
    flex: none;
    width: auto;
  }
  .layout-container {
    flex: 1;
    .header-main {
      padding: 0;
      // font-size: 18px;
      // // font-weight: 700;
      // line-height: 60px;
      // text-align: right;
    }
  }
}
</style>
