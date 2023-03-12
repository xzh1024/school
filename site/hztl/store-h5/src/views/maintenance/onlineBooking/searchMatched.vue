<template>
  <div class="search-matched">
    <input
      ref="reference"
      type="text"
      class="search-input"
      placeholder="请输入想要搜索关键字"
      v-model="value"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
    />
    <div class="option-wrap" v-show="visible && options.length > 0">
      <ul class="option-list">
        <li
          class="text-left option-item"
          v-for="(item, index) in options"
          :key="index"
          @click="handleClick(item)"
        >
          <span
            class="text-success textprimary"
            :class="{ gray: index == now }"
            >{{ item.plateNumber }}</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import request from "@/request";

export default {
  props: {
    keyword: String
  },
  watch: {
    keyword: {
      handler: function(newVal) {
        this.value = newVal;
      },
      immediate: true
    }
  },
  data() {
    return {
      options: [],
      now: -1,
      value: "",
      selected: {},
      visible: false,
      softFocus: false,
      isSilentBlur: false
    };
  },
  methods: {
    getOptions(isOne) {
      request({
        url: "/customers/vehicles/my",
        params: { keyword: this.value }
      })
        .then(res => {
          this.options = res || [];
          if (isOne && this.options.length) {
            this.$emit("update:keyword", this.options[0].plateNumber);
          }
        })
        .catch(() => {
          this.options = [];
        });
    },
    // 获取焦点
    handleFocus() {
      this.visible = true;
    },
    // 失去焦点
    handleBlur() {
      setTimeout(() => {
        this.visible = false;
      }, 50);
    },
    handleInput(event) {
      this.$emit("update:keyword", event.target.value);
      this.getOptions();
    },
    handleClick(item) {
      this.$emit("update:keyword", item.plateNumber);
      this.handleBlur();
    }
  },
  created() {
    this.getOptions(true);
  }
};
</script>

<style lang="less" scoped>
@placeholderFontSize: 14px;
@placeholderFontWeight: 400;
@placeholderColor: #999999;
.search-matched {
  display: inline-block;
  position: relative;
  .search-input {
    font-size: 14px;
  }
  .search-input::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: @placeholderColor;
    font-size: @placeholderFontSize;
    font-weight: @placeholderFontWeight;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: @placeholderColor;
    font-size: @placeholderFontSize;
    font-weight: @placeholderFontWeight;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: @placeholderColor;
    font-size: @placeholderFontSize;
    font-weight: @placeholderFontWeight;
  }
  .search-input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: @placeholderColor;
    font-size: @placeholderFontSize;
    font-weight: @placeholderFontWeight;
  }
  .search-input::-ms-input-placeholder {
    /* Microsoft Edge */
    color: @placeholderColor;
    font-size: @placeholderFontSize;
    font-weight: @placeholderFontWeight;
  }
  .option-wrap {
    position: absolute;
    left: 0;
    top: calc(100% + 10px);
    z-index: 1000;
    width: 100%;
    max-height: 260px;
    overflow-y: auto;
    background-color: #ffffff;
    padding: 5px;
    border-radius: 4px;
    box-shadow: 5px 5px 5px 5px #ccc;
    .option-list {
      position: relative;
      .option-item {
        padding: 4px 8px;
      }
    }
  }
}
</style>
