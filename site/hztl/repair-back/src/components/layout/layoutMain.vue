<template>
  <el-container class="layout-main">
    <el-aside width="60px">
      <MenuAside></MenuAside>
    </el-aside>
    <el-container>
      <el-header height="64px" class="shadow">
        <HeaderAside></HeaderAside>
      </el-header>
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MenuAside from "@/components/layout/menuAside/index.vue";
import HeaderAside from "@/components/layout/headerAside/index.vue";

@Component({
  components: {
    MenuAside,
    HeaderAside
  }
})
export default class LayoutMain extends Vue {}
</script>

<style lang="scss" scoped>
.layout-main {
  height: 100%;
  .el-header {
    padding: 0;
  }
  .el-main {
    margin: $main-margin-size;
  }
}
.el-aside {
  position: relative;
}
</style>
