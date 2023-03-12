<template> <!--新游-->
  <div class="newGame">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        新游
      </div>
      <div class="head_right"></div>
    </div>
    <div class="newGameList"
         v-infinite-scroll="getNewGame"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="3">
      <div class="border_eee" v-if="closedBeta.length >0">
        <div class="l_title">
          <div class="l_title_name strong">内测：</div>
          <div class="l_title_more color_black" @click="$router.push({path:'/closed_beta'})">更多<i class="icon_right_black"></i></div>
        </div>
        <div class="l_box">
          <div class="l_game" :style="{width:closedBeta_width}">
            <div class="l_game_info" v-for="v in closedBeta" @click="router(v.id, v.operate)">
              <img v-lazy="myType.domainName + v.logo" class="l_logo">
              <span class="l_name small3 color_blue">{{ v.gamename }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="border_eee" v-if="reservation.length >0">
        <div class="l_title">
          <div class="l_title_name strong">预约：</div>
          <div class="l_title_more color_black" @click="$router.push({path:'/reservation'})">更多<i class="icon_right_black"></i></div>
        </div>
        <div class="l_box">
          <div class="l_game" :style="{width:reservation_width}">
            <div class="l_game_info" v-for="v in reservation" @click="router(v.id, v.operate)">
              <img v-lazy="myType.domainName + v.logo" class="l_logo">
              <span class="l_name small3 color_blue">{{ v.gamename }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="l_title" v-if="list.length">
        <div class="l_title_name strong">近期上架：</div>
      </div>
      <List :list="list" :type="$route.params.type"></List>
      <!--加载动画-->
      <div v-show="loading">
        <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
      </div>
    </div>
  </div>
</template>

<script>
  import List from '../../../list/list.vue'
  export default {
    name: 'no_keep',
    data: function () {
      return {
        page: 1,
        list: [],
        closedBeta: [], //内测
        reservation: [],  //预约
        closedBeta_width: '100%',
        reservation_width: '100%',
        status: true, //标记数据是否全部加载 true为继续
        loading: true,  //若为真，则无限滚动不会被触发
      }
    },
    components:{ List },
    created() {
//			this.$store.dispatch('getSuggestList');
      this.getNewGame();
    },
    mounted(){
      this.$nextTick(function () {
//        this.getNewGame();
      })
    },
    methods: {
      router(id, operate) {  //跳转路由
        this.$router.push({path:'/game_info/'+id+'/'+this.$route.params.type+'/'+operate})
      },
      getNewGame() {  //获取数据
        //新游接口
        if(this.status){
            console.log(this.page)
          this.loading = true;
          this.$http.get("/www/api-game-newGameType", {
            params: {
              page : this.page,
              channel : this.myType.channel,
              system : this.myType.system,
              platform: this.$route.params.type,  //游戏平台,1BT服，2折扣服
              type : 1  //1新游,2热门,3排行,4满V,5最低折扣
            }
          })
            .then(response => {
              var datas = response.data;
              console.log(datas)
              if(datas.status == 0){
                if(datas.data.list.length > 0){
                  var data = datas.data.list;
                  if(datas.data.closedBeta){
                    this.closedBeta = datas.data.closedBeta;  //内测
                    if(this.closedBeta.length > 4){
                      this.closedBeta_width = this.closedBeta.length * 25 + '%';
                    }
                  }
                  if(datas.data.reservation){
                    this.reservation = datas.data.reservation;  //预约
                    if(this.reservation.length > 4){
                      this.reservation_width = this.reservation.length * 25 + '%';
                    }
                  }
                  if(this.myType.system == 1){//1为Android
                    for(let i=0,len=data.length; i < len; i++) {
                      data[i].web_url = data[i].android_url;//下载地址
                      data[i].web_pack = data[i].android_pack;//包名
                      data[i].label = data[i].label.split(",");
                      data[i].addtime = this.myType.formatTimeD(data[i].addtime);
                      this.list.push(data[i]);
                    }
                  }
                  if(this.myType.system == 2){//2为IOS
                    for(let i=0,len=data.length; i < len; i++) {
                      data[i].web_url = data[i].ios_url;
                      data[i].web_pack = data[i].ios_pack;
                      data[i].label = data[i].label.split(",");
                      data[i].addtime = this.myType.formatTimeD(data[i].addtime);
                      this.list.push(data[i]);
                    }
                  }
                  console.log(this.list);
                  this.page++;
                } else {
                  this.status = false;//数据已全部加载，不在发送请求
                }
              }
              setTimeout(() => {//保证1s的动画效果
                this.loading = false;
              },1000);
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        }
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .newGame{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .newGameList{
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      ::-webkit-scrollbar { width: 0; height: 0;}
      .l_box{
        width: 100%;
        overflow-x: auto;
      }
      .sole_game{
        .sole_time{
          border-top: 3px solid #dcdcdc;
          border-bottom: 1px solid #dcdcdc;
          padding: .5rem 1.2rem;
        }
      }
    }

  }
</style>
