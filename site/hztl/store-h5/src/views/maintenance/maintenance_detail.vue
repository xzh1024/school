<template>
  <div class="maintenanceDetail">
    <div class="page-title-container">
			<img src="../../assets/back-icon.png" class="back-icon" @click="$router.go(-1)">
			<div class="page-title">工单详情</div>
		</div>
    <van-divider style="margin: 0;" />
    
    <div v-if="dataObj.id">
    
      <div :class="['page-body-container',status=='completed'?'body_h1':'body_h2']">
        <div class="plateNumber">
          <div class="label">
            车牌号：{{dataObj.plateNumber}}
          </div>
          <div class="label">
            业务类型：{{dataObj.businessCategoryName}}
          </div>
        </div>
        <!-- 基本信息 -->
        <div class="basic_info">
          <div class="item_container">
            <div class="item_w">
              <span class="item_label">维修门店：</span>
              <span class="item_content">{{dataObj.companyName || '-'}}</span>
            </div>
            <div :class="[renderState(dataObj.status),'state']">
              {{renderStatus(dataObj)}}
            </div>
          </div>
          <div class="item_container">
            <div class="item_w">
              <span class="item_label">工单号：</span>
              <span class="item_content">{{dataObj.billNo || '-'}}</span>
            </div>
          </div>
          <div class="item_container">
            <div class="item_w1">
              <span class="item_label">送修人：</span>
              <span class="item_content">{{dataObj.contactsName || '-'}}</span>
            </div>
            <div class="item_w2">
              <span class="item_label">送修人电话：</span>
              <span class="item_content">{{dataObj.contactsPhone || '-'}}</span>
            </div>
          </div>
          <div class="item_container">  
            <div class="item_w1">
              <span class="item_label">接待顾问：</span>
              <span class="item_content">{{dataObj.receptionManName || '-'}}</span>
            </div>
            <div class="item_w2">
              <span class="item_label">接待时间：</span>
              <span class="item_content size_12">{{renderTime(dataObj.receptionTime)|| '-'}}</span>
            </div>
          </div>
          <div class="item_container">  
            <div class="item_w1">
              <span class="item_label">进厂里程：</span>
              <span class="item_content">{{dataObj.mileage || '-'}}KM</span>
            </div>
            <div class="item_w2">
              <span class="item_label">交车时间：</span>
              <span class="item_content size_12">{{renderTime(dataObj.expectedDeliveryTime) || '-'}}</span>
            </div>
          </div>
          <div class="item_container">  
            <div class="item_w1">
              <span class="item_label">存油量：</span>
              <span class="item_content">{{dataObj.oilDegree || '-'}}</span>
            </div>
            <div class="item_w2 item_c_flex">
              <div class="item_c_flex margin_r" >
                <i class="iconfont icon-radio_sel sel_color" v-if="dataObj.flags.wash"></i>
                <i class="iconfont icon-radio_sel nor_color" v-else></i>
                <span class="item_content">洗车</span>
              </div>
              <div class="item_c_flex">
                <i class="iconfont icon-radio_sel sel_color" v-if="dataObj.flags.recovery"></i>
                <i class="iconfont icon-radio_sel nor_color" v-else></i>
                <span class="item_content">回收旧物</span>
              </div>
            </div>
          </div>

          <div class="item_container">  
            <div class="item_w item_q_flex">
              <span class="item_label">问题描述：</span>
              <span class="item_content">{{dataObj.contactsRemark || '-'}}</span>
            </div>
          </div>
        </div>
        <!-- 诊断报告 -->
        <div class="item_btn_box" 
          v-if="dataObj.checkReportId && dataObj.checkReportStatus && dataObj.checkReportStatus =='Complete'"
          @click="toReport">
          <div class="btn">
            <span class="btn_lable">诊断报告</span>
            <img class="icon_right" src="@/assets/maintenance/下主色@3x.png" alt="">
          </div>
        </div>
        <!-- 报价单 -->
        <div class="item_btn_box" 
          v-if="dataObj.hasCustomerOffer"
          @click="toOffer">
          <div class="btn">
            <span class="btn_lable">报价单</span>
            <img class="icon_right" src="@/assets/maintenance/下主色@3x.png" alt="">
          </div>
        </div>
        <!-- 结算单 -->
        <div class="item_btn_box" 
          v-if="dataObj.hasCustomerSettle"
          @click="toSettlement">
          <div class="btn">
            <span class="btn_lable">结算单</span>
            <img class="icon_right" src="@/assets/maintenance/下主色@3x.png" alt="">
          </div>
        </div>
        <!-- 服务项目 -->
        <ServicePro 
          serviceName='服务项目'
          :dataObj="dataObj.item?dataObj.item:{}"></ServicePro>
        <!-- 配件材料 -->
        <ServicePro 
          serviceName='配件材料'
          :dataObj="dataObj.part?dataObj.part:{}"></ServicePro>
        <!-- 建议项目 -->
        <ServicePro 
          serviceName='建议项目'
          :dataObj="dataObj.suggestion?dataObj.suggestion:{}"></ServicePro>
        <!-- 其他费用 -->
        <ServicePro 
          serviceName='其他费用'
          :dataObj="dataObj.extraFee?dataObj.extraFee:{}"></ServicePro>
        <!-- 费用结算 -->
        <CostSettlement 
          documentType="工单"
          :status="status"
          :dataObj="dataObj" />
        <!-- 付款信息 -->
        <PaymentInfo 
          v-if="status=='completed'"
          :dataObj="dataObj"/>
      </div>
      <!-- 应结金额 -->
      <div class="page_foot" v-if="status!='completed'">
        <div class="page_foot_flex">
          <div class="foot_l" v-if="status=='recepting'">
            <!-- 接待中 -->
            <div class="shouldFee">
              <span>预计应结金额：</span>
              <span :class="['f_fee']">¥
                <span class="fee_0">{{Number(dataObj.dueAmount).toFixed(2).split('.')[0]}}.</span>
                <span>{{Number(dataObj.dueAmount).toFixed(2).split('.')[1]}}</span>  
              </span>
            </div>
            <div class="yhFee" v-if="dataObj.discountAmount">
              <span>预计已优惠：</span>
              <span :class="['f_fee']">¥
                <span class="fee_0">{{Number(dataObj.discountAmount).toFixed(2).split('.')[0]}}.</span>
                <span>{{Number(dataObj.discountAmount).toFixed(2).split('.')[1]}}</span>  
              </span>
            </div>
          </div>
          <div class="foot_l" v-else>
            <div class="shouldFee">
              <span>应结金额：</span>
              <span :class="['f_fee']">¥
                <span class="fee_0">{{Number(dataObj.dueAmount).toFixed(2).split('.')[0]}}.</span>
                <span>{{Number(dataObj.dueAmount).toFixed(2).split('.')[1]}}</span>  
              </span>
            </div>
            <div class="yhFee" v-if="dataObj.discountAmount">
              <span>已优惠：</span>
              <span :class="['f_fee']">¥
                <span class="fee_0">{{Number(dataObj.discountAmount).toFixed(2).split('.')[0]}}.</span>
                <span>{{Number(dataObj.discountAmount).toFixed(2).split('.')[1]}}</span>  
              </span>
            </div>
          </div>
          <!-- 待付款 -->
          <van-button 
            v-if="status=='toFinancial' && Number(dataObj.dueAmount) > 0 && !dataObj.flags.customerPaied"
            class="foot_r button" 
            @click="toPayment">去付款</van-button>
          <!-- 接待中/施工中 -->
          <!-- <van-button 
            v-if="(status=='recepting' || status=='repairing') && 
            dataObj.hasCustomerOffer"
            class="foot_r button" 
            @click="toOffer">报价确认</van-button> -->
          <!-- 待结算 -->
          <!-- <van-button 
            v-if="status=='toFinancialConfirm' && dataObj.hasCustomerSettle"
            class="foot_r button" 
            @click="toSettlement">结算确认</van-button> -->
        </div>
      </div>
    </div>
    <div v-else class="nodata"> 
      <span>暂无数据</span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ServicePro from "./components/maintenance_detail/service_pro.vue";
import PartsMaterial from "./components/maintenance_detail/parts_material.vue";
import OtherFees from "./components/maintenance_detail/other_fees.vue";
import CostSettlement from "./components/maintenance_detail/cost_settlement.vue";
import PaymentInfo from "./components/maintenance_detail/payment_info.vue";
import request from "@/request";
import dayjs from "dayjs";
import { Divider, Button, Toast } from "vant";
Vue.use(Divider).use(Button).use(Toast);

export default {
  name: 'maintenanceDetail',
  components:{
    ServicePro,
    PartsMaterial,
    OtherFees,
    CostSettlement,
    PaymentInfo,
  },
  data(){
    return{
      dataObj:{
        // id:234,
        // status:'recepting',//工单状态 recepting:接待中, repairing:施工中, toFinancialConfirm:待结算, toFinancial:待付款, completed:已完成;
        // plateNumber:'川A·888666',//车牌号
        // businessCategoryName:'保养',//工单类型
        // companyName:'大气汽车服务公司成都店',//维修门店
        // billNo:'QQQQQ-WX-202105061220-0112',//工单号
        // contactsName:"古天乐",//送洗人
        // contactsPhone:"13543135133",//送洗人电话
        // receptionManName:'李四',//接待顾问
        // receptionTime:'2021-01-01T09:12:00Z',//接待时间
        // mileage:'2000KM',//进厂里程
        // settleTime:'2021-01-11T09:12:00Z',//交车时间
        // oilDegree:'1/2',//存油量
        // isWashCar:true,//洗车
        // isRecyclingOldThing:true,//回收旧件
        // receptionRemark:'这里有问题这里有问题这里有问题这里有问题这里有问题',//问题描述
        // "flags": {
        //   "wash": true,
        //   "recovery": false,
        //   "needDispatch": false,
        //   "needStartAndComplete": false,
        //   "customerOfferConfirmed": false,
        //   "customerSettleConfirmed": false,
        //   "customerPaied": false,
        //   "uploadedHealth": false
        // },	// # 标记位 第一位：是否洗车 第二位：是否客户回收旧件 第三位：是否需要派工 第四位：是否需要开工、完工 第五位：是否客户已报价确认 第六位：是否客户已结算确认 第七位：是否已上传健康档案

        // "hasCustomerOffer": true,	 //# 是否有客户报价确认单
        // "hasCustomerSettle": true,	// # 是否有客户结算确认单,
        // "checkReportId": 1,   //# 检测报告ID，0代表没有

        // "item": {	 //# 服务项目
        //   "rows": [	 //# 数据
        //     {
        //       "name": "保养",	 //# 名称
        //       "feeProperty": "self",	 //# 费用性质 自费：self 免费：free 保修：guarantee 返修：rework 保险：insurance
        //       "discountRate": "9.0",	 //# 折扣率
        //       "amount": "200"	 //# 金额
        //     },
        //     {
        //       "name": "保养2",	 //# 名称
        //       "feeProperty": "insurance",	 //# 费用性质 自费：self 免费：free 保修：guarantee 返修：rework 保险：insurance
        //       "discountRate": "9.0",	 //# 折扣率
        //       "amount": "300"	 //# 金额
        //     }
        //   ],
        //   "totalAmount": "200"	 //# 小计
        // },
        // "part": {	 //# 配件材料
        //   "rows": [	// # 数据
        //     {
        //       "name": "轮胎",	 //# 名称
        //       "feeProperty": "self",	 //# 费用性质 自费：self 免费：free 保修：guarantee 返修：rework 保险：insurance
        //       "discountRate": "0",	 ///# 折扣率
        //       "amount": "1000"	 ///# 金额
        //     }
        //   ],
        //   "totalAmount": "1000"	 //# 小计
        // },
        // "extraFee": {	 //# 其他费用
        //   "rows": [	 //# 数据
        //     {
        //       "name": "送车费",	 //# 名称
        //       "feeProperty": "self",	 //# 费用性质 自费：self 免费：free 保修：guarantee 返修：rework 保险：insurance
        //       "discountRate": "9.5",	 //# 折扣率
        //       "amount": "299"	 //# 金额
        //     }
        //   ],
        //   "totalAmount": "299"	 //# 小计
        // },
        // "suggestion": {	// # 建议项目
        //     "rows": [	 //# 数据
        //         {
        //             "name": "",	// # 名称
        //             "feeProperty": "",	// # 费用性质 自费：self 免费：free 保修：guarantee 返修：rework 保险：insurance 已购：paid 无：空字符串
        //             "*discountRate": "0",	// # 折扣率
        //             "amount": "0",	 //# 金额
        //             "remark": ""	 //# 备注
        //         }
        //     ],
        //   "totalAmount": "0"	 //# 小计
        // },

        // "totalAmount": "1000",	 //# 合计金额
        // "discountAmount": "200",	 //# 整单优惠金额
        // "eraseAmount": "0",	 //# 抹零金额
        // "dueAmount": "800",	 //# 应结金额
        // "settlementType": "现付",	 //# 结算方式：现付、挂账、代收、量子金贷
        // "paymentTypes": [	 //# 支付方式
        //   ""
        // ],
        // "invoiceType": "增值税发票",	 //# 发票类型
        // "taxRate": "13"	, //# 税率
        // actualAmount:'800',//结算实付
        // "memberDiscountType": "",	 //# 会员折扣类型 会员等级：level 会员卡：card
        // "memberDiscountCardId": 0,	 //# 会员卡ID
        // "memberDiscountName": "",	 //# 会员折扣名称
        // "memberDiscountPart": "0",	// # 会员配件折扣
        // "memberDiscountItem": "0",	 //# 会员项目折扣
        // "memberDiscountSet": "0"	 //# 会员套餐折扣

      },
      
      status:"",
      //单据状态
        //维修工单： 
          //recepting:接待中, repairing:施工中, toFinancialConfirm:待结算, 
          //toFinancial:待付款,completed:已完成; 
      isShowQuotation:false,//是否显示报价单按钮
      isShowSettlement:false,//是否显示结算单按钮
      isShowPayment:false,//是否显示付款信息
    }
  },
  mounted(){
    // if(this.$route.query.status){
    //   this.onLoadStatus();
    // }
    if(this.$route.query.id){
      this.init();
    }
  },
  methods:{
    renderTime(date){
      if(!date)return false;
      return dayjs(date).format('YYYY-MM-DD HH:mm');
    },
    toPayment(){//选择支付方式
      let obj={
        path:'/payment',
        query:{
          id:this.dataObj.id,
          billNo:this.dataObj.billNo,
          amount:this.dataObj.dueAmount,
          repairType:'repairBill'
        }
      }
      this.$router.push(obj);
    },
    onLoadStatus(){
      // this.status = this.$route.query.status;
      if(this.status == 'recepting'){//接待中
        this.isShowQuotation = false;
        this.isShowSettlement = false;
      }else if(this.status == 'repairing'){//施工中
        this.isShowQuotation = true;
        this.isShowSettlement = false;
      }else if(this.status == 'toFinancialConfirm'){//待结算
        this.isShowQuotation = true;
        this.isShowSettlement = true;
      }else if(this.status == 'toFinancial'){//待付款
        this.isShowQuotation = true;
        this.isShowSettlement = true;
      }else if(this.status == 'completed'){//已完成
        this.isShowQuotation = true;
        this.isShowSettlement = true;
        this.isShowPayment = true;
      }
    },
    init(){
      let url = `/repair-center/repair-bills/bills`;
      let params = {
        id:this.$route.query.id
      }
      this.dataObj = {};
      // this.status = this.dataObj.status;
      // return
      request({
        url,
        params
      }).then(res => {
        if(res){
          this.dataObj = res;
          this.status = res.status;
          // this.onLoadStatus();
        }
      }).catch(err => {
        if(err && err.message) {
          Toast.fail(err.message);
        }
      })
    },
    toReport(){//诊断报告
      let obj = {
        path:"/diagnosticReport",
        query:{
          orderId:this.dataObj.id,
          from:'maintenanceDetail'
        }
      }
      this.$router.push(obj);
    },
    toOffer(){//报价单
      let obj = {
        path:"/quotation",
        query:{
          id:this.dataObj.id,
          from:'maintenanceDetail'
        }
      }
      this.$router.push(obj);
    },
    toSettlement(){//结算单
      let obj = {
        path:"/settlement",
        query:{
          id:this.dataObj.id,
          from:'maintenanceDetail'
        }
      }
      this.$router.push(obj);
    },
    openProFn(name){
      this[name] = !this[name];
    },
    renderState(state){
      let str = '';
      if(state=='待清洗'){
        str = 'documentState1';
      }else if(state=='toFinancial' || state=='待结算'){
        str = 'documentState2';
      }else if(state=='completed' || state=='已完成'){
        str = 'documentState3';
      }else if(state=='recepting'){//接待中
        str = 'documentState4';
      }else if(state=='repairing'){//施工中
        str = 'documentState5';
      }else if(state=='toFinancialConfirm'){//待结算
        str = 'documentState6';
      }
      return str;
    },
    renderStatus(item){
      if(Object.keys(item).length === 0)return;
      let str = '';
      let status = item.status;
      let customerPaid = item.flags.customerPaied;
      if(status=='recepting'){
        str = '接待中';
      }else if(status=='repairing'){
        str = '施工中';
      }else if(status=='completed' || status=='已完成'){
        str = '已完成';
      }else if(status=='toFinancialConfirm' || status=='待结算'){
        if(status=='待结算' && customerPaid){
          str = '待收款交车';
        }else{
          str = '待结算';
        }
      }else if(status=='toFinancial'){
        str = customerPaid?'待收款交车':'待付款';
      }else if(status=='待清洗'){
        str = '待清洗';
      }
      return str;
    },
  }
}
</script>

<style lang="less" scoped>
.maintenanceDetail{
  height: 100vh;
  overflow: hidden;
  background: #F8F8F8;
  .plateNumber{
    display:flex;
    align-items: center;
    padding: 12px;
    background: #FF6E4C;
    .label{
      flex:1;
      height: 21px;
      text-align: left;
      font-family: PingFangSC-Medium;
      font-size: 15px;
      color: #FFFFFF;
      letter-spacing: 0;
      font-weight: 500; 
    }
  }
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
  .select{
    font-size: 13px;
    font-family: PingFangSC-Regular;
    color: #FF6E4C;
  }
  .page-title {
    margin-left: 35%;
    font-size: 16px;
    font-weight: 500;
    color:#333;
  }
  .body_h1{
    height: calc(100vh - 44px);
  }
  .body_h2{
    height: calc(100vh - 94px);
  }
  
  .nodata{
    font-size: 13px;
    color:#999999;
    padding:8px;
    text-align: center;
  }
  .page-body-container {
    
    overflow-y: auto;
    background: #F8F8F8;
    font-size: 13px;
    .basic_info{
      margin:12px;
      padding:12px;
      background: #ffffff;
      border-radius: 8px;
      .item_container{
        margin:8px 0;
        display: flex;
        // align-items: center;
        flex-wrap: wrap;
        text-align: left;
        .item_w{
          flex:1;
        }
        .item_w1{
          flex:45.8%;
        }
        .item_w2{
          flex:54.2%;
        }
        .item_label{
          height: 18px;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #999999;
          line-height: 18px;
          font-weight: 400;
        }
        .item_content{
          flex:1;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #333333;
          font-weight: 400;
        }
        .size_12{
          font-size: 12px;
        }
        .item_c_flex{
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .sel_color{
            color:#FF6E4C;
            margin-right: 4px;
          }
          .nor_color{
            color:#c4c4c4;
            margin-right: 4px;
          }
          
        }
        .state{
          padding:2px 12px;
          margin-left:8px;
          font-size: 12px;
          font-weight: 500;
          max-width: 87px;
          height: 16px;
          line-height: 16px;
          color: #fff;
          border-radius: 16px;
          text-align: center;
          // opacity: 0.15;
        }
        .documentState1{//待清洗
          color:#FFBA12;
          background: #FFBA1226;
        }
        .documentState2{//待付款
          color:#E84F47;
          background: #E84F4726;
        }
        .documentState3{//已完成
          color:#26A872;
          background: #26A87226;
        }
        .documentState4{//接待中
          color:#FFBA12;
          background: #FFBA1226;
        }
        .documentState5{//施工中
          color:#6B82FD;
          background: #6B82FD26;
        }
        .documentState6{//待结算
          color:#722EEC;
          background: #722EEC26;
        }
      }
    }
    .item_btn_box{
      background: #FF6E4C26;
      border-radius: 4px;
      padding:4px 0;
      margin:12px;
      text-align: center;
      .btn{
        display: flex;
        align-items: center;
        justify-content: center;
        .btn_lable{
          height: 16px;
          font-family: PingFangSC-Medium;
          font-size: 12px;
          color: #FF6E4C;
          line-height: 16px;
          font-weight: 500;
          margin-right:4px;
        }
        .icon_right{
          transform: rotate(-90deg);
          width: 12px;
          height: 12px;
          line-height: 16px;
        }
      }
      
    }
    .item_pro{
      margin:12px;
      padding:12px;
      background: #ffffff;
      border-radius: 8px;
      .item_pro_title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item_pro_l{
          display: flex;
          align-items: center;
          img{
            width: 16px;
            height: 16px;
            margin-left: 4px;
          }
          .icon_top{
            transform: rotate(180deg);
          }
          .icon_bottom{
            transform: rotate(0deg);
          }
          .name{
            font-size: 16px;
            color: #333333;
            font-weight: 500;
          }
          .number{
            font-size: 14px;
            color: #333333;
            font-weight: 400;
          }
        }
        .item_pro_r{
          color: #E3332A;
          font-weight: 500;
          font-size: 16px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          .f_fee{
            font-size: 11px;
            .fee_0{
              font-size: 16px;
            }
          }
        }
      }
      .item_pro_body{
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #999999;
        font-weight: 400;
        text-align: left;
        .f_fee{
          color: #333333;
          font-size: 11px;
          .fee_0{
            font-size: 13px;
          }
        }
        .line_th{
          text-decoration: line-through;
        }
        .parts{
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin:2px 0
        }
        .line{
          content: '';
          margin:0 8px;
          height:13px;
          width:1px;
          display: inline-block;
          border-right:1px solid #999999;
        }
      }
    }
    .item_pro_flex{
      display: flex;
      justify-content: space-between;
      // align-items: center;
    }
    .item_q_flex{
      display: flex;
    }
    .item_margin{
      margin:8px 0;
    }
    .margin_r{
      margin-right:28px;
    }
    .ellipsis{
      overflow: hidden;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
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
    .page_foot_flex{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height:36px;
      .foot_l{
        font-family: PingFangSC-Medium;
        color: #E1251B;
        text-align: right;
        display: flex;
        flex-direction: column;
        
        .shouldFee{
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          .f_fee{
            font-size: 11px;
            .fee_0{
              font-size: 14px;
            }
          }
        }
        .yhFee{
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;

          .f_fee{
            font-size: 11px;
            .fee_0{
              font-size: 12px;
            }
          }
        }
      }
      .foot_r{
        margin-left:12px;
      }
      .button{
        width: 100px;
        height: 36px;
        background-image: linear-gradient(224deg, #FFB12D 0%, #FF6E4C 100%);
        border-radius: 18px;
        font-family: PingFangSC-Medium;
        font-size: 15px;
        color: #FFFFFF;
        text-align: center;
        font-weight: 500;
      }
    }
  }
  
  
}
</style>