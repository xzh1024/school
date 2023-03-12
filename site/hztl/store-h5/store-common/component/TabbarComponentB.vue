<template>
    <div id="TabbarComponentB">
        <van-tabbar route class="bottom-bac" active-color="#FF6E4C" inactive-color="#333333">
            <van-tabbar-item replace to="/home">
                <span>首页</span>
                <template #icon="props">
                    <i :class="['iconfont', props.active ? 'icon-tab_home_sel' : 'icon-tab_home_nor']"></i>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/orderList">
                <span>订单</span>
                <template #icon="props">
                    <i :class="['iconfont', props.active ? 'icon-tab_order_sel' : 'icon-tab_order_nor']"></i>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/cart">
                <span>购物车</span>
                <template #icon="props">
                    <i :class="['iconfont', props.active ? 'icon-tab_shop_sel' : 'icon-tab_shop_nor']"></i>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/mine">
                <span>我的</span>
                <template #icon="props">
                    <i :class="['iconfont', props.active ? 'icon-tab_my_sel' : 'icon-tab_my_nor']"></i>
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";
Vue.use(Tabbar).use(TabbarItem);
export default {
    name:"TabbarComponentB",
    data(){
        return{
            homeActive: require("../img/parts-active.png"),
            homeInactive: require("../img/parts.png"),
            orderActive: require("../img/order-active.png"),
            orderInactive: require("../img/order.png"),
            mineActive: require("../img/mine-active-b.png"),
            mineInactive: require("../img/mine.png"),
            cartActive: require("../img/cart-active.png"),
            cartInactive: require("../img/cart.png"),
        }
    }
}
</script>
<style lang="less" scoped>
.bottom-bac {
    .van-tabbar-item {
        .van-tabbar-item__icon {
            .iconfont {
                font-size: 24px;
                color: #666666;
            }
        }
        .van-tabbar-item__text {
            font-size: 11px;
        }
        &.van-tabbar-item--active{
            .van-tabbar-item__icon {
                .iconfont {
                    color: #FF6E4C;
                }
            }
        }
    }
}
</style>


