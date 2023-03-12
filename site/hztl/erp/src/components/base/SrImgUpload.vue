<template>
  <div>
    <el-upload
      :accept="accept"
      :file-list="elFileList"
      :on-preview="handlePictureCardPreview"
      :before-upload="beforeUpload"
      :http-request="uploadRequest"
      :on-success="uploadSuccess"
      :on-remove="uploadRemove"
      :on-exceed="exceedHandle"
      v-bind="$attrs"
      :class="{
        'max-mark': alreadyMax,
        'img-small': small,
        'img-medium': medium
      }"
      action
      list-type="picture-card"
      v-on="$listeners"
    >
      <i class="el-icon-plus" />
      <div v-if="tip" slot="tip" class="el-upload__tip">{{ tip }}</div>
    </el-upload>
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
// import * as qiniu from "qiniu-js";
import { getUpload } from "@/api/common/qiniuToken";
import ImagesQuicklyCompress from "images-quickly-compress"; //导出：压缩图片插件

export default {
  name: "SrImgUpload",
  props: {
    messageTips: {
      type: Boolean,
      default: true
    },
    tip: {
      type: String
    },
    maxSize: {
      type: Number,
      default: 2
    },
    fileList: {
      type: Array,
      default() {
        return [];
      }
    },
    small: Boolean,
    medium: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "erp"
    }
  },
  data() {
    return {
      accept: "image/jpeg,image/gif,image/png,image/bmp", // 接受上传的文件类型
      imgPreviewVisible: false,
      imgPreviewUrl: "",
      elFileList: [],
      imgUpdata: {},
      alreadyMax: false
    };
  },
  watch: {
    fileList() {
      this.refreshData();
    }
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    refreshData() {
      this.elFileList = this.fileList;
      this.maxHandle();
    },
    // 上传文件之前
    beforeUpload(file) {
      if (this.maxSize && file.size > this.maxSize * 1024 * 1024) {
        if (this.messageTips) {
          this.$message({
            message:
              "上传图片大小超过" +
              this.maxSize +
              "M" +
              ",图片将会被压缩至" +
              this.maxSize +
              "M内",
            type: "warning"
          });
        }
        return true;
      }
    },
    // 覆盖默认的上传行为
    uploadRequest(option) {
      // 图片过大就压缩
      if (this.maxSize && option.file.size > this.maxSize * 1024 * 1024) {
        // console.log(option.file);
        const imageCompress = new ImagesQuicklyCompress({
          mode: "pixel", //根据固定宽度压缩
          num: 1e6,
          size: "2000kb", //图片大小超过500k压缩率比较低b执行压缩
          imageType: "image/png",
          quality: 0.8,
          orientation: false
        });
        imageCompress.compressor([option.file]).then(res => {
          // console.log("压缩结果：", res); //返回一个blod数组
          const blobArr = res;
          blobArr.forEach(blod => {
            const params = new FormData();
            params.append("file", blod);
            params.append("fileName", option.file.name);
            getUpload(this.type, params)
              .then(res => {
                this.imgUpdata = res[0];
                option.onSuccess();
              })
              .catch(() => {
                option.onError();
              });
          });
        });
        return;
      }
      const params = new FormData();
      params.append("file", option.file);
      params.append("fileName", option.file.name);
      getUpload(this.type, params)
        .then(res => {
          this.imgUpdata = res[0];
          option.onSuccess();
        })
        .catch(() => {
          option.onError();
        });
    },
    // 文件上传成功
    uploadSuccess(response, file, fileList) {
      // fileList[fileList.length - 1].origin = this.imgUpdata.url;
      // console.log(this.imgUpdata);
      fileList[fileList.length - 1].origin = this.imgUpdata;
      this.elFileList = fileList;
      this.$emit("get-file-list", fileList);
    },
    // 文件列表移除文件时
    uploadRemove(file, fileList) {
      this.elFileList = fileList;
      this.$emit("get-file-list", fileList);
    },
    // 点击文件列表中已上传的文件时
    handlePictureCardPreview(file) {
      this.imgPreviewUrl = file.url;
      this.imgPreviewVisible = true;
    },
    maxHandle() {
      if (this.elFileList.length >= this.$attrs.limit) {
        this.alreadyMax = true;
      } else {
        this.alreadyMax = false;
      }
    },
    // 文件超出个数限制时
    exceedHandle(file, fileList) {
      if (this.messageTips) {
        this.$message({
          message: "最多上传" + fileList.length + "张，请先移除已上传",
          type: "warning"
        });
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.max-mark {
  height: 120px;

  /deep/.el-upload__tip {
    margin-top: 0;
  }

  /deep/ .el-upload--picture-card {
    display: none;
  }
}

.img-medium {
  /deep/.el-upload__tip {
    margin-top: 0;
  }

  /deep/.el-upload--picture-card {
    width: 120px;
    height: 120px;
    line-height: 120px;
  }

  /deep/.el-upload-list--picture-card .el-upload-list__item {
    width: 120px;
    height: 120px;
  }
}

.img-small {
  /deep/.el-upload__tip {
    margin-top: 0;
  }

  /deep/.el-upload--picture-card {
    width: 80px;
    height: 80px;
    line-height: 80px;
  }

  /deep/.el-upload-list--picture-card .el-upload-list__item {
    width: 80px;
    height: 80px;
  }
}
</style>
