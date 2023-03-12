<script>
import hotkeys from "hotkeys-js";
import { KEY_MAP } from "@/constants";

const keyScope = Symbol("htList");

export default {
  name: "HtList",
  componentName: "HtList",
  model: {
    event: "change",
    prop: "value"
  },
  props: {
    value: {
      type: [Number, String, Symbol],
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    disabledHotkeys: Boolean,
    isSetCurScope: Boolean
  },
  data() {
    return {
      seletionIndex: 0
    };
  },
  watch: {
    value: {
      handler(val) {
        if (!val) {
          this.seletionIndex = 0;
        } else {
          this.seletionIndex = this.options.findIndex(item => item.id === val);
        }
      },
      immediate: true
    },
    isSetCurScope: {
      handler(val) {
        if (val) {
          this.setCurScope();
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.bindKeyboard();
    window.addEventListener("keydown", this.preventElEvent, true);
  },
  destroyed() {
    window.removeEventListener("keydown", this.preventElEvent, true);
    hotkeys.deleteScope(keyScope);
  },
  methods: {
    onClick(index) {
      this.seletionIndex = index;
      this.$emit("change", this.options[index].id);
    },

    preventElEvent(e) {
      if (hotkeys.getScope() === keyScope) {
        if (e.altKey && [KEY_MAP.left, KEY_MAP.right].includes(e.keyCode)) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    },
    setCurScope() {
      if (this.disabledHotkeys) {
        return;
      }
      hotkeys.setScope(keyScope);
    },
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
    switchSeletion(type) {
      let index = this.seletionIndex;
      if (type === KEY_MAP.up) {
        index--;
        if (index < 0) {
          index = this.options.length - 1;
        }
      } else if (type === KEY_MAP.down) {
        index++;
        if (index > this.options.length - 1) {
          index = 0;
        }
      }
      this.onClick(index);
      this.scrollRow(index);
    },
    scrollRow(index) {
      const row = this.$refs[`refList${index}`];
      const list = this.$refs.refUl;
      if (row.offsetTop - list.offsetTop < this.$refs.refUl.scrollTop) {
        this.$refs.refUl.scrollTop = row.offsetTop - list.offsetTop;
      } else if (
        row.offsetTop - list.offsetTop + row.offsetHeight >
        list.offsetHeight
      ) {
        this.$refs.refUl.scrollTop = row.offsetTop - list.offsetHeight;
      }
    }
  },

  render() {
    return (
      <div
        class="ht-list"
        style="width: 100%; height: 100%;"
        on-click={this.setCurScope}
      >
        <ul ref="refUl" class={this.disabledHotkeys ? "ignore-hotkeys" : ""}>
          {this.options.map((item, index) => (
            <li ref={`refList${index}`}>
              <div
                class={`item-box${
                  index === this.seletionIndex ? " is-active" : ""
                }`}
                on-click={() => this.onClick(index)}
              >
                <div>{this.$slots.prefix}</div>
                <div class="item-name" title={item.name}>
                  {item.name}
                </div>
                <div>{this.$slots.suffix}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

ul {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 14px;

  li {
    margin: 0;
    padding: 0;

    .item-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      width: 100%;
      padding: 6px 10px;
      border: 1px solid #e8eaef;
      cursor: pointer;

      .item-name {
        flex: 1;
        text-align: left;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .is-active {
      color: #3aa7ff;
      background: #c0e3ff;
      @include background_color("color-primary", 0.1);
      @include font_color("color-primary");
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background: #3aa7ff;
        @include background_color("color-primary");
      }
    }
  }
}
</style>
