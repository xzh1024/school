<template>
  <ht-input
    :value="displayValue"
    v-bind="$attrs"
    class="ht-percent-input"
    @input="handleInput"
    @change="changeHanle"
    v-on="passListeners"
  />
</template>
<script>
import { divide, multiply } from "@/utils/numberAPI";
import { Input } from "hztl-ui";

export default {
  name: "HtPercentInput",
  componentName: "HtPercentInput",
  components: {
    HtInput: Input
  },
  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {},
    fixedNum: {
      type: Number,
      default: 2,
      validator: function(value) {
        return value >= 2;
      }
    },
    max: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      userInput: null,
      currentValue: null
    };
  },
  computed: {
    passListeners() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { change, ...others } = this.$listeners;
      return others;
    },
    displayValue() {
      if (this.userInput !== null) {
        return this.userInput;
      }
      let currentValue = this.currentValue;
      if (currentValue) {
        currentValue = `${multiply(currentValue, 100, this.fixedNum - 2)}%`;
      }
      console.log(this.currentValue);
      return currentValue;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        let newVal = [undefined, null, ""].includes(value)
          ? value
          : Number(value);
        if (isNaN(newVal)) {
          newVal = null;
        }
        this.currentValue = newVal;
        this.userInput = null;
      }
    }
  },
  methods: {
    handleInput(value) {
      this.userInput = value;
    },
    changeHanle(value) {
      let newVal =
        value === "" ? undefined : Number(value.replace(/%$/, "")) / 100;
      if (value !== "") {
        newVal = Number(value.replace(/%$/, ""));
        if (!isNaN(newVal)) {
          newVal = Number(divide(newVal, 100, this.fixedNum));
        }
      }
      if (!isNaN(newVal) || value === "") {
        if (newVal < this.min) {
          newVal = this.min;
        } else if (newVal > this.max) {
          newVal = this.max;
        }
        this.setCurrentValue(newVal);
      }
      this.userInput = null;
    },
    setCurrentValue(newVal) {
      const oldVal = this.currentValue;
      if (oldVal === newVal) return;
      this.userInput = null;
      this.$emit("input", newVal);
      this.$emit("change", newVal, oldVal);
      this.currentValue = newVal;
    }
  }
};
</script>
