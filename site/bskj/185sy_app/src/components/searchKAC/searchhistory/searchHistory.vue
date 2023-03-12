<!--搜索历史-->
<template>
  <div class="searchHistory" ref="productImage">
    <div class="main">
      <div class="search_history">
        <div class="search_title border_d5cfcf">搜索历史</div>
        <div class="search_history_list color_aaa">
          <p class="search_history_li border_d5cfcf" v-on:click="$parent.clearSearch">
            <i class="icon_delete"></i>
            <span class="search_history_txt">清除搜索记录</span>
          </p>
          <p class="search_history_li border_d5cfcf" v-for="v in searchArray" @click="getMessage(v)">
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
      getMessage(v){
        this.$emit('update:Search',v);
        this.$parent.gameSearchList(1);
      }
    },
    mounted(){
      this.$nextTick(function () {

      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .searchHistory{
    flex: 1;
    display: flex;
    flex-direction: column;
    .main{
      flex: 1;
      overflow-y: auto;
      background-color: #e1d8d9;
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
