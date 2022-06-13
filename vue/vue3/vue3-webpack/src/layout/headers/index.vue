<template>
  <div class="navbar">
    <Hamburger />
    <Breadcrumb />
    <div class="navbar-right">
      <!-- 引导页 -->
      <Driver></Driver>
      <!-- 全屏 -->
      <ScreenFull></ScreenFull>
      <Avatar />
    </div>
  </div>
</template>

<script>
export default { name: 'headersContainer' };
</script>
<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import Hamburger from './components/hamburger.vue';
import Breadcrumb from './components/breadcrumb.vue';
import Avatar from './components/avatar.vue';
import ScreenFull from './components/screenFull.vue';
import Driver from './components/driver';
</script>

<style lang="scss" scoped>
.navbar {
  // width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  // justify-content: center;
  ::v-deep .navbar-item {
    display: inline-block;
    margin-right: 18px;
    font-size: 22px;
    color: #5a5e66;
    box-sizing: border-box;
    cursor: pointer;
  }
  .navbar-right {
    position: absolute;
    right: 16px;
    display: flex;
    align-items: center;
  }
}
</style>
