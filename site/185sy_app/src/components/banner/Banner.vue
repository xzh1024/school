<template>
  <!--轮播-->
	<mt-swipe :auto="3000">
    <mt-swipe-item v-for="(v,i) in banner" :key="i">
      <img :src="myType.domainName + v.slide_pic" @click="router(v.gid, v.url)">
    </mt-swipe-item>
	</mt-swipe>
</template>
<script>
export default {
  props: {
    banner: {
      type: Array
    },
    type: {
      type: Number
    }
  },
  methods: {
    router(id, url) {   //跳转路由
      if(url){
        window.location.href = url;
      } else {
//        this.$router.push({path:'/game_info/'+id+'/'+this.type})
        this.$router.push({path: '/game_info', query: {
          id: id,
          type: this.type,
          channel: this.myType.channel
        }});
//        if(this.type == 1){
//          this.$router.push({path:'/game_info/'+id})
//        } else if(this.type == 2){
//          this.$router.push({path:'/game_info_dis/'+id})
//        }
      }
    }
  }
}
</script>

<style scoped lang="less">
/*轮播*/
	.mint-swipe{
	  height: 10rem;
	  .mint-swipe-item{
	    background-color: #ffc727;
      img{
        width: 100%;
        height: 100%;
      }
	  }
	}
</style>
