import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueI18n from 'vue-i18n'

Vue.use(VueI18n) // 通过插件的形式挂载

const i18n = new VueI18n({
  locale: 'zh-CN',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    // 'zh-CN': require('./common/lang/zh'),   // 中文语言包
    'zh-CN': {
        music: '网易云音乐',
        findMusic: '发现音乐',
        myMusic: '我的音乐',
        friend: '朋友',
        musician: '音乐人',
        download: '下载客户端'
    },
    // 'en-US': require('./common/lang/en')    // 英文语言包
    'en-US': { 
        music: 'Music',//网易云音乐
        findMusic: 'FIND MUSIC',//发现音乐
        myMusic: 'MY MUSIC',//我的音乐
        friend: 'FRIEND',//朋友
        musician: 'MUSICIAN',//音乐人
        download: 'DOWNLOAD'//下载客户端
    }
  }
})

Vue.config.productionTip = false;

new Vue({
  i18n,  // 不要忘记
  router,
  store,
  render: h => h(App)
}).$mount("#app");
