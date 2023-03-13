<template>
  <div class="upload_file_img">
    <!-- 上传图片 -->
    <el-upload
      :accept="accept"
      action
      :class="{
        'upload-hide':isHideUpdate,
        'img-small': small,
        'img-company': company
      }"
      list-type="picture-card" 
      :limit='limit' 
      :multiple="isMultiple"
      :show-file-list="showFileList"
      :file-list='imgList'
      :http-request="uploadRequest"
      :before-upload="beforeUpload"
      :on-preview="handlePictureCardPreview"
      :on-exceed="handleExceed"
      :on-remove="handleRemove">
      <i  class="el-icon-plus"></i>
      <div v-if="tip" slot="tip" class="el-upload__tip">{{tip}}</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { uploadImgFile } from "@/api/commonService";

export default {
  name:"uploadFileImg",
  data(){
    return{
      accept: "image/jpeg,image/gif,image/png,image/bmp",
      imgList:[],
      imgUpdata: {},
      dialogVisible:false,
      dialogImageUrl:'',
      imageUrl:"",
      isHideUpdate:false
    }
  },
  props:{
    limit:{//图片最多上传限制
      type:[Number],
      default:1
    },
    tip: {
      type: String
    },
    
    isMultiple:{//是否多选
      type:[Boolean],
      default:false
    },
    showFileList:{//是否显示列表
      type:[Boolean],
      default:true
    },
    fileList: {
      type: Array,
      default() {
        return [];
      }
    },
    small: Boolean,
    company: Boolean,
    hideFlag:{//是否隐藏上传虚线框
      type:[Boolean],
      default:false
    },
    maxSize: {
      type: Number
    },
    messageTips: {
      type: Boolean,
      default: true
    },
  },
  watch:{
    fileList(){
      this.isHideUpdateFn();
    }
  },
  mounted(){
    this.isHideUpdateFn();
  },
  methods:{
    isHideUpdateFn(){
      this.imgList = this.fileList;
      if(this.hideFlag){
        if(this.fileList.length >= this.limit){
          this.isHideUpdate = true;
        }else{
          this.isHideUpdate = false;
        }
      }
      
    },
    /* 图片上传  */
    handleRemove(file,fileList) {//删除
      this.$emit("getFileList", fileList);
    },
    handlePictureCardPreview(file) {//点击放大镜按钮
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      if (this.maxSize && file.size > this.maxSize * 1024 * 1024) {
        if (this.messageTips) {
          this.$message.warning("上传图片大小不超过" + this.maxSize + "M");
        }
        return false;
      }
    },
    uploadRequest(option) {
      const { file } = option;
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
                url: e.target.result,
                origin: res[0]
              });
              this.$emit("getFileList", this.fileList);
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
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择  ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    }
  }
}
</script>

<style lang="less" scoped>
.upload_file_img{
  width: 100%;
  /deep/.el-upload--picture-card{
    width: 80px;
    height:80px;
    line-height: 80px;
  }
  /deep/.el-upload-list--picture-card .el-upload-list__item{
    width: 80px;
    height:80px;
  }
  /deep/.el-dialog__headerbtn{
    top:10px;
  }
  .upload-hide {

    /deep/ .el-upload--picture-card {
      display: none;
    }
    /deep/.el-upload-list--picture-card{
      display: flex;
      .el-upload-list__item{
        margin:0;
      }
    }
  }
  .img-small {
    /deep/ .el-upload__tip {
      margin-top: 0;
    }

    /deep/ .el-upload--picture-card {
      width: 80px;
      height: 80px;
      line-height: 80px;
    }

    /deep/ .el-upload-list--picture-card .el-upload-list__item {
      width: 80px;
      height: 80px;
    }
  }
  .img-company {
    /deep/ .el-upload__tip {
      margin-top: 0;
    }

    /deep/ .el-upload--picture-card {
      width: 220px;
      height: 130px;
      line-height: 130px;
    }

    /deep/ .el-upload-list--picture-card .el-upload-list__item {
      width: 220px;
      height: 130px;
    }
  }
}

</style>