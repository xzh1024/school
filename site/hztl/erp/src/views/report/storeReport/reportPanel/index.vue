<template>
  <div class="content_body">
    <HeadPanel />
    <FilialeSelect v-if="showDataOverviewBoard" @refreshPanel="refreshPanel" />
    <TotalGaneralize
      v-if="showDataOverviewBoard"
      :panelData="panelDataSet"
      :searachParams="panelSearch"
    />
    <BottomContent
      v-if="showDataOverviewBoard"
      :panelData="panelDataSet"
      :searachParams="panelSearch"
    />
  </div>
</template>
<script>
import HeadPanel from "./HeadPanel";
import FilialeSelect from "./FilialeSelect";
import TotalGaneralize from "./TotalGaneralize";
import BottomContent from "./BottomContent";
import { loadReportPanel } from "@/api/storeReport";
export default {
  name: "storeReportPanel",
  components: { HeadPanel, FilialeSelect, TotalGaneralize, BottomContent },
  data() {
    return {
      panelDataSet: {},
      panelListDataSet: [],
      panelSearch: {
        companyIds: [],
        warehouseIds: []
      }
    };
  },
  computed: {
    showDataOverviewBoard() {
      return this.hasBelongsPermWithoutRoute(
        "read",
        "reports.storage.dataOverviewBoard"
      );
    }
  },
  methods: {
    refreshPanel(panel) {
      this.panelSearch = panel;
      this.getPanelData();
    },
    getPanelData() {
      const postData = {
        companyIds: this.panelSearch.companyIds,
        warehouseIds: this.panelSearch.warehouseIds
      };
      return loadReportPanel(postData)
        .then(res => {
          this.panelDataSet = res;
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.content_body {
  min-width: 1500px;
  width: 100%;
  height: 100%;
  padding: 10px 16px;
}
</style>
