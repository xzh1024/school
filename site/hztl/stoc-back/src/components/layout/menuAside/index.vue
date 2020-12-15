<template>
  <div class="menu-aside">
    <div class="menu-logo">
      <span class="icon-menu-logo"></span>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="activePath"
      :router="true"
      :collapse="false"
      text-color="#fff"
      active-text-color="#fff"
    >
      <template v-for="item in routerList">
        <!-- 分组 -->
        <el-submenu
          v-if="item.isGroup && item.children && item.children.length > 0"
          :key="item.name"
          :index="item.path"
        >
          <!-- 虚拟分组节点-名称 -->
          <template slot="title">
            <i v-if="item.icon" :class="item.icon" class="util-icon"></i>
            <span>{{ item.meta ? item.meta.title : "" }}</span>
          </template>
          <!-- 无分组项 -->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.name"
            :index="subItem.path"
          >
            <span v-if="subItem.icon" :class="subItem.icon"></span>
            <span>{{ item.meta ? item.meta.title : "" }}</span>
          </el-menu-item>
        </el-submenu>
        <!-- 无分组 -->
        <el-menu-item v-else :key="item.name" :index="item.path">
          <div class="menu-item-wrap">
            <i v-if="item.icon" :class="item.icon" class="util-icon"></i>
            <span>{{ item.meta ? item.meta.title : "" }}</span>
          </div>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mainIndexRoutes } from "@/router";

@Component({ name: "MenuAside" })
export default class MenuAside extends Vue {
  private routerList = mainIndexRoutes;

  get activePath() {
    return (
      (this.$route.meta && this.$route.meta.selectedPath) || this.$route.path
    );
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  // min-height: 300px;
}
.menu-aside {
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: left;
  background: #3aa7ff;
  .menu-logo {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
  }
  .el-menu {
    height: calc(100% - 64px);
    background: transparent;
    .el-menu-item {
      position: relative;
      padding: 0;
      &:hover {
        background: #338fcc;
      }
      .menu-item-wrap {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span {
          width: 100%;
          height: 20px;
          line-height: 20px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      &.is-active {
        background: #338fcc;
      }
    }
  }
  .util-icon {
    display: inline-block;
    width: 22px;
    height: 22px;
  }
}
</style>
