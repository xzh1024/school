<template>
  <div class="marquee-wrap">
    <div class="marquee">
      <i class="el-icon-warning"></i>
      <div class="marquee-box" ref="marqueeBox">
        <div class="marquee-content" ref="marqueeText">
          <slot name="content">{{ content }}</slot>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Marquee",
  props: {
    content: String
  },
  data() {
    return {
      timer: null,
      observer: null
    };
  },
  methods: {
    marqueeAnimation() {
      clearInterval(this.timer);
      const _this = this;
      if (this.$refs.marqueeBox) {
        const boxWidth = this.$refs.marqueeBox.offsetWidth;
        const marqueeText = this.$refs.marqueeText;
        const textWidth = marqueeText.scrollWidth;
        if (boxWidth < textWidth) {
          marqueeText.style.left = boxWidth + "px";
          const move = function() {
            if (marqueeText.offsetLeft > -textWidth) {
              marqueeText.style.left = marqueeText.offsetLeft - 1 + "px";
            } else {
              marqueeText.style.left =
                _this.$refs.marqueeBox.offsetWidth + "px";
            }
          };
          this.timer = setInterval(move, 20);
        } else {
          marqueeText.style.left = 0;
        }
      }
    }
  },
  mounted() {
    if (ResizeObserver) {
      const element = document.querySelector(".marquee-wrap");
      this.observer = new ResizeObserver(() => {
        this.marqueeAnimation();
      });
      this.observer.observe(element);
    } else {
      this.marqueeAnimation();
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style lang="less" scoped>
.marquee-wrap {
  box-sizing: border-box;
  width: 100%;
  padding: @margin-size-secondary @padding-size-main 0;
  .marquee {
    box-sizing: border-box;
    width: 100%;
    padding: 0 @padding-size-main;
    height: 40px;
    line-height: 40px;
    background: #faeee1;
    border: 1px solid @color-warning;
    border-radius: 2px;
    display: flex;
    align-items: center;
    .el-icon-warning {
      font-size: 16px;
      color: @color-warning;
      margin-right: @margin-size-secondary;
    }
    .marquee-box {
      flex: 1;
      height: 100%;
      overflow: hidden;
      position: relative;
      .marquee-content {
        white-space: nowrap;
        color: @color-warning;
        position: absolute;
        left: 0;
      }
    }
  }
}
</style>
