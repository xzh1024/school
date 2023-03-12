<template>
  <div class="pro_list_con">
    <!-- 配件品牌 -->
    <div v-if="data.setting == 0">
      <div class="pro_list">
        <!-- <span class="icon"></span> -->
        <i class="iconfont icon-home_car"></i>
        <span class="list-item select">热门品牌</span>
      </div>
      <van-swipe class="my-swipe" :autoplay="0">
        <van-swipe-item
          class="pro_list_con-1"
          v-for="(brands,index) in brandList"
          :key="String(index) + brands.length"
        >
          <div
            class="con-item"
            v-for="(item,index) in brands"
            @click="brandSku(item.brand)"
            :key="index"
          >
            <div class="item-img">
              <img v-if="item.picture" :src="item.picture" alt="">
              <div v-else class="product-img" ></div>
            </div>
            <div class="item-name">{{item.brand}}</div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 配件分类 -->
    <div v-else-if="data.setting == 1">
      <div class="pro_list">
        <span class="icon"></span>
        <span class="list-item select">配件分类</span>
      </div>
      <van-swipe class="my-swipe" :autoplay="0">
        <van-swipe-item
          class="pro_list_con-1"
          v-for="(category,index) in categoryList"
          :key="String(index) + category.length"
        >
          <!-- <div class="item-name">{{category}}</div> -->
          <div
            class="con-item"
            v-for="(item,index) in category"
            @click="categorySku(item)"
            :key="index"
          >
            <!-- <div class="item-img">
              <img v-if="item.picture" :src="item.picture" alt="">
              <div v-else class="product-img" ></div>
            </div> -->
            <div class="item-name">{{item}}</div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 自定义 -->
    <div v-else>
      <div v-if="data.areas">
        <div class="pro_list">
          <span class="icon"></span>
          <span
            :class="{'list-item':true,'select':index===currentIndex}"
            @click="currentIndex=index"
            v-for="(item,index) in data.areas"
            :key="index"
          >{{item.name}}</span>
        </div>
        <van-swipe class="my-swipe" :autoplay="0">
          <van-swipe-item
            class="pro_list_con-1"
            v-for="(showDetail,index) in data.areas[currentIndex].showDetails"
            :key="String(index) + showDetail.length"
          >
            <div
              class="con-item"
              @click="areaToSkuList(item.name, item.id)"
              v-for="(item,index) in showDetail"
              :key="index"
            >
              <div class="item-img">
                <img v-if="item.picture||item.showUrl" :src="item.showUrl||item.picture" alt="">
                <div class="product-img" v-else></div>
              </div>
              <div class="item-name">{{item.name}}</div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <ClientApplyDialog ref="clientApplyDialog"></ClientApplyDialog>
  </div>
</template>
<script>
import request, { URL_MODULE } from "@/request";
import Vue from "vue";
import ClientApplyDialog from "@/components/dialog/clientApplyDialog.vue";
import { Swipe, SwipeItem, Lazyload } from "vant";
Vue.use(Swipe)
  .use(SwipeItem)
  .use(Lazyload);
export default {
  name: "pro_list_con",
  components: { ClientApplyDialog },
  data() {
    return {
      brandList: [],//配件品牌
      categoryList:[
        // "分类1","分类2","分类3","分类4","分类5",
      ],//配件分类
      currentIndex: 0
    };
  },
  props: {
    data: Object
  },
  created() {
    this.init();
  },
  watch:{
    data(){
      this.init();
    }
  },
  methods: {
    init(){
      // if (this.data.default) {
      if (this.data.setting == 0) {
        request({
          baseURL: URL_MODULE.united,
          url: "/company-skus/brands"
        }).then(
          res => {
            let List = res?res:[];
            this.brandList = this.splitDetails(List);
          }
        );
      } else if (this.data.setting == 1) {
        let obj= {
          field:'swCategory'
        }
        request({
          baseURL: URL_MODULE.united,
          url: "/company-skus/field-value",
          params: obj
        }).then(
          res => {
            let List = res?res:[];
            this.categoryList = this.splitDetails(List);
          }
        );
      } else {
        if(!this.data.areas){
          setTimeout(()=>{
            let proList = document.querySelector('.pro_list_con');
            proList.style.display = 'none';
          },500)
          
          return
        }
        this.data.areas.forEach(area => {
          if (area.details.length > 10) {
            area.showDetails = this.splitDetails(area.details);
          } else {
            area.showDetails = [area.details];
          }
        });
      }
    },
    areaToSkuList(title, partIds) {
      this.$refs.clientApplyDialog.checkState(() => {
        this.$router.push({
          name: `SkuListByArea`,
          query: { id: partIds, type: 0 }
        });
      });
    },
    splitDetails(details) {
      let splitedDetais = [];
      let splitTimes = Math.ceil(details.length / 10);
      for (let i = 0; i < splitTimes; i++) {
        splitedDetais.push(details.splice(0, 10));
      }
      return splitedDetais;
    },
    toSkuList(querys) {
      this.$router.push({
        name: `skuList`,
        query: querys
      });
    },
    brandSku(brand) {
      this.$refs.clientApplyDialog.checkState(() => {
        this.toSkuList({
          searchType: "brands",
          brands: brand,
          priceGreaterThanZero: true
        });
      });
    },
    categorySku(item){//配件类别
      this.$refs.clientApplyDialog.checkState(() => {
        this.toSkuList({
          swCategory: item,
          priceGreaterThanZero: true
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.pro_list_con {
  background-color: #ffffff;
  // margin: 8px 12px 0 12px;
  border-radius: 10px;
  padding: 7px 9px;
  text-align: left;
  .pro_list {
    margin-bottom: 9px;
    line-height: 30px;
    overflow-y: auto;
    // height: 30px;
    width: 100%;
    white-space: nowrap;
    // .icon {
    //   content: url("../../assets/store/icon-car.png");
    //   width: 16px;
    //   margin-right: 5px;
    //   vertical-align: -2px;
    // }
    .iconfont {
      font-size: 16px;
      color: #FF6E4C;
    }
    .list-item {
      margin-right: 35px;
      font-size: 16px;
      cursor: pointer;
      &.select {
        color: #FF6E4C;
        font-weight: bold;
        margin-left: 5px;
      }
    }
  }
  .pro_list_con-1 {
    padding: 8px 0;
    display: flex;
    flex-wrap: wrap;
    .con-item {
      background-color: #ffffff;
      border-radius: 4px;
      width: 60px;
      margin-bottom: 9px;
      &:not(:nth-child(5n)) {
        margin-right: 8px;
      }
      .item-img {
        width: 100%;
        height: 60px;
        img{
          width: 100%;
          height: 100%;
        }
        .product-img {
          width: 100%;
          height: 100%;
          background: url("../../assets/store/icon-not-upload-s.png") no-repeat
            center;
          background-size: 100% 100%;
          display: block;
        }
        .list-item{
            margin-right: 35px;
            font-size: 16px;
            cursor: pointer;
            &.select{
                color:#FF6E4C;
                font-weight: bold;
                margin-left: 5px;
            }
        }
        
    }
    .item-name {
      text-align: center;
      font-size: 13px;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .pro_list_con-1{
        padding: 8px 0;
        display: flex;
        flex-wrap: wrap;
        .con-item{
            background-color: #ffffff;
            border-radius: 4px;
            width: 60px;
            margin-bottom: 9px;
            &:not(:nth-child(5n)){
                margin-right: 8px;
            }
            .item-img{
                width: 100%;
                height: 60px;
                img,.product-img{
                    width: 100%;
                    height: 100%;
                    background: url('../../assets/store/icon-not-upload-s.png') no-repeat center;
                    background-size: 100% 100%;
                    display: block;
                }
            }
            .item-name{
                text-align: center;
                font-size: 13px;
                line-height: 40px;
                height: 40px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
      }
      
    }
  }
}
</style>


