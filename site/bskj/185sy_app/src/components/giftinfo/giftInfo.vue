<!--礼包详情-->
<template>
  <div class="giftInfo">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        礼包详情
      </div>
      <div class="head_right">
        <a class="icon_download" :href="giftInfoData.download_url" :download="giftInfoData.web_pack"></a>
      </div>
    </div>
    <div class="gi_main">
      <div class="gi_one border_dcdcdc">
        <img class="gi_l" :src="giftInfoData.logo"></img>
        <div class="gi_c">
          <div class="gi_c_t">{{ giftInfoData.game_name }}</div>
          <div class="gi_c_c color_837f7e">{{ giftInfoData.game_size|gameSize }}</div>
          <div class="gi_c_b color_ababab" v-text="giftInfoData.game_content"></div>
        </div>
        <a class="btn_blue_ye" v-if="giftInfoData.download_url" :href="giftInfoData.download_url" :download="giftInfoData.web_pack">下载</a>
      </div>
      <div class="gi_gift border_f0f0f0" v-if="giftInfoData.pack_name">
        <div class="gi_gift_l">
          <div class="gi_gift_name f_s1 color_837f7e" v-text="giftInfoData.pack_name"></div>
          <div class="gi_gift_remain">
            <p class="gi_gift_bar">
              <span class="gi_gift_bar_fill" :style="{width:giftInfoData.pack_remain_counts +'%'}"></span>
            </p>
            <p class="gi_gift_remain_b color_757575">(剩余<span v-text="giftInfoData.pack_remain_counts"></span>%)</p>
          </div>
        </div>
        <button class="btn_blue_not" v-if="!giftInfoData.card" @click="getCard(giftInfoData.id)">领取</button>
        <button type="button" class="btn_blue_ye" v-if="giftInfoData.card"
                v-clipboard:copy="giftInfoData.card"
                v-clipboard:success.stop="onCopy"
                v-clipboard:error.stop="onError">复制</button>
      </div>
      <div class="gi_box border_f0f0f0" v-if="giftInfoData.pack_abstract">
        <div class="gi_box_title f_s1 color_blue strong">礼包内容</div>
        <div class="gi_box_cont color_837f7e" v-text="giftInfoData.pack_abstract"></div>
      </div>
      <div class="gi_box border_f0f0f0" v-if="giftInfoData.pack_method">
        <div class="gi_box_title f_s1 color_blue strong">兑换方法</div>
        <div class="gi_box_cont color_837f7e" v-text="giftInfoData.pack_method"></div>
      </div>
      <div class="gi_box border_f0f0f0" v-if="giftInfoData.pack_notice">
        <div class="gi_box_title f_s1 color_blue strong">注意事项</div>
        <div class="gi_box_cont color_ff3e3e" v-text="giftInfoData.pack_notice"></div>
      </div>
      <div class="gi_box border_f0f0f0" v-if="giftInfoData.start_time">
        <div class="gi_box_title f_s1 color_blue strong">礼包时间</div>
        <div class="gi_box_cont color_837f7e">
          <p>开始时间：<span v-text="giftInfoData.start_time"></span></p>
          <p>结束时间：<span v-text="giftInfoData.end_time"></span></p>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
  import { Toast, Indicator, MessageBox } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
  	data: function () {
      return {
        giftInfoData: {},
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created() {
      this.getGiftInfo();
		},
		mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
			this.$nextTick(function () {
//			    console.log(this.$route.params.pid);
			});
		},
    filters: {	//自定义局部过滤器
      gameSize: (data) => {//过滤显示下载量
        return data += 'M'
      }
    },
    methods: {
      onCopy: function (e) {
        this.messageBox();
      },
      onError: function (e) {
        this.toast('Failed to copy texts');
      },
      toast (msg) {
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
      //礼包详情
      getGiftInfo(){
        var url = this.jointUrl({
          pid: this.$route.params.pid,
          username: this.userInfo.username,
          channel: this.myType.channel,
          machine_code: "",
          terminal_type: 1,//1 为web 2为手机端
          system: this.myType.system
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=package&a=pack_info',{
          params: {
            pid: this.$route.params.pid,
            username: this.userInfo.username,
            channel: this.myType.channel,
            machine_code: "",
            terminal_type: 1,//1 为web 2为手机端
            system: this.myType.system,
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              let data = datas.data;
              console.log(data)
              if(this.myType.system == 1){
                data.web_pack = data.android_pack;
                data.start_time = this.myType.formatTimeM(data.start_time);
                data.end_time = this.myType.formatTimeM(data.end_time);
                data.pack_remain_counts = Math.floor((data.pack_counts - data.pack_used_counts)/data.pack_counts*100);//剩余的
              }
              if(this.myType.system == 2){
                data.web_pack = data.ios_pack;
                data.start_time = this.myType.formatTimeM(data.start_time);
                data.end_time = this.myType.formatTimeM(data.end_time);
                data.pack_remain_counts = Math.floor((data.pack_counts - data.pack_used_counts)/data.pack_counts*100);//剩余的
              }
              console.log(this)
              this.giftInfoData = data;
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      //领取礼包
      getCard(id) {
        this.indicator();//开启加载提示动画
        var url = {
          username: this.userInfo.username,
          ip: "",
          terminal_type: 1,//领取终端：1为网页版 2为APP端
          pid: id,//礼包ID
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
        //发起请求
        this.$http.get('/www/api-packs-get_pack',{
          params: {
            username: this.userInfo.username,
            ip: "",
            terminal_type: 1,
            pid: id,
            device_id: "",
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            this.endIndicator();
            if(datas.status == 0){//0成功
              if(datas.data) {
                this.giftInfoData.card = datas.data;
//                this.getGiftInfo();
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
      }
    }
  }
</script>

<style scoped lang="less">
  .giftInfo{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .gi_main{
      flex: 1;
      overflow-y: auto;
      .gi_one{
        height: 4rem;
        padding: .8rem 1.3rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: #fff;
        .gi_l{
          display: inline-block;
          width: 3.9rem;
          height: 3.9rem;
          border-radius: .5rem;
          margin-right: .7rem;
        }
        .gi_c{
          flex: 1;
          height: 100%;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-content: flex-start;
          .gi_c_c,.gi_c_b{
            font-size: .85rem;
            white-space: nowrap;
            overflow-x: hidden;
            text-overflow: ellipsis;
          }
        }
        /*.gi_r{*/
          /*outline: none;*/
          /*width: 4rem;*/
          /*line-height: 1rem;*/
          /*padding: .3rem 0;*/
          /*text-align: center;*/
          /*border-radius: .2rem;*/
          /*color: #ff7900;*/
          /*border: 1px solid #ff7900;*/
        /*}*/
      }
      .gi_gift{
        padding: .6rem;
        display: flex;
        align-items: center;
        .gi_gift_l{
          flex: 1;
          .gi_gift_remain{
            margin-top: .8rem;
            display: flex;
            align-items: center;
            .gi_gift_bar{
              flex: 1;
              height: 1px;
              border: 1px solid #29a1f7;
              border-radius: 1px;
              .gi_gift_bar_fill{
                height: 100%;
                background-color: #29a1f7;
                display: block;
              }
            }
            .gi_gift_remain_b{
              width: 6rem;
              margin-left: .5rem;
              font-size: .89rem;
              overflow: hidden;
            }
          }
        }
        .gi_gift_r{
          outline: none;
          width: 4rem;
          line-height: 1rem;
          padding: .3rem 0;
          text-align: center;
          border-radius: .2rem;
          color: #fff;
          background-color: #ccb210;
          border: 1px solid #ccb210;
        }
      }
      .gi_box{
        padding: .6rem;
        .gi_box_title{
          /*font-size: 1.1rem;*/
        }
        .gi_box_cont{
          margin-top: .8rem;
        }
      }
    }
  }
</style>
