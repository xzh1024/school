<template>
  <el-container>
    <el-aside width="60px">
      <MenuAside :routerList="routerList"></MenuAside>
    </el-aside>
    <el-container>
      <el-header height="64px" class="shadow">
        <HeaderAside></HeaderAside>
      </el-header>
      <el-main>
        <keep-alive>
          <router-view />
        </keep-alive>
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
export default class MainIndex extends Vue {}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  .el-header {
    padding: 0;
  }
}
</style>
