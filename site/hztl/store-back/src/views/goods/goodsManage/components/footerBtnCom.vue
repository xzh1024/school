<template>
  <div style="display:inline-block;">
    <el-upload style="display:inline-block;margin-left:5px;"
      :action="uploadAction"
      accept="image/png, image/jpeg"
      :before-upload="beforeUpload"
      multiple
      :limit="limitNum"
      :show-file-list="false"
      :disabled="disabled"
      :on-exceed="handleExceed"
      :file-list="fileData"
      :http-request="uploadReqFn">
      <el-button plain size="small" :disabled="disabled" type="primary">上传图片</el-button>
    </el-upload>
  </div>
</template>

<script>
import { uploadImgFile } from "@/api/commonService";
export default {
  name:"FooterBtnCom",
  data(){
    return{
      fileData:[],
      images:[],
      limitNum:5,
      picturesLength:0,
      uploadAction:'#'//上传图片方法
    }
  },
  props:{
    goodType:String,
    selection:Array,
    disabled:Boolean
  },
  watch:{
    selection(){
      this.images = [];
      this.fileData = [];
      this.picturesLength = 0;
    },
    disabled(){
      this.images = [];
      this.fileData = [];
      this.picturesLength = 0;
    }
  },
 
  methods:{
    uploadReqFn(option){
      const file = option.file;
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
            this.images.push(res[0]);
            const params = {
              images: this.images,
              selectData: this.selection
            }
            this.$emit('onUploadFile', params);
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
    beforeUpload( file ){
      //上传之前
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      //加上上传数量
      this.picturesLength += 1;
      if (!isJPG && !isPNG) {
        this.$message.error("图片只能是 JPG/PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过 2MB!");
        return false;
      }
    },
    handleExceed(files){
      this.$message.warning(`当前限制选择 ${this.limitNum} 个文件，本次选择了 ${files.length} 个文件`);
    },
  }
}
</script>

