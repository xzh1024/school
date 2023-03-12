<template>
    <div class="complete-con">
        <van-nav-bar title="完善资料"  right-text="" left-arrow @click-left="onClickLeft">
            <img src="../../assets/back-icon.png" slot="left" class="Back">
        </van-nav-bar>
        <div class="add-con">
            <div class="add-item">
                <img class="add-item-img" src="../../assets/icon-password.png">
                <input class="add-item-input" id="password" type="password" v-model="password" placeholder="请设置登录密码">
                <van-icon @click="changeEye" :name="icon" size="16" color="#777B87"/>
            </div>
            <div class="add-item">
                <img class="add-item-img" src="../../assets/icon-Verificationcode.png">
                <input  class="add-item-input" v-model="name" type="text" placeholder="请输入姓名">
            </div>
            <div class="add-item">
                <img class="add-item-img" src="../../assets/icon-choose-address.png">
                <input  class="add-item-input" id="areaId" v-model="areaName" readonly type="text" placeholder="请选择所在地区">
            </div>
            <div class="add-item">
                <span class="add-item-span">我的身份</span>
                <div class="right"> 
                    <span :class="{'active':!checked}" @click="changeActive">个人用户</span>
                    <span :class="{'active':checked}"  @click="changeActive">企业用户</span>
                </div>
            </div>
            <!-- <div class="add-item" v-show="!checked">
                <span class="add-item-span">是否是修理厂</span>
                <van-switch v-model="formData.registerRepair" size="16px" active-color="#00a8ea" class="item-right"/>
            </div>
            <div v-show="formData.registerRepair&&!checked" class="company">
                <van-cell >
                    <template slot="icon">
                        <img src="../../assets/icon-xiulichang-colorful.png" class="my-mes-icon  icon-18">
                    </template>
                    <template slot="title">
                        <input  class="cell-input" placeholder="请输入修理厂名称" v-model="formData.repairName">
                    </template>
                </van-cell>
                <van-cell >
                    <template slot="icon">
                        <img src="../../assets/icon-address.png" class="my-mes-icon  icon-18">
                    </template>
                    <template slot="title">
                        <input  class="cell-input" placeholder="请输入修理厂地址" v-model="formData.repairAddress">
                    </template>
                </van-cell>
                <van-cell >
                    <template slot="icon">
                        <img src="../../assets/icon-tel.png" class="my-mes-icon  icon-18">
                    </template>
                    <template slot="title">
                        <input  class="cell-input" placeholder="请输入修理厂电话" v-model="formData.repairPhone">
                    </template>
                </van-cell>
            </div>                         -->
        </div>
        <div v-show="checked" class="company">
            <van-cell >
                    <template slot="icon">
                        <img src="../../assets/icon-company.png" class="my-mes-icon icon-18">
                    </template>
                    <template slot="title">
                        <input id="CompanyName width-230" @blur="CheckCompany" placeholder="请输入企业名称" class="cell-input" v-model="formData.name" >
                    </template>
                </van-cell>
                <van-cell >
                    <template slot="icon">
                        <img src="../../assets/icon-comcode.png" class="my-mes-icon  icon-18">
                    </template>
                    <template slot="title">
                        <input  class="cell-input"  maxlength="18" placeholder="请输入统一社会信用代码" v-model="formData.bizLicenceCode">
                    </template>
                </van-cell>
                <van-cell is-link @click="showTypeup">
                    <template slot="icon">
                        <img src="../../assets/icon-comtype.png" class="my-mes-icon  icon-18">
                    </template>
                    <template slot="title">
                        <input class="cell-input" readonly placeholder="请输入企业类型" v-model="type">
                    </template>
                    <template slot="right-icon">
                    <img src="../../assets/enter@3x.png" class="my-enter">
                    </template>
                </van-cell>
                <van-cell>
                    <template slot="icon">
                        <img src="../../assets/icon-address.png" class="my-mes-icon icon-18">
                    </template>
                    <template slot="title">
                        <input class="cell-input companyAreaId" placeholder="请输入所在地区" readonly v-model="companyAreaName">
                    </template>
                    <template slot="right-icon" >
                    <img src="../../assets/enter@3x.png"  id="companyAreaId" class="my-enter">
                    </template>
                </van-cell>
                <van-cell >
                    <template slot="icon">
                        <img src="../../assets/icon-detailAddress.png" class="my-mes-icon icon-18">
                    </template>
                    <template slot="title">
                        <input class="cell-input" placeholder="请输入详细地址" v-model="formData.address">
                    </template>
                </van-cell>
                <van-cell >
                    <template slot="icon">
                        <img src="../../assets/icon-reciver.png" class="my-mes-icon icon-18">
                    </template>
                    <template slot="title">
                        <input  class="cell-input" placeholder="请输入联系人" v-model="formData.contacts">
                    </template>
                </van-cell>
                <van-cell >
                    <template slot="icon">
                        <img src="../../assets/icon-tel.png" class="my-mes-icon icon-18">
                    </template>
                    <template slot="title">
                        <input  class="cell-input" placeholder="请输入联系电话" v-model="formData.phone">
                    </template>
                </van-cell>
            <van-action-sheet v-model="showType" :actions="actions" @select="onSelect" />
        </div>
        <div  class="add-con">
            <div class="add-item noboder">
                <van-checkbox v-model="agree_checked" shape="square" checked-color="#00a8ea" icon-size="12px"></van-checkbox>
                <span class="add-item-span">我已阅读并同意用户授权条款</span>
                <span class="add-item-span link" @click="seeUser">用户授权条款</span>
            </div>
            <div class="Tobutton" @click="confirm" >确认</div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { NavBar,Row, Col,Popup,Checkbox,CheckboxGroup,Toast,Switch,ActionSheet,Cell,CellGroup,Icon} from 'vant';
    import { getAddressList } from "../../common/splicingData";
    import PickerExtend from "picker-extend";
    import axios from 'axios';
    import request from "@/request";
    import $ from 'jquery';
    Vue.use(NavBar).use(Row).use(Col).use(Popup).use(Checkbox).use(Toast).use(CheckboxGroup)
    .use(Switch).use(ActionSheet).use(Popup).use(Cell).use(CellGroup).use(Icon)
        export default {
            name:"Complete",
            data(){
                return{
                    icon:'closed-eye',
                    password:'',
                    name:'',
                    area:'',
                    areaName:"",
                    companyAreaName:'',
                    checked:false,
                    agree_checked:false,
                    show:false,
                    showType: false,
                    phone:"",
                    allianceId:"",
                    openId:"",
                    smsCaptcha:"",
                    actions: [
                        { name: '汽修厂',value:'garage' },
                        { name: '经销商', value:'dealer'},
                        { name: '生产厂家', value:'manufacturer' }
                    ],
                    areaId:undefined,
                    type:"经销商",
                    formData:{
                        name:"",
                        bizLicenceCode:"",
                        type:"dealer",
                        contacts:"",
                        phone:"",                      
                        address:"",
                        areaId:"",
                        companyAreaId:undefined,
                        subscribeVehBrands:[],
                        registerRepair:false,
                        repairName:'',
                        repairAddress:'',
                        repairPhone:''
                    }
                }
            },
            mounted(){
                let addressListAll = getAddressList();
                let position = [0,0,0];
                this.phone=this.$route.params.tel;
                this.allianceId=this.$route.params.allianceId;
                this.openId=this.$route.params.openId;
                this.smsCaptcha=this.$route.params.smsCaptcha;
                let _this = this;
                let mobileSelect5 = new PickerExtend({
                trigger: "#areaId",
                title: "选择地址",
                wheels: addressListAll,
                position: position,
                callback:function(indexArr, data){
                    const len = data.length;
                    if(len) {
                        _this.areaName = "";
                        data.forEach((item, index) => {
                            _this.areaName += item.value;
                            if(index === len - 1) {
                                _this.areaId = Number(item.id);
                            }
                        })
                    }
                    _this.$forceUpdate();
                }
                });
                let mobileSelect6 = new PickerExtend({
                trigger: "#companyAreaId",
                title: "选择地址",
                wheels: addressListAll,
                position: position,
                callback:function(indexArr, data){
                    const len = data.length;
                    if(len) {
                        _this.companyAreaName = "";
                        data.forEach((item, index) => {
                            _this.companyAreaName += item.value;
                            if(index === len - 1) {
                                _this.formData.companyAreaId = Number(item.id);
                            }
                        })
                    }
                    _this.$forceUpdate();
                }
                });

            },
            beforeRouteEnter(to, from, next) { //路由导航钩子，通过页面路由标记是否需要清空页面数据重新加载
                to.meta['fromPath'] = from.path;
                if (from.path == '/index') {
                    to.meta['needFresh'] = true;
                } else {
                    to.meta['needFresh'] = false;
                }
                next();
            },
            activated() { //此方法在页面缓存时会被调用，根据路由元信息决定是否重新加载数据。不加载则是上次填写完的数据
                if (this.$route.meta['needFresh']) {
                    this.load();
                } else{
                    if(this.$route.params.subscribeVehBrands){
                        this.formData.subscribeVehBrands=this.$route.params.subscribeVehBrands.join(",")
                        this.$forceUpdate();
                    }
                }
            },
            methods:{
                changeEye(){
                    if(this.icon=="closed-eye"){
                        this.icon="eye-o";
                        $('#password').prop('type','text');
                    }else{
                        this.icon="closed-eye";
                        $('#password').prop('type','password');
                    }
                },
                changeActive(){
                    this.checked=!this.checked;
                },
                onClickLeft:function(){         //返回
                    this.$router.go(-1);
                },
                upLoad(type){
                    this.$router.push('picCard?type='+type+"&id="+this.formData.id+"&register=true")
                },
                confirm:function(){
                    let _this=this
                    if(!this.agree_checked){
                        Toast.fail("请阅读并同意用户授权条款！")
                    }else{
                        let arry=[]
                        if(this.formData.subscribeVehBrands.indexOf(",")>-1){
                            arry=this.formData.subscribeVehBrands.split(',');
                        }
                        let param={
                            "phone": this.phone,                         //手机号
                            "password": this.password,                        //用户密码
                            "smsCaptcha":this.smsCaptcha,
                            "name": this.name,                                //用户姓名
                            "areaId": this.areaId,                                 //用户所在地区ID（县级）
                            "allianceId": Number(this.allianceId),                         //重定向地址中所带的allianceId
                            "openId": this.openId,                       //重定向地址中所带的openId
                            "registerCompany": this.checked,                      //注册公司,true:是（会进行公司资料的参数校验）;false:不是（只会注册公司，不会进行公司资料的校验）
                            "companyName": this.formData.name,                            //公司名称
                            "bizLicenceCode": this.formData.bizLicenceCode,               //社会统一信用代码，注册公司时传
                            "companyType": this.formData.type,                      // 公司类型code
                            "companyAreaId": this.formData.companyAreaId,                          // 公司所在地区ID（县级）
                            "address": this.formData.address,                           // 所属地区，注册公司时传
                            "phone1": this.formData.phone,                      // 公司主要联系电话，注册公司时传
                            "contacts1": this.formData.contacts,                           // 公司主要联系人，注册公司时传
                            "vehBrands": arry,          // 订阅的汽车品牌数组
                            // "paymentCode":sessionStorage.getItem("paymentCodePic"),
                            // "businessCard":sessionStorage.getItem("businessCard"),
                            registerRepair:(!this.checked&&this.formData.registerRepair),
                            repairName:this.formData.repairName,
                            repairAddress:this.formData.repairAddress,
                            repairPhone:this.formData.repairPhone,    
                            "domain":window.location.host,
                            offiAccount:!axios.prototype.isH5 //是否是公众号           
                        }
                        request({
                            method: "post",
                            url: '/for-mall/register',
                            data: param
                        }).then(res => {
                            let obj = JSON.stringify({isLogin:true});
                            localStorage.hasCookie = "ok";
                            this.$store.dispatch("getForMall");
                            this.$store.dispatch("getBase");
                            localStorage.setItem('userInfo',obj);
                            if(res.bizCode&&res.bizCode.repeat)
                            {
                                let managerPhone=res.bizCode.managerPhone
                                let repeatCompanyName=res.bizCode.repeatCompanyName
                                _this.$router.push({name:'Managementverification',params:{param:param,repeatCompanyName:repeatCompanyName,managerPhone:managerPhone}})
                            }else{
                                Toast.success("注册成功！")
                                if(localStorage.getItem("remenberUrl")){
                                    this.$router.push(localStorage.getItem("remenberUrl"));
                                    localStorage.removeItem("remenberUrl")
                                }else{
                                    this.$router.push("/home");
                                }
                            }
                        }).catch(err => {
                            if(err && err.message) {
                                Toast.fail(err.message);
                            }
                        })
                    }
                },
                seeUser:function(){
                    this.$router.push("registerRegulation")
                },
                selectBrand:function(){
                    this.$router.push({name:"brandManageAdd",params:{complete:true}});
                },
                CheckCompany:function(){
                    let params={
                        name:this.formData.name
                    }
                    request({
                        url: '/companies/check-name',
                        params
                    }).catch(err => {
                        if(err && err.message) {
                            Toast.fail(err.message);
                        }
                    })
                },
                
                showTypeup:function(){
                    this.showType=true;
                },
                onSelect:function(item){
                    this.type=item.name;
                    this.formData.type=item.value;
                    this.showType = false;
                }
            }
        }
</script>
<style lang="less">
input::-webkit-input-placeholder{
    font-size: 14px;
    color: #CCCED4;
    letter-spacing: -0.34px;
    }
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    font-size: 14px;
    color: #CCCED4;
    letter-spacing: -0.34px;
    }　　
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    font-size: 14px;
    color: #CCCED4;
    letter-spacing: -0.34px;
    }
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
    font-size: 14px;
    color: #CCCED4;
    letter-spacing: -0.34px;
    }
.complete-con{
    font-family: PingFang-SC-Regular;
    min-height: 100vh;
    overflow: auto;
    background: #FFFFFF;
    .width-230{
        width: 230px;
    }
    .add-con{
        width: 343px;
        margin: 0 16px;
        .noboder{
            border-bottom: none !important; 
        }       
        .add-item{
            height: 52px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-bottom: 0.5px solid #EDEFF1;
            .add-item-img{
                width: 18px;
                height: 18px;
            }
            .right{
                margin-left: auto;
                span{
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 14px;
                    width: 73px;
                    height: 20px;
                    line-height: 20px;
                    background: #dbdbdb7f;
                    color: #1A2231;
                    &:nth-child(2){
                        margin-left: 20px;
                    }
                    &.active{
                        background: #a4faff69;
                        color: #2FCCD1;
                    }
                }
            }
            .add-item-input{
                font-size: 14px;
                color: #1A2231;
                margin-left: 6px;
                width:300px;
            }
            .item-right{
                margin-left: auto;
            }
            .add-replay{
                font-size: 14px;
                color: #21BDC2;
                letter-spacing: -0.34px;
                margin-left: auto;
            }
            .disabled{
                color: #777B87;
            }
            .add-item-tips{
                font-size: 12px;
                color: #777B87;
                letter-spacing: -0.29px;
            }
            .add-item-span{
                font-size: 14px;
                color: #777B87;
                letter-spacing: -0.34px;
                margin-left: 6px
            }
            .link{
                color: #00a8ea
            }         
        }
        .Tobutton{
            background: #00a8ea;
            border-radius: 8px;
            width: 343px;
            height: 44px;
            font-size: 16px;
            color: #FFFFFF;
            letter-spacing: -0.38px;
            text-align: center;
            line-height: 44px;
            // position: absolute;
            // bottom: 20px;
            margin-top:40px 
        }
    }
    .company{
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
                width:300px;
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
    /deep/.van-cell:not(:last-child)::after{
        right: 16px;
        border-bottom: 0.02667rem solid #E8EAEF;
    }
}
</style>

