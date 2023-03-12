/**
 * 使用中设置defaultTab
 * tabs中绑定activeTab和changeTab
 */
export const TabChangeMixin = {
  data() {
    return {
      routeParamsName: "tabName",
      defaultTab: "",
      activeTab: null
    }
  },
  watch: {
    "$route": "changeRoute"
  },
  methods: {
    changeRoute(to, form) {
      if (form.name === this.$options.name && to.name === this.$options.name) {
        this.activeTab = this.activeTab || to.query[this.routeParamsName] || this.defaultTab;
        this.changeTab();
      }
    },
    _setActiveTab() {
      this.activeTab = this.$route.query[this.routeParamsName] || this.defaultTab;
      this.changeTab();
    },
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
  },
  created() {
    if ([null, "", undefined].includes(this.activeTab) && this.tabs.length) {
      this.defaultTab = this.tabs[0].id;
    }
    this._setActiveTab();
  },
  activated() {
    this._setActiveTab();
  }
}
