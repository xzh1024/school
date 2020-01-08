<!--交易须知-->
<template>
  <div class="notice">
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">账号交易</div>
      <div class="head_right"></div>
    </div>
    <!--<iframe class="main" src="http://p.185sy.com/tradenotes.html" frameborder="0"></iframe>-->
    <div class="main">
      <div class="img_box">
        <img src="../../../static/img/c_icon_tu.png" alt="185sy">
      </div>
      <div class="t_title">购买流程</div>
      <div class="flow">
        <div class="flow_guide1">
          <div class="flow_guide1_only">
            <div class="flow_guide1_point"></div>
          </div>
          <div class="flow_guide1_only">
            <div class="flow_guide1_point"></div>
          </div>
          <div class="flow_guide1_only">
            <div class="flow_guide1_point"></div>
          </div>
          <div class="flow_guide1_only">
            <div class="flow_guide1_point"></div>
          </div>
          <div class="flow_guide1_line"></div>
        </div>
        <div class="flow_guide2">
          <div class="flow_guide2_only">
            <img class="flow_guide2_only_icon" src="../../../static/img/c_icon_xuanzeshangping.png" alt="">
            <div class="flow_guide2_only_text">选择商品</div>
          </div>
          <div class="flow_guide2_only">
            <img class="flow_guide2_only_icon" src="../../../static/img/c_icon_goumaishangping.png" alt="">
            <div class="flow_guide2_only_text">购买商品</div>
          </div>
          <div class="flow_guide2_only">
            <img class="flow_guide2_only_icon" src="../../../static/img/c_icon_tiquzhanghao.png" alt="">
            <div class="flow_guide2_only_text">提取账号</div>
          </div>
          <div class="flow_guide2_only">
            <img class="flow_guide2_only_icon" src="../../../static/img/c_icon_jiaoyichenggong.png" alt="">
            <div class="flow_guide2_only_text">交易成功</div>
          </div>
        </div>
      </div>
      <div class="t_title">买家须知</div>
      <div class="notes border_eee">
        <div class="notes_only" v-for="(v,i) in data.buyer_notes">
          <p class="notes_only_num">{{ ++i }}</p>
          <p class="notes_only_text">{{ v }}</p>
        </div>
      </div>
      <div class="t_title">出售流程</div>
      <div class="flow">
        <div class="flow_guide1">
          <div class="flow_guide1_only">
            <div class="flow_guide1_point"></div>
          </div>
          <div class="flow_guide1_only">
            <div class="flow_guide1_point"></div>
          </div>
          <div class="flow_guide1_only">
            <div class="flow_guide1_point"></div>
          </div>
          <div class="flow_guide1_only">
            <div class="flow_guide1_point"></div>
          </div>
          <div class="flow_guide1_line"></div>
        </div>
        <div class="flow_guide2">
          <div class="flow_guide2_only">
            <img class="flow_guide2_only_icon" src="../../../static/img/c_icon_tijiao-shangpiing.png" alt="">
            <div class="flow_guide2_only_text">提交商品</div>
          </div>
          <div class="flow_guide2_only">
            <img class="flow_guide2_only_icon" src="../../../static/img/c_icon_shenghedongjie.png" alt="">
            <div class="flow_guide2_only_text">审核冻结</div>
          </div>
          <div class="flow_guide2_only">
            <img class="flow_guide2_only_icon" src="../../../static/img/c_icon_maijiagoumai.png" alt="">
            <div class="flow_guide2_only_text">买家购买</div>
          </div>
          <div class="flow_guide2_only">
            <img class="flow_guide2_only_icon" src="../../../static/img/c_icon_huodeshouyi.png" alt="">
            <div class="flow_guide2_only_text">获得收益</div>
          </div>
        </div>
      </div>
      <div class="t_title">卖家须知</div>
      <div class="notes border_eee">
        <div class="notes_only" v-for="(v,i) in data.seller_notes">
          <p class="notes_only_num">{{ ++i }}</p>
          <p class="notes_only_text">{{ v }}</p>
        </div>
      </div>
      <div class="t_title">如遇到以下情况，请警惕是骗子</div>
      <div class="notes">
        <div class="notes_only" v-for="(v,i) in data.business_notice">
          <p class="notes_only_num">{{ ++i }}</p>
          <p class="notes_only_text">{{ v }}</p>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
  	data: function () {
      return {
        data: {},
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'traUserInfo'
      ]),
    },
    created() {
      this.getNotes();
		},
    methods: {
      getNotes(){
        //交易初始化
        this.$http.get('/api/index.php?g=api&m=Products&a=trade_notes')
          .then(response => {
            var datas = response.data;
            console.log(datas)
            if(datas.status == 1){//1成功
              this.data = datas.data;
            } else if(datas.status == 0){//0失败
              console.log(datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      }
    }
  }
</script>

<style scoped lang="less">
  .notice{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    .main{
      width: 100%;
      flex: 1;
      overflow-y: auto;
      .img_box{
        margin: .7rem;
      }
      .img_box img{
        width: 100%;
      }
      .t_title{
        height: 1.4rem;
        line-height: 1.4rem;
        font-size: 1.1rem;
        color: #000000;
        padding: 0 .7rem;
        margin-top: 1rem;
      }
      .flow{
        padding: 0 .7rem 1rem;
        .flow_guide1{
          display: flex;
          align-items: center;
          position: relative;
          z-index: 1;
          .flow_guide1_only{
            width: 25%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .flow_guide1_point{
            display: inline-block;
            width: 1.2rem;
            height: 1.2rem;
            position: relative;
            z-index: 5;
            border: 1rem solid #ffffff;
            background: #ffffff url("../../../static/img/c_icon_liuchengdian.png") no-repeat;
            background-size: 100% 100%;
          }
          .flow_guide1_line{
            display: inline-block;
            width: 70%;
            border-bottom: 1px dashed #2a9bf4;
            position: absolute;
            z-index: 2;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
          }
        }
        .flow_guide2{
          display: flex;
          align-items: center;
          .flow_guide2_only{
            width: 25%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .flow_guide2_only_icon{
              width: 2.2rem;
            }
            .flow_guide2_only_text{
              font-size: .85rem;
              height: 1.8rem;
              line-height: 1.8rem;
            }
          }
        }
      }
      .notes{
        padding: .7rem;
        .notes_only{
          display: flex;
          margin-bottom: 1rem;
          .notes_only_num{
            display: inline-block;
            width: 1.2rem;
            height: 1.2rem;
            line-height: 1.2rem;
            text-align: center;
            font-size: .89rem;
            color: #ffffff;
            border-radius: .6rem;
            background-color: #d7d7d7;
            margin: 0 .5rem;
          }
          .notes_only_text{
            flex: 1;
            font-size: .89rem;
            line-height: 1.2rem;
            color: #666666;
          }
        }
      }
    }
  }
</style>
