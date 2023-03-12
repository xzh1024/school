<template>
  <div class="parts_material">
    <div class="item_pro">
      <div class="item_pro_title">
        <div class="item_pro_l">
          <div class="name">配件材料</div>
          <div class="number">（{{dataObj.rows&&dataObj.rows.length?dataObj.rows.length:0}}）</div>
          <img :class="[partsMaterialShow?'icon_top':'icon_bottom']" 
            src="@/assets/maintenance/下黑色@3x.png" alt=""
            @click="openProFn('partsMaterialShow')">
        </div>
        <div class="item_pro_r">
          <span >小计：</span>
          <span class="f_fee">¥
            <span class="fee_0">{{Number(dataObj.totalAmount).toFixed(2).split('.')[0]}}.</span>
            <span>{{Number(dataObj.totalAmount).toFixed(2).split('.')[1]}}</span>  
          </span>
        </div>
      </div>
      <div class="item_pro_body" v-show="partsMaterialShow">
        <template v-for="(item,index) in dataObj.rows">
          <div :key="index" class="item_pro_flex item_margin">
            <div>
              <div class="parts">
                <span>{{item.name}}</span>
                <span v-if="item.feeProperty">（{{item.feeProperty}}）</span>
                <span>{{`${item.discountRate}折`}}</span>
              </div>
              <!-- <div class="parts">
                <span>{{item.pinpai}}</span>
                <span class="line"></span>
                <span>{{item.code}}</span>
                <span class="line"></span>
                <span>{{item.adress}}</span>
                <span class="line"></span>
                <span>{{item.mode}}</span>
              </div> -->
            </div>
            <div >
              <span :class="['f_fee',item.feeProperty=='self'?'':'line_th']">¥
                <span class="fee_0">{{Number(item.amount).toFixed(2).split('.')[0]}}.</span>
                <span>{{Number(item.amount).toFixed(2).split('.')[1]}}</span>  
              </span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"partsMaterial",
  data(){
    return{
      partsMaterialShow:true,//配件材料
    }
  },
  props:{
    dataObj:Object
  },
  mounted(){

  },
  methods:{
    openProFn(name){
      this[name] = !this[name];
    }
  }
}
</script>

<style lang="less" scoped>
.parts_material{
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