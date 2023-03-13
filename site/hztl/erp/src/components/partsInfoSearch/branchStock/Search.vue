<script>
import * as store from "@/utils/store";
import { searchMixin } from "@/mixins";

const defualtFormData = {
  companyIds: []
};

export default {
  name: "Search",
  mixins: [searchMixin],
  data() {
    return {
      formData: { ...defualtFormData }
    };
  },
  mounted() {
    this.searchHandle();
  },
  methods: {
    searchHandle() {
      this.$emit("search", { ...this.formData });
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
        <el-form-item label="分公司">
          <ht-select
            v-model={this.formData.companyIds}
            options={store.allCompanies()}
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
      </el-form>
    );
  }
};
</script>
