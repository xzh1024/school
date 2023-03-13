<script>
import hotkeys from "hotkeys-js";
import { KEY_MAP } from "@/constants";

const keyScope = Symbol("htTree");
export default {
  name: "HtTree",
  componentName: "HtTree",
  props: {
    disabledHotkeys: Boolean
  },
  computed: {
    treeRef() {
      return this.$refs.elTree;
    },
    treeBoxRef() {
      return this.$refs.treeBox;
    }
  },
  mounted() {
    window.addEventListener("keydown", this.preventElEvent, true);
  },
  destroyed() {
    window.removeEventListener("keydown", this.preventElEvent, true);
  },
  methods: {
    setCurScope() {
      if (this.disabledHotkeys) {
        return;
      }
      hotkeys.setScope(keyScope);
    },
    preventElEvent(e) {
      if (hotkeys.getScope() === keyScope) {
        if (e.altKey && [KEY_MAP.left, KEY_MAP.right].includes(e.keyCode)) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    },
    bindClick(...params) {
      this.$emit("node-click", ...params);
      this.treeBoxRef.click();
    }
  },
  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { "node-click": nodeClick, ...listeners } = this.$listeners;

    return (
      <div ref="treeBox" class="ht-tree" on-click={this.setCurScope}>
        <el-tree
          ref="elTree"
          on={listeners}
          attrs={this.$attrs}
          on-node-click={this.bindClick}
          class={`${this.disabledHotkeys ? "ignore-hotkeys" : ""}`}
        />
      </div>
    );
  }
};
</script>
