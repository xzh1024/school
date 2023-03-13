<template>
  <div class="service_pro">
    <div class="item_pro">
      <div class="item_pro_title">
        <div class="item_pro_l">
          <div class="name">
            {{serviceName}}
          </div>
          <div class="number">（{{dataObj.rows&&dataObj.rows.length?dataObj.rows.length:0}}）</div>
          <img :class="[serviceProShow?'icon_top':'icon_bottom']" 
            src="@/assets/maintenance/下黑色@3x.png" alt=""
            @click="openProFn('serviceProShow')">
        </div>
        <div class="item_pro_r" v-if="serviceName !=='建议项目'">
          <span >小计：</span>
          <span class="f_fee">¥
            <span class="fee_0">{{Number(dataObj.totalAmount?dataObj.totalAmount:0).toFixed(2).split('.')[0]}}.</span>
            <span>{{Number(dataObj.totalAmount?dataObj.totalAmount:0).toFixed(2).split('.')[1]}}</span>  
          </span>
        </div>
      </div>
      <div class="item_pro_body" v-show="serviceProShow">
        <template v-if="serviceName !=='建议项目'&&dataObj&&dataObj.rows&&dataObj.rows.length">
          <div v-for="(item,index) in dataObj.rows"
          :key="index" class="item_pro_flex item_margin">
            <div >
              <span class="margin_r">{{item.name}}</span>
              <span>{{renderFeeProp(item)}}</span>
              <!-- <span>{{item.feeProperty=='self'?`${item.discountRate}折`:item.feeProperty}}</span> -->
            </div>
            <div >
              <span :class="['f_fee',item.feeProperty=='self'?'':'line_th']">¥
                <span class="fee_0">{{Number(item.amount).toFixed(2).split('.')[0]}}.</span>
                <span>{{Number(item.amount).toFixed(2).split('.')[1]}}</span>  
              </span>
            </div>
          </div>
        </template>
        <template v-else>
          <div v-for="(item,index) in dataObj.rows"
          :key="index" class="sug_item item_margin">
              <div class="sug_name">{{item.name}}</div>
              <div class="sug_remark" v-if="item.remark">{{item.remark}}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"ServicePro",
  data(){
    return{
      serviceProShow:true
    }
  },
  props:{
    dataObj:Object,
    serviceName:String
  },
  mounted(){

  },
  methods:{
    openProFn(name){
      this[name] = !this[name];
    },
    renderFeeProp(item){
      let str = '';
      if(item.feeProperty=='self'){
        str = item.discountRate?`${Number(item.discountRate)*10}折`:'';
      }else if(item.feeProperty=='paid'){
        str = `已购`;
      }else if(item.feeProperty=='free'){
        str = `免费`;
      }else if(item.feeProperty=='guarantee'){
        str = `保修`;
      }else if(item.feeProperty=='rework'){
        str = `返修`;
      }else if(item.feeProperty=='insurance'){
        str = `保险`;
      }
      return str;
    }
  }
}
</script>

<style lang="less" scoped>
.service_pro{
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
      .sug_item{
        .sug_name{
          font-size: 13px;
          color: #666666;
          font-weight: 500;
        }
        .sug_remark{
          color: #999999;
          font-weight: 400;
        }
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
  .margin_r{
    margin-right: 8px;
  }
  
}
</style>