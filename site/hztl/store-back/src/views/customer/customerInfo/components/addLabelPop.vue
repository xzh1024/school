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
      <el-button size="small"  @click="closedFn">取消</el-button>
      <el-button type="primary" size="small" @click="addLabel">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { CustomerInfoApi } from '../services'
const customerInfoApi = new CustomerInfoApi();

export default {
  name:"labelPopover",
  data(){
    return{
      labelVisible:false,
      labelIds:[],
      labelList:[],
      title:"加标签"
    }
  },
  props:{
    dataObj:Object,
  },
  watch:{
    dataObj(){
      this.init();
    }
  },
  created(){
    this.getLabelList();
  },
  mounted(){
    this.init();
  },
  methods:{
    show(){
      this.labelVisible = true;
    },
    closedFn(){
      this.labelVisible = false;
    },
    init(){
      this.labelIds = this.dataObj.labelIds;
    },
    getLabelList(){
      customerInfoApi
        .getLabelList()
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
        ids:[this.dataObj.id],
        searchAll:false,
        labelIds:this.labelIds,
      }
      customerInfoApi.setsCustomers(params).then(res =>{
        this.labelVisible = false;
        this.$message.success('标签修改成功');
        this.$emit('onRefresh');

      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>