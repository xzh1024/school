<!--活动详情-->
<template>
  <div class="activityDetail">
    <!--页头-->
    <Head :head="head"></Head>
    <div class="ad_main" v-if="data.article_info" ref="ad_main">
      <div class="ad_c">
        <div class="ad_c_t" v-text="data.article_info.title"></div>
        <div class="ad_c_author">作者：<span v-text="data.article_info.author"></span></div>
        <div class="ad_c_author">来源：<span v-text="data.article_info.source"></span></div>
        <div class="ad_c_author">时间：<span v-text="data.article_info.release_time"></span></div>
        <div class="ad_c_cont" v-html="data.article_info.content"></div>
      </div>
      <div class="ad_b">
        <div class="ad_b_t">相关阅读</div>
        <div class="ad_b_li border_f0f0f0" v-for="v in data.xiangguan_info" @click="activityRouter(v.tid)">{{ v.title }}</div>
      </div>
    </div>
	</div>
</template>
<script>
  import Head from '../../../header/head.vue'
  export default {
    name: 'no_keep',
  	data: function () {
      return {
        head: {
          title:"活动详情",
          title_but: true
        },
        data: {}
      }
    },
    components: { Head },
    created() {
      this.getData();
    },
		mounted(){
			this.$nextTick(function () {

			});
		},
    methods: {
      formatTime(nows) {
        var now=new Date(nows * 1000);
        var year=now.getFullYear();
        var month=now.getMonth()+1;
        if(month < 10) {
          month = '0' + month;
        }
        var date=now.getDate();
        if(date < 10) {
          date = '0' + date;
        }
        return year+"-"+month+"-"+date;
      },
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
              datas.data.article_info.release_time = this.formatTime(datas.data.article_info.release_time);
              this.data = datas.data;
              this.$nextTick(function () {
                document.querySelectorAll('.ad_c_cont img').forEach(function(item) {
                  item.style.maxWidth = '100%';
                });
                this.$refs.ad_main.scrollTop = 0;
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
        this.$router.push({path:'/activity_detail/'+tid});
        this.getData();
      }
    }
  }
</script>

<style scoped lang="less">
  .activityDetail{
    flex: 1;
    display: flex;
    flex-direction: column;
    .ad_main{
      flex: 1;
      overflow-y: auto;
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
      }
    }
  }
</style>
