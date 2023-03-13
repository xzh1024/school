<template>
  <div class="carInfo-wrap">
    <!-- 头部按钮 -->
    <div class="btns">
      <el-button
        v-if="allowEdit"
        type="primary"
        :disabled="!showSave"
        size="small"
        @click="handleSubmit"
        >保存（F3）</el-button
      >
      <el-button
        v-if="allowEdit"
        type="primary"
        size="small"
        @click="editCooperatorInfo"
        :disabled="!form.status || !editAble"
        >编辑客户信息</el-button
      >
      <el-button
        v-if="allowEdit"
        type="primary"
        size="small"
        @click="editCarFile"
        :disabled="!form.status || !editAble"
        >编辑车辆档案</el-button
      >
    </div>
    <div class="content-wrap">
      <!-- 左边表单 -->
      <div class="left">
        <el-form
          ref="form"
          :rules="rules"
          :model="form"
          size="mini"
          :show-message="false"
          label-position="left"
          label-width="110px"
          style="background-color;#fff;"
        >
          <div class="form-wrap">
            <div class="block1">
              <el-form-item prop="plateNumber" label="车牌号">
                <VehiclesSelect
                  :disabled="disablePlateNumber || !allowEdit"
                  v-model="carInfo.plateNumber"
                  :cooperatorInfo="carInfo"
                  @change="carFileChange"
                  @clear="clearValidate"
                  @reset="resetPlateNumber"
                />
              </el-form-item>
              <el-form-item label="车辆级别" prop="vehicleLevelId">
                <ht-autoselect
                  v-model="carInfo.vehicleLevelId"
                  :options="vehicleLevelList"
                  :trigger-on-focus="false"
                  class="switch-focus focus-certType"
                  placeholder="请选择"
                  clearable
                  disabled
                  highlight-first-item
                />
              </el-form-item>
              <el-form-item label="客户名称" prop="cooperatorName">
                <ht-input
                  v-model="carInfo.cooperatorName"
                  size="small"
                  disabled
                />
              </el-form-item>
              <el-form-item label="客户电话">
                <ht-input
                  v-model="carInfo.cooperatorPhone"
                  size="small"
                  disabled
                />
              </el-form-item>
              <el-form-item prop="businessCategoryId" label="业务类型">
                <ht-autoselect
                  :disabled="!allowEdit"
                  v-model="form.businessCategoryId"
                  :options="repairBusinessCategoryList"
                  :trigger-on-focus="false"
                  class="switch-focus focus-certType"
                  placeholder="请选择"
                  clearable
                  highlight-first-item
                />
              </el-form-item>
              <el-form-item prop="mileage" label="进厂里程">
                <ht-format-number
                  :disabled="!allowEdit"
                  v-model="form.mileage"
                  :min="0"
                  precision-type="money"
                >
                  <span slot="append">km</span>
                </ht-format-number>
              </el-form-item>
              <el-form-item prop="oilDegree" label="存油量">
                <ht-select
                  :disabled="!allowEdit"
                  v-model="form.oilDegree"
                  filterable
                  size="small"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in oilDegreeOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </ht-select>
              </el-form-item>
              <el-form-item prop="receptionTime" label="接待时间">
                <el-date-picker
                  :disabled="!allowEdit"
                  v-model="form.receptionTime"
                  type="datetime"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="expectedDeliveryTime" label="预计交车时间">
                <el-date-picker
                  :disabled="!allowEdit"
                  v-model="form.expectedDeliveryTime"
                  type="datetime"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="contactsName" label="送修人">
                <ht-input
                  :disabled="!allowEdit"
                  v-model="form.contactsName"
                  size="small"
                />
              </el-form-item>
              <el-form-item prop="contactsPhone" label="送修人电话">
                <ht-input
                  :disabled="!allowEdit"
                  v-model="form.contactsPhone"
                  size="small"
                />
              </el-form-item>
              <el-form-item prop="contactsCertNumber" label="送修人证件号码">
                <ht-input
                  :disabled="!allowEdit"
                  v-model="form.contactsCertNumber"
                  size="small"
                />
              </el-form-item>
              <el-form-item prop="contactsRemark" label="客户描述">
                <ht-input
                  :disabled="!allowEdit"
                  v-model="form.contactsRemark"
                  size="small"
                />
              </el-form-item>
              <el-form-item prop="receptionRemark" label="接待描述">
                <ht-input
                  :disabled="!allowEdit"
                  v-model="form.receptionRemark"
                  size="small"
                />
              </el-form-item>
            </div>
            <div class="block2">
              <el-form-item label="车辆类型">
                <ht-autoselect
                  v-model="carInfo.vehicleTypeId"
                  :options="vehicleTypeList"
                  :trigger-on-focus="false"
                  class="switch-focus focus-certType"
                  placeholder="请选择"
                  clearable
                  disabled
                  highlight-first-item
                />
              </el-form-item>
              <el-form-item label="车架号">
                <ht-input v-model="carInfo.vin" size="small" disabled />
              </el-form-item>
              <el-form-item label="品牌">
                <ht-input v-model="carInfo.vehBrand" size="small" disabled />
              </el-form-item>
              <el-form-item label="厂牌">
                <ht-input v-model="carInfo.facBrand" size="small" disabled />
              </el-form-item>
              <el-form-item label="车型组">
                <ht-input
                  v-model="carInfo.vehicleGroup"
                  size="small"
                  disabled
                />
              </el-form-item>
              <el-form-item label="年款">
                <ht-input v-model="carInfo.year" size="small" disabled />
              </el-form-item>
              <el-form-item label="排量 | 发动机">
                <ht-input
                  v-model="carInfo.displacementEngine"
                  size="small"
                  disabled
                />
              </el-form-item>
              <el-form-item label="年审月份">
                <ht-input v-model="carInfo.auditMonth" size="small" disabled>
                  <span slot="append">月</span>
                </ht-input>
              </el-form-item>
              <el-form-item prop="nextMaintenanceMileage" label="下次保养里程">
                <div style="display:flex;">
                  <ht-format-number
                    :disabled="!allowEdit"
                    v-model="form.nextMaintenanceMileage"
                    :min="0"
                    precision-type="money"
                  >
                    <span slot="append">km</span>
                  </ht-format-number>
                  <el-popover
                    placement="bottom-start"
                    title=""
                    width="100"
                    trigger="click"
                  >
                    <div class="mile">
                      <p @click="addMile(5000)">+5000km</p>
                      <p @click="addMile(7000)">+7000km</p>
                      <p @click="addMile(10000)">+10000km</p>
                      <p @click="addMile(15000)">+15000km</p>
                    </div>
                    <span
                      slot="reference"
                      style="display:inline-block;width:50px;text-align:center;color:#1696ff;"
                      >选择</span
                    >
                  </el-popover>
                </div>
              </el-form-item>
              <el-form-item prop="nextMaintenanceDate" label="下次保养日期">
                <el-date-picker
                  :disabled="!allowEdit"
                  v-model="form.nextMaintenanceDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item prop="insuranceCompanyId" label="工单保险公司">
                <ht-autoselect
                  :disabled="!allowEdit"
                  v-model="form.insuranceCompanyId"
                  remote
                  :fetch-suggestions="query => searchAllCooperatorsList(query)"
                  :default-value="form.insuranceCompanyName"
                  placeholder="保险公司"
                  filter-zero
                  :trigger-on-focus="false"
                  :maxlength="50"
                />
              </el-form-item>
              <el-form-item prop="insuranceNo" label="保险单号">
                <ht-input
                  :disabled="!allowEdit"
                  v-model="form.insuranceNo"
                  size="small"
                />
              </el-form-item>
              <el-form-item prop="insuranceDeductionRate" label="绝对免赔率">
                <HtFormatNumber
                  v-model="form.insuranceDeductionRateLabel"
                  placeHolder="绝对免赔率"
                  :min="0"
                  :max="100"
                  :disabled="!allowEdit"
                  precision-type="price"
                  @blur="qtyChange"
                  size="small"
                  ><span slot="append">%</span></HtFormatNumber
                >
              </el-form-item>
              <el-form-item prop="receptionMan" label="接待顾问">
                <ht-autocomplete
                  :disabled="!allowEdit"
                  v-model="receptionMan"
                  :fetch-suggestions="listAllReceptionMan()"
                  placeholder="请选择接待顾问"
                  :trigger-on-focus="false"
                  @select="receptionManChange"
                  :maxlength="50"
                  highlight-first-item
                />
              </el-form-item>
              <el-form-item v-if="form.flags">
                <el-checkbox :disabled="!allowEdit" v-model="wash"
                  >洗车</el-checkbox
                >
                <el-checkbox :disabled="!allowEdit" v-model="recovery"
                  >客户回收旧件</el-checkbox
                >
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <!-- 右侧信息 -->
      <div class="right">
        <OtherInfo v-if="this.otherInfo" :otherInfo="otherInfo" />
      </div>
    </div>
    <!-- 往来单位信息弹窗 -->
    <CommunionInformationBox
      :id="cooperatorId"
      :visible.sync="showCommunionInformationBox"
      @infoChange="handleCooperatorSave"
    />
    <!-- 车辆档案弹窗 -->
    <!--  工单详情里面没有customerName，暂时不显示头部 -->
    <FileEditor
      :visible="showFileEditor"
      :currentFile="carFile"
      :disableCusAndPlate="true"
      :showCooperator="false"
      @update="update"
      @close="showFileEditor = false"
    />
    <BookingList
      :visible="showBooking"
      :plateNumber="form.plateNumber"
      :bookingDataList="bookingDataList"
      @createNew="createBill"
      @transfer="transfer"
      @close="showBooking = false"
    />
    <repairOrderDialog
      :visible.sync="showOrderDialog"
      :abortSubmit="true"
      @sureHandle="sureHandle"
      :EditObj="thisRow"
      @transfer="updateLists"
    />
  </div>
</template>

<script>
import { listCarFile, getCarFileDetail } from "@/api/repairs";
import { createBills, updateBills, updateSnapshot } from "@/api/repairs/bills";
import { bookingsList } from "@/api/repairs/bookings";
import { PLATETYPE } from "../../const/options";
import { baseDictionary } from "@/api/base/base";
import { searchAllCooperators } from "@/api/communion/communion";
import CommunionInformationBox from "@/components/CommunionInformationBox";
import VehiclesSelect from "@/components/repair/VehiclesSelect.vue";
import FileEditor from "@/components/repair/carFile/fileEditor";
import OtherInfo from "./otherInfo/otherInfo";
import BookingList from "./bookingList/bookingList";
import { precisionsFixed } from "@/mixins";
import * as store from "@/utils/store";
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
import repairOrderDialog from "@/views/repair/customersBooking/repairOrderDialog";
export default {
  name: "CarInfo",
  props: {
    orderInfo: {
      type: Object,
      default: () => {}
    },
    editAble: {
      type: Boolean,
      default: false
    }
  },
  mixins: [precisionsFixed],
  watch: {
    orderInfo: {
      handler(value) {
        if (value) {
          this.isNew = false;
          const { vehicle, flags } = value;
          const { status, receptionManName, cooperatorName } = value;
          this.enableEdit = status == "recepting" || status == "repairing";
          if (vehicle) {
            this.carInfo = {
              ...vehicle,
              id: vehicle.vehicleId,
              customerName: cooperatorName
            };
            if (!this.carInfo.displacementEngine) {
              this.carInfo.displacementEngine = this.carInfo.displacement
                ? this.carInfo.displacement + "|" + this.carInfo.engine
                : "";
            }
            this.otherInfo = null;
            this.otherInfo = JSON.parse(
              JSON.stringify({
                vehicleId: vehicle.vehicleId,
                statistic: vehicle.statistic,
                member: vehicle.member,
                creditAmount: vehicle.creditAmount,
                usedCreditAmount: vehicle.usedCreditAmount,
                insuranceCompanyName: vehicle.insuranceCompanyName,
                insuranceExpiry: vehicle.insuranceExpiry,
                deductionRate: vehicle.deductionRate
              })
            );
            this.$forceUpdate();
          } else {
            this.otherInfo = null;
            this.carInfo = {
              plateNumber: ""
            };
          }
          if (flags) {
            const { recovery, wash } = flags;
            this.wash = wash;
            this.recovery = recovery;
          }
          this.form = {
            ...value,
            customerName: cooperatorName,
            insuranceDeductionRateLabel: value.insuranceDeductionRate
              ? Number(value.insuranceDeductionRate * 100).toFixed(2)
              : null
          };
          if (receptionManName) {
            this.receptionMan = receptionManName;
          } else {
            this.initDefaultReception();
          }
          this.form.vehicleId = vehicle ? vehicle.plateNumber : null;
          // console.log("this.orderInfo", this.orderInfo);
          // console.log("value", value);
          this.disablePlateNumber = this.orderInfo.id ? true : false;
          // console.log("this.disablePlateNumber", this.disablePlateNumber);
          this.$refs.form?.clearValidate();
        } else {
          this.isNew = true;
          this.otherInfo = {};
          this.wash = false;
          this.recovery = false;
          this.disablePlateNumber = false;
          this.$forceUpdate();
        }
      },
      deep: true
    },
    "form.receptionMan": {
      handler() {},
      deep: true
    }
  },
  data() {
    return {
      isNew: false,
      carFile: {},
      wash: false,
      recovery: false,
      otherInfo: {},
      thisRow: {},
      bookingDataList: [],
      showOrderDialog: false,
      receptionMan: "",
      showBooking: false,
      disablePlateNumber: false,
      enableEdit: false,
      cooperatorId: null,
      plateTypes: PLATETYPE,
      showCommunionInformationBox: false,
      showFileEditor: false,
      repairBusinessCategoryList: [],
      vehicleLevelList: [],
      vehicleTypeList: [],
      oilDegreeOptions: [
        {
          id: "空",
          name: "空"
        },
        {
          id: "小于1/4",
          name: "小于1/4"
        },
        {
          id: "1/4",
          name: "1/4"
        },
        {
          id: "1/2",
          name: "1/2"
        },
        {
          id: "3/4",
          name: "3/4"
        },
        {
          id: "满",
          name: "满"
        }
      ],
      options: [],
      carInfo: {
        plateNumberPrefix: 18
      },
      form: {},
      rules: {
        businessCategoryId: [
          { required: true, message: "请选择业务类型", trigger: "blur" }
        ],
        plateNumber: [
          { required: true, message: "请选择车牌号", trigger: "blur" }
        ],
        vehicleLevelId: [
          { required: true, message: "请选择车牌号", trigger: "blur" }
        ],
        cooperatorName: [
          { required: true, message: "请输入客户姓名", trigger: "blur" }
        ],
        mileage: [
          { required: true, message: "请输入进厂里程", trigger: "blur" }
        ],
        oilDegree: [
          { required: true, message: "请输入存油量", trigger: "blur" }
        ],
        receptionTime: [
          { required: true, message: "请选择接待时间", trigger: "blur" }
        ],
        contactsName: [
          { required: true, message: "请输入送修人姓名", trigger: "blur" }
        ],
        contactsPhone: [
          { required: true, message: "请输入送修人电话", trigger: "blur" }
        ],
        receptionMan: [
          { required: true, message: "请输入接待顾问", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    CommunionInformationBox,
    VehiclesSelect,
    FileEditor,
    OtherInfo,
    BookingList,
    repairOrderDialog
  },
  computed: {
    allowEdit() {
      return (
        this.hasBelongsPerm("update", ["self", "others"]) ||
        this.hasBelongsPerm("create")
      );
    },
    showSave() {
      return this.editAble || this.hasBelongsPerm("create");
    }
  },
  mounted() {
    if (this.orderInfo) {
      this.isNew = false;
      const { vehicle, cooperatorName, flags } = this.orderInfo;
      if (vehicle) {
        this.carInfo = {
          ...vehicle,
          customerName: cooperatorName
        };
        if (!this.carInfo.displacementEngine) {
          this.carInfo.displacementEngine = this.carInfo.displacement
            ? this.carInfo.displacement + "|" + this.carInfo.engine
            : "";
        }
        this.otherInfo = {
          vehicleId: vehicle.vehicleId,
          statistic: vehicle.statistic,
          member: vehicle.member,
          creditAmount: vehicle.creditAmount,
          usedCreditAmount: vehicle.usedCreditAmount,
          insuranceCompanyName: vehicle.insuranceCompanyName,
          insuranceExpiry: vehicle.insuranceExpiry,
          deductionRate: vehicle.deductionRate
        };
      } else {
        this.otherInfo = null;
      }
      if (flags) {
        const { recovery, wash } = flags;
        this.wash = wash;
        this.recovery = recovery;
      }
      this.form = {
        ...this.orderInfo,
        customerName: cooperatorName,
        insuranceDeductionRateLabel: this.orderInfo.insuranceDeductionRate
          ? Number(this.orderInfo.insuranceDeductionRate * 100).toFixed(2)
          : null
      };
      const { status, receptionManName } = this.orderInfo;
      if (receptionManName) {
        this.receptionMan = receptionManName;
      } else {
        this.initDefaultReception();
      }
      this.enableEdit = status == "recepting" || status == "repairing";
      // console.log("客户/车辆信息组件获取到工单信息", this.form);
      console.log("this.orderInfo", this.orderInfo);
      this.disablePlateNumber = this.orderInfo.id ? true : false;
      console.log("this.disablePlateNumber", this.disablePlateNumber);
      this.form.vehicleId = vehicle ? vehicle.plateNumber : null;
    } else {
      this.isNew = true;
      this.otherInfo = {};
      this.wash = false;
      this.recovery = false;
      this.disablePlateNumber = false;
      this.$forceUpdate();
    }
    this.initVehicelLevelAndType();
  },
  methods: {
    editCarFile() {
      const { vehicleId } = this.carInfo;
      getCarFileDetail({ id: vehicleId }).then(res => {
        this.carFile = { ...res };
        this.showFileEditor = true;
      });
    },
    clearValidate() {
      this.form.plateNumber = " ";
      setTimeout(() => {
        this.$refs.form?.clearValidate();
      });
    },
    resetPlateNumber() {
      this.form.plateNumber = "";
    },
    listAllReceptionMan() {
      const { receptionMan } = this;
      const params = {
        company: this.isNew ? "self" : this.orderInfo.companyId,
        name: receptionMan,
        roles: ["systemAdmin", "receptionConsultant"]
      };
      return (query, callback) => {
        searchTypeStaffs(params).then(res => {
          const data = res || [];
          callback(data.map(item => ({ id: item.id, value: item.name })));
        });
      };
    },
    initDefaultReception() {
      console.log(store);
      console.log(store.userInfoMsg());
      const builtinRoles = store.userInfoMsg().builtinRoles;
      console.log("内置角色", builtinRoles);
      let containRole = false;
      if (builtinRoles && builtinRoles.length > 0) {
        builtinRoles.forEach(role => {
          if (["systemAdmin", "receptionConsultant"].indexOf(role) > -1) {
            containRole = true;
          }
        });
      }
      console.log("是否是管理员或接待顾问？", containRole);
      if (!containRole) return;
      this.form.receptionMan = store.userInfoMsg().staffId;
      this.receptionMan = store.userInfoMsg().staffName;
      console.log(this.form);
    },
    receptionManChange(e) {
      console.log(e);
      this.form.receptionMan = e.id;
      this.$forceUpdate();
    },
    async searchAllCooperatorsList(query) {
      const res = await searchAllCooperators({
        type: "insuranceCompany",
        allcoop: false,
        keyword: query
      });
      return res || [];
    },
    qtyChange() {
      this.form.insuranceDeductionRate = this.form.insuranceDeductionRateLabel
        ? Number(this.form.insuranceDeductionRateLabel / 100).toFixed(4)
        : null;
    },
    listCarFileAsync() {
      return (query, callback) => {
        listCarFile({
          plateNumber: this.carInfo.plateNumber,
          page: 1,
          pageSize: 999
        }).then(res => {
          const data = res.rows || [];
          callback(data.map(item => ({ ...item, value: item.plateNumber })));
        });
      };
    },
    initVehicelLevelAndType() {
      baseDictionary({ type: "vehicleLevel" }).then(res => {
        this.vehicleLevelList = res.options;
        this.$nextTick(() => {
          this.$refs.form?.clearValidate();
        });
      });
      baseDictionary({ type: "vehicleType" }).then(res => {
        this.vehicleTypeList = res.options;
        this.$nextTick(() => {
          this.$refs.form?.clearValidate();
        });
      });
      baseDictionary({ type: "repairBusinessCategory" }).then(res => {
        this.repairBusinessCategoryList = res.options;
        this.$nextTick(() => {
          this.$refs.form?.clearValidate();
        });
      });
    },
    handleCooperatorSave(e) {
      console.log(e);
      const { name, phone } = e;
      const msg = this.cooperatorId ? "更新成功！" : "新增成功！";
      this.$message.success({ message: msg, showClose: true });
      this.carInfo = {
        ...this.carInfo,
        cooperatorName: name,
        cooperatorPhone: phone
      };
    },
    update(e) {
      console.log("新的车辆档案", e);
      this.carInfo = { ...this.carInfo, ...e };
      this.showFileEditor = false;
      updateSnapshot({ id: this.form.id }).then(() => {
        // 更新数据
      });
    },
    carFileChange(e) {
      console.log(e);
      if (!e) return;
      const {
        customerName,
        customerPhone,
        plateNumber,
        vehicleLevelId,
        id
      } = e;
      this.form.cooperatorName = customerName;
      this.form.cooperatorPhone = customerPhone;

      this.form.contactsName = customerName;
      this.form.contactsPhone = customerPhone;

      this.form.plateNumber = plateNumber;
      this.form.vehicleLevelId = vehicleLevelId;

      this.carInfo = {
        ...e,
        cooperatorName: customerName,
        cooperatorPhone: customerPhone
      };
      if (!this.carInfo.displacementEngine) {
        this.carInfo.displacementEngine = this.carInfo.displacement
          ? this.carInfo.displacement + "|" + this.carInfo.engine
          : "";
      }
      this.form.displacement = this.carInfo.displacement;
      this.form.engine = this.carInfo.engine;
      this.$nextTick(() => {
        this.$refs.form?.clearValidate();
        this.checkCustomerBooking(id);
      });
    },
    addMile(miles) {
      this.form.nextMaintenanceMileage = this.form.mileage
        ? parseInt(this.form.mileage) + parseInt(miles)
        : parseInt(miles);
    },
    editCooperatorInfo() {
      const { cooperatorId } = this.orderInfo;
      if (!cooperatorId) return;
      this.cooperatorId = cooperatorId;
      this.showCommunionInformationBox = true;
    },
    handleSubmit() {
      // 绑定当前选择的车辆档案
      console.log(this.carInfo);
      const { recovery, wash } = this;
      this.form.vehicleId = this.carInfo.id;
      console.log(this.form);
      this.$refs.form.validate((valid, err) => {
        if (valid) {
          if (this.form.id) {
            updateBills({
              ...this.form,
              flags: {
                ...this.form.flags,
                recovery,
                wash
              }
            }).then(() => {
              this.$message.success("保存成功！");
              this.$emit("addComplete", this.form);
            });
          } else {
            createBills({
              ...this.form,
              nextMaintenanceMileage: this.form.nextMaintenanceMileage
                ? this.form.nextMaintenanceMileage
                : null,
              insuranceDeductionRate: this.form.insuranceDeductionRate
                ? this.form.insuranceDeductionRate
                : null,
              flags: {
                recovery,
                wash
              }
            }).then(res => {
              this.$message.success("新增成功！");
              this.$emit("addComplete", res);
            });
          }
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          if (errTips == "请选择车牌号") {
            this.$nextTick(() => {
              this.$refs.form?.clearValidate();
            });
            if (this.form.id) {
              updateBills({
                ...this.form,
                nextMaintenanceMileage: this.form.nextMaintenanceMileage
                  ? this.form.nextMaintenanceMileage
                  : null,
                flags: {
                  ...this.form.flags,
                  recovery,
                  wash
                }
              }).then(() => {
                this.$message.success("保存成功！");
                this.$emit("addComplete", this.form);
              });
            } else {
              createBills({
                ...this.form,
                nextMaintenanceMileage: this.form.nextMaintenanceMileage
                  ? this.form.nextMaintenanceMileage
                  : null,
                insuranceDeductionRate: this.form.insuranceDeductionRate
                  ? this.form.insuranceDeductionRate
                  : null,
                flags: {
                  recovery,
                  wash
                }
              }).then(res => {
                this.$message.success("新增成功！");
                this.$emit("addComplete", res);
              });
            }
          } else {
            this.$message.warning({ message: errTips, showClose: true });
          }
        }
      });
    },
    checkCustomerBooking(vehicleId) {
      console.log("检测是否有预约单");
      bookingsList({
        vehicleId,
        status: ["超时未到", "未到店"],
        page: 1,
        pageSize: 999
      }).then(res => {
        const { rows, totalSize } = res;
        if (totalSize == 0) {
          console.log("此车辆无预约单");
          this.createBill();
        } else {
          console.log("此车辆有预约单");
          this.showBooking = true;
          this.bookingDataList = rows || [];
        }
      });
    },
    createBill() {
      this.showBooking = false;
    },
    sureHandle(info) {
      this.showBooking = false;
      this.showOrderDialog = false;
      const {
        contactsName,
        contactsPhone,
        customerName,
        customerPhone,
        plateNumber,
        receptionMan,
        receptionManName,
        id,
        mileage,
        oilDegree,
        receptionTime,
        businessCategoryId
      } = info;
      this.receptionMan = receptionManName;
      this.form = {
        ...this.form,
        bookingId: id,
        mileage,
        oilDegree,
        receptionTime,
        contactsName,
        contactsPhone,
        receptionMan,
        businessCategoryId
      };
      this.carInfo = {
        ...this.carInfo,
        customerName,
        customerPhone,
        plateNumber
      };
    },
    transfer(order) {
      const { mileage, oilDegree } = this.form;
      this.showBooking = false;
      this.thisRow = { ...order, mileage, oilDegree };
      this.showOrderDialog = true;
    },
    updateLists(e) {
      console.log(e);
      this.showOrderDialog = false;
      this.$emit("addComplete", e);
    }
  }
};
</script>

<style lang="scss" scoped>
.carInfo-wrap {
  display: flex;
  flex-direction: column;
  flex: auto;
  height: 1px;
  width: auto;
  overflow: hidden;
}
.content-wrap {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  flex: auto;
  height: 1px;
  width: auto;
  overflow: hidden;
  background: #fff;
  .left {
    width: 70%;
    overflow-y: scroll;
  }
  .right {
    overflow-y: scroll;
  }
}
.form-wrap {
  display: flex;
  justify-content: space-between;
  overflow-y: scroll;
  ::v-deep {
    .el-form-item {
      margin-bottom: 12px;
    }
  }
  .block1 {
    width: 350px;
    margin-right: 10px;
  }
  .block2 {
    width: 350px;
    margin-right: 10px;
  }
}
.btns {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  background: #fff;
  margin-bottom: 10px 0;
  padding: 5px;
  border-radius: 2px;
  border-bottom: solid 1px #eee;
}
.mile {
  width: 120px;
  p {
    width: 120px;
    cursor: pointer;
  }
  p:hover {
    color: #1696ff;
  }
}
</style>
