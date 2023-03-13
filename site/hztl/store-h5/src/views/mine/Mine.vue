<template>
  <div class="user">
    <div @click="verifyLogin()">
      <img class="personal-center-bg" :src="PersonalCenterBgImg" />
      <div class="user-body">
        <div class="user-personal">
          <img
            class="user-avatar"
            :src="hasCookie ? mallData.wechatAvatar || '' : UserAvatarImg"
            @error="defaultUserAvatarImg"
          />
          <div class="user-status" v-if="hasCookie">
            <div class="user-name">
              {{
                mallData.hasCompany
                  ? `${mallData.companyName}-${mallData.name}`
                  : mallData.name
              }}
            </div>
            <div class="user-grade">
              <i class="iconfont icon-crown"></i>
              <span class="user-grade-text">{{
                mallData.memberGradeName
              }}</span>
            </div>
          </div>
          <div class="user-status" v-else>
            <div>
              <span>登录</span>
              /
              <span>注册</span>
            </div>
          </div>
          <div
            class="iconfont icon-my_setting"
            v-if="hasCookie"
            @click="mineSetting"
          ></div>
        </div>
        <!-- 我的资产 -->
        <DpCard title="我的资产">
          <div class="card-list">
            <div class="card-cell">
              <i class="icon-vip-card"></i>
              <div>会员卡</div>
              <div class="cell-number">
                {{ hasCookie ? `${mallData.memberCardServiceCount}张` : "-" }}
              </div>
            </div>
            <div class="card-cell">
              <i class="icon-more"></i>
              <div>更多功能</div>
              <div class="cell-number">
                敬请期待
              </div>
            </div>
          </div>
        </DpCard>
        <!-- 导航列表 -->
        <div class="cell-list">
          <van-cell
            v-if="hasYX"
            center
            @click="$router.push({ path: '/maintenanceCentre' })"
          >
            <template #icon>
              <i class="icon-maintenance"></i>
            </template>
            <template #title>
              维保中心
            </template>
            <template #right-icon>
              <i class="iconfont icon-direction_right font-size-12"></i>
            </template>
          </van-cell>
          <van-cell
            center
            v-if="storeInfo.erpType === 1"
            @click="$router.push({ path: '/VerifyBills' })"
          >
            <template #icon>
              <i class="icon-reconciliation"></i>
            </template>
            <template #title>
              对账中心
            </template>
            <template #right-icon>
              <i class="iconfont icon-direction_right font-size-12"></i>
            </template>
          </van-cell>
        </div>
        <!-- 广告图 -->
        <div
          class="advertisement-img"
          v-if="advertisementVisible"
          @click="openAdvertising"
        >
          <img :src="AdvertisingImg" />
        </div>
      </div>
    </div>
    <TabbarComponentB />
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import { Cell, Icon, Tag, Toast } from "vant";
Vue.use(Cell)
  .use(Icon)
  .use(Tag)
  .use(Toast);
import TabbarComponentB from "../../../store-common/component/TabbarComponentB";
import DpCard from "@/components/DpCard/index.vue";
import PersonalCenterBgImg from "@/assets/mine/personal-center-bg.png";
import AdvertisingImg from "@/assets/mine/advertising.png";
import UserAvatarImg from "@/assets/mine/user-avatar.png";
import {
  getStoreInfo,
  getForMall,
  getOpenCompanies
} from "@/api/common.js";

export default {
  components: {
    TabbarComponentB,
    DpCard
  },
  data() {
    return {
      PersonalCenterBgImg,
      AdvertisingImg,
      UserAvatarImg,
      mallData: {},
      storeInfo: {},
      hasYX: false
    };
  },
  computed: {
    ...mapState({
      baseInfo: state => state.base
    }),
    // 当前用户的公司类型为‘修理厂、经销商、生产厂家’用户才展示，个人用户或其他公司类型则隐藏
    advertisementVisible() {
      let visible = false;
      const { companyId, companyType } = this.baseInfo;
      if (
        companyId &&
        ["garage", "dealer", "manufacturer"].includes(companyType)
      ) {
        visible = true;
      }
      return visible;
    }
  },
  methods: {
    defaultUserAvatarImg(event) {
      const img = event.srcElement;
      img.src = UserAvatarImg;
      img.onerror = null;
    },
    // 获取公司信息，公开访问
    getCompaniesType() {
      getOpenCompanies().then(res => {
        if (res && res.erp && res.erp.hasYX) {
          this.hasYX = true;
        }
      });
    },
    verifyLogin() {
      if (!this.hasCookie) {
        if (this.axios.prototype.isH5) {
          this.$router.push("/passwordLogin");
        } else {
          const remenberUrl = location.href.split(".com")[1];
          if (remenberUrl) {
            localStorage.setItem("remenberUrl", remenberUrl);
          }
          this.$router.push("/login");
        }
      }
    },
    mineSetting() {
      this.$router.push({ path: "/mineSetting" });
    },
    // 获取基础信息
    getStoreInfo() {
      getStoreInfo().then(res => {
        this.storeInfo = res || {};
      });
    },
    getForMall() {
      getForMall().then(res => {
        this.mallData = res || {};
      });
    },
    openAdvertising() {
      window.open("https://www.threesoft.cn/");
    }
  },
  created() {
    if (this.hasCookie) {
      this.getCompaniesType();
      this.getForMall();
      this.getStoreInfo();
    }
  }
};
</script>

<style lang="less" scoped>
.font-size-12 {
  font-size: 12px;
}
.icon-vip {
  // display: inline-block;
  display: table-cell;
  vertical-align: middle;
  width: 16px;
  height: 16px;
}
.icon-12 {
  display: inline-block;
  width: 12px;
  height: 12px;
}
.icon-vip-card {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url("~@/assets/icons/icon-vip-card.png") no-repeat;
  background-size: 100% 100%;
}
.icon-more {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url("~@/assets/icons/icon-more.png") no-repeat;
  background-size: 100% 100%;
}
.icon-maintenance {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("~@/assets/icons/icon-maintenance.png") no-repeat;
  background-size: 100% 100%;
}
.icon-reconciliation {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("~@/assets/icons/icon-reconciliation.png") no-repeat;
  background-size: 100% 100%;
}
.user {
  // font-family: PingFangSC-Semibold;
  font-size: 14px;
  min-height: calc(100vh - 50px);
  background: #f8f8f8;
  padding-bottom: 50px;
  overflow-y: auto;
  text-align: left;
  position: relative;
  .personal-center-bg {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .user-body {
    position: relative;
    z-index: 1;
    margin: 0 12px;
    .user-personal {
      padding: 20px 0;
      display: flex;
      align-items: center;
      color: #ffffff;
      .user-avatar {
        display: inline-block;
        width: 62px;
        height: 62px;
        border-radius: 50% 50%;
        background-color: coral;
      }
      .user-status {
        flex: 1;
        margin-left: 12px;
        .user-name {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 22px;
          font-size: 16px;
        }
        .user-grade {
          display: table;
          margin-top: 8px;
          padding: 0 8px;
          background-image: linear-gradient(224deg, #ffb12d 0%, #ff6e4c 100%);
          border-radius: 12px;
          .icon-member_v1_white {
            font-size: 16px;
          }
          .user-grade-text {
            margin-left: 4px;
            line-height: 20px;
          }
        }
      }
      .icon-my_setting {
        align-self: flex-start;
        font-size: 20px;
        // display: inline-block;
        // width: 20px;
        // height: 20px;
        // background: url("~@/assets/mine/icon-setting-white.png") no-repeat;
        // background-size: 100% 100%;
      }
    }
    .dp-card {
      margin-bottom: 8px;
      .card-header-after {
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        color: #999999;
        display: flex;
        align-items: center;
      }
      .card-list {
        margin-top: 12px;
        display: flex;
        .card-cell {
          flex: 1;
          text-align: center;
          .cell-title {
            line-height: 18px;
            font-size: 13px;
            font-weight: 700;
          }
          .cell-number {
            font-size: 16px;
            font-weight: 700;
          }
          .cell-line2 {
            margin-top: 4px;
            height: 36px;
            line-height: 18px;
            font-size: 13px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
      }
      .card-car {
        margin-top: 8px;
        display: flex;
        align-items: center;
        .card-car-img {
          display: inline-block;
          width: 52px;
          height: 52px;
          margin-right: 12px;
        }
        .card-car-number {
          font-size: 15px;
          font-weight: 700;
          color: #ff6e4c;
        }
      }
    }
    .cell-list {
      margin-bottom: 8px;
      border-radius: 8px;
      overflow: hidden;
      background-color: #ffffff;
      .van-cell {
        padding: 14px 12px;
        font-family: PingFangSC-Regular;
        .van-cell__title {
          margin-left: 8px;
        }
      }
    }
    .advertisement-img {
      width: 100%;
      margin-bottom: 8px;
      img {
        width: 100%;
        border-radius: 8px;
      }
    }
  }
}
</style>
