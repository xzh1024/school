<template>
  <div id="Login">
    <div class="add-con">
      <div class="add-item">
        <img class="add-item-img" src="../../assets/icon-iPhone.png" />
        <input
          class="add-item-input"
          v-model="tel"
          type="tel"
          placeholder="请输入您的手机号"
          maxlength="11"
        />
      </div>
      <div class="add-item">
        <img class="add-item-img" src="../../assets/icon-password.png" />
        <input
          class="add-item-input"
          type="password"
          id="password"
          v-model="password"
          placeholder="请输入密码"
        />
        <van-icon @click="changeEye" :name="name" size="16" color="#777B87" />
      </div>
      <div class="register-wrap">
        <span class="add-item-tips" @click="register">去注册</span>
      </div>
      <div class="Tobutton" @click="login">登录</div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Row, Col, Popup, Toast, Icon } from "vant";
import request from "@/request";
import $ from "jquery";
Vue.use(NavBar)
  .use(Row)
  .use(Col)
  .use(Popup)
  .use(Toast)
  .use(Icon);
import { post } from "../../request/http";
export default {
  name: "Login",
  data() {
    return {
      tel: "",
      password: "",
      name: "closed-eye"
    };
  },
  created() {
    localStorage.removeItem("userInfo");
  },
  methods: {
    register() {
      this.$router.push("BindPhone");
    },
    async login() {
      var _this = this;
      request({
        method: "post",
        url: `/password-login?phone=${this.tel}&password=${
          this.password
        }&onlineMall=true&type=3`
      })
        .then(resp => {
          localStorage.hasCookie = JSON.stringify(resp);
          this.$store.dispatch("getForMall");
          this.$store.dispatch("getBase");
          request({
            url: "/base"
          }).then(res => {
            this.$store.commit("setBase", res);
            let obj = JSON.stringify(res);
            localStorage.setItem("userInfo", obj);
            if (localStorage.getItem("remenberUrl")) {
              _this.$router.push(localStorage.getItem("remenberUrl"));
              localStorage.removeItem("remenberUrl");
            } else {
              _this.$router.replace("/home");
            }
          }).catch(err => {
            if(err && err.message) {
              Toast.fail(err.message);
            }
          });
        })
        .catch(err => {
          Toast.fail(err);
        });
    },
    changeEye() {
      if (this.name == "closed-eye") {
        this.name = "eye-o";
        $("#password").prop("type", "text");
      } else {
        this.name = "closed-eye";
        $("#password").prop("type", "password");
      }
    }
  }
};
</script>
<style lang="less" scoped>
#Login {
  font-family: PingFang-SC-Regular;
  min-height: 100vh;
  background: #ffffff;
  .add-con {
    width: 343px;
    margin: 0 16px;
    .noboder {
      border-bottom: none !important;
    }
    .register-wrap {
      height: 52px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .add-item-tips {
        display: inline-block;
        font-size: 14px;
        color: #21bdc2;
      }
    }
    .add-item {
      height: 52px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 0.5px solid #edeff1;
      .add-item-img {
        width: 18px;
        height: 18px;
      }
      .add-item-input {
        font-size: 14px;
        color: #1a2231;
        margin-left: 6px;
        width: 290px;
        border: 0;
      }
      .add-replay {
        font-size: 14px;
        color: #21bdc2;
        letter-spacing: -0.34px;
        margin-left: auto;
      }
      .disabled {
        color: #777b87;
      }
    }
    .Tobutton {
      background: #21bdc2;
      border-radius: 8px;
      width: 343px;
      height: 44px;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: -0.38px;
      text-align: center;
      line-height: 44px;
      position: relative;
    }
  }
}
</style>
