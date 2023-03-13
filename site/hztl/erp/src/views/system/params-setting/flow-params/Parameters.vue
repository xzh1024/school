<script>
import {
  LOGISTIC_RECONCILIATION_OPTIONS,
  PURCHASE_OPTIONS,
  PURCHASE_ORDER_OPTIONS,
  PURCHASE_RETURN_OPTIONS,
  RECEIVE_SETTLEMENT_OPTIONS,
  SALE_OPTIONS,
  SALE_ORDER_OPTIONS,
  SALE_RETURN_OPTIONS,
  STOCK_TAKING_OPTIONS,
  SYSTEM_PARAMS_SETTING_PARAMETERS_LIST,
  URGENT_OPTIONS
} from "../constants";

export default {
  name: "Parameters",
  props: {
    paramsType: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      required: true
    },
    paramsTableData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tableName: `${SYSTEM_PARAMS_SETTING_PARAMETERS_LIST.name}Flow`
    };
  },
  computed: {
    tableColumns() {
      return SYSTEM_PARAMS_SETTING_PARAMETERS_LIST.columns.map(item => {
        if (item.label === "参数值") {
          return {
            ...item,
            render: (value, row) => (
              <div on-click={e => e.stopPropagation()}>
                <el-form
                  attrs={{
                    model: row
                  }}
                  size="mini"
                  label-width="0"
                  size="mini"
                  class="form-item-small-margin-bottom"
                >
                  <el-form-item>
                    <ht-autoselect
                      v-show={this.paramsType === "purchaseOrder"}
                      v-model={row.purchaseOrder}
                      options={PURCHASE_ORDER_OPTIONS}
                      trigger-on-focus={false}
                      placeholder="请选择"
                      highlight-first-item
                      style="width: 200px;"
                    />
                    <ht-autoselect
                      v-show={this.paramsType === "purchase"}
                      v-model={row.purchase}
                      options={PURCHASE_OPTIONS}
                      trigger-on-focus={false}
                      placeholder="请选择"
                      highlight-first-item
                      style="width: 200px;"
                    />
                    <ht-autoselect
                      v-show={this.paramsType === "purchaseReturn"}
                      v-model={row.purchaseReturn}
                      options={PURCHASE_RETURN_OPTIONS}
                      trigger-on-focus={false}
                      placeholder="请选择"
                      highlight-first-item
                      style="width: 200px;"
                    />
                    <ht-autoselect
                      v-show={this.paramsType === "saleOrder"}
                      v-model={row.saleOrder}
                      options={SALE_ORDER_OPTIONS}
                      trigger-on-focus={false}
                      placeholder="请选择"
                      highlight-first-item
                      style="width: 200px;"
                    />
                    <ht-autoselect
                      v-show={this.paramsType === "sale"}
                      v-model={row.sale}
                      options={SALE_OPTIONS}
                      trigger-on-focus={false}
                      placeholder="请选择"
                      highlight-first-item
                      style="width: 200px;"
                    />
                    <ht-autoselect
                      v-show={this.paramsType === "saleReturn"}
                      v-model={row.saleReturn}
                      options={SALE_RETURN_OPTIONS}
                      trigger-on-focus={false}
                      placeholder="请选择"
                      highlight-first-item
                      style="width: 200px;"
                    />
                    <ht-autoselect
                      v-show={this.paramsType === "urgent"}
                      v-model={row.urgent}
                      options={URGENT_OPTIONS}
                      trigger-on-focus={false}
                      placeholder="请选择"
                      highlight-first-item
                      style="width: 200px;"
                    />
                    <ht-autoselect
                      v-show={this.paramsType === "stockTaking"}
                      v-model={row.stockTaking}
                      options={STOCK_TAKING_OPTIONS}
                      trigger-on-focus={false}
                      placeholder="请选择"
                      highlight-first-item
                      style="width: 200px;"
                    />
                    <ht-autoselect
                      v-show={this.paramsType === "receiveSettlement"}
                      v-model={row.receiveSettlement}
                      options={RECEIVE_SETTLEMENT_OPTIONS}
                      trigger-on-focus={false}
                      placeholder="请选择"
                      highlight-first-item
                      style="width: 200px;"
                    />
                    <ht-autoselect
                      v-show={this.paramsType === "logisticReconciliation"}
                      v-model={row.logisticReconciliation}
                      options={LOGISTIC_RECONCILIATION_OPTIONS}
                      trigger-on-focus={false}
                      placeholder="请选择"
                      highlight-first-item
                      style="width: 200px;"
                    />
                  </el-form-item>
                </el-form>
              </div>
            )
          };
        }
        return item;
      });
    },
    ruleForm: {
      get() {
        return this.params;
      },
      set() {}
    },
    tableData: {
      get() {
        return this.paramsTableData;
      },
      set() {}
    }
  },
  methods: {
    handleSelectChange(val) {
      this.$emit("rows-change", val);
    }
  },
  render() {
    return (
      <div style="height: 100%;">
        <el-form
          attrs={{
            model: this.ruleForm
          }}
          size="mini"
          label-width="110px"
          label-position="left"
          size="mini"
          class="form-item-small-margin-bottom"
        >
          <el-form-item label="新增公司默认值">
            <ht-autoselect
              v-show={this.paramsType === "purchaseOrder"}
              v-model={this.ruleForm.purchaseOrder}
              options={PURCHASE_ORDER_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
            <ht-autoselect
              v-show={this.paramsType === "purchase"}
              v-model={this.ruleForm.purchase}
              options={PURCHASE_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
            <ht-autoselect
              v-show={this.paramsType === "purchaseReturn"}
              v-model={this.ruleForm.purchaseReturn}
              options={PURCHASE_RETURN_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
            <ht-autoselect
              v-show={this.paramsType === "saleOrder"}
              v-model={this.ruleForm.saleOrder}
              options={SALE_ORDER_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
            <ht-autoselect
              v-show={this.paramsType === "sale"}
              v-model={this.ruleForm.sale}
              options={SALE_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
            <ht-autoselect
              v-show={this.paramsType === "saleReturn"}
              v-model={this.ruleForm.saleReturn}
              options={SALE_RETURN_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
            <ht-autoselect
              v-show={this.paramsType === "urgent"}
              v-model={this.ruleForm.urgent}
              options={URGENT_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
            <ht-autoselect
              v-show={this.paramsType === "stockTaking"}
              v-model={this.ruleForm.stockTaking}
              options={STOCK_TAKING_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
            <ht-autoselect
              v-show={this.paramsType === "receiveSettlement"}
              v-model={this.ruleForm.receiveSettlement}
              options={RECEIVE_SETTLEMENT_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
            <ht-autoselect
              v-show={this.paramsType === "logisticReconciliation"}
              v-model={this.ruleForm.logisticReconciliation}
              options={LOGISTIC_RECONCILIATION_OPTIONS}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
              style="width: 200px;"
            />
          </el-form-item>
        </el-form>

        <ht-setting-table
          tableName={this.tableName}
          columns={this.tableColumns}
          data={this.tableData}
          on-selectChange={this.handleSelectChange}
          selectionType="multiple"
          style="height: calc(100% - 30px);"
        />
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
.radio-container {
  & + .radio-container {
    margin-top: 10px;
  }
}
.slider-container {
  display: flex;
  align-items: top;

  &::v-deep .el-slider__runway {
    margin: 11px 0;
    width: 300px;
  }
}
</style>
