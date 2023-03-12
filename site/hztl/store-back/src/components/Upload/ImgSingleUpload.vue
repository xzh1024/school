<template>
  <div class="upload-container">
    <input
      class="upload-input"
      type="file"
      name="file"
      ref="file"
      @change="handleChange"
    />
    <div class="upload-img-wrap" v-if="fileReaderUrl || fileUrl">
      <img :src="fileReaderUrl || fileUrl" class="file-img" />
      <!-- <i class="icon-Close-Circle-Fill" @click="deleteImg"></i> -->
      <div class="img-update" @click="rouseFile">修改图片</div>
    </div>
    <div v-else class="upload-button-wrap" @click="rouseFile">
      <slot name="button">
        <div class="upload-button">
          <i class="icon-Plus"></i>
          <span>上传图片</span>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
import { uploadImgFile } from "@/api/commonService";

export default {
  name: "ImgSingleUpload",
  props: {
    fileUrl: String,
    maxSize: Number,
    messageTips: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      accept: "image/jpeg,image/gif,image/png,image/bmp",
      imgUpdata: {},
      fileReaderUrl: ""
    };
  },
  methods: {
    deleteImg() {
      this.$emit("update:fileUrl", "");
      this.fileReaderUrl = "";
    },
    rouseFile() {
      this.$refs.file.click();
    },
    handleChange(e) {
      const event = e || window.event;
      const target = event.target || event.srcElement;
      const file = target.files[0];
      // 限制文件大小
      if (this.maxSize && file.size > this.maxSize * 1024 * 1024) {
        if (this.messageTips) {
          this.$message.warning("上传图片大小不超过" + this.maxSize + "M");
        }
        return false;
      }

      if (file) {
        this.uploadRequest(file);
      }
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
            this.$emit("update:fileUrl", res[0]);
            // 处理图片回显
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = e => {
              this.fileReaderUrl = e.target.result;
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
    }
  }
};
</script>

<style lang="less" scoped>
.upload-container {
  display: inline-block;
  .upload-input {
    height: 0;
    width: 0;
    position: absolute;
  }
  .upload-img-wrap {
    position: relative;
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    background: #ffffff;
    padding: 6px;
    border: 1px solid @border-color-base;
    border-radius: 2px;
    .file-img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      .img-update {
        display: inline-block;
      }
      .icon-Close-Circle-Fill {
        display: inline-block;
      }
    }
    .img-update {
      display: none;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 24px;
      line-height: 24px;
      font-size: 14px;
      color: #ffffff;
      background: rgba(#000000, 0.5);
      text-align: center;
      border-radius: 0 0 2px 2px;
      cursor: pointer;
    }
    .icon-Close-Circle-Fill {
      display: none;
      position: absolute;
      // left: 70px;
      left: calc(100% - 8px);
      // top: -8px;
      top: -11px;
      // bottom: 68px;
      font-size: 16px;
      color: @color-error;
      cursor: pointer;
    }
  }
  .upload-button-wrap {
    cursor: pointer;
    .upload-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: @text-color-secondary;
      width: 80px;
      height: 80px;
      box-sizing: border-box;
      background: #ffffff;
      border: 1px dashed @border-color-base;
      border-radius: 2px;
      font-size: 14px;
      .icon-Plus {
        font-size: 24px;
        color: @text-color-hint;
      }
    }
  }
}
</style>
