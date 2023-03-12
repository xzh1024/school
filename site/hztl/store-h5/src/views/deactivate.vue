<template>
    <div class="deactivate">
        <img class="deactivate-img" src="../assets/404.png">
        <p class="deactivate-span">店铺竟然停用了～</p>
    </div>
</template>
<script>
export default {
    name:"deactivate",
    data(){
        return{

        }
    }
}
</script>
<style lang="less">
.deactivate{
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #777B87;
    letter-spacing: 1.07px;
    text-align: center;
    .deactivate-img{
        width: 180px;
        height: 180px;
    }
    .deactivate-span{
        padding: 16px;
    }
}
</style>