<template>
  <div class="cost_settlement">
    <div class="item_pro">
      <div class="item_pro_title">
        <div class="item_pro_l">
          <div class="name">费用结算</div>
        </div>
        <div class="item_pro_r">
          <span >应结金额：</span>
          <span class="f_fee">¥
            <span class="fee_0">{{Number(dataObj.dueAmount).toFixed(2).split('.')[0]}}.</span>
            <span>{{Number(dataObj.dueAmount).toFixed(2).split('.')[1]}}</span>  
          </span>
        </div>
      </div>
      <div class="item_pro_body">
          <div class="item_pro_flex item_margin">
            <div >
              <span>结算方式</span>
            </div>
            <div >
              <span>{{dataObj.settlementType || '-'}}</span>
            </div>
          </div>
          <div class="item_pro_flex item_margin">
            <div >
              <span>发票类型</span>
            </div>
            <div >
              <span>{{`${dataObj.invoiceType}(${Number(dataObj.taxRate)*100}%)`}}</span>
            </div>
          </div>
          <div class="item_pro_flex item_margin">
            <div >
              <span>合计金额</span>
            </div>
            <div >
              <span :class="['f_fee']">¥
                <span class="fee_0">{{Number(dataObj.totalAmount).toFixed(2).split('.')[0]}}.</span>
                <span>{{Number(dataObj.totalAmount).toFixed(2).split('.')[1]}}</span>  
              </span>
            </div>
          </div>
          <div class="item_pro_flex item_margin">
            <div >
              <span>优惠金额</span>
            </div>
            <div >
              <span :class="['f_fee']">¥
                <span class="fee_0">{{Number(dataObj.discountAmount).toFixed(2).split('.')[0]}}.</span>
                <span>{{Number(dataObj.discountAmount).toFixed(2).split('.')[1]}}</span>  
              </span>
            </div>
          </div>
          <div class="item_pro_flex item_margin" 
            v-if="dataObj.eraseAmount">
            <div >
              <span>抹零金额</span>
            </div>
            <div >
              <span :class="['f_fee']">¥
                <span class="fee_0">{{Number(dataObj.eraseAmount).toFixed(2).split('.')[0]}}.</span>
                <span>{{Number(dataObj.eraseAmount).toFixed(2).split('.')[1]}}</span>  
              </span>
            </div>
          </div>
          <div class="item_pro_flex item_margin">
            <div >
              <span>会员折扣</span>
            </div>
            <div >
              <span >
                {{dataObj.memberDiscountName || '-'}}
              </span>
            </div>
          </div>
          <div class="item_pro_flex item_margin" v-if="isShowSign">
            <div >
              <span>{{documentType=='报价单'?'报价':'结算'}}确认签字</span>
            </div>
            <div >
              <img 
                v-if="dataObj.signed"
                :src="dataObj.signedPic" 
                class="signImg" alt="" 
                @click="prewiewImg(dataObj.signedPic)">
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);
export default {
  name:"costSettlement",
  data(){
    return{
      isShowSign:false
    }
  },
  props:{
    dataObj:Object,
    status:String,
    documentType:String
  },
  watch:{
    // status(){
    //   this.onLoad();
    // },
    // dataObj(){
    //   this.onLoad();
    // },
    
  },
  mounted(){
    this.onLoad();
  },
  methods:{
    onLoad(){
      if(this.documentType != '工单'){
        this.isShowSign = true;
      }else{
        // if(this.status=='completed'){// 已完成
        //   this.isShowSign = false;
        // }else{
          this.isShowSign = false;
        // }
      }
    },
    prewiewImg(img){
      ImagePreview([img]);
    }
  }
}
</script>

<style lang="less" scoped>
.cost_settlement{
  .item_pro{
    margin:12px;
    padding:12px;
    background: #ffffff;
    border-radius: 8px;
    .item_pro_title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item_pro_l{
        display: flex;
        align-items: center;
        img{
          width: 16px;
          height: 16px;
          margin-left: 4px;
        }
        .icon_top{
          transform: rotate(180deg);
        }
        .icon_bottom{
          transform: rotate(0deg);
        }
        .name{
          font-size: 16px;
          color: #333333;
          font-weight: 500;
        }
        .number{
          font-size: 14px;
          color: #333333;
          font-weight: 400;
        }
      }
      .item_pro_r{
        color: #E3332A;
        font-weight: 500;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        .f_fee{
          font-size: 11px;
          .fee_0{
            font-size: 16px;
          }
        }
      }
    }
    .item_pro_body{
      font-family: PingFangSC-Regular;
      font-size: 13px;
      color: #999999;
      font-weight: 400;
      text-align: left;
      .f_fee{
        color: #333333;
        font-size: 11px;
        .fee_0{
          font-size: 13px;
        }
      }
      .line_th{
        text-decoration: line-through;
      }
      .parts{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin:2px 0
      }
      .line{
        content: '';
        margin:0 8px;
        height:13px;
        width:1px;
        display: inline-block;
        border-right:1px solid #999999;
      }
    }
  }
  .item_pro_flex{
    display: flex;
    justify-content: space-between;
    // align-items: center;
  }
  .item_margin{
    margin:8px 0;
  }
  .signImg{
    width: 44px;
    height:18px;
  }
}
</style>