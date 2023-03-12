<template>
  <div class="share-store">
    <!-- 分享弹框 -->
    <el-dialog 
      :title="title" 
      :visible.sync="shareDialog" 
      :close-on-click-modal="false" 
      @close="closedFn" 
      width="776px">
      <div class="container">
        <div class="share-left"  ref="capture">
          <img :src="dataObj.image? dataObj.image : imgDefault" alt="公司名片">
          <p class="title">{{dataObj.title}}</p>
          <p class="desc">{{desc}}</p>
          <p class="line"></p>
          <div id="qrcode"  ref="qrcode"></div>
          <p class="remark">扫描或长按进入店铺</p>
        </div>
        <div class="share-right">
          <div >
            <span class="link-name">分享链接</span>
          </div>
          <div class="item_margin">
            <el-input 
              size="small" 
              placeholder="请输入内容" 
              v-model="dataObj.link" 
              style="width:332px;">
              <el-button 
                slot="append" 
                size="small" 
                type="primary"
                @click="copyLink">复制
              </el-button>
            </el-input>
          </div>
          <p class="greyColor">可复制链接或下载二维码海报发送给微信好友或发送至微信朋友圈</p>
          <div class="upload-btn">
            <el-button @click="posterDownload" type="text" >下载完整海报</el-button>
            <!-- <span class="text_btn ">下载完整海报</span> -->
            <el-divider direction="vertical" ></el-divider>
            <!-- <span class="text_btn">仅下载二维码</span> -->
            <el-button @click="QRcodeDownload" type="text" >仅下载二维码</el-button>
          </div>
        </div>
      </div>
      
    </el-dialog>  
    
  </div>
</template>

<script>
import { StoreManageService } from "../services";
const storeManageService = new StoreManageService();
import QRCode from 'qrcodejs2'
import html2canvas from 'html2canvas';
export default {
  name:"Share",
  data(){
    return{
      title:"分享",
      shareDialog:false,
      desc:'优质好货，快来逛逛~',
      dataObj:{
        title:"微微微微微的店",
        link:'https://www.baidu.com',
        image:"",
      },
      imgDefault:require('@/assets/img/inquiry/place_40_40.jpg'),
      qrcode:null 
    }
  },
  watch:{
    shareDialog(val){
      if(val){
        setTimeout(()=>{
          this.qrcodeScan(this.dataObj.link);
        },500)
      }
      
    }
  },
  created(){
    
  },
  mounted(){
    
    this.$bus.$on('getShareInfo',()=>{
      this.getShareInfo();
    })
  },
  
  methods:{
    // 将图片转换为Base64
    imageUrlToBase64(img) {
      // 一定要设置为let，不然图片不显示
      let image = new Image();
      // 解决跨域问题
      image.setAttribute('crossOrigin', 'anonymous');
      // 使用js方式请求图片资源, 需要避免使用缓存，设置url后加上时间戳，或者http头设置Cache-Control为no-cache
      let imageUrl = img + "&time=" + new Date().getTime();
      image.src = imageUrl;
      // image.onload为异步加载
      image.onload = () => {
        this.getImage(image);
      };
    },
    getImage(image) {
      let canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      let context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, image.width, image.height);
      let quality = 0.8;
      // 这里的dataurl就是base64类型
      this.dataObj.image = canvas.toDataURL('image/jpeg', quality);
    },
    qrcodeScan (text) {//生成二维码
      if(this.qrcode){
        this.qrcode.clear();
        this.qrcode.makeCode(text);
      }else{
        this.qrcode = new QRCode('qrcode',{
          width: 76, // 设置宽度，单位像素
          height: 76, // 设置高度，单位像素
          text  // 设置二维码内容或跳转地址
        })
      }
    },
    getShareInfo(){
      storeManageService.getShareInfo().then(res =>{
        this.dataObj = res;
        this.imageUrlToBase64(res.image);
      })
    },
    showDiaolg(){
      this.shareDialog = true;
    },
    closedFn(){
      this.shareDialog = false;
    },
    copyLink(){//复制链接
      var _this = this;
      if(_this.dataObj.link){
        _this.$copyText(_this.dataObj.link).then(function (e) {
          _this.$message({
            message: '已复制到剪贴板',
            type: 'success'
          });
        }, function (e) {
          _this.$message({
            message: '复制失败',
            type: 'error'
          });
        })
      }else{
        _this.$message({
          message: '链接不存在',
          type: 'error'
        });
      }
    },
    posterDownload(){//下载完整海报
      this.$nextTick(()=>{
        html2canvas(this.$refs.capture).then(canvas => {
          let link = document.createElement("a");
          let base64Url = canvas.toDataURL('image/png');//base64
          let blobUrl = this.dataURLtoBlob(base64Url);
          link.href = URL.createObjectURL(blobUrl);//下载链接
          link.setAttribute("download",`${this.dataObj.title}海报.png`);
          link.style.display = "none";//a标签隐藏
          document.body.appendChild(link);
          link.click();
        });
      });
    },
    //将base64转换为blob对象 解决低版本浏览器兼容问题
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(',');
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var mime = arr[0].match(/:(.*?);/)[1];
      var u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type: mime });
    },
    QRcodeDownload(){//仅下载二维码
      html2canvas(this.$refs.qrcode).then(canvas => {
        let link = document.createElement("a");
        link.href = canvas.toDataURL();//下载链接
        link.setAttribute("download",`${this.dataObj.title}二维码.png`);
        link.style.display = "none";//a标签隐藏
        document.body.appendChild(link);
        link.click();
      });
    }
  }
}
</script>

<style lang="less" scoped>
.share-store{
  .container{
    display: flex;
    padding: @padding-size-main 40px 56px;
    background: #FFFFFF;
    .share-left{
      width: 250px;
      height: 504px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: @padding-size-main;
      box-sizing: border-box;
      background: #FFFFFF;
      box-shadow: 0px 3px 6px -4px rgba(0,0,0,0.12);box-shadow: 0px 6px 16px 0px rgba(0,0,0,0.08);box-shadow: 0px 9px 28px 8px rgba(0,0,0,0.05);
      border-radius: 2px;
      img{
        width:100%;
        height: 218px;
        object-fit: cover;
      }
      .title{
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #333333;
        line-height: 28px;
        font-weight: 500;
        margin-top:@margin-size-main;
      }
      .desc{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #999999;
        line-height: 22px;
        font-weight: 400;
        margin-top: 2px;
      }
      .line{
        height: 1px;
        width: 100%;
        margin-top: 16px;
        border-bottom:1px dashed @border-color-base;
      }
      #qrcode{
        width:76px;
        height: 76px; 
        margin-top: 62px;
        border: 1px solid @border-color-base;
        display: inline-block;
        padding: 4px;
        background-color: #fff;
       
      }
      
      .remark{
        margin: 4px 0 16px 0;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #333333;
        line-height: 20px;
        font-weight: 400;
      }
    }
    .share-right{
      flex:1;
      margin-left: 40px;
      .link-name{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        line-height: 22px;
        font-weight: 400;
      }
      /deep/.el-input-group__append{
        color:#FFFFFF;
        background-color:@color-link;
        &:hover{
          opacity: 0.8;
        }
      }
      .upload-btn{
        margin-top: 40px;
        /deep/.el-divider {
          background-color: @color-link;
          margin: -3px 8px 0;
        }
      }
  
    }
    .item_margin{
      margin:@margin-size-main 0;
    }
  }
}
</style>