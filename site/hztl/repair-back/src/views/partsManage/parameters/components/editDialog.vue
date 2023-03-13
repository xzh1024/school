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

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import { AUTH_PRICE_TYPES } from "@/common/constants/options";
import {
  AuthSettingModel,
  AuthPriceTypeModel,
  AuthStoreModel
} from "@/common/interface/commodityInterface";
import { CommodityService } from "@/common/services/commodityService";
const commodityService = new CommodityService();

@Component({
  name: "EditDialog"
})
export default class EditDialog extends Vue {
  @Emit("update")
  protected update() {
    return;
  }
  protected visible = false;
  protected formData: AuthSettingModel = {
    // name: "",
    priceTypes: [],
    properties: [],
    stores: []
  };

  protected priceTypeOptions: AuthPriceTypeModel[] = AUTH_PRICE_TYPES;
  protected propertyOptions: string[] = [];
  protected storeOptions: AuthStoreModel[] = [];

  public show(data: AuthSettingModel) {
    Object.assign(this.formData, data);
    this.visible = true;
  }

  public hide() {
    this.visible = false;
  }

  // protected getAuthPriceTypes() {
  //   commodityService.getAuthPriceTypes().then((res: AuthPriceTypeModel[]) => {
  //     this.priceTypeOptions = res || [];
  //   });
  // }
  protected getAuthPropertys() {
    commodityService.getAuthPropertys().then((res: string[]) => {
      this.propertyOptions = res || [];
    });
  }
  protected getAuthStores() {
    commodityService.getAuthStores().then((res: AuthStoreModel[]) => {
      this.storeOptions = res || [];
    });
  }

  protected submit() {
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
    commodityService
      .updateAuthSetting({
        priceTypes,
        properties,
        stores
      })
      .then(() => {
        this.update();
        this.hide();
      });
  }

  created() {
    // this.getAuthPriceTypes();
    this.getAuthPropertys();
    this.getAuthStores();
  }
}
</script>

<style lang="scss" scoped>
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
  color: $color-warning;
}
</style>
