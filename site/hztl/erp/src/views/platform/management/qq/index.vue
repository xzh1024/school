<!--
 * @Author: Yong
 * @Date: 2021-09-22 09:49:06
 * @LastEditors: Yong
 * @LastEditTime: 2021-11-11 13:38:46
 * @Description: 企鹅汽配
-->

<script lang="tsx">
import hotkeys from "hotkeys-js";
import { Component, Mixins } from "vue-property-decorator";
import TabChangeMixin from "@/mixins/tabChangeMixin";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import accessAdmin from "./accessAdmin.vue";
import bindAdmin from "./bindAdmin.vue";
import paramSetting from "./params.vue";
let lastKeyscope: symbol | string;
const topHotkeys = new TopHotkeys();
const defaultTabs = [
  {
    name: "授权管理",
    id: "accessAdmin"
  },
  {
    name: "参数设置",
    id: "paramSetting"
  },
  {
    name: "客户关系管理",
    id: "bindAdmin"
  }
];
// Shelves未采用vue-property-decorator方式，使用components引入
@Component({
  components: {
    accessAdmin,
    bindAdmin,
    paramSetting
  }
})
export default class PlatformManagement extends Mixins(TabChangeMixin) {
  private tabs: { name: string; id: string }[] = [];
  public defaultTab = "";
  public activeTab = "";
  created() {
    const hasAuthPerm = this.hasPerm("transaction.platforms.author");
    const hasSettingPerm = this.hasPerm("transaction.platforms.paramsSettings");
    const hasCooperatorPerm = this.hasPerm("transaction.platforms.cooperator");
    console.log(hasAuthPerm, hasSettingPerm, hasCooperatorPerm);
    if (hasAuthPerm) {
      this.tabs.push(defaultTabs[0]);
    }
    if (hasSettingPerm) {
      this.tabs.push(defaultTabs[1]);
    }
    if (hasCooperatorPerm) {
      this.tabs.push(defaultTabs[2]);
    }
    this.defaultTab = this.tabs[0].id;
    this.activeTab = this.defaultTab;
  }
  mounted() {
    // console.log(this.tabs);
    lastKeyscope = hotkeys.getScope();
    topHotkeys.bindHotkeys(this.$el as HTMLElement);
  }
  destroyed() {
    topHotkeys.unbindHotkeys(this.$el as HTMLElement);
    hotkeys.setScope(lastKeyscope);
  }
  render() {
    return (
      <div class="flex-container column-flex">
        <ht-tabs
          class="tabs-primary"
          tabs={this.tabs}
          v-model={this.activeTab}
          on-change={this.changeTab}
        />
        {
          <div class="auto-block">
            {this.activeTab === "accessAdmin" ? (
              <accessAdmin />
            ) : this.activeTab === "paramSetting" ? (
              <paramSetting />
            ) : (
              <bindAdmin />
            )}
          </div>
        }
      </div>
    );
  }
}
</script>
