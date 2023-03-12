<!--客服中心-->
<template>
  <div class="service">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        客服中心
      </div>
      <div class="head_right"></div>
    </div>
    <div class="service_main">
      <div class="notice">
        <div class="notice_title">
          <i class="icon_servi"></i>
          <span>客服在线时间：</span>
        </div>
        <div class="work_time">
          <div class="left">工作日：</div>
          <div class="right">
            <p>09:00-12:00</p>
            <p>13:30-18:30</p>
          </div>
        </div>
        <div class="work_time">
          <div class="left">节假日：</div>
          <div class="right">
            <p>09:00-22:30</p>
          </div>
        </div>
      </div>
      <div v-if="service.shouyou_qq.number">
        <div class="one">
          <div class="one_left">{{ service.shouyou_qq.name }}</div>
          <div class="one_centre">{{ service.shouyou_qq.number }}</div>
          <!--<a class="one_right" target="_blank" :href="'https://admin.qidian.qq.com/template/blue/wpa/launch-mobile-qq.html?protocol=mqqwpa://im/chat?chat_type=crm&amp;uin='+service.shouyou_qq.number+'&amp;version=1&amp;src_type=web&amp;web_src=www.185sy.com'">联系</a>-->
          <!--<a class="one_right" target="_blank" :href="'http://wpa.qq.com/msgrd?v=3&uin='+service.shouyou_qq.number+'&site=oicqzone.com&menu=yes'">联系</a>-->
          <a class="one_right" target="_blank" @click="openQQ(service.shouyou_qq.number)">联系</a>
        </div>
        <div class="one">
          <div class="one_left">{{ service.fanli_qq.name }}</div>
          <div class="one_centre">{{ service.fanli_qq.number }}</div>
          <a class="one_right" target="_blank" @click="openQQ(service.fanli_qq.number)">联系</a>
        </div>
        <div class="one">
          <div class="one_left">{{ service.shouyou_group.name }}</div>
          <div class="one_centre">{{ service.shouyou_group.number }}</div>
          <a class="one_right" target="_blank" :href="service.shouyou_group.weblink">联系</a>
        </div>
        <div class="one">
          <div class="one_left">{{ service.box_group.name }}</div>
          <div class="one_centre">{{ service.box_group.number }}</div>
          <a class="one_right" target="_blank" :href="service.shouyou_group.weblink">联系</a>
        </div>
      </div>
      <div class="service_hint">
        <div>客服提示：</div>
        <div class="service_hint_txt">
          <small>线上反馈，客服将在24小时内答复您！</small>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
  export default {
  	data: function () {
      return {
        user: {
          icon_url: "",
          nick_name: "",
          user_id: 0
        },
        service: {
          shouyou_qq: {
            link: "",
            name: "",
            number: ""
          },
          fanli_qq: {
            link: "",
            name: "",
            number: ""
          },
          shouyou_group: {
            link: "",
            name: "",
            number: ""
          },
          box_group: {
            link: "",
            name: "",
            number: ""
          }
        }
      }
    },
    created() {
      this.getService();
		},
		mounted(){
			this.$nextTick(function () {

			});
		},
    methods: {
      openQQ(qq){
        let kefu101 = 'http://wpa.qq.com/msgrd?v=3&uin='+qq+'&site=oicqzone.com&menu=yes';
        let kefu102 = 'mqqwpa://im/chat?chat_type=wpa&uin='+qq+'&version=1&src_type=web&web_src=oicqzone.com';
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /(Android)/i.test(navigator.userAgent)) {
          window.open(kefu102);
        }else {
          window.open(kefu101);
        }
      },
      //获取客服信息
      getService() {
        var url = this.jointUrl({
          channel: this.myType.channel
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=user&a=customer_service', {
          params:{
            channel: this.myType.channel,
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              let data = datas.data;
              data.shouyou_group.weblink = this.htmlspecialchars_decode(data.shouyou_group.weblink);
              data.box_group.weblink = this.htmlspecialchars_decode(data.box_group.weblink);
              this.service = data;
            }
            if(datas.status == 0){//0失败
              console.log('status == 1 ：'+ datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      openLink(link) {
        window.open(link);
      }
    },
    filters: {	//自定义局部过滤器
      serviceName: (data) => {//过滤显示下载量
        return data + '：'
      }
    }
  }
</script>

<style scoped lang="less">
  .service{
    width: 100%;
    height: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .service_main{
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      background-color: #f0f0f0;
      .notice{
        background-color: #fff;
        padding: .8rem 0;
        .notice_title{
          display: flex;
          align-items: center;
          padding-bottom: .5rem;
        }
        .work_time{
          display: flex;
          padding-bottom: .8rem;
          .left{
            flex: 2;
            text-align: right;
          }
          .right{
            flex: 3;
          }
        }
      }
      .one{
        margin-top: 2px;
        padding: 0 .6rem;
        height: 3.2rem;
        background-color: #fff;
        display: flex;
        align-items: center;
        .one_left{
          flex: 1;
        }
        .one_centre{
          flex: 1;
        }
        .one_right{
          border-radius: .2rem;
          padding: .3rem 1rem;
          box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, .2);
          color: #29a1f7;
          background-color:#fff;
          border: 1px solid #29a1f7;
        }
        .one_right:link{ color: #29a1f7; background-color:#fff;}
        .one_right:visited{ color: #29a1f7; background-color:#fff;}
        .one_right:active{ color: #fff; background-color:#29a1f7;}
      }
      .service_hint{
        padding: .5rem;
        .service_hint_txt{
          padding: .5rem 0;
          margin-left: 4rem;
        }
      }
    }

  }
</style>
