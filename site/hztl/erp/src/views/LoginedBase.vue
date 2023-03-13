<template>
  <div v-loading="!loaded" class="full-height">
    <router-view v-if="loaded" />

    <TipsDialog
      :visible.sync="showTipsDialog"
      @on-goto="gotoHandle"
      @on-out-login="outLogin"
    />
    <ht-dialog
      :visible.sync="passvisible"
      :close-on-click-modal="false"
      width="600px"
      append-to-body
      title="提示"
    >
      <div class="info">
        <i class="el-icon-warning warning"></i>
        <span>是否强制下线</span>
      </div>
      <div class="dialog-footer-align mt-1">
        <el-button type="primary" plain size="mini" @click="sureHandle">
          确定（F3）
        </el-button>
        <el-button type="primary" plain size="mini" @click="close">
          取消（Esc）
        </el-button>
      </div>
    </ht-dialog>
    <DeviceAuthored
      v-if="deviceAuthoredVisible"
      :info="loginInfo"
      :device-key="deviceKey"
      :before-close="beforeClose"
      :visible.sync="deviceAuthoredVisible"
      @loginNextStep="loginNextStep"
    />
  </div>
</template>

<script>
import TipsDialog from "@/components/LoginedDialog/TipsDialog.vue";
import { mapActions, mapState } from "vuex";
import { permissionsMixin } from "@/mixins";
import setting from "@/setting.js";
import { beyondMaxLogin } from "@/mixins";
import * as store from "@/utils/store";
import { dueMessageBox } from "@/utils/message";
import { logoutByAccount, checkDeviceAuth } from "@/api/loginregister";
import DeviceAuthored from "@/views/entrance/dialog/DeviceAuthored";

const { defaultRoute } = setting.page;

let cancelBeforeEach;

export default {
  name: "LoginedBase",
  components: {
    TipsDialog,
    DeviceAuthored
  },
  mixins: [permissionsMixin, beyondMaxLogin],
  data() {
    return {
      loaded: false,
      showTipsDialog: false,
      deviceAuthoredVisible: false,
      loginInfo: {}
    };
  },
  computed: {
    ...mapState("admin/user", ["userInfoMsg", "deviceKey"])
  },
  beforeMount() {
    cancelBeforeEach = this.$router.beforeEach((to, from, next) => {
      if (["/Login", "/ForgetPsd", "/Register"].includes(to.path)) {
        next();
      } else if (store.userInfoMsg()) {
        if ([2, 3, 4].includes(store.userInfoMsg().status)) {
          if (to.path === "/Selects") {
            next();
          } else {
            next("/Selects");
          }
        } else if (store.userInfoMsg().status === 0) {
          if (store.userInfoMsg().accountSetStatus === 0) {
            if (to.path === "/Selects") {
              next(from.path);
            } else {
              const perm = to.meta ? to.meta.perm : "";
              const tags = to.meta ? to.meta.tags : false;
              const hasBelongs = to.meta && to.meta.hasBelongs;
              if (perm) {
                if (this.hasEntryPerm(perm, tags, hasBelongs)) {
                  next();
                } else {
                  this.$message.warning({ message: "没有权限！" });
                }
              } else {
                next();
              }
            }
          } else {
            next("/Login");
          }
        } else {
          next("/Login");
        }
      } else {
        this.loaded = false;
        next();
      }
    });
  },
  mounted() {
    this.loadBaseData();
    // 浏览器关闭拦截
    window.onbeforeunload = () => true;
  },
  destroyed() {
    cancelBeforeEach && cancelBeforeEach();
    // 浏览器关闭拦截
    window.onbeforeunload = undefined;
    if (this.loaded) {
      this.loaded = false;
      this.$store.commit("admin/im/stopRotation");
      this.$store.commit("admin/user/clearData");
    }
  },
  methods: {
    ...mapActions("admin/user", ["outLogin", "loadUserMsg"]),
    async loadBaseData() {
      this.loaded = false;
      const utmSource = this.$route.query.utm_source;
      if (utmSource) {
        localStorage.setItem("utmSource", utmSource);
      }
      try {
        const res = await this.loadUserMsg();
        if ([2, 3, 4].includes(res.status)) {
          this.$router.replace({
            path: "/Selects"
          });
          this.loaded = true;
        } else if (res.status === 0) {
          if (res.accountSetStatus === 0) {
            if (res.dueTips) {
              this.showTipsDialog = true;
            } else {
              this.gotoHandle();
            }
          } else {
            dueMessageBox();
          }
        }
      } catch (err) {
        if (err.code === "device-check") {
          checkDeviceAuth({
            device: this.deviceKey,
            type: 1
          }).then(resCheck => {
            if (!resCheck.isAuth) {
              this.loginInfo = {
                phone: resCheck.phone
              };
              this.deviceAuthoredVisible = true;
            } else {
              this.loadBaseData();
            }
          });
        } else if (err.data) {
          const { onlineUsers, perms, hasRootPerm } = err.data;
          this.beyondMaxLoginNumberData = onlineUsers;
          this.userPerms = perms;
          this.userHasRootPerm = hasRootPerm;
          this.showBeyondMaxLoginNumberTips();
        } else {
          console.error("loadBaseDataErr", err);
          this.outLogin();
        }
      }
    },
    beforeClose() {
      this.deviceAuthoredVisible = false;
      logoutByAccount();
    },
    loginNextStep() {
      this.deviceAuthoredVisible = false;
      this.loadBaseData();
    },
    showBeyondMaxLoginNumberTips() {
      const canForceLogout =
        this.checkPerm("system.onlineStaff.our") ||
        this.checkPerm("system.onlineStaff.rests");
      this.$msgbox({
        title: "同时在线员工数超限提示",
        customClass: "beyond-max-login-number-tips",
        message: this.beyondMaxLoginNumberTips(canForceLogout),
        center: true,
        showCancelButton: true,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: false,
        confirmButtonText: "重试",
        cancelButtonText: "退出登录"
      })
        .then(() => {
          this.loadBaseData();
        })
        .catch(() => {
          this.outLogin();
        });
    },
    gotoHandle() {
      if (
        this.$route.fullPath !== "/" &&
        this.$route.fullPath !== defaultRoute
      ) {
        // 目标地址没有权限时调整到默认地址
        const perm = this.$route.meta ? this.$route.meta.perm : "";
        const tags = this.$route.meta ? this.$route.meta.tags : false;
        const hasBelongs = this.$route.meta && this.$route.meta.hasBelongs;
        if (perm) {
          this.$nextTick(() => {
            if (!this.hasEntryPerm(perm, tags, hasBelongs)) {
              this.$router.push({
                path: defaultRoute
              });
            }
          });
        }
      }
      this.loaded = true;
    },
    checkPerm(key) {
      const pathArray = key.split(".");
      let currentPath = "";
      let checkPermStatus = false;
      pathArray.forEach((k, idx) => {
        currentPath += idx > 0 ? "." + k : k;
        if (this.userPerms && this.userPerms.includes(currentPath)) {
          checkPermStatus = true;
        }
      });
      return checkPermStatus;
    }
  }
};
</script>
<style lang="scss" scoped>
.full-height {
  height: 100%;
}
.info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px;
}

.warning {
  font-size: 30px;
  color: #e6a23c;
  margin-right: 10px;
}

.online-info p {
  margin: 0;
}

.online-info p span {
  color: red;
}
</style>
