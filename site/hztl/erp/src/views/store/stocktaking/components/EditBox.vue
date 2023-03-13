<template>
  <ht-dialog
    v-bind="$attrs"
    width="1300px"
    title="编辑盘点明细"
    class="dialog-body"
    v-on="$listeners"
    top="7vh"
  >
    <el-form
      v-if="edit || status === 3"
      ref="details"
      :model="details"
      label-position="left"
      size="mini"
    >
      <div class="flex-container">
        <div style="flex: 1;">
          <ht-card title="配件信息" style="margin-bottom: 5px;">
            <table class="parts-table">
              <tr>
                <th>配件编码</th>
                <td :title="details.code || ''">{{ details.code }}</td>
                <th>产地</th>
                <td :title="details.productionPlace || ''">
                  {{ details.productionPlace }}
                </td>
                <th>仓库</th>
                <td>
                  <div
                    v-if="edit || (!info.isNoStock && info.warehouseId)"
                    :title="details.warehouseName || ''"
                    class="text-ellipsis"
                  >
                    {{ details.warehouseName }}
                  </div>
                  <ht-autoselect
                    v-else
                    v-delay-focus="$attrs.visible"
                    v-model="details.warehouseId"
                    :fetch-suggestions="
                      query =>
                        searchLoadAllTypeWarehouses({
                          status: 0,
                          name: query,
                          perms: {
                            manage: {
                              managerCompanyId: store().userInfoMsg().companyId,
                              managerStaffId: store().userInfoMsg().staffId
                            },
                            assign: {
                              assignCompanyId: store().userInfoMsg().companyId
                            }
                          }
                        })
                    "
                    remote
                    filter-zero
                    :trigger-on-focus="false"
                    highlight-first-item
                    placeholder="请选择仓库"
                    size="mini"
                    @change="handleWarehouseChange"
                  />
                </td>
              </tr>
              <tr>
                <th>配件名称</th>
                <td :title="details.name || ''">{{ details.name }}</td>
                <th>车型</th>
                <td :title="details.vehModel || ''">{{ details.vehModel }}</td>
                <th>货位</th>
                <td :title="details.positionName || ''">
                  {{ details.positionName }}
                </td>
              </tr>
              <tr>
                <th>配件品牌</th>
                <td :title="details.brand || ''">{{ details.brand }}</td>
                <th>适用车型</th>
                <td :title="details.vehModel || ''">{{ details.vehModel }}</td>
                <th>货主</th>
                <td :title="details.ownerCompanyName || ''">
                  {{ details.ownerCompanyName }}
                </td>
              </tr>
            </table>
          </ht-card>
        </div>
        <div
          style="width: 400px; flex: none; margin-left: 5px;margin-bottom:5px"
        >
          <ht-card title="盘点统计" class="height-full">
            <table class="parts-table">
              <tr>
                <th>账面数</th>
                <td :title="bookQty">{{ bookQty }}</td>
                <th>盘前库存金额</th>
                <td :title="bookTaxedAmount">{{ bookTaxedAmount }}</td>
              </tr>
              <tr>
                <th>实盘数</th>
                <td :title="realQty">{{ realQty }}</td>
                <th>盘后库存金额</th>
                <td :title="realTaxedAmount">{{ realTaxedAmount }}</td>
              </tr>
              <tr>
                <th>盈亏数</th>
                <td :title="profitLossQty">{{ profitLossQty }}</td>
                <th>盈亏额</th>
                <td :title="profitLossTaxedAmount">
                  {{ profitLossTaxedAmount }}
                </td>
              </tr>
            </table>
          </ht-card>
        </div>
      </div>
      <ht-card title="盘点详情" no-padding>
        <ht-setting-table
          v-loading="loading"
          :data="tableData"
          :columns="tableColumns"
          :table-name="tableName"
          :span-method="getSpans"
          height="250px"
        />

        <el-form-item
          label="备注"
          prop="remark"
          label-width="32px"
          style="margin: 10px;"
        >
          <ht-input
            v-model="details.remark"
            :autosize="{ minRows: 1 }"
            type="textarea"
            placeholder="请输入备注(最大支持100字符)"
            maxlength="100"
          />
        </el-form-item>
      </ht-card>
    </el-form>

    <div
      v-else
      class="text-font-danger"
      style="margin: 20px; text-align: center; font-size: 20px;"
    >
      此配件已是不可盘点状态，请重新查询，获取最新数据状态。
    </div>

    <div class="dialog-footer-align" style="margin: 10px 0 5px 0;">
      <el-button
        v-if="edit || status === 3"
        v-loading="loading"
        type="primary"
        size="mini"
        plain
        @click="comfirm"
      >
        确定（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click="close">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import * as stocktakingAPI from "@/api/store/stocktaking";
import RowSpans from "../mixins/RowSpans";
import { mapState } from "vuex";
import { precisionsFixed, searchMixin } from "@/mixins";
import { loadSearchPosition } from "@/api/store/stocks";
import { CELL_WIDTH } from "@/constants";
import { reduce } from "lodash";
import { add, multiply, subtract } from "@/utils/numberAPI";
import * as store from "@/utils/store";
import { ALL_SPACE_REG_EXP, QUICK_ADD_POSITION_LEN } from "@/constants";
import quickGetPositions from "@/utils/quickGetPositions";
import { NO_PRICE_PERM_VALUE } from "@/constants/store";
const RULES = {
  property: {
    required: true,
    message: "请选择配件性质",
    trigger: "change"
  },
  positionId: {
    required: true,
    message: "请选择货位",
    trigger: "blur"
  },
  realQty: {
    required: true,
    message: "请输入盘点数",
    trigger: "blur"
  },
  realTaxedPrice: {
    required: true,
    message: "请输入调整价格",
    trigger: "blur"
  }
};

export default {
  name: "EditBox",
  mixins: [RowSpans, searchMixin, precisionsFixed],
  props: {
    info: {
      type: Object,
      required: true
    },
    infoData: {
      type: Object,
      required: true
    },
    edit: {
      // 是编辑已创建的盘点明细，还是新增盘点明细
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    const addRow = (row, e) => {
      e.stopPropagation();
      this.addRow(row);
    };
    const deleteRow = (index, e) => {
      e.stopPropagation();
      this.deleteRow(index);
    };
    const controlsColumn = {
      label: "操作",
      prop: "controls",
      width: 70,
      cantExport: true,
      render: (value, row, index) => (
        <div>
          <el-tooltip placement="top" content="添加" enterable={false}>
            <i
              class="icon operation-icon icon-add-info"
              on-click={e => addRow(row, e)}
            />
          </el-tooltip>
          {this.hasMoreThanOne(row.stockId) && row.type === "add" ? (
            <el-tooltip placement="top" content="删除" enterable={false}>
              <i
                class="icon operation-icon icon-delete-info"
                on-click={e => deleteRow(index, e)}
              />
            </el-tooltip>
          ) : null}
        </div>
      )
    };
    const qtyColumn = {
      label: "盘点数",
      prop: "realQty",
      width: CELL_WIDTH.qty,
      render: (value, row) => {
        return (
          <div on-click={e => e.stopPropagation()}>
            <el-form-item rules={RULES.realQty} label-width="0px" size="mini">
              <ht-format-number
                v-model={row.realQty}
                precisionType="qty"
                min={0}
                size="mini"
              />
            </el-form-item>
          </div>
        );
      }
    };
    const priceColumn = {
      label: "调整价格",
      prop: "realTaxedPrice",
      width: CELL_WIDTH.money,
      render: (value, row) => {
        return (
          <div on-click={e => e.stopPropagation()}>
            <el-form-item
              rules={RULES.realTaxedPrice}
              label-width="0px"
              size="mini"
            >
              <ht-format-number
                v-model={row.realTaxedPrice}
                precision-type="price"
                min={0}
                size="mini"
              />
            </el-form-item>
          </div>
        );
      }
    };
    const propertyColumn = {
      label: "配件性质",
      prop: "property",
      width: 120,
      render: (value, row) => {
        return (
          <div on-click={e => e.stopPropagation()}>
            <el-form-item rules={RULES.property} label-width="0px" size="mini">
              <ht-autocomplete
                v-model={row.property}
                fetch-suggestions={this.autocompleteSearchProperty}
                trigger-on-focus={false}
                clearable={false}
                placeholder="配件性质"
                highlight-first-item
              />
            </el-form-item>
          </div>
        );
      }
    };
    const positionColumn = {
      label: "货位",
      prop: "positionId",
      width: CELL_WIDTH.positionName,
      render: (value, row) => {
        return (
          <div on-click={e => e.stopPropagation()}>
            <el-form-item
              rules={RULES.positionId}
              label-width="0px"
              size="mini"
            >
              {this.isEasyMode ? (
                <ht-autoselect
                  v-model={row.positionId}
                  keepInputValue={row.positionName}
                  fetch-suggestions={query =>
                    this.getPositions(this.details.warehouseId, query)
                  }
                  defaultValue={row.positionName}
                  remote
                  keep-input
                  filterZero
                  no-match-text=""
                  trigger-on-focus={false}
                  placeholder="请选择"
                  on-input-change={positionName =>
                    this.handlePositionNameChange(positionName, row)
                  }
                  on-change={positionId =>
                    this.handlePositionIdChange(positionId, row)
                  }
                />
              ) : (
                <ht-autoselect
                  v-model={row.positionId}
                  fetch-suggestions={query =>
                    this.getPositions(this.details.warehouseId, query)
                  }
                  defaultValue={row.positionName}
                  remote
                  filterZero
                  trigger-on-focus={false}
                  highlight-first-item
                  placeholder="请选择"
                  on-change={positionId =>
                    this.handlePositionIdChange(positionId, row)
                  }
                />
              )}
            </el-form-item>
          </div>
        );
      }
    };

    return {
      status: 3,
      details: {},
      bookQty: 0,
      bookTaxedAmount: 0,
      tableName: "StocktakingBillEditBoxList",
      loading: false,
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
        controlsColumn,
        {
          label: "批次号",
          prop: "batchNo",
          width: CELL_WIDTH.no
        },
        {
          label: "供应商",
          prop: "supplierName",
          width: CELL_WIDTH.companyName
        },
        {
          label: "帐面数",
          prop: "batchNoQty",
          width: 60,
          type: "number"
        },
        qtyColumn,
        {
          label: "帐面价格",
          prop: "taxedPurchasePrice",
          width: 80,
          type: "number",
          render: (value, row) => (
            <div class="text-right number-font">
              {row.taxedPurchasePrice == NO_PRICE_PERM_VALUE
                ? "无权查看"
                : row.taxedPurchasePrice}
            </div>
          )
        },
        priceColumn,
        propertyColumn,
        positionColumn
      ]
    };
  },
  computed: {
    ...mapState("admin/systemParams", {
      isEasyMode: state => !!state.params.manageMode
    }),
    realQty() {
      return (
        this.precisionFormat(
          reduce(
            this.tableData,
            (sum, item) => add(Number(sum || 0), Number(item.realQty || 0)),
            0
          ),
          "qty"
        ) || 0
      );
    },
    profitLossQty() {
      return (
        this.precisionFormat(subtract(this.realQty, this.bookQty), "qty") || 0
      );
    },
    realTaxedAmount() {
      return (
        this.precisionFormat(
          reduce(
            this.tableData,
            (sum, item) =>
              add(
                Number(sum || 0),
                multiply(
                  Number(item.realQty || 0),
                  Number(item.realTaxedPrice || 0)
                )
              ),
            0
          ),
          "money"
        ) || 0
      );
    },
    profitLossTaxedAmount() {
      return (
        this.precisionFormat(
          subtract(this.realTaxedAmount, this.bookTaxedAmount),
          "money"
        ) || 0
      );
    },
    //是否有查看进价的权限
    hasPricePerm() {
      return this.hasBelongsPerm("purchasedPrice", this.details.belongs);
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          this.details = { ...this.info };
          this.getListOfTaking(this.info);
        }
      },
      immediate: true
    }
  },
  methods: {
    store() {
      return store;
    },
    hasMoreThanOne(stockId) {
      let count = 0;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].stockId === stockId) count++;
      }
      return count > 1;
    },
    getListOfTaking(info) {
      this.loading = true;
      this.status = 3;
      this.tableData = [];
      this.bookTaxedAmount = 0;
      this.bookQty = 0;
      const params = this.edit
        ? { takingDetailId: info.takingDetailId }
        : {
            ownerCompanyId: info.ownerCompanyId,
            partId: info.partId,
            property: info.property,
            warehouseId: info.warehouseId,
            positionId: info.positionId,
            lastOptDay: info.lastOptDay,
            isNoStock: info.isNoStock
          };
      stocktakingAPI[
        this.edit ? "stocktakingSubsList" : "stocktakingStocksQuery"
      ](params)
        .then(res => {
          this.status = res.status;
          if (this.edit || this.status === 3) {
            let rows = [];
            if (this.edit) {
              rows = res;
            } else {
              this.bookQty = Number(res.bookQty || 0);
              this.bookTaxedAmount = Number(res.bookTaxedAmount || 0);
              rows = res.Row;
            }

            if (rows && rows.length) {
              if (this.edit) {
                rows.forEach(item => {
                  this.bookTaxedAmount = this.precisionFormat(
                    add(
                      this.bookTaxedAmount,
                      multiply(
                        Number(item.bookQty || 0),
                        Number(item.taxedPurchasePrice || 0)
                      )
                    ),
                    "money"
                  );
                  this.bookQty = this.precisionFormat(
                    add(this.bookQty, Number(item.bookQty || 0)),
                    "money"
                  );
                });
              }
              const { bookQty, bookTaxedAmount } = this.infoData;
              this.bookQty = bookQty;
              this.bookTaxedAmount = bookTaxedAmount;
              // this.profitLossQty = profitLossQty;
              // this.profitLossTaxedAmount = profitLossTaxedAmount;
              const existIds = [];
              this.tableData = rows.map(item => {
                let isExist = false;
                if (existIds.indexOf(item.stockId) > -1) {
                  isExist = true;
                }
                if (!isExist) existIds.push(item.stockId);
                return {
                  ...item,
                  type: isExist ? "add" : null,
                  realQty: Number(item.realQty || item.bookQty || 0),
                  realTaxedPrice: Number(
                    item.realTaxedPrice || item.taxedPurchasePrice || 0
                  ),
                  positionName: item.positionName || "",
                  cachePositionId: item.positionId || null
                };
              });
              this.setupRowSpans(this.tableData);
            }
          }

          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    close() {
      this.$emit("update:visible", false);
    },
    async handleWarehouseChange(warehouseId) {
      if (this.tableData.length) {
        const positions = await this.getPositions(warehouseId);
        if (positions.length) {
          this.tableData = this.tableData.map(row => {
            const position = positions.find(
              item => item.id === row.cachePositionId
            );
            let positionId = null;
            if (position) {
              positionId = row.cachePositionId;
            }
            return { ...row, positionId };
          });
        } else {
          this.tableData = this.tableData.map(item => ({
            ...item,
            positionId: null
          }));
        }
      } else {
        this.tableData = [
          {
            batchNo: "",
            supplierName: "",
            batchNoQty: 0,
            realQty: 0,
            taxedPurchasePrice: 0,
            realTaxedPrice: 0,
            property: "完好",
            positionId: null,
            positionName: "",
            cachePositionId: null
          }
        ];
      }
    },
    async getPositions(warehouseId, query) {
      const positions = await loadSearchPosition({
        name: query,
        warehouseId
      });
      return positions || [];
    },
    handlePositionNameChange(positionName, row) {
      if (positionName) {
        row.positionName = positionName.replace(ALL_SPACE_REG_EXP, "");
      } else {
        row.positionName = "";
      }
    },
    handlePositionIdChange(positionId, row) {
      if (!positionId) return;
      row.cachePositionId = positionId;
    },

    async comfirm() {
      if (this.loading) {
        return;
      }

      if (this.info.isNoStock && !this.details.warehouseId) {
        this.$message.warning({
          message: "请选择仓库",
          showClose: true
        });
        return;
      }

      if (
        this.isEasyMode &&
        this.tableData.some(item => !item.positionId && item.positionName)
      ) {
        this.loading = true;
        if (
          this.tableData.some(
            item =>
              !item.positionId &&
              item.positionName &&
              item.positionName.length > QUICK_ADD_POSITION_LEN
          )
        ) {
          this.$message.warning({
            message: `货位名称字数需小于等于${QUICK_ADD_POSITION_LEN}`,
            showClose: true
          });
          this.loading = false;
          return;
        }

        const positionIds = await quickGetPositions(
          this.tableData.map(item => ({
            warehouseId: this.details.warehouseId,
            name: item.positionName
          }))
        );
        this.loading = false;
        if (!positionIds) {
          return;
        }

        this.tableData = this.tableData.map((item, index) => ({
          ...item,
          positionId: positionIds[index]
        }));
      }

      this.$refs.details.validate((valid, err) => {
        if (valid) {
          let flag = true;
          if (
            this.tableData.some(
              item => !item.realQty && ![0, "0"].includes(item.realQty)
            )
          ) {
            flag = false;
            this.$message.warning({ message: RULES.realQty.message });
          }

          if (
            flag &&
            this.tableData.some(
              item =>
                !item.realTaxedPrice && ![0, "0"].includes(item.realTaxedPrice)
            )
          ) {
            flag = false;
            this.$message.warning({ message: RULES.realTaxedPrice.message });
          }

          if (this.tableData.some(item => !item.property)) {
            flag = false;
            this.$message.warning({ message: RULES.property.message });
          }

          if (this.tableData.some(item => !item.positionId)) {
            flag = false;
            this.$message.warning({ message: RULES.positionId.message });
          }

          if (flag) {
            const params = {
              detail: {
                takingDetailId: this.info.takingDetailId || 0,
                ownerCompanyId: this.info.ownerCompanyId,
                partId: this.info.partId,
                property: this.info.property,
                warehouseId: this.details.warehouseId,
                positionId: this.info.positionId,
                bookQty: this.bookQty,
                realQty: this.realQty,
                profitLossQty: this.profitLossQty,
                bookTaxedAmount: this.bookTaxedAmount,
                realTaxedAmount: this.realTaxedAmount,
                profitLossTaxedAmount: this.profitLossTaxedAmount,
                remark: this.details.remark || ""
              },
              subDetails: this.tableData.map(item => ({ ...item }))
            };
            this.$emit("addOrEditComfirm", params);
          }
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
    },
    addRow(row) {
      const _row = { ...row, type: "add" };
      _row.realQty = 0;
      this.tableData.push(_row);
      this.setupRowSpans(this.tableData);
    },
    deleteRow(index) {
      this.tableData.splice(index, 1);
      this.setupRowSpans(this.tableData);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.dialog-body {
  ::v-deep .el-dialog__body,
  .el-dialog__footer {
    background-color: #e7ebed;
  }
  ::v-deep .el-dialog__body {
    padding: 5px;
  }
  ::v-deep .box-card {
    background-color: white;
  }
  .parts-table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;

    tr {
      th {
        width: 105px;
        background-color: #fbfbfb;
        @include font_color("table-color-primary");
        @include background_color("color-primary", 0.1);
      }
      td {
        width: calc(100% - 105px);
        @include font_color("color-primary");
      }
      th,
      td {
        padding: 5px 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border: 1px solid #e8eaef;
        @include border_color("border-color-table");
      }
    }
  }
  ::v-deep .el-form-item,
  .el-form-item--mini {
    margin-bottom: 0;
  }
}
</style>
