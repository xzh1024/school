<template>
        <div id="payment">
                <div class="comeback">
                    <img src="../../../assets/back-icon.png" @click="Goback" class="back-icon">
                </div>
                <div class="provider_con">
                    <div class="providerItem">
                        <div class="provider-tips">
                            <img v-if="status==1" src="../../../assets/tips_cooperation.png">  
                            <img v-if="status==2" src="../../../assets/tips_Suspendcooperation.png">  
                        </div>
                        <div class="provider-company">
                            <span class="name">{{name}}</span>
                        </div>
                        <div class="provider-pic">
                            <p class="provider-pic-top">商家收款码</p>
                                <img :src="url" >
                             <p class="provider-pic-bottom">长按保存图片</p>
                        </div>
                        <div class="proder-msg">
                            <p>* 注意: 转账前请与商家核对身份及账单信息，</p>
                            <p>转账时请谨慎操作</p>
                        </div>
                    </div>
                </div>
        </div>
</template>
<script>
import Vue from "vue";
export default{
    name:"supplierPayment",
    data(){
        return{
            name:this.$route.params.name,
            defaultUrl:require('../../../assets/payment-default.png'),
            url:"",
            status:this.$route.params.status,
        }
    },
    created(){
        if(this.$route.params.url==""||this.$route.params.url==undefined){
            this.url=this.defaultUrl;
        }else{
            this.url=this.$route.params.url
        }
    },
    methods:{
        Goback:function(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
#payment{
    background: #F8F8F8;
    min-height: 100vh;
}       
.comeback{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items:center;
    background: #ffffff;
    cursor: pointer;
    img{
        padding-left:16px;
    }
}
.provider_con{
    font-family: PingFang-SC-Medium;
    background: #F8F8F8;
    letter-spacing: -0.34px;
    margin-top:16px;
    width: 100%;
    height: 458px;
    .providerItem{
        width: 343px;
        height: 458px;
        background: #FFFFFF;
        border-radius: 6px;
        margin-left:16px;
        margin-top:16px;
        .provider-tips{
            width: 100%;
            height: 14px;
            img{
                float: left;
                left: 0;
                height: 14px;
            }
        }
        .provider-company{
            height: 35px;
            margin: 0 8px;
            border-bottom:0.5px solid #EDEFF1;
            font-size: 14px;
            .name{
                color: #171C24;
                position: absolute;
                left: 24px;
                line-height: 20px;
                font-weight:bold;
            }
        }
        .provider-pic{
            height: 312px;
            margin: 0 8px;
            border-bottom:0.5px solid #EDEFF1;
            .provider-pic-top{
                font-size: 14px;
                margin-bottom: 35px;
            }
            .provider-pic-bottom{
                font-size: 12px;
                color: #AAACB7;
                letter-spacing: -0.29px;
            }
            img{
                width:188px; 
                height:188px;
            }
            // .provider-pic-border{
            //     border: 0.5px solid #EDEFF1;
            //     width: 188px;
            //     height: 188px;
            //     margin: 0 auto;
            // }
        }
        .proder-msg{
            font-size: 14px;
            color: #171C24;
            letter-spacing: -0.34px;
            text-align: center;
            line-height:17px;
            padding:20px 0;
            p{
                margin-block-start: 0;
                margin-block-end: 0;

            }
        }
    }
}
</style>