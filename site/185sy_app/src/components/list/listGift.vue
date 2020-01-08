<template>
	<div>
		<!--<div class="sole" v-for="v in list" :id="v.id" @click="router(v.id)">-->
			<!--<img :src="myType.domainName + v.logo" class="sole-logo"></img>-->
			<!--<div class="sole-cont">-->
				<!--<p class="sole-cont-gamename">{{ v.gamename }}<small class="color_837f7e">{{ v.size }}M</small></p>-->
				<!--<p class="sole-cont-weal" v-if="v.label">-->
					<!--<small v-for="v in v.label">{{ v }}</small>-->
				<!--</p>-->
				<!--<p class="sole-cont-content color_837f7e"><small>{{ v.content }}</small></p>-->
			<!--</div>-->
			<!--<div class="sole-cont-rebate color_16adc4">-->
				<!--<small>申请</small>-->
				<!--<small>返利</small>-->
			<!--</div>-->
		<!--</div>-->
    <div class="sy border_eee" v-for="(v,i) in list" @click="$router.push({path:'/gift_info/'+ v.id});">
      <img v-lazy="myType.domainName + v.pack_logo" class="sy_l"></img>
      <div class="sy_c">
        <div class="sy_c_t">
          <span v-text="v.pack_name" class="m_r"></span>
        </div>
        <div class="sy_c_c small2 color_black">
          <!--<span class="sy_c_b_weal small3" v-if="v.content" v-text="v.content"></span>-->
          <div class="sy_c_c_num">
            <i class="icon_gift"></i>
            <span class="small2 color_black">{{ v.pack_counts|F_num }}</span>
          </div>
          <div class="sy_c_c_num">
            <span>剩余</span>
            <span>{{ v.pack_remnant|F_num }}</span>
          </div>
        </div>
        <div class="sy_c_b">
          <span class="small2 color_black">{{ v.pack_abstract }}</span>
        </div>
      </div>
      <div class="sy_r">
        <p type="button" class="btn_blue_ye" v-if="v.card"
           v-clipboard:copy="v.card"
           v-clipboard:success.stop="onCopy"
           v-clipboard:error.stop="onError">复制</p>
        <p class="btn_blue_not" v-else @click.stop="getCard(v.id, i)">领取</p>
      </div>
    </div>
	</div>
</template>

<script>
  import { Toast, Indicator, MessageBox } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
    data: function () {
      return {

      }
    },
    props: {
      list: {
        type: Array
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    filters: {	//自定义局部过滤器
      F_num: (num) => {//过滤显示下载量
        return ':' + num;
      }
    },
    created() {
//      this.getUser();
    },
    methods: {
      onCopy: function (e) {
        if(e && e.stopPropagation){
          e.stopPropagation();
        }else{
          window.event.cancelBubble = true;
        }
        this.messageBox();
//        alert('You just copied: ' + e.text)
      },
      onError: function (e) {
        this.toast('Failed to copy texts');
      },
      toast (msg) {
        var msg = msg || '提示';
        Toast({
          message: msg,
          duration: 2000,
          className: 'm_toast'
        });
      },
      indicator () {
        Indicator.open({
          text: '努力加载中...',
          spinnerType: 'fading-circle'
        })
      },
      endIndicator () {
        Indicator.close();
      },
      messageBox() {
        MessageBox({
          title: '礼包码已复制',
          message: '领取后请尽快使用，以免过期！',
          showCancelButton: false
        });
      },
      router(id) {   //跳转路由
        this.$router.push({path:'/game_info/'+id})
      },
      getCard(id,index) {
        this.indicator();//开启加载提示动画
        var url = {
          username: this.userInfo.username,
          ip: "",
          terminal_type: 1,
          pid: id,
          device_id: ""
        };
        var urlKey = [];
        for(let k in url){
          urlKey.push(k);
        }
        urlKey.sort();
        function joint(data) {
          let params = '';
          data.forEach(function (v) {
            params += v + url[v];
          });
          return params;
        }
        url = joint(urlKey);
        var mySign = this.SHA1(url);
        var myUrl = this.jointUrl({
          username: this.userInfo.username,
          ip: "",
          terminal_type: 1,
          pid: id,
          device_id: "",
          sign: mySign
        });
        //发起请求
        this.$http.post('/www/api-packs-get_pack',myUrl)
          .then(response => {
            var datas = response.data;
            this.endIndicator();
            if(datas.status == 0){//0成功
              if(datas.data) {
                this.list[index].card = datas.data;
                this.toast('领取礼包码成功');
              } else {
                this.toast('领取礼包码失败');
              }
            }
            if(datas.status == 1){//1失败
              this.toast(datas.msg);
            }
          })
          .catch(error => {
            this.endIndicator();
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
    }
  }
</script>

<style scoped lang="less">

</style>
