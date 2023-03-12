<template>
    <div id="Inquiry">
        <van-nav-bar @click-left="onClickLeft">
            <img src="../../assets/back-icon.png"  slot="left" class="Back">
            <van-search placeholder="请输入车型品牌" 
                slot="right" v-model="value"  @search="onSearch" @clear="getAll">
            </van-search>
        </van-nav-bar>
        <div class="Inquiry-list">
            <div class="top-bar">
                <span v-for="(item,index) in statuslist" :key="index" :class="{'bar-item':true,'isActive':activeindex===item.key}" @click="tagget(item.key)">{{item.value}}</span>
            </div>
            <div class="rfq-list">
                <span :class="{'show-noread':true,'is-active':isActive}" v-if='activeindex===-1' @click="showRead()">只看有未读报价的询价单({{noreadList.length}})</span>
                <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了" :error.sync="isError" error-text="请求失败，点击重新加载" 
                loading-text="加载中..."
                @load="getrfqlist"
                >
                <div v-for="(item,index) in rfqlist" :key="index" class="rfq-item" @click="Detail(item.wantCode,item.status)">
                    <div class="item-head">
                        <span :class="{'head-tag':true,
                        'tag-orange':item.status==0,
                        'tag-red':item.status==1||item.status==2,
                        'tag-green':item.status==3,
                        'tag-grey':item.status==4}">
                        {{item.statusName}}
                            <span :class="{'hide':(item.status==0)}">{{!item.offeredCount?0:item.offeredCount}}/ {{item.receiverCount}}</span>
                        </span>
                        <span v-if="item.unRead" class="head-unread"></span>
                        <span class="head-del" v-if="item.status==0" @click.stop="del(item.wantCode)"></span>
                        <div class="head-title">
                            <span class="title-code">{{item.wantCode}}</span>
                            <span class="title-time">{{item.time}}</span>
                        </div>
                    </div>
                    <div class="item-body">
                        <span class="body-code" v-if="item.vin!==''">{{item.vin}}</span>
                        <span class="body-code" v-if="item.brandsScope.length>0&&item.wantType==1" v-for="(brand,index) in item.brandsScope" :key="index">{{brand}}</span>
                        <span v-if="item.wantType!=1" class="body-code">{{item.factoryBrand}} {{item.series}} {{item.displacement}} {{item.gearbox}}</span>
                        <p class="body-info">{{item.partInfo}}</p>
                    </div>
                </div>
            </van-list>
            </div>
        </div>
        <!-- <TabbarComonent /> -->
    </div>
</template>
<script>
import Vue from "vue";
import { Tabbar, TabbarItem,NavBar,Search,Toast,List,Dialog} from "vant";
Vue.use(Tabbar).use(TabbarItem).use(NavBar).use(Search).use(Toast).use(List);
import request, { URL_MODULE } from "@/request";
import TabbarComonent from '../../../store-common/component/TabbarComponent'
export default {
    name:'Inquiry',
    components: {TabbarComonent},
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
                key:0,
                value:"待发布"
            },{
                key:1,
                value:"待报价"
            },{
                key:2,
                value:"待比价"
            },{
                key:3,
                value:"已结束"
            },{
                key:4,
                value:"已过期"
            }],
            rfqlist:[],
            noreadList:[],
            loading: false,
            finished: false,
            isError:false,
        }
    },
    created(){
        this.getrfqlist()
    },
    methods:{
        onClickLeft(){
            this.$router.push('home')
        },
        onSearch(){
            this.rfqlist=[];
            this.noreadList=[];
            this.currentPage=0;
            this.getrfqlist();
        },
        showRead(){
            this.isActive=!this.isActive;
            if(this.isActive){
                this.rfqlist=this.noreadList
            }else{
                this.rfqlist=[];
                this.noreadList=[];
                this.currentPage=0;
                this.getrfqlist();
            }
        },
        getAll(){
            this.rfqlist=[];
            this.noreadList=[];
            this.currentPage=0;
            this.value='';
            this.getrfqlist();
        },
        tagget(key){
            this.rfqlist=[];
            this.noreadList=[];
            this.currentPage=0;
            this.activeindex=key;
            this.getrfqlist();
        },
        Detail(wantCode,status){
            if(status=="0"){
                this.$router.push('post_Inquiry?wantCode='+wantCode)
            }else{
                this.$router.push('InquiryDetail?wantCode='+wantCode)
            }
        },
        getrfqlist(){
                var params={
                    factoryBrand:this.value,
                    status:this.activeindex==-1?'':this.activeindex,
                    pageSize:20,
                    page:++this.currentPage,
                    offiAccount:true
                }
                request({
                    baseURL: URL_MODULE.united,
                    url: '/wants-v2/wants/publisher',
                    params
                }).then((data)=>{
                    setTimeout(() => {
                        if(data.rows&&data.rows.length){
                            this.rfqlist=this.rfqlist.concat(data.rows);
                            this.rfqlist.forEach((item)=>{
                                if(item.unRead){
                                    this.noreadList.push(item)
                                }
                            })
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
                }).catch((data)=>{
                    Toast.fail(data);
                    this.isError = true;
                    this.finished = true;
                    this.loading = false;
                })
        },
        formatTime(){
            this.rfqlist.forEach(item=>{
                item.time=this.timeFormat(item.time)
            })
        },
        timeFormat(time, type) {
            if (!time) {
                return "";
            }
            type = (type ? type : "") + "";
            time = new Date(time);
            var year = time.getFullYear(),
                month = time.getMonth() + 1,
                date = time.getDate(),
                hour = time.getHours(),
                minute = time.getMinutes(),
                second = time.getSeconds();
            if (month < 10) {
                month = "0" + month;
            }
            if (date < 10) {
                date = "0" + date;
            }
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (minute < 10) {
                minute = "0" + minute;
            }
            if (second < 10) {
                second = "0" + second;
            }
            var timeStr = " " + hour + ":" + minute + ":" + second;
            if (type.search("notime") != -1) {
                timeStr = "";
            } else if (type.search("nosecond") != -1) {
                timeStr = " " + hour + ":" + minute;
            }
            var separatorYear = "/";
            var separatorMonth = "/";
            var separatorDay = "";
            if (type.search("zh-cn") != -1) {
                separatorYear = "年";
                separatorMonth = "月";
                separatorDay = "日";
            }
            if (type == 1) {
                separatorYear = ".";
                separatorMonth = ".";
                timeStr = "";
            }
            if (type.search('noyear') != -1) {
                return month + separatorMonth + date + separatorDay + timeStr;
            } else {
                return year + separatorYear + month + separatorMonth + date + separatorDay + timeStr;
            }
        },
        del(wantCode){//删除报价
            Dialog.confirm({title: '提示',
                message: '确定要删除询价单（'+wantCode+'）吗?',
                confirmButtonText:'确定'
                }).then(() => {
                request({
                    method: "post",
                    baseURL: URL_MODULE.united,
                    url: '/wants-v2/wants/status/delete',
                    data: { wantCode }
                }).then(()=>{
                    Toast.success("操作成功！");
                    this.rfqlist=[];
                    this.noreadList=[];
                    this.currentPage=0;
                    this.getrfqlist();
                }).catch(data => {
                    if(data && data.message) {
                        Toast.fail(data.message);
                    }
                })
            }).catch(() => {});
        },
    }
}
</script>
<style lang="less" scoped>
    #Inquiry{
        font-family: PingFang-SC-Medium;
        color: #1a2231;
        min-height: 100vh;
        overflow: auto;
        .hide{
            display: none;
        }
        .Back{
            width: 8px;
            height: 14px;
        }
        .left-title{
            font-size: 17px;
            color: #1A2231;
            font-weight: bolder;
        }
        .Inquiry-list{
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
                    padding: 0 10px;
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
                        background: url("../../assets/icon-underline.png") no-repeat;
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
                min-height: calc(100vh - 140px);
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
                        color: #00a8ea;
                        background: #E3F7F8;
                    }
                }
                .van-list{
                    margin-top: 12px;
                }
                .rfq-item{
                    // height: 176px;
                    text-align: left;
                    &:not(:first-child){
                        margin-top: 12px;
                    }
                    .item-head{
                        border-radius: 6px !important;
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
                        .head-del{
                            display: inline-block;
                            position: absolute;
                            top:0;
                            right: 0;
                            width: 18px;
                            height: 18px;
                            background: url('../../assets/tag-del.png') no-repeat;
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
                            border-bottom: 0.5px solid #E8EAEF;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            .title-code{
                                font-size: 14px;
                                color: #1A2231;
                            }
                            .title-time{
                                font-size: 12px;
                                color: #777B87;
                                margin-left: auto;
                            }
                        }
                    }
                    .item-body{
                        border-radius: 6px !important;
                        background: #FFFFFF;
                        border: none;
                        line-height: 24px;
                        .body-code{
                            font-size: 12px;
                            color: #777B87;
                            display: inline-block;
                            height: 24px;
                            padding: 0 10px;
                            margin-top: 12px;
                            background: #F3F5F8;
                            border-radius: 4px;
                            &:first-child{
                                margin-left: 8px;
                            }
                            &:not(:first-child){
                                margin-left: 10px;
                            }
                        }
                        .body-info{
                            font-size: 14px;
                            color: #1A2231;
                            margin-left: 8px;
                            margin-top: 12px;
                            padding: 0 10px 16px 10px;
                            line-height: 24px; 
                            max-height: 36px; 
                            overflow: hidden;            
                            text-overflow: ellipsis;            
                            display: -webkit-box;            
                            -webkit-line-clamp: 2;            
                            -webkit-box-orient: vertical;
                        } 
                    }
                }
            }
            
        }
    }
    /deep/.van-nav-bar__left {
        left: 20px;
    }
    /deep/.van-nav-bar__left, /deep/.van-nav-bar__right{
        padding: 0;
    }
    /deep/.van-cell{
        padding: 0 !important;
    }
    /deep/.van-icon-search:before{
        content: '';
        background: url("../../assets/icon-serch.png") no-repeat;
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
        // padding: 0.26667rem 0  0.26667rem 0.32rem;
        padding: 0.26667rem 0.32rem;
    }
    /deep/.van-search__content{
        padding: 3px 0;
        width: 315px;
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
        color:#00a8ea !important;
    }
</style>


