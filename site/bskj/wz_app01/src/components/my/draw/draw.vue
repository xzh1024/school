<!--金币抽奖-->
<template>
  <div class="draw">
    <!--页头-->
    <Head :head="head"></Head>
    <div class="main">
      <div class="my_gold bd_t_06rem">
        <p>我的金币：<span>10</span></p>
        <p>可兑换平台币：0</p>
        <p class="color_ababab">10金币=1平台币，小于10平台币不能兑换</p>
      </div>
      <div class="bd_t_03rem"></div>
      <div class="custom">
        <span class="color_ababab">自定义：</span>
        <!--<input class="custom_input" type="text" placeholder="请输入要兑换的平台币数量"/>-->
        <textarea class="custom_input" placeholder="请输入要兑换的平台币数量" v-focus></textarea>
        <span>平台币</span>
      </div>
      <div class="custom_btn">立即兑换</div>
    </div>
	</div>
</template>
<script>
  import Head from '../../header/head.vue'
  export default {
  	data: function () {
      return {
        head: {
          title:"平台币兑换",
          title_but: true
        },
      }
    },
    created() {
//      this.head.title = this.$route.params.name;
		},
    components: { Head },
		mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
			this.$nextTick(function () {

			});
		},
    methods: {
      router(id) {   //跳转路由
        this.$router.push({path:'/game_info/'+id})
      }
    },
    directives: {//自定义指令
      focus: {
        // 指令的定义
        inserted: function (el) {//被绑定元素插入到DOM中时调用
          el.focus()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .draw{
    flex: 1;
    display: flex;
    flex-direction: column;
    .main{
      .my_gold{
        padding: 0 .8rem 1rem;
        & > p{
          padding-top: 1.5rem;
        }
      }
      .custom{
        margin-top: 2rem;
        height: 4rem;
        padding: 0 .8rem;
        background-color: #f0f0f0;
        display: flex;
        align-items: center;
        & > span{
          height: 1.4rem;
        }
        .custom_input{
          flex: 1;
          /*font-size: .8rem;*/
          resize: none;
          border: none;
          background-color: transparent;
          outline: none;
          height: 1.4rem;
        }
      }
      .custom_btn{
        margin: 3rem .8rem 0;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        border-radius: .4rem;
        border: 1px solid #c08c03;
        font-size: 1.1rem;
        background: -webkit-linear-gradient(#fff57f, #ffbb05); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#fff57f, #ffbb05); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#fff57f, #ffbb05); /* Firefox 3.6 - 15 */
        background: linear-gradient(#fff57f, #ffbb05); /* 标准的语法 */
        box-shadow: 0 2px 2px 1px rgba(0, 0, 0, .25);
      }
    }
  }
</style>
