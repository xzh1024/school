<template>
    <div class="marketing_con">
        <div class="con">
            <div :class="['img',item.class,'len-'+data.content.length]" @click="toToast" v-for="(item,index) in data.content" :key="index">
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant';
export default {
    name:'marketing_con',
    props:{
        data:Object
    },
    data(){
        return{
            classList:[{
                content:'积分商城',
                class:'img-0',
            },{
                content:'优惠券',
                class:'img-1',
            },{
                content:'拼团',
                class:'img-2',
            },{
                content:'抽奖',
                class:'img-3',
            }]
        }
    },
    created(){
        this.init();
    },
    watch:{
        data(val){
            this.init();
        }
    },
    methods:{
        init(){
            if(this.data.content&&this.data.content.length>0){
                this.data.content.forEach((item)=>{
                    let classes=this.classList.find((classes)=>classes.content==item.content)
                    if(classes&&classes.class){
                        item.class=classes.class
                    }
                })
            }
        },
        toToast(){
            Toast('该功能正在建设中，敬请期待~');
        }
    }
}
</script>
<style lang="less" scoped>
.marketing_con{
    margin-top: 8px;
    padding:0 12px;
    .con{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .img{
            cursor: pointer;
            &.len-4{
                width: 84px;
                height: 84px;
            }
            &.len-3{
                width: 115px;
                height: 115px;
            }
            &.len-2,&.len-1{
                width: 100%;
                height: 84px; 
                &.img-0{
                    background: url('../../assets/store/img-jifen-l.png');
                    background-size: 100% 100%;
                }
                &.img-1{
                    background: url('../../assets/store/img-youhui-l.png');
                    background-size: 100% 100%;
                }
                &.img-2{
                    background: url('../../assets/store/img-pingtuan-l.png');
                    background-size: 100% 100%;
                }
                &.img-3{
                    background: url('../../assets/store/img-choujiang-l.png');
                    background-size: 100% 100%;
                }
            }
            cursor: pointer;
            &.img-0{
                background: url('../../assets/store/img-jifen.png');
                background-size: 100% 100%;
            }
            &.img-1{
                background: url('../../assets/store/img-youhui.png');
                background-size: 100% 100%;
            }
            &.img-2{
                background: url('../../assets/store/img-pingtuan.png');
                background-size: 100% 100%;
            }
            &.img-3{
                background: url('../../assets/store/img-choujiang.png');
                background-size: 100% 100%;
            }
        }
    }
    
}
</style>