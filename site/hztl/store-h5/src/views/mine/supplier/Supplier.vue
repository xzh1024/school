<template>
    <div class="supplier">
        <div class="comeback" @click="back">
            <img src="../../../assets/back-icon.png" class="back-icon">
        </div>
        <!-- <div class="head-brand">
        <span class="backToHome" @click="back"></span>
        <span class="word">我的供应商</span>
        </div> -->
        <div class="provider_con">
            <van-list v-model="loading" :finished="finished" :finished-text="showSupplier && providerList.length ? '没有更多了' : ''" :error.sync="isError" error-text="请求失败，点击重新加载" 
                loading-text="加载中..." @load="loadList()">
                <div v-if="showSupplier">
                    <div class="providerItem" v-for="(item,index) in providerList" :key="index">
                        <div class="provider-tips">
                            <img v-if="item.status==1" src="../../../assets/tips_cooperation.png"> 
                            <img v-if="item.status==2" src="../../../assets/tips_Suspendcooperation.png">  
                        </div>
                        <div class="provider-company">
                            <span class="name">{{item.supplierName}}</span>
                            <span class="check" @click="Check(item.supplierName,item.paymentCode,item.status)">查看收款信息
                                <img src="../../../assets/order-enter.png" >
                            </span>
                        </div>
                        <div class="provider_msg">
                            <van-grid :border="false" :column-num="3">
                                <van-grid-item>
                                    <span>{{item.paymentDays}}天</span>
                                    <span>账期</span>
                                </van-grid-item>
                                <van-grid-item>
                                    <span>¥{{item.lineCredit}}</span>
                                    <span>信用额度</span>
                                </van-grid-item>
                                <van-grid-item>
                                    <span>{{item.reconciliation}}</span>
                                    <span>对账日期</span>
                                </van-grid-item>
                                <van-grid-item>
                                    <span>{{item.paymentType}}</span>
                                    <span>结算方式</span>
                                </van-grid-item>
                                <van-grid-item>
                                    <span>{{item.invoiceType}}</span>
                                    <span>发票类型</span>
                                </van-grid-item>
                                <van-grid-item>
                                    <span>{{item.addTime.replace(/-/g,"/")}}</span>
                                    <span>添加日期</span>
                                </van-grid-item>
                            </van-grid>             
                        </div>
                    </div>
                </div>
                <div v-else style="margin: 25% 20px;font-size: 16px;">
                    <div v-show="!loading" style="text-align: left;">
                        {{showAuditingTips? "您已发起客户申请，请耐心等待商家审核。" : "您还不是当前商家的客户或商家拒绝了您的客户申请！"}}
                    </div>
                    <div v-show="!loading" style="margin-top: 10px; color: red;">
                        商家电话：{{storeTel}}
                    </div>
                    <van-button v-if="!loading && !showAuditingTips" type="primary" style="margin-top: 30px;" @click="handleApply">发起申请</van-button>
                </div>
            </van-list>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { Grid, GridItem, List, Button, Dialog } from 'vant';
import { mapState } from "vuex";
import request from "@/request";
    
Vue.use(Grid).use(GridItem).use(List).use(Button).use(Dialog); 
export default{
    name:"supplier",
    data(){
        return{
            isError:false,
            finished:false,
            loading:false,
            providerList:[],
            pageCount:0,
            showSupplier: false,
            showAuditingTips: false
        }
    },
    computed: {
        ...mapState({
            storeTel: state => state.storeTel
        })
    },
    methods:{
        back:function(){
            this.$router.push("mine")
        },
        Check:function(name,url,status){
            this.$router.push({name:"supplierPayment",params:{name:name,url:url,status:status}});
        },
        loadList:function(){
            let _this=this;
            var params={
                params:{
                    page:++_this.pageCount,
                    pageSize:10,
                }
            }
            _this.load = false;
            request({
                url: "/suppliers",
                params
            })
                .then((res) => {
                    if(res.rows&&res.rows.length){
                        let data=res.rows;
                        const status = data[0].status;
                        _this.providerList=data;
                        _this.loading=false;
                        if(_this.providerList.length>=data.length){
                            _this.finished=true;
                        }
                        if (status === 1) {
                            _this.showSupplier = true;
                        } else if (status === 0){
                            _this.showAuditingTips  = true;
                        }
                    }else{
                        _this.finished=true;
                        _this.loading=false;
                        _this.showSupplier = false;
                        _this.showAuditingTips  = false;
                    }
                })
                .catch(() => {
                    _this.isError=true;
                    _this.loading=false;
                })
        },
        handleApply() {
            request({
                method: "post",
                url: "/customers/store-apply"
            }).then(() => {
                Dialog.alert({
                    message: "您已发起客户申请，请耐心等待商家审核。"
                })
            }).catch(err => {
                if(err && err.message) {
                    Toast.fail(err.message);
                }
            });
        }
    }
    
}
</script>
<style lang="less" scoped>
.supplier{
    background: #F8F8F8;
    min-height: 100vh;
    overflow-y: auto;
}       
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
    .word{
        font-size: 16px;
        letter-spacing: -0.36px;
        margin:0 8px;
    }
}
.provider_con{
    font-family: PingFang-SC-Medium;
    margin-top:16px;
    width: 100%;
    background: #F8F8F8;
    .providerItem{
        width: 343px;
        height: 191px;
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
            border-bottom:0.5px solid #EDEFF1;
            letter-spacing: -0.34px;
            font-size: 14px;
            .name{
                color: #171C24;
                position: absolute;
                left: 24px;
                line-height: 20px;
            }
            .check{
                position: absolute;
                right: 24px;
                color: #00A8EA;
                line-height: 20px;
                img{
                    margin-bottom: 2px;
                    margin-left: 10px;
                    width: 6px;
                    height: 6px;
                }
            }
        }
    }
}
</style>
<style lang="less">
.van-grid-item__content {
    padding: 0;
    span{
    color: #171C24;
    }
}
.van-grid-item__content span:nth-child(1){
    font-size: 14px;
    letter-spacing: -0.34px;
    line-height: 40px;
}
.van-grid-item__content span:nth-child(2){
    font-size: 12px;
    color: #AAACB7;
    line-height: 30px;
}
</style>
