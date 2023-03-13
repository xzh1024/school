<template>
  <el-dialog 
      :title="title" 
      :visible.sync="VipVisible" 
      :close-on-click-modal="false" 
      @close="closedFn" 
      width="800px">
  
    <div>
        <el-table ref="multipleTable"  
          class="xtable" size="small"
          :data="tableData" border  stripe
          tooltip-effect="dark" 
          :max-height="maxHeight"
          style="width: 100%;margin:10px 0;">
          <el-table-column
            type="radio"
            align='center'
            width="55">
            <template v-slot="props">
              <el-radio
                v-model="selectId"
                :label="props.row.id"
                :disabled="isAutoUpgrade"
                @change="handleRowChange(props.row)"
              >{{""}}</el-radio>
            </template>
          </el-table-column>
          <el-table-column
            prop="no"
            label="会员等级"
            align='center'
            width="120">
            <template slot-scope="scope">
              <span :style="{color:scope.row.color}">
                {{scope.row.no}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            align='center'
           width="150">
          </el-table-column>
          <el-table-column
            prop="rules"
            label="等级规则"
            align='center'
            >
            <template slot-scope="scope">
              <GradeRules 
                :dataObj="scope.row" />
            </template>
          </el-table-column>
        </el-table>
        <p class="tip_txt">
          客户等级自动升级时不能手动配置会员等级，自动升级关闭时可为客户设置任意等级
        </p>
        <p >
          <span>当前自动升级已</span>
          <span class="tip_warning">{{isAutoUpgrade?'开启':'关闭'}}</span>
          <span style="margin-left:10px;">可前往: 客户 -> 会员等级【配置等级更新模式】中进行修改</span>
        </p>
    </div>
    <div style="text-align: right; margin-top:8px; ">
      <el-button size="small"  @click="cancelVip">取消</el-button>
      <el-button type="primary" size="small"
        v-if="!isAutoUpgrade"
        @click="sureVip">确定</el-button>
    </div>
   
  </el-dialog>
</template>

<script>
import GradeRules from "./gradeRules.vue"
import { CustomerApi } from './services'
const customerApi = new CustomerApi();

export default {
  name:"setVipGrade",
  components:{
    GradeRules
  },
  data(){
    return{
      VipVisible:false,
      title:"修改会员等级",
      tableData:[],
      maxHeight:'300',
      selectId:0,
      isAutoUpgrade:false,//是否自动升级
    }
  },
  props:{
    
    selectData:Array,
    searchAll:Boolean,
    searchCond:Object
    
  },
  watch:{
    selectData(){
      this.onLoad();
    }
  },
  created(){
    this.init();
    this.getMemberGradeAutoUpgrade();//获取配置等级更新模式
  },
  // mounted(){
  //   this.onLoad();
  // },
  methods:{
    show(){
      this.VipVisible = true;
    },
    closedFn(){
      this.VipVisible = false;
    },
    getMemberGradeAutoUpgrade(){
      customerApi.getMemberGradeAutoUpgrade().then(res =>{
        this.isAutoUpgrade = res;
      })
    },
    init(){
      this.tableData = [];
      customerApi.getMemberGradeList().then(res =>{
        if(res){
          res.forEach(p =>{
            if(p.status == 1){
              this.tableData.push(p);
            }
          })
        }else{
          this.tableData = [];
        }
      })
    },
    onLoad(){

      if(this.selectData.length == 1){
        if(this.selectData[0].id == undefined)return;
        let memberGradeId = this.selectData[0].memberGradeId!=undefined?
            this.selectData[0].memberGradeId:this.selectData[0].memberGrade.id;
        this.selectId = memberGradeId;
      }
    },
    handleRowChange(row){
      this.selectId = row.id;
    },
  
    cancelVip(){
      this.closedFn();
    },
    sureVip(){
      let params = {
        ids:[],
        searchAll:this.searchAll,
        searchCond:this.searchCond,
        memberGradeId:this.selectId
      };
      this.selectData.forEach(p =>{
        params.ids.push(p.id);
      })
      customerApi.setsCustomers(params).then(res =>{
        this.VipVisible = false;
        this.$message.success('修改会员等级成功');
        this.$emit('onRefresh',true);

      })
    },

  }
}
</script>

<style lang="less" scoped>
.tip_txt{
  color:@color-error;
}
.tip_warning{
  color:@color-warning;
}
</style>