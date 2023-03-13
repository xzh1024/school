<template> <!--今日开服-->
  <div class="todayOpen"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="3">
    <ListOpen :data="data"></ListOpen>
    <!--加载动画-->
    <div v-show="loading">
      <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
    </div>
  </div>
</template>

<script>
  import ListOpen from '../../../../list/listOpen.vue' //今日开服列表组件
  export default {
    data: function () {
        return {
          page: 1,
          data: {
            "future":[],  //即将开服
            "past":[]     //已开服
          },
          status: true,//标记是否继续请求数据 true为继续
          loading: true,//若为真，则无限滚动不会被触发
        }
    },
    created() {
//        this.head.title = this.$route.params.name;
    },
    components: { ListOpen },
    mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
      this.$nextTick(function () {//在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
        this.loadMore();
      });
    },
    methods: {
      router(id) {   //跳转路由
        this.$router.push({path:'/game_info/'+id})
      },
      loadMore() {
        if(this.status){
          this.loading = true;
          this.$http.get("/www/api-game-openServer", {
            params: {
              page : this.page,
              channel : this.myType.channel,
              system : this.myType.system,
              platform: 1,  //游戏平台,1BT服，2折扣服
              type : 1
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 0){
                if(datas.data.length){
                  let data = datas.data;
                  let time = parseInt((new Date().getTime())/1000);
                  if(this.myType.system == 1){//1为Android
                    for(let i=0,len=data.length; i < len; i++) {
                      data[i].label = data[i].label.split(",");
                      if(data[i].start_time < time){//已开服
                        data[i].start_time = this.myType.formatTimeM(data[i].start_time);
                        this.data.past.push(data[i]);
                      } else {//即将开服
                        data[i].start_time = this.myType.formatTimeM(data[i].start_time);
                        this.data.future.push(data[i]);
                      }
                    }
                  }
                  if(this.myType.system == 2){//2为IOS
                    for(let i=0,len=data.length; i < len; i++) {
                      data[i].label = data[i].label.split(",");
                      if(data[i].start_time < time){//已开服
                        data[i].start_time = this.myType.formatTimeM(data[i].start_time);
                        this.data.past.push(data[i]);
                      } else {//即将开服
                        data[i].start_time = this.myType.formatTimeM(data[i].start_time);
                        this.data.future.push(data[i]);
                      }
                    }
                  }
                  this.page++;
                } else {
                  this.status = false;
                }
              }
              setTimeout(() => {//保证1s的动画效果
                this.loading = false;
              },1000);
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.todayOpen{
		flex: 1;
  	overflow-y: auto;
	}
</style>

