<template>
  <div class="container-box">
    <ht-card>
      <search ref="search" @query-data="handleQueryData" />
    </ht-card>
    <ResizeBox
      :visible.sync="resizeVisible"
      class="resize-box"
      is-column
      direction-contrary
      :default-len="120"
    >
      <template v-slot:block1>
        <ht-card no-background no-padding class="auto-card">
          <settle-list-table
            :key-scope="keyScopes.listTable"
            :query-params="queryParams"
            @hotkeysUp="handleHotkeysUp"
            @click.native.stop="setKeyScope(keyScopes.listTable)"
            @row-change="handleSettleListTableRowChange"
          />
        </ht-card>
      </template>
      <template v-slot:block2>
        <ht-card no-background no-padding class="auto-card">
          <settle-list-detail
            :key-scope="keyScopes.listDetail"
            :bill="settleBill"
            @hotkeysUp="handleHotkeysUp"
            @click.native.stop="setKeyScope(keyScopes.listDetail)"
          />
        </ht-card>
      </template>
    </ResizeBox>
  </div>
</template>

<script>
import hotkeys from "hotkeys-js";
import ResizeBox from "@/components/resizeBox";
import Search from "./Search";
import SettleListTable from "./SettleListTable";
import SettleListDetail from "./SettleListDetail";

export default {
  name: "SettleList",
  components: {
    ResizeBox,
    Search,
    SettleListTable,
    SettleListDetail
  },
  data() {
    return {
      keyScopes: {
        listTable: Symbol("settleListTable"),
        listDetail: Symbol("SettleListDetail")
      },
      queryParams: {},
      settleBill: {
        id: 0,
        paymentType: 0,
        unsettleStatus: 0,
        enhancedSettlementType: ""
      },
      resizeVisible: true
    };
  },
  activated() {
    this.setTabKeyScope();
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScopes.listTable);
    hotkeys.deleteScope(this.keyScopes.listDetail);
  },
  methods: {
    setTabKeyScope() {
      this.setKeyScope(this.keyScopes.listTable);
    },
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    },
    handleHotkeysUp(e) {
      this.$refs.search &&
        this.$refs.search.keyboardListener &&
        this.$refs.search.keyboardListener(e);
    },
    handleQueryData(queryParams) {
      this.queryParams = { ...queryParams };
    },
    handleSettleListTableRowChange(value) {
      this.settleBill = {
        id: value.id,
        paymentType: value.paymentType,
        unsettleStatus: value.unsettleStatus,
        enhancedSettlementType: value.enhancedSettlementType
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.resize-box {
  margin: 0 5px;
  width: calc(100% - 10px);
  background-color: $color-content-bg;
  @include background_color("color-content-bg");
}
</style>
