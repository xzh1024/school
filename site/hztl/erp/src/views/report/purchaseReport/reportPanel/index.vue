<template>
  <div class="content_body">
    <HeadPanel />
    <FilialeSelect v-if="showDataOverviewBoard" @refreshPanel="refreshPanel" />
    <BottomContent
      v-if="showDataOverviewBoard"
      :panelData="panelDataSet"
      :companyIds="companyIdList"
    />
  </div>
</template>
<script>
import HeadPanel from "./HeadPanel";
import FilialeSelect from "./FilialeSelect";
import BottomContent from "./BottomContent";
import { loadReportPanel } from "@/api/report";

export default {
  name: "purchaseReportPanel",
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
        "reports.purchase.dataOverviewBoard"
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
        CompanyIdList: this.companyIdList
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
  padding: 10px;
}
</style>
