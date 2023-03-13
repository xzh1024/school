<template>
  <el-cascader
    size="small"
    style="width:100%;"
    v-model="areaObj.areaIds"
    :placeholder="placeholder"
    :options="addressOptions"
    @change="handleChange"
  ></el-cascader>
</template>

<script>
import { getAddressList,getPositionAreaById } from "@/utils/splicingData";
export default {
  name:'selectArea',
  data(){
    return{
      addressOptions:[],
      areaObj:{
        areaId:0,
        areaIds:[],
        areaName:''
      }
    }
  },
  props:{
    placeholder:{
      type:[String],
      default:"请选择所在区域"
    },
    areaData:{
      type:[Array],
      default:()=>{
        return [];
      }
    }
  },
  watch:{
    areaData(val){
      this.areaObj.areaIds = val;
    }
  },
  created(){
    //获取地址列表
    this.addressOptions = getAddressList();
  },
  mounted(){
    this.areaObj.areaIds = this.areaData;
  },
  methods:{
    handleChange(val){
      this.areaObj.areaId = val[val.length-1];
      let areaObj = getPositionAreaById(
        val[val.length-1],
        this.addressOptions
      );
      this.areaObj.areaName = areaObj.name;
      this.$emit('change',this.areaObj);
    },
  }

}
</script>

<style lang="less" scoped>

</style>