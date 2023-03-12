<template>
  <div class="unverfied">
    <!-- 清洗失败 -->
    <el-table :data="tableData" border size="small" class="xtable"
      @selection-change="handleSelectionChange"
      tooltip-effect="dark" max-height="300"
      ref="multipleTable2" style="width: 100%;margin:10px 0;">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="90">
        <template slot-scope="scope">
          <span @click="resetClick(scope.row,scope.$index)" class="text_btn">重试</span>
        </template>
      </el-table-column>
      <el-table-column
        label="配件名称"
        prop="oeName"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        label="配件编码"
        align="center"
        show-overflow-tooltip
        prop="oeCode">
      </el-table-column>
      <el-table-column
        label="汽车品牌"
        prop="vehSeries"
        show-overflow-tooltip
        align="center">
        <template slot-scope="scope">
          <span>-</span>
        </template>
      </el-table-column>
      <el-table-column
        label="车型"
        prop="vehSeries"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      
      <el-table-column
        align="center"
        label="配件品牌"
        show-overflow-tooltip
        prop="brand">
      </el-table-column>
      
      
      
    </el-table>
    <div class="page_footer">
      <div>
        <el-checkbox v-model="checkedAll" @change="tableDataChange(tableData)">全选</el-checkbox> 
        <span style="padding:0px 10px;margin: 0 10px;border-left:1px solid #000;border-right:1px solid #000;">已选中 {{selection.length}} 条</span>
        <span style="margin-right:8px;">批量操作</span>
        <el-button size="small" type="primary" :disabled="!selection.length"
          plain @click="selResetFn">重试</el-button>
      </div>
      
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.page"
        :page-sizes="[10, 20, 50, 100, 200]"
        :page-size="pageInfo.pageSize"
        layout="total, prev, pager, next, jumper, sizes"
        :total="pageInfo.totalSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { GoodsManageApi } from '../services'
const goodsManageApi = new GoodsManageApi();

export default {
  data(){
    return{
      
      tableData:[],
      selection:[],
      pageInfo:{
        page: 1,
        totalSize:30,
        pageSize:10
      },
      startPageSize:0,
      endPageSize:10,
      searchAll:false,
      checkedAll:false,
    }
  },
  // props:['unverifiedData','brand'],
  props:{
    unverifiedData:Array,
    brand:{
      type:[String],
      default:''
    },
    isAll:Boolean
  },
  watch:{
    unverifiedData(val){
      // this.tableData = val;
      this.changePageSize();
    }
  },
  mounted(){
    window.z = this;
    this.changePageSize();
    // this.tableData = this.unverifiedData;
    
  },
  methods:{
    resetClick(row){//重试
      
      this.resetFn(row,0);
    },
    selResetFn(){
      this.resetFn(this.selection,1);
    },
    resetFn(selData,type){
      //2021-5-12
      let list = [];
      if(!type){
        list.push(selData);
      }else{
        list = selData;
      }
      this.$emit("onResetFn",list);
      return
      //2021-5-12
      let obj = {};
      if(!type){
        obj = {
          all:this.isAll,
          ids:[selData.swPartId],
          type:1
        };
      }else{
        obj = {
          all:this.isAll,
          ids:[],
          type:1
        };
        selData.forEach(p=>{
          obj.ids.push(p.swPartId);
        })
      }
      this.$emit("onResetFn",obj);
      
      
    },
    resetClearnFn(params){//清洗
      let _this = this;
      goodsManageApi.partsClean(params).then(res => {
        let done = res.done ? res.done :[];
        let tableData = [..._this.tableData];
        if(done.length){
          done.forEach(k => {
            tableData.forEach((p,i) => {
              if(k.swPartId == p.swPartId){
                _this.tableData.splice(i,1);
              }
            })
          })
          
        }
      }).catch(error => {
        console.log(error);
      });
    },
    handleSelectionChange(val) {
      this.selection = val;
      this.$emit("onSelectionFn",this.selection);
    },
    //分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.pageInfo.page = 1;
      this.changePageSize();
    },
    handleCurrentChange(val) {
      this.pageInfo.page = val;
      this.changePageSize();
    },
    changePageSize(){
      this.pageInfo.totalSize = this.unverifiedData.length;
      this.startPageSize = (this.pageInfo.page - 1) * this.pageInfo.pageSize;
      this.endPageSize = this.pageInfo.page * this.pageInfo.pageSize;
      this.tableData = this.unverifiedData.slice(this.startPageSize,this.endPageSize);
      
    },
    tableDataChange(val){
      this.toggleSelection(val);
    },
    toggleSelection(rows) {
      if (rows) {
        this.searchAll = true;
        rows.forEach(row => {
          this.$refs.multipleTable2.toggleRowSelection(row);
        });
      } else {
        this.searchAll = false;
        this.$refs.multipleTable2.clearSelection();
      }
    },
  }
}
</script>

<style lang="less" scoped>
.unverfied{

}
</style>