<template>
  <div
    ref="resizeWrapper"
    :class="{ 'resize-wrapper': true, 'direction-colunm': isColumn }"
  >
    <el-collapse-transition>
      <div ref="block1" class="block1">
        <slot name="block1" />
      </div>
    </el-collapse-transition>
    <div ref="resizeSlider" class="resize-slider">
      <span v-show="useSeeDetails" ref="resize" class="resize" />
      <div class="sales-icons is-see-detilas">
        <i
          :class="{
            icon: true,
            'el-icon-caret-left': useSeeDetails,
            'el-icon-caret-right': !useSeeDetails,
            'icon-rotate-direction': directionContrary
          }"
          @click="changeBoxVisible(!useSeeDetails)"
        />
      </div>
    </div>
    <div ref="block2" class="block2">
      <slot name="block2" />
    </div>
  </div>
</template>

<script>
const resizeSliderWidth = 16;

export default {
  name: "ResizeBox",
  props: {
    isColumn: {
      type: Boolean,
      default: false
    },
    directionContrary: {
      type: Boolean,
      default: false
    },
    minLen: {
      type: Number,
      default: 100
    },
    defaultLen: {
      type: Number,
      default: 150
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      curSeeDetails: true,
      block1Dom: this.$refs.block1
    };
  },
  computed: {
    useSeeDetails: {
      get() {
        return this.curSeeDetails && this.visible;
      },
      set(value) {
        this.curSeeDetails = value;
        this.$emit("update:visible", value);
      }
    }
  },
  watch: {
    visible(value) {
      this.curSeeDetails = value;
    },
    useSeeDetails(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.changeBoxVisible(newVal);
      }
    }
  },
  mounted() {
    this.changeBoxVisible(this.useSeeDetails);
    this.initListen();
  },
  methods: {
    changeBoxVisible(useSeeDetails) {
      let len = this.defaultLen ? this.defaultLen : this.minLen;
      if (!useSeeDetails) {
        len = 0;
      }
      this.setResize(len, this.directionContrary);
    },
    initListen() {
      const resizeDom = this.$refs.resize;
      const block1Dom = this.$refs.block1;

      resizeDom.onmousedown = e => {
        let startLen;
        let beforeLen;
        if (this.isColumn) {
          startLen = e.clientY;
          beforeLen = block1Dom.offsetHeight;
        } else {
          startLen = e.clientX;
          beforeLen = block1Dom.offsetWidth;
        }

        document.onmousemove = e => {
          const endLen = this.isColumn ? e.clientY : e.clientX;
          const positionLen = endLen - startLen + beforeLen;
          this.setResize(positionLen);
        };
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
          resizeDom.releaseCapture && resizeDom.releaseCapture();
        };
        resizeDom.setCapture && resizeDom.setCapture();
      };
    },
    setResize(positionLen, isRight) {
      let position = positionLen;
      const resizeWrapperLen = this.isColumn
        ? this.$refs.resizeWrapper.offsetHeight
        : this.$refs.resizeWrapper.offsetWidth;
      if (position < this.minLen) {
        position = this.directionContrary && !isRight ? this.minLen : 0;
      } else if (
        resizeWrapperLen &&
        position > resizeWrapperLen - this.minLen
      ) {
        position =
          this.directionContrary && !isRight
            ? resizeWrapperLen - resizeSliderWidth
            : resizeWrapperLen - this.minLen;
      }
      this.useSeeDetails = !(
        position <= 0 ||
        (resizeWrapperLen && position >= resizeWrapperLen - resizeSliderWidth)
      );
      position =
        resizeWrapperLen && isRight
          ? resizeWrapperLen - position - resizeSliderWidth
          : position;
      if (this.isColumn) {
        this.$refs.block1.style.height = position + "px";
      } else {
        this.$refs.block1.style.width = position + "px";
      }
      this.$emit("resize", position);
    }
  }
};
</script>

<style lang="stylus" scoped>
.resize-wrapper {
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: flex;

    .block1 {
        flex: none;
        width: 10px;
        height: 100%;
        overflow: auto;
    }

    .block2 {
        flex: auto;
        height: 100%;
        overflow: auto;
    }

    .resize-slider {
        display: flex;
        flex: none;
        position: relative;
        width: 12px;
        background-color: #E7EBED;

        .resize {
            display: inline-block;
            background-color: #C9CED4;
            cursor: grab;
            margin: 0 4px;
            width: 8px;
        }

        .is-see-detilas {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);

            .icon {
                height: 60px;
                width: 10px;
                line-height: 60px;
                font-size: 12px;

                &.icon-rotate-direction {
                    transform: rotate(180deg);
                }
            }
        }
    }

    &.direction-colunm {
        flex-direction: column;

        >.block1 {
            width: 100%;
            height: 10px;
        }

        >.block2 {
            width: 100%;
            height: 1px;
        }

        >.resize-slider {
            height: 12px;
            width: 100%;

            .resize {
                margin: 4px 0;
                height: 4px;
                width: 100%;
            }

            .is-see-detilas .icon {
                transform: rotate(90deg);
                font-size: 12px;

                &.icon-rotate-direction {
                    transform: rotate(270deg);
                }
            }
        }
    }
}
</style>
