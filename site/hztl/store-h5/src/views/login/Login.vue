<template></template>

<script>
import Vue from "vue";
import * as envConfig from "envConfigPath";
import request from "@/request";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  name: "login",
  methods: {
    getImpower(code, state) {
      request({
        method: "post",
        url: `/offiaccount/auth?code=${code}&state=${state}`
      }).then(async (res) => {
        if (!res.binded) {
          this.$router.push({
            path: "/bindPhone",
            query: {
              allianceId: res.allianceId,
              openId: res.openId,
            }
          });
        } else {
          localStorage.hasCookie = "ok";
          this.$store.dispatch("getForMall");
          this.$store.dispatch("getBase");
          if (localStorage.getItem("remenberUrl")) {
            this.$router.push(localStorage.getItem("remenberUrl"));
            localStorage.removeItem("remenberUrl");
          } else {
            this.$router.push("/home");
          }
        }
      }).catch(() => {
        this.$router.push("/error");
      });
    }
  },
  mounted() {
    let wxUrl = window.location.href;
    let that = this;
    if (wxUrl.indexOf("?") != -1) {
      let param = wxUrl.split("?")[1];
      let paramList = param.split("&");
      let state = "";
      let code = "";
      for (let item of paramList) {
        if (item.indexOf("code=") != -1) {
          code = item.split("code=")[1];
        } else {
          state = item.split("state=")[1];
        }
      }
      this.getImpower(code, state);
    } else {
      request({
        method: "post",
        url: "/offiaccount/auth/url",
        data: {
          redirectUrl: `${envConfig.urlPrefix}/login`,
          loginUrl: `${envConfig.urlPrefix}/phone`,
          indexUrl: `${envConfig.urlPrefix}/home`,
          errUrl: `${envConfig.urlPrefix}/error`
        }
      }).then(res => {
        window.location.href = res;
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
