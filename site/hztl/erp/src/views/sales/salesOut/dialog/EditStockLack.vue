<template>
  <ht-dialog
    v-bind="$attrs"
    title="库存不足处理"
    width="980px"
    top="7vh"
    v-on="$listeners"
    class="dialog-body"
  >
    <div class="container-box">
      <ht-card title="配件信息" style="margin: 0 0 5px 0">
        <ht-table
          :data="[lackData]"
          :index-column="false"
          :selection-type="null"
          disabled-hotkeys
        >
          <el-table-column
            v-for="(column, index) in headerColumns"
            :key="index"
            :min-width="column.width"
            :prop="column.prop"
            :label="column.label"
          />
        </ht-table>
      </ht-card>

      <el-form
        ref="stockForm"
        v-switch-focus="focusData"
        :model="stockForm"
        :rules="rules"
        :show-message="false"
        label-position="left"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <ht-card no-padding title="其他库存" style="margin: 0 0 5px 0">
          <el-form-item
            slot="after-title"
            prop="isOther"
            label=""
            label-width=""
            style="margin-left: 10px; margin-top: -4px;"
          >
            <div class="flex-container">
              <el-checkbox
                v-model="stockForm.isOther"
                :disabled="!lackData.othersQty"
                :label="true"
              >
                <div></div>
              </el-checkbox>
              <div>共：{{ otherPositionSum }}个</div>
            </div>
          </el-form-item>
          <ht-setting-table
            tableName="salesOutEditStockLackPositionTable"
            :columns="positionColumns"
            :data="others"
            :selection-type="null"
            :set-height="false"
            :height="isCrossCompanySale ? '230px' : '185px'"
            disabled-hotkeys
          />
        </ht-card>
        <!--跨公司销售开单不显示-->
        <ht-card title="缺货处理" v-if="!isCrossCompanySale">
          <div slot="after-title" class="flex">
            <div class="text-font-danger">
              （其他库存不足以满足销售数量时，可以选择以下方式进行销售）
            </div>
            <div class="flex-space"></div>
            <div class="m-r-50" style="color:#9700CC">
              合计缺货数：{{ QTY }}个
            </div>
            <div class="text-font-primary">已处理缺货数：{{ dealQTY }}个</div>
          </div>
          <div class="sale-type-container">
            <el-row :gutter="10">
              <el-col :span="11">
                <el-form-item
                  label="负库存销售数量"
                  prop="negative.qty"
                  label-width="105px"
                >
                  <ht-format-number
                    v-model="stockForm.negative.qty"
                    :disabled="
                      !canUrgentSale || !isAllowNegativeStock || !maxNegativeQty
                    "
                    :max="maxNegativeQty"
                    :min="0"
                    clearable
                    style="width: 200px;"
                    class="switch-focus focus-negative-qty"
                    precision-type="qty"
                    @intput-enter="debouncedHandleInputEnter"
                  />
                  <!-- <span
                    v-show="
                      canUrgentSale && isAllowNegativeStock && maxNegativeQty
                    "
                    class="text-font-danger"
                  >
                    （最大负库存数：{{ maxNegativeQty }}）
                  </span> -->
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="isAllowNegativeStock">
                <el-form-item
                  :prop="
                    canUrgentSale &&
                    isAllowNegativeStock &&
                    maxNegativeQty &&
                    Number(stockForm.negative.qty) > 0
                      ? 'negative.warehouseId'
                      : ''
                  "
                  label="负库存仓库"
                  label-width="87px"
                >
                  <ht-autoselect
                    v-model="stockForm.negative.warehouseId"
                    :disabled="
                      !canUrgentSale || !isAllowNegativeStock || !maxNegativeQty
                    "
                    default-value=""
                    :fetch-suggestions="
                      query =>
                        searchLoadAllWarehouses(
                          query,
                          Number(this.companyId || 0)
                        )
                    "
                    :trigger-on-focus="false"
                    :clearable="false"
                    class="switch-focus focus-negative-warehouseId"
                    filter-zero
                    remote
                    highlight-first-item
                    @intput-enter="debouncedHandleInputEnter3(1)"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24" class="font-12 flex">
                <span
                  class="text-primary text-link"
                  :class="{
                    disabled:
                      !canUrgentSale || !isAllowNegativeStock || !maxNegativeQty
                  }"
                  @click="allParse2negative"
                  >全部转负库存</span
                >
                <span
                  class="text-primary text-link m-l-20"
                  :class="{
                    disabled:
                      !canUrgentSale || !isAllowNegativeStock || !maxNegativeQty
                  }"
                  @click="
                    () => {
                      return !canUrgentSale ||
                        !isAllowNegativeStock ||
                        !maxNegativeQty
                        ? undefined
                        : (stockForm.negative.qty += activeQTY);
                    }
                  "
                  >填充缺货待处理数({{ activeQTY }})</span
                >
                <div class="flex-space"></div>
                <span
                  v-if="warehouseError"
                  class="text-font-danger font-12 p-r-40"
                >
                  所选仓库的配件库存在【其他仓库】栏未分配完成，无法使用负库存
                </span>
                <!-- <span class="text-font-danger m-l-6">
                  (最大负库存数量: {{ maxNegativeQty }})
                </span> -->
              </el-col>
            </el-row>
          </div>
          <div class="sale-type-container">
            <el-form-item
              label="转急件数量"
              prop="urgent.qty"
              label-width="73px"
            >
              <ht-format-number
                v-model="stockForm.urgent.qty"
                :disabled="!canUrgentSale"
                :max="QTY"
                :min="0"
                clearable
                class="switch-focus focus-urgent-qty"
                style="width: 200px;"
                precision-type="qty"
                @keyup.enter.native="debouncedHandleInputEnter3(2)"
              />
            </el-form-item>
            <div class="font-12 m-b-4">
              <span
                class="text-primary text-link"
                @click="
                  () => {
                    stockForm.demand.qty = 0;
                    stockForm.negative.qty = 0;
                    return canUrgentSale
                      ? (stockForm.urgent.qty = QTY)
                      : undefined;
                  }
                "
                >全部转急件</span
              >
              <span
                class="text-primary text-link m-l-20"
                @click="
                  () => {
                    return canUrgentSale
                      ? (stockForm.urgent.qty += activeQTY)
                      : undefined;
                  }
                "
                >填充缺货待处理数({{ activeQTY }})</span
              >
            </div>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item
                  :prop="
                    canUrgentSale && Number(stockForm.urgent.qty) > 0
                      ? 'urgent.warehouseId'
                      : ''
                  "
                  label="急件到货仓库"
                  label-width="100px"
                >
                  <ht-autoselect
                    v-model="stockForm.urgent.warehouseId"
                    :disabled="!canUrgentSale"
                    :default-value="stockForm.negative.warehouseName"
                    :fetch-suggestions="
                      query =>
                        searchLoadAllWarehouses(
                          query,
                          Number(this.companyId || 0)
                        )
                    "
                    :trigger-on-focus="false"
                    :clearable="false"
                    class="switch-focus focus-urgent-warehouseId"
                    filter-zero
                    remote
                    highlight-first-item
                    @intput-enter="debouncedHandleInputEnter3(1)"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="供应商"
                  prop="urgent.supplierId"
                  label-width="45px"
                >
                  <ht-autoselect
                    v-model="stockForm.urgent.supplierId"
                    :disabled="!canUrgentSale"
                    :fetch-suggestions="searchLoadAllSupplierCooperators"
                    :default-value.sync="stockForm.urgent.supplierName"
                    :trigger-on-focus="false"
                    remote
                    highlight-first-item
                    clearable
                    placeholder="供应商"
                    class="switch-focus focus-urgent-supplierId"
                    @intput-enter="debouncedHandleInputEnter3(3)"
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="showPurchasedPrice" :span="6">
                <el-form-item
                  label="进价"
                  prop="taxedPurchasePrice"
                  label-width="32px"
                >
                  <ht-format-number
                    v-model="stockForm.urgent.taxedPurchasePrice"
                    :disabled="!canUrgentSale || !canUpdateUrgentPrice"
                    :min="0"
                    clearable
                    class="switch-focus focus-urgent-taxedPurchasePrice"
                    precision-type="price"
                    @keyup.enter.native="debouncedHandleInputEnter3(4)"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="sale-type-container">
            <el-form-item label="需求数量" prop="demand.qty" label-width="60px">
              <ht-format-number
                v-model="stockForm.demand.qty"
                :disabled="!canUrgentSale || isPlatform"
                :min="0"
                :max="QTY"
                style="width: 200px;"
                class="switch-focus focus-demand-qty"
                precision-type="qty"
                clearable
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <div class="font-12">
              <span
                class="text-primary text-link"
                :class="{ disabled: !canUrgentSale || isPlatform }"
                @click="
                  () => {
                    stockForm.urgent.qty = 0;
                    stockForm.negative.qty = 0;
                    return !canUrgentSale || isPlatform
                      ? undefined
                      : (stockForm.demand.qty = QTY);
                  }
                "
                >全部转需求</span
              >
              <span
                class="text-primary text-link m-l-20"
                :class="{ disabled: !canUrgentSale || isPlatform }"
                @click="
                  () => {
                    !canUrgentSale || isPlatform
                      ? undefined
                      : (stockForm.demand.qty += activeQTY);
                  }
                "
                >填充缺货待处理数({{ activeQTY }})</span
              >
            </div>
          </div>
        </ht-card>
      </el-form>

      <div style="margin: 10px 0 5px 0; text-align: center;">
        <el-button
          :disabled="!canSure"
          type="primary"
          plain
          size="mini"
          @click="sureHandle"
        >
          确定（F3）
        </el-button>
        <el-button type="primary" plain size="mini" @click="cancelHandle">
          取消（Esc）
        </el-button>
      </div>
    </div>
  </ht-dialog>
</template>
<script>
import debounce from "throttle-debounce/debounce";
import { mapState } from "vuex";
import { cloneDeep, reduce } from "lodash";
import { precisionsFixed } from "@/mixins";
import { searchMixin } from "@/mixins";
import hotkeys from "hotkeys-js";
import { CELL_WIDTH } from "@/constants";
import { add, subtract } from "@/utils/numberAPI";

//let oldKeyScope;
const stockFormFocusData = {
  updateIndex: 0,
  initial: "focus-index-0",
  type: null
};
const defualtFormData = {
  isOther: false,
  negative: {
    qty: null,
    warehouseId: null,
    warehouseName: ""
  },
  urgent: {
    qty: null,
    warehouseId: null,
    warehouseName: "",
    supplierId: null,
    supplierName: "",
    taxedPurchasePrice: null
  },
  demand: {
    qty: null
  }
};

export default {
  name: "EditStockLack",
  mixins: [precisionsFixed, searchMixin],
  props: {
    isPlatform: Boolean,
    addRes: {
      type: Object,
      default: null
    },
    partParms: {
      type: Object,
      default: null
    },
    canUpdateUrgentPrice: {
      type: Boolean,
      required: true
    },
    canUrgentSale: {
      type: Boolean,
      required: true
    },
    showPurchasedPrice: {
      type: Boolean,
      required: true
    },
    companyId: [String, Number],
    //是否是跨公司销售开单
    isCrossCompanySale: {
      type: Boolean,
      default: false
    },
    mode: {
      type: Number
    }
  },
  data() {
    const bookQtyColumn = {
      prop: "bookQty",
      label: "本次销售",
      width: 140,
      render: (value, row, index) => {
        const err = row.error?.stockError ? "error" : "";
        return (
          <div>
            <ht-format-number
              v-model={row.bookQty}
              disabled={!this.stockForm.isOther}
              max={Math.min(row.dynaQty, this.lackData.lackingQty)}
              min={0}
              clearable
              class={`switch-focus ${err}`}
              precision-type="qty"
              size="mini"
              nativeOn-keyup={() =>
                this.debouncedHandleInputEnter(index, "other")
              }
            >
              {err ? (
                <div slot="append">
                  <el-popover placement="top" trigger="hover">
                    <span class="text-font-warning font-12">
                      {`动态库存数量有变动，已重新分配，请悉知`}
                    </span>
                    <i
                      slot="reference"
                      class="el-icon-warning text-font-warning"
                    ></i>
                  </el-popover>
                </div>
              ) : (
                <span></span>
              )}
            </ht-format-number>
          </div>
        );
      }
    };
    const priceCtrlColumn = [
      {
        prop: "preDiscountTaxedPrice",
        label: "售价",
        width: 140,
        render: (value, row, index) => {
          const err = row.bookQty && row.error?.priceError ? "error" : "";
          return (
            <div>
              <ht-format-number
                v-model={row.preDiscountTaxedPrice}
                max={Infinity}
                min={0}
                disabled={!this.stockForm.isOther}
                class={`switch-focus ${err}`}
                precision-type="price"
                size="mini"
                clearable
                nativeOn-keyup={() => {
                  this.debouncePreDiscount(row, index);
                }}
              >
                {err ? (
                  <div slot="append">
                    <el-popover placement="top" trigger="hover">
                      <span class="text-font-danger font-12">
                        {row.error?.priceError}
                      </span>
                      <i
                        slot="reference"
                        class="el-icon-warning text-font-danger"
                      ></i>
                    </el-popover>
                  </div>
                ) : (
                  <span></span>
                )}
              </ht-format-number>
            </div>
          );
        }
      },
      {
        prop: "billPrice",
        label: "开单价",
        width: 100,
        render: (value, row, idx) => (
          <ht-format-number
            v-model={row.billPrice}
            max={Infinity}
            min={0}
            disabled={!this.stockForm.isOther}
            class={`switch-focus salePrice-${idx}`}
            precision-type="price"
            size="mini"
            clearable
            nativeOn-keyup={() => {
              this.debounceBillPrice(row, idx);
            }}
          />
        )
      }
    ];
    return {
      keyScope: Symbol("salesStockLack"),
      headerColumns: [
        { prop: "bookQty", label: "销售数量", width: CELL_WIDTH.qty },
        {
          prop: "lackingQty",
          label: "销售不足待处理数",
          width: CELL_WIDTH.qty
        },
        { prop: "othersDetail", label: "其他库存", width: CELL_WIDTH.qty }
      ],
      positionColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        { prop: "batchNo", label: "批次号", width: CELL_WIDTH.no },
        {
          prop: "warehouseName",
          label: "仓库",
          width: 120
        },
        { prop: "positionName", label: "货位", width: 100 },
        { prop: "qty", label: "实际数", width: 60 },
        { prop: "dynaQty", label: "动态数", width: 60 },
        bookQtyColumn,
        ...priceCtrlColumn
      ],
      positionColumns0: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        { prop: "batchNo", label: "批次号", width: CELL_WIDTH.no },
        {
          prop: "warehouseName",
          label: "仓库",
          width: 120
        },
        { prop: "positionName", label: "货位", width: 100 },
        { prop: "qty", label: "实际数", width: 60 },
        { prop: "dynaQty", label: "动态数", width: 60 },
        bookQtyColumn,
        ...priceCtrlColumn
      ],
      positionColumns1: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "warehouseName",
          label: "仓库",
          width: CELL_WIDTH.warehouseName
        },
        { prop: "positionName", label: "货位", width: 100 },
        { prop: "qty", label: "实际数", width: 60 },
        { prop: "dynaQty", label: "动态数", width: 60 },
        bookQtyColumn,
        ...priceCtrlColumn
      ],
      positionColumns2: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "warehouseName",
          label: "仓库",
          width: 150
        },
        { prop: "qty", label: "实际数", width: 60 },
        { prop: "dynaQty", label: "动态数", width: 60 },
        bookQtyColumn,
        ...priceCtrlColumn
      ],
      focusData: { ...stockFormFocusData },
      debouncedHandleInputEnter: debounce(300, this.handleInputEnter),
      debouncedHandleInputEnter3: debounce(300, this.handleInputEnter3),
      others: [],
      stockForm: cloneDeep(defualtFormData),
      rules: {
        "urgent.warehouseId": [
          { required: true, message: "请选择急件到货仓库", trigger: "change" }
        ],
        "negative.warehouseId": [
          { required: true, message: "请选择负库存仓库", trigger: "change" }
        ]
      },
      localSum: 0,
      debouncePreDiscount: debounce(300, this.handelPreDiscount),
      debounceBillPrice: debounce(300, this.handlBillPrice),
      lastWarehouse: "",
      isEditOthers: false
    };
  },
  computed: {
    ...mapState("admin/systemParams", {
      isAllowNegativeStock: state => state.params.negativeStockOut
    }),
    lackData() {
      if (this.addRes && this.partParms) {
        //其他库存，同仓库
        const othersQtyHouseNum = this.addRes.others
          ? this.addRes.others.reduce((sum, item) => {
              return this.partParms &&
                this.partParms.warehouseId === item.warehouseId
                ? add(sum, Number(item.dynaQty || 0))
                : sum;
            }, 0)
          : 0;
        //其他库存，不同仓库
        const othersQtyHouseDiffNum = this.addRes.others
          ? this.addRes.others.reduce((sum, item) => {
              return this.partParms &&
                this.partParms.warehouseId != item.warehouseId
                ? add(sum, Number(item.dynaQty || 0))
                : sum;
            }, 0)
          : 0;
        return {
          bookQty: this.precisionFormat(
            Number(this.partParms.bookQty || 0),
            "qty"
          ),
          lackingQty: this.precisionFormat(
            Number(this.addRes.lackingQty || 0),
            "qty"
          ),
          othersQty: this.precisionFormat(
            this.addRes.others && this.addRes.others.length
              ? this.addRes.others.reduce((sum, item) => {
                  return add(sum, Number(item.bookQty || 0));
                }, 0)
              : 0,
            "money"
          ),
          othersDetail:
            this.precisionFormat(
              this.addRes.others && this.addRes.others.length
                ? this.addRes.others.reduce((sum, item) => {
                    return add(sum, Number(item.dynaQty || 0));
                  }, 0)
                : 0,
              "money"
            ) +
            ` (同仓库 ${othersQtyHouseNum}, 它仓库${othersQtyHouseDiffNum}) `
        };
      } else {
        return {
          bookQty: 0,
          lackingQty: 0,
          othersQty: 0
        };
      }
    },
    lackHandleSum() {
      return this.precisionFormat(
        add(
          Number(this.stockForm.negative.qty || 0),
          add(
            Number(this.stockForm.urgent.qty || 0),
            Number(this.stockForm.demand.qty || 0)
          )
        ),
        "qty"
      );
    },
    otherPositionSum() {
      if (this.stockForm.isOther) {
        if (this.others.length) {
          const total = reduce(
            this.others,
            (sum, item) => add(Number(sum), Number(item.bookQty || 0)),
            0
          );
          return this.precisionFormat(total || 0, "qty");
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    },
    otherMaxSum() {
      const others = this.addRes?.others;
      if (others?.length) {
        const total = reduce(
          others,
          (sum, item) => add(Number(sum), Number(item.dynaQty || 0)),
          0
        );
        return this.precisionFormat(total || 0, "qty");
      } else {
        return 0;
      }
    },
    canSure() {
      return (
        this.others.length ||
        this.canUrgentSale ||
        this.isAllowNegativeStock ||
        !this.isPlatform
      );
    },
    activeQTY() {
      return (
        this.lackData.lackingQty -
        Number(this.stockForm.negative.qty || 0) -
        Number(this.stockForm.urgent.qty || 0) -
        Number(this.stockForm.demand.qty || 0) -
        this.otherPositionSum
      );
    },
    //已处理缺货数
    dealQTY() {
      return (
        Number(this.stockForm.negative.qty || 0) +
        Number(this.stockForm.urgent.qty || 0) +
        Number(this.stockForm.demand.qty || 0)
      );
    },
    QTY() {
      return this.lackData.lackingQty - this.otherPositionSum;
    },
    warehouseError() {
      let checkpass = true;
      this.others.forEach(item => {
        if (item.warehouseId == this.stockForm.negative.warehouseId) {
          if (item.dynaQty != item.bookQty) {
            checkpass = false;
          }
        }
      });
      return !checkpass && Number(this.stockForm.negative.qty || 0) > 0;
    },
    otherError() {
      return this.others.some(item => item.bookQty && item.error?.priceError);
    },
    maxNegativeQty() {
      return Math.max(this.lackData.lackingQty - this.otherPositionSum, 0);
    }
  },
  watch: {
    addRes: {
      handler(value) {
        if (this.isEditOthers) return;
        if (!value) return;
        this.initData();
        this.$forceUpdate();
        if (!value.others?.length) return;
        let hasError = false;
        value.others.map(item => {
          if (item.error?.priceError || item.error?.stockError) {
            hasError = true;
          }
        });
        if (hasError) {
          this.$message.warning("其他库存售价或本次销售数量错误，请修改后再试");
        }
        this.initData();
        this.$forceUpdate();
      },
      immediate: true,
      deep: true
    },
    "$attrs.visible": {
      handler(value, oldVale) {
        if (value) {
          this.lastWarehouse = null;
          this.initData();
        } else if (oldVale) {
          this.$refs.stockForm.resetFields();
          this.localSum = 0;
        }
      },
      immediate: true
    },
    "stockForm.negative.qty": {
      handler(value, oldVal) {
        if (isNaN(value)) return (this.stockForm.negative.qty = 0);
        const changeVal = Number(value || 0) - Number(oldVal || 0);
        if (changeVal < 0) return;
        if (this.stockForm.demand.qty > 0 && this.activeQTY < 0) {
          this.stockForm.demand.qty = Math.max(
            0,
            this.stockForm.demand.qty + this.activeQTY
          );
        }
        if (this.activeQTY && this.stockForm.urgent.qty > 0) {
          this.stockForm.urgent.qty = Math.max(
            0,
            this.stockForm.urgent.qty + this.activeQTY
          );
        }
      }
    },
    "stockForm.urgent.qty": {
      handler(value, oldVal) {
        if (isNaN(value)) return (this.stockForm.urgent.qty = 0);
        const changeVal = Number(value || 0) - Number(oldVal || 0);
        if (changeVal < 0) return;
        if (this.stockForm.demand.qty > 0 && this.activeQTY < 0) {
          this.stockForm.demand.qty = Math.max(
            0,
            this.stockForm.demand.qty + this.activeQTY
          );
        }
        if (this.activeQTY < 0 && this.stockForm.negative.qty > 0) {
          this.stockForm.negative.qty = Math.max(
            0,
            this.stockForm.negative.qty + this.activeQTY
          );
        }
      }
    },
    "stockForm.demand.qty": {
      handler(value, oldVal) {
        if (isNaN(value)) return (this.stockForm.demand.qty = 0);
        const changeVal = Number(value || 0) - Number(oldVal || 0);
        if (changeVal < 0) return;
        if (this.stockForm.urgent.qty > 0 && this.activeQTY < 0) {
          this.stockForm.urgent.qty = Math.max(
            0,
            this.stockForm.urgent.qty + this.activeQTY
          );
        }
        if (this.stockForm.negative.qty > 0 && this.activeQTY < 0) {
          this.stockForm.negative.qty = Math.max(
            0,
            this.stockForm.negative.qty + this.activeQTY
          );
        }
      }
    },
    "stockForm.isOther"(value) {
      if (value) {
        if (this.activeQTY < 0) {
          this.stockForm.demand.qty = Math.max(
            this.stockForm.demand.qty + this.activeQTY,
            0
          );
        }
        if (this.activeQTY < 0) {
          this.stockForm.urgent.qty = Math.max(
            this.stockForm.urgent.qty + this.activeQTY,
            0
          );
        }
        if (this.activeQTY < 0) {
          this.stockForm.negative.qty = Math.max(
            this.stockForm.negative.qty + this.activeQTY,
            0
          );
        }
      }
    }
  },
  mounted() {
    hotkeys("f3, up, down", { scope: this.keyScope }, this.handleHotkeysUp);
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    handelPreDiscount(row, index) {
      this.isEditOthers = true;
      const price = row.preDiscountTaxedPrice;
      if (row.preDiscountTaxedPrice > 0 && row.error) {
        row.error.priceError = null;
      }
      if (price > row.billPrice) {
        this.others[index].billPrice = price;
      }
    },
    handlBillPrice(row) {
      this.isEditOthers = true;
      if (row.preDiscountTaxedPrice > row.billPrice) {
        row.preDiscountTaxedPrice = row.billPrice;
      }
    },
    allParse2negative() {
      if (
        !this.canUrgentSale ||
        !this.isAllowNegativeStock ||
        !this.maxNegativeQty
      )
        return;
      this.stockForm.demand.qty = 0;
      this.stockForm.urgent.qty = 0;
      this.stockForm.negative.qty = Math.min(this.maxNegativeQty, this.QTY);
    },
    valiOrderPrice(row, idx) {
      const error = true;
      const currentInput = document.querySelector(`.orderPrice-${idx}`);
      if (error) {
        currentInput.classList.add("err");
        currentInput.focus();
      } else {
        currentInput.classList.remove("err");
      }
    },
    valiSalePrice(row, idx) {
      const error = true;
      const currentInput = document.querySelector(`.salePrice-${idx}`);
      if (error) {
        currentInput.classList.add("err");
        currentInput.focus();
      } else {
        currentInput.classList.remove("err");
      }
    },
    handleHotkeysUp(e) {
      switch (e.keyCode) {
        case 114:
          this.sureHandle();
          break;
        case 38:
          e.preventDefault();
          this.updateFocusData({ type: "up" });
          break;
        case 40:
          e.preventDefault();
          this.updateFocusData({ type: "down" });
          break;
        default:
          return;
      }
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    handleInputEnter(index, type) {
      this.isEditOthers = true;
      if (type === "other") {
        const row = this.others[index];
        const value = row.bookQty;
        if (this.others && this.others.length) {
          if (this.others[index].error?.stockError) {
            const bookQty = this.others[index].bookQty;
            this.others[index].error.stockError = null;
            setTimeout(() => {
              this.others[index].bookQty = bookQty;
            }, 30);
          }
          this.localSum += Number(this.others[index].bookQty || 0);
        }
        if (!isNaN(value)) {
          if (
            this.activeQTY < 0 &&
            Number(this.stockForm.demand.qty || 0) > 0
          ) {
            this.stockForm.demand.qty = Math.max(
              this.QTY -
                Number(this.stockForm.urgent.qty || 0) -
                Number(this.stockForm.negative.qty || 0),
              0
            );
          }
          if (
            this.activeQTY < 0 &&
            Number(this.stockForm.urgent.qty || 0) > 0
          ) {
            this.stockForm.urgent.qty = Math.max(
              this.QTY - Number(this.stockForm.negative.qty || 0),
              0
            );
          }
          if (this.activeQTY < 0 && this.stockForm.negative.qty > 0) {
            this.stockForm.negative.qty = Math.max(this.QTY, 0);
          }
          // 根据index 倒序自动扣减
          // eslint-disable-next-line for-direction
          for (let i = index - 1; i >= 0; i--) {
            if (this.activeQTY < 0) {
              this.others[i].bookQty = Math.max(
                0,
                Number(this.others[i].bookQty || 0) +
                  Number(this.activeQTY || 0)
              );
            }
          }
          // 倒序扣减后，活动库存还是为负数，再正向扣减
          for (let i = index + 1; i < this.others.length; i++) {
            if (this.activeQTY < 0) {
              this.others[i].bookQty = Math.max(
                0,
                Number(this.others[i].bookQty || 0) +
                  Number(this.activeQTY || 0)
              );
            }
          }
        }
      }
      if (this.localSum >= Number(this.addRes.lackingQty || 0)) {
        this.updateFocusData({
          initial: "focus-button"
        });
      } else {
        this.updateFocusData({ type: "down" });
      }
    },
    handleInputEnter3(num) {
      if (num === 4) {
        this.localSum += Number(this.stockForm.urgent.qty || 0);
        this.localSum += Number(this.otherPositionSum || 0);
      }
      if (num === 4 && this.localSum >= Number(this.addRes.lackingQty || 0)) {
        this.updateFocusData({
          initial: "focus-button"
        });
      } else {
        this.updateFocusData({ type: "down" });
      }
    },

    async initData() {
      this.localSum = 0;
      //设置表头
      switch (this.mode) {
        case 0:
          this.positionColumns = this.positionColumns0;
          break;
        case 1:
          this.positionColumns = this.positionColumns1;
          break;
        case 2:
          this.positionColumns = this.positionColumns2;
          break;
        default:
          this.positionColumns = this.positionColumns2;
          break;
      }
      this.others = [];
      this.stockForm.isOther = false;
      console.log(this.partParms);
      this.stockForm.negative = {
        ...defualtFormData.negative,
        warehouseId: this.partParms?.warehouseId
          ? this.partParms?.warehouseId
          : undefined,
        warehouseName: this.addRes.warehouseName
      };
      this.stockForm.urgent = {
        ...defualtFormData.urgent,
        warehouseId: this.addRes.warehouseId,
        warehouseName: this.addRes.warehouseName,
        supplierId: this.addRes.supplierId,
        supplierName: this.addRes.supplierName,
        taxedPurchasePrice: this.partParms && this.partParms.taxedPurchasePrice
      };
      this.stockForm.demand = { ...defualtFormData.demand };
      let lackingQty = this.addRes ? Number(this.addRes.lackingQty || 0) : 0;
      if (this.addRes && this.addRes.others && this.addRes.others.length) {
        this.others = this.addRes.others.map((item, index) => {
          const dynaQty = Number(item.dynaQty || 0);
          const bookQty = lackingQty > dynaQty ? dynaQty : lackingQty;
          lackingQty -= bookQty;
          if (bookQty > 0) {
            this.updateFocusData({
              initial: `focus-index-${index}`
            });
          }
          return {
            ...item,
            dynaQty,
            bookQty: bookQty > 0 ? bookQty : ""
          };
        });
        this.stockForm.isOther = true;
      }

      if (lackingQty > 0) {
        const leftQty = subtract(lackingQty, this.maxNegativeQty);
        if (this.isAllowNegativeStock && this.maxNegativeQty > 0) {
          if (leftQty > 0) {
            this.stockForm.negative.qty = this.precisionFormat(
              this.maxNegativeQty,
              "qty"
            );
            if (this.canUrgentSale) {
              this.stockForm.urgent.qty = this.precisionFormat(leftQty, "qty");
              this.updateFocusData({
                initial: "focus-urgent-qty"
              });
            } else if (!this.isPlatform) {
              this.stockForm.demand.qty = this.precisionFormat(leftQty, "qty");
              this.updateFocusData({
                initial: "focus-demand-qty"
              });
            }
          } else {
            this.stockForm.negative.qty = this.precisionFormat(
              lackingQty,
              "qty"
            );
            this.updateFocusData({
              initial: "focus-negative-qty"
            });
          }
        } else if (this.canUrgentSale) {
          this.stockForm.urgent.qty = this.QTY;
          //this.stockForm.urgent.qty = this.precisionFormat(lackingQty, "qty");
          this.updateFocusData({
            initial: "focus-urgent-qty"
          });
        } else if (!this.isPlatform) {
          this.stockForm.demand.qty = this.precisionFormat(lackingQty, "qty");
          this.updateFocusData({
            initial: "focus-demand-qty"
          });
        }
      } else {
        this.stockForm.negative.qty = 0;
        this.stockForm.urgent.qty = 0;
        this.stockForm.demand.qty = 0;
      }
      await this.searchLoadAllWarehouses("", Number(this.companyId || 0));
      this.stockForm.negative.warehouseId = this.lastWarehouse
        ? this.lastWarehouse
        : this.stockForm.negative?.warehouseId;
      console.log(this.stockForm.negative.warehouseId);
      this.$forceUpdate();
    },
    sureHandle() {
      if (!this.canSure) {
        this.$message.error({
          message: "您没有权限处理该单据！",
          showClose: true
        });
        return;
      }
      if (this.validateData() && this.validateForm()) {
        this.localSum = 0;
        this.handleSubmitBill();
      }
    },
    validateData() {
      let errMsg = "";
      if (!errMsg) {
        this.others.forEach((item, index) => {
          if (item.bookQty > item.dynaQty) {
            errMsg = "销售数量不能超过可售库存！";
            this.updateFocusData({
              initial: `focus-index-${index}`
            });
          }
        });
      }
      if (!errMsg) {
        // const lackingQty = subtract(
        //   Number(this.addRes.lackingQty),
        //   add(
        //     add(
        //       add(
        //         Number(this.otherPositionSum),
        //         Number(this.stockForm.negative.qty || 0)
        //       ),
        //       Number(this.stockForm.urgent.qty || 0)
        //     ),
        //     Number(this.stockForm.demand.qty || 0)
        //   )
        // );
        if (this.activeQTY != 0 && !this.isCrossCompanySale) {
          errMsg = `您还有${this.activeQTY}个缺货待处理，请处理完全部缺货后再试`;
        }
      }
      if (errMsg) {
        this.$message.warning({ message: errMsg, showClose: true });
      }
      return !errMsg;
    },
    validateForm() {
      let flag = true;
      if (
        Number(this.stockForm.negative.qty) &&
        !this.stockForm.negative.warehouseId
      ) {
        this.$message.warning({
          showClose: true,
          message: "请选择负库存仓库"
        });
        flag = false;
      }
      if (
        flag &&
        Number(this.stockForm.urgent.qty) &&
        !this.stockForm.urgent.warehouseId
      ) {
        this.$message.warning({
          showClose: true,
          message: "请选择急件到货仓库"
        });
        flag = false;
      }
      if (this.otherError) {
        this.$message.warning("其他库存存在错误，请处理后再试");
        flag = false;
      }
      if (flag && this.warehouseError) {
        this.$message.warning("负库存销售存在错误，请处理后再试");
        flag = false;
      }
      if (flag) {
        this.$refs.stockForm.validate((valid, err) => {
          if (!valid) {
            const errTips = err[Object.keys(err)[0]][0].message;
            this.$message.warning({ message: errTips, showClose: true });
            flag = false;
          }
        });
      }
      return flag;
    },
    async handleSubmitBill() {
      const params = {};
      //其他库存
      params.others = this.otherPositionSum
        ? this.others.filter(item => item.bookQty) || undefined
        : undefined;
      //负库存
      if (
        !this.isCrossCompanySale &&
        this.stockForm.negative &&
        this.stockForm.negative.qty
      ) {
        params.negative = {
          qty: this.stockForm.negative.qty,
          warehouseId: this.stockForm.negative.warehouseId
        };
      }
      //急件
      if (
        !this.isCrossCompanySale &&
        this.stockForm.urgent &&
        this.stockForm.urgent.qty
      ) {
        params.urgent = {
          qty: this.stockForm.urgent.qty,
          warehouseId: this.stockForm.urgent.warehouseId,
          supplierId: this.stockForm.urgent.supplierId,
          taxedPurchasePrice: this.stockForm.urgent.taxedPurchasePrice
        };
      }
      //需求
      if (
        !this.isCrossCompanySale &&
        this.stockForm.demand &&
        this.stockForm.demand.qty
      ) {
        params.demand = {
          qty: this.stockForm.demand.qty
        };
      }
      //实际订货数量
      params.bookQty = Number(this.partParms.bookQty || 0);
      //动态库存
      const activeNum = params.bookQty - this.lackData.lackingQty;
      //跨店销售
      if (this.isCrossCompanySale) {
        //所有配件数量为空或0
        if (activeNum == 0 && !this.otherPositionSum) {
          this.$message("没有剩余库存，无法开单！", { type: "error" });
          return;
        }
        //有活动库存,无其他库存
        if (activeNum > 0 && !this.otherPositionSum) {
          const res = await this.$confirm(
            `销售开单数量超过库存数量，仅能开单${activeNum}个，点击【确认】按钮默认开单${activeNum}个，是否继续？`,
            {
              type: "warning"
            }
          ).catch(() => {});
          if (!res) return;
          params.bookQty = activeNum;
        }
        if (
          //缺货数量大于其它配件数量
          this.otherPositionSum &&
          Number(this.addRes.lackingQty) > this.otherPositionSum
        ) {
          const totalQty = activeNum + this.otherPositionSum;
          const res = await this.$confirm(
            `销售开单数量超过其他配件库存数量，总共仅能开单${totalQty}个，点击【确认】按钮默认开单${totalQty}个，是否继续？`,
            {
              type: "warning"
            }
          ).catch(() => {});
          if (!res) return;
          params.bookQty = totalQty;
        }
      }
      this.lastWarehouse = this.stockForm.negative.warehouseId;
      this.isEditOthers = false;
      this.$emit("otherStockSumbit", {
        ...this.partParms,
        ...params
      });
      //this.cancelHandle();
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-body {
  &::v-deep .el-dialog__body {
    padding: 5px;
    background-color: #e7ebed;
  }
  &::v-deep .el-input-group__append {
    padding: 0 8px;
  }
  &::v-deep .error .el-input__inner {
    border-color: #f56c6c;
  }
}
.sale-type-container {
  padding: 10px;
  width: 100%;
  background-color: #f4f4f4;
  border-radius: 4px;

  & + .sale-type-container {
    margin-top: 5px;
  }
}
</style>
