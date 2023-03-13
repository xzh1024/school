<script>
import hotkeys from "hotkeys-js";
import { KEY_MAP } from "@/constants";

const keyScope = Symbol("htAutoTabs");
export default {
  name: "htAutoTabs",
  props: {
    value: {
      type: Number,
      default: 0
    },
    tabs: {
      type: Array,
      default: () => {
        return [
          { id: "tab1", name: "tab1" },
          { id: "tab2", name: "tab2" }
        ];
      }
    }
  },
  data() {
    return {
      currentTab: 0
    };
  },
  watch: {
    value(val) {
      this.currentTab = val;
    }
  },
  mounted() {
    console.log(this.tabs);
    this.bindKeyboard();
    window.addEventListener("keydown", this.preventElEvent, true);
  },
  destroyed() {
    window.removeEventListener("keydown", this.preventElEvent, true);
    hotkeys.deleteScope(keyScope);
  },
  methods: {
    bindKeyboard() {
      hotkeys("*", { scope: keyScope }, e => {
        switch (e.keyCode) {
          case KEY_MAP.up:
          case KEY_MAP.down:
            e.preventDefault();
            if (!e.altKey && this.options.length) {
              this.switchSeletion(e.keyCode);
            }
            break;
          default:
            return;
        }
      });
    },
    preventElEvent(e) {
      if (hotkeys.getScope() === keyScope) {
        if (e.altKey && [KEY_MAP.left, KEY_MAP.right].includes(e.keyCode)) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    },
    handleClick(tab, index) {
      this.currentTab = index;
      this.$emit("input", index);
    }
  },
  render() {
    return (
      <div class="ht-tabs">
        {this.tabs.map((tab, index) => {
          return (
            <li
              class={index === this.currentTab ? "tab active" : "tab"}
              on-click={() => {
                this.handleClick(tab, index);
              }}
            >
              {tab.name}
              {tab.num ? (
                <el-badge class="m-l-2" value={tab.num} max={99} />
              ) : null}
            </li>
          );
        })}
      </div>
    );
  }
};
</script>
<style scoped lang="scss">
.ht-tabs {
  transition: 0.3s ease;
  .pop {
    position: relative;
    width: 23px;
    font-size: 12px;
    line-height: 24px;
    height: 23px;
    font-weight: bold;
    display: inline-block;
    border-radius: 50%;
    background-color: #ef1818;
    color: #fff;
    margin-left: 4px;
    box-shadow: 1px 1px 6px #f842429e;
    zoom: 0.9;
    text-indent: 0px;
    top: -2px;
  }
}
</style>
