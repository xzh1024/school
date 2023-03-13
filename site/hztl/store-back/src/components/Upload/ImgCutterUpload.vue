<template>
  <div class="img-cutter-upload">
    <div class="upload-img-list">
      <div
        class="upload-img-item"
        v-for="(item, index) in fileList"
        :key="index"
      >
        <img :src="item.readerUrl || item.url" />
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
    <!--将裁剪的Dom放在dialog弹框中-->
    <el-dialog
      class="img-cutter-dialog"
      title="图片剪裁"
      width="502px"
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
        rate="1:1"
        toolBgc="none"
        :isModal="false"
        :showChooseBtn="true"
        :lockScroll="true"
        :boxWidth="500"
        :boxHeight="500"
        :cutWidth="120"
        :cutHeight="120"
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
        <el-button slot="choose" size="small" type="primary" plain
          >选择图片</el-button
        >
        <el-button
          slot="cancel"
          size="small"
          type="danger"
          style="margin-right: 16px;"
          >清除选择</el-button
        >
        <el-button slot="confirm" size="small" type="primary">确定</el-button>
      </ImgCutter>
    </el-dialog>
    <el-dialog
      :visible.sync="imgPreviewVisible"
      append-to-body
      :show-close="false"
      class="dialog-img-box"
    >
      <img v-show="imgPreviewUrl" :src="imgPreviewUrl" alt="正在加载..." />
    </el-dialog>
  </div>
</template>

<script>
import ImgCutter from "vue-img-cutter";
import { uploadImgFile } from "@/api/commonService";

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
      this.uploadRequest(file);
    },
    uploadRequest(file) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      uploadImgFile({
        file
      })
        .then(res => {
          if (res && res.length) {
            // 处理图片回显
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = e => {
              this.fileList.push({
                name: file.name,
                url: res[0],
                readerUrl: e.target.result
              });
              this.$emit("get-file-list", this.fileList);
            };
            fileReader.onerror = () => {
              this.$message.warning("图片上传失败");
            };
          } else {
            this.$message.warning("图片上传失败");
          }
          loading.close();
        })
        .catch(() => {
          this.$message.warning("图片上传失败");
          loading.close();
        });
    },
    cutError() {
      this.$message.error("图片裁剪失败");
    },
    handlePictureCardPreview(file) {
      this.imgPreviewUrl = file.readerUrl || file.url;
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

<style lang="less" scoped>
// 隐藏水印
/deep/ .toolBox {
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
<style lang="less">
.img-cutter-dialog {
  .el-dialog {
    .el-dialog__body {
      padding: 0;
      .i-dialog-footer {
        margin: 0;
        padding: @padding-size-secondary;
        box-sizing: border-box;
      }
    }
  }
}
.dialog-img-box {
  .el-dialog {
    position: absolute;
    width: auto;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: none;
    background: transparent;

    .el-dialog__header {
      margin: 0;
      padding: 0;
      height: 0;
      width: 0;
    }

    .el-dialog__body {
      padding: 0;
      background: transparent;

      img {
        // 去除inline-block 间隙
        display: block;
        width: auto;
        height: auto;
        max-width: 80vw;
        max-height: unset;
        font-size: 40px;
        padding: 20px;
      }
    }
  }
}
</style>
