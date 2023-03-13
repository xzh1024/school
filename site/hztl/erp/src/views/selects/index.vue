<template>
  <el-container style="height:100%;">
    <el-header class="nav-bar">
      <div class="logo-container">
        <span class="icon icon-img-logo-menu" />
      </div>
      <Navbar is-selects class="navbar-container" />
    </el-header>
    <el-main v-loading="loading" class="main-content">
      <Main
        v-show="status === 0"
        @on-create="handleCreateSuccess"
        @on-join="showJoinCompanyAuditResult"
      />
      <AuditResult
        v-show="status === 1"
        :audit-status="auditStatus"
        :create-company-info="createCompanyInfo"
        is-create-company
        @on-update-status="showCreateAccountsAuditResult"
        @on-recall-success="showMain"
        @on-reapply-status="showMain"
      />
      <AuditResult
        v-show="status === 2"
        :audit-status="auditStatus"
        :join-company-info="joinCompanyInfo"
        @on-update-status="showJoinCompanyAuditResult"
        @on-recall-success="showMain"
        @on-reapply-status="showMain"
      />
    </el-main>
  </el-container>
</template>

<script>
import Navbar from "@/layout/navbar/Navbar";
import Main from "./main";
import AuditResult from "./audit-result";
import {
  getJoinCompanyAuditInfo,
  getMyCreateCompanyInfo
} from "@/api/company/company";
import { mapActions, mapState } from "vuex";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import setting from "@/setting.js";
import { envConfig } from "envConfigPath";
import * as store from "@/utils/store";
// import { gotoRenewal } from "@/utils/message";
import { uiConfig } from "envConfigPath";

const { defaultRoute } = setting.page;
const topHotkeys = new TopHotkeys();

export default {
  name: "Selects",
  components: {
    Navbar,
    Main,
    AuditResult
  },
  data() {
    return {
      uiConfig,
      accountType: "yp",
      loading: false,
      status: 0,
      auditStatus: 0,
      companyInfoData: {},
      createCompanyInfo: {},
      joinCompanyInfo: {},
      userInfoMsgStatus: null
    };
  },
  computed: {
    ...mapState("admin/user", ["userInfoMsg"])
  },
  watch: {
    userInfoMsgStatus() {
      this.handleRefresh();
    },
    userInfoMsg() {
      this.getUserInfoMsgStatus();
    }
  },
  mounted() {
    topHotkeys.bindHotkeys(this.$el);
    this.getUserInfoMsgStatus();
  },
  beforeDestroy() {
    topHotkeys.unbindHotkeys(this.$el);
    // 离开清除数据
    this.$store.commit("baseData/dictionary/clearData");
  },
  methods: {
    ...mapActions("admin/user", ["loadUserMsg"]),
    getUserInfoMsgStatus() {
      if (store.userInfoMsg()) {
        this.userInfoMsgStatus = store.userInfoMsg().status;
      }
    },
    handleRefresh() {
      if (this.userInfoMsgStatus === 0) {
        this.$router.replace({
          path: defaultRoute
        });
      } else if (this.userInfoMsgStatus === 2) {
        this.showMain();
      } else if (this.userInfoMsgStatus === 3) {
        this.showCreateAccountsAuditResult();
      } else if (this.userInfoMsgStatus === 4) {
        this.showJoinCompanyAuditResult();
      }
    },
    handleCreateSuccess(e) {
      this.accountType = e;
      this.$msgbox({
        title: "提示",
        customClass: "authorize-parts-tips",
        message: this.createSuccessTips(),
        showCancelButton: true,
        closeOnClickModal: false,
        closeOnPressEscape: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.gotoDefaultPage();
          this.openManualPage();
        })
        .catch(() => {
          this.gotoDefaultPage();
        });
    },
    createSuccessTips() {
      if (uiConfig && uiConfig.uiTheme === "denso") {
        return (
          <div class="tips-container">
            <div>
              欢迎使用云诊车门店管家，系统将提供您
              <span class="text-font-primary text-font-weight"> 5天 </span>
              试用时间。为保障您的工作正常开展，请及时绑定云诊车诊断仪并确保诊断仪在有效期间内。
            </div>
            <div>
              为了您能更好的使用本系统是否现在查看
              <span class="text-font-primary text-font-weight">
                系统配置教程？
              </span>
            </div>
          </div>
        );
      }
      return (
        <div class="tips-container">
          <div>
            欢迎使用{this.accountType == "yp" ? "云配" : "云修"}
            管家，系统将提供您
            <span class="text-font-primary text-font-weight"> 5天 </span>
            试用时间。联系思锐客服（
            {store.userInfoMsg().customerServicePhone}）续订服务。
          </div>
          <div>
            为了您能更好的使用本系统是否现在查看
            <span class="text-font-primary text-font-weight">
              系统配置教程？
            </span>
          </div>
        </div>
      );
    },
    async gotoDefaultPage() {
      await this.loadUserMsg();
      this.$router.push({ path: "/CompanyInfo" });
    },
    openManualPage() {
      const isYx = this.accountType === "yx";
      const url = `${envConfig.manual}?productId=${isYx ? 26 : 2}&pageId=1`;
      window.open(url, "manual");
    },
    showCreateAccountsAuditResult() {
      if (this.loading) return;
      this.loading = true;
      this.status = 1;
      getMyCreateCompanyInfo()
        .then(res => {
          this.auditStatus = res.erp.status;
          this.createCompanyInfo = {
            createdByName: res.createdByName,
            updatedAt: res.updatedAt,
            applyType: this.status,
            companyName: res.name,
            remark: res.erp.remark
          };
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    showJoinCompanyAuditResult() {
      if (this.loading) return;
      this.loading = true;
      this.status = 2;
      getJoinCompanyAuditInfo()
        .then(res => {
          this.auditStatus = res.status === 3 ? 2 : res.status;
          this.joinCompanyInfo = {
            applyUserName: res.applyUserName,
            applyTime: res.applyTime,
            applyType: this.status,
            companyName: res.companyName,
            remark: res.refuseReason,
            companyId: res.companyId
          };
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    showMain() {
      this.status = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.logo-container {
  width: 64px;
  height: 64px;
  line-height: 64px;
  text-align: center;
  background-color: #00a7fb;
}

.navbar-container {
  flex: 1;
  height: 64px;
  line-height: 64px;
}

.main-content {
  background: #fbfbfb;
  text-align: center;
}
</style>

<style lang="scss">
@import "@/assets/css/var";

.tips-container {
  text-align: left;
  line-height: 30px;
  font-size: 16px;

  .text-font-weight {
    font-weight: 500;
  }

  .renewal {
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid $color-primary;
      @include border_color("color-primary");
    }
  }
}
</style>
