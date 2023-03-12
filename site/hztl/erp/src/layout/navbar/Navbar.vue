<template>
  <div>
    <div class="userinfo-center flex-container">
      <div class="logo-changelog-container">
        <div>
          <span class="nav-logo">
            <span class="menu-title">{{
              isSelects ? registerAppName : appName
            }}</span>
          </span>
          <Changelog style="margin-left: 5px" />
        </div>
      </div>

      <div class="nav-bar">
        <span class="icon-top-container" @click="toOa">
          <i class="iconfont icon-top-oa"></i>
          <span class="margin-left-small">OA审批</span>
        </span>

        <span class="icon-top-container" @click="toManula">
          <i class="iconfont icon-top-user"></i>
          <span class="margin-left-small">用户手册</span>
        </span>

        <span v-if="!isSelects" class="icon-top-container">
          <app-qr>
            <i class="icon iconfont icon-top-app"></i>
            <span class="margin-left-small">APP下载</span>
          </app-qr>
        </span>

        <el-dropdown
          v-if="store().userMsg().hasYx"
          trigger="click"
          placement="bottom"
          class="nav-dropdown-menu"
        >
          <span class="el-dropdown-link el-dropdown-link-kq">
            <el-badge
              :value="todoTotal"
              :max="99"
              :hidden="!todoTotal"
              class="item notice-number"
            >
              <i class="icon iconfont">
                <i class="el-icon-alarm-clock"></i>
              </i>
            </el-badge>
            客情提醒
          </span>
          <el-dropdown-menu class="kq-list" slot="dropdown">
            <el-dropdown-item>
              <div @click="toUrl('hf')">
                <i class="kq-icon el-icon-service"></i>
                回访提醒
                <el-badge
                  class="mark"
                  :value="todoMsg.CountHF"
                  :hidden="!todoMsg.CountHF"
                />
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="toUrl('by')">
                <i class="kq-icon el-icon-setting"></i>
                保养提醒
                <el-badge
                  class="mark"
                  :value="todoMsg.CountBY"
                  :hidden="!todoMsg.CountBY"
                />
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="toUrl('xb')">
                <i class="kq-icon el-icon-document"></i>
                续保提醒
                <el-badge
                  class="mark"
                  :value="todoMsg.CountXB"
                  :hidden="!todoMsg.CountXB"
                />
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="toUrl('ns')">
                <i class="kq-icon el-icon-data-line"></i>
                年审提醒
                <el-badge
                  class="mark"
                  :value="todoMsg.CountNS"
                  :hidden="!todoMsg.CountNS"
                />
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <span
          v-if="showPurchase"
          class="icon-top-container"
          @click="purchaseBasKetVisible = true"
        >
          <el-badge :value="baskketsTotal" :max="99" :hidden="!baskketsTotal">
            <i class="iconfont icon-top-purchase"></i>
          </el-badge>
          <span class="margin-left-small">采购篮</span>
        </span>

        <span
          v-if="showQuotation"
          class="icon-top-container"
          @click="quotationBasKetVisible = true"
        >
          <el-badge
            :value="salesBasketsNumber"
            :max="99"
            :hidden="!salesBasketsNumber"
          >
            <i class="iconfont icon-top-offer"></i>
          </el-badge>
          <span class="margin-left-small">报价篮</span>
        </span>

        <Notice v-if="!isSelects" title="消息通知" />

        <Notice v-if="!isSelects" title="待办事项" />

        <el-dropdown
          trigger="click"
          @command="handleCommand"
          class="nav-dropdown-menu"
        >
          <span style="cursor: pointer" class="el-dropdown-link">
            <i class="icon-img-header-info icon-img-user-header" />
            <span class="user-name">
              {{ userInfo.name }}
              <i class="el-icon-arrow-down" />
            </span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userSet">
              <i class="el-icon-setting" />
              <span>账号设置</span>
            </el-dropdown-item>
            <el-dropdown-item command="productBuy" v-if="isThreeSoft">
              <i class="el-icon-shopping-bag-2" />
              <span>服务购买</span>
            </el-dropdown-item>
            <el-dropdown-item command="passwordEdit">
              <i class="el-icon-lock" />
              <span>密码修改</span>
            </el-dropdown-item>
            <el-dropdown-item command="themeSet">
              <i class="el-icon-brush"></i>
              <span>主题设置</span>
            </el-dropdown-item>
            <el-dropdown-item command="/Login">
              <i class="el-icon-switch-button" />
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-tooltip v-if="showDueTipsBtn" placement="top" :enterable="false">
          <div slot="content" v-html="dueTips" class="due-tips" />
          <el-button
            class="due-tips-button"
            type="danger"
            size="mini"
            @click="gotoRenewal"
          >
            服务到期提醒
          </el-button>
        </el-tooltip>
      </div>
    </div>
    <AccountSetDialog
      :visible.sync="accountSetDialogVisible"
      :userInfo="userInfo"
    />
    <PasswordEditDialog
      :visible.sync="passwordEditDialogVisible"
      :userInfo="userInfo"
    />

    <ht-dialog
      v-if="showQuotation"
      :visible.sync="quotationBasKetVisible"
      title="报价篮"
      width="1160px"
      top="7vh"
      class="ignore-top-hotkeys"
      custom-class="bg-gray100"
    >
      <QuotationBasKet :visible.sync="quotationBasKetVisible" class="basket" />
    </ht-dialog>
    <ht-dialog
      v-if="showPurchase"
      :visible.sync="purchaseBasKetVisible"
      title="采购篮"
      width="1160px"
      top="7vh"
      class="ignore-top-hotkeys"
      custom-class="bg-gray100"
    >
      <QurchasebasKet :visible.sync="purchaseBasKetVisible" class="basket" />
    </ht-dialog>
    <ThemeSetDialog :visible.sync="themeSetDialogVisible"></ThemeSetDialog>
  </div>
</template>
<script>
import { getUserInfoMsg } from "@/api/userinfo/userinfo";
import AppQr from "@/components/app-qr";
import Notice from "./components/Notice";
import Changelog from "./components/Changelog";
import { mapActions, mapGetters, mapState } from "vuex";
import AccountSetDialog from "./dialog/AccountSetDialog";
import PasswordEditDialog from "./dialog/PasswordEditDialog";
import QuotationBasKet from "@/views/sales/basKets";
import QurchasebasKet from "@/views/purchase/basKets";
import eventBus from "@/event";
import ThemeSetDialog from "./dialog/ThemeSetDialog";
import * as store from "@/utils/store";
import { gotoRenewal } from "@/utils/message";
import { remindsTodo } from "@/api/repairs/remind";
import { uiConfig, envConfig } from "envConfigPath";

export default {
  name: "Navbar",
  components: {
    AccountSetDialog,
    PasswordEditDialog,
    Notice,
    Changelog,
    QuotationBasKet,
    QurchasebasKet,
    AppQr,
    ThemeSetDialog
  },
  props: {
    isSelects: Boolean,
    isBusinessAreaIcon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      noticeList: [],
      code: "init",
      unreadMsgsCount: 0,
      quotationBasKetVisible: false,
      purchaseBasKetVisible: false,
      accountSetDialogVisible: false,
      passwordEditDialogVisible: false,
      themeSetDialogVisible: false,
      userInfo: {},
      todoMsg: {},
      todoTotal: 0
    };
  },
  computed: {
    ...mapState("admin/menu", ["platformList"]),
    ...mapState("admin/user", ["userInfoMsg"]),
    ...mapState("admin/user", ["registerAppName", "appName", "copyRight"]),
    ...mapState("admin/saleInfo", ["salesBasketsNumber"]),
    ...mapGetters("admin/purchaseInfo", ["baskketsTotal"]),
    showQuotation() {
      return (
        this.hasBelongsPermWithoutRoute("read", "sales.quotationBaskets") &&
        !this.isSelects
      );
    },
    showPurchase() {
      return (
        this.hasBelongsPermWithoutRoute("read", "purchases.carts") &&
        !this.isSelects
      );
    },
    showDueTipsBtn() {
      if (uiConfig && uiConfig.uiTheme === "denso") return false;
      return store.userInfoMsg().dueTips && !store.isYx();
    },
    isThreeSoft() {
      if (uiConfig && uiConfig.uiTheme === "denso") return false;
      return true;
    },
    dueTips() {
      return `${store.userInfoMsg().dueTips}，<br />请点击按钮前往续费。`;
    }
  },
  mounted() {
    eventBus.$on("updateUserName", this.handleUpdateUserName);
    if (this.showQuotation) {
      this.loadSalesBasketInfo();
    }
    if (this.showPurchase) {
      this.loadPurchaseBasketInfo();
    }
    this.handleUpdateUserName();
    if (envConfig.hasYx) {
      this.getremindsTodo();
    }
  },
  methods: {
    store() {
      return store;
    },
    toOa() {
      this.$router.push({ path: "/officeAutomationApproval" });
    },
    toUrl(type) {
      if (type == "hf") {
        this.todoTotal -= Number(this.todoMsg.CountHF);
        this.todoMsg.CountHF = 0;
        this.$router.push({ path: "/customersReturnVisit" });
      }
      if (type == "by") {
        this.todoTotal -= Number(this.todoMsg.CountBY);
        this.todoMsg.CountBY = 0;
        this.$router.push({
          path: "/guestRemind",
          query: { id: "maintenance" }
        });
      }
      if (type == "xb") {
        this.todoTotal -= Number(this.todoMsg.CountXB);
        this.todoMsg.CountXB = 0;
        this.$router.push({
          path: "/guestRemind",
          query: { id: "renewal" }
        });
      }
      if (type == "ns") {
        this.todoTotal -= Number(this.todoMsg.CountNS);
        this.todoMsg.CountNS = 0;
        this.$router.push({
          path: "/guestRemind",
          query: { id: "yearCareful" }
        });
      }
      //this.$router.push({ path: "/company/detail", query: { id: row.id } });
    },
    toManula() {
      //判断当前环境，确定跳转页面
      const url = envConfig.manual;
      window.open(url, "manual");
    },
    handleUpdateUserName() {
      getUserInfoMsg()
        .then(res => {
          this.userInfo = res;
          console.log("客情：", this.store.userMsg());
        })
        .catch(() => {});
    },
    getremindsTodo() {
      remindsTodo().then(res => {
        this.todoMsg = res || {};
        this.todoTotal = 0;
        for (const key in this.todoMsg) {
          this.todoTotal +=
            Number(this.todoMsg[key]) > 0 ? Number(this.todoMsg[key]) : 0;
        }
      });
    },
    ...mapActions("admin/saleInfo", ["loadSalesBasketInfo"]),
    ...mapActions("admin/purchaseInfo", ["loadPurchaseBasketInfo"]),
    handleCollapseToggle() {
      this.$store.commit("admin/menu/collapseToggle");
    },
    handleCommand(command) {
      switch (command) {
        case "/Login":
          this.$store.dispatch("admin/user/outLogin");
          break;
        case "userSet":
          this.accountSetDialogVisible = true;
          break;
        case "productBuy":
          this.gotoRenewal();
          break;
        case "passwordEdit":
          this.passwordEditDialogVisible = true;
          break;
        case "themeSet":
          this.themeSetDialogVisible = true;
          break;
        default:
          break;
      }
    },
    gotoRenewal() {
      return gotoRenewal();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.userinfo-center {
  @include font_color("header-color-primary");
  .nav-dropdown-menu {
    @include font_color("header-color-menu");
  }

  .nav-bar {
    ::v-deep .app-qr {
      .icon-mobile-down {
        text-align: center;
        line-height: 30px;
        color: #fff;
        font-size: 16px;
      }
      .icon-mobile-down:hover {
        font-size: 18px;
      }
    }

    .iconfont {
      color: white;
      @include font_color("color-primary");
      background-color: $color-bg-primary;
      @include background_color("header-color-name");
      display: inline-block;
      width: 30px;
      height: 30px;
      text-align: center;
      border-radius: 50% 50%;
      font-size: 18px;
      &:hover {
        font-size: 20px;
      }
    }
  }
}
.el-dropdown-menu__item {
  position: relative;
  [class*=" el-icon-"],
  [class^="el-icon-"] {
    position: absolute;
    top: 11px;
    font-size: 15px;
  }
}
.due-tips-button {
  margin-left: 10px;
}
.due-tips {
  line-height: 20px;
}
.basket {
  text-align: center;

  ::v-deep .el-card .el-card__body {
    height: auto;
  }
  ::v-deep .ht-tabs {
    text-align: left;
  }
}
.el-dropdown-link-kq {
  font-size: 12px;
  // color: #171f24;
  margin: 0 10px 0 5px;
  line-height: 30px;
  cursor: pointer;
}
.kq-list {
  .el-dropdown-menu__item {
    padding: 0 10px 0 45px;
    .kq-icon {
      margin-top: -2px;
      margin-left: -30px;
      font-size: 20px;
      color: $color-primary;
      @include font_color("color-primary");
    }
    .mark {
      position: relative;
      top: 2px;
      margin-left: 20px;
      margin-right: 5px;
      line-height: 18px;
    }
  }
}
</style>
