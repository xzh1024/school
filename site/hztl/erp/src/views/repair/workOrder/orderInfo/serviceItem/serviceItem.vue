<template>
  <div class="container-box" style="background:#fff;overFlow:hidden">
    <div style="height: 100%;">
      <div class="flex-container column-flex">
        <div class="flex-block-bg btns">
          <!-- 头部按钮 -->
          <el-button
            v-if="hasBelongsPerm('update', ['self', 'others'])"
            type="primary"
            size="small"
            :disabled="!enableEdit || !editAble"
            @click="showServiceSelector = true"
            >添加项目</el-button
          >
          <el-button
            v-if="hasBelongsPerm('dispatch', ['our'])"
            v-show="showSend"
            :disabled="!enableEdit || !canSend || !editAble"
            type="primary"
            size="small"
            @click="showSendWork = true"
            >派工</el-button
          >
          <el-button
            v-if="hasBelongsPerm('startComplete', ['our'])"
            v-show="showStartAndComplete"
            :disabled="!enableEdit || !canStart || !editAble"
            type="primary"
            size="small"
            @click="startWork"
            >开工</el-button
          >
          <el-button
            v-if="hasBelongsPerm('startComplete', ['our'])"
            v-show="showStartAndComplete"
            :disabled="!enableEdit || !canComplete || !editAble"
            type="primary"
            size="small"
            @click="completeWork"
            >完工</el-button
          >
          <el-button
            type="primary"
            v-if="hasBelongsPerm('rework', ['our'])"
            v-show="showStartAndComplete"
            :disabled="!enableEdit || !canback || !editAble"
            size="small"
            @click="returnWork"
            >返工</el-button
          >
        </div>
        <div class="flex-block-bg flex-block-margin  seach-form-box">
          <div class="item-wrap">
            <div
              :class="{
                item: true,
                active: !activeGroupIndex
              }"
              @click="filterTable()"
            >
              项目总数: {{ this.oriTableData.length }}
            </div>
            <div
              :class="{
                item: true,
                active: activeGroupIndex == 'toDispatch'
              }"
              @click="filterTable('toDispatch')"
            >
              待派工:
              {{
                this.oriTableData.filter(item => item.status == "toDispatch")
                  .length
              }}
            </div>
            <div
              :class="{
                item: true,
                active: activeGroupIndex == 'toStart'
              }"
              @click="filterTable('toStart')"
            >
              待开工:
              {{
                this.oriTableData.filter(item => item.status == "toStart")
                  .length
              }}
            </div>
            <div
              :class="{
                item: true,
                active: activeGroupIndex == 'repairing'
              }"
              @click="filterTable('repairing')"
            >
              施工中:
              {{
                this.oriTableData.filter(item => item.status == "repairing")
                  .length
              }}
            </div>
            <div
              :class="{
                item: true,
                active: activeGroupIndex == 'reworking'
              }"
              @click="filterTable('reworking')"
            >
              返工中:
              {{
                this.oriTableData.filter(item => item.status == "reworking")
                  .length
              }}
            </div>
            <div
              :class="{
                item: true,
                active: activeGroupIndex == 'completed'
              }"
              @click="filterTable('completed')"
            >
              已完成:
              {{
                this.oriTableData.filter(item => item.status == "completed")
                  .length
              }}
            </div>
          </div>
        </div>
        <div class="auto-block flex-block-bg flex-block-margin table-box">
          <ht-card class="auto-card">
            <ht-setting-table
              :data="tableData"
              setting-all-column
              selection-type="multiple"
              show-table-setting
              :selected-rows.sync="selectedRows"
              :columns="tableColumns"
              table-name="work-orders-service-table"
            />
          </ht-card>
        </div>
      </div>
      <!-- 项目选择弹窗 -->
      <ServiceSelector
        :visible="showServiceSelector"
        :vehicle="orderInfo.vehicle"
        @addService="addService"
        @addSet="addSet"
        @addFixSet="addFixSet"
        @addPaidService="addPaidService"
        @addPaidSet="addPaidSet"
        @close="showServiceSelector = false"
      />
      <SendWork
        :visible="showSendWork"
        @dispatchWork="dispatchWork"
        @close="showSendWork = false"
      />
    </div>
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import {
  getBillsItems,
  createBillsItems,
  updateBillsItems,
  deleteBillsItems,
  dispatchItem,
  startItem,
  completeItem,
  reworkItem
} from "@/api/repairs/bills";
import {
  ITEM_STATUS,
  FEE_PROPERTY,
  FEE_PROPERTY_OPTIONS
} from "../../const/columns";
import { precisionsFixed, searchMixin } from "@/mixins";
import ServiceSelector from "@/components/repair/serviceSelector/serviceSelector";
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
import SendWork from "./sendWork/sendWork";
import { dateFormatFull } from "@/utils/date";
import { getDisCountInfo } from "@/utils/discount";
export default {
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
  watch: {
    orderInfo: {
      handler(value) {
        if (value) {
          const { status } = value;
          this.enableEdit = status == "recepting" || status == "repairing";
          console.log("服务项目组件获取到更新的工单信息", value);
          this.form = { ...value };
          this.list();
        }
      },
      deep: true
    }
  },
  mixins: [precisionsFixed, searchMixin],
  data() {
    return {
      activeGroupIndex: "",
      loading: false,
      options: [],
      oriTableData: [],
      enableEdit: false,
      selectedRows: [],
      form: {},
      showSendWork: false,
      showServiceSelector: false,
      tableData: [],
      tableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "multiple",
          label: "选择",
          type: "multiple",
          width: CELL_WIDTH.multiple,
          cantExport: true
        },
        {
          prop: "controls",
          type: "controls",
          label: "操作",
          width: 70,
          cantExport: true,
          render: (value, row) => (
            <div>
              <el-tooltip enterable={false} placement="top" content="删除">
                {this.hasEditPerm && this.enableEdit ? (
                  <span
                    on-click={e => this.handleDelete(row, e)}
                    class="icon operation-icon icon-delete-info"
                  />
                ) : (
                  ""
                )}
              </el-tooltip>
            </div>
          )
        },
        {
          prop: "itemCode",
          label: "项目编码",
          width: CELL_WIDTH.date
        },
        {
          prop: "itemName",
          label: "项目名称",
          width: CELL_WIDTH.date,
          formatter: (value, row) => {
            let setName = "";
            if (row.setId > 0) {
              setName = row.setName;
            }
            return setName ? `${value}(${setName})` : value;
          }
        },
        {
          prop: "status",
          label: "状态",
          width: CELL_WIDTH.date,
          formatter: value => {
            return ITEM_STATUS[value] || "";
          }
        },
        {
          prop: "feeProperty",
          label: "费用性质",
          width: CELL_WIDTH.date,
          render: (value, row, index) => {
            const { flags } = row;
            const { lockFeeProperty } = flags;
            return this.enableEdit && !lockFeeProperty && this.hasEditPerm ? (
              <ht-select
                v-model={value}
                size="mini"
                disabled={!this.enableEdit}
                on-change={e => this.feeTypeChange(e, index)}
                class="switch-1"
                highlight-first-item
              >
                {FEE_PROPERTY_OPTIONS.map(item => {
                  return (
                    <el-option
                      key={item.id}
                      label={item.name}
                      value={item.id}
                      disabled={item.disabled}
                    />
                  );
                })}
              </ht-select>
            ) : (
              <span>{FEE_PROPERTY[value]}</span>
            );
          }
        },
        {
          prop: "chargeManHour",
          label: "收费工时",
          width: CELL_WIDTH.fundCategoryName,
          render: (value, row, index) => {
            const { flags } = row;
            const notChargeManHour = flags && flags.notChargeManHour;
            return notChargeManHour || !this.enableEdit || !this.hasEditPerm ? (
              <span style="display:inline-block;width:100%;text-align:center;">
                {value}
              </span>
            ) : (
              <div>
                <HtFormatNumber
                  v-model={value}
                  min={1}
                  size="mini"
                  precision-type="qty"
                  on-set={this.inputValueChange.bind(
                    this,
                    index,
                    "chargeManHour"
                  )}
                />
              </div>
            );
          }
        },
        {
          prop: "checkManHour",
          label: "考核工时",
          width: CELL_WIDTH.date
        },
        {
          prop: "manHourPrice",
          label: "工时单价",
          width: CELL_WIDTH.fundCategoryName,
          render: (value, row, index) => {
            const { flags } = row;
            const lockPrice = flags && flags.lockPrice;
            return lockPrice || !this.enableEdit || !this.hasEditPerm ? (
              <span style="display:inline-block;width:100%;text-align:center;">
                {value}
              </span>
            ) : (
              <div>
                <HtFormatNumber
                  v-model={value}
                  min={0}
                  size="mini"
                  precision-type="price"
                  on-set={this.inputValueChange.bind(
                    this,
                    index,
                    "manHourPrice"
                  )}
                />
              </div>
            );
          }
        },
        {
          prop: "discountLabel",
          label: "折扣",
          width: CELL_WIDTH.fundCategoryName,
          render: (value, row, index) => {
            const { flags } = row;
            const notDiscount = flags && flags.notDiscount;
            return notDiscount || !this.enableEdit || !this.hasEditPerm ? (
              <span style="display:inline-block;width:100%;text-align:center;">
                {value ? value : "-"}
              </span>
            ) : (
              <div>
                <HtFormatNumber
                  v-model={value}
                  min={0}
                  size="mini"
                  precision-type="price"
                  on-set={this.inputValueChange.bind(
                    this,
                    index,
                    "discountLabel"
                  )}
                />
              </div>
            );
          }
        },
        {
          prop: "amount",
          label: "工时费用",
          width: CELL_WIDTH.date
        },
        {
          prop: "itemCategory",
          label: "维修类型",
          width: CELL_WIDTH.date
        },
        {
          prop: "technicianGroupName",
          label: "维修班组",
          width: CELL_WIDTH.date
        },
        {
          prop: "stationName",
          label: "工位",
          width: CELL_WIDTH.date
        },
        {
          label: "维修技师",
          width: CELL_WIDTH.bankAccount,
          formatter: (_, row) => {
            const { technician } = row;
            const technicians = (technician && technician.technicians) || [];
            const techs = [];
            let totalWeight = 0;
            technicians.forEach(item => {
              totalWeight += Number(Number(item.weight).toFixed(2));
            });
            // totalWeight = totalWeight || 1;
            technicians.forEach(item => {
              techs.push(
                `${item.technicianName}(${(
                  Number(totalWeight ? item.weight / totalWeight : 0) * 100
                ).toFixed(2) + "%"})`
              );
            });
            return techs.join(",");
          }
        },
        {
          label: "主修人",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { technician } = row;
            return technician && technician.majorTechnicianName;
          }
        },
        {
          label: "派工人",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { log } = row;
            return log && log.dispatchManName;
          }
        },
        {
          label: "派工时间",
          width: CELL_WIDTH.fundCategoryName,
          formatter: (_, row) => {
            const { log } = row;
            return log && dateFormatFull(log.dispatchTime);
          }
        },
        {
          label: "开工时间",
          width: CELL_WIDTH.fundCategoryName,
          formatter: (_, row) => {
            const { log } = row;
            return log && dateFormatFull(log.startTime);
          }
        },
        {
          label: "完工时间",
          width: CELL_WIDTH.fundCategoryName,
          formatter: (_, row) => {
            const { log } = row;
            return log && dateFormatFull(log.completeTime);
          }
        },
        {
          prop: "chargeMan",
          label: "原主修人/返修责任人",
          width: CELL_WIDTH.companySortName,
          render: (value, row, index) => {
            const { feeProperty, chargeManName } = row;
            return feeProperty === "rework" && this.hasEditPerm ? (
              <div>
                <ht-autoselect
                  v-model={value}
                  size="mini"
                  fetch-suggestions={query => this.listAllReceptionMan(query)}
                  // on={{
                  //   "update:defaultValue": val =>
                  //     (this.tableData.chargeManName = val)
                  // }}
                  placeHolder="请选择原主修人/返修责任人"
                  default-value={chargeManName}
                  remote
                  filter-zero
                  no-match-text="请选择原主修人/返修责任人"
                  class="switch-focus focus-position-id"
                  on-change={e => this.chargeManChange(index, e)}
                  loading={this.loading}
                />
              </div>
            ) : (
              <span>{chargeManName}</span>
            );
          }
        },
        {
          prop: "remark",
          label: "项目备注",
          width: CELL_WIDTH.date,
          render: (value, row, index) => {
            return this.enableEdit && this.hasEditPerm ? (
              <div>
                <el-input
                  size="mini"
                  value={value}
                  place-holder="项目备注"
                  onInput={this.inputChange.bind(this, index, "remark")}
                  size="small"
                />
              </div>
            ) : (
              <span>{value}</span>
            );
          }
        }
      ]
    };
  },
  computed: {
    showSend() {
      const { flags } = this.orderInfo;
      return flags?.needDispatch;
    },
    hasEditPerm() {
      return this.hasBelongsPerm("update", ["self", "others"]);
    },
    showStartAndComplete() {
      const { flags } = this.orderInfo;
      return flags?.needStartAndComplete;
    },
    canSend() {
      const show = true;
      if (!this.selectedRows || !this.selectedRows.length) return false;
      // this.selectedRows.forEach(item => {
      //   if (item.status !== "toDispatch") {
      //     show = false;
      //   }
      // });
      return show;
    },
    canStart() {
      let show = true;
      if (!this.selectedRows || !this.selectedRows.length) return false;
      this.selectedRows.forEach(item => {
        if (item.status !== "toStart") {
          show = false;
        }
      });
      return show;
    },
    canComplete() {
      let show = true;
      if (!this.selectedRows || !this.selectedRows.length) return false;
      this.selectedRows.forEach(item => {
        if (item.status !== "repairing" && item.status !== "reworking") {
          show = false;
        }
      });
      return show;
    },
    canback() {
      let show = true;
      if (!this.selectedRows || !this.selectedRows.length) return false;
      this.selectedRows.forEach(item => {
        if (item.status !== "completed") {
          show = false;
        }
      });
      return show;
    }
  },
  mounted() {
    if (this.orderInfo) {
      this.form = { ...this.orderInfo };
      const { status } = this.orderInfo;
      this.enableEdit = status == "recepting" || status == "repairing";
      console.log("服务项目组件获取到工单信息", this.form);
      this.list();
    }
  },
  components: {
    ServiceSelector,
    SendWork
  },
  methods: {
    chargeManChange(index, e) {
      this.tableData[index].chargeMan = e;
      this.updateItem(index);
      this.$forceUpdate();
    },

    async listAllReceptionMan(name) {
      const params = {
        company: "self",
        name: name,
        roles: ["technicianLeader", "technician"]
      };
      const res = (await searchTypeStaffs(params)) || [];
      return res;
    },
    feeTypeChange(e, index) {
      this.tableData[index].feeProperty = e;
      this.tableData[index].chargeMan = null;
      this.tableData[index].chargeManName = "";
      this.updateItem(index);
    },
    list() {
      const { id: billId } = this.form;
      getBillsItems({ billId }).then(res => {
        if (!res) {
          this.oriTableData = [];
          this.tableData = [];
          return;
        }
        res.forEach(item => {
          item.discountLabel = item.discountRate
            ? (Number(item.discountRate) * 10).toFixed(2)
            : item.discountRate;
        });
        this.oriTableData = res || [];
        this.filterTable();
      });
    },
    filterTable(e) {
      this.activeGroupIndex = e;
      if (!e) {
        this.tableData = [...this.oriTableData];
        return;
      }
      this.tableData = this.oriTableData.filter(item => item.status == e);
    },
    handleDelete(e) {
      // setId > 0为套餐
      let tips = "";
      if (e.setId) {
        tips = `删除该项目将会连同套餐中的其他项目及配件一并删除，是否删除-${e.setName}?`;
      } else {
        tips = "是否确认删除该项目";
      }
      this.$confirm(tips, "提示").then(() => {
        deleteBillsItems({
          type: "item",
          billItemId: e.id
        }).then(() => {
          this.list();
          this.$emit("updateCount");
        });
      });
    },
    addService(e) {
      console.log("项目列表接收到-项目:", e);
      const { id: billId } = this.form;
      const { id: itemId, remark } = e;
      const discountInfo = getDisCountInfo(
        this.orderInfo,
        "item",
        e.flags.discount
      );
      const isExist = this.tableData.findIndex(item => item.itemId === itemId);
      if (isExist > -1) {
        this.$confirm(
          `即将添加的项目已经存在于列表中，是否继续？`,
          "提示"
        ).then(() => {
          this.createItem({
            billId,
            type: "item",
            qty: 1,
            feeProperty: "self",
            discountRate: discountInfo.discount,
            itemId,
            remark
          });
        });
        return;
      }
      this.createItem({
        billId,
        type: "item",
        feeProperty: "self",
        qty: 1,
        discountRate: discountInfo.discount,
        itemId,
        remark
      });
    },
    addPaidService(e) {
      console.log(e);
      const { id: billId } = this.form;
      const { platformGoodsId, remark } = e;
      const isExist = this.tableData.findIndex(
        item => item.paidItemPlatformGoodsId === platformGoodsId
      );
      if (isExist > -1) {
        this.$confirm(
          `即将添加的项目已经存在于列表中，是否继续？`,
          "提示"
        ).then(() => {
          this.createItem({
            billId,
            type: "paidItem",
            qty: 1,
            feeProperty: "paid",
            paidItemPlatformGoodsId: platformGoodsId,
            remark
          });
        });
        return;
      }
      this.createItem({
        billId,
        type: "paidItem",
        qty: 1,
        feeProperty: "paid",
        paidItemPlatformGoodsId: platformGoodsId,
        remark
      });
    },
    addSet(e) {
      console.log("项目列表接收到-套餐:", e);
      const { id: billId } = this.form;
      const { id: normalSetId, remark } = e;
      const isExist = this.tableData.findIndex(
        item => item.setId === normalSetId
      );
      const discountInfo = getDisCountInfo(this.orderInfo, "set");
      if (isExist > -1) {
        this.$confirm(
          `即将添加的项目已经存在于列表中，是否继续？`,
          "提示"
        ).then(() => {
          this.createItem({
            billId,
            type: "normalSet",
            qty: 1,
            discountRate: discountInfo.discount,
            feeProperty: "self",
            normalSetId,
            remark
          });
        });
        return;
      }
      this.createItem({
        billId,
        type: "normalSet",
        qty: 1,
        discountRate: discountInfo.discount,
        feeProperty: "self",
        normalSetId,
        remark
      });
    },
    addPaidSet(e) {
      console.log(e);
      const { id: billId } = this.form;
      const { platformGoodsId, remark } = e;
      const isExist = this.tableData.findIndex(
        item => item.paidSetPlatformGoodsId === platformGoodsId
      );
      if (isExist > -1) {
        this.$confirm(
          `即将添加的项目已经存在于列表中，是否继续？`,
          "提示"
        ).then(() => {
          this.createItem({
            billId,
            type: "paidSet",
            qty: 1,
            feeProperty: "paid",
            paidSetPlatformGoodsId: platformGoodsId,
            remark
          });
        });
        return;
      }
      this.createItem({
        billId,
        type: "paidSet",
        qty: 1,
        feeProperty: "paid",
        paidSetPlatformGoodsId: platformGoodsId,
        remark
      });
    },
    addFixSet(e) {
      console.log("项目列表接收到-定保套餐:", e);
      const { id: billId } = this.form;
      const { id: treeSetId, remark } = e;
      const discountInfo = getDisCountInfo(this.orderInfo, "set");
      const isExist = this.tableData.findIndex(
        item => item.setId === treeSetId
      );
      if (isExist > -1) {
        this.$confirm(
          `即将添加的项目已经存在于列表中，是否继续？`,
          "提示"
        ).then(() => {
          this.createItem({
            billId,
            type: "treeSet",
            qty: 1,
            feeProperty: "self",
            discountRate: discountInfo.discount,
            treeSetId,
            remark
          });
        });
        return;
      }
      this.createItem({
        billId,
        type: "treeSet",
        qty: 1,
        feeProperty: "self",
        discountRate: discountInfo.discount,
        treeSetId,
        remark
      });
    },
    createItem(data) {
      createBillsItems(data).then(() => {
        this.$message.success("添加成功");
        this.list();
        this.$emit("updateCount");
      });
    },
    inputValueChange(index, key, e) {
      if (key === "discountLabel") {
        // 折扣很特殊，你不能说没有就是0，0折代表免费了
        const value = e ? this.precisionFormat(e, "money") : null;
        this.inputChange(index, key, value);
      } else {
        const value = this.precisionFormat(e, "money");
        this.inputChange(index, key, value);
      }
    },
    inputChange(index, key, e) {
      this.tableData[index][key] = e;
      this.updateItem(index);
    },
    updateItem(index) {
      const {
        id,
        feeProperty,
        chargeManHour,
        manHourPrice,
        chargeMan,
        qty,
        remark,
        discountLabel
      } = this.tableData[index];
      updateBillsItems({
        id,
        feeProperty,
        chargeManHour,
        chargeMan,
        manHourPrice,
        qty,
        remark,
        discountRate: discountLabel
          ? Number(discountLabel / 10).toFixed(2)
          : discountLabel
      }).then(() => {
        this.list();
      });
    },
    dispatchWork(data) {
      this.showSendWork = false;
      const { id: billId } = this.orderInfo;
      const billItemIds = [];
      this.selectedRows.forEach(item => {
        billItemIds.push(item.id);
      });
      dispatchItem({
        ...data,
        billId,
        billItemIds
      }).then(() => {
        this.$message.success("派工成功！");
        this.list();
      });
    },
    startWork() {
      const { id: billId } = this.orderInfo;
      const billItemIds = [];
      this.selectedRows.forEach(item => {
        billItemIds.push(item.id);
      });
      this.$confirm(`是否确认将项目的状态切换为开工？`, "提示").then(() => {
        startItem({ billId, billItemIds }).then(() => {
          this.$message.success("开工成功！");
          this.list();
        });
      });
    },
    completeWork() {
      const { id: billId } = this.orderInfo;
      const billItemIds = [];
      this.selectedRows.forEach(item => {
        billItemIds.push(item.id);
      });
      this.$confirm(`是否确认将项目的状态切换完工？`, "提示").then(() => {
        completeItem({ billId, billItemIds }).then(() => {
          this.$message.success("完工成功！");
          this.list();
        });
      });
    },
    returnWork() {
      const { id: billId } = this.orderInfo;
      const billItemIds = [];
      this.selectedRows.forEach(item => {
        billItemIds.push(item.id);
      });
      this.$confirm(`是否确认将项目的状态切换返工？`, "提示").then(() => {
        reworkItem({ billId, billItemIds }).then(() => {
          this.$message.success("返工成功！");
          this.list();
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.btns {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  background: #fff;
  border-radius: 2px;
  padding-left: 10px;
}
.item-wrap {
  display: flex;
  justify-content: flex-start;
  .item {
    border-radius: 2px;
    border: solid 1px #eee;
    margin-right: 10px;
    padding: 2px 10px;
    cursor: pointer;
  }
  .active {
    color: #3aa7ff;
    border-color: #3aa7ff;
    border-radius: 5px;
    background: #3aa6ff61;
  }
}
.table-box {
  padding-bottom: 40px;
}
</style>
