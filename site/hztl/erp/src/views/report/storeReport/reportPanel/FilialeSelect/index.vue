<template>
  <div class="select_panel">
    <label style="line-height:52px;padding-left:16px">仓库：</label>
    <div class="selectDiv">
      <ht-select
        style="width:250px;"
        size="small"
        v-model="panel.warehouseIds"
        :options="store().administerWareHouse()"
        placeholder="仓库"
        clearable
        filterable
        multiple
        collapse-tags
        has-selecte-all-val
        @change="refreshData"
      />
    </div>
    <label style="line-height:52px;padding-left:16px">分公司：</label>
    <ht-select
      style="width:300px;"
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
    <span class="refresh" @click="refreshData">
      <i
        class="el-icon-refresh-right"
        style="margin-right:4px;color:#aab2b7"
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
        warehouseIds: []
      },
      hasSetWarehouseIds: false
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
        }
      },
      immediate: true
    },
    administerWareHouse: {
      handler(val) {
        if (val.length) {
          this.panel.warehouseIds = val.map(item => item.id);
        }
        this.hasSetWarehouseIds = true;
      }
    },
    hasSetWarehouseIds(val, oldVal) {
      if (val && val === !oldVal) {
        this.refreshData();
      }
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
