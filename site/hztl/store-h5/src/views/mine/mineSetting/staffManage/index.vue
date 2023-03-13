<template>
  <div class="layout">
    <van-nav-bar
      class="nav-bar"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    >
      <template #right>
        <i class="icon-user-add" @click.stop="showAddStaffPopup"></i>
        <van-button
          type="default"
          class="button-manage"
          @click.stop="handleClick"
        >
          {{ isManager ? "取消" : "管理" }}
        </van-button>
      </template>
    </van-nav-bar>
    <div class="layout-main">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getList"
      >
        <van-checkbox-group v-model="checkList" ref="checkboxGroup">
          <van-cell center v-for="item in staffList" :key="item.id">
            <template #icon>
              <van-checkbox
                v-if="isManager && item.type !== 1"
                icon-size="16px"
                :name="item"
                style="margin-right: 8px;"
              ></van-checkbox>
              <img class="icon-reciver" :src="IconReciverImg" />
            </template>
            <template #title>
              <van-tag type="primary" class="m-r-8" v-if="item.type === 1"
                >管理员</van-tag
              >
              <span>{{ item.staffName }}</span>
              <span class="color-bye">（{{ item.phone }}）</span>
            </template>
          </van-cell>
        </van-checkbox-group>
      </van-list>
    </div>

    <!-- 添加员工弹框 -->
    <van-popup
      class="staff-add-popup"
      v-model="addStaffVisible"
      position="bottom"
      @click-overlay="hideAddStaffPopup"
      @closed="addStaffClosed"
      round
      :style="{ height: '9.0933333rem', fontSize: '14px' }"
    >
      <div class="popup-head">
        <div class="popup-head-title">添加员工</div>
        <!-- <div class="popup-head-button">完成</div> -->
        <van-button
          class="popup-head-button"
          plain
          hairline
          type="info"
          @click="addStaff"
          >完成</van-button
        >
      </div>
      <div class="form">
        <van-field
          v-model="staffAddForm.mobile"
          type="tel"
          left-icon="phone-o"
          placeholder="输入员工注册的手机号"
          maxlength="11"
        />
        <van-field
          v-model="staffAddForm.code"
          left-icon="other-pay"
          placeholder="请输入员工提供的验证码"
          maxlength="6"
        >
          <template #button>
            <!-- <van-button size="small" type="primary">发送验证码</van-button> -->
            <span style="color: #FF6E4C;" @click="getCode">{{
              verificationMsg
            }}</span>
          </template>
        </van-field>
      </div>
    </van-popup>
    <!-- 管理员工弹框 -->
    <van-popup
      class="manage-staff-popup"
      v-model="isManager"
      :overlay="false"
      position="bottom"
      :style="{ fontSize: '14px' }"
    >
      <div class="manage-staff-body">
        <div class="checkbox-wrap">
          <van-checkbox v-model="isAll" icon-size="20px">全选</van-checkbox>
        </div>
        <van-button
          class="height-30"
          plain
          hairline
          type="default"
          :disabled="!checkList.length"
          @click="deleteStaff"
          >删除</van-button
        >
        <van-button
          class="height-30 m-l-12"
          plain
          hairline
          type="info"
          :disabled="checkList.length !== 1"
          @click="setManager"
          >设为管理员</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import request from "@/request";
import {
  NavBar,
  Button,
  Dialog,
  Cell,
  Tag,
  Field,
  Icon,
  Toast,
  List,
  Checkbox,
  CheckboxGroup
} from "vant";
Vue.use(NavBar)
  .use(Button)
  .use(Dialog)
  .use(Cell)
  .use(Tag)
  .use(Icon)
  .use(Field)
  .use(Toast)
  .use(List)
  .use(Checkbox)
  .use(CheckboxGroup);
import IconReciverImg from "@/assets/icon-reciver.png";

export default {
  computed: {
    isAll: {
      get() {
        if (
          this.staffList.length &&
          this.staffList.filter(item => item.type !== 1).length ===
            this.checkList.length
        ) {
          return true;
        } else {
          return false;
        }
      },
      set(value) {
        if (value) {
          this.checkList = this.staffList.filter(item => item.type !== 1);
        } else {
          this.checkList = [];
        }
      }
    }
  },
  data() {
    return {
      IconReciverImg,
      pageInfo: {
        page: 1,
        pageSize: 20
      },
      manageStaffVisible: false,
      addStaffVisible: false,
      isManager: false,
      staffAddForm: {
        mobile: "",
        code: ""
      },
      verificationMsg: "获取验证码",
      loading: false,
      finished: false,
      staffList: [],
      checkList: [],
      flag: true
    };
  },
  methods: {
    goBack() {
      if (window.history.length) {
        this.$router.go(-1);
      } else {
        this.$router.push("/");
      }
    },
    showAddStaffPopup() {
      this.addStaffVisible = true;
    },
    hideAddStaffPopup() {
      this.addStaffVisible = false;
    },
    handleClick() {
      if (this.isManager) {
        this.isManager = false;
        this.checkList = [];
      } else {
        this.isManager = true;
      }
    },
    initList() {
      this.staffList = [];
      this.checkList = [];
      this.pageInfo.page = 1;
      this.finished = false;
      this.isManager = false;
      // this.getList();
    },
    getList() {
      if(!this.flag) return;
      this.flag = false;
      const pageInfo = this.pageInfo;
      const params = {
        page: pageInfo.page,
        pageSize: pageInfo.pageSize,
        onlyCurrent: true
      };
      request({
        url: "/staffs",
        params
      })
        .then(res => {
          if(pageInfo.page === 1) {
            this.staffList = res.rows || [];
          } else {
            this.staffList = [...this.staffList, ...res.rows];
          }
          this.loading = false;
          // 判断数据是否全部加载完成
          if (params.page >= res.totalPage) {
            this.finished = true;
          } else {
            pageInfo.page++;
          }
          this.flag = true;
        })
        .catch(() => {
          this.staffList = [];
          this.loading = false;
          this.flag = true;
        });
    },
    getCode() {
      const mobile = this.staffAddForm.mobile;
      if (mobile === "") {
        Toast.fail("手机号不能为空！");
      } else if (!/^1[3456789]\d{9}$/.test(mobile)) {
        Toast.fail("手机号码有误，请重填!");
      } else if (this.verificationMsg === "获取验证码") {
        request({
          method: "post",
          url: `/captchas/sms?phone=${mobile}&status=addStaff`
        })
          .then(() => {
            Toast.success("已发送验证码，请注意查收!");
          })
          .catch(err => {
            if (err && err.message) {
              Toast.fail(err);
            }
          });
        let count = 60;
        const that = this;
        const timerFn = function() {
          if (--count > 0) {
            that.verificationMsg = `${count}s后可重新获取`;
          } else {
            clearInterval(timerFn);
            that.verificationMsg = "获取验证码";
          }
        };
        setInterval(timerFn, 1000);
      }
    },
    addStaff() {
      const { mobile, code } = this.staffAddForm;
      if (mobile === "") {
        Toast.fail("手机号不能为空！");
        return;
      }
      if (code === "") {
        Toast.fail("验证码不能为空！");
        return;
      }
      const params = {
        phone: mobile,
        smsCaptcha: code
      };
      request({
        method: "post",
        url: "/staffs/create",
        data: params
      })
        .then(() => {
          Toast.success("添加成功！");
          this.initList();
          this.hideAddStaffPopup();
        })
        .catch(err => {
          if (err && err.message) {
            Toast.fail(err);
          }
        });
    },
    // 关闭弹出层时重置表单数据
    addStaffClosed() {
      this.staffAddForm.mobile = "";
      this.staffAddForm.code = "";
    },
    showManageStaffPopup() {
      this.manageStaffVisible = true;
    },
    hideManageStaffPopup() {
      this.manageStaffVisible = false;
    },
    // 删除员工
    deleteStaff() {
      Dialog.confirm({
        title: "提示",
        message: "您确定要删除当前员工吗?",
        confirmButtonText: "确定"
      })
        .then(() => {
          const params = {
            staffIds: this.checkList.map(item => item.id),
            companyId: this.checkList[0].companyId
          };
          request({
            method: "delete",
            url: "/staffs/platform",
            data: params
          })
            .then(() => {
              Toast.success("操作成功！");
              this.initList();
            })
            .catch(err => {
              if (err && err.message) {
                Toast.fail(err.message);
              }
            });
        })
        .catch(() => {});
    },
    // 设置管理员
    setManager() {
      Dialog.confirm({
        title: "提示",
        message: "您确定要变更公司的管理员吗?",
        confirmButtonText: "确定"
      })
        .then(() => {
          const staff = this.checkList[0];
          const params = {
            staffId: staff.staffId,
            companyId: staff.companyId
          };
          request({
            method: "post",
            url: "/staffs/change-manager",
            data: params
          })
            .then(() => {
              Toast.success("设置管理员成功！");
              this.$router.go(-1);
            })
            .catch(err => {
              if (err && err.message) {
                Toast.fail(err.message);
              }
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.height-30 {
  height: 30px;
}
.m-l-12 {
  margin-left: 12px;
}
.staff-add-popup {
  .popup-head {
    height: 50px;
    margin: 0 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .popup-head-title {
      flex: 1;
      font-size: 15px;
      font-weight: 700;
    }
    .popup-head-button {
      height: 30px;
    }
  }
  /deep/ .van-field {
    .van-field__body {
      .van-field__control {
        font-size: 14px;
        &::placeholder {
          font-size: 14px;
          font-weight: 400;
          color: #999999;
        }
      }
    }
  }
}
.manage-staff-popup {
  .manage-staff-body {
    margin: 0 16px;
    height: 50px;
    display: flex;
    align-items: center;
    .checkbox-wrap {
      flex: 1;
    }
  }
}

.icon-user-add {
  display: inline-block;
  width: 22px;
  height: 22px;
  background: url("~@/assets/icons/icon-user-add.png") no-repeat;
  background-size: 100% 100%;
}
.font-size-12 {
  font-size: 12px;
}
.color-bye {
  color: #666666;
}
.m-r-8 {
  margin-right: 8px;
}
.icon-reciver {
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 1px solid #e6e6e6;
  border-radius: 50% 50%;
}
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  text-align: left;
  .nav-bar {
    .van-nav-bar__content {
      .button-manage {
        height: 28px;
        line-height: 28px;
        margin-left: 12px;
      }
      .van-nav-bar__right {
        opacity: 1;
      }
    }
  }
  .layout-main {
    flex: 1;
    overflow-y: auto;
    .van-cell {
      padding: 11px 12px;
      font-family: PingFangSC-Regular;
      .van-cell__title {
        margin-left: 8px;
      }
    }
  }
}
</style>
