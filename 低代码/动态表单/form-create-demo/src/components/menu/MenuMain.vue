<template>
  <el-menu
    class="menu-box"
    router
    :default-active="activePath"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu
      v-for="item in routeList || []"
      :key="item.path"
      :index="item.path"
    >
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>{{ item.meta && item.meta.title }}</span>
      </template>
      <el-menu-item
        v-for="subItem in item.children || []"
        :key="subItem.path"
        :index="subItem.path"
        >{{ subItem.meta && subItem.meta.title }}</el-menu-item
      >
      <!-- <el-menu-item-group title="Group One">
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title>item four</template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu> -->
    </el-sub-menu>
    <!-- <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <span>Navigator Two</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <span>Navigator Three</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <span>Navigator Four</span>
    </el-menu-item> -->
  </el-menu>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from 'vue-router';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { routeList } from "@/router/index.js";
const router = useRouter();
console.log(router);
console.log(router.currentRoute.value);
const activePath = computed(() => {
  // return (
  //   (this.$route.meta && this.$route.meta.selectedPath) || this.$route.path
  // );
  return router.currentRoute.value.path;
});
console.log(routeList);
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
.menu-box {
  height: 100%;
  user-select: none;
}
</style>
