<template>
  <div class="content_body">
    <HeadPanel />
    <FilialeSelect v-if="showDataOverviewBoard" @refreshPanel="refreshPanel" />
    <!-- <TotalGaneralize
      v-if="showDataOverviewBoard"
      :panelData="panelDataSet"
      :companyIds="companyIdList"
    /> -->
    <BottomContent
      v-if="showDataOverviewBoard"
      :companyIds="companyIdList"
      :panelData="panelDataSet"
    />
  </div>
</template>
<script>
import HeadPanel from "./HeadPanel";
import FilialeSelect from "./FilialeSelect";
// import TotalGaneralize from "./TotalGaneralize";
import BottomContent from "./BottomContent";
import { loadReportPanel } from "@/api/salesReport";
export default {
  name: "salesReportPanel",
  components: { HeadPanel, FilialeSelect, BottomContent },
  data() {
    return {
      companyIdList: [],
      panelDataSet: {},
      panelListDataSet: []
    };
  },
  computed: {
    showDataOverviewBoard() {
      return this.hasBelongsPermWithoutRoute(
        "read",
        "reports.sale.dataOverviewBoard"
      );
    }
  },
  methods: {
    refreshPanel(companyIds) {
      if (companyIds && companyIds.length) {
        this.companyIdList = companyIds;
        this.getPanelData();
      }
    },
    getPanelData() {
      const postData = {
        CompanyIds: this.companyIdList
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
  min-width: 1400px;
  width: 100%;
  height: 100%;
  padding: 10px 16px;
}
</style>
