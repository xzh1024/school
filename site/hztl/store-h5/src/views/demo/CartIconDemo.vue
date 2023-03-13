<template>
    <div class="page">
        <van-button @click="reloadCartNum">重新加载cartNum</van-button>
        <CartIcon ref="CartIcon"/>
    </div>
</template>

<script>
import Vue from "vue";
import { Button } from 'vant';
import CartIcon from "../../../store-common/component/Cart/Icon";
Vue.use(Button);

export default {
    name: "cartIconDemo",
    components: {
        CartIcon
    },
    methods: {
        reloadCartNum(){
            this.$refs.CartIcon.reloadCartNumber();
        }
    }
}
</script>

<style lang="less" scoped>
.page {
    
}
</style>