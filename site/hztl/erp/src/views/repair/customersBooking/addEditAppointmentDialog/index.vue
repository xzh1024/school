<template>
  <ht-dialog
    :title="title"
    v-bind="$attrs"
    width="680px"
    top="10vh"
    @close="cancelHandle"
  >
    <div>
      <div class="dialog-priority-content">
        <el-form
          class="dialig-form"
          ref="form"
          :rules="rules"
          :model="dialigForm"
          label-width="120px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="车牌号" prop="plateNumber">
                <VehiclesSelect
                  size="small"
                  v-model="dialigForm.plateNumber"
                  :cooperatorInfo="carInfo"
                  @change="carFileChange"
                  class="car"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车辆品牌">
                <el-input
                  v-model="carInfo.vehBrand"
                  size="small"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="预约人" prop="contactsName">
                <el-input
                  v-model="dialigForm.contactsName"
                  placeholder="请输入预约人姓名"
                  size="small"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车辆厂牌">
                <el-input
                  v-model="carInfo.facBrand"
                  size="small"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="预约人电话" prop="contactsPhone">
                <el-input
                  v-model="dialigForm.contactsPhone"
                  placeholder="请输入预约人电话"
                  size="small"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车型组">
                <el-input
                  v-model="carInfo.vehicleGroup"
                  size="small"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="预约业务类型" prop="typeId">
                <el-select
                  clearable
                  v-model="dialigForm.typeId"
                  size="small"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in repairBusinessCategoryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年款">
                <el-input
                  v-model="carInfo.year"
                  size="small"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="预约到店日期" prop="arrivalDate">
                <el-date-picker
                  class="arrival-date"
                  v-model="dialigForm.arrivalDate"
                  :clearable="false"
                  type="date"
                  size="small"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                  @change="dateChange"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排量|发动机">
                <el-input
                  v-model="carInfo.displacementEngine"
                  size="small"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="预约到店时间" prop="time">
                <el-select
                  clearable
                  v-model="dialigForm.time"
                  size="small"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in dateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="变速箱">
                <el-input
                  v-model="carInfo.transmission"
                  size="small"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="接待员">
                <el-select
                  clearable
                  filterable
                  v-model="dialigForm.receptionistId"
                  size="small"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in userOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注">
                <el-input
                  placeholder="请输入备注内容"
                  v-model="dialigForm.remark"
                  size="small"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer-align">
        <el-button type="primary" size="mini" @click="savetHandle">
          确定（F3）
        </el-button>
        <el-button type="primary" size="mini" plain @click="cancelHandle">
          取消（Esc）
        </el-button>
      </div>
    </div>
  </ht-dialog>
</template>
<script>
import { userInfoMsg } from "@/utils/store";
import { listCarFile } from "@/api/repairs"; // 车辆信息
import { baseDictionary } from "@/api/base/base"; // 基础信息
import VehiclesSelect from "@/components/repair/VehiclesSelect.vue"; // 车牌号
import {
  getBookingsSettings,
  bookingsCreate,
  bookingsUpdate
} from "@/api/repairs/bookings";
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
import { dateFormat } from "@/utils/date";
import { validatePhone } from "@/utils/validate";

export default {
  name: "addEditAppointmentDialog",
  components: {
    VehiclesSelect
  },
  props: {
    EditObj: {
      type: Object
    },
    defaultData: {
      type: Object
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          setTimeout(() => {
            this.getBaseDictionarys();
            this.getSetting();
            this.getUsers();
            if (this.EditObj && this.EditObj.id) {
              this.editHandle();
              this.title = "修改预约";
            } else {
              this.title = "新增预约";
            }
            if (this.defaultData) {
              // 看板添加 写入默认信息
              if (this.defaultData.date) {
                this.$set(
                  this.dialigForm,
                  "arrivalDate",
                  this.defaultData.date
                );
              }
              if (this.defaultData.time) {
                const times = this.defaultData.time.split("-");
                const json = {
                  label: times[0].substr(0, 5) + "-" + times[1].substr(0, 5),
                  value: times[0] + "-" + times[1],
                  startTime: times[0],
                  endTime: times[1]
                };
                this.$set(this.dialigForm, "time", json);
              }
            }
            this.$refs.form.clearValidate();
          }, 100);
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      title: "新增预约",
      carInfo: {}, // 车辆信息
      setting: {}, // 设置信息
      dateOptions: [], // 时段选择
      userOptions: [], // 接待用户
      repairBusinessCategoryList: [], // 预约项目类型
      dialigForm: {}, // 弹窗表单
      pickerOptions: {
        // 日期区间判断
        disabledDate: time => {
          const date = new Date();
          const d1 = date.getTime() - 24 * 60 * 60 * 1000;
          const d2 = d1 + parseInt(this.setting.preDay) * 24 * 60 * 60 * 1000;
          return time.getTime() < d1 || time.getTime() > d2;
        }
      },
      rules: {
        plateNumber: [
          {
            required: true,
            message: "请选择车牌号！"
          }
        ],
        contactsName: [
          {
            required: true,
            message: "请输入客户姓名！"
          }
        ],
        contactsPhone: [
          {
            required: true,
            message: "请输入客户电话！"
          },
          {
            max: 11,
            message: "手机号最长11位！"
          }
        ],
        typeId: [
          {
            required: true,
            message: "请选择项目预约类型！"
          }
        ],
        arrivalDate: [
          {
            required: true,
            message: "请选择到店日期！",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            message: "请选择到店时间！"
          }
        ]
      }
    };
  },
  methods: {
    // 获取基础字典信息
    getBaseDictionarys() {
      baseDictionary({ type: "repairBusinessCategory" }).then(res => {
        this.repairBusinessCategoryList = res.options;
      });
    },
    // 获取预约设置信息
    getSetting() {
      const params = {
        module: "repair",
        type: "bookingSet"
      };
      getBookingsSettings(params).then(res => {
        this.setting = res.value;
        this.dateOptions = [];
        if (this.setting.enableTime) {
          if (this.setting.timeSets.length > 0) {
            this.setting.timeSets.forEach(item => {
              this.dateOptions.push({
                label:
                  item.startTime.substr(0, 5) + "-" + item.endTime.substr(0, 5),
                value: item.startTime + "-" + item.endTime,
                startTime: item.startTime,
                endTime: item.endTime
              });
            });
          }
        }
        this.dateOptions.push({
          label: "全天",
          value: "00:00:00-23:59:00",
          startTime: "00:00:00",
          endTime: "23:59:00"
        });
        // 默认数据选中
        if (!this.defaultData) {
          if (!this.EditObj || !this.EditObj.id) {
            // const json = {
            //   label: "全天",
            //   value: "00:00:00-23:59:00",
            //   startTime: "00:00:00",
            //   endTime: "23:59:00"
            // };
            if (parseInt(this.setting.preDay) > 0) {
              const date = new Date();
              // 默认当前日期
              this.$set(this.dialigForm, "arrivalDate", dateFormat(date));
              if (this.dateOptions) {
                for (let i = 0; i < this.dateOptions.length; i++) {
                  const item = this.dateOptions[i];
                  if (
                    this.timeRange(
                      item.startTime.substr(0, 5),
                      item.endTime.substr(0, 5)
                    )
                  ) {
                    this.$set(this.dialigForm, "time", item);
                    break;
                  }
                }
              }
            }
          }
        }
      });
    },
    // 日期切换
    dateChange() {
      if (parseInt(this.setting.preDay) > 0) {
        const date = new Date();
        if (this.dialigForm.arrivalDate == dateFormat(date)) {
          if (this.dateOptions) {
            for (let i = 0; i < this.dateOptions.length; i++) {
              const item = this.dateOptions[i];
              if (
                this.timeRange(
                  item.startTime.substr(0, 5),
                  item.endTime.substr(0, 5)
                )
              ) {
                this.$set(this.dialigForm, "time", item);
                break;
              }
            }
          }
        } else {
          const json = this.dateOptions ? this.dateOptions[0] : "";
          this.$set(this.dialigForm, "time", json);
        }
      }
    },
    timeRange(beginTime, endTime) {
      const strb = beginTime.split(":");
      if (strb.length != 2) {
        return false;
      }
      const stre = endTime.split(":");
      if (stre.length != 2) {
        return false;
      }
      const b = new Date();
      const e = new Date();
      const n = new Date();
      b.setHours(strb[0]);
      b.setMinutes(strb[1]);
      e.setHours(stre[0]);
      e.setMinutes(stre[1]);
      if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
        console.log(true);
        return true;
      } else {
        console.log(false);
        return false;
      }
    },
    // 获取用户信息
    getUsers() {
      const params = {
        roles: ["systemAdmin", "companyAdmin", "receptionConsultant"]
      };
      searchTypeStaffs(params).then(res => {
        this.userOptions = res;
        this.userOptions.forEach(item => {
          if (item.id == userInfoMsg().staffId) {
            this.$set(this.dialigForm, "receptionistId", item.id);
          }
        });
      });
    },
    // 获取车辆信息
    listCarFileAsync() {
      return (query, callback) => {
        listCarFile({
          plateNumber: this.dialigForm.plateNumber,
          page: 1,
          pageSize: 999
        }).then(res => {
          const data = res.rows || [];
          callback(data.map(item => ({ ...item, value: item.plateNumber })));
        });
      };
    },
    // 写入车辆信息
    carFileChange(e) {
      if (!e) return;
      const { customerName, ownerPhone } = e;
      this.$set(this.dialigForm, "vehicleId", e.id); // 车辆档案Id
      this.$set(this.dialigForm, "contactsName", customerName); // 预约人姓名
      this.$set(this.dialigForm, "contactsPhone", ownerPhone); // 预约人电话
      this.carInfo = {
        ...this.carInfo,
        ...e
      };
      this.carInfo.displacementEngine = this.carInfo.displacement
        ? this.carInfo.displacement + "|" + this.carInfo.engine
        : "";
    },
    // 关闭弹窗
    cancelHandle() {
      this.$emit("update:visible", false);
      this.resetForm();
      this.$refs.form.clearValidate();
    },
    // 重置信息
    resetForm() {
      this.carInfo = {};
      this.dialigForm = {};
      this.getBaseDictionarys();
      // this.getSetting();
      this.getUsers();
    },
    // 修改信息
    editHandle() {
      this.dialigForm = {};
      // eslint-disable-next-line prettier/prettier
      const {
        plateNumber,
        contactsName,
        contactsPhone,
        typeId,
        arrivalDate,
        receptionistId,
        remark
      } = this.EditObj;
      const time = {
        // eslint-disable-next-line prettier/prettier
        label:
          this.EditObj.startTime.substr(0, 5) +
          "-" +
          this.EditObj.endTime.substr(0, 5),
        value: this.EditObj.startTime + "-" + this.EditObj.endTime,
        startTime: this.EditObj.startTime,
        endTime: this.EditObj.endTime
      };
      this.$set(this.dialigForm, "plateNumber", plateNumber);
      this.$set(this.dialigForm, "contactsName", contactsName);
      this.$set(this.dialigForm, "contactsPhone", contactsPhone);
      this.$set(this.dialigForm, "typeId", typeId);
      this.$set(this.dialigForm, "arrivalDate", arrivalDate);
      this.$set(this.dialigForm, "receptionistId", receptionistId);
      this.$set(this.dialigForm, "remark", remark);
      this.$set(this.dialigForm, "time", time);
      this.$nextTick(() => {
        listCarFile({
          plateNumber: this.dialigForm.plateNumber,
          page: 1,
          pageSize: 999
        }).then(res => {
          const data = res.rows || [];
          data.map(item => ({ ...item, value: item.plateNumber }));
          this.carInfo = {
            ...this.carInfo,
            ...data[0]
          };
          this.carInfo.displacementEngine = this.carInfo.displacement
            ? this.carInfo.displacement + "|" + this.carInfo.engine
            : "";
          this.$set(this.dialigForm, "vehicleId", this.carInfo.id);
        });
      }, 100);
    },
    // 提交预约
    savetHandle() {
      this.$refs["form"].validate((valid, err) => {
        if (!valid) {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          if (
            this.dialigForm.contactsPhone &&
            this.dialigForm.contactsPhone.length <= 11 &&
            validatePhone(this.dialigForm.contactsPhone)
          ) {
            // 时间转换
            if (this.dialigForm.time) {
              this.dialigForm.startTime = this.dialigForm.time.startTime;
              this.dialigForm.endTime = this.dialigForm.time.endTime;
            }
            // 备注
            this.dialigForm.remark = this.dialigForm.remark
              ? this.dialigForm.remark
              : "";
            // 是否新客户
            this.dialigForm.newCustomer = false;
            if (this.EditObj && this.EditObj.id) {
              // 编辑
              this.dialigForm.id = this.EditObj.id;
              bookingsUpdate(this.dialigForm).then(() => {
                this.cancelHandle();
                this.$message({
                  message: "修改成功！",
                  type: "success"
                });
                this.$emit("updateList", 2);
              });
            } else {
              // 新增
              bookingsCreate(this.dialigForm).then(() => {
                this.cancelHandle();
                this.$message({
                  message: "预约成功！",
                  type: "success"
                });
                this.$emit("updateList", 1);
              });
            }
          } else {
            this.$message({
              message: "请输入正确手机号码",
              type: "warning"
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep {
  .dialog-priority-content {
    .dialig-form {
      .el-form-item {
        margin-bottom: 12px;
        .el-form-item__error {
          padding-top: 0;
        }
      }
    }
  }
  .dialog-footer-align {
    margin-top: 20px;
  }
  .arrival-date {
    .el-input__prefix {
      left: auto;
      right: 5px;
    }
    .el-input__inner {
      padding-left: 15px !important;
    }
  }
}
</style>
