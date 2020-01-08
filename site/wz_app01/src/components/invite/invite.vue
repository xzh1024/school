<!--邀请好友-->
<template>
  <div class="invite">
    <div class="head">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center"></div>
      <div class="head_right"><span @click="$router.push({path:'/invite_ranking_list'})">排行榜</span></div>
    </div>
    <div class="invite_main">
      <div class="cont">
        <div class="reward_rules">
          <p class="reward_rules_img"></p>
          <p>邀请好友一起玩游戏，每邀请一位好友，您可以获得<span class="color_ff7900 strong" v-text="userInvite.one_register_coin"></span>金币，好友在游戏中每充值1RMB，您也可获得<span class="color_ff7900 strong" v-text="userInvite.one_get_coin"></span>金币！！！</p>
          <p>单个好友最高奖励<span class="color_ff7900 strong" v-text="userInvite.recom_top"></span>金币，邀请人数不限！</p>
        </div>
        <div class="count">
          <div class="count_left">
            <p class="count_title">累计收入</p>
            <p class="color_ff7900" v-text="userInvite.recom_bonus"></p>
            <p>(金币)</p>
          </div>
          <div class="count_right">
            <p class="count_title">邀请人数</p>
            <p class="color_ff7900" v-text="userInvite.recom_counts"></p>
            <p>(人)</p>
          </div>
        </div>
        <div class="custom_btn m_t_1rem" v-on:click="isInvite">立即邀请好友</div>
      </div>
    </div>
    <mt-popup
      v-model="payFlag"
      position="bottom">
      <div class="pay_nav">
        <div class="pay_list border_bdbdbb">
          <div class="pay_one" @click="share('weixin')">
            <i class="icon_wx"></i>
            <span class="pay_name">微信</span>
          </div>
          <div class="pay_one" @click="share('qq')">
            <i class="icon_QQ"></i>
            <span class="pay_name">QQ</span>
          </div>
          <div class="pay_one" @click="share('qzone')">
            <i class="icon_QQKJ"></i>
            <span class="pay_name">QQ空间</span>
          </div>
        </div>
        <div class="pay_btn color_blue" @click="payFlag = false">取&nbsp;消</div>
      </div>
    </mt-popup>
	</div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
  	data: function () {
      return {
        userInvite: {
          "recom_bonus": 0, //邀请好友累计收入
          "recom_counts": 0, //邀请人数
          "one_get_coin": 10, //好友充值1RM得10金币
          "recom_top": 2000, //单个好友封顶奖励2000金币
          "one_register_coin": 10  //单个好友成功注册奖励10金币
        },
        payFlag: false
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created() {
      this.getInvite();
		},
		mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
			this.$nextTick(function () {

			});
		},
    methods: {
      goRouter(){//返回上一个页面
        this.$router.go(-1);
      },
      router(id) {   //跳转路由
        this.$router.push({path:'/game_info/'+id})
      },
      getInvite() {
        var url = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel,
          sign: mySign
        });
        //好友推荐
        this.$http.post('/api/index.php?g=api&m=userbox&a=friend_recom_info',myUrl)
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              if(datas.data){
                this.userInvite = datas.data;
              }
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            this.endIndicator();
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      isInvite() {
        if(this.userInfo.id == 0){
          this.$router.push({path:'login'});
        } else {
          this.payFlag = true;
        }
      },
      share(type) {
        mobShare.config({
          debug: true, // 开启调试，将在浏览器的控制台输出调试信息
          appkey: this.myType.sharekey, // appkey
          params: {
            url: 'http://p.185sy.com/friend_recom_register.html?c=' + this.myType.channel + '&u=' + this.userInfo.id, // 分享链接
            title: '最专业的手游变态公益服', // 分享标题
            description: '上线满V，送99999999元宝，海量BT手游，秒变土豪 下载游戏盒子，更多礼包等着你', // 分享内容
            pic: 'http://www.185sy.com/themes/template/Public/img/icon_5.png', // 分享图片，使用逗号,隔开
            reason:'',//自定义评论内容，只应用与QQ,QZone与朋友网
          },
          callback: function( plat, params ) {
            console.log('plat：' + plat);
            console.dir(params);
          }
        });
        mobShare(type).send();
      }
    }
  }
</script>

<style scoped lang="less">
  .invite{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    background: url("../../static/img/50_icon_yaoqinghaoy.jpg") no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    .invite_main{
      width: 100%;
      flex: 1;
      overflow: hidden;
      /*background: url("../../../static/img/50_icon_yaoqinghaoy.jpg") no-repeat;*/
      /*background-size: 100% 100%;*/
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .cont{
        width: 90%;
        margin: 0 5% 10%;
        .reward_rules{  //规则
          min-height: 5rem;
          line-height: 2rem;
          padding: .1rem 1.2rem 2rem;
          background: url("../../static/img/53_icon_ditu.png") no-repeat;
          background-size: 100% 100%;
          .reward_rules_img{
            margin: 1.6rem auto .8rem;
            width: 48%;
            height: 2.2rem;
            background: url("../../static/img/52_icon_youxiguize.png") no-repeat;
            background-size: contain;
          }
        }
        .count{
          margin-top: .4rem;
          min-height: 4rem;
          background: url("../../static/img/54_icon_beijing.png") no-repeat;
          background-size: 100% 100%;
          display: flex;
          .count_left,.count_right{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: .5rem 0 .2rem;
            p{
              flex: 1;
              line-height: 1.6rem;
            }
            .count_title{
              color: #fff;
              background-color: #ff7900;
              border-radius: .3rem;
              padding: 0 .5rem;
            }
          }
        }
      }
      .custom_btn{
        color: #000000;
        background: -webkit-linear-gradient(#fff57f, #ffbb05); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#fff57f, #ffbb05); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#fff57f, #ffbb05); /* Firefox 3.6 - 15 */
        background: linear-gradient(#fff57f, #ffbb05); /* 标准的语法 */
      }
    }
  }
</style>
