<!--活动中心-->
<template>
  <div class="activity">
    <!--页头-->
    <Head :head="head"></Head>
    <div class="activity_list"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="3">
      <div class="sole" v-for="v in list" @click="activityRouter(v.tid)">
        <img class="sole-logo" :src="(v.logo=='/data/upload/' || '')?'../../../../static/img/tubiao_jiazaishibai.png':myType.domainName + v.logo"></img>
        <div class="sole-cont">
          <div class="sole-cont-top">
            <p class="sole-title">{{ v.title }}</p>
            <small>{{ v.release_time }}</small>
          </div>
          <p class="sole-cont-b color_ababab">
            {{ v.abstract }}
          </p>
        </div>
      </div>
      <!--加载动画-->
      <div v-show="loadAnimation">
        <mt-spinner type="triple-bounce" color="#888" style="height: 3rem; line-height: 3rem; text-align: center"></mt-spinner>
      </div>
    </div>
	</div>
</template>
<script>
  import Head from '../../../header/head.vue'
  export default {
  	data: function () {
      return {
        head: {
          title:"活动",
          title_but: true
        },
        page: 1,
        list: [],
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        loadAnimation : false//标记加载动画,false为隐藏
      }
    },
    components: { Head },
		mounted(){
			this.$nextTick(function () {
        this.loadMore();
			});
		},
    methods: {
      activityRouter(tid){
        this.$router.push({path:'activity_detail/'+tid})
      },
      loadMore() {
        //资讯列表接口
        if(this.status){
          this.loadAnimation = true;
          this.loading = true;
          this.$http.get("/www/api-article-get_list", {
            params: {
              page : this.page,
              channel : 185,
              system : this.myType.system,
              type : 1
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 0){
                var data = datas.data;
                var list = data.list;
                for(let i=0,len=list.length; i < len; i++) {
                  this.list.push(list[i]);
                }
                if(this.page >= data.count) {
                  this.status = false;
                }
                this.page++;
              }
              setTimeout(function () {//保证1s的动画效果
                this.loadAnimation = false;
                this.loading = false;
              }.bind(this),1000);
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        } else {
          this.loading = true;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .activity{
    flex: 1;
    display: flex;
    flex-direction: column;
    .sole-cont-top{
      display: flex;
      align-items: center;
      margin-bottom: .6rem;
      .sole-title{
        flex: 1;
        white-space:nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
      }
    }
    .sole-cont-b{
      font-size: .89rem;
      white-space:nowrap;
      overflow: hidden;
      text-overflow:ellipsis;
    }
    .activity_list{
      flex: 1;
      overflow-y: auto;
    }
  }
</style>
