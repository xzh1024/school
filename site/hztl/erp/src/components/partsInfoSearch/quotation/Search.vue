<script>
import { MONTH_RANGE, MONTH_RANGE_MAP } from "@/constants";
import * as store from "@/utils/store";
import { searchMixin } from "@/mixins";
import { dateFormat } from "@/utils/date";

const TYPE = "quotation";
const defualtFormData = {
  cooperatorId: null,
  companyIds: [],
  rangeType: null,
  channel: [],
  quoteWays: []
};

export default {
  name: "Search",
  mixins: [searchMixin],
  props: {
    header: {
      type: Object,
      default() {
        return {};
      }
    },
    isSales: Boolean
  },
  watch: {
    header(val) {
      if (val) {
        this.setFormData();
        this.searchHandle();
      }
    }
  },
  data() {
    return {
      formData: { ...defualtFormData }
    };
  },
  mounted() {
    this.getStorage();
    this.setFormData();
    this.searchHandle();
  },
  methods: {
    setFormData() {
      this.formData = {
        ...defualtFormData,
        ...this.formData,
        cooperatorId: this.header.cooperatorId,
        cooperatorName: this.header.cooperatorName
      };
    },
    searchHandle() {
      const fromDate = dateFormat(
        MONTH_RANGE_MAP[this.formData.rangeType]
          ? MONTH_RANGE_MAP[this.formData.rangeType]()[0]
          : ""
      );
      const toDate = dateFormat(
        MONTH_RANGE_MAP[this.formData.rangeType]
          ? MONTH_RANGE_MAP[this.formData.rangeType]()[1]
          : ""
      );
      const searchData = {
        ...this.formData,
        fromDate,
        toDate,
        rangeType: undefined,
        cooperatorName: undefined
      };
      if (!searchData.channel) {
        delete searchData.channel;
      }
      if (![0, 1].includes(searchData.quoteWays)) {
        delete searchData.quoteWays;
      }
      this.$emit("search", searchData);
      this.setStoraqe();
    },
    setStoraqe() {
      localStorage.histRange = JSON.stringify({
        ...(localStorage.histRange ? JSON.parse(localStorage.histRange) : {}),
        [TYPE]: this.formData.rangeType
      });
    },
    getStorage() {
      let rangeType = null;
      try {
        if (localStorage.histRange) {
          rangeType = JSON.parse(localStorage.histRange)[TYPE] || {};
        }
      } catch (e) {
        console.log(e);
      }
      this.formData = {
        ...defualtFormData,
        rangeType
      };
    },
    onCompanyIdsVisibleChange(showPopover) {
      if (!showPopover) {
        this.searchHandle();
      }
    },
    onCompanyIdsChange(companyIds) {
      if (!companyIds || !companyIds.lengh) {
        this.searchHandle();
      }
    }
  },
  render() {
    return (
      <el-form
        model={this.formData}
        size="mini"
        class="form-item-small-margin-bottom"
        style="width: 680px;"
      >
        <el-row>
          <el-col span={8}>
            {this.isSales ? (
              <el-form-item label="客户" prop="cooperatorId">
                <ht-autoselect
                  v-model={this.formData.cooperatorId}
                  defaultValue={this.formData.cooperatorName}
                  on={{
                    "update:defaultValue": val =>
                      (this.formData.cooperatorName = val)
                  }}
                  fetch-suggestions={this.searchLoadAllCustromerCooperators}
                  trigger-on-focus={false}
                  filterZero
                  remote
                  clearable
                  highlight-first-item
                  placeholder="请选择"
                  onChange={this.searchHandle}
                />
              </el-form-item>
            ) : (
              <el-form-item label="供应商" prop="cooperatorId">
                <ht-autoselect
                  v-model={this.formData.cooperatorId}
                  defaultValue={this.formData.cooperatorName}
                  on={{
                    "update:defaultValue": val =>
                      (this.formData.cooperatorName = val)
                  }}
                  fetch-suggestions={this.searchLoadAllSupplierCooperators}
                  trigger-on-focus={false}
                  filterZero
                  remote
                  clearable
                  highlight-first-item
                  placeholder="请选择"
                  onChange={this.searchHandle}
                />
              </el-form-item>
            )}
          </el-col>
          <el-col span={8}>
            <el-form-item label="分公司" prop="companyIds">
              <ht-select
                v-model={this.formData.companyIds}
                options={store.allCompanies()}
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
                placeholder="请选择"
                on-visible-change={this.onCompanyIdsVisibleChange}
                onChange={this.onCompanyIdsChange}
              />
            </el-form-item>
          </el-col>
          <el-col span={8}>
            <el-form-item label="查询时段" prop="rangeType">
              <ht-autoselect
                style="width:150px;"
                v-model={this.formData.rangeType}
                options={MONTH_RANGE}
                trigger-on-focus={false}
                clearable
                highlight-first-item
                placeholder="请选择"
                onChange={this.searchHandle}
              />
            </el-form-item>
          </el-col>
          <el-col span={8}>
            <el-form-item label="来源渠道" prop="channel">
              <el-select
                size="mini"
                v-model={this.formData.channel}
                clearable
                onChange={this.searchHandle}
              >
                <el-option label="快速报价" value="快速报价" />
                <el-option label="企鹅汽配" value="企鹅汽配" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span={8}>
            <el-form-item label="报价方式" prop="quoteWays">
              <el-select
                size="mini"
                v-model={this.formData.quoteWays}
                clearable
                onChange={this.searchHandle}
              >
                <el-option label="手动报价" value={0} />
                <el-option label="自动报价" value={1} />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    );
  }
};
</script>
<style lang="scss" scoped>
.form-item-small-margin-bottom {
  ::v-deep .el-form-item--mini.el-form-item {
    display: flex;
  }
  ::v-deep .el-form-item__label {
    width: 64px;
  }
}
</style>
