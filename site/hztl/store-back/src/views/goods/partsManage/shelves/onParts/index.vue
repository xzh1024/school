<template>
  <div class="layout-container">
    <PartsSearchComponent
      :searchForm="searchForm"
      @handleQuery="handleQuery"
      @resetSearchForm="resetSearchForm"
    ></PartsSearchComponent>
    <div class="layout-main">
      <PartsTableComponent
        ref="partsTableComponent"
        :searchForm="searchForm"
      ></PartsTableComponent>
    </div>
  </div>
</template>

<script>
import PartsSearchComponent from "../components/search.vue";
import PartsTableComponent from "../components/table.vue";
import { PARAMS_MODEL } from "../constant";

export default {
  name: "OnParts",
  components: {
    PartsSearchComponent,
    PartsTableComponent
  },
  data() {
    return {
      searchForm: {
        ...PARAMS_MODEL,
        isUp: true
      }
    };
  },
  methods: {
    resetSearchForm() {
      Object.assign(this.searchForm, PARAMS_MODEL);
    },
    handleQuery() {
      this.$refs.partsTableComponent.getParts();
      this.$refs.partsTableComponent.clearSelection();
    }
  }
};
</script>

<style lang="less" scoped>
.layout-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .layout-main {
    flex: 1;
    overflow: auto;
    padding: 10px;
    border-radius: 4px;
    box-sizing: border-box;
  }
}
</style>
