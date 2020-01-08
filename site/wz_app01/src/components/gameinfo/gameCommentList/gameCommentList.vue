<template><!--游戏详情-评论-->
  <div class="commentMain">
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        全部评论
      </div>
      <div class="head_right"></div>
    </div>
    <div class="flex1">
      <div>
        <ListGameComment :gid="$route.query.id"></ListGameComment>
      </div>

    </div>

  </div>
</template>

<script>
	import ListGameComment from '../../list/listGameComment.vue'
  export default {
    components:{ ListGameComment },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .commentMain{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .flex1{
      flex: 1;
      width: 100%;
      overflow-y: auto;
    }
  }
</style>
