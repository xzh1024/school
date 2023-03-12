<template>
  <div class="ht-container">
    <PartsSearchComponent
      :searchForm="searchForm"
      @handleQuery="handleQuery"
      @resetSearchForm="resetSearchForm"
    ></PartsSearchComponent>
    <div class="ht-main bg-color-white">
      <PartsTableComponent
        ref="partsTableComponent"
        :searchForm="searchForm"
      ></PartsTableComponent>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PartsSearchComponent from "../components/search.vue";
import PartsTableComponent from "../components/table.vue";
import { PartsParams } from "@/common/interface/commodityInterface";
import { PARAMS_MODEL } from "../constant";

@Component({
  name: "OnParts",
  components: {
    PartsSearchComponent,
    PartsTableComponent
  }
})
export default class OnParts extends Vue {
  protected searchForm: PartsParams = {
    ...PARAMS_MODEL,
    isUp: true
  };

  protected resetSearchForm() {
    Object.assign(this.searchForm, PARAMS_MODEL);
  }

  get partsTableComponent(): PartsTableComponent {
    return this.$refs.partsTableComponent as PartsTableComponent;
  }

  protected handleQuery() {
    this.partsTableComponent.getParts();
    this.partsTableComponent.clearSelection();
  }
}
</script>
