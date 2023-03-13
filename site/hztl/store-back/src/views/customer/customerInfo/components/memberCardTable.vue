<template>
  <div>
    <el-table ref="multipleTable"  
      class="xtable" size="small"
      :data="tableData" border  stripe
      tooltip-effect="dark" 
      :max-height="maxHeight"
      style="width: 100%;margin:10px 0;">
      <el-table-column
        prop="openerName"
        label="开卡人"
        align='center'
        width="100">
        <template slot-scope="scope">
          <span>
            {{scope.row.openerName}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cardNo"
        label="卡号"
        align='center'
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="卡种"
        align='center'
        show-overflow-tooltip 
        width="100">
      </el-table-column>
      <el-table-column
        prop="statusName"
        label="状态"
        align='center'
        width="100">
      </el-table-column>
      <el-table-column
        prop="cashValue"
        label="卡现金价值"
        align='center'
        width="100">
        <template slot-scope="scope">
          {{toFixedFn(scope.row.cashValue)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="useLimit"
        label="使用门槛"
        align='center'
        show-overflow-tooltip 
        min-width="180"
        >
        <template slot-scope="scope">
          <div style="text-align:left;">
            <template v-if="scope.row.useLimit&&scope.row.useLimit.branch.limit">
              <!-- <el-tooltip  effect="dark" :content="renderUseLimit(scope.row.useLimit.branch.rows,'指定门店：')" placement="top"> -->
                <p class="ellipsis">{{renderUseLimit(scope.row.useLimit.branch.rows,'指定门店：')}}</p>
              <!-- </el-tooltip> -->
            </template>
            <p v-else class="greyColor">不限门店</p>
            <template v-if="isGarage">
              <template v-if="scope.row.useLimit&&scope.row.useLimit.vehicle.limit">
                <!-- <el-tooltip  effect="dark" :content="renderUseLimit(scope.row.useLimit.vehicle.rows,'指定车辆：')" placement="top"> -->
                  <p class="ellipsis">{{renderUseLimit(scope.row.useLimit.vehicle.rows,'指定车辆：')}}</p>
                <!-- </el-tooltip> -->
              </template>
              <p v-else class="greyColor">不限车辆</p>
            </template>
          </div>
        
        </template>
      </el-table-column>
      <el-table-column
        prop="discount"
        label="卡折扣"
        align='center'
        min-width="169"
        >
        <template slot-scope="scope">
          <div style="text-align:left;">

            <p v-if="isGarage && scope.row.discount.detail.projectChecked">
              项目折扣：{{scope.row.discount.detail.project}}折
            </p>
            <p v-if="scope.row.discount.detail.partChecked">
              配件折扣：{{scope.row.discount.detail.part}}折
            </p>
            <p v-if="isGarage && scope.row.discount.detail.packageChecked">
              套餐折扣：{{scope.row.discount.detail.package}}折
            </p>
            <p v-if="!scope.row.discount.indate.limit" class="greyColor">永久有效</p>
            <template v-else>
              <p class="greyColor" v-if="scope.row.discount.indate.date">
                有效期至{{ scope.row.discount.indate.date }}
              </p>
              <p class="red_txt" v-if="scope.row.discount.indate.str">
                {{ scope.row.discount.indate.str }}
              </p>
            </template>
            
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="cardBalance"
        label="卡余额"
        align='center'
        min-width="200">
        <template slot-scope="scope">
          <div style="text-align:left;">
            <p >现金余额：{{toFixedFn(scope.row.cardBalance.cash)}}</p>
            <!-- <el-tooltip  effect="dark" :content="renderBalance(scope.row.cardBalance)" placement="top"> -->
              <p class="ellipsis" v-if="isGarage">{{renderBalance(scope.row.cardBalance)}}</p>
            <!-- </el-tooltip> -->
            <!-- <p v-if="scope.row.cardBalance&&scope.row.cardBalance.indate.limit" class="greyColor">永久有效</p> -->
            <p 
              v-if="isGarage && scope.row.cardBalance.indate.limit &&
                scope.row.cardBalance.indate.str"
              class="red_txt">即将失效项目次数：{{ scope.row.cardBalance.indate.str }}
            </p>
            <p>
              <el-button type="text" size="samll" @click="toVipCardDetail(scope.row)">查看详情</el-button>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="开卡价格"
        align='center'
        width="100">
        <template slot-scope="scope">
          {{toFixedFn(scope.row.price)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="createdCompany"
        label="开卡门店"
        align='center'
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        label="开卡日期"
        prop="createdAt"
        show-overflow-tooltip 
        width="160">
        <template slot-scope="scope">
          <span>{{scope.row.createdAt.split(".")[0].split("T").join(" ")}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作人"
        align="center"
        prop="createdBy"
        width="100">
      </el-table-column>
      <el-table-column
        label="备注"
        align="center"
        prop="remarks"
        show-overflow-tooltip
        width="100">
      </el-table-column>
    </el-table>
    <!-- 会员卡详情弹框 -->
    <CardServiceInfoDialog
      :now="infoNow"
      @hide="hideCardServiceInfoDialog"
      v-if="cardServiceInfoVisible"
    ></CardServiceInfoDialog>
  </div>
</template>

<script>
import CardServiceInfoDialog from "../../vipCard/manage/components/cardServiceInfoDialog.vue";
export default {
  name:"memberCardTable",
  components:{
    CardServiceInfoDialog
  },
  data(){
    return{
      maxHeight:'300',
      infoNow: null,
      cardServiceInfoVisible:false
    }
  },
  props:{
    tableData:Array
  },
  methods:{
    toFixedFn(strNum){
      return Number(strNum).toFixed(2);
    },
    renderUseLimit(rows,name){
      let textStr = '';
      textStr = name + rows.map(item => item.name).join('、');
      return textStr;
    },
    
    renderBalance(row){
      let textStr = '';
      let textArr = [];
      let projects = row.projects?row.projects:[];
      let packages = row.packages?row.packages:[];
      
      let arr = [...projects,...packages];
      if(arr.length){
        arr.forEach(p =>{
          textArr.push(p.name + '*' + p.qty);
        })
      }
      textStr = '计次余额：' + textArr.join('、');
      return textStr;
    },
    toVipCardDetail(row){
      this.infoNow = row || null;
      this.cardServiceInfoVisible = true;
      // return
      // let obj = {
      //   path:'/vipCard',
      //   query:{
      //     customerId:this.$route.query.id
      //   }
      // }
      // this.$router.push(obj);
    },
    hideCardServiceInfoDialog() {
      this.cardServiceInfoVisible = false;
    },
  },
  computed: {
    isGarage() {
      return this.$store.state.base.companyType === "garage";
    }
  }
}
</script>

<style lang="less" scoped>
.xtable{
  .red_txt{
    color:@color-error;
  }
  .ellipsis{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>