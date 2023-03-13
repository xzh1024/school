<template>
    <div id="downloadTemplate">
        <div v-show="isShow" class="main"></div>
    </div>
</template>

<script>
import { GetQueryString } from './../../../src/request/http'
export default {
    name:'downloadTemplate',
    data(){
        return{
            isWX:false,
            fileSrc:'',
            isShow:false,
        }
    },
    mounted(){
        this.isWX=this.is_weixin();
        this.fileSrc=decodeURIComponent(GetQueryString('fileSrc'));
        if(this.isWX){
            //是微信浏览器  显示返回按钮   （用户可以选择下载或者返回）
            this.isShow=true;
        }else{
            //不是微信浏览器
            //执行下载
            window.location.href=this.fileSrc;
        }
    },
    methods:{
        is_weixin() {
            var ua = window.navigator.userAgent.toLowerCase(); 
            if (ua.match(/MicroMessenger/i) == 'micromessenger') { 
                return true;
            } else { 
                return false;
            } 
        },

    }
}
</script>
<style lang="less" scoped>
#downloadTemplate{
    width: 100%;
    height: 100%;
    overflow: auto;
    .main{
        width: 100%;
        height: 100%;
        background: url('../../assets/download.png') no-repeat center;
        background-size: 100% 100%;
    }
}
</style>


