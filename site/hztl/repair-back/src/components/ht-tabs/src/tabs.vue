<script>
export default {
  name: "HtTabs",
  componentName: "HtTabs",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {},
    tabs: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {
    if ([null, "", undefined].includes(this.value) && this.tabs.length) {
      this.tabChange(this.tabs[0]);
    }
  },
  methods: {
    tabChange(tab) {
      this.$emit("change", tab.id);
    },
    listenKeyboard(e) {
      let index = this.tabs.findIndex(item => item.id === this.value);
      switch (e.keyCode) {
        case 37:
          event.preventDefault();
          index--;
          break;
        case 39:
          event.preventDefault();
          index++;
          break;

        default:
          break;
      }
      if (index < 0) {
        index = this.tabs.length - 1;
      } else if (index >= this.tabs.length) {
        index = 0;
      }
      this.tabChange(this.tabs[index]);
    }
  },
  render() {
    return (
      <ul class="ht-tabs">
        {this.tabs.map(tab => (
          <li
            on-click={() => this.tabChange(tab)}
            class={`tab ${this.value === tab.id ? "active" : ""}`}
          >
            {tab.render ? tab.render(tab.name, tab) : tab.name}
          </li>
        ))}
      </ul>
    );
  }
};
</script>

<style lang="scss" scoped>
.ht-tabs {
  margin: 0;
  padding: 0;
  font-size: 16px;

  li.tab {
    cursor: pointer;
    display: inline-block;
    height: 34px;
    line-height: 34px;
    text-align: center;
    padding: 0 12px;
    border-bottom: 2px solid transparent;

    &.active {
      color: $color-primary;
      border-color: $color-primary;
    }

    .warning-text {
      color: $color-warning;
    }

    .danger-text {
      color: $color-danger;
    }
  }

  &.tabs-large {
    li.tab {
      height: 40px;
      line-height: 40px;
    }
  }

  &.tabs-regular {
    border-bottom: 1px solid #c9ced4;

    li.tab {
      color: $color-text-primary;

      &.active {
        background: $color-bg-primary-light;
      }
    }
  }

  &.tabs-primary {
    background: $color-bg-primary;
    color: $border-color-base;

    li.tab {
      border-bottom: none;

      &.active {
        color: $color-content-bg;
        background: $color-bg-primary-dark;
      }
    }
  }
}
</style>
