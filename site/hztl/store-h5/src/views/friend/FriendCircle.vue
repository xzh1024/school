<template>
    <div class="friendCircle">
        <div class="head-brand">
          <div class="head_box">
            <span class="head_title">实时动态</span>
            <img src="../../assets/publish.png" @click="issueFriendCircle()">
          </div>
            
        </div>
        <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
        >
            <div
                class="friend-circle-info"
                v-for="(item) in list"
                :key="item.time"
                style="width: 9.15rem; overflow: hidden; background: white; margin:0.43rem auto 0.27rem;border-radius: 0.16rem;"
            >
                <div class="friend-head">
                    <div class="head-img">
                        <img v-if="item.head" :src="item.head">
                        <img v-else src="../../assets/icon-pengyouquan.png">
                    </div>
                </div>
                <div class="name-content">
                    <p class="name">{{item.publisherName}}</p>
                    <p class="content-text" @click="toDetail($event,item)">{{item.content}}</p>
                    <div class="friend-img" v-if="item && item.pictures && item.pictures.length>0">
                        <img
                            v-for="(value,indexImg) in item.pictures"
                            :key="indexImg"
                            :src="value+'&imageView2/2/w/500/h/500'"
                            @click="imgPreview(item.pictures,indexImg)"
                        >
                    </div>
                    <span class="time-span">{{item.publishTime}}</span>
                </div>
            </div>
            <div v-if="list.length==0" class="nolist">暂无动态，点击右上角发布第一条动态～</div>
        </van-list>
        <TabbarComponentB />
        <DefaultPhone />
        <p id="text-line"></p>
    </div>
</template>

<script>
import Vue from "vue";
import DefaultPhone from "@/components/DefaultPhone/Icon";
import { Tabbar, TabbarItem, List, ImagePreview, Toast } from "vant";
import { finished } from "stream";
import TabbarComponentB from "../../../store-common/component/TabbarComponentB"
Vue.use(Tabbar)
  .use(TabbarItem)
  .use(List)
  .use(ImagePreview)
  .use(Toast);
import request from "@/request";

export default {
  name: "friendCircle",
  components: {
    DefaultPhone,
    TabbarComponentB
  },
  data() {
    return {
      list: [], //初始化的时候请求一次，请求20条
      loading: false,
      finished: false,
      error: false,
      homeActive: require("../../assets/parts-active.png"),
      homeInactive: require("../../assets/parts.png"),
      orderCircleActive: require("../../assets/order-active.png"),
      orderCircleInactive: require("../../assets/order.png"),
      mineActive: require("../../assets/mine-active.png"),
      mineInactive: require("../../assets/mine.png"),
      cartActive: require("../../assets/cart-active.png"),
      cartInactive: require("../../assets/cart.png"),
      page: 0,
      preview: {}
    };
  },
  mounted: function() {
    this.phoneDefault = localStorage.getItem("defaultPhone");
  },
  methods: {
    onLoad() {
      //这里去请求接口，然后push进去
      //请求失败直接报错？
      this.page += 1;
      request({
        url: "/offiaccount/moments",
        params: {
          page: this.page
        }
      })
        .then(data => {
          if (
            data.rows &&
            data.rows != null &&
            data.rows.length > 0
          ) {
            for (let item of data.rows) {
              this.list.push(item);
            }
          } else {
            this.finished = true;
          }
          this.loading = false;
          if (this.page == data.totalPage) {
            this.finished = true;
          }
        })
        .catch(() => {
          this.finished = true;
          this.loading = false;
        });
    },
    imgPreview(imageList, index) {
      this.preview = ImagePreview({
        images: imageList,
        startPosition: index,
        onClose() {
          this.preview = {};
        },
        closeOnPopstate: true
      });
    },
    toDetail(e, item) {
      this.$router.push("/friendDetail?" + item.id);
      return
      let target = e.target;
      let textLine = $("#text-line");
      //清空用以对比的p的内容，并重新注入宽度，再注入内容
      textLine
        .html("")
        .width($(target).width())
        .html($(target).html());
      //判断用以对比的p标签的行数
      let rowNum = Math.round(
        textLine.height() / parseFloat(textLine.css("line-height"))
      );
      //大于7行时进入详情页面
      if (rowNum > 7) {
        this.$router.push("/friendDetail?" + item.id);
      }
    },
    issueFriendCircle() {
      if(!Vue.prototype.hasCookie){
        if (this.axios.prototype.isH5) {
          this.$router.push("/passwordLogin");
        } else {
          localStorage.setItem("remenberUrl", location.href.split(".com")[1]);
          this.$router.push("/login");
        }
      }else{
          this.$router.push("/issueFriendCircle");
      }
    }
  }
};
</script>

<style scoped lang="less">
.friendCircle {
  min-height: calc( 100vh - 102px) ;
  background: #f8f8f8;
  overflow: hidden;
  padding-bottom: 49px; //这一行样式是为了让内容部分超出底部的tabbar
  padding-top: 44px;
  .head-brand {
    background-image: url("../../assets/head-bac.png");
    background-size: 100% 100%;
    height: 44px;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1;
    .head_box{
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .head_title{
      font-size: 16px;
      font-weight: 500;
      line-height: 44px;
      flex: 0.9;
    }
    img {
      float: right;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin: 0 16px 0 0;
    }
  }
  .nolist{
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #171c24;
    margin: 0.43rem auto 0.27rem;
  }
  .friend-circle-info {
    .friend-head {
      float: left;
      margin: 10px 10px 0 16px;
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
    }
    .name-content {
      float: left;
      width: 269px;
      .name {
        font-family: PingFangSC-Semibold;
        margin: 15px 0 0 0;
        text-align: left;
        font-size: 16px;
        color: #647891;
        letter-spacing: 0;
        font-weight: 500;
      }
      .content-text {
        font-family: PingFang-SC-Regular;
        text-align: left;
        text-overflow: ellipsis; // 超出部分用'...'代替
        -webkit-line-clamp: 7; // 限制显示的行数
        display: -webkit-box; // 弹性盒子模型
        -webkit-box-orient: vertical; // 盒子模型子元素竖直排列
        overflow: hidden;
        font-size: 14px;
        color: #171c24;
        letter-spacing: 0;
        line-height: 22px;
        margin-top: 5px;
      }
      .friend-img {
        overflow: hidden;
        img {
          float: left;
          width: 80px;
          height: 80px;
          margin: 0 4px 4px 0;
        }
      }
      .time-span {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #aaacb7;
        letter-spacing: 0;
        float: left;
        margin: 15px 0 10px 0;
      }
    }
  }
}
/deep/ .bottom-bac {
  height: 51px;
  background-image: url("../../assets/tabbar_bottom.png");
  background-size: 100% 100%;
  bottom: -1px;
}
#text-line {
  visibility: hidden;
  position: absolute;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 22px;
}
</style>
