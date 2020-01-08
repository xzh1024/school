<!--搜索历史-->
<template>
  <div class="searchHistory" ref="productImage">
    <div class="main">
      <div class="hot_search">
        <div class="search_title">热门搜索</div>
        <div class="l_game">
          <p class="l_game_info" v-for="v in list_logo" @click="$router.push({path: '/game_info/' + v.id + '/'+ $route.params.type})">
            <img class="l_logo" v-lazy="myType.domainName + v.logo" alt="">
            <span class="l_name color_636363">{{ v.gamename }}</span>
          </p>
        </div>
        <div class="game_name">
          <span class="color_blue" v-for="v in list_txt" @click="router(v.id)">{{ v.gamename }}</span>
        </div>
      </div>
      <div class="search_history">
        <div class="search_title">搜索历史</div>
        <div class="search_history_list color_aaa">
          <p class="search_history_li" v-on:click="$parent.clearSearch" v-if="searchArray.length">
            <i class="icon_delete"></i>
            <span class="search_history_txt">清除搜索记录</span>
          </p>
          <p class="search_history_li" v-for="v in searchArray" @click="getMessage(v)">
            <i class="icon_clock"></i>
            <span class="search_history_txt">{{ v }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message:'',
        list_logo:[],
        list_txt:[],
      }
    },
    props: {
      searchArray: {
        type: Array
      },
      Message: {
        type: String
      }
    },
    methods: {
      getHot() {//搜索下热门游戏接口
        this.$http.get("/www/api-game-hotGameSearch", {
          params: {
            channel : this.myType.channel,
            system : this.myType.system,
            platform : this.$route.params.type //游戏平台,1BT服，2折扣服
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 0) {//返回的状态，0为成功
              var data = datas.data;
              for(let i=0,len=data.length; i < len; i++){
                if(i < 4){
                  this.list_logo.push(data[i]);
                } else {
                  this.list_txt.push(data[i]);
                }
              }
            }
          }, error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          })
      },
      getMessage(v){
        this.$emit('update:Message',v);
        this.$parent.gameSearchList();
      }
    },
    mounted(){
      this.$nextTick(function () {
        this.getHot();
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .searchHistory{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .main{
      flex: 1;
      overflow-y: auto;
      /*background-color: #e1d8d9;*/
      .hot_search{
        .game_name{
          /*height: 3rem;*/
          /*line-height: 3rem;*/
          padding: 0 0.7rem;
          display: flex;
          align-items: center;
          overflow: hidden;
          span{
            display: inline-block;
            width: 6rem;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: .8rem;
            padding: 0.2rem;
            border: 1px solid #eeeeee;
            border-radius: .6rem;
          }
          /*& > span:nth-child(1){*/
            /*color: #894d8b;*/
          /*}*/
          /*& > span:nth-child(2){*/
            /*color: #d89431;*/
          /*}*/
          /*& > span:nth-child(3){*/
            /*color: #3a88da;*/
            /*margin-right: 0;*/
          /*}*/
        }
      }
      .search_history{
        .search_history_list{
          .search_history_li{
            height: 2.5rem;
            padding: 0 1rem;
            display: flex;
            align-items: center;
            .search_history_txt{
              margin-left: .8rem;
              flex: 1;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
      .search_title{
        font-size: 1.2rem;
        padding: .5rem 1rem;
      }
    }
  }
</style>
