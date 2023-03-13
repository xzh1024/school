<template>
  <div class="account">
    <van-nav-bar left-text="" right-text="" @click-left="historyBack(-1)">
      <img src="../../../assets/back-icon.png" slot="left" class="back-icon" />
    </van-nav-bar>
    <div class="acount-content">
      <div class="content-item">
        <img class="content-item-img" src="../../../assets/icon-telphone.png" />
        <span class="content-item-title">手机号码</span>
        <span class="content-item-msg">{{ phone }}</span>
      </div>
      <div class="content-item">
        <img class="content-item-img" src="../../../assets/icon-weixin.png" />
        <span class="content-item-title">微信</span>
        <span class="content-item-msg">{{ wechatNickname }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Cell, CellGroup, NavBar, Toast } from "vant";
import request from "@/request";
Vue.use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Toast);
export default {
  name: "account",
  data() {
    return {
      wechatNickname: "",
      phone: ""
    };
  },
  created() {
    this.load();
  },
  methods: {
    load: function() {
      request({
        url: "/profile"
      })
        .then(res => {
          this.phone = res.phone;
          this.wechatNickname = res.wechatNickname;
        })
        .catch(err => {
          if (err && err.message) {
            Toast.fail(err.message);
          }
        });
    }
  }
};
</script>
<style lang="less">
.account {
  font-family: PingFang-SC-Medium;
  background: #ffffff;
  .acount-content {
    .content-item {
      margin: 0 16px;
      height: 52px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 0.5px solid #edeff1;
      .content-item-img {
        width: 24px;
        height: 24px;
      }
      .content-item-title {
        font-size: 16px;
        color: #171c24;
        letter-spacing: 0.46px;
        margin-left: 10px;
      }
      .content-item-msg {
        margin-left: auto;
        font-size: 12px;
        color: #aaacb7;
        letter-spacing: 0.34px;
        text-align: right;
      }
    }
  }
}
</style>
