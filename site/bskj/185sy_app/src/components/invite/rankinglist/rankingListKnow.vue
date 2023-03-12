<!--返利须知-->
<template>
  <div class="turnKnow">
    <!--页头-->
    <div class="head">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        排行奖励须知
      </div>
      <div class="head_right"><i class="icon_servi_black" @click="$router.push({path:'/service'});"></i></div>
    </div>
    <div class="turn_main">
      <div class="spn border_f0f0f0" v-for="v in knowData">
        <div class="spn_t" v-slideToggle>
          <p class="flex1" v-text="v.title"></p>
          <i class="icon_down2"></i>
        </div>
        <div class="spn_box">
          <div class="spn_c color_837f7e" v-text="v.content"></div>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
  import Head from '../../header/head.vue'
  export default {
  	data: function () {
      return {
       knowData: []
      }
    },
    created() {
      this.getKnow();
		},
		mounted(){
			this.$nextTick(function () {

			});
		},
    methods: {
      goRouter(){//返回上一个页面
        this.$router.go(-1);
      },
      getKnow() {
        //转游须知
        this.$http.get('/api/index.php?g=api&m=userbox&a=rankNotice')
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              this.knowData = datas.data;
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      }
    },
    directives: {//自定义指令
      slideToggle: {
        // 指令的定义
        inserted: function (e) {
          var e = e || window.event;
          e.onclick = function () {
            var spnIcon = this.lastElementChild;
            var spnBox = this.nextElementSibling;
            if(spnBox.offsetHeight == 0){
              spnBox.style.height = 'auto';
              spnIcon.style.transform = 'rotateZ(180deg)';
            } else {
              spnBox.style.height = 0;
              spnIcon.style.transform = 'rotateZ(0deg)';
            }
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .turnKnow{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .turn_main{
      flex: 1;
      border-top: .5rem solid #f0f0f0;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      .spn{
        .spn_t{
          height: 3rem;
          padding: 0 .8rem;
          display: flex;
          align-items: center;
        }
        .spn_box{
          overflow: hidden;
          height: 0;
          .spn_c{
            white-space: pre-line;
            padding: 1rem .8rem;
            font-size: .85rem;
            background-color: #f0f0f0;
            line-height: 1.6rem;
          }
        }
      }
    }
  }
</style>
