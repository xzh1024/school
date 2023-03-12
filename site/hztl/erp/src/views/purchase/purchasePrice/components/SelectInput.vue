<template>
  <el-row>
    <el-col :span="14">
      <el-form-item :prop="_prop">
        <el-select :value="value" v-bind="$attrs" v-on="$listeners">
          <span v-if="_label" slot="prefix" class="select-prefix-text">{{
            _label
          }}</span>
          <el-option
            v-for="(item, key) in defualtOptions"
            :key="key"
            :label="item"
            :value="Number(key)"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="10">
      <slot />
    </el-col>
  </el-row>
</template>
<script>
/* eslint-disable vue/prop-name-casing */
export default {
  name: "SelectInput",
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {},
    _label: {
      type: [String, Number],
      default: "库龄"
    },
    _prop: {
      type: [String, Number],
      default: "qtyLimitType"
    },
    typeOptions: {
      type: String,
      default: "dy"
    }
  },
  data() {
    return {
      options: {
        3: ">=",
        0: ">"
      },
      options2: {
        4: "<=",
        1: "<"
      }
    };
  },
  computed: {
    defualtOptions() {
      let list;
      switch (this.typeOptions) {
        case "dy":
          list = { ...this.options };
          break;
        case "xy":
          list = { ...this.options2 };
          break;
      }
      return list;
    }
  }
};
</script>
