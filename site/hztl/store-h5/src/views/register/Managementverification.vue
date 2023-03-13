<template>
    <div class="complete-repeat">
        <van-nav-bar title="完善资料"  right-text="" left-arrow @click-left="onClickLeft">
            <img src="../../assets/back-icon.png" slot="left" class="Back">
        </van-nav-bar>
            <div class="add-item noboder">
                <span class="add-item-tips">您填写的统一社会信用代码当前已被【{{repeatCompanyName}}】注册，
                    需填写验证码，验证码短信将会发送到该公司管理员 {{managerPhone}}手机中，请索取后填写。</span>
            </div>
            <div class="add-item">
                <img class="add-item-img" src="../../assets/icon-Verificationcode.png">
                <input  class="add-item-input" v-model="verificationcode" type="text" placeholder="请输入短信验证码">
                <span class="add-replay" id="btn" @click="getverificationcode">{{verificationMsg}}</span>
            </div>
            <div class="Tobutton" @click="next">确认</div>
        </div>
</template>
<script>
import Vue from 'vue'
import { NavBar,Toast} from 'vant';
import request from "@/request";
Vue.use(NavBar).use(Toast);
export default {
    name:"Managementverification",
    data(){
        return{
            repeatCompanyName:'',
            managerPhone:'',
            verificationcode:'',
            verificationMsg:'获取验证码',
            param:[],
            isSell:false,
            corporateInfor:false
        }
    },
    created(){
        this.param=this.$route.params.param;
        this.repeatCompanyName=this.$route.params.repeatCompanyName;
        this.managerPhone=this.$route.params.managerPhone;
        if(this.$route.params.isSell){
            this.isSell=this.$route.params.isSell;
        }
        if(this.$route.params.corporateInfor){
            this.corporateInfor=this.$route.params.corporateInfor;
        }
    },
    methods:{
        getverificationcode:function(){ //获取验证码
            let _this=this;           
            request({
                method: "post",
                url: '/captchas/sms?phone='+_this.managerPhone+'&status=bizCodeCheck'
            }).then(() => {
                _this.total = 60;
                _this.timekeeping();
            }).catch(err => {
                if(err && err.message) {
                    Toast.fail(err.message)
                }
            })        
        },
        onClickLeft:function(){
            this.$router.go(-1);
        },
        timekeeping:function(){
            $('#btn').attr("disabled", true);
            $('#btn').addClass("disabled");
            let _this=this;
            var interval=setInterval(function(){
                _this.verificationMsg='请等待'+_this.total+'秒'
                _this.total--;
                if(_this.total==0||isNaN(_this.total)){
                    //清除定时器
                    $('#btn').removeClass("disabled");
                    clearInterval(interval);
                    _this.verificationMsg="重新发送"
                    $('#btn').attr("disabled", false);
                }
            },1000);
        },
        next:function(){
            this.param.bizCode= {                                  
                managerPhone: this.managerPhone,              // 第一次使用该社会信用代码的公司的管理员手机号
                smscaptcha: this.verificationcode,                     // 手机短息验证码
            }
            let _this=this;
            let url;
            if(this.isSell){    //是否我要卖货
                url="/companies"
            }else{
                url="/offiaccount/quickly-register"
            }
            request({
                method: "post",
                url,
                data: this.param
            }).then(() => {
                if(_this.corporateInfor){
                    Toast.success("保存成功！")
                    _this.$router.push('corporateInfor') 
                }else{
                    Toast.success("注册成功！")
                    if(localStorage.getItem("remenberUrl")){
                        this.$router.push(localStorage.getItem("remenberUrl"));
                        localStorage.removeItem("remenberUrl")
                    }else{
                        this.$router.push("/home");
                    }
                }
            }).catch(err => {
                if(err && err.message) {
                    Toast.success(err.message)
                }
            })
        }
    }
}
</script>
<style lang="less">
.complete-repeat{
        width: 343px;
        margin: 0 16px;
        background: #FFFFFF;
        .noboder{
            border-bottom: none !important; 
        }
        .add-item{
            height: 52px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-bottom: 0.5px solid #EDEFF1;
            &:nth-child(2){
                margin: 16px 0 32px 0;
            }
            .add-item-img{
                width: 18px;
                height: 18px;
            }
            .add-item-input{
                font-size: 14px;
                color: #CCCED4;
                margin-left: 6px;
                width: 200px;
            }
            .add-replay{
                font-size: 14px;
                color: #21BDC2;
                letter-spacing: -0.34px;
                margin-left: auto;
            }
            .disabled{
                color: #777B87;
            }
            .add-item-tips{
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                color: #777B87;
                letter-spacing: -0.34px;
                text-align: left
            }           
        }
        .Tobutton{
            background: #00a8ea;
            border-radius: 8px;
            width: 343px;
            height: 44px;
            font-size: 16px;
            color: #FFFFFF;
            letter-spacing: -0.38px;
            text-align: center;
            line-height: 44px;
            position: relative;
            bottom: -150px;
        }
    }
</style>


