<template>
  <ht-input
    :value="displayValue"
    v-bind="$attrs"
    class="code-input"
    size="mini"
    maxlength="6"
    @input="handleInput"
    v-on="passListeners"
  >
    <el-button
      slot="append"
      :disabled="!!countdownTime"
      style="width: 100px"
      type="primary"
      size="mini"
      @click="getCode"
    >
      {{ btnText }}
    </el-button>
  </ht-input>
</template>
<script>
const limitTime = 60;

export default {
  name: "AuthCode",
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {}
  },
  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },
  data() {
    return {
      userInput: null,
      countdownTime: 0,
      currentValue: null
    };
  },
  computed: {
    btnText() {
      return this.countdownTime === 0 ? "获取验证码" : `${this.countdownTime}S`;
    },
    passListeners() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { input, ...others } = this.$listeners;
      return others;
    },
    displayValue() {
      if (this.userInput !== null) {
        return this.userInput;
      }
      const currentValue = this.currentValue;
      return currentValue;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.currentValue = value;
        this.userInput = null;
      }
    }
  },
  methods: {
    handleInput(value) {
      this.setCurrentValue(value);
    },
    clearCountdown() {
      this.countdownTime = 0;
    },
    setCurrentValue(newVal) {
      const oldVal = this.currentValue;
      if (oldVal === newVal) return;
      this.userInput = null;
      this.$emit("input", newVal);
      this.$emit("change", newVal, oldVal);
      this.currentValue = newVal;
    },
    getCode() {
      this.countdownTime = limitTime;
      this.$emit("sendCode");
      this.countdown();
    },
    countdown() {
      setTimeout(() => {
        if (this.countdownTime > 0) {
          this.countdownTime--;
          this.countdown();
        }
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";

.code-input {
  ::v-deep .el-input-group__append button.el-button {
    color: #fff;
    background-color: #409eff;
    @include background_color("color-light");
    border-color: #409eff;
    @include border_color("color-light");
    border-radius: 0px;

    &.is-disabled,
    &.is-disabled:active,
    &.is-disabled:focus,
    &.is-disabled:hover {
      color: #fff;
      background-color: #a0cfff;
      @include background_color("button-primary-disabled");
      border-color: #a0cfff;
      @include border_color("button-primary-disabled");
    }
  }
}
</style>
