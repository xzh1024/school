<template>
  <div class="friend-issue">
    <div class="head-brand">
      <span class="backToHome" @click="backHome()"></span>
      <span class="word">个人信息</span>
      <a class="add-address" @click="finishEdit()">完成</a>
    </div>
    <div class="content">
      <div class="reciver">
        <span class="icon"></span>
        <span class="title">姓名：</span>
        <input type="text" v-model="nameInput" placeholder="请输入姓名">
      </div>
      <div class="person-phone">
        <span class="icon"></span>
        <span class="title">手机号：</span>
        <input type="text" v-model="phone" readonly>
      </div>
      <div class="area">
        <span class="icon"></span>
        <span class="title">所在地区：</span>
        <input type="text" v-model="areas" readonly>
      </div>
      <div class="inviter">
        <span class="icon"></span>
        <span class="title">我的推荐人：</span>
        <input type="text" v-model="promoterName" readonly>
      </div>
      <div class="invitation-code">
        <span class="icon"></span>
        <span class="title">我的推荐码：</span>
        <input type="text" v-model="promoteCode" readonly>
      </div>
      <div class="xiulichang-name" v-if="hasRepair">
        <span class="icon"></span>
        <span class="title">修理厂名称：</span>
        <input type="text" v-model="repairNameInput" placeholder="请输入修理厂名称">
      </div>
      <div class="xiulichang-address" v-if="hasRepair">
        <span class="icon"></span>
        <span class="title">修理厂地址：</span>
        <input type="text" v-model="repairAddressInput" placeholder="请输入修理厂地址">
      </div>
      <div class="xiulichang-phone" v-if="hasRepair">
        <span class="icon"></span>
        <span class="title">修理厂电话：</span>
        <input type="text" v-model="repairPhoneInput" placeholder="请输入修理厂电话">
      </div>
      <!-- <div class="to-be-xiulichang" v-if="!hasRepair" @click="toBeXiulichang">
        <van-button class="button" color="#00A8EA">我要成为修理厂</van-button>
      </div> -->
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Toast, Button } from 'vant';
import request from "@/request";

Vue.use(Toast).use(Button);
export default {
  name:"infomation",
  data(){
    return{
      id: "",
      name: "",
      phone: "",
      areas: "",
      nameInput:"",
      promoterName:"",
      promoteCode:"",
      hasRepair:false,
      repairName:"",
      repairAddress:"",
      repairPhone:"",
      repairNameInput:"",
      repairAddressInput:"",
      repairPhoneInput:""
    }
  },
  methods:{
    backHome(){
      this.$router.push("/mine");
    },
    finishEdit(){
      let _this = this;
      if(_this.name != _this.nameInput){
        let fd = new FormData()
        fd.append("name",_this.nameInput)
        request({
          method:"post",
          url:"/profile",
          data:fd
        }).catch(err => {
          if(err && err.message) {
            Toast.fail(err.message);
          }
        })
      }
      if (_this.repairName != _this.repairNameInput || _this.repairAddress != _this.repairAddressInput || _this.repairPhone != _this.repairPhoneInput){
        let data = {
          repairName:_this.repairNameInput,
          repairAddress:_this.repairAddressInput,
          repairPhone:_this.repairPhoneInput
        }
        request({
          method:"put",
          url:"/for-mall",
          data:data
        }).catch(err => {
          if(err && err.message) {
            Toast.fail(err.message);
          }
        })
      }
      _this.$router.push("/mine");
    },
    toBeXiulichang(){
      this.hasRepair=true;
    }
  },
  mounted:function(){
    let _this = this;
    request({
      url: "/profile"
    }).then(res => {
      _this.name = res.name;
      _this.phone = res.phone;
      _this.areas = res.areas;
      _this.nameInput = res.name;
      _this.promoterName = res.promoterName;
      _this.promoteCode = res.promoteCode;
      _this.hasRepair = res.hasRepair? res.hasRepair : false;
      _this.repairName = res.repairName;
      _this.repairAddress = res.repairAddress;
      _this.repairPhone = res.repairPhone;
      _this.repairNameInput = res.repairName;
      _this.repairAddressInput = res.repairAddress;
      _this.repairPhoneInput = res.repairPhone;
    })
  }
}
</script>
<style lang="less" scoped>
  .friend-issue{
    width:375px;
    overflow: hidden;
    min-height: 100%;
    background: #FFFFFF;
    min-height: 100%;
    .head-brand{
      background: #FFFFFF;
      height: 44px;
      position: fixed;
      width: 100%;
      top: 0;
      z-index:1;
      .backToHome{
        float: left;
        width: 8px;
        height: 14px;
        background-image: url("../../../assets/back-icon.png");
        background-size: 100% 100%;
        margin: 15px 0 0 16px;
      }
      .word{
        font-size: 16px;
        letter-spacing: -0.36px;
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
    .content{
      width: 343px;
      margin: 44px auto 0;
      font-size: 14px;
      div{
        border-bottom:1px solid #EDEFF1;
        .icon{
          display: inline-block;
          width: 18px;
          height: 18px; 
          margin: 17px 6px 0 0;
        }
        span{
          float: left;
        }
        input{
          float: left;
          margin-top: 16px;
          color: #171C24;
          letter-spacing: -0.34px;
          height: 20px;
          padding: 0;
          border: 0;
          width:200px;
        }
        .title{
          color: #777B87;
          line-height: 52px;
        }
      }
      .reciver{
        height: 52px;
        .icon{
          background-image: url("../../../assets/reciver-icon.png");
          background-size: 100% 100%;
        }
      }
      .person-phone{
        height: 52px;
        .icon{
          background-image: url("../../../assets/reciver-phone-icon.png");
          background-size: 100% 100%;
        }
      }
      .area{
        height: 52px;
        .icon{
          background-image: url("../../../assets/address-icon.png");
          background-size: 100% 100%;
        }
        input{
          width:221px;
          cursor: pointer;
        }
        .to-chose-address{
          float: right;
          width: 28px;
          height: 28px;
          background-image: url("../../../assets/address-edit.png");
          background-size: 100% 100%;
          margin-top: 12px;
          cursor: pointer;
        }
      }
      .xiulichang-name{
        height: 52px;
        .icon{
          background-image: url("../../../assets/icon-xiulichang-colorful.png");
          background-size: 100% 100%;
        }
      }
      .xiulichang-address{
        height: 52px;
        .icon{
          background-image: url("../../../assets/address-icon.png");
          background-size: 100% 100%;
        }
      }
      .xiulichang-phone{
        height: 52px;
        .icon{
          background-image: url("../../../assets/reciver-phone-icon.png");
          background-size: 100% 100%;
        }
      }
      .inviter{
        height: 52px;
        .icon{
          background-image: url("../../../assets/icon-inviter-colorful.png");
          background-size: 100% 100%;
        }
      }
      .invitation-code{
        height: 52px;
        .icon{
          background-image: url("../../../assets/icon-invitation-code-colorful.png");
          background-size: 100% 100%;
        }
      }
      .to-be-xiulichang{
        border-bottom: none;
        margin-top: 30px;
        .button{
          width: 100%;
        }
        /deep/ .van-button__text{
          float: none;
        }
      }
    }
  }
</style>
