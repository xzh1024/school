<template>
  <div class=" photos_check">
    <div class="card2">
      <div class="title flex_r">
        <span>检查照片</span>
        <i :class="['iconfont', 'size_14',
          photosShow?'icon-direction_up' :'icon-direction_down']"
          @click="openProFn('photosShow')"></i>
      </div>
      <div class="content" v-show="photosShow">
        <template v-for="(item,index) in imgFileList">
          <div class="img_box" :key="index" @click="previewImg(index)">
            <!-- <img :src="item" alt="" > -->
            <img :src="item.url" alt="" >
          </div>
        </template>

       
      </div>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import { ImagePreview } from "vant";
Vue.use(ImagePreview);
export default {
  name:"PhotosCheck",
  data(){
    return{
      photosShow:true,//其他费用

    }
  },
  props:{
    imgFileList:Array
  },
  methods:{
    openProFn(name){
      this[name] = !this[name];
    },
    previewImg(index){
      let images = this.imgFileList.map(item => item.url);
      ImagePreview({
        images: images,
        startPosition: index,
      });
    }
  }
}
</script>

<style lang="less" scoped>
.photos_check{
  .card2{
    margin: 8px 12px;
    border-radius: 8px;
    background-color: #ffffff;
    padding:12px;
    color:#333333;
    text-align: left;
    font-size: 14px;
    .title{
      height: 22px;
      font-size: 16px;
      color: #333333;
      line-height: 22px;
      font-weight: 500;
      i{
        margin-left: 4px;
      }
      .num{
        font-size: 14px;
        font-weight: 400;
      }
    }
    .content{
      .img_box{
        margin: 8px 0;
        width: 100%;
        height: 226px;
        border: 1px solid #979797;
        img{
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
    .border_btm{
      border-bottom: 1px solid  #E6E6E6;
    }
    .border{
      border: 1px solid #999999;
      border-radius: 4px;
    }
    .foot{
      margin-top: 12px;
      justify-content: space-between;
      .c_btn{
        width: auto;
      }
    }
  }
  .flex_r{
    display: flex;
    align-items: center;
  }
  .mgn_t_b_8{
    margin:8px 0;
  }
  .color_9{
    color: #999999;
  }
  .size_13{
    font-size: 13px;
  }
}
</style>