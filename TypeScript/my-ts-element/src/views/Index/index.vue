<template>
    <el-container class="p-index">
        <el-header class="c-header f-cfb" height="">
            <div class="logo f-fl">
                <!-- <i class="logo-image el-icon-setting"></i>
                <span class="logo-text">VID管理系统</span> -->
                <img class="logo-image" src="../../assets/images/logo.png" alt="">
            </div>
            <div class="nav f-fl">
                <el-menu
                  :default-active="activeIndex"
                  :router="true"
                  mode="horizontal"
                  text-color="#fff"
                  active-text-color="#fff"
                  class="nav-menu"
                >
                    <el-menu-item
                      class="nav-menu-item"
                      v-for="item in routerList"
                      :key="item.path"
                      :index="item.path"
                    >{{item.moduleName}}</el-menu-item>
                </el-menu>
            </div>
            <div class="header-right f-fr f-cfb">
                <div class="tools f-fl">
                    <el-tooltip
                        placement="bottom"
                        :open-delay="300"
                    >
                        <div>
                            <i class="tool-icon"></i>
                            <!-- <span style="vertical-align: middle;">快捷工具</span> -->
                            <span style="vertical-align: middle;">{{ $t('01_01')}}</span>
                        </div>
                        <div slot="content">
                            <div class="tool-item">升级工具下载</div>
                            <div class="tool-item">FAQ</div>
                            <div class="tool-item" @click="switchLanguage">{{Language === 'cn' ? '中文': 'English'}}</div>
                        </div>
                    </el-tooltip>
                </div>
                <div class="user-center f-fl">
                    <el-tooltip placement="bottom" :open-delay="300">
                        <div>
                            <i class="user-icon"></i>
                            <span style="vertical-align: middle;">我的</span>
                        </div>
                        <div slot="content">
                            <div class="tool-item" @click="loginOut">退出</div>
                        </div>
                    </el-tooltip>
                </div>
            </div>
        </el-header>
        <el-main class="main-content">
            <router-view></router-view>
        </el-main>
        <!-- 遮罩 -->
        <div class="layer-shadow" v-if="isShowShadow"></div>
        <!-- 登陆提示弹窗 -->
        <div class="layer-wrap login-popup" v-if="isOpenLoginPopup">
            <div class="layer-header">提示</div>
            <div class="layer-content login-wrap">
                用户登录失效，请重新登录
            </div>
            <div class="layer-buttons">
                <el-button type="primary" size="small" @click="jumpLogin">确定</el-button>
            </div>
        </div>
    </el-container>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {IRouterConfig} from '@/router/interface/router.type';
import routerService from '@/router/router.service';
// import SocketClient from '@/common/socket';
// import {StorageEnum} from '@/common/enums/storage.enum';
// import {StorageUtil} from '@/common/utils/storageUtil';
// import loginService from '@/services/login.service';

@Component({ name: 'Index' })
export default class IndexComponent extends Vue {
  private routerList: IRouterConfig[] = [];
  private isOpenLoginPopup: boolean = false;

  Language: string = 'cn';

  get activeIndex() {
      return this.$route.matched[1].path;
  }

  get isShowShadow() {
      return this.isOpenLoginPopup;
  }

  public mounted() {
    this.routerList = routerService.getModuleItems();
    // console.log(this.routerList);
    // this.checkLogin();
    // 连接socket
    // SocketClient.getInstance().init();
  }

  /** 获取登陆信息 */
//   private getCurrentUid() {
//       return StorageUtil.getSessionStorage(StorageEnum.TOKEN);
//   }

  /** 检测当前登录状态 */
//   private checkLogin() {
//       const currentUid = this.getCurrentUid();
//       if (!currentUid) {
//           this.isOpenLoginPopup = true;
//       } else {
//           this.isOpenLoginPopup = false;
//       }
//   }

  /** 退出登陆 */
  private loginOut() {
    //   loginService.loginOut().then(() => {
    //       StorageUtil.removeSessionStorage(StorageEnum.TOKEN);
    //       this.jumpLogin();
    //   });
  }

  /** 跳转到登陆界面 */
  private jumpLogin() {
      this.$router.push({path: '/'});
  }

    //切换语言
    private switchLanguage() {
        if(this.Language === 'cn') { 
            this.Language = 'en';
        } else {
            this.Language = 'cn';
        }
        this.$i18n.locale = this.Language;
    }
}
</script>

<style lang="scss">
@import '../../styles/var.scss';
$min-header-height: 60px;

.layer-shadow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .3);
    z-index: 9999;
}

.layer-wrap {
    position: absolute;
    top: 30%;
    left: 0;
    right: 0;
    width: 320px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 1px 1px 50px rgba(0, 0, 0, .3);
    z-index: 10000;
    .layer-header {
        height: 42px;
        text-align: left;
        line-height: 42px;
        padding: 0 80px 0 20px;
        font-size: 14px;
        color: #333;
        background-color: #f8f8f8;
        border-bottom: 1px solid #eee;
        overflow: hidden;
    }

    .layer-buttons {
        padding: 10px 0;
    }

    // 登陆提示弹窗
    &.login-popup .layer-content {
        height: 60px;
        line-height: 60px;
        font-size: 14px;

    }
}

.p-index {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    min-width: $page-min-width;
    .c-header {
        width: 100%;
        height: $header-height;
        line-height: $header-height;
        padding: 0;
        background: $header-bg-color;
    }
    .nav {
        margin-left: 40px;
    }
    .main-content {
        position: relative;
        padding: 0;
    }
    .logo {
        width: 260px;
        height: $header-height;
        line-height: $header-height;
        text-align: left;
        padding-left: 20px;
        background: url('../../assets/images/logo_bg.png') no-repeat -2px center;
        // background-size: 100%;
    }
    .logo-image {
        width: 162px;
        height: 27px;
        margin-top: 16px;
    }
    .logo-text {
        margin-left: 8px;
        font-size: $font-size-lg + 4px;
        font-weight: bold;
        color: $active-color;
    }
    .nav-menu {
        // background: @header-bg-color;
        background: transparent;
        border: none;
        height: $header-height;
        line-height: $header-height;
    }
    .nav-menu-item {
        border: none;
        height: $header-height;
        line-height: $header-height;
        width: 135px;
        text-align: center;
        color: $active-color;
        &.is-active, &:hover, &:active {
            color: $active-color !important;
            border: none;
            background: #4392fb !important;
        }
    }
    .tools, .user-center {
        color: $active-color;
        font-size: $font-size-base;
        height: $header-height;
        line-height: $header-height;
        /* height: 40px;
        line-height: 40px; */
        cursor: pointer;
        // margin-top: (@header-height - 40px) / 2;
        margin: 0 30px;
        padding: 0 20px;
        &:hover {
            background: #4392fb;
        }
    }
    .tool-icon {
        display: inline-block;
        width: 22px;
        height: 22px;
        margin-right: 10px;
        vertical-align: middle;
        background: url('../../assets/images/tool.png') no-repeat center center;
    }
    .user-icon {
        display: inline-block;
        width: 22px;
        height: 22px;
        margin-right: 10px;
        vertical-align: middle;
        background: url('../../assets/images/user.png') no-repeat center center;
    }

}
@media screen and (max-width: 1366px) {
  .p-index {
    .c-header, .logo, .nav-menu, .nav-menu-item {
      height: $min-header-height;
      line-height: $min-header-height;
    }
    // .tools, .user-center {
    //     // margin-top: ($min-header-height - 40px) / 2;
    // }
  }
}
// elementui的tooltip在body上，在此修改
.el-tooltip__popper.is-dark {
    background:  #0c253f;
    opacity: .8;
    margin-top: 0;
    & .tool-item {
        cursor: pointer;
        color: #868f97;
        margin: 0 7px;
        padding: 10px 6px;
        font-size: 12px;
        &:first-child {
            border-bottom: 1px solid #536e89;
        }
        &:hover {
            color: #fff;
        }
    }
}
</style>
