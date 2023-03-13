<template>
  <div class="full-height" @click.stop="setCurScope">
    <ht-card title="客户列表" no-padding class="full-height">
      <ul
        ref="refUl"
        class="company-info-list"
        style="height:363px;overflow-y: auto"
      >
        <li v-for="(item, index) in list" ref="refList" :key="index">
          <p
            :class="{ 'is-active': index === relSeletionIndex }"
            class="item-box"
            @click="seletionChange(index)"
          >
            <span class="company-name ellipsis-text"
              >{{ item.cooperatorInfo.cooperatorName }}
              <span class="text-font-danger">{{
                item.cooperatorInfo.cooperatorId ? "" : "（未绑定）"
              }}</span>
            </span>
            <span class="table-data-num">( {{ item.carts.length }} )</span>
          </p>
        </li>
      </ul>
    </ht-card>
  </div>
</template>
<script>
import hotkeys from "hotkeys-js";

export default {
  name: "BasketGroup",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    keyScope: {
      type: [String, Symbol],
      default: Symbol()
    },
    seletionIndex: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    relSeletionIndex: {
      get() {
        return this.seletionIndex;
      },
      set(value) {
        this.$emit("update:seletionIndex", value);
      }
    }
  },
  watch: {
    list: {
      handler(value, oldValue) {
        if (oldValue && oldValue.length === value.length) {
          this.seletionChange(this.relSeletionIndex);
        } else {
          this.seletionChange(0);
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.bindKeyboard();
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    setCurScope() {
      hotkeys.setScope(this.keyScope);
    },
    seletionChange(index) {
      this.relSeletionIndex = index;
      this.$emit("seletionChange", this.list[index]);
    },
    switchSeletion(type) {
      let index = this.relSeletionIndex;
      if (type === "ArrowUp") {
        index--;
        if (index < 0) {
          index = this.list.length - 1;
        }
      } else if (type === "ArrowDown") {
        index++;
        if (index > this.list.length - 1) {
          index = 0;
        }
      }
      this.seletionChange(index);
      this.scrollRow(index);
    },
    scrollRow(index) {
      const row = this.$refs.refList[index];
      const list = this.$refs.refUl;
      if (row.offsetTop - list.offsetTop < this.$refs.refUl.scrollTop) {
        this.$refs.refUl.scrollTop = row.offsetTop - list.offsetTop;
      } else if (
        row.offsetTop - list.offsetTop + row.offsetHeight >
        list.offsetHeight
      ) {
        this.$refs.refUl.scrollTop = row.offsetTop - list.offsetHeight;
      }
    },
    bindKeyboard() {
      hotkeys("*", { scope: this.keyScope }, (e, handler) => {
        switch (e.key) {
          case "ArrowUp":
          case "ArrowDown":
            e.preventDefault();
            if (this.list.length) {
              this.switchSeletion(e.key);
            }
            break;
          default:
            this.$emit("hotkeysUp", e, handler);
            return;
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.company-info-list {
    margin: 0;
    padding: 0;
    color: #778087;
    font-size: 14px;
    height: calc(100% - 30px);
    overflow: auto;

    li {
        position: relative;
        margin: 0;
        padding: 0;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            background #E8EAEF;
        }

        p {
            margin: 0;
            width: 100%;
            padding: 6px 10px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;

            span {
                display: inline-block;
            }

            .company-name {
              width: 200px;
              text-align: left;
            }

            .table-data-num {
                color: #FF424D;
                white-space: nowrap;
            }
        }

        .item-box.is-active {
            position: relative;
            color: #3AA7FF;
            background: #C0E3FF;

            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 4px;
                height: 100%;
                background: #3aa7ff;
            }
        }
    }
}
</style>
