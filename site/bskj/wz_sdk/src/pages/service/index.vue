<template>
  <div class="container">
    <Header title="客服">
      <!--<div slot="left">-->
        <!--<span class="icon-left" @click="$router.go(-1);"></span>-->
      <!--</div>-->
      <div slot="right" class="right">
        <i class="icon-close" @click="app.closeUserCenter"></i>
      </div>
    </Header>
    <div class="main">
      <div class="border-b">
        <div class="time-table">
          <div class="flex size1">客服在线时间</div>
          <div class="flex">
            <div>工作时间：</div>
            <div class="time">8:30-23:00</div>
          </div>
          <div>
            <div>节假日：</div>
            <div class="time">9:00-22:00</div>
          </div>
        </div>
        <div class="border-b" v-if="data.shouyou_qq">
          <div class="item">
            <div class="item-left">
              <i class="icon icon-QQ"></i>
              <span class="size1">客服QQ</span>
            </div>
            <div class="item-center red">{{ data.shouyou_qq.number }}</div>
            <div class="item-right">
              <a class="btn btn-blue" :href="data.shouyou_qq.href">戳我</a>
            </div>
          </div>
          <div class="item">
            <div class="item-left">
              <i class="icon icon-group"></i>
              <span class="size1">玩家QQ群</span>
            </div>
            <div class="item-center red">{{ data.shouyou_group.number }}</div>
            <div class="item-right">
              <a class="btn btn-blue" :href="data.shouyou_group.href">加群</a>
            </div>
          </div>
          <div class="item">
            <div class="item-left">
              <i class="icon icon-feedback"></i>
              <span class="size1">问题反馈</span>
            </div>
            <div class="item-center red">{{ data.shouyou_qq.number }}</div>
            <div class="item-right">
              <a class="btn btn-blue" :href="data.shouyou_qq.href">反馈</a>
            </div>
          </div>
        </div>
        <div style="padding: 0 1em;">
          <div class="panel">
            <div class="panel-cell left">
              <div class="panel-cell-nav">
                <i class="icon icon-shadow icon-bag"></i>
                <span>返利帮助</span>
              </div>
            </div>
            <div class="panel-cell center">
              <ul class="panel-ul">
                <li class="panel-li">如何申请返利</li>
                <li class="panel-li">返利到账时间</li>
                <li class="panel-li">道具申请方式</li>
                <li class="panel-li">返利到账不符</li>
              </ul>
            </div>
            <div class="panel-cell right">
              <ul class="panel-ul">
                <li class="panel-li">无法申请返利</li>
                <li class="panel-li">返利到账方式</li>
                <li class="panel-li">返利未到怎么办</li>
                <li class="panel-li">如何查看角色ID</li>
              </ul>
            </div>
          </div>

          <div class="panel">
            <div class="panel-cell left">
              <div class="panel-cell-nav">
                <i class="icon icon-shadow icon-card"></i>
                <span>充值帮助</span>
              </div>
            </div>
            <div class="panel-cell center">
              <ul class="panel-ul">
                <li class="panel-li">充值未到账</li>
              </ul>
            </div>
            <div class="panel-cell right">
              <ul class="panel-ul">
                <li class="panel-li">支付限额怎么办</li>
              </ul>
            </div>
          </div>

          <div class="panel">
            <div class="panel-cell left">
              <div class="panel-cell-nav">
                <i class="icon icon-shadow icon-shield"></i>
                <span>账户安全</span>
              </div>
            </div>
            <div class="panel-cell center">
              <ul class="panel-ul">
                <li class="panel-li">忘记账号</li>
                <li class="panel-li">如何换绑手机号</li>
              </ul>
            </div>
            <div class="panel-cell right">
              <ul class="panel-ul">
                <li class="panel-li">忘记密码</li>
                <li class="panel-li">账号被盗.交易专专专专</li>
              </ul>
            </div>
          </div>

          <div class="panel">
            <div class="panel-cell left">
              <div class="panel-cell-nav">
                <i class="icon icon-shadow icon-ellipsis"></i>
                <span>其他帮助</span>
              </div>
            </div>
            <div class="panel-cell center">
              <ul class="panel-ul">
                <li class="panel-li">下载登录异常</li>
                <li class="panel-li">电脑如何玩手游</li>
              </ul>
            </div>
            <div class="panel-cell right">
              <ul class="panel-ul">
                <li class="panel-li">游戏内悬浮球</li>
                <li class="panel-li">IOS设置信任</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="nav">举报投诉</div>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
  import Tabbar from '@/components/tabbar'
  import Header from '@/components/header'
export default {
  data () {
    return {
      data: {},
    }
  },
  components:{ Tabbar, Header },
  created(){
      this.getService();
  },
  methods: {
    openQQgroup(href){
        if(href){
          window.open(href, '_blank');
        } else {
            return
        }
    },
    //获取客服信息
    getService() {
      let options = {
        channel: this.config.channel
      };
      options.sign = this.util.getSign(options);
      let params = this.util.jointUrl(options);
      this.axios.post('/api/index.php?g=api&m=user&a=customer_service', params)
        .then(response => {
          var datas = response.data;
          if(datas.status == 1){//1成功
            if(datas.data){
              let data = datas.data;
              if (/(Android)/i.test(window.navigator.userAgent)) {
                data.shouyou_qq.href = 'mqqwpa://im/chat?chat_type=wpa&uin='+ data.shouyou_qq.number +'&version=1&src_type=web&web_src=http:://wpa.b.qq.com';
                data.shouyou_group.href = 'mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26k%3D'+data.shouyou_group.link;
              } else if(/(iPhone|iPad|iPod|iOS)/i.test(window.navigator.userAgent)){
                data.shouyou_qq.href = 'mqqwpa://im/chat?chat_type=wpa&uin='+ data.shouyou_qq.number +'&version=1&src_type=web&web_src=http:://wpa.b.qq.com';
                data.shouyou_group.href = 'mqqapi://card/show_pslcard?src_type=internal&version=1&uin='+data.shouyou_group.number+'&key='+data.shouyou_group.link+ '&card_type=group&source=external';
              } else {
                data.shouyou_qq.href = 'http://wpa.qq.com/msgrd?v=3&uin='+ data.shouyou_qq.number +'&site=oicqzone.com&menu=yes';
                data.shouyou_group.href = this.htmlspecialchars_decode(data.shouyou_group.weblink);
              }
              this.data = data;
            }
          }
          if(datas.status == 0){//0失败
            console.log(datas.msg);
          }
        })
        .catch(error => {
          console.log('请求失败：' + error);
        });
    },
    htmlspecialchars_decode (str){
      str = str.replace(/&amp;/g, '&');
      str = str.replace(/&lt;/g, '<');
      str = str.replace(/&gt;/g, '>');
      str = str.replace(/&quot;/g, "''");
      str = str.replace(/&#039;/g, "'");
      return str;
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
      .time-table{
        display: flex;
        padding: 1em .5em;
        div{
          overflow: hidden;
        }
        .time{
          margin-top: .5em;
        }
      }
      .item{
        height: 3.5rem;
        margin: 0 1em;
        display: flex;
        align-items: center;
        border-top: 1px solid #f0f0f0;
        .item-left{
          flex: 1;
          display: flex;
          align-items: center;
        }
        .item-center{
          flex: 1;
        }
        .item-right{
          a{
            text-decoration: none;
            color: #fff;
          }
        }
      }
      .panel{
        height: 5rem;
        padding: 1rem 0;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f0f0f0;
        .panel-cell{
          flex: 1;
          overflow: hidden;
          .panel-ul{
            width: 100%;
            overflow: hidden;
            .panel-li{
              height: 1.5rem;
              line-height: 1.5rem;
              padding-left: 1.2em;
              position: relative;

              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              font-size: .85rem;
              color: #777;
            }
            .panel-li:after{
              position: absolute;
              z-index: 1;
              left: 0;
              top: 50%;
              transform: translate(50%, -50%) scale(.5, .5);

              content: " ";
              display: inline-block;
              width: .5rem;
              height: .5rem;
              border-radius: 50% 50%;
              /*background-color: #D74D43;*/
              background-color: rgba(215, 77, 67, 0.5);
            }


          }
        }
        .left{
          /*display: flex;*/
          /*flex-direction: column;*/
          /*justify-content: center;*/
          /*align-items: center;*/
          display: flex;
          .panel-cell-nav{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            padding-right: 2em;
            position: relative;
          }
          .panel-cell-nav:after{
            position: absolute;
            z-index: 1;
            right: 0;
            top: 50%;
            transform: translate(0, -50%);

            content: " ";
            display: inline-block;
            width: .5rem;
            height: 3rem;
            background: url("../../static/img/service/a_icon_fengegxinaz.png") no-repeat;
            background-size: contain;
          }
        }
      }
      .nav{
        height: 3rem;
        line-height: 3rem;
        padding: 0 1em;
      }
    }
  }

  .icon{
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
  }
  .icon-shadow{
    position: relative;
    margin: 1em;
  }
  .icon-shadow:after{
    content: " ";
    display: inline-block;
    width: 2rem;
    height: .5rem;
    background: url("../../static/img/a_icon_tuoyuan.png") no-repeat;
    background-size: contain;
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, 80%);
  }
  .icon-QQ{
    width: 1.3rem;
    margin: 0 .6em 0 .1em;
    background: url("../../static/img/service/a_icon_qq.png") no-repeat;
    background-size: contain;
  }
  .icon-group{
    margin-right: .5em;
    background: url("../../static/img/service/a_icon_qun.png") no-repeat;
    background-size: contain;
  }
  .icon-feedback{
    margin-right: .5em;
    background: url("../../static/img/service/a_icon_wentifankui.png") no-repeat;
    background-size: contain;
  }
  .icon-bag{
    width: 1.4rem;
    background: url("../../static/img/service/a_icon_fanlibangzhu.png") no-repeat;
    background-size: contain;
  }
  .icon-card{
    height: 1.3rem;
    background: url("../../static/img/service/a_icon_chongzhibangzhu.png") no-repeat;
    background-size: contain;
  }
  .icon-shield{
    width: 1.3rem;
    background: url("../../static/img/service/a_icon_zhanghubangzhu.png") no-repeat;
    background-size: contain;
  }
  .icon-ellipsis{
    height: 1rem;
    background: url("../../static/img/service/a_icon_qitabangzhu.png") no-repeat;
    background-size: contain;
  }
</style>
