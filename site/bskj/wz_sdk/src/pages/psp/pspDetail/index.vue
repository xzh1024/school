<template>
  <div class="container">
    <Header title="攻略详情">
      <div slot="left">
        <span class="icon-left" @click="$router.go(-1);"></span>
      </div>
    </Header>
    <div class="main">
      <div class="article" v-if="data.article_info">
        <div class="article-title" v-text="data.article_info.title"></div>
        <div class="article-author small1">作者：<span v-text="data.article_info.author"></span></div>
        <div class="article-source small1">来源：<span v-text="data.article_info.source"></span></div>
        <div class="article-time small1">时间：<span v-text="data.article_info.release_time"></span></div>
        <div class="article-content" v-html="data.article_info.content"></div>
      </div>
      <!--<div class="ad_b">-->
        <!--<div class="ad_b_t">相关阅读</div>-->
        <!--<div class="ad_b_li border_eee" v-for="v in data.xiangguan_info" @click="activityRouter(v.tid)">{{ v.title }}</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Header from '@/components/header'
  export default {
    data () {
      return {
        data: {}
      }
    },
    components:{ Header },
    computed: {
      ...mapGetters([
        'userData'
      ]),
    },
    created() {
      this.getArticleDetail();
    },
    methods: {
      getArticleDetail() {
        let options = {
          id: this.$route.params.id,
          channel: this.config.channel
        };
        options.sign = this.util.getSign(options, 'dafb9c0f015a603381c3f574531b53b0');
        let params = this.util.jointUrl(options);
        this.axios.post('/api/index.php?g=api&m=article&a=info', params)
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){
                let articleInfo = datas.data.article_info;
              articleInfo.release_time = this.util.formatTime(articleInfo.release_time, 'D');
              this.data = datas.data;
              this.$nextTick(function () {
                document.querySelectorAll('.article-content img').forEach(function(item) {
                  item.style.maxWidth = '100%';
                });
              });
            }
            if(datas.status == 0){
              console.log(datas.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .main{
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      .article{
        padding: 1rem .5rem;
        .article-title{
          font-size: 1.2rem;
          font-weight: bold;
          text-align: center;
          padding-bottom: .8rem;
          /*white-space:nowrap;*/
          /*overflow: hidden;*/
          /*text-overflow:ellipsis;*/
        }
        .article-author,.article-source,.article-time{
          margin-bottom: .3em;
          font-size: .85rem;
          text-align: center;
          color: #999999;
        }
        .article-content{
          width: 100%;
          margin-top: 1em;
          white-space: pre-line;
          overflow-x: hidden;
          img{
            max-width: 100%!important;
          }
        }
      }
      /*.ad_b{*/
        /*border-top: 1rem solid #f0f0f0;*/
        /*padding: .8rem;*/
        /*.ad_b_t{*/
          /*font-size: 1.1rem;*/
          /*font-weight: bold;*/
        /*}*/
        /*.ad_b_li{*/
          /*height: 3rem;*/
          /*line-height: 3rem;*/
          /*color: #666666;*/
          /*white-space:nowrap;*/
          /*overflow: hidden;*/
          /*text-overflow:ellipsis;*/
        /*}*/
        /*.ad_b_li:active{*/
          /*background: #ade1f5;*/
        /*}*/
      /*}*/
    }
  }
</style>

