<template>
  <ht-dialog
    :title="partId ? '编辑配件' : '新增配件'"
    v-bind="$attrs"
    class="dialog-body"
    width="1200px"
    top="7vh"
    v-on="$listeners"
  >
    <section class="container-box">
      <el-form
        ref="partForm"
        :model="formData"
        :rules="rules"
        :show-message="false"
        class="form-item-small-margin-bottom"
        size="mini"
        label-width="90px"
      >
        <el-row :gutter="5" style="height: 595px;">
          <el-col :span="8" style="height: 100%;">
            <ht-card title="常用资料" style="height: 100%;">
              <el-form-item label="配件编码" prop="code">
                <div class="flex-container">
                  <ht-input
                    v-if="$attrs.visible"
                    v-delay-focus="$attrs.visible"
                    v-model="formData.code"
                    placeholder="配件编码"
                    maxlength="50"
                    class="auto-block"
                  />
                  <el-button
                    type="primary"
                    size="mini"
                    @click.stop="epcVisible = true"
                    :disabled="formData.code.length < 6"
                  >
                    EPC查询
                  </el-button>
                </div>
              </el-form-item>
              <el-form-item prop="name" label="配件名称">
                <ht-autocomplete
                  v-model="formData.name"
                  :fetch-suggestions="autocompleteSearchPartName"
                  :trigger-on-focus="false"
                  placeholder="配件名称"
                  highlight-first-item
                />
              </el-form-item>
              <el-form-item label="车型" prop="vehModelsStr">
                <ht-autocomplete
                  v-model="formData.vehModelsStr"
                  :fetch-suggestions="autocompleteSearchVehModel"
                  :trigger-on-focus="false"
                  highlight-first-item
                  placeholder="车型"
                  @change="onVehModelsStrChange"
                >
                  <div slot="append" @click.stop="eidtVehModels">
                    <span class="edit-veh-models">多车型</span>
                  </div>
                </ht-autocomplete>
              </el-form-item>
              <el-form-item label="适用车型" prop="avaVehModel">
                <ht-input
                  v-model="formData.avaVehModel"
                  placeholder="除标准适配车型外，可适配的车型。"
                  maxlength="1000"
                />
              </el-form-item>
              <el-form-item label="配件品牌" prop="brand">
                <ht-autocomplete
                  v-model="formData.brand"
                  :fetch-suggestions="autocompleteSearchPartBrand"
                  :trigger-on-focus="false"
                  placeholder="配件品牌"
                  highlight-first-item
                />
              </el-form-item>
              <el-form-item prop="productionPlace" label="产地">
                <ht-autocomplete
                  v-model="formData.productionPlace"
                  :fetch-suggestions="autocompleteSearchProductionPlace"
                  :trigger-on-focus="false"
                  placeholder="产地"
                  highlight-first-item
                />
              </el-form-item>
              <el-form-item prop="unit" label="计量单位">
                <ht-autoselect
                  v-model="formData.unit"
                  :trigger-on-focus="false"
                  :options="store().unitDictionary()"
                  placeholder="计量单位"
                  mnemonic
                  highlight-first-item
                />
              </el-form-item>
              <el-form-item label="规格" prop="model">
                <ht-input
                  v-model="formData.model"
                  placeholder="规格"
                  maxlength="20"
                />
              </el-form-item>
              <el-form-item label="条形码" prop="barCode">
                <ht-input
                  v-model="formData.barCode"
                  placeholder="条形码"
                  maxlength="50"
                />
              </el-form-item>
              <el-form-item label="部位码" prop="posCode">
                <ht-input
                  v-model="formData.posCode"
                  placeholder="部位码"
                  maxlength="50"
                />
              </el-form-item>
              <el-form-item label="生产码" prop="productionCode">
                <ht-input
                  v-model="formData.productionCode"
                  placeholder="生产码"
                  maxlength="50"
                />
              </el-form-item>
              <el-form-item label="发动机型号" prop="engineNo">
                <ht-input
                  v-model="formData.engineNo"
                  placeholder="发动机型号"
                  maxlength="20"
                />
              </el-form-item>
              <el-form-item prop="categoryName" label="配件分类">
                <ht-autocomplete
                  v-model="formData.categoryName"
                  :fetch-suggestions="autocompleteSearchCategory"
                  :trigger-on-focus="false"
                  highlight-first-item
                  placeholder="配件分类"
                />
              </el-form-item>
              <el-form-item label="库存上限" prop="stockTopLimit">
                <ht-input
                  v-model="formData.stockTopLimit"
                  type="number"
                  maxlength="5"
                  placeholder="库存上限"
                />
              </el-form-item>
              <el-form-item label="库存下限" prop="stockLowerLimit">
                <ht-input
                  v-model="formData.stockLowerLimit"
                  type="number"
                  maxlength="5"
                  placeholder="库存下限"
                />
              </el-form-item>
              <el-form-item label="起订量" prop="minOrderQty">
                <ht-input
                  v-model.number="formData.minOrderQty"
                  type="number"
                  placeholder="起订量"
                />
              </el-form-item>
              <el-form-item label="配件备注" prop="remark">
                <ht-input v-model="formData.remark" placeholder="配件备注" />
              </el-form-item>
            </ht-card>
          </el-col>
          <el-col :span="8" style="height: 100%;">
            <ht-card title="其他资料" style="height: 100%;">
              <el-form-item prop="currency" label="正厂价币种">
                <ht-autoselect
                  v-model="formData.currency"
                  :trigger-on-focus="false"
                  :options="store().currencyDictionary()"
                  placeholder="正厂价币种"
                  mnemonic
                  highlight-first-item
                  @change="handleRate"
                />
              </el-form-item>
              <el-form-item label="正厂价" prop="priceFactory">
                <ht-format-number
                  v-model="formData.priceFactory"
                  :min="0"
                  placeholder="正厂价"
                  precision-type="price"
                  @blur="handlePriceFactory"
                />
              </el-form-item>
              <el-form-item label="人民币价" prop="priceRmb">
                <ht-format-number
                  v-model="formData.priceRmb"
                  disabled
                  precision-type="price"
                  placeholder="人民币价"
                />
              </el-form-item>
              <el-form-item label="包装数" prop="packingNum">
                <ht-input
                  v-model.number="formData.packingNum"
                  type="number"
                  placeholder="包装数"
                  maxlength="10"
                />
              </el-form-item>
              <el-form-item label="每车用量" prop="dosagePerCar">
                <ht-input
                  v-model.number="formData.dosagePerCar"
                  type="number"
                  placeholder="每车用量"
                  maxlength="5"
                />
              </el-form-item>
              <el-form-item prop="insurCertType" label="保险认证分类">
                <ht-autoselect
                  v-model="formData.insurCertType"
                  :trigger-on-focus="false"
                  :options="store().insureCertTypeDictionary()"
                  placeholder="保险认证分类"
                  mnemonic
                  highlight-first-item
                />
              </el-form-item>
              <el-form-item prop="partType" label="配件类别">
                <ht-autoselect
                  v-model="formData.partType"
                  :trigger-on-focus="false"
                  :options="store().partTypeDictionary()"
                  placeholder="配件类别"
                  mnemonic
                  highlight-first-item
                />
              </el-form-item>
              <el-form-item label="图号" prop="customCodesStr">
                <ht-input
                  v-model="formData.customCodesStr"
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
                        @click.stop="eidtCustomCodes"
                      />
                    </el-tooltip>
                  </template>
                </ht-input>
              </el-form-item>
              <el-form-item label="特征码" prop="featureCode">
                <ht-input
                  v-model="formData.featureCode"
                  placeholder="特征码"
                  maxlength="50"
                />
              </el-form-item>
              <el-form-item label="英文名称" prop="enName">
                <ht-input
                  v-model="formData.enName"
                  placeholder="英文名称"
                  maxlength="50"
                />
              </el-form-item>
              <el-form-item label="长度" prop="length">
                <ht-input
                  v-model="formData.length"
                  placeholder="长度"
                  type="number"
                  maxlength="10"
                >
                  <template slot="append">
                    cm
                  </template>
                </ht-input>
              </el-form-item>
              <el-form-item label="宽度" prop="width">
                <ht-input
                  v-model="formData.width"
                  placeholder="宽度"
                  type="number"
                  maxlength="10"
                >
                  <template slot="append">
                    cm
                  </template>
                </ht-input>
              </el-form-item>
              <el-form-item label="高度" prop="height">
                <ht-input
                  v-model="formData.height"
                  placeholder="高度"
                  type="number"
                  maxlength="10"
                >
                  <template slot="append">
                    cm
                  </template>
                </ht-input>
              </el-form-item>
              <el-form-item label="重量" prop="weight">
                <ht-input
                  v-model="formData.weight"
                  placeholder="重量"
                  type="number"
                  maxlength="10"
                >
                  <template slot="append">
                    kg
                  </template>
                </ht-input>
              </el-form-item>
              <el-form-item label="体积" prop="volume">
                <ht-input
                  v-model="formData.volume"
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
              <el-row>
                <el-col :span="8">
                  <el-form-item label="是否集采配件" prop="isCollection">
                    <el-switch v-model="formData.isCollection" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否可采购" prop="isPurchase">
                    <el-switch v-model="formData.isPurchase" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否可销售" prop="isSale">
                    <el-switch v-model="formData.isSale" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="是否辅料" prop="isAccessories">
                    <el-switch v-model="formData.isAccessories" />
                  </el-form-item>
                </el-col>
              </el-row>
            </ht-card>
          </el-col>
          <el-col :span="8" style="height: 100%;">
            <ht-card
              title="配件图片"
              class="imglist-wrap"
              style="height: 100%;"
            >
              <p style="color: #606266; font-size: 14px; padding-left: 4px;">
                配件图片(支持jpg、png格式,每张不能大于2MB,最多10张)
              </p>
              <el-form-item label-width="0px">
                <sr-img-upload
                  :file-list="fileList"
                  :limit="10"
                  type="shard"
                  @get-file-list="getFileList"
                />
              </el-form-item>
            </ht-card>
          </el-col>
        </el-row>
        <div style="margin: 10px 0 5px 0; text-align: center;">
          <el-button
            :loading="submitLoading"
            type="primary"
            plain
            size="mini"
            @click.stop="submitForm"
          >
            确定（F3）
          </el-button>
          <el-button
            type="primary"
            plain
            size="mini"
            @click.stop="cancelHandle"
          >
            取消（Esc）
          </el-button>
        </div>
      </el-form>
    </section>

    <EpcSearchBycode
      :visible.sync="epcVisible"
      :code="formData.code"
      :controls="[controlsEnum.useData, controlsEnum.view]"
      @selectedChange="syncEpcData"
    />
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
import SrImgUpload from "@/components/base/SrImgUpload"; // 配件导入图片
import EpcSearchBycode, { controlsEnum } from "@/components/epc-search-by-code";
import EidtVehModelBox from "./EidtVehModelBox";
import EidtCustomCodesBox from "./EidtCustomCodesBox";
import { reqPartsDetails, reqPartsUpdate } from "@/api/parts";
import { searchMixin } from "@/mixins";
import { mapActions } from "vuex";
import { validateParseInt } from "@/utils/validate";
import * as store from "@/utils/store";

const defaultFormData = {
  code: "",
  vehModelsStr: "",
  avaVehModel: "",
  productionPlace: "",
  name: "",
  featureCode: "",
  enName: "",
  brand: null,
  unit: "",
  imageUrls: [],
  categoryName: "",
  priceRmb: "",
  isCollection: false,
  isPurchase: true,
  isSale: true,
  isAccessories: false,
  currency: "",
  posCode: "",
  length: "",
  height: "",
  volume: "",
  minOrderQty: null,
  stockTopLimit: "",
  model: "",
  productionCode: "",
  engineNo: "",
  barCode: "",
  width: "",
  weight: "",
  insureCertTypeList: "",
  dosagePerCar: null,
  stockLowerLimit: "",
  priceFactory: "",
  partType: null,
  remark: "",
  packingNum: null,
  customCodesStr: ""
};

export default {
  name: "EditPartInfo",
  components: {
    SrImgUpload,
    EpcSearchBycode,
    EidtVehModelBox,
    EidtCustomCodesBox
  },
  mixins: [searchMixin],
  props: {
    // eslint-disable-next-line vue/require-prop-types
    partId: {
      default: null
    }
  },
  data() {
    const validatorStockTopLimit = (rule, value, callback) => {
      if (value) {
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
      if (value) {
        if (this.formData.stockTopLimit) {
          if (
            validateParseInt(value) &&
            Number(value) <= Number(this.formData.stockTopLimit)
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
    const validatorIntZero = (rule, value, callback) => {
      if (value || value === 0) {
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
      epcVisible: false,
      controlsEnum,
      fileList: [],
      formData: {
        ...defaultFormData
      },
      submitLoading: false,
      rules: {
        code: [
          {
            required: true,
            message: "请输入配件编码",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入配件名称",
            trigger: "change"
          }
        ],
        stockLowerLimit: [
          {
            validator: validatorStockLowerLimit,
            message: "库存下限需为整数且不能超过库存上限",
            trigger: "change"
          }
        ],
        stockTopLimit: [
          {
            validator: validatorStockTopLimit,
            message: "库存上限需为整数且不能为0",
            trigger: "change"
          }
        ],
        // posCode: [{ validator: validatorLn, trigger: "change" }],
        // productionCode: [{ validator: validatorLn, trigger: "change" }],
        // engineNo: [{ validator: validatorLn, trigger: "change" }],
        // barCode: [{ validator: validatorLn, trigger: "change" }],
        dosagePerCar: [
          {
            validator: validatorIntZero,
            trigger: "change",
            message: "每车用量需为整数且不能为0"
          }
        ],
        packingNum: [
          {
            validator: validatorIntZero,
            trigger: "change",
            message: "包装数需为整数且不能为0"
          }
        ],
        minOrderQty: [
          {
            validator: validatorIntZero,
            trigger: "change",
            message: "起订量需为整数且不能为0"
          }
        ]
      },
      tax: 1,
      eidtCustomCodesBoxVisible: false,
      customCodes: [],
      eidtVehModelBoxVisible: false,
      vehModels: []
    };
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          this.resetForm();
          this.fileList = [];
          this.loadData();
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions("admin/units", ["resetPartTabs"]),
    store() {
      return store;
    },
    syncEpcData(data) {
      this.formData = {
        ...this.formData,
        code: data.code || this.formData.code,
        name: data.name || data.stdName || this.formData.name,
        brand: data.brand || this.formData.brand,
        priceFactory: data.price || this.formData.priceFactory,
        avaVehModel: data.avaVehModel || this.formData.avaVehModel,
        remark: data.comment || this.formData.remark
      };
      if (!Number(this.formData.stockTopLimit || 0)) {
        this.formData.stockTopLimit = "";
      }
      if (!Number(this.formData.dosagePerCar || 0)) {
        this.formData.dosagePerCar = null;
      }
      if (!Number(this.formData.minOrderQty || 0)) {
        this.formData.minOrderQty = null;
      }
    },
    loadData() {
      if (this.partId) {
        this.formData.id = this.partId;
        reqPartsDetails(this.partId).then(res => {
          this.formData = {
            ...res,
            vehModelsStr:
              res.vehModels && res.vehModels.length ? res.vehModels[0] : "",
            customCodesStr:
              res.customCodes && res.customCodes.length
                ? res.customCodes.join("，")
                : ""
          };
          if (!Number(this.formData.stockTopLimit || 0)) {
            this.formData.stockTopLimit = "";
          }
          if (!Number(this.formData.dosagePerCar || 0)) {
            this.formData.dosagePerCar = null;
          }
          if (!Number(this.formData.minOrderQty || 0)) {
            this.formData.minOrderQty = null;
          }

          this.vehModels = res.vehModels || [];
          this.customCodes = res.customCodes || [];
          this.fileList = res.imageUrls.map(url => ({
            url: url,
            origin: url
          }));
        });
      } else {
        this.formData = {
          ...defaultFormData
        };
        this.vehModels = [];
        this.customCodes = [];
        this.fileList = [];
        this.$nextTick(() => {
          this.$refs["partForm"] && this.$refs["partForm"].clearValidate();
        });
      }
    },
    getFileList(fileList) {
      this.fileList = fileList;
    },
    submitForm() {
      if (this.hasAutoPerm("create") || this.hasAutoPerm("update")) {
        this.$refs["partForm"].validate((valid, err) => {
          if (valid) {
            this.submitHandle();
          } else {
            const errTips = err[Object.keys(err)[0]][0].message;
            this.$message.warning({
              message: errTips,
              showClose: true
            });
          }
        });
      }
    },
    submitHandle() {
      this.submitLoading = true;
      this.formData.imageUrls = [];
      this.fileList.forEach(item => {
        this.formData.imageUrls.push(item.origin);
      });
      reqPartsUpdate({
        ...this.filterParamsInt(this.formData),
        vehModels: this.vehModels,
        customCodes: this.customCodes,
        vehModelsStr: undefined,
        customCodesStr: undefined
      })
        .then(data => {
          this.$refs["partForm"].resetFields();
          this.fileList = [];
          this.submitLoading = false;
          if (this.partId) {
            this.$message.success({ message: "配件信息保存成功" });
            this.$emit("initLoadList");
          } else {
            this.$emit("update:partId", null);
            this.formData.id = null;
            this.$message.success({ message: "新增配件成功" });
            this.resetPartTabs("all");
            this.$emit("initLoadList", data.id);
          }
          // 刷新字典中的车型
          this.cancelHandle();
        })
        .catch(() => {
          this.submitLoading = false;
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
    handleRate(value) {
      if (!value) return;
      const _item = store.currencyDictionary().find(item => item.id === value);
      this.tax = _item.specialValue;
      if (this.formData.priceFactory) {
        this.formData.priceRmb = String(
          parseFloat((this.formData.priceFactory * this.tax).toPrecision(12))
        );
      }
    },
    handlePriceFactory() {
      if (this.formData.currency) {
        this.formData.priceRmb = String(
          parseFloat((this.formData.priceFactory * this.tax).toPrecision(12))
        );
      }
    },
    cancelHandle() {
      this.resetForm();
      this.$emit("update:visible", false);
    },
    resetForm() {
      this.$refs["partForm"] && this.$refs["partForm"].resetFields();
    },
    eidtCustomCodes() {
      this.eidtCustomCodesBoxVisible = true;
    },
    handleEidtCustomCodesSuccess(val) {
      this.customCodes = val;
      this.formData.customCodesStr = val && val.length ? val.join("，") : "";
    },
    onVehModelsStrChange(val) {
      this.vehModels[0] = val;
    },
    eidtVehModels() {
      this.eidtVehModelBoxVisible = true;
    },
    handleEidtVehModelsSuccess(val) {
      this.vehModels = val;
      this.formData.vehModelsStr = val && val.length ? val[0] : "";
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

  .edit-veh-models {
    cursor: pointer;
  }
}
.imglist-wrap {
  ::v-deep .el-card__body {
    height: calc(100% - 37px);
    overflow-y: auto;
  }
}
</style>
