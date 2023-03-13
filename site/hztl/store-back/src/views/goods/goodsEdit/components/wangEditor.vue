<template>
<!-- 富文本组件 -->
    <div id="wangeditor">
        <div ref="editorElem" style="text-align:left"></div>
    </div>  
</template>
<script>
import E from 'wangeditor'
import * as qiniu from "qiniu-js";
import { GoodsEditApi } from '../services'
const goodsEditApi = new GoodsEditApi();
import { uploadImgFile } from "@/api/commonService";
export default {
  name: 'editorElem',
  data () {
    return {
      editor: null,
      editorContent: ''
    }
  },
  props: ['catchData', 'content'],    // 接收父组件的方法
  watch: {
    content(val) {
        if (val) {
            this.editor.txt.html(val);
        }
    }
  },
  mounted () {
    let _this = this;
    this.editor = new E(this.$refs.editorElem)
    this.editor.config.onchange = (html) => {
      this.editorContent = html
      this.catchData(this.editorContent)  // 把这个html通过catchData的方法传入父组件
    }
    this.editor.config.showLinkImg = true;
    this.editor.config.withCredentials = true;
    this.editor.config.uploadImgHeaders = {
        'Accept': 'application/json, text/plain, */*'
    }
    this.editor.config.menus = [          // 菜单配置
      'head',  // 标题
      'bold',  // 粗体
      'fontSize',  // 字号
      'fontName',  // 字体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'indent',//缩进
      'lineHeight',//行高
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'todo',
      'justify',  // 对齐方式
      'quote',  // 引用
      'emoticon',  // 表情
      'image',  // 插入图片
      'table',  // 表格
      'code',  // 插入代码
      'splitLine',//分割线
      'undo',  // 撤销
      'redo'  // 恢复
    ]
    this.editor.config.zIndex = 500;
    // 允许上传到七牛云存储
    this.editor.config.qiniu = true
    
    this.editor.config.customUploadImg = function (files, insert) {
      for(var i=0;i<files.length;i++){
        // _this.getToken(files[i]).then(res => {
        //   insert(res.httpUrl);
        // });
        _this.uploadRequest(files[i]).then(resUrl =>{
          insert(resUrl);
        });
      }
    }
    this.editor.create()     // 创建富文本实例
    if (this.content) {
      this.editor.txt.html(this.content)
    }
  },
  methods:{
    uploadRequest(file) {
      let _this = this;
      return new Promise(function(resolve, reject) {
        const loading = _this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        uploadImgFile({file}).then(res => {
          if (res && res.length) {
            // 处理图片回显
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = e => {
              resolve(e.target.result);
            };
            fileReader.onerror = () => {
              _this.$message.warning("图片上传失败");
            };
          } else {
            _this.$message.warning("图片上传失败");
          }
          loading.close();
        })
        .catch(() => {
          _this.$message.warning("图片上传失败");
          loading.close();
        });
      });
    },
    getToken(file) {
      return new Promise(function(resolve, reject) {
        goodsEditApi.uploadFileImg(file).then(result => {
          let sendData = result;
          let observer = {
            error(err) {
              resolve(false);
            },
            complete(res) {
              if (res && res.key) {
                resolve(sendData);
              } else {
                resolve(false);
              }
            }
          };
          let putExtra = {
            fname: file.name,
            params: {},
            mimeType: ["image/png", "image/jpeg", "image/jpg"]
          };
          let config = {
            useCdnDomain: true,
            region: "z1"
          };

          let options = {
            qulity: 0.92,
            noCompressIfLarger: true
            // maxWidth: 800
          };
          //上传前压缩
          qiniu.compressImage(file, options).then(data => {
            let observable = qiniu.upload(
              data.dist,
              sendData.key,
              sendData.token,
              putExtra
              //   config
            );
            let subscription = observable.subscribe(observer); // 上传开始
          });
        }).catch(error => {
          console.log(error);
        });
        
      });
    },
    
  }
}
</script>
<style lang="less" scoped>
    #wangeditor {
      width: 70rem;
    }  
</style>
