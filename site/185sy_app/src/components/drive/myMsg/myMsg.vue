<template> <!--我的消息-->
	<div class="my">
    <DriveNum v-if="$store.getters.userInfo.id"></DriveNum>
    <div class="not" v-else>
      <img class="not_img" src="../../../static/img/31_icon_weidenglu.png">
      <div class="not_text f_s1 color_837f7e">
        您还未登录，请前往个人中心登录
      </div>
    </div>
	</div>
</template>

<script>
  import DriveNum from '../../userinfo/drivenum/driveNum.vue' //全部
  export default {
    data: function () {
        return {

        }
    },
    components:{ DriveNum },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .my{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>

