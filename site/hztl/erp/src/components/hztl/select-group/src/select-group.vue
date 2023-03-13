<template>
  <el-cascader
    v-model="formateValue"
    :options="formateOptions"
    :props="{ value: id, label: name }"
    v-bind="$attrs"
    :children="children"
  />
</template>
<script>
export default {
  name: "HtSelectGroup",
  componentName: "HtSelectGroup",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    options: {
      type: [Object, Array],
      default: function() {
        return [];
      }
    },
    children: {
      type: String,
      default: "children"
    },
    // eslint-disable-next-line vue/require-prop-types
    value: {},
    formateType: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: "id"
    },
    name: {
      type: String,
      default: "name"
    }
  },
  computed: {
    formateOptions() {
      const optionsFormate = options => {
        if (!options) {
          return;
        }
        return options.map(item => {
          return {
            id: item[this.id],
            name: item[this.name],
            children: item[this.children]
          };
        });
      };
      return optionsFormate(this.options);
    },
    formateValue: {
      get() {
        let list = [];
        const valueFormate = (opitons, parents) => {
          return opitons.find(item => {
            if (item.id === this.value) {
              list = [...parents, item];
              return list;
            } else if (item.children) {
              return valueFormate(item.children, [...parents, item]);
            }
          });
        };
        valueFormate(this.formateOptions, []);
        return list.map(item => item[this.id]);
      },
      set(value) {
        this.$emit("change", value[value.length - 1]);
      }
    }
  }
};
</script>
