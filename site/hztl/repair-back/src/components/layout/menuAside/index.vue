<template>
  <div class="menu-aside">
    <div class="menu-logo">
      <span class="icon-menu-logo"></span>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="activePath"
      :router="true"
      :collapse="true"
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
            <div class="menu-item-wrap">
              <i v-if="item.icon" :class="item.icon" class="util-icon"></i>
              <div class="menu-item-name">
                {{ item.meta ? item.meta.title : "" }}
              </div>
            </div>
            <span>{{ item.meta ? item.meta.title : "" }}</span>
          </template>
          <!-- 无分组项 -->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.name"
            :index="subItem.path"
          >
            <i v-if="subItem.icon" :class="subItem.icon"></i>
            <span class="color-text-base">{{
              subItem.meta ? subItem.meta.title : ""
            }}</span>
          </el-menu-item>
        </el-submenu>
        <!-- 无分组 -->
        <el-menu-item v-else :key="item.name" :index="item.path">
          <div class="menu-item-wrap">
            <i v-if="item.icon" :class="item.icon" class="util-icon"></i>
            <div class="menu-item-name">
              {{ item.meta ? item.meta.title : "" }}
            </div>
          </div>
          <!-- <span slot="title">{{ item.meta ? item.meta.title : "" }}</span> -->
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
.el-menu--vertical {
  .el-menu {
    .el-menu-item {
      box-sizing: border-box;
      border-left: 4px solid transparent;
      .color-text-base {
        color: $color-text-base;
      }
      &.is-active {
        position: relative;
        background: #c0e3ff;
        border-left: 4px solid $color-primary;
        .color-text-base {
          color: $color-primary;
        }
      }
    }
  }
}
.menu-aside {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: left;
  background: $color-primary;
  .menu-logo {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
  }
  ::v-deep .el-menu {
    background-color: transparent;
    .el-menu--horizontal {
      .el-submenu {
        .el-submenu__title {
          &:hover {
            background-color: $color-bg-hover !important;
          }
        }
      }
    }
    .el-submenu {
      &.is-active {
        background: $color-bg-hover;
      }
    }
    .el-menu-item,
    .el-submenu__title {
      &:hover {
        background: $color-bg-hover;
      }
      .menu-item-wrap {
        position: absolute;
        left: 0;
        top: 0;
        width: 60px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .menu-item-name {
        height: 20px;
        line-height: 20px;
      }
      &.is-active {
        background: $color-bg-hover;
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
