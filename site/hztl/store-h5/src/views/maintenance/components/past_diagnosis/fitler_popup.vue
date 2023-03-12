<template>
  <van-popup
    class="filter-pop"
    v-model="showFilter"
    position="right"
    :style="{ width: '83%' }"
  >
    <div class="filter_box">
      <div class="filter-group">
        <div class="label">车牌号</div>
        <div class="content">
          <template v-if="plateNoList && plateNoList.length>0">
              <van-button
                  size="small"
                  round
                  v-for="(item, index) in plateNoList"
                  :key="index"
                  :class="['button',item.selected ? 'active' : '']"
                  @click="selectPlateFn(item)"
              >{{`【${item.vehBrand}】${item.plateNumber}`}}</van-button>
          </template>
          <p
              class="none-content"
              v-if="!plateNoList || plateNoList.length==0"
          >暂无可选车牌号</p>
        </div>
      </div>
      <div class="filter-group">
          <div class="label">选择到店日期</div>
          <div class="content">
              <div class="toShopDate" 
                @click="showTime = true">
                <span class="time">
                  {{filter.shopDate.startTime?filter.shopDate.startTime:'开始日期'}}
                </span>
                <span>至</span>
                <span class="time">
                  {{filter.shopDate.endTime?filter.shopDate.endTime:'结束日期'}}
                </span>
              </div>
              <van-calendar 
                v-model="showTime" 
                color="#FF6E4C"
                type="range" 
                :min-date="new Date('2020-01-01')"
                allow-same-day
                :max-date="new Date()"
                @confirm="onConfirm" />

              
          </div>
      </div>
    </div>
    <div class="operation">
      <van-button class="reset" round @click="filterReset">重置</van-button>
      <van-button class="confirm" round @click="filterConfirm">确认{{filter.plateNumberList.length?`（${filter.plateNumberList.length}）`:''}}</van-button>
    </div>
      
  </van-popup>
</template>

<script>
import Vue from "vue";
import request from "@/request";
import dayjs from "dayjs";
import { Calendar, Button, Popup } from "vant";
Vue.use(Calendar).use(Button).use(Popup);
export default {
  name:"filterPopup",
  data(){
    return{
      showFilter:false,
      showTime:false,
      plateNoList:[//车牌号
        {
          plateNumber:'川A·12531',
          "vehBrand": "奥迪",           //  # 汽车品牌
          "logo": "http://",          // # 品牌logo
          selected:false
        },
        {
          plateNumber:'川A·12532',
          "vehBrand": "奥迪",           //  # 汽车品牌
          "logo": "http://",          // # 品牌logo
          selected:false
        },
        {
          plateNumber:'川A·12533',
          "vehBrand": "奥斯顿马丁",           //  # 汽车品牌
          "logo": "http://",          // # 品牌logo
          selected:false
        },
      ],
      filter: {
        plateNumberList:[
          // '【奥迪】川A·12531',
          // {plateNumber:'【奥迪】川A·12531',selected:true},
        ],//车牌号
        shopDate:{
          startTime:'',//开始日期
          endTime:'',//结束日期
        },//到店日期
      },
      dateTime:[]
      
    }
  },
  props:{
    filterObj:Object,
    plateNumberList:Array,
    shopDate:Object,
  },
  watch:{
    plateNumberList(){
      this.onLoad();
    },
    shopDate(){
      this.onLoad();
    }
  },
  created(){
    this.getMyVehicles();
  },
  mounted(){
    this.onLoad();
  },
  methods:{
    getMyVehicles(){
      this.plateNoList = [];
      let url = '/customers/vehicles/my';
      request({url}).then(res =>{
        if(res){
          res.forEach(p =>{
            p.selected = false;
            this.plateNoList.push(p);
          })
        }
      }).catch(err =>{
        // console.log(err);
      })
    },
    onLoad(){
      this.filter = {
        plateNumberList:this.plateNumberList,
        shopDate:this.shopDate
      };
      this.plateNoList.forEach(k =>{
        k.selected = false;
      });
      
      for(let k of this.plateNoList){
        for(let p of this.filter.plateNumberList){
          if(k.plateNumber == p.plateNumber){
            k.selected = true;
          }
        }
      }
    },
    selectPlateFn(item){
      item.selected = !item.selected;
      this.filter.plateNumberList = [];
      this.plateNoList.forEach( p =>{
        if(p.selected){
          this.filter.plateNumberList.push(p);
          // this.filter.plateNumberList.push(p.plateNumber);
        }
      })
    },
    show(){
      this.showFilter = true;
    },
    close(){
      this.showFilter = false;
    },
    renderTime(date){
      return dayjs(date).format('YYYY-MM-DD');
    },
    onConfirm(date) {
      const [start, end] = date;
      this.dateTime = date;
      this.filter.shopDate.startTime = this.renderTime(start);
      this.filter.shopDate.endTime = this.renderTime(end);
      this.showTime = false;
    },
    filterReset() {
      let _this = this;
      _this.plateNoList.forEach(p =>{
        p.selected = false;
      })
      _this.filter = {
        plateNumberList:[],
        shopDate:{},
      };
    },
    filterConfirm() {
      let _this = this;
      _this.showFilter = false;

      _this.$emit('onFilter',_this.filter);
    },
  }
}
</script>

<style lang="less" scoped>
// 筛选弹出样式
  .filter-pop {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .filter_box{
      width: 100%;
      height: 93%;
      margin-bottom: 50px;
      overflow: auto;
      padding:20px 16px 0;
      box-sizing: border-box;
      .filter-group{
        margin-bottom: 20px;
        .label{
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          line-height: 22px;
          font-weight: 500;
          text-align: left;
        }
        .content{
          display: flex;
          // flex-direction: column;
          flex-wrap: wrap;
          // width: 100%;
          .button {
            margin:6px;
            padding: 8px 12px;
            // width:52%;
            height: 24px;
            font-size: 13px;
            background: #F4F4F4;
            border: none;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            /deep/.van-button__text{
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .button.active,
          .toShopDate.active{
            background-image: linear-gradient(224deg, #FFB12D 0%, #FF6E4C 100%);
            color: #fff;
            .time{
              color:#fff;
            }
          }
          .toShopDate{
            width: 100%;
            font-size: 14px;
            margin:6px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #F4F4F4;
            height: 36px;
            border-radius: 20px;
            padding: 8px 16px;
            box-sizing: border-box;
            .time{
              display: inline-block;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #999999;
              letter-spacing: 0;
              font-weight: 400;
            }
          }
        }
        .content_type{
          display: flex;
          justify-content: flex-start;
          width: 100%;
          align-items: center;
          flex-wrap: wrap;
        }
        .button {
          margin:6px 0;
          height: 24px;
          font-size: 13px;
          background: #F4F4F4;
          border: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          /deep/.van-button__text{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .button.active {
          background-image: linear-gradient(224deg, #FFB12D 0%, #FF6E4C 100%);
          color: #fff;
        }
        .btn_w{
          flex:30%;
        }
        .none-content {
          font-size: 14px;
          margin: 0;
        }
      }
    }
    
    .operation {
      height: 50px;
      width: 100%;
      background: #f2f2f2;
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .reset {
        background: #fff;
        border: 1px solid #999999;
        color: #666666;
        width: 133px;
        height: 36px;
        line-height: 36px;
        font-family: PingFangSC-Medium;
        font-size: 15px;
        font-weight: 400;
      }
      .confirm {
        background-image: linear-gradient(224deg, #FFB12D 0%, #FF6E4C 100%);
        color: #fff;
        width: 133px;
        height: 36px;
        line-height: 36px;
        font-family: PingFangSC-Medium;
        font-size: 15px;
        font-weight: 500;
      }
    }
  }
</style>