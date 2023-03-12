<template>
    <div id="InquiryDetail">
        <div :class="{'con-top':true,'open':isOpen}">
            <van-nav-bar @click-left="onClickLeft" @click-right="toOrder(formData.wantCode)">
                <span class="left-title" slot="left"></span>
                <span v-if="hasorder" slot="right">查看相关订单</span>
            </van-nav-bar>
            <div class="top-title">
                <span class="title-name">{{formData.statusName}}</span>
                <span class="title-time" v-if="formData.expire">剩余时间：<van-count-down :time="formData.expire*1000" /></span><!--v-if="formData.status==1||formData.status==2"-->
            </div>
            <div :class="{'top-content':true,'open':isOpen}">
                <div :class="{'h-40':!isOpen,'h-34':isOpen&&formData.wantType!=1,'brands-con':isOpen&&formData.wantType==1}" style="position: relative;" >
                    <span v-if="formData.wantType==1" :class="{'content-title':true,'open':isOpen}">询价范围：</span>
                    <span  v-if="formData.wantType==1" :class="{'content-label':true,'brands-Scope':isOpen&&formData.wantType==1}">
                        {{
                            isOpen==true?
                            formData.brandsScope.join(' ')
                            :
                            formData.brandsScope.slice(0,3).join(' ')
                        }}
                    </span>
                    <div class="veh_box">
                        <span  v-if="formData.wantType!=1" :class="{'content-title':true,'open':isOpen}">车型：</span>
                        <span  v-if="formData.wantType!=1" class="content-label ellipsis" >{{formData.factoryBrand}} {{formData.series}} {{formData.year}} {{formData.displacement}} {{formData.gearbox}}</span>
                    </div>
                    
                    <span class="content-open" v-if="!isOpen" @click="open">展开</span>
                    <span style="position: relative;"></span>
                </div>
                <div class="h-25" v-if="formData.wantType!=1">
                    <span class="content-title open">VIN码：</span>
                    <span class="content-label">{{formData.vin}}</span>
                </div>
                <div class="h-25">
                    <span class="content-title open">单号：</span>
                    <span class="content-label">{{formData.wantCode}}</span>
                </div>
                <div class="h-25">
                    <span class="content-title open">发布人：</span>
                    <span class="content-label">{{formData.name}}</span>
                </div>
                <div class="h-25">
                    <span class="content-title open">发布时间：</span>
                    <span class="content-label">{{timeFormat(formData.time)}}</span>
                </div>
                <!-- <div class="h-25">
                    <span class="content-title open">收货信息：</span>
                    <span class="content-label">{{formData.receiveName}}  {{formData.receivePhone}}</span>
                    <span class="content-label area">{{formData.receiveAreaName}}  {{formData.receiveAddress}}</span>
                </div> -->
                <div class="h-25">
                    <span class="content-tag">{{formData.invoiceTypeName}}</span>
                    <span class="content-tag" v-if="formData.deliveryTime">{{formData.deliveryTime}}</span>
                </div>
                <div style="position: relative;padding: 0 0 10px 0;"  class="h-25">
                    <span class="content-remark" v-if="(formData.pictures&&formData.pictures.length>0)||formData.remarks!=''" @click="showPic(formData.pictures,formData.remarks)">查看备注</span>
                    <span class="content-close" v-if="isOpen" @click="close">收起</span>
                </div>
            </div>
        </div>
        <div class="con-middle" v-if="this.formData.receiptCompanyGroup">
            <div class="con-middle-block">
                <span :class="{'con-middle-title':true,'title-default':timeSort.def}">时间</span>
                <span id="time" :class="{'con-middle-do':true,'upper':timeSort.Asc,'default':timeSort.def,'lower':timeSort.lower}"
                    @click="timeAsc()"></span>
            </div>
            <div  class="con-middle-block">
                <span :class="{'con-middle-title':true,'title-default':priceSort.def}">价格</span>
                <span id="price" :class="{'con-middle-do':true,'upper':priceSort.Asc,'default':priceSort.def,'lower':priceSort.lower}"
                    @click="priceAsc()"></span>
            </div>
        </div>
        <van-tree-select  v-if="this.formData.receiptCompanyGroup"
            :items="items"
            :main-active-index.sync="activeIndex"
        >
        <template slot="content">
            <div class="tab-content" v-if='formData.receiptCompanyGroup&&formData.receiptCompanyGroup.length>0&&activeIndex===index' v-for="(item,index) in formData.receiptCompanyGroup" :key="index" >
                <div class="tab-info">
                    <div style="display: flex;
                    justify-content: flex-start;
                    align-items: center;" class="p-t-10">
                        <img src="../../assets/icon-baojia.png" class="tab-info-tag" alt="">
                        <span class="tab-info-label m-l-4">{{item.name}}</span>
                        <img src="../../assets/icon-tele.png" class="tab-info-icon" @click="tel(item.phone)" alt="">
                    </div>
                    <div class="lin-h-25 m-l-24">
                        <span class="tab-info-title">总报价：</span>
                        <span class="tab-info-price" v-if="item.totalFee">¥ {{item.totalFee.split('.')[0]}}<span class="tab-info-price" v-if="item.totalFee.includes('.')">.</span><span class="tab-info-price-litte"  v-if="item.totalFee.includes('.')">{{item.totalFee.split('.')[1]}}</span></span>
                    </div>
                    <div class="m-l-24">
                        <span :title="item.remarks" class="tab-info-mark"  v-if="(item.pictures&&item.pictures.length>0)||item.remarks!=''" @click="showPic(item.pictures,item.remarks)">查看备注</span>
                    </div>
                </div>
                <div class="tab-pro-list">
                    <div class="tab-pro" v-if="item.qualityDetails&&item.qualityDetails.length>0" 
                        v-for="(itemDetail,i) in item.qualityDetails" :key="i">
                                <div class="tab-pro-relative" style="display: flex;
                                    justify-content: flex-start;
                                    align-items: center;">
                                    <span class="tab-pro-OE">名称：</span>
                                    <span class="tab-pro-label m-l-4">{{itemDetail.detail.partName}}</span>
                                    <span class="right" v-if="formData.status==1||formData.status==2">
                                        <img  v-if="itemDetail.detail.price==''||itemDetail.detail.price=='0'||!itemDetail.detail.price|| itemDetail.detail.hasorder||itemDetail.detail.ordered" src="../../assets/icon-no-select.png" class="select" alt="">
                                        <img  v-if="itemDetail.detail.price&&itemDetail.detail.price!='0'&&itemDetail.detail.price!=''&&!itemDetail.detail.nowordered&&!itemDetail.detail.hasorder&&!itemDetail.detail.ordered" @click="ChangeStatus(itemDetail.detail,item)" 
                                        src="../../assets/icon-select1.png" class="select" alt="">
                                        <img  v-if="itemDetail.detail.nowordered&&itemDetail.detail.price&&itemDetail.detail.price!=''&&!itemDetail.detail.hasorder&&!itemDetail.detail.ordered"  @click="ChangeStatus(itemDetail.detail,item)" 
                                        src="../../assets/icon-selected.png" class="select" alt="">                                       
                                    </span>
                                </div>
                                <div>
                                    <span class="tab-pro-OE">OE：</span>
                                    <span class="tab-pro-OE-con">{{itemDetail.detail.partCode}}</span>
                                </div>
                                
                                <div class="tab-pro-relative" style="display: flex;
                                    justify-content: flex-start;flex-wrap: wrap;
                                    align-items: center;">
                                    <span class="tab-pro-pri" v-if="itemDetail.detail.price==''||itemDetail.detail.price=='0'||!itemDetail.detail.price">-</span>
                                    <span class="tab-pro-num" v-else>
                                        <span>¥ {{itemDetail.detail.price.split('.')[0]}}</span>
                                        <span class="tab-pro-num" v-if="itemDetail.detail.price.includes('.')">.</span>
                                        <span class="tab-pro-litte"  v-if="itemDetail.detail.price.includes('.')">{{itemDetail.detail.price.split('.')[1]}}</span>
                                    </span>
                                    <img src="../../assets/tag-xianhuo.png" v-if="itemDetail.detail.stockType=='现货'" class="tab-pro-tag" alt="">
                                    <img src="../../assets/tag-dinghuo.png" v-else class="tab-pro-tag" alt="">
                                    <span class="tab-pro-factory" v-if="itemDetail.detail.brand">{{itemDetail.detail.brand}}</span>
                                    
                                </div>
                                <div >
                                    <div style="display:flex;" 
                                        v-if="itemDetail.detail.price&&itemDetail.detail.price!='0'&&itemDetail.detail.price!=''&&!itemDetail.detail.hasorder&&!itemDetail.detail.ordered&&(formData.status==1||formData.status==2)">

                                        <span class="tab-pro-OE">数量：</span>
                                        <van-stepper  
                                            style="display:inline-block;"
                                            v-model="itemDetail.detail.qty" 
                                            min="1" 
                                            integer >
                                        </van-stepper>
                                    </div>
                                    <span class="tab-pro-red" v-if="itemDetail.detail.ordered">已采购</span>
                                    <span class="tab-pro-red" v-if="!itemDetail.detail.ordered&&itemDetail.detail.hasorder&&itemDetail.detail.price&&itemDetail.detail.price!=''&&itemDetail.detail.price!='0'">已勾选</span>
                                    <span  v-if="itemDetail.detail.price==''||itemDetail.detail.price=='0'||!itemDetail.detail.price" class="tab-pro-red">未报价</span>
                                </div>
                                <div>
                                    <span class="tab-pro-OE">品质：</span>
                                    <template v-for="(qualityInfo,q) in itemDetail.qualityInfo">
                                        <span :key="q" class="tab-pro-pritiy"
                                        :class="{'choosed':qualityInfo == itemDetail.detail}"
                                        @click="choseQuality(itemDetail,qualityInfo)"
                                        >{{qualityInfo.quality}}</span>
                                    </template>
                                </div>
                            <!-- </div>
                        </template> -->
                    </div>

                    <!-- <div class="tab-pro" v-if="item.details&&item.details.length>0" v-for="(detail,i) in item.details" :key="i">
                        <div class="tab-pro-relative" style="display: flex;
                            justify-content: flex-start;
                            align-items: center;">
                            <img src="../../assets/tag-xianhuo.png" v-if="detail.stockType=='现货'" class="tab-pro-tag" alt="">
                            <img src="../../assets/tag-dinghuo.png" v-else class="tab-pro-tag" alt="">
                            <span class="tab-pro-label m-l-4">{{detail.partName}}</span>
                            <span class="right" v-if="formData.status==1||formData.status==2">
                                <img  v-if="detail.price==''||detail.price=='0'||!detail.price|| detail.hasorder||detail.ordered" src="../../assets/icon-no-select.png" class="select" alt="">
                                <img  v-if="detail.price&&detail.price!='0'&&detail.price!=''&&!detail.nowordered&&!detail.hasorder&&!detail.ordered" @click="ChangeStatus(detail,item)"
                                src="../../assets/icon-select1.png" class="select" alt="">
                                <img  v-if="detail.nowordered&&detail.price&&detail.price!=''&&!detail.hasorder&&!detail.ordered"  @click="ChangeStatus(detail,item)"
                                src="../../assets/icon-selected.png" class="select" alt="">
                            </span>
                        </div>
                        <div>
                            <span class="tab-pro-OE">OE：</span>
                            <span class="tab-pro-OE-con">{{detail.partCode}}</span>
                        </div>
                        <div>
                            <span class="tab-pro-pritiy">{{detail.quality}}</span>
                            <span class="tab-pro-factory" v-if="detail.brand">{{detail.brand}}</span>
                        </div>
                        <div class="tab-pro-relative">
                            <span class="tab-pro-pri">单价：</span>
                            <span class="tab-pro-pri" v-if="detail.price==''||detail.price=='0'||!detail.price">-</span>
                            <span class="tab-pro-num" v-else>¥ {{detail.price.split('.')[0]}}
                                <span class="tab-pro-num" v-if="detail.price.includes('.')">.</span>
                                <span class="tab-pro-litte"  v-if="detail.price.includes('.')">{{detail.price.split('.')[1]}}</span>
                            </span>
                            <span class="right">
                                <van-stepper  v-if="detail.price&&detail.price!='0'&&detail.price!=''&&!detail.hasorder&&!detail.ordered&&(formData.status==1||formData.status==2)"
                                v-model="detail.qty" min="1" integer ></van-stepper>
                                <span class="tab-pro-red" v-if="detail.ordered">已采购</span>
                                <span class="tab-pro-red" v-if="!detail.ordered&&detail.hasorder&&detail.price&&detail.price!=''&&detail.price!='0'">已勾选</span>
                                <span  v-if="detail.price==''||detail.price=='0'||!detail.price" class="tab-pro-red">未报价</span>
                            </span>
                        </div>
                    </div> -->
                </div>
                <div class="tab-pro-bottom left" v-if="formData.status==1||formData.status==2">
                    <div class="left" >
                        <img  v-if="item.hasorder" src="../../assets/icon-no-select.png" class="select" alt="">
                        <img  v-if="!item.isAll&&!item.hasorder" @click="checkAll(item)"
                        src="../../assets/icon-select1.png" class="select" alt="">
                        <img  v-if="item.isAll&&!item.hasorder"  @click="checkAll(item)"
                        src="../../assets/icon-selected.png" class="select" alt="">
                        <span class="pro-bottom-choose">全选整单</span>
                    </div>
                </div>
            </div>
        </template>
        </van-tree-select>
        <div class="no_price" v-else>
            <span>暂无报价</span>
        </div>
        <div class="tab-pro-bottom right" v-if="this.formData.receiptCompanyGroup">
            <div class="right">
                <span class="btn-finish" v-if="formData.status==1||formData.status==2" @click="finish">结束询价</span>
                <span class="btn-submit" v-if="formData.status==3" @click="ShowDetail('new')">再来一单</span>
                <span class="btn-submit" v-if="formData.status==4" @click="ShowDetail('repush')">重新发布</span>
                <span class="btn-submit"  v-if="formData.status==1||formData.status==2" @click="checkpick">提交订单({{checkCount}})</span>
            </div>
        </div>
        <van-image-preview
            v-model="showpic"
            :images="images"
            @change="onChange"
            >
            <template v-slot:index>{{ index+1 }}/{{images.length}}</template>
            <template v-slot:cover>备注信息：{{remark}}</template>
        </van-image-preview>
    </div>
</template>
<script>
import Vue from "vue";
import { NavBar,Toast,TreeSelect,CountDown,ImagePreview,Stepper } from "vant";
Vue.use(NavBar).use(Toast).use(TreeSelect).use(CountDown).use(ImagePreview).use(Stepper)
import { GetQueryString } from './../../../src/request/http'
import request, { URL_MODULE } from "@/request";
import { Dialog } from 'vant';
export default {
    name:'InquiryDetail',
    data(){
        return{
            isOpen:false,
            wantCode:'',
            showpic:false,
            index: 0,
            images:[],
            remark:'',
            formData:{
            },
            timeSort:{
                Asc:true,
                def:false,
                lower:false,
            },
            priceSort:{
                Asc:false,
                def:true,
                lower:false,
            },
            activeIndex: 0,
            items: [],
            checkCount:0,
            hasorder:false,
        }
    },
    created(){
        this.load()
    },
    methods:{
        tel(phone){
            window.location.href="tel:"+phone;
        },
        toOrder(wantCode){
            this.$router.push('/orderList?wantCode='+wantCode);
        },
        showPic(list,remarks){
            this.images=list;
            this.showpic=true;
            this.remark=remarks;
        },
        onChange(index){
            this.index=index;
        },
        open(){
            this.isOpen=true;
            this.$forceUpdate();
        },
        close(){
            this.isOpen=false;
            this.$forceUpdate();
        },
        onClickLeft(){
            this.$router.push('Inquiry');
        },
        load(){
            this.wantCode=GetQueryString('wantCode');//XJ202001101535304827
            if(this.wantCode){
                this.getpublisher()
            }
        },
        getpublisher(){
            request({
                baseURL: URL_MODULE.united,
                url: '/wants-v2/wants/publisher/'+this.wantCode
            }).then((data)=>{
                if(data){
                    this.formData=data;
                    this.items=[];
                    if(data.receiptCompanyGroup&&data.receiptCompanyGroup.length>0){
                        data.receiptCompanyGroup.forEach((item)=>{
                            this.items.push({text:item.companyName});
                            // if(item.details){
                            //     item.details.forEach((detail)=>{
                            //         if(detail.ordered){
                            //             this.hasorder=true
                            //         }
                            //     })
                            // }
                            if(item.qualityDetails){
                                item.qualityDetailsList = [];
                                item.qualityDetails.forEach((itemQuality)=>{
                                    if(itemQuality.detail.ordered){
                                        this.hasorder=true
                                    }
                                    if(itemQuality.qualityInfo){
                                        itemQuality.qualityInfo.forEach(itemInfo =>{
                                            let obj = {
                                                ...itemQuality.detail,
                                                ...itemInfo
                                            }
                                            item.qualityDetailsList.push(obj);
                                        });
                                        itemQuality.qualityInfo = item.qualityDetailsList;
                                        itemQuality.detail = item.qualityDetailsList[0];
                                    }
                                })
                            }
                        })
                    }else{
                        this.isOpen=true;
                        this.$forceUpdate();
                    }
                }
            }).catch(err => {
                if(err && err.message) {
                    Toast.fail(err.message)
                }
            })
        },
        getpublisherOld(){
            request({
                baseURL: URL_MODULE.united,
                url: '/wants-v2/wants/publisher/'+this.wantCode
            }).then((data)=>{
                if(data){
                    this.formData=data;
                    this.items=[];
                    if(data.receiptCompanyGroup&&data.receiptCompanyGroup.length>0){
                        data.receiptCompanyGroup.forEach((item)=>{
                            this.items.push({text:item.companyName});
                            if(item.details){
                                item.details.forEach((detail)=>{
                                    if(detail.ordered){
                                        this.hasorder=true
                                    }
                                })
                            }
                        })
                    }else{
                        this.isOpen=true;
                        this.$forceUpdate();
                    }
                }
            }).catch(err => {
                if(err && err.message) {
                    Toast.fail(err.message)
                }
            })
        },
        finish(){//结束报价
            Dialog.confirm({title: '提示',
                message: '确定要结束询价单（'+this.wantCode+'）吗?',
                confirmButtonText:'确定'}).then(() => {
                request({
                    method: "post",
                    baseURL: URL_MODULE.united,
                    url: '/wants-v2/wants/status/end',
                    data: {
                        wantCode: this.wantCode
                    }
                }).then(() => {
                    Toast.success("操作成功！");
                    this.load();
                }).catch(err => {
                    if(err && err.message) {
                        Toast.fail(err.message);
                    }
                })
            }).catch(() => {

            });
        },
        ShowDetail(type){
            this.$router.push('/post_Inquiry?wantCode='+this.wantCode+"&type="+type)
        },
        timeAsc(){
            if(this.timeSort.Asc){
                this.timeSort.Asc=false
                this.timeSort.lower=true
                this.formData.receiptCompanyGroup=this.sortKey(this.formData.receiptCompanyGroup,'offerTime','desc')
            }else if(this.timeSort.lower){
                this.timeSort.lower=false;
                this.timeSort.Asc=true;
                this.formData.receiptCompanyGroup=this.sortKey(this.formData.receiptCompanyGroup,'offerTime','asc')
            }else if(this.timeSort.def){
                this.timeSort.def=false
                this.timeSort.Asc=true
                this.priceSort.def=true
                this.priceSort.Asc=false
                this.priceSort.lower=false
                this.formData.receiptCompanyGroup=this.sortKey(this.formData.receiptCompanyGroup,'offerTime','asc')
            }
            this.$forceUpdate()
        },
        priceAsc(){
            if(this.priceSort.def){
                this.priceSort.Asc=true
                this.priceSort.def=false
                this.timeSort.def=true
                this.timeSort.Asc=false
                this.timeSort.lower=false
                this.formData.receiptCompanyGroup=this.sortKey(this.formData.receiptCompanyGroup,'totalFee','asc')
            }else if(this.priceSort.Asc){
                this.priceSort.Asc=false
                this.priceSort.lower=true
                this.formData.receiptCompanyGroup=this.sortKey(this.formData.receiptCompanyGroup,'totalFee','desc')
            }else if(this.priceSort.lower){
                this.priceSort.Asc=true
                this.priceSort.lower=false
                this.formData.receiptCompanyGroup=this.sortKey(this.formData.receiptCompanyGroup,'totalFee','asc')
            }
            this.$forceUpdate()
        },
        sortKey(array, key,type) {
            if(type=="asc"){
                if(key == "totalFee"){
                    return array.sort(function(a, b) {
                        var x = Number(a[key]);
                        var y = Number(b[key]);
                        return x > y ? -1 : x < y ? 1 : 0;
                    });
                }else{
                   //这里需要转时间戳
                    return array.sort(function(a, b) {
                        var x = new Date(a[key].split(".")[0].split("T").join(" "))/1000;
                        var y = new Date(b[key].split(".")[0].split("T").join(" "))/1000;
                        return x > y ? -1 : x < y ? 1 : 0;
                    });
                }
            }else{
                if(key == "totalFee"){
                    return array.sort(function(a, b) {
                        var x = Number(a[key]);
                        var y = Number(b[key]);
                        return x > y ? 1 : x < y ? -1 : 0;
                    });
                }else{
                    return array.sort(function(a, b) {
                        var x = new Date(a[key].split(".")[0].split("T").join(" "))/1000;
                        var y = new Date(b[key].split(".")[0].split("T").join(" "))/1000;
                        return x > y ? 1 : x < y ? -1 : 0;
                    });
                }
            }

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
        checkpick(){
            let isCheck=true;
            let details=[];
            let receiptDetailIds=[];
            this.formData.receiptCompanyGroup.forEach((Company)=>{
                if(Company.isAll){
                    isCheck=false;
                    // Company.details.forEach((detail)=>{
                    Company.qualityDetailsList.forEach((detail)=>{
                        if(detail.price&&detail.price!="0"&&!detail.ordered&&detail.nowordered){
                            details.push({
                                receiptDetailId:detail.id,
                                qty:detail.qty
                            })
                        }
                    })
                    sessionStorage.setItem('wantCode',this.wantCode);
                    sessionStorage.setItem('details',JSON.stringify(details))
                    this.$router.push('ConfirmOrderByWant')
                    return;
                }else{
                    // Company.details.forEach((detail)=>{
                    Company.qualityDetailsList.forEach((detail)=>{
                        if(detail.price&&detail.price!="0"&&!detail.ordered&&detail.nowordered){
                            details.push({
                                receiptDetailId:detail.id,
                                qty:detail.qty
                            })
                            receiptDetailIds.push(detail.id)
                        }
                    })
                }
            })
            if(isCheck){
                request({
                    method: "post",
                    baseURL: URL_MODULE.united,
                    url: '/wants-v2/wants/check-pick',
                    data: {
                        wantCode:this.wantCode,
                        receiptDetailIds:receiptDetailIds 
                    }
                }).then((data)=>{
                    if(data&&data.length){
                            Dialog.confirm({
                                title: "提示",
                                message: `${data.join('、')}还未选购，您确定要提交订单吗?`,
                                confirmButtonText:'继续提交'
                            })
                            .then(() => {
                                sessionStorage.setItem('wantCode',this.wantCode);
                                sessionStorage.setItem('details',JSON.stringify(details))
                                this.$router.push('ConfirmOrderByWant')
                            })
                            .catch(() => {
                            });
                        }else{
                            sessionStorage.setItem('wantCode',this.wantCode);
                            sessionStorage.setItem('details',JSON.stringify(details))
                            this.$router.push('ConfirmOrderByWant')
                        }
                }).catch(err => {
                    if(err && err.message) {
                        Toast.fail(err.message)
                    }
                })
            }
        },
        ChangeStatus(item,Company){
            if(!item.nowordered){ //如果有选择，把其他的设置为已订购 hasorder:是否有其他商品被勾选，ordered:当前商品是否勾选
                this.setordered(item.wantDetailId,true)
                item.hasorder=false;
                item.nowordered=true;
                this.checkCount++;
            }else{  //未选择都可以订购
                this.setordered(item.wantDetailId,false)
                item.nowordered=false;
                this.checkCount--;
            }
            this.checkisAll(Company)
        },
        checkisAll(Company){  //判断是否全选
            // let isAll=Company.details.every((item)=>{
            let isAll=Company.qualityDetailsList.every((item)=>{
                return item.nowordered==true
            })
            if(isAll){
                Company.isAll=true
                this.setisAll(true);
                Company.hasorder=false;
            }else{
                Company.isAll=false;
                this.setisAll(false)
            }
        },
        setordered(wantDetailId,value){
            this.formData.receiptCompanyGroup.forEach((Company)=>{
                // let details=Company.details;
                let details=Company.qualityDetailsList;
                details.forEach((detail)=>{
                    if(detail.wantDetailId==wantDetailId){
                        detail.hasorder=value;
                    }
                })
            })
        },
        setisAll(value){
            this.formData.receiptCompanyGroup.forEach((Company)=>{
                Company.hasorder=value
            })
        },
        checkAll(item){
            if(!item.isAll){//全选
                this.checkCount=0
                this.setisAll(true)
                item.isAll=true
                item.hasorder=false
        //         item.details.forEach((it)=>{
        //             this.setordered(it.wantDetailId,true)
        //             if(!it.ordered&&it.price&&it.price!="0"){
        //                 it.nowordered=true;
        //                 this.checkCount++; 
        //             }
        //             it.hasorder=false;
        //         })
                item.qualityDetailsList.forEach((it)=>{
                    this.setordered(it.wantDetailId,true)
                    if(!it.ordered&&it.price&&it.price!="0"){
                        it.nowordered=true;
                        this.checkCount++; 
                    }
                    it.hasorder=false;
                })
            }else{//取消全选
                this.checkCount=0;
                item.isAll=false
                this.setisAll(false)
    //             item.details.forEach((it)=>{
    //                 this.setordered(it.wantDetailId,false)
    //                 it.nowordered=false; 
    //             })
                item.qualityDetailsList.forEach((it)=>{
                    this.setordered(it.wantDetailId,false)
                    it.nowordered=false; 
                })
            }

        },
        choseQuality(itemDetail, quality) {
            itemDetail.detail = quality;
            this.$forceUpdate();
        }
    }
}
</script>
<style lang="less" scoped>
#InquiryDetail{
    font-family: PingFang-SC-Medium;
    color: #1a2231;
    min-height: 100vh;
    .m-l-4{
        margin-left: 4px;
    }
    .m-l-24{
        margin-left: 24px;
    }
    .p-t-10{
        padding-top: 10px;
    }
    .lin-h-25{
        line-height: 32px;
    }
    .left-title{
        font-size: 17px;
        &::before{
            content: "";
            display: inline-block;
            width: 8px;
            height: 14px;
            margin-right: 9px;
            background: url("../../assets/back-icon-bai.png");
            background-size:100% 100%;
        }
    }
    .con-top{
        height: 152px;
        &.open{
            height: 340px;
        }
        color: #FFFFFF;
        text-align: left;
        padding: 0 16px;
        background-image: linear-gradient(-211deg, #35CED3 7%, #00a8ea 100%);
        .top-title{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .title-name{
                font-size: 24px;
                font-weight: bolder;
            }
            .title-time{
                margin-left: auto;
                font-size: 14px;
                color: #FFFFFF;
                &::before{
                    content: "";
                    background: url("../../assets/icon-shizhong.png") no-repeat;
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    background-size: 12px 12px;
                    margin-right:4px;
                }
            }
        }
        .top-content{
            background: #FFFFFF;
            border-radius: 6px;
            height: 40px;
            margin-top: 9px;
            position: relative;
            padding: 0 10px;
            overflow: hidden;
            margin-bottom: 16px;
            vertical-align: middle;
            .h-40{
                height: 40px;
                line-height: 40px;
            }
            .h-34{
                height: 34px;
                line-height: 34px;
            }
            .veh_box{
                display: flex;
                align-items: center;
            }
            .ellipsis{
                flex:1;
                margin-right: 20px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
            }
            .h-25{
                height: 25px;
                line-height: 25px;
            }
            .brands-con{
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                line-height: 34px;
            }
            &.open{
                height: auto;
            }
            .content-title{
                font-size: 14px;
                color: #777B87;
                display: inline-block;
                vertical-align: text-top;
                // &.open{
                //     width: 70px;
                // }
            }
            .content-label{
                display: inline-block;
                vertical-align: text-top;
                font-size: 14px;
                color: #1A2231;
            }
            .brands-Scope{
                width: 250px;
            }
            .content-tag{
                font-size: 12px;
                color: #777B87;
                background: rgba(221,223,231, 0.3);
                padding: 2px 10px;
                border-radius: 4px;
                &:not(:first-child){
                    margin-left: 10px;
                }
            }
            .content-remark{
                font-size: 14px;
                color: #777B87;
                position: relative;
                &::after{
                    content: "";
                    background: url("../../assets/icon-remark.png") no-repeat;
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    background-size: 100% 100%;
                    position: absolute;
                    left: 60px;
                    top:3px;
                }
            }
            .content-open{
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 10px;
                color: #777B87;
                &::after{
                    content: "";
                    background: url("../../assets/icon-zhankai.png") no-repeat;
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    background-size: 100% 100%;
                    margin-left:4px;
                    position: absolute;
                    top:50%;
                    transform: translateY(-50%);
                }
            }
            .content-close{
                right: 20px;
                position: absolute;
                top:50%;
                transform: translateY(-50%);
                font-size: 10px !important;
                color: #777B87;
                &::after{
                    content: "";
                    background: url("../../assets/icon-shouqi.png") no-repeat;
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    background-size: 100% 100%;
                    margin-left:4px;
                    position: absolute;
                    top:50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
    .con-middle{
        text-align: center;
        height: 44px;
        border-bottom: 0.5px solid #E8EAEF;
        .con-middle-block{
            display: inline-block;
            width: 94px;
            height: 44px;
            float: left;
            .con-middle-title{
                font-size: 14px;
                color: #1A2231;
                text-align: center;
                font-weight: bold;
                line-height: 44px;
                &.title-default{
                    font-size: 14px;
                    color: #777B87;
                    font-weight: normal;
                }
            }
            .con-middle-do{
                display: inline-block;
                width: 14px;
                height: 14px;
                cursor: pointer;
            }
            .default{
                background: url("../../assets/icon-defulat.png");
                background-size:100% 100%;
            }
            .upper{
                background: url("../../assets/icon-upper.png");
                background-size:100% 100%;
            }
        }
        .lower{
            background: url("../../assets/icon-lower.png");
            background-size:100% 100%;
        }
    }
    .no_price{
        padding:10px;
    }
    .tab-content{
        padding: 0 20px;
        text-align: left;
        .tab-info{
            height: 90px;
            border-bottom: 0.5px solid #E8EAEF;
            .tab-info-tag{
                width: 20px;
                height: 20px;
            }
            .tab-info-icon{
                width: 18px;
                height: 18px;
                margin-left:auto;
            }
            .tab-info-label{
                font-size: 14px;
                color: #1A2231;
            }
            .tab-info-title{
                font-size: 14px;
                color: #1A2231;
            }
            .tab-info-price{
                font-size: 14px;
                color: #F43540;
                font-weight: bold;
            }
            .tab-info-price-litte{
                font-size: 10px;
                color: #F43540;
            }
            .tab-info-mark{
                font-size: 12px;
                color: #777B87;
                position: relative;
                &::after{
                    content: "";
                    background: url("../../assets/icon-remark-d.png") no-repeat;
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    background-size: 100% 100%;
                    position: absolute;
                    left: 50px;
                    top:3px;
                }
            }
            .tab-info-pic{
                font-size: 12px;
                color: #1A2231;
                cursor: pointer;
            }
        }
        .tab-pro-list{
            max-height: calc(100vh - 7.3333rem);
            overflow: auto;
            line-height: 28px;
            .tab-pro{
                background: #FFFFFF;
                border: 1px solid #EDEFF1;
                box-shadow: -1px -1px 7px 0 rgba(0,0,0,0.06), 1px 1px 7px 0 rgba(0,0,0,0.06);
                border-radius: 6px;
                margin-top: 10px;
                padding: 10px 8px;
                &&:last-child{
                    margin-bottom: 10px;
                }
                .disabled{
                    color: #777B87;
                }
                .tab-pro-tag{
                    width: 34px;
                    height: 20px;
                }
                .tab-pro-label{
                    font-size: 14px;
                    color: #1A2231;
                }
                .tab-pro-OE{
                    font-size: 12px;
                    color: #777B87;
                }
                .tab-pro-OE-con{
                    font-size: 12px;
                    color: #1A2231;
                }
                .tab-pro-pritiy{
                    display: inline-block;
                    // border: 1px solid rgba(9,217,122,0.30);
                    border-radius: 14px;
                    font-size: 12px;
                    line-height: 14px;
                    color: #01CE70;
                    padding: 5px;
                    color: #333333;
                    background: #f5f5f5;
                    // &::before{
                    //     content: "";
                    //     display: inline-block;
                    //     width: 14px;
                    //     height: 14px;
                    //     margin:-3px 0;
                    //     background: url("../../assets/icon-pingzhi.png") no-repeat;
                    //     background-size: 14px 14px;
                    // }
                }
                .choosed {
                    color: #ed3947;
                    background: #f7e9ea;
                    border: 1px solid #ed3947;
                }
                img{
                    margin: 0 8px;
                }
                .tab-pro-factory{
                    line-height: 20px;
                    font-size: 12px;
                    color: #189CE3;
                    padding: 0 7px;
                    border: 0.5px solid rgba(39,179,255,0.3);
                    border-radius: 4px;
                }
                .tab-pro-pri{
                    font-size: 12px;
                    color: #777B87;
                }
                .tab-pro-num{
                    font-size: 12px;
                    color: #F43540;
                    font-weight: bold;
                }
                .tab-pro-litte{
                    font-size: 10px;
                    color: #F43540;
                }
                .tab-pro-relative{
                    position: relative;
                }
                .right{
                    position: absolute;
                    right: 0;
                    .tab-pro-red{
                        font-size: 12px;
                        color: #F43540;
                    }
                    .select{
                        width: 18px;
                        height: 18px;
                    }
                }
            }
        }

    }
    .tab-pro-bottom{
        position: fixed;
        bottom: 0;
        height: 49px;
        line-height: 39px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &.left{
            width: 90px;
            left: 16px;
            border-top:0.5px solid #E8EAEF;
        }
        &.right{
            border-top:0.5px solid #E8EAEF;
            width: 305px;
            right: 0px;
        }
        .left{
            .select{
                width: 18px;
                height: 18px;
                position: absolute;
                top: 50%;
                margin-top: -9px;
            }
            .pro-bottom-choose{
                font-size: 12px;
                color: #1A2231;
                margin-left: 22px;
            }
        }
        .right{
            margin-left: auto;
            margin-right: 16px;
            span:not(:first-child){
                margin-left: 15px;
            }
            .btn-finish{
                display: inline-block;
                width: 104px;
                height: 40px;
                line-height: 40px;
                border: 1px solid rgba(204,206,212, 0.6);
                border-radius: 8px;
                font-size: 14px;
                color: #1A2231;
                text-align: center;
            }
            .btn-submit{
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
    }
}
/deep/.van-hairline--bottom::after{
    display: none
}
/deep/.van-nav-bar{
    background-color:unset;
}
/deep/.van-nav-bar__left{
    left: 0;
}
/deep/.van-nav-bar__right{
    font-size: 17px;
    right: 0;
}
/deep/.van-count-down{
    color: #FFFFFF;
    font-size: 14px;
    display: inline;
}
/deep/.van-tree-select{
    // height: 100vh!important;
    height: calc( 100vh - 30px ) !important;
    overflow: auto;
}
/deep/.van-sidebar-item--select{
    border-color:#00a8ea;
}
/deep/.van-tree-select__item--active{
    color: #00a8ea !important;
}
/deep/.van-sidebar-item--select{
    font-size: 11px;
    color: #00a8ea;
}
/deep/.van-image-preview__cover{
    top:unset;
    bottom: 20px;
    font-size: 12px;
    color: #FFFFFF;
    padding: 10px;
}
/deep/.van-dialog__confirm, /deep/.van-dialog__confirm:active{
    color:#00a8ea !important;
}
/deep/.van-swipe-item{
    width: 100vw;
    height: 90vh !important;
}
</style>


