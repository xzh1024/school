<template><!--游戏详情-评论-->
  <div class="commentMain">
    <keep-alive>
      <ListGameComment :gid="$route.query.id"></ListGameComment>
    </keep-alive>
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
  }
</style>
