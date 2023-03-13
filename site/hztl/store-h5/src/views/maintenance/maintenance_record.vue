<template>
  <div class="box-container">
    <div class="page-title-container">
			<img src="../../assets/back-icon.png" class="back-icon" @click="$router.go(-1)">
			<div class="page-title">维保履历</div>
		</div>

    <van-divider style="margin: 0;" />
    <!-- <van-search 
      show-action
      v-model="keyword" 
      left-icon=''
      right-icon="search"
      :placeholder="placeholder" 
      shape="round" @search="onSearch">
      <template #action>
        <div @click="showFilter=true" class="select">筛选</div>
      </template>
    </van-search> -->
    <van-search 
      v-model="keyword" 
      left-icon=''
      right-icon="search"
      :placeholder="placeholder" 
      shape="round" @search="onSearch">
    </van-search>
    <div class="page-body-container">
      
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      > 
        <template v-for="(item,index) in list">
          <div class="item-container" :key="index" @click="toDetail(item)">

            <div class="item_top">
              <div class="item_flex">
                <div class="billNo">{{item.billNo}}</div>
                <div :class="[renderState(item.status),'state']">
                  {{renderStatus(item)}}
                </div>
                <div class="documentType">
                  <span class="dotType"></span>
                  {{item.type=='repairBill'?'维修工单':item.type=='repairWashing'?'洗车单':''}}
                </div>
              </div>
              <div class="item_flex marginTop" >
                <span class="label receptionTime" >{{renderTime(item.receptionTime)}}</span>
              </div>
            </div>

            <div class="divider"></div>

            <div class="item_bottom">
              <div class="item_flex">
                <div class="item_w" >
                  <span class="label">车牌号：</span>
                  <span class="content">{{item.plateNumber}}</span>
                </div>
                <div class="item_w" v-if="item.type == 'repairBill'">
                  <span class="label">工单类型：</span>
                  <span class="content">{{item.businessCategoryName || '-'}}</span>
                </div>
                <div class="item_w" v-if="item.type == 'repairBill'">
                  <span class="label">服务项目：</span>
                  <span class="content">{{item.itemCount || '-'}}</span>
                </div>
                <div class="item_w" v-if="item.type == 'repairBill'">
                  <span class="label">配件材料：</span>
                  <span class="content">{{item.partCount || '-'}}</span>
                </div>
                <div class="item_w" v-if="item.type == 'repairBill'">
                  <span class="label">建议项目：</span>
                  <span class="content">{{item.suggestionCount || '-'}}</span>
                </div>
                <div class="item_w" v-if="item.type == 'repairBill'">
                  <span class="label">其他费用：</span>
                  <span class="content">{{item.extraFeeCount || '-'}}</span>
                </div>
                <div class="label item_w">
                  <span class="label">{{item.type == 'repairBill'?'送修人':'送洗人'}}：</span>
                  <span class="content">{{item.contactsName || '-'}}</span>
                </div>
                <div class="label item_w">
                  <span class="label">{{item.type == 'repairBill'?'送修人电话':'送洗人电话'}}：</span>
                  <span class="content">{{item.contactsPhone || '-'}}</span>
                </div>
              </div>
              <div class="remark_flex" >
                <div class="label" >备注：</div>
                <div class="content ellipsis">{{item.remark || '-'}}</div>
              </div>
            </div>
            <div class="divider"></div>
            <!-- <div class="item_foot"> -->
              <div class="foot_flex">
                <div class="foot_flex_l">
                  <span class="foot_label">合计费用：</span>
                  <span class="foot_fee">¥
                    <span class="fee_0">{{Number(item.feeAmount).toFixed(2).split('.')[0]}}</span>
                    <span>.{{Number(item.feeAmount).toFixed(2).split('.')[1]}}</span>  
                  </span>
                </div>
                    
                <van-button 
                  v-if="(item.status=='toFinancial' || item.status=='待结算') && Number(item.feeAmount) > 0 && !item.customerPaid"
                  class="foot_btn"
                  round
                  color="linear-gradient(to right, #FF6E4C, #FFB12D)"
                  @click.stop="toPayment(item)">
                  去付款
                </van-button>
                
                <van-button 
                  v-if="item.status=='recepting' && item.hasCustomerOffer && !item.customerOfferConfirmed"
                  class="foot_btn"
                  round
                  color="linear-gradient(to right, #FF6E4C, #FFB12D)"
                  @click.stop="toQuotation(item)">
                  报价确认
                </van-button>
                <van-button 
                  v-if="item.status=='toFinancialConfirm' && item.hasCustomerSettle && !item.customerSettleConfirmed"
                  class="foot_btn"
                  round
                  color="linear-gradient(to right, #FF6E4C, #FFB12D)"
                  @click.stop="toSettlement(item)">
                  结算确认
                </van-button>
              </div>
            <!-- </div> -->
          </div>
        </template>
      </van-list>
      
    </div>

    
    <van-popup
      class="filter-pop"
      v-model="showFilter"
      position="right"
      :style="{ width: '83%' }"
    >
      <div class="filter_box">
        <div class="filter-group">
          <div class="label">车牌号</div>
          <div class="content">
            <template v-if="filter.plateNumber && filter.plateNumber.length>0">
                <van-button
                    class="button"
                    size="small"
                    round
                    v-for="(label, index) in filter.plateNumber"
                    :key="index"
                    :class="[filterObj.plateNumber == label ? 'active' : '']"
                    @click="filterObj.plateNumber = label"
                >{{label}}</van-button>
            </template>
            <p
                class="none-content"
                v-if="!filter.plateNumber || filter.plateNumber.length==0"
            >暂无可选车牌号</p>
          </div>
        </div>
        <div class="filter-group">
            <div class="label">选择到店日期</div>
            <div class="content">
                <div class="toShopDate" 
                  :class="[filter.receptionTime.startTime ? 'active' : '']"
                  @click="showTime = true">
                  <span class="time">
                    {{filter.receptionTime.startTime?filter.receptionTime.startTime:'开始日期'}}
                  </span>
                  <span>至</span>
                  <span class="time">
                    {{filter.receptionTime.endTime?filter.receptionTime.endTime:'结束日期'}}
                  </span>
                </div>
                <van-calendar 
                  v-model="showTime" 
                  type="range" 
                  @confirm="onConfirm" />

                
            </div>
        </div>
        
        <div class="filter-group">
            <div class="label">单据类型</div>
            <div class="content_type">
                <template v-if="filter.typeList && filter.typeList.length>0">
                    <van-button
                        class="button"
                        size="small"
                        round
                        v-for="(item, index) in filter.typeList"
                        :key="index"
                        :class="[filterObj.type == item.label ? 'active' : '']"
                        @click="documentTypeFn(item.label)"
                    >{{item.label}}</van-button>
                </template>
                <p
                    class="none-content"
                    v-if="!filter.typeList || filter.typeList.length==0"
                >暂无可选单据类型</p>
            </div>
        </div>
        <div class="filter-group">
            <p class="label">工单类型</p>
            <div class="content_type">
                <template v-if="filter.businessCategoryName  && filter.businessCategoryName .length>0">
                    <van-button
                        class="button"
                        size="small"
                        round
                        v-for="(label, index) in filter.businessCategoryName "
                        :key="index"
                        :class="[filterObj.businessCategoryName  == label ? 'active' : '']"
                        @click="filterObj.businessCategoryName  = label"
                    >{{label}}</van-button>
                </template>
                <p
                    class="none-content"
                    v-if="!filter.businessCategoryName  || filter.businessCategoryName .length==0"
                >暂无可选工单类型</p>
            </div>
        </div>
        <div class="filter-group">
            <p class="label">单据状态</p>
            <div class="content_type">
                <template v-if="filter.statusList && filter.statusList.length>0">
                    <van-button
                        class="button btn_w"
                        size="small"
                        round
                        v-for="(label, index) in filter.statusList"
                        :key="index"
                        :class="[filterObj.status == label ? 'active' : '']"
                        @click="filterObj.status = label"
                    >{{label}}</van-button>
                </template>
                <p
                    class="none-content"
                    v-if="!filter.statusList || filter.statusList.length==0"
                >暂无可选单据状态</p>
            </div>
        </div>
      </div>
      <div class="operation">
        <van-button class="reset" @click="filterReset">重置</van-button>
        <van-button class="confirm" @click="filterConfirm">确认</van-button>
      </div>
        
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import dayjs from "dayjs";
import { Icon, Divider, Button, List, Search, Popup, Calendar, Toast } from "vant";
import dateFormat from "../../utils/date";
import request from "@/request";
Vue.use(Icon).use(Divider).use(Button).use(List).use(Search).use(Popup).use(Calendar).use(Toast);
export default {
  name:"maintenanceRecord",
  data(){
    return{
      keyword:'',
      page:1,
      pageSize:10,
      error:false,
      placeholder: "车牌号/送修人/单号/项目名称/配件名称等关键字",
      showFilter:false,
      showTime:false,
      filter: {
        plateNumber:[
          '【奥迪】川A·12531','【奥迪】川A·12532',
          '【奥迪12313】川A·12533',
        ],//车牌号
        // receptionTime:'',
        receptionTime:{
          startTime:'',//开始日期
          endTime:'',//结束日期
        },//到店日期
        typeList:[
          {label:'洗车单',value:'repairWashing'},
          {label:'维修工单',value:'repairBill'},
        ],//单据类型
        businessCategoryName :[
          '保养','维修','美容','钣喷'
        ],//工单类型
        statusList:[
          '待清洗','接待中','施工中','待结算','待付款','已完成'
        ],//单据状态
      },
      filterObj: {
        plateNumber:'',
        // receptionTime:false,
        type:'',
        businessCategoryName :'',
        status:'',
      },
      //单据状态
        //维修工单： 
          //recepting:接待中, repairing:施工中, toFinancialConfirm:待结算, 
          //toFinancial:待付款,completed:已完成; 
        //洗车单：   待清洗:待清洗, 待结算:待结算, 已完成:已完成
      list: [
        // {
        //   "type": "repairBill",	 //# 单据类型 repairBill:维修工单 repairWashing:洗车单
        //   "id": 0,	 //# 单据ID
        //   "billNo": "CD-XC-20201223-0001",	 //# 单据号
        //   businessCategoryName :'保养',//工单类型
        //   "status": "recepting",	 //# 单据状态 维修工单： recepting:接待中, repairing:施工中, toFinancialConfirm:待结算确认, toFinancial:待收款交车, completed:已完成; 洗车单： 待清洗:待清洗, 待结算:待结算, 已完成:已完成;
        //   "customerPaid": false,	 //# 客户已支付
        //   "receptionTime": "2021-01-01T12:30:30Z",	// # 接待时间
        //   "plateNumber": "川A.12342",	 //# 车牌号
        //   "contactsName": "能得到",	 //# 送修/洗人
        //   "contactsPhone": "12345678987",	// # 送修/洗电话
        // "hasCustomerOffer": true, //# 是否有客户报价确认单,
        // "hasCustomerSettle": false, //# 是否有客户结算确认单

        //   "remark": "备注",	 //# 备注
        //   "itemCount": 1,	 //# 服务项目数量
        //   "partCount": 2,	 //# 配件材料数量
        //   "extraFeeCount": 3,	 //# 其他费用数量
        //   "suggestionCount": 4,	// # 建议项目数量
        //   "feeAmount": "500"	 //# 合计费用
        // },

        // {
        //   id:1,
        //   billNo:'CD-XC-20201223-0001',//
        //   status:"待清洗",//单据状态
        //   receptionTime:"2020-12-18 12:20:10",//到店日期
        //   type:"repairWashing",//单据类型
        //   businessCategoryName :'保养',//工单类型
        //   plateNumber:"川A55555",//车牌号
        //   contactsName:"古天乐",//送洗人
        //   contactsPhone:"13543135133",//送洗人电话
        //   remark:"这里是一行备注这里是一行备注这里是一行备注这里是一行备注这里是一行备注",//备注
        //   feeAmount:"520.50",//合计费用
        // },
        // {
        //   id:2,
        //   billNo:'CD-XC-20201223-0002',//
        //   status:"待结算",//单据状态
        //   receptionTime:"2020-12-18 12:20:10",//到店日期
        //   type:"repairWashing",//单据类型
        //   businessCategoryName :'保养',//工单类型
        //   plateNumber:"川A55555",//车牌号
        //   contactsName:"古天乐",//送洗人
        //   contactsPhone:"13543135133",//送洗人电话
        //   remark:"这里是一行备注这里是一行备注这里是一行备注这里是一行备注这里是一行备注",//备注
        //   feeAmount:"520.50",//合计费用
        // },
        // {
        //   id:2,
        //   billNo:'CD-XC-20201223-0002',//
        //   status:"已完成",//单据状态
        //   receptionTime:"2020-12-18 12:20:10",//到店日期
        //   type:"repairWashing",//单据类型
        //   businessCategoryName :'保养',//工单类型
        //   plateNumber:"川A55555",//车牌号
        //   contactsName:"古天乐",//送洗人
        //   contactsPhone:"13543135133",//送洗人电话
        //   remark:"这里是一行备注这里是一行备注这里是一行备注这里是一行备注这里是一行备注",//备注
        //   feeAmount:"520.50",//合计费用
        // },
        // {
        //   id:3,
        //   billNo:'CD-XC-20201223-0003',//
        //   status:"recepting",//单据状态
        //   receptionTime:"2020-12-18 12:20:10",//到店日期
        //   plateNumber:"川A55555",//车牌号
        //   type:"repairBill",//单据类型
        //   businessCategoryName :'保养',//工单类型
        //   itemCount:2,//服务项目
        //   partCount:2,//配件材料
        //   suggestionCount:2,//建议项目
        //   extraFeeCount:0,//其他费用
        //   contactsName:"古天乐",//送洗人
        //   contactsPhone:"13543135133",//送洗人电话
        //   remark:"这里是一行备注这里是一行备注这里是一行备注这里是一行备注这里是一行备注",//备注
        //   feeAmount:"520.50",//合计费用
        // },
        // {
        //   id:4,
        //   billNo:'CD-XC-20201223-0004',//
        //   status:"repairing",//单据状态
        //   receptionTime:"2020-12-18 12:20:10",//到店日期
        //   plateNumber:"川A55555",//车牌号
        //   type:"repairBill",//单据类型
        //   businessCategoryName :'保养',//工单类型
        //   itemCount:2,//服务项目
        //   partCount:2,//配件材料
        //   suggestionCount:2,//建议项目
        //   extraFeeCount:0,//其他费用
        //   contactsName:"古天乐",//送洗人
        //   contactsPhone:"13543135133",//送洗人电话
        //   remark:"这里是一行备注这里是一行备注这里是一行备注这里是一行备注这里是一行备注",//备注
        //   feeAmount:"520.50",//合计费用
        // },
        // {
        //   id:5,
        //   billNo:'CD-XC-20201223-0005',//
        //   status:"toFinancialConfirm",//单据状态
        //   receptionTime:"2020-12-18 12:20:10",//到店日期
        //   plateNumber:"川A55555",//车牌号
        //   type:"repairBill",//单据类型
        //   businessCategoryName :'保养',//工单类型
        //   itemCount:2,//服务项目
        //   partCount:2,//配件材料
        //   suggestionCount:2,//建议项目
        //   extraFeeCount:0,//其他费用
        //   contactsName:"古天乐",//送洗人
        //   contactsPhone:"13543135133",//送洗人电话
        //   remark:"这里是一行备注这里是一行备注这里是一行备注这里是一行备注这里是一行备注",//备注
        //   feeAmount:"520.50",//合计费用
        // },
        // {
        //   id:7,
        //   billNo:'CD-XC-20201223-0007',//
        //   status:"toFinancial",//单据状态
        //   receptionTime:"2020-12-18 08:20:10",//到店日期
        //   plateNumber:"川A55555",//车牌号
        //   type:"repairBill",//单据类型
        //   businessCategoryName :'保养',//工单类型
        //   itemCount:2,//服务项目
        //   partCount:2,//配件材料
        //   suggestionCount:2,//建议项目
        //   extraFeeCount:0,//其他费用
        //   contactsName:"古天乐",//送洗人
        //   contactsPhone:"13543135133",//送洗人电话
        //   remark:"这里是一行备注这里是一行备注这里是一行备注这里是一行备注这里是一行备注这里是一行备注这里是一行备注这里是一行备注这里是一行备注这里是一行备注",//备注
        //   feeAmount:"520.50",//合计费用
        // },
        // {
        //   id:6,
        //   billNo:'CD-XC-20201223-0006',//
        //   status:"completed",//单据状态
        //   receptionTime:"2020-12-18 12:20:10",//到店日期
        //   plateNumber:"川A55555",//车牌号
        //   type:"repairBill",//单据类型
        //   businessCategoryName :'保养',//工单类型
        //   itemCount:2,//服务项目
        //   partCount:2,//配件材料
        //   suggestionCount:2,//建议项目
        //   extraFeeCount:0,//其他费用
        //   contactsName:"古天乐",//送洗人
        //   contactsPhone:"13543135133",//送洗人电话
        //   remark:"这里是一行备注这里是一行备注这里是一行备注这里是一行备注这里是一行备注",//备注
        //   feeAmount:"520.50",//合计费用
        // },
      ],
      loading: false,
      finished: false,
    }
  },
  mounted(){
    let searchIcon = document.querySelector('.van-field__right-icon');
    searchIcon.addEventListener("click", this.onSearch);
    this.onSearch();
  },
  methods:{
    renderTime(date){
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    },
    toPayment(item){//去付款
      let obj={
        path:'/payment',
        query:{
          id:item.id,
          billNo:item.billNo,
          amount:item.feeAmount,
          repairType:item.type
        }
      }
      this.$router.push(obj);
    },
    toQuotation(item){//报价确认
      let obj={
        path:'/quotation',
        query:{
          id:item.id
        }
      }
      this.$router.push(obj);
    },
    toSettlement(item){//结算确认
      let obj={
        path:'/settlement',
        query:{
          id:item.id
        }
      }
      this.$router.push(obj);
    },
    documentTypeFn(label){
      this.filterObj.type = label;
    },
    
    toDetail(item){
      if(item.type == 'repairWashing') return false;
      let obj={
        path:'/maintenanceDetail',
        query:{
          id:item.id,
        }
      }
      this.$router.push(obj);
    },
    onSearch(){
      this.finished = false;
      this.page = 1;
      this.list = [];
      this.onLoad();
    },
    filterReset() {
      let _this = this;
      _this.filterObj = {
        plateNumber:'',
        receptionTime:false,
        type:'',
        businessCategoryName :'',
        status:'',
      };
    },
    filterConfirm() {
      let _this = this;
      _this.showFilter = false;
      _this.onSearch();
    },
    
    onConfirm(date) {
      const [start, end] = date;
      this.filter.receptionTime.startTime = dateFormat.dateYmd(start);
      this.filter.receptionTime.endTime = dateFormat.dateYmd(end);
      this.showTime = false;
    },
    onLoad() {
      let _this = this;
      if (this.finished) return;
      this.loading = true;
      let url = '/repair-center/repair-bills';
      let params = {
        "plateNumber": "",	 //# 车牌号，全匹配
        "keyword": this.keyword,	 //# 关键字
        "statuses": [], //# 状态
        "page": this.page,	// # 页码
        "pageSize": this.pageSize	 //# 页宽
      };
      request({
        url,
        params
      }).then(res =>{
        if(res){
          _this.loading = false;
          if(res.rows && res.rows.length){
            _this.list = _this.list.concat(res.rows);
            if (_this.list.length >= res.totalSize) {
              _this.finished = true;
            }else{
              _this.page++;
            }
          }else{
            _this.finished = true;
          }
        }
        
      }).catch(err =>{
        _this.loading = false;
        _this.finished = true;
        _this.list = [];
        if(err && err.message && err.message.indexOf('往来单位ID') == -1){
          Toast.fail(err.message);
        }
      });
    },
    renderStatus(item){
      let str = '';
      let status = item.status;
      let customerPaid = item.customerPaid;
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
    }
  }
}
</script>

<style lang="less" scoped>
.box-container {
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
  .page-body-container {
    height: calc(100vh - 95px);
    overflow-y: auto;
    background: #F8F8F8;
    font-size: 14px;
    line-height: 23px;
  }
  .marginTop{
    margin-top:2px;
  }
  .item-container {
    margin: 8px 12px;
    overflow: auto;
    background: #ffffff;
    border-radius: 8px;
    text-align: left;
    .item_top,.item_bottom{
      padding: 12px;
    }
    .item_flex{
      
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      line-height: 15px;
      .item_w{
        flex:50%;
        margin: 4px 0; 
      }
      .billNo{
        font-size:14px;
        font-weight: 500;
        // height: 20px;
        font-family: PingFangSC-Medium;
        color: #333333;
      }
      .receptionTime{
        height:16px;
        line-height:16px;
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
    .remark_flex{
      display: flex;
      .ellipsis{
        flex:82%;
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
    .foot_flex{
      margin: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .foot_flex_l{
        display: flex;
        align-items: center;
      }
      .foot_label{
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        font-weight: 500;
      }
      .foot_fee{
        font-family: PingFangSC-Medium;
        font-size: 11px;
        color: #E1251B;
        // line-height: 45px;
        font-weight: 500;
        .fee_0{
          font-size: 16px;
        }
      }
      .foot_btn{
        height: 36px;
      }
      /deep/.van-button--normal{
        font-family: PingFangSC-Medium;
        font-size: 15px;
        font-weight: 500;
        color: #FFFFFF;
        text-align: center;
      }
    }
    .label{
      font-size:12px;
      font-family: 'PingFangSC-Regular', 'PingFang SC';
      color: #999999;
      font-weight: 400;
      line-height: 18px;
    }
    .content{
      font-size:13px;
      font-family: 'PingFangSC-Regular', 'PingFang SC';
      color: #333333;
      font-weight: 400;
      line-height: 18px;
    }
    .divider{
      width: 100%;
      height: 1px;
      background: #E6E6E6;
    }
    .documentType{
      font-family: PingFangSC-Medium;
      font-size:14px;
      margin-left: auto;
      color: #FF6E4C;
      font-weight: 500;
      line-height: 20px;
      .dotType{
        width: 6px;
        height: 6px;
        line-height: 20px;
        display: inline-block;
        background: #FF6E4C;
        border: 1px solid #FFFFFF;
        border-radius: 50%;
      }
    }
  }
  .item-title {
    position: relative;
    padding-left: 10px;
    font-size: 18px;
    font-weight: 500;
    &::before {
      content: '';
      position: absolute;
      display: inline-block;
      left: 0;
      bottom: 2px;
      height: 18px;
      width: 4px;
      background: #1989fa;
    }
  }
  // 筛选弹出样式
  .filter-pop {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .filter_box{
      width: 100%;
      height: 93%;
      margin-bottom: 50px;
      overflow: auto;
      padding:20px 16px 0;
      box-sizing: border-box;
      .filter-group{
        margin-bottom: 20px;
        .label{
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          line-height: 22px;
          font-weight: 500;
          text-align: left;
        }
        .content{
          display: flex;
          flex-direction: column;
          width: 100%;
          .button {
            margin:6px 0;
            width:52%;
            height: 24px;
            font-size: 13px;
            background: #F4F4F4;
            border: none;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            /deep/.van-button__text{
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .button.active {
            background-image: linear-gradient(224deg, #FFB12D 0%, #FF6E4C 100%);
            color: #fff;
          }
          .toShopDate{
            width: 100%;
            font-size: 14px;
            margin:6px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #F4F4F4;
            height: 36px;
            border-radius: 20px;
            padding: 8px 16px;
            box-sizing: border-box;
            .time{
              color: #777b87;
              width: 30%;
              
              display: inline-block;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #999999;
              letter-spacing: 0;
              font-weight: 400;
            }
          }
        }
        .content_type{
          display: flex;
          justify-content: flex-start;
          width: 100%;
          align-items: center;
          flex-wrap: wrap;
        }
        .button {
          margin:6px 0;
          height: 24px;
          font-size: 13px;
          background: #F4F4F4;
          border: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          /deep/.van-button__text{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .button.active {
          background-image: linear-gradient(224deg, #FFB12D 0%, #FF6E4C 100%);
          color: #fff;
        }
        .btn_w{
          flex:30%;
        }
        .none-content {
          font-size: 14px;
          margin: 0;
        }
      }
    }
    
    .operation {
      height: 50px;
      width: 100%;
      background: #f2f2f2;
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .reset {
        background: #fff;
        border: 0.02667rem solid #ccced4;
        color: #777b87;
        border-radius: 6px;
        width: 100px;
        height: 40px;
        line-height: 40px;
      }
      .confirm {
        background-color: #00a8ea;
        color: #fff;
        border-radius: 6px;
        width: 100px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
  /deep/.van-field__control::-webkit-input-placeholder{
    color:#999999;
    font-size:14px;
    font-weight:400;
  }
  /deep/.van-field__control::-moz-placeholder{/* Mozilla Firefox 19+ */
    color:#999999;
    font-size:14px;
    font-weight:400;
  }
  /deep/.van-field__control:-ms-input-placeholder{ /* Internet Explorer 10-11 */
    color:#999999;
    font-size:14px;
    font-weight:400;
  }
  // /deep/.van-search{
  //   background: #f8f8f8;
  // }
  // /deep/.van-search__content{
  //   overflow: hidden;
  //   background:#fff;
  // }
  // /deep/.van-search .van-cell,
  // /deep/.van-field__control{
  //   background:#fff;
  // }
}

</style>