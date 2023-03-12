<template>
  <div class="upload-image-container">
    <el-upload
      ref="uploadEl"
      :action="imgAction"
      accept="image/png, image/jpeg"
      list-type="picture-card"
      :limit="limit"
      :file-list="fileList"
      multiple
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :http-request="uploadReqFn"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div class="image-tip" slot="tip">
        <template v-for="(item, index) in fileList">
          <div class="image-button-wrap" :key="index" v-if="index === 0">
            <span>主图</span>
          </div>
          <div class="image-button-wrap" :key="index" v-else>
            <span class="image-button" @click="setImgMain(index)"
              >设为主图</span
            >
          </div>
        </template>
      </div>
    </el-upload>
    <el-dialog title="图片" :visible.sync="dialogVisible" append-to-body modal>
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { uploadImgFile } from '@/api/commonService';

export default {
  props: {
    fileList: {
      type: Array,
      default: () => [],
    },
    limit: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      // 图片
      imgAction: '#', //图片上传接口
      dialogImageUrl: '',
      dialogVisible: false,
    };
  },
  methods: {
    /* 图片上传  */
    handlePictureCardPreview(file) {
      //点击放大镜按钮
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    clearFiles() {
      this.$message.warning('图片上传失败');
      const list = JSON.parse(JSON.stringify(this.fileList));
      this.$refs.uploadEl.clearFiles();
      this.fileList = [...list];
    },
    uploadReqFn(option) {
      const file = option.file;
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      uploadImgFile({
        file,
      })
        .then(res => {
          if (res && res.length) {
            // 处理图片回显
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = e => {
              this.fileList.push({
                name: file.name,
                uid: file.uid,
                url: e.target.result,
                saveUrl: res[0],
              });
              option.readerUrl = e.target.result;
            };
            fileReader.onerror = () => {
              this.clearFiles();
            };
          } else {
            this.clearFiles();
          }
          loading.close();
        })
        .catch(() => {
          this.clearFiles();
          loading.close();
        });
    },
    setImgMain(index) {
      const fileList = this.fileList;
      const arr = fileList.splice(index, 1);
      fileList.unshift(...arr);
    },
    beforeUpload(file) {
      //上传之前
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      //加上上传数量
      if (!isJPG && !isPNG) {
        this.$message.error('图片只能是 JPG/PNG 格式!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!');
        return false;
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`,
      );
    },
    handleRemove(file) {
      const fileList = this.fileList;
      const findIndex = fileList.findIndex(item => {
        return item.uid === file.uid || item.saveUrl === file.saveUrl;
      });
      if (findIndex !== -1) {
        fileList.splice(findIndex, 1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.upload-image-container {
  // /deep/ .el-upload-list {
  //   display: inline-block;
  // }
  /deep/ .el-upload-list__item {
    width: 104px;
    height: 104px;
  }
  /deep/ .el-upload--picture-card {
    width: 104px;
    height: 104px;
    line-height: 104px;
  }
  /deep/ .el-dialog {
    width: 40%;
  }
  .image-tip {
    display: flex;
    line-height: 18px;
    .image-button-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 104px;
      // margin-top: 8px;
      margin-right: 8px;
      .image-button {
        cursor: pointer;
        text-decoration: underline;
        color: @color-link;
      }
    }
  }
}
</style>
