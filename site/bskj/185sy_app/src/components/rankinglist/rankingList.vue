<template> <!--排行榜-->
  <div class="ranking">
    <!--<Header></Header>-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">排行榜</div>
      <div class="head_right"></div>
    </div>
    <div class="ranking_list"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="3">
      <RankingList :list="list"></RankingList>
      <!--加载动画-->
      <div v-show="loadAnimation">
        <mt-spinner type="triple-bounce" color="#888" style="height: 3rem; line-height: 3rem; text-align: center"></mt-spinner>
      </div>
    </div>

    <MainTab :newTab="newTab"></MainTab>
  </div>
</template>

<script>
//  import Header from '../header/Header.vue'
  import RankingList from '../list/list.vue'
  export default {
    data: function () {
      return {
        newTab: 1,
        page: 1,
        list: [],
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        loadAnimation : false//标记加载动画,false为隐藏
      }
    },
    components:{ RankingList },
    methods: {
      router(id) {   //跳转路由
        this.$router.push({path:'game_info/'+id})
      },
      loadMore() {
        //排行榜接口
        if(this.status){
          this.loadAnimation = true;
          this.loading = true;
          this.$http.get("/www/api-game-gameType", {
            params: {
              page : this.page,
              channel : 185,
              system : this.myType.system,
              type : 3
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 0){
                if(datas.data.length){
                  let data = datas.data;
                  if(this.myType.system == 1){//1为Android
                    for(let i=0,len=data.length; i < len; i++) {
                      data[i].web_url = data[i].android_url;//下载地址
                      data[i].web_pack = data[i].android_pack;//包名
                      data[i].label = data[i].label.split(",");
                      this.list.push(data[i]);
                    }
                  }
                  if(this.myType.system == 2){//2为IOS
                    for(let i=0,len=data.length; i < len; i++) {
                      data[i].web_url = data[i].ios_url;
                      data[i].web_pack = data[i].ios_pack;
                      data[i].label = data[i].label.split(",");
                      this.list.push(data[i]);
                    }
                  }
                  this.page++;
                } else {
                  this.status = false;
                }
              }
              setTimeout(() => {//保证1s的动画效果
                this.loadAnimation = false;
                this.loading = false;
              },1000);
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        } else {
          this.loading = true;
        }
      }
    },
    mounted(){
      this.$nextTick(function () {
        this.loadMore();
      });
    }
  }
</script>

<style scoped lang="less">
  .ranking{
    flex: 1;
    display: flex;
    flex-direction: column;
    .ranking_list{
      flex: 1;
      overflow-y: auto;
    }
  }
</style>

