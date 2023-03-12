<template>
  <div class="friend-issue">
    <div class="head-brand">
      <span class="backToHome" @click="backHome()"></span>
      <span class="head_title">动态详情</span>
    </div>
    <div class="content">
      <p>{{info.content}}</p>
      <img v-for="(item,index) in info.pictures" :key="index" :src="item" class="friendDetailImg" 
        style="display: inline-block; width: 9.15rem; height: 9.15rem; margin-top: 0.43rem;">
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import request from "@/request";
import { Toast } from 'vant';
Vue.use(Toast);

export default {
  name:"friendDetail",
  data(){
    return{
      info: {},
      id: 0
    }
  },
  mounted:function(){
    let id = window.location.href.split("?")[1];
    this.id = id;
    request({
      url:"/offiaccount/moments/" + this.id,
    }).then(res => {
      this.info = res;
    }).catch(err => {
      if(err && err.message) {
        Toast.fail(err.message);
      }
    })
  },
  methods:{
    backHome(){
      this.$router.push("friendCircle");
    }
  }
}
</script>
<style lang="less" scoped>
  .friend-issue{
    width:375px;
    overflow: hidden;
    min-height: 100%;
    background: #FFFFFF;
    .head-brand{
      background-image: url("../img/head-bac.png");
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
        background-image: url("../img/back-icon.png");
        background-size: 100% 100%;
        margin: 15px 0 0 16px;
      }
      .add-address{
        font-size: 16px;
        color: #21BDC2;;
        letter-spacing: -0.36px;
        text-align: right;
        float: right;
        margin: 11px 14px 0 0;
      }
      .head_title{
        font-size: 16px;
        font-weight: 500;
        line-height: 44px;
      }
    }
    .content{
      margin: 44px 0 0 0;
      overflow: hidden;
      p{
        margin: 16px auto 20px;
        width: 343px;
        font-size: 14px;
        color: #1A2231;
        letter-spacing: -0.34px;
        text-align: left;
      }
    }
  }
</style>
