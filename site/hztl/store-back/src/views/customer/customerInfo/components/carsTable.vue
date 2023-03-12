<template>
  <div class="carsTable">
    <el-table ref="CarsTable"  
      class="xtable" size="small"
      :data="tableData" border  stripe
      tooltip-effect="dark" 
      :max-height="maxHeight_C"
      style="width: 100%;margin:10px 0;">
      <el-table-column
        prop="plateNumber"
        label="车牌号"
        align='center'
        min-width="142"
        >
      </el-table-column>
      <el-table-column
        prop="vin"
        label="车架号"
        align='center'
        min-width="136"
        >
      </el-table-column>
      <el-table-column
        prop="vehBrand"
        label="车辆品牌"
        align='center'
        min-width="136"
        >
      </el-table-column>
      <el-table-column
        prop="vehicleGroup"
        label="车型"
        align='center'
        min-width="136"
        >
      </el-table-column>
      <el-table-column
        prop="owner"
        label="车主"
        align='center'
        min-width="136"
        >
      </el-table-column>
      <el-table-column
        prop="auditMonth"
        label="年检月份"
        align='center'
        min-width="136"
        >
      </el-table-column>
      <el-table-column
        prop="firstComeTime"
        label="最后离厂日期"
        align='center'
        min-width="136"
        >
        <template slot-scope="scope">
          <span>{{scope.row.firstComeTime?scope.row.firstComeTime.split(".")[0].split("T").join(" "):'-'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="nextMaintainMile"
        label="下次保养里程"
        align='center'
        min-width="136"
        >
      </el-table-column>
      <el-table-column
        align="center"
        label="下次保养日期"
        prop="nextMaintainTime"
        min-width="136">
        <template slot-scope="scope">
          <span>{{scope.row.nextMaintainTime?scope.row.nextMaintainTime.split(".")[0].split("T").join(" "):'-'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="repairCount"
        label="维修次数"
        align='center'
        min-width="100"
        >
      </el-table-column>
      <el-table-column
        align="center"
        label="保单到期日期"
        prop="insuranceExpiry"
        min-width="136">
        <template slot-scope="scope">
          <span>{{scope.row.insuranceExpiry?scope.row.insuranceExpiry.split(".")[0].split("T").join(" "):'-'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="登记日期"
        prop="insuranceStart"
        min-width="136">
        <template slot-scope="scope">
          <span>{{scope.row.insuranceStart?scope.row.insuranceStart.split(".")[0].split("T").join(" "):'-'}}</span>
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
  </div>
  
  
</template>

<script>
import { CustomerInfoApi } from '../services'
const customerInfoApi = new CustomerInfoApi();

export default {
  name:"carsTable",
  data(){
    return{
      tableData:[],
      maxHeight_C:"320",
      pageInfo:{
        page: 1,
        totalSize:0,
        pageSize:20
      },
    }
  },
  props:{
    customerId:[String,Number]
  },
  mounted(){
    this.initData();
  },
  methods:{
    initData(){
      let params = {
        customerId:this.$route.query.id,
        ...this.pageInfo
      }
      customerInfoApi
        .getVehiclesList(params)
        .then(res => {
          this.tableData = res.rows ? res.rows : [];
          this.pageInfo.totalSize = res.totalSize;
        })
        .catch(err => {
          console.log(err);
        });
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

<style>

</style>