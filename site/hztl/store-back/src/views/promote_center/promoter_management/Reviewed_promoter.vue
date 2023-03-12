<template>
  <div>
    <!-- <h1>待审核推广员</h1> -->
    <div class="reviewed_promoter_page">
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
      <!-- <el-button type="primary" size="small" style="margin: 10px 0;"
        @click="addPromoterFn">新建标签</el-button> -->
      <el-table ref="multipleTable"  
        @selection-change="handleSelectionChange"
        :data="tableData" border  tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" align='center' width="55"></el-table-column>
        <el-table-column prop="applicant" label="申请人" align='center' >
          <template slot-scope="scope">
            {{scope.row.companyName?(scope.row.companyName+'-'+ scope.row.applicant):scope.row.applicant}}
          </template>
        </el-table-column>
        <el-table-column prop="applicantTel" label="联系电话" align='center' ></el-table-column>
        <el-table-column prop="area" label="所在地区" align='center' ></el-table-column>
        <el-table-column  prop="inviter" label="邀请人" align='center' >
          <template slot-scope="scope">
            {{scope.row.inviterTel?(scope.row.inviter+'（'+ scope.row.inviterTel +'）'):scope.row.inviter}}
          </template>
        </el-table-column>
        <el-table-column  prop="num" label="累计购买笔数" align='center' ></el-table-column>
        <el-table-column  prop="funds" label="累计自购金额" align='center' ></el-table-column>
        <el-table-column  prop="applyTime" label="申请时间" align='center' ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="150">
          <template slot-scope="scope">
            <el-button @click="throughClick(scope.row,scope.$index)" type="text" size="small">通过</el-button>
            <el-button @click="refusedClick(scope.row,scope.$index)" type="text" class="txt_danger" size="small">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="page_footer">
        <div>
          <el-checkbox v-model="searchResult" @change="tableDataChange(tableData)">全选当前查询结果</el-checkbox> 
          <span style="padding:0px 6px;border-left:1px solid #000;border-right:1px solid #000;">已选中 {{selection.length}} 条</span>
          <span>批量操作</span>
          <el-button plain size="small" type="primary" style="margin-left:5px;"
            @click="allThroughFn">通过</el-button>
          <el-button plain size="small" type="danger" style="margin-left:5px;"
            @click="allRefusedFn">拒绝</el-button>
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
    <!-- <el-dialog
      :title="promoterTitle" :close-on-click-modal='false'
      :visible.sync="promoterVisible"
      width="30%">
      <el-form :model="promoterForm" :rules="rules" ref="promoterForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="promoterForm.name" placeholder="最多可输入10个字符"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelClick('promoterForm')">取消</el-button>
        <el-button type="primary" @click="saveClick('promoterForm')">保存</el-button>
        <el-button type="primary" v-if="promoterTitle == '新建标签'"  @click="submitClick('promoterForm')">保存并新建</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import { accounts_get, accounts_post, accounts_delete } from "@/utils/http";
import dayjs from "dayjs";
export default {
  name: "reviewed_promoter_page",
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
          inviter:'王二麻子',inviterTel:'12345678989',num:5,funds:'3000.00',applyTime:"2020/12/01"
        },
        {
          companyName:"成都XXXX公司",applicant:'李四',applicantTel:'12345678988',area:"四川省/成都市/高新区",
          inviter:'王二麻子',inviterTel:'',num:5,funds:'3000.00',applyTime:"2020/12/01"
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
      // promoterVisible:false,
      // promoterTitle:"新建标签",
      // promoterForm:{
      //   name:'',
      // },
      // rules: {
      //   name: [
      //     { required: true, message: '请输入标签名称', trigger: 'blur' },
      //     {  max: 10, message: '最多可输入10个字符', trigger: 'blur' }
      //   ],
      // },
      editIndex:-1,
      searchAll:false,//  delete查询结果所有,true:是;false:不是
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
    refusedClick(row,index) {//拒绝
      console.log('拒绝',row);
      this.searchAll = false;
      this.$confirm(`确定要拒绝【${row.applicant}】的推广员申请吗？`, '审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        //调用拒绝接口
        this.refusedFn(row,0);
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消拒绝'
        // });          
      });
      
    },
    refusedFn(refData,type){
      let obj = {};
      if(!type){
        obj = {
          searchAll:this.searchAll,
          cond:{
            name:this.searchIpt
          },
          ids:[refData.id]
        };
      }else{
        obj = {
          searchAll:this.searchAll,
          cond:{
            name:this.searchIpt
          },
          ids:[]
        };
        refData.forEach(p=>{
          obj.ids.push(p.id);
        })
      }
     
      accounts_delete("/companies/labels",obj).then(res => {
        this.$message({
          message: '拒绝成功',
          type: 'success'
        });
        this.searchFn();
      }).catch(error =>{
        this.$message.error(error?error:'拒绝失败');
      });
    },
    allRefusedFn(){//批量拒绝
      // console.log(`批量拒绝`);
      if(!this.selection.length){
        this.$message({
          message: '你还没有选择数据',
          type: 'warning'
        });
        return false;
      }
      this.$confirm(`确定要拒绝所选择【申请人】的推广员申请吗？`, '审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //调用拒绝接口
        this.refusedFn(this.selection,1);
      }).catch(() => {
                 
      });
    },
    throughClick(row,index) {//通过
      // console.log('通过',row);
      this.searchAll = false;
      this.$confirm(`确定要通过【${row.applicant}】的推广员申请吗？`, '审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        //调用拒绝接口
        this.throughFn(row,0);
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消拒绝'
        // });          
      });
    },
    allThroughFn(){//批量通过
      if(!this.selection.length){
        this.$message({
          message: '你还没有选择数据',
          type: 'warning'
        });
        return false;
      }
      this.$confirm(`确定要通过所选择【申请人】的推广员申请吗？`, '审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //调用通过接口
        this.throughFn(this.selection,1);
      }).catch(() => {
                 
      });
    },
    throughFn(thData,type){
      let obj = {};
      if(!type){
        obj = {
          searchAll:this.searchAll,
          cond:{
            name:this.searchIpt
          },
          ids:[thData.id]
        };
      }else{
        obj = {
          searchAll:this.searchAll,
          cond:{
            name:this.searchIpt
          },
          ids:[]
        };
        thData.forEach(p=>{
          obj.ids.push(p.id);
        })
      }
     
      accounts_delete("/companies/labels",obj).then(res => {
        this.$message({
          message: '通过成功',
          type: 'success'
        });
        this.searchFn();
      }).catch(error =>{
        this.$message.error(error?error:'通过失败');
      });
    },
    tableDataChange(val){
      // console.log(`全选当前查询结果: `,val);
      this.toggleSelection(val);
    },
    toggleSelection(rows) {
      if (rows) {
        this.searchAll = true;
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.searchAll = false;
        this.$refs.multipleTable.clearSelection();
      }
    },



    addPromoterFn(){//新建标签
      this.promoterTitle = '新建标签';
      this.promoterVisible = true;
      // this.promoterForm = {
      //   name:'',
      // }
    },
    cancelClick(formName){//取消
      this.promoterVisible = false;
      // this.$refs[formName].resetFields();
    },
    saveClick(formName){//保存
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('promoterForm',this.promoterForm)
          if(this.promoterTitle == '新建标签'){//新建
            accounts_post("/companies/labels", this.promoterForm).then(res => {
              this.$message({
                message: '新建标签成功',
                type: 'success'
              });
              this.initData();
              this.promoterVisible = false;
            }).catch(error => {
              this.$message.error(error);
            });

          }else{//通过
            //保存接口
            accounts_post(`/companies/labels/${this.promoterForm.id}`,
              {name:this.promoterForm.name}).then(res => {
              this.$message({
                message: '通过成功',
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
    submitClick(formName){//保存并新建
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //保存并新建接口
            console.log('promoterForm',this.promoterForm)
          accounts_post("/companies/labels", this.promoterForm).then(res => {
            this.$message({
              message: '新建标签成功',
              type: 'success'
            });
            this.initData();
            this.promoterVisible = false;
            this.$refs[formName].resetFields();
          }).catch(error => {
            this.$message.error(error);
          });
        } else {
          return false;
        }
      });
    }
  }
}
</script>
<style lang="less" scoped>
.reviewed_promoter_page{
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
</style>