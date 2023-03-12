<template>
  <view
    class="har-search__bar-wrap"
    :class="{ 'har-searchbar__wrap-bg': !background }"
    :style="{
      background: background,
      paddingTop: paddingTb + 'rpx',
      paddingBottom: paddingTb + 'rpx',
      paddingLeft: paddingLr + 'rpx',
      paddingRight: paddingLr + 'rpx'
    }"
  >
    <view class="har-search__bar-form" :style="{ height: height + 'rpx' }">
      <view
        v-if="showInput"
        class="har-search__bar-box"
        :style="{
          height: height + 'rpx',
          borderRadius: radius + 'rpx',
          background: inputBackground
        }"
      >
        <view class="har-search__bar-icon">
          <view class="har-sbi__circle"></view>
          <view class="har-sbi__line"></view>
        </view>
        <input
          class="har-search__bar-input"
          :class="{ 'har-sb__input-color': !color }"
          :style="{ color: color, height: height + 'rpx' }"
          placeholder-class="har-search__bar-pl"
          :placeholder="placeholder"
          :value="val"
          :focus="isFocus"
          :disabled="disabled"
          confirm-type="search"
          @blur="inputBlur"
          @focus="inputFocus"
          @input="inputChange"
          @confirm="search"
        />
        <view
          v-if="val.length > 0 && !disabled"
          class="har-sbi__clear-wrap"
          @tap.stop="clearInput"
        >
          <view class="har-sbi__clear">
            <view class="har-sbi__clear-a"></view>
          </view>
          <view class="har-sbi__clear">
            <view class="har-sbi__clear-b"></view>
          </view>
        </view>
      </view>
      <view
        v-if="!isFocus && !isSearch && showLabel"
        class="har-search__bar-label"
        :class="[isLeft ? 'har-sb__label-left' : 'har-sb__label-center']"
        :style="{ borderRadius: radius + 'rpx', background: inputBackground }"
        @tap="onShowInput"
      >
        <view class="har-search__bar-icon">
          <view class="har-sbi__circle"></view>
          <view class="har-sbi__line"></view>
        </view>
        <text class="har-search__bar-text">{{ placeholder }}</text>
      </view>
    </view>
    <text
      v-if="cancel && isSearch && !val && cancelText && cancelText !== 'true'"
      class="har-search__bar-btn"
      :style="{ color: cancelColor }"
      @tap="hideInput"
      >{{ cancelText }}</text
    >
    <text
      v-if="val && !disabled && isSearch && searchText && searchText !== 'true'"
      class="har-search__bar-btn"
      :class="{ 'har-sb__btn-color': !searchColor }"
      :style="{ color: searchColor }"
      @tap="search"
      >{{ searchText }}</text
    >
  </view>
</template>

<script>
  export default {
    name: "HarSearchBar",
    props: {
      //搜索栏背景色
      background: {
        type: String,
        // #ifdef APP-NVUE
        default: "#F1F4FA",
        // #endif
        // #ifndef APP-NVUE
        default: ""
        // #endif
      },
      //搜索栏上下padding（padding-top，padding-bottom）
      paddingTb: {
        type: [Number, String],
        default: 16
      },
      paddingLr: {
        type: [Number, String],
        default: 24
      },
      height: {
        type: [Number, String],
        default: 72
      },
      radius: {
        type: [Number, String],
        default: 8
      },
      color: {
        type: String,
        // #ifdef APP-NVUE
        default: "#181818",
        // #endif
        // #ifndef APP-NVUE
        default: ""
        // #endif
      },
      //input框背景色
      inputBackground: {
        type: String,
        default: "#fff"
      },
      focus: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: "请输入搜索关键词"
      },
      isLeft: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        default: ""
      },
      disabled: {
        type: Boolean,
        default: false
      },
      cancel: {
        type: Boolean,
        default: true
      },
      cancelText: {
        type: String,
        default: "取消"
      },
      cancelColor: {
        type: String,
        default: "#7F7F7F"
      },
      searchText: {
        type: String,
        default: "搜索"
      },
      searchColor: {
        type: String,
        // #ifdef APP-NVUE
        default: "#465CFF",
        // #endif
        // #ifndef APP-NVUE
        default: ""
        // #endif
      },
      //是否显示搜索输入框
      showInput: {
        type: Boolean,
        default: true
      },
      //是否显示输入框占位标签，当平台不支持focus属性时可隐藏
      showLabel: {
        type: Boolean,
        default: true
      }
    },
    emits: ["clear", "focus", "blur", "click", "cancel", "input", "search"],
    data() {
      return {
        isSearch: false,
        isFocus: false,
        val: ""
      };
    },
    watch: {
      focus(val) {
        this.$nextTick(() => {
          this.isFocus = val;
        });
      },
      value(val) {
        this.val = val;
      }
    },
    created() {
      this.val = this.value;
      if (this.focus || this.val.length > 0) {
        this.isSearch = true;
      }
    },
    mounted() {
      this.$nextTick(() => {
        // #ifdef MP-TOUTIAO
        setTimeout(() => {
          this.isFocus = this.focus;
        }, 300);
        // #endif
        // #ifndef MP-TOUTIAO
        setTimeout(() => {
          this.isFocus = this.focus;
        }, 120);
        // #endif
      });
    },
    methods: {
      clearInput() {
        this.val = "";
        // #ifdef MP-TOUTIAO || MP-WEIXIN
        this.isFocus = false;
        uni.hideKeyboard();
        // #endif
        // #ifndef MP-TOUTIAO || MP-WEIXIN
        this.isFocus = true;
        // #endif
        this.$emit("clear");
      },
      inputFocus(e) {
        if (!this.showLabel) {
          this.isSearch = true;
        }
        this.$emit("focus", e);
      },
      inputBlur(e) {
        this.isFocus = false;
        if (!this.cancel && !this.val) {
          this.isSearch = false;
        }
        this.$emit("blur", e);
      },
      onShowInput() {
        if (!this.disabled && this.showInput) {
          this.isSearch = true;
          setTimeout(() => {
            this.isFocus = true;
          }, 20);
        }
        this.$emit("click", {});
      },

      hideInput() {
        this.isSearch = false;
        this.isFocus = false;
        uni.hideKeyboard();
        this.$emit("cancel", {});
      },
      inputChange(e) {
        this.val = e.detail.value;
        this.$emit("input", e);
      },
      search() {
        this.$emit("search", {
          detail: {
            value: this.val
          }
        });
      }
    }
  };
</script>

<style scoped>
  .har-search__bar-wrap {
    /* #ifndef APP-NVUE */
    width: 100%;
    display: flex;
    box-sizing: border-box;
    /* #endif */
    flex: 1;
    flex-direction: row;
    position: relative;
    align-items: center;
  }

  /* #ifndef APP-NVUE */
  .har-searchbar__wrap-bg {
    background: var(--har-bg-color-grey, #f1f4fa) !important;
  }

  /* #endif */
  .har-search__bar-form {
    position: relative;
    /* #ifndef APP-NVUE */
    width: 100%;
    /* #endif */
    flex: 1;
  }

  .har-search__bar-box {
    /* #ifndef APP-NVUE */
    width: 100%;
    /* #endif */
    flex: 1;
    padding-left: 24rpx;
    padding-right: 24rpx;
    /* #ifndef APP-NVUE */
    display: flex;
    box-sizing: border-box;
    /* #endif */
    flex-direction: row;
    z-index: 1;
    align-items: center;
  }

  .har-search__bar-input {
    padding: 0 16rpx;
    border: 0;
    font-size: 28rpx;
    /* #ifndef APP-NVUE */
    width: 100%;
    box-sizing: border-box;
    line-height: normal;
    /* #endif */
    flex: 1;
    background: transparent;
  }

  /* #ifndef APP-NVUE */
  .har-search__bar-input:focus {
    outline: none;
  }

  /* #endif */

  .har-search__bar-pl {
    /* #ifndef APP-NVUE */
    color: var(--har-color-label, #b2b2b2) !important;
    overflow: visible;
    /* #endif */

    /* #ifdef APP-NVUE */
    color: #b2b2b2;
    /* #endif */
  }

  /* #ifdef MP */
  .har-search__bar-box >>> .har-search__bar-pl {
    color: var(--har-color-label, #b2b2b2);
    overflow: visible;
  }

  /* #endif */

  .har-search__bar-label {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    /* #ifndef APP-NVUE */
    display: flex;
    box-sizing: border-box;
    /* #endif */
    flex-direction: row;
    align-items: center;
  }

  .har-sb__label-center {
    justify-content: center;
  }

  .har-sb__label-left {
    padding-left: 24rpx;
  }

  .har-search__bar-btn {
    font-size: 30rpx;
    margin-left: 24rpx;
    /* #ifndef APP-NVUE */
    flex-shrink: 0;
    /* #endif */
    /* #ifdef H5 */
    cursor: pointer;
    /* #endif */
  }

  /* #ifndef APP-NVUE */
  .har-sb__input-color {
    color: var(--har-color-title, #181818) !important;
  }

  .har-sb__btn-color {
    color: var(--har-color-primary, #465cff) !important;
  }

  /* #endif */
  .har-search__bar-btn:active {
    opacity: 0.5;
  }

  .har-search__bar-text {
    font-size: 28rpx;
    /* line-height: 28rpx; */
    padding-left: 16rpx;
    /* #ifndef APP-NVUE */
    color: var(--har-color-label, #b2b2b2);
    /* #endif */

    /* #ifdef APP-NVUE */
    color: #b2b2b2;
    /* #endif */
  }

  .har-search__bar-icon {
    /* #ifndef APP-NVUE */
    display: inline-flex;
    flex-shrink: 0;
    /* #endif */
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transform: rotate(-45deg);
    /* #ifdef APP-NVUE */
    transform-origin: 15rpx center;
    /* #endif */

    /* #ifndef APP-NVUE */
    transform-origin: 56% center;
    /* #endif */
  }

  .har-sbi__circle {
    width: 24rpx;
    height: 24rpx;
    /* #ifndef APP-NVUE */
    box-sizing: border-box;
    border: 1px solid var(--har-color-label, #b2b2b2);
    /* #endif */
    /* #ifdef APP-NVUE */
    border: 1px solid #b2b2b2;
    /* #endif */
    border-radius: 50%;
  }

  .har-sbi__line {
    width: 1px;
    height: 12rpx;
    /* #ifdef APP-NVUE */
    background-color: #b2b2b2;
    /* #endif */
    /* #ifndef APP-NVUE */
    background-color: var(--har-color-label, #b2b2b2);
    /* #endif */
    border-bottom-left-radius: 6rpx;
    border-bottom-right-radius: 6rpx;
  }

  .har-sbi__clear-wrap {
    width: 32rpx;
    height: 32rpx;
    /* #ifdef APP-NVUE */
    background-color: #b2b2b2;
    /* #endif */
    /* #ifndef APP-NVUE */
    background-color: var(--har-color-label, #b2b2b2);
    /* #endif */
    transform: rotate(45deg);
    position: relative;
    /* #ifndef APP-NVUE */
    border-radius: 50%;
    flex-shrink: 0;
    /* #endif */

    /* #ifdef APP-NVUE */
    border-radius: 32rpx;
    /* #endif */

    /* #ifdef H5 */
    cursor: pointer;
    /* #endif */
  }

  .har-sbi__clear {
    width: 32rpx;
    height: 32rpx;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;
    transform: scale(0.5) translateZ(0);
  }

  .har-sbi__clear-a {
    width: 32rpx;
    border: 2rpx solid #fff;
    background-color: #fff;
    /* #ifndef APP-NVUE */
    box-sizing: border-box;
    /* #endif */
  }

  .har-sbi__clear-b {
    height: 32rpx;
    border: 2rpx solid #fff;
    background-color: #fff;
    /* #ifndef APP-NVUE */
    box-sizing: border-box;
    /* #endif */
  }
</style>
