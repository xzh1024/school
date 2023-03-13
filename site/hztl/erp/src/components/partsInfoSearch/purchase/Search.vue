<script>
import { MONTH_RANGE, MONTH_RANGE_MAP } from "@/constants";
import * as store from "@/utils/store";
import { searchMixin } from "@/mixins";
import { dateFormat } from "@/utils/date";

const TYPE = "purchase";
const defualtFormData = {
  cooperatorId: null,
  companyIds: [],
  rangeType: null
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
    }
  },
  data() {
    return {
      formData: { ...defualtFormData }
    };
  },
  watch: {
    header(val) {
      if (val) {
        this.setFormData();
        this.searchHandle();
      }
    }
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

      this.$emit("search", {
        ...this.formData,
        fromDate,
        toDate,
        rangeType: undefined,
        cooperatorName: undefined
      });
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
        inline
        label-position="left"
        label-width="45px"
        size="mini"
        class="form-item-small-margin-bottom"
        style="width: 685px;"
      >
        <el-form-item label="供应商">
          <ht-autoselect
            v-model={this.formData.cooperatorId}
            defaultValue={this.formData.cooperatorName}
            on={{
              "update:defaultValue": val => (this.formData.cooperatorName = val)
            }}
            fetch-suggestions={this.searchLoadAllSupplierCooperators}
            trigger-on-focus={false}
            filterZero
            remote
            clearable
            highlight-first-item
            placeholder="请选择"
            style="width: 200px;"
            onChange={this.searchHandle}
          />
        </el-form-item>
        <el-form-item label="分公司">
          <ht-select
            v-model={this.formData.companyIds}
            options={store.allCompanies()}
            clearable
            filterable
            multiple
            has-selecte-all-val
            collapse-tags
            placeholder="请选择"
            style="width: 200px;"
            on-visible-change={this.onCompanyIdsVisibleChange}
            onChange={this.onCompanyIdsChange}
          />
        </el-form-item>
        <el-form-item label="查询时段" label-width="60px">
          <ht-select
            v-model={this.formData.rangeType}
            options={MONTH_RANGE}
            trigger-on-focus={false}
            clearable
            highlight-first-item
            placeholder="请选择"
            style="width: 100px;"
            onChange={this.searchHandle}
          />
        </el-form-item>
      </el-form>
    );
  }
};
</script>
