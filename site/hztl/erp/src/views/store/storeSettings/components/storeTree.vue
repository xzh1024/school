<template>
  <el-tree
    ref="tree"
    v-bind="$attrs"
    :render-content="renderContent"
    highlight-current
    node-key="id"
    v-on="$listeners"
    @node-click="clickNode"
  />
</template>
<script>
import store from "@/views/store/storeSettings/store";
import hotkeys from "hotkeys-js";

const nodeTypes = {};
nodeTypes[store.StoreNodeTypes.Warehouses] = "仓";
nodeTypes[store.StoreNodeTypes.Wareareas] = "区";
nodeTypes[store.StoreNodeTypes.Shelves] = "架";
nodeTypes[store.StoreNodeTypes.Layers] = "层";
nodeTypes[store.StoreNodeTypes.Positions] = "位";

export default {
  name: "StoreTree",
  inheritAttrs: false,
  props: {
    keyScope: {
      type: [Symbol, String],
      default() {
        return Symbol("StoreTree");
      }
    },
    // 自动焦点，控制快捷键。
    autofocus: {
      type: Boolean,
      default: false
    },
    currentNodePath: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentNode: null
    };
  },
  mounted() {
    this.$watch(
      () => {
        return this.$refs.tree.treeItems.length > 0;
      },
      val => {
        if (val) {
          if (this.currentNodePath.length > 0) {
            this.setCurrentNodeByPath();
          } else {
            this.updateCurrentNode(this.$refs.tree.$children[0].node);
          }
        }
      }
    );
    if (this.autofocus) {
      this.focus();
    }
    hotkeys("*", { scope: this.keyScope }, e => {
      e.preventDefault();
      e.stopPropagation();

      switch (e.key) {
        case "Enter":
          this.toggleExpand();
          break;
        case "ArrowDown":
          this.moveNext();
          break;
        case "ArrowUp":
          this.movePre();
          break;
        default:
          this.$emit("hotkeysUp", e);
          break;
      }
    });
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    setCurrentNodeByPath() {
      const tree = this.$refs.tree;
      let lastExistKey = "";
      const expandNodePath = i => {
        const key = this.currentNodePath[i].data.key;
        const node = tree.getNode(key);
        if (node) {
          lastExistKey = key;
          if (i + 1 < this.currentNodePath.length) {
            node.expand(() => {
              expandNodePath(i + 1);
            });
          } else {
            if (lastExistKey) {
              this.updateCurrentNodeByKey(lastExistKey);
            }
          }
        } else {
          if (lastExistKey) {
            this.updateCurrentNodeByKey(lastExistKey);
          }
        }
      };
      expandNodePath(0);
    },
    clickNode(data, node) {
      this.focus();
      this.updateCurrentNode(node);
    },
    focus() {
      hotkeys.setScope(this.keyScope);
    },
    renderContent(h, { node, data }) {
      return (
        <span class="store-tree-node">
          <span class={"label-icon " + data.type}>
            {this.labelIconType(data)}
          </span>
          <span>{node.label}</span>
          <span class="disabledTips" v-show={this.isDisabled(data)}>
            （已停用）
          </span>
        </span>
      );
    },
    isDisabled(data) {
      return data.status === store.DisabledStat;
    },
    labelIconClass(data) {
      const c = "label-icon " + data.type;
      return c;
    },
    labelIconType(data) {
      return nodeTypes[data.type];
    },
    toggleExpand() {
      if (this.currentNode.isLeaf) {
        return;
      }
      if (this.currentNode.expanded) {
        this.currentNode.collapse();
      } else {
        this.currentNode.expand();
      }
    },
    moveNext() {
      if (!this.currentNode) {
        return;
      }
      if (this.currentNode.expanded && this.currentNode.childNodes.length > 0) {
        this.updateCurrentNode(this.currentNode.childNodes[0]);
      } else if (this.currentNode.nextSibling) {
        this.updateCurrentNode(this.currentNode.nextSibling);
      } else {
        this.updateCurrentNode(this.getNextSibling(this.currentNode));
      }
    },
    movePre() {
      if (!this.currentNode) {
        return;
      }
      const preNode = this.currentNode.previousSibling;
      if (preNode) {
        this.updateCurrentNode(this.getLastChild(preNode));
      } else {
        if (this.currentNode.parent && this.currentNode.parent.parent) {
          this.updateCurrentNode(this.currentNode.parent);
        }
      }
    },
    getNextSibling(node) {
      if (node.parent && node.parent.parent) {
        if (node.parent.nextSibling) {
          return node.parent.nextSibling;
        } else {
          return this.getNextSibling(node.parent);
        }
      } else {
        return null;
      }
    },
    getLastChild(node) {
      if (node.expanded && node.childNodes.length > 0) {
        return this.getLastChild(node.childNodes[node.childNodes.length - 1]);
      } else {
        return node;
      }
    },
    updateCurrentNode(node) {
      if (!(node && node.data)) {
        return;
      }
      this.updateCurrentNodeByKey(node.data.key);
    },
    updateCurrentNodeByKey(key) {
      if (!key) {
        return;
      }
      if (this.currentNode && this.currentNode.data.key === key) {
        return;
      }
      document.activeElement.blur();
      const tree = this.$refs["tree"];
      const currentNode = tree.getNode(key);
      tree.setCurrentKey(key);
      this.currentNode = currentNode;
      this.$emit("current-change", currentNode.data, currentNode);
    }
  }
};
</script>
<style lang="stylus" scoped></style>
