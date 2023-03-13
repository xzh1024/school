<template>
  <div
    class="wrap flex-container column-flex"
    style="min-width: 780px"
    v-loading="loading"
  >
    <div class="btns" style="display: block">
      <el-button
        type="primary"
        size="small"
        @click="savaWash"
        :disabled="washForm.status == '已完成'"
        v-if="
          hasBelongsPermWithoutRoute(
            'update',
            'repairs.washing.bill',
            orderInfo.belongs
          )
        "
      >
        保存（F3）
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="washStarts"
        :disabled="washForm.status != '待清洗'"
        v-if="
          hasBelongsPermWithoutRoute(
            'start',
            'repairs.washing.bill',
            orderInfo.belongs
          )
        "
      >
        开始洗车（F9）
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="washDeletes"
        :disabled="!washForm.id || washForm.status == '已完成'"
        v-if="
          hasBelongsPermWithoutRoute(
            'delete',
            'repairs.washing.bill',
            orderInfo.belongs
          )
        "
      >
        删除（F4）
      </el-button>
      <el-button
        type="primary"
        size="small"
        :disabled="washForm.status != '待结算'"
        v-if="
          hasBelongsPermWithoutRoute(
            'settle',
            'repairs.washing.bill',
            orderInfo.belongs
          )
        "
        @click="settleHandle"
      >
        结算（F7）
      </el-button>
      <el-button
        type="primary"
        :disabled="!orderInfo.billNo || washForm.status == '已完成'"
        size="small"
        @click="editCooperatorInfo"
        v-if="
          hasBelongsPermWithoutRoute(
            'update',
            'repairs.washing.bill',
            orderInfo.belongs
          )
        "
      >
        编辑客户信息
      </el-button>
      <el-button
        type="primary"
        :disabled="!orderInfo.billNo || washForm.status == '已完成'"
        size="small"
        @click="showFileEditor = true"
        v-if="
          hasBelongsPermWithoutRoute(
            'update',
            'repairs.washing.bill',
            orderInfo.belongs
          )
        "
      >
        编辑车辆档案
      </el-button>
      <span
        v-if="orderInfo.customerPaid"
        style="float:right;margin-right: 5px;color: #00b373; height:32px;line-height: 32px;"
      >
        <i
          class="el-icon-success"
          style="position: relative; top:2px;font-size: 20px"
        ></i>
        客户已支付
      </span>
    </div>
    <div class="info-group">
      <span class="item">
        <span class="item-label">车牌号:</span>
        <span class="item-value">
          {{ washForm.plateNumber || "-" }}
        </span>
      </span>
      <span class="item">
        <span class="item-label">洗车单号:</span>
        <span class="item-value">
          {{ orderInfo.billNo || "-" }}
        </span>
      </span>
      <span class="item">
        <span class="item-label">类型:</span>
        <span class="item-value">
          {{ orderInfo.type || "-" }}
        </span>
      </span>
      <span class="item">
        <span class="item-label">状态:</span>
        <span class="item-value">
          {{ washForm.status || "-" }}
        </span>
      </span>
    </div>
    <div class="detail-wrap auto-block">
      <el-row :gutter="10">
        <el-col :span="8">
          <ht-card class="auto-card wash-car-msg" title="洗车单信息" padding>
            <el-form
              class="wash-form"
              ref="form"
              :rules="rules"
              :model="washForm"
              label-width="70px"
            >
              <el-form-item label="车牌号" prop="plateNumber">
                <VehiclesSelect
                  :disabled="disablePlateNumber"
                  v-model="washForm.plateNumber"
                  :cooperatorInfo="carInfo"
                  @change="carFileChange"
                  class="car"
                />
              </el-form-item>
              <el-form-item label="客户姓名">
                <el-input
                  v-model="washForm.customerName"
                  size="small"
                  :disabled="true"
                />
              </el-form-item>
              <el-form-item label="客户电话">
                <el-input
                  v-model="washForm.customerPhone"
                  size="small"
                  :disabled="true"
                />
              </el-form-item>
              <el-form-item label="接待顾问" prop="receptionMan">
                <!-- <ht-select
                  filterable
                  :disabled="washForm.status == '已完成'"
                  v-model="washForm.receptionMan"
                  :options="userOptions"
                  :trigger-on-focus="false"
                  class="switch-focus focus-number"
                  placeholder="接待顾问"
                  size="small"
                /> -->
                <el-select
                  filterable
                  clearable
                  remote
                  reserve-keyword
                  v-model="washForm.receptionMan"
                  size="small"
                  placeholder="请输入接待顾问名称"
                  :remote-method="remoteMethod"
                  :loading="manLoading"
                  :disabled="washForm.status == '已完成'"
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
              <el-form-item label="接待时间" prop="receptionTime">
                <el-date-picker
                  :disabled="washForm.status == '已完成'"
                  v-model="washForm.receptionTime"
                  type="datetime"
                  placeholder="请选择接待时间"
                  size="small"
                  value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="送洗人">
                <el-input
                  :disabled="washForm.status == '已完成'"
                  v-model="washForm.contactsName"
                  placeholder="请输入送洗人名称"
                  size="small"
                />
              </el-form-item>
              <el-form-item label="送洗人电话">
                <el-input
                  :disabled="washForm.status == '已完成'"
                  v-model="washForm.contactsPhone"
                  placeholder="请输入送洗人电话"
                  size="small"
                />
              </el-form-item>
              <el-form-item label="车辆类型">
                <el-input
                  v-model="carInfo.vehicleTypeName"
                  size="small"
                  :disabled="true"
                />
              </el-form-item>
              <el-form-item label="车辆级别">
                <el-input
                  v-model="carInfo.vehicleLevelName"
                  size="small"
                  :disabled="true"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  :disabled="washForm.status == '已完成'"
                  v-model="washForm.remark"
                  placeholder="请输入备注"
                  size="small"
                />
              </el-form-item>
              <el-form-item label="洗车金额">
                <el-radio
                  slot="label"
                  :disabled="washForm.status == '已完成'"
                  v-model="radio"
                  label="1"
                >
                  洗车金额
                </el-radio>
                <ht-format-number
                  v-model="washForm.amount"
                  :disabled="washForm.status == '已完成'"
                  size="small"
                  precision-type="money"
                />
                <!-- <el-input-number
                  :disabled="washForm.status == '已完成'"
                  v-model="washForm.amount"
                  placeholder="请输入洗车金额"
                  size="small"
                  :precision="2"
                  :controls="false"
                  style="width: 100%;"
                >
                </el-input-number> -->
              </el-form-item>
              <el-form-item>
                <el-radio
                  slot="label"
                  :disabled="
                    this.discountList.length == 0 || washForm.status == '已完成'
                  "
                  v-model="radio"
                  label="2"
                >
                  其它抵扣
                </el-radio>
                <el-select
                  v-if="washForm.status != '已完成'"
                  :disabled="radio == 1"
                  v-model="washForm.goodsId"
                  placeholder="请选择"
                  size="small"
                  style="width: calc(100% - 65px)"
                  @change="discountChange"
                >
                  <el-option
                    v-for="item in discountList"
                    :key="item.goodsId"
                    :label="item.name"
                    :value="item.goodsId"
                  >
                  </el-option>
                </el-select>
                <span
                  v-if="washForm.status != '已完成'"
                  style="display:inline-block;width:65px;height:32px;line-height:32px;color:#909399;font-size: 12px;padding-left:5px"
                  >剩余：{{ count }}</span
                >
                <span
                  v-if="washForm.status == '已完成'"
                  style="display:inline-block;width:100%;height:32px;line-height:32px;color:#909399;font-size: 12px;padding-left:5px"
                >
                  <span v-if="radio == '2'">
                    {{ washForm.sourceName }}
                  </span>
                  <span v-if="radio == '1'">无</span>
                </span>
              </el-form-item>
              <el-form-item label="发票类型">
                <ht-select
                  filterable
                  :disabled="washForm.status == '已完成'"
                  v-model="washForm.invoiceType"
                  :options="store().formatInvoiceTypeDictionary()"
                  :trigger-on-focus="false"
                  class="switch-focus focus-number"
                  placeholder="发票类型"
                  size="small"
                />
              </el-form-item>
              <el-form-item label="发票号">
                <ht-input
                  :disabled="washForm.status == '已完成'"
                  v-model="washForm.invoiceNumber"
                  size="small"
                  placeholder="发票号"
                />
              </el-form-item>
            </el-form>
          </ht-card>
        </el-col>
        <el-col :span="8">
          <ht-card class="auto-card" title="分配洗车工" padding>
            <p style="margin: 0 0 10px">选择洗车工</p>
            <ht-setting-table
              :class="
                washForm.status == '已完成'
                  ? 'employees-list employees-list-over'
                  : 'employees-list'
              "
              table-name="employees-list"
              :data="employeesData"
              selectionType="multiple"
              :selectable="selectable"
              @selectChange="handleSelectionChange"
              :selected-rows.sync="selectedRows"
              :columns="employeesColumns"
              style="height: calc(50% - 30px)"
            />
            <p style="margin: 10px 0">已选洗车工</p>
            <ht-setting-table
              class="employees-list"
              table-name="employees-list-two"
              :data="washForm.washers"
              :columns="checkEmployeesColumns"
              style="height: calc(50% - 40px)"
            />
          </ht-card>
        </el-col>
        <el-col :span="8">
          <ht-card class="auto-card" title="会员信息" padding>
            <table class="order-table" cellspacing="0">
              <tr>
                <td>会员等级</td>
                <td>
                  {{ carMemberInfo.member.grade.name || "--" }}
                </td>
              </tr>
              <!-- <tr>
                <td>会员卡余额</td>
                <td>{{ carMemberInfo.member.itemCount.balance || "--" }}</td>
              </tr> -->
              <tr>
                <td>剩余洗车次数</td>
                <td>
                  {{ carMemberInfo.member.itemCount.washing || "--" }}
                </td>
              </tr>
              <tr>
                <td>客户欠款</td>
                <td>{{ carMemberInfo.usedCreditAmount || "--" }}</td>
              </tr>
              <tr>
                <td>信用额度</td>
                <td>{{ carMemberInfo.creditAmount || "--" }}</td>
              </tr>
            </table>
          </ht-card>
        </el-col>
      </el-row>
    </div>
    <!-- <repairOrderDialog :visible.sync="showOrderDialog" :EditObj="washForm" /> -->
    <SettleDialog
      v-if="settleDialogVisible"
      :visible.sync="settleDialogVisible"
      :settlData="settleData"
      :informationList="settleList"
      :companyId="companyId"
      @settleSuccess="handleSingleSettleDialogClose"
    />
    <!-- 往来单位信息弹窗 -->
    <CommunionInformationBox
      :id="cooperatorId"
      :visible.sync="showCommunionInformationBox"
      @on-save="handleCooperatorSave"
    />
    <!-- 车辆档案弹窗 -->
    <!--  工单详情里面没有customerName，暂时不显示头部 -->
    <FileEditor
      :visible="showFileEditor"
      :currentFile="carInfos"
      :disableCusAndPlate="true"
      :showCooperator="false"
      @update="update"
      @close="showFileEditor = false"
    />
  </div>
</template>

<script>
import {
  userInfoMsg,
  vehicleLevelDictionary,
  vehicleTypeDictionary
} from "@/utils/store";
import * as store from "@/utils/store";
import { WASH_RULES } from "../../const/columns";
import { listCarFile } from "@/api/repairs"; // 车辆信息
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
// import repairOrderDialog from "../repairOrderDialog";
import CommunionInformationBox from "@/components/CommunionInformationBox";
import FileEditor from "@/components/repair/carFile/fileEditor";
import VehiclesSelect from "@/components/repair/VehiclesSelect.vue"; // 车牌号
import { SettleDialog } from "@/components/business";
import {
  getWashingsSet,
  getWasherList,
  washAdd,
  washUpdate,
  washStart,
  washDelete,
  washDiscount,
  memberInfo,
  updateWashingsSnapshot
} from "@/api/repairs/washCar";
import {
  EMPLOYEES_COLUMNS,
  CHECK_EMPLOYEES_COLUMNS
} from "../../const/columns";

export default {
  name: "washOrderInfo",
  components: {
    // repairOrderDialog,
    VehiclesSelect,
    SettleDialog,
    CommunionInformationBox,
    FileEditor
  },
  props: {
    orderInfo: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    orderInfo: {
      handler(value) {
        // console.log("详情组件获取到", value);
        if (value) {
          this.radio = "1";
          this.selectedRows = [];
          value.washers = value.washers || [];
          this.washForm = { ...value };
          this.carInfo = { ...this.washForm };
          this.carInfos = this.carInfo;
          this.carMemberInfo = {
            creditAmount: "",
            usedCreditAmount: "",
            member: {
              grade: {
                name: ""
              },
              itemCount: {
                washing: ""
              }
            }
          };
          if (value.washers) {
            this.washersProportion();
          }
          if (value.id) {
            this.disablePlateNumber = true;
          } else {
            this.disablePlateNumber = false;
          }
          this.$nextTick(() => {
            this.companyId = value.companyId;
            this.settleData = {
              id: value.id,
              billType: "XC",
              billNo: value.billNo,
              cooperatorId: value.cooperatorId,
              amount: value.amount,
              isSettleIn: true
            };
            this.settleList = [
              {
                name: "客户名称",
                content: value.customerName
              },
              {
                type: "billType"
              },
              {
                name: "洗车单号",
                content: value.billNo
              },
              {
                type: "amount"
              },
              {
                type: "settledAmount"
              },
              {
                type: "unSettledAmount" // 未结金额
              }
            ];
            if (this.washForm.plateNumber) {
              this.getListCarFile();
              if (value.goodsId > 0) {
                this.radio = "2";
                this.washForm.goodsId = value.goodsId;
                this.discountChange();
              } else {
                this.washForm.goodsId = "";
              }
              this.getwashDiscount(); // 获取会员卡信息
            }
            this.$refs.form.clearValidate();
            this.getUsers();
            this.getWasherLists();
          }, 100);
        }
      },
      deep: true
    },
    radio(val) {
      if (val == "1") {
        this.washForm.goodsId = "";
        this.count = 0;
      }
    }
  },
  data() {
    return {
      loading: false,
      manLoading: false,
      washForm: {
        washers: []
      },
      rules: WASH_RULES,
      carInfo: {
        plateNumberPrefix: 18
      },
      carInfos: {},
      userOptions: [],
      setting: {},
      levelList: vehicleLevelDictionary(),
      typeList: vehicleTypeDictionary(),
      employeesColumns: [...EMPLOYEES_COLUMNS],
      checkEmployeesColumns: [...CHECK_EMPLOYEES_COLUMNS],
      employeesData: [], // 洗车工列表
      selectedRows: [],
      // showOrderDialog: false,
      settleDialogVisible: false,
      settleData: {},
      companyId: 0,
      settleList: [],
      disablePlateNumber: false,
      showCommunionInformationBox: false,
      showFileEditor: false,
      cooperatorId: null,
      discountList: [], // 会员卡列表
      radio: "1", // 结算方式 1余额  2 会员卡抵扣
      count: 0, // 剩余次数
      carMemberInfo: {
        creditAmount: "",
        usedCreditAmount: "",
        member: {
          grade: {
            name: ""
          },
          itemCount: {
            washing: ""
          }
        }
      }
    };
  },
  mounted() {
    this.getUsers();
    this.getWasherLists();
  },
  methods: {
    store() {
      return store;
    },
    // 获取会员卡信息、会员信息
    getwashDiscount() {
      washDiscount({
        vehicleId: this.washForm.vehicleId, // 车辆档案ID
        cooperatorId: this.washForm.cooperatorId // 往来单位ID
      }).then(res => {
        this.discountList = res.Rows || [];
        // {
        //   sourceId: 1,
        //   goodsId: 10001,
        //   sourceName: "普通会员",
        //   count: 1,
        //   sourceType: 1
        // },
        this.discountList.forEach(item => {
          item.name = item.sourceName;
        });
        if (this.discountList.length == 0) {
          this.radio = "1";
        }
      });
      if (this.washForm.vehicleId) {
        // 会员信息
        memberInfo({
          vehicleId: this.washForm.vehicleId // 车辆档案ID
        }).then(res => {
          this.carMemberInfo = res || {};
        });
      }
    },
    // 获取车辆信息
    getListCarFile() {
      listCarFile({
        plateNumber: this.washForm.plateNumber,
        page: 1,
        pageSize: 999
      }).then(res => {
        const data = res.rows || [];
        this.carInfos = data[0] || [];
      });
    },
    //切换会员卡
    discountChange() {
      if (this.washForm.goodsId > 0) {
        this.discountList.forEach(item => {
          if (item.goodsId == this.washForm.goodsId) {
            this.count = item.count;
          }
        });
      }
    },
    // 选择车辆信息
    carFileChange(e) {
      if (!e) return;
      console.log(e);
      const { customerName, ownerPhone } = e;
      this.$set(this.washForm, "vehicleId", e.id); // 车辆档案Id
      this.$set(this.washForm, "cooperatorId", e.cooperatorId); // 往来单位Id
      this.$set(this.washForm, "customerName", customerName); // 姓名
      this.$set(this.washForm, "customerPhone", ownerPhone); // 电话
      this.carInfo = {
        ...this.carInfo,
        ...e
      };
      this.radio = "1";
      this.washForm.goodsId = "";
      this.getwashDiscount(); // 获取会员信息
      this.$nextTick(() => {
        this.getSetting(
          this.carInfo.vehicleLevelId,
          this.carInfo.vehicleTypeId
        );
        // this.$set(this.washForm, "amount", "0");
        // if (this.setting.enableType == "carType") {
        //   if (this.carInfo.vehicleTypeId && this.setting.carTypeSets) {
        //     this.setting.carTypeSets.forEach(item => {
        //       if (item.id == this.carInfo.vehicleTypeId) {
        //         const price = item.price ? item.price : "0";
        //         this.$set(this.washForm, "amount", price);
        //       }
        //     });
        //   }
        // } else {
        //   if (this.carInfo.vehicleTypeId && this.setting.carTypeSets) {
        //     this.setting.carLevelSets.forEach(item => {
        //       if (item.id == this.carInfo.vehicleLevelId) {
        //         const price = item.price ? item.price : "0";
        //         this.$set(this.washForm, "amount", price);
        //       }
        //     });
        //   }
        // }
        this.carInfos = this.carInfo;
      }, 100);
    },
    // 获取用户信息
    getUsers() {
      if (!this.washForm.receptionTime) {
        const d = new Date();
        // eslint-disable-next-line prettier/prettier
        const m =
          d.getMonth() >= 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
        const r = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
        const h = d.getHours() > 9 ? d.getHours() : "0" + d.getHours();
        const f = d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes();
        const s = d.getSeconds() > 9 ? d.getSeconds() : "0" + d.getSeconds();
        const time = `${d.getFullYear()}-${m}-${r} ${h}:${f}:${s}`;
        this.$set(this.washForm, "receptionTime", time);
      }
      const params = {
        company: "self",
        roles: ["systemAdmin", "companyAdmin", "receptionConsultant"]
      };
      searchTypeStaffs(params).then(res => {
        this.userOptions = res;
        const ids = [];
        this.userOptions.forEach(item => {
          ids.push(item.id);
          if (!this.orderInfo.id && item.id == userInfoMsg().staffId) {
            this.$set(this.washForm, "receptionMan", item.id);
          }
        });
        if (ids.includes(this.orderInfo.receptionMan)) {
          this.$set(this.washForm, "receptionMan", this.orderInfo.receptionMan);
        } else {
          if (this.orderInfo.status == "已完成") {
            this.$set(
              this.washForm,
              "receptionMan",
              this.orderInfo.receptionManName
            );
          } else {
            this.$set(this.washForm, "receptionMan", "");
          }
        }
      });
    },
    // 动态获取用户
    remoteMethod(query) {
      if (query !== "") {
        this.manLoading = true;
        setTimeout(() => {
          this.manLoading = false;
          const params = {
            company: "self",
            roles: ["receptionConsultant", "systemAdmin", "companyAdmin"],
            name: query
          };
          searchTypeStaffs(params).then(res => {
            this.userOptions = res;
          });
        }, 200);
      } else {
        const params = {
          company: "self",
          roles: ["systemAdmin", "companyAdmin", "receptionConsultant"]
        };
        searchTypeStaffs(params).then(res => {
          this.userOptions = res;
        });
      }
    },
    // 获取洗车工信息
    getWasherLists() {
      getWasherList().then(res => {
        this.employeesData = res.washers;
        if (this.orderInfo && this.orderInfo.washers) {
          this.orderInfo.washers.forEach(item => {
            this.employeesData.forEach(item2 => {
              if (item.staffId == item2.staffId) {
                this.selectedRows.push(item2);
              }
            });
            this.loading = false;
          });
        }
      });
    },
    selectable() {
      return this.washForm.status != "已完成" ? true : false;
    },
    // 选择洗车工
    handleSelectionChange(rows) {
      this.washForm.washers = rows;
      this.washersProportion();
    },
    // 洗碗工提成比例计算
    washersProportion() {
      let sum = 0;
      this.washForm.washers.forEach(item => {
        sum += Number(item.weight);
      });
      if (sum == 0) {
        this.washForm.washers.forEach(item => {
          item.proportion = "0%";
        });
      } else {
        this.washForm.washers.forEach(item => {
          item.proportion = Number((item.weight / sum) * 100).toFixed(2) + "%";
        });
      }
    },
    // 获取设置信息
    getSetting(levelId, typeId) {
      const params = {
        levelId: levelId,
        typeId: typeId
      };
      getWashingsSet(params).then(res => {
        if (res.price) {
          this.$set(this.washForm, "amount", res.price);
        }
      });
    },
    // 保存、更新洗车单
    savaWash() {
      this.$refs["form"].validate((valid, err) => {
        if (!valid) {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          if (this.radio == "2") {
            if (this.washForm.goodsId == "") {
              this.$message.warning({
                message: "请选择会员卡或已购抵扣！",
                showClose: true
              });
              return false;
            } else {
              this.discountList.forEach(item => {
                if (item.goodsId == this.washForm.goodsId) {
                  this.washForm.sourceId = item.sourceId;
                  this.washForm.sourceName = item.sourceName;
                  this.washForm.sourceType = item.sourceType;
                }
              });
            }
          } else {
            this.washForm.goodsId = 0;
          }
          if (this.washForm.washers.length == 0) {
            this.$message.warning({
              message: "请选择洗车工！",
              showClose: true
            });
            return false;
          }
          if (this.washForm.invoiceType != "") {
            this.store()
              .formatInvoiceTypeDictionary()
              .forEach(item => {
                if (item.id == this.washForm.invoiceType) {
                  this.washForm.taxRate = item.specialValue;
                }
              });
          } else {
            this.washForm.taxRate = "";
          }
          if (this.washForm.id) {
            washUpdate(this.washForm).then(() => {
              this.$emit("updata", this.washForm.id);
              this.count = 0;
              this.$message({
                message: "保存成功！",
                type: "success"
              });
            });
          } else {
            const data = JSON.parse(JSON.stringify(this.washForm));
            washAdd(data).then(res => {
              this.$emit("updata", res.id);
              this.$message({
                message: "开单成功！",
                type: "success"
              });
            });
          }
        }
      });
    },
    // 开始洗车
    washStarts() {
      washStart({ id: this.washForm.id }).then(() => {
        this.$emit("updata", this.washForm.id);
      });
    },
    // 删除洗车
    washDeletes() {
      washDelete({ id: this.washForm.id }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功！"
        });
        this.$emit("updata", this.washForm.id);
      });
    },
    // 洗车结算
    settleHandle() {
      this.settleDialogVisible = true;
    },
    // 结算结果
    handleSingleSettleDialogClose(flag) {
      if (flag) {
        this.settleDialogVisible = false;
        this.$message({
          type: "success",
          message: "结算成功！",
          showClose: true
        });
        this.$emit("updata", this.washForm.id);
      }
    },
    // 客户信息和车辆档案
    editCooperatorInfo() {
      const { cooperatorId } = this.orderInfo;
      if (!cooperatorId) return;
      this.cooperatorId = cooperatorId;
      this.showCommunionInformationBox = true;
    },
    handleCooperatorSave() {
      const msg = this.cooperatorId ? "更新成功！" : "新增成功！";
      this.$message.success({ message: msg, showClose: true });
    },
    update(e) {
      console.log("新的车辆档案", e);
      this.carInfo = { ...this.carInfo, ...e };
      // const { vehicleTypeName, vehicleLevelName } = e;
      // this.$set(this.carInfo, "vehicleTypeName", vehicleTypeName);
      // this.$set(this.carInfo, "vehicleLevelName", vehicleLevelName);
      this.showFileEditor = false;
      updateWashingsSnapshot({ id: this.washForm.id }).then(() => {
        // 更新数据
        this.$emit("updata", this.washForm.id);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";
::v-deep {
  .ht-table .table {
    background-color: #f5f7fa;
  }
  .employees-list {
    border: 1px solid #e8eaef;
    border-width: 1px 1px 1px 0;
  }
  .employees-list-over {
    .has-gutter {
      .el-checkbox {
        display: none;
      }
    }
  }
  .box-card.auto-card {
    overflow-y: auto;
  }
  .el-input-number .el-input__inner {
    text-align: left;
  }
  .order-table {
    width: calc(100% - 15px);
    border: 1px solid #eee;
    border-width: 0 1px 1px 0;
    border-radius: 3px;
    td {
      border: 1px solid #eee;
      border-width: 1px 0 0 1px;
      height: 32px;
      padding: 0 10px;
      font-size: 12px;
      &:first-child {
        width: 100px;
        background: #f5f7fa;
        color: #606266;
      }
      &:last-child {
        color: $color-primary;
        @include font_color("color-primary");
      }
    }
  }
  .wash-form {
    padding: 0 0 20px;
    .el-form-item {
      margin-bottom: 13px;
    }
    .el-form-item__label {
      font-size: 12px;
      line-height: 32px;
      .el-radio__label {
        font-size: 12px;
        font-weight: 400;
        padding-left: 2px;
      }
      .el-radio__input.is-checked + .el-radio__label {
        color: #606266;
      }
    }
    .el-form-item__content {
      line-height: 32px;
    }
    .el-form-item__error {
      padding-top: 0;
    }
    .el-input--suffix .el-input__inner {
      padding-right: 20px;
    }
    .car {
      .el-input__inner {
        height: 32px;
        line-height: 32px;
      }
      .el-input__icon {
        line-height: 32px;
      }
    }
  }
  .wash-car-msg .el-card__body {
    overflow-y: auto;
  }
}
.order-table {
  td {
    &:last-child {
      color: $color-primary;
      @include font_color("color-primary");
    }
  }
}
.wrap {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  padding: 0 5px;
}
.btns {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  background: #fff;
  margin-bottom: 10px 0;
  padding: 5px;
  border-radius: 2px;
}
.info-group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 10px;
  border: solid 1px #fff;
  background: #fff;
  border-radius: 5px;
  margin: 5px 0;
  .item {
    margin-right: 15px;
    .item-label {
      margin-right: 5px;
    }
    .item-value {
      // color: #409eff;
      color: $color-primary;
      @include font_color("color-primary");
    }
  }
  .info {
    width: 100%;
    display: block;
    flex: 1;
    text-align: right;
  }
}
.detail-wrap {
  border-radius: 5px;
  .header {
    padding: 5px 10px;
  }
  .el-row {
    height: 100%;
    .el-col {
      height: 100%;
    }
  }
}
.el-card__body {
  overflow-y: auto;
}
</style>
