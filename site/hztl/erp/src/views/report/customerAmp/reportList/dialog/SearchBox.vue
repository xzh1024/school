<template>
  <ht-dialog
    v-bind="$attrs"
    title="报表查询"
    width="400px"
    top="7vh"
    append-to-body
    v-on="$listeners"
  >
    <el-form
      :model="searchForm"
      submit-on-enter
      label-width="100px"
      class="form-item-small-margin-bottom display_none mt-1"
      size="mini"
    >
      <el-form-item prop="companyIds" label="分公司">
        <ht-select
          v-model="searchForm.companyIds"
          :options="allCompaniesWithPerm"
          placeholder="分公司"
          clearable
          filterable
          multiple
          collapse-tags
          has-selecte-all-val
        />
      </el-form-item>
      <el-form-item prop="code" label="开始业务日期">
        <el-date-picker
          v-model="searchForm.dateStart"
          type="date"
          placeholder="开始业务日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="code" label="结束业务日期">
        <el-date-picker
          v-model="searchForm.dateEnd"
          type="date"
          placeholder="结束业务日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="cooperatorAreaId" label="客户区域">
        <area-select
          v-model="cooperatorAreaId"
          :props="{ checkStrictly: true }"
          clearable
        />
      </el-form-item>
      <el-form-item prop="cooperatorId" label="客户名称">
        <ht-autoselect
          v-model="searchForm.cooperatorId"
          :fetch-suggestions="searchLoadAllCustromerCooperators"
          :trigger-on-focus="false"
          filterZero
          remote
          clearable
          highlight-first-item
          placeholder="客户名称"
        />
      </el-form-item>
      <el-form-item prop="cooperatorNo" label="单位编号">
        <ht-input
          v-model="searchForm.cooperatorNo"
          placeholder="单位编号"
          size="mini"
          class="input-with-select"
        ></ht-input>
      </el-form-item>
      <el-form-item class="no-margin">
        <ht-select
          v-model="searchForm.index"
          placeholder="指标"
          :clearable="false"
          :options="DEFAULT_INDEX"
          style="width:100px"
        />
        <ht-select
          v-model="searchForm.indexPattern"
          placeholder="匹配"
          :clearable="false"
          :options="INDEX_PATTERN"
          style="width:90px"
        />
        <ht-input
          v-model="searchForm.indexValue"
          size="mini"
          style="width:189px"
        >
        </ht-input>
      </el-form-item>

      <div style="margin-top: 10px; text-align: center;">
        <el-button type="primary" plain size="mini" @click.stop="searchHandle">
          确定（F3）
        </el-button>
        <el-button type="primary" plain size="mini" @click.stop="cancelHandle">
          取消（Esc）
        </el-button>
      </div>
    </el-form>
  </ht-dialog>
</template>

<script>
import { searchMixin } from "@/mixins";
import { PART_CODE_WAY } from "@/constants";
import AreaSelect from "@/components/select/AreaSelect";
import {
  BILL_TYPE,
  COMPANY,
  DEFAULT_INDEX,
  INDEX_PATTERN,
  STATUS
} from "../../group";
import * as store from "@/utils/store";

export default {
  name: "SearchBox",
  data() {
    return {
      searchForm: {
        dateStart: "",
        dateEnd: ""
      },
      cooperatorAreaId: [],
      PART_CODE_WAY,
      focusItem: "",
      BILL_TYPE,
      STATUS,
      INDEX_PATTERN,
      COMPANY,
      DEFAULT_INDEX
      // areas: []
    };
  },
  components: { AreaSelect },
  mixins: [searchMixin],
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          this.searchForm = {
            dateStart: "",
            dateEnd: ""
          };
          this.cooperatorAreaId = [];
          this.focusItem = "code";
          //把日期区间设置为今天
          const d = new Date();
          const year = d.getFullYear();
          const month = this.change(d.getMonth() + 1);
          const day = this.change(d.getDate());
          this.searchForm.dateStart = `${year}-${month}-${day}`;
          this.searchForm.dateEnd = `${year}-${month}-${day}`;
        }
      },
      immediate: true
    }
  },
  methods: {
    store() {
      return store;
    },
    change(t) {
      if (t < 10) {
        return "0" + t;
      } else {
        return t;
      }
    },
    searchHandle() {
      this.searchForm.cooperatorAreaId = this.cooperatorAreaId[2];
      this.$emit("searchParamsChange", this.searchForm);
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
<style lang="scss">
.no-margin {
  .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>
