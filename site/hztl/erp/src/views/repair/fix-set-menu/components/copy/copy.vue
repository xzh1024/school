<template>
  <ht-dialog
    v-bind="$attrs"
    title="复制为新套餐"
    width="300px"
    v-on="$listeners"
  >
    <el-form ref="form" :model="form" size="mini" label-width="70px">
      <el-form-item label="复制到" style="color:#409EFF;">
        {{ facBrand + "-" + vehicleGroup }}
      </el-form-item>
      <el-form-item label="保养里程">
        <el-input placeholder="请输入内容" v-model="form.name">
          <template slot="append">km</template>
        </el-input>
      </el-form-item>
    </el-form>
    <div style="margin: 10px 0 5px 0; text-align: center;">
      <el-button
        :disabled="!form.name"
        type="primary"
        size="mini"
        plain
        @click="addSet"
      >
        确 定（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click="$emit('close')">
        取 消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
export default {
  props: {
    vehicleGroup: {
      type: String,
      default: ""
    },
    facBrand: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      form: {
        name: ""
      }
    };
  },
  methods: {
    addSet() {
      this.$emit("copy", this.form.name + "km");
    }
  }
};
</script>

<style></style>
