<template> <!--即将开服-->
  <div class="futureOpen"
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
    data(){
      return {
        page: 1,
        data: {
          future:[],  //即将开服
          past:[]     //已开服
        },
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
      }
    },
    created() {
      this.loadMore();
    },
    components: { ListOpen },
    mounted(){
      this.$nextTick(function () {
//        this.loadMore();
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
              type : 2
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 0){
                if(datas.data.length > 0){
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
                  console.log(this.data)
                } else {
                  this.status = false;
                }
              } else {
                this.status = false;
              }
              setTimeout(() => this.loading = false,1000);
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
  .futureOpen{
    flex: 1;
    overflow-y: auto;
  }
</style>





