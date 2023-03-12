<template>
  <el-container v-loading="!loaded" class="full-height">
    <!-- 版本提示 -->
    <new-version />
    <!-- 左部菜单栏 -->
    <ht-menu-aside
      :menu-list="menuList"
      :logo="
        uiConfig && uiConfig.logoClass
          ? uiConfig.logoClass
          : 'icon-img-logo-menu'
      "
    />
    <!-- <div class="question-feed-back">
      <el-badge
        :value="unreadMsgsCount"
        :hidden="unreadMsgsCount === 0"
        class="item"
      >
        <p @click="handleFeedBack">
          联系客服
        </p>
      </el-badge>
    </div> -->
    <el-container>
      <!-- 头部容器 -->
      <el-header style="padding:0;height:64px">
        <Navbar />
      </el-header>
      <!-- 切换容器 -->
      <ht-tags-view
        v-model="flexibleTags"
        :default-tags="defaultTags"
        :menu-list="menuList"
        @cur-tag-change="handleCurTagChange"
      />
      <el-main v-if="loaded">
        <!-- 二级路由 - 工作台 -->
        <transition name="slide-left">
          <keep-alive :include="keepAliveComponents">
            <router-view v-if="isRouterAlive" class="child-view" />
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
    <LimitDeviceAuthored
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      @refreshLimiteData="refreshLimiteData"
    />
    <global-dialog />
  </el-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
// import EpcSearch from "@/components/epc-search";
import GlobalDialog from "@/components/globalDialog";
import { LimitDeviceAuthored } from "./dialog";
import Navbar from "@/layout/navbar/Navbar";
import NewVersion from "@/components/globalDialog/newVersion";
import { getUnreadMsgsCount } from "@/api/im/notifications";
import setting from "@/setting.js";
import { workBenchCommounMenu } from "@/api/workbench";
import { envConfig, uiConfig } from "envConfigPath";

const { defaultTags } = setting.page;

export default {
  name: "MainIndex",
  provide() {
    return {
      reload: this.reload
    };
  },
  components: {
    Navbar,
    LimitDeviceAuthored,
    GlobalDialog,
    NewVersion
  },
  data() {
    return {
      uiConfig,
      unreadMsgsCount: 0,
      defaultTags,
      flexibleTags: localStorage.openedTags
        ? JSON.parse(localStorage.openedTags)
        : [],
      loaded: false,
      limitType: null,
      dialogVisible: false,
      asideWidthCollapse: "60px",
      asideWidth: "150px",
      isRouterAlive: true
    };
  },
  computed: {
    ...mapState("admin", {
      menuList: state => state.menu.menuListAside
    }),
    ...mapState("admin/im", ["feedbacks"]),
    ...mapState("admin/limitTime", ["isShowTips", "isTimeOut"]),
    ...mapState("admin/user", ["userInfoMsg"]),
    keepAliveComponents() {
      return this.flexibleTags.map(item => item.name);
    }
  },
  watch: {
    feedbacks: {
      handler() {
        getUnreadMsgsCount().then(res => {
          this.unreadMsgsCount = res;
        });
      },
      immediate: true
    },
    flexibleTags(value) {
      localStorage.openedTags = JSON.stringify(value);
    },
    isShowTips(value) {
      if (value) {
        this.dialogVisible = true;
      }
    },
    isTimeOut(value) {
      if (value) {
        this.dialogVisible = true;
      }
    }
  },
  mounted() {
    this.$store.commit("admin/menu/loadLocalSave");
    this.$nextTick(() => {
      setTimeout(() => {
        this.refreshData();
      }, 2000);
    });
    this.startRotation();
    // this.$sidebarBox.addSidebar({
    //   shortcutsKey: "Alt+E",
    //   title: "E P C 查询",
    //   width: "calc(100% - 100px)",
    //   height: "calc(100% - 50px)",
    //   contentRender: () => <EpcSearch />
    // });
  },
  beforeMount() {
    this.loadBaseData().finally(() => {
      this.loaded = true;
    });
  },
  beforeDestroy() {
    this.$store.commit("admin/baseData/clearData");
    this.$store.commit("admin/communionCompany/clearData");
    this.$store.commit("admin/partsBc/clearData");
    this.$store.commit("admin/staffs/clearData");
    this.$store.commit("admin/orderStates/clearData");
    this.$store.commit("admin/warehouse/clearData");
    this.$store.commit("admin/warehouseManager/clearData");
    this.$store.commit("admin/salesMan/clearData");
    this.$store.commit("admin/purchaseMan/clearData");
    this.$store.commit("admin/myCompnayInfo/clearData");
    this.$store.commit("admin/systemParams/clearData");

    // 离开清除数据
    this.$store.commit("baseData/dictionary/clearData");
    this.$sidebarBox.removeSidebar("Alt+E");
  },
  methods: {
    ...mapActions("admin/tab", ["add"]),
    ...mapActions("admin/limitTime", ["refreshData"]),
    ...mapActions("admin/menu", ["menuAsideSet"]),
    ...mapActions("admin/im", ["startRotation"]),
    handleCurTagChange(params) {
      // 统计路由跳转
      workBenchCommounMenu({
        name: params.path
      });
    },
    async loadBaseData() {
      await this.menuAsideSet(this.hasEntryPerm);
      await this.loadAppData();
    },
    async loadAppData() {
      await this.$store.commit("admin/resizeBoxStates/initState");
      await this.$store.dispatch("admin/orderStates/initData");
      await this.$store.dispatch("admin/systemParams/loadSystemParams");
      await this.$store.dispatch("admin/systemParams/loadFinancialsSettles");
      await this.$store.dispatch("admin/themeStyle/loadThemeColor");

      // 加载数据后续处理，分部到各个需要的地方加载
      this.$store.dispatch("admin/baseData/loadAll", true);
      this.$store.dispatch("admin/warehouse/loadAll");
      this.$store.dispatch("admin/partsBc/loadAll", true);
      this.$store.dispatch("admin/staffs/loadAll", true);
      this.$store.dispatch("admin/communionCompany/loadAll", true);
    },
    refreshLimiteData(flag) {
      this.dialogVisible = false;
      this.refreshData(flag);
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
    handleFeedBack() {
      const url = envConfig.feedback;
      window.open(url, "feedBack");
    }
    // handleFeedBack() {
    //   let url = "";
    //   if (process.env.NODE_ENV === "development") {
    //     url = "http://localhost:8081/feedback";
    //   } else {
    //     url = `https://${window.location.hostname.replace("erp", "feedback")}`;
    //   }
    //   window.open(url, "feedBack");
    // }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";

.el-main {
  padding: 0;
  height: 1px;
  position: relative;

  // .child-view {
  //   position: absolute;
  //   transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  // }

  &::v-deep .container-box {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background: $color-dark-bg;

    > .wrapper {
      display: flex;
      justify-content: space-between;
    }

    & > .header {
      flex: none;
      min-height: 40px;
      height: auto;
      line-height: 36px;
      margin-top: 5px;
      padding: 0 10px;
      background-color: $color-content-bg;
      @include background_color("color-content-bg");

      &.header-between {
        display: flex;
        justify-content: space-between;
      }
    }

    & > .box-card {
      margin: 5px;

      & + .box-card {
        margin-top: 0;
      }
    }

    & > .container {
      display: contents;
    }

    & > .scroll-container {
      flex: auto;
      overflow: auto;
      height: 1px;
    }

    & > .footer {
      flex: none;
      margin-top: 5px;
      padding: 5px 0;
      height: 45px;
      // line-height: 36px;
      // padding: 0 20px;
      text-align: center;
      background-color: $color-content-bg;
      @include background_color("color-content-bg");

      .footer-statistical {
        font-size: 14px;
        text-align: left;
        display: flex;
        justify-content: space-between;

        > div {
          margin-left: 10px;
        }
      }
    }
  }
}

.question-feed-back {
  position: absolute;
  bottom: 10px;
  left: 16px;
  width: 40px;
  color: #fff;
  z-index: 999;
  cursor: pointer;
  p {
    margin: 0;
    padding: 0;
  }
}
</style>

<style lang="scss">
// 左侧栏选择列表子类目样式
.el-menu--collapse {
  width: 60px !important;
}
.ht-menu-wrapper {
  .el-menu-item {
    height: 46px;
    line-height: 46px;
  }
}
</style>
