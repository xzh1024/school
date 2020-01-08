<template> <!--关注-->
  <div class="concern">
    <ListDrive :driveType="type" v-if="$store.getters.userInfo.id"></ListDrive>
    <div class="not" v-else>
      <img class="not_img" src="../../../static/img/31_icon_weidenglu.png">
      <div class="not_text f_s1 color_837f7e">
        您还未登录，请前往个人中心登录
      </div>
    </div>
  </div>
</template>

<script>
  import ListDrive from '../../list/listDrive.vue'
  export default {
    data: function () {
      return {
        type: 4,//类型，1热门2全部3穿越4关注5用户详情的开车数
      }
    },
    components:{ ListDrive },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .concern{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>

