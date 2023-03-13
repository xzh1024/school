<template>
  <div class="container-box">
    <ht-tabs
      v-model="activeTab"
      :tabs="tabs"
      class="tabs-primary tabs-large"
      style="margin: 5px 0 0 0;"
      @change="changeTab"
    />
    <components :is="activeTab" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import TabChangeMixin from "@/mixins/tabChangeMixin";
import OaAdd from "./oaAdd/index.vue";
import OaToProcess from "./oaToProcess/index.vue";
import OaInitiated from "./oaInitiated/index.vue";
import OaApprovalQuery from "./oaApprovalQuery/index.vue";

@Component({
  name: "OfficeAutomationApproval",
  components: {
    OaAdd,
    OaToProcess,
    OaInitiated,
    OaApprovalQuery
  }
})
export default class OfficeAutomationApproval extends Mixins(
  HotkeyMixin,
  TabChangeMixin
) {
  public activeTab = "OaAdd";
  public defaultTab = "OaAdd";
  public tabs = [
    { id: "OaAdd", name: "新建审批" },
    { id: "OaToProcess", name: "待处理" },
    { id: "OaInitiated", name: "已发起" },
    { id: "OaApprovalQuery", name: "审批查询" }
  ];
}
</script>
