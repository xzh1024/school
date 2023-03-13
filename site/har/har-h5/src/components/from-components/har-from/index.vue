<template>
  <view
    class="har-form__wrap"
    :style="{
      paddingTop: padding[0] || 0,
      paddingRight: padding[1] || 0,
      paddingBottom: padding[2] || padding[0] || 0,
      paddingLeft: padding[3] || padding[1] || 0
    }"
  >
    <slot></slot>
    <view
      v-if="show"
      class="har-form__msg-wrap"
      :style="{
        top: top + 'px',
        left: left + 'rpx',
        right: right + 'rpx',
        background: background,
        borderRadius: ridus + 'rpx'
      }"
      :class="{
        'har-form__msg-bg': !background,
        'har-form__msg-show': errorMsg
      }"
      ><text
        class="har-form__text"
        :style="{ fontSize: size + 'rpx', color: color }"
        >{{ errorMsg }}</text
      ></view
    >
    <view v-if="disabled" class="har-form__mask"></view>
  </view>
</template>

<script>
  import form from "./har-validator.js";
  export default {
    name: "HarForm",
    props: {
      //表单padding值（上，右，下，左），同css顺序
      padding: {
        type: Array,
        default() {
          return [];
        }
      },
      //是否显示校验错误信息
      show: {
        type: Boolean,
        default: true
      },
      //是否禁用该表单内的所有组件,透明遮罩层
      disabled: {
        type: Boolean,
        default: false
      },
      //提示框top值 px
      top: {
        type: [Number, String],
        // #ifdef H5
        default: 44,
        // #endif
        // #ifndef H5
        default: 0
        // #endif
      },
      left: {
        type: [Number, String],
        default: 24
      },
      right: {
        type: [Number, String],
        default: 24
      },
      //错误提示框背景色
      background: {
        type: String,
        // #ifdef APP-NVUE
        default: "#FF2B2B",
        // #endif
        // #ifndef APP-NVUE
        default: ""
        // #endif
      },
      //错误提示字体大小
      size: {
        type: [Number, String],
        default: 28
      },
      //错误提示字体颜色
      color: {
        type: String,
        default: "#fff"
      },
      //错误提示框圆角值
      ridus: {
        type: [Number, String],
        default: 16
      },
      //错误消息显示时间 ms
      duration: {
        type: Number,
        default: 2000
      }
    },
    data() {
      return {
        errorMsg: "",
        timer: null
      };
    },
    // #ifndef VUE3
    beforeUnmount() {
      this.clearTimer();
    },
    // #endif
    // #ifdef VUE3
    beforeUnmount() {
      this.clearTimer();
    },
    // #endif
    methods: {
      clearTimer() {
        clearTimeout(this.timer);
        this.timer = null;
      },
      /*
			 {Object} model 表单数据对象
			 {Array} rules 表单验证规则
			*/
      validator(model, rules) {
        return new Promise((resolve, reject) => {
          try {
            const res = form.validator(model, rules);
            if (!res.isPassed && this.show) {
              this.clearTimer();
              this.errorMsg = res.errorMsg;
              this.timer = setTimeout(() => {
                this.errorMsg = "";
              }, this.duration);
            }
            resolve(res);
          } catch (e) {
            reject({
              isPassed: false,
              errorMsg: "校验出错，请检查传入的数据格式是否有误！"
            });
          }
        });
      }
    }
  };
</script>

<style scoped>
  .har-form__wrap {
    /* #ifndef APP-NVUE */
    width: 100%;
    box-sizing: border-box;
    /* #endif */
    flex: 1;
    position: relative;
  }

  .har-form__msg-wrap {
    padding: 24rpx;
    position: fixed;
    z-index: 900;
    text-align: center;
    /* #ifndef APP-NVUE */
    box-sizing: border-box;
    display: flex;
    word-break: break-all;
    /* #endif */
    align-items: center;
    justify-content: center;
    opacity: 0;

    /* #ifdef APP-NVUE */
    transform: translateY(-100%);
    transition-property: transform, opacity;
    /* #endif */
    /* #ifndef APP-NVUE */
    transform: translate3d(0, -100%, 0);
    visibility: hidden;
    transition-property: all;
    /* #endif */
    transition-duration: 0.25s;
    transition-delay: 0s;
    transition-timing-function: ease-in-out;
  }

  /* #ifndef APP-NVUE */
  .har-form__msg-bg {
    background: var(--har-color-danger, #ff2b2b) !important;
  }

  /* #endif */

  .har-form__text {
    text-align: center;
  }

  .har-form__msg-show {
    /* #ifndef APP-NVUE */
    visibility: visible;
    transform: translate3d(0, 0, 0);
    /* #endif */
    /* #ifdef APP-NVUE */
    transform: translateY(0);
    /* #endif */
    opacity: 1;
  }

  .har-form__mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 99;
  }
</style>
