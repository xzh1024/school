<template>
<div class="order-list">
    <!-- <div class="comeback">
        <img src="../../assets/back-icon.png" @click="Goback" class="back-icon">
    </div> -->
    <!-- <div class="head-brand">
      <span class="backToHome" @click="Goback"></span>
      <span class="word">我的订单</span>
    </div> -->
    <van-tabs v-model="activeName" @change="refresh" title-active-color="#FF6E4C" title-inactive-color="#AAACB7">
        <van-tab title="全部" name="all">
            <orderItem ref="orderall" type="0" :wantCode="$route.query.wantCode"></orderItem> 
        </van-tab>
        <van-tab title="待付款" name="pendPay">
            <orderItem ref="orderpendPay" type="8,9,10"></orderItem> 
        </van-tab>
        <van-tab title="待收货" name="pendReceipt">
            <orderItem ref="orderpendReceipt" type="3"></orderItem> 
        </van-tab>
        <van-tab title="已完成" name="finished">
            <orderItem ref="orderfinished" type="4,5,6,7"></orderItem> 
        </van-tab>       
    </van-tabs>
    <TabbarComponentB/>
</div>    
</template>
<script>
import Vue from "vue";
import { Tab, Tabs,Search} from "vant";
import orderItem from "../../../store-common/component/orderItem";
import TabbarComponentB from "../../../store-common/component/TabbarComponentB";
Vue.use(Tab).use(Tabs).use(Search)
export default {
    components: {
        TabbarComponentB,
        orderItem
    },
    name: "orderList",
    data() {
        return {
            activeName: 'all',
        };
    },
    methods: {
        Goback:function(){
            this.$router.push("mine")
        },
        refresh(name){
            switch(name){
                case 'all':
                    if(this.$refs.orderall)
                    this.$refs.orderall.loadList(true);
                    break;
                case 'pendPay':
                    if(this.$refs.orderpendPay)
                    this.$refs.orderpendPay.loadList(true);
                    break;
                case 'pendReceipt':
                    if(this.$refs.orderpendReceipt)
                    this.$refs.orderpendReceipt.loadList(true);
                    break;
                case 'finished':
                    if(this.$refs.orderfinished)
                    this.$refs.orderfinished.loadList(true);
                    break;
            }
            
        }
    }
};
</script>

<style lang="less">
.order-list{
    box-sizing: border-box;
    height: 100%;
    padding-bottom: 51px;
    .van-tabs {
        height: 100%;
        display: flex;
        flex-direction: column;
        .van-tabs__content {
            flex: 1;
            overflow: hidden;
            .van-tab__pane {
                height: 100%;
                .content {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    .van-list {
                        flex: 1;
                        overflow-y: auto;
                    }
                }
            }
        }
    }
    .comeback{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: flex-start;
        align-items:center;
        background: #ffffff;
        cursor: pointer;
        img{
            padding-left:16px;
        }
        .word{
            font-size: 16px;
            letter-spacing: -0.36px;
            margin:0 8px;
        }
    }
}
</style>
