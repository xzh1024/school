<template>
  <el-cascader
    v-model="area"
    :options="areas"
    filterable
    v-bind="$attrs"
    v-on="passListeners"
  />
</template>

<script>
import { getLocalAreas } from "@/api/area";
import { findTreeMatchPath } from "@/utils/tool";

export default {
  name: "AreaSelect",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: [Number, Array]
  },
  data() {
    return {
      areas: []
    };
  },
  computed: {
    useArrayType() {
      return this.value instanceof Array;
    },
    passListeners() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { change, ...others } = this.$listeners;
      return others;
    },
    area: {
      get() {
        let area = [];
        if (this.useArrayType) {
          area = [...this.value];
        } else {
          area = findTreeMatchPath(this.areas, this.value).map(
            item => item.value
          );
        }
        return area;
      },
      set(val) {
        const selected = findTreeMatchPath(this.areas, val[val.length - 1]).map(
          item => ({
            ...item
          })
        );
        if (this.useArrayType) {
          this.$emit("change", [...val], selected);
        } else {
          this.$emit(
            "change",
            val && val.length ? val[val.length - 1] : null,
            val && val.length ? selected : []
          );
        }
      }
    }
  },
  mounted() {
    getLocalAreas().then(res => {
      this.areas = res;
    });
  }
};
</script>
