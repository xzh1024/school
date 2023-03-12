<template>
  <div class="dialog-wrap">
    <ht-dialog
      v-bind="$attrs"
      title="库存不足处理"
      width="850px"
      v-on="$listeners"
    >
      <ht-card class="auto-card" title="配件信息" padding style="height:120px;">
        <ht-setting-table
          :data="partInfoData"
          :columns="partInfoColumns"
          style="height:57px;"
          table-name="part-info"
        />
      </ht-card>
      <ht-card class="auto-card" title="其他库存" padding style="height:320px;">
        <div
          slot="after-title"
          style="text-align: right; display:flex;justify-content:space-between;"
        >
          <span>共: {{ otherQtyTotal }}个</span>
        </div>
        <ht-setting-table
          :enable-table-setting="true"
          :data="otherStockData"
          :columns="otherStockColumns"
          table-name="other-stock"
        />
      </ht-card>
      <ht-card class="auto-card" title="缺货处理" padding style="height:100px;">
        <div
          slot="after-title"
          style="text-align: right; display:flex;justify-content:space-between;"
        >
          <!-- <span style="color:red;"
            >(其他库存不足以满足销售数量时，可以选择以下方式进行销售)</span
          > -->
          <span>共: {{ initTotalLacking }}个</span>
        </div>
        <div class="sale-type-container">
          <el-form
            ref="form"
            :model="urgent"
            :rules="rules"
            :show-message="false"
            label-position="left"
            size="mini"
            class="form-item-small-margin-bottom"
          >
            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label="转急件数量" prop="qty" label-width="73px">
                  <ht-format-number
                    v-model="urgent.qty"
                    :max="lackingTotal"
                    @change="urgentNumberChange"
                    precision-type="qty"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  prop="warehouseId"
                  label="急件到货仓库"
                  label-width="100px"
                >
                  <ht-autoselect
                    v-model="urgent.warehouseId"
                    :default-value="urgent.warehouseName"
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
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="供应商"
                  prop="supplierId"
                  label-width="45px"
                >
                  <ht-autoselect
                    v-model="urgent.supplierId"
                    :fetch-suggestions="searchLoadAllSupplierCooperators"
                    :default-value.sync="urgent.supplierName"
                    :trigger-on-focus="false"
                    remote
                    highlight-first-item
                    clearable
                    placeholder="供应商"
                    class="switch-focus focus-urgent-supplierId"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="进价"
                  prop="taxedPurchasePrice"
                  label-width="32px"
                >
                  <ht-format-number
                    v-model="urgent.taxedPurchasePrice"
                    :min="0"
                    class="switch-focus focus-urgent-taxedPurchasePrice"
                    precision-type="price"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </ht-card>
      <div style="margin: 10px 0 5px 0; text-align: center;">
        <el-button type="primary" size="mini" plain @click="submit">
          确 定（F3）
        </el-button>
        <el-button type="primary" size="mini" plain @click="$emit('close')">
          取 消（Esc）
        </el-button>
      </div>
    </ht-dialog>
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { PART_INFO_COLUMNS } from "../../../const/columns";
import { reduce } from "lodash";
import { add } from "@/utils/numberAPI";
import { searchMixin } from "@/mixins";
export default {
  name: "OutOfStock",
  mixins: [searchMixin],
  props: {
    lackingQtyInfo: {
      type: Object,
      default: () => {}
    },
    companyId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          console.log(value);
        }
      },
      immediate: true
    },
    lackingQtyInfo: {
      handler(value) {
        if (value) {
          console.log("接收到的库存不足信息", value);
          this.lackingInfo = { ...value };
          const { qty, otherQty, lackingQty, others, stock } = value;
          this.stock = stock;
          this.otherQty = otherQty;
          this.lackingQty = Number(lackingQty);
          this.partInfoData = [{ qty, otherQty, lackingQty }];
          // 这里去自动分配数量
          let totalLacking = this.lackingQty;
          console.log(totalLacking);
          this.otherStockData = others.map(item => {
            let needQty = 0;
            if (totalLacking >= item.dynaQty) {
              needQty = item.dynaQty;
              totalLacking -= item.dynaQty;
            } else {
              needQty = totalLacking;
              totalLacking -= needQty;
            }
            console.log(totalLacking);
            return { ...item, needQty: needQty };
          });
          // 如果其他库存不足以满足领料数，就设置缺货数
          this.initTotalLacking = totalLacking;
          this.urgent.qty = totalLacking;
          this.$forceUpdate();
        } else {
          this.lackingInfo = null;
          this.partInfoData = [];
          this.otherStockData = [];
        }
      },
      deep: true
    },
    "urgent.qty": {
      handler(value) {
        if (value) {
          console.log("输入了数量：", value);
          this.rules = {
            warehouseId: [
              {
                required: true,
                message: "请选择急件到货仓库",
                trigger: "change"
              }
            ]
          };
        } else {
          this.rules = {};
        }
        this.$refs.form?.clearValidate();
        this.$nextTick(() => {
          this.$refs.form?.clearValidate();
        });
      },
      deep: true
    }
  },
  data() {
    return {
      maxInput: 0,
      initTotalLacking: 0,
      stock: {},
      partInfoColumns: [...PART_INFO_COLUMNS],
      partInfoData: [],
      otherStockColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "batchNo",
          label: "批次号",
          width: CELL_WIDTH.date
        },
        {
          prop: "warehouseName",
          label: "仓库",
          width: CELL_WIDTH.date
        },
        {
          prop: "positionName",
          label: "货位",
          width: CELL_WIDTH.date
        },
        {
          prop: "stockAge",
          label: "库龄",
          width: CELL_WIDTH.date
        },
        {
          prop: "qty",
          label: "实际数",
          width: CELL_WIDTH.date
        },
        {
          prop: "dynaQty",
          label: "动态数",
          width: CELL_WIDTH.date
        },
        {
          prop: "needQty",
          label: "领料数量",
          width: CELL_WIDTH.qty,
          render: (value, row, index) => {
            // const { dynaQty, needQty } = row;
            // const { maxInput } = this;
            // const max =
            //   dynaQty < maxInput
            //     ? Number(maxInput) + Number(needQty)
            //     : maxInput + Number(needQty);
            return (
              <ht-format-number
                v-model={row.needQty}
                // disabled={!this.stockForm.isOther}
                max={this.lackingQty}
                min={0}
                class={`switch-focus focus-index-${index}`}
                on-blur={() => this.calcMaxInput()}
                precision-type="qty"
                size="mini"
              />
            );
          }
        }
      ],
      otherStockData: [],
      checked: false,
      otherQty: 0,
      lackingQty: 0,
      rules: {},
      urgent: {
        qty: 0,
        warehouseId: null,
        warehouseName: "",
        supplierId: null,
        supplierName: "",
        taxedPurchasePrice: null
      }
    };
  },
  computed: {
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
    otherQtyTotal() {
      let total = 0;
      this.otherStockData.forEach(item => {
        total += item.needQty ? +item.needQty : 0;
      });
      return total;
    },
    lackingTotal() {
      return +this.lackingQty - this.otherQtyTotal > 0
        ? +this.lackingQty - this.otherQtyTotal
        : 0;
    }
  },
  methods: {
    urgentNumberChange() {
      this.initTotalLacking = this.urgent.qty;
    },
    calcMaxInput() {
      if (!this.lackingQtyInfo) return 0;
      const { lackingQty } = this.lackingQtyInfo;
      if (!lackingQty) return 0;
      // 可输入数量，应该等于：缺货数lackingQty-其他库存中输入的数量和-转急采配件的数量
      let otherNum = 0;
      this.otherStockData.forEach(item => {
        otherNum += Number(item.needQty);
      });
      const { qty } = this.urgent;
      console.log("otherNum", otherNum);
      console.log(Number(lackingQty - otherNum));
      this.urgent.qty = Number(lackingQty - otherNum);
      this.initTotalLacking = Number(lackingQty - otherNum);
      this.maxInput =
        Number(lackingQty - otherNum - qty) > 0
          ? Number(lackingQty - otherNum - qty)
          : 0;
    },
    submit() {
      let otherNum = 0;
      const others = [];
      this.otherStockData.forEach(item => {
        otherNum += Number(item.needQty);
        if (item.needQty > 0) {
          others.push({
            stockId: item.stockId,
            qty: item.needQty
          });
        }
      });

      const { qty } = this.urgent;
      if (this.lackingQtyInfo.lackingQty != otherNum + qty) {
        this.$message.warning("其他库存数量+转急件数量需要等于缺货数量");
        return;
      }
      console.log({
        stock: this.stock,
        others,
        urgent: this.urgent
      });

      this.$emit("lackingProcess", {
        stock: this.stock,
        others,
        urgent: this.urgent
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.time-line-wrap {
  height: 60vh;
}
</style>
