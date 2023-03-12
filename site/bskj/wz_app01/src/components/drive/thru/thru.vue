<template> <!--穿越-->
  <div class="thru">
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        穿越
      </div>
      <div class="head_right"></div>
    </div>
    <ListDrive :driveType="type"></ListDrive>
	</div>
</template>

<script>
  import ListDrive from '../../list/listDrive.vue'
  export default {
    data: function () {
      return {
        type: 3,//类型，1热门2全部3穿越4关注5用户详情的开车数
      }
    },
    components:{ ListDrive },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .thru{
    height: 100%;
    width: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
  }
</style>

