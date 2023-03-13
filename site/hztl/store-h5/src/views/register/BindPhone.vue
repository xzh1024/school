<template>
    <div class="phone-con">
        <!-- <van-nav-bar right-text="" left-arrow @click-left="onClickLeft">
            <img src="../../assets/back-icon.png" slot="left" class="back-icon">
        </van-nav-bar> -->
        <div class="add-con">
            <div class="add-item">
                <img class="add-item-img" src="../../assets/icon-iPhone.png">
                <input class="add-item-input" v-model="tel" type="tel" placeholder="请输入绑定的手机号" maxlength="11">
            </div>
            <div class="add-item">
                <img class="add-item-img" src="../../assets/icon-Verificationcode.png">
                <input  class="add-item-input" v-model="verificationcode" type="text" placeholder="请输入短信验证码" maxlength="6">
                <span class="add-replay" id="btn" @click="getverificationcode">{{verificationMsg}}</span>
            </div>
            <!-- <div class="add-item">
                <img class="add-item-img" src="../../assets/icon-invitation.png">
                <input class="add-item-input" v-model="promoteCode" type="promoteCode" placeholder="请输入推荐码">
            </div> -->
            <!-- <div class="add-item noboder" v-if="!axios.prototype.isH5">
                <span class="add-item-tips">* 若您已经在通联注册账号，可直接绑定该账号</span>
            </div> -->
            <div class="Tobutton" @click="next">下一步</div>
        </div>
        
    </div>
    
</template>
<script>
import Vue from 'vue'
import { NavBar,Row, Col,Popup,Checkbox,CheckboxGroup,Toast} from 'vant';
import axios from 'axios';
import request from "@/request";
import $ from 'jquery';
Vue.use(NavBar).use(Row).use(Col).use(Popup).use(Checkbox).use(Toast).use(CheckboxGroup)
export default {
    name:"bindPhone",
    data(){
        return{
            verificationcode:'',
            verificationMsg:'获取验证码',
            tel:'',
            promoteCode: '',
            total:0
        }
    },
    methods:{
        onClickLeft:function(){         //返回
            this.historyBack(-1);
        },
        getverificationcode:function(){ //获取验证码
            if($('#btn').hasClass("disabled")){
                return
            }
            let _this=this;
            if(_this.tel===""){
                Toast.fail("手机号不能为空！")
            }else if(!(/^1[3456789]\d{9}$/.test(_this.tel))){
                Toast.fail("手机号码有误，请重填!")
            }else{
                let status="&status=offiaccountBind";
                if(axios.prototype.isH5){
                    status="&status=register";
                }
                request({
                    method: "post",
                    url: '/captchas/sms?phone='+_this.tel+status
                }).then(() => {
                    _this.total = 60;
                    _this.timekeeping();
                }).catch(err => {
                    if(err && err.message) {
                        Toast.fail(err.message)
                    }
                })
            }
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
            const { allianceId, openId } = this.$route.query;
            if(this.tel=="")
                Toast.fail("手机号不能为空！")
            else if(this.verificationcode=="")  
                Toast.fail("验证码不能为空！")
            else{
                if(axios.prototype.isH5){
                    this.$router.push({name:'bindInfomation',params:{tel:this.tel,allianceId:allianceId,smsCaptcha:this.verificationcode}})
                }else{
                    let param={
                        phone: this.tel,                       // 手机号
                        smsCaptcha: this.verificationcode,                      // 短信验证码（测试环境000000）
                        allianceId: Number(allianceId.trim()),                        // 重定向地址中所带的allianceId
                        openId: openId,                     // 重定向地址中所带的openId
                        domain: window.location.host,
                        promoteCode: this.promoteCode
                    }
                    request({
                        method: "post",
                        url: '/offiaccount/bind',
                        data: param
                    }).then(res => {         //微信授权
                        if(res.ok) {
                            localStorage.hasCookie = "ok";
                            this.$store.dispatch("getForMall");
                            this.$store.dispatch("getBase");
                            if(localStorage.getItem("remenberUrl")) {
                                this.$router.push(localStorage.getItem("remenberUrl"));
                                localStorage.removeItem("remenberUrl")
                            } else {
                                this.$router.push("/home");
                            }
                        } else {
                            this.$router.push({
                                name: 'bindInfomation',
                                params: {
                                    tel:this.tel,
                                    allianceId:allianceId,
                                    openId:openId,
                                    promoteCode:this.promoteCode
                                }
                            })
                        }
                    }).catch(err => {
                        if(err && err.message) {
                            Toast.success(err.message)
                        }
                    })
                }
            } 
        }
    }
}
</script>
<style lang="less">
input::-webkit-input-placeholder{
    font-size: 14px;
    color: #CCCED4;
    letter-spacing: -0.34px;
    }
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    font-size: 14px;
    color: #CCCED4;
    letter-spacing: -0.34px;
    }　　
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    font-size: 14px;
    color: #CCCED4;
    letter-spacing: -0.34px;
    }
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
    font-size: 14px;
    color: #CCCED4;
    letter-spacing: -0.34px;
    }
.phone-con{
    font-family: PingFang-SC-Regular;
    min-height: 100vh;
    background: #FFFFFF;
    .add-con{
        width: 343px;
        margin: 0 16px;
        .noboder{
            border-bottom: none !important; 
        }
        .add-item{
            height: 52px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-bottom: 0.5px solid #EDEFF1;
            .add-item-img{
                width: 18px;
                height: 18px;
            }
            .add-item-input{
                font-size: 14px;
                color: #171C24;
                margin-left: 6px;
                width: 200px;
                border:0
            }
            .add-replay{
                font-size: 14px;
                color: #00A8EA;
                letter-spacing: -0.34px;
                margin-left: auto;
            }
            .disabled{
                color: #777B87;
            }
            .add-item-tips{
                font-size: 12px;
                color: #AAACB7;
                letter-spacing: -0.29px;
            }           
        }
        .Tobutton{
            margin-top: 16px;
            background: #00A8EA;
            border-radius: 8px;
            width: 343px;
            height: 44px;
            font-size: 16px;
            color: #FFFFFF;
            letter-spacing: -0.38px;
            text-align: center;
            line-height: 44px;
            position: relative;
        }
    }
}

</style>


