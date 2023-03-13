<template> <!--新游-预约-->
  <div class="reservation">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        预约游戏
      </div>
      <div class="head_right"></div>
    </div>
    <div class="reservation_main">
      <List :gameType="$route.params.type" :futureType="2"></List>
    </div>
  </div>
</template>

<script>
  import List from '../../../../list/listFuture.vue'
  export default {
    data: function () {
      return {

      }
    },
    components:{ List },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .reservation{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .reservation_main{
      /*width: 100%;*/
      flex: 1;
      display: flex;
      flex-direction: column;
      /*overflow-y: auto;*/
      /*overflow-x: hidden;*/
      /*display: flex;*/
      /*flex-direction: column;*/
    }
  }
</style>
