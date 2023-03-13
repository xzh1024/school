<template>
  <div class="dialog_shelves_com">
    <el-button type="primary" size="small" @click="showDialogClickFn">{{btnText}}</el-button>
    <!-- 零配件 -->
    <el-dialog :title="title" :visible.sync="showDialog" 
      :close-on-click-modal="false" @close="closedFn" width="60%">
      <Search @onSearchFn="searchFn"  @onMoreSeacrh="moreSeacrhFn" :placeholder="placeholder"/>
      <div v-if="type == 1">
        <el-row  :gutter="20" class="more_search_box" v-if="moreSearch">
          <el-col :span="6">
            <div class="search_item">
              <span class="label">配件类别：</span>
              <el-select v-model="searchObj.partClassifiy" class="search_item_cont"
              size="small" placeholder="请选择">
              <el-option label="全部" value="0"></el-option>
              <el-option label="保养" value="1"></el-option>
              <el-option label="维修" value="2"></el-option>
              <el-option label="美容" value="3"></el-option>
            </el-select>
            </div>
          </el-col>
          
          <el-col :span="6">
            <div class="search_item">
              <span class="label">产地：</span>
              <el-input class="search_item_cont"
                placeholder="产地" size="small"
                v-model="searchObj.originPlace"
              >
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="search_item">
              <span class="label">性质：</span>
              <el-input class="search_item_cont"
                placeholder="性质" size="small"
                v-model="searchObj.nature"
              >
              </el-input>
            </div>
          </el-col>
          
          <el-col :span="6">
            <div class="search_item">
              <span class="label">规格：</span>
              <el-input class="search_item_cont"
                placeholder="规格" size="small"
                v-model="searchObj.specifications"
              >
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="search_item">
              <span class="label">配件品牌：</span>
              <el-input class="search_item_cont"
                placeholder="配件品牌" size="small"
                v-model="searchObj.partBrand"
              >
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="search_item">
              <span class="label">状态：</span>
              <el-select v-model="searchObj.status" class="search_item_cont"
               size="small" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
                <el-option label="已上架" value="1"></el-option>
                <el-option label="未上架" value="2"></el-option>
              </el-select>
            </div>
          </el-col>
         
          
        </el-row>
        
        <el-table :data="tableData" border  class="d_table1"
          @selection-change="handleSelectionChange"
          tooltip-effect="dark" 
          ref="multipleTable" style="width: 100%;margin:10px 0;">
          <el-table-column
            type="selection"
            :selectable="isSelectFn"
            align="center"
            width="55">
          </el-table-column>
          
          <el-table-column
            label="配件编码"
            align="center"
            show-overflow-tooltip
            prop="partCode">
          </el-table-column>
          <el-table-column
            label="配件名称"
            prop="partName"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            label="配件类别"
            prop="partClassifiy"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          
          <el-table-column
            align="center"
            label="配件品牌"
            show-overflow-tooltip
            prop="partBand">
          </el-table-column>
          <el-table-column
            align="center"
            label="适用车型"
            show-overflow-tooltip
            prop="applicableModels"
            width="200">
          </el-table-column>
          
          <el-table-column
            align="center"
            label="产地"
            show-overflow-tooltip
            prop="originPlace">
          </el-table-column>
          <el-table-column
            align="center"
            label="性质"
            show-overflow-tooltip
            prop="nature">
          </el-table-column>
          <el-table-column
            align="center"
            label="规格"
            show-overflow-tooltip
            prop="specifications">
          </el-table-column>
          <el-table-column
            align="center"
            label="状态"
            prop="status">
            <template slot-scope="scope">
              <span>{{scope.row.status==1 ? "已上架" : "未上架"}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="type == 2">
        <el-row  class="more_search_box" v-if="moreSearch">
          <el-col :span="6">
            <div class="search_item">
              <span class="label">项目分类：</span>
              <el-select v-model="searchObj.projectType" class="search_item_cont"
              size="small" placeholder="请选择">
              <el-option label="全部" value="0"></el-option>
              <el-option label="保养" value="1"></el-option>
              <el-option label="维修" value="2"></el-option>
              <el-option label="美容" value="3"></el-option>
            </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="search_item">
              <span class="label">状态：</span>
              <el-select v-model="searchObj.status" class="search_item_cont"
               size="small" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
                <el-option label="已上架" value="1"></el-option>
                <el-option label="未上架" value="2"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        
        <el-table :data="tableData" border  class="xtable"
          @selection-change="handleSelectionChange"
          tooltip-effect="dark"
          ref="multipleTable" style="width: 100%;margin:10px 0;">
          <el-table-column
            type="selection"
            :selectable="isSelectFn"
            align="center"
            width="55">
          </el-table-column>
          
          <el-table-column
            label="项目编码"
            align="center"
            prop="projectCode">
          </el-table-column>
          <el-table-column
            label="项目名称"
            prop="projectName"
            align="center">
          </el-table-column>
          <el-table-column
            label="项目分类"
            prop="projectClassifiy"
            align="center">
          </el-table-column>
          <el-table-column
            align="center"
            label="状态"
            prop="status">
            <template slot-scope="scope">
              <span>{{scope.row.status==1 ? "已上架" : "未上架"}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="type == 3">
        <el-row  class="more_search_box" v-if="moreSearch">
          <el-col :span="6">
            <div class="search_item">
              <span class="label" style="width:128px;">项目套餐分类：</span>
              <el-select v-model="searchObj.packageClassifiy" class="search_item_cont"
              size="small" placeholder="请选择">
              <el-option label="全部" value="0"></el-option>
              <el-option label="普通套餐" value="1"></el-option>
              <el-option label="定保套餐" value="2"></el-option>
            </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="search_item">
              <span class="label">状态：</span>
              <el-select v-model="searchObj.status" class="search_item_cont"
               size="small" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
                <el-option label="已上架" value="1"></el-option>
                <el-option label="未上架" value="2"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        
        <el-table :data="tableData" border  class="d_table1"
          @selection-change="handleSelectionChange"
          tooltip-effect="dark"
          ref="multipleTable" style="width: 100%;margin:10px 0;">
          <el-table-column
            type="selection"
            align="center"
            :selectable="isSelectFn"
            width="55">
          </el-table-column>
          
          <el-table-column
            label="项目套餐编码"
            align="center"
            show-overflow-tooltip
            prop="packageCode">
          </el-table-column>
          <el-table-column
            label="项目套餐名称"
            prop="packageName"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            label="项目套餐分类"
            prop="packageClassifiy"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            align="center"
            label="状态"
            prop="status">
            <template slot-scope="scope">
              <span>{{scope.row.status==1 ? "已上架" : "未上架"}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      
      <el-pagination class="flex_right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.page"
        :page-sizes="[10, 20, 50, 100, 200]"
        :page-size="pageInfo.pageSize"
        layout="total, prev, pager, next, jumper, sizes"
        :total="pageInfo.totalSize">
      </el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="showDialog = false" >取 消</el-button>
        <el-button size="small" type="primary" @click="onSumbit">确 定</el-button>
      </div>
    </el-dialog>  
    
  </div>
</template>

<script>
import Search from './searchCom'

export default {
  name:"DialogShelvesCom",
  components:{
    Search
  },
  data(){
    return{
      showDialog:false,
      moreSearch:false,
      title:"发布配件",
      placeholder:"配件名称/编码等关键字",
      btnText:"零配件上架",
      searchObj:{
        keyWord:''
      },
      tableData: [
        {
          id: '12987121',
          partCode:'123456789',//配件编码
          partName:'配件名称',//配件名称
          standardName:'标准名称',//标准名称
          nature:'完好',//性质
          originPlace:'国产',//产地
          partBand:'博世',//配件品牌
          partClassifiy:'轮胎类',//配件类别
          specifications:'R15',//规格
          models:'一汽大众，奥迪',//车型
          // partAttribute:'配件属性',//配件属性
          orderableNum:'198',//可订货数量
          retailPrice:'120.00',//零售价
          imgUrl:'图片',//图片
          unit:'个',//单位
          isStandard:true,//是否标准化
          stockNum:'500',//库存数量
          priceP1:'280.00',//批价一
          priceP2:'260.00',//批价二
          priceP3:'250.00',//批价三
          priceP4:'240.00',//批价四
          platformPrice:'400.00',//平台价
          wholesalePrice:'400.00',//批发价
          standardNo:"1234567890",//标准件号
          lockNum:"10",//锁定数：
          proCode:"4798529284",//生产码：
          originName:"原厂名称",//原厂名称
          carBand:"奥迪",//汽车品牌：
          sellPoint:"这里是卖点这里是卖点这里是卖点这里是卖点",//卖点：
          applicableModels:"这里是适用车型这里是适用车型",//适用车型
          status:1
        },
        {
          id: '12987122',
          projectCode:'123456789',//项目编码
          projectName:'洗车',//项目名称
          projectClassifiy:'保养',//项目分类
          retailPrice:'120.00',//价格
          imgUrl:'图片',//图片
          unit:'次',//单位
          sellPoint:"这里是卖点这里是卖点这里是卖点这里是卖点",//卖点

          priceA:'280.00',//价格A
          priceB:'260.00',//价格B
          priceC:'250.00',//价格C
          status:2
        },
        {
          id: '12987123',
          packageCode:'123456789',//项目套餐编码
          packageName:'洗车',//项目套餐名称
          packageClassifiy:'保养',//项目套餐分类
          retailPrice:'120.00',//价格
          imgUrl:'图片',//图片
          unit:'次',//单位
          sellPoint:"这里是卖点这里是卖点这里是卖点这里是卖点",//卖点：
          status:2
        },
      ],
      multipleSelection: [],
      selection: [],//已选中
      pageInfo:{
        page: 1,
        totalSize:10,
        pageSize:20
      },
    }
  },
  props:['type'],
  watch:{
    moreSearch(){
      
    }
  },
  created(){

    if(this.type == 1){
      this.btnText = "零配件上架"
    }else if(this.type == 2){
      this.btnText = "项目上架"
    }else if(this.type == 3){
      this.btnText = "项目套餐上架"
    }
  },
  methods:{
    isSelectFn(row,index){//是否可多选
      if(row.status == 1){
        return false
      }
      if(row.status == 2){
        return true
      }
    },
    initData(){//数据初始化
      let obj = {
        page:this.pageInfo.page,
        pageSize:this.pageInfo.pageSize,
        ...this.searchObj
      };
      return
      // accounts_get("/companies/labels",obj).then(res => {
      //   this.tableData = res.rows;
      //   this.pageInfo.totalSize = res.totalSize;
      // }).catch(error => {
      //   this.$message.error(error);
      // });
    },
    showDialogClickFn(){
      this.showDialog = true;
      if(this.type == 1){
        this.title = "发布配件"
        this.placeholder = "配件名称/编码等关键字"
      }else if(this.type == 2){
        this.title = "发布项目"
        this.placeholder = "项目名称/编码等关键字"
      }else if(this.type == 3){
        this.title = "发布项目套餐"
        this.placeholder = "项目套餐名称/编码等关键字"
      }
    },
    closedFn(data){
      this.showDialog = false;
    },
    searchFn(data){
      this.searchObj.keyWord = data;
      this.pageInfo.page = 1;
      this.initData();
    },
    moreSeacrhFn(data){
      this.moreSearch = data;
      let keyWord = this.searchObj.keyWord;
      this.searchObj = {
        keyWord:keyWord
      }
    },
    onSumbit(){//点击确定
      // console.log('onSumbit')
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
}
</script>

<style lang="less" scoped>
.dialog_shelves_com{
  /deep/.el-dialog__body{
    padding: 10px 20px;
  }
  .more_search_box{
    .search_item {
      display: flex;
      align-items: center;
      margin: 8px 0;
      .label{
          width: 90px;
          display: inline-block;
      }
      .search_item_cont{
        width:224px;
      }
    }
    
  }
}
</style>>

