<template>
  <el-dialog
    :title="formData.name"
    :visible.sync="visible"
    :close-on-click-modal="false"
    width="500px"
  >
    <div class="dialog-body">
      <el-form :model="formData" size="mini" label-width="122px">
        <!-- <el-form-item label="平台名称：">
          <el-input v-model="formData.name" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="授权价格类型：" required>
          <el-select
            v-model="formData.priceTypes"
            multiple
            collapse-tags
            placeholder="请选择"
          >
            <el-option
              v-for="item in priceTypeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授权配件性质：" required>
          <el-select
            v-model="formData.properties"
            multiple
            collapse-tags
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in propertyOptions"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授权配件仓库：" required>
          <el-select
            v-model="formData.stores"
            multiple
            collapse-tags
            placeholder="请选择"
          >
            <el-option
              v-for="item in storeOptions"
              :key="item.depotNo"
              :label="item.depotName"
              :value="item.depotNo"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <p class="hint">
      * 此处的设置项修改后需要将已上架的配件进行重新上架才能生效
    </p>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="hide">
        取 消
      </el-button>
      <el-button type="primary" size="mini" @click="submit">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { AUTH_PRICE_TYPES } from "@/constants/goods.js";
import {
  getAuthPropertys,
  getAuthStores,
  updateAuthSetting
} from "../../services/index.js";

export default {
  name: "EditDialog",
  data() {
    return {
      visible: false,
      formData: {
        // name: "",
        priceTypes: [],
        properties: [],
        stores: []
      },
      priceTypeOptions: AUTH_PRICE_TYPES,
      propertyOptions: [],
      storeOptions: []
    };
  },
  methods: {
    show(data) {
      Object.assign(this.formData, data);
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    getAuthPropertys() {
      getAuthPropertys().then(res => {
        this.propertyOptions = res || [];
      });
    },
    getAuthStores() {
      getAuthStores().then(res => {
        this.storeOptions = res || [];
      });
    },
    submit() {
      const { priceTypes, properties, stores } = this.formData;
      if (!priceTypes.length) {
        this.$message.warning("授权价格类型不能为空");
        return;
      }
      if (!properties.length) {
        this.$message.warning("授权配件性质不能为空");
        return;
      }
      if (!stores.length) {
        this.$message.warning("授权配件仓库不能为空");
        return;
      }
      updateAuthSetting({
        priceTypes,
        properties,
        stores
      }).then(() => {
        this.$emit("update");
        this.hide();
      });
    }
  },
  created() {
    this.getAuthPropertys();
    this.getAuthStores();
  }
};
</script>

<style lang="less" scoped>
.dialog-body {
  max-height: 400px;
  overflow-y: auto;
  padding: 0 50px;
  .el-select {
    width: 100%;
  }
}
.hint {
  text-align: center;
  color: @color-error;
}
</style>
