<template>
  <el-row style="min-width:1300px;margin:0;padding-right:10px;">
    <div class="select_panel">
      <label style="line-height:52px;padding-left:16px">分公司：</label>
      <ht-select
        style="width:300px;"
        size="small"
        v-model="companyIds"
        :options="allCompaniesWithPerm"
        clearable
        filterable
        multiple
        collapse-tags
        has-selecte-all-val
        @change="refreshData"
      />
      <span class="refresh" @click="refreshData">
        <i
          class="el-icon-refresh-right"
          style="margin-right:4px;color:#aab2b7"
        ></i>
        刷新
      </span>
    </div>
  </el-row>
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
      companyIds: []
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
          this.companyIds = [val];
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
      this.$emit("refreshPanel", this.companyIds);
    }
  }
};
</script>
<style lang="scss" scoped>
.select_panel {
  margin-top: 10px;
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
</style>
