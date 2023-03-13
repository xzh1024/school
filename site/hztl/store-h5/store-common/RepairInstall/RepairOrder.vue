<template>
    <div id="RepairOrder">
        <van-nav-bar @click-left="onClickLeft">
            <div slot="left" >
                <img src="../img/back-icon.png" class="Back">
                <span class="left-title">我的工单</span>
            </div>
            <van-search placeholder="请输入车主姓名/电话" 
                slot="right" v-model="value"  @search="onSearch" @clear="getAll">
            </van-search>
        </van-nav-bar>
        <div class="RepairOrder-list">
            <div class="top-bar">
                <span v-for="(item,index) in statuslist" :key="index" :class="{'bar-item':true,'isActive':activeindex===item.key}" @click="tagget(item.key)">{{item.value}}</span>
            </div>
            <div class="rfq-list">
                <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了" :error.sync="isError" error-text="请求失败，点击重新加载" 
                loading-text="加载中..."
                @load="getrfqlist"
                >
                <div v-for="(item,index) in rfqlist" :key="index" class="rfq-item">
                    <div class="item-head">
                        <span :class="{'head-tag':true,
                        'tag-orange':item.status==1,
                        'tag-red':item.status==2,
                        'tag-green':item.status==3,
                        'tag-grey':item.status==4,
                        }">
                        {{item.statusName}}
                        </span>
                        <span v-if="item.unRead" class="head-unread"></span>
                        <span class="head-tele" @click.stop="tele(item.carOwnerPhone)"></span>
                        <div class="head-title">
                            <span class="title-code">{{item.carOwnerName}}</span>
                        </div>
                    </div>
                    <div class="item-body">
                        <p>
                            <span class="body-title">订单号：</span>
                            <span class="body-content">{{item.orderCode}}</span>
                        </p>
                        <p>
                            <span class="body-title">工单金额：</span>
                            <span class="body-content">{{item.totalPrice}}</span>
                        </p>
                        <p>
                            <span class="body-title">预计到店时间：</span>
                            <span class="body-content">{{item.appointmentTime}}</span>
                        </p>
                        <div v-if="item.status==1" class="body-botton">
                            <div class="botton-confirm" @click="confirm(item.id)">发起验收</div>
                        </div>
                    </div>
                    <van-card
                        :num="item.qty"
                        :price="item.price"
                        :desc="'编号：'+item.partCode"
                        :title="item.partName"
                        :thumb="item.image"
                        >
                        <template #tags>
                            <div>
                                <van-tag round color="#f2826a">{{item.brand}}</van-tag>
                                <van-tag round color="#f2826a">{{item.productionPlace}}</van-tag>
                            </div>
                        </template>
                    </van-card>
                </div>
            </van-list>
            </div>
        </div>
        <TabbarComonent v-if="axios.prototype.allianceId"/>
        <TabbarComonentB  v-if="baseInfo.companyId"/>
    </div>
</template>
<script>
import Vue from "vue";
import { mapState } from "vuex";
import { Tabbar, TabbarItem,NavBar,Search,Toast,List,Dialog,Card,Tag} from "vant";
Vue.use(Tabbar).use(TabbarItem).use(NavBar).use(Search).use(Toast).use(List).use(Card).use(Tag);
import { timeFormat } from '../request/http'
import request, { URL_MODULE } from "@/request";
import TabbarComonent from '../component/TabbarComponent'
import TabbarComonentB from '../component/TabbarComponentB'
export default {
    name:'RepairOrder',
    components: {TabbarComonent,TabbarComonentB},
    data(){
        return{
            value:'',
            currentPage:0,
            activeindex:-1,
            isActive:false,
            statuslist:[
            {
                key:-1,
                value:"全部"
            },{
                key:1,
                value:"待安装"
            },{
                key:2,
                value:"待验收"
            },{
                key:3,
                value:"已完成"
            },{
                key:4,
                value:"已取消"
            }],
            rfqlist:[],
            loading: false,
            finished: false,
            isError:false,
            imageDefualt:require('../img/Common_goods_def_img.png')
        }
    },
    computed: {
        ...mapState({
            baseInfo: state => state.base
        })
    },
    created(){
        this.getAll();
    },
    methods:{
        onClickLeft(){
            this.$router.push('mine')
        },
        onSearch(){
            this.rfqlist=[];
            this.currentPage=0;
            this.getrfqlist();
        },
        getAll(){
            this.rfqlist=[];
            this.currentPage=0;
            this.value='';
            this.getrfqlist();
        },
        tagget(key){
            this.rfqlist=[];
            this.currentPage=0;
            this.activeindex=key;
            this.getrfqlist();
        },
        getrfqlist(){
                var params={
                    type:1,
                    carOwner:this.value,
                    status:this.activeindex==-1?undefined:this.activeindex,
                    pageSize:20,
                    page:++this.currentPage
                }
                request({
                    baseURL: URL_MODULE.united,
                    url: '/appointments/install',
                    params
                }).then((data)=>{
                    setTimeout(() => {
                        if(data.rows&&data.rows.length){
                            this.rfqlist=this.rfqlist.concat(data.rows);
                            this.formatTime();
                        }else{
                            this.finished = true;
                        }
                        this.loading = false;
                        // 数据全部加载完成
                        if (this.rfqlist.length >= data.totalSize) {
                            this.finished = true;
                            this.loading = false;
                        }
                    }, 500);
                }).catch(err => {
                    if(err && err.message) {
                        Toast.fail(err.message);
                    }
                    this.isError = true;
                    this.finished = true;
                    this.loading = false;
                })
        },
        formatTime(){
            this.rfqlist.forEach(item=>{
                item.appointmentTime=timeFormat(item.appointmentTime)
                if(!item.image){
                    item.image=this.imageDefualt;
                }
            })
        },
        tele(phone){//打电话
            window.location.href = "tel:" + phone;
        },
        confirm(id){
            Dialog.confirm({
                title: "发起验收",
                message: `若您已完成本次安装任务，请点击【确认】，发起车主验收请求`,
                confirmButtonText:'确认'
            }).then(() => {
                request({
                    method: "put",
                    baseURL: URL_MODULE.united,
                    url: "/appointments/install",
                    data: {
                        id:Number(id),
                        status:2
                    }
                }).then((res)=>{
                    Toast.success("操作成功！");
                    this.getAll();
                }).catch((err)=>{
                    if(err && err.message) {
                        Toast.fail(err);
                    }
                })
            }).catch((err)=>{
                
            })
        }
    }
}
</script>
<style lang="less" scoped>
    #RepairOrder{
        font-family: PingFang-SC-Medium;
        color: #1a2231;
        min-height: 100vh;
        overflow: auto;
        .hide{
            display: none;
        }
        p{
            margin-block-start: 0;
            margin-block-end: 0;
        }
        .left-title{
            font-size: 17px;
            color: #1A2231;
            font-weight: bolder;
            margin-left: 16px;
        }
        .RepairOrder-list{
            .top-bar{
                background: #FFFFFF;
                border-bottom: .5px solid #E8EAEF;
                height: 44px;
                width: 100%;
                overflow-x: auto;
                display: flex;
                justify-content: flex-start;
                flex-wrap: nowrap;
                align-items: center;
                .bar-item{
                    display: inline-block;
                    font-size: 14px;
                    font-weight: lighter;
                    color: #777B87;
                    padding: 0 15px;
                    line-height: 44px;
                    word-break:keep-all;
                    white-space:nowrap;
                    &:first-child{
                        margin-left: 16px;
                    }
                }
                .isActive{
                    font-size: 16px;
                    font-weight: bold;
                    color: #1A2231;
                    &::after{
                        content: '';
                        display: inline-block;
                        width: 16px;
                        height: 3px;
                        background: url("../img/icon-underline.png") no-repeat;
                        background-size: 100% 100%;
                        background-size: 100% 100%;
                        position: relative;
                        left: -50%;
                        top: 13px;
                    }
                }
            }
            .rfq-list{
                background: #F1F3F6;
                height: calc(100vh - 140px);
                overflow-y: auto;
                padding: 0 16px;
                text-align: left;
                .show-noread{
                    font-size: 14px;
                    color: #777B87;
                    text-align: center;
                    line-height: 30px;
                    display: inline-block;
                    height: 30px;
                    background: #ffffff;
                    border-radius: 8px;
                    margin: 12px 0 0 0;
                    padding: 0 10px;
                    &.is-active{
                        color: #21BDC2;
                        background: #E3F7F8;
                    }
                }
                .van-list{
                    margin-top: 12px;
                }
                .rfq-item{
                    text-align: left;
                    position: relative;
                    &:not(:first-child){
                        margin-top: 12px;
                    }
                    .item-head{
                        border-top-left-radius: 6px !important;
                        height: 64px;
                        background: #FFFFFF;
                        border: none; 
                        position: relative;
                        .head-tag{
                            color: #FFFFFF;
                            font-size: 12px;
                            padding: 3px 10px;
                            border-top-left-radius: 6px;
                            border-bottom-right-radius: 6px;
                            position: absolute;
                            top: 0;
                            left: 0;
                            &.tag-orange{
                                background: #FF6700;
                            }
                            &.tag-red{
                                background: #FF4655;
                            }
                            &.tag-green{
                                background: #10B187;
                            }
                            &.tag-grey{
                                background: #CCCED4;
                            }
                        }
                        .head-tele{
                            display: inline-block;
                            position: absolute;
                            top:0;
                            right: -3px;
                            width: 52px;
                            height: 30px;
                            background: url('../img/icon-tel-bg.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        .head-unread{
                            display: inline-block;
                            width: 6px;
                            height: 6px;
                            background: #FF6700;
                            border-radius: 50%;
                            position: absolute;
                            top:0;
                            right: 0;
                        }
                        .head-title{
                            padding: 32px 0 13px 0;
                            margin: 0 8px;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            .title-code{
                                font-size: 16px;
                                color: #1A2231;
                                font-weight: bold
                            }
                            .title-time{
                                font-size: 12px;
                                color: #777B87;
                                margin-left: auto;
                            }
                        }
                    }
                    .item-body{
                        padding: 0 8px;
                        background: #ffffff;
                        p{
                            line-height: 24px;
                            display: flex;
                            justify-content: flex-start;
                            align-items: flex-start;
                            .body-title{
                                font-size: 14px;
                                color: #777B87;
                            }
                            .body-content{
                                font-size: 14px;
                                color: #1A2231;
                            }                  
                        }
                        .body-botton{
                            text-align: right;
                            font-size: 14px;
                            line-height: 30px;
                            position: absolute;
                            top: 100px;
                            right: 0;
                            .botton-confirm{
                                display: inline-block;
                                border: 1px solid rgba(35,198,203, 0.4);
                                border-radius: 8px;
                                padding: 0 12px;
                                color: #21BDC2;
                                margin-left: 15px;
                                text-align: center;
                            }
                        }
                    }
                }
            }
            
        }
    }
    /deep/.van-cell{
        padding: 0 !important;
    }
    /deep/.van-icon-search:before{
        content: '';
        background: url("../img/icon-serch.png") no-repeat;
        display: inline-block;
        opacity: 0.4;
        background-size: 100% 100%;
        width: 16px;
        height: 16px;
        margin-left: 4.6px;
    }
    /deep/.van-field__control{
        text-indent: 0;
    }
    /deep/.van-search{
        padding: 0.26667rem 0  0.26667rem 0.32rem;
    }
    /deep/.van-search__content{
        padding: 3px 0;
        width: 215px;
        border-radius: 6px;
    }
    /deep/ .van-search__content .van-field__control::-webkit-input-placeholder {
        color: #777B87;
    }

    /deep/ .van-search__content .van-field__control::-moz-placeholder {
        color: #777B87;
    }

    /deep/ .van-search__content .van-field__control:-ms-input-placeholder {
        color: #777B87;
    }
    /deep/.van-list{
        height: 450px;
    }
    /deep/.van-dialog__confirm, /deep/.van-dialog__confirm:active{
        color:#21BDC2 !important;
    }
    /deep/.van-tag{
        width: max-content;
        &:not(:first-child){
            margin-left: 5px;
        }
    }
    /deep/.van-card{
        font-size: 14px;
    }
    /deep/.van-card:not(:first-child){
        margin-top:unset 
    }
</style>


