<!--我要卖号-->
<template>
  <div class="sell_product">
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">我要卖号</div>
      <div class="head_right"></div>
    </div>
    <div class="sell_main">
      <div class="row">
        <div class="row_title">
          <div class="row_title_left">游戏名</div>
          <div class="row_title_right">{{ $route.params.gamename }}</div>
        </div>
      </div>
      <div class="row">
        <div class="row_title">
          <div class="row_title_left">账号</div>
          <div class="row_title_right">{{ $route.params.sdkUsername }}</div>
        </div>
      </div>
      <div class="row">
        <div class="row_title">
          <div class="row_title_left"><label for="serverName">游戏区服</label></div>
          <div class="row_title_right">
            <input type="text" placeholder="请填写区服信息" id="serverName" v-model="serverName">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="row_title">
          <div class="row_title_left">游戏平台</div>
          <div class="row_title_right">
            <span>{{ $route.params.system|F_system }}</span>
            <i class="icon_right_black m_l"></i>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="row_title">
          <div class="row_title_left"><label for="price">出售价格</label></div>
          <div class="row_title_right">
            <input type="number" placeholder="不得低于20.0元" id="price" v-model="price" @keydown="keydownNum($event)" @keyup="keyupNum($event)">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="row_title">
          <div class="row_title_left"><label for="title">商品标题</label></div>
          <div class="row_title_right">
            <input type="text" placeholder="请勿留下联系方式(20字内)" maxlength="24" id="title" v-model="title">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="row_title">
          <div class="row_title_left">有效期</div>
          <div class="row_title_right" @click="openTime('picker1');">
            <!--<input type="text" placeholder="选择商品有效期" id="endTime" v-model="endTime">-->
            <span class="color_bcbcbc">{{ endTime||'选择商品有效期' }}</span>
            <i class="icon_right_black m_l"></i>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="row_title">
          <div class="row_title_left"><label for="desc">商品描述</label></div>
        </div>
        <div class="desc">
          <textarea placeholder="可以按照账号等级、装备、道具等。(200字内,填写描述，可以更快速完成交易喔!)" maxlength="200" id="desc" v-model="desc"></textarea>
        </div>
      </div>
      <div class="row row_img">
        <div class="row_title">
          <div class="row_title_left">游戏截图</div>
          <div class="row_title_right color_bcbcbc">2-7张游戏内截图</div>
        </div>
        <input type="file" name="" id="imgs" accept="image/jpg,image/jpeg,image/png" v-show="false" @change="upload($event, 1)">
        <div class="row_imgs">
          <div class="row_imgs_li" v-for="(v,i) in imgsArr">
            <img :src="v">
            <i class="icon_clear2" @click="imgsArr.splice(i, 1);imgs.splice(i, 1);"></i>
          </div>
          <div class="row_imgs_li" v-show="imgsArr.length < 7">
            <label for="imgs"><img src="../../../static/img/19_icon_jiatupian.png"></label>
          </div>
        </div>
      </div>
      <div class="row row_img">
        <div class="row_title">
          <div class="row_title_left">充值订单截图</div>
          <div class="row_title_right color_bcbcbc">2-7张充值订单截图</div>
        </div>
        <div class="row_img_account small3 color_blue">*至少得包含40%以上得金额订单，可以是微信、支付宝等支付记录，不满足要求无法审核通过</div>
        <input type="file" name="" id="tradeImgs" accept="image/jpg,image/jpeg,image/png" v-show="false" @change="upload($event, 2)">
        <div class="row_imgs">
          <div class="row_imgs_li" v-for="(v,i) in tradeImgsArr">
            <img :src="v">
            <i class="icon_clear2" @click="tradeImgsArr.splice(i, 1);tradeImgs.splice(i, 1);"></i>
          </div>
          <div class="row_imgs_li" v-show="tradeImgsArr.length < 7">
            <label for="tradeImgs"><img src="../../../static/img/19_icon_jiatupian.png"></label>
          </div>
        </div>
      </div>
    </div>
    <div class="sell_footer">
      <div class="sell_footer_btn" @click="sellProduct">确认出售</div>
    </div>
    <mt-datetime-picker
      ref="picker1"
      type="date"
      v-model="endTimeValue"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDate"
      :endDate="endDate"
      @confirm="setEndTime">
    </mt-datetime-picker>
	</div>
</template>
<script>
  import Exif from 'exif-js'
  import { Toast } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
  	data: function () {
      return {
        serverName: '', //游戏区服
        price: '', //出售价格
        title: '', //商品标题
        endTime: '', //有效期
        desc: '', //商品描述
        imgs: [], //游戏截图
        tradeImgs: [], //交易截图
        imgsArr: [],
        tradeImgsArr: [],
        endTimeValue: new Date(),//结束日期初始值
        startDate: new Date(),
        endDate: new Date('2100'),
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'traUserInfo'
      ]),
    },
    created() {

		},
		mounted(){
			this.$nextTick(function () {
			    console.log(this.traUserInfo)
        console.log(this.$route.params.sdkUsername)
			});
		},
    watch: {//使用watch 监听$router的变化
      imgs:{
        handler:function(val,oldval){
          console.log(val)
        },
//        deep:true//对象内部的属性监听，也叫深度监听
      },
    },
    filters: {
      F_system: (type) => {
        if(type == 1){
          type = '安卓';
        } else if(type == 2){
          type = 'ios';
        } else if(type == 3){
          type = '双端';
        } else {
          type = '不限';
        }
        return type;
      }
    },
    methods: {
      toast (msg) {
        let msgs = msg || '提示';
        Toast({
          message: msgs,
          duration: 2000,
          className: 'm_toast'
        });
      },
      keyupNum(){
        if ( isNaN(this.price) ) {
          this.price = '';
        }
      },
      keydownNum(event) {
        if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39)){
          if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)||(event.keyCode==110))){
            event.returnValue=false;
          }
        }
      },
      //有效期
      setEndTime(value){
//        console.log(this.myType.formatTimeD(Date.parse(value)));
        this.endTime = this.myType.formatTimeD(Date.parse(value));
      },
      openTime(picker) {
        this.$refs[picker].open();//显示日期表
      },
      upload (e, imgType) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.picValue = files[0];
        this.imgPreview(this.picValue, imgType);
      },
      imgPreview (file, imgType) {
//console.log(file);
        let self = this;
        if(imgType == 1){
          self.imgs.push(file);
        } else if(imgType == 2) {
          self.tradeImgs.push(file);
        }
        let Orientation;
        //去获取拍照时的信息，解决拍出来的照片旋转问题
        Exif.getData(file, function(){
          Orientation = Exif.getTag(this, 'Orientation');
        });
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return;
        if (/^image/.test(file.type)) {
          // 创建一个reader
          let reader = new FileReader();
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(file);

          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result;
            let img = new Image();
            img.src = result;
            if(imgType == 1){
              self.imgsArr.push(this.result);
            } else if(imgType == 2) {
              self.tradeImgsArr.push(this.result);
            }
          }
        }
      },
      //提交商品信息
      sellProduct(){
        if(!this.serverName){
          this.toast('未填游戏区服');
          return
        }
        if(!this.price){
          this.toast('未填出售价格');
          return
        } else if(Number(this.price) < 20){
          this.toast('出售价格不能低于20.0元');
          return
        }
        if(!this.title){
          this.toast('未填商品标题');
          return
        }
        var url = this.jointUrl({
          uid: this.traUserInfo.uid,
          appid: this.$route.params.appid,
          title: this.title,  //标题（不能大于24个字符）
          sdk_username: this.$route.params.sdkUsername,
          price: this.price,  //价格（不能低于20元）
          desc: this.desc,
          system: this.$route.params.system,
          server_name: this.serverName, //区服
          end_time: this.endTime
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.traUserInfo.uid,
          appid: this.$route.params.appid,
          title: this.title,  //标题（不能大于24个字符）
          sdk_username: this.$route.params.sdkUsername,
          price: this.price,  //价格（不能低于20元）
          desc: this.desc,
          system: this.$route.params.system,
          server_name: this.serverName, //区服
          end_time: this.endTime,
          imgs: this.imgs,
          trade_imgs: this.tradeImgs,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=Products&a=sell_product',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas)
            if(datas.status == 1){//1成功
              this.toast(datas.msg);
              this.$router.replace({path:'/tra_accounts'});
            } else if(datas.status == 0){//0失败
              this.toast(datas.msg);
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
  .sell_product{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    .sell_main{
      width: 100%;
      flex: 1;
      overflow-y: auto;
      .row{
        /*height: 3.4rem;*/
        padding: 1rem .8rem;
        border-bottom: 1px solid #f0f0f0;
        .row_title{
          display: flex;
          align-items: center;
          .row_title_left{
            flex: 1;
            display: flex;
            align-items: center;
          }
          .row_title_right{
            display: flex;
            align-items: center;
          }
          input{
            width: 12rem;
            text-align: right;
            border: none;
          }
        }
        .desc{
          margin-top: .5rem;
          padding: .5rem;
          border-radius: .5rem;
          border: 1px solid #dddddd;
          textarea{
            width: 100%;
            height: 5rem;
            border: none;
          }
        }
        .row_imgs{
          display: flex;
          flex-wrap: wrap;
          .row_imgs_li{
            width: 21%;
            height: 21vw;
            margin: .5rem 2%;
            overflow: hidden;
            position: relative;
            z-index: 1;
            img{
              width: 100%;
              height: 100%;
              border-radius: .35rem;
            }
          }
        }
      }
      .row_img{
        margin: 0;
        padding: 1rem 0 .5rem;
        /*border: none;*/
        .row_title{
          padding: 0 .8rem;
        }
        .row_img_account{
          padding: .5rem .8rem 0;
        }
      }
    }
    .sell_footer{
      padding: .5rem 2rem;
      background-color: #ffffff;
      .sell_footer_btn{
        display: block;
        width: 100%;
        height: 2rem;
        font-size: 1.1rem;
        text-align: center;
        line-height: 2rem;
        border-radius: 1rem;
        color: #ffffff;
        background-color: #29a1f7;
      }
    }
  }
</style>
