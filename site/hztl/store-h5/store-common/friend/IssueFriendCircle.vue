<template>
    <div class="friend-issue">
        <div class="head-brand">
            <span class="backToHome" @click="backHome()"></span>
            <a class="add-address" @click="issue()">发布</a>
        </div>
        <div class="content">
            <textarea
                name="issueFriendContext"
                cols="30"
                rows="10"
                maxlength="1000"
                class="issueFriendContext"
                v-model="postData.content"
                placeholder="输入您要分享的内容..."
            ></textarea>
            <p class="word-length">
                <span>{{postData.content.length}}</span>/1000
            </p>
            <div class="file-upload van-uploader" v-if="isWeixin">
                <div class="van-uploader__wrapper">
                    <div
                        class="van-uploader__preview"
                        v-for="(value,index) in fileList"
                        :key="value"
                    >
                        <div
                            class="van-image van-uploader__preview-image"
                            style="overflow: hidden; border-radius: 4px;"
                        >
                            <img
                                class="van-image__img"
                                style="object-fit: cover;"
                                :src="value"
                                @click="previewImage(index)"
                            >
                        </div>
                        <i
                            class="van-icon van-icon-clear van-uploader__preview-delete"
                            @click="deletePic(index)"
                        ></i>
                    </div>
                    <div class="van-uploader__upload" v-if="fileList.length<9">
                        <i class="van-icon van-icon-plus van-uploader__upload-icon"></i>
                        <div class="van-uploader__input" @click="beforeRead()"></div>
                    </div>
                </div>
            </div>
            <van-uploader
                v-if="!isWeixin"
                v-model="fileList"
                multiple
                :max-count="9"
                class="file-upload"
                :before-read="beforeReadNormal"
                @delete="Delete"
            />
        </div>
        <van-overlay :show="show">
            <div class="wrapper" @click.stop>
                <div class="block">
                    <van-loading size="0.64rem" vertical>上传中...</van-loading>
                </div>
            </div>
        </van-overlay>
    </div>
</template>
<script>
import Vue from "vue";
import request, { URL_MODULE } from "@/request";
import { wxSign } from "@/api/wx";
import { Uploader, Toast, Loading, Overlay, ImagePreview } from "vant";
Vue.use(Uploader)
  .use(Toast)
  .use(Loading)
  .use(Overlay)
  .use(ImagePreview);
import * as qiniu from "qiniu-js";
import wx from "weixin-js-sdk";

Vue.use(Uploader);
export default {
  name: "issueFriendCircle",
  data() {
    return {
      postData: {
        content: "",
        pictures: []
      },
      fileList: [],
      uploadFileList: [],
      show: false,
      upIndex: 0,
      isWeixin: true,
    };
  },
  mounted() {
    let ua = navigator.userAgent.toLowerCase();
    if(ua.indexOf("micromessenger") != -1&&this.axios.prototype.hasOffiAccount){
      this.isWeixin=true;
    }else{
      this.isWeixin=false;
    }
  },
  methods: {
    backHome() {
      this.$router.push("/friendCircle");
    },
    Delete(file, detail) {
      this.postData.pictures.splice(detail.index, 1);
    },
    beforeReadNormal(file) {
      this.show = true;
      let that = this;
      return new Promise((resolve, reject) => {
        if (file.length > 1) {
          let uploadLength = 0;
          if (this.postData.pictures.length + file.length > 9) {
            this.show = false;
            Toast.fail("最多只能上传9张图片");
            reject();
          } else {
            for (let fileEach of file) {
              this.getToken(fileEach)
                .then(picUrl => {
                  if (!picUrl) {
                    reject();
                  } else {
                    uploadLength++;
                    this.postData.pictures.push(picUrl);
                    if (uploadLength == file.length) {
                      this.show = false;
                    }
                    resolve();
                  }
                })
                .catch(error => {
                  this.show = false;
                  Toast.fail("图片上传失败！");
                });
            }
          }
        } else {
          if (this.postData.pictures.length >= 9) {
            this.show = false;
            Toast.fail("最多只能上传9张图片");
            reject();
          } else {
            this.getToken(file)
              .then(picUrl => {
                if (!picUrl) {
                  reject();
                } else {
                  this.postData.pictures.push(picUrl);
                  this.show = false;
                  resolve();
                }
              })
              .catch(error => {
                this.show = false;
                Toast.fail("图片上传失败！");
              });
          }
        }
      });
    },
    beforeRead() {
      let that = this;
      // 微信上传图片工具
      wx.chooseImage({
        count: 9 - that.postData.pictures.length, // 默认9
        // sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        // sourceType: ["camera", "album"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(respos) {
          that.show = true;
          that.uploadFileList = respos.localIds;
          that.uploadImgToWx();
        }
      });
    },
    uploadImgToWx() {
      let that = this;
      wx.uploadImage({
        localId: that.uploadFileList[that.upIndex], // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 0, // 默认为1，显示进度提示
        success: function(resp) {
          that.getFileImgFromWx(that.uploadFileList[that.upIndex]);
        },
        fail: function(error) {
          var picPath = "";
          //localIds = '';
          alert(JSON.stringify(error));
        }
      });
    },
    getToken(file) {
      let that = this;
      //获取七牛的上传图片token
      return new Promise(resolve => {

        $.ajax({
          type: "get",
          url: URL_MODULE.accounts + "/img/upToken",
          async: false,
          xhrFields: {
            withCredentials: true
          },
          success: function(data) {
            if (data.code == "ok") {
              let sendData = data.data;
              var postFile = {};
              let UploadFile = {};
              if (that.isWeixin) {
                UploadFile = that.dataURLtoFile(file, sendData.key);
                postFile = UploadFile;
              }else{
                  postFile = file;
              }
              let observer = {
                error(err) {
                  // console.log(err);
                  resolve(false);
                },
                complete(res) {
                  if (res && res.key) {
                    resolve(sendData.url);
                  } else {
                    resolve(false);
                  }
                }
              };
              let putExtra = {
                fname: sendData.key,
                params: {},
                mimeType: ["image/png", "image/jpeg", "image/jpg"]
              };
              let config = {
                useCdnDomain: true,
                region: "z1"
              };

              let options = {
                qulity: 0.92,
                noCompressIfLarger: true
                // maxWidth: 800
              };
              //上传前压缩
              let observable = qiniu.upload(
                postFile,
                sendData.key,
                sendData.token,
                putExtra
                //   config
              );
              let subscription = observable.subscribe(observer); // 上传开始
              //   qiniu.compressImage(file, options).then(data => {
              //   });
            } else {
              Toast.fail(data.message);
            }
          }
        });
      });
    },
    issue() {
      request({
        method: "post",
        url: "/offiaccount/moments",
        data: this.postData
      }).then(() => {
        this.$router.push("/friendCircle");
      });
    },
    deletePic(index) {
      this.postData.pictures.splice(index, 1);
      this.fileList.splice(index, 1);
    },
    previewImage(index) {
      this.preview = ImagePreview({
        images: this.fileList,
        startPosition: index,
        onClose() {
          this.preview = {};
        }
      });
    },
    getFileImgFromWx(file) {
      let that = this;
      wx.getLocalImgData({
        localId: file, // 图片的localID
        success: function(respo) {
          var localData = respo.localData; // localData是图片的base64数据，可以用img标签显示
          if (localData.indexOf("data:image") != 0) {
            //判断是否有这样的头部
            localData = "data:image/jpeg;base64," + localData;
          }
          localData = localData
            .replace(/\r|\n/g, "")
            .replace("data:image/jgp", "data:image/jpeg");
          //将base64转换成文件，再调用七牛上传
          that.getToken(localData).then(picUrl => {
            if (!picUrl) {
              Toast("上传失败");
            } else {
              that.postData.pictures.push(picUrl);
              that.fileList.push(localData);
              if (that.upIndex + 1 == that.uploadFileList.length) {
                that.show = false;
                that.uploadFileList = [];
                that.upIndex = 0;
              } else {
                that.upIndex++;
                that.uploadImgToWx();
              }
            }
          });
        },
        fail: function(respo) {
          Toast();
        }
      });
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
  }
};
</script>
<style lang="less" scoped>
.friend-issue {
  width: 375px;
  overflow: hidden;
  min-height: 100%;
  .head-brand {
    background-image: url("../img/head-bac.png");
    background-size: 100% 100%;
    height: 44px;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1;
    .backToHome {
      float: left;
      width: 8px;
      height: 14px;
      background-image: url("../img/back-icon.png");
      background-size: 100% 100%;
      margin: 15px 0 0 16px;
    }
    .add-address {
      width: 48px;
      height: 30px;
      font-size: 16px;
      color: #ff6e4c;
      letter-spacing: -0.36px;
      text-align: right;
      float: right;
      margin: 7px 14px 0 0;
      background: #ff6e4c;
      border-radius: 8px;
      color: #ffffff;
      text-align: center;
      line-height: 30px;
    }
  }
  .content {
    margin: 44px 0 0 0;
    overflow: hidden;
    .issueFriendContext {
      display: block;
      width: 343px;
      height: 130px;
      margin: 16px auto 10px;
      font-size: 14px;
      letter-spacing: -0.34px;
      resize: none;
      ::placeholder {
        color: #ccced4;
      }
    }
    .word-length {
      text-align: right;
      margin: 0 auto 21px;
      font-size: 12px;
      color: #000039;
      letter-spacing: -0.29px;
      line-height: 17px;
      width: 343px;
      span {
        color: #ff6e4c;
      }
    }
    .file-upload {
      width: 343px;
      margin: auto;
      .van-icon-clear:before{
        position: absolute;
        top: 0;
        right: 0;
        font-size: .37333rem;
      } 
    }
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 80px;
  height: 80px;
  background-color: #fff;
}
/deep/ .van-loading {
  margin-top: 15px;
}
</style>
