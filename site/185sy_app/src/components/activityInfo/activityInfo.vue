<!--活动详情-->
<template>
  <div class="activityInfo">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        {{ title }}
      </div>
      <div class="head_right"></div>
    </div>
    <div class="ad_main" v-if="data.article_info">
      <div class="ad_c">
        <div class="ad_c_t" v-text="data.article_info.title"></div>
        <div class="ad_c_author small1">作者：<span v-text="data.article_info.author"></span></div>
        <div class="ad_c_author small1">来源：<span v-text="data.article_info.source"></span></div>
        <div class="ad_c_author small1">时间：<span v-text="data.article_info.release_time"></span></div>
        <div class="ad_c_cont" v-html="data.article_info.content"></div>
      </div>
      <div class="ad_b">
        <div class="ad_b_t">相关阅读</div>
        <div class="ad_b_li border_eee" v-for="v in data.xiangguan_info" @click="activityRouter(v.tid)">{{ v.title }}</div>
      </div>
    </div>
	</div>
</template>
<script>
  export default {
    name: 'no_keep',
    inject: ['reload'],
  	data: function () {
      return {
        data: {},
        title: '',
      }
    },
    created() {
      this.getData();
    },
		mounted(){
			this.$nextTick(function () {
			    this.title = this.$route.params.title;
			});
		},
    methods: {
      //咨询详情
      getData(){
        var url = this.jointUrl({
          id: this.$route.params.tid,
          channel: this.myType.channel
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=article&a=info',{
          params: {
            id: this.$route.params.tid,
            channel: this.myType.channel,
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              datas.data.article_info.release_time = this.myType.formatTimeD(datas.data.article_info.release_time);
              this.data = datas.data;
              this.$nextTick(function () {
                document.querySelectorAll('.ad_c_cont img').forEach(function(item) {
                  item.style.maxWidth = '100%';
                });
              });
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      activityRouter(tid){
        this.$router.replace({path:'/activity_detail/'+tid});
        this.$router.push({path:'/activity_info/'+tid+ '/' +this.title})
//        this.getData();
        this.reload();
      }
    }
  }
</script>

<style scoped lang="less">
  .activityInfo{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .ad_main{
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .ad_c{
        padding: 1rem .5rem;
        .ad_c_t{
          font-size: 1.2rem;
          font-weight: bold;
          text-align: center;
          padding-bottom: .8rem;
          /*white-space:nowrap;*/
          /*overflow: hidden;*/
          /*text-overflow:ellipsis;*/
        }
        .ad_c_author{
          color: #999999;
          text-align: center;
        }
        .ad_c_cont{
          padding-top: 2rem;
          white-space: pre-line;
          /*overflow: hidden;*/
          img{
            max-width: 100%!important;
          }
        }
      }
      .ad_b{
        border-top: 1rem solid #f0f0f0;
        padding: .8rem;
        .ad_b_t{
          font-size: 1.1rem;
          font-weight: bold;
        }
        .ad_b_li{
          height: 3rem;
          line-height: 3rem;
          color: #666666;
          white-space:nowrap;
          overflow: hidden;
          text-overflow:ellipsis;
        }
        .ad_b_li:active{
          background: #ade1f5;
        }
      }
    }
  }
</style>
