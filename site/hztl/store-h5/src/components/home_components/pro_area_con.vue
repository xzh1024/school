<template>
    <div class="pro_area_con">
        <template v-if="data.settingStyle==0 ">
            <!-- 纵向 -->
            <div class="pro_area_item"  v-for="(item,index) in data.areas" :key="index">
                <div class="item-head">
                    <!-- <span class="icon"></span> -->
                    <i class="iconfont icon-home_tire"></i>
                    <span class="title">{{item.name}}</span>
                    <!-- <span class="more" 
                        v-show="item.proList && item.showNumber &&item.proList.length>=item.showNumber" 
                        @click="getMorePrefecture(item.details&&item.details[0]&&item.details[0].id?item.details[0].id:null,item.type,item.name)">更多</span> -->
                    <span
                        class="more" 
                        @click="getMorePrefecture(item.details&&item.details[0]&&item.details[0].id?item.details[0].id:null,item.type,item.name)"
                    >
                        更多
                        <i class="iconfont icon-direction_right"></i>
                    </span>
                </div>
                <div class="item-body">
                    <div class="pro-item" v-for="(pro,index) in item.proList" @click="ToDetail(item.type,pro.id,pro.companyId)" :key="'pro'+index">
                        <img v-if="pro.image" :src="pro.image" alt="">
                        <div class="pro-img" v-else></div>
                        <div class="promotionTags">
                            <div class="Tag-1" v-if="pro.promotionTags==1||pro.promotionTags==3||pro.promotionTags==5||pro.promotionTags==7"></div>
                            <div class="Tag-2" v-if="pro.promotionTags==3||pro.promotionTags==7||pro.promotionTags==6||pro.promotionTags==2"></div>
                            <div class="Tag-3" v-if="pro.promotionTags==4||pro.promotionTags==7||pro.promotionTags==6||pro.promotionTags==5"></div>
                        </div>
                        <div class="pro-detail">
                            <div class="detail-title">{{pro.oeName||pro.stdName||pro.name}} {{pro.oeCode||pro.stdOeCode}} {{pro.swCategory}} {{pro.vehBrand}} {{pro.property}} {{pro.swSpec}} {{pro.swVehModel}} {{pro.vehSeries}}</div>
                            <div class="detail-price">
                                <span v-if="!hasCookie&&!pro.promotion"><span class="size-11" >¥ </span>--</span>
                                <span v-if="pro.minPrice&&pro.minPrice!='0'&&(hasCookie||pro.promotion)"><span class="size-11" >¥ </span>{{pro.minPrice.split('.')[0]}}<span class="size-11" v-if="pro.minPrice.split('.')[1]">.{{pro.minPrice.split('.')[1]}}</span></span>
                                <span v-if="pro.price&&pro.minPrice=='0'&&(hasCookie||pro.promotion)"><span class="size-11" >¥ </span>{{pro.price.split('.')[0]}}<span class="size-11" v-if="pro.price.split('.')[1]">.{{pro.price.split('.')[1]}}</span></span>
                                <span v-if="pro.discountPrice&&(hasCookie||pro.promotion)"><span class="size-11" >¥ </span>{{pro.discountPrice.split('.')[0]}}<span class="size-11" v-if="pro.discountPrice.split('.')[1]">.{{pro.discountPrice.split('.')[1]}}</span></span>
                                <span class="originalPrice" v-if="((pro.originalPrice!=pro.price&&pro.price!='0')||(pro.originalPrice!=pro.minPrice&&pro.minPrice!='0'))&&pro.originalPrice!='0'&&(hasCookie||pro.promotion)">¥ {{pro.originalPrice}}</span>
                                <span class="linePrice" v-if="pro.linePrice&&pro.linePrice!='0'&&(hasCookie||pro.promotion)"><span class="size-11" style="color: #999999;" >¥ </span>{{pro.linePrice.split('.')[0]}}<span class="size-11" v-if="pro.linePrice.split('.')[1]">.{{pro.linePrice.split('.')[1]}}</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="data.settingStyle==1">
            <!-- 横向 -->
            <div class="pro_area_item">
                
                <div class="pro_list_head">
                    <!-- <span class="icon"></span> -->
                    <i class="iconfont icon-home_tire"></i>
                    <template v-if="data.areas">
                        <span 
                        :class="{'list-item':true,'select':index===tabIndex}"
                        @click="tabChange(item,index)"
                        v-for="(item,index) in data.areas"
                        :key="index"
                        >{{item.name}}</span>
                    </template>
                </div>
                <div class="item-body">
                    <template v-if="data.areas">
                        <div class="pro-item" v-for="(pro,index) in data.areas[tabIndex].proList" @click="ToDetail(data.areas[tabIndex].type,pro.id,pro.companyId)" :key="'pro'+index">
                            <img v-if="pro.image" :src="pro.image" alt="">
                            <div class="pro-img" v-else></div>
                            <div class="promotionTags">
                                <div class="Tag-1" v-if="pro.promotionTags==1||pro.promotionTags==3||pro.promotionTags==5||pro.promotionTags==7"></div>
                                <div class="Tag-2" v-if="pro.promotionTags==3||pro.promotionTags==7||pro.promotionTags==6||pro.promotionTags==2"></div>
                                <div class="Tag-3" v-if="pro.promotionTags==4||pro.promotionTags==7||pro.promotionTags==6||pro.promotionTags==5"></div>
                            </div>
                            <div class="pro-detail">
                                <div class="detail-title">{{pro.oeName||pro.stdName||pro.name}} {{pro.oeCode||pro.stdOeCode}} {{pro.swCategory}} {{pro.vehBrand}} {{pro.property}} {{pro.swSpec}} {{pro.swVehModel}} {{pro.vehSeries}}</div>
                                <div class="detail-price">
                                    <span v-if="!hasCookie&&!pro.promotion"><span class="size-11" >¥ </span>--</span>
                                    <span v-if="pro.minPrice&&pro.minPrice!='0'&&(hasCookie||pro.promotion)"><span class="size-11" >¥ </span>{{pro.minPrice.split('.')[0]}}<span class="size-11" v-if="pro.minPrice.split('.')[1]">.{{pro.minPrice.split('.')[1]}}</span></span>
                                    <span v-if="pro.price&&pro.minPrice=='0'&&(hasCookie||pro.promotion)"><span class="size-11" >¥ </span>{{pro.price.split('.')[0]}}<span class="size-11" v-if="pro.price.split('.')[1]">.{{pro.price.split('.')[1]}}</span></span>
                                    <span v-if="pro.discountPrice&&(hasCookie||pro.promotion)"><span class="size-11" >¥ </span>{{pro.discountPrice.split('.')[0]}}<span class="size-11" v-if="pro.discountPrice.split('.')[1]">.{{pro.discountPrice.split('.')[1]}}</span></span>
                                    <span class="originalPrice" v-if="((pro.originalPrice!=pro.price&&pro.price!='0')||(pro.originalPrice!=pro.minPrice&&pro.minPrice!='0'))&&pro.originalPrice!='0'&&(hasCookie||pro.promotion)">¥ {{pro.originalPrice}}</span>
                                    <span class="linePrice" v-if="pro.linePrice&&pro.linePrice!='0'&&(hasCookie||pro.promotion)"><span class="size-11" style="color: #999999;" >¥ </span>{{pro.linePrice.split('.')[0]}}<span class="size-11" v-if="pro.linePrice.split('.')[1]">.{{pro.linePrice.split('.')[1]}}</span></span>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                
                <div v-if="data.areas&&data.areas[tabIndex].proList&&data.areas[tabIndex].proList.length>=(data.areas[tabIndex].showNumber || 20)" class="look_more">
                    <span class="more" 
                    @click="getMorePrefecture(data.areas[tabIndex].details&&
                    data.areas[tabIndex].details[0]&&
                    data.areas[tabIndex].details[0].id?data.areas[tabIndex].details[0].id:null,
                    data.areas[tabIndex].type,data.areas[tabIndex].name)">
                        查看更多
                    </span>
                </div>
            </div>
        </template>
        <ClientApplyDialog ref="clientApplyDialog"></ClientApplyDialog>
    </div>
</template>
<script>
import Vue from "vue";
import request, { URL_MODULE } from "@/request";
import { Dialog,Icon } from 'vant';
import ClientApplyDialog from "@/components/dialog/clientApplyDialog.vue";

Vue.use(Dialog).use(Icon); 
export default {
    name:'pro_area_con',
    components: { ClientApplyDialog },
    data(){
        return{
            hasCookie:false,
            itemObj:{},
            tabIndex:0,
            currentPage:1
        }
    },
    props:{
        data:Object
    },
    created(){
        this.hasCookie=Vue.prototype.hasCookie;
        this.getProItem();

    },
    watch:{
        data(){
            this.hasCookie=Vue.prototype.hasCookie;
            this.getProItem();
        }
    },
    methods:{
        lookMoreDetail(){//查看更多
            this.getProAreaList(this.itemObj);
        },
        tabChange(item,index){
            this.tabIndex = index;
            this.itemObj = item;
        },
        getProAreaList(item){
            let _this = this;
            request({
                baseURL: URL_MODULE.united,
                url: '/companies/stores/list-by-area-id',
                params: {
                    areaId:item.details[0].id,
                    page:++item.page,
                    type:item.type,
                    perPage:item.showNumber
                }
            }).then((res)=>{
                if(res.rows&&res.rows.length>0){
                    item.proList=item.proList.concat(res.rows);
                    _this.$forceUpdate();
                }
                
            })
        },
        getProItem(){
            let _this = this;
            if(this.data.areas&&this.data.areas.length>0&&this.data.setting==1){//自定义
                this.data.areas.forEach((area)=>{
                    if(area.details&&area.details.length>0){
                        request({
                            baseURL: URL_MODULE.united,
                            url: '/companies/stores/list-by-area-id',
                            params: {
                                areaId:area.details[0].id,
                                page:1,
                                type:area.type,
                                perPage:area.showNumber
                            }
                        }).then((res)=>{
                            area.page=1;
                            area.proList=res?res.rows:[];
                            // _this.itemObj = area;
                            _this.$forceUpdate();
                        })
                    }
                })
            }else if(this.data.setting==0){//全部商品
            // }else if(this.data.areas&&this.data.setting==0){//全部商品
                request({
                    baseURL: URL_MODULE.united,
                    url: '/companies/stores/list-by-area-id',
                    params: {
                        page:1,
                        allSku:true,
                        perPage:20
                    }
                }).then((res)=>{
                    _this.data.areas=[];
                    _this.data.areas.push({
                        proList:res?res.rows:[],
                        name:'热门商品'
                    })
                    _this.$forceUpdate();
                })
            }
        },
        ToDetail(type,id,companyId){
            this.$refs.clientApplyDialog.checkState(() => {
                if(type==1){
                    this.$router.push({
                        name: `groupSkuDetailByPromotion`,
                        query: {
                        id: id,
                        companyId: companyId
                        }
                    });
                }else{
                    this.$router.push({
                        name: `skuDetail`,
                        query: {
                            id: id,
                            companyId:companyId
                        }
                    });
                }
            });
            
        },
        getMorePrefecture(id,type,title) {
            this.$refs.clientApplyDialog.checkState(() => {
                if(type==1){
                    this.$router.push({
                        name: `skuListByPromotion`,
                        query: {
                            areaId: id,
                            remark: title
                        }
                    });
                }else{
                    if(this.data.default){
                        this.$router.push({
                            name: `SkuListByArea`
                        });
                    }else{
                        this.$router.push({
                            name: `SkuListByArea`,
                            query: { id: id,type:type }
                        });
                    }
                }
            })
        },
    }
}
</script>
<style lang="less" scoped>
.pro_area_con{
    // margin-top: 8px;
    // padding:0 12px;
    .pro_area_item{
        text-align: left;
        .more{
            cursor: pointer;
            margin-left: auto;
            background: rgba(#FF6E4C, 0.1);
            border-radius: 6px;
            font-size: 14px;
            color: #FF6E4C;
            line-height: 20px;
            padding: 2px;
            display: flex;
            align-items: center;
            .iconfont {
                font-size: 14px;
            }
        }
        .iconfont {
            font-size: 16px;
            color: #FF6E4C;
        }
        .item-head{
            display: flex;
            align-items: center;
            padding: .18667rem .24rem;
            margin-bottom: 9px;
            .icon{
                content: '';
                background: url('../../assets/store/icon-pro-area-item.png');
                background-size: 100% 100%;
                width: 16px;
                height: 16px;
            }
            .title{
                font-size: 16px;
                font-weight: bold;
                color: #FF6E4C;
                margin-left: 5px;
            }
        }
        .item-body{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .pro-item{
                width: 171px;
                margin-bottom: 9px;
                background-color: #ffffff;
                border-radius: 10px;
                position: relative;
                img,.pro-img{
                    display: block;
                    width: 171px;
                    height: 171px;
                    background-image: url('../../assets/Common_goods_def_img.png');
                    background-size: 100% 100%;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                }
                .promotionTags{
                    position: absolute;
                    top: 0;
                    left: 10px;
                    display: flex;
                    .Tag-1{
                        background: url('../../assets/store/icon-jian.png');
                        background-size: 100% 100%;
                        width: 24px;
                        height: 24px;
                        margin-right: 8px;
                    }
                    .Tag-2{
                        background: url('../../assets/store/icon-zhe.png');
                        background-size: 100% 100%;
                        width: 24px;
                        height: 24px;
                        margin-right: 8px;
                    }
                    .Tag-3{
                        background: url('../../assets/store/icon-zeng.png');
                        background-size: 100% 100%;
                        width: 24px;
                        height: 24px;
                        margin-right: 8px;
                    }
                }
                
                .pro-detail{
                    .detail-title{
                        margin: 7px 10px;
                        max-height: 96px;
                        font-size: 14px;
                        text-align: left;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 5;
                        overflow: hidden;
                    }
                    .detail-price{
                        padding: 7px 10px;
                        display: flex;
                        font-weight: bold;
                        align-items: center;
                        span{
                            &:first-child{
                                color:#E91515;
                                font-size: 16px;
                            }
                            &.size-11{
                                font-size: 11px;
                            }
                            &.originalPrice{
                                font-size: 11px;
                                color:#999999;
                                text-decoration: line-through;
                                margin-left: auto;
                            }
                            &.linePrice{
                                font-size: 0.42667rem;
                                color:#999999;
                                text-decoration: line-through;
                                margin-left: auto;
                            }
                        }
                    }
                }
            }
        }
        .pro_list_head {
            padding: 0.18667rem 0.24rem;
            margin-bottom: 9px;
            line-height: 30px;
            overflow-y: auto;
            // height: 30px;
            width: 100%;
            white-space: nowrap;
            .icon {
                content: url('../../assets/store/icon-pro-area-item.png');
                width: 16px;
                margin-right: 5px;
                vertical-align: -2px;
            }
            .list-item {
                margin-right: 35px;
                font-size: 16px;
                cursor: pointer;
                &.select {
                    color: #FF6E4C;
                    font-weight: bold;
                    // &::before{
                    //     content: url('../../assets/store/icon-pro-area-item.png');
                    //     width: 16px;
                    //     margin-right: 5px;
                    //     vertical-align: -2px;
                    // }
                    
                }
            }
        }
        .look_more{
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 8px 0;
        }
    }
    .ex_confirm{
        /deep/.van-dialog__confirm{
            color: #fff!important;
        }
    }
}
</style>