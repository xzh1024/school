<template>
  <!--页头-->
  <div class="headTitle">
    <a class="icon_left_black" v-if="head.title_but" @click="goRouter"></a>
    {{ head.title }}
  </div>
</template>

<script>
  export default {
    props: {
      head: {
        type: Object,
        required: true
      }
    },
    methods: {
      goRouter(){//返回上一个页面
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped lang="less">
  .headTitle{
    width: 100%;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    font-size: 1.2rem;
    color: #666;
    /*background-color: pink;*/
  }
</style>

