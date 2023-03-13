<script>
import hotkeys from "hotkeys-js";
import { CooperatorsSelect } from "@/components/select";
import { precisionsFixed, searchMixin } from "@/mixins";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { getStorageStocksBySingle } from "@/api/base/search";
import { multiply } from "@/utils/numberAPI";
import { validMoney, validQty } from "@/utils/validate";
import { FEE_PROPERTY_OPTIONS } from "@/constants/repair/partColumns";

const defaultRuleForm = {
  qty: 1,
  price: "",
  remark: "",
  feeProperty: "self",
  setId: 1,
  lockPrice: false
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
    },
    discount: {
      type: Number,
      default: null
    },
    canDiscount: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      warningMsg: "",
      tableName: "EditBasketDetailBoxPartInofList",
      tableColumns: [
        { prop: "name", label: "", width: "100" },
        {
          prop: "content",
          label: "",
          width: "120",
          render: (value, row, index) => {
            if (index == 2) {
              return value ? <span class="tag">辅</span> : "";
            } else {
              return <span>{value}</span>;
            }
          }
        }
      ],
      FEE_PROPERTY_OPTIONS,
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
        ],
        setId: [{ required: true, message: "请选择收费性质" }],
        // discountRate: [{ required: true, message: "请输入折扣" }],
        feeProperty: [{ required: true, message: "请选择收费性质" }]
      },
      options: [
        {
          id: 1,
          name: "自费"
        },
        {
          id: 2,
          name: "保修"
        },
        {
          id: 3,
          name: "保险"
        },
        {
          id: 4,
          name: "返修"
        },
        {
          id: 5,
          name: "免费"
        }
      ],
      totalPrice: 0,
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
        {
          name: "标签",
          content: this.infoData.isAccessories
        },
        { name: "品牌", content: this.infoData.brand },
        { name: "产地", content: this.infoData.productionPlace },
        { name: "单位", content: this.infoData.unit },
        { name: "零件类别", content: this.infoData.partType },
        { name: "车型/适用车型", content: this.infoData.avaVehModel },
        { name: "规格", content: this.infoData.model },
        { name: "零售价", content: this.infoData?.salePrices?.retail },
        { name: "实际数", content: this.infoData?.qty },
        { name: "动态", content: this.infoData?.dynaQty },
        { name: "采购在途数", content: this.infoData?.purchaseQtyInTransit },
        { name: "配件备注", content: this.infoData.remark }
      ];
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val) {
        oldKeyScope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el);
        this.warningMsg = "";
      } else if (oldVal) {
        this.supplierFocus = false;
        this.qtyFocus = false;
        topHotkeys.unbindHotkeys(this.$el);
        hotkeys.setScope(oldKeyScope);
      }
    },
    partData() {
      this.initData();
    },
    discount(val) {
      console.log("弹窗折扣：", val);
      console.log(this.canDiscount);
      if (val) {
        this.ruleForm.discountRate = this.canDiscount ? val * 10 : null;
      } else {
        this.ruleForm.discountRate = null;
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
      console.log(this.partData);
      this.infoData = { ...this.partData };
      this.ruleForm = {
        ...defaultRuleForm,
        ...this.partData,
        price: this.infoData?.salePrices?.retail || 0,
        remark: this.partData.remark || this.partData.remarks,
        qty: 1
      };
      if (this.isEdit) {
        // this.getLastData(this.ruleForm.supplierId, true);
      } else {
        this.ruleForm.remark = defaultRuleForm.remark;
        this.supplierFocus = true;
      }
      console.log("init count", this.discount, this.discount * 10);
      this.ruleForm.discountRate = this.canDiscount ? this.discount * 10 : null;
      this.setTotalPrice();
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
      this.ruleForm.qty = qty;
      this.setTotalPrice();
    },
    priceChange(price) {
      this.ruleForm.amount = this.precisionFormat(
        multiply(Number(price || 0), Number(this.ruleForm.qty || 0)),
        "money"
      );
      this.setTotalPrice();
    },
    discountChange() {
      this.setTotalPrice();
    },
    setTotalPrice() {
      if (!this.ruleForm.qty || !this.ruleForm.price) {
        this.totalPrice = 0;
        return;
      }
      this.totalPrice = this.ruleForm.discountRate
        ? Number(
            (this.ruleForm.qty *
              this.ruleForm.price *
              this.ruleForm.discountRate) /
              10
          ).toFixed(2)
        : Number(this.ruleForm.qty * this.ruleForm.price).toFixed(2);
    },
    onTypeSelect(type) {
      console.log(type);
      this.ruleForm.setId = type;
    },
    sureHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.$refs.ruleForm.validate(async (valid, err) => {
        if (valid) {
          if ([0, "0"].includes(this.ruleForm.price)) {
            await this.$confirm("当前单价为0, 是否继续？", "提示", {
              type: "warning"
            });
          }
          this.$emit("sure", {
            ...this.ruleForm,
            discountRate: this.ruleForm.discountRate
              ? Number(this.ruleForm.discountRate / 10).toFixed(3)
              : null,
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
    },
    setPrice(e) {
      if (!this.ruleForm.salePrices) return;
      const price = this.ruleForm.salePrices[e];
      this.ruleForm.price = price;
    }
  },
  mounted() {
    this.ruleForm.discountRate = this.canDiscount ? this.discount * 10 : null;
  },
  render() {
    return (
      <ht-dialog
        visible={this.relVisible}
        on={{
          "update:visible": val => (this.relVisible = val)
        }}
        title="添加配件材料"
        append-to-body
        width="600px"
        class="dialog-body ignore-top-hotkeys"
      >
        <div class="container-box" v-loading={this.loading}>
          <el-row gutter={5} style="height: 455px;">
            <el-col span={10} style="height: 100%;">
              <ht-card title="配件材料基础信息" style="height: 100%;">
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
                title={this.isEdit ? "添加信息" : "信息"}
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
                  label-width="120px"
                  class="form-item-small-margin-bottom"
                >
                  <el-form-item prop="qty" label="需求数量">
                    <HtFormatNumber
                      v-model={this.ruleForm.qty}
                      v-delay-focus={this.qtyFocus}
                      min={1}
                      precision-type="qty"
                      on-change={this.qtyChange}
                    />
                  </el-form-item>
                  <el-form-item prop="price" label="配件单价">
                    <HtFormatNumber
                      v-model={this.ruleForm.price}
                      min={0}
                      precision-type="price"
                      on-change={this.priceChange}
                    />
                  </el-form-item>
                  <el-form-item label="折扣">
                    <HtFormatNumber
                      disabled={!this.canDiscount}
                      v-model={this.ruleForm.discountRate}
                      min={0}
                      precision-type="price"
                      on-change={this.discountChange}
                    />
                  </el-form-item>
                  <el-form-item label="总价">
                    <HtFormatNumber
                      disabled
                      v-model={this.totalPrice}
                      min={0}
                      precision-type="price"
                    />
                  </el-form-item>
                  <el-form-item prop="feeProperty" label="收费性质">
                    <ht-select
                      v-model={this.ruleForm.feeProperty}
                      size="mini"
                      options={FEE_PROPERTY_OPTIONS}
                      class="switch-1"
                      highlight-first-item
                    />
                  </el-form-item>
                  <el-form-item prop="remark" label="备注">
                    <ht-input
                      v-model={this.ruleForm.remark}
                      placeholder="最大支持100个字符"
                      maxlength="100"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox v-model={this.ruleForm.lockPrice}>
                      锁定领料价格
                    </el-checkbox>
                    <el-popover placement="bottom" width="100" trigger="click">
                      <div class="price-list">
                        <p onclick={() => this.setPrice("retail")}>
                          零售价:
                          {this.ruleForm.salePrices
                            ? this.ruleForm.salePrices.retail || "-"
                            : "-"}
                        </p>
                        <p onclick={() => this.setPrice("platform")}>
                          平台价:
                          {this.ruleForm.salePrices
                            ? this.ruleForm.salePrices.platform || "-"
                            : "-"}
                        </p>
                        <p onclick={() => this.setPrice("allot")}>
                          调拨价:
                          {this.ruleForm.salePrices
                            ? this.ruleForm.salePrices.allot || "-"
                            : "-"}
                        </p>
                        <p onclick={() => this.setPrice("wholesale")}>
                          批发价:
                          {this.ruleForm.salePrices
                            ? this.ruleForm.salePrices.wholesale || "-"
                            : "-"}
                        </p>
                        <p onclick={() => this.setPrice("wholesale1")}>
                          批发价1:
                          {this.ruleForm.salePrices
                            ? this.ruleForm.salePrices.wholesale1 || "-"
                            : "-"}
                        </p>
                        <p onclick={() => this.setPrice("wholesale2")}>
                          批发价2:
                          {this.ruleForm.salePrices
                            ? this.ruleForm.salePrices.wholesale2 || "-"
                            : "-"}
                        </p>
                        <p onclick={() => this.setPrice("wholesale3")}>
                          批发价3:
                          {this.ruleForm.salePrices
                            ? this.ruleForm.salePrices.wholesale3 || "-"
                            : "-"}
                        </p>
                        <p onclick={() => this.setPrice("wholesale4")}>
                          批发价4:
                          {this.ruleForm.salePrices
                            ? this.ruleForm.salePrices.wholesale4 || "-"
                            : "-"}
                        </p>
                      </div>
                      <span slot="reference">其他售价</span>
                    </el-popover>
                  </el-form-item>
                </el-form>
              </ht-card>
            </el-col>
          </el-row>

          <div style="margin: 10px 0 5px 0; text-align: center;">
            <el-button
              disabled={!!this.warningMsg}
              type="primary"
              size="mini"
              plain
              on-click={e => this.sureHandle(e)}
            >
              确 定（F3）
            </el-button>
            <el-button
              type="primary"
              size="mini"
              plain
              on-click={e => this.cancelHandle(e)}
            >
              取 消（Esc）
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
.price-list {
  p:hover {
    color: #3aa7ff;
  }
}
</style>
