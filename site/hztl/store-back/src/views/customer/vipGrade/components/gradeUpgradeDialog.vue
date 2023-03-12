<template>
<div>
  <el-dialog 
    :title="title" 
    :visible.sync="Visible" 
    :close-on-click-modal="false" 
    @close="closedFn" 
    class="gradeUpgradeDialog"
    width="800px">
    <div >
      <p  class="item_set">
        <span style="margin-right:8px;">客户等级自动更新</span>
        <span class="item_switch">
          <el-switch v-model="auto"></el-switch>
          <span v-if="auto"  class="switch-yes" style="bottom:0px;left:6px;">是</span>
          <span v-if="!auto"  class="switch-no" style="bottom:0px;left:20px;">否</span>
        </span>
      </p>
      <p>
        <span class="greyColor">开启：将按等级规则实时更新所有客户的会员等级</span>
      </p>
      <p>
        <span class="greyColor">关闭：将从关闭起暂停更新客户的会员等级，所有客户会员等级停留在当前，不再自动升级，商家可手动给客户设置会员等级</span>
      </p>
      <p>
        <span class="color-warning">*注意：若你将自动升/降级开关由关闭设置为开启时则你之前给客户手动设置的会员等级将立即失效，系统将在你开启的同时自动按照升/降级规则去更新所有客户的会员等级</span>
      </p>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closedFn" >取消</el-button>
      <el-button size="small" type="primary" @click="onSave">确定</el-button>
    </div>
  </el-dialog>
  <el-dialog 
    :title="tipTitle" 
    :visible.sync="tipVisible" 
    :close-on-click-modal="false" 
    @close="closedTipFn" 
    class="gradeUpgradeDialog"
    width="800px">
    <div >
      <p  class="item_set">
        <span v-if="auto">你确定要开启自动升级吗？开启后你之前给客户手动设置的会员等级将立即失效，系统将在你开启的同时自动按照升级规则去更新所有客户的会员等级</span>
        <span v-else>你确定要关闭自动升级吗？关闭后系统将暂停更新客户的会员等级，所有客户会员等级停留在当前级别不再自动升级，你可在客户查询中手动给客户配置会员等级</span>
      </p>
      <div  class="item_set" style="justify-content: space-between;">
        <div>
          <span class="color-warning">*</span>
          <span>若【确认更新】下列客户的会员等级将会进行更新，更新情况如下：</span>
        </div>
        <el-button size="small" type="text" @click="onExport">导出Excel</el-button>
      </div>
      <el-table ref="upgradeTable"  
      class="xtable" size="small"
      :data="tableData" border  stripe
      tooltip-effect="dark" 
      :max-height="maxHeight"
      style="width: 100%;margin:10px 0;">
      <el-table-column
        prop="customerName"
        label="客户名称"
        align='center'
        show-overflow-tooltip
        >
      </el-table-column>
      <el-table-column
        prop="currentGrade"
        label="当前会员等级"
        align='center'
        show-overflow-tooltip
        >
        <template slot-scope="scope">
          <span v-if="scope.row.currentGrade" :class="['color-warning']">
            {{scope.row.currentGrade}}
          </span>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="upgradeGrade"
        label="更新后会员等级"
        align='center'
        show-overflow-tooltip
        >
        <template slot-scope="scope">
          <span v-if="scope.row.upgradeGrade" :class="['color-success']">
            {{scope.row.upgradeGrade}}
          </span>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="upgradeType"
        label="更新类型"
        align='center'
        >
        <template slot-scope="scope">
          <span :class="[scope.row.upgradeType=='降级'?'':'color-success']">
            {{scope.row.upgradeType}}
          </span>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closedTipFn" >取消</el-button>
      <el-button size="small" type="primary" @click="onConfirm">确认更新</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { MemberGradeApi } from '../services'
const memberGradeApi = new MemberGradeApi();

export default {
  name:"gradeUpgradeDialog",
  data(){
    return{
      Visible:false,
      title:"配置等级更新模式",
      auto:false,
      tipTitle:"提示",
      tipVisible:false,
      tableData:[],
      maxHeight:'300',
    }
  },
  mounted(){
    // this.init();
  },
  methods:{
    init(){
      memberGradeApi.getMemberGradeAutoUpgrade().then(res =>{
        this.auto = res;
      })
    },
    show(){
      this.Visible = true;
      this.init();
    },
    closedFn(){
      this.Visible = false;
    },
    onSave(){
      let params = {
        auto:this.auto,
        confirm:false //# true:已确认，auto字段为true时该字段有效
      }
      this.tableData = [];
      memberGradeApi.setMemberGradeUpgrade(params).then(res =>{
        this.tipVisible = true;
        if(res){
          this.tableData = res;
        }
      })
    },
    closedTipFn(){
      this.tipVisible =false;
    },
    onConfirm(){//确认更新
      let params = {
        auto:this.auto,
        confirm:true //# true:已确认，auto字段为true时该字段有效
      }
      memberGradeApi.setMemberGradeUpgrade(params).then(res =>{
        this.$message.success('设置成功');
        this.tipVisible =false;
        this.Visible = false;
        this.$emit('onRefresh')
      })
    },
    onExport(){
      memberGradeApi.exportGradeUpgrade().then(res =>{
          this.$message.success('导出成功');
          const url = window.URL.createObjectURL(new Blob([res]));
          const link = document.createElement("a");
          link.href = url;
          let name = `客户等级列表_${this.$dayjs().format('YYYY-MM-DD')}.xls`;
          link.setAttribute(
            "download",
            name
          );
          link.click();
      })
    }
  }
}
</script>

<style lang="less" scoped>
.gradeUpgradeDialog{
  .item_set{
    color:@text-color-base;
    font-size: 14px;
    text-align:left;
    display: flex;
    align-items: center;
    margin:@margin-size-main 0;
  }
  .item_switch{
    position:relative;
  }
  .switch-yes {
    color: #ffffff;
    font-size: 12px;
    line-height: 20px;
    position: absolute;
  }
  .switch-no {
    color: #ffffff;
    font-size: 12px;
    position: absolute;
    line-height: 20px;
  }
  .color-warning{
    color: @color-warning;
  }
  .color-success{
    color: @color-success;

  }
}
</style>