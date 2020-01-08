<template> <!--全部-->
  <div class="all">
    <ListDrive :driveType="type"></ListDrive>
	</div>
</template>

<script>
  import ListDrive from '../../list/listDrive.vue'
  export default {
    data: function () {
      return {
        type: 2,//类型，1热门2全部3穿越4关注5用户详情的开车数
      }
    },
    components:{ ListDrive },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .all{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>

