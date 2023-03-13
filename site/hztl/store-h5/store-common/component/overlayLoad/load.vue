<template>
    <div class="load">
        <van-overlay :show="show">
            <van-loading size="24px" class="load-center" color="#ffffff">数据加载中...</van-loading>
        </van-overlay>
    </div>
</template>
<script>
import Vue from 'vue';
import { Loading,Overlay } from 'vant';
Vue.use(Loading).use(Overlay);
export default {
    name:'',
    props:{
        show:Boolean,
    }
}
</script>
<style lang="less" scoped>
.load{
    .load-center{
        position: fixed;
        top: 50%;
        text-align: center;
        left: 50%;
        transform: translateX(-50%);
    }
    /deep/.van-loading__text{
        color:#ffffff;
        font-weight: bold;
        font-size: 16px;
    }
}
</style>