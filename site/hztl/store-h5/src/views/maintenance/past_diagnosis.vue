<template>
  <div class="past_diagnosis">
    <van-nav-bar
      title="既往诊断履历"
      left-arrow
      @click-left="backFn"
    />
    <van-search 
      show-action
      v-model="keyword" 
      left-icon=''
      right-icon="search"
      :placeholder="placeholder" 
      shape="round" @search="onSearch">
      <template #action>
        <div @click="openFilter" class="select">筛选</div>
      </template>
    </van-search>
    
    <div class="filter_box flex_r" style="flex-wrap:wrap;">
      <template v-if="plateNumberList">
        <div class="filter_item flex_r"
          v-for="(item,index) in plateNumberList" 
          :key="index">
          <span class="m_r_4 ellipsis more_search">{{`【${item.vehBrand}】${item.plateNumber}`}}</span>
          <i class="iconfont icon-fork_line size_12" @click="delPlate(index)"></i>
        </div>
      </template>
      <div class="filter_item flex_r"
        v-if="shopDate.startTime">
        <span class="m_r_4">{{shopDate.startTime}}</span>
        <span class="m_r_4">至</span>
        <span class="m_r_4">{{shopDate.endTime}}</span>
        <i class="iconfont icon-fork_line size_12" @click="delDate"></i>
      </div>
    </div>
    <div class="page-body-container">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      > 
        <template v-for="(item,index) in list">
          <div class="card" :key="index" @click="toReport(item)">
            <div class="item_box border_btm">
              <div class="flex_r box_row" style="justify-content:space-between;">
                <div class="item_left flex_r">
                  <span class="modal_name">{{item.checkTemplateName}}</span>
                  <!-- <span class="status_flag" v-if="item.statusName">{{item.statusName}}</span> -->
                </div>
                <div class="item_right">共{{item.itemNum}}项</div>
              </div>
              <div class="box_row ellipsis">
                <span>{{item.itemNames?item.itemNames.join(' | '):'-'}}</span>
              </div>
            </div>
            <div class="item_box flex_r" style="justify-content:space-between;">
              <div class="item_left flex_r">
                <img class="logo" :src="item.brandsPhoto?item.brandsPhoto:require('@/assets/maintenance/default-img.png')" alt="photo">
                <span>{{`【${item.vehBrand}】${item.plateNumber}`}}</span>
              </div>
              <span class="item_date">{{renderDate(item.createdAt)}}</span>
            </div>
          </div>
        </template>
      </van-list>
    </div>

    <FilterPopup 
      :plateNumberList="plateNumberList"
      :shopDate="shopDate"
      @onFilter="onFilter" ref='filter' />
  </div>
</template>

<script>
import Vue from "vue";
import FilterPopup from "./components/past_diagnosis/fitler_popup.vue";
import dateFormat from "@/utils/date";
import request from "@/request";
import { NavBar, Button, Popup, List, Toast } from "vant";
Vue.use(NavBar).use(Button).use(Popup).use(List).use(Toast);
export default {
  name:"pastDiagnosis",
  components:{
    FilterPopup
  },
  data(){
    return{
      placeholder:'请输入检测报告名称/项目名称',
      keyword:'',
      // filterObj:{
        plateNumberList:[],
        shopDate:{
          startTime:'',//开始日期
          endTime:'',//结束日期
        },//到店日期
      // },
      
      showFilter:false,
      list:[
        
        // {
        //   "checkTemplateName": "小保养检测", //# 模板名称
        //   "itemNames": [ //# 检测项目
        //     "环车检查","轮胎检查","灯具检查","轮胎检查",
        //   ],
        //   "itemNum": 4, //# 项目数量
        //   "brandsPhoto": require('@/assets/maintenance/银联支付@3x.png'), //# 品牌照片
        //   "vehBrand": "奥迪", //# 品牌
        //   "plateNumber": "川A·23456", //# 车牌号
        //   "createdAt": "2021-01-01T09:30:00Z", //# 创建时间
        // }
      ],
      page: 1,
      pageSize: 20,
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
    toReport(item){//诊断报告
      let obj = {
        path:"/diagnosticReport",
        query:{
          reportId:item.id,
          healthId:item.healthId,
          plateNumbers:JSON.stringify([item.plateNumber]),
          from:'past_diagnosis'
        }
      }
      this.$router.push(obj);
    },
    backFn(){
      if(this.$route.query.from && this.$route.query.from == 'diagnostic_report'){
        this.$router.go(-2);
      }else{
        this.$router.go(-1);
      }
    },
    renderDate(date){
      let str = dateFormat.dateYmd(date,'YYYY年MM月DD日');
      return str;
    },
    onLoad(){
      let _this = this;
      if (this.finished) return;
      this.loading = true;
      let url='/repair-center/check-reports/list';
      let params = {
        orderId: this.$route.query.orderId?this.$route.query.orderId:0,	 //# 工单ID
        reportId: this.$route.query.reportId?this.$route.query.reportId:0,	 //# 报告ID
        plateNumbers: this.plateNumberList.map(item => item.plateNumber),	 //# 车牌号
        startDate: this.shopDate.startTime, //# 开始日期
        endDate: this.shopDate.endTime, //# 结束日期
        key: this.keyword, //# 查询条件
        page: this.page,
        pageSize: this.pageSize,
      }
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
        if(err && err.message && err.message.indexof('往来单位ID') == -1){
          Toast.fail(err.message);
        }
      });
    },
    onSearch(){
      this.finished = false;
      this.page = 1;
      this.list = [];
      this.onLoad();

    },
    openFilter(){
      this.$refs.filter.show();
    },
    onFilter(data){
      this.plateNumberList = data.plateNumberList;
      this.shopDate = data.shopDate;
      this.$refs.filter.close();
      this.onSearch();
    },
    delPlate(index){//删除车辆搜索
      this.plateNumberList.splice(index,1);
      this.onSearch();
    },
    delDate(){//删除日期搜索
      this.shopDate.startTime = '';
      this.shopDate.endTime = '';
      this.onSearch();
    },
  }
}
</script>

<style lang="less" scoped>
.past_diagnosis{
  height:100vh;
  background: #f8f8f8;
  /deep/.van-nav-bar .van-icon {
    color: #333;
  }
  /deep/.van-nav-bar__title{
    font-size: 16px;
    font-weight: 500;
    color:#333;
  }
  /deep/.van-nav-bar__content{
    height:44px;
  }
  /deep/.van-search{
    background: #f8f8f8;
  }
  /deep/.van-search__content{
    overflow: hidden;
    background:#fff;
  }
  /deep/.van-search .van-cell,
  /deep/.van-field__control{
    background:#fff;
  }
  .select{
    font-size: 13px;
    font-family: PingFangSC-Regular;
    color: #FF6E4C;
  }
  .more_search{
    width: 132px;
  }
  .ellipsis{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .filter_box{
    max-height: 57px;
    overflow: scroll;
    margin: 0 12px 0;
    color: #666666;
    font-size: 12px;
    font-weight: 400;
    .filter_item{
      background: #E6E6E6;
      border-radius: 2px;
      padding: 2px 4px;
      margin:0  8px 8px 0; 
    }
  }
  .size_12{
    font-size: 12px;
  }
  .m_r_4{
    margin-right:4px;
  }
  .flex_r{
    display: flex;
    align-items: center;
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
  img[src=""], img:not([src]) {
    opacity: 0.8;
  }
  .page-body-container {
    height: calc(100vh - 155px);
    overflow-y: auto;
    background-color: #F8F8F8;
    font-size: 13px;
    text-align: left;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    .card{
      margin: 8px 12px;
      border-radius: 8px;
      background-color: #ffffff;
      color:#333333;
      &:first-child{
        margin-top: 0;
      }
      .item_box{
        padding:12px;
        font-size: 13px;
        .box_row{
          margin-bottom: 4px;
          &:last-child{
            margin-bottom: 0;
          }
        }
        .item_left{
          .modal_name{
            height: 20px;
            font-family: PingFangSC-Medium;
            font-size: 14px;
            font-weight: 500;
            margin-right: 8px;
          }
          .status_flag{
            background: #FFEEEE;
            border: 1px solid #FC1414;
            border-radius: 4px;
            padding: 0 12px;
            height: 15px;
            font-size: 11px;
            color: #FC1414;
            text-align: center;
          }
          .logo{
            width: 32px;
            height: 32px;
            border-radius: 4px;
            margin-right: 12px;
          }
        }
        .item_right{
          height: 18px;
          font-size: 13px;
        }
        .item_date{
          color: #999999;
        }
      }
      .border_btm{
        border-bottom: 1px solid  #E6E6E6;
      }
    }
  }
}
</style>