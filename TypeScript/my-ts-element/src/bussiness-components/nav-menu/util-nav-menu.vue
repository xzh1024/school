<template>
  <div class="c-nav-menu">
    <el-menu :default-active="activePath"
             :router="true">
      <template v-for="item in routerList">
        <!-- 分组 -->
        <el-submenu v-if="item.isGroup && item.children && item.children.length > 0"
                    :key="item.name"
                    :index="item.path">
          <!-- 虚拟分组节点-名称 -->
          <template slot="title">
            <i v-if="item.icon" :class="item.icon" class="util-icon"></i>
            <span>{{item.moduleName}}</span>
          </template>
          <!-- 无分组项 -->
          <el-menu-item v-for="subItem in item.children"
                        :key="subItem.name"
                        :index="subItem.path">
            <span v-if="subItem.icon" :class="subItem.icon"></span>
            <span>{{subItem.moduleName}}</span>
          </el-menu-item>
        </el-submenu>
        <!-- 无分组 -->
        <el-menu-item v-else :key="item.name" :index="item.path">
          <i v-if="item.icon" :class="item.icon" class="util-icon"></i>
          <span>{{item.moduleName}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import {IRouterConfig} from '@/router/interface/router.type';

  @Component({name: 'util-nav-menu'})
  export default class UtilNavMenuComponent extends Vue {
    @Prop() private routerList!: IRouterConfig[];
    @Prop() private activePath!: string;

    public created() {
        // console.log(this.routerList);
        // console.log(this.activePath);
    }

    private mounted() {
        // console.log(this.routerList);
    };
  }
</script>

<style lang="scss">
  .c-nav-menu {
    width: 100%;
    height: 100%;
    overflow: auto;
    text-align: left;
    .util-icon {
      // font-size: 18px;
      // margin-right: 20px;
      // display: inline-block;
      // width: 28px;
      // height: 28px;
      margin-left: 42px;
      margin-right: 10px;
      width: 14px;
    }
    .icon-search-imgage {
      // background-position: -154px -10px;
      background-position: -106px -106px;
    }
    .icon-search-vid {
      background-position: -58px -106px;
      // background-position: -10px -106px;
    }
    .icon-cluster {
      // background-position: -10px -56px;
      background-position: -58px -56px;
    }
    .icon-waste-library {
      // background-position: -59px -10px;
      background-position: -11px -10px;
    }
    .icon-accuracy {
      // background-position: -106px -10px;
      background-position: -106px -58px;
    }
    .device-icon {
      // background-position: -160px -194px;
      background-position: -160px -162px;
    }
    .analysis-icon {
      background-position: -198px -196px;
      // background-position: -198px -164px;
    }
    .el-menu {
      border: none;
      .el-menu-item:hover {
        background: #ebebeb;
      }
      .el-menu-item:focus {
        background: transparent;
      }
      .el-menu-item {
        border-bottom: 1px solid #ebebeb;
        border-left: 4px solid transparent;
        color: #87909a;
        height: 70px;
        line-height: 70px;
        // text-indent: 32px;
        font-size: 14px;
        &.is-active {
          border-left: 4px solid #4795fc;
          color: #4795fc;
          .icon-search-imgage {
            background-position: -154px -10px;
            // background-position: -106px -106px;
          }
          .icon-search-vid {
            // background-position: -58px -106px;
            background-position: -10px -106px;
          }
          .icon-cluster {
            background-position: -10px -56px;
            // background-position: -58px -56px;
          }
          .icon-waste-library {
            background-position: -59px -10px;
            // background-position: -11px -10px;
          }
          .device-icon {
            background-position: -160px -194px;
            // background-position: -160px -162px;
          }
          .analysis-icon {
            // background-position: -198px -196px;
            background-position: -198px -164px;
          }
        }
      }
      .el-submenu {
        .el-submenu__title {
          border-bottom: 1px solid #ebebeb;
          color: #87909a;
          height: 70px;
          line-height: 70px;
          // padding-left: 32px;
          text-indent: 36px;
          font-size: 14px;
          & i {
            text-indent: 0;
          }
          &:hover {
            background: #ebebeb;
          }
        }
        &.is-active {
          .el-submenu__title {
            border-left: 4px solid #4392fb;
            color: #4392fb;
            text-indent: 32px;
            .icon-accuracy {
              background-position: -106px -10px;
            }
          }
          .el-menu-item {
            &.is-active {
              border-left: 4px solid transparent;
              color: #061c2d;
            }
          }
        }
      }
    }
    .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
      transform: rotate(0);
    }
    .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
      transform: rotate(-90deg);
    }
  }
</style>
