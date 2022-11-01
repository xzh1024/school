<template></template>

<script>
import HtmlDiv from "./html-tags/html-div.vue";
import HtmlSpan from "./html-tags/html-span.vue";

export default {
  name: "TabHeader",
  components: {
    HtmlDiv,
    HtmlSpan,
  },
  props: {
    /** 选项卡头部项列表 */
    panes: {
      type: Array,
      default: () => [],
    },
    /** 与选项卡model对应的标识符，表示选项卡别名 */
    name: {
      type: String | Number,
      default: "",
    },
    /** 选项卡风格 */
    type: {
      type: String,
      default: "",
    },
    /** 选项卡点击触发 */
    onTabClick: {
      type: Function,
    },
  },
  data() {
    return {};
  },
  render(h) {
    const { type, panes, onTabClick } = this;

    // 宽度
    const width = type === "average" ? 100 / panes.length + "%" : null;

    const tabs = panes.map((pane, index) => {
      // 序号
      pane.index = index;
      // 标识
      let tabName = pane.name || index;
      // 选项卡label
      const tabLabelContent = pane.$slots.label || pane.label;

      return (
        <html-div
          html-class={[
            `base-tabs__item ${type}`,
            {
              "is-active": pane.active,
              "is-disabled": pane.disabled,
            },
          ]}
          style={{ width: width }}
          key={`tab-${tabName}`}
          tabindex={index}
          click={(e) => {
            onTabClick(pane, tabName, e);
          }}
        >
          <html-span html-class="base-tabs__text">{tabLabelContent}</html-span>
          <html-span html-class="base-tabs__line"></html-span>
        </html-div>
      );
    });

    return <html-div html-class="base-tabs__nav">{tabs}</html-div>;
  },
};
</script>

<style lang="scss" scoped>
.base-tabs__nav {
  position: relative;
  height: 47px;
  background-color: #fff;
  border-bottom: 1px solid #ebeef1;
}

.base-tabs__item {
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin: 0 15px;
  color: #333;
  cursor: pointer;
  outline: none;

  &:hover {
    color: #45a2ff;
  }

  &.is-active {
    color: #45a2ff;
    .base-tabs__text {
      border-bottom-color: #45a2ff;
    }
  }

  &.is-disabled {
    color: #999;
    cursor: not-allowed;
    &.is-active {
      .base-tabs__text {
        border-bottom-color: #999;
      }
    }
  }

  // 风格2--均分宽度
  &.average {
    padding: 0 10px;
    margin: 0;
    text-align: center;
    &:last-child {
      .base-tabs__line {
        display: none;
      }
    }
    // 分隔线
    .base-tabs__line {
      display: block;
    }
  }
}

// 文本
.base-tabs__text {
  display: inline-block;
  padding: 15px 0;
  font-size: 14px;
  font-weight: 700;
  border-bottom: 2px solid transparent;
}

// 分隔线
.base-tabs__line {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: none;
  width: 1px;
  height: 16px;
  background-color: #e2e6e9;
  margin: auto 0;
}
</style>