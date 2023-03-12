<template>
    <div class="page">
        <van-button @click="changeSku(0)">大灯1</van-button>
        <van-button @click="changeSku(1)">大灯2</van-button>
        <van-button @click="changeSku(2)">大灯3</van-button>
        <van-button @click="changeSku(3)">大灯4</van-button>
        <van-button @click="console">console</van-button>
        <SkuCard v-if="currentSku" v-model="currentSku"/>
    </div>
</template>

<script>
import Vue from "vue";
import { Button } from 'vant';
import SkuCard from "../../../store-common/component/Sku/Card";
Vue.use(Button);

export default {
    name: "skuCardDemo",
    components: {
        SkuCard
    },
    data(){
        return {
            skus: [
                {
                    skuType: "NORMAL",
                    id: 1,
                    image: "http://test.qiniu.hztl3.com/qa/img/user/3/c1d31a43aeee0b26aa99353f44bccc51257404c6.jpg?e=1584670505",
                    name: "前大灯总成（右）前大灯总成（右）前大灯总成（右",
                    productionPlace: "",
                    brand: "",
                    oeCode: "0K55351030E0K55351030E0K55351030E0K55351030E",
                    selectedQty: 0,
                    price: 888.88,
                    originalPrice: 999.99,
                    // pricePromotions: [{qty: 1}],
                    // giftPromotions: [{qty: 1}],
                    promotionTags: 0,
                    hasStockQty: true,
                    maxStockQty: 99999,
                    stockQtyText: "有货",
                    cartQty: 5,
                    sellerCompanyId: 1,
                    companyId: 1
                },
                {
                    skuType: "NORMAL",
                    id: 2,
                    image: "http://test.qiniu.hztl3.com/qa/img/user/3/c1d31a43aeee0b26aa99353f44bccc51257404c6.jpg?e=1584670505",
                    name: "前大灯总成（右）前大灯总成前大灯总成前大灯总成",
                    productionPlace: "意大利",
                    brand: "奥迪",
                    oeCode: "0K55351030E0K5",
                    selectedQty: 0,
                    price: 888.88,
                    originalPrice: 888.88,
                    // pricePromotions: [{qty: 2}],
                    giftPromotions: [{qty: 2}],
                    promotionTags: 1,
                    hasStockQty: true,
                    maxStockQty: 99999,
                    stockQtyText: "有货",
                    cartQty: 5,
                    sellerCompanyId: 1,
                    companyId: 1
                },
                {
                    skuType: "NORMAL",
                    id: 3,
                    image: "http://test.qiniu.hztl3.com/qa/img/user/3/c1d31a43aeee0b26aa99353f44bccc51257404c6.jpg?e=1584670505",
                    name: "前大灯总成（右）前大灯总成前大灯总成前大灯总成",
                    productionPlace: "意大利",
                    brand: "奥迪",
                    oeCode: "0K55351030E0K5",
                    selectedQty: 0,
                    price: 888.88,
                    originalPrice: 888.88,
                    pricePromotions: [{qty: 1}],
                    giftPromotions: [{qty: 2}],
                    promotionTags: 3,
                    hasStockQty: true,
                    maxStockQty: 99999,
                    stockQtyText: "有货",
                    cartQty: 5,
                    sellerCompanyId: 1,
                    companyId: 1
                },
                {
                    skuType: "NORMAL",
                    id: 4,
                    image: "http://test.qiniu.hztl3.com/qa/img/user/3/c1d31a43aeee0b26aa99353f44bccc51257404c6.jpg?e=1584670505",
                    name: "前大灯总成（右",
                    productionPlace: "意大利意大利意大利意大利",
                    brand: "奥迪奥迪奥迪奥迪",
                    oeCode: "0K55351030E0K5",
                    selectedQty: 0,
                    price: 888.88,
                    originalPrice: 888.88,
                    pricePromotions: [{qty: 4}],
                    giftPromotions: [{qty: 4}],
                    promotionTags: 7,
                    hasStockQty: true,
                    maxStockQty: 99999,
                    stockQtyText: "有货",
                    cartQty: 5,
                    sellerCompanyId: 1,
                    companyId: 1
                }
            ],
            currentSku: null
        }
    },
    methods: {
        changeSku(index){
            let _this = this;
            _this.currentSku = _this.skus[index];
        },
        console(){
            let _this = this;
            window.console.log(_this.currentSku);
        }
    }
}
</script>

<style lang="less" scoped>
.page {
    padding: 0 10px;
}
</style>