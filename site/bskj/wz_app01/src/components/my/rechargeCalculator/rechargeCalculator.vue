<template>
  <div class="rechargeCalculator">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        佣金计算器
      </div>
      <div class="head_right"></div>
    </div>
    <div class="main">
      <iframe class="isIframe" :src="url" frameborder="0" v-if="userInfo.uid"></iframe>
    </div>
	</div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
  	data(){
      return {
        url: this.myType.domainNameApi + '/api/AppTool/commission_caculator'
      }
    },
    created() {
  	    this.url += '?uid=' + this.userInfo.uid
		},
		mounted(){
			this.$nextTick(function () {

			});
		},
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {

    }
  }
</script>

<style scoped lang="less">
  .rechargeCalculator{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .main{
      flex: 1;
      display: flex;
      flex-direction: column;
      /*overflow-y: auto;*/
      /*padding: 1rem;*/
      .isIframe{
        width: 100%;
        flex: 1;
      }
    }
  }
</style>
