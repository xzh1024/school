<template>
  <el-dialog 
    :title="title" 
    :visible.sync="labelVisible" 
    :close-on-click-modal="false" 
    @close="closedFn" 
    width="400px">
    <div>
      <el-select 
        v-model="labelIds" 
        style="margin:16px 0; width:100%;"
        size="small" 
        multiple filterable
        collapse-tags
        placeholder="请选择">
        <el-option 
          v-for="(item,index) in labelList"
          :label="item.name" 
          :value="item.id"
          :key="index">
        </el-option>
      </el-select>
    </div>
    <div style="text-align: right; margin: 0">
      <el-button size="small" type="text" @click="closedFn">取消</el-button>
      <el-button type="primary" size="small" @click="addLabel">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { CustomerApi } from '../services'
const customerApi = new CustomerApi();

export default {
  name:"labelPopover",
  data(){
    return{
      labelVisible:false,
      labelIds:[],
      labelList:[],
      title:"加标签",
      customerQueryObj:{},
      labelIdsAdd:false
    }
  },
  props:{
    selectData:Array,
    isSingle:Boolean,
    searchAll:Boolean,
    searchCond:Object
  },
  watch:{
    selectData(){
      this.init();
    }
  },
  
  mounted(){
    this.customerQueryObj = JSON.parse(sessionStorage.getItem('customerQueryObj'));
    if(this.customerQueryObj && this.customerQueryObj.labelList){
        this.labelList = this.customerQueryObj.labelList;
    }else{
      this.getLabelList();//客户标签
    }
  },
  methods:{
    show(){
      this.labelVisible = true;
    },
    closedFn(){
      this.labelVisible = false;
    },
    init(){
      this.labelIds = [];
      if(this.selectData.length == 1 && this.isSingle){
        this.title = '修改标签';
        this.labelIds = this.selectData[0].labelIds;
        this.labelIdsAdd = false;
      }else{
        this.title = '加标签';
        this.labelIdsAdd = true;
      }
    },
    getLabelList(){
      let params = {
        page:1,pageSize:100
      }
      customerApi
        .getLabelList(params)
        .then(res => {
          this.labelList = res.rows;
        })
        .catch(err => {
          console.log(err);
        });
    },
    showLabel(){
      this.init();
    },
    
    addLabel(){
      
      let params = {
        ids:[],
        searchAll:this.searchAll,
        searchCond:this.searchCond,
        labelIds:this.labelIds,
        labelIdsAdd: this.labelIdsAdd
      };
      this.selectData.forEach(p =>{
        params.ids.push(p.id);
      })
      customerApi.setsCustomers(params).then(res =>{
        this.labelVisible = false;
        this.$message.success('标签修改成功');
        this.$emit('onRefresh');

      })
    },
  }
}
</script>

<style lang="less" scoped>

</style>