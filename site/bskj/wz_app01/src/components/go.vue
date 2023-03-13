<template>
  <div class="index">
    <div class="index_main">
      <transition :name="transitionName">
        <keep-alive exclude="no_keep">
          <router-view/>
        </keep-alive>
      </transition>
    </div>
		<IndexTab></IndexTab>
  </div>
</template>
<script>
	import IndexTab from './tab/indexTab.vue'//页脚tab
  export default {
  	data: function () {
      return {
        transitionName: ''
      }
    },
    watch: {//使用watch 监听$router的变化
      $route(to, from) {
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        console.log(to.meta.title)
        if(to.meta.index < from.meta.index){
          //设置动画名称
          this.transitionName = 'slide-right';
        }else{
          this.transitionName = 'slide-left';
        }
      }
    },
    components:{ IndexTab },
  }
</script>

<style scoped lang="less">
  .index{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .index_main{
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>
