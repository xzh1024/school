<script lang="tsx">
import { Component, Mixins } from "vue-property-decorator";
import TabChangeMixin from "@/mixins/tabChangeMixin";
import { namespace } from "vuex-class";
import { Platform } from "@/constants/platform";
import Parameters from "./parameters/index.vue";
import Shelves from "./shelves.vue";
import eventBus from "@/event";

const PlatformStore = namespace("platform");

const defaultTabs = [
  {
    name: "参数设置",
    id: "parameters"
  },
  {
    name: "配件上下架",
    id: "shelves"
  }
];

// Shelves未采用vue-property-decorator方式，使用components引入
@Component({
  components: {
    Shelves,
    parameters: Parameters
  }
})
export default class PlatformManagement extends Mixins(TabChangeMixin) {
  @PlatformStore.State("platformList") private platformList!: Platform[];
  @PlatformStore.Action("loadPlatformList")
  public loadPlatformList!: (isReload?: boolean) => Promise<void>;
  get platformKey() {
    return this.$route.params.key;
  }
  get platformLogo() {
    const curPlatform = this.platformList.find(
      item => item.key === this.platformKey
    );
    return curPlatform && curPlatform.logo;
  }
  public defaultTab = "parameters";
  private tabs = [...defaultTabs];
  mounted() {
    this.loadPlatformList();
    if (
      !this.hasAutoPerm("paramsSettings") &&
      this.hasAutoPerm("partsUpDown")
    ) {
      this.tabs = [defaultTabs[1]];
      this.activeTab = "shelves";
      this.changeTab();
    } else if (
      this.hasAutoPerm("paramsSettings") &&
      !this.hasAutoPerm("partsUpDown")
    ) {
      this.tabs = [defaultTabs[0]];
      this.activeTab = "parameters";
      this.changeTab();
    }
  }
  openManualDialog() {
    eventBus.$emit("open-manual-dialog", 46);
  }
  render() {
    return (
      <div class="flex-container column-flex">
        <span
          class="text-danger"
          style="cursor:pointer;text-align:right;padding-right:5px;"
          onClick={this.openManualDialog}
        >
          <i class="el-icon-question"></i>如何使用平台管理
        </span>
        <ht-tabs
          class="tabs-primary"
          tabs={this.tabs}
          v-model={this.activeTab}
          on-change={this.changeTab}
        />
        <div class="auto-block">
          {this.activeTab === "parameters" && (
            <parameters platformKey={this.platformKey}>
              <img class="platform-watermark" src={this.platformLogo} />
            </parameters>
          )}
          {this.activeTab === "shelves" && (
            <shelves platformKey={this.platformKey}>
              <img class="platform-watermark" src={this.platformLogo} />
            </shelves>
          )}
        </div>
      </div>
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
.platform-watermark {
  display: block;
  position: absolute;
  right: 10px;
  bottom: 10px;
  opacity: 0.3;
  pointer-events: none;
}
</style>
