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
import * as qiniu from "qiniu-js";
import { CommonService } from "@/common/services/commonService";
const commonService = new CommonService();
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
      type: Number
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
    }
  },
  data() {
    return {
      accept: "image/jpeg,image/gif,image/png,image/bmp",
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
          next: option.onProgress,
          error: option.onError,
          complete: option.onSuccess
        });
      });
    },
    uploadSuccess(response, file, fileList) {
      fileList[fileList.length - 1].origin = this.imgUpdata.url;
      this.elFileList = fileList;
      this.$emit("get-file-list", fileList);
    },
    uploadRemove(file, fileList) {
      this.elFileList = fileList;
      this.$emit("get-file-list", fileList);
    },
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
<style lang="scss" scoped>
.max-mark {
  // height: 120px;

  ::v-deep.el-upload__tip {
    margin-top: 0;
  }

  ::v-deep .el-upload--picture-card {
    display: none;
  }
}

.img-medium {
  ::v-deep.el-upload__tip {
    margin-top: 0;
  }

  ::v-deep.el-upload--picture-card {
    width: 120px;
    height: 120px;
    line-height: 120px;
  }

  ::v-deep.el-upload-list--picture-card .el-upload-list__item {
    width: 120px;
    height: 120px;
  }
}

.img-small {
  ::v-deep.el-upload__tip {
    margin-top: 0;
  }

  ::v-deep.el-upload--picture-card {
    width: 80px;
    height: 80px;
    line-height: 80px;
  }

  ::v-deep.el-upload-list--picture-card .el-upload-list__item {
    width: 80px;
    height: 80px;
  }
}
</style>
