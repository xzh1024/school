<template>
    <div class="register-company">
        <!-- <van-cell-group> -->
                <van-cell >
                    <template slot="icon">
                        <img src="../img/employee-manage.png" width="18px" height="18px" class="my-mes-icon">
                    </template>
                    <template slot="title">
                        <span class="cell-title">企业名称：</span>
                        <input id="CompanyName" @blur="CheckCompany" style="width:230px" class="cell-input" :value="formData.name" >
                    </template>
                </van-cell>
                <van-cell >
                    <template slot="icon">
                        <img src="../img/icon-comcode.png" width="18px" height="18px" class="my-mes-icon">
                    </template>
                    <template slot="title">
                        <span class="cell-title">统一社会信用代码：</span>
                        <input  class="cell-input" style="width:180px" :value="formData.bizLicenceCode">
                    </template>
                </van-cell>
                <van-cell is-link @click="showTypeup">
                    <template slot="icon">
                        <img src="../img/icon-comtype.png" width="18px" height="18px" class="my-mes-icon">
                    </template>
                    <template slot="title">
                        <span class="cell-title">企业类型：</span>
                        <input class="cell-input" style="width:210px" :value="formData.type">
                    </template>
                    <template slot="right-icon">
                    <img src="../img/enter@3x.png" class="my-enter">
                    </template>
                </van-cell>
                <van-cell>
                    <template slot="icon">
                        <img src="../img/icon-address.png" width="18px" height="18px" class="my-mes-icon">
                    </template>
                    <template slot="title">
                        <span class="cell-title">所在地区：</span>
                        <input class="cell-input" style="width:210px" :value="formData.areaName">
                    </template>
                    <template slot="right-icon" >
                    <img src="../img/enter@3x.png"  id="areaName1" class="my-enter">
                    </template>
                </van-cell>
                <van-cell >
                    <template slot="icon">
                        <img src="../img/icon-detailAddress.png" width="18px" height="18px" class="my-mes-icon">
                    </template>
                    <template slot="title">
                        <span class="cell-title">详细地址：</span>
                        <input class="cell-input" style="width:230px" :value="formData.address">
                    </template>
                </van-cell>
                <van-cell >
                    <template slot="icon">
                        <img src="../img/icon-reciver.png" width="18px" height="18px" class="my-mes-icon">
                    </template>
                    <template slot="title">
                        <span class="cell-title">联系人：</span>
                        <input  class="cell-input" style="width:240px" :value="formData.contacts">
                    </template>
                </van-cell>
                <van-cell >
                    <template slot="icon">
                        <img src="../img/icon-tel.png" width="18px" height="18px" class="my-mes-icon">
                    </template>
                    <template slot="title">
                        <span class="cell-title">联系电话：</span>
                        <input  class="cell-input" style="width:230px" :value="formData.phone">
                    </template>
                </van-cell>
                <van-cell is-link @click="selectBrand">
                    <template slot="icon" >
                        <img src="../img/brand-manage.png" width="18px" height="18px" class="my-mes-icon">
                    </template>
                    <template slot="title">
                        <span class="cell-title">品牌：</span>
                        <input class="cell-input" style="width:240px" :value="formData.subscribeVehBrands">
                    </template>
                    <template slot="right-icon">
                        <img src="../img/enter@3x.png" class="my-enter">
                        </template>
                </van-cell>
            <!-- </van-cell-group> -->
            <van-action-sheet v-model="showType" :actions="actions" @select="onSelect" />
    </div>
</template>
<script>
import Vue from "vue";
import request from "@/request";
import { Tabbar, TabbarItem,Cell,CellGroup,NavBar,Popup,Area,ActionSheet,Toast} from "vant";
import { getAddressList, getPositionAreaById } from "../common/splicingData";
import PickerExtend from "picker-extend";
Vue.use(Tabbar).use(TabbarItem).use(Cell).use(CellGroup).use(NavBar).use(Popup)
.use(Area).use(ActionSheet).use(Toast);
export default {
    name:'register_company',
    data(){
        return{
            show:false,
            showType: false,
            actions: [
                { name: '汽修厂',value:'garage' },
                { name: '经销商', value:'dealer'},
                { name: '生产厂家', value:'manufacturer' }
            ],
            areaId:undefined,
            type:"",
            formData:{
                name:"",
                bizLicenceCode:"",
                type:"",
                contacts:"",
                phone:"",
                areaName:"",
                address:"",
                areaId:"",
                subscribeVehBrands:""
            } 
                
        }       
    },
    mounted(){
        let addressListAll = getAddressList();
        let position = [0,0,0];
        if(this.formData.areaId){
            position = getPositionAreaById(this.formData.areaId,addressListAll[0].data);
        }
        let _this = this;
        let mobileSelect4 = new PickerExtend({
        trigger: "#areaName1",
        title: "选择地址",
        wheels: addressListAll,
        position: position,
        callback:function(indexArr, data){
            const len = data.length;
            if(len) {
                _this.formData.areaName = "";
                data.forEach((item, index) => {
                    _this.formData.areaName += item.value;
                    if(index === len - 1) {
                        _this.areaId = Number(item.id);
                    }
                })
            }
        }
        });
    },
    methods:{
        onClickLeft:function(){
            this.historyBack(-1);
        },
        load:function(){
            this.formData=[]
        },
        CheckCompany:function(){

        },
        selectBrand:function(){
            this.$router.push({name:"brandManageAdd",params:{isSell:true}});
        },
        save:function(){
            let param={
                name:this.formData.name,
                bizLicenceCode:this.formData.bizLicenceCode,
                type:this.type,
                contacts:this.formData.contacts,
                phone:this.formData.phone,
                areaName:this.formData.areaName,
                address:this.formData.address,
                areaId:this.areaId,                    
            }
            request({
                method: "post",
                url: '/companies/'+this.formData.id,
                data: param
            }).then(() => {
                Toast.success("保存成功！")
            }).catch(err => {
                if(err && err.message) {
                    Toast.success(err.message)
                }
            })
        },
        showTypeup:function(){
            this.showType=true;
        },
        onSelect:function(item){
            this.formData.type=item.name;
            this.type=item.value;
            this.showType = false;
        }

    }
    
}
</script>
<style lang="less">
.register-company{
    font-family: PingFang-SC-Medium;
    .van-cell{
        height: 52px;
        line-height:32px;
    }
    .van-cell__title{
        text-align: left;
        margin-left: 10px;
        letter-spacing: -0.34px;
        font-size: 14px;
        .cell-input{
            color: #1A2231;
        }             
        .cell-title{
            color: #777B87;               
        }
        .address-detail{
            width: 242px;                    
        }
    }       
    .my-mes-icon{
        width: 18px;
        height: 18px;
        margin-top: 6px;
    }
    .my-enter{
        width: 28px;
        height: 28px;
    }
}
</style>


