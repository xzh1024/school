<template>
    <div class="debug">
        <van-cell-group>
            <van-cell title="SkuCard" is-link to="/skuCardDemo"/>
            <van-cell title="SkuList" is-link to="/skuListDemo"/>
            <van-cell title="PromotionSkuList" is-link to="/skuListByPromotionDemo"/>
            <van-cell title="PromotionGroupSkuList" is-link to="/groupSkuListByPromotionDemo"/>
            <van-cell title="开启vConsole" @click="openVConsole"/>
        </van-cell-group>
        <DefaultPhone />
    </div>
</template>
<script>
import Vue from "vue";
import DefaultPhone from "@/components/DefaultPhone/Icon";
import Vconsole from 'vconsole'

export default {
    name:"debug",
    components: {
        DefaultPhone
    },
    methods: {
        openVConsole(){
            let vConsole = new Vconsole();
            Vue.use(vConsole);
            this.$router.push({
                name: `home`
            });
        }
    }
}
</script>

<style lang="less">
.debug{
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #777B87;
    letter-spacing: 1.07px;
    text-align: center;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    .error-img{
        width: 180px;
        height: 180px;
    }
    .error-span{
        padding: 16px;
    }
}
</style>


