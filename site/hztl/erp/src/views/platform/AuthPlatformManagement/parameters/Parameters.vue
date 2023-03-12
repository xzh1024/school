<script>
import { SYSTEM_PARAMS_SETTING_PARAMETERS_LIST } from "../constants/index";
import searchMixin from "@/mixins/searchMixin";
import * as store from "@/utils/store";

export default {
  name: "Parameters",
  mixins: [searchMixin],
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
      tableName: `${SYSTEM_PARAMS_SETTING_PARAMETERS_LIST.name}Financial`
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
                    <ht-select
                      v-show={this.paramsType === "noUpProperties"}
                      v-model={row.noUpProperties}
                      options={store.propertyDictionary()}
                      placeholder="请选择"
                      style="width: 250px;"
                      clearable
                      collapse-tags
                      filterable
                      multiple
                      has-selecte-all-val
                    />
                    <ht-select
                      v-show={this.paramsType === "noUpWarehouses"}
                      v-model={row.noUpWarehouses}
                      options={store.administerWareHouse()}
                      placeholder="请选择"
                      style="width: 250px;"
                      clearable
                      collapse-tags
                      filterable
                      multiple
                      has-selecte-all-val
                    />
                    <ht-select
                      v-show={this.paramsType === "noUpPriceTypesOfZero"}
                      v-model={row.noUpPriceTypesOfZero}
                      options={store.priceTypeDictionary()}
                      placeholder="请选择"
                      style="width: 250px;"
                      clearable
                      collapse-tags
                      filterable
                      multiple
                      has-selecte-all-val
                    />
                    <ht-autoselect
                      v-show={this.paramsType === "customerDefaultPriceType"}
                      v-model={row.customerDefaultPriceType}
                      options={store.priceTypeDictionary()}
                      trigger-on-focus={false}
                      highlight-first-item
                      placeholder="请选择"
                      style="width: 250px;"
                      clearable
                    />
                    <ht-percent-input
                      v-show={this.paramsType === "allocatingPriceRaiseRatio"}
                      v-model={row.allocatingPriceRaiseRatio}
                      style="width: 250px;"
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
    formatTooltip(val) {
      return `${val}%`;
    },
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
          <el-form-item
            label="新增公司默认值"
            v-show={this.paramsType !== "customerDefaultPriceType"}
          >
            <ht-select
              v-show={this.paramsType === "noUpProperties"}
              v-model={this.ruleForm.noUpProperties}
              options={store.propertyDictionary()}
              placeholder="请选择"
              style="width: 250px;"
              clearable
              collapse-tags
              filterable
              multiple
              has-selecte-all-val
            />
            <ht-select
              v-show={this.paramsType === "noUpWarehouses"}
              v-model={this.ruleForm.noUpWarehouses}
              options={store.administerWareHouse()}
              placeholder="请选择"
              style="width: 250px;"
              clearable
              collapse-tags
              filterable
              multiple
              has-selecte-all-val
            />
            <ht-select
              v-show={this.paramsType === "noUpPriceTypesOfZero"}
              v-model={this.ruleForm.noUpPriceTypesOfZero}
              options={store.priceTypeDictionary()}
              placeholder="请选择"
              style="width: 250px;"
              clearable
              collapse-tags
              filterable
              multiple
              has-selecte-all-val
            />
            <ht-percent-input
              v-show={this.paramsType === "allocatingPriceRaiseRatio"}
              v-model={this.ruleForm.allocatingPriceRaiseRatio}
              style="width: 250px;"
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
    width: 250px;
  }
}
</style>
