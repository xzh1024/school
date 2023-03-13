<template>
  <div>
    <!-- 模糊匹配 -->
    <el-table :data="tableData" border 
      size="small" class="xtable"
      tooltip-effect="dark" max-height="300"
      ref="dTable" style="width: 100%;margin:10px 0;">
      
      <!-- <el-table-column
        label="操作"
        align="center"
        width="120">
        <template slot-scope="scope">
          <span @click="resetClick(scope.row,scope.$index)" class="text_btn">重试</span>
        </template>
      </el-table-column> -->
      
      <el-table-column type="expand">
        <template slot-scope="props">
         <el-table :data="props.row.matches" border 
          size="small" class="xtable" 
          tooltip-effect="dark" max-height="300"
          ref="xTable" style="width: 100%;margin:10px 0;">
          
          <el-table-column
            label="操作"
            align="center"
            width="120">
            <template slot-scope="scope">
              <span @click="toStandardFn(scope.row,scope.$index)" class="text_btn">按此标准</span>
            </template>
          </el-table-column>
          <el-table-column
            label="原厂/品牌件号"
            align="center"
            show-overflow-tooltip
            prop="oeCode">
          </el-table-column>
          <el-table-column
            label="原厂名称"
            prop="oeName"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          
          <el-table-column
            align="center"
            label="标准名称"
            show-overflow-tooltip
            prop="stdName">
          </el-table-column>
          <!-- <el-table-column
            align="center"
            label="相似度"
            show-overflow-tooltip
            prop="xsd">
          </el-table-column> -->
          <el-table-column
            align="center"
            label="适用车型"
            show-overflow-tooltip
            prop="vehSeries">
          </el-table-column>
         </el-table>
          
        </template>
      </el-table-column>
      <el-table-column
        label="配件名称"
        align="center"
        show-overflow-tooltip
        prop="oeName"
        width="150">
        <template slot-scope="scope">
          <span>-</span>
        </template>
      </el-table-column>
      <el-table-column
        label="配件编码"
        align="center"
        show-overflow-tooltip
        prop="oeCode"
        width="150">
      </el-table-column>
      <el-table-column
        label="汽车品牌"
        align="center"
        show-overflow-tooltip
        prop="vehBrand"
        width="150">
        <template slot-scope="scope">
          <span>-</span>
        </template>
      </el-table-column>
      <el-table-column
        label="车型"
        prop="swVehModel"
        show-overflow-tooltip
        align="center">
        <template slot-scope="scope">
          <span>-</span>
        </template>
      </el-table-column>
      <el-table-column
        label="配件品牌"
        prop="brand"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <!-- <el-table-column
        label="配件类别"
        prop="partType"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        label="产地"
        prop="productionPlace"
        show-overflow-tooltip
        align="center">
      </el-table-column> -->
    </el-table>
    <div class="page_footer">
      <div></div>
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

export default {
  data(){
    return{
      tableData:[
        {
          "swPartId": 297946,
          "oeCode": "00001",
          "matches": [{
              "swPartId": 297946,
              "matchType": "1",
              "oeCode": "00002",
              "stdOeCode": "8E0117335L",
              "oeName": "空气导管",
              "stdName": "",
              "vehSeries": "",
              "price4s": "0"
          }]
        }, {
          "swPartId": 4,
          "matches": [{
              "swPartId": 4,
              "matchType": "1",
              "oeCode": "058260511",
              "stdOeCode": "058260511",
              "oeName": "带张紧轮的支架",
              "stdName": "",
              "vehSeries": "进口奥迪A6|进口奥迪A4|一汽奥迪A6L",
              "price4s": "483.13"
          }]
        }
      ],
      pageInfo:{
        page: 1,
        totalSize:30,
        pageSize:10
      },
      startPageSize:0,
      endPageSize:10,

    }
  },
  props:{
    fuzzyData:Array,
    
  },
  watch:{
    fuzzyData(val){
      // this.tableData = val;
      this.changePageSize();
    }
  },
  mounted(){
    // this.tableData = this.fuzzyData;
    this.changePageSize();
  },
  methods:{
    toStandardFn(row,index){//按此标准
      
      let params = {
        type:1,
        candidates:[]
      }
      params.candidates.push({
        id:row.swPartId,
        oeCode:row.oeCode,
        oeName:row.oeName
      })
      this.$emit('onToStandard',params);
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
      this.pageInfo.totalSize = this.fuzzyData.length;
      this.startPageSize = (this.pageInfo.page - 1) * this.pageInfo.pageSize;
      this.endPageSize = this.pageInfo.page * this.pageInfo.pageSize;
      this.tableData = this.fuzzyData.slice(this.startPageSize,this.endPageSize);
      
    },
  }
}
</script>

<style>

</style>