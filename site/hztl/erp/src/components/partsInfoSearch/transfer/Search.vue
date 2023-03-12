<script>
import { MONTH_RANGE, MONTH_RANGE_MAP } from "@/constants";
import * as store from "@/utils/store";
import { searchMixin } from "@/mixins";
import { dateFormat } from "@/utils/date";

const TYPE = "transfer";
const defualtFormData = {
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
    },
    isOut: Boolean
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
        companyIds: this.header.relatedCompanyId
          ? [this.header.relatedCompanyId]
          : []
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
        rangeType: undefined
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
        label-width="75px"
        size="mini"
        class="form-item-small-margin-bottom"
        style="width: 685px;"
      >
        <el-form-item label={`调${this.isOut ? "入" : "出"}分公司`}>
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
