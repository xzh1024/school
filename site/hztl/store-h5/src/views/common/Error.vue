<template>
    <div class="error">
        <img class="error-img" src="../../assets/404.png">
        <p class="error-span">糟糕，找不到服务器～</p>
    </div>
</template>
<script>
export default {
    name:"error",
    data(){
        return{

        }
    }
}
</script>
<style lang="less">
.error{
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


