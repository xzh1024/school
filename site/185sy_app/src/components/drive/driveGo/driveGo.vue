<!--签到-->
<template>
  <div class="driveGo">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        我要发表
      </div>
      <div class="head_right">
        <span @click="driveGo">发布</span>
      </div>
    </div>
    <div class="driveGo_main">
      <div class="driveEdit">
        <div class="textareaBox">
          <textarea name="" id="" placeholder="分享新鲜事..." class="driveTextarea" v-model="driveContent"></textarea>
          <i class="icon_clear" v-show="driveContent" @click="driveContent = '';"></i>
        </div>
          <input type="file" name="" id="upload1" accept="image/jpg,image/jpeg,image/png" @change="upload" style="width: 0; height: 0; overflow: hidden;">
          <input type="file" name="" id="upload2" accept="image/gif" @change="upload" style="width: 0; height: 0; overflow: hidden;">
        <div class="upimgs">
          <div class="upimg" v-for="(v,i) in imgArr">
            <div class="upimg_box">
              <img :src="v"/>
              <!--<img class="wc-preview-img" v-for="(url, key) in imgArr" :key="key" :src="url" @click.stop="$preview($event, imgArr, key)">-->
              <i class="icon_clear2 upimg_clear" @click.stop="imgClear(i)"></i>
            </div>
          </div>
          <!--<img class="upimg" v-for="(v,i) in imgArr" :src="v" @click="imgClear(i)"/>-->
          <img class="upimg" src="../../../static/img/19_icon_jiatupian.png" alt="" @click="popupVisible = true;" v-show="imgArr.length < imgArrLen">
        </div>
      </div>
      <div class="small2 color_888888">
        （建议上传单张图片大小不超过2M）
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class="popupBox f_s2">
        <div class="popupBoxLi">选择上传图片类型</div>
        <label for="upload1" class="popupBoxLi color_ff7900" @click="imgArrLen = 4; popupVisible = false;">选择静态图</label>
        <label for="upload2" class="popupBoxLi color_ff3e3e" @click="imgArr.length = 0; imgArrLen = 1; popupVisible = false;">选择GIF图</label>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import Exif from 'exif-js'
  import { Toast, Indicator } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
    data: function () {
      return {
        user: {
          icon_url: '',
          nick_name: '',
          user_name: '',
          user_id: 0
        },
        driveContent: '',
        popupVisible: false,
        imgArr: [],
        imgArrLen: 1,
        picValue: '',
        driveFlag: false,
        imgs: []
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created() {
//      this.getUser();
    },
    mounted(){
      this.$nextTick(function () {

      });
    },
    methods: {
      imgClear(index){
        this.imgArr.splice(index, 1);
        this.imgs.splice(index, 1);
      },
      driveGo(){
        if(this.driveContent){
          console.log(this.driveContent);
          this.publishDynamics();
        } else {
          this.toast('说点什么吧');
        }
      },
      toast (msg) {
        var msg = msg || '提示';
        Toast({
          message: msg,
          duration: 2000,
          className: 'm_toast'
        });
      },
      indicator (msg) {
        var msg = msg || '提示';
        Indicator.open({
          text: msg,
          spinnerType: 'fading-circle'
        })
      },
      endIndicator () {
        Indicator.close();
      },
      //上传动态
      publishDynamics() {
        if(!this.driveFlag){
//          var _this = this;
          this.driveFlag = true;
          this.indicator('正在后台上传请稍等');
          let imgArr = this.imgs;
//          for(let i=0,len=imgArr.length; i < len; i++){
////            console.log(imgArr[i]);
////            imgArr[i] = this.dataURLtoBlob(imgArr[i]);
//            imgArr[i] = this.dataURLtoBlob(imgArr[i]);
////            imgArr[i] = new imgArr[i];
////            imgArr[i].name = 'test1.png'
//            console.log(imgArr[i]);
//          }

          var url = this.jointUrl({
            uid: this.userInfo.id,
            content: this.driveContent
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          var formData = new FormData();
          formData.append("uid", this.userInfo.id);
          formData.append("content", this.driveContent);
          formData.append("sign", mySign);
          for(let i = 0; i < imgArr.length; i++) {
            formData.append('imgs['+i+']', imgArr[i]);
          }
          this.$http({
            url: '/api/index.php?g=api&m=dynamics&a=publishDynamics',
            method: 'post',
            data: formData,
            processData: false, // 不会将 data 参数序列化字符串
            contentType: false, // 根据表单 input 提交的数据使用其默认的 contentType
//              headers: {'Content-Type': 'multipart/form-data'}
          })
            .then(response => {
              var datas = response.data;
              console.log(datas)
              if(datas.status == 1){//1成功
                this.toast('动态提交成功，请等待审核');
                this.$router.go(-1);
              } else if(datas.status == 0){//0失败
                this.toast(datas.msg);
                this.imgArr = [];
                this.imgs = [];
                console.log('请求失败：' + datas.msg);
              }
              this.endIndicator();
              this.getUserCenter();
              this.driveFlag = false;
            })
            .catch(error => {
              this.endIndicator();
              this.driveFlag = false;
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });

//          setTimeout(()=>{
//              console.log(imgArr)
//            var url = this.jointUrl({
//              uid: this.user.user_id,
//              content: this.driveContent
//            });
//            var mySign = md5(url + this.myType.key1).toLowerCase();
//            var myUrl = this.jointUrl({
//              uid: this.user.user_id,
//              content: this.driveContent,
//              sign: mySign,
//              imgs: imgArr
//            });
//            var formData = new FormData();
//            formData.append("uid", this.user.user_id);
//            formData.append("content", this.driveContent);
//            formData.append("sign", mySign);
//            formData.append("imgs", imgArr);
//            console.log(formData.get('content'));
//            console.log(formData.get('imgs'));
//            const instance = this.$http.create({
//              withCredentials: true
//            });
//            let config = {
//              headers: {
//                'Content-Type': 'multipart/form-data'
//              }
//            };
//            //获取签到信息
//            instance.post('/api/index.php?g=api&m=dynamics&a=publishDynamics',formData)
//              .then(response => {
//                console.log(response);
//                var datas = response.data;
//                console.log(datas);
//                if(datas.status == 1){//1成功
//                  this.toast('动态提交成功，请等待审核');
//                  this.$router.go(-1);
//                } else if(datas.status == 0){//0失败
//                  console.log('请求失败：' + datas.msg);
//                }
//                this.endIndicator();
//                this.driveFlag = false;
//              })
//              .catch(error => {
//                this.endIndicator();
//                this.driveFlag = false;
//                console.log('请求失败：' + error.status + '，' + error.statusText);
//              });
//          }, 1000);

        }
      },
      dataURLtoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: mimeString});
      },
//      blobToDataURL(blobFile, callback) {
//        var reader = new FileReader();  //异步
////        var reader = new BinaryFile();  //同步
//        reader.onload = function (e) { callback(e.target.result); }
////        reader.readAsDataURL(blobFile);
//        reader.readAsArrayBuffer(blobFile);
////        reader.readAsBinaryString(blobFile);
//      },
      upload (e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.picValue = files[0];
        this.imgPreview(this.picValue);
      },
      imgPreview (file) {
console.log(file);
        this.imgs.push(file);
        let self = this;
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
console.log(reader);

          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result;
            let img = new Image();
            img.src = result;
            //判断图片是否大于2M,是就压缩图片，反之直接上传
//            if (this.result.length <= (2000 * 1024)) {
//              self.imgArr.push(this.result);
//              self.postImg();
//            }else {
//              img.onload = function () {
//                let data = self.compress(img,Orientation);
//                self.imgArr.push(data);
//                self.postImg();
//              }
//            }
            self.imgArr.push(this.result);
//            console.log(this)
//            console.log(self.imgArr)
          }
        }
      },
      postImg () {
        //这里写接口
      },
      rotateImg (img, direction,canvas) {
        //最小与最大旋转方向，图片旋转4次后回到原方向
        const min_step = 0;
        const max_step = 3;
        if (img == null)return;
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        let height = img.height;
        let width = img.width;
        let step = 2;
        if (step == null) {
          step = min_step;
        }
        if (direction == 'right') {
          step++;
          //旋转到原位置，即超过最大值
          step > max_step && (step = min_step);
        } else {
          step--;
          step < min_step && (step = max_step);
        }
        //旋转角度以弧度值为参数
        let degree = step * 90 * Math.PI / 180;
        let ctx = canvas.getContext('2d');
        switch (step) {
          case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
          case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
          case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
          case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
        }
      },
      compress(img,Orientation) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        //瓦片canvas
        let tCanvas = document.createElement("canvas");
        let tctx = tCanvas.getContext("2d");
        let initSize = img.src.length;
        let width = img.width;
        let height = img.height;
        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio;
        if ((ratio = width * height / 4000000) > 1) {
          console.log("大于400万像素")
          ratio = Math.sqrt(ratio);
          width /= ratio;
          height /= ratio;
        } else {
          ratio = 1;
        }
        canvas.width = width;
        canvas.height = height;
        //        铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //如果图片像素大于100万则使用瓦片绘制
        let count;
        if ((count = width * height / 1000000) > 1) {
          console.log("超过100W像素");
          count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
          //            计算每块瓦片的宽和高
          let nw = ~~(width / count);
          let nh = ~~(height / count);
          tCanvas.width = nw;
          tCanvas.height = nh;
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height);
        }
        //修复ios上传图片的时候 被旋转的问题
        if(Orientation != "" && Orientation != 1){
          switch(Orientation){
            case 6://需要顺时针（向左）90度旋转
              this.rotateImg(img,'left',canvas);
              break;
            case 8://需要逆时针（向右）90度旋转
              this.rotateImg(img,'right',canvas);
              break;
            case 3://需要180度旋转
              this.rotateImg(img,'right',canvas);//转两次
              this.rotateImg(img,'right',canvas);
              break;
          }
        }
        //进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', 0.1);
        console.log('压缩前：' + initSize);
        console.log('压缩后：' + ndata.length);
        console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        return ndata;
      },
      //获取用户中心
      getUserCenter(){
        let url = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel
        });
        let mySign = md5(url + this.myType.key1).toLowerCase();
        let myUrl = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=userbox&a=user_center',myUrl)
          .then(response => {
            var datas = response.data;
            console.log(datas)
            if(datas.status == 1){//1成功
              if(datas.data){
                let data = datas.data;
                let money = {};
                money.coin = data.coin;
                money.platform_money = data.platform_money;
                this.$store.dispatch('setUserMoney',money);
              }
            } else if(datas.msg){
              console.log(datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
    }
  }
</script>

<style scoped lang="less">
  .driveGo{
    height: 100%;
    width: 100%;
    /*flex: 1;*/
    display: flex;
    flex-direction: column;
    .driveGo_main{
      flex: 1;
      overflow-y: auto;
      background-color: #f0f0f0;
      .driveEdit{
        background: #ffffff;
        padding: .6rem;
        margin-top: .6rem;
        .textareaBox{
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          .driveTextarea{
            border: none;
            flex: 1;
            height: 8.4rem;
            line-height: 1.4rem;
            font-size: .85rem;
          }
        }
        /*.upimg{*/
          /*display: flex;*/
          /*img{*/
            /*width: 25%;*/
            /*height: 25%;*/
          /*}*/
        /*}*/
        .upimgs {
          position: relative;
          width: 100%;
          height: 0px;
          padding-top: 22%;
          .upimg{
            /*display:block;*/
            width: 100%;
            height: 100%;
            border-radius: .35rem;
            overflow: hidden;
            .upimg_box{
              width: 100%;
              height: 100%;
              position: relative;
              img{
                width: 100%;
                height: 100%;
              }
              .upimg_clear{
                /*position: absolute;*/
                /*top: 0;*/
                /*right: 0;*/
                /*display: inline-block;*/
                /*width: 1.5rem;*/
                /*height: 1.5rem;*/
                /*border-radius: 0 0.35rem 0 0.35rem;*/
                /*background: url("../../../../static/img/c_clear.png") no-repeat;*/
                /*background-size: 100% 100%;*/
              }
            }
          }
          & .upimg:nth-child(1){
            position: absolute;
            top: 0;
            left: 0;
            width: 22%;
            height: 100%;
          }
          & .upimg:nth-child(2){
            position: absolute;
            top: 0;
            left: 22%;
            width: 22%;
            height: 100%;
            margin-left: 4%;
          }
          & .upimg:nth-child(3){
            position: absolute;
            top: 0;
            left: 48%;
            width: 22%;
            height: 100%;
            margin-left: 4%;
          }
          & .upimg:nth-child(4){
            position: absolute;
            top: 0;
            left: 74%;
            width: 22%;
            height: 100%;
            margin-left: 4%;
          }
        }
        /*.upimg:before {*/
          /*content: "";*/
          /*display: block;*/
          /*padding-top: 100%;*/
        /*}*/
      }
    }
    .popupBox{
      .popupBoxLi{
        display: block;
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        overflow: hidden;
        border-bottom: 1px solid #eeeeee;
      }
    }
  }
</style>
