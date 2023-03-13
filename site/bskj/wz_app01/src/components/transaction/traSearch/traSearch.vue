<!--搜索历史-->
<template>
  <div class="search">
    <!--页头-->
    <div class="header">
      <!--返回图标-->
      <i class="icon_left_black" @click="$parent.searchFlag = false"></i>
      <div class="search_box">
        <i class="icon_soso"></i>
        <input type="text" placeholder="请输入游戏名" autofocus v-model="gamename" v-on:input="getGoodsNameList" v-on:blur="hideSearchList" ref="search" />
        <i class="icon_clear" v-show="gamename" @click="this.gamename = '';"></i>
      </div>
      <span @click="getGoodsList" style="margin: 0 .8rem 0 1rem;" class="f_s2 color_black">搜索</span>
    </div>
    <div class="search_list" v-show="length">
      <div class="search_list_li" v-for="v in nameList" v-on:click="setGameName(v.gamename)">
        <i class="icon_soso"></i>
        <span v-html="v.name"></span>
      </div>
    </div>
    <div class="search_main">
      <!--<div class="one">-->
        <!--<i class="icon_clock"></i>-->
        <!--<span class="one_name">像素小精灵</span>-->
        <!--<span class="one_type">BT手游</span>-->
      <!--</div>-->
      <div class="one" v-for="v in list" @click="getGmag(v.gamename)">
        <i class="icon_clock"></i>
        <span class="one_name">{{ v.gamename }}</span>
        <span class="one_type">BT手游</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
//    name: 'no_keep',
    data() {
      return {
        component_name:'SearchHistory',
        gamename:'',//搜索关键字
        searchArray:[],//搜索历史
        nameList:[],//游戏名称列表
        list:[],//游戏列表
        length: 0,
      }
    },
//    components: { SearchHistory, SearchList },
    created() {

    },
    mounted(){
      this.$nextTick(function () {
        {
          let searchStr = localStorage.getItem("searchArray");
          //searchStr不为null就代表以前已经存储过了。
          if(searchStr != null){
            //保证数组与本地的数据是同步的，避免数据丢失。
            this.searchArray = JSON.parse(searchStr);
          }
        }
      });
    },
    methods: {
      toast (msg) {
        var msg = msg || '提示';
        Toast({
          message: msg,//messag
          duration: 2000,
          className: 'm_toast'
        });
      },
      setGameName(name){
        this.gamename = name;
      },
      getGmag(name){
        this.$parent.gamenameType(name);
        this.gamename = '';
        this.length = 0;
        this.list = [];
      },
      getGoodsNameList(){
        if(this.gamename) {
            console.log(this.gamename)
//          let url = this.jointUrl({
//            game_name: this.gamename,
//            system: '',
//            order: 1, //1 按时间排序 2 按价格排序
//            order_type: 1, //1 降序 2 升序
//            page: 1
//          });
//          let mySign = md5(url + this.myType.key1).toLowerCase();
//          let myUrl = this.jointUrl({
//            game_name: this.gamename,
//            system: '',
//            order: 1, //1 按时间排序 2 按价格排序
//            order_type: 1, //1 降序 2 升序
//            page: 1,
//            sign: mySign
//          });
//          this.$http.post('/api/index.php?g=api&m=Products&a=get_product_list',myUrl)
          this.$http.get("/www/api-game-gameSearchList", {
            params: {
              channel : this.myType.channel,
              system : this.myType.system,
              keyword : this.gamename
            }
          })
            .then(response => {
              var datas = response.data;
              console.log(datas)
              if(datas.status == 0){//0成功
                var data = datas.data;
                for(let i=0,len=data.length; i < len; i++){
                  data[i].name = data[i].gamename;
                  var name = data[i].gamename.toLocaleLowerCase();
                  var indexResult = name.indexOf(this.gamename.toLocaleLowerCase());
                  var gamenameLen = this.gamename.length;
                  data[i].name = data[i].name.replace(new RegExp(this.gamename,'ig'),'<em class="color_f89d19">' + data[i].name.substr(indexResult,gamenameLen) + '</em>');
                }
                this.nameList = data;
                this.length = this.nameList.length;
              } else if(datas.status == 1){//1失败
                console.log(datas.msg);
              }
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        }
      },
      getGoodsList(){
        if(this.gamename) {
          this.$http.get("/www/api-game-gameSearchList", {
            params: {
              channel : this.myType.channel,
              system : this.myType.system,
              keyword : this.gamename
            }
          })
            .then(response => {
              var datas = response.data;
              console.log(datas)
              if(datas.status == 0){//0成功
                var data = datas.data;
                for(let i=0,len=data.length; i < len; i++){
                  data[i].label = data[i].label.split(",");
                }
                this.list = data;
                this.length = 0;
              } else if(datas.status == 1){//1失败
                console.log(datas.msg);
              }
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        }
      },
      hideSearchList(){//失去焦点时隐藏搜索提示列表
        this.length = 0;
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  /*input::-webkit-input-placeholder { color:#757575;} !* WebKit browsers *!*/
  /*input:-moz-placeholder { color:#757575;} !* Mozilla Firefox 4 to 18 *!*/
  /*input::-moz-placeholder { color:#757575;} !* Mozilla Firefox 19+ *!*/
  /*input:-ms-input-placeholder { color:#757575;} !* Internet Explorer 10+ *!*/
  .search{
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .header{
      background-color: #ffffff;
      height: 3rem;
      display: flex;
      align-items: center;
      .icon_left_black{
        margin: 0 1rem;
      }
      /*搜索框*/
      .search_box{
        flex: 1;
        display: flex;
        align-items: center;
        border-radius: .2rem;
        border: 1px solid #eeeeee;
        background-color: #f2f2f2;
        input{
          flex: 1;
          border: none;
          border-radius: .2rem;
          height: 2.2rem;
          margin-left: .2rem;
          letter-spacing: 0.05rem;
          background-color: #f2f2f2;
        }
      }
    }
    .search_list{
      width: 100%;
      max-height: 100% - 6rem;
      background-color: #fff;
      padding: 0 2.6rem;
      position: fixed;
      top: 3rem;
      z-index: 10;
      overflow-x: hidden;
      overflow-y: auto;
      .search_list_li{
        height: 2.5rem;
        /*padding: 0 1rem;*/
        display: flex;
        align-items: center;
        .search_list_txt{
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .search_main{
      flex: 1;
      display: flex;
      flex-direction: column;
      .one{
        height: 3rem;
        padding: 0 .8rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ececec;
        overflow: hidden;
        .one_name{
          margin: 0 .6rem;
          color: #636363;
        }
        .one_type{
          height: 1.6rem;
          line-height: 1.6rem;
          border-radius: .8rem;
          padding: 0 .6rem;
          color: #ffffff;
          background-color: #ffa81d;
          font-size: .85rem;
        }
      }
    }
  }
</style>
