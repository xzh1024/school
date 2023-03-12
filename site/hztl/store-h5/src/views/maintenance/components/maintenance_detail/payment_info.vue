<template>
  <div class="payment_info">
    <div class="item_pro">
      <div class="item_pro_title">
        <div class="item_pro_l">
          <div class="name">付款信息</div>
        </div>
        <div class="item_pro_r">
        </div>
      </div>
      <div class="item_pro_body">
        <div class="item_pro_flex item_margin">
          <div >
            <span>结算实付（{{paymentObj.memberDiscountName || '-'}}）</span>
          </div>
          <div >
            <span :class="['f_fee']">¥
              <span class="fee_0">{{Number(paymentObj.actualAmount).toFixed(2).split('.')[0]}}.</span>
              <span>{{Number(paymentObj.actualAmount).toFixed(2).split('.')[1]}}</span>  
            </span>
          </div>
        </div>
        <!-- <div class="item_pro_flex item_margin">
          <div >
            <span>积分抵扣</span>
          </div>
          <div >
            <span :class="['f_fee']">- ¥
              <span class="fee_0">{{Number(paymentObj.pointsDeduction).toFixed(2).split('.')[0]}}.</span>
              <span>{{Number(paymentObj.pointsDeduction).toFixed(2).split('.')[1]}}</span>  
            </span>
          </div>
        </div>
        <div class="item_pro_flex item_margin">
          <div >
            <span>优惠金额</span>
          </div>
          <div >
            <span :class="['f_fee']">¥
              <span class="fee_0">{{Number(paymentObj.discountAmount).toFixed(2).split('.')[0]}}.</span>
              <span>{{Number(paymentObj.discountAmount).toFixed(2).split('.')[1]}}</span>  
            </span>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"paymentInfo",
  data(){
    return{
      paymentObj:{}
    }
  },
  props:{
    dataObj:Object
  },
  mounted(){
    this.paymentObj = this.dataObj;
    // this.paymentObj = this.dataObj.paymentInfo;
  },
  methods:{
    
  }
}
</script>

<style lang="less" scoped>
.payment_info{
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
}
</style>