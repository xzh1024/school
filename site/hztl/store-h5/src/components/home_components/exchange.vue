<template>
  <div class="exchange">
    <div class="sear_exchange" @click="getStore">
        <span>切换店铺<van-icon name="exchange" /></span>
    </div>
    <van-popup
        :value="storeShow"
        position="bottom"
        @close="onClose"
        @click-overlay="storeShow=false"
    >
        <div class="content">
            <div class="operation">
                <van-nav-bar
                    title="选择店铺"
                    @click-left="cancel"
                    @click-right="confirm"
                >
                    <span slot="left">取消</span>
                    <span class="to-confirm" slot="right">确定切换</span>
                </van-nav-bar>
            </div>
            <div class="checkbox" v-if="isCheckedLogin()">
                <van-checkbox :value="defaultStore" icon-size="14px" checked-color="#58b8f7"
                shape="square" @click="onChange">以后默认进入选中的店铺</van-checkbox>
            </div>
            <van-cell-group class="selector">
                <template v-if="storeData.length">
                    <van-cell  
                        v-for="(value, index) in storeData"
                        :key="index" center :class="value.isActive ? 'selectActive': '' "
                        :value="value.name"
                        @click="selectStore(value,index)"
                    />
                    <!-- <van-cell  
                        v-for="(value, index) in storeData"
                        :key="index" center :class="index==0 ? 'selectActive': '' "
                        :value="value.name"
                        @click="selectStore(value)"
                    /> -->
                </template>
                <van-cell  center v-else>暂无数据</van-cell>
            </van-cell-group>
        </div>
    </van-popup>

    <van-dialog
        v-model="showApplyDialog"
        theme="round-button"
        class="ex_confirm"
        show-cancel-button 
        confirm-button-text="发起申请"
        cancel-button-text="暂不"
        @confirm="handleApply"
    >
        <div style="margin: 30px 20px 10px 20px;">
            <div style="text-align: left;">您还不是当前商家的客户，或商家拒绝了您的客户申请，是否现在发起客户申请？</div>
            <div style="margin-top: 10px; color: red;">商家电话：{{storeTel}}</div>
        </div>
    </van-dialog>
    <van-dialog v-model="showAuditingDialog">
        <div style="margin: 30px 20px 10px 20px;">
            <div style="text-align: left;">商家还没有通过您的客户申请，请耐心等待商家审核。</div>
            <div style="margin-top: 10px; color: red;">商家电话：{{storeTel}}</div>
        </div>
    </van-dialog>
  </div>
</template>

<script>
import Vue from 'vue';
import { Popup, NavBar, Search, Cell, CellGroup,Toast,Checkbox,Icon,Dialog } from 'vant';
Vue.use(Popup)
    .use(NavBar)
    .use(Search)
    .use(Cell)
    .use(CellGroup)
    .use(Checkbox)
    .use(Icon)
    .use(Dialog)
    .use(Toast);
import request from "@/request";
import { mapState } from "vuex";
import * as envConfig from "envConfigPath";

export default {
  name:'exchange',
  data(){
    return{
      storeShow:false,
      storeData:[
          {
              "id": 1,            //# 分公司ID
              "name": 1,         // # 分公司名称
              "isDefault": true   //# 是否是默认登陆公司，true:是;false:不是;当登陆状态下，访问该接口时才会返回正确值
          },
      ],
      defaultStore:false,//默认进入选中的店铺
      selectStoreObj:{},//选择的店铺
      companyId:0,//总公司的id
      exCompanyId:0,//当前店铺公司的id
      businessName:'',
      showApplyDialog: false,
      showAuditingDialog: false   
    }
  },
  computed: {
    ...mapState({
        storeTel: state => state.storeTel
    })
  },
  mounted(){
    window.z = this;
    
    this.getBusinessInfo();//获取商家信息
  },
  methods:{
    getBusinessInfo(){
        request({ url: '/open/stores/info' }).then((res)=>{
            this.businessName=res.name;
            this.$store.commit('getStoreTel',res.phone)
        })
    },
    isCheckedLogin(){//判断是否登录
      let userInfo = localStorage.getItem('userInfo');
      return userInfo?true:false;
    },
    onChange(event){
        var _this = this;
        _this.defaultStore = !_this.defaultStore;
        // if(_this.defaultStore){
            _this.defaultLogin();
        // }
    },
    defaultLogin(){
        let obj = {};
        if(this.defaultStore){
            if(!this.selectStoreObj.id){
                Toast('你还未选中店铺');
                return;
            }
            obj = {
                defaultCompanyId:Number(this.selectStoreObj.id)
            };
        }else{
            obj = {
                defaultCompanyId:0
            };
        }
        
        request({
            method: "post",
            url: '/stores/default-logins',
            data: obj
        }).then((res)=>{
            // console.log('res',res);
        }).catch((err)=>{
            Toast.fail(err.message)
        })
    },
    selectStore(value,index){
        
        this.storeData.forEach(p=>{
            p.isActive = false;
        })
        this.storeData[index].isActive = true;
        this.$forceUpdate();
        this.selectStoreObj = value;
        if(this.defaultStore){
            this.defaultLogin();
        }
    },
    onClose(){
        this.storeShow = false;
    },
    cancel(){
        this.storeShow = false;
    },
    confirm() {
        envConfig.jumpToCompany(this.selectStoreObj.id);
    },
    getStore(){
        request({ url: '/companies/store-branches' }).then(res => {
            this.storeData = res || [];
            this.storeData.forEach(item => {
                if(item.isDefault) {
                    item.isActive = true;
                    this.selectStoreObj = item;
                    this.defaultStore = true;
                }
            })
            this.storeShow = true;
        }).catch(err => {
            if(err && err.message) {
                Toast.fail(err.message);
            }
        });
    },
    handleApply() {
        request({
            method: "post",
            url: "/customers/store-apply"
        }).then(() => {
            Dialog.alert({
                message: "您已发起客户申请，请耐心等待商家审核。"
            })
        })
    },
  }
}
</script>

<style lang="less" scoped>
.exchange{
  padding: 10px 10px 0;
  .sear_exchange{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 16px;
        color: #FFFFFF;
        cursor: pointer;
    }
    .content {
        display: flex;
        flex-direction: column;
        .operation {
            .to-confirm {
                color: #58b8f7;
            }
            .seleted-text {
                text-align: center;
                margin: 0;
                padding: 6px 0;
                font-size: 14px;
                color: #323233;
                background-color: #f2f2f2;
            }
        }
        .checkbox{
            padding: 10px; 
            font-size: 14px;
            color: #323233;
            background-color: #f2f2f2;
        }
        .selector {
            padding:0 10px; 
            height: 260px;
            overflow: auto;
            .van-cell{
                border-bottom: 1px solid #ebedf0;
            }
            .van-cell:last-child{
                border: none;
            }
            /deep/.van-cell__value--alone{
                text-align: center;
            }
            .selectActive .van-cell__value--alone{
                color: #58b8f7!important;
            }
        }
        .selector::-webkit-scrollbar {
            display: none;
        }
    }
    .ex_confirm{
        /deep/.van-dialog__confirm{
            color: #fff!important;
        }
    }
    
}
</style>