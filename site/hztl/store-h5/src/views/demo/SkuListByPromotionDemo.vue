<template>
    <div class="page">
        <van-button @click="query = 'matchSw=true&keyWord=大灯&sellers=2&relations=asm&matchMethod=any&cartQty=true'">大灯</van-button>
        <van-button @click="query = 'matchSw=true&keyWord=保险杠&sellers=2&relations=asm&matchMethod=any&cartQty=true'">保险杠</van-button>
        <van-button @click="query = 'matchSw=true&keyWord=火花塞&sellers=2&relations=asm&matchMethod=any&cartQty=true'">火花塞</van-button>
        <van-button @click="console">console selected</van-button>
        <van-button @click="addCart">add cart selected</van-button>
        {{info.totalFee}}
        {{info.hasData?"有数据":"无数据"}}
        <SkuListByPromotion class="sku-list" ref="SkuListByPromotion" :query="query" v-model="info"/>
    </div>
</template>

<script>
import Vue from "vue";
import { Button } from 'vant';
import SkuListByPromotion from "../../../store-common/component/Sku/ListByPromotion";
Vue.use(Button);

export default {
    name: "skuListByPromotionDemo",
    components: {
        SkuListByPromotion
    },
    data(){
        return {
            query: "",
            info: {
                hasData: false,
                totalFee: 0.00,
                selectedMap: {}
            }
        }
    },
    methods: {
        console(){
            let _this = this;
            window.console.log(_this.info);
        },
        addCart(){
            this.$refs.SkuListByPromotion.addCartAfter();
        }
    }
}
</script>

<style lang="less" scoped>
.page {
    .sku-list {
        padding: 0 10px;
    }
}
</style>