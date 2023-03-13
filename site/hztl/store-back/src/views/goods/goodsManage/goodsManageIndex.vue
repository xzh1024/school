<template>
  <div class="goods_manage">
    <!-- 商品管理2 -->
    <el-tabs v-model="activeName" type="card" >
      <el-tab-pane label="零配件">
        <GoodsParts v-if="activeName == '0'"/>
      </el-tab-pane>
      <el-tab-pane label="服务项目" v-if="$store.state.base.companyType === 'garage'">
        <GoodsServicePro v-if="activeName == '1'"/>
      </el-tab-pane>
      <el-tab-pane label="项目套餐" v-if="$store.state.base.companyType === 'garage'">
        <GoodsPackage v-if="activeName == '2'"/>
      </el-tab-pane>
    </el-tabs>
    <!-- <div class="goods_tip">
      * 请在思锐M8软件或云配管家中对商品进行上下架管理
    </div> -->
  </div>
</template>

<script>
import GoodsParts from './components/goodsParts'
import GoodsServicePro from './components/goodsServicePro'
import GoodsPackage from './components/goodsPackage'
export default {
  name:'goodsManage',
  components:{
    GoodsParts,GoodsServicePro,GoodsPackage
  },
  data(){
    return{
      activeName:'0'
    }
  }
}
</script>

<style lang="less" scoped>
.goods_manage{
  height: 100%;
  // position: relative;
  /deep/.el-tabs--card{
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  /deep/.el-tabs__content{
    flex:1;
    padding: 0 16px;
    .el-tab-pane{
      height:100%;
    }
  }
  /deep/.el-tabs--card > .el-tabs__header .el-tabs__item.is-active{
    color: @color-link;
    background-color: #fff;
  }
  .goods_tip{
    position: absolute;
    top: 12px;
    left: 300px;
    color: @color-warning;
  }
}
</style>