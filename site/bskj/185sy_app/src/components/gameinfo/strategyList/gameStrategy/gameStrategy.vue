<!--攻略详情-->
<template>
  <div class="gameStrategy">
    <!--页头-->
    <Head :head="head"></Head>
    <!--<div class="ad_main" v-if="data.article_info" ref="ad_main">-->
      <!--<div class="ad_c">-->
        <!--<div class="ad_c_t" v-text="data.article_info.title"></div>-->
        <!--<div class="ad_c_author small1">作者：<span v-text="data.article_info.author"></span></div>-->
        <!--<div class="ad_c_author small1">来源：<span v-text="data.article_info.source"></span></div>-->
        <!--<div class="ad_c_author small1">时间：<span v-text="data.article_info.release_time"></span></div>-->
        <!--<div class="ad_c_cont" v-html="data.article_info.content"></div>-->
      <!--</div>-->
      <!--<div class="ad_b">-->
        <!--<div class="ad_b_t">相关阅读</div>-->
        <!--<div class="ad_b_li border_f0f0f0" v-for="v in data.xiangguan_info" @click="activityRouter(v.tid)">{{ v.title }}</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="gameStrategy_main">
      <iframe :src="$route.params.infoUrl" frameborder="0"></iframe>
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
          title:"攻略详情",
          title_but: true
        }
      }
    },
    components: { Head },
    created() {

    },
		mounted(){
			this.$nextTick(function () {
			    console.log(this.$route.params.infoUrl)
			});
		}
  }
</script>

<style scoped lang="less">
  .gameStrategy{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .gameStrategy_main{
      flex: 1;
      overflow-y: auto;
      iframe{
        width: 100%;
        height: 100%;
      }
    }
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
