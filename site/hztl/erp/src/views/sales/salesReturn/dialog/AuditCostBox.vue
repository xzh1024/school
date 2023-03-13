<script>
import hotkeys from "hotkeys-js";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { searchMixin, baseDataMixin } from "@/mixins";
import { CELL_WIDTH } from "@/constants";
import { CooperatorsSelect } from "@/components/select";
import {
  salesReturnCostPriceAudit,
  salesReturnDetails
} from "@/api/sales/salesReturn";
import * as store from "@/utils/store";

let oldKeyScope;
const topHotkeys = new TopHotkeys();
const invoiceTypeRules = {
  invoiceType: {
    required: true,
    message: "请选择发票税率",
    trigger: "change"
  }
};
const costPriceRules = {
  costPrice: {
    required: true,
    message: "请输入成本价",
    trigger: "change"
  }
};
const TIPS0 = "有配件成本价设置为0";
const TIPS =
  "无销售历史退货成本价审核通过后不可修改，该批次配件成本价及毛利等统计将以此进行统计，是否确认？";

export default {
  name: "AuditCostBox",
  components: { CooperatorsSelect },
  mixins: [searchMixin, baseDataMixin],
  props: {
    visible: Boolean,
    details: {
      type: Array,
      default: null
    },
    billId: {
      type: Number,
      default: null
    }
  },
  data() {
    const supplierColumn = {
      label: "供应商",
      prop: "supplierId",
      width: 280,
      render: (value, row, index) => (
        <el-form
          label-width="0"
          size="mini"
          class="form-item-small-margin-bottom ignore-hotkeys"
        >
          <el-form-item label="">
            {index ? (
              <CooperatorsSelect
                v-model={row.supplierId}
                defaultValue={row.supplierName}
                on={{
                  "update:defaultValue": val => (row.supplierName = val)
                }}
                allow-create={this.hasCompletePerm(
                  "basics.cooperators.createSupplier"
                )}
                no-data-tips="没有查询到供应商,回车新增"
                type="supplier"
                placeholder="请选择"
              />
            ) : (
              <CooperatorsSelect
                v-model={row.supplierId}
                defaultValue={row.supplierName}
                on={{
                  "update:defaultValue": val => (row.supplierName = val)
                }}
                allow-create={this.hasCompletePerm(
                  "basics.cooperators.createSupplier"
                )}
                no-data-tips="没有查询到供应商,回车新增"
                type="supplier"
                v-delay-focus={this.visible}
                placeholder="请选择"
              />
            )}
          </el-form-item>
        </el-form>
      )
    };
    const invoiceTypeColumn = {
      label: "发票税率",
      prop: "invoiceType",
      width: 170,
      render: (value, row, index) => (
        <el-form
          ref={`invoiceType${index}`}
          attrs={{
            model: row,
            rules: invoiceTypeRules,
            "show-message": false
          }}
          label-width="0"
          size="mini"
          class="form-item-small-margin-bottom ignore-hotkeys"
        >
          <el-form-item prop="invoiceType" label="">
            <ht-autoselect
              v-model={row.invoiceType}
              options={store.formatInvoiceTypeDictionary()}
              format-name={() =>
                this.getFormatInvoiceType(row.invoiceType, row.costTaxRate)
              }
              trigger-on-focus={false}
              mnemonic
              highlight-first-item
              placeholder="请选择"
              on-change={this.updateBillHeaderTaxed(row.invoiceType, row)}
            />
          </el-form-item>
        </el-form>
      )
    };
    const costPriceColumn = {
      label: "成本价",
      prop: "costPrice",
      width: CELL_WIDTH.money,
      render: (value, row, index) => (
        <el-form
          ref={`costPrice${index}`}
          attrs={{
            model: row,
            rules: costPriceRules,
            "show-message": false
          }}
          label-width="0"
          size="mini"
          class="form-item-small-margin-bottom ignore-hotkeys"
        >
          <el-form-item prop="costPrice" label="">
            <HtFormatNumber
              v-model={row.costPrice}
              min={0}
              precision-type="price"
            />
          </el-form-item>
        </el-form>
      )
    };

    return {
      loading: false,
      tableName: "SalesReturnBillingAuditCostBoxList",
      tableData: [],
      tableColumns: [
        {
          label: "序号",
          prop: "index",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          label: "配件编码",
          prop: "code",
          width: CELL_WIDTH.code
        },
        {
          label: "配件名称",
          prop: "name",
          width: CELL_WIDTH.name
        },
        {
          label: "配件品牌",
          prop: "brand",
          width: CELL_WIDTH.brand
        },
        {
          label: "产地",
          prop: "productionPlace",
          width: CELL_WIDTH.productionPlace
        },
        {
          label: "配件性质",
          prop: "property",
          width: CELL_WIDTH.property
        },
        supplierColumn,
        invoiceTypeColumn,
        costPriceColumn
      ]
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
    initData() {
      if (this.details) {
        this.setTableData(this.details);
      } else {
        this.loading = true;
        salesReturnDetails(this.billId)
          .then(res => {
            if (res.rows && res.rows.length) {
              this.setTableData(res.rows);
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    setTableData(tableData) {
      const defaultInvoiceType = store
        .formatInvoiceTypeDictionary()
        .find((item, index) => item.isDefault || index === 0);
      this.tableData = tableData
        .filter(item => item.taxedPurchasePrice <= 0)
        .map(item => ({
          id: item.id,
          code: item.code,
          name: item.name,
          brand: item.brand,
          productionPlace: item.productionPlace,
          property: item.property,
          supplierId: null,
          supplierName: "",
          invoiceType: defaultInvoiceType ? defaultInvoiceType.id : "",
          costTaxRate: defaultInvoiceType
            ? defaultInvoiceType.specialValue
            : "",
          costPrice: ""
        }));
    },
    updateBillHeaderTaxed(value, row) {
      if (!value) return;
      const invoiceType = store
        .formatInvoiceTypeDictionary()
        .find(item => item.id === value);
      row.costTaxRate = invoiceType.specialValue;
    },
    sureHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (!this.validateTableData()) {
        return;
      }
      this.showSureTips();
    },
    validateTableData() {
      let flag = true;
      this.tableData.forEach((item, index) => {
        this.$refs[`invoiceType${index}`].validate((valid, err) => {
          if (!valid) {
            flag = false;
            const errTips = err[Object.keys(err)[0]][0].message;
            this.$message.warning({ message: errTips, showClose: true });
            setTimeout(() => {
              const input = this.$refs[`invoiceType${index}`].$el.querySelector(
                ".is-error input"
              );
              input?.focus();
            });
          }
        });
        flag &&
          this.$refs[`costPrice${index}`].validate((valid, err) => {
            if (!valid) {
              flag = false;
              const errTips = err[Object.keys(err)[0]][0].message;
              this.$message.warning({ message: errTips, showClose: true });
              setTimeout(() => {
                const input = this.$refs[`costPrice${index}`].$el.querySelector(
                  ".is-error input"
                );
                input?.focus();
              });
            }
          });
      });
      return flag;
    },
    sureTips() {
      return (
        <div style="margin-top: 20px;">
          {this.tableData.some(item => [0, "0"].includes(item.costPrice)) && (
            <div class="text-font-danger" style="margin-bottom: 10px;">
              {TIPS0}
            </div>
          )}
          <div>{TIPS}</div>
        </div>
      );
    },
    showSureTips() {
      this.$msgbox({
        message: this.sureTips(),
        type: "warning",
        showCancelButton: true
      })
        .then(() => {
          salesReturnCostPriceAudit({
            id: this.billId,
            details: this.tableData.map(item => ({
              id: item.id,
              supplierId: item.supplierId,
              costPrice: item.costPrice,
              costTaxRate: item.costTaxRate
            }))
          }).then(() => {
            this.$message.success({ message: "成本价审核成功" });
            this.cancelHandle();
            this.$emit("success", this.tableData);
          });
        })
        .catch(() => {});
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
        title="成本价审核确认"
        append-to-body
        width="1200px"
        top="7vh"
        class="ignore-top-hotkeys"
      >
        <el-form
          v-loading={this.loading}
          size="mini"
          class="form-item-small-margin-bottom"
        >
          <ht-setting-table
            loading={this.loading}
            tableName={this.tableName}
            columns={this.tableColumns}
            data={this.tableData}
            style="height: 550px;"
            disabledHotkeys
          />
        </el-form>

        <div style="margin: 10px 0 5px 0; text-align: center;">
          <el-button
            type="primary"
            size="mini"
            plain
            on-click={e => this.sureHandle(e)}
            v-loading={this.loading}
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
      </ht-dialog>
    );
  }
};
</script>
