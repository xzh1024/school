<template>
    <!--页头-->
    <div class="header">
      <div class="search_box">
        <div class="bg" @click="$router.push({path:'/search'});">
          <i class="icon_sousuo"></i>
          <p class="soso_input color_999999">搜索游戏</p>
        </div>
      </div>
    </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  /*input::-webkit-input-placeholder { color:#757575;} !* WebKit browsers *!*/
  /*input:-moz-placeholder { color:#757575;} !* Mozilla Firefox 4 to 18 *!*/
  /*input::-moz-placeholder { color:#757575;} !* Mozilla Firefox 19+ *!*/
  /*input:-ms-input-placeholder { color:#757575;} !* Internet Explorer 10+ *!*/
  /*页头*/
  .header{
    height: 3.2rem;
    display: flex;
    align-items: center;
    background-color: #fff;
    /*搜索框*/
    .search_box{
      display: flex;
      flex: 1;
      margin: 0 1.5rem;
      .bg{
        flex: 1;
        height: 2.2rem;
        border-radius: .6rem;
        background-color: #f2f2f2;
        display: flex;
        justify-content: center;
        align-items: center;
        .soso_input{
          margin-left: .4rem;
        }
      }
    }
  }
</style>
