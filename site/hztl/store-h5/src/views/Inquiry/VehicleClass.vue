<template>
<div id="VehicleClass">
    <van-nav-bar @click-left="onClickLeft">
            <span class="left-title" slot="left">整车分类</span>
        </van-nav-bar>
    <div class="top-bar">
        <span v-for="(item,index) in classList" :key="index" :class="{'bar-item':true,'isActive':active===index}" @click="tagget(index)">{{item.name}}</span>
    </div>
    <van-tree-select v-for="(item,index) in classList" :key="index" v-if="active===index" 
        :items="item.subs"
        :active-id.sync="activeIds"
        :main-active-index.sync="activeIndex"
    />
    <div class="foot" v-show="!isLoad">
        <span @click="Add">添加({{activeIds.length}})</span>
    </div>
    <van-loading size="24px" v-model="isLoad" vertical>加载中...</van-loading>
</div>
</template>
<script>
import Vue from "vue";
import { NavBar,Toast,TreeSelect,Loading,Icon } from "vant";
import $ from "jquery";
Vue.use(NavBar).use(Toast).use(TreeSelect).use(Loading).use(Icon)
import request, { URL_MODULE } from "@/request";
import {GetQueryString} from "../../../src/request/http"
export default {
    name:'VehicleClass',
    data(){
        return{
            factoryBrand:'',
            series:'',
            year:'',
            displacement:'',
            gearbox:'',
            classList:[],
            active:0,
            activeIndex: 0,
            activeIds:[],
            isLoad:false
        }
    },
    created(){
        this.factoryBrand=GetQueryString('factoryBrand')
        this.series=GetQueryString('series')
        this.year=GetQueryString('year')
        this.displacement=GetQueryString('displacement')
        this.gearbox=GetQueryString('gearbox')
        this.getClass()
    },
    methods:{
        onClickLeft(){
            this.$router.push('post_Inquiry');
        },
        tagget(index){
            this.active=index
        },
        getClass(){
            this.isLoad=true;
            request({
                baseURL: URL_MODULE.united,
                url: '/athena/classification/part-names',
                params: {
                    type:0,
                    factoryBrand:this.factoryBrand,
                    series:this.series,
                    year:this.year,
                    displacement:this.displacement,
                    gearbox:this.gearbox
                }
            }).then(data => {
                if(data&&data.length){
                    this.classList=data;
                    this.classList.forEach((item)=>{
                        item.subs.forEach((sub)=>{
                            sub.text=sub.name;
                            sub.children=sub.subs
                            sub.children.forEach((child)=>{
                                child.id=child.name;
                                child.text=child.name;
                            })
                        })
                    })
                    this.isLoad=false;
                }
            }).catch(err => {
                if(err && err.message) {
                    Toast.fail(err.message)
                }
            })
        },
        Add(){
            this.$router.push('post_Inquiry?partName='+this.activeIds)
        }
    }
}
</script>
<style lang="less" scoped>
#VehicleClass{
    font-family: PingFang-SC-Medium;
    color: #1a2231;
    min-height: 100vh;
    overflow: auto;
    .left-title{
        font-size: 17px;
        &::before{
            content: "";
            display: inline-block;
            width: 8px;
            height: 14px;
            margin-right: 9px;
            background: url("../../assets/back-icon.png");
            background-size:100% 100%;
        }
    }
    .top-bar{
        background: #FFFFFF;
        height: 44px;
        min-width: 100%;
        overflow-x: auto;
        display: flex;
        justify-content: flex-start;
        flex-wrap: nowrap;
        align-items: center;
        .bar-item{
            display: inline-block;
            height: 30px;
            font-size: 12px;
            color: #1A2231;
            background: #F3F5F8;
            border-radius: 4px;
            padding: 0 10px;
            line-height: 30px;
            word-break:keep-all;
            white-space:nowrap;  
            &:first-child{
                margin-left: 16px;
            }
            &:not(:first-child){
                margin-left: 14px;
            } 
        }
        .isActive{
            color: #00a8ea;
            background: #E6F9FA;
        }
    }
    .foot{
        height: 49px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span{
            display: inline-block;
            width: 104px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            color: #FFFFFF;
            background: #00a8ea;
            border-radius: 8px;
            margin-left: auto;
            margin-right: 16px;
        }
    }
}
/deep/.van-sidebar-item{
    background-color: #f1f3f6;
}
/deep/.van-sidebar-item--select{
    background-color: #ffffff;
}
/deep/.van-sidebar-item--select{
    border-color:#00a8ea;
}
/deep/.van-sidebar-item--select{
    color: #00a8ea;
}
/deep/.van-tree-select__item--active{
    color: #1A2231 !important;
}
/deep/.van-info--dot{
    background-color:#00a8ea;
}
/deep/.van-tree-select__item{
    font-size: 12px;
    color: #777B87;
    border-bottom:1px solid #E8EAEF;
    margin-left:16px;
    font-weight:normal;
}
/deep/.van-tree-select__selected{
    color:#FF4655;
}
/deep/.van-tree-select{
    overflow: auto;
    height: calc(100vh - 138px) !important;
    border-bottom: 0.5px solid #E8EAEF;
}

/deep/.van-icon-checked:before{
    content: "\F0C8";
}
</style>
<style lang="less">

</style>



