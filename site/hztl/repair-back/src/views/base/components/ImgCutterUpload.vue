<template>
  <div class="img-cutter-upload">
    <!--
      将auto-upload设置为false是为了关闭默认上传，
      过后将会使用单独的上传进行上传
      on-change事件获取当前upload组件的文件缓存
    -->
    <!-- <el-upload
      action=""
      class="avatar-uploader"
      list-type="picture-card"
      :auto-upload="false"
      accept="image/*"
      :on-change="getUploadFile"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-button></el-button> -->
    <div class="upload-img-list">
      <div
        class="upload-img-item"
        v-for="(item, index) in fileList"
        :key="index"
      >
        <img :src="item.url" />
        <span class="upload-img-item-actions">
          <span
            class="upload-img-item-icon upload-img-item-big"
            @click="handlePictureCardPreview(item)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            class="upload-img-item-icon upload-img-item-delete"
            @click="handleFileImgDelete(index)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </div>
    <div
      class="cut-upload"
      @click="dialogVisible = true"
      v-show="!limit || limit > fileList.length"
    >
      <i class="el-icon-plus" />
    </div>
    <!--我将裁剪的Dom放在了一个dialog弹框中-->
    <el-dialog
      title="图片剪裁"
      width="725px"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :lock-scroll="false"
      append-to-body
      @closed="closed"
    >
      <ImgCutter
        ref="imgCutterModal"
        label="选择图片"
        :crossOrigin="true"
        crossOriginHeader="*"
        rate="22:13"
        toolBgc="none"
        :isModal="false"
        :showChooseBtn="true"
        :lockScroll="true"
        :boxWidth="675"
        :boxHeight="400"
        :cutWidth="220"
        :cutHeight="130"
        :sizeChange="true"
        :moveAble="true"
        :originalGraph="false"
        WatermarkText=""
        :smallToUpload="true"
        :saveCutPosition="true"
        :scaleAble="true"
        :previewMode="true"
        :index="1"
        @cutDown="cutDown"
        @error="cutError"
      >
      </ImgCutter>
    </el-dialog>
    <el-dialog
      :visible.sync="imgPreviewVisible"
      append-to-body
      :show-close="false"
      class="ht-light-box"
    >
      <img v-show="imgPreviewUrl" :src="imgPreviewUrl" alt="正在加载..." />
    </el-dialog>
  </div>
</template>

<script>
import ImgCutter from "vue-img-cutter";
import * as qiniu from "qiniu-js";
import { CommonService } from "@/common/services/commonService";
const commonService = new CommonService();

export default {
  name: "ImgCutterUpload",
  components: { ImgCutter },
  props: {
    fileList: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number
    },
    maxSize: {
      type: Number
    }
  },
  data() {
    return {
      dialogVisible: false,
      imgPreviewVisible: false,
      imgPreviewUrl: "",
      imgUpdata: {},
      nowCutFile: {}
      // fileList: []
    };
  },
  methods: {
    cutDown(data) {
      this.nowCutFile = data;
      this.beforeUpload(data.file);
      this.dialogVisible = false;
    },
    beforeUpload(file) {
      if (this.maxSize && file.size > this.maxSize * 1024 * 1024) {
        if (this.messageTips) {
          this.$message({
            message: "上传图片大小不超过" + this.maxSize + "M",
            type: "warning"
          });
        }
        return false;
      }
      this.uploadRequest({
        file: file,
        onProgress: this.handleProgress,
        onError: this.handleError,
        onSuccess: this.handleSuccess
      });
    },
    uploadRequest(option) {
      commonService.getUploadToken().then(data => {
        this.imgUpdata = data;
        const observable = qiniu.upload(
          option.file,
          data.key,
          data.token,
          {
            mimeType: ["image/png", "image/jpeg", "image/gif", "image/bmp"]
          },
          { useCdnDomain: false, region: "z1" }
        );
        observable.subscribe({
          // next: option.onProgress,
          error: option.onError,
          complete: option.onSuccess
        });
      });
    },
    // handleProgress() {
    //   console.log("uploading");
    // },
    handleError() {
      this.$message.error("图片上传失败");
    },
    handleSuccess() {
      this.fileList.push({
        name: this.nowCutFile.fileName,
        url: window.URL.createObjectURL(this.nowCutFile.file),
        origin: this.imgUpdata.url
      });
      this.$emit("get-file-list", this.fileList);
    },
    cutError() {
      this.$message.error("图片裁剪失败");
    },
    handlePictureCardPreview(file) {
      this.imgPreviewUrl = file.url;
      this.imgPreviewVisible = true;
    },
    handleFileImgDelete(fileIndex) {
      this.fileList.splice(fileIndex, 1);
    },
    closed() {
      this.$refs.imgCutterModal.handleClose();
    }
  }
};
</script>

<style lang="scss" scoped>
// 隐藏水印
::v-deep .toolBox {
  .copyright {
    display: none !important;
  }
}
.img-cutter-upload {
  .upload-img-list {
    margin: 0;
    padding: 0;
    display: inline;
    vertical-align: top;
    .upload-img-item {
      position: relative;
      display: inline-block;
      width: 120px;
      height: 120px;
      margin: 0 8px 8px 0;
      overflow: hidden;
      border: 1px solid #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
      & > img {
        width: 100%;
        height: 100%;
      }
      .upload-img-item-actions {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        cursor: default;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        opacity: 0;
        transition: opacity 0.3s;
        .upload-img-item-icon {
          cursor: pointer;
          margin-right: 12px;
          color: #ffffff;
          font-size: 20px;
          &:last-child {
            margin-right: 0;
          }
        }
      }

      &:hover .upload-img-item-actions {
        opacity: 1;
      }
    }
  }
  .cut-upload {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    outline: 0;
    width: 120px;
    height: 120px;
    line-height: 120px;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    vertical-align: top;
    font-size: 28px;
    color: #8c939d;
    &:hover {
      border-color: #409eff;
    }
  }
}
</style>
