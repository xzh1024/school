<template>
  <div class="picking-part-wrap">
    <div
      class="btns"
      v-if="
        billForm.billNo &&
          (allowUpdate || allowUpdate || allowSettle || allowPrint)
      "
    >
      <el-button
        type="primary"
        :disabled="isComputed"
        v-if="allowUpdate"
        size="small"
        @click="showServiceSelector = true"
        >添加项目</el-button
      >
      <el-button
        type="primary"
        :disabled="isComputed"
        v-if="allowUpdate"
        size="small"
        @click="showpart = true"
        >添加配件</el-button
      >
      <el-button
        type="primary"
        :disabled="isComputed"
        v-if="allowUpdate"
        size="small"
        @click="updateInsurances"
        >保存（F3）</el-button
      >
      <el-button
        type="primary"
        :disabled="isComputed"
        v-if="allowSettle"
        size="small"
        @click="settleInsurances"
        >结算（F7）</el-button
      >
      <el-button type="primary" v-if="allowPrint" size="small" @click="print"
        >打印（F10）</el-button
      >
      <span class="log"
        ><span @click="showShare">分享单据</span
        ><i class="el-icon-share" style="color:#409EFF"></i
      ></span>
    </div>
    <!-- 申请单信息 -->
    <div class="info-group" v-if="billForm.billNo">
      <span class="item">
        <span class="item-label">申请单号:</span>
        <span class="item-value">{{ billForm.billNo }}</span>
      </span>
      <span class="item">
        <span class="item-label">保险公司:</span>
        <span class="item-value">{{ billForm.insuranceCompanyName }}</span>
      </span>
      <span class="item">
        <span class="item-label">车牌号:</span>
        <span class="item-value">{{ billForm.plateNumber }}</span>
      </span>
      <span class="item">
        <span class="item-label">状态:</span>
        <span class="item-value">{{ billForm.status }}</span>
      </span>
    </div>
    <ht-card
      class="order-info"
      title="申请单信息"
      style="height:450px;"
      v-if="billForm.billNo"
    >
      <div class="left">
        <el-form
          ref="form"
          style="width:400px"
          :model="billForm"
          :rules="rules"
          :show-message="false"
          size="mini"
          label-position="left"
          label-width="80px"
        >
          <el-form-item label="申请时间" prop="applicationTime">
            <el-date-picker
              v-model="billForm.applicationTime"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="报案人" prop="reporter">
                <el-input v-model="billForm.reporter" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="receptionMan" label="理赔人">
                <ht-autocomplete
                  size="small"
                  v-model="receptionManName"
                  :fetch-suggestions="listAllReceptionMan()"
                  placeholder="请选择接待顾问"
                  :trigger-on-focus="false"
                  @select="receptionManChange"
                  :maxlength="50"
                  highlight-first-item
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="报案号" prop="reportNo">
            <el-input v-model="billForm.reportNo" size="small" />
          </el-form-item>
          <el-form-item label="保单号" prop="insuranceNo">
            <el-input v-model="billForm.insuranceNo" size="small" />
          </el-form-item>
          <el-form-item label="出险时间" prop="accidentTime">
            <el-date-picker
              v-model="billForm.accidentTime"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="出险地点" prop="accidentAddress">
            <el-input v-model="billForm.accidentAddress" size="small" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="billForm.remark" size="small" />
          </el-form-item>
          <el-form-item label="发票类型" prop="invoiceType">
            <ht-autoselect
              v-model="billForm.invoiceType"
              :clearable="false"
              :options="store().formatInvoiceTypeDictionary()"
              :trigger-on-focus="false"
              :format-name="
                value =>
                  getFormatInvoiceType(billForm.invoiceType, billForm.taxRate)
              "
              @change="invoiceTypeChange"
              class="switch-focus focus-invoiceType"
              placeholder="请选择"
              mnemonic
              filter-zero
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <div class="block">
          <div
            class="line"
            v-for="(item, key, index) in block1Info"
            :key="index"
          >
            <span class="label">{{ blockKeyMap[key] }}</span>
            <span class="value">{{ item }}</span>
          </div>
        </div>
        <div class="block2">
          <div
            class="line"
            v-for="(item, key, index) in block2Info"
            :key="index"
          >
            <span class="label">{{ blockKeyMap[key] }}</span>
            <span class="value">{{ item }}</span>
          </div>
        </div>
        <div class="block-btns">
          <div class="line">
            <el-button
              type="primary"
              plain
              size="small"
              @click="showBillInfo = true"
              >工单详情</el-button
            >
          </div>
          <div class="line">
            <el-button type="primary" plain size="small" @click="editCarFile"
              >车辆信息</el-button
            >
          </div>
          <div class="line">
            <el-button
              type="primary"
              plain
              size="small"
              @click="showHistory = true"
              >维修履历</el-button
            >
          </div>
        </div>
      </div>
    </ht-card>
    <div class="bottom" v-if="billForm.billNo">
      <div class="bottom-left">
        <ht-card padding>
          <ht-tabs v-model="activeTab" :tabs="tabs" class="tabs-regular" />
          <ht-setting-table
            v-show="activeTab === 'service'"
            :data="serviceData"
            setting-all-column
            show-table-setting
            :columns="serviceColumns"
            :row-class-name="itemTableRowClassName"
            show-summary
            :summary-method="getServiceSummaries"
            style="height:200px;"
            table-name="service-list"
          />
          <ht-setting-table
            v-show="activeTab === 'part'"
            :data="partData"
            setting-all-column
            :row-class-name="partTableRowClassName"
            show-table-setting
            :columns="partColumns"
            style="height:200px;"
            table-name="service-list"
          />
        </ht-card>
      </div>
      <div class="bottom-right">
        <ht-card class="auto-card" title="费用合计" no-padding>
          <ht-setting-table
            tableName="car-info"
            :columns="tableColumns"
            :data="tableData"
            :show-header="false"
            :index-column="false"
            :selection-type="null"
            :cell-class-name="cellClassName"
            disabled-hotkeys
          />
        </ht-card>
      </div>
    </div>
    <!-- 工单详情 -->
    <BillInfo
      :visible="showBillInfo"
      :billId="billId"
      @close="showBillInfo = false"
    />
    <!-- 添加项目 -->
    <ServiceSelector
      :visible="showServiceSelector"
      :vehicle="vehicle"
      :onlyService="true"
      @addService="addService"
      @close="showServiceSelector = false"
    />
    <!-- 添加配件 -->
    <PartSelector
      :visible="showpart"
      :type="'XS'"
      :filterZero="false"
      :companyId="store().userInfoMsg().companyId"
      @addPart="addPart"
      @close="showpart = false"
    />
    <!-- 维修履历 -->
    <RepaireHistory
      :visible="showHistory"
      :orderInfo="orderInfo"
      @close="showHistory = false"
    />
    <!-- 车辆信息 -->
    <FileEditor
      :visible="showFileEditor"
      :onlyShow="true"
      :currentFile="carFile"
      :hidebtn="true"
      :showCooperator="false"
      @close="showFileEditor = false"
    />
    <!-- 分享 -->
    <ht-dialog
      v-if="shareVisible"
      :visible.sync="shareVisible"
      title="保险理赔申请单分享"
      width="1100px"
    >
      <InsuranceInfo :insuranceId="insuranceId" :showHeader="true" />
    </ht-dialog>
  </div>
</template>

<script>
import {
  updateInsurances,
  insurancesItemList,
  createInsurancesItem,
  deleteInsurancesItem,
  updateInsurancesItem,
  insurancesPartsList,
  createInsurancesParts,
  deleteInsurancesParts,
  updateInsurancesParts
} from "@/api/repairs/insurances";
import { billSettle } from "@/api/finance/billSettle";
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
import { precisionsFixed } from "@/mixins";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import ServiceSelector from "@/components/repair/serviceSelector/serviceSelector";
import PartSelector from "@/components/repair/partSelector/partSelector";
import RepaireHistory from "@/components/repair/repairHistory/repairHistory";
import BillInfo from "@/components/repair/BillInfo/BillInfo";
import FileEditor from "@/components/repair/carFile/fileEditor";
import { SERVICE_COLUMNS, PART_COLUMNS } from "../const/columns";
import { getBillsDetail } from "@/api/repairs/bills";
import { dateFormatFull } from "@/utils/date";
import * as store from "@/utils/store";
import { baseDataMixin } from "@/mixins";
import { openNewWindow } from "@/utils/tool";
import InsuranceInfo from "@/components/repair/insuranceInfo";
import { getCarFileDetail } from "@/api/repairs";

export default {
  props: {
    billInfo: {
      type: Object,
      default: () => {}
    }
  },
  mixins: [precisionsFixed, baseDataMixin],
  watch: {
    billInfo: {
      handler(value) {
        if (value) {
          this.billForm = { ...value };
          this.billId = value.sourceBillId;
          this.receptionManName = value.receptionManName;
          this.initPage();
        }
      },
      deep: true
    }
  },
  data() {
    return {
      receptionManName: "",
      rules: {
        applicationTime: [
          { required: true, message: "请选择申请时间", trigger: "change" }
        ],
        reporter: [
          { required: true, message: "请选输入报案人", trigger: "change" }
        ],
        receptionMan: [
          { required: true, message: "请输入理赔人", trigger: "change" }
        ],
        reportNo: [
          { required: true, message: "请输入报案号", trigger: "change" }
        ],
        insuranceNo: [
          { required: true, message: "请输入保单号", trigger: "change" }
        ],
        accidentTime: [
          { required: true, message: "请选择出险时间", trigger: "change" }
        ],
        accidentAddress: [
          { required: true, message: "请输入出险地点", trigger: "change" }
        ],
        invoiceType: [
          { required: true, message: "请选择发票类型", trigger: "change" }
        ]
      },
      tabs: [
        { name: "维修项目", id: "service" },
        { name: "维修配件材料", id: "part" }
      ],
      tableColumns: [
        { prop: "name", label: "", width: "100" },
        { prop: "content", label: "", width: "120" }
      ],
      carFile: {},
      activeTab: "service",
      showFileEditor: false,
      insuranceId: "",
      shareVisible: false,
      belongs: [],
      billForm: {},
      orderInfo: {},
      showServiceSelector: false,
      blockKeyMap: {
        billNo: "工单号",
        createdAt: "结算日期",
        contactsName: "送修人",
        contactsPhone: "送修人电话",
        cooperatorName: "客户",
        insuranceDeductionRateLabel: "绝对免赔率",
        vin: "车架号",
        facBrand: "厂牌",
        vehicleGroup: "车型组",
        year: "年款",
        displacementEngineLabel: "排量 | 发动机",
        transmission: "变速箱",
        engineNo: "发动机号"
      },
      block1Info: {},
      block2Info: {},
      showBillInfo: false, // 工单详情
      showpart: false, // 添加配件弹窗
      showHistory: false, // 维修履历
      serviceData: [],
      vehicle: {},
      serviceColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "controls",
          type: "controls",
          label: "操作",
          width: 70,
          cantExport: true,
          render: (value, row) => {
            return !this.isComputed && this.allowUpdate && !row.billItemId ? (
              <el-tooltip enterable={false} placement="top" content="删除">
                <span
                  on-click={e => this.handleDeleteItem(row, e)}
                  class="icon operation-icon icon-delete-info"
                />
              </el-tooltip>
            ) : (
              ""
            );
          }
        },
        {
          prop: "itemCode",
          label: "项目编码",
          width: CELL_WIDTH.date
        },
        {
          prop: "itemName",
          label: "项目名称",
          width: CELL_WIDTH.date
        },
        {
          prop: "chargeManHour",
          label: "索赔工时",
          width: CELL_WIDTH.fundCategoryName,
          render: (value, _, index) => {
            return !this.isComputed && this.allowUpdate ? (
              <div>
                <HtFormatNumber
                  v-model={value}
                  min={0}
                  disabled={this.isComputed}
                  size="mini"
                  precision-type="qty"
                  on-set={e => this.inputValueChange(index, "chargeManHour", e)}
                />
              </div>
            ) : (
              <span>{value}</span>
            );
          }
        },
        {
          prop: "manHourPrice",
          label: "工时单价",
          width: CELL_WIDTH.fundCategoryName,
          render: (value, row, index) => {
            return !this.isComputed && this.allowUpdate ? (
              <div>
                <HtFormatNumber
                  v-model={value}
                  disabled={this.isComputed}
                  min={0}
                  size="mini"
                  precision-type="price"
                  on-set={e => this.inputValueChange(index, "manHourPrice", e)}
                />
              </div>
            ) : (
              <span>{value}</span>
            );
          }
        },
        {
          prop: "manHourCostPrice",
          label: "工时成本单价",
          width: CELL_WIDTH.fundCategoryName,
          render: (value, row, index) => {
            return !this.isComputed && this.allowUpdate ? (
              <div>
                <HtFormatNumber
                  v-model={value}
                  disabled={this.isComputed}
                  min={0}
                  size="mini"
                  precision-type="price"
                  on-set={e =>
                    this.inputValueChange(index, "manHourCostPrice", e)
                  }
                />
              </div>
            ) : (
              <span>{value}</span>
            );
          }
        },
        {
          prop: "amount",
          label: "索赔金额",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { chargeManHour, manHourPrice } = row;
            return Number(chargeManHour * manHourPrice).toFixed(2);
          }
        },
        ...SERVICE_COLUMNS,
        {
          prop: "remark",
          label: "项目备注",
          width: CELL_WIDTH.date,
          render: (value, row, index) => {
            return !this.isComputed && this.allowUpdate ? (
              <div>
                <el-input
                  value={value}
                  disabled={this.isComputed}
                  size="mini"
                  place-holder="项目备注"
                  on-set={e => this.inputValueChange(index, "remark", e)}
                  size="small"
                />
              </div>
            ) : (
              <span>{value}</span>
            );
          }
        }
      ],
      billId: 0,
      partData: [],
      partColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "controls",
          type: "controls",
          label: "操作",
          width: 70,
          cantExport: true,
          render: (value, row) => {
            return !this.isComputed && this.allowUpdate && !row.billPartId ? (
              <el-tooltip enterable={false} placement="top" content="删除">
                <span
                  on-click={e => this.handleDeletePart(row, e)}
                  class="icon operation-icon icon-delete-info"
                />
              </el-tooltip>
            ) : (
              ""
            );
          }
        },
        ...PART_COLUMNS,
        {
          prop: "qty",
          label: "数量",
          width: CELL_WIDTH.fundCategoryName,
          render: (value, row, index) => {
            return !this.isComputed && this.allowUpdate ? (
              <div>
                <HtFormatNumber
                  v-model={value}
                  disabled={this.isComputed}
                  min={1}
                  size="mini"
                  precision-type="qty"
                  on-set={e => this.partInputValueChange(index, "qty", e)}
                />
              </div>
            ) : (
              <span>{value}</span>
            );
          }
        },
        {
          prop: "price",
          label: "索赔单价",
          width: CELL_WIDTH.fundCategoryName,
          render: (value, row, index) => {
            return !this.isComputed && this.allowUpdate ? (
              <div>
                <HtFormatNumber
                  v-model={value}
                  min={0}
                  disabled={this.isComputed}
                  size="mini"
                  precision-type="price"
                  on-set={e => this.partInputValueChange(index, "price", e)}
                />
              </div>
            ) : (
              <span>{value}</span>
            );
          }
        },
        {
          prop: "costPrice",
          label: "成本单价",
          width: CELL_WIDTH.fundCategoryName,
          render: (value, row, index) => {
            const { billPartId } = row;
            const isFormBill = billPartId > 0;
            return !isFormBill && !this.isComputed && this.allowUpdate ? (
              <div>
                <HtFormatNumber
                  v-model={value}
                  min={0}
                  size="mini"
                  disabled={this.isComputed}
                  precision-type="price"
                  on-set={e => this.partInputValueChange(index, "costPrice", e)}
                />
              </div>
            ) : (
              <span>{value}</span>
            );
          }
        },
        {
          prop: "amount",
          label: "索赔金额",
          width: CELL_WIDTH.date
        },
        {
          prop: "billDiscountRate",
          label: "工单中折扣",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { billDiscountRate, billPartId } = row;
            return billPartId > 0 && billDiscountRate
              ? Number(billDiscountRate * 10)
              : "-";
          }
        },
        {
          prop: "billAmount",
          label: "工单结算金额",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { billAmount, billPartId } = row;
            return billPartId > 0 ? billAmount : "-";
          }
        },
        {
          prop: "remark",
          label: "备注",
          width: CELL_WIDTH.date
        }
      ]
    };
  },
  components: {
    BillInfo,
    ServiceSelector,
    PartSelector,
    RepaireHistory,
    FileEditor,
    InsuranceInfo
  },
  computed: {
    tableData() {
      return [
        { name: "工时合计", content: this.billForm.totalManHour },
        { name: "工费合计", content: this.billForm.totalChargeManHour },
        { name: "料费合计", content: this.billForm.totalChargeParts },
        {
          name: "其他费用",
          content: (
            <div>
              <HtFormatNumber
                v-model={this.billForm.otherCharge}
                min={0}
                size="mini"
                precision-type="price"
                on-change={this.otherFeeChange.bind(this)}
              />
            </div>
          )
        },
        { name: "合计金额", content: this.billForm.amount }
      ];
    },
    isComputed() {
      return this.billInfo.status !== "待结算";
    },
    allowUpdate() {
      return this.hasBelongsPerm("update", this.belongs);
    },
    allowSettle() {
      return this.hasBelongsPerm("settle", this.belongs);
    },
    allowPrint() {
      return this.hasBelongsPerm("print", this.belongs);
    }
  },
  methods: {
    store() {
      return store;
    },
    showShare() {
      const { id: insuranceId } = this.billInfo;
      this.insuranceId = JSON.stringify(insuranceId);
      this.shareVisible = true;
      // openNewWindow(
      //   this.$router.resolve({
      //     path: `/insuranceShare/index?insuranceId=${insuranceId}`
      //   }).href,
      //   "insuranceShare"
      // );
    },
    itemTableRowClassName({ row }) {
      if (!row.billItemId) {
        return "is-self-add";
      }
      return "";
    },
    partTableRowClassName({ row }) {
      if (!row.billPartId) {
        return "is-self-add";
      }
      return "";
    },
    getServiceSummaries(param) {
      const { columns, data } = param;
      let totalChargeManHour = 0;
      let amount = 0;
      let totalBillChargeManHour = 0;
      let totalbillAmount = 0;
      const sums = [];
      data.map(item => {
        totalChargeManHour = Number(
          Number(item.chargeManHour) + totalChargeManHour
        );
        amount = Number(
          Number(item.chargeManHour) * Number(item.manHourPrice) +
            Number(amount)
        ).toFixed(2);
        totalBillChargeManHour = Number(
          Number(item.billChargeManHour) + totalBillChargeManHour
        );
        totalbillAmount = Number(
          Number(item.billAmount) + Number(totalbillAmount)
        ).toFixed(2);
      });
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        switch (column.property) {
          case "chargeManHour":
            sums[index] = totalChargeManHour;
            break;
          case "amount":
            sums[index] = amount;
            break;
          case "billChargeManHour":
            sums[index] = totalBillChargeManHour;
            break;
          case "billAmount":
            sums[index] = totalbillAmount;
            break;
        }
      });
      return sums;
    },
    print() {
      const { id } = this.billInfo;
      openNewWindow(
        this.$router.resolve({
          path: "/Print/repair/insurance/" + id
        }).href,
        "print"
      );
    },
    cellClassName({ columnIndex }) {
      if (columnIndex % 2 === 1) {
        return "text-font-primary";
      }
    },
    initPage() {
      const { sourceBillId: id } = this.billInfo;
      getBillsDetail(id).then(res => {
        this.$nextTick(() => {
          const {
            billNo,
            belongs,
            createdAt,
            contactsName,
            contactsPhone,
            cooperatorName,
            insuranceDeductionRate,
            vehicle
          } = res;
          this.orderInfo = { ...res };
          this.belongs = belongs;
          const {
            vin,
            facBrand,
            vehicleGroup,
            year,
            displacement,
            engine,
            displacementEngine,
            transmission,
            engineNo
          } = vehicle;
          this.block1Info = {
            billNo,
            createdAt: dateFormatFull(createdAt),
            contactsName,
            contactsPhone,
            cooperatorName,
            insuranceDeductionRateLabel: insuranceDeductionRate
              ? `${insuranceDeductionRate * 100}%`
              : ""
          };
          this.vehicle = {
            ...vehicle,
            customerName: cooperatorName,
            displacementEngine: displacementEngine
              ? displacementEngine
              : `${displacement}|${engine}`
          };
          this.block2Info = {
            vin,
            facBrand,
            vehicleGroup,
            year,
            displacementEngineLabel: displacementEngine
              ? displacementEngine
              : `${displacement}|${engine}`,
            transmission,
            engineNo
          };
          this.$forceUpdate();
        });
      });
      this.getServiceItems();
      this.getParts();
    },
    invoiceTypeChange(e) {
      // console.log(e);
      // console.log(this.store().formatInvoiceTypeDictionary());
      console.log(
        this.store()
          .formatInvoiceTypeDictionary()
          .find(item => item.id == e)
      );
      const select = this.store()
        .formatInvoiceTypeDictionary()
        .find(item => item.id == e);
      this.billForm.invoiceType = select.id;
      this.billForm.taxRate = select.specialValue;
    },
    editCarFile() {
      console.log(this.orderInfo);
      const { vehicle } = this.orderInfo;
      getCarFileDetail({ id: vehicle.vehicleId }).then(res => {
        this.carFile = { ...res };
        this.showFileEditor = true;
      });
    },
    listAllReceptionMan() {
      const { receptionMan } = this;
      const params = {
        company: "self",
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
    receptionManChange(e) {
      this.billForm.receptionMan = e.id;
      this.billForm.receptionManName = e.value;
      this.receptionManName = e.value;
      this.$forceUpdate();
    },
    updateInsurances() {
      this.$refs.form.validate((valid, err) => {
        if (!valid) {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          updateInsurances(this.billForm).then(() => {
            this.$message.success("保存成功！");
            this.$emit("updateList", this.billForm.id);
          });
        }
      });
    },
    settleInsurances() {
      console.log(this.billForm);
      const { id: billId, billNo, invoiceType } = this.billForm;
      billSettle({
        billSettles: [
          {
            enhancedSettlementType: "挂账",
            billType: "BL",
            billId,
            billNo,
            invoiceType
          }
        ]
      }).then(() => {
        this.$message.success(`结算单${billNo},结算成功，已转应收付！`);
        this.$emit("updateList", this.billForm.id);
      });
    },
    getServiceItems() {
      const { id: insuranceId } = this.billInfo;
      insurancesItemList({ insuranceId }).then(res => {
        const { Rows } = res;
        this.serviceData = Rows || [];
      });
    },
    getParts() {
      const { id: insuranceId } = this.billInfo;
      insurancesPartsList({ insuranceId }).then(res => {
        const { Rows } = res;
        this.partData = [];
        Rows.forEach(item => {
          item.originQty = item.qty;
        });
        this.$forceUpdate();
        this.$nextTick(() => {
          this.partData = Rows || [];
        });
      });
    },
    addService(e) {
      console.log(e);
      try {
        const { vehicleLevelId } = this.vehicle;
        let manHourPrice = 0;
        let chargeManHour = 0;
        let manHourCostPrice = 0;
        const { prices } = e;
        // 项目有price，套餐的工时单价这些在外层
        if (prices) {
          const usePrice =
            prices.find(item => item.vehicleLevel == vehicleLevelId) ||
            prices[0];
          const {
            manHourPrice: manHourPriceData,
            chargeManHour: chargeManHourData,
            manHourCostPrice: manHourCostPriceData
          } = usePrice;
          manHourPrice = manHourPriceData;
          chargeManHour = chargeManHourData;
          manHourCostPrice = manHourCostPriceData;
        } else {
          const {
            manHourPrice: manHourPriceData,
            chargeManHour: chargeManHourData,
            manHourCostPrice: manHourCostPriceData
          } = e;
          manHourPrice = manHourPriceData;
          chargeManHour = chargeManHourData;
          manHourCostPrice = manHourCostPriceData;
        }
        const { id: insuranceId } = this.billInfo;
        const { id: itemId, code: itemCode, name: itemName, remark } = e;
        createInsurancesItem({
          Rows: [
            {
              insuranceId,
              itemId,
              itemCode,
              itemName,
              manHourPrice,
              chargeManHour,
              manHourCostPrice,
              remark
            }
          ]
        })
          .then(() => {
            this.showServiceSelector = false;
            this.$message.success("添加成功!");
            this.getServiceItems();
            this.$emit("updateList", insuranceId);
          })
          .catch(() => {
            this.showServiceSelector = false;
          });
      } catch (e) {
        console.log(e);
      }
    },
    addPart(e) {
      console.log(e);
      const { id: insuranceId } = this.billInfo;
      const { partId, qty, price, remark, costPrices } = e;
      createInsurancesParts({
        Rows: [
          {
            insuranceId,
            partId,
            qty,
            price,
            costPrice: costPrices ? costPrices?.taxed : 0,
            remark
          }
        ]
      })
        .then(() => {
          this.showpart = false;
          this.$message.success("添加成功!");
          this.getParts();
          this.$emit("updateList", insuranceId);
        })
        .catch(() => {
          this.showpart = false;
        });
    },
    handleDeleteItem(e) {
      const { id: insuranceId } = this.billInfo;
      this.$confirm("确定删除此项目？", "提示").then(() => {
        deleteInsurancesItem({
          id: e.id,
          insuranceId
        }).then(() => {
          this.$message.success("删除成功!");
          this.getServiceItems();
          this.$emit("updateList", this.billForm.id);
        });
      });
    },
    handleDeletePart(e) {
      const { id: insuranceId } = this.billInfo;
      this.$confirm("确定删除此配件？", "提示").then(() => {
        deleteInsurancesParts({
          id: e.id,
          insuranceId
        }).then(() => {
          this.$message.success("删除成功!");
          this.getParts();
          this.$emit("updateList", this.billForm.id);
        });
      });
    },
    inputValueChange(index, key, e) {
      const value = this.precisionFormat(e, "money");
      this.inputChange(index, key, value);
    },
    otherFeeChange(e) {
      this.billForm["otherCharge"] = e;
      const { totalChargeManHour, totalChargeParts } = this.billForm;
      this.billForm.amount = Number(
        Number(totalChargeManHour) + Number(totalChargeParts) + Number(e)
      ).toFixed(2);
    },
    partInputValueChange(index, key, e) {
      const value = this.precisionFormat(e, "money");
      this.partInputChange(index, key, value);
    },
    inputChange(index, key, e) {
      this.serviceData[index][key] = e;
      this.updateItem(index);
    },
    partInputChange(index, key, e) {
      // 如果是来自工单，且修改的数量比以前少,就不改变，只能多，不能少，产品说的
      if (
        this.partData[index].billPartId &&
        key == "qty" &&
        e < this.partData[index].originQty
      ) {
        this.partData[index].qty = this.partData[index].originQty;
        const { id: insuranceId } = this.billInfo;
        this.$emit("updateList", insuranceId);
      } else {
        this.partData[index][key] = e;
        this.updatePart(index);
      }
    },
    inputTextChange(index, key, e) {
      this.serviceData[index][key] = e;
      this.updateItem(index);
    },
    partInputTextChange(index, key, e) {
      this.partData[index][key] = e;
      this.updatePart(index);
    },
    updateItem(index) {
      const { id: insuranceId } = this.billInfo;
      const {
        id,
        chargeManHour,
        manHourPrice,
        manHourCostPrice,
        remark
      } = this.serviceData[index];
      updateInsurancesItem({
        id,
        insuranceId,
        chargeManHour,
        manHourPrice,
        manHourCostPrice,
        remark
      }).then(() => {
        this.getServiceItems();
        this.$emit("updateList", insuranceId);
      });
    },
    updatePart(index) {
      const { id: insuranceId } = this.billInfo;
      const { id, price, qty, remark, costPrice } = this.partData[index];
      updateInsurancesParts({
        id,
        insuranceId,
        price,
        qty,
        costPrice,
        remark
      }).then(() => {
        this.getParts();
        this.$emit("updateList", insuranceId);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.picking-part-wrap {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  padding-right: 10px;
}
.info-group {
  display: flex;
  justify-content: flex-start;
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
      color: #409eff;
    }
  }
  .info {
    width: 100%;
    display: block;
    flex: 1;
    text-align: right;
  }
}
.btns {
  display: flex;
  justify-content: flex-start;
  background: #fff;
  margin: 10px 0;
  padding: 5px;
  border-radius: 2px;
  .log {
    flex: 1;
    text-align: right;
    line-height: 32px;
    cursor: pointer;
    padding-right: 10px;
  }
}
.order-info {
  ::v-deep {
    .el-card__body {
      display: flex;
      justify-content: space-between;
      overflow-x: scroll;
      .left {
        display: flex;
        box-sizing: border-box;
        width: 500px;
        padding: 10px;
        overflow-x: scroll;
      }
      .right {
        width: 700px;
        height: 390px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        padding: 20px 10px;
        background: rgb(232, 244, 254);
        border-radius: 5px;
        overflow-x: scroll;
        .block,
        .block2 {
          width: 300px;
          .line {
            display: flex;
            justify-content: flex-start;
            margin-bottom: 10px;
            .label {
              display: inline-block;
              width: 85px;
            }
            .value {
              font-size: 12px;
              color: rgb(19, 146, 255);
            }
          }
        }
        .block2 {
          width: 250px;
        }
        .block-btns {
          flex: 1;
          .line {
            text-align: right;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
.bottom {
  box-sizing: border-box;
  height: 260px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  ::v-deep {
    .is-self-add {
      color: red;
    }
  }
  .bottom-left {
    width: 100%;
    height: 260px;
    margin-right: 10px;
    overflow-x: scroll;
  }
  .bottom-right {
    height: 260px;
    width: 300px;
    margin-right: 10px;
  }
}
</style>
