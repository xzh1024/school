<template>
  <div class="bid_manage">
    <!-- 报价管理--Vue -->
    <div class="bid_search">
      <Search 
        style="width:652px;"
        @onSearchFn="searchFn" 
        @onResetFn="resetFn"
        @onMoreSeacrh="moreSeacrhFn" 
        :placeholder="placeholder"/>
    </div>
    <el-row class="more_search_box" v-if="moreSearch">
      <el-col  class="search_item_4">
        <div class="search_item">
          <span class="label">提交时间：</span>
          <el-date-picker
            class="search_item_cont"
            v-model="applyTime"
            type="daterange"  unlink-panels
            range-separator="至" size="small"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00']"
            @change="changeTime">
          </el-date-picker>
        </div>
      </el-col>
     
      <el-col class="search_item_4">
        <div class="search_item">
          <span class="label">状态：</span>
          <el-select 
            v-model="searchObj.status" 
            size="small"
            placeholder="请选择状态" 
            style="width: 180px">
              <el-option
                  v-for="(item,index) in statuslist"
                  :key="index"
                  :label="item.value"
                  :value="item.key"
              ></el-option>
          </el-select>
          
        </div>
      </el-col>
    </el-row>

    <el-table :data="tableData" border stripe
      size="small" class="xtable"
      tooltip-effect="dark" height="500px"
      ref="xTable" style="width: 100%;margin:10px 0;">
      <el-table-column
        label="状态"
        align="center"
        prop="status"
        min-width="300">
        <template slot-scope="scope">
          <div>
            <span :class="{'table-span-tag':true,
                  'tag-red':scope.row.status==0,
                  'tag-orange':scope.row.status==1,
                  'tag-green':scope.row.status==3||scope.row.status==2,
                  'tag-grey': scope.row.status==4||scope.row.status==5 || scope.row.status==6}">
              {{scope.row.statusName}}
            </span>
            <span
                class="table-span-time"
                v-if="scope.row.status==0||scope.row.status==1"
            >剩余时间 {{scope.row.remainTimeStr}}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="单据号"
        prop="wantCode"
        align="center"
        min-width="300">
        <template slot-scope="scope">
          <div >
            <p >{{scope.row.wantCode}}</p>
            <p
                v-if="scope.row.want.reportNumber"
            >报案号：{{scope.row.want.reportNumber}}</p>
            <p
                v-if="scope.row.want.licenseNumber"
            >车牌号：{{scope.row.want.licenseNumber}}</p>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="询报价人"
        prop="want"
        min-width="300">
        <template slot-scope="scope">
          <div class="flex_column_box">
            <span >
                <span class="xunjia"></span>
                <span class="xunjia-info">{{scope.row.want.companyName}}</span>
                <span
                    class="company-type"
                    :class="{'factory':scope.row.want.companyType=='汽修厂',
                    'dealer':scope.row.want.companyType=='经销商',
                    'producer':scope.row.want.companyType=='生产厂家',
                    'insurance':scope.row.want.companyType=='保险公司'}"
                ></span>
            </span>
            <span class="table-span-normal">
              {{scope.row.want.name}}
              <span
                  class="icon-phone"
              >{{scope.row.want.phone}}</span>
              <!-- <a
                  href="javascript:;"
                  :data-id="scope.row.want.userId"
                  class="infomation chats-icon"
              ></a> -->
            </span>
            <span
                class="table-span-normal"
            >询价时间：{{(scope.row.want&&scope.row.want.publishTime)?scope.row.want.publishTime.split(".")[0].split("T").join(" "):''}}</span>
            <span class="table-span-normal" v-if="scope.row.userId">
                <span class="xunjia baojia"></span>
                <span class="xunjia-info">{{scope.row.name}}</span>
                <span class="icon-phone">{{scope.row.phone}}</span>
            </span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="车辆信息"
        prop="want"
        min-width="300">
        <template slot-scope="scope">
          <div class="flex_column_box">
            <span>{{scope.row.want.factoryBrand}} {{scope.row.want.series}} {{scope.row.want.year}} {{scope.row.want.displacement}} {{scope.row.want.gearbox}}</span>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column
        align="center"
        label="询价内容"
        prop="imgUrl"
        min-width="300">
        <template slot-scope="scope">
          <div class="flex_column_box">
            <span
                class="table-span-normal-partInfo break-2"
                :title="scope.row.want.partInfo"
            >{{scope.row.want.partInfo}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="160">
        <template slot-scope="scope">
          <el-button size="small" class="cao_btn"
            v-show="scope.row.status==0"
            @click="toQuote(scope.row.wantCode)">马上报价</el-button>
          <el-button size="small" class="cao_btn"
            v-show="scope.row.status==1  && scope.row.canOperate"
            @click="toQuote(scope.row.wantCode)">继续报价</el-button>
          <el-button size="small" class="cao_btn"
            v-show="scope.row.status==0 || scope.row.status==1  && scope.row.canOperate"
            @click="stopQuote(scope.row.wantCode)">终止报价</el-button>
          <el-button size="small" class="cao_btn"
            v-show="scope.row.status==2||scope.row.status==3||scope.row.status==4"
            @click="ShowEnquire(scope.row.wantCode)">查看报价</el-button>
          <el-button size="small" class="cao_btn"
            v-show="scope.row.status==5||scope.row.status==6"
            @click="showReason(scope.row.statusRemarks)">查看原因</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination 
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, prev, pager, next, jumper, sizes"
        :total="pageInfo.totalSize">
      </el-pagination>
    </div>
    
    <QuoteListCtrl ref='quoteListDrawer' @refresh="refreshFn"/>
  </div>
</template>

<script>
import { BidService } from './services'
const bidService = new BidService();

import Search from '@/components/search/SearchCom'
import QuoteListCtrl from './components/quoteListCtrl'
export default {
  name:'bidManage',
  components:{
    Search,
    QuoteListCtrl
  },
  data(){
    return{
      placeholder:"询价人公司、询价人姓名、询价单号、车型品牌",
      moreSearch:false,//更多筛选
      applyTime:[],//申请时间
      searchObj:{
        keyword:'',//关键字
        status:'',//状态
      },
      statuslist:[
        { key: "", value: "全部" },
        {
          key: 0,
          value: "待报价"
        },
        {
          key: 1,
          value: "报价中"
        },
        {
          key: 2,
          value: "已报价"
        },
        {
          key: 3,
          value: "已结束"
        },
        {
          key: 4,
          value: "已过期"
        },
        {
          key: 5,
          value: "已终止"
        },
        {
          key: 6,
          value: "已作废"
        }
      ],
      maxHeight:'712',
      tableData:[
        // {
        //   canOperate: true,
        //   name: "陈军",
        //   phone: "18669850007",
        //   status: 4,
        //   statusName: "已终止",
        //   statusRemarks: "",
        //   userId: 84,
        //   want: {
        //     brandsScope: ["一汽奥迪"],
        //     companyName: "张文静的分公司一一",
        //     companyType: "汽修厂",
        //     createdBy: 6134,
        //     displacement: "1.4T",
        //     factoryBrand: "一汽奥迪",
        //     gearbox: "7DSG",
        //     licenseNumber: "456",
        //     name: "中心仓",
        //     partInfo: "机油泵、平衡轴模块及",
        //     phone: "13378116309",
        //     publishTime: "2020-01-02T19:55:55.242245+08:00",
        //     publisher: 3982,
        //     publisherType: 1,
        //     reportNumber: "123",
        //     series: "A3",
        //     status: 3,
        //     thirdContacts: "",
        //     thirdExpireTime: null,
        //     thirdName: "",
        //     thirdPhone: "",
        //     userId: 6134,
        //     vehBrand: "奥迪",
        //     vin: "11111111111111111",
        //     wantType: 0,
        //     year: "2019"
        //   },
        //   wantCode: "XJ202001021955590017",
        // }
      ],
      pageInfo:{
        page: 1,
        totalSize:10,
        pageSize:20
      },
      timer:{}
    }
  },
  mounted(){
    this.initData();
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods:{
    refreshFn(){
      this.initData();
    },
    initData(){
      let obj = {...this.searchObj};
      let params = {
        ...obj,
        ...this.pageInfo
      }
      this.tableData = [];
      bidService
        .getBidTableList(params)
        .then(res => {
          if(res){
            this.tableData = res.rows?res.rows:[];
            for(let k of this.tableData){
              let remainTimeStr = '';
              if(k.status == 0 || k.status == 1){
                let expire = k.want.expire;
                this.timer = setInterval(()=>{
                  remainTimeStr = this.countTime(expire);
                  this.$set(k,'remainTimeStr',remainTimeStr);
                  expire--;
                },1000);
              }
            }
            this.pageInfo.totalSize = res.totalSize;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    countTime(expire) {
      let remainTimeStr = '';
      let t = expire;
      if (t > 0) {
        let day = Math.floor(t / 86400);
        let hour = Math.floor((t / 3600) % 24);
        let min = Math.floor((t / 60) % 60);
        let sec = Math.floor(t % 60);
        day = day < 10 ? "0" + day : day;
        hour = hour < 10 ? "0" + hour : hour;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        let format = "";
        format = `${day}天${hour}：${min}：${sec}`;
        remainTimeStr = format;
      } else {
        // 进行判断 如果数据内所有的倒计时已经结束，那么结束定时器， 如果没有那么继续执行定时器
        let flag = expire <= 0;
        if (flag) {
          clearInterval(this.timer);
        }
        remainTimeStr = `00：00：00`; // 结束文案
      }
      return remainTimeStr;
    },
    changeTime(time){
      if(time){
        this.searchObj.publishStart = this.$dayjs(time[0]).format('YYYY-MM-DD');
        this.searchObj.publishEnd = this.$dayjs(time[1]).format('YYYY-MM-DD');
      }else{
        this.searchObj.publishStart = "";
        this.searchObj.publishEnd = "";
      }
      
    },
    searchFn(data){
      this.searchObj.keyword = data;
      this.pageInfo.page = 1;
      this.initData();
    },
    resetFn(){//重置
      this.searchObj = {
        keyword:""
      }
      this.applyTime = [];
    },
    moreSeacrhFn(data){
      if(data){
        this.maxHeight = '650';
      }else{
        this.maxHeight = '712';
      }
      this.moreSearch = data;
      let keyword = this.searchObj.keyword;
      this.searchObj = {
        keyword:keyword
      }
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.pageInfo.page = 1;
      this.initData();
    },
    handleCurrentChange(val) {
      this.pageInfo.page = val;
      this.initData();
    },
    
    showReason(reason) {//查看原因
      if(!reason){
        reason = '暂无记录'
      }
      this.$alert(reason, "终止原因", {
        confirmButtonText: "确定"
      });
    },
    ShowEnquire(wantCode) {//查看报价
      localStorage.setItem("wantCode", wantCode);
      // this.$refs.quoteListDrawer.show();
      window.resetSetItem("quoteList", true, "notList");
    },
    toQuote(wantCode) {//马上报价 继续报价
      localStorage.setItem("wantCode", wantCode);
      window.resetSetItem("quoteList", true, "fromList");
    },
    stopQuote(code) {//终止报价
      let _this = this;
      _this.$prompt("终止原因", "终止报价", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "textarea"
      }).then(({ value }) => {

        let params = {
          type: -1,
          wantCode: code,
          statusRemarks: value
        }

        bidService
          .stopQuote(params)
          .then(res => {
            // if (res.data.code == "ok") {
              _this.$message({
                type: "success",
                message: "终止成功!"
              });
            // } else {
            //   _this.$alert(res.data.message, "提示", {
            //     confirmButtonText: "确定"
            //   });
            // }
            _this.initData();
          }).catch(err => {
            console.log(err);
          });
          
      }).catch(() => {});
    }
  }
}
</script>

<style lang="less" scoped>
.bid_manage{
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  padding:0 @padding-size-main;
  .bid_search{
    margin-top:@margin-size-secondary;
  }
  .more_search_box{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    /deep/.el-col{
      margin:4px 0;
    }
    .search_item_4{
      width:300px;
    }
    .search_item{
      .label{
        width: 70px;
        margin-right: 4px;
        display: inline-block;
      }
      .search_item_cont{
        width:204px;
      }
    }
  }
  /deep/.el-date-editor .el-range-input {
    width:50%;
  }
  .xtable{
    flex:1;
  }
  .table-span-tag {
    display: block;
    padding: 5px 20px 2px 8px;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0;
    line-height: 20px;
    position: absolute;
    top: 20px;
    left: 20px;
    text-align: left;
  }
  .tag-red {
    background: url("../../../assets/img/inquiry/tag-red.png") no-repeat;
    background-size: 100% 100%;
    background-position: center;
  }
  .tag-orange {
    background: url("../../../assets/img/inquiry/tag-orange.png") no-repeat;
    background-size: 100% 100%;
  }
  .tag-green {
    background: url("../../../assets/img/inquiry/tag-green.png") no-repeat;
    background-size: 100% 100%;
  }
  .tag-grey {
    background: url("../../../assets/img/inquiry/tag-grey.png") no-repeat;
    background-size: 100% 100%;
  }
  .factory {
    background-image: url("../../../assets/img/inquiry/tag-qixiu.png");
  }
  .dealer {
    background-image: url("../../../assets/img/inquiry/tag-jingxiao.png");
  }
  .producer {
    background-image: url("../../../assets/img/inquiry/tag-shengchanchangshang.png");
  }
  .insurance {
    background-image: url("../../../assets/img/inquiry/tag-insurance.png");
  }

  .xunjia {
    float: left;
    width: 20px;
    height: 20px;
    background-image: url("../../../assets/img/inquiry/icon-xun.png");
    background-size: 100% 100%;
  }
  .xunjia-info {
    float: left;
    margin: 0 4px;
    line-height: 21px;
  }
  .company-type {
    display: inline-block;
    width: 40px;
    height: 20px;
    background-size: 100% 100%;
  }
  .flex_column_box{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .icon-phone {
    margin-top: 10px;
  }
  .icon-phone::before {
    content: "";
    background: url("../../../assets/img/inquiry/icon-phone.png") no-repeat;
    display: inline-block;
    width: 18px;
    height: 18px;
    background-size: 18px 18px;
    margin-right: 4px;
    position: relative;
    top: 3px;
  }
  .table-span-time {
    display: block;
    font-size: 12px;
    color: #1a2231;
    letter-spacing: -0.29px;
    margin-top: 35px;
    text-align: left;
  }
  .table-span-time::before {
    content: "";
    background: url("../../../assets/img/inquiry/icon-shizhong.png") no-repeat;
    display: inline-block;
    width: 12px;
    height: 12px;
    background-size: 12px 12px;
    margin-right: 4px;
  }
  .baojia {
    background-image: url("../../../assets/img/inquiry/icon-baojia.png");
  }
  .infomation {
    display: inline-block;
    width: 18px;
    height: 18px;
    background-image: url("../../../assets/img/inquiry/icon-talk.png");
    background-size: 100% 100%;
    &.isPxt {
      background-image: url("../../../assets/img/inquiry/icon-talk-pxt.png");
    }
    &.isZply {
      background-image: url("../../../assets/img/inquiry/icon-talk.png");
    }
    &.isSrgo {
      background-image: url("../../../assets/img/inquiry/icon-talk.png");
    }
    position: relative;
    top: 3px;
    margin-left: 5px;
  }
  .break-2{
    width: 100%;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .cao_btn{
    margin-top: 10px;
    margin-left: 10px;
  }
  .pagination{
    text-align: right;
    width: 99.7%;
  }
}
</style>