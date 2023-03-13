<template>
    <div class="banner_con" >
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" :show-indicators="false">
            <van-swipe-item v-for="(item,index) in data.content" 
            :key="index" :style="{height:Height}">
                <img v-lazy="item.content ? item.content : BannerImg" 
                width="100%" 
                height="100%"
                @click="toLink(item)"/>
            </van-swipe-item>
        </van-swipe>
        <ClientApplyDialog ref="clientApplyDialog"></ClientApplyDialog>
    </div>
</template>
<script>
import Vue from 'vue';
import { Swipe, SwipeItem,Lazyload } from 'vant';
Vue.use(Swipe).use(SwipeItem).use(Lazyload);
import ClientApplyDialog from "@/components/dialog/clientApplyDialog.vue";
import BannerImg from '@/assets/store/bg-banner.png';

export default {
    name:'banner_con',
    components: { ClientApplyDialog },
    data(){
        return{
            Height:null,
            BannerImg: BannerImg
        }
    },
    props:{
        data:Object
    },
    mounted(){
        this.initData();
    },
    methods:{
        initData(){

            let aspectRatio = this.data.aspectRatio.split(":");
            let bW = aspectRatio[0];
            let bH = aspectRatio[1];
            let whObj = this.getViewportSize();
            // this.Width = whObj.width - 24
            this.Height = `${(bH / bW)*whObj.width}px`;
        },
        getViewportSize(){//获取屏幕的宽高
            return {
                width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            };
        },
        toLink(item){
            if(item.checkedLink==1){//外部链接
                let outUrl = item.externalLink;
                if(outUrl.indexOf("https://")>-1){
                    window.open(item.externalLink);
                }else{
                    window.open("https://"+item.externalLink);
                }
            }else{//内部链接
                if(item.internalLink){
                    this.$refs.clientApplyDialog.checkState(() => {
                        if(item.internalLink.sub && item.internalLink.sub.name == '单个商品'){
                            this.$router.push({
                                path:"/skuDetail",
                                query:{
                                    id:item.internalLink.sub.skuId
                                }
                            });
                        }
                        if(item.internalLink.sub && item.internalLink.sub.name == '全部商品'){
                            this.$router.push({
                                path:"/skuList",
                                query:{
                                    priceGreaterThanZero:true
                                }
                            });
                        }
                    });
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.banner_con{
    // margin-top: 8px;
    // padding:0 12px;
    // height: 140px;
    border-radius: 10px;
    .my-swipe{
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }
}
</style>