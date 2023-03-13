<template>
  <ht-input
    :value="displayValue"
    :disabled="inputNumberDisabled"
    :size="inputNumberSize"
    :maxlength="maxlength"
    v-bind="$attrs"
    class="format-number-input"
    @input="handleInput"
    @blur="blur"
    @change="changeHanle"
    v-on="passListeners"
  >
    <template v-if="$slots.prepend" slot="prepend">
      <slot name="prepend" />
    </template>
    <template v-if="$slots.append" slot="append">
      <slot name="append" />
    </template>
    <template v-if="$slots.prefix" slot="prefix">
      <slot name="prefix" />
    </template>
    <template v-if="$slots.suffix" slot="suffix">
      <slot name="suffix" />
    </template>
  </ht-input>
</template>
<script>
import { PRECISION_TYPES } from "@/constants";
import precisionsFixed from "@/mixins/PrecisionsFixedMixin";
import { getNumberByAcc } from "@/utils/tool";

import { Input } from "hztl-ui";

const noNumberConversion = [undefined, null, ""];

export default {
  name: "HtFormatNumber",
  componentName: "HtFormatNumber",
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
  mixins: [precisionsFixed],
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    isThrottle: Boolean,
    disabled: Boolean,
    size: String,
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    // eslint-disable-next-line vue/require-prop-types
    value: {},
    precisionNumber: {
      type: Number,
      default: 0
    },
    precisionType: {
      validator: function(value) {
        return PRECISION_TYPES.includes(value);
      }
    },
    maxlength: {
      type: [String, Number],
      default: 12
    }
  },
  data() {
    return {
      userInput: null,
      currentValue: null
    };
  },
  computed: {
    relPrecision() {
      return this.precisionType
        ? this.getPrecisionNumber(this.precisionType)
        : this.precisionNumber;
    },
    passListeners() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { change, ...others } = this.$listeners;
      return others;
    },
    inputNumberDisabled() {
      if (this.disabled === undefined) {
        return (this.elForm || {}).disabled;
      } else {
        return !!this.disabled;
      }
    },
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    inputNumberSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
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
        let newVal = value;
        if (noNumberConversion.includes(value)) {
          newVal = null;
        } else {
          newVal = Number(value);
          if (newVal >= this.max) {
            newVal = this.max;
          }
          if (newVal <= this.min) {
            newVal = this.min;
          }
        }
        this.currentValue = newVal;
        this.userInput = null;
      }
    },
    max(max) {
      let newVal = this.value;
      if (noNumberConversion.includes(this.value)) {
        newVal = null;
      } else {
        newVal = Number(this.value);
        if (newVal >= max) {
          newVal = max;
        }
        if (newVal <= this.min) {
          newVal = this.min;
        }
      }
      this.currentValue = newVal;
      this.userInput = null;
    }
  },
  methods: {
    handleInput(value) {
      this.userInput = value;
      const formateValue = value === "" ? null : Number(value);
      if (
        !this.isThrottle &&
        (formateValue === null || `${formateValue}` === value)
      ) {
        this.setCurrentValue(formateValue);
        this.userInput = null;
      }
    },
    changeHanle(value) {
      const newVal = value === "" ? undefined : Number(value);
      if (!isNaN(newVal) || value === "") {
        this.setCurrentValue(newVal);
      }
      this.userInput = null;
    },
    setCurrentValue(newVal) {
      const oldVal = this.currentValue;
      if (!noNumberConversion.includes(newVal)) {
        newVal = getNumberByAcc(newVal, this.relPrecision);
        if (newVal >= this.max) {
          newVal = this.max;
        } else if (newVal <= this.min) {
          newVal = this.min;
        }
      }
      if (oldVal === newVal) return;
      this.userInput = null;
      this.$emit("input", newVal);
      this.$emit("change", newVal, oldVal);
      this.currentValue = newVal;
    },
    blur() {
      this.$emit("set", this.currentValue);
    }
  }
};
</script>
