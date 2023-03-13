<template>
  <div class="layout">
    <van-nav-bar left-arrow @click-left="onClickLeft" />
    <div class="layout-main">
      <van-cell center @click="$router.push({ path: '/account' })">
        <template #icon>
          <i class="icon-account"></i>
        </template>
        <template #title>
          账号与安全
        </template>
        <template #right-icon>
          <i class="iconfont icon-direction_right font-size-12"></i>
        </template>
      </van-cell>
      <van-cell center @click="$router.push({ path: '/address' })">
        <template #icon>
          <i class="icon-location"></i>
        </template>
        <template #title>
          地址管理
        </template>
        <template #right-icon>
          <i class="iconfont icon-direction_right font-size-12"></i>
        </template>
      </van-cell>
      <van-cell
        center
        v-if="baseInfo.companyId"
        @click="$router.push({ path: '/corporateInfor' })"
      >
        <template #icon>
          <i class="icon-company-profile"></i>
        </template>
        <template #title>
          公司资料
        </template>
        <template #right-icon>
          <i class="iconfont icon-direction_right font-size-12"></i>
        </template>
      </van-cell>
      <van-cell
        center
        @click="$router.push({ path: '/staffManage' })"
        v-if="baseInfo.companyId && baseInfo.staffType === 'manager'"
      >
        <template #icon>
          <i class="icon-enterprise"></i>
        </template>
        <template #title>
          员工管理
        </template>
        <template #right-icon>
          <i class="iconfont icon-direction_right font-size-12"></i>
        </template>
      </van-cell>
      <van-cell
        center
        v-if="!baseInfo.companyId"
        @click="$router.push({ path: '/acountSell' })"
      >
        <template #icon>
          <i class="icon-staff-management"></i>
        </template>
        <template #title>
          升级为企业用户
        </template>
        <template #right-icon>
          <i class="iconfont icon-direction_right font-size-12"></i>
        </template>
      </van-cell>
      <van-button type="danger" class="log-out" @click="logOut">
        退出
      </van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import request from "@/request";
import { NavBar, Cell, Button } from "vant";
Vue.use(NavBar)
  .use(Cell)
  .use(Button);

export default {
  computed: {
    ...mapState({
      baseInfo: state => state.base
    })
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    logOut() {
      request({
        method: "post",
        url: "/logout"
      }).finally(() => {
        localStorage.removeItem("hasCookie");
        Vue.prototype.hasCookie = localStorage.hasCookie;
        if (this.axios.prototype.isH5) {
          this.$router.replace("/passwordLogin");
        } else {
          const remenberUrl = location.href.split(".com")[1]
          if(remenberUrl) {
            localStorage.setItem("remenberUrl", remenberUrl);
          }
          this.$router.replace("/login");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.font-size-12 {
  font-size: 12px;
}
.icon-20 {
  display: inline-block;
  width: 20px;
  height: 20px;
}
.icon-account {
  &:extend(.icon-20);
  background: url("~@/assets/icons/icon-account.png") no-repeat;
  background-size: 100% 100%;
}
.icon-location {
  &:extend(.icon-20);
  background: url("~@/assets/icons/icon-location.png") no-repeat;
  background-size: 100% 100%;
}
.icon-company-profile {
  &:extend(.icon-20);
  background: url("~@/assets/icons/icon-company-profile.png") no-repeat;
  background-size: 100% 100%;
}
.icon-staff-management {
  &:extend(.icon-20);
  background: url("~@/assets/icons/icon-staff-management.png") no-repeat;
  background-size: 100% 100%;
}
.icon-enterprise {
  &:extend(.icon-20);
  background: url("~@/assets/icons/icon-enterprise.png") no-repeat;
  background-size: 100% 100%;
}
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  text-align: left;
  /deep/ .van-nav-bar .van-icon,
  /deep/ .van-nav-bar__text {
    color: #333333;
  }
  .layout-main {
    flex: 1;
    // margin: 12px;
    overflow-y: auto;
    position: relative;
    .van-cell {
      padding: 14px 12px;
      font-family: PingFangSC-Regular;
      .van-cell__title {
        margin-left: 8px;
      }
    }

    .log-out {
      position: absolute;
      left: 50%;
      bottom: 20px;
      transform: translateX(-50%);
      height: 34px;
      line-height: 34px;
    }
  }
}
</style>
