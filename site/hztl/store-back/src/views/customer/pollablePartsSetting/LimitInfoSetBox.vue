<template>
  <el-dialog
    v-bind="$attrs"
    v-on="$listeners"
    append-to-body
    title="设置限购信息"
    width="800px"
  >
    <div>
      <el-radio-group v-model="purchaseLimitType" style="text-align: left;">
        <div>
          <el-radio :label="0">不限购</el-radio>
        </div>

        <el-form
          v-if="showForm"
          ref="form"
          :model="formData"
          :rules="RULES"
          :show-message="false"
          inline
          label-position="left"
          label-width="10px"
          size="mini"
          style="margin-top: 5px; height: 40px;"
        >
          <el-radio :label="1" class="radio-content" style="margin-left: 0;">
            每天
          </el-radio>
          <el-form-item
            label=" "
            :prop="purchaseLimitType === 1 ? 'dayPurchaseLimitQty' : ''"
          >
            <el-input
              :disabled="purchaseLimitType !== 1"
              v-model="formData.dayPurchaseLimitQty"
              clearable
              size="small"
              type="number"
              class="input-item"
            >
              <template
                v-if="selectedRows && selectedRows.length === 1 && selectedRows[0].swUnitName"
                slot="append"
              >{{ selectedRows[0].swUnitName }}</template>
            </el-input>
          </el-form-item>

          <el-radio :label="2" class="radio-content">
            每月
          </el-radio>
          <el-form-item
            label=" "
            :prop="purchaseLimitType === 2 ? 'monthPurchaseLimitQty' : ''"
          >
            <el-input
              :disabled="purchaseLimitType !== 2"
              v-model="formData.monthPurchaseLimitQty"
              clearable
              size="small"
              type="number"
              class="input-item"
            >
              <template
                v-if="selectedRows && selectedRows.length === 1 && selectedRows[0].swUnitName"
                slot="append"
              >{{ selectedRows[0].swUnitName }}</template>
            </el-input>
          </el-form-item>

          <el-radio :label="3" class="radio-content">
            每年
          </el-radio>
          <el-form-item
            label=" "
            :prop="purchaseLimitType === 3 ? 'yearPurchaseLimitQty' : ''"
          >
            <el-input
              :disabled="purchaseLimitType !== 3"
              v-model="formData.yearPurchaseLimitQty"
              clearable
              size="small"
              type="number"
              class="input-item"
            >
              <template
                v-if="selectedRows && selectedRows.length === 1 && selectedRows[0].swUnitName"
                slot="append"
              >{{ selectedRows[0].swUnitName }}</template>
            </el-input>
          </el-form-item>
        </el-form>

        <div :span="24" style="margin-top: 10px;">
          <el-radio :label="4">
            自定义
          </el-radio>
        </div>
      </el-radio-group>

      <div v-if="showForm" class="customize-limit-container">
        <div class="add-container">
          <el-button
            :disabled="purchaseLimitType !== 4"
            circle
            size="mini"
            class="add-controls"
            @click="addlimitItem"
          >
            <div style="display: flex;">
              <div style="font-size: 22px;">+</div>
              <div style="margin: 5px 0 0 5px;font-size: 14px">添加</div>
            </div>
          </el-button>
        </div>

        <el-form
          v-for="(item, index) in purchaseLimitDetails"
          :key="index"
          :model="item"
          :rules="RULES"
          :show-message="false"
          inline
          label-position="left"
          label-width="80px"
          size="mini"
        >
          <el-form-item
            label="限购日期" 
            :prop="purchaseLimitType !== 4 ? '' : 'timeRange'"
          >
            <el-date-picker
              :disabled="purchaseLimitType !== 4"
              v-model="item.timeRange"
              :picker-options="PICKER_OPTIONS"
              type="datetimerange"
              size="small"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 360px;"
            />
          </el-form-item>
          <el-form-item
            label=" " 
            :prop="purchaseLimitType !== 4 ? '' : 'purchaseLimitQty'"
            label-width="5px"
          >
            <el-input
              :disabled="purchaseLimitType !== 4"
              v-model="item.purchaseLimitQty"
              clearable
              size="small"
              type="number"
              class="input-item"
            >
              <template
                v-if="selectedRows && selectedRows.length === 1 && selectedRows[0].swUnitName"
                slot="append"
              >{{ selectedRows[0].swUnitName }}</template>
            </el-input>
          </el-form-item>
          <el-tooltip
            :enterable="false"
            effect="dark"
            content="删除"
            placement="top"
          >
            <el-button
              :disabled="purchaseLimitType !== 4"
              circle
              size="mini"
              class="clear-controls"
              @click="clearlimitItem(index)"
            >
              <i class="icon-clear" />
            </el-button>
          </el-tooltip>
        </el-form>
      </div>
    </div>

    <div style="margin-top: 20px; text-align: center;">
      <el-button
        plain
        type="danger"
        size="small"
        @click="cancelHandle"
      >取消</el-button>
      <el-button
        plain
        type="primary"
        size="small"
        @click="saveHandle"
      >保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { PollablePartsSettingApi } from './services'
const pollablePartsSettingApi = new PollablePartsSettingApi();
import { PICKER_OPTIONS } from "./constants";

const RULES = {
  timeRange: [
    { required: true, message: "请选择限购日期" },
  ],
  purchaseLimitQty: [
    { required: true, message: "请输入自定义限购数" }
  ],
  dayPurchaseLimitQty: [
    { required: true, message: "请输入每天限购数" }
  ],
  monthPurchaseLimitQty: [
    { required: true, message: "请输入每月限购数" }
  ],
  yearPurchaseLimitQty: [
    { required: true, message: "请输入每年限购数" }
  ]
}
const defaultFormData = {
  dayPurchaseLimitQty: "",
  monthPurchaseLimitQty: "",
  yearPurchaseLimitQty: ""
}

export default {
  name: "LimitInfoSetBox",
  props: {
    searchData:{
      required: true
    },
    selectedRows: {
      type: Array,
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
      purchaseLimitType: 1,
      formData: { ...defaultFormData },
      purchaseLimitDetails: [],
      PICKER_OPTIONS,
      RULES,
      showForm: true
    };
  },
  watch: {
    "$attrs.visible"(val) {
      if (val) {
        if (this.selectedRows.length === 1) {
          this.purchaseLimitType = this.selectedRows[0].purchaseLimitType || 1;
          switch (this.purchaseLimitType) {
            case 1:
              this.formData = {
                ...defaultFormData,
                dayPurchaseLimitQty: this.selectedRows[0].purchaseLimitQty
              };
              break;
            case 2:
              this.formData = {
                ...defaultFormData,
                monthPurchaseLimitQty: this.selectedRows[0].purchaseLimitQty
              };
              break;
            case 3:
              this.formData = {
                ...defaultFormData,
                yearPurchaseLimitQty: this.selectedRows[0].purchaseLimitQty
              };
              break;
            default:
              break;
          }
          this.purchaseLimitDetails = this.selectedRows[0].purchaseLimitDetails
            && this.selectedRows[0].purchaseLimitDetails.length
              ? this.selectedRows[0].purchaseLimitDetails.map(item => ({
                  purchaseLimitQty: item.purchaseLimitQty,
                  timeRange: [item.startTime, item.endTime]
                }))
              : [];
        } else {
          this.formData = { ...defaultFormData };
          this.purchaseLimitType = 1;
          this.purchaseLimitDetails = [];
        }
        this.$nextTick(() => {
          this.$refs.form && this.$refs.form.clearValidate();
        });
      }
    },
    purchaseLimitType() {
      this.showForm = false;
      this.$nextTick(() => {
        this.showForm = true;
      })
    }
  },
  methods: {
    addlimitItem() {
      this.purchaseLimitDetails.unshift({ timeRange: [], purchaseLimitQty: "" });
    },
    clearlimitItem(itemIndex) {
      this.purchaseLimitDetails = this.purchaseLimitDetails.filter((item, index) =>
        itemIndex !== index
      );
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    },
    saveHandle() {
      if (this.purchaseLimitType == 4) {
        if (!this.validatePurchaseLimitDetails()) {
          return;
        }
      } else {
        if (!this.validateFormData()) {
          return;
        }
      }

      let purchaseLimitDetails = [];
      let purchaseLimitQty = undefined;
      switch (this.purchaseLimitType) {
        case 1:
          purchaseLimitQty = this.formData.dayPurchaseLimitQty;
          break;
        case 2:
          purchaseLimitQty = this.formData.monthPurchaseLimitQty;
          break;
        case 3:
          purchaseLimitQty = this.formData.yearPurchaseLimitQty;
          break;
        case 4:
          purchaseLimitDetails = this.purchaseLimitDetails.map(item =>
            ({
              purchaseLimitQty: item.purchaseLimitQty,
              startTime: item.timeRange[0],
              endTime: item.timeRange[1]
            })
          );
          break;
        default:
          break;
      }
      let params = {
        purchaseLimitType: this.purchaseLimitType,
        purchaseLimitQty: purchaseLimitQty,
        purchaseLimitDetails: purchaseLimitDetails.length ? purchaseLimitDetails : undefined,
        allSku: this.selectedRows.length ? false : true,
        skuIds: this.selectedRows.map(item => item.skuId),
        customerId: this.customerId,
        customerType: this.customerType,
        allSkuCond:this.searchData
      }
      pollablePartsSettingApi.customerUpsert(params).then(() =>{
        this.$message.success({ message: "保存成功!", showClose: true });
        this.$emit("success");
        this.cancelHandle();
      })
      .catch(res => {
        this.$message.error({ message: res, showClose: true });
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
    validatePurchaseLimitDetails() {
      let flag = true;
      if (!this.purchaseLimitDetails.length) {
        this.$message.warning({ message: "请添加自定义限购", showClose: true });
        flag = false;
      }
      if (
        flag &&
          this.purchaseLimitDetails.some(item =>
            !item.timeRange || item.timeRange.length !== 2)
      ) {
        this.$message.warning({
          message: this.RULES.timeRange[0].message,
          showClose: true
        });
        flag = false;
      }
      if (
        flag &&
          this.purchaseLimitDetails.some(item => !item.purchaseLimitQty)
      ) {
        this.$message.warning({
          message: this.RULES.purchaseLimitQty[0].message,
          showClose: true
        });
        flag = false;
      }
      return flag;
    }
  },
}
</script>

<style lang="less" scoped>
.input-item {
  width: 160px;
}
.radio-content {
  margin-right: 5px;
  margin-top: 10px;
  margin-left: 10px;
}
.customize-limit-container {
  margin-right: 12px;
  padding: 10px;
  height: 330px;
  overflow: auto;
  text-align: left;
  background-color: #f8f8f8;

  /deep/ .is-disabled {
    background-color: inherit !important;
  }
}
.add-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border: 1px dashed #d7d7d7;
  cursor: pointer;

  .add-controls {
    border: 0;
    border-radius: 0;
    background-color: inherit;
  }
}

.clear-controls {
  margin-top: 3px !important;
  padding: 0 !important;
  width: 26px !important;
  height: 26px !important;
  line-height: 26px !important;
  border: 0 !important;
  background-color: inherit !important;

  .icon-clear {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url('../../../assets/img/inquiry/icon-clear.png');
    background-repeat: no-repeat;
    background-size: 100%;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
