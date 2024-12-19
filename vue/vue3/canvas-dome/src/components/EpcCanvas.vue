<template>
  <div style="width: 100%; height: 100%">
    <div v-if="url" ref="refContainer" class="box-container">
      <img v-show="false" ref="refImg" :src="url" @load="initCanvas" />
      <canvas
        v-show="isShowCanvas"
        ref="refCanvas"
        class="canvas-item"
        @click.stop="(e) => hanleEpcPositionChange(e)"
      >
        your browser does not support the canvas tag
      </canvas>
      <div v-show="url" class="icon-container">
        <i
          class="el-icon-zoom-in icon-content"
          @click.stop="scaleHandle('enlarge')"
        />
        <i
          class="el-icon-zoom-out icon-content"
          @click.stop="scaleHandle('shrink')"
        />
      </div>
      <div
        v-show="url"
        class="full-screen-button"
        @click.stop="isShowFullImg = true"
      >
        全屏
      </div>

      <!-- <ht-dialog
        :visible.sync="isShowFullImg"
        append-to-body
        fullscreen
        class="full-screen"
      >
        <img v-show="isShowFullImg" :src="url" alt="正在加载..." />
      </ht-dialog> -->
    </div>
    <div v-else class="img-alt">暂无图片</div>
  </div>
</template>

<script>
const MIN_LEN = 100;

export default {
  name: "EpcCanvas",
  props: {
    url: {
      type: String,
      required: true,
      default: 'img/test.png'
    },
    tableData: {
      type: Array,
      default: () => [
        {
          id: 1,
          partRefOnImage: 1,
          position: [10, 100, 200, 200]
        },
        {
          id: 2,
          partRefOnImage: 2,
          position: [300, 100, 200, 200]
        },
        {
          id: 3,
          partRefOnImage: 3,
          position: [600, 100, 200, 200]
        },
      ]
    },
    selectedRows: {
      type: Array,
      default: () => []
    },
    isShowCanvas: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      epcImg: null,
      canvas: null,
      ctx: null,
      scale: 1,
      defaultCanvasWidth: null,
      defaultCanvasHeight: null,
      defaultScale: 1,
      isShowFullImg: false
    };
  },
  computed: {
    relTableData: {
      get () {
        return this.tableData;
      },
      set (val) {
        this.$emit("update:tableData", val);
      }
    },
    relSelectedRows: {
      get () {
        return this.selectedRows;
      },
      set (val) {
        this.$emit("update:selectedRows", val);
      }
    }
  },
  watch: {
    selectedRows: {
      handler () {
        // this.ctx && this.drawAllEpcPositions();
        // this.ctx && this.initCanvas();
        this.ctx && this.drawCanvas();
      },
      immediate: true
    }
  },
  methods: {
    getPositionArry (position) {
      return position
      // return (
      //   position
      //     // eslint-disable-next-line no-useless-escape
      //     .replace(/[\(\)]/g, "")
      //     .split(",")
      //     .map(item => Number(item || 0) * this.scale * this.defaultScale)
      // );
    },
    hanleEpcPositionChange (e) {
      if (
        this.relTableData.length &&
        this.relTableData.some(item => {
          const positionArry = this.getPositionArry(item.position);
          return (
            e.offsetX > positionArry[0] - positionArry[2] &&
            e.offsetX < positionArry[0] + positionArry[2] &&
            e.offsetY > positionArry[1] - positionArry[3] &&
            e.offsetY < positionArry[1] + positionArry[3]
          );
        })
      ) {
        let partRefOnImage = null;
        this.relTableData.forEach(item => {
          const positionArry = this.getPositionArry(item.position);
          if (
            e.offsetX > positionArry[0] - positionArry[2] &&
            e.offsetX < positionArry[0] + positionArry[2] &&
            e.offsetY > positionArry[1] - positionArry[3] &&
            e.offsetY < positionArry[1] + positionArry[3]
          ) {
            partRefOnImage = item.partRefOnImage;
          }
        });
        this.relSelectedRows = this.relTableData.filter(
          item => item.partRefOnImage === partRefOnImage
        );
        this.drawAllEpcPositions();
      }
    },
    initCanvas () {
      this.drawCanvas();
      this.bindWheel();
      this.bindDrag();
    },
    drawCanvas () {
      const containerWidth = this.$refs.refContainer.clientWidth; // div.clientWidth 的值是 width+padding ，有滚动条的时候：width+padding-17（17是滚动条宽度）。
      const containerHeight = this.$refs.refContainer.clientHeight;
      const aspectRatio = containerWidth / containerHeight;
      const epcImg = this.$refs.refImg;
      this.canvas = this.$refs.refCanvas;
      this.ctx = this.canvas.getContext("2d");

      console.log('epcImg--')
      console.log(epcImg.width)
      console.log(epcImg.width)
      console.log(containerWidth)
      console.log(containerHeight)

      if (epcImg.width * aspectRatio >= epcImg.height) {
        this.defaultCanvasWidth = containerWidth;
        this.defaultScale = this.defaultCanvasWidth / epcImg.width;
        this.defaultCanvasHeight = epcImg.height * this.defaultScale;
      } else {
        this.defaultCanvasHeight = containerHeight;
        this.defaultScale = this.defaultCanvasHeight / epcImg.height;
        this.defaultCanvasWidth = epcImg.width * this.defaultScale;
      }
      this.canvas.style.top =
        (containerHeight - this.defaultCanvasHeight) / 2 + "px";
      this.canvas.style.left =
        (containerWidth - this.defaultCanvasWidth) / 2 + "px";
      this.scale = 1;
      this.drawEpcImg();
    },
    drawEpcImg () {
      this.canvas.width = this.defaultCanvasWidth * this.scale;
      this.canvas.height = this.defaultCanvasHeight * this.scale;
      this.ctx.drawImage(
        this.$refs.refImg,
        0,
        0,
        this.defaultCanvasWidth * this.scale,
        this.defaultCanvasHeight * this.scale
      );
      this.drawAllEpcPositions();
    },
    drawAllEpcPositions () {
      if (this.relTableData.length) {
        this.relTableData.forEach(item => {
          this.drawEpcPosition(item);
        });
      }
    },
    drawEpcPosition (drawData) {
      let type = null;
      if (this.relSelectedRows.includes(drawData)) {
        type = "active";
      }
      const scale = this.scale * this.defaultScale;
      const positionArry = this.getPositionArry(drawData.position);
      let rectRadius = 5 * scale;
      if (type == "active") {
        // this.ctx.fillStyle = "rgba(0,123,255,1)";
      } else {
        rectRadius = 0;
        // this.ctx.fillStyle = "rgba(255,255,255,1)";
      }
      // this.fillRoundRect(positionArry, rectRadius); //
      if (type == "active") {
        this.fillRoundRect(positionArry, rectRadius);
        // this.ctx.fillStyle = "rgba(255,255,255,1)";
      } else {
        // this.ctx.fillStyle = "rgba(0,0,0,1)";
      }
      const fontSize = positionArry[3] - 6 * scale;
      this.ctx.font = fontSize + "px Sans-serif";
      this.ctx.textAlign = "center";
      this.ctx.cursor = "pointer";
      const text = this.ctx.measureText(drawData.partRefOnImage);
      this.ctx.fillText(
        drawData.partRefOnImage,
        parseFloat(positionArry[0]) +
        (parseFloat(positionArry[2]) - text.width * scale) / 2 +
        (text.width * scale) / 2,
        parseFloat(positionArry[1]) +
        fontSize / 4 +
        parseFloat(positionArry[3]) / 2 +
        4 * scale,
        parseFloat(positionArry[2])
      );
    },
    fillRoundRect (positionArry, r) {
      const x = parseFloat(positionArry[0]);
      const y = parseFloat(positionArry[1]);
      const w = parseFloat(positionArry[2]);
      const h = parseFloat(positionArry[3]);
      // this.ctx.clearRect(x, y, w, h);
      this.ctx.beginPath();
      this.ctx.moveTo(x + r, y);
      this.ctx.lineTo(x + w - r, y);
      this.ctx.arc(x + w - r, y + r, r, (Math.PI * 3) / 2, 0);
      this.ctx.lineTo(x + w, y + h - r);
      this.ctx.arc(x + w - r, y + h - r, r, 0, Math.PI / 2);
      this.ctx.lineTo(x + r, y + h);
      this.ctx.arc(x + r, y + h - r, r, Math.PI / 2, Math.PI);
      this.ctx.lineTo(x, y + r);
      this.ctx.arc(x + r, y + r, r, Math.PI, (Math.PI * 3) / 2);
      // this.ctx.fill();
      this.ctx.strokeStyle = "red";
      this.ctx.stroke();
    },
    scaleHandle (type) {
      if (type === "enlarge" && this.scale < 3) {
        this.scale += 0.1;
      } else if (type === "shrink" && this.scale > 1) {
        this.scale -= 0.1;
      }
      this.drawEpcImg();
    },
    bindWheel () {
      // 鼠标滚轮事件
      this.$refs.refContainer.addEventListener("mousewheel", e => {
        if (e.deltaY > 0) {
          this.scaleHandle("shrink");
        } else {
          this.scaleHandle("enlarge");
        }
      });
    },
    bindDrag () {
      // 鼠标按下时触发
      this.canvas.onmousedown = e => {
        const startXLen = e.clientX;
        const startYLen = e.clientY;
        const startXPositon = this.canvas.offsetLeft;
        const startYPositon = this.canvas.offsetTop;
        document.onmousemove = e => {
          let x = startXPositon + (e.clientX - startXLen);
          let y = startYPositon + (e.clientY - startYLen);
          x =
            x <= -this.canvas.offsetWidth + MIN_LEN
              ? -this.canvas.offsetWidth + MIN_LEN
              : x >= this.$refs.refContainer.offsetWidth - MIN_LEN
                ? this.$refs.refContainer.offsetWidth - MIN_LEN
                : x;
          y =
            y <= -this.canvas.offsetHeight + MIN_LEN
              ? -this.canvas.offsetHeight + MIN_LEN
              : y >= this.$refs.refContainer.offsetHeight - MIN_LEN
                ? this.$refs.refContainer.offsetHeight - MIN_LEN
                : y;
          this.canvas.style.left = x + "px";
          this.canvas.style.top = y + "px";
        };
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
          this.canvas.releaseCapture && this.canvas.releaseCapture();
        };
        this.canvas.setCapture && this.canvas.setCapture();
      };
    }
  }
};
</script>


<style lang="scss" scoped>
// @import "@/assets/css/var";

.img-alt {
  width: 100%;
  height: 100%;
  padding-top: calc(50% - 14px);
  text-align: center;
  border: solid 1px rgba(222, 225, 231, 1);
  color: #909399;
  font-size: 14px;
}
.box-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: solid 1px rgba(222, 225, 231, 1);
}
.icon-container {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 60px;
  height: 22px;
  border: solid 1px rgba(222, 225, 231, 1);
  border-radius: 10px;
  background: #f4f4f5;

  .icon-content {
    display: inline-block;
    width: 28px;
    text-align: center;
    font-size: 16px;
    color: #909399;
    cursor: pointer;

    & + .icon-content {
      border-left: solid 2px rgba(222, 225, 231, 1);
    }
  }
}
.full-screen-button {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 36px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  font-size: 12px;
  color: #909399;
  border: solid 1px rgba(222, 225, 231, 1);
  border-radius: 4px;
  background: #f4f4f5;
  cursor: pointer;
}
.canvas-item {
  position: relative;

  &:active {
    cursor: grab;
  }
}
.full-screen {
  &::v-deep .el-dialog__body {
    padding: 0;
  }
  &::v-deep .el-dialog__header {
    padding: 0;
  }
}
</style>
