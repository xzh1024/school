<!--搜索历史-->
<template>
  <div class="search">
    <!--页头-->
    <div class="header border_eee">
      <!--返回图标-->
      <i class="icon_left_black" @click="$router.go(-1);"></i>
      <div class="search_box">
        <input type="text" placeholder="请输入搜索内容" autofocus v-model="message" v-on:input="gameSearchList" v-on:blur="hideSearchList" ref="search" />
        <i class="icon_clear" v-show="message" @click="clearMessage"></i>
      </div>
      <!--搜索图标-->
      <i class="icon_soso2" @click="searchAdd"></i>
    </div>
    <div class="search_list" v-show="length">
      <div class="search_list_li" v-for="v in searchList" v-on:click="messageGameName(v.gamename)">
        <i class="icon_soso"></i>
        <span v-html="v.name"></span>
      </div>
    </div>
    <div class="search_main">
      <keep-alive>	<!--缓存组件-->
        <component :is="component_name" :searchArray="searchArray" :searchList="list" :Message.sync="message"></component>
      </keep-alive>
    </div>
  </div>

</template>

<script>
  import { Toast } from 'mint-ui';
  import SearchHistory from './searchhistory/searchHistory.vue'
  import SearchList from './searchlist/searchList.vue'
  export default {
    name: 'no_keep',
    data() {
      return {
        component_name:'SearchHistory',
        message:'',//搜索关键字
        searchArray:[],//搜索历史
        searchList:[],//游戏名称列表
        list:[],//游戏列表
        length:''
      }
    },
    components: { SearchHistory, SearchList },
    created() {
        this.message = this.$route.params.topgame;
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
          message: msg,
          duration: 2000,
          className: 'm_toast'
        });
      },
      clearMessage(){
        this.message = '';
        this.gameSearchList();
      },
      clearSearch(){//清除搜索历史
        this.searchArray = [];
        localStorage.removeItem('searchArray');
      },
      messageGameName(name){
        this.message = name;
//        this.gameSearchList();
//        this.$refs.search.focus();
//        this.length = 0;
      },
      searchAdd(){
        if(this.message){
//          this.list = this.searchList;
//          this.$refs.search.focus();
//          this.length = 0;
//          this.searchArray.unshift(this.message);
//          localStorage.setItem("searchArray",JSON.stringify(this.searchArray));
//          this.component_name = 'SearchList';

          this.$http.get("/www/api-game-gameSearchList", {
            params: {
              channel : this.myType.channel,
              system : this.myType.system,
              keyword : this.message
            }
          })
            .then(response => {
              var datas = response.data;
              console.log(datas)
              if(datas.status == 0) {//返回的状态，0为成功
                let data = datas.data;
                for(let i=0,len=data.length; i < len; i++){
                  data[i].label = data[i].label.split(",");
                }
                this.list = data;
                this.$refs.search.focus();
                this.length = 0;
                this.searchArray.unshift(this.message);
                localStorage.setItem("searchArray",JSON.stringify(this.searchArray));
                this.component_name = 'SearchList';
              }
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        } else {
          this.toast('请输入搜索内容');
        }
      },
      gameSearchList(){
        if(this.message){
          this.$http.get("/www/api-game-gameSearchList", {
            params: {
              channel : this.myType.channel,
              system : this.myType.system,
              keyword : this.message
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 0) {//返回的状态，0为成功
                var data = datas.data;
                for(let i=0,len=data.length; i < len; i++){
                  data[i].name = data[i].gamename;
                  var name = data[i].gamename.toLocaleLowerCase();
                  var message = this.message.toLocaleLowerCase();
                  var indexResult = name.indexOf(message);
                  var messageLen = this.message.length;
                  data[i].name = data[i].name.replace(new RegExp(this.message,'ig'),'<em class="color_f89d19">' + data[i].name.substr(indexResult,messageLen) + '</em>');
                  data[i].label = data[i].label.split(",");
                }
                this.searchList = data;
                this.length = this.searchList.length;
              }
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        } else {
//          this.searchList.length = 0;
          this.length = 0;
          this.component_name = 'SearchHistory';
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
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .header{
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
        background-color: #fff;
        border-radius: .2rem;
        border: 1px solid #eeeeee;
        input{
          flex: 1;
          border: none;
          border-radius: .2rem;
          height: 2.2rem;
          padding-left: .5rem;
          letter-spacing: 0.05rem
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
      /*overflow-y: auto;*/
      /*background-color: #e1d8d9;*/
    }
  }
</style>
