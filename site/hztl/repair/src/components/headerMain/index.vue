<template>
  <div class="header-main" ref="header">
    <div class="header-top">
      <div class="ht-container" v-show="baseInfo.companyId">
        <div class="header-top-company">您好！{{ baseInfo.companyName }}</div>
        <slot name="address"></slot>
        <div class="header-top-hint">
          我们是北京东方思锐，欢迎来电洽谈商务合作！服务电话：18519302596，13436706925，13436706923
        </div>
      </div>
      <div class="ht-container" v-show="!baseInfo.companyId">
        <el-button type="text" @click="enterVisible = true"
          >商家免费入驻</el-button
        >
        <ht-divider :direction="'vertical'"></ht-divider>
        <el-button type="text" @click="showReferrerAccountAlert()"
          >已有账号？</el-button
        >
        <div class="header-top-hint">
          我们是北京东方思锐，欢迎来电洽谈商务合作！服务电话：18519302596，13436706925，13436706923
        </div>
      </div>
    </div>
    <Menu :visible.sync="enterVisible"></Menu>
    <div class="header-content">
      <div class="ht-container">
        <div class="header-left">
          <div class="logo-main" @click="handlePath"></div>
        </div>

        <SearchBar :datas="searchBar"></SearchBar>
      </div>
    </div>

    <!-- 吸顶盒 -->
    <transition name="ceiling">
      <div class="ceiling-box" v-show="ceilingVisible">
        <div class="ht-container">
          <div class="ceiling-left"><i class="logo-small"></i></div>
          <SearchBar :datas="searchBar" :history="false"></SearchBar>
        </div>
      </div>
    </transition>

    <!-- 商家入驻 -->
    <el-dialog
      :visible.sync="enterVisible"
      append-to-body
      :show-close="false"
      :lock-scroll="false"
      class="ht-light-box"
      width="830px"
    >
      <img style="width: 100%;" :src="enterBgImg" alt="正在加载..." />
      <i class="enter-button" @click="erpRegister"></i>
      <span class="btn-close">
        <i class="icon-error" @click="enterVisible = false"></i>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { HtDivider } from "@/components/hztl";
import SearchBar from "@/components/searchBar/index.vue";
import Menu from "@/components/menu/index.vue";
import { SearchBarModel } from "@/common/interface/commonInterface";
import { BaseInfoModel } from "@/store/modules/base/interface";
import { namespace } from "vuex-class";
const BaseStore = namespace("base");

import enterBgImgData from "@/assets/img/enter-bg.png";

@Component({
  name: "HeaderMain",
  components: {
    SearchBar,
    HtDivider,
    Menu
  }
})
export default class HeaderMain extends Vue {
  @BaseStore.Getter("baseInfo")
  protected baseInfo!: BaseInfoModel;

  protected searchBar: SearchBarModel = {
    path: "/goods",
    keyword: ""
  };

  protected enterBgImg = enterBgImgData;

  // 商家入驻
  protected enterVisible = false;
  // 已有账号
  protected referrerAccountVisible = false;
  protected showReferrerAccountAlert() {
    (this as any).$alert(
      "请在思锐ERP中（“云配管家”或“M8互联网版”）的“配修社区”菜单中点击“配修社区首页”。<br>您将会以登录的状态自动跳转到现在这个界面，然后就可以做卖家设置啦〜",
      "提示",
      {
        confirmButtonText: "确定",
        dangerouslyUseHTMLString: true,
        lockScroll: false,
        callback: () => {
          return;
        }
      }
    );
  }

  // 跳转云配管家注册页
  protected erpRegister() {
    let url = "";
    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:8091/Register";
    } else {
      url = location.origin.replace("px", "erp") + "/Register";
    }
    window.open(url);
  }

  protected handlePath() {
    if (this.$route.path !== "/") {
      this.$router.push({ path: "/" });
    }
  }

  protected openBackStage() {
    if (sessionStorage.token) {
      let url = "";
      if (process.env.NODE_ENV === "development") {
        url = "http://192.168.3.41:8080/?token=" + sessionStorage.token;
      } else {
        url = location.origin + "/back/";
      }
      window.open(url, "_self");
    }
  }

  protected ceilingVisible = false;
  protected handleCeilingScroll() {
    if (this.$refs.header) {
      const headerBottom = (this.$refs
        .header as Element).getBoundingClientRect().bottom;
      if (!this.ceilingVisible && headerBottom <= 0) {
        this.ceilingVisible = true;
      }
      if (this.ceilingVisible && headerBottom > 0) {
        this.ceilingVisible = false;
      }
    }
  }

  mounted() {
    this.$nextTick(() => {
      window.addEventListener("scroll", this.handleCeilingScroll);
    });
  }

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleCeilingScroll);
  }
}
</script>

<style lang="scss" scoped>
$header-top-height: 40px;
$header-content-height: 100px;
$header-left-width: 357px;

.enter-button {
  display: inline-block;
  width: 180px;
  height: 48px;
  background-image: url("~@/assets/img/enter-button.png");
  background-size: 100% 100%;
  position: absolute;
  left: 234px;
  bottom: 110px;
  cursor: pointer;
}
.btn-close {
  position: absolute;
  right: 32px;
  top: -32px;
  .icon-error {
    position: relative;
    cursor: pointer;
    &::after {
      content: " ";
      position: absolute;
      left: 50%;
      top: calc(100% - 2px);
      display: inline-block;
      width: 0;
      height: 32px;
      border-right: 1px solid $color-white;
    }
  }
}

.header-main {
  .header-top {
    background: #f4f4f4;
    .ht-container {
      height: $header-top-height;
      display: flex;
      align-items: center;
      height: 32px;
      line-height: 32px;
      .el-button--text {
        color: $color-base;
      }
      .header-top-company {
        margin-right: 16px;
      }
      .header-top-hint {
        flex: 1;
        color: $color-primary;
        text-align: right;
      }
      .ht-divider-vertical {
        margin: 0 16px;
      }
    }
  }
  .header-content {
    background: $color-white;
    .ht-container {
      height: $header-content-height;
      display: flex;
      align-items: center;
      .header-left {
        width: $header-left-width;
        display: flex;
        .logo-main {
          cursor: pointer;
        }
      }
    }
  }
  .ceiling-box {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    background-color: $color-white;
    box-shadow: 0 2px 20px -6px #dcdcdc;
    .ht-container {
      height: 50px;
      display: flex;
      align-items: center;
      .ceiling-left {
        width: $header-left-width;
      }
    }
  }
}
.ceiling-enter-active,
.ceiling-leave-active {
  transition: opacity 0.25s;
}
.ceiling-enter,
.ceiling-leave-to {
  opacity: 0;
}
</style>
