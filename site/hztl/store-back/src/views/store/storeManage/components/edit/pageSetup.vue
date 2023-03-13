<template>
  <el-form
    class="form-label-top"
    size="small"
    label-position="top"
    :model="data"
  >
    <el-form-item label="页面标题：" required>
      <el-input v-model.trim="data.title" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <div slot="label">
        <span>页面封面图：</span>
        <span class="label-hint">*建议图片尺寸120*120</span>
      </div>
      <ImgCutterUpload
        :file-list="files"
        :limit="1"
        :maxSize="2"
        @get-file-list="getFileList"
      ></ImgCutterUpload>
    </el-form-item>
  </el-form>
</template>

<script>
import ImgCutterUpload from "@/components/Upload/ImgCutterUpload.vue";

export default {
  name: "PageSetup",
  props: {
    data: Object
  },
  components: {
    ImgCutterUpload
  },
  created() {
    const data = this.data;
    if (data && data.image) {
      this.files = [
        {
          name: "",
          readerUrl: data.image,
          url: data.image
        }
      ];
    }
  },
  data() {
    return {
      files: []
    };
  },
  methods: {
    getFileList(files) {
      if (files.length) {
        this.data.image = files[0].url;
      } else {
        this.data.image = "";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.form-label-top {
  .el-form-item {
    .label-hint {
      font-size: 12px;
      color: @text-color-hint;
    }
  }
}
</style>
