<template>
  <div class="select_panel">
    <label style="line-height: 52px; padding-left: 16px;">业务公司：</label>
    <ht-select
      style="width: 300px;"
      size="small"
      v-model="panel.companyIds"
      :options="allCompaniesWithPerm"
      clearable
      filterable
      multiple
      collapse-tags
      has-selecte-all-val
      @change="refreshData"
    />
    <el-radio-group
      v-model="panel.accumulativePattern"
      size="small"
      style="margin-top: -3px; margin-left: 20px;"
      @change="refreshData"
    >
      <el-radio-button :label="0">今日</el-radio-button>
      <el-radio-button :label="1">月累计</el-radio-button>
      <el-radio-button :label="2">季累计</el-radio-button>
      <el-radio-button :label="3">年累计</el-radio-button>
    </el-radio-group>
    <el-checkbox
      v-model="panel.includeRecheck"
      style="margin-left: 20px;"
      @change="refreshData"
    >
      出纳账含未复核
    </el-checkbox>
    <span class="refresh" @click="refreshData">
      <i
        class="el-icon-refresh-right"
        style="margin-right: 4px; color: #aab2b7;"
      ></i>
      刷新
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { searchMixin } from "@/mixins";
import * as store from "@/utils/store";

export default {
  name: "FilialeSelect",
  mixins: [searchMixin],
  data() {
    return {
      panel: {
        companyIds: [],
        accumulativePattern: 0,
        includeRecheck: true
      },
      selectList: []
    };
  },
  computed: {
    ...mapState("admin", {
      myCompanyId: state => state.user.userInfoMsg.companyId
    })
  },
  watch: {
    myCompanyId: {
      handler(val) {
        if (this.hasAutoPerm("our.read")) {
          this.panel.companyIds = [val];
          this.refreshData();
        }
      },
      immediate: true
    }
  },
  methods: {
    store() {
      return store;
    },
    refreshData() {
      this.$emit("refreshPanel", this.panel);
    }
  }
};
</script>
<style lang="scss" scoped>
.select_panel {
  margin-top: 10px;
  width: 100%;
  height: 52px;
  background: #ffffff;
  border-radius: 6px;
  overflow: hidden;
  .refresh {
    float: right;
    margin-right: 16px;
    line-height: 52px;
    font-size: 16px;
    color: #333333;
    cursor: pointer;
  }
}
.selectDiv {
  width: 250px;
  display: inline-block;
}
</style>
