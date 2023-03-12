<template>
  <div class="container-box">
    <ht-tabs
      v-model="activeTab"
      :tabs="tabList"
      class="tabs-primary tabs-large"
      style="margin-top: 5px;"
      @change="changeTab"
    />
    <div style="flex: auto; overflow: hidden;">
      <keep-alive>
        <components :is="activeTab" :canSave="canSave" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import CommonParams from "./common-params";
import PurchaseParams from "./purchase-params";
import SaleParams from "./sale-params";
import AllocationParams from "./transfer-params";
import StorageParams from "./storage-params";
import FinancialParams from "./financial-params";
import CooperatorParams from "./cooperator-params";
import FlowParams from "./flow-params";
import RepairParams from "./repair-params";
import { hotkeyMixin, tabChangeMixin } from "@/mixins";
import { getParamsModule } from "@/api/setting";

export default {
  name: "ParamsSetting",
  mixins: [hotkeyMixin, tabChangeMixin],
  components: {
    CommonParams,
    PurchaseParams,
    SaleParams,
    AllocationParams,
    StorageParams,
    FinancialParams,
    CooperatorParams,
    FlowParams,
    RepairParams
  },
  data() {
    return {
      defaultTab: "CommonParams",
      tabList: []
    };
  },
  computed: {
    canSave() {
      return this.hasAutoPerm("write");
    }
  },
  mounted() {
    getParamsModule().then(res => {
      const arr = [...res];
      arr.forEach(item => {
        item.id = item.code + "Params";
        item.name = item.name + "参数";
      });
      this.tabList = arr;
    });
  }
};
</script>
