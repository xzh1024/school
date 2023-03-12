<template>
  <div class="container-box" style="background:#fff;">
    <div style="height: 100%;">
      <div class="flex-container column-flex">
        <div class="flex-block-bg btns">
          <el-button
            type="primary"
            size="small"
            :disabled="!enableEdit || !editAble"
            @click="showPartSelectorDialog"
            >添加配件</el-button
          >
        </div>
        <div class="auto-block flex-block-bg flex-block-margin table-box">
          <ht-setting-table
            :data="tableData"
            :selected-rows.sync="selectedRows"
            setting-all-column
            show-table-setting
            :columns="tableColumns"
            @row-dblclick="handlePartSelect"
            table-name="work-orders-part-table"
          />
        </div>
        <div
          class="auto-block flex-block-bg flex-block-margin table-box part-detail-box"
        >
          <ht-card title="领/退料记录" class="auto-card">
            <div
              slot="after-title"
              style="text-align: right;padding-bottom:10px;"
            >
              <el-button type="primary" size="mini" @click="showAllDetail"
                >查看该工单领/退料记录</el-button
              >
            </div>
            <ht-setting-table
              :data="detailData"
              setting-all-column
              show-table-setting
              :columns="detailColumns"
              :row-class-name="itemTableRowClassName"
              table-name="work-orders-part-table-detail"
            />
          </ht-card>
        </div>
      </div>
    </div>
    <PartSelector
      :visible="showPartSelector"
      :discount="discount"
      :filterZero="false"
      :canDiscount="canDiscount"
      :billType="billType"
      @addPart="addPart"
      @close="showPartSelector = false"
    />
    <ht-dialog
      :visible="showPartDetailDialog"
      title="领/退料记录"
      width="1200px"
      @close="showPartDetailDialog = false"
    >
      <div class="order-info">
        <span
          >车牌号 <span>{{ orderInfo.vehicle.plateNumber }}</span></span
        >
        <span
          >工单号 <span>{{ orderInfo.billNo }}</span></span
        >
        <span
          >工单类型 <span>{{ orderInfo.businessCategoryName }}</span></span
        >
      </div>
      <ht-setting-table
        :data="allDetailData"
        setting-all-column
        show-table-setting
        :columns="detailColumns"
        :row-class-name="itemTableRowClassName"
        style="height:400px"
        table-name="work-orders-part-table-detail"
      />
      <div
        class="dialog-footer-align flex-block-bg flex-block-padding flex-block-margin"
      >
        <el-button size="small" @click="cancelHandle">关闭（ESC）</el-button>
      </div>
    </ht-dialog>
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { precisionsFixed } from "@/mixins";
import {
  FEE_PROPERTY,
  FEE_PROPERTY_OPTIONS,
  PART_DETAIL_COLUMNS
} from "@/constants/repair/partColumns";
import PartSelector from "@/components/repair/partSelectorInBill/partSelector";
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
import {
  getBillsParts,
  createBillsParts,
  updateBillsParts,
  deleteBillsParts
} from "@/api/repairs/bills";
import { picksDetailsForBills } from "@/api/repairs/picks";
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
          const { status, billType } = value;
          this.billType = billType;
          this.enableEdit = status == "recepting" || status == "repairing";
          // console.log("配件组件获取到更新的工单信息", value);
          this.form = { ...value };
          this.list();
          this.initDefaultDiscount();
        }
      },
      deep: true
    }
  },
  mixins: [precisionsFixed],
  components: {
    PartSelector
  },
  data() {
    return {
      loading: false,
      selectedRows: [],
      options: [],
      billPartId: null,
      billType: "",
      form: {},
      enableEdit: false,
      showPartDetailDialog: false,
      showPartSelector: false,
      discount: "",
      canDiscount: false,
      tableData: [],
      detailData: [],
      allDetailData: [],
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
          prop: "controls",
          type: "controls",
          label: "操作",
          width: 70,
          cantExport: true,
          render: (value, row) => {
            const { pickedQty, urgentQty, toConfirmQty } = row;
            const disabledDelete =
              pickedQty > 0 || urgentQty > 0 || toConfirmQty > 0;
            return !disabledDelete && this.enableEdit ? (
              <div>
                <el-tooltip enterable={false} placement="top" content="删除">
                  {this.hasEditPerm ? (
                    <span
                      on-click={e => this.handleDelete(row, e)}
                      class="icon operation-icon icon-delete-info"
                    />
                  ) : (
                    ""
                  )}
                </el-tooltip>
              </div>
            ) : (
              ""
            );
          }
        },
        {
          prop: "partCode",
          label: "配件编码",
          width: CELL_WIDTH.date
        },
        {
          prop: "partName",
          label: "配件名称",
          width: CELL_WIDTH.no,
          formatter: (value, row) => {
            const { setId, setName } = row;
            return setId > 0 ? `${value}(${setName})` : `${value}`;
          }
        },
        {
          label: "标签",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            const { part } = row;
            if (!part) {
              return <span></span>;
            }
            const { isAccessories } = part.flags;
            return isAccessories ? <span class="tag">辅</span> : "";
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
                size="mini"
                v-model={value}
                disabled={!this.enableEdit}
                options={FEE_PROPERTY_OPTIONS}
                on-change={e => this.feeTypeChange(e, index)}
                class="switch-1"
                highlight-first-item
              />
            ) : (
              <span>{FEE_PROPERTY[value]}</span>
            );
          }
        },
        {
          prop: "price",
          label: "单价",
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
                  size="mini"
                  v-model={value}
                  min={0}
                  precision-type="price"
                  on-set={this.inputValueChange.bind(this, index, "price")}
                />
              </div>
            );
          }
        },
        {
          prop: "qty",
          label: "需求数量",
          width: CELL_WIDTH.fundCategoryName,
          render: (value, row, index) => {
            const { flags, pickedQty, urgentQty, toConfirmQty } = row;
            const notQty = flags && flags.notQty;
            const min = +pickedQty + +urgentQty + +toConfirmQty;
            return notQty || !this.enableEdit || !this.hasEditPerm ? (
              <span style="display:inline-block;width:100%;text-align:center;">
                {value}
              </span>
            ) : (
              <div>
                <HtFormatNumber
                  size="mini"
                  v-model={value}
                  precision-type="qty"
                  on-set={this.inputValueChange.bind(this, index, "qty", min)}
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
                  size="mini"
                  v-model={value}
                  min={1}
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
          label: "总价",
          width: CELL_WIDTH.date
        },
        {
          prop: "pickedQty",
          label: "领料数量",
          width: CELL_WIDTH.date
        },
        {
          prop: "urgentQty",
          label: "转急采数量",
          width: CELL_WIDTH.date
        },
        {
          prop: "brand",
          label: "品牌",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { part } = row;
            return part && part.brand ? part.brand : "";
          }
        },
        {
          prop: "productionPlace",
          label: "产地",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { part } = row;
            return part && part.productionPlace ? part.productionPlace : "";
          }
        },
        {
          prop: "unit",
          label: "单位",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { part } = row;
            return part && part.unit ? part.unit : "";
          }
        },
        {
          prop: "partType",
          label: "零件类别",
          width: CELL_WIDTH.address,
          formatter: (_, row) => {
            const { part } = row;
            return part && part.partType ? part.partType : "";
          }
        },
        {
          prop: "avaVehModel",
          label: "适用车型",
          width: CELL_WIDTH.address,
          formatter: (_, row) => {
            const { part } = row;
            return part && part.avaVehModel ? part.avaVehModel : "";
          }
        },
        {
          prop: "model",
          label: "规格",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { part } = row;
            return part && part.model ? part.model : "";
          }
        },
        {
          prop: "chargeMan",
          label: "返修责任人",
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
          label: "配件备注",
          width: CELL_WIDTH.date,
          render: (value, row, index) => {
            return this.enableEdit && this.hasEditPerm ? (
              <div>
                <el-input
                  value={value}
                  place-holder="配件备注"
                  onInput={this.inputChange.bind(this, index, "remark")}
                  size="small"
                />
              </div>
            ) : (
              <span>{value}</span>
            );
          }
        }
      ],
      detailColumns: PART_DETAIL_COLUMNS
    };
  },
  computed: {
    hasEditPerm() {
      return this.hasBelongsPerm("update", ["self", "others"]);
    }
  },
  mounted() {
    if (this.orderInfo) {
      this.form = { ...this.orderInfo };
      const { status, billType } = this.orderInfo;
      this.billType = billType;
      this.enableEdit = status == "recepting" || status == "repairing";
      console.log("配件组件获取到更新的工单信息", this.form);
      this.list();
      this.initDefaultDiscount();
    }
  },
  methods: {
    itemTableRowClassName({ row }) {
      if (row.billType == "TL") {
        return "form-bill-row";
      }
      return "";
    },
    initDefaultDiscount() {
      const discountInfo = getDisCountInfo(this.orderInfo, "part");
      this.discount = discountInfo.canChangeDiscount
        ? discountInfo.discount || 1
        : null;
      this.canDiscount = discountInfo.canChangeDiscount;
    },
    showPartSelectorDialog() {
      this.initDefaultDiscount();
      // console.log(this.discount);
      this.showPartSelector = true;
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
    list() {
      const { id: billId } = this.form;
      getBillsParts({ billId, queryChannel: "repair" }).then(res => {
        if (!res) {
          this.tableData = [];
          return;
        }
        res.forEach(item => {
          item.discountLabel = item.discountRate
            ? Number(item.discountRate * 10).toFixed(2)
            : item.discountRate;
        });
        this.tableData = res || [];
        if (res && res.length > 0) {
          this.selectedRows = [res[0]];
          this.billPartId = res[0].id;
          this.getPicksList();
        }
      });
    },
    getPicksList() {
      const { id: billId } = this.form;
      const { billPartId } = this;
      picksDetailsForBills({ billId, billPartId }).then(res => {
        this.detailData = res || [];
      });
    },
    showAllDetail() {
      const { id: billId } = this.form;
      picksDetailsForBills({ billId }).then(res => {
        this.allDetailData = res || [];
        this.showPartDetailDialog = true;
      });
    },
    cancelHandle() {
      this.showPartDetailDialog = false;
    },
    handlePartSelect(e) {
      const { id } = e;
      this.selectedRows = [e];
      this.billPartId = id;
      this.getPicksList();
    },
    feeTypeChange(e, index) {
      this.tableData[index].feeProperty = e;
      this.tableData[index].chargeMan = null;
      this.tableData[index].chargeManName = "";
      this.updatePart(index);
    },
    addPart(e) {
      console.log("配件列表接收到:", e);
      const { id: billId } = this.form;
      const {
        qty,
        partId,
        remark,
        price,
        feeProperty,
        discountRate,
        lockPrice
      } = e;
      const isExist = this.tableData.findIndex(item => item.partId === partId);
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
            feeProperty,
            lockPrice,
            discountRate
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
        feeProperty,
        discountRate
      });
    },
    createPart(data) {
      createBillsParts(data).then(() => {
        this.$message.success("添加成功");
        this.list();
        this.$emit("updateCount");
      });
    },
    handleDelete(e) {
      console.log(e);
      // setId > 0为套餐
      let tips = "";
      if (e.setId) {
        tips = `删除该配件将会连同套餐中的其他项目及配件一并删除，是否删除-${e.setName}?`;
      } else {
        tips = "是否确认删除该配件";
      }
      this.$confirm(tips, "提示").then(() => {
        deleteBillsParts({
          type: "part",
          billPartId: e.id
        }).then(() => {
          this.list();
          this.$emit("updateCount");
        });
      });
    },
    chargeManChange(index, e) {
      this.tableData[index].chargeMan = e;
      this.updatePart(index);
      this.$forceUpdate();
    },
    updatePart(index) {
      const {
        id,
        price,
        feeProperty,
        qty,
        remark,
        chargeMan,
        discountLabel,
        lockPrice
      } = this.tableData[index];
      updateBillsParts({
        id,
        feeProperty,
        price,
        chargeMan,
        qty,
        remark,
        lockPrice,
        discountRate: discountLabel
          ? Number(discountLabel / 10).toFixed(2)
          : discountLabel
      })
        .then(() => {
          this.list();
        })
        .catch(() => {
          this.list();
        });
    },
    inputValueChange(index, key, e, min) {
      let value = null;
      if (key === "discountLabel") {
        // 折扣很特殊，你不能说没有就是0，0折代表免费了
        value = e ? this.precisionFormat(e, "money") : null;
      } else {
        value = this.precisionFormat(e, "money");
      }
      if (min && value < min) {
        this.inputChange(index, key, min);
      } else {
        this.inputChange(index, key, value);
      }
    },
    inputChange(index, key, e) {
      this.tableData[index][key] = e;
      this.updatePart(index);
    }
  }
};
</script>

<style lang="scss" scoped>
.container-box {
  ::v-deep {
    .form-bill-row {
      color: red;
    }
  }
}
.part-detail-box {
  ::v-deep {
    .el-card__header {
      padding-bottom: 15px !important;
    }
  }
}
.btns {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background: #fff;
  border-radius: 2px;
  padding: 0 10px;
}
.tag {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #fff;
  background: #409eff;
  border-radius: 10px;
}
.order-info {
  margin-bottom: 10px;
  span {
    margin-right: 10px;
    span {
      color: #409eff;
    }
  }
}
</style>
