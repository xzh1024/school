<template>
  <div class="expand_item">
    <template v-if="type==0">
      <div class="img_item" >
        <img :src="expandRowObj.images&&expandRowObj.images.length?expandRowObj.images[0]:imgNoneUrl" alt="" srcset="">
      </div>
      <el-form  style="width:100%;padding-top:5px;"  label-position='left' >
        <el-row :gutter="20"  class="expand_box" >
          <el-col  class="col_4">
            <el-form-item label="配件编码：">
              <span>{{ expandRowObj.swOeCode }}</span>
            </el-form-item>
          </el-col>
          <el-col class="col_4">
            <el-form-item label="配件名称：" >
              <el-popover
                placement="top-start"
                trigger="hover"
                :content="expandRowObj.swOeName">
                <span slot="reference" class="ellipsis">{{ expandRowObj.swOeName }}</span>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col class="col_4">
            <el-form-item label="原厂名称：">
              <el-popover
                placement="top-start"
                trigger="hover"
                :content="expandRowObj.oeName">
                <span slot="reference" class="ellipsis">{{ expandRowObj.oeName }}</span>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col class="col_4">
            <el-form-item label="标准名称：">
              <el-popover
                placement="top-start"
                trigger="hover"
                :content="expandRowObj.stdName">
                <span slot="reference" class="ellipsis">{{ expandRowObj.stdName }}</span>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col class="col_4">
            <el-form-item label="性质：">
              <span>{{ expandRowObj.property }}</span>
            </el-form-item>
          </el-col>
          <el-col class="col_4">
            <el-form-item label="配件品牌：">
              <span>{{ expandRowObj.swBrand }}</span>
            </el-form-item>
          </el-col>
          <el-col class="col_4">
            <el-form-item label="汽车品牌：">
              <span>{{ expandRowObj.vehBrand }}</span>
            </el-form-item>
          </el-col>
          <el-col class="col_4">
            <el-form-item label="配件类别：">
              <span>{{ expandRowObj.partType }}</span>
            </el-form-item>
          </el-col>
          <el-col class="col_4">
            <el-form-item label="库存数量：">
              <span>{{ expandRowObj.qty }}</span>
            </el-form-item>
          </el-col>
          

          <el-col class="col_4">
            <el-form-item label="标准件号：">
              <span>{{ expandRowObj.stdOeCode }}</span>
            </el-form-item>
          </el-col>
         
          <el-col class="col_4">
            <el-form-item label="产地：">
              <span>{{ expandRowObj.swProductionPlace }}</span>
            </el-form-item>
          </el-col>
          <el-col class="col_4">
            <el-form-item label="锁定数：">
              <span>{{ expandRowObj.lockedQty }}</span>
            </el-form-item>
          </el-col>
          
          

          <el-col class="col_4">
            <el-form-item label="生产码：">
              <span>{{ expandRowObj.swManuCode }}</span>
            </el-form-item>
          </el-col>
          
          <el-col class="col_4">
            <el-form-item label="规格：">
              <span>{{ expandRowObj.swModel }}</span>
            </el-form-item>
          </el-col>
          <el-col class="col_4">
            <el-form-item  label="可订货数量：">
              <span>{{ expandRowObj.canOrderQty }}</span>
            </el-form-item>
          </el-col>
          

          
          <el-col class="col_4">
            <el-form-item label="单位：">
              <span>{{ expandRowObj.swUnitName }}</span>
            </el-form-item>
          </el-col>

          <el-col class="col_4">
            <el-form-item label="零售价：">
              <span>{{ expandRowObj.priceRetail }}</span>
            </el-form-item>
          </el-col>
          <el-col class="col_4">
            <el-form-item label="平台价：">
              <span>{{ expandRowObj.priceAlliance }}</span>
            </el-form-item>
          </el-col>
          <el-col class="col_4">
            <el-form-item label="批发价：">
              <span>{{ expandRowObj.priceP }}</span>
            </el-form-item>
          </el-col>
          
          
          <el-col class="col_4">
            <el-form-item label="批价一：">
              <span>{{ expandRowObj.priceP1 }}</span>
            </el-form-item>
          </el-col>
          <el-col class="col_4">
            <el-form-item label="批价二：">
              <span>{{ expandRowObj.priceP2 }}</span>
            </el-form-item>
          </el-col>
          <el-col class="col_4">
            <el-form-item label="批价三：">
              <span>{{ expandRowObj.priceP3 }}</span>
            </el-form-item>
          </el-col>
          
          <el-col class="col_4">
            <el-form-item label="批价四：">
              <span>{{ expandRowObj.priceP4 }}</span>
            </el-form-item>
          </el-col>
          <el-col class="col_4">
            <el-form-item label="配件分类：">
              <span>{{ expandRowObj.swCategory }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="卖点：">
              <span>{{ expandRowObj.description }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="车型：">
              <span>{{ expandRowObj.swVehModel }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="适用车型：">
              <span>{{ expandRowObj.vehSeries }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <el-form  style="width:100%;padding-top:5px;" label-position='left' v-if="type==1">
      <el-row :gutter="20" style="flex:1"   >
       
        <el-col :span="5">
          <el-form-item label="项目编码：">
            <span>{{ expandRowObj.code }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="项目分类：">
            <span>{{ expandRowObj.category }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="项目名称：">
            <span>{{ expandRowObj.name }}</span>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="4">
          <el-form-item label="价格【A级】：">
            <span>{{ expandRowObj.priceA }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="价格【B级】：">
            <span>{{ expandRowObj.priceB }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="价格【C级】：">
            <span>{{ expandRowObj.priceC }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="单位：">
            <span>{{ expandRowObj.unit }}</span>
          </el-form-item>
        </el-col> -->

        <template v-if="expandRowObj.showPrices && expandRowObj.showPrices.length" >
          <el-col :span="5" v-for="(item,index) in expandRowObj.showPrices"  :key="index">
            <el-form-item :label="`价格【${item.name}】:`">
              <span>{{ item.value }}</span>
            </el-form-item>
          </el-col>
        </template>

        <el-col :span="24">
          <el-form-item label="备注：">
            <span>{{ expandRowObj.remarks }}</span>
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
    
    <el-form  style="width:100%;" label-position='left' v-if="type==2">
      <el-row :gutter="20"  >
        <el-col :span="5">
          <el-form-item label="项目套餐编码：">
            <span>{{ expandRowObj.code }}</span>
          </el-form-item>
        </el-col>
      <el-col :span="5">
          <el-form-item label="项目套餐分类：">
            <span>{{ expandRowObj.category }}</span>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="15">
          <el-form-item label="价格：">
            <span>{{ expandRowObj.showPrice }}</span>
          </el-form-item>
        </el-col> -->
        <el-col :span="14">
          <el-form-item label="项目套餐名称：">
            <span>{{ expandRowObj.name }}</span>
          </el-form-item>
        </el-col>
        <template v-if="expandRowObj.showPrices && expandRowObj.showPrices.length" >
          <el-col :span="5" v-for="(item,index) in expandRowObj.showPrices"  :key="index">
            <el-form-item :label="item.name+':'">
              <span>{{ item.value }}</span>
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="24">
          <el-form-item label="备注：">
            <span>{{ expandRowObj.remarks }}</span>
          </el-form-item>
        </el-col>
      </el-row>  
    </el-form>
    
  </div>
</template>

<script>
import { GoodsManageApi } from '../services'
const goodsManageApi = new GoodsManageApi();

export default {
  name:"TableExpand",
  data(){
    return{
      imgNoneUrl:require('@/assets/img/inquiry/place_40_40.jpg'),
    }
  },
  props:{
    type:{
      type:[String,Number],
      default:0
    },
    expandRowObj:Object
  }
}
</script>

<style lang="less" scoped>
.expand_item{
  width:100%;
  display: flex;
  background: @bg-color-base;
  .img_item{
    padding: 12px 16px;
    img{
      width: 80px;
      height: 80px;
      padding: 8px;
      background: #FFFFFF;
      border: 1px solid #D9D9D9;
      border-radius: 2px;
    }
  }
  .ellipsis{
    display: block;
    width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  /deep/.el-form-item__label,
  /deep/.el-form-item__content{
    line-height: 22px;
  }
  /deep/.el-form-item__label{
    color:@text-color-secondary;
  }
  .el-col{
    margin: 4px 0;
  }
  .expand_box{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    min-width: 1230px;
    overflow-x: auto;
    /deep/.el-col{
      margin:4px 0;
    }
    // .col_4{
    //   width:187px;
    // }
    .col_4{
      width:250px;
    }
    // .col_4{
    //   width:374px;
    // }
    
  }
}
</style>