<template></template>

<script>
import HtmlDiv from "./html-tags/html-div.vue";
import TabNav from "./tab-nav.vue";
export default {
  name: "BaseTab",
  components: {
    HtmlDiv,
    TabNav,
  },
  props: {
    /** 不同风格选项卡  默认风格1--content标签内容撑开  风格2--average均分宽度 */
    type: {
      type: String,
      default: "content",
    },
    /** 选项卡每项排列位置  left/center/right */
    align: {
      type: String,
      default: "left",
    },
    /** 切换标签之前的钩子，若返回 false，则阻止切换 */
    beforeClick: {
      type: Function,
    },
  },
  data() {
    return {
      /** 绑定值，选中选项卡的 name，默认第一个选项卡name */
      model: "",
      /** 当前选中项key */
      currentName: this.model || 0,
      /** 选项卡项集合 */
      panes: [],
    };
  },
  render(h) {
    let { align, type, currentName, panes, handleTabClick } = this;

    const tabHeaderData = {
      props: {
        currentName,
        type,
        panes,
        onTabClick: handleTabClick,
      },
      ref: "tabHeader",
    };

    const header = (
      <html-div html-class={`base-tabs__header is-${align}`}>
        <tab-nav {...tabHeaderData}></tab-nav>
      </html-div>
    );

    const content = (
      <html-div html-class="base-tabs__content">{this.$slots.default}</html-div>
    );

    return <html-div html-class="base-tabs">{[header, content]}</html-div>;
  },
  mounted() {
    this.calcPaneInstances();
  },
  methods: {
    calcPaneInstances() {
      const slots = this.$slots.default;
      if (slots) {
        const paneSlots = slots.filter((vNode) => {
          const ctor = vNode.componentOptions
            ? vNode.componentOptions.Ctor
            : null;
          const name = ctor && ctor.options ? ctor.options.name : "";
          return vNode.tag && name === "SnTabPane";
        });
        // 确保确实有选项卡项变更
        const panes = paneSlots.map(
          ({ componentInstance }) => componentInstance
        );
        if (
          !(
            panes.length === this.panes.length &&
            panes.every((pane, index) => pane === this.panes[index])
          )
        ) {
          this.panes = panes;
        }
      } else if (this.panes.length !== 0) {
        this.panes = [];
      }
    },
    /** tab项点击 */
    handleTabClick(tab, tabName, event) {
      if (tab.disabled) return;
      this.setCurrentName(tabName);
    },
    /** 设置当前选中项-更新标识缓存 */
    setCurrentName(newName) {
      const oldName = this.currentName;
      if (oldName === newName) return;
      let isContinue = true;
      if (typeof this.beforeClick === "function") {
        isContinue = this.beforeClick(newName, oldName);
      }
      if (isContinue === false) return;
      this.currentName = newName;
      //   this.modelChange(newName);
      this.$emit("change", newName);
    },
  },
};
</script>

<style lang="scss" scoped>
.base-tabs {
  position: relative;
  width: 100%;
  height: 100%;
}

// 头部
.base-tabs__header {
  height: 47px;
  &.is-right {
    text-align: right;
  }
  &.is-center {
    text-align: center;
  }
}

// 内容
.base-tabs__content {
  position: absolute;
  top: 47px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>