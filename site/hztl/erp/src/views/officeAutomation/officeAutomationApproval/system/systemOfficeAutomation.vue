<template>
  <ht-card title="OA审批" no-padding class="auto-card">
    <ht-tabs v-model="activeTab" :tabs="tabs" class="ht-tabs tabs-regular" />
    <components
      :is="activeTab"
      @getFeeApplicationsCount="getFeeApplicationsCount"
    />
  </ht-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SystemPending from "./systemPending/index.vue";
import SystemHasBegun from "./systemHasBegun/index.vue";
import { OaCountModel } from "../constant/interfaces";
import eventBus from "@/event";
const h = eventBus.$createElement;
import { OfficeAutomationService } from "../constant/services";
const officeAutomationService = new OfficeAutomationService();

@Component({
  name: "SystemOfficeAutomation",
  components: {
    SystemPending,
    SystemHasBegun
  }
})
export default class SystemOfficeAutomation extends Vue {
  public activeTab = "SystemPending";
  public defaultTab = "SystemPending";

  public tabsCount: OaCountModel = {
    toProcess: 0,
    applied: 0,
    max: 99
  };

  public tabs = [
    {
      id: "SystemPending",
      name: "待处理",
      render: (name: string) => {
        return h("span", {}, [
          name,
          h("el-badge", {
            attrs: {
              value: this.tabsCount.toProcess,
              max: this.tabsCount.max,
              hidden: !this.tabsCount.toProcess
            }
          })
        ]);
      }
    },
    {
      id: "SystemHasBegun",
      name: "已发起",
      render: (name: string) => {
        return h("span", {}, [
          name,
          h("el-badge", {
            attrs: {
              value: this.tabsCount.applied,
              max: this.tabsCount.max,
              hidden: !this.tabsCount.applied
            }
          })
        ]);
      }
    }
  ];

  getFeeApplicationsCount() {
    officeAutomationService
      .getFeeApplicationsCount()
      .then(res => {
        if (res) {
          const { applied, toProcess } = res;
          this.tabsCount.applied = applied || 0;
          this.tabsCount.toProcess = toProcess || 0;
        }
      })
      .catch(() => {
        this.tabsCount.applied = 0;
        this.tabsCount.toProcess = 0;
      });
  }
}
</script>
