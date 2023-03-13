<template>
    <div class="pics_con">
        <div class="con">
            <img v-if="data.content[0].content" :src="data.content[0].showUrl||data.content[0].content" @click="openLink" alt="">
            <div v-else class="img-defult" @click="openLink"></div>
        </div>
    </div>
</template>
<script>
export default {
    name:'pics_con',
    props:{
        data:Object
    },
    methods:{
        openLink(){
            if(this.data.content[0].content1){
                window.location.href=this.data.content[0].content1;
            }
        }
    }
}
</script>
<style lang="less" scoped>
.pics_con{
    margin-top: 8px;
    padding:0 12px;
    .con{
        width: 100%;
        height: 70px;
        img{
            cursor: pointer;
            width: 100%;
            height: 100%;
            border-radius: 6px;
        }
        .img-defult{
            cursor: pointer;
            width: 100%;
            height: 100%;
            background: url('../../assets/store/icon-not-upload-m.png') no-repeat center;
            background-size: 100%  100%;
            border-radius: 6px;
        }
    }
}
</style>