<template>
  <ul ref="refUl" class="company-info-list" v-loading="loading">
    <li v-for="(item, index) in list" ref="refList" :key="index">
      <div
        :class="{ 'is-active': index === relSeletionIndex }"
        class="item-box"
        @click="seletionChange(index)"
      >
        <div class="company-name ellipsis-text">
          {{ item.name }}
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import hotkeys from "hotkeys-js";

export default {
  name: "BranchCompanyList",
  props: {
    loading: Boolean,
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    seletionIndex: {
      type: [Number, String],
      default: 0
    },
    keyScope: {
      type: [String, Symbol],
      default: Symbol("companyFundBranchCompanyList")
    }
  },
  data() {
    return {
      delay: false
    };
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
  mounted() {
    this.bindKeyScope();
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    seletionChange(index, e) {
      if (e) {
        e.stopPropagation();
      }
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
    bindKeyScope() {
      hotkeys("*", { scope: this.keyScope }, (e, handler) => {
        switch (e.key) {
          case "ArrowUp":
          case "ArrowDown":
            e.preventDefault();
            if (this.loading || this.delay) return;
            if (this.list.length) {
              this.switchSeletion(e.key);
            }
            this.delay = true;
            setTimeout(() => {
              this.delay = false;
            }, 500);
            break;
          default:
            this.$emit("hotkeysUp", e, handler);
            break;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";
.company-info-list {
  margin: 0;
  padding: 0;
  color: #778087;
  font-size: 14px;
  height: calc(100% - 10px);
  overflow: auto;
  li {
    position: relative;
    margin: 0;
    padding: 0;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: #e8eaef;
    }
    .item-box {
      margin: 0;
      width: 100%;
      padding: 12px 10px;
      cursor: pointer;
      .company-name {
        text-align: left;
        max-width: 100%;
      }
    }
    .item-box.is-active {
      position: relative;
      color: #3aa7ff;
      @include font_color("color-primary");
      background: #c0e3ff;
      @include background_color("color-primary", 0.16);
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
