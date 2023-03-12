<template>
    <div class="brandManageAdd">
        <van-nav-bar title="" left-text="" right-text="" left-arrow  @click-right="onClickRight"  @click-left="onClickLeft">
            <img src="../../../assets/back-icon.png" slot="left" class="Back">
            <span  slot="right" v-if="!choose" class="nav-right-button" >完成</span>
            <span  slot="right" v-else class="nav-right-button" >确认</span>
        </van-nav-bar>
        <div class="brand-select-list">
            <van-index-bar>
                <van-checkbox-group v-model="result" ref="checkboxGroup">
                    <van-index-anchor v-for="(item,index) in brandList" :index="item.capitalization" :key="index">
                        <span class="indexWord">{{item.capitalization}}</span>
                        <van-cell
                            v-for="(brand,num) in item.names"
                            :key="num"
                        >
                            <van-checkbox :name="brand" v-if="! hasSelect.includes(brand)" ref="checkboxes" slot="icon">
                                <img slot="icon" slot-scope="props" class="icon-18"
                                    :src="props.checked ? activeIcon : inactiveIcon"
                                >{{brand}}
                            </van-checkbox>
                            <div class="brand-noselect" v-if="hasSelect.includes(brand)">
                                    <img  class="brand-noselect-img icon-18" slot="icon" src="../../../assets/icon-noselected.png" >
                                    <span class="brand-noselect-span" slot="value">{{brand}}</span>
                            </div>
                            
                        </van-cell>
                    </van-index-anchor>
                </van-checkbox-group>           
            </van-index-bar>
        </div>
        <div class="brand-bottom" v-if="!choose">
                <van-checkbox ref="checkboxes" class="bottom-select" v-model="allSelect" >
                    <img slot="icon" slot-scope="props" class="icon-18"
                        :src="props.checked ? activeIcon : inactiveIcon"
                        >全选
                </van-checkbox>
                <span class="bottom-to-manage" @click="brandAddSure">添加({{selectNum}})</span>
        </div>
    </div>
</template>
    <script>
        import Vue from "vue";
        import { NavBar,IndexBar, IndexAnchor,Cell,CellGroup,CheckboxGroup,Checkbox,Toast} from 'vant';
        Vue.use(NavBar).use(IndexBar).use(IndexAnchor).use(Cell).use(CellGroup).use(CheckboxGroup).use(Checkbox).use(Toast)
        import { GetQueryString } from './../../../../src/request/http';
        import request from "@/request";
    export default{
        name:"brandManageAdd",
        data(){
            return{
                brandList:[],
                brandName:[],
                result:[],
                activeIcon:require("../../../assets/icon-select.png"),
                inactiveIcon:require("../../../assets/icon-noselect.png"),
                allSelect:false,
                hasSelect:[],
                selectNum:0,
                isSell:false,
                complete:false,
                choose:false,
                type:'',
            }
        },
        created(){
            this.choose=GetQueryString("choose");
            this.type=GetQueryString("type");
            if(GetQueryString('brand')){
                this.result=decodeURIComponent(GetQueryString('brand')).split(",");
            }
            this.load()
            this.isSell=this.$route.params.isSell;
            this.complete=this.$route.params.complete;
        },
        watch:{
            allSelect:{
                handler(newVal){
                    if(newVal==true){
                        this.$refs.checkboxGroup.toggleAll(true);
                        this.result=this.brandName;
                    }else{
                        this.result=[];
                    }
                },
                immediate:true
            },
            result:{
                handler(newVal){
                    if(this.result.length>=this.brandName.length){ //全选时，去掉已经选择的   
                        this.selectNum=this.result.length-this.hasSelect.length; 
                    }else{
                        this.selectNum=this.result.length 
                    }                 
                },
                immediate:true
            }
        },
        methods:{
            load:function(){
                this.selectNum=[];
                this.allSelect=false
                request({
                    url: '/brands/hump-group'
                }).then(res => {
                    this.brandList = res || [];
                    let brandArry = [];
                    this.brandList.forEach(element => {
                        brandArry.push(element.names)
                    });
                    this.brandName = brandArry.flat();
                }).catch(err => {
                    if(err && err.message) {
                        Toast.fail(err.message);
                    }
                });
                request({
                    url: '/companies'
                }).then(res => {
                    if(res && res.vehBrands && !this.choose) {
                        this.hasSelect = res.vehBrands;
                    }
                }).catch(err => {
                    if(err && err.message) {
                        Toast.fail(err.message);
                    }
                });
            },
            onClickRight:function(){
                if(this.choose&&!this.type){
                    this.$router.push("home?chooseBrand="+this.result);
                }else if(this.choose&&this.type=='Inquiry'){
                    this.$router.push("post_Inquiry?chooseBrand="+this.result);
                }else{
                    this.historyBack(-1);
                }
            },
            onClickLeft:function(){
                this.historyBack(-1);
            },
            brandAddSure:function(){
                let _this=this;
                let subscribeVehBrands = _this.result.concat(_this.hasSelect);
                let param={
                    subscribeVehBrands:subscribeVehBrands
                }
                if(_this.isSell){ //添加品牌
                    this.$router.push({name:'acountSell',params:{subscribeVehBrands:subscribeVehBrands}})
                }else if(_this.complete){
                    this.$router.push({name:'Complete',params:{subscribeVehBrands:subscribeVehBrands}})
                }
                else{
                    request({
                        method: "post",
                        url: '/alliance-members/subscribe-veh-brands',
                        data: param
                    }).then(() => { //删除品牌
                        Toast.success("操作成功！");
                        _this.load();
                    }).catch(err => {
                        if(err && err.message) {
                            Toast.fail(err.message);
                        }
                    });
                }
                
            }
        }
    }
    </script>
    <style lang="less">
    .brandManageAdd{
        font-family: PingFang-SC-Medium;
        min-height: 100vh;
        background: #FFFFFF;
        .nav-right-button{
            margin-left: 20px;
            display:inline-block;
            width:48px;
            height: 30px;
            opacity: 0.6;
            border: 1px solid #CCCED4;
            border-radius: 8px;
            font-size: 14px;
            color: #1A2231;
            letter-spacing: -0.34px;
            text-align: center;
            line-height:30px;
            margin-bottom:7px;
        }
        .brand-select-list{
            overflow: auto;
            min-height: 592px;
            .van-index-anchor .indexWord{
                background: #F1F3F6;
                height: 20px;
                line-height:20px;
                text-align:left;
                display: inherit;
            }
            .van-index-bar__index{
                line-height: 26px;
                font-size: 11px;
                color: #003239;
            }
            .van-cell{
                padding: 16px 16px !important;
                color: #1A2231  !important;
            }
            .brand-noselect{
                display: flex;
                align-items: center;
                .brand-noselect-span{
                    margin-left:8px ;
                    color: #777B87;
                } 
            }                                    
        }
        .brand-bottom{
            width: 343px;
            height: 49px;
            margin: 0 16px;
            position: fixed;
            background: #FFFFFF;
            bottom: 0;
            border-top: 0.5px solid #EDEFF1;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .van-checkbox__label{
                font-size: 12px;
                color: #777B87;
            }
            .bottom-to-manage{
                background: #00a8ea;
                color: #FFFFFF;
                margin-left:auto;
                width: 84px;
                height: 30px;
                line-height: 30px;
                display: inline-block;
                font-size: 14px;
                border-radius: 8px;
            }
        }
    }
    </style>