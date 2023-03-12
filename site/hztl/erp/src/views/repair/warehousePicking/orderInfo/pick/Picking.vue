<template>
  <div class="picking-wrap">
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <ht-card
            title="工单配件材料"
            class="auto-card"
            style="height:400px;overflow:scroll;background:#fff;"
          >
            <ht-setting-table
              :data="waitToPickData"
              :enable-table-setting="true"
              :columns="waitToPickColumns"
              :selected-rows.sync="waitSelectedRows"
              @row-dblclick="waitToPickSelectChange"
              show-summary
              :summary-method="getPartSummaries"
              table-name="wait-to-pick"
            />
          </ht-card>
        </el-col>
        <el-col :span="12">
          <ht-card
            title="库存明细"
            class="auto-card"
            style="height:400px;overflow:scroll;background:#fff;"
          >
            <div
              slot="after-title"
              style="text-align: right;"
              v-if="currentBillPart.partCode"
            >
              ({{ currentBillPart.partCode }} / {{ currentBillPart.partName }} /
              {{ currentBillPart.part.insurCertType }} /
              {{ currentBillPart.part.productionPlace }})
            </div>

            <div class="btn-wrap" v-if="!detailData.length && currentBillPart">
              <el-button type="primary" size="small" @click="handleAddStore"
                >库存不足处理</el-button
              >
            </div>
            <ht-setting-table
              v-else
              :data="detailData"
              :enable-table-setting="true"
              :columns="detailColumns"
              @select-change="detailSelectChange"
              table-name="store-list"
            />
          </ht-card>
        </el-col>
      </el-row>
    </div>
    <div class="btns">
      <el-button
        type="primary"
        v-if="allowPick"
        :disabled="!partData.length"
        size="small"
        @click="deleteAll"
        >整单删除（F4）</el-button
      >
      <el-button
        type="primary"
        v-if="allowPick"
        :disabled="!partData.length"
        size="small"
        @click="confimReceive"
        >确认领料（F3）</el-button
      >
      <!-- <el-button
        type="primary"
        v-if="allowPick"
        size="small"
        @click="showpart = true"
        >添加其他配件</el-button
      > -->
      <el-badge v-if="showRedDot" is-dot style="margin:0 10px;">
        <el-button
          type="primary"
          v-if="allowPick"
          size="small"
          @click="showUrgentPicker = true"
          >急采配件单</el-button
        >
      </el-badge>
      <el-button
        type="primary"
        v-if="allowPick && !showRedDot"
        size="small"
        @click="showUrgentPicker = true"
        >急采配件单</el-button
      >
      <el-button
        type="primary"
        v-if="allowPick"
        :disabled="!partData.length"
        size="small"
        @click="print"
        >打印（F10）</el-button
      >
    </div>
    <div class="part-wrap">
      <el-form
        ref="form"
        :model="confirmForm"
        inline
        :rules="rules"
        :show-message="false"
        size="mini"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="领料人" prop="businessManId">
          <ht-autocomplete
            v-model="technician"
            :fetch-suggestions="listAllReceptionMan()"
            placeholder="领料人"
            :trigger-on-focus="false"
            :maxlength="50"
            @select="technicianChange"
            highlight-first-item
          />
        </el-form-item>
        <el-form-item label="领料日期" prop="businessTime">
          <el-date-picker
            v-model="confirmForm.businessTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="confirmForm.remark" size="small" />
        </el-form-item>
        <el-form-item>
          <div class="confirm-order-bill" v-if="this.confirmOrder">
            <div>{{ this.confirmOrder.billNo }}</div>
            <div class="circle-dot"></div>
            <div>{{ PICK_STATUS[this.confirmOrder.status] }}</div>
          </div>
        </el-form-item>
      </el-form>
      <ht-setting-table
        :data="partData"
        setting-all-column
        show-table-setting
        :columns="partColumns"
        show-summary
        :summary-method="getPickSummaries"
        table-name="part-list"
        height="200px"
      />
    </div>
    <!-- 库存编辑 -->
    <StockEditor
      :visible="stockEditorVisible"
      :currentBillPart="currentBillPart"
      :stock="stock"
      :maxPickQty="maxPickQty"
      :billPartId="billPartId"
      @submit="editeConfirm"
      @close="stockEditorVisible = false"
    />
    <!-- 添加配件 -->
    <PartSelector
      :visible="showpart"
      :type="'PICK'"
      :companyId="store().userInfoMsg().companyId"
      @addPart="addPart"
      @close="showpart = false"
    />
    <!-- 库存不足处理 -->
    <OutOfStock
      :visible="outOfStockVisible"
      :companyId="store().userInfoMsg().companyId"
      :lackingQtyInfo="lackingQtyInfo"
      @lackingProcess="lackingProcess"
      @close="outOfStockVisible = false"
    />
    <!-- 急采配件单 -->
    <UrgentPick
      :visible="showUrgentPicker"
      :billId="billId"
      @close="afterOperateUrgent"
    />
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { getBillsParts, createBillsParts } from "@/api/repairs/bills";
import {
  WAIT_PICK_COLUMNS,
  DETAIL_COLUMNS,
  PART_COLUMNS
} from "../../const/columns";
import {
  listUrgentParts,
  picksReceiveToConfirm,
  picksDetails,
  createReceiveDetail,
  deleteReceiveDetail,
  confimReceive,
  updateReceiveDetail,
  picksDetailsById
} from "@/api/repairs/picks";
import PartsInfoSearch from "@/components/partsInfoSearch";
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
import PartSelector from "@/components/repair/partSelector/partSelector";
import StockEditor from "./components/StockEditor";
import OutOfStock from "./components/OutOfStock";
import UrgentPick from "./components/UrgentPick";
import { openNewWindow } from "@/utils/tool";
import * as store from "@/utils/store";
import { queryStorage } from "@/api/storage";
const PICK_STATUS = {
  toConfirm: "待确认",
  completed: "completed"
};
export default {
  props: {
    orderInfo: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    orderInfo: {
      handler(value) {
        if (value) {
          console.log("领料组件获取到更新的工单信息", value);
          this.form = { ...value };
          this.billId = value.id;
          this.waitToPickData = [];
          this.detailData = [];
          this.billPartPickId = null;
          this.partData = [];
          this.currentBillPart = {};
          this.list();
          this.getConfirmParts();
          this.queryUrgentParts();
        }
      },
      deep: true
    }
  },
  components: {
    StockEditor,
    PartSelector,
    OutOfStock,
    UrgentPick
  },
  computed: {
    allowPick() {
      return this.hasAutoPerm("receive");
    }
  },
  data() {
    const controlsColumn = {
      prop: "controls",
      type: "controls",
      label: "操作",
      width: 30,
      cantExport: true,
      render: (_, row) => (
        <div>
          <el-tooltip enterable={false} placement="top" content="添加">
            <span
              on-click={e => this.handleAddStore(row, e)}
              class="icon operation-icon el-icon-plus"
            />
          </el-tooltip>
        </div>
      )
    };
    const editControlsColumn = {
      prop: "controls",
      type: "controls",
      label: "操作",
      width: 80,
      cantExport: true,
      render: (_, row) => {
        return this.allowPick ? (
          <div>
            <el-tooltip enterable={false} placement="top" content="编辑">
              <span
                on-click={e => this.handleEditePart(row, e)}
                class="icon operation-icon el-icon-edit"
              />
            </el-tooltip>
            <el-tooltip enterable={false} placement="top" content="删除">
              <span
                on-click={e => this.handleDeletePart(row, e)}
                class="icon operation-icon el-icon-delete"
              />
            </el-tooltip>
          </div>
        ) : (
          <span></span>
        );
      }
    };
    return {
      PICK_STATUS: PICK_STATUS,
      technician: "",
      partId: null,
      rules: {
        businessManId: [
          { required: true, message: "请选择业务员", trigger: "change" }
        ],
        businessTime: [
          { required: true, message: "请输入业务时间", trigger: "change" }
        ]
      },
      tabs: [
        { name: "领料", id: "picking" },
        { name: "退料/领退记录", id: "log" }
      ],
      activeTab: "picking",
      waitToPickData: [],
      detailData: [],
      partData: [],
      waitToPickColumns: [...WAIT_PICK_COLUMNS],
      detailColumns: [controlsColumn, ...DETAIL_COLUMNS],
      partColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        editControlsColumn,
        ...PART_COLUMNS
      ],
      receiveDetail: {},
      canPickQty: 0,
      maxPickQty: 0,
      isUpdateStock: false, // 是否是编辑某条领料明细
      showUrgentPicker: false,
      stockEditorVisible: false, // 控制库存编辑弹窗显示
      showpart: false, // 添加配件弹窗
      outOfStockVisible: false, // 库存不足
      currentBillPart: {}, // 当前选中的工单配件
      waitSelectedRows: [],
      billId: null,
      stock: {}, // 在库存明细中选中的库存信息
      confirmOrder: {}, // 待确认领料单数据
      stockEditInfo: {}, // 编辑领料明细提交的内容
      lackingQtyInfo: {}, // 缺货数据
      billPartId: 0, // 当前配件材料id
      showRedDot: false, // 是否显示红点
      billPartPickId: null,
      form: {},
      confirmForm: {
        businessManId: "",
        businessTime: new Date()
      }
    };
  },
  mounted() {
    this.$sidebarBox.addSidebar({
      shortcutsKey: "Alt+P",
      title: "配件信息查询",
      width: "550px",
      height: "calc(100% - 140px)",
      contentRender: () => <PartsInfoSearch partId={this.partId} />
    });
    if (this.orderInfo) {
      this.form = { ...this.orderInfo };
      this.billId = this.orderInfo.id;
      this.waitToPickData = [];
      this.detailData = [];
      this.billPartPickId = null;
      this.partData = [];
      this.currentBillPart = {};
      this.list();
      this.getConfirmParts();
    }
  },
  activated() {
    this.$sidebarBox.addSidebar({
      shortcutsKey: "Alt+P",
      title: "配件信息查询",
      width: "550px",
      height: "calc(100% - 140px)",
      contentRender: () => <PartsInfoSearch partId={this.partId} />
    });
  },
  destroyed() {
    this.$sidebarBox.removeSidebar("Alt+P");
  },
  deactivated() {
    this.$sidebarBox.removeSidebar("Alt+P");
  },
  methods: {
    store() {
      return store;
    },
    afterOperateUrgent() {
      this.showUrgentPicker = false;
      this.queryUrgentParts();
    },
    getPartSummaries(param) {
      const { columns, data } = param;
      let totalQty = 0;
      let totalPickedQty = 0;
      let totalAmount = 0;
      let totalUrgentQty = 0;
      const sums = [];
      data.map(item => {
        totalQty = Number(Number(item.qty) + totalQty);
        totalPickedQty = Number(Number(item.pickedQty) + totalPickedQty);
        totalAmount = Number(Number(item.amount) + totalAmount);
        totalUrgentQty = Number(Number(item.urgentQty) + totalUrgentQty);
      });
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        switch (column.property) {
          case "qty":
            sums[index] = totalQty;
            break;
          case "pickedQty":
            sums[index] = totalPickedQty;
            break;
          case "amount":
            sums[index] = totalAmount.toFixed(2);
            break;
          case "urgentQty":
            sums[index] = totalUrgentQty;
            break;
        }
      });
      return sums;
    },
    getPickSummaries(param) {
      const { columns, data } = param;
      let totalQty = 0;
      let totalPrice = 0;
      let totalAmount = 0;
      const sums = [];
      data.map(item => {
        totalQty = Number(Number(item.qty) + totalQty);
        totalPrice = Number(Number(item.billPart.price) + totalPrice);
        totalAmount = Number(Number(item.price) + totalAmount);
      });
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          sums[6] = totalQty;
          sums[7] = totalPrice.toFixed(2);
          sums[8] = totalAmount.toFixed(2);
          return;
        }
      });
      return sums;
    },
    print() {
      openNewWindow(
        this.$router.resolve({
          path: "/Print/repair/pick/" + this.billPartPickId
        }).href,
        "print"
      );
    },
    listAllReceptionMan() {
      const { receptionMan } = this;
      const params = {
        company: "self",
        name: receptionMan,
        roles: ["technicianLeader", "technician"]
      };
      return (query, callback) => {
        searchTypeStaffs(params).then(res => {
          const data = res || [];
          callback(data.map(item => ({ id: item.id, value: item.name })));
        });
      };
    },
    list() {
      const { id: billId } = this.form;
      getBillsParts({ billId, queryChannel: "pick" }).then(res => {
        if (!res) {
          this.waitToPickData = [];
          return;
        }
        res.forEach(item => {
          item.discountLabel = item.discountRate
            ? Number(item.discountRate * 10).toFixed(2)
            : item.discountRate;
        });
        this.waitToPickData = res || [];
        if (res && res.length) {
          this.waitSelectedRows = [res[0]];
          this.waitToPickSelectChange(res[0]);
        }
      });
    },
    getConfirmParts() {
      console.log(this.form);
      // 一条工单对应1/0条待确认单，对应多条领退料单
      // 首先获取待确认领料单，然后通过待确认单去拿领退料单明细
      const { id: billId } = this.form;
      this.partData = [];
      picksReceiveToConfirm({ billId }).then(confirmRes => {
        this.confirmOrder = null;
        if (!confirmRes) return; // 没有待确认领料单那就别去获取领退料单明细了，因为没有
        this.confirmOrder = { ...confirmRes };
        const { id } = confirmRes;
        this.billPartPickId = id;
        picksDetails({ billPartPickId: id }).then(res => {
          this.partData = res || [];
        });
      });
    },
    queryUrgentParts() {
      this.showRedDot = false;
      listUrgentParts({
        billId: this.billId,
        statuses: ["toCommit", "rejected"]
      }).then(res => {
        if (res && res.length > 0) this.showRedDot = true;
      });
      listUrgentParts({
        billId: this.billId,
        statuses: ["toPick"]
      }).then(res => {
        if (res && res.length > 0) this.showRedDot = true;
      });
    },
    waitToPickSelectChange(e) {
      console.log(e);
      this.partId = e.partId;
      if (!this.hasBelongsPerm("receive")) return;
      this.currentBillPart = { ...e };
      this.loading = true;
      const {
        id,
        partId,
        partCode,
        qty,
        pickedQty,
        urgentQty,
        toConfirmQty
      } = e;
      this.billPartId = id;
      // console.log("需求数", qty);
      // console.log("已领料数", pickedQty);
      // console.log("转急采数", urgentQty);
      // console.log("待确认的领料数", toConfirmQty);
      this.canPickQty = qty - pickedQty - urgentQty - toConfirmQty; // 可领数=需求数-已领料数-转急采数-待确认的领料数
      console.log("可领数", this.canPickQty);
      queryStorage({
        condsBeforeAgg: {
          // parts: {
          //   code: e.part.code
          // },
          stocks: {
            ownerCompanyId: this.store().userInfoMsg().companyId,
            partId
          },
          filterZero: true
        },
        type: "LL",
        partId,
        partCode,
        mode: 0
      })
        .then(res => {
          const { rows } = res;
          const result = [];
          rows.forEach(item => {
            result.push({
              ...item.stock
            });
          });
          this.detailData = result || [];
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    whileOutOfStock() {
      createReceiveDetail({ billPartId: this.billPartId }).then(res => {
        this.lackingQtyInfo = { ...res };
        this.outOfStockVisible = true;
      });
    },
    // 编辑库存明细-点击确定后
    editeConfirm(form) {
      // 是否是编辑的领料单
      if (!this.isUpdateStock) {
        this.lackingQtyInfo = null;
        this.stockEditInfo = { ...form };
        const { stockId } = this.stock;
        const { billPartId, price, technicianId, remark, qty } = form;
        if (stockId) {
          this.createReceiveDetail({
            billPartId,
            price,
            technicianId,
            remark,
            stock: {
              stockId: stockId,
              qty: qty
            }
          });
        } else {
          this.createReceiveDetail({
            billPartId,
            price,
            technicianId,
            remark,
            noAssignQty: qty
          });
        }
      } else {
        console.log(form);
        console.log(this.receiveDetail);
        const { price, technicianId, remark, qty } = form;
        const { id, stockId, billPartId } = this.receiveDetail;
        this.updateReceiveDetail({
          id,
          billPartId,
          price,
          technicianId,
          remark,
          stock: {
            stockId: stockId,
            qty: qty
          }
        });
      }
    },
    lackingProcess(data) {
      const { stock, others, urgent } = data;
      const { billPartId, price, technicianId, remark } = this.stockEditInfo;
      // 获取基础信息
      const baseInfo = {
        billPartId,
        price,
        technicianId,
        remark
      };
      // 获取其他库存信息
      let othersInfo = null;
      if (others && others.length) {
        othersInfo = others;
      }
      // 获取急件信息
      let urgentInfo = null;
      if (urgent && urgent.qty) {
        urgentInfo = urgent;
      }
      if (this.isUpdateStock) {
        const { id } = this.receiveDetail;
        this.updateReceiveDetail({
          id,
          ...baseInfo,
          stock,
          others: othersInfo,
          urgent: urgentInfo
        });
      } else {
        this.createReceiveDetail({
          ...baseInfo,
          stock,
          others: othersInfo,
          urgent: urgentInfo
        });
      }
    },
    createReceiveDetail(data) {
      createReceiveDetail(data)
        .then(() => {
          this.stockEditorVisible = false;
          this.outOfStockVisible = false;
          // 添加到确认单后，需要去更新库存明细，我直接处理成都去刷新，
          // 因为工单配件材料和下方的确认单的都是需要更新的，干脆就直接全部更新了
          this.list();
          this.getConfirmParts();
          this.queryUrgentParts();
        })
        .catch(res => {
          const { code, data } = res;
          if (code == "lacking-err") {
            // this.$message.warning("库存不足，请从其他库存领料或转急件单");
            this.stockEditorVisible = false;
            this.lackingQtyInfo = { ...data };
            this.outOfStockVisible = true;
            return;
          }
          // this.$message.warning(message);
        });
    },
    updateReceiveDetail(data) {
      updateReceiveDetail(data)
        .then(() => {
          this.stockEditorVisible = false;
          this.outOfStockVisible = false;
          // 添加到确认单后，需要去更新库存明细，我直接处理成都去刷新，
          // 因为工单配件材料和下方的确认单的都是需要更新的，干脆就直接全部更新了
          this.list();
          this.getConfirmParts();
          this.queryUrgentParts();
        })
        .catch(res => {
          const { code, data, message } = res;
          if (code == "lacking-err") {
            this.$message.warning("库存不足，请从其他库存领料或转急件单");
            this.stockEditorVisible = false;
            this.lackingQtyInfo = { ...data };
            this.outOfStockVisible = true;
            return;
          }
          this.$message.warning(message);
        });
    },
    detailSelectChange(e) {
      console.log(e);
    },
    handleEditePart(row) {
      this.stockEditInfo = { ...row };
      this.receiveDetail = { ...row };
      this.isUpdateStock = true;
      const {
        billPart,
        stock,
        part,
        price,
        qty,
        technicianId,
        technicianName
      } = row;
      console.log(row);
      //可修改数 = 需求数 - 已领料数 - 转急件数 - 该待领料单中该配件记录下相同配件的领料数 + 当前这条领料配件原本有的数量
      this.maxPickQty =
        Number(billPart.qty) -
        Number(billPart.pickedQty) -
        Number(billPart.urgentQty) -
        Number(billPart.toConfirmQty) +
        Number(qty);
      console.log(this.maxPickQty);
      // 列表中没有动态数，只有去查询接口
      picksDetailsById(row.id)
        .then(res => {
          this.stock = {
            partInfoCode: part.code,
            partInfoName: part.name,
            partInfoBrand: part.brand,
            ...stock,
            price,
            qty,
            realQty: res.stock.qty,
            dynaQty: res.stock.autoQty,
            technicianId,
            technicianName
          };
          this.stockEditorVisible = true;
        })
        .catch(() => {
          this.stock = {
            partInfoCode: part.code,
            partInfoName: part.name,
            partInfoBrand: part.brand,
            ...stock,
            qty,
            price,
            technicianId,
            technicianName
          };
          this.stockEditorVisible = true;
        });
    },
    handleDeletePart(row) {
      this.$confirm(`确定删除这条明细？`, "提示").then(() => {
        deleteReceiveDetail({ ids: [row.id] }).then(() => {
          this.$message.success("删除成功！");
          this.list();
          this.getConfirmParts();
        });
      });
    },
    deleteAll() {
      const ids = [];
      this.partData.forEach(item => {
        ids.push(item.id);
      });
      this.$confirm(`确定删除所有领料明细？`, "提示").then(() => {
        deleteReceiveDetail({ ids }).then(() => {
          this.$message.success("删除成功！");
          this.list();
          this.getConfirmParts();
        });
      });
    },
    technicianChange(e) {
      this.confirmForm.businessManId = e.id;
      this.$forceUpdate();
    },
    confimReceive() {
      if (!this.confirmOrder) {
        this.$message.warning("请添加配件！");
        return;
      }
      this.$refs.form.validate((valid, err) => {
        if (!valid) {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          confimReceive({ ...this.confirmForm, id: this.confirmOrder.id }).then(
            () => {
              this.$message.success("已确认领料");
              this.list();
              this.getConfirmParts();
            }
          );
        }
      });
    },
    // 库存明细中点击添加按钮
    handleAddStore(row) {
      console.log(row);
      console.log(this.currentBillPart);
      this.isUpdateStock = false;
      this.maxPickQty = this.canPickQty;
      this.stock = {
        ...row,
        realQty: row.qty,
        partInfoCode: this.currentBillPart?.part?.code,
        partInfoName: this.currentBillPart?.part?.name,
        qty: row.dynaQty > this.maxPickQty ? this.maxPickQty : row.dynaQty,
        partInfoProductionPlace: this.currentBillPart?.part?.productionPlace
      };
      this.stockEditorVisible = true;
    },
    addPart(e) {
      console.log("配件列表接收到:", e);
      const { id: billId } = this.form;
      const { qty, partId, remark, price, lockPrice } = e;
      const isExist = this.waitToPickData.findIndex(
        item => item.partId === partId
      );
      if (isExist > -1) {
        this.$confirm(
          `即将添加的配件已经存在于列表中，是否继续？`,
          "提示"
        ).then(() => {
          this.createPart({
            billId,
            type: "part",
            qty,
            price,
            partId,
            remark,
            feeProperty: "self",
            lockPrice,
            discountRate: 1
          });
        });
        return;
      }
      this.createPart({
        billId,
        type: "part",
        qty,
        price,
        partId,
        remark,
        lockPrice,
        feeProperty: "self",
        discountRate: 1
      });
    },
    createPart(data) {
      createBillsParts(data).then(() => {
        this.$message.success("添加成功");
        this.list();
        this.$emit("updateCount");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.operation-icon {
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
}
.el-icon-delete {
  background: #f56c6c;
}
.picking-wrap {
  display: flex;
  flex-direction: column;
  // justify-content: flex-start;
  // align-items: flex-start;
  box-sizing: border-box;
  // height: 100%;
  padding: 0 5px 0 0;
  overflow-y: scroll;
  ::v-deep {
    .el-table__footer-wrapper {
      .cell {
        text-align: left;
      }
    }
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
  }
}
.btn-wrap {
  width: 100%;
  height: 300px;
  line-height: 300px;
  text-align: center;
}
.part-wrap {
  // flex: 1;
  border-radius: 5px;
  background: #fff;
  padding: 10px;
}
.confirm-order-bill {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #00dc8d;
  height: 28px;
  margin: 0;
}
.circle-dot {
  width: 4px;
  height: 4px;
  margin: 0 5px;
  border-radius: 100%;
  background-color: #00dc8d;
}
</style>
