<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  created() {
    this.$store.dispatch("getStoreInfo");
    if(Vue.prototype.hasCookie) {
      this.$store.dispatch("getForMall");
      this.$store.dispatch("getBase");
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: "font-family: PingFangSC-Semibold";
  margin:0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.back-icon,.Back {
  width: 8px;
  height: 14px;
}
.icon-18{
  width: 18px;
  height: 18px;
}
.phone{
  position: fixed;
  right:15px;
  bottom:80px;
} 
.tabbar{
  background: #fcfcfc;
}
// @font-face {
//   //下载阿里巴巴自体库
//   font-family: 'iconfont';
//   src: url('./assets/iconfont.ttf?t=1572862200437') format('truetype'), ;
// }
.head-brand{
  background-image: url("./assets/head-bac.png");
  background-size: 100% 100%;
  height: 44px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index:1;
  .backToHome{
    float: left;
    width: 8px;
    height: 14px;
    background-image: url("./assets/back-icon.png");
    background-size: 100% 100%;
    margin: 15px 0 0 16px;
  }
  .word{
    font-size: 16px;
    letter-spacing: -0.36px;
    margin:11px 0 0 3px;
    float: left;
  }
  img{
    float: right;
    width:24px;
    height:24px;
    border-radius: 50%;
    margin: 10px 16px 0 0;
  }
  .add-address{
    font-size: 16px;
    color: #00A8EA;;
    letter-spacing: -0.36px;
    text-align: right;
    float: right;
    margin: 11px 14px 0 0;
  }
}
.van-toast,.van-overlay{
  background-color: rgba(25,29,54,0.54)!important;
}
.back-icon{
    width:8px; 
    height:14px;
}
input{
  caret-color: #171C24;
}
input,textarea {
  caret-color: #00a8ea;
  border: none;
}
input,textarea {
  -webkit-appearance: none;
  -webkit-box-sizing: border-box;//谷歌浏览器
  -moz-box-sizing: border-box;//火狐浏览器
  box-sizing: border-box;//其它浏览器
}
.van-search__content{
  input::-webkit-input-placeholder{
    padding-top: 2px;
    line-height: normal;
  }
}
input::-webkit-input-placeholder,textarea::-webkit-input-placeholder {
  font-weight: lighter;
  font-size: 14px;
  line-height: 14px;
  color: #ccced4;
  letter-spacing: -0.34px;
  vertical-align: middle;
}
input::-moz-placeholder,textarea::-moz-placeholder  {
  /* Mozilla Firefox 19+ */
  font-weight: lighter;
  font-size: 14px;
  color: #ccced4;
  letter-spacing: -0.34px;
  vertical-align: middle;
}
input:-moz-placeholder,textarea::-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-weight: lighter;
  font-size: 14px;
  color: #ccced4;
  letter-spacing: -0.34px;
  vertical-align: middle;
}
input:-ms-input-placeholder,textarea::-ms-input-placeholder  {
  /* Internet Explorer 10-11 */
  font-weight: lighter;
  font-size: 14px;
  color: #ccced4;
  letter-spacing: -0.34px;
  vertical-align: middle;
}
input{
  border: 0;
  text-indent:6px
}
// .van-tabbar-item{
//     color: #777B87 !important;
// }
.van-nav-bar__text{
  color: #333333;
}
.van-nav-bar .van-icon{
  color: #333333;
}
.navbar-back{
  font-size: 16px !important;
}
.van-icon-clear:before {
    color:#00a8ea;
}
// .van-tabbar-item--active{
//     font-size: 12px !important;
//     color: #00a8ea !important;
// }
.van-uploader__preview-delete{
  color: #00a8ea !important;
}
.van-dialog__confirm, .van-dialog__confirm:active {
    color: #00a8ea !important;
}
img[src=""],img:not([src]){  
  opacity:0;
}
</style>
