<template> <!--推荐-->
  <div class="suggest"
       v-infinite-scroll="getGameIndex"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="3">
    <!--活动菜单-->
    <Banner :banner="banner"></Banner>
    <div class="activityMenu border_dcdcdc">
      <a @click="$router.push({path:'rebate'});">
        <img src="../../../static/img/02_icon_flsq.png" alt="申请返利">
        <span>申请返利</span>
      </a>
      <a @click="$router.push({path:'fullV'});">
        <img src="../../../static/img/06_icon_manv.png" alt="满V">
        <span>满V</span>
      </a>
      <a @click="$router.push({path:'activity'});">
        <img src="../../../static/img/02_icon_hd-.png" alt="活动">
        <span>活动</span>
      </a>
      <a @click="$router.push({path:'KAC'});">
        <img src="../../../static/img/03_icon_libao.png" alt="礼包">
        <span>礼包</span>
      </a>
    </div>
    <suggestList :list="list"></suggestList>
    <!--加载动画-->
    <div v-show="loadAnimation">
      <mt-spinner type="triple-bounce" color="#888" style="height: 3rem; line-height: 3rem; text-align: center"></mt-spinner>
    </div>
    <div class="icon_service" @click="$router.push({path:'/service'});"></div>
  </div>
</template>

<script>
	import Banner from '../../banner/Banner.vue'
	import suggestList from '../../list/list.vue'
  export default {
    data: function () {
      return {
        banner:[],
        head: {
          title:"",
          title_but: true
        },
        page: 1,
        list: [],
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        loadAnimation : false//标记加载动画,false为隐藏
      }
    },
    components: { Banner, suggestList },
    created(){
      this.getGameIndex();
    },
    mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
      this.$nextTick(function () {//在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

      });
    },
    methods: {
      router(id) {   //跳转路由
        this.$router.push({path:'/game_info/'+id})
      },
      //推荐接口
      getGameIndex() {
        if(this.status){
          this.loadAnimation = true;
          this.loading = true;
          this.$http.get("/www/api-game-index", {
              params: {
                page : this.page,
                channel : this.myType.channel,
                system : this.myType.system
              }
            })
            .then(response => {
              var datas = response.data;
              if(datas.status == 0){
                if(this.page == 1){
                  this.banner = datas.data.banner;
                }
                if(datas.data.gamelist.length > 0){
                  let data = datas.data.gamelist;
                  if(this.myType.system == 1){
                    for(let i=0,len=data.length; i < len; i++) {
                      data[i].web_url = data[i].android_url;
                      data[i].label = data[i].label.split(",");
                      this.list.push(data[i]);
                    }
                  }
                  if(this.myType.system == 2){
                    for(let i=0,len=data.length; i < len; i++) {
                      data[i].web_url = data[i].ios_url;
                      data[i].label = data[i].label.split(",");
                      this.list.push(data[i]);
                    }
                  }
                  this.page++;
                } else {
                  this.status = false;
                }
              }
              setTimeout(() => {//保证1s的动画效果
                this.loadAnimation = false;
                this.loading = false;
              },1000);
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
          } else {
            this.loading = true;
            this.loadAnimation = false;
          }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .suggest{
  	flex: 1;
  	overflow-y: auto;
    /*活动菜单*/
    .activityMenu{
      /*border-bottom: 1px solid #ccc;*/
      display: flex;
      & > a{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & > img{
          width: 2.8rem;
          height: 2.8rem;
          margin: .4rem 0;
        }
        & > span{
          margin-bottom: .4rem;
        }
      }
    }
  }

</style>
