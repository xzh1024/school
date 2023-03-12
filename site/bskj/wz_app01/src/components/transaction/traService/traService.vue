<!--任务中心-->
<template>
  <div class="service" v-on:scroll.passive="onScroll($event)">
    <!--页头-->
    <img class="head_bg" src="../../../static/img/c_icon_kefutu.png" alt="">
    <div class="head_box" ref="headBox" :style="{opacity:headBoxOpacity}"></div>
    <div class="head">
      <div class="head_left">
        <i v-bind:class="isLeftClass" @click="$router.go(-1);"></i>
      </div>
      <div class="head_center"></div>
      <div class="head_right"></div>
    </div>
    <div class="list">
      <!--<div class="one">-->
        <!--<div class="one_left">联系客服</div>-->
        <!--<div class="one_centre">-->
          <!--<p>QQ：2908397443</p>-->
        <!--</div>-->
        <!--<a class="one_right btn_blue_not" target="_blank" @click="openQQ()">戳我</a>-->
      <!--</div>-->
      <div class="one" v-for="v in data">
        <div class="one_left">联系客服</div>
        <div class="one_centre">
          <p>{{ v|F_qq }}</p>
        </div>
        <a class="one_right btn_blue_not" target="_blank" @click="openQQ(v)">戳我</a>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
//    name: 'no_keep',
    data: function () {
      return {
        data:[],
        headBoxHeight: 0,
        headBoxOpacity: 0,//背景透明度
        isLeftClass: 'icon_left_white',
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'traUserInfo'
      ]),
    },
    created() {
      this.getService();
    },
    mounted(){
      this.$nextTick(function () {
        this.headBoxHeight = this.$refs.headBox.offsetHeight;
      });
    },
    filters: {	//自定义局部过滤器
      F_qq: (qq) => {
        return qq ? 'QQ：' + qq : '';
      }
    },
    methods: {
      onScroll(e){
        var e = e || window.event;
        var target = e.target || e.srcElement;
        var scrollTop = target.scrollTop;
        if(scrollTop > 0){
          this.isLeftClass = 'icon_left_black';
          if(scrollTop < this.headBoxHeight){
            this.headBoxOpacity = scrollTop * (1 / this.headBoxHeight);
          }
        } else {
          this.isLeftClass = 'icon_left_white';
        }
      },
      //获取客服信息
      getService() {
        this.$http.get('/api/index.php?g=api&m=Products&a=customer')
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              this.data = datas.data;
              console.log(datas)
            } else if(datas.status == 0){//0失败
              console.log('status == 0 ：'+ datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      openQQ(qq) {
        let kefu101 = 'http://wpa.qq.com/msgrd?v=3&uin='+qq+'&site=oicqzone.com&menu=yes';
        let kefu102 = 'mqqwpa://im/chat?chat_type=wpa&uin='+qq+'&version=1&src_type=web&web_src=oicqzone.com';
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /(Android)/i.test(navigator.userAgent)) {
          window.open(kefu102);
        }else {
          window.open(kefu101);
        }
      }
    },
  }
</script>

<style scoped lang="less">
  .service{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    /*display: flex;*/
    /*flex-direction: column;*/
    overflow-y: auto;
    .head_bg{width: 100%;}
    .head_box{
      width: 100%;
      height: 3rem;
      background: #ffffff;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      /*opacity: 0;*/
    }
    .head{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 11;
    }
    .list{
      .one{
        height: 3.8rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eeeeee;
        padding: 0 .7rem;
        .one_left{
          height: 1.8rem;
          line-height: 1.8rem;
          padding: 0 .6rem;
          color: #ffffff;
          background-color: #29a1f7;
          border-radius: .5rem;
          margin-right: .5rem;
        }
        .one_centre{
          flex: 1;
          p{
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
