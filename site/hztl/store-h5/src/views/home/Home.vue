<template>
    <div class="Home">
        <div class="con">
            <Exchange @initData='initData' v-show="isShowExchange"/>
            <template v-for="(item,index) in storeData">
                <div class="con-item" v-if="item.show != false" :key="index">
                    <component :data="item" :is="componentList.find((com)=>com.key==item.moduleName).value"></component>
                </div>
            </template>
        </div>
        <TabbarComponentB/>
        <DefaultPhone/>
        <Load :show="show" />
    </div>
</template>
<script>
import Load from "../../../store-common/component/overlayLoad/load";
import DefaultPhone from "@/components/DefaultPhone/Icon";
import TabbarComponentB from "../../../store-common/component/TabbarComponentB";
import request from "@/request";
import Exchange from '../../components/home_components/exchange';

import searchCon from '../../components/home_components/search_con'
import bannerCon from '../../components/home_components/banner_con'
import proListCon from '../../components/home_components/pro_list_con'
import proAreaCon from '../../components/home_components/pro_area_con'
import companyCon from '../../components/home_components/company_con'
import inquiryCon from '../../components/home_components/inquiry_con'
import announcementCon from '../../components/home_components/announcement_con'
import picsCon from '../../components/home_components/pics_con'
import dynamicCon from '../../components/home_components/dynamic_con'
import marketingCon from '../../components/home_components/marketing_con'
import { Toast } from 'vant';
export default {
    components:{
        DefaultPhone,
        TabbarComponentB,
        Exchange,
        searchCon,
        bannerCon,
        proListCon,
        proAreaCon,
        companyCon,
        announcementCon,
        inquiryCon,
        picsCon,
        dynamicCon,
        marketingCon,
        Load
    },
    name:'Home',
    data(){
        return{
            componentList:[
                {
                    key:'搜索',
                    value:'searchCon'
                },{
                    key:'广告图片',
                    value:'bannerCon'
                },{
                    key:'商品目录',
                    value:'proListCon'
                },{
                    key:'商品区',
                    value:'proAreaCon'
                },{
                    key:'商家信息',
                    value:'companyCon'
                },{
                    key:'公告',
                    value:'announcementCon'
                },{
                    key:'询报价',
                    value:'inquiryCon'
                },{
                    key:'图片',
                    value:'picsCon'
                },{
                    key:'实时动态',
                    value:'dynamicCon'
                },{
                    key:'营销板块',
                    value:'marketingCon'
                }
            ],
            storeData:[],
            show:true,
            isShowExchange:false,//是否显示切换店铺
            
        }
    },
    created(){
        this.getstoreData();
        this.getStoreBranches();
    },
    methods:{
        initData(){
            this.getstoreData();
            
        },
        getStoreBranches(){
            request({url: '/companies/store-branches'}).then((res)=>{
                if(res.length>1){
                    this.isShowExchange = true;
                }
            })
        },
        getstoreData(){
            var _this =this;
            _this.show=true;
            request({
                url: '/stores/detail/publish',
                params: {
                    isWeb:false
                }
            }).then((res)=>{
                _this.storeData=res.modules;
                _this.show=false;
                document.title = res.pageSetting.title;
                _this.$forceUpdate();
            }).catch((err)=>{
                _this.show=false;
                if(err && err.message) {
                    Toast.fail(err.message);
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.Home{
    background-color: #f4f4f4;
    .con{
        background: url('../../assets/store/preview-bg1.png') no-repeat;
        background-size: 100% auto;
        width: 375px;
        padding-bottom:100px; 
        position: relative;
        background-color: #f4f4f4;
        padding-top: .1px;
        overflow-x: hidden;
        .con-item {
            box-sizing: border-box;
            padding: 8px 8px 0;
        }
    }
}
</style>