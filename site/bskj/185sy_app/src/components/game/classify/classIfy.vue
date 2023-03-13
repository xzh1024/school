<template> <!--分类-->
  <!--<transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">-->
  <div class="classIfy">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        分类
      </div>
      <div class="head_right"></div>
    </div>
    <!--搜索框-->
    <div class="search_box">
      <div class="soso_bg" @click="$router.push({path:'/search/'+1+'/'+topgame});">
        <i class="icon_sousuo"></i>
        <p class="soso_input color_999999">{{ topgame }}</p>
      </div>
    </div>
    <div class="classIfy_main">
      <div class="class_list border_eee">
        <div class="c_game_info" v-for="v in data.class" @click="rtClassInfo(v.id, v.name)">
          <img v-lazy="myType.domainName + v.logo" alt="" class="c_logo">
          <span class="c_name">{{ v.name }}</span>
        </div>
      </div>
      <div class="border_eee" v-for="item in data.classData" v-if="item.list.length">
        <div class="l_title">
          <div class="l_title_name">{{ item.className }}</div>
          <div class="l_title_more color_636363" @click="rtClassInfo(item.list[0].tid, item.className)">更多<i class="icon_right_black"></i></div>
        </div>
        <div class="l_game">
          <div class="l_game_info" v-for="v in item.list" @click="router(v.id)">
            <img v-lazy="myType.domainName + v.logo" alt="" class="l_logo">
            <span class="l_name small3 color_black">{{ v.gamename }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--</transition>-->
</template>

<script>
  export default {
    name: 'no_keep',
    data: function () {
      return {
        data: [],
        topgame: '',
      }
    },
    mounted(){
      this.$nextTick(function () {
        this.loadMore();
        this.topgame = this.$route.params.topgame;
      })
    },
    methods: {
      router(id) {   //跳转路由,游戏详情
//        this.$router.push({path:'/game_info/'+id})
        this.$router.push({path: '/game_info', query: {
          id: id,
          type: this.$route.params.type,
          channel: this.myType.channel
        }});
      },
      rtClassInfo(id,name) {  //跳转路由,游戏分类详情
        this.$router.push({path:'/class_info/'+id+'/'+name+'/'+this.$route.params.type});
      },
      loadMore() {  //获取数据
        this.$http.get("/www/api-game-gameClass", {
          params: {
            channel : this.myType.channel,
            system : this.myType.system,
            platform: this.$route.params.type,  //游戏平台,1BT服，2折扣服
            page : 1
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 0){
              var data = datas.data;
              this.data = data;
            }
          }, error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .classIfy{
    width: 100%;
    overflow-x: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    /*搜索框*/
    .search_box{
      width: 100%;
      height: 3.2rem;
      display: flex;
      align-items: center;
      .soso_bg{
        flex: 1;
        height: 2.2rem;
        border-radius: .6rem;
        background-color: #f2f2f2;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 1.5rem;
        .soso_input{
          margin-left: .4rem;
        }
      }
    }
    .classIfy_main{
      width: 100%;
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      .class_list{
        display: flex;
        flex-wrap: wrap;
        padding-bottom: .6rem;
        .c_game_info{
          width: 25%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: .6rem;
          .c_logo{
            width: 3.4rem;
            height: 3.4rem;
            border-radius: 50%;
            /*background-color: #bdbdbb;*/
            margin-bottom: .4rem;
          }
          .c_name{
            width: 100%;
            white-space:nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
            text-align: center;
          }
        }
      }
    }
  }

</style>
