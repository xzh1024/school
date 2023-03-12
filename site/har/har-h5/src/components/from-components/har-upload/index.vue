<template>
  <view class="har-upload__wrap">
    <view
      v-for="(item, index) in urls"
      :key="index"
      class="har-upload__item"
      :style="{ width: width + 'rpx', height: height + 'rpx' }"
    >
      <image
        class="har-upload__img"
        :style="{ width: width + 'rpx', height: height + 'rpx' }"
        :src="item"
        mode="aspectFill"
        @tap.stop="previewImage(index)"
      ></image>
      <view
        v-if="status[index] !== 'success' && status[index] !== 'preupload'"
        class="har-upload__mask"
      >
        <har-icon
          v-if="status[index] === 'error'"
          name="warning-fill"
          color="#fff"
          :size="48"
        ></har-icon>
        <text
          v-if="status[index] === 'error'"
          class="har-reupload__btn"
          @tap.stop="reUpload(index)"
          >重新上传</text
        >
        <!-- #ifndef APP-NVUE -->
        <view
          v-if="status[index] === 'uploading'"
          ref="har_reupload_ld"
          class="har-upload__loading"
        ></view>
        <text v-if="status[index] === 'uploading'" class="har-upload__text"
          >请稍候...</text
        >
        <!-- #endif -->
        <!-- #ifdef APP-NVUE -->
        <text
          v-if="status[index] === 'uploading'"
          class="har-upload__text har-upload__mtop"
          >正在上传...</text
        >
        <!-- #endif -->
      </view>
      <view
        v-if="isDel"
        class="har-upload__del"
        :style="{ background: delColor }"
        @tap.stop="deleteImage(index)"
      >
        <har-icon name="close" color="#fff" :size="32"></har-icon>
      </view>
    </view>
    <view
      v-if="showAdd"
      class="har-upload__item"
      :style="{
        width: width + 'rpx',
        height: height + 'rpx',
        background: background
      }"
      @tap.stop="chooseImage"
    >
      <har-icon name="plus" :size="88" :color="addColor"></har-icon>
    </view>
  </view>
</template>

<script>
  //非easycom模式取消注释引入字体组件，按实际路径进行调整
  import harIcon from "@/components/basic/har-icon/index.vue";
  export default {
    name: "HarUpload",
    components: {
      harIcon
    },
    props: {
      width: {
        type: [Number, String],
        default: 200
      },
      height: {
        type: [Number, String],
        default: 200
      },
      fileList: {
        type: Array,
        default() {
          return [];
        }
      },
      max: {
        type: [Number, String],
        default: -1
      },
      isAdd: {
        type: Boolean,
        default: true
      },
      addColor: {
        type: String,
        default: "#333"
      },
      background: {
        type: String,
        default: "#eee"
      },
      isDel: {
        type: Boolean,
        default: true
      },
      delColor: {
        type: String,
        default: "rgba(0,0,0,.6)"
      },
      confirmDel: {
        type: Boolean,
        default: false
      },
      url: {
        type: String,
        default: ""
      },
      immediate: {
        type: Boolean,
        default: false
      },
      sizeType: {
        type: Array,
        default() {
          return ["original", "compressed"];
        }
      },
      sourceType: {
        type: Array,
        default() {
          return ["album", "camera"];
        }
      },
      //图片后缀名限制
      suffix: {
        type: Array,
        default() {
          return [];
        }
      },
      //单张图片大小限制 MB
      size: {
        type: [Number, String],
        default: 4
      },
      name: {
        type: String,
        default: "file"
      },
      header: {
        type: Object,
        default() {
          return {};
        }
      },
      formData: {
        type: Object,
        default() {
          return {};
        }
      },
      param: {
        type: [Number, String],
        default: 0
      }
    },
    emits: ["success", "error", "complete", "preview"],
    data() {
      return {
        urls: [],
        //preupload、uploading、success、error
        status: []
      };
    },
    computed: {
      showAdd() {
        let show = true;
        const len = this.urls.length;
        if (
          !this.isAdd ||
          (this.max == -1 && len >= 9) ||
          (this.max != -1 && len >= this.max)
        ) {
          show = false;
        }
        return show;
      }
    },
    watch: {
      fileList(vals) {
        this.initData(vals);
      }
    },
    created() {
      this.initData(this.fileList);
    },
    methods: {
      initData(urls) {
        urls = urls || [];
        this.status = [];
        const status = [];
        urls.forEach(() => {
          status.push("success");
        });
        this.urls = [...urls];
        this.status = status;
      },
      reUpload(index) {
        this.$set(this.status, index, "uploading");
        this.uploadImage(index, this.urls[index])
          .then((res) => {
            this._success(res);
          })
          .catch((res) => {
            this._error(res);
          });
      },
      getStatus() {
        if (this.status.length === 0) return "";
        let status = "preupload";
        if (this.status.indexOf("preupload") === -1) {
          status = ~this.status.indexOf("uploading") ? "uploading" : "success";
          if (status !== "uploading" && ~this.status.indexOf("error")) {
            // 上传失败
            status = "error";
          }
        }
        return status;
      },
      onComplete(action) {
        const status = this.getStatus();
        this.$emit("complete", {
          status: status,
          urls: this.urls,
          action: action,
          param: this.param
        });
      },
      _success(res) {
        const status = this.getStatus();
        this.$emit("success", {
          status: status,
          ...res,
          param: this.param
        });
      },
      _error(res) {
        const status = this.getStatus();
        this.$emit("error", {
          status: status,
          ...res,
          param: this.param
        });
      },
      result(url, index) {
        if (!url || index === undefined) return;
        this.$set(this.urls, index, url);
        setTimeout(() => {
          this.onComplete("upload");
        }, 0);
      },
      toast(text) {
        text &&
          uni.showToast({
            title: text,
            icon: "none"
          });
      },
      chooseImage() {
        const max = Number(this.max);
        uni.chooseImage({
          count: max === -1 ? 9 : max - this.urls.length,
          sizeType: this.sizeType,
          sourceType: this.sourceType,
          success: (e) => {
            const imageArr = [];
            for (let i = 0; i < e.tempFiles.length; i++) {
              const len = this.urls.length;
              if (len >= max && max !== -1) {
                this.toast(`最多可上传${max}张图片`);
                break;
              }
              //过滤图片类型
              const path = e.tempFiles[i].path;

              if (this.suffix.length > 0) {
                let format = "";
                // #ifdef H5
                const type = e.tempFiles[i].type;
                format = type.split("/")[1];
                // #endif

                // #ifndef H5
                format = path.split(".")[path.split(".").length - 1];
                // #endif

                if (this.suffix.indexOf(format) == -1) {
                  const text = `只能上传 ${this.suffix.join(",")} 格式图片！`;
                  this.toast(text);
                  continue;
                }
              }

              //过滤超出大小限制图片
              const size = e.tempFiles[i].size;

              if (Number(this.size) * 1024 * 1024 < size) {
                const err = `单张图片大小不能超过：${this.size}MB`;
                this.toast(err);
                continue;
              }
              imageArr.push(path);
              this.urls.push(path);
              this.status.push(this.immediate ? "uploading" : "preupload");
            }
            this.onComplete("choose");
            const start = this.urls.length - imageArr.length;
            if (this.immediate) {
              for (let j = 0; j < imageArr.length; j++) {
                const index = start + j;
                this.uploadImage(index, imageArr[j])
                  .then((res) => {
                    this._success(res);
                  })
                  .catch((res) => {
                    this._error(res);
                  });
              }
            }
          }
        });
      },
      uploadImage(index, imgUrl, url) {
        return new Promise((resolve, reject) => {
          uni.uploadFile({
            url: this.url || url,
            name: this.name,
            header: this.header,
            formData: this.formData,
            filePath: imgUrl,
            success: (res) => {
              if (res.statusCode === 200) {
                this.$set(this.status, index, "success");
                resolve({
                  res,
                  index
                });
              } else {
                this.$set(this.status, index, "error");
                reject({
                  res,
                  index
                });
              }
            },
            fail: (res) => {
              this.$set(this.status, index, "error");
              // uni.showModal({
              // 	content: JSON.stringify(res)
              // })
              reject({
                res,
                index
              });
            }
          });
        });
      },
      deleteImage(index) {
        const status = this.getStatus();
        if (status === "uploading") {
          this.toast("请等待上传结束再进行删除！");
        } else {
          if (this.confirmDel) {
            uni.showModal({
              content: "确定将该图片删除吗？",
              showCancel: true,
              confirmText: "确定",
              success: (res) => {
                if (res.confirm) {
                  this.urls.splice(index, 1);
                  this.status.splice(index, 1);
                  this.onComplete("delete");
                }
              }
            });
          } else {
            this.urls.splice(index, 1);
            this.status.splice(index, 1);
            this.onComplete("delete");
          }
        }
      },
      previewImage(index) {
        // #ifndef MP-BAIDU
        if (this.status.length === 0) return;
        uni.previewImage({
          current: this.urls[index],
          loop: true,
          urls: this.urls
        });
        // #endif
        //百度小程序使用
        this.$emit("preview", {
          index: index,
          urls: this.urls
        });
      },
      start() {
        if (!this.url) {
          this.toast("请传入服务器接口地址！");
          return;
        }
        const urls = [...this.urls];
        const len = urls.length;
        for (let i = 0; i < len; i++) {
          if (urls[i].startsWith("https")) {
            continue;
          } else {
            this.$set(this.status, i, "uploading");
            this.uploadImage(i, urls[i], this.url)
              .then((res) => {
                this._success(res);
              })
              .catch((error) => {
                this._error(error);
              });
          }
        }
      }
    }
  };
</script>

<style scoped>
  .har-upload__wrap {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    flex-wrap: wrap;
  }

  .har-upload__item {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    align-items: center;
    justify-content: center;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
    /* #ifdef H5 */
    cursor: pointer;
    /* #endif */
    position: relative;
  }

  .har-upload__del {
    position: absolute;
    top: 8rpx;
    right: 8rpx;
    height: 40rpx;
    width: 40rpx;
    /* #ifndef APP-NVUE */
    border-radius: 50%;
    display: flex;
    /* #endif */

    /* #ifdef APP-NVUE */
    border-radius: 20rpx;
    /* #endif */
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .har-upload__mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .har-reupload__btn {
    width: 144rpx;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 4rpx 0;
    font-size: 24rpx;
    border: 1px solid #ffffff;
    color: #fff;
    border-radius: 32rpx;
    margin-top: 16rpx;
    font-weight: normal;
  }

  .har-reupload__btn:active {
    opacity: 0.5;
  }

  .har-upload__loading {
    width: 32rpx;
    height: 32rpx;
    border-width: 2px;
    border-style: solid;
    border-top-color: #ffffff;
    border-left-color: #7f7f7f;
    border-right-color: #7f7f7f;
    border-bottom-color: #7f7f7f;
    /* #ifdef APP-NVUE */
    border-radius: 20rpx;
    /* #endif */
    /* #ifndef APP-NVUE */
    border-radius: 50%;
    animation: har-rotate 0.7s linear infinite;
    /* #endif */
    margin-bottom: 8rpx;
  }

  .har-upload__text {
    font-size: 24rpx;
    color: #fff;
    margin-top: 16rpx;
    font-weight: normal;
  }

  /* #ifdef APP-NVUE */
  .har-upload__mtop {
    margin-top: 0;
  }

  /* #endif */

  /* #ifndef APP-NVUE */
  @keyframes har-rotate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  /* #endif */
</style>
