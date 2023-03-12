<template>
  <div class="box">
    <div :class="statusClass">{{ statusText }}</div>

    <div class="title-container">
      <i :class="titleClass" class="title-icon" />
      <div class="title-text">
        {{ titleText }}
        <span v-show="auditStatus === 0" class="title-tips">
          {{ tipsText }}
        </span>
      </div>
    </div>

    <div class="main-container">
      <div
        v-for="(item, index) in textList"
        :key="index"
        class="item-container"
      >
        <div class="item-label">{{ item.label }}</div>
        <div
          :style="item.isCompany ? 'cursor: pointer' : ''"
          :class="item.isReason ? 'text-font-danger' : 'text-font-primary'"
          @click.stop="showCompanyInfo(item.isCompany)"
        >
          <span v-show="item.isCompany">{{ item.prop }}（查看）</span>
          <span v-show="!item.isCompany">{{ item.prop }}</span>
        </div>
      </div>
    </div>

    <div>
      <el-button
        v-show="auditStatus === 0"
        size="mini"
        type="primary"
        @click.stop="recallHandle"
        >撤回申请</el-button
      >
      <el-button
        v-show="auditStatus === 0"
        size="mini"
        type="primary"
        @click.stop="updateHandle"
        >刷新状态</el-button
      >
      <el-button
        v-show="auditStatus === 1"
        size="mini"
        type="primary"
        @click.stop="gotoHandle"
        >开始体验</el-button
      >
      <el-button
        v-show="auditStatus === 2"
        size="mini"
        type="primary"
        @click.stop="reapplyHandle"
        >重新申请</el-button
      >
    </div>

    <ht-dialog
      :visible.sync="showEditCompanyInfo"
      class="company-information"
      width="760px"
      title="公司资料"
      top="7vh"
    >
      <CompanyInfo
        :visible.sync="showEditCompanyInfo"
        v-bind="$attrs"
        is-dialog
        is-register
        style="height: 675px;"
      />
    </ht-dialog>
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
          确定(F3)
        </el-button>
        <el-button type="primary" plain size="mini" @click="close">
          取消（Esc）
        </el-button>
      </div>
    </ht-dialog>
  </div>
</template>

<script>
import CompanyInfo from "@/views/company/company-info";
import {
  noLoginPath,
  recallCreateMyCompnay,
  recallJoinCompany
} from "@/api/company/company";
import { dateFormatFull } from "@/utils/date";
import { APPLY_TYPES } from "@/constants";
import { mapActions } from "vuex";
import { beyondMaxLogin, hotkeyMixin } from "@/mixins";

export default {
  name: "AuditResult",
  components: {
    CompanyInfo
  },
  props: {
    isCreateCompany: Boolean,
    auditStatus: {
      type: Number,
      default: 0
    },
    createCompanyInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    joinCompanyInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mixins: [beyondMaxLogin, hotkeyMixin],
  data() {
    return {
      showEditCompanyInfo: false,
      isRecall: false
    };
  },
  computed: {
    statusClass() {
      if (this.auditStatus === 1) {
        return "status-suc";
      } else if (this.auditStatus === 2) {
        return "status-dan";
      } else {
        return "status-war";
      }
    },
    statusText() {
      if (this.auditStatus === 0) {
        return "审核中";
      } else if (this.auditStatus === 1) {
        return this.isCreateCompany ? "已开通" : "已加入";
      } else if (this.auditStatus === 2) {
        return "已拒绝";
      } else {
        return "";
      }
    },
    titleClass() {
      if (this.auditStatus === 2) {
        return "el-icon-warning text-font-danger";
      } else {
        return "el-icon-success text-font-success";
      }
    },
    titleText() {
      if (this.auditStatus === 0) {
        return this.isCreateCompany ? "已提交开通申请" : "已提交加入申请";
      } else if (this.auditStatus === 1) {
        return this.isRecall ? "审核已通过，无法撤回" : "审核通过";
      } else if (this.auditStatus === 2) {
        return "审核未通过";
      } else {
        return "";
      }
    },
    tipsText() {
      return this.isCreateCompany
        ? "（等待思锐审核）"
        : "（等待公司管理员审核）";
    },
    textList() {
      return this.isCreateCompany
        ? this.createCompanyList
        : this.joinCompanyList;
    },
    createCompanyList() {
      return this.auditStatus === 2
        ? [
            { label: "申请人：", prop: this.createCompanyInfo.createdByName },
            {
              label: "申请时间：",
              prop: dateFormatFull(this.createCompanyInfo.updatedAt)
            },
            {
              label: "申请类型：",
              prop: APPLY_TYPES[this.createCompanyInfo.applyType]
            },
            {
              label: "申请公司：",
              prop: this.createCompanyInfo.companyName,
              isCompany: true
            },
            {
              label: "拒绝原因：",
              prop: this.createCompanyInfo.remark,
              isReason: true
            }
          ]
        : [
            { label: "申请人：", prop: this.createCompanyInfo.createdByName },
            {
              label: "申请时间：",
              prop: dateFormatFull(this.createCompanyInfo.updatedAt)
            },
            {
              label: "申请类型：",
              prop: APPLY_TYPES[this.createCompanyInfo.applyType]
            },
            {
              label: "申请公司：",
              prop: this.createCompanyInfo.companyName,
              isCompany: true
            }
          ];
    },
    joinCompanyList() {
      return this.auditStatus === 2
        ? [
            { label: "申请人：", prop: this.joinCompanyInfo.applyUserName },
            {
              label: "申请时间：",
              prop: dateFormatFull(this.joinCompanyInfo.applyTime)
            },
            {
              label: "申请类型：",
              prop: APPLY_TYPES[this.joinCompanyInfo.applyType]
            },
            { label: "公司名称：", prop: this.joinCompanyInfo.companyName },
            {
              label: "拒绝原因：",
              prop: this.joinCompanyInfo.remark,
              isReason: true
            }
          ]
        : [
            { label: "申请人：", prop: this.joinCompanyInfo.applyUserName },
            {
              label: "申请时间：",
              prop: dateFormatFull(this.joinCompanyInfo.applyTime)
            },
            {
              label: "申请类型：",
              prop: APPLY_TYPES[this.joinCompanyInfo.applyType]
            },
            { label: "公司名称：", prop: this.joinCompanyInfo.companyName }
          ];
    }
  },
  methods: {
    ...mapActions("admin/user", ["outLogin", "loadUserMsg"]),
    showCompanyInfo(isCompany) {
      if (!isCompany) return;
      this.showEditCompanyInfo = true;
    },
    recallHandle() {
      this.isRecall = true;
      if (this.isCreateCompany) {
        recallCreateMyCompnay()
          .then(() => {
            this.$message.success({
              message: "撤销申请成功！",
              showClose: true
            });
            this.$emit("on-recall-success");
          })
          .catch(() => {});
      } else {
        recallJoinCompany({ companyId: this.joinCompanyInfo.companyId })
          .then(() => {
            this.$message.success({
              message: "撤销申请成功！",
              showClose: true
            });
            this.$emit("on-recall-success");
          })
          .catch(() => {});
      }
    },
    updateHandle() {
      this.isRecall = false;
      this.$emit("on-update-status");
    },
    showBeyondMaxLoginNumberTips() {
      const canForceLogout =
        this.loginHasPerm("system.onlineStaff") ||
        this.loginHasPerm("system.onlineStaff.our") ||
        this.loginHasPerm("system.onlineStaff.rests");
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
          this.gotoHandle();
        })
        .catch(() => {
          this.outLogin();
        });
    },
    async gotoHandle() {
      await noLoginPath();
      try {
        await this.loadUserMsg();
        this.$router.push({ path: "/BaseIndex" });
      } catch (err) {
        if (err.data && err.data.onlineUsers && err.data.onlineUsers.length) {
          const { onlineUsers, perms, hasRootPerm } = err.data;
          this.beyondMaxLoginNumberData = onlineUsers;
          this.userPerms = perms;
          this.userHasRootPerm = hasRootPerm;
          this.showBeyondMaxLoginNumberTips();
        } else {
          this.outLogin();
        }
      }
    },
    reapplyHandle() {
      this.$emit("on-reapply-status");
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  padding: 20px 40px 10px 40px;
  margin: 100px auto 0 auto;
  width: 500px;
  background: #ffffff;
  border-radius: 5px;
  border: solid 1px rgba(222, 225, 231, 1);
  box-shadow: 0px 0px 5px rgba(222, 225, 231, 1);

  .status-war,
  .status-suc,
  .status-dan {
    margin-left: 409px;
    margin-top: -6px;
    position: relative;
    width: 50px;
    height: 20px;
    transform: rotate(45deg);
    color: #ffffff;
    line-height: 20px;
    font-size: 14px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: none;
      transform: perspective(0.5em) scale(1.8, 1.7) rotateX(15deg);
      z-index: -1;
      transform-origin: bottom;
    }
  }

  .status-war {
    &::before {
      background: #ffa708;
      border: 1px solid #ffa708;
    }
  }

  .status-suc {
    &::before {
      background: #00dc8d;
      border: 1px solid #00dc8d;
    }
  }

  .status-dan {
    &::before {
      background: #ff424d;
      border: 1px solid #ff424d;
    }
  }

  .title-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .title-icon {
      font-size: 24px;
    }

    .title-text {
      margin-left: 10px;
      font-size: 20px;

      .title-tips {
        font-size: 12px;
        color: #aab2b7;
      }
    }
  }

  .main-container {
    .item-container {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      text-align: left;

      .item-label {
        width: 115px;
      }
    }
  }
}

.company-information {
  text-align: left;

  ::v-deep .el-dialog__body {
    padding: 0 5px;

    .footer {
      margin-top: -41px;
    }
  }
}
</style>
