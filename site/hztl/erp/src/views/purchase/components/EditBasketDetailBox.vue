<script>
import hotkeys from "hotkeys-js";
import { CooperatorsSelect } from "@/components/select";
import { precisionsFixed, searchMixin } from "@/mixins";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { getStorageStocksBySingle } from "@/api/base/search";
import { multiply } from "@/utils/numberAPI";
import { validMoney, validQty } from "@/utils/validate";

const defaultRuleForm = {
  supplierId: null,
  supplierName: "",
  isTaxed: true,
  property: "完好",
  qty: 1,
  price: "",
  amount: "",
  remark: "",
  remarks: ""
};
let oldKeyScope;
const topHotkeys = new TopHotkeys();

export default {
  name: "EditBasketDetailBox",
  components: { CooperatorsSelect },
  mixins: [precisionsFixed, searchMixin],
  props: {
    visible: Boolean,
    isEdit: Boolean,
    partData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      warningMsg: "",
      tableName: "EditBasketDetailBoxPartInofList",
      tableColumns: [
        { prop: "name", label: "", width: "100" },
        { prop: "content", label: "", width: "120" }
      ],
      infoData: {},
      ruleForm: { ...defaultRuleForm },
      rules: {
        supplierId: [{ required: true, message: "请选择供应商" }],
        property: [{ required: true, message: "请选择配件性质" }],
        qty: [
          { required: true, validator: validQty, message: "请输入采购数量" }
        ],
        price: [
          { required: true, validator: validMoney, message: "请输入进价" }
        ]
      },
      supplierFocus: false,
      qtyFocus: false
    };
  },
  computed: {
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
        { name: "配件编码", content: this.infoData.code },
        { name: "配件名称", content: this.infoData.name },
        { name: "配件品牌", content: this.infoData.brand },
        { name: "产地", content: this.infoData.productionPlace },
        { name: "实际数", content: this.infoData.qty },
        { name: "动态数", content: this.infoData.dynaQty },
        { name: "锁定数", content: this.infoData.lockedQty },
        { name: "采购在途数", content: this.infoData.purchaseQtyInTransit },
        { name: "采购在订数", content: this.infoData.purchaseQtyInOrdering },
        { name: "上次进价", content: this.infoData.lastTaxedPrice },
        { name: "上次未税进价", content: this.infoData.lastUntaxedPrice },
        { name: "采购金额", content: this.ruleForm.amount }
        // {
        //   name: "发票税率",
        //   content: `${this.header.invoiceType}（${multiply(
        //     this.header.taxRate,
        //     100
        //   )}%）`
        // },
      ];
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val) {
        oldKeyScope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el);
        this.warningMsg = "";
        this.initData();
      } else if (oldVal) {
        this.supplierFocus = false;
        this.qtyFocus = false;
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
        remark: this.partData.remark || this.partData.remarks,
        qty: this.isEdit ? this.partData.qty : this.partData.purchasingQty || 1
      };
      if (this.isEdit) {
        this.getLastData(this.ruleForm.supplierId, true);
      } else {
        this.ruleForm.remark = defaultRuleForm.remark;
        this.supplierFocus = true;
      }
      this.$nextTick(() => {
        this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
      });
    },
    getLastData(cooperatorId, isInit) {
      this.loading = true;
      getStorageStocksBySingle({
        cooperatorId,
        partId: this.partData.partId
      })
        .then(res => {
          this.warningMsg = "";
          this.infoData = { ...this.infoData, ...res };
          if (!isInit) {
            this.ruleForm.price = res.defaultPrice || defaultRuleForm.price;
            this.priceChange(this.ruleForm.price);
          }
          this.supplierFocus = false;
          this.qtyFocus = true;
          if (isInit) {
            this.$nextTick(() => {
              this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
            });
          }
        })
        .catch(err => {
          if (err.code === "part-out-of-scope") {
            this.warningMsg = err.message;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    supplierChange(supplierId) {
      this.getLastData(supplierId, false);
    },
    qtyChange(qty) {
      this.ruleForm.amount = this.precisionFormat(
        multiply(Number(qty || 0), Number(this.ruleForm.price || 0)),
        "money"
      );
    },
    priceChange(price) {
      this.ruleForm.amount = this.precisionFormat(
        multiply(Number(price || 0), Number(this.ruleForm.qty || 0)),
        "money"
      );
    },
    sureHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (!this.ruleForm.supplierId) return;
      this.$refs.ruleForm.validate(async (valid, err) => {
        if (valid) {
          if ([0, "0"].includes(this.ruleForm.price)) {
            await this.$confirm("当前进价为0, 是否继续？", "提示", {
              type: "warning"
            });
          }
          this.$emit("sure", {
            ...this.ruleForm,
            partId: this.partData.partId,
            remarks: this.ruleForm.remark
          });
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
        title="编辑快速订货明细"
        append-to-body
        width="600px"
        class="dialog-body ignore-top-hotkeys"
      >
        <div class="container-box" v-loading={this.loading}>
          <el-row gutter={5} style="height: 395px;">
            <el-col span={10} style="height: 100%;">
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
            <el-col span={14} style="height: 100%;">
              <ht-card
                title={this.isEdit ? "编辑采购篮信息" : "加入采购篮信息"}
                style="height: 100%;"
              >
                <el-form
                  ref="ruleForm"
                  attrs={{
                    model: this.ruleForm,
                    rules: this.rules
                  }}
                  size="mini"
                  show-message={false}
                  label-position="left"
                  label-width="75px"
                  class="form-item-small-margin-bottom"
                >
                  <el-form-item prop="supplierId" label="供应商">
                    <CooperatorsSelect
                      v-model={this.ruleForm.supplierId}
                      v-delay-focus={this.supplierFocus}
                      defaultValue={this.ruleForm.supplierName}
                      on={{
                        "update:defaultValue": val =>
                          (this.ruleForm.supplierName = val)
                      }}
                      allow-create={this.hasCompletePerm(
                        "basics.cooperators.createSupplier"
                      )}
                      no-data-tips="没有查询到供应商,回车新增"
                      type="supplier"
                      placeholder="供应商"
                      on-change={this.supplierChange}
                    />
                  </el-form-item>
                  <el-form-item prop="qty" label="采购数量">
                    <HtFormatNumber
                      v-model={this.ruleForm.qty}
                      v-delay-focus={this.qtyFocus}
                      min={1}
                      precision-type="qty"
                      on-change={this.qtyChange}
                    />
                  </el-form-item>
                  <el-form-item prop="price" label="进价">
                    <HtFormatNumber
                      v-model={this.ruleForm.price}
                      min={0}
                      precision-type="price"
                      on-change={this.priceChange}
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
                  <el-form-item prop="remark" label="备注">
                    <ht-input
                      v-model={this.ruleForm.remark}
                      placeholder="最大支持100个字符"
                      maxlength="100"
                    />
                  </el-form-item>
                </el-form>
              </ht-card>
            </el-col>
          </el-row>

          <div style="margin: 10px 0 5px 0; text-align: center;">
            <el-button
              disabled={!this.ruleForm.supplierId || !!this.warningMsg}
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
</style>
