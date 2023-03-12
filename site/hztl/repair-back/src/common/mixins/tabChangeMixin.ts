/**
 * 使用中设置defaultTab
 * tabs中绑定activeTab和changeTab
 */
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";

@Component
export default class TabChangeMixin extends Vue {
  routeParamsName = "tabName";
  defaultTab = ""; // 使用页面中重新定义值
  activeTab: string | null = null;
  private _setActiveTab() {
    // 其他页面切换到当前页面获取新值
    this.activeTab =
      (this.$route.query[this.routeParamsName] as string) || this.defaultTab;
    this.changeTab();
  }
  changeTab() {
    const tab = this.activeTab || this.defaultTab;
    if (this.$route.query[this.routeParamsName] !== tab) {
      this.$router.push({
        query: {
          ...this.$route.query,
          [this.routeParamsName]: tab
        }
      });
    }
  }
  @Watch("$route")
  onRouteChange(to: Route, form: Route) {
    // 原页面切换子页签优先获取原有值
    if (form.name === this.$options.name && to.name === this.$options.name) {
      this.activeTab =
        this.activeTab ||
        (to.query[this.routeParamsName] as string) ||
        this.defaultTab;
      this.changeTab();
    }
  }
  created() {
    this._setActiveTab();
  }
  activated() {
    this._setActiveTab();
  }
}
