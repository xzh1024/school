<template>
  <div class="payment">
    <div class="page-title-container">
			<img src="../../assets/back-icon.png" class="back-icon" @click="$router.go(-1)">
			<div class="page-title">选择支付方式</div>
		</div>
    <van-divider style="margin: 0;" />
    <div class="page-body-container">
      <div class="body_content">
      <template v-for="(item,index) in cardList">
        <div 
          :class="['item_div',item.disabled?'disabled':'']" 
          @click="clickPayment(item)" 
          :key="index">
          <div class="item_l item_flex">
            <img :src="item.logo" alt="">
            <div class="item_flex_c">
              <div>
                <span :class="['label',item.disabled?'disabled':'']">
                  {{item.name}}{{item.balance!=''?`（剩余￥${Number(item.balance).toFixed(2)}）`:''}}
                </span>
                <span class="label2" v-if="item.remark">{{item.remark}}</span>
              </div>
              <div v-if="item.disabled" class="label disabled">
                <span>余额不足</span>
              </div>
             
            </div>
            
          </div>
          <img v-if="item.checked"
            src="../../assets/maintenance/勾选主色@3x.png" alt="">
        </div>
      </template>
      </div>
    </div>

    <div class="page_foot" >
        <van-button 
          class=" button"
          @click="sumbit">确定{{orderPayamount?`（¥${Number(orderPayamount).toFixed(2)}）`:''}}</van-button>
    </div>

    <van-popup v-model="Downpay" closeable position="bottom" :style="{ height: '80%' }">
      <div class="DownPay-con">
          <p class="DownPay-title">线下支付</p>
          <div class="providerItem">
              <div class="provider-tips">
                  <img v-if="paystatus==1" src="../../assets/tips_cooperation.png">
                  <img v-if="paystatus==2" src="../../assets/tips_Suspendcooperation.png">
              </div>
              <!-- <div class="provider-company">
              <span class="name">{{name}}</span>
              </div>-->
              <div class="provider-pic">
                  <img :src="url?url:require('@/assets/maintenance/default-img.png')">
                  <p class="provider-pic-bottom">长按保存图片</p>
              </div>
              <div class="proder-msg">
                  <p>* 注意: 转账前请与商家核对身份及账单信息，</p>
                  <p>转账时请谨慎操作</p>
              </div>
          </div>
          <div class="DownPay-text">
              <span>备注：</span>
              <input
                  type="text"
                  v-model="note"
                  style="width:6rem;border:0.5px solid #EDEFF1"
                  placeholder="给卖家嘱咐两句"
              >
              <!-- <textarea name="" id="" v-model="note" cols="10" rows="5"></textarea> -->
          </div>
          <!-- <div class="DownPay-link" @click="checkPayment">查看商家收款信息</div> -->
          <div class="DownPay-buton" @click="DownPayOK">确认</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import wx from "weixin-js-sdk";
import request, { URL_MODULE } from "@/request";
import { Divider, Button, Popup, Toast, Dialog } from "vant";
Vue.use(Divider).use(Button).use(Popup).use(Toast).use(Dialog);
export default {
  name:"payment",
  data(){
    return{
      cardList:[
        // {
        //   name:'账户余额',checked:false,disabled:false,remark:'',balance:'3000',
        //   logo:require('@/assets/maintenance/账户余额@3x.png'),code:'accBalance'
        // },
        {
          name:'线下付款',checked:true,disabled:false,remark:'线下转账，线上发起申请',balance:'',
          logo:require('@/assets/maintenance/线下付款@3x.png'),code:'offlinePayment'
        },
        {
          name:'微信支付',checked:false,disabled:false,remark:'',balance:'',
          logo:require('@/assets/maintenance/微信支付@3x.png'),code:'weixin-jsapi'
        },
        // {
        //   name:'银联支付',checked:false,disabled:false,remark:'',balance:'',
        //   logo:require('@/assets/maintenance/银联支付@3x.png'),code:'unionpay'
        // },
        {
          name:'钻石卡',checked:false,disabled:false,remark:'',balance:'999',
          logo:require('@/assets/maintenance/钻石卡@3x.png'),code:'member-card-service-balance',
        },
        {
          name:'黑卡',checked:false,disabled:true,remark:'',balance:'300',
          logo:require('@/assets/maintenance/黑卡@3x.png'),code:'member-card-service-balance',
        },
      ],
      list:[//测试数据
        {
          "code": "weixin-jsapi",        //# 支付渠道code
          "name": "微信app支付" //# 支付渠道中文名称
        },
        {
          "name":"会员卡服务余额支付",
          "code":"member-card-service-balance",
          "info":[                                         //  # 赊销支付数据
            {
              "id": 1,                                    //# 会员卡服务ID
              "name": "砖石卡",                                 //# 会员卡服务ID
              "balance":"1000"                             //# 余额
            },
            {
              "id": 2,                                    //# 会员卡服务ID
              "name": "黑卡",                                 //# 会员卡服务ID
              "balance":"100"                             //# 余额
            },
          ]
        },
        {
          "name":"财务确认",
          "code":"financial"
        }

      ],
      selectPay:{},
      Downpay: false,
      note: "",//备注
      name: "",
      url: "",
      paystatus: 1,
      orderPayamount:'',//订单支付金额
    }
  },
  created(){
    // this.getOrderPayamount();
    this.getCompanyInfo();
  },
  mounted(){
    this.getPayList();
  },
  methods:{
    getOrderPayamount(item){//获取订单支付金额
      let url = `/orders/pay-amount/${this.$route.query.id}`;//支付渠道列表
      let params = {};
      if(this.$route.query.billType == 1){
        params = {
          type:item.code,
          billType:1, ///1: 平台订单; 10: 维保单据
          memberCardServiceId:item.id?item.id:'',//会员卡服务余额支付时该字段值必传(会员卡服务ID)
        }
      }else{
        let billNo = this.$route.query.billNo;
        let repairType = this.$route.query.repairType;
        params = {
          type:item.code,
          billType:10, ///1: 平台订单; 10: 维保单据
          billNo:billNo,//单据编号
          repairType:repairType,//维保单据类型
          memberCardServiceId:item.id?item.id:'',//会员卡服务余额支付时该字段值必传(会员卡服务ID)
        }
      }
      request({
        baseURL: URL_MODULE.united,
        url,
        params
      }).then(res =>{
        this.orderPayamount = res;
      }).catch(err =>{
        if(err && err.message) {
          Toast.fail(err.message);
        }
      })
    },
    getCompanyInfo(){//获取指定公司的店铺基本信息
      let _this = this;
      let url = "/open/stores/info";
      request({url}).then(res =>{
        if(res){
          _this.url = res.paymentCode;
          _this.name = res.name;
        }
      }).catch(err =>{
        if(err && err.message) {
          Toast.fail(err.message);
        }
      })
    },
    getPayList(){//支付渠道列表
      let feeAmount = this.$route.query.amount;//待支付待金额
      let url = `/pay/list`;//支付渠道列表
      let params = {
        os:'web'
      }
      // if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
      //   params.os = 'app';
      // } else {
      //   params.os = 'web';
      // }
      this.cardList = [];
      request({
        baseURL: URL_MODULE.pay,
        url,
        params
      }).then(res =>{
        if(res){
          
          let resData = res;
          // let resData = this.list;
          resData.forEach(p =>{
            let obj = {
              name:'',
              checked:false,
              disabled:false,//余额不足,禁止选择
              remark:'',
              balance:'',
              logo:'',
              code:'',
            }
            if(p.code == 'member-card-service-balance' && p.info){
              for(let k of p.info){
                obj = Object.assign({},obj,{code:p.code},k);
                if( Number(k.balance) < Number(feeAmount) ){
                  obj.disabled = true;
                  obj.logo = require('@/assets/maintenance/黑卡@3x.png');
                }else if(Number(k.balance) >= Number(feeAmount)){
                  obj.disabled = false;
                  obj.logo = require('@/assets/maintenance/钻石卡@3x.png');
                }
                this.cardList.push(obj);
              }
            }else{
              obj = Object.assign({},obj,p);
              if(p.code == 'weixin-jsapi'){
                obj.logo = require('@/assets/maintenance/微信支付@3x.png');
              }else{
                obj.logo = require('@/assets/maintenance/线下付款@3x.png');
              }
                this.cardList.push(obj);
            }
          });
          this.cardList[0].checked = true;
          this.selectPay = this.cardList[0];
          this.clickPayment(this.selectPay);
        }
      }).catch(err =>{
        if(err && err.message) {
          Toast.fail(err.message);
        }
      });
    },
    clickPayment(item){
      let _this = this;
      if(item.disabled) return;
      this.getOrderPayamount(item);
      for(let k of _this.cardList){
        if(item.id){
          if(item.code == k.code && item.id == k.id){
            _this.selectPay = k;
            k.checked = true;
          }else{
            k.checked = false;
          }
        }else{
          if(item.code == k.code){
            _this.selectPay = k;
            k.checked = true;
          }else{
            k.checked = false;
          }
        }
        
      }
    },
    sumbit(){
      if(this.selectPay.code == "financial"){
        this.Downpay = true;
      }else{
        Dialog.confirm({
          title: '确认支付',
          message: '确认要继续支付吗？',
        })
        .then(() => {
          this.DownPayOK();
        })
        .catch(() => {
          // on cancel
        });
      }
    },
    DownPayOK(){
      let id = this.$route.query.id;
      let billNo = this.$route.query.billNo;
      let repairType = this.$route.query.repairType;
      let amount = this.orderPayamount;
      let url = `/orders/${id}/pay`;//支付渠道列表
      let params = {};
      if(this.$route.query.billType == 1){
        params = {
          type:this.selectPay.code,
          billType:1, ///1: 平台订单; 10: 维保单据
          remarks:this.note,
          memberCardServiceId:this.selectPay.id?this.selectPay.id:'',//会员卡服务余额支付时该字段值必传(会员卡服务ID)
          amount:amount,//会员卡服务余额支付时该字段值必传(支付金额)
        }

        url += `?type=${params.type}&billType=${params.billType}&amount=${params.amount}&memberCardServiceId=${params.memberCardServiceId}&remarks=${params.remarks}`;
        
      }else{
        params = {
          type:this.selectPay.code,
          billType:10, ///1: 平台订单; 10: 维保单据
          remarks:this.note,
          billNo:billNo,//单据编号
          repairType:repairType,//维保单据类型
          memberCardServiceId:this.selectPay.id?this.selectPay.id:'',//会员卡服务余额支付时该字段值必传(会员卡服务ID)
          amount:amount,//会员卡服务余额支付时该字段值必传(支付金额)
        }
        url += `?type=${params.type}&billType=${params.billType}&billNo=${params.billNo}&repairType=${params.repairType}&amount=${params.amount}&memberCardServiceId=${params.memberCardServiceId}&remarks=${params.remarks}`;
        
      }
      request({
        url,
        method: "post",
        baseURL: URL_MODULE.united
      }).then(res =>{
        if(params.type =='weixin-jsapi'){//微信支付
          var data=res;//后台返回的微信支付参数
          let vm = this;
          if (typeof WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false)
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data))
              document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady(data))
            }
          } else {
            vm.onBridgeReady(data)
          }
        }else{//其他支付
          if(res){
            request({
              method: "post",
              url: res.url,
              data: res.data
            }).then(() =>{
              Toast.success('支付确认成功');
              setTimeout(()=>{
                this.$router.go(-1);
              },1000);
            }).catch(err =>{
              if(err && err.message) {
                Toast.fail(err.message)
              }
            });
          }
          // else{
          //   Toast.success('支付确认成功');
          //   this.$router.go(-1);
          // }
        }
      }).catch(err => {
        if(err && err.message) {
          Toast.fail(err.message);
        }
      });

    },
    onBridgeReady (data) {
      let self = this;
      if(!window.WeixinJSBridge) return;
      window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          'appId': data.appId,//公众号名称，由商户传入     
          'timeStamp': String(data.timeStamp),    //时间戳，自1970年以来的秒数。这里必须要转换为字符串。ios跟android表现不同。后台返回的是数值，但是微信方面必须要json参数都是字符串形式，android会自动转换成字符串（当时我在这里也找了很久的博文才知道的）
          'nonceStr': data.nonceStr,//随机串     
          'package': data.package,
          'signType': data.signType,//微信签名方式：
          'paySign': data.paySign//微信签名 
        },
        function (res) {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {//支付成功
            setTimeout(()=>{
              self.$router.go(-1);
            },1000);
          } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            Toast('支付取消!');
          } else {
            Toast.fail('支付失败，请重试!');
          }
        }
      )
    },
  }
}
</script>

<style lang="less" scoped>
.payment{
  height: 100vh;
  overflow: hidden;
  background: #F8F8F8;
  .page-title-container {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    img {
      padding-left: 16px;
      cursor: pointer;
    }
  }
  .page-title {
    margin-left:35%;
    font-size: 16px;
    font-weight: 500;
    color:#333;
  }
  .page-body-container {
    height: calc(100vh - 80px);
    overflow-y: auto;
    background: #F8F8F8;
    font-size: 14px;
    line-height: 20px;
    .body_content{
      background: #ffffff;
    }
    .item_div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:16px 0;
      margin:0 12px;
      background: #ffffff;
      border-bottom:1px solid #E6E6E6;
      &:last-child{
        border:none;
      }
      img{
        width:20px;
        height:20px;
      }
      .item_l {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        font-weight: 400;
        
        .label{
          margin: 0 8px;
          height: 20px;
          line-height: 20px;
        }
        .label2{
          height: 16.5px;
          font-size: 12px;
          color: #999999;
        }
        
      }
    }
    .disabled{
      color: #C4C4C4;
      cursor: not-allowed;
    }
    .item_flex{
      display: flex;
      // align-items: center;
    }
    .item_flex_c{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  .page_foot{
    position: fixed;
    width: 100%;
    bottom: 0;
    box-sizing: border-box;
    padding: 7px 12px;
    background: #FFFFFF;
    box-shadow: 0px -3px 16px -9px rgba(43,43,43,0.2);
    .button{
      width: 100%;
      height: 36px;
      background-image: linear-gradient(224deg, #FFB12D 0%, #FF6E4C 100%);
      border-radius: 18px;
      font-family: PingFangSC-Medium;
      font-size: 15px;
      color: #FFFFFF;
      text-align: center;
      font-weight: 500;
      line-height: 36px;
    }
  }
  .DownPay-con {
    .DownPay-title {
      font-size: 14px;
      line-height: 30px;
      border-bottom: 0.5px solid #edeff1;
    }
    .provider-pic {
      height: 6.35rem;
      margin: 0 8px;
      border-bottom: 0.5px solid #edeff1;
      .provider-pic-top {
        font-size: 14px;
        margin-bottom: 35px;
      }
      .provider-pic-bottom {
        font-size: 12px;
        color: #aaacb7;
        letter-spacing: -0.29px;
      }
      img {
        width: 188px;
        height: 188px;
      }
      // .provider-pic-border{
      //     border: 0.5px solid #EDEFF1;
      //     width: 188px;
      //     height: 188px;
      //     margin: 0 auto;
      // }
    }
    .proder-msg {
      font-size: 14px;
      color: #171c24;
      letter-spacing: -0.34px;
      text-align: center;
      line-height: 17px;
      padding: 20px 0;
      p {
        margin-block-start: 0;
        margin-block-end: 0;
      }
    }
    .DownPay-text {
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 16px;
      span {
        width: 60px;
      }
      textarea {
        flex: 1;
        border: 1px solid #edeff1;
      }
    }
    .DownPay-link {
      margin-top: 16px;
      font-size: 12px;
      color: #00a8ea;
    }
    .DownPay-buton {
      color: #00a8ea;
      border: 1px solid #00a8ea;
      margin: 16px auto;
      font-size: 14px;
      line-height: 40px;
      width: 104px;
      height: 40px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.4);
    }
  }
}
</style>