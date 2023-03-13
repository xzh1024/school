<template>
    <div class="announcement_con">
        <div class="con">
            <!-- <span class="icon"></span> -->
            <i class="iconfont icon-home_announcement"></i>
            <marquee id="affiche" @click="toLink(data.content[0].content1)" align="left" behavior="scroll" bgcolor="#ffffff" direction="left" height="20" width="280" hspace="0" vspace="0" scrollamount="10" scrolldelay="100" onMouseout="this.start()" onMouseover="this.stop()">
                {{data.content[0].content}}
            </marquee>
        </div>
        
    </div>
</template>
<script>
export default {
    name:'announcement_con',
    props:{
        data:Object
    },
    methods:{
        toLink(url){
            if(url){
                window.location.href=url;
            }
        }
    }
}
</script>
<style lang="less" scoped>
.announcement_con{
    font-size: 14px;
    // margin: 8px 12px 0 12px;
    border-radius: 6px;
    padding: 7px 9px;
    background-color: #ffffff;
    text-align: left;
    .con{
        display: flex;
        align-items: center;
        // .icon{
        //     content: url('../../assets/store/icon-announcement-1.png');
        //     width: 16px;
        //     margin-right: 8px;
        // }
        .iconfont {
            font-size: 16px;
            color: #FF6E4C;
        }
        .title{
            animation: anim 5s linear infinite;
        }
        #affiche{
            width:300px;
            height:20px;
        }
    }
    @-webkit-keyframes anim {
        0% {
            top: 40px;
            opacity: 1
        }
        50% {
            top: -40px;
            opacity: 1
        }
        75% {
            top: -40px;
            opacity: 0
        }
        100% {
            top: 40px;
            opacity: 0
        }
    }
}
</style>