<template>
  <div :class="['union_stock_group',$store.state.paddingLeft]"
        id="page-union_stock_group"
        style="min-width:1250px;"
  >
 
    <div class="label_manage">
      <div class="label_search">
        <el-input size="small"
          style="width:300px;"
          placeholder="分组名称或仓库名称"
          suffix-icon="el-icon-search"
          v-model="searchIpt">
        </el-input>
        <el-button type="primary" size="small" style="margin-left: 10px;" @click="searchFn">查询</el-button>
        <el-button  size="small" @click="resetFn">重置</el-button>
      </div>
      <el-button type="primary" size="small" style="margin: 10px 0;"
        @click="addLabelFn">新建分组</el-button>
      <el-table ref="multipleTable" 
        size="small" class="xtable"
        @selection-change="handleSelectionChange"
        :data="tableData" 
        border  stripe
        max-height="650"
        tooltip-effect="dark" 
        style="width: 100%">
        <el-table-column
          type="selection"
          align='center'
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="分组名称"
          align='center'
          min-width="400">
        </el-table-column>
        <el-table-column
          prop="warehouseNames"
          label="关联仓库"
          align='center'
          min-width="400"
          >
          <template slot-scope="scope">
            <span style="color:#6589F8;">{{renderRow(scope.row)}}</span>
            <!-- <el-button @click="toReplaceClick(scope.row)" type="text" size="small">{{renderRow(scope.row)}}</el-button> -->
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="160">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row,scope.$index)" type="text" size="small">编辑</el-button>
            <el-button @click="delClick(scope.row,scope.$index)" type="text" class="txt_danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page_footer">
        <div>
          <el-checkbox v-model="searchResult" @change="tableDataChange(tableData)">全选当前查询结果</el-checkbox> 
          <span style="margin:0 6px;padding:0px 6px;border-left:1px solid #000;border-right:1px solid #000;">已选中 {{selection.length}} 条</span>
          <span>批量操作</span>
          <el-button plain size="small" type="danger" style="margin-left:5px;"
            @click="allDeleteFn">删除</el-button>
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
      :title="labelTitle" :close-on-click-modal='false'
      :visible.sync="labelVisible"
      width="30%">
      <el-form :model="labelForm" :rules="rules" ref="labelForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分组名称" prop="name">
          <el-input size="small"  v-model="labelForm.name"></el-input>
        </el-form-item>
        <el-form-item label="关联仓库" prop="warehouseNames">
          <el-select 
            v-model="labelForm.warehouseNos" 
            style="width:100%;" size="small"
            multiple filterable placeholder="请选择关联仓库">
            <el-option
              v-for="item in houseList"
              :key="item.warehouseNo"
              :label="item.warehouseName"
              :value="item.warehouseNo"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelClick('labelForm')">取消</el-button>
        <el-button size="small" type="primary" @click="saveClick('labelForm')">保存</el-button>
        <el-button size="small" type="primary" v-if="labelTitle == '新建分组'" @click="submitClick('labelForm')">保存并新建</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { StockGroupApi } from './services'
const stockGroupApi = new StockGroupApi();

export default {
  name: "union_stock_group",
  data(){
    return{
      tableData: [],
      multipleSelection: [],
      selection: [],//已选中
      searchIpt:'',
      
      pageInfo:{
        page: 1,
        totalSize:0,
        pageSize:20
      },
      searchResult:false,
      labelVisible:false,
      labelTitle:"新建分组",
      labelForm:{
        name:'',
        warehouseNos:[]
      },
      houseList: [],
      rules: {
        name: [
          { required: true, message: '请输入分组名称', trigger: 'blur' },
          {  max: 10, message: '最多支持输入10个字符', trigger: 'blur' }
        ],
      },
      editIndex:-1,
      searchAll:false,//  delete查询结果所有,true:是;false:不是
      hasWarehouse:[],//已关联仓库
    }
  },
  created(){
    this.getWarehouse();
  },
  mounted(){
  
    this.initData();
  },
  methods:{
   
    getWarehouse(){//获取仓库list
      this.houseList = [];
      stockGroupApi.getWarehouse().then(res =>{
        this.houseList = res;
      }).catch(error => {
        console.log(error);
      });
      
    },
    initData(){//数据初始化
      
      let obj = {
        page:this.pageInfo.page,
        pageSize:this.pageInfo.pageSize,
        name:this.searchIpt
      };
      this.tableData = [];
      stockGroupApi.getStockInfo(obj).then(res =>{
        this.tableData = res.rows ? res.rows : [];
        this.pageInfo.totalSize = res.totalSize;
        this.hasWarehouseFn();
      }).catch(error => {
        console.log(error);
      });
      
    },
    hasWarehouseFn(){
      this.hasWarehouse = [];

      this.tableData.forEach(p =>{
        this.hasWarehouse = this.hasWarehouse.concat(p.warehouseNos);
      });

      this.houseList.forEach(k =>{
        this.hasWarehouse.forEach(h =>{
          if(h == k.warehouseNo){
            k.disabled = true;
          }
        })
      })
    },
    searchFn(){
      this.initData();
      this.$refs.multipleTable.clearSelection();
      this.searchResult = false;
    },
    resetFn(){
      this.searchIpt = '';
      this.searchFn();
    },
    renderRow(row){
      let warehouse = row.warehouseNames ? row.warehouseNames.join('、') : '';
      return warehouse;
    },
    toReplaceClick(row){//跳转
      window.location.replace('#/union_goods_stock');
    },
    editClick(row,index) {//编辑
      this.labelTitle = '编辑分组';
      this.editIndex = index;
      this.labelVisible = true;
      this.labelForm = Object.assign({},row);

      let rowHouse = row.warehouseNos;
      this.houseList.forEach(k =>{
        rowHouse.forEach(h =>{
          if(h == k.warehouseNo){
            k.disabled = false;
          }
        })
      })
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
    delClick(row,index) {//删除
      this.searchAll = false;
      this.$confirm('你确定要删除当前分组吗？')
      .then(_ => {
        //调用删除接口
        this.deleteFn(row,0);
      })
      .catch(_ => {});
    },
    deleteFn(delData,type){
      let obj = {};
      if(!type){
        obj = {
          searchAll:this.searchAll,
          cond:{
            name:this.searchIpt
          },
          ids:[delData.id]
        };
      }else{
        obj = {
          searchAll:this.searchAll,
          cond:{
            name:this.searchIpt
          },
          ids:[]
        };
        delData.forEach(p=>{
          obj.ids.push(p.id);
        })
      }
      stockGroupApi.deleteWarehouse(obj).then(res =>{
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.searchFn();
      }).catch(error => {
        console.log(error);
      });
      
    },
    allDeleteFn(){//批量删除
      if(!this.selection.length){
        this.$message({
          message: '你还没有选择数据',
          type: 'warning'
        });
        return false;
      }
      this.$confirm('你确定要删除当前分组吗？')
      .then(_ => {
        //调用删除接口
        this.deleteFn(this.selection,1);
      })
      .catch(error => {
        this.$message.error(error);
      });
      
    },
    tableDataChange(val){
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
    addLabelFn(){//新建标签
      this.labelTitle = '新建分组';
      this.labelVisible = true;
      this.labelForm = {
        name:'',
        warehouseNos:[]
      }
    },
    cancelClick(formName){//取消
      this.labelVisible = false;
      this.$refs[formName].resetFields();
    },
    saveClick(formName){//保存
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.labelTitle == '新建分组'){//新建
            stockGroupApi.insertWarehouse(this.labelForm).then(res =>{
              this.$message({
                message: '新建分组成功',
                type: 'success'
              });
              this.initData();
              this.labelVisible = false;
              this.labelForm = {
                name:'',
                warehouseNos:[]
              }
            }).catch(error => {
              console.log(error);
            });
            
          }else{//编辑
            //保存接口
            let objData = {
              id:this.labelForm.id,
              name:this.labelForm.name,
              warehouseNos:this.labelForm.warehouseNos
            }
            stockGroupApi.updateWarehouse(objData).then(res =>{
              this.$message({
                message: '编辑成功',
                type: 'success'
              });
              this.initData();
              this.labelVisible = false;
            }).catch(error => {
              console.log(error);
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
          stockGroupApi.insertWarehouse(this.labelForm).then(res =>{
            this.$message({
              message: '新建分组成功',
              type: 'success'
            });
            this.initData();
            this.$refs[formName].resetFields();
            this.labelForm = {
              name:'',
              warehouseNos:[]
            }
          }).catch(error => {
            console.log(error);
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
.union_stock_group{
  padding: 0 @padding-size-main;
  .label_manage{
    background: #ffffff;
    height: 100%;
    overflow: hidden;
    text-align: left;
    .label_search{
      padding:10px 0;
      
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
  }
  .el-dialog__title{
    text-align: left;
  }
}
</style>
