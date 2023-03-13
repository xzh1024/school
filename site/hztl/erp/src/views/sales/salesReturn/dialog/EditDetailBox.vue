<script>
import { mapState } from "vuex";
import hotkeys from "hotkeys-js";
import { precisionsFixed, searchMixin } from "@/mixins";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { loadSearchPosition } from "@/api/store/stocks";
import { getSalesReturnDetailsDefault } from "@/api/sales/salesReturn";
import { multiply } from "@/utils/numberAPI";
import { validMoney } from "@/utils/validate";
import getUnTaxedData from "@/utils/getUnTaxedData";
import { ALL_SPACE_REG_EXP, QUICK_ADD_POSITION_LEN } from "@/constants";
import quickGetPositions from "@/utils/quickGetPositions";
import * as store from "@/utils/store";

const defaultRuleForm = {
  bookQty: 1,
  taxedPrice: 0,
  billPrice: 0,
  taxAmount: 0,
  property: "完好",
  warehouseId: null,
  warehouseName: "",
  positionId: null,
  positionName: "",
  commissionId: null,
  commissionName: "",
  reason: "",
  remark: "",
  ownerCompanyId: 0
};
let oldKeyScope;
const topHotkeys = new TopHotkeys();

export default {
  name: "EditDetailBox",
  mixins: [precisionsFixed, searchMixin],
  props: {
    visible: Boolean,
    isEdit: Boolean,
    partData: {
      type: Object,
      required: true
    },
    header: {
      type: Object,
      required: true
    },
    companyId: [String, Number]
  },
  data() {
    const validReturnQty = (rule, value, callback) => {
      if (Number(value) > 0) {
        if (Number(value) > Number(this.infoData.returnableQty)) {
          callback(new Error("退货数量需小于等于可退数量"));
        } else {
          callback();
        }
      } else if (Number(value) <= 0) {
        callback(new Error("退货数量需大于0"));
      } else {
        callback(new Error(rule.message));
      }
    };
    const validBillPrice = (rule, value, callback) => {
      if (value || [0, "0"].includes(value)) {
        if (Number(value) < this.ruleForm.taxedPrice) {
          const errTips = "退货开单价需大于等于退货价";
          callback(new Error(errTips));
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          callback();
        }
      } else {
        callback(new Error(rule.message));
      }
    };
    const validTaxAmount = (rule, value, callback) => {
      const errTips = "税额不能超出参数设置范围";
      if (value || [0, "0"].includes(value)) {
        if (
          Number(value) > this.maxTaxAmount ||
          Number(value) < this.minTaxAmount
        ) {
          callback(new Error(errTips));
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          callback();
        }
      } else {
        if (this.ruleForm.taxedAmount) {
          callback(new Error(errTips));
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          callback();
        }
      }
    };

    return {
      loading: true,
      tableName: "PurchaseReturnEditDetailBoxPartInofList",
      tableColumns: [
        { prop: "name", label: "", width: "130" },
        { prop: "content", label: "", width: "200" },
        { prop: "name1", label: "", width: "100" },
        { prop: "content1", label: "", width: "120" }
      ],
      isCollapse: false,
      infoData: {},
      ruleForm: { ...defaultRuleForm },
      cachePositionId: null,
      maxTaxAmount: 0,
      minTaxAmount: 0,
      rules: {
        bookQty: [
          {
            required: true,
            validator: validReturnQty,
            message: "请输入退货数量"
          }
        ],
        taxedPrice: [
          { required: true, validator: validMoney, message: "请输入退货价" }
        ],
        billPrice: [
          {
            required: true,
            validator: validBillPrice,
            message: "请输入退货开单价",
            trigger: "blur"
          }
        ],
        property: [{ required: true, message: "请输入配件性质" }],
        warehouseId: [{ required: true, message: "请选择仓库" }],
        taxAmount: [{ validator: validTaxAmount, trigger: "blur" }]
      },
      //跨店销售禁用仓库和货位修改
      crossCompanySale: false
    };
  },
  computed: {
    ...mapState("admin/systemParams", {
      taxAdjustRange: state => state.precisions.taxAdjustRange,
      isEasyMode: state => !!state.params.manageMode
    }),
    relVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    },
    tableData() {
      return [
        {
          name: "配件编码",
          content: this.infoData.code,
          name1: "已退数",
          content1: this.infoData.returnedQty
        },
        {
          name: "配件名称",
          content: this.infoData.name,
          name1: "可退数",
          content1: this.infoData.returnableQty
        },
        {
          name: "配件品牌",
          content: this.infoData.brand,
          name1: "退货数",
          content1: this.ruleForm.bookQty
        },
        {
          name: "产地",
          content: this.infoData.productionPlace,
          name1: "发票税率",
          content1: `${this.infoData.invoiceType}（${multiply(
            this.infoData.taxRate,
            100
          )}%）`
        },
        {
          name: "客户名称",
          content: this.infoData.cooperatorName,
          name1: "退货价",
          content1: this.ruleForm.taxedPrice
        },
        {
          name: "供应商",
          content: this.infoData.supplierName,
          name1: "退货金额",
          content1: this.ruleForm.taxedAmount
        },
        {
          name: "销售时仓位",
          content: this.infoData.salePosition,
          name1: "未税退货价",
          content1: this.ruleForm.untaxedPrice
        },
        {
          name: "当前仓位",
          content: this.infoData.currentPosition,
          name1: "未税退货金额",
          content1: this.ruleForm.untaxedAmount
        },
        {
          name: "售价",
          content: this.partData.isHasHistory
            ? this.isEdit
              ? this.infoData.sourceTaxedPrice
              : this.infoData.taxedPrice
            : "--",
          name1: "退货开单价",
          content1: this.ruleForm.billPrice
        },
        {
          name: "售价*退货数量",
          content: this.partData.isHasHistory
            ? multiply(
                this.isEdit
                  ? this.infoData.sourceTaxedPrice
                  : this.infoData.taxedPrice,
                this.ruleForm.bookQty || 0
              )
            : "--",
          name1: "退货开单金额",
          content1: this.ruleForm.billAmount
        },
        {
          name: "未税售价",
          content: this.partData.isHasHistory
            ? this.isEdit
              ? this.infoData.sourceUntaxedPrice
              : this.infoData.untaxedPrice
            : "--"
        },
        {
          name: "未税售价*退货数量",
          content: this.partData.isHasHistory
            ? multiply(
                this.isEdit
                  ? this.infoData.sourceUntaxedPrice
                  : this.infoData.untaxedPrice,
                this.ruleForm.bookQty || 0
              )
            : "--"
        },
        {
          name: "开单价",
          content: this.partData.isHasHistory
            ? this.isEdit
              ? this.infoData.sourceBillPrice
              : this.infoData.billPrice
            : "--"
        },
        {
          name: "开单价*退货数量",
          content: this.partData.isHasHistory
            ? multiply(
                this.isEdit
                  ? this.infoData.sourceBillPrice
                  : this.infoData.billPrice,
                this.ruleForm.bookQty || 0
              )
            : "--"
        }
      ];
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val) {
        oldKeyScope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el);
        this.initData();
      } else if (oldVal) {
        topHotkeys.unbindHotkeys(this.$el);
        hotkeys.setScope(oldKeyScope);
      }
    }
  },
  methods: {
    cellClassName({ columnIndex }) {
      if (columnIndex % 2 === 1) {
        return "text-font-primary";
      }
    },
    initData() {
      this.infoData = { ...this.partData };
      this.ruleForm = {
        ...defaultRuleForm,
        ...this.partData,
        warehouseId: this.partData.warehouseId || defaultRuleForm.warehouseId
      };
      this.loading = true;
      getSalesReturnDetailsDefault({
        saleDetailId: this.partData.saleDetailId,
        returnDetailId: this.partData.returnDetailId
      })
        .then(res => {
          this.infoData = {
            ...this.partData,
            returnableQty: res.returnableQty,
            returnedQty: res.returnedQty,
            salePosition: res.salePosition,
            currentPosition: res.currentPosition
          };
          this.crossCompanySale = res.crossCompanySale;
          if (!this.isEdit) {
            this.ruleForm = {
              ...this.ruleForm,
              bookQty: defaultRuleForm.bookQty,
              warehouseId: res.warehouseId || defaultRuleForm.warehouseId,
              warehouseName: res.warehouseName || defaultRuleForm.warehouseName,
              positionId: res.positionId || defaultRuleForm.positionId,
              positionName: res.positionName || defaultRuleForm.positionName,
              ownerCompanyId: this.companyId,
              remark: defaultRuleForm.remark
            };
            if (!this.partData.isHasHistory) {
              this.ruleForm.taxedPrice = res.purchasePrice;
            }
            this.ruleForm.taxedAmount = this.precisionFormat(
              multiply(
                Number(this.ruleForm.taxedPrice || 0),
                Number(this.ruleForm.bookQty || 0)
              ),
              "money"
            );
            this.ruleForm.billAmount = this.precisionFormat(
              multiply(
                Number(this.ruleForm.billPrice || 0),
                Number(this.ruleForm.bookQty || 0)
              ),
              "money"
            );
            this.setUnTaxedData();
          }
          this.cachePositionId = this.ruleForm.positionId;
          this.setTaxAdjustRange();
          this.$nextTick(() => {
            this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
          });
          console.log(this.infoData);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async handleWarehouseChange(warehouseId) {
      const positions = await this.getPositions(warehouseId);
      if (positions.length) {
        const position = positions.find(
          item => item.id === this.cachePositionId
        );
        if (position) {
          this.ruleForm.positionId = this.cachePositionId;
        } else {
          this.ruleForm.positionId = null;
        }
      } else {
        this.ruleForm.positionId = null;
      }
    },
    async getPositions(warehouseId, query) {
      const positions = await loadSearchPosition({
        name: query,
        warehouseId
      });
      return positions || [];
    },
    handlePositionIdChange(positionId) {
      if (!positionId) return;
      this.cachePositionId = positionId;
    },
    handlePositionNameChange(positionName) {
      if (positionName) {
        this.ruleForm.positionName = positionName.replace(
          ALL_SPACE_REG_EXP,
          ""
        );
      } else {
        this.ruleForm.positionName = "";
      }
    },
    qtyChange(qty) {
      this.ruleForm.taxedAmount = this.precisionFormat(
        multiply(Number(qty || 0), Number(this.ruleForm.taxedPrice || 0)),
        "money"
      );
      this.billPriceChange(this.ruleForm.billPrice);
      this.setUnTaxedData();
    },
    priceChange(price) {
      this.ruleForm.taxedAmount = this.precisionFormat(
        multiply(Number(price || 0), Number(this.ruleForm.bookQty || 0)),
        "money"
      );
      this.ruleForm.billPrice = price;
      this.ruleForm.billAmount = this.ruleForm.taxedAmount;
      this.setUnTaxedData();
    },
    billPriceChange(price) {
      this.ruleForm.billAmount = this.precisionFormat(
        multiply(Number(price || 0), Number(this.ruleForm.bookQty || 0)),
        "money"
      );
    },
    billPriceBlur() {
      if (
        (this.ruleForm.billPrice ||
          [0, "0"].includes(this.ruleForm.billPrice)) &&
        Number(this.ruleForm.billPrice) < this.ruleForm.taxedPrice
      ) {
        this.ruleForm.billPrice = this.ruleForm.taxedPrice;
        this.ruleForm.billAmount = this.ruleForm.taxedAmount;
      }
    },
    setUnTaxedData() {
      if (Number(this.infoData.taxRate || 0)) {
        this.ruleForm.untaxedPrice = this.precisionFormat(
          getUnTaxedData.untaxedPrice(
            this.ruleForm.taxedPrice,
            this.infoData.taxRate
          ),
          "untaxedPrice"
        );
        this.ruleForm.untaxedAmount = this.precisionFormat(
          getUnTaxedData.untaxedAmount(
            this.ruleForm.untaxedPrice,
            this.ruleForm.bookQty
          ),
          "money"
        );
        this.ruleForm.taxAmount = this.precisionFormat(
          getUnTaxedData.taxAmount(
            this.ruleForm.taxedAmount,
            this.ruleForm.untaxedAmount
          ),
          "money"
        );
      } else {
        this.ruleForm.untaxedPrice = this.ruleForm.taxedPrice;
        this.ruleForm.untaxedAmount = this.ruleForm.taxedAmount;
        this.ruleForm.taxAmount = 0;
      }
      this.setTaxAdjustRange();
    },
    setTaxAdjustRange() {
      this.minTaxAmount = this.precisionFormat(
        getUnTaxedData.minTaxAmount(
          this.ruleForm.taxedAmount,
          this.ruleForm.untaxedAmount,
          this.taxAdjustRange
        ),
        "money"
      );
      this.maxTaxAmount = this.precisionFormat(
        getUnTaxedData.maxTaxAmount(
          this.ruleForm.taxedAmount,
          this.ruleForm.untaxedAmount,
          this.taxAdjustRange
        ),
        "money"
      );
    },
    taxAmountBlur() {
      if (
        !this.ruleForm.taxAmount &&
        ![0, "0"].includes(this.ruleForm.taxAmount)
      ) {
        this.ruleForm.taxAmount = this.minTaxAmount || 0;
      } else if (Number(this.ruleForm.taxAmount) < this.minTaxAmount) {
        this.ruleForm.taxAmount = this.minTaxAmount;
      } else if (Number(this.ruleForm.taxAmount) > this.maxTaxAmount) {
        this.ruleForm.taxAmount = this.maxTaxAmount;
      }
    },

    sureHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (this.loading) {
        return;
      }

      this.$refs.ruleForm.validate(async (valid, err) => {
        if (valid) {
          if (
            this.isEasyMode &&
            !this.ruleForm.positionId &&
            this.ruleForm.positionName
          ) {
            this.loading = true;
            if (
              this.ruleForm.positionName &&
              this.ruleForm.positionName.length > QUICK_ADD_POSITION_LEN
            ) {
              this.$message.warning({
                message: `货位名称字数需小于等于${QUICK_ADD_POSITION_LEN}`,
                showClose: true
              });
              this.loading = false;
              return;
            }

            const positionIds = await quickGetPositions([
              {
                warehouseId: this.ruleForm.warehouseId,
                name: this.ruleForm.positionName
              }
            ]);
            this.loading = false;
            if (!positionIds) {
              return;
            }

            this.ruleForm.positionId = positionIds[0];
          }

          this.$emit("sure", { ...this.ruleForm });
          this.cancelHandle();
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
    },
    cancelHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.relVisible = false;
    }
  },
  render() {
    return (
      <ht-dialog
        visible={this.relVisible}
        on={{
          "update:visible": val => (this.relVisible = val)
        }}
        title="编辑销售退货单明细"
        append-to-body
        width="930px"
        class="dialog-body ignore-top-hotkeys"
      >
        <div class="container-box">
          <el-row gutter={5} style="height: 450px;">
            <el-col span={15} style="height: 100%;">
              <ht-card title="配件信息" style="height: 100%;">
                <ht-setting-table
                  tableName={this.tableName}
                  columns={this.tableColumns}
                  data={this.tableData}
                  show-header={false}
                  index-column={false}
                  selection-type={null}
                  cell-class-name={this.cellClassName}
                  disabled-hotkeys
                />
              </ht-card>
            </el-col>
            <el-col span={9} style="height: 100%;">
              <ht-card title="销售退货信息" style="height: 100%;">
                <el-form
                  ref="ruleForm"
                  attrs={{
                    model: this.ruleForm,
                    rules: this.rules
                  }}
                  size="mini"
                  show-message={false}
                  label-position="left"
                  label-width="113px"
                  class="form-item-small-margin-bottom"
                >
                  <el-form-item label="退货数量" prop="bookQty">
                    <HtFormatNumber
                      v-model={this.ruleForm.bookQty}
                      v-delay-focus={this.visible}
                      min={1}
                      max={Number(
                        this.infoData.returnableQty == "-"
                          ? Infinity
                          : this.infoData.returnableQty
                      )}
                      precision-type="qty"
                      on-change={this.qtyChange}
                    />
                  </el-form-item>
                  <el-form-item label="退货价（含税）" prop="taxedPrice">
                    <HtFormatNumber
                      v-model={this.ruleForm.taxedPrice}
                      min={0}
                      precision-type="price"
                      on-change={this.priceChange}
                    />
                  </el-form-item>
                  <el-form-item label="退货开单价" prop="billPrice">
                    <HtFormatNumber
                      v-model={this.ruleForm.billPrice}
                      disabled={
                        this.infoData.billPrice == this.infoData.taxedPrice
                      }
                      min={0}
                      precision-type="price"
                      on-change={this.billPriceChange}
                      on-blur={this.billPriceBlur}
                    />
                  </el-form-item>
                  <el-form-item prop="property" label="配件性质">
                    <ht-autocomplete
                      v-model={this.ruleForm.property}
                      fetch-suggestions={this.autocompleteSearchProperty}
                      trigger-on-focus={false}
                      highlight-first-item
                      placeholder="配件性质"
                    />
                  </el-form-item>
                  <el-form-item label="税额" prop="taxAmount">
                    <HtFormatNumber
                      v-model={this.ruleForm.taxAmount}
                      min={0}
                      precision-type="money"
                      on-blur={this.taxAmountBlur}
                    />
                  </el-form-item>
                  <el-form-item prop="warehouseId" label="退回仓库">
                    <ht-autoselect
                      v-model={this.ruleForm.warehouseId}
                      fetch-suggestions={query =>
                        this.searchLoadAssignWarehouses({
                          name: query,
                          status: 0,
                          assignCompanyId: this.companyId
                        })
                      }
                      defaultValue={this.ruleForm.warehouseName}
                      remote
                      filter-zero
                      trigger-on-focus={false}
                      highlight-first-item
                      disabled={this.crossCompanySale}
                      placeholder="请选择"
                      on-change={this.handleWarehouseChange}
                    />
                  </el-form-item>
                  <el-form-item label="退回货位" prop="positionId">
                    {this.isEasyMode ? (
                      <ht-autoselect
                        disabled={this.crossCompanySale}
                        v-model={this.ruleForm.positionId}
                        keepInputValue={this.ruleForm.positionName}
                        fetch-suggestions={query =>
                          this.getPositions(this.ruleForm.warehouseId, query)
                        }
                        defaultValue={this.ruleForm.positionName}
                        remote
                        filter-zero
                        keep-input
                        clearable
                        no-match-text=""
                        trigger-on-focus={false}
                        placeholder="请选择"
                        on-input-change={this.handlePositionNameChange}
                        on-change={this.handlePositionIdChange}
                      />
                    ) : (
                      <ht-autoselect
                        disabled={this.crossCompanySale}
                        v-model={this.ruleForm.positionId}
                        fetch-suggestions={query =>
                          this.getPositions(this.ruleForm.warehouseId, query)
                        }
                        defaultValue={this.ruleForm.positionName}
                        remote
                        filter-zero
                        clearable
                        trigger-on-focus={false}
                        highlight-first-item
                        placeholder="请选择"
                        on-change={this.handlePositionIdChange}
                      />
                    )}
                  </el-form-item>
                  <el-form-item prop="commissionId" label="中间人">
                    <ht-autoselect
                      v-model={this.ruleForm.commissionId}
                      disabled
                      defaultValue={this.ruleForm.commissionName}
                      on={{
                        "update:defaultValue": val =>
                          (this.ruleForm.commissionName = val)
                      }}
                      fetch-suggestions={query =>
                        this.searchLoadOnlyCustomerCooperators(query)
                      }
                      trigger-on-focus={false}
                      clearable
                      remote
                      filter-zero
                      highlight-first-item
                    />
                  </el-form-item>
                  <el-form-item label="退货原因" prop="reason">
                    <ht-autocomplete
                      v-model={this.ruleForm.reason}
                      fetch-suggestions={this.autocompleteSearchReturnReasons}
                      trigger-on-focus={false}
                      mnemonic
                      highlight-first-item
                    />
                  </el-form-item>
                  <el-form-item label="备注" prop="remark">
                    <ht-input
                      v-model={this.ruleForm.remark}
                      placeholder="最大支持100个字符"
                      maxlength="100"
                    />
                  </el-form-item>
                  <el-form-item prop="ownerCompanyId" label="所属公司">
                    <ht-autoselect
                      v-model={this.ruleForm.ownerCompanyId}
                      disabled
                      trigger-on-focus={false}
                      options={store.allCompanies()}
                      highlight-first-item
                      filter-zero
                      placeholder="所属公司"
                    />
                  </el-form-item>
                </el-form>
              </ht-card>
            </el-col>
          </el-row>

          <div style="margin: 10px 0 5px 0; text-align: center;">
            <el-button
              v-loading={this.loading}
              type="primary"
              size="mini"
              plain
              on-click={e => this.sureHandle(e)}
            >
              确定（F3）
            </el-button>
            <el-button
              type="primary"
              size="mini"
              plain
              on-click={e => this.cancelHandle(e)}
            >
              取消（Esc）
            </el-button>
          </div>
        </div>
      </ht-dialog>
    );
  }
};
</script>

<style lang="scss" scoped>
.dialog-body {
  &::v-deep .el-dialog__body {
    padding: 5px;
    background-color: #e7ebed;
  }
}
.set-price-type {
  width: 180px !important;

  &::v-deep .el-input__inner {
    height: 20px;
    line-height: 20px;
    border: 0;
    background-color: #fbfbfb;
    padding: 0 0 0 3px;
    color: #3aa7ff;
    font-size: 14px;
  }

  &::v-deep .el-input__suffix {
    display: none;
  }
}
</style>
