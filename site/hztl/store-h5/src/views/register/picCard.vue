<template>
    <div id="picCard">
        <div class="comeback">
            <img src="../../assets/back-icon.png" @click="Goback" class="back-icon">
            <span v-if="type=='paymentCodePic'">商家收款信息</span>
            <span v-if="type=='businessCard'">企业名片</span>
        </div>
        <div class="provider_con">
            <div class="providerItem">
                <div class="provider-company">
                </div>
                <div class="provider-pic">
                    <img :src="url" >
                    <van-uploader  v-if="isManager" :before-read="beforeRead" :after-read="afterRead">
                        <div class="provider-pic-bottom">
                            <span v-if="url==defaultUrl" class="upload-btn">上传图片</span>
                            <span v-else class="upload-btn">重新上传</span>
                        </div>
                    </van-uploader>
                </div>
            </div>
        </div>
        <van-overlay :show="show">
            <van-loading size="24px" class="load-center" color="#ffffff">图片上传中...</van-loading>
        </van-overlay>
    </div>
</template>

<script>
import Vue from "vue";
import { Toast,Uploader,Overlay,Loading} from "vant";
Vue.use(Toast).use(Uploader).use(Overlay).use(Loading)
import { GetQueryString } from '../../request/http';
import request, { URL_MODULE } from "@/request";
import * as qiniu from "qiniu-js";
export default {
    name:"picCard",
    data(){
        return{
            defaultUrl:require('../../assets/payment-default.png'),
            url:'',
            id:'',
            type:'',
            show:false,
            formData:{},
            isManager:true
        }
    },
    created(){
        this.id=GetQueryString('id');
        this.type=GetQueryString('type');
        this.load();
    },
    methods:{
        Goback(){
            this.$router.go(-1);
        },
        load(){
            if(!GetQueryString('register')){
                request({
                    url: '/companies'
                })
                .then(res => {
                    this.formData=res
                    if(this.type=='paymentCodePic'&&res&&res.paymentCode&&res.paymentCode!=''){
                        this.url=res.paymentCode;
                    }else if(this.type=='businessCard'&&res&&res.businessCard&&res.businessCard!=''){
                        this.url=res.businessCard;
                    }else{
                        this.url=this.defaultUrl;
                    }
                })
                .catch(err => {
                    if(err && err.message){
                        Toast.fail(err.message);
                    }
                    this.url=this.defaultUrl;
                })
            }else{
                this.url=this.defaultUrl;
            }
            // get('/base').then((res)=>{
            //     if(res.staffType=="manager"||!res.companyId){
            //         this.isManager=true;
            //     }
            // })
            // .catch((err)=>{
            //     Toast.fail(err);
            // })
        },
        afterRead(file){
            this.url=file.content;
        },
        beforeRead(file) {
            this.show=true;
            let that = this;
            return new Promise((resolve, reject) => {
                if (file.length > 1) {
                    this.show=false;
                    Toast.fail("只能上传1张图片");
                    reject();
                } else {
                    this.getToken(file).then(picUrl => {
                    if (!picUrl) {
                        reject();
                    } else {
                        this.save(picUrl);
                        this.show=false;
                        resolve();
                    }
                    }).catch((error)=>{
                        this.show=false;
                        Toast.fail("图片上传失败！")
                    });
                }
            });
        },
        getToken(file) {
            //获取七牛的上传图片token
            return new Promise(resolve => {
                $.ajax({
                type: "get",
                url: URL_MODULE.accounts + "/img/upToken",
                async: false,
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    if (data.code == "ok") {
                    let sendData = data.data;

                    let observer = {
                        error(err) {
                        resolve(false);
                        },
                        complete(res) {
                        if (res && res.key) {
                            resolve(sendData.url);
                        } else {
                            resolve(false);
                        }
                        }
                    };
                    let putExtra = {
                        fname: file.name,
                        params: {},
                        mimeType: ["image/png", "image/jpeg", "image/jpg"]
                    };
                    let config = {
                        useCdnDomain: true,
                        region: "z1"
                    };
                    let observable = qiniu.upload(
                        file,
                        sendData.key,
                        sendData.token,
                        putExtra
                        // config
                    );
                    let subscription = observable.subscribe(observer);
                    } else {
                        Toast.fail(data.message);
                    }
                }
                });
            });
        },
        save(url){
            let params={};
            if(this.type=='paymentCodePic'){
                sessionStorage.setItem('paymentCodePic',url);
            }else if(this.type=='businessCard'){
                sessionStorage.setItem('businessCard',url);
            }
        }
    }
}
</script>
<style lang="less" scoped>
    #picCard{
        background: #F1F3F6;
        min-height: 100vh;
        .comeback{
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: flex-start;
            align-items:center;
            background: #ffffff;
            cursor: pointer;
            img{
                padding-left:16px;
            }
            span{
                font-size: 14px;
                padding-left:8px;
                color: #1A2231;
            }
        }
        .provider_con{
            font-family: PingFang-SC-Medium;
            background: #F1F3F6;
            letter-spacing: -0.34px;
            margin-top:16px;
            width: 100%;
            .providerItem{
                width: 343px;
                background: #FFFFFF;
                border-radius: 6px;
                margin-left:16px;
                margin-top:16px;
                .provider-tips{
                    width: 100%;
                    height: 14px;
                    img{
                        float: left;
                        left: 0;
                        height: 14px;
                    }
                }
                .provider-company{
                    height: 35px;
                    margin: 0 8px;
                    font-size: 14px;
                    .name{
                        color: #171C24;
                        position: absolute;
                        left: 24px;
                        line-height: 20px;
                        font-weight:bold;
                    }
                }
                .provider-pic{
                    height: 312px;
                    margin: 0 8px;
                    border-bottom:0.5px solid #EDEFF1;
                    .provider-pic-top{
                        font-size: 14px;
                        margin-bottom: 35px;
                    }
                    .provider-pic-bottom{
                        margin-top: 20px;
                        .upload-btn{
                            display: inline-block;
                            width: 104px;
                            height: 40px;
                            line-height: 40px;
                            background: #00a8ea;
                            border-radius: 8px;
                            font-size: 14px;
                            color: #FFFFFF;
                            text-align: center;
                        }
                    }
                    img{
                        width:188px; 
                        height:188px;
                    }
                }
                .proder-msg{
                    font-size: 14px;
                    color: #171C24;
                    letter-spacing: -0.34px;
                    text-align: center;
                    line-height:17px;
                    padding:20px 0;
                    p{
                        margin-block-start: 0;
                        margin-block-end: 0;

                    }
                }
            }
        }
    }
    /deep/.van-uploader{
        display: block;       
    }
    /deep/.van-uploader__wrapper{
        justify-content: center;
    }
    /deep/.van-loading{
        top:30%
    }
    /deep/.van-loading__text{
        color:#ffffff;
    }
</style>


