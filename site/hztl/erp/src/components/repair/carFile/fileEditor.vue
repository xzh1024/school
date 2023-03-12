<template>
  <div>
    <ht-dialog
      v-bind="$attrs"
      append-to-body
      :title="title"
      width="1250px"
      class="dialog-wrap"
      v-on="$listeners"
    >
      <div class="form-wrap">
        <el-form
          ref="fileForm"
          :rules="localRules"
          :model="form"
          size="mini"
          label-position="left"
          :show-message="false"
          label-width="115px"
        >
          <!-- 客户信息 -->
          <ht-card padding style="background: #fff;">
            <div class="no-padding-wrap">
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    label="车辆所属客户"
                    prop="cooperatorId"
                    class="handleRed"
                  >
                    <CooperatorsSelect
                      v-if="showCooperator"
                      v-model="form.cooperatorId"
                      :clearable="false"
                      :disabled="isAddFile || disableCusAndPlate"
                      :default-value.sync="form.customerName"
                      :allow-create="
                        hasCompletePerm('basics.cooperators.createCustomer')
                      "
                      no-data-tips="没有查询到客户,回车新增"
                      type="customer"
                      class="switch-focus focus-cooperatorId"
                      placeholder="请选择"
                      @select="customerSelect"
                      @change="handleCooperatorChange"
                    />
                    <span v-else>{{ form.customerName }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="1">
                  <div class="cooperator-detail" v-if="cooperatorInfo">
                    <div class="half-info">
                      <i class="icon cooperator-icon cooperator-no-icon"></i>
                      <span class="label">单位编码：</span>
                      <span>{{ cooperatorInfo.number }}</span>
                    </div>
                    <div class="half-info">
                      <i class="icon cooperator-icon cooperator-man-icon"></i>
                      <span class="label">主联系人：</span>
                      <span>{{ cooperatorInfo.name }}</span>
                    </div>
                    <div>
                      <i class="icon cooperator-icon cooperator-phone-icon"></i>
                      <span class="label">联系电话：</span>
                      <span>
                        {{ cooperatorInfo.phone }}
                      </span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </ht-card>
          <div class="form-layout">
            <!-- 车辆基本信息 -->
            <ht-card padding title="车辆基本信息" class="auto-card base-info">
              <div class="left">
                <el-form-item
                  v-show="showColumn('plateNumber')"
                  prop="plateNumberAfterFix"
                  :label="FIELDENUM['plateNumber']"
                >
                  <ht-input
                    v-model="form.plateNumberAfterFix"
                    :disabled="disableCusAndPlate"
                    placeholder="车牌号"
                    class="input-with-select"
                    @change="plateChange"
                  >
                    <ht-select
                      slot="prepend"
                      :disabled="disableCusAndPlate"
                      v-model="form.plateNumberPrefix"
                      :clearable="false"
                      :options="plateTypes"
                      @change="plateChange"
                      placeholder
                      style="width: 60px"
                    />
                  </ht-input>
                </el-form-item>
                <el-form-item
                  v-show="showColumn('vehicleLevelId')"
                  prop="vehicleLevelId"
                  :label="FIELDENUM['vehicleLevelId']"
                >
                  <ht-autoselect
                    v-model="form.vehicleLevelId"
                    :options="vehicleLevelList"
                    :trigger-on-focus="false"
                    class="switch-focus focus-certType"
                    placeholder="请选择"
                    clearable
                    highlight-first-item
                  />
                </el-form-item>
                <el-form-item
                  v-show="showColumn('vehicleTypeId')"
                  prop="vehicleTypeId"
                  :label="FIELDENUM['vehicleTypeId']"
                >
                  <ht-autoselect
                    v-model="form.vehicleTypeId"
                    :options="vehicleTypeList"
                    :trigger-on-focus="false"
                    class="switch-focus focus-certType"
                    placeholder="请选择"
                    clearable
                    highlight-first-item
                  />
                </el-form-item>
                <el-form-item
                  v-show="showColumn('vin')"
                  prop="vin"
                  :label="FIELDENUM['vin']"
                  style="width:320px"
                >
                  <el-input v-model="form.vin" :maxlength="17" size="small">
                    <el-button slot="append" @click="vinSet">VIN定型</el-button>
                  </el-input>
                </el-form-item>
                <el-form-item
                  v-show="showColumn('vehBrand')"
                  prop="vehBrand"
                  :label="FIELDENUM['vehBrand']"
                >
                  <ht-autoselect
                    v-model="form.vehBrand"
                    remote
                    :fetch-suggestions="
                      query => getSyscompleteFunc('vehBrand', query)
                    "
                    :default-value="form.vehBrand"
                    placeholder="品牌"
                    filter-zero
                    :trigger-on-focus="false"
                    :maxlength="50"
                  />
                </el-form-item>
                <el-form-item
                  v-show="showColumn('facBrand')"
                  prop="facBrand"
                  :label="FIELDENUM['facBrand']"
                >
                  <ht-autoselect
                    :disabled="!form.vehBrand"
                    v-model="form.facBrand"
                    remote
                    :fetch-suggestions="
                      query => getSyscompleteFunc('facBrand', query)
                    "
                    :default-value="form.facBrand"
                    placeholder="厂牌"
                    :trigger-on-focus="false"
                    :maxlength="50"
                    highlight-first-item
                    clearable
                  />
                </el-form-item>
                <el-form-item
                  v-show="showColumn('vehicleGroup')"
                  prop="vehicleGroup"
                  :label="FIELDENUM['vehicleGroup']"
                >
                  <ht-autoselect
                    :disabled="!form.facBrand"
                    v-model="form.vehicleGroup"
                    remote
                    :fetch-suggestions="
                      query => getSyscompleteFunc('vehicleGroup', query)
                    "
                    :default-value="form.vehicleGroup"
                    placeholder="车型组"
                    :trigger-on-focus="false"
                    :maxlength="50"
                    highlight-first-item
                    clearable
                  />
                </el-form-item>
                <el-form-item
                  v-show="showColumn('year')"
                  prop="year"
                  :label="FIELDENUM['year']"
                >
                  <ht-autoselect
                    v-model="form.year"
                    :disabled="!form.vehicleGroup"
                    remote
                    :fetch-suggestions="
                      query => getSyscompleteFunc('year', query)
                    "
                    :default-value="form.year"
                    placeholder="年款"
                    :trigger-on-focus="false"
                    :maxlength="50"
                    highlight-first-item
                    clearable
                  />
                </el-form-item>
                <el-form-item
                  v-show="showColumn('displacement')"
                  prop="displacement"
                  :label="FIELDENUM['displacement']"
                >
                  <ht-autoselect
                    :disabled="!form.year"
                    v-model="form.displacementEngine"
                    remote
                    :fetch-suggestions="
                      query => getSyscompleteFunc('displacementEngine', query)
                    "
                    :default-value="form.displacementEngine"
                    placeholder="排量|发动机"
                    :trigger-on-focus="false"
                    :maxlength="50"
                    highlight-first-item
                    clearable
                  />
                </el-form-item>
                <el-form-item
                  v-show="showColumn('transmission')"
                  prop="transmission"
                  :label="FIELDENUM['transmission']"
                >
                  <ht-autoselect
                    remote
                    :disabled="!form.displacementEngine"
                    v-model="form.transmission"
                    :fetch-suggestions="
                      query => getSyscompleteFunc('transmission', query)
                    "
                    :default-value="form.transmission"
                    placeholder="变速箱"
                    :trigger-on-focus="false"
                    :maxlength="50"
                    highlight-first-item
                    clearable
                  />
                </el-form-item>
                <el-form-item
                  v-show="showColumn('engineNo')"
                  prop="engineNo"
                  :label="FIELDENUM['engineNo']"
                >
                  <ht-input v-model="form.engineNo" />
                </el-form-item>
                <el-form-item
                  v-show="showColumn('gearboxModel')"
                  prop="gearboxModel"
                  :label="FIELDENUM['gearboxModel']"
                >
                  <el-input v-model="form.gearboxModel" size="small" />
                </el-form-item>
                <el-form-item
                  v-show="showColumn('transmissionNo')"
                  prop="transmissionNo"
                  :label="FIELDENUM['transmissionNo']"
                >
                  <el-input v-model="form.transmissionNo" size="small" />
                </el-form-item>
                <el-form-item
                  v-show="showColumn('bodyColor')"
                  prop="bodyColor"
                  :label="FIELDENUM['bodyColor']"
                >
                  <el-input v-model="form.bodyColor" size="small" />
                </el-form-item>
                <el-form-item
                  v-show="showColumn('interiorColor')"
                  prop="interiorColor"
                  :label="FIELDENUM['interiorColor']"
                >
                  <el-input v-model="form.interiorColor" size="small" />
                </el-form-item>
                <el-form-item
                  v-show="showColumn('drivingType')"
                  prop="drivingType"
                  :label="FIELDENUM['drivingType']"
                >
                  <ht-select
                    v-model="form.drivingType"
                    filterable
                    size="small"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in driveTypes"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </ht-select>
                </el-form-item>
              </div>
              <div class="right">
                <el-form-item
                  v-show="showColumn('purchaseDate')"
                  prop="purchaseDate"
                  :label="FIELDENUM['purchaseDate']"
                >
                  <el-date-picker
                    v-model="form.purchaseDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item
                  v-show="showColumn('plateDate')"
                  prop="plateDate"
                  :label="FIELDENUM['plateDate']"
                >
                  <el-date-picker
                    v-model="form.plateDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item
                  v-show="showColumn('manufactureDate')"
                  prop="manufactureDate"
                  :label="FIELDENUM['manufactureDate']"
                >
                  <el-date-picker
                    v-model="form.manufactureDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item
                  v-show="showColumn('soundPassword')"
                  prop="soundPassword"
                  :label="FIELDENUM['soundPassword']"
                >
                  <ht-input v-model="form.soundPassword" size="small" />
                </el-form-item>
                <el-form-item
                  v-show="showColumn('keyNumber')"
                  prop="keyNumber"
                  :label="FIELDENUM['keyNumber']"
                >
                  <el-input v-model="form.keyNumber" size="small" />
                </el-form-item>
                <el-form-item
                  v-show="showColumn('docNumber')"
                  prop="docNumber"
                  :label="FIELDENUM['docNumber']"
                >
                  <ht-input v-model="form.docNumber" size="small" />
                </el-form-item>
                <el-form-item
                  v-show="showColumn('fuelType')"
                  prop="fuelType"
                  :label="FIELDENUM['fuelType']"
                >
                  <ht-select
                    v-model="form.fuelType"
                    filterable
                    size="small"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in fuelTypes"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </ht-select>
                </el-form-item>
                <el-form-item
                  v-show="showColumn('tireSpec')"
                  prop="tireSpec"
                  :label="FIELDENUM['tireSpec']"
                >
                  <ht-input v-model="form.tireSpec" size="small" />
                </el-form-item>
                <el-form-item
                  v-show="showColumn('params')"
                  prop="params"
                  :label="FIELDENUM['params']"
                >
                  <ht-select
                    v-model="form.params"
                    filterable
                    size="small"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in paramsOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </ht-select>
                </el-form-item>
                <el-form-item
                  v-show="showColumn('remark')"
                  prop="remark"
                  :label="FIELDENUM['remark']"
                >
                  <ht-input v-model="form.remark" size="small" />
                </el-form-item>
              </div>
            </ht-card>
            <!-- 车主信息 -->
            <ht-card padding title="车主信息" class="auto-card owner-info">
              <el-form-item
                v-show="showColumn('ownerName')"
                prop="ownerName"
                :label="FIELDENUM['ownerName']"
              >
                <el-input
                  v-model="form.ownerName"
                  @input="inputChange($event, 'ownerName')"
                  size="small"
                />
              </el-form-item>
              <el-form-item
                v-show="showColumn('ownerPhone')"
                prop="ownerPhone"
                :label="FIELDENUM['ownerPhone']"
              >
                <el-input
                  v-model="form.ownerPhone"
                  @input="inputChange($event, 'ownerPhone')"
                  size="small"
                />
              </el-form-item>

              <el-form-item
                v-show="showColumn('sex')"
                prop="sex"
                :label="FIELDENUM['sex']"
              >
                <ht-select
                  v-model="form.sex"
                  filterable
                  size="small"
                  placeholder="请选择"
                >
                  <el-option label="男" :value="'man'" />
                  <el-option label="女" :value="'woman'" />
                </ht-select>
              </el-form-item>
              <el-form-item
                v-show="showColumn('certType')"
                prop="certType"
                :label="FIELDENUM['certType']"
              >
                <ht-autoselect
                  v-model="form.certType"
                  :options="credentialsList"
                  :trigger-on-focus="false"
                  class="switch-focus focus-certType"
                  placeholder="请选择"
                  clearable
                  highlight-first-item
                />
              </el-form-item>
              <el-form-item
                v-show="showColumn('certNumber')"
                prop="certNumber"
                :label="FIELDENUM['certNumber']"
              >
                <el-input v-model="form.certNumber" size="small" />
              </el-form-item>
              <el-form-item
                v-show="showColumn('industry')"
                prop="industry"
                :label="FIELDENUM['industry']"
              >
                <el-input v-model="form.industry" size="small" />
              </el-form-item>
              <el-form-item
                v-show="showColumn('birthday')"
                prop="birthday"
                :label="FIELDENUM['birthday']"
              >
                <el-date-picker
                  v-model="form.birthday"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                v-show="showColumn('areaId') || showColumn('address')"
                prop="areaId"
                :label="FIELDENUM['areaId']"
              >
                <area-select v-model="form.areaId" style="marginBottom:5px;" />
                <el-input v-model="form.address" size="small" />
              </el-form-item>
              <el-form-item
                v-show="showColumn('nation')"
                prop="nation"
                :label="FIELDENUM['nation']"
              >
                <el-input v-model="form.nation" size="small" />
              </el-form-item>
              <el-form-item
                v-show="showColumn('education')"
                prop="education"
                :label="FIELDENUM['education']"
              >
                <ht-autoselect
                  v-model="form.education"
                  :options="educationList"
                  :trigger-on-focus="false"
                  class="switch-focus focus-certType"
                  placeholder="请选择"
                  clearable
                  highlight-first-item
                />
              </el-form-item>
              <el-form-item
                v-show="showColumn('householdIncome')"
                prop="householdIncome"
                :label="FIELDENUM['householdIncome']"
              >
                <el-input
                  v-model="form.householdIncome"
                  type="number"
                  size="small"
                >
                  <span slot="append">万</span>
                </el-input>
              </el-form-item>
              <el-form-item
                v-show="showColumn('marriage')"
                prop="marriage"
                :label="FIELDENUM['marriage']"
              >
                <el-input v-model="form.marriage" size="small" />
              </el-form-item>
              <el-form-item
                v-show="showColumn('hobbies')"
                prop="hobbies"
                :label="FIELDENUM['hobbies']"
              >
                <el-input v-model="form.hobbies" size="small" />
              </el-form-item>
              <el-form-item
                v-show="showColumn('qqWechat')"
                prop="qqWechat"
                :label="FIELDENUM['qqWechat']"
              >
                <el-input v-model="form.qqWechat" size="small" />
              </el-form-item>
              <el-form-item
                v-show="showColumn('email')"
                prop="email"
                :label="FIELDENUM['email']"
              >
                <el-input v-model="form.email" size="small" />
              </el-form-item>
            </ht-card>
            <!-- 高级属性 -->
            <ht-card padding title="高级属性" class="auto-card advance-info">
              <el-form-item
                v-show="showColumn('auditMonth')"
                prop="auditMonth"
                :label="FIELDENUM['auditMonth']"
              >
                <ht-format-number
                  :min="1"
                  :max="12"
                  v-model="form.auditMonth"
                  size="small"
                  @change="mounthChange"
                >
                  <span slot="append">月</span>
                </ht-format-number>
              </el-form-item>
              <el-form-item
                v-show="showColumn('mandatoryInsurance')"
                prop="mandatoryInsurance"
                :label="FIELDENUM['mandatoryInsurance']"
              >
                <el-input v-model="form.mandatoryInsurance" size="small" />
              </el-form-item>
              <el-form-item
                v-show="showColumn('commercialInsurance')"
                prop="commercialInsurance"
                :label="FIELDENUM['commercialInsurance']"
              >
                <el-input v-model="form.commercialInsurance" size="small" />
              </el-form-item>
              <el-form-item
                v-show="showColumn('insuranceCompany')"
                prop="insuranceCompany"
                :label="FIELDENUM['insuranceCompany']"
              >
                <ht-autoselect
                  v-model="form.insuranceCompanyId"
                  remote
                  :fetch-suggestions="query => searchAllCooperatorsList(query)"
                  :default-value.sync="form.insuranceCompanyName"
                  placeholder="保险公司"
                  filter-zero
                  :trigger-on-focus="false"
                  :maxlength="50"
                />
              </el-form-item>
              <el-form-item
                v-show="showColumn('insuranceStart')"
                prop="insuranceStart"
                :label="FIELDENUM['insuranceStart']"
              >
                <el-date-picker
                  v-model="form.insuranceStart"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                v-show="showColumn('insuranceExpiry')"
                prop="insuranceExpiry"
                :label="FIELDENUM['insuranceExpiry']"
              >
                <el-date-picker
                  v-model="form.insuranceExpiry"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                v-show="showColumn('deductionRate')"
                prop="deductionRate"
                :label="FIELDENUM['deductionRate']"
              >
                <ht-format-number
                  v-model="form.deductionRateLabel"
                  :min="0"
                  :max="100"
                  precision-type="price"
                  @blur="this.deductionRateChange"
                >
                  <template slot="append">%</template>
                </ht-format-number>
              </el-form-item>

              <div class="discount-info">
                <span class="discount-info-title">折扣信息</span>
                <el-form-item
                  v-show="showColumn('manHourDiscount')"
                  prop="manHourDiscount"
                  :label="FIELDENUM['manHourDiscount']"
                >
                  <ht-format-number
                    :disabled="form.isSameCustomer"
                    v-model="form.manHourDiscount"
                    :min="0"
                    :max="10"
                    precision-type="price"
                  >
                    <template slot="append">折</template>
                  </ht-format-number>
                </el-form-item>
                <el-form-item
                  v-show="showColumn('partDiscount')"
                  prop="partDiscount"
                  :label="FIELDENUM['partDiscount']"
                >
                  <ht-format-number
                    :disabled="form.isSameCustomer"
                    v-model="form.partDiscount"
                    :min="0"
                    :max="10"
                    precision-type="price"
                  >
                    <template slot="append">折</template>
                  </ht-format-number>
                </el-form-item>
                <el-form-item
                  v-show="showColumn('partPriceType')"
                  prop="partPriceType"
                  :label="FIELDENUM['partPriceType']"
                >
                  <ht-autoselect
                    v-model="form.partPriceType"
                    :options="priceTypeList"
                    :trigger-on-focus="false"
                    class="switch-focus focus-certType"
                    placeholder="请选择"
                    clearable
                    highlight-first-item
                  />
                </el-form-item>
                <el-form-item prop="isSameCustomer">
                  <el-checkbox
                    :disabled="!form.cooperatorId"
                    v-model="form.isSameCustomer"
                    @change="isSameCustomerChange"
                    >{{ FIELDENUM["isSameCustomer"] }}</el-checkbox
                  >
                </el-form-item>
                <!-- <el-form-item prop="canDiscount">
                  <el-checkbox v-model="form.cannotDiscount">{{
                    FIELDENUM["canDiscount"]
                  }}</el-checkbox>
                </el-form-item> -->
              </div>

              <el-form-item v-show="showColumn('forReview')" prop="forReview">
                <el-checkbox v-model="form.forReview">{{
                  FIELDENUM["forReview"]
                }}</el-checkbox>
              </el-form-item>
            </ht-card>
          </div>
          <div class="btn-group" v-if="!hidebtn">
            <div class="config"></div>
            <div class="op">
              <el-button
                size="small"
                type="primary"
                @click="beforeCreateCarFile"
                >确定（F3）</el-button
              >
              <el-button size="small" @click="cancelHandle"
                >取消（ESC）</el-button
              >
            </div>
            <div class="config">
              <i class="el-icon-s-tools"></i>
              <span @click="showFileConfig = true">自定义车辆档案字段</span>
            </div>
          </div>
        </el-form>
      </div>
    </ht-dialog>
    <FieldConfig :visible="showFileConfig" @close="hideConfig" />
  </div>
</template>

<script>
import { FIELDENUM } from "./fieldSetting";
import { cloneDeep } from "lodash";
import { getSearchSysAvaVehModelsOptions } from "@/api/parts/partsModels";
import {
  createCarFile,
  createVehicleOwners,
  updateVehicleOwners,
  updateCarFile
} from "@/api/repairs";
import {
  credentialsDictionary,
  educationDictionary,
  priceTypeDictionary
} from "@/utils/store";
import { baseDictionary, getSystemParamsDetail } from "@/api/base/base";
import {
  cooperatorsContactsInfo,
  searchAllCooperators,
  resUnitCustomers
} from "@/api/communion/communion";
import AreaSelect from "@/components/select/AreaSelect";
import { CooperatorsSelect } from "@/components/select";
import { getVinModelData } from "@/api/epc";
import FieldConfig from "./fieldConfig";
import { searchMixin } from "@/mixins";
import { precisionsFixed } from "@/mixins";

const validateTextUpper = (rule, value, callback) => {
  const patt = /^[A-Z\d]+$/;
  if (!value) {
    callback();
  }
  if (!patt.test(value)) {
    callback(new Error("请输入大写字母+数字的组合"));
  } else {
    callback();
  }
};

const validateTextAll = (rule, value, callback) => {
  const patt = /^[a-zA-Z\d]+$/;
  if (!value) {
    callback();
  }
  if (!patt.test(value)) {
    callback(new Error("请输入大小写字母+数字的组合"));
  } else {
    callback();
  }
};
const defaultRule = {
  cooperatorId: [{ required: true }],
  vin: [
    { validator: validateTextUpper, trigger: "change" },
    {
      min: 17,
      max: 17,
      message: "车架号长度必须为17个字符",
      trigger: "change"
    }
  ],
  engineNo: [
    { validator: validateTextUpper, trigger: "change" },
    {
      max: 20,
      message: "发动机号长度必须小与20个字符",
      trigger: "change"
    }
  ],
  transmissionNo: [
    { validator: validateTextUpper, trigger: "change" },
    {
      max: 20,
      message: "变速箱号长度必须小与20个字符",
      trigger: "change"
    }
  ],
  bodyColor: [
    {
      max: 10,
      message: "车身颜色不能超过10个字符",
      trigger: "change"
    }
  ],
  interiorColor: [
    {
      max: 10,
      message: "内饰颜色不能超过10个字符",
      trigger: "change"
    }
  ],
  certNumber: [{ validator: validateTextAll, trigger: "change" }],
  nation: [
    {
      max: 10,
      message: "民族不能超过10个字符",
      trigger: "change"
    }
  ]
};
export default {
  name: "FileEditor",
  props: {
    currentFile: {
      type: Object,
      default: () => {}
    },
    showCooperator: {
      type: Boolean,
      default: true
    },
    isAddFile: {
      type: Boolean,
      default: false
    },
    onlyShow: {
      type: Boolean,
      default: false
    },
    disableCusAndPlate: {
      type: Boolean,
      default: false
    },
    hidebtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cooperatorInfo: null,
      vehicleLevelList: [],
      vehicleTypeList: [],
      FIELDSETTING: {},
      FIELDENUM,
      form: {
        cooperatorId: null,
        plateNumber: "",
        partPriceType: "零售价"
      },
      localRules: {
        ...defaultRule
      },
      showFileConfig: false,
      isNew: true,
      plateNumberPrefix: "",
      plateTypes: [
        "京",
        "津",
        "冀",
        "晋",
        "蒙",
        "辽",
        "吉",
        "黑",
        "沪",
        "苏",
        "浙",
        "皖",
        "闽",
        "赣",
        "鲁",
        "豫",
        "鄂",
        "湘",
        "粤",
        "桂",
        "琼",
        "渝",
        "川",
        "贵",
        "云",
        "藏",
        "陕",
        "甘",
        "青",
        "宁",
        "新",
        "港",
        "澳",
        "台"
      ],
      paramsOptions: [
        {
          id: "轿车:排量<1.6L",
          name: "轿车:排量<1.6L"
        },
        {
          id: "轿车：1.6L<=排量<=1.8L",
          name: "轿车：1.6L<=排量<=1.8L"
        },
        {
          id: "轿车：1.8L<排量<=2.3L",
          name: "轿车：1.8L<排量<=2.3L"
        },
        {
          id: "轿车：2.3L<排量<=3L",
          name: "轿车：2.3L<排量<=3L"
        },
        {
          id: "轿车：3L<排量<=4L",
          name: "轿车：3L<排量<=4L"
        },
        {
          id: "轿车：排量>4L",
          name: "轿车：排量>4L"
        },
        {
          id: "客车：车总长<=4米 或者 座位<=7座",
          name: "客车：车总长<=4米 或者 座位<=7座"
        },
        {
          id: "客车：4米>车总长<=5米 或者 8座 <= 座位<=19座",
          name: "客车：4米>车总长<=5米 或者 8座 <= 座位<=19座"
        },
        {
          id: "客车：5米>车总长<=7米 或者 20座<=座位<=32座",
          name: "客车：5米>车总长<=7米 或者 20座<=座位<=32座"
        },
        {
          id: "客车：7米>车总长<=10米 或者 33座<=座位<=44座",
          name: "客车：7米>车总长<=10米 或者 33座<=座位<=44座"
        },
        {
          id: "客车：车总长>10米 或者 座位>=45座",
          name: "客车：车总长>10米 或者 座位>=45座"
        },
        {
          id: "货车：载重量 <= 0.75吨",
          name: "货车：载重量 <= 0.75吨"
        },
        {
          id: "货车：汽油 并且 0.75吨<载重量<=3.5吨",
          name: "货车：汽油 并且 0.75吨<载重量<=3.5吨"
        },
        {
          id: "货车：柴油 并且 0.75吨<载重量<=3.5吨",
          name: "货车：柴油 并且 0.75吨<载重量<=3.5吨"
        },
        {
          id:
            "货车：柴油 并且 0.75吨<载重量<=3.5吨货车：柴油 并且 0.75吨<载重量<=3.5吨",
          name:
            "货车：柴油 并且 0.75吨<载重量<=3.5吨货车：柴油 并且 0.75吨<载重量<=3.5吨"
        },
        {
          id: "货车：柴油 并且 3.5吨<载重量<8吨",
          name: "货车：柴油 并且 3.5吨<载重量<8吨"
        },
        {
          id: "货车：载重量 >=8吨",
          name: "货车：载重量 >=8吨"
        }
      ],
      driveTypes: [
        {
          id: "燃油",
          name: "燃油"
        },
        {
          id: "混动",
          name: "混动"
        },
        {
          id: "纯电",
          name: "纯电"
        }
      ],
      fuelTypes: [
        {
          id: "0",
          name: "0"
        },
        {
          id: "89",
          name: "89"
        },
        {
          id: "90",
          name: "90"
        },
        {
          id: "92",
          name: "92"
        },
        {
          id: "93",
          name: "93"
        },
        {
          id: "95",
          name: "95"
        },
        {
          id: "97",
          name: "97"
        },
        {
          id: "98",
          name: "98"
        }
      ],
      options: []
    };
  },
  mixins: [searchMixin, precisionsFixed],
  components: {
    AreaSelect,
    FieldConfig,
    CooperatorsSelect
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          parseInt(localStorage.getItem("plateNumberPrefix")) || 0;
          this.$refs.fileForm?.clearValidate();
        }
      },
      immediate: true
    },
    currentFile: {
      handler(value) {
        if (!value) return;
        this.initForm(value);
      },
      deep: true
    }
  },
  computed: {
    showColumn() {
      return field => {
        let fieldConfig = {};
        for (const type in this.FIELDSETTING) {
          for (const key in this.FIELDSETTING[type]) {
            if (key == field) {
              fieldConfig = this.FIELDSETTING[type][key];
            }
          }
        }
        return fieldConfig.isNeed;
      };
    },
    title() {
      if (this.isNew) {
        return "新增车辆档案";
      } else {
        if (this.onlyShow) {
          return "车辆档案";
        } else {
          if (this.isAddFile) {
            return "追加车辆档案";
          } else {
            return "修改车辆档案";
          }
        }
      }
    },
    credentialsList() {
      return credentialsDictionary();
    },
    educationList() {
      return educationDictionary();
    },
    priceTypeList() {
      return priceTypeDictionary();
    }
  },
  mounted() {
    this.initForm(this.currentFile);
  },
  methods: {
    isSameCustomerChange(e) {
      if (e) {
        resUnitCustomers(this.form.cooperatorId).then(res => {
          const { repairManHourDiscount, repairPartDiscount, priceType } = res;
          this.form.manHourDiscount = repairManHourDiscount;
          this.form.partDiscount = repairPartDiscount;
          this.form.partPriceType = priceType;
          this.$forceUpdate();
        });
      } else {
        this.form.manHourDiscount = "";
        this.form.partDiscount = "";
      }
    },
    initForm(value) {
      if (value && value.id) {
        // console.log("编辑模式");
        this.isNew = false;
        // let displacementEngine = "";
        const { plateNumber } = value;
        const plateNumberPrefix = plateNumber
          ? this.plateTypes.findIndex(
              item => item === plateNumber.substring(0, 1)
            )
          : 0;
        const plateNumberAfterFix = plateNumber ? plateNumber.substring(1) : "";
        // if (this.form.displacement || this.form.engine) {
        //   displacementEngine = this.form.displacement + "|" + this.form.engine;
        // }
        const cannotDiscount = value.flags
          ? !value.flags.canDiscount
          : !value.canDiscount;
        const isSameCustomer = value.flags ? value.flags.isSameCustomer : false;
        const forReview = value.flags ? value.flags.forReview : false;
        this.form = cloneDeep({
          ...value,
          plateNumberAfterFix: this.isAddFile ? "" : plateNumberAfterFix,
          plateNumberPrefix,
          deductionRateLabel: value.deductionRate
            ? Number(Number(value.deductionRate) * 100).toFixed(2)
            : null,
          cannotDiscount: cannotDiscount,
          isSameCustomer,
          forReview
        });
        localStorage.setItem("plateNumberPrefix", plateNumberPrefix);
        this.$forceUpdate();
        this.$nextTick(() => {
          this.$forceUpdate();
        });
        if (this.form.cooperatorId) {
          this.handleCooperatorChange(this.form.cooperatorId);
        }
        // console.log(this.form);
      } else {
        // console.log("新增模式");
        this.isNew = true;
        this.form = {};
        // 输入车牌号新增的组件，需要默认填充车牌号和客户信息
        if (value && value.plateNumberAfterFix) {
          this.form = { ...value };
        } else {
          this.form = {
            cooperatorId: null,
            partPriceType: "零售价",
            plateNumberPrefix: this.isAddFile
              ? this.findPlateIndex(value.plateNumber)
              : parseInt(localStorage.getItem("plateNumberPrefix")) || 0,
            manHourDiscount: 10,
            partDiscount: 10,
            forReview: true
          };
        }
        this.$forceUpdate();
      }
      setTimeout(() => {
        this.$refs.fileForm?.clearValidate();
      }, 1000);
      this.getSystemParamsDetail();
    },
    findPlateIndex(plateNumber) {
      const index = this.plateTypes.findIndex(item => item == plateNumber[0]);
      return index || 0;
    },
    plateChange() {
      const temForm = cloneDeep(this.form);
      const { plateNumberAfterFix, plateNumberPrefix } = temForm;
      localStorage.setItem("plateNumberPrefix", plateNumberPrefix);
      temForm.plateNumber = `${this.plateTypes[plateNumberPrefix]}${plateNumberAfterFix}`;
      this.from = temForm;
    },
    vinSet() {
      if (!this.form.vin) {
        this.$message.warning({
          message: "请输入VIN码！",
          showClose: true
        });
        return;
      }
      getVinModelData({ vin: this.form.vin })
        .then(res => {
          if (res) {
            const { brand, subBrand, salesVehicle } = res;
            if (salesVehicle && salesVehicle.length) {
              const model = salesVehicle[0];
              this.form = {
                ...this.form,
                facBrand: subBrand,
                vehBrand: brand,
                vehicleGroup: model.mjVehicleGroup,
                ...model,
                displacement: model.displacement + "|" + model.engine
              };
            }
          }
        })
        .catch(() => {
          this.btnLoading = false;
        });
    },
    inputChange(e, key) {
      this.form[key] = e;
      this.$forceUpdate();
    },
    mounthChange(e) {
      const value = this.precisionFormat(e, "money");
      this.form.auditMonth = value;
    },
    handleCooperatorChange(id) {
      if (!id) return;
      cooperatorsContactsInfo(id).then(res => {
        this.cooperatorInfo = { ...res };
        this.$nextTick(() => {
          this.$refs.fileForm?.clearValidate();
        });
      });
    },
    hideConfig() {
      this.showFileConfig = false;
      this.getSystemParamsDetail();
    },
    deductionRateChange() {
      this.form.deductionRate = this.form.deductionRateLabel / 100;
      this.$forceUpdate();
    },
    getSystemParamsDetail() {
      getSystemParamsDetail({
        module: "repair",
        type: "customerVehicleDefine"
      }).then(res => {
        this.FIELDSETTING = res.value;
        this.initVehicelLevelAndType();
        this.initRules();
      });
    },
    initVehicelLevelAndType() {
      baseDictionary({ type: "vehicleLevel" }).then(res => {
        this.vehicleLevelList = res.options;
        setTimeout(() => {
          this.$refs.fileForm?.clearValidate();
        }, 1000);
      });
      baseDictionary({ type: "vehicleType" }).then(res => {
        this.vehicleTypeList = res.options;
        this.$nextTick(() => {
          this.$refs.fileForm?.clearValidate();
        });
      });
    },
    async searchAllCooperatorsList(query) {
      const res = await searchAllCooperators({
        type: "insuranceCompany",
        allcoop: false,
        keyword: query
      });
      return res || [];
    },
    async getSyscompleteFunc(type, query) {
      const { vehBrand, facBrand, vehicleGroup, year } = this.form;
      const queryObj = { vehBrand, facBrand, vehicleGroup, year };
      queryObj[type] = query;
      const res = await getSearchSysAvaVehModelsOptions({
        fieldType: type,
        ...queryObj,
        dataSource: "mj"
      });
      let arr = [];
      if (res) {
        arr = res.map(item => ({ id: item, name: item }));
      }
      return arr;
    },
    initRules() {
      const rules = { ...defaultRule };
      for (const type in this.FIELDSETTING) {
        for (const key in this.FIELDSETTING[type]) {
          if (this.FIELDSETTING[type][key].isRequire) {
            if (key == "cooperatorId") {
              rules[`${key}`] = [
                {
                  required: true,
                  message: "请选择所属客户",
                  trigger: "blur"
                }
              ];
            } else if (key == "plateNumber") {
              rules[`plateNumberAfterFix`] = [
                {
                  required: true,
                  message: "请输入车牌号",
                  trigger: "change"
                },
                { validator: validateTextUpper, trigger: "change" },
                {
                  min: 6,
                  max: 7,
                  message: "长度在 6 到 7 个字符",
                  trigger: "change"
                }
              ];
            } else if (key == "remark") {
              rules[`${key}`] = [
                {
                  required: true,
                  message: "请输入备注",
                  trigger: "change"
                }
              ];
            } else if (key == "vehicleLevelId") {
              rules[`${key}`] = [
                {
                  required: true,
                  type: "number",
                  message: "请选择车辆级别"
                }
              ];
            } else if (key == "vehicleTypeId") {
              rules[`${key}`] = [
                {
                  required: true,
                  type: "number",
                  message: "请选择车辆类型"
                }
              ];
            } else {
              if (rules[`${key}`]) {
                rules[`${key}`] = [
                  ...rules[`${key}`],
                  {
                    required: true,
                    message: `请输入${this.FIELDENUM[key]}`,
                    trigger: "change"
                  }
                ];
              } else {
                rules[`${key}`] = [
                  {
                    required: true,
                    message: `请输入${this.FIELDENUM[key]}`,
                    trigger: "change"
                  }
                ];
              }
            }
          } else {
            if (key != "remark") {
              if (rules[`${key}`]) {
                if (
                  key == "vehicleLevelId" ||
                  key == "vehicleTypeId" ||
                  key == "auditMonth"
                ) {
                  rules[`${key}`] = [
                    {
                      type: "number",
                      message: `请选择${this.FIELDENUM[key]}`,
                      trigger: "change"
                    }
                  ];
                }
              }
            }
          }
        }
      }
      this.localRules = { ...rules };
      this.$forceUpdate();
      this.$nextTick(() => {
        this.localRules = { ...rules };
        this.$forceUpdate();
        this.$refs.fileForm?.clearValidate();
      });
    },
    beforeCreateCarFile() {
      const { plateNumberPrefix, plateNumberAfterFix } = this.form;
      this.form.plateNumber = `${this.plateTypes[plateNumberPrefix]}${plateNumberAfterFix}`;
      this.$nextTick(() => {
        this.$refs.fileForm.validate((valid, err) => {
          if (valid) {
            this.createCarFile();
          } else {
            const errTips = err[Object.keys(err)[0]][0].message;
            this.$message.warning({ message: errTips, showClose: true });
          }
        });
      });
    },
    isLicenseNo(str) {
      return /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/.test(
        str
      );
    },
    async createCarFile() {
      const { plateNumberPrefix, plateNumberAfterFix } = this.form;
      // console.log(
      //   `${this.plateTypes[plateNumberPrefix]}${plateNumberAfterFix}`
      // );
      // const isLicense = this.isLicenseNo(
      //   `${this.plateTypes[plateNumberPrefix]}${plateNumberAfterFix}`
      // );
      // if (!isLicense) {
      //   this.$message.warning("请输入合法的车牌号");
      //   return;
      // }
      if (this.isNew || this.isAddFile) {
        const { cooperatorId } = this.form;
        if (!cooperatorId) {
          this.$message.warning({ message: "请选择车辆所属客户！" });
          return;
        }
        const ownerResp = await createVehicleOwners({
          ...this.form
        });
        if (!ownerResp) {
          this.$message.warning({ message: "创建车主信息失败！" });
          return;
        }
        const form = { ...this.form };
        form.flags = {};
        form.flags.canDiscount = !this.form.cannotDiscount;
        form.flags.forReview = this.form.forReview;
        form.flags.isSameCustomer = this.form.isSameCustomer;
        const carResp = await createCarFile({
          ...form,
          plateNumber: `${this.plateTypes[plateNumberPrefix]}${plateNumberAfterFix}`,
          vehicleOwnerId: ownerResp.id,
          manHourDiscount: form.manHourDiscount ? form.manHourDiscount : 10,
          partDiscount: form.partDiscount ? form.partDiscount : 10
        });
        if (!carResp) {
          this.$message.warning({ message: "创建车主信息失败！" });
          return;
        }
        this.$message.success({ message: "创建档案成功!" });
        this.$emit("close");
        this.$emit("update", {
          ...carResp,
          ...form,
          plateNumber: `${this.plateTypes[plateNumberPrefix]}${plateNumberAfterFix}`,
          manHourDiscount: form.manHourDiscount ? form.manHourDiscount : 10,
          partDiscount: form.partDiscount ? form.partDiscount : 10,
          vehicleOwnerId: ownerResp.id
        });
      } else {
        this.updateFile(); // 后端无法实现这个功能，所以下面的代码先注释
        // const { cooperatorId } = this.form;
        // const originCooperatorId = this.currentFile.cooperatorId;
        // if (cooperatorId != originCooperatorId) {
        //   this.$confirm(
        //     `车辆所属客户变更后，车辆历史工单、前客户账目都将更新为新客户。是否继续修改？ 如果不想影响历史数据，请考虑使用「车辆过户」”功能。`,
        //     "提示",
        //     {
        //       type: "warning"
        //     }
        //   ).then(() => {
        //     this.updateFile();
        //   });
        // } else {
        //   this.updateFile();
        // }
      }
    },
    async updateFile() {
      const {
        plateNumberPrefix,
        plateNumberAfterFix,
        vehicleOwnerId
      } = this.form;
      const form = { ...this.form };
      form.flags.canDiscount = !this.form.cannotDiscount;
      form.flags.forReview = this.form.forReview;
      form.flags.isSameCustomer = this.form.isSameCustomer;
      await updateVehicleOwners({
        ...form,
        id: vehicleOwnerId
      });

      await updateCarFile({
        ...form,
        plateNumber: `${this.plateTypes[plateNumberPrefix]}${plateNumberAfterFix}`
      });

      this.$message.success({ message: "更新档案成功!" });
      this.$emit("update", this.form);
    },
    customerSelect(e) {
      const { name, phone } = e;
      this.form.ownerName = name;
      this.form.ownerPhone = phone;
      this.$nextTick(() => {
        this.$refs.fileForm?.clearValidate();
      });
    },
    cancelHandle() {
      if (this.loading) return;
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-wrap {
  // z-index: 3090 !important;
  ::v-deep {
    .el-dialog__wrapper {
      background: #e7ebed !important;
    }
    .el-dialog {
      top: 1vh !important;
      background: #e7ebed !important;
    }
    .el-dialog__body {
      padding: 5px !important;
      background: #e7ebed !important;
    }
    .el-form-item {
      margin-bottom: 13px;
    }
    .handleRed {
      label::before {
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
      }
    }
  }
}
.form-wrap {
  padding: 5px;
  background: #e7ebed !important;
  ::v-deep {
    .el-dialog {
      background: #e7ebed !important;
    }
    .el-form-item {
      margin-bottom: 5px;
    }
  }
}
.auto-card {
  background: #fff;
}
.no-padding-wrap {
  ::v-deep {
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
.form-layout {
  display: flex;
  justify-content: space-between;
  height: 560px;
  margin-top: 10px;
  .base-info {
    height: 560px;
    overflow-y: auto;

    flex: 2;

    ::v-deep {
      .el-card__body {
        height: 760px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 10px;
        .left,
        .right {
          width: 48%;
        }
        .right {
          // margin-top: 140px;
        }
      }
    }
  }

  .owner-info,
  .advance-info {
    flex: 1;
    margin-left: 10px;
    overflow-y: auto;
  }
}
.btn-group {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  .op {
    display: flex;
    justify-content: center;
  }
  .config {
    width: 150px;
    cursor: pointer;
  }
}
.cooperator-detail {
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .cooperator-icon {
    // vertical-align: text-top;
    margin-right: 5px;
  }

  span {
    vertical-align: bottom;
    &.label {
      font-size: 14px;
      color: #000;
    }
  }

  .half-info {
    width: 30%;
    display: inline-block;
  }
}
.discount-info {
  position: relative;
  padding: 10px 2px;
  border: solid 1px #eee;
  border-radius: 5px;
  margin-top: 20px;
  .discount-info-title {
    display: inline-block;
    position: absolute;
    height: 20px;
    top: -10px;
    left: 20px;
    background: #fff;
  }
}
</style>
