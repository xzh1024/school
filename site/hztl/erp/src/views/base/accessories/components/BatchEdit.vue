<template>
  <ht-dialog
    v-bind="$attrs"
    title="批量修改配件资料"
    width="1000px"
    top="7vh"
    class="dialog-body"
    v-on="$listeners"
    @closed="closeHandle"
  >
    <el-form
      ref="partsForm"
      :model="partsForm"
      :rules="rules"
      :show-message="false"
      size="mini"
      label-width="1px"
      class="form-item-small-margin-bottom"
    >
      <el-row :gutter="5" style="height: 530px;">
        <el-col :span="10" style="height: 100%;">
          <ht-card title="常用资料" style="height: 100%;">
            <div class="batch-item-box">
              <el-checkbox v-model="partsForm.name.flag">
                配件名称
              </el-checkbox>
              <el-form-item prop="name.value">
                <ht-autocomplete
                  v-model="partsForm.name.value"
                  :disabled="!partsForm.name.flag"
                  :fetch-suggestions="autocompleteSearchPartName"
                  :trigger-on-focus="false"
                  :maxlength="50"
                  placeholder="配件名称"
                  highlight-first-item
                />
              </el-form-item>
            </div>
            <div class="batch-item-box">
              <el-checkbox v-model="partsForm.vehModelsStr.flag">
                车型
              </el-checkbox>
              <el-form-item prop="vehModelsStr.value">
                <ht-autocomplete
                  v-model="partsForm.vehModelsStr.value"
                  :disabled="!partsForm.vehModelsStr.flag"
                  :fetch-suggestions="autocompleteSearchVehModel"
                  :trigger-on-focus="false"
                  placeholder="车型"
                  @change="onVehModelsStrChange"
                >
                  <div slot="append" @click.stop="eidtVehModels">
                    <span class="edit-veh-models">多车型</span>
                  </div>
                </ht-autocomplete>
              </el-form-item>
            </div>
            <div class="batch-item-box">
              <el-checkbox v-model="partsForm.avaVehModel.flag">
                适用车型
              </el-checkbox>
              <el-form-item prop="avaVehModel.value">
                <ht-input
                  v-model="partsForm.avaVehModel.value"
                  :disabled="!partsForm.avaVehModel.flag"
                  placeholder="适用车型"
                  maxlength="50"
                />
              </el-form-item>
            </div>
            <div class="batch-item-box">
              <el-checkbox v-model="partsForm.brand.flag">
                配件品牌
              </el-checkbox>
              <el-form-item prop="brand.value">
                <ht-autocomplete
                  v-model="partsForm.brand.value"
                  :disabled="!partsForm.brand.flag"
                  :fetch-suggestions="autocompleteSearchPartBrand"
                  :trigger-on-focus="false"
                  placeholder="配件品牌"
                  highlight-first-item
                />
              </el-form-item>
            </div>
            <div class="batch-item-box">
              <el-checkbox v-model="partsForm.productionPlace.flag">
                产地
              </el-checkbox>
              <el-form-item prop="productionPlace.value">
                <ht-autocomplete
                  v-model="partsForm.productionPlace.value"
                  :disabled="!partsForm.productionPlace.flag"
                  :fetch-suggestions="autocompleteSearchProductionPlace"
                  :trigger-on-focus="false"
                  class="switch-focus focus-production-place"
                  placeholder="产地"
                  highlight-first-item
                />
              </el-form-item>
            </div>
            <div class="batch-item-box">
              <el-checkbox v-model="partsForm.unit.flag">
                计量单位
              </el-checkbox>
              <el-form-item prop="unit.value">
                <ht-autoselect
                  v-model="partsForm.unit.value"
                  :disabled="!partsForm.unit.flag"
                  :trigger-on-focus="false"
                  :options="store().unitDictionary()"
                  placeholder="计量单位"
                  mnemonic
                  highlight-first-item
                />
              </el-form-item>
            </div>
            <div class="batch-item-box">
              <el-checkbox v-model="partsForm.model.flag">
                规格
              </el-checkbox>
              <el-form-item prop="model.value">
                <ht-input
                  v-model="partsForm.model.value"
                  :disabled="!partsForm.model.flag"
                  placeholder="规格"
                  maxlength="20"
                />
              </el-form-item>
            </div>
            <div class="batch-item-box">
              <el-checkbox v-model="partsForm.barCode.flag">
                条形码
              </el-checkbox>
              <el-form-item prop="barCode.value">
                <ht-input
                  v-model="partsForm.barCode.value"
                  :disabled="!partsForm.barCode.flag"
                  placeholder="条形码"
                  maxlength="50"
                />
              </el-form-item>
            </div>
            <div class="batch-item-box">
              <el-checkbox v-model="partsForm.posCode.flag">
                部位码
              </el-checkbox>
              <el-form-item prop="posCode.value">
                <ht-input
                  v-model="partsForm.posCode.value"
                  :disabled="!partsForm.posCode.flag"
                  placeholder="部位码"
                  maxlength="50"
                />
              </el-form-item>
            </div>
            <div class="batch-item-box">
              <el-checkbox v-model="partsForm.productionCode.flag">
                生产码
              </el-checkbox>
              <el-form-item prop="productionCode.value">
                <ht-input
                  v-model="partsForm.productionCode.value"
                  :disabled="!partsForm.productionCode.flag"
                  placeholder="生产码"
                  maxlength="50"
                />
              </el-form-item>
            </div>
            <div class="batch-item-box">
              <el-checkbox v-model="partsForm.engineNo.flag">
                发动机型号
              </el-checkbox>
              <el-form-item prop="engineNo.value">
                <ht-input
                  v-model="partsForm.engineNo.value"
                  :disabled="!partsForm.engineNo.flag"
                  placeholder="发动机型号"
                  maxlength="20"
                />
              </el-form-item>
            </div>
            <div class="batch-item-box">
              <el-checkbox v-model="partsForm.categoryName.flag">
                配件分类
              </el-checkbox>
              <el-form-item prop="categoryName.value">
                <ht-autocomplete
                  v-model="partsForm.categoryName.value"
                  :disabled="!partsForm.categoryName.flag"
                  :fetch-suggestions="autocompleteSearchCategory"
                  :trigger-on-focus="false"
                  highlight-first-item
                  placeholder="配件分类"
                />
              </el-form-item>
            </div>
            <div class="batch-item-box">
              <el-checkbox v-model="partsForm.stockTopLimit.flag">
                库存上限
              </el-checkbox>
              <el-form-item prop="stockTopLimit.value">
                <ht-input
                  v-model="partsForm.stockTopLimit.value"
                  :disabled="!partsForm.stockTopLimit.flag"
                  type="number"
                  placeholder="库存上限"
                  maxlength="5"
                />
              </el-form-item>
            </div>
            <div class="batch-item-box">
              <el-checkbox v-model="partsForm.stockLowerLimit.flag">
                库存下限
              </el-checkbox>
              <el-form-item prop="stockLowerLimit.value">
                <ht-input
                  v-model="partsForm.stockLowerLimit.value"
                  :disabled="!partsForm.stockLowerLimit.flag"
                  type="number"
                  placeholder="库存下限"
                  maxlength="5"
                />
              </el-form-item>
            </div>
            <div class="batch-item-box">
              <el-checkbox v-model="partsForm.minOrderQty.flag">
                起订量
              </el-checkbox>
              <el-form-item prop="minOrderQty.value">
                <ht-input
                  v-model.number="partsForm.minOrderQty.value"
                  :disabled="!partsForm.minOrderQty.flag"
                  type="number"
                  placeholder="起订量"
                />
              </el-form-item>
            </div>
          </ht-card>
        </el-col>

        <el-col :span="14" style="height: 100%;">
          <ht-card title="其他资料" style="height: 100%;">
            <el-row>
              <el-col :span="16">
                <div class="batch-item-box">
                  <el-checkbox v-model="partsForm.currency.flag">
                    正厂价币种
                  </el-checkbox>
                  <el-form-item prop="currency.value">
                    <ht-autoselect
                      v-model="partsForm.currency.value"
                      :disabled="!partsForm.currency.flag"
                      :trigger-on-focus="false"
                      :options="store().currencyDictionary()"
                      placeholder="正厂价币种"
                      mnemonic
                      highlight-first-item
                      @change="handleRate"
                    />
                  </el-form-item>
                </div>
                <div class="batch-item-box">
                  <el-checkbox v-model="partsForm.priceFactory.flag">
                    正厂价
                  </el-checkbox>
                  <el-form-item prop="priceFactory.value">
                    <ht-format-number
                      v-model="partsForm.priceFactory.value"
                      :disabled="!partsForm.priceFactory.flag"
                      :min="0"
                      placeholder="正厂价"
                      precision-type="price"
                      @blur="handlePriceFactory"
                    />
                  </el-form-item>
                </div>
                <div class="batch-item-box">
                  <el-checkbox disabled>
                    人民币价
                  </el-checkbox>
                  <el-form-item prop="priceFactory.value">
                    <ht-format-number
                      v-model="partsForm.priceRmb"
                      disabled
                      precision-type="price"
                      placeholder="人民币价"
                    />
                  </el-form-item>
                </div>
                <div class="batch-item-box">
                  <el-checkbox v-model="partsForm.dosagePerCar.flag">
                    每车用量
                  </el-checkbox>
                  <el-form-item prop="dosagePerCar.value">
                    <ht-input
                      v-model.number="partsForm.dosagePerCar.value"
                      :disabled="!partsForm.dosagePerCar.flag"
                      type="number"
                      placeholder="每车用量"
                      maxlength="5"
                    />
                  </el-form-item>
                </div>
                <div class="batch-item-box">
                  <el-checkbox v-model="partsForm.packingNum.flag">
                    包装数
                  </el-checkbox>
                  <el-form-item prop="packingNum.value">
                    <ht-input
                      v-model.number="partsForm.packingNum.value"
                      :disabled="!partsForm.packingNum.flag"
                      type="number"
                      placeholder="包装数"
                      maxlength="10"
                    />
                  </el-form-item>
                </div>
                <div class="batch-item-box">
                  <el-checkbox v-model="partsForm.insurCertType.flag">
                    保险认证分类
                  </el-checkbox>
                  <el-form-item prop="insurCertType.value">
                    <ht-autoselect
                      v-model="partsForm.insurCertType.value"
                      :disabled="!partsForm.insurCertType.flag"
                      :trigger-on-focus="false"
                      :options="store().insureCertTypeDictionary()"
                      placeholder="保险认证分类"
                      mnemonic
                      highlight-first-item
                    />
                  </el-form-item>
                </div>
                <div class="batch-item-box">
                  <el-checkbox v-model="partsForm.partType.flag">
                    配件类别
                  </el-checkbox>
                  <el-form-item prop="partType.value">
                    <ht-autoselect
                      v-model="partsForm.partType.value"
                      :disabled="!partsForm.partType.flag"
                      :trigger-on-focus="false"
                      :options="store().partTypeDictionary()"
                      placeholder="配件类别"
                      mnemonic
                      highlight-first-item
                    />
                  </el-form-item>
                </div>
                <div class="batch-item-box">
                  <el-checkbox v-model="partsForm.customCodesStr.flag">
                    图号
                  </el-checkbox>
                  <el-form-item prop="customCodesStr.value">
                    <ht-input
                      v-model="partsForm.customCodesStr.value"
                      :disabled="!partsForm.customCodesStr.flag"
                      readonly
                      placeholder="图号"
                    >
                      <template slot="append">
                        <el-tooltip
                          placement="top"
                          content="编辑"
                          :enterable="false"
                        >
                          <i
                            class="icon operation-icon icon-edit-info"
                            :style="
                              partsForm.customCodesStr.flag
                                ? ''
                                : 'cursor: not-allowed;'
                            "
                            @click.stop="eidtCustomCodes"
                          />
                        </el-tooltip>
                      </template>
                    </ht-input>
                  </el-form-item>
                </div>
                <div class="batch-item-box">
                  <el-checkbox v-model="partsForm.enName.flag">
                    英文名称
                  </el-checkbox>
                  <el-form-item prop="enName.value">
                    <ht-input
                      v-model="partsForm.enName.value"
                      :disabled="!partsForm.enName.flag"
                      placeholder="英文名称"
                      maxlength="50"
                    />
                  </el-form-item>
                </div>
                <div class="batch-item-box">
                  <el-checkbox v-model="partsForm.length.flag">
                    长度
                  </el-checkbox>
                  <el-form-item prop="length.value">
                    <ht-input
                      v-model="partsForm.length.value"
                      :disabled="!partsForm.length.flag"
                      placeholder="长度"
                      type="number"
                      maxlength="10"
                    >
                      <template slot="append">
                        cm
                      </template>
                    </ht-input>
                  </el-form-item>
                </div>
                <div class="batch-item-box">
                  <el-checkbox v-model="partsForm.width.flag">
                    宽度
                  </el-checkbox>
                  <el-form-item prop="width.value">
                    <ht-input
                      v-model="partsForm.width.value"
                      :disabled="!partsForm.width.flag"
                      placeholder="宽度"
                      type="number"
                      maxlength="10"
                    >
                      <template slot="append">
                        cm
                      </template>
                    </ht-input>
                  </el-form-item>
                </div>
                <div class="batch-item-box">
                  <el-checkbox v-model="partsForm.height.flag">
                    高度
                  </el-checkbox>
                  <el-form-item prop="height.value">
                    <ht-input
                      v-model="partsForm.height.value"
                      :disabled="!partsForm.height.flag"
                      placeholder="高度"
                      type="number"
                      maxlength="10"
                    >
                      <template slot="append">
                        cm
                      </template>
                    </ht-input>
                  </el-form-item>
                </div>
                <div class="batch-item-box">
                  <el-checkbox v-model="partsForm.weight.flag">
                    重量
                  </el-checkbox>
                  <el-form-item prop="weight.value">
                    <ht-input
                      v-model="partsForm.weight.value"
                      :disabled="!partsForm.weight.flag"
                      placeholder="重量"
                      type="number"
                      maxlength="10"
                    >
                      <template slot="append">
                        kg
                      </template>
                    </ht-input>
                  </el-form-item>
                </div>
                <div class="batch-item-box">
                  <el-checkbox v-model="partsForm.volume.flag">
                    体积
                  </el-checkbox>
                  <el-form-item prop="volume.value">
                    <ht-input
                      v-model="partsForm.volume.value"
                      :disabled="!partsForm.volume.flag"
                      placeholder="体积"
                      type="number"
                      maxlength="10"
                    >
                      <template slot="append">
                        m
                        <sup>3</sup>
                      </template>
                    </ht-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="batch-item-box">
                  <el-checkbox v-model="partsForm.isCollection.flag">
                    是否集采配件
                  </el-checkbox>
                  <el-form-item prop="isCollection.value">
                    <el-switch
                      v-model="partsForm.isCollection.value"
                      :disabled="!partsForm.isCollection.flag"
                    />
                  </el-form-item>
                </div>
                <div class="batch-item-box">
                  <el-checkbox v-model="partsForm.isPurchase.flag">
                    是否可采购
                  </el-checkbox>
                  <el-form-item prop="isPurchase.value">
                    <el-switch
                      v-model="partsForm.isPurchase.value"
                      :disabled="!partsForm.isPurchase.flag"
                    />
                  </el-form-item>
                </div>
                <div class="batch-item-box">
                  <el-checkbox v-model="partsForm.isSale.flag">
                    是否可销售
                  </el-checkbox>
                  <el-form-item prop="isSale.value">
                    <el-switch
                      v-model="partsForm.isSale.value"
                      :disabled="!partsForm.isSale.flag"
                    />
                  </el-form-item>
                </div>
                <div class="batch-item-box">
                  <el-checkbox v-model="partsForm.isAccessories.flag">
                    是否辅料
                  </el-checkbox>
                  <el-form-item prop="isAccessories.value">
                    <el-switch
                      v-model="partsForm.isAccessories.value"
                      :disabled="!partsForm.isAccessories.flag"
                    />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </ht-card>
        </el-col>
      </el-row>
      <div style="margin: 10px 0 5px 0; text-align: center;">
        <el-button type="primary" plain size="small" @click="sureHandle">
          确定（F3）
        </el-button>
        <el-button type="primary" plain size="small" @click="hideBox">
          取消（Esc）
        </el-button>
      </div>
    </el-form>

    <EidtVehModelBox
      :visible.sync="eidtVehModelBoxVisible"
      :vehModels="vehModels"
      @sure="handleEidtVehModelsSuccess"
    />
    <EidtCustomCodesBox
      :visible.sync="eidtCustomCodesBoxVisible"
      :customCodes="customCodes"
      @sure="handleEidtCustomCodesSuccess"
    />
  </ht-dialog>
</template>

<script>
import EidtVehModelBox from "@/components/EditPartInfo/EidtVehModelBox";
import EidtCustomCodesBox from "@/components/EditPartInfo/EidtCustomCodesBox";
import { searchMixin } from "@/mixins";
import { validateParseInt } from "@/utils/validate";
import * as store from "@/utils/store";

const defaultFormData = {
  vehModelsStr: {
    value: "",
    flag: false
  },
  avaVehModel: {
    value: "",
    flag: false
  },
  productionPlace: {
    value: "",
    flag: false
  },
  name: {
    value: "",
    flag: false
  },
  enName: {
    value: "",
    flag: false
  },
  brand: {
    value: null,
    flag: false
  },
  unit: {
    value: "",
    flag: false
  },
  // imageUrls: [],
  categoryName: {
    value: "",
    flag: false
  },
  isCollection: {
    value: false,
    flag: false
  },
  isPurchase: {
    value: false,
    flag: false
  },
  isSale: {
    value: false,
    flag: false
  },
  currency: {
    value: "",
    flag: false
  },
  posCode: {
    value: "",
    flag: false
  },
  length: {
    value: "",
    flag: false
  },
  height: {
    value: "",
    flag: false
  },
  volume: {
    value: "",
    flag: false
  },
  minOrderQty: {
    value: "",
    flag: false
  },
  stockTopLimit: {
    value: "",
    flag: false
  },
  model: {
    value: "",
    flag: false
  },
  productionCode: {
    value: "",
    flag: false
  },
  engineNo: {
    value: "",
    flag: false
  },
  barCode: {
    value: "",
    flag: false
  },
  width: {
    value: "",
    flag: false
  },
  weight: {
    value: "",
    flag: false
  },
  insurCertType: {
    value: "",
    flag: false
  },
  insureCertTypeList: {
    value: "",
    flag: false
  },
  dosagePerCar: {
    value: null,
    flag: false
  },
  stockLowerLimit: {
    value: "",
    flag: false
  },
  priceFactory: {
    value: "",
    flag: false
  },
  partType: {
    value: null,
    flag: false
  },
  priceRmb: undefined,
  packingNum: {
    value: null,
    flag: false
  },
  customCodesStr: {
    value: "",
    flag: false
  },
  isAccessories: {
    value: false,
    flag: false
  }
};
export default {
  name: "BatchEdit",
  components: {
    EidtVehModelBox,
    EidtCustomCodesBox
  },
  mixins: [searchMixin],
  data() {
    const validatorStockTopLimit = (rule, value, callback) => {
      if (this.partsForm.stockTopLimit.flag && value) {
        if (validateParseInt(value) && Number(value) > 0) {
          callback();
        } else {
          // 需要返回错误信息
          callback(new Error(rule.message));
          this.$message.warning({ message: rule.message, showClose: true });
        }
      } else {
        // 需要返回错误信息
        callback();
      }
    };
    const validatorStockLowerLimit = (rule, value, callback) => {
      if (this.partsForm.stockLowerLimit.flag && value) {
        if (
          this.partsForm.stockTopLimit.flag &&
          this.partsForm.stockTopLimit.value
        ) {
          if (
            validateParseInt(value) &&
            Number(value) <= Number(this.partsForm.stockTopLimit.value)
          ) {
            callback();
          } else {
            // 需要返回错误信息
            callback(new Error(rule.message));
            this.$message.warning({ message: rule.message, showClose: true });
          }
        } else {
          callback();
        }
      } else {
        // 需要返回错误信息
        callback();
      }
    };
    const validatorDosagePerCar = (rule, value, callback) => {
      if (this.partsForm.dosagePerCar.flag && (value || value === 0)) {
        if (validateParseInt(value) && Number(value) > 0) {
          callback();
        } else {
          // 需要返回错误信息
          callback(new Error(rule.message));
          this.$message.warning({ message: rule.message, showClose: true });
        }
      } else {
        // 需要返回错误信息
        callback();
      }
    };
    const validatorPackingNum = (rule, value, callback) => {
      if (this.partsForm.packingNum.flag && (value || value === 0)) {
        if (validateParseInt(value) && Number(value) > 0) {
          callback();
        } else {
          // 需要返回错误信息
          callback(new Error(rule.message));
          this.$message.warning({ message: rule.message, showClose: true });
        }
      } else {
        // 需要返回错误信息
        callback();
      }
    };
    const validatorMinOrderQtyNum = (rule, value, callback) => {
      if (this.partsForm.minOrderQty.flag && (value || value === 0)) {
        if (validateParseInt(value) && Number(value) > 0) {
          callback();
        } else {
          // 需要返回错误信息
          callback(new Error(rule.message));
          this.$message.warning({ message: rule.message, showClose: true });
        }
      } else {
        // 需要返回错误信息
        callback();
      }
    };

    return {
      partsForm: {
        ...defaultFormData
      },
      flagForm: {},
      tax: 1,
      eidtCustomCodesBoxVisible: false,
      customCodes: [],
      eidtVehModelBoxVisible: false,
      vehModels: [],
      rules: {
        "stockLowerLimit.value": [
          {
            validator: validatorStockLowerLimit,
            message: "库存下限需为整数且不能超过库存上限",
            trigger: "change"
          }
        ],
        "stockTopLimit.value": [
          {
            validator: validatorStockTopLimit,
            message: "库存上限需为整数且不能为0",
            trigger: "change"
          }
        ],
        "dosagePerCar.value": [
          {
            validator: validatorDosagePerCar,
            trigger: "change",
            message: "每车用量需为整数且不能为0"
          }
        ],
        "packingNum.value": [
          {
            validator: validatorPackingNum,
            trigger: "change",
            message: "包装数需为整数且不能为0"
          }
        ],
        "minOrderQty.value": [
          {
            validator: validatorMinOrderQtyNum,
            trigger: "change",
            message: "起订量需为整数且不能为0"
          }
        ]
      }
    };
  },
  methods: {
    store() {
      return store;
    },
    sureHandle() {
      this.$refs["partsForm"].validate((valid, err) => {
        if (valid) {
          const params = {};
          Object.keys(this.partsForm).forEach(key => {
            if (typeof this.partsForm[key] === "object") {
              if (this.partsForm[key].flag) {
                params[key] = this.partsForm[key].value;
              }
            } else {
              params[key] = this.partsForm[key];
            }
          });
          this.handlePriceFactory();
          const formData = {
            ...this.filterParamsInt(params),
            vehModels: this.vehModels.length ? this.vehModels : undefined,
            customCodes: this.customCodes.length ? this.customCodes : undefined,
            vehModelsStr: undefined,
            customCodesStr: undefined
          };
          if (!this.partsForm.vehModelsStr.flag) {
            formData.vehModels = undefined;
          }
          if (!this.partsForm.customCodesStr.flag) {
            formData.customCodes = undefined;
          }
          const submitData = {};
          for (const k in formData) {
            if (formData[k] != undefined) {
              submitData[k] = formData[k];
            }
          }
          if (JSON.stringify(submitData) == "{}") {
            this.$message("请至少选择一项修改", { type: "warning" });
            return;
          }
          this.$emit("handleSubmit", submitData);
          this.hideBox();
        } else if (err) {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({
            message: errTips,
            showClose: true
          });
        }
      });
    },
    filterParamsInt(obj) {
      const formatData = {};
      for (const key in obj) {
        if (["minOrderQty", "dosagePerCar", "packingNum"].includes(key)) {
          formatData[key] = obj[key] === "" ? null : obj[key];
        } else {
          formatData[key] = obj[key];
        }
      }
      return formatData;
    },
    closeHandle() {
      this.$refs["partsForm"].resetFields();
      Object.keys(this.partsForm).forEach(key => {
        if (typeof this.partsForm[key] === "object") {
          if (this.partsForm[key].flag) {
            this.partsForm[key].flag = false;
          }
        }
      });
    },
    hideBox() {
      this.$emit("update:visible", false);
    },
    handleRate(value) {
      if (!value) return;
      const _item = store.currencyDictionary().find(item => item.id === value);
      this.tax = _item.specialValue;
      if (this.partsForm.priceFactory.value) {
        this.partsForm.priceRmb = String(
          parseFloat(
            (this.partsForm.priceFactory.value * this.tax).toPrecision(12)
          )
        );
      } else {
        this.partsForm.priceRmb = undefined;
      }
    },
    handlePriceFactory() {
      if (this.partsForm.currency.value) {
        this.partsForm.priceRmb = String(
          parseFloat(
            (this.partsForm.priceFactory.value * this.tax).toPrecision(12)
          )
        );
      } else {
        this.partsForm.priceRmb = undefined;
      }
    },
    eidtCustomCodes() {
      if (!this.partsForm.customCodesStr.flag) {
        return;
      }
      this.eidtCustomCodesBoxVisible = true;
    },
    handleEidtCustomCodesSuccess(val) {
      this.customCodes = val;
      this.partsForm.customCodesStr.value =
        val && val.length ? val.join("，") : "";
    },
    onVehModelsStrChange(val) {
      this.vehModels[0] = val;
    },
    eidtVehModels() {
      if (!this.partsForm.vehModelsStr.flag) {
        return;
      }
      this.eidtVehModelBoxVisible = true;
    },
    handleEidtVehModelsSuccess(val) {
      this.vehModels = val;
      this.partsForm.vehModelsStr.value = val && val.length ? val[0] : "";
    }
  }
};
</script>
<style lang="scss" scoped>
.dialog-body {
  &::v-deep .el-dialog__body {
    padding: 5px;
    background-color: #e7ebed;
  }

  .el-autocomplete {
    ::v-deep .el-input:not(.is-disabled) .edit-veh-models {
      cursor: pointer;
    }
    ::v-deep .is-disabled .edit-veh-models {
      cursor: not-allowed;
    }
  }
}
.batch-item-box {
  display: flex;
  padding-left: 20px;

  .el-checkbox {
    margin-right: 0;
    min-width: 110px;
    padding-top: 6px;
  }

  .el-form-item {
    flex: auto;
  }
}
</style>
