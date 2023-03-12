<template>
    <div id="FinancialAudit">
        <van-nav-bar @click-left="onClickLeft">
            <img src="../img/back-icon.png"  slot="left" class="Back">
            <div slot="right">
                <div class="top-bar">
                    <span v-for="(item,index) in statuslist" :key="index" :class="{'bar-item':true,'isActive':activeindex===item.key}" @click="tagget(item.key)">{{item.value}}</span>
                </div>
            </div>
        </van-nav-bar>
        <van-search placeholder="输入订单号 / 买家名称" 
            slot="right" v-model="value"  @search="getlist(true)" @clear="getAll">
        </van-search>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="isError" error-text="请求失败，点击重新加载" 
            loading-text="加载中..." @load="getlist()">
            <div class="Financial_list">
                <div :class="{'Financial_item':true,'noCheak':activeindex===1}" v-if="FinancialList.length>0" v-for="(item,index) in FinancialList" :key="index">
                    <div class="item-tag"></div>
                    <div class="item-head">
                        <p class="head-code">{{item.orderCode}}</p>
                        <p class="head-time">
                            <span class="time-left">{{timeFormat(item.createdAt,"zh-cn")}}</span>
                            <span v-if="activeindex===1" class="time-right-phone" @click="tel(item.UserPhone)"></span>
                            <span v-else class="time-right">{{item.typeCN}}</span>
                        </p>
                    </div>
                    <div class="item-body">
                        <p>
                            <span class="body-title">买家名称：</span>
                            <span class="body-content">{{item.companyName}}</span>
                        </p>
                        <p>
                            <span class="body-title">订单金额：</span>
                            <span class="body-content">¥{{item.totalAmount}}</span>
                        </p>
                        <p>
                            <span class="body-title">买家嘱咐：</span>
                            <span class="body-content remarks">{{item.remarks}}</span>
                        </p>
                        <div v-if="activeindex===1" class="body-botton">
                            <div class="botton-cancle" @click="cancle(item.orderCode)">拒绝</div>
                            <div class="botton-confirm" @click="confirm(item.orderCode)">通过</div>
                        </div>
                    </div>
                </div>
            </div>
        </van-list>
        <van-dialog v-model="show" title="确认要拒绝财务审核吗？" show-cancel-button @cancel="show=false" @confirm="FinancialCancle">
            <div slot="default">
                <span>备注：</span>
                <textarea v-model="remark" cols="20" rows="2"></textarea>
            </div>
        </van-dialog>
    </div>
</template>
<script>
import Vue from "vue";
import request, { URL_MODULE } from "@/request";
import { Tabbar, TabbarItem,NavBar,Search,Card,Toast,List,Dialog} from "vant";
Vue.use(Tabbar).use(TabbarItem).use(NavBar).use(Search).use(Card).use(Toast).use(List).use(Dialog);
import { GetQueryString} from '../../src/request/http'
export default {
    name:"FinancialAudit",
    data(){
        return{
            currentPage:0,
            FinancialList:[],
            activeindex:1,
            statuslist:[{
                key:1,
                value:"待审核"
            },
            {
                key:2,
                value:"已审核"
            }],
            value:'',
            loading: false,
            finished: false,
            isError:false,
            orderCode:'',
            show:false,
            remark:''
        }
    },
    created(){
        this.value=GetQueryString('orderCode');
    },
    methods:{
        onClickLeft(){
            this.$router.push("mine");
        },
        tel(phone) {
            window.location.href = "tel:" + phone;
        },
        tagget(key){
            this.FinancialList=[];
            this.currentPage=0;
            this.activeindex=key;
            this.getlist();
        },
        getAll(){
            this.FinancialList=[];
            this.currentPage=0;
            this.getlist();
        },
        cancle(orderCode){
            this.show=true;
            this.orderCode=orderCode;
        },
        FinancialCancle(){
            let params={                    
                orderCode:this.orderCode, //订单号
                remark:this.remark    // 备注
            }
            request({
                method: "post",
                baseURL: URL_MODULE.pay,
                url: '/payments/cancel',
                data: params
            })
            .then(() => {
                Toast.success("操作成功！");
                this.getAll();
            })
            .catch(err => {
                if(err && err.message) {
                    Toast.fail(err.message)
                }
            })
        },
        confirm(orderCode){
            let params={                    
                orderCode:orderCode //订单号
            }
            request({
                method: "post",
                baseURL: URL_MODULE.pay,
                url: '/payments/financial',
                data: params
            })
            .then(() => {
                Toast.success("操作成功！");
                this.getAll();
            })
            .catch(err => {
                if(err && err.message) {
                    Toast.fail(err.message);
                }
            })

        },
        getlist(type){
            if(type){
                this.currentPage=0;
                this.FinancialList=[];
            }
            let params={
                statuses:this.activeindex,
                keyword:this.value,
                page:this.currentPage++,
                pageSize:10
            }
            request({
                baseURL: URL_MODULE.pay,
                url: '/payments',
                params
            })
            .then((res)=>{
                if(res.rows&&res.rows.length){
                    this.FinancialList=this.FinancialList.concat(res.rows);
                    this.loading=false;
                    if(this.FinancialList.length>=res.totalSize){
                        this.finished=true;
                        this.loading=false;
                    }
                }else{
                    this.finished=true;
                    this.loading=false;
                }
                })
            .catch(error=>{
                this.isError=true;
                this.finished=true;
                this.loading=false;
                if(error && error.message) {
                    Toast.fail(error.message)
                }
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
    }
}
</script>
<style lang="less" scoped>
#FinancialAudit{
font-family: PingFang-SC-Medium;
    color: #1a2231;
    min-height: 100vh;
    background: #F1F3F6;
    text-align: left;
    .top-bar{
        background: #FFFFFF;
        height: 44px;
        width:320px;
        display: flex;
        justify-content: center;
        align-items: center;
        .bar-item{
            display: inline-block;
            width: 60px;
            font-size: 16px;
            font-weight: normal;
            color: #AAACB7;
            padding: 0 10px;
            line-height: 44px;
            word-break:keep-all;
            white-space:nowrap;
        }
        .isActive{
            font-size: 16px;
            font-weight: bold;
            color: #21BDC2;
            position: relative;
            &::after{
                content: '';
                display: inline-block;
                width: 6px;
                height: 6px;
                background: url("../img/icon-sanjiaoxing-b.png") no-repeat;
                background-size: 100% 100%;
                background-size: 100% 100%;
                position: absolute;
                left:calc(50% - 3px);
                top: 33px;
            }
        }
    }
    .Financial_list{
        margin: 8px 16px 0 16px;
        overflow: auto;
        .Financial_item{
            width: 343px;
            height: 190px;
            border-radius: 6px;
            &.noCheak{
                height: 242px;
            }
            overflow: hidden;
            background: #FFFFFF;
            margin-bottom: 12px;
            position: relative;
            .item-tag{
                background: url("../img/tag-Financial.png") no-repeat center;
                background-size: 100% 100%;
                width: 30px;
                height: 40px;
                position: absolute;
                top: 0;
                left: 0;
            }
            .item-head{
                padding: 15px 0;
                margin: 0 8px;
                border-bottom: .5px solid #E8EAEF;
                text-align: left;
                .head-code{
                    font-family: Helvetica-Bold;
                    font-size: 16px;
                    color: #1A2231;
                    padding-left: 32px;
                    line-height: 20px;
                }
                .head-time{
                    padding-left: 32px;
                    font-size: 12px;
                    font-weight: normal;
                    display: flex;
                    justify-items: flex-start;
                    align-items: center;
                    line-height: 17px;
                    .time-left{
                        color: #AAACB7;
                    }
                    .time-right{
                        color: #FF6700;
                        margin-left: auto;
                    }
                    .time-right-phone{
                        margin-left: auto;
                        background: url("../img/icon-tele.png") no-repeat center;
                        background-size:100% 100%;
                        width: 20px;
                        height: 20px;
                        display: inline-block; 
                    }
                }
            }
            .item-body{
                padding: 15px 0;
                margin: 0 8px;
                p{
                    line-height: 20px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    .body-title{
                        font-size: 14px;
                        color: #777B87;
                        width: 73px;
                    }
                    .body-content{
                        font-size: 14px;
                        color: #1A2231;
                        &.remarks{
                            width: 258px;
                            max-height: 40px; 
                            overflow: hidden;            
                            text-overflow: ellipsis;            
                            display: -webkit-box;            
                            -webkit-line-clamp: 2;            
                            -webkit-box-orient: vertical;
                        }
                    }                  
                }
                .body-botton{
                    margin: 46px 8px 112px 11px;
                    text-align: right;
                    font-size: 14px;
                    line-height: 30px;
                    .botton-cancle{
                        display: inline-block;
                        border: 1px solid rgba(204,206,212, 0.6);
                        border-radius: 8px;
                        width: 104px;
                        height: 30px;
                        color: #1A2231;
                        text-align: center;
                    }
                    .botton-confirm{
                        display: inline-block;
                        border: 1px solid rgba(35,198,203, 0.4);
                        border-radius: 8px;
                        width: 104px;
                        height: 30px;
                        color: #21BDC2;
                        margin-left: 15px;
                        text-align: center;
                    }
                }
            }
        }
    }
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
    background-color:#ffffff;
}
/deep/.van-field__control{
    text-indent: 0;
    background-color: #ffffff;
}
/deep/.van-cell{
    background-color: #ffffff;
}
/deep/.van-search{
    background-color:transparent !important;
}
/deep/.van-search{
    padding: 7px 16px;
}
/deep/.van-search__content{
    padding: 6px 0;
    width: 200px;
    border-radius: 6px;
    background-color: #ffffff;
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
/deep/ .van-cell {
    padding: 0 !important;
}
/deep/ .van-dialog__content{
    margin: 0 16px;
    margin-top: 12px;
    position: relative;
    textarea{
        border-bottom: .5px solid #E8EAEF;
        width: 244px;
        margin-left: 44px;
    }
    span{
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>


