<template>
  <div id="promoter_details" :class="$store.state.paddingLeft">
    

    <div class="detail_contain">
      
      <div class="promoter_search">
        
        <div class="margin_right">
          <span class="label">订单</span>
          <el-input v-model="searchObj.order" class="content" 
          size="small" placeholder="订单号">
          </el-input>
        </div>

        <div class="margin_right"> 
          <span>推广员</span>
          <el-select v-model="searchObj.promoter" size="small" class="content" filterable remote placeholder="推广员姓名或手机号">
            <el-option
              v-for="item in promoterList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="margin_right"> 
          <span>推广员状态</span>
          <el-select v-model="searchObj.promoterStatus" size="small" class="content" filterable remote placeholder="推广员状态">
            <el-option
              v-for="item in promoterStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="margin_right"> 
          <span>佣金发放时间</span>
          <el-date-picker style="width:340px;"
            v-model="commissionTime"
            type="datetimerange"  unlink-panels
            range-separator="至" size="small"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00']"
            @change="changeTime">
          </el-date-picker>
        </div>
        <div class="margin_right" style="margin-left:14px;">
          <el-select v-model="searchObj.statusType" @change="stTypeChange" style="width: 100px;"
           size="small" class="type_1" filterable remote placeholder="状态类型">
            <el-option
              v-for="item in statusTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="searchObj.statusValue" size="small" class="status_1" style="margin-left:-5px;border:none"
          filterable remote placeholder="状态值">
            <el-option
              v-for="item in statusValueData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="margin_right">
          <span class="label">客户</span>
          <el-select v-model="searchObj.customer" class="content"
            size="small" filterable remote placeholder="客户姓名或手机号">
            <el-option
              v-for="item in customerList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        
        
        <!-- <div class="margin_right"> 
          <span>申请时间</span>
          <el-date-picker 
            v-model="applyTime"
            type="datetimerange"  unlink-panels
            range-separator="至" size="small"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00']"
            @change="changeTime">
          </el-date-picker>
        </div> -->
        <div class="margin_right">
          <el-button type="primary" size="small" style="margin-left: 10px;" @click="searchFn">查询</el-button>
          <el-button type="info" size="small" @click="resetFn">重置</el-button>
        </div>
        
      </div>
      <div class="row_box">
        <div >
          <!-- <el-button type="primary" size="small" 
            @click="addPromoterFn">添加推广员</el-button>
          <el-button type="primary" size="small" plain
          @click="importFn">导入</el-button>
          <el-button type="text" @click="downloadFn">下载模板</el-button> -->
          <el-button type="primary" size="small" plain
          @click="exportFn">导出</el-button>
        </div>
        <div class="desc">
          <span>合计 &nbsp; 单据数：50</span>
          <span>推广商品成交金额：9000.00</span>
          <span>预估佣金：600.00</span>
          <span>实际佣金：600.00</span>
        </div>
      </div>

      <el-table ref="multipleTable"  
        @selection-change="handleSelectionChange"
        :data="tableData" border  tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" fixed align='center' width="55"></el-table-column>
        <el-table-column prop="order" label="订单号" align='center' width="200">
          <template slot-scope="scope">
            <span style="color:#6589F8">{{scope.row.order + '（' + (scope.row.orderStatus == 1 ? '已完成' : '待收货') + '）'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="订单创建时间" align='center' width="170"></el-table-column>
        <el-table-column prop="finishTime" label="订单完成时间" align='center' width="170"></el-table-column>
        <el-table-column  prop="inviter" label="客户" align='center' width="220">
          <template slot-scope="scope">
            {{scope.row.inviterTel?(scope.row.inviter+'（'+ scope.row.inviterTel +'）'):scope.row.inviter}}
          </template>
        </el-table-column>
        <el-table-column  prop="invitedNum" label="推广类型" align='center' width="150"></el-table-column>
        <el-table-column  prop="customersNum" label="推广商品成交金额" align='center' width="150"></el-table-column>
        <el-table-column  prop="clinchFunds" label="推广员" align='center' width="150"></el-table-column>
        <el-table-column  prop="commissionTotal" label="推广员状态" align='center' width="150"></el-table-column>
        <el-table-column  prop="commissionTotal" label="预估佣金" align='center' width="150"></el-table-column>
        <el-table-column  prop="paidCommission" label="实际佣金" align='center' width="150"></el-table-column>
        <el-table-column  prop="waitCommission" label="佣金状态" align='center' width="150"></el-table-column>
        <el-table-column  prop="rewardFunds" label="佣金发放时间" align='center' width="150"></el-table-column>
        <el-table-column  prop="applyTime" label="发放人" align='center' width="150"></el-table-column>
        
      </el-table>

      <el-pagination style="float:right;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageInfo.pageSize"
        layout="total, prev, pager, next, jumper, sizes"
        :total="pageInfo.totalSize">
      </el-pagination>
    </div>
  </div>
</template>
<script>

export default {
  components: {
    
  },
  name: "promoter_details",
  data() {
    return {
      customerList:[
        {
          value: '12345678989',
          label: '张三-12345678989'
        }, {
          value: '12345678988',
          label: '李四-12345678988'
        },
      ],
      promoterList:[
        {
          value: '12345678982',
          label: '张三1'
        }, {
          value: '12345678981',
          label: '李四1'
        },
      ],
      promoterStatusList:[
        {value:"",label:"全部"},
        {value:"1",label:"生效中"},
        {value:"2",label:"已清退"},
      ],
      promoteTypeList:[
        {value:"",label:"全部"},
        {value:"1",label:"直接推广"},
        {value:"2",label:"间接推广"},
      ],
      orderStatusList:[//订单状态
        {value:"",label:"全部"},
        {value:"1",label:"订单1"},
        {value:"2",label:"订单2"},
      ],
      commissionStatusList:[//佣金状态
        {value:"",label:"全部"},
        {value:"1",label:"1"},
        {value:"2",label:"2"},
      ],
      statusTypeList:[
        {value:"1",label:"订单状态"},
        {value:"2",label:"佣金状态"},
      ],
      statusValueData:[],
      tableData: [
        {
          order:'431432',orderStatus:1,companyName:"成都XXXX公司",applicant:'张三',applicantTel:'12345678989',area:"四川省/成都市/高新区",
          inviter:'王二麻子',inviterTel:'12345678989',invitedNum:5,customersNum:10,clinchFunds:'3000.00',
          commissionTotal:'50000.00',paidCommission:'3000.00',waitCommission:'2000.00',rewardFunds:'1000.00',
          applyTime:"2020/12/01",createTime:"2021-02-08 12:10:09",finishTime:"2021-02-18 12:10:09",
        },
        {
          order:'434232',orderStatus:0,companyName:"成都XXXX公司",applicant:'李四',applicantTel:'12345678988',area:"四川省/成都市/高新区",
          inviter:'王二麻子',inviterTel:'',invitedNum:5,customersNum:10,clinchFunds:'3000.00',
          commissionTotal:'50000.00',paidCommission:'3000.00',waitCommission:'2000.00',rewardFunds:'1000.00',
          applyTime:"2020/12/01",createTime:"2021-02-08 12:10:09",finishTime:"2021-02-18 12:10:09",
        },
      ],
      multipleSelection: [],
      selection: [],//已选中
      commissionTime:[],//佣金发放时间
      searchObj:{
        order:'',//订单
        customer:'',//客户姓名或电话
        promoter:'',//推广员姓名或电话
        promoterStatus:'',//推广员状态
        promoteType:'',//推广类型

        statusType:'1',//状态类型
        statusValue:'2',//状态值

        startTime:'',//开始时间
        endTime:'',//结束时间
      },
      pageInfo:{
        page: 1,
        totalSize:10,
        pageSize:20
      },
    };
  },
  created() {

  },
  methods: {
    stTypeChange(val){
      if(val == '1'){
        this.statusValueData = this.orderStatusList;
      }else{
        this.statusValueData = this.commissionStatusList;
      }
    },
    exportFn(){
      console.log('导出')
    },
    changeTime(time){
      this.searchObj.startTime = dayjs(time[0]).format('YYYY-MM-DD HH:mm:ss');
      this.searchObj.endTime = dayjs(time[1]).format('YYYY-MM-DD HH:mm:ss');
    },
    initData(){//数据初始化
      let obj = {
        page:this.pageInfo.page,
        pageSize:this.pageInfo.pageSize,
        ...this.searchObj,
      };
      return
      accounts_get("/companies/labels",obj).then(res => {
        this.tableData = res.rows;
        this.pageInfo.totalSize = res.totalSize;
      }).catch(error => {
        this.$message.error(error);
      });
    },
    searchFn(){
      this.initData();
      this.$refs.multipleTable.clearSelection();
      this.searchResult = false;
    },
    resetFn(){
      this.searchObj = {};
      this.searchFn();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.selection = val;
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
};
</script>
<style lang="less" scoped>
#promoter_details {
  background: #ffffff;
  .detail_contain{
    font-size: 14px;
    height: calc(100vh - 134px);
    // overflow: auto;
    .label{
      // width: 80px;
      display: inline-block;
      text-align: right;
      margin-right: 5px;
    }
    .content{
      display: inline-block;
      width: 214px;
    }
    .promoter_search{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .margin_right{
        margin-right: 10px;
        /deep/.type_1 .el-input__inner{
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    }
    .row_box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin:10px 0;
      .desc{
        color:#6589F8;
        span{
          padding: 0 10px;
          border-right:1px solid #6589F8;
        }
        span:last-child{
          border:none;
        }
      }
    }
   

    /deep/.el-button--primary.is-plain{
      background: #fff!important;
    }
    /deep/.el-button--primary.is-plain:focus, .el-button--primary.is-plain:hover{
      background: #6589F8!important;
    }
  }
}

</style>


