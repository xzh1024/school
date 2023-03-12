<template>
    <div id="companyDetail">
        <div class="icon_left">
            <div class="comeback">
                <img src="../img/back-icon.png" @click="onClickLeft" class="back-icon">
            </div>
        </div>
        <div class="page-body-container">
            <div class="content_img">
                <img :src="company.businessCard" alt="">
            </div>
            <div class="content_position">
                <div class="content_company">
                    <div class="content_box">
                        <span class="content_type" v-if="company.type">{{company.type}}</span>
                        <span class="content_companyName">{{company.name}}</span>
                    </div>
                    <div class="content_address">
                        <span class="icon-address"></span>
                        <span class="text">{{company.areaName}}{{company.address}}</span>
                    </div>
                    <div class="content_phone">
                        <span class="icon-tel"></span>
                        <span class="text ph_color" @click="tel(company.phone)">{{company.phone}}</span>
                    </div>
                </div>
                <div class="content_desc">
                    <div class="item_title">公司介绍</div>
                    <div class="company_desc">
                        {{company.description}}
                    </div>
                </div>
                <div class="content_vehbrands">
                    <div class="item_title">经营品牌</div>
                    <div class="company_vehbrands">
                        <template v-if="!isOpen&&BrandShow.length">
                            <span  v-for="(item,index) in BrandShow" :key="index" class="key_vehbrands">{{item}}</span>
                        </template>
                        <template v-if="isOpen && company.vehBrands && company.vehBrands.length>0">
                            <span  v-for="(item,index) in company.vehBrands" :key="index" class="key_vehbrands">{{item}}</span>
                        </template>
                        <span class="vehBrands-open" v-if="!isOpen&&BrandShow.length>0" @click="open"></span>
                        <span class="vehBrands-close" v-if="isOpen&&BrandShow.length>0" @click="close"></span>
                        <p class="vehBrands-no" v-if="!company.vehBrands || company.vehBrands.length==0">该商家暂无经营品牌</p>
                    </div>
                </div>
                <div class="content_payment">
                    <div class="item_title">收款信息</div>
                    <div class="payment">
                        <img :src="company.paymentCode" alt="">
                        <p class="payment-tips">长按保存图片</p>
                        <p class="payment-note">* 注意: 转账前请与商家核对身份及账单信息，转账时请谨慎操作</p>
                    </div>
                </div>
            </div>
            
        </div>
       
    </div>
</template>
<script>
import Vue from "vue";
import { NavBar,Toast } from "vant";
Vue.use(NavBar).use(Toast)
import request from "@/request";
export default {
    name:"companyDetail",
    data(){
        return{
            company:{
                vehBrands:[]
            },
            BrandShow:[],
            isOpen:false,
            picDefault:require("../img/icon-company-def.png"),
            urlDefault:require('../img/payment-default.png'),
        }
    },
    activated() {
        this.load();
    },
    created(){
        this.load();
    },
    methods:{
        tel(phone){
            window.location.href="tel:"+phone;
        },
        onClickLeft(){
            this.$router.push('home')
        },
        open(){
            this.isOpen=true;
            this.$forceUpdate();
        },
        close(){
            this.isOpen=false;
            this.$forceUpdate();
        },
        load(){
            request({
                url: '/open/stores/info'
            })
            .then(res => {
                this.company={...res};
                this.isOpen = true;
                if(!this.company.businessCard){
                    this.company.businessCard=this.picDefault;
                }
                if(!this.company.paymentCode){
                    this.company.paymentCode=this.urlDefault;
                }
                if(this.company.vehBrands && this.company.vehBrands.length>8){
                    this.isOpen = false;
                    this.BrandShow=this.company.vehBrands.slice(0,8);
                }
            })
            .catch(err => {
                if(err && err.message) {
                    Toast.fail(err.message);
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
#companyDetail{
    font-family: PingFang-SC;
    color: #1a2231;
    min-height: 100vh;
    width: 100vw;
    overflow: auto;
    background:#ffffff;
    .icon_left{
        position: fixed;
        top: 0;
        left:0;
        width: 100%;
        height: 40px;
        z-index: 1000;
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
    }
    
    .page-body-container {
        text-align: left;
        margin-top:40px;
        min-height:100vh;
        overflow-y: auto;
        background: #F8F8F8;
        font-size: 14px;
        line-height: 23px;
        position: relative;
        .content_img{
            width: 100%;
            height: 222px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .content_position{
            position: absolute;
            top: 187.5px;
            left: 0;
            width: 375px;
            .content_company{
                padding: 12px;
                border-top-left-radius: 0.32rem;
                border-top-right-radius: 0.32rem;
                overflow: hidden;
                background: #fff;
                z-index: 1000;
                box-sizing: border-box;
                .content_box{
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                    .content_type{
                        color:#FF6E4C;
                        font-family: PingFangSC-Medium;
                        font-size: 12px;
                        padding: 2px 4px;
                        border-radius: 4px;
                        border: 1px solid #FF6E4C;
                        margin-right:4px;
                    }
                    .content_companyName{
                        font-family: PingFangSC-Medium;
                        font-size: 15px;
                        color: #333333;
                        letter-spacing: 0;
                        font-weight: 500;
                    }
                }
                .content_address{
                    margin:12px 0;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #333333;
                    letter-spacing: 0;
                    font-weight: 400;
                    display: flex;
                    .icon-address{
                        background: url('../img/location@3x.png') no-repeat;
                        background-size: 100% 100%;
                        width: 16px;
                        height: 16px;
                        display: inline-block;
                        margin-right: 8px;
                        margin-top: 3px;
                    }
                    .text {
                        flex: 1;
                        text-overflow: -o-ellipsis-lastline;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                }
                .content_phone{
                    margin:12px 0;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    .icon-tel{
                        background: url('../img/phone@3x.png') no-repeat;
                        background-size: 100% 100%;
                        width: 16px;
                        height: 16px;
                        display: inline-block;
                        margin-right: 8px;
                    }
                    .ph_color{
                        color: #FF6E4C;
                        letter-spacing: 0;
                        font-weight: 500;
                    }
                }
            }
            .content_desc{
                margin-top: 8px;
                padding: 12px;
                background: #fff;
                .company_desc{
                    margin-top:12px;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #666666;
                    text-indent:28px;
                    font-weight: 400;
                }
            }
            .item_title{
                height: 22px;
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #333333;
                line-height: 22px;
                font-weight: 500;
            }
            .content_vehbrands{
                margin-top: 8px;
                padding: 12px;
                background: #fff;
                
                .company_vehbrands{
                    margin-top:12px;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #666666;
                    font-weight: 400;
                    .key_vehbrands{
                        display: inline-block;
                        padding: 2px 4px;
                        height: 20px;
                        font-family: PingFangSC-Regular;
                        font-size: 12px;
                        color: #666666;
                        line-height: 20px;
                        font-weight: 400;
                        background: #ECEDEE;
                        border-radius: 4px;

                        // line-height: 26px;
                        // height: 26px;
                        // background: #F3F5F8;
                        // border-radius: 13px;
                        // font-size: 12px;
                        // color: #777B87;
                        // text-align: center;
                        margin-right: 6px;
                        margin-bottom: 6px;
                    }
                    .vehBrands-open{
                        background: url("../img/icon-zhankai.png") no-repeat;
                        display: block;
                        width: 14px;
                        height: 14px;
                        background-size: 100% 100%;
                        margin-left: 50%;
                        transform: translateX(-50%);
                        margin-top: 12px;
                    }
                    .vehBrands-close{
                        background: url("../img/icon-shouqi.png") no-repeat;
                        display: block;
                        width: 14px;
                        height: 14px;
                        background-size: 100% 100%;
                        margin-left: 50%;
                        transform: translateX(-50%);
                        margin-top: 12px;
                    }
                    .vehBrands-no{
                        font-size: 14px;
                        line-height: 28px;
                        color: #777B87;
                    }
                }
            }
            .content_payment{
                margin-top: 8px;
                padding: 12px;
                background: #fff;
                .payment{
                    img{
                        padding: 25px 84px 10px 75px;
                        width: 188px;
                        height: 188px;
                    }
                    .payment-tips{
                        font-size: 12px;
                        color: #AAACB7;
                        text-align: center;
                        line-height: 17px;
                    }
                    .payment-note{
                        width: 239px;
                        text-align: center;
                        font-size: 12px;
                        color: #1A2231;
                        line-height: 17px;
                        margin-top: 45px;
                        margin-bottom: 20px;
                        margin-left: 47px;
                    }
                }
            }
        }
        
    }
    
}

</style>


