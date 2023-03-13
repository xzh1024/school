<script lang="tsx">
import { Component, Mixins } from "vue-property-decorator";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import TabChangeMixin from "@/mixins/tabChangeMixin";
import Ecommerce from "./ecommerce.vue";
import DataService from "./data-service.vue";

const TABS = [
  { id: "ecommerce", name: "电商平台" },
  { id: "dataService", name: "数据服务" }
];

@Component({
  name: "PlatformList"
})
export default class PlatformList extends Mixins(HotkeyMixin, TabChangeMixin) {
  public defaultTab = TABS[0].id;

  render() {
    return (
      <div class="container-box">
        <ht-tabs
          v-model={this.activeTab}
          tabs={TABS}
          class="tabs-primary tabs-large"
          style="margin-top: 5px;"
          onChange={this.changeTab}
        />
        <Ecommerce v-show={this.activeTab === TABS[0].id} />
        <DataService v-show={this.activeTab === TABS[1].id} />
      </div>
    );
  }
}
</script>
