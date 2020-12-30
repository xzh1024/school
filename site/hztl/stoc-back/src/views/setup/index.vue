<template>
  <layout-main>
    <div slot="main" class="setup-component hz-container">
      <div class="ht-header">
        <el-button type="primary" size="mini" @click="submit">
          保存
        </el-button>
      </div>
      <div class="ht-main">
        <el-form
          size="mini"
          label-width="80px"
          class="form-item-small-margin-bottom clearfix"
        >
          <!-- <el-row :gutter="50"> -->
          <div class="main-left">
            <ht-card title="库存展示">
              <el-button
                type="primary"
                size="mini"
                plain
                slot="after-title"
                @click="addSku"
                >+添加</el-button
              >
              <el-form-item
                label="库存区间："
                v-for="(sku, index) in formData.skuSetting"
                :key="index"
              >
                <el-row :gutter="12">
                  <el-col :span="10">
                    <el-row :gutter="2">
                      <el-col :span="11">
                        <el-input
                          v-model.trim="sku.startQty"
                          clearable
                          placeholder="开始值"
                          :maxlength="100"
                          @keyup.native="
                            sku.startQty = integerValidate(sku.startQty)
                          "
                        />
                      </el-col>
                      <el-col :span="2">
                        <div class="divider"></div>
                      </el-col>
                      <el-col :span="11">
                        <el-input
                          v-model.trim="sku.endQty"
                          clearable
                          placeholder="结束值"
                          :maxlength="100"
                          @keyup.native="
                            sku.endQty = integerValidate(sku.endQty)
                          "
                        />
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="10" class="row-select">
                    <el-select v-model="sku.type" placeholder="">
                      <el-option
                        v-for="item in skuOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                    <el-input
                      v-show="sku.type === 5"
                      v-model.trim="sku.upperLimitQty"
                      :maxlength="100"
                      @keyup.native="
                        sku.upperLimitQty = integerValidate(sku.upperLimitQty)
                      "
                    />
                  </el-col>
                  <el-col :span="3">
                    <i
                      class="el-icon-error"
                      title="删除"
                      @click="deleteSku(index)"
                      v-show="index"
                    ></i>
                  </el-col>
                </el-row>
              </el-form-item>
            </ht-card>
          </div>
          <div class="main-right">
            <ht-card title="价格展示">
              <el-row :gutter="12">
                <el-col :span="10" class="row-select">
                  <el-form-item label="选择价格类型：" label-width="102px">
                    <el-select
                      v-model="formData.priceSetting"
                      clearable
                      placeholder=""
                    >
                      <el-option
                        v-for="item in priceOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col
                  :span="14"
                  class="font12 text-orange"
                  style="line-height: 30px;"
                >
                  *不展示价格时会在页面上展示“请询价”字样
                </el-col>
              </el-row>
            </ht-card>
          </div>
          <!-- </el-row> -->
        </el-form>
      </div>
    </div>
  </layout-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import layoutMain from "@/components/layout/layoutMain.vue";
import HtCard from "@/components/ht-card";
import { skuTypeEnum, priceTypeEnum } from "@/common/enum/setupEnum";
import {
  SetupFormParams,
  SkuSettingModel
} from "@/common/interface/setupInterface";
import { SetupService } from "@/common/services/setupService";
const setupService = new SetupService();

const skuModel: SkuSettingModel = {
  startQty: "", // 库存区间开始值
  endQty: "", // 库存区间结束值
  type: 0, // 展示类型,0:有货;1:充足;2:紧张;3:缺货;4:真实库存;5:设置展示上限
  upperLimitQty: "" //设置展示上限时，展示上限值
};

@Component({
  name: "Setup",
  components: {
    layoutMain,
    HtCard
  }
})
export default class Setup extends Vue {
  protected formData: SetupFormParams<SkuSettingModel> = {
    priceSetting: "",
    skuSetting: [
      {
        ...skuModel
      }
    ]
  };

  protected skuOptions = skuTypeEnum;
  protected priceOptions = priceTypeEnum;

  protected getSettings() {
    setupService.getSettings().then((res: SetupFormParams<SkuSettingModel>) => {
      console.log(res);
      const data = {
        priceSetting: res.priceSetting,
        skuSetting: res.skuSetting || []
      };
      Object.assign(this.formData, data);
    });
  }

  protected addSku() {
    this.formData.skuSetting.push({ ...skuModel });
  }
  protected deleteSku(index: number) {
    if (this.formData.skuSetting.length > 1) {
      this.formData.skuSetting.splice(index, 1);
    }
  }

  protected submit() {
    const { skuSetting, priceSetting } = this.formData;
    for (let index = 0; index < skuSetting.length; index++) {
      const { startQty, endQty, type, upperLimitQty } = skuSetting[index];
      if (type === 5 && !upperLimitQty) {
        this.messageError("上限值不能为空");
        return;
      }
      if (startQty && endQty) {
        if (Number(endQty) <= Number(startQty)) {
          this.messageError("开始值需要小于结束值");
          return;
        }
      } else if (!startQty && !endQty) {
        this.messageError("开始值与结束值不能同时为空");
        return;
      }
    }
    const params = {
      priceSetting: priceSetting,
      skuSetting: skuSetting.map(item => {
        return {
          startQty: item.startQty || null,
          endQty: item.endQty || null,
          type: item.type,
          upperLimitQty: item.upperLimitQty || null
        };
      })
    } as SetupFormParams<SkuSettingModel>;
    setupService.updateSettings(params).then(() => {
      this.messageSuccess("保存成功");
      this.getSettings();
    });
  }

  protected messageSuccess(msg: string) {
    this.$message.success(msg);
  }
  protected messageError(msg: string) {
    this.$message.error(msg);
  }

  protected integerValidate(value: string) {
    value = value.replace(/[^\d]/g, "");
    return value;
  }

  created() {
    this.getSettings();
  }
}
</script>

<style lang="scss" scoped>
.setup-component {
  .ht-header {
    margin-bottom: 2px;
  }
  .after-title {
    .el-button {
      position: absolute;
      top: 5px;
      margin-left: 8px;
    }
  }
  .ht-main {
    .el-form {
      .main-left,
      .main-right {
        float: left;
        width: 50%;
        box-sizing: border-box;
      }
      .main-left {
        padding-right: 30px;
      }
      .main-right {
        padding-left: 30px;
      }
    }

    .divider {
      width: 100%;
      border-bottom: 1px solid #e5e5e5;
      margin-top: 14px;
    }

    .el-icon-error {
      color: #999999;
      cursor: pointer;
    }

    .el-form-item {
      width: 100%;
      .el-form-item__content {
        .el-select {
          width: 100%;
        }
      }
    }

    .row-select {
      display: flex;
      .el-select {
        flex: 1;
      }
      .el-input {
        width: 50px;
        ::v-deep .el-input__inner {
          padding: 0 10px;
        }
      }
    }
  }
}
</style>
