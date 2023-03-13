<template>
    <div class="company_con">
        <div class="con-head">
            <i class="iconfont icon-home_merchants"></i>
            <span class="title">商家信息</span>
        </div>
        <div class="con-body" @click="toCompanyDetail">
            <div class="body-left">
                <img v-if="businessCard" :src="businessCard" alt="">
                <div class="no-img" v-else></div>
            </div>
            <div class="body-right">
                <div class="title">{{name}}</div>
                <div>
                    <span class="phone-c" @click.stop="tel(phone)">{{phone}}</span>
                </div>
                <div class="address">{{address}}</div>
            </div>
        </div>
        <div class="con-des">{{description}}</div>
    </div>
</template>
<script>
import request from "@/request";
export default {
    name:'company_con',
    props:{
        data:Object
    },
    data(){
        return{
            name:'',
            description:'',
            phone:'',
            businessCard:'',
            address:''
        }
    },
    created(){
        this.storeInfo();
    },
    watch:{
        data(val){
            this.storeInfo();
        }
    },
    methods:{
        tel(phone){
            window.location.href="tel:"+phone;
        },
        storeInfo(){
            request({ url: '/open/stores/info' }).then(res => {
                this.name=res.name;
                this.description=res.description;
                this.phone=res.phone;
                this.businessCard=res.businessCard;
                this.address=res.address;
            })
        },
        toCompanyDetail(){
            this.$router.push('/companyDetail')
        }
    }
}
</script>
<style lang="less" scoped>
.company_con{
    // margin: 8px 12px 0 12px;
    border-radius: 10px;
    padding: 7px 9px;
    background-color: #ffffff;
    .con-head{
        display: flex;
        align-items: center;
        // .icon{
        //     content: '';
        //     background: url('../../assets/store/icon-home.png');
        //     background-size: 100% 100%;
        //     width: 16px;
        //     height: 16px;
        // }
        .iconfont {
            font-size: 16px;
            color: #FF6E4C;
        }
        .title{
            font-size: 16px;
            font-weight: bold;
            color: #FF6E4C;
            margin-left: 5px;
            line-height: 36px;
        }
    }
    .con-body{
        display: flex;
        line-height: 22px;
        .body-left{
            img,.no-img{
                width: 111px;
                height: 66px;
                display: block;
                background: url('../../assets/store/img-defulat-l.png') no-repeat center;
                background-size: auto 100%;
            }
        }
        .body-right{
            margin-left: 12px;
            text-align: left;
            width: calc(100% - 123px);
            .title{
                font-size: 14px;
                color: #333333;
            }
            .phone-c{
                font-size: 13px;
                color: #FF6E4C;
                padding-left: 22px;
                position: relative;
                box-sizing: border-box;
                &::before{
                    // content: url('../../assets/store/icon-phone-3.png');
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    content: " ";
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    margin-right: 8px;
                    background: url('../../assets/store/icon-phone-3.png') no-repeat;
                    background-size: 100% 100%;
                }
            }
            .address{
                width:100%;
                height:22px;
                font-size: 13px;
                color: #333333;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin:0;
                // display: flex;
                // align-items: center;
                padding-left: 22px;
                position: relative;
                box-sizing: border-box;
                &::before{
                    // content: url('../../assets/store/icon-c-home.png');
                    // margin-right: 8px;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    content: " ";
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    margin-right: 8px;
                    background: url('../../assets/store/icon-home-3.png') no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
    }
    .con-des{
        margin-top: 7px;
        font-size: 12px;
        color: #666666;
        text-align: left;
        width:100%;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
    }
}
</style>