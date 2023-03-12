<template>
  <div class="all_pay_note">
    <Search 
        style="width:652px;"
        @onSearchFn="searchFn" 
        @onResetFn="resetFn"
        @onMoreSeacrh="moreSeacrhFn" 
        :placeholder="placeholder"/>

    <el-row class="more_search_box" v-if="moreSearch">
      <el-col class="search_item_4">
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
          <span class="label">支付类型：</span>
          <el-select 
            v-model="searchObj.type" 
            size="small"
            placeholder="支付类型" 
            class="search_item_cont"
            clearable>
              <el-option
                  v-for="(item,index) in payTypeList"
                  :key="index"
                  :label="item.value"
                  :value="item.key"
              ></el-option>
          </el-select>
          
        </div>
      </el-col>
      <el-col class="search_item_4">
        <div class="search_item">
          <span class="label">订单类型：</span>
          <el-select v-model="searchObj.orderTypes" size="small"
          placeholder="订单类型" class="search_item_cont" clearable>
              <el-option
                  v-for="(item,index) in orderTypeList"
                  :key="index"
                  :label="item.value"
                  :value="item.key"
              ></el-option>
          </el-select>
          
        </div>
      </el-col>
      <el-col class="search_item_4">
        <div class="search_item">
          <span class="label">审核方式：</span>
          <el-select
            v-model="searchObj.autoConfirm"
            size="small"
            placeholder="审核方式"
            class="search_item_cont"
            clearable
          >
            <el-option
              v-for="(item, index) in autoConfirmList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

    <el-table :data="tableData" border  stripe
      class="xtable" size="small"
      tooltip-effect="dark" height="500px"
      ref="xTable" style="width: 100%;margin:10px 0;">
       
      <el-table-column
        label="业务单号"
        prop="orderCode"
        align="center"
        min-width="188">
      </el-table-column>

      <el-table-column
        align="center"
        label="支付类型"
        prop="typeCN"
        min-width="188">
      </el-table-column>

      <el-table-column
        align="center"
        label="审核方式"
        prop="autoConfirmOffline"
        min-width="188">
      </el-table-column>

      <el-table-column
        align="center"
        label="业务类型"
        prop="orderTypeCN"
        min-width="188">
      </el-table-column>

      <el-table-column
        align="center"
        label="商品类型"
        prop="prdName"
        min-width="188">
      </el-table-column>

      <el-table-column
        label="客户名称"
        align="center"
        prop="companyName"
        min-width="188">
        <template slot-scope="scope">
          <span>{{renderCurstomeName(scope.row)}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="支付金额（元）"
        prop="totalAmount"
        min-width="188">
      </el-table-column>

      <el-table-column
        align="center"
        label="付款流水号"
        prop="transSerial"
        min-width="188">
      </el-table-column>

      <el-table-column
        align="center"
        label="支付时间"
        prop="completeTime"
        min-width="188">
        <template slot-scope="scope">
          <span>{{scope.row.completeTime.split(".")[0].split("T").join(" ")}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="备注"
        show-overflow-tooltip
        prop="remarks"
        min-width="188">
      </el-table-column>

    </el-table>

    <el-pagination style="text-align:right;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageInfo.pageSize"
      layout="total, prev, pager, next, jumper, sizes"
      :total="pageInfo.totalSize">
    </el-pagination>

  </div>
</template>

<script>
import Search from '@/components/search/SearchCom'

import { PayNoteManageApi } from '../services'
const payNoteManageApi = new PayNoteManageApi();
export default {
  name:"AllPayNote",
  components:{
    Search
  },
  data(){
    return{
      placeholder:"客户名称/订单号等字段",
      moreSearch:false,
      applyTime:[],//申请时间
      searchObj:{
        keyword:'',//关键字
        type:'',//支付类型
        orderTypes:'',//订单类型 
        autoConfirm: "" // 审核方式
      },
      
      payTypeList:[
        { key: "eqiming",value: "银联支付" },
        { key: "pingpp",value: "PING++" },
        { key: "financial",value: "线下支付" },
        { key: "balance",value: "余额支付" },
        { key: "credit",value: "赊销" },
        // { key: "weixin-jsapi",value: "微信JSAPI支付" }
      ],
      orderTypeList:[
        { key: 1,value: "配件购买" },
        { key: 2,value: "会员服务购买" },
        { key: 3,value: "余额充值" },
        { key: 4,value: "返利" },
        { key: 5,value: "返佣" },
        { key: 6,value: "提现" },
        { key: 7,value: "转账" },
        { key: 8,value: "配件到货支付" },
        // { key: 9,value: "erp对账单支付" }
      ],
      autoConfirmList: [
        { id: true, name: "自动审核" },
        { id: false, name: "手动审核" }
      ],
      tableData:[],
      maxHeight:'712',
      pageInfo:{
        page: 1,
        totalSize:0,
        pageSize:20
      },
    }
  },
  mounted(){
    this.initData();
  },
  methods:{
    renderCurstomeName(row){
      if(row.companyName){
        return row.companyName + '-' + row.companyContacts +'('+ row.companyPhone +')';
      }else{
        return row.userName + '-' + row.companyContacts +'('+ row.userPhone +')';
      }
    },
    initData(){
      let obj = {...this.searchObj};
      
      let params = {
        statuses:2,
        // type:"financial",
        ...obj,
        ...this.pageInfo
      }
      this.tableData = [];
      payNoteManageApi
        .getPayNoteTableList(params)
        .then(res => {
          this.tableData = res.rows;
          // let tableData = res.rows;
          // tableData.forEach(element => {
          //   if(element.status != -2){
          //     this.tableData.push(element);
          //   }
          // });
          this.pageInfo.totalSize = res.totalSize;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeTime(time){
      if(time){
        this.searchObj.startTime = this.$dayjs(time[0]).format('YYYY-MM-DD');
        this.searchObj.endTime = this.$dayjs(time[1]).format('YYYY-MM-DD');
      }else{
        this.searchObj.startTime = "";
        this.searchObj.endTime = "";
      }
    },
    searchFn(data){
      this.searchObj.keyword = data;
      this.pageInfo.page = 1;
      this.initData();
    },
    resetFn(){//重置
      this.searchObj = {
        keyword:"",
      }
      this.applyTime = [];
      this.initData();
    },
    moreSeacrhFn(data){
      if(data){
        this.maxHeight = '650';
      }else{
        this.maxHeight = '712';
      }
      this.moreSearch = data;
      // let keyword = this.searchObj.keyword;
      // this.searchObj = {
      //   keyword:keyword
      // }
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
  }
}
</script>

<style lang="scss" scoped>
.all_pay_note{
  height:100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  /deep/.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 180px;
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
}
</style>