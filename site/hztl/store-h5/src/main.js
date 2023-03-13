import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/iconfont/iconfont.css";
import "vant/lib/index.less";
import "amfe-flexible/index.js";

Vue.prototype.axios = axios;
Vue.config.productionTip = false;

Vue.prototype.env =
  process.env.NODE_ENV == "development" ? "development" : "production";

// 有登陆跳转，未登陆跳转登陆页
Vue.prototype.routerPushWithLogin = function(obj) {
  //   if (this.hasCookie) {
  this.$router.push(obj);
  //   } else {
  //     if (axios.prototype.isH5) {
  //       this.$router.push("/passwordLogin");
  //     } else {
  //       localStorage.setItem("remenberUrl", location.href.split(".com")[1]);
  //       this.$router.push("/login");
  //     }
  //   }
};

Vue.prototype.unlogin = function(obj) {
  if (!this.hasCookie) {
    if (axios.prototype.isH5) {
      this.$router.push("/passwordLogin");
    } else {
      this.$router.push("/login");
    }
  }
};
// 历史返回
Vue.prototype.historyBack = function(num) {
  if (window.history.length <= 1) {
    this.$router.push("/home");
  } else {
    this.$router.go(num);
  }
};

//提取出来的公共方法
/*
 * 判断是否IOS环境
 * */
export function isIOS() {
  let isIphone = navigator.userAgent.includes("iPhone");
  let isIpad = navigator.userAgent.includes("iPad");
  return isIphone || isIpad;
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

var beginTime = 0; //执行onbeforeunload的开始时间
var differTime = 0; //时间差
window.onunload = function() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--; ) {
      if (process.env.NODE_ENV == "development") {
        document.cookie =
          keys[i] +
          "=0;domain=.api-qa.hztl3.com;path=/;expires=" +
          new Date(0).toUTCString(); //清除当前域名下的
      } else if (process.env.NODE_ENV == "production") {
        document.cookie =
          keys[i] +
          "=0;domain=" +
          location.href.split(".com")[0] +
          ";path=/;expires=" +
          new Date(0).toUTCString(); //清除当前域名下的
      }
    }
  }
};
window.onbeforeunload = function() {
  beginTime = new Date().getTime();
};
