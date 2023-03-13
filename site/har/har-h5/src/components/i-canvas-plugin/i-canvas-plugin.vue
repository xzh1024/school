<template>
  <canvas canvas-id="canvas-pic"></canvas>
</template>

<script>
  /**
   * @param {x} canvas 绘图x轴
   * @param {y} canvas 绘图Y轴
   * @param {@responseImageHanlde} callback  图片临时路径
   * @param {value} 默认双向绑定value   true 显示 反之
   * @param {canvasConfig} 传入canvas option
   *
   * */
  function wrapText(text, x, y, maxWidth, lineHeight, maxLine) {
    if (
      typeof text != "string" ||
      typeof x != "number" ||
      typeof y != "number"
    ) {
      return;
    }

    const context = null;
    const canvas = context.canvas;

    if (typeof maxWidth == "undefined") {
      maxWidth = (canvas && canvas.width) || 300;
    }
    if (typeof lineHeight == "undefined") {
      lineHeight =
        (canvas && parseInt(window.getComputedStyle(canvas).lineHeight)) ||
        parseInt(window.getComputedStyle(document.body).lineHeight);
    }

    // 字符分隔为数组
    const arrText = text.split("");
    let line = "";
    const len = arrText.length;
    let lineNumber = 1;
    for (let n = 0; n < len; n++) {
      const testLine = line + arrText[n];
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lineNumber++;
        console.log(lineNumber);
        if (typeof maxLine !== "undefined" && maxLine < lineNumber) {
          line = line.substring(0, line.length - 1) + "...";
          context.fillText(line, x, y);
          break;
        }
        context.fillText(line, x, y);
        line = arrText[n];
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }
  import CanvasGlobalOption from "./canvas-plugin-option.js";
  export default {
    props: {
      canvasConfig: {
        type: Object,
        default: () => {}
      },
      canvasImageUrl: {
        type: String,
        default: null
      }
    },
    emits: ["responseImageHanlde"],
    data() {
      return {
        factor: 0,
        pixelRatio: 1,
        sys: {}
      };
    },
    mounted() {
      if (this.canvasImageUrl) return uni.hideLoading();
      this.init();
    },
    methods: {
      //参数处理
      dataHandle() {
        // console.log(this.canvasConfig);
        let config = this.canvasConfig; //传入option
        // console.log(config.mainPicUrl);
        config = {
          ...CanvasGlobalOption, //初始配置option
          mainPic: {
            ...CanvasGlobalOption.mainPic, //初始配置option  主图 参数
            ...config.mainPic, //传入option 主图 参数
            url: config.mainPicUrl
          },
          minPic: {
            ...CanvasGlobalOption.minPic, //初始配置option 小程序码 参数
            ...config.minPic, //传入option 小程序码 参数
            url: config.minPicUrl
          },
          texts: [
            { ...CanvasGlobalOption.texts, ...config.texts }, //合并符号 参数
            { ...CanvasGlobalOption.title, ...config.title }, //合并标题 参数
            { ...CanvasGlobalOption.price, ...config.price }
          ] //合并价格 参数
        };
        this.config = config;
      },
      isBase64(url) {
        return url && url.startsWith("data:");
      },
      //初始化
      async init() {
        uni.showLoading({
          title: "图片生成中...."
        });
        // 初始参数处理
        this.dataHandle();
        //获取设备信息
        const sysInfo = uni.getSystemInfoSync();
        this.sys = sysInfo;
        //获取设备宽度
        const screenWidth = sysInfo.screenWidth;
        this.factor = screenWidth / 750;
        const config = this.config;
        console.log(config);
        this.renderList = []; //渲染数组list
        try {
          //下载图片得到path
          console.log(config.minPic.url, "config.minPic.url");
          const mainPic = await this.loadImage(config.mainPic.url);
          const minPic = await this.loadImage(config.minPic.url);
          //获取图片信息
          const mainPicInfo = await this.getImageInfo(mainPic);
          const minPicInfo = await this.getImageInfo(minPic);
          this.config = {
            ...config,
            mainPic: {
              ...config.mainPic,
              ...mainPicInfo,
              type: "image"
            },
            minPic: {
              ...config.minPic,
              ...minPicInfo,
              type: "image"
            }
          };
          this.createCanvas(); //合并参数完成开始创建画布
        } catch (e) {
          console.error(e);
          uni.showToast({
            title: "图片生成失败",
            icon: "none"
          });
        }
      },
      //加载图片  下载
      loadImage(url) {
        if (this.isBase64(url)) return url;
        if (!url.startsWith("http")) return url;
        return new Promise((resolve, reject) => {
          uni.downloadFile({
            url,
            success: (res) => {
              if (res.statusCode === 200) {
                resolve(res.tempFilePath);
                console.log("图片下载成功");
              } else {
                console.error("图片下载失败");
                reject(res.errMsg);
              }
            },
            fail(err) {
              reject(err);
            }
          });
        });
      },
      //获取图片信息
      getImageInfo(path) {
        if (this.isBase64(path)) {
          return {
            imagePath: path
          };
        }
        return new Promise((resolve, reject) => {
          uni.getImageInfo({
            src: path,
            success(res) {
              resolve({
                imagePath: path,
                imgInfo: res
              });
            },
            fail(err) {
              reject(err);
            }
          });
        });
      },
      async createCanvas() {
        const config = this.config;
        console.log(config);
        this.ctx = uni.createCanvasContext("canvas-pic", this);
        //设置画布颜色
        if (config.borderRadius > 0) {
          this.drawRadiusRect(
            this.ctx,
            0,
            0,
            this.toPx(config.width),
            this.toPx(config.height),
            this.toPx(config.borderRadius),
            config.borderRadiusFillColor
          );
        }
        // 设置画布底色
        if (config.backgroundColor) {
          this.ctx.setFillStyle(config.backgroundColor);
          this.ctx.fillRect(0, 0, config.width, config.height);
          this.ctx.restore();
          this.ctx.save();
        }
        console.log(this.renderList);
        const { texts = [], blocks = [], lines = [] } = config;
        //放入数组  开始步骤绘图
        const queue = this.renderList
          .concat(this.config.mainPic, this.config.minPic)
          .concat(
            texts.map((item) => {
              item.type = "text";
              item.zIndex = item.zIndex || 0;
              return item;
            })
          )
          .concat(
            blocks.map((item) => {
              item.type = "block";
              item.zIndex = item.zIndex || 0;
              return item;
            })
          )
          .concat(
            lines.map((item) => {
              item.type = "line";
              item.zIndex = item.zIndex || 0;
              return item;
            })
          );
        queue.forEach((item) => {
          console.log(item);
          switch (item.type) {
            case "image":
              this.drawImage(item);
              break;
            case "text":
              this.drawText(item);
          }
        });
        // this.ctx.draw();
        //绘完图  生成本地临时图片路径
        const res = await this.responeImage();
        console.log("res ", res);
        uni.hideLoading();
        //返回
        this.$emit("responseImageHanlde", res);
      },
      //绘制图
      drawImage(data) {
        console.log(data);
        const {
          imagePath,
          x,
          y,
          width,
          height,
          borderRadius = 0,
          borderWidth = 0,
          borderColor
        } = data;
        // this.ctx.save();
        if (borderRadius > 0) {
          this.drawRadiusRect(
            this.ctx,
            this.toPx(x),
            this.toPx(y),
            this.toPx(width),
            this.toPx(height),
            this.toPx(borderRadius)
          );
          this.ctx.strokeStyle = "rgba(255,255,255,0)";
          this.ctx.stroke();
          this.ctx.clip();
          this.ctx.drawImage(
            imagePath,
            this.toPx(x),
            this.toPx(y),
            this.toPx(width),
            this.toPx(height)
          );
          if (borderWidth > 0) {
            this.ctx.setStrokeStyle(borderColor);
            this.ctx.setLineWidth(this.toPx(borderWidth));
            this.ctx.stroke();
          }
        } else {
          console.log(this.toPx(width), this.toPx(height));
          this.ctx.drawImage(
            imagePath,
            this.toPx(x),
            this.toPx(y),
            this.toPx(width),
            this.toPx(height)
          );
        }
        this.ctx.restore();
        this.ctx.save();
      },
      //绘制线条
      drawLine({ startX, startY, endX, endY, color, width }) {
        this.ctx.beginPath();
        this.ctx.setStrokeStyle(color);
        this.ctx.setLineWidth(width);
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
        this.ctx.save();
      },
      //绘制文字
      drawText(params) {
        const { x, y, text, width, lineHeight, maxLine } = params;
        this.drawTextStyle(params);
        wrapText.call(
          this.ctx,
          text,
          this.toPx(x),
          this.toPx(y),
          this.toPx(width),
          lineHeight,
          maxLine
        );
        this.ctx.restore();
        this.ctx.save();
      },
      //绘制文字样式
      drawTextStyle({ fontSize, color }) {
        this.ctx.setFontSize(fontSize);
        this.ctx.setFillStyle(color);
      },
      //画图形圆角
      drawRadiusRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.setFillStyle("transparent");
        ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.lineTo(x + w, y + r);
        ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
        ctx.lineTo(x + w, y + h - r);
        ctx.lineTo(x + w - r, y + h);
        ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
        ctx.lineTo(x + r, y + h);
        ctx.lineTo(x, y + h - r);
        ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
        ctx.lineTo(x, y + r);
        ctx.lineTo(x + r, y);
        ctx.fill();
        ctx.closePath();
        ctx.clip();
      },
      //返回图片temp 流
      responeImage() {
        const res = uni.getSystemInfoSync();
        const platform = res.platform;
        let time = 0;
        if (platform === "android") {
          // 在安卓平台，经测试发现如果海报过于复杂在转换时需要做延时，要不然样式会错乱
          time = 300;
        }
        return new Promise((resolve, reject) => {
          this.ctx.draw(
            false,
            () => {
              setTimeout(() => {
                uni.canvasToTempFilePath(
                  {
                    canvasId: this.config.dom,
                    destHeight: 1000 * this.sys.pixelRatio,
                    destWidth: 750 * this.sys.pixelRatio,
                    success: (ress) => {
                      resolve(ress.tempFilePath);
                      console.log("tempFilePath", ress.tempFilePath);
                    },
                    fail: (err) => {
                      console.error(err);
                      reject(err);
                    }
                  },
                  this
                );
              }, time);
            },
            this
          );
        });
      },
      toPx(rpx, int) {
        if (int) {
          return Math.ceil(rpx * this.factor * this.pixelRatio);
        }
        return rpx * this.factor * this.pixelRatio;
      },
      toRpx(px, int) {
        if (int) {
          return Math.ceil(px / this.factor);
        }
        return px / this.factor;
      }
    }
  };
</script>

<style lang="scss" scoped>
  canvas {
    width: 600rpx;
    height: 800rpx;
  }
</style>
