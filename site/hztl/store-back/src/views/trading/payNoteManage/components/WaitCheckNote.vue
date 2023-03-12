<template>
  <div class="wait_check_note">
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
          <span class="label">订单类型：</span>
          <el-select v-model="searchObj.orderTypes" size="small"
          placeholder="订单类型" class="search_item_cont">
              <el-option
                  v-for="(item,index) in orderTypeList"
                  :key="index"
                  :label="item.value"
                  :value="item.key"
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
        label="客户名称"
        align="center"
        prop="companyName"
        min-width="211">
        <template slot-scope="scope">
          <span>{{renderCurstomeName(scope.row)}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="订单号"
        prop="orderCode"
        align="center"
        min-width="211">
      </el-table-column>

      <el-table-column
        align="center"
        label="支付类型"
        prop="typeCN"
        min-width="211">
      </el-table-column>

      <el-table-column
        align="center"
        label="订单类型"
        prop="orderTypeCN"
        min-width="211">
      </el-table-column>
      
      <el-table-column
        align="center"
        label="支付金额（元）"
        prop="totalAmount"
        min-width="211">
      </el-table-column>

      <el-table-column
        align="center"
        label="提交时间"
        prop="createdAt"
        min-width="211">
        <template slot-scope="scope">
          <span>{{scope.row.createdAt.split(".")[0].split("T").join(" ")}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="备注"
        show-overflow-tooltip
        prop="remarks"
        min-width="211">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="160">
        <template slot-scope="scope">
          <!-- <span v-if="scope.row.type=='financial' || scope.row.type=='credit'" @click="throughFn(scope.row,scope.$index)" 
            class="text_btn ">通过</span> -->
          <span @click="throughFn(scope.row,scope.$index)" 
            class="text_btn ">通过</span>
          <span @click="refusedFn(scope.row,scope.$index)" 
            class="text_btn text_danger_btn">拒绝</span>
        </template>
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
    <!-- 通过 -->
    <el-dialog title="支付审核-通过" :visible.sync="throughDialog" 
      :close-on-click-modal="false" @close="closedFn('orderObj')" width="500px">
      <div>
        <div class="primaryColor">
          <span class="order_label">订单号：</span>
          <span>{{orderObj.orderCode}}</span>
        </div>
        <div class="order_item">
          <span class="order_label">支付金额：</span>
          <span>¥{{orderObj.totalAmount}}</span>
        </div>
        <div class="order_item">
          <span class="order_label">提交时间：</span>
          <span>{{orderObj.createdAt?(orderObj.createdAt.split(".")[0].split("T").join(" ")):''}}</span>
        </div>
        <el-form :model="orderObj" :rules="rules" ref="orderObj" label-width="110px" class="demo-ruleForm">
          <el-form-item label="付款流水号" prop="transSerial">
            <el-input v-model="orderObj.transSerial" 
            style="width:224px;" size="small"
              placeholder="请输入客户等付款流水号"></el-input>
          </el-form-item>
          <el-form-item label="审核备注" prop="remark">
            <el-input type="textarea" placeholder="请输入文字" style="width:224px;"
              v-model="orderObj.remark"></el-input>
          </el-form-item>
          
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closedFn('orderObj')" >取 消</el-button>
        <el-button size="small" type="primary" @click="onThroughSure('orderObj')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 拒绝 -->
    <el-dialog  :visible.sync="refusedDialog" :show-close="false"
      :close-on-click-modal="false"  width="28%">
      <div slot="title" class="dialog-title refused_title" >
        <i class="el-icon-warning" style="color:#E6A23C;font-size:24px"></i>
        <span style="margin-left:16px;">确认要拒绝吗？</span>
      </div>
      <div >
        <span>您确定要拒绝【{{renderCurstomeName(refusedObj)}}】订单号为
          “<span class="primaryColor">{{refusedObj.orderCode}}</span>”的支付单吗？
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="refusedDialog = false" >取 消</el-button>
        <el-button size="small" type="primary" @click="onRefusedSure">确 定</el-button>
      </div>
    </el-dialog>   
  </div>
</template>

<script>
import Search from '@/components/search/SearchCom'

import { PayNoteManageApi } from '../services'
const payNoteManageApi = new PayNoteManageApi();
export default {
  name:"WaitCheckNote",
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
        orderTypes:'',//订单类型
      },
      orderTypeList:[
        // { key: "", value: "全部" },
        { key: 1,value: "配件购买" },
        { key: 2,value: "会员服务购买" },
        { key: 3,value: "余额充值" },
        { key: 4,value: "返利" },
        { key: 5,value: "返佣" },
        { key: 6,value: "提现" },
        { key: 7,value: "转账" },
        { key: 8,value: "配件到货支付" },
        { key: 9,value: "erp对账单支付" },
      ],
      tableData:[],
      maxHeight:'712',
      pageInfo:{
        page: 1,
        totalSize:0,
        pageSize:20
      },
      throughDialog:false,
      orderObj:{},
      rules:{
        transSerial: [
          { required: true, message: '请输入客户等付款流水号', trigger: 'blur' },
        ],
      },
      refusedDialog:false,
      refusedObj:{}
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
        statuses:1,
        type:"financial",
        ...obj,
        ...this.pageInfo
      }
      payNoteManageApi
        .getPayNoteTableList(params)
        .then(res => {
          this.tableData = res.rows;
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
        keyword:""
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
    throughFn(row){
      this.orderObj = row;
      this.throughDialog = true;
    },
    closedFn(formName){
      this.throughDialog = false;
      this.$refs[formName].resetFields();
      this.orderObj = {};
    },
    onThroughSure(formName){//通过确认
      let _this = this; 
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            payType:this.orderObj.type,
            obj:{
              orderCode:this.orderObj.orderCode,
              orderId:this.orderObj.orderId,
              transCode:this.orderObj.transSerial,
              remark:this.orderObj.remark,
              confirm:true,
            }
          };
          payNoteManageApi.throughCheck(params)
          .then(res => {
            _this.throughDialog = false;
            _this.$message.success("通过成功");
            _this.initData();
          })
          .catch(err => {
            if(err && err.message) {
              this.$message.error(err.message);
            }
          });
          
        } else {
          return false;
        }
      });
      
    },
    refusedFn(row){
      this.refusedDialog = true;
      this.refusedObj = row;
    },
    onRefusedSure(){//确认拒绝
      // let params = this.refusedObj;
      let _this = this;
      let params = {
        orderId:this.refusedObj.orderId,
        orderCode:this.refusedObj.orderCode
      };
      payNoteManageApi.refusedCheck(params)
        .then(res => {
          _this.refusedDialog = false;
          _this.$message.success("拒绝成功");
          _this.initData();
        })
        .catch(err => {
          if(err && err.message) {
            this.$message.error(err.message);
          }
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.wait_check_note{
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
  .order_item{
    margin: 8px 0;
  }
  .order_label{
    width:111px;
    text-align: right;
    display: inline-block;
  }
  .refused_title{
    height: 24px;
    line-height: 24px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #333333;
    font-weight: 500;
    display: flex;
    align-items: center;
  }
  /deep/.el-dialog__body {
    padding: 16px 30px 16px 60px ;
  }
}
</style>