<template>
  <div class="promoter_contain">
    <!-- <h1>推广员管理</h1> -->
    <div class="promoter_manage">
      <div class="promoter_search">
        <div class="margin_right">
          <span>申请人</span>
          <el-select v-model="searchObj.applicant" filterable remote placeholder="申请人姓名或电话">
            <el-option
              v-for="item in applicantList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="margin_right">
          <span>所在地区</span>
          <el-cascader
            v-model="searchObj.area"
            :props="{ checkStrictly: true }"
            :options="areaList"
            @change="handleChange"></el-cascader>
        </div>
        <div class="margin_right"> 
          <span>邀请人</span>
          <el-select v-model="searchObj.inviter" filterable remote placeholder="邀请人姓名或电话">
            <el-option
              v-for="item in inviterList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="margin_right"> 
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
        </div>
        <el-button type="primary" size="small" style="margin-left: 10px;" @click="searchFn">查询</el-button>
        <el-button type="info" size="small" @click="resetFn">重置</el-button>
      </div>
      <div class="row_box">
        <div >
          <el-button type="primary" size="small" 
            @click="addPromoterFn">添加推广员</el-button>
          <el-button type="primary" size="small" plain
          @click="importFn">导入</el-button>
          <el-button type="text" @click="downloadFn">下载模板</el-button>
          <el-button type="primary" size="small" plain
          @click="exportFn">导出</el-button>
        </div>
        <div class="desc">
          <span>推广员数量：50</span>
          <span>推广客户数：800</span>
          <span>成交金额：9000.00</span>
          <span>佣金总额：600.00</span>
          <span>已发放佣金：600.00</span>
          <span>待发放佣金：50.00 </span>
          <span>奖励金：60.00 </span>
        </div>
      </div>
      
      <el-table ref="multipleTable"  
        @selection-change="handleSelectionChange"
        :data="tableData" border  tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" fixed align='center' width="55"></el-table-column>
        <el-table-column prop="applicant" label="推广员姓名" align='center' width="200">
          <template slot-scope="scope">
            {{scope.row.companyName?(scope.row.companyName+'-'+ scope.row.applicant):scope.row.applicant}}
          </template>
        </el-table-column>
        <el-table-column prop="applicantTel" label="手机号" align='center' width="150"></el-table-column>
        <el-table-column prop="area" label="所在地区" align='center' width="200"></el-table-column>
        <el-table-column  prop="inviter" label="邀请人" align='center' width="220">
          <template slot-scope="scope">
            {{scope.row.inviterTel?(scope.row.inviter+'（'+ scope.row.inviterTel +'）'):scope.row.inviter}}
          </template>
        </el-table-column>
        <el-table-column  prop="invitedNum" label="邀请推广员数" align='center' width="150"></el-table-column>
        <el-table-column  prop="customersNum" label="绑定客户数" align='center' width="150"></el-table-column>
        <el-table-column  prop="clinchFunds" label="成交金额" align='center' width="150"></el-table-column>
        <el-table-column  prop="commissionTotal" label="佣金总额" align='center' width="150"></el-table-column>
        <el-table-column  prop="paidCommission" label="已发放佣金" align='center' width="150"></el-table-column>
        <el-table-column  prop="waitCommission" label="待发放佣金" align='center' width="150"></el-table-column>
        <el-table-column  prop="rewardFunds" label="奖励金额" align='center' width="150"></el-table-column>
        <el-table-column  prop="applyTime" label="加入时间" align='center' width="150"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="180">
          <template slot-scope="scope">
            <el-button @click="toDetailClick(scope.row,scope.$index)" type="text" size="small">查看明细</el-button>
            <el-button @click="editClick(scope.row,scope.$index)" type="text" size="small">编辑</el-button>
            <el-button @click="refusedClick(scope.row,scope.$index)" type="text" class="txt_danger" size="small">清退</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="page_footer">
        <div>
          <el-checkbox v-model="searchResult" @change="tableDataChange(tableData)">全选当前查询结果</el-checkbox> 
          <span style="padding:0px 6px;border-left:1px solid #000;border-right:1px solid #000;">已选中 {{selection.length}} 条</span>
          <span>批量操作</span>
          <el-button plain size="small" type="primary" style="margin-left:5px;"
            @click="allEditFn">编辑</el-button>
          <el-button plain size="small" type="danger" style="margin-left:5px;"
            @click="allDeleteFn">清退</el-button>
        </div>
        <el-pagination
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
    <el-dialog
      :title="promoterTitle" :close-on-click-modal='false'
      :visible.sync="promoterVisible"
      width="20%">
      <el-form :model="promoterForm" :rules="rules" ref="promoterForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="用户：" prop="userName" v-if="!isEdit">
          <el-select v-model="promoterForm.userName" style="width:240px;"
           filterable remote placeholder="申请人姓名或电话">
            <el-option
              v-for="item in applicantList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址：" prop="address" v-if="!isEdit">
          <el-input v-model="promoterForm.address" style="width:240px;"
          disabled placeholder="用户地址"></el-input>
        </el-form-item>
        <el-form-item label="邀请人：" prop="inviter">
          <el-select v-model="promoterForm.inviter" style="width:240px;"
            filterable remote placeholder="邀请人姓名或电话">
            <el-option
              v-for="item in inviterList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="dialog_remark" v-if="!isEdit">*注：只能将您的客户或员工添加为推广员</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelClick('promoterForm')">取消</el-button>
        <el-button type="primary" @click="saveClick('promoterForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { accounts_get, accounts_post, accounts_delete } from "@/utils/http";
import dayjs from "dayjs";
export default {
  name: "promoter_manage_page",
  data(){
    return{
      applicantList:[
        {
          value: '12345678989',
          label: '张三-12345678989'
        }, {
          value: '12345678988',
          label: '李四-12345678988'
        },
      ],
      inviterList:[
        {
          value: '12345678982',
          label: '张三1'
        }, {
          value: '12345678981',
          label: '李四1'
        },
      ],
      tableData: [
        {
          companyName:"成都XXXX公司",applicant:'张三',applicantTel:'12345678989',area:"四川省/成都市/高新区",
          inviter:'王二麻子',inviterTel:'12345678989',invitedNum:5,customersNum:10,clinchFunds:'3000.00',
          commissionTotal:'50000.00',paidCommission:'3000.00',waitCommission:'2000.00',rewardFunds:'1000.00',
          applyTime:"2020/12/01"
        },
        {
          companyName:"成都XXXX公司",applicant:'李四',applicantTel:'12345678988',area:"四川省/成都市/高新区",
          inviter:'王二麻子',inviterTel:'',invitedNum:5,customersNum:10,clinchFunds:'3000.00',
          commissionTotal:'50000.00',paidCommission:'3000.00',waitCommission:'2000.00',rewardFunds:'1000.00',
          applyTime:"2020/12/01"
        },
      ],
      multipleSelection: [],
      selection: [],//已选中
      applyTime:[],//申请时间
      searchObj:{
        applicant:'',//申请人姓名或电话
        area:'',//所在地区
        inviter:'',//邀请人
        applicant:'',//申请人姓名或电话
        
        startTime:'',//开始时间
        endTime:'',//结束时间
      },
      areaList:[//所在地区
        {
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }
      ],
      pageInfo:{
        page: 1,
        totalSize:10,
        pageSize:20
      },
      searchResult:false,
      promoterVisible:false,
      promoterTitle:"添加推广员",
      promoterForm:{
        userName:'',//用户
        address:'',//地址
        inviter:'',//邀请人
      },
      rules: {
        userName: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          {  max: 10, message: '最多可输入10个字符', trigger: 'blur' }
        ],
      },
      isEdit:false,//是否是编辑状态
      editIndex:-1,
      selectAll:false,//  delete/edit 查询结果所有,true:是;false:不是
    }
  },
  mounted(){
    // this.initData();
  },
  methods:{
    handleChange(value) {
      console.log(value);
    },
    changeTime(time){
      console.log('time',time);
      this.searchObj.startTime = dayjs(time[0]).format('YYYY-MM-DD HH:mm:ss');
      this.searchObj.endTime = dayjs(time[1]).format('YYYY-MM-DD HH:mm:ss');
    },
    initData(){//数据初始化
      let obj = {
        page:this.pageInfo.page,
        pageSize:this.pageInfo.pageSize,
        ...this.searchObj,
      };
      // if(this.order){
      //   if(this.order == 'descending'){//客户数降序
      //     obj.order = 'customerCount-desc';
      //   }else if(this.order == 'ascending'){//客户数升序
      //     obj.order = 'customerCount-asc';
      //   }
      // }
      console.log('obj',obj);
      return
      accounts_get("/companies/labels",obj).then(res => {
        // console.log('res',res);
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
      this.searchIpt = {};
      this.searchFn();
    },
    toReplaceClick(row){//跳转
      // console.log('跳转',row);
      window.location.replace('#/rplm_custom');
    },
    toDetailClick(row,index){//查看详细
      console.log('查看详细',row)
    },
    editClick(row,index) {//编辑
      // console.log('编辑',row);
      this.promoterTitle = '编辑';
      this.editIndex = index;
      this.isEdit = true;
      this.selectAll = false;
      this.promoterVisible = true;
      this.promoterForm = Object.assign({},row);
      
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
    refusedClick(row,index) {//清退
      console.log('清退',row);
      this.selectAll = false;
      this.$confirm('你确定要清退吗？','清退')
      .then(_ => {
        //调用清退接口

        this.refusedFn(row,0);
      })
      .catch(_ => {});
    },
    refusedFn(delData,type){
      let obj = {};
      if(!type){
        obj = {
          selectAll:this.selectAll,
          cond:{
            name:this.searchIpt
          },
          ids:[delData.id]
        };
      }else{
        obj = {
          selectAll:this.selectAll,
          cond:{
            name:this.searchIpt
          },
          ids:[]
        };
        delData.forEach(p=>{
          obj.ids.push(p.id);
        })
      }
     
      accounts_delete("/companies/labels",obj).then(res => {
        this.$message({
          message: '清退成功',
          type: 'success'
        });
        this.searchFn();
      }).catch(error =>{
        this.$message.error(error?error:'清退失败');
      });
    },
    allDeleteFn(){//批量清退
      // console.log(`批量清退`);
      if(!this.selection.length){
        this.$message({
          message: '你还没有选择数据',
          type: 'warning'
        });
        return false;
      }
      this.$confirm('你确定要清退吗？','清退')
      .then(_ => {
        // console.log('selection',this.selection);
        //调用清退接口
        this.refusedFn(this.selection,1);
      })
      .catch(error => {
      });
      
    },
    allEditFn(){//批量编辑
      if(!this.selection.length){
        this.$message({
          message: '你还没有选择数据',
          type: 'warning'
        });
        return false;
      }
      this.promoterTitle = '编辑';
      this.isEdit = true;
      this.promoterVisible = true;
      this.promoterForm = {};
    },
    tableDataChange(val){
      // console.log(`全选当前查询结果: `,val);
      this.toggleSelection(val);
    },
    toggleSelection(rows) {
      if (rows) {
        this.selectAll = true;
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.selectAll = false;
        this.$refs.multipleTable.clearSelection();
      }
    },
    addPromoterFn(){//添加推广员
      this.promoterTitle = '添加推广员';
      this.promoterVisible = true;
    },
    importFn(){//导入

    },
    downloadFn(){//下载模板


    },
    exportFn(){//导出


    },
    cancelClick(formName){//取消
      this.promoterVisible = false;
      this.$refs[formName].resetFields();
    },
    saveClick(formName){//保存
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('promoterForm',this.promoterForm)
          if(this.promoterTitle == '添加推广员'){//新建
            accounts_post("/companies/labels", this.promoterForm).then(res => {
              this.$message({
                message: '添加推广员成功',
                type: 'success'
              });
              this.initData();
              this.promoterVisible = false;
            }).catch(error => {
              this.$message.error(error);
            });

          }else{//编辑
            //保存接口
            accounts_post(`/companies/labels/${this.promoterForm.id}`,
              {name:this.promoterForm.name}).then(res => {
              this.$message({
                message: '编辑成功',
                type: 'success'
              });
              this.initData();
              this.promoterVisible = false;
            }).catch(error => {
              this.$message.error(error);
            });
          }
          
        } else {
          return false;
        }
      });
    },
    
  }
}
</script>
<style lang="less" scoped>
.promoter_contain{
  .promoter_manage{
    background: #ffffff;
    height: 100%;
    overflow: hidden;
    padding:10px;
    text-align: left;
    .promoter_search{
      display: flex;
      align-items: center;
      .margin_right{
        margin-right: 10px;
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
    .txt_danger{
      color:#F56C6C;
    }
    .txt_danger:hover{
      color:#f78989;
    }
    .page_footer{
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }
    /deep/.el-button--primary.is-plain{
      background: #fff!important;
    }
    /deep/.el-button--primary.is-plain:focus, .el-button--primary.is-plain:hover{
      background: #6589F8!important;
    }
    
  }
  .dialog_remark{
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    color: #999898;
    margin-left: 30px;
  }
}

</style>