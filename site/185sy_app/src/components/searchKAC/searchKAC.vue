<!--搜索历史-->
<template>
  <div class="search">
    <!--页头-->
    <div class="header bg_color_head">
      <!--返回图标-->
      <i class="icon_left_search" @click="goRouter"></i>
      <div class="search_box">
        <input type="text" placeholder="请输入搜索内容" autofocus v-model="search" v-on:input="gameSearchList" v-on:blur="hideSearchList" ref="search" />
        <i class="icon_clear" v-show="search" @click="clearMessage"></i>
      </div>
      <!--搜索图标-->
      <i class="icon_soso2" @click="searchAdd"></i>
    </div>
    <div class="search_list" v-show="length">
      <div class="search_list_li" v-for="v in searchList" v-on:click="searchpack_name(v.pack_name)">
        <i class="icon_soso"></i>
        <span v-html="v.name"></span>
      </div>
    </div>
    <div class="search_main">
      <keep-alive>	<!--缓存组件-->
        <component :is="component_name" :searchArray="searchArray" :searchList="list" :Search.sync="search"></component>
      </keep-alive>
    </div>
  </div>

</template>

<script>
  import { Toast } from 'mint-ui';
  import SearchHistory from './searchhistory/searchHistory.vue'
  import SearchList from './searchlist/searchList.vue'
  export default {
//    name: 'no_keep',
    data() {
      return {
        component_name:'SearchHistory',
        search:'',//搜索关键字
        searchArray:[],//搜索历史
        searchList:[],//游戏名称列表
        list:[],//游戏列表
        length:''
      }
    },
    components: { SearchHistory, SearchList },
    methods: {
      toast () {
        Toast({
          message: '请输入搜索关键字',
          duration: 3000,
          className: 'm_toast'
        });
      },
      goRouter(){//返回上一个页面
        this.$router.go(-1);
      },
      hideSearchList(){//失去焦点时隐藏搜索提示列表
        this.length = 0;
      },
      clearMessage(){//clearsearch
        this.search = '';
        this.gameSearchList();
      },
      clearSearch(){//清除搜索历史
        this.searchArray = [];
        localStorage.removeItem('searchArray');
      },
      searchpack_name(name){//searchpack_name
        this.search = name;
        this.gameSearchList();
        this.$refs.search.focus();
      },
      searchAdd(){
        if(this.search){
          this.list = this.searchList;
          this.$refs.search.focus();
          this.length = 0;
          this.searchArray.unshift(this.search);
          localStorage.setItem("searchArray",JSON.stringify(this.searchArray));
          this.component_name = 'SearchList';
          if(this.searchList.length > 0){

          }
        } else {
          this.toast();
        }
      },
      gameSearchList(isSearchAdd){
        if(this.search){
          this.$http.get("/www/api-packs-get_list", {
            params: {
              channel_id : this.myType.channel,
              search : this.search,
              terminal_type : 1
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 0) {//返回的状态，0为成功
                var list = datas.data.list;
                for(let i=0,len=list.length; i < len; i++){
                  list[i].name = list[i].pack_name;
                  var name = list[i].pack_name.toLocaleLowerCase();
                  var search = this.search.toLocaleLowerCase();
                  var indexResult = name.indexOf(search);
                  var searchLen = this.search.length;
                  list[i].name = list[i].pack_name.replace(new RegExp(this.search,'ig'),'<em class="color_f89d19">' + list[i].pack_name.substr(indexResult,searchLen) + '</em>');

                  var pack_counts =  Number(list[i].pack_counts);
                  var pack_used_counts = Number(list[i].pack_used_counts);
                  if(pack_counts == 0){
                    list[i].pack_remnant = 0;
                  } else {
                    list[i].pack_remnant = Math.ceil((pack_counts - pack_used_counts) / pack_counts * 100 );//剩余礼包
                  }
                }
                this.searchList = list;
                this.length = this.searchList.length;
                if(isSearchAdd == 1){
                  this.searchAdd();
                }
              }
              if(datas.status == 1) {//失败
                console.log('请求失败：' + datas.status);
              }
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        } else {
          this.length = 0;
          this.component_name = 'SearchHistory';
        }
      }
    },
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  input::-webkit-input-placeholder { color:#757575;} /* WebKit browsers */
  input:-moz-placeholder { color:#757575;} /* Mozilla Firefox 4 to 18 */
  input::-moz-placeholder { color:#757575;} /* Mozilla Firefox 19+ */
  input:-ms-input-placeholder { color:#757575;} /* Internet Explorer 10+ */
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
      /*搜索框*/
      .search_box{
        flex: 1;
        display: flex;
        align-items: center;
        background-color: #fff;
        border-radius: .2rem;
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
      overflow-y: auto;
      background-color: #e1d8d9;
      .hot_search{
        .game_name{
          padding: .7rem;
          display: flex;
          align-items: center;
          span{
            padding: .3rem .4rem;
            margin-right: .7rem;
            background-color: #fff;
            border-radius: .2rem;
          }
          & > span:nth-child(1){
            color: #894d8b;
          }
          & > span:nth-child(2){
            color: #d89431;
          }
          & > span:nth-child(3){
            color: #3a88da;
          }
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
