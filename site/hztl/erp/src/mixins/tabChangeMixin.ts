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
  activeTab: string | null = this.defaultTab;
  private _setActiveTab() {
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
  // 切换选项卡并且把子选项卡重置，用于结算中心挂帐的维修类转其他tab
  changeTabAndResetChild() {
    const tab = this.activeTab || this.defaultTab;
    if (this.$route.query[this.routeParamsName] !== tab) {
      this.$router.push({
        query: {
          ...this.$route.query,
          [this.routeParamsName]: tab,
          grandChildTabName: "0"
        }
      });
    }
  }
  @Watch("$route")
  onRouteChange(to: Route, form: Route) {
    if (form.name === to.name) {
      // 当前页面子页面切换获取新值
      this._setActiveTab();
    }
  }
  created() {
    this._setActiveTab();
  }
  activated() {
    // 其他页面切换到当前页面获取新值
    this._setActiveTab();
  }
}
