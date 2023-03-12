<template>
  <div class="goods_search ">
    <!-- 查询组件 -->
    <span>关键字：</span>
    <el-input style="width:50%;margin-right:10px;"
      :placeholder="placeholder" size="small"
      v-model="keyWords"
      clearable>
    </el-input>
     <el-button type="primary"  size="small" @click="searchFn">查询</el-button>
     <el-button size="small" @click="resetFn">重置</el-button>
     <el-button size="small" @click="moreSeacrhFn">更多筛选 <i :class="moreSeacrhClass"></i></el-button>
  </div>
</template>

<script>
export default {
  name:'goodsSearch',
  data(){
    return{
      keyWords:'',
      moreSeacrh:false,
      moreSeacrhClass:'el-icon-arrow-down',
    }
  },
  props:{
    // keyWords:String,
    placeholder:String,
  },
 
  
  methods:{
    searchFn(){
      this.$emit('onSearchFn',this.keyWords);
    },
    resetFn(){
      this.keyWords = '';
      this.$emit('onResetFn',true);
    },
    moreSeacrhFn(){
      this.moreSeacrh = !this.moreSeacrh;
      this.moreSeacrhClass = this.moreSeacrh ? 'el-icon-arrow-up' : 'el-icon-arrow-down'; 
      this.$emit('onMoreSeacrh',this.moreSeacrh);
    }
  }

}
</script>

<style lang="scss" scoped>

</style>