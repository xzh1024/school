<!--问答规范-->
<template>
  <div class="norm">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        问（答）审核规范
      </div>
      <div class="head_right"></div>
    </div>
    <div class="norm_main">
      <div class="question f_s1">为什么我的问（答）未通过?</div>
      <div class="answering f_s1 color_blue">属于以下范畴的内容将不予以通过！</div>
      <div class="explain">
        <div class="explain_title f_s2">【拒绝通过内容】</div>
        <div class="explain_list color_888888">
          <div class="explain_li">1.政治，宗教以及违反国家相关法律法规的内容</div>
          <div class="explain_li">2.黄赌毒、血腥暴力、侮辱污蔑诋毁性内容</div>
          <div class="explain_li">3.恶意以及偏激极端的言辞，发布引战嘲讽性内容</div>
          <div class="explain_li">4.一切形式的广告性内容</div>
          <div class="explain_li">5.发布不相关或无意义的内容</div>
          <div class="explain_li">6.恶意重复刷问答内容</div>
        </div>
      </div>
      <div class="dispose color_888888">
        <div>处理：</div>
        <div class="flex1">删除内容，情节严重者扣除积分，且封号处理！</div>
      </div>
    </div>
	</div>
</template>
<script>
  export default {
  	data: function () {
      return {

      }
    },
    created() {

		},
		mounted(){
			this.$nextTick(function () {

			});
		},
    methods: {

    },
  }
</script>

<style scoped lang="less">
  .norm{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .norm_main{
      flex: 1;
      overflow-y: auto;
      .question{
        background-color: #f0f0f0;
        padding: 1rem;
      }
      .answering{
        padding: 1rem 1.2rem;
      }
      .explain{
        margin: 0 1rem;
        padding: 1rem 0;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
        .explain_title{
          margin: .5rem 0 1rem;
          font-weight: 600;
        }
        .explain_list{
          .explain_li{
            margin-bottom: .6rem;
            line-height: 1.4rem;
          }
        }
      }
      .dispose{
        display: flex;
        margin: 1rem;
      }
    }
  }
</style>
