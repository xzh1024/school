//库存分组
<template>
<van-popup
    :value="isShowStock"
    round
    position="bottom"
    style="height:50%;"
    @click-overlay="onClose"
    @close="close"
  >
    <div class="content">
      <div class="operation">
        <van-nav-bar
            title="库存"
        >
            <span class="to-confirm" slot="right">
              <van-icon name="cross" @click="close"/>
            </span>
        </van-nav-bar>
      </div>
        <van-cell-group>
          <template v-if="stockList.length"  >
            <van-cell v-for="(item,index) in stockList" :title="item.groupName"  :key="index"
             @click="onClick(item,index)" 
            :value="item.stockShow">
              <span v-if="index==0">
                <span style="margin-right:20px;">{{item.stockShow}}</span>
                <i  class="van-icon van-icon-success icon_color"></i>
              </span>
              <span v-else>
                <span style="margin-right:40px;">{{item.stockShow}}</span>
              </span>
            </van-cell>
          </template>
          <span v-else style="text-align:center;font-size:14px;">暂无数据</span>
        </van-cell-group>
      <!-- <div class="desc">* 选中后默认给卖家备注从【{{defaultStock}}】发货</div> -->
    </div>
  </van-popup>
  
</template>

<script>
import Vue from "vue";
import request, { URL_MODULE } from "@/request";
import { Toast,Popup,Cell,Radio,RadioGroup } from 'vant';
Vue.use(Toast).use(Popup).use(Cell).use(Radio).use(RadioGroup);
export default {
  name:'stockGroup',
  data(){
    return{
      stockList:[],
      stockRadio:'1',
      defaultStock:""//默认仓库
    }
  },
  props:{
    isShowStock:Boolean,
    stocks:Array,
  },
  watch:{
    stocks(val){
      if(val){
        this.stockList = val;
      }
    }
  },
  mounted(){
    
  },
  methods:{
    onClick(row,index){
      this.stockRadio = index;
      let obj = {
        showMode:row.showMode,
        showModeKey:row.showModeKey,
      }
      request({
        method: "post",
        baseURL: URL_MODULE.united,
        url: "/stocks/shows/default-modes",
        data: obj
      }).then(() => {
        this.$emit('initList', true);
        Toast.success('设置成功');
      });
    },
    onClose(){
      this.$emit('closeFn',false);
    },
    close(){
      this.$emit('closeFn',false);
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
  overflow: auto;
  .operation {
      .to-confirm {
          font-size: 20px;
          /deep/.van-icon {
              color: #1A2231;
          }
      }
  }
  /deep/.van-cell__value{
    margin-right: 20px;
    .icon_color{
        color: #f7f8fa;
        background: #58b8f7;
        border-radius: 50%;
        padding: 2px;
    }
  }
  .desc{
    font-size: 14px;
    margin: 20px;
    color: #c8c9cc;
  }
  
  
}
</style>