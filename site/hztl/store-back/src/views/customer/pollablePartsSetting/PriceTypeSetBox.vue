<template>
  <el-dialog
    v-bind="$attrs"
    v-on="$listeners"
    append-to-body
    title="设置享受价格类型"
    width="500px"
  >
    <div style="text-align: center;">
      <el-form
        v-if="showForm"
        ref="form"
        :model="formData"
        :rules="RULES"
        :show-message="false"
        label-position="left"
        size="mini"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item
              label="享受价格类型" 
              :prop="formData.useDefault ? '' : 'priceType'"
              label-width="107px"
            >
              <el-select :disabled="formData.useDefault" v-model="formData.priceType" clearable>
                <el-option
                  v-for="(item, index) in priceTypes"
                  :key="index"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="享受折扣率"
              :prop="formData.useDefault ? '' : 'discount'"
              label-width="93px"
            >
              <el-input
                :disabled="formData.useDefault"
                v-model="formData.discount"
                :min="0"
                :max="1"
                type="number"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="" label-width="0">
              <el-checkbox v-model="formData.useDefault">
                使用默认价格类型【{{ PRICE_TYPES[customerData.priceType] }}】和折扣率【{{ customerData.discount }}】
              </el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div style="margin-top: 20px; text-align: center;">
      <el-button
        plain
        type="danger"
        size="mini"
        @click="cancelHandle"
      >取消</el-button>
      <el-button
        plain
        type="primary"
        size="mini"
        @click="saveHandle"
      >保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { PollablePartsSettingApi } from './services'
const pollablePartsSettingApi = new PollablePartsSettingApi();
import store from "./store";
import { PRICE_TYPES } from "./constants";

const validDiscount = (rule, value, callback) => {
  const msg = "享受折扣率需大于0且小于等于1"
  if (Number(value) < 0 || Number(value) > 1) {
    callback(new Error(msg));
  } else if (!Number(value || 0)) {
    if ([0, "0"].includes(value)) {
      callback(new Error(msg));
    } else {
      callback(new Error(rule.message));
    }
  }
};
const RULES = {
  priceType: [
    { required: true, message: "请选择享受价格类型" },
  ],
  discount: [
    { required: true, message: "请输入享受折扣率" },
    { validator: validDiscount }
  ]
};
const defaultFormData = {
  priceType: "",
  discount: "",
  useDefault: true
}

export default {
  name: "PriceTypeSetBox",
  store,
  props: {
    searchData:{
      required: true
    },
    selectedRows: {
      type: Array,
      required: true
    },
    customerSetId: {
      required: true
    },
    customerType: {
      required: true
    },
    customerId: {
      required: true
    }
  },
  data() {
    return {
      RULES,
      PRICE_TYPES,
      formData: { ...defaultFormData },
      customerData: {},
      showForm: true
    };
  },
  computed: {
    ...mapState(["priceTypes"])
  },
  watch: {
    "$attrs.visible"(val) {
      if (val) {
        this.formData = this.selectedRows.length === 1
          ? {
              priceType: this.selectedRows[0].priceType,
              discount: this.selectedRows[0].discount,
              useDefault: this.selectedRows[0].useDefault
            }
          : { ...defaultFormData };
        this.$nextTick(() => {
          this.$refs.form && this.$refs.form.clearValidate();
        });
      }
    },
    "formData.useDefault"() {
      this.showForm = false;
      this.$nextTick(() => {
        this.showForm = true;
      })
    }
  },
  mounted() {
    this.getCustomerSetting();
  },
  methods: {
    getCustomerSetting() {
      //获取用户设置/customers/sets/id
      let params = {
        customerSetId:this.customerSetId
      }
      pollablePartsSettingApi.getCustomerSetting(params)
        .then(res => {
          if (res) {
            this.customerData = res || {};
          } 
        }).catch(err =>{
          this.$message.error({ message: err, showClose: true });
        })
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    },
    saveHandle() {
      if (!this.validateFormData()) {
        return;
      }
      // post(
      //   "/company-skus/customer-settings/upsert",
      //   {
      //     price: this.formData.useDefault
      //       ? { useDefault: this.formData.useDefault }
      //       : this.formData,
      //     skuIds: this.selectedRows.map(item => item.skuId),
      //     customerId: this.customerId,
      //     customerType: this.customerType
      //   }
      // )
      //   .then(() => {
      let params = {
        price: this.formData.useDefault
          ? { useDefault: this.formData.useDefault }
          : this.formData,
        allSku: this.selectedRows.length ? false : true,
        skuIds: this.selectedRows.map(item => item.skuId),
        customerId: this.customerId,
        customerType: this.customerType,
        allSkuCond:this.searchData
      }
      pollablePartsSettingApi.customerUpsert(params).then(res =>{
        this.$message.success({ message: "保存成功!" });
        this.$emit("success");
        this.cancelHandle();
      })
      .catch(res => {
        this.$message.error({ message: res.message, showClose: true });
      })
    },
    validateFormData() {
      let flag = true;
      this.$refs.form.validate((valid, err) => {
        if (!valid) {
          flag = false;
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
      return flag;
    },
  },
}
</script>