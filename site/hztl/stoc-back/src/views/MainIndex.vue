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
import { mainIndexRoutes } from "@/router";
import { Getter, namespace } from "vuex-class";

const UserStore = namespace("user");

@Component({
  components: {
    MenuAside,
    HeaderAside
  }
})
export default class MainIndex extends Vue {
  @UserStore.Getter("userInfo") userInfo: any;
  private routerList = mainIndexRoutes;

  mounted() {
    console.log(this.userInfo);
    // this.login();
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  .el-header {
    padding: 0;
  }
}
</style>
