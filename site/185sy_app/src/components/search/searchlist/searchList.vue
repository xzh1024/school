<!--游戏搜索结果-->
<template>
  <div class="searchList">
    <div class="list">
      <searchList :list="searchList" :type="$route.params.type" v-if="searchList.length"></searchList>
    </div>
  </div>
</template>

<script>
  import searchList from '../../list/list.vue'
  export default {
    components: { searchList },
    props: {
      searchList: {
        type:Array
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .searchList{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
