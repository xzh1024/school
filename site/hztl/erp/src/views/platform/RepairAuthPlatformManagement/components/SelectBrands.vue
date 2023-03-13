<template>
  <ht-card v-show="isShow" style="margin: 0 0 10px 0; height: 200px">
    <ht-tabs
      v-model="activeName"
      :tabs="tabs"
      class="tabs-regular"
      style="margin: 0"
    />
    <el-form
      class="margin-top"
      label-position="left"
      label-width="96px"
      size="mini"
    >
      <div class="flex-container">
        <el-form-item
          v-switch-focus="focusData"
          style="width: 300px"
          label="选择清洗品牌"
        >
          <ht-autoselect
            v-model="brand"
            :fetch-suggestions="searchSelectableBrands"
            :trigger-on-focus="false"
            class="switch-focus focus-brand"
            remote
            highlight-first-item
            @change="addBrands"
            @intput-enter="addBrands"
          />
        </el-form-item>
        <span class="append-text">最多支持选择10个品牌</span>
      </div>
    </el-form>
    <div class="tag-container">
      <dart-like
        v-for="(tag, index) in selectedBrands"
        :key="index"
        closable
        @close="handleClose(tag)"
      >
        {{ tag }}
      </dart-like>
    </div>
  </ht-card>
</template>

<script>
import DartLike from "@/components/DartLike";
import { getPlatformBrands } from "@/api/base/base";
import hotkeys from "hotkeys-js";

let oldKeyScope;
const defaultFocusData = {
  updateIndex: null,
  initial: null,
  type: null
};

export default {
  name: "SelectBrands",
  components: { DartLike },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    brands: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      keyScope: Symbol("SelectBrands"),
      focusData: {
        ...defaultFocusData
      },
      tabs: [
        { id: 1, name: "汽车品牌" },
        { id: 2, name: "配件品牌" }
      ],
      activeName: 1,
      brand: "",
      allBrands: [],
      selectedBrands: [],
      cacheVehBrands: [],
      cachePartBrands: []
    };
  },
  watch: {
    isShow: {
      handler(value, oldVale) {
        if (value) {
          this.$nextTick(() => {
            this.updateFocusData({
              initial: "focus-brand"
            });
          });
          setTimeout(() => {
            oldKeyScope = hotkeys.getScope();
            hotkeys.setScope(this.keyScope);
          }, 100);
        } else if (oldVale) {
          hotkeys.setScope(oldKeyScope);
          this.brand = "";
          this.selectedBrands = [];
          this.activeName = 1;
        }
      },
      immediate: true
    },
    activeName(value) {
      this.updateFocusData({
        initial: "focus-brand"
      });
      this.loadBrands(value);
    }
  },
  mounted() {
    this.loadBrands(this.activeName);
    hotkeys("left,right", { scope: this.keyScope }, (e, handler) => {
      switch (handler.key) {
        case "right":
          e.preventDefault();
          this.activeName++;
          if (this.activeName > this.tabs.length) this.activeName = 1;
          break;
        case "left":
          e.preventDefault();
          this.activeName--;
          if (this.activeName < 1) this.activeName = this.tabs.length;
          break;
        default:
          return;
      }
    });
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    loadBrands(activeName) {
      this.brand = "";
      this.selectedBrands = [];
      let types = [];
      if (activeName == 1) {
        if (this.cacheVehBrands.length) {
          this.allBrands = this.cacheVehBrands;
          return;
        }
        types = [1, 2];
      } else if (activeName == 2) {
        if (this.cachePartBrands.length) {
          this.allBrands = this.cachePartBrands;
          return;
        }
        types = [3];
      }
      getPlatformBrands({ types })
        .then(data => {
          if (activeName == 1) {
            this.cacheVehBrands = data.brands;
          } else if (activeName == 2) {
            this.cachePartBrands = data.brands;
          }
          this.allBrands = data.brands;
        })
        .catch(() => {});
    },
    searchSelectableBrands(query) {
      if (!query) {
        return this.allBrands
          .slice(0, 10)
          .map(item => ({ ...item, id: item.name }));
      } else {
        const cacheBrands = this.allBrands.filter(item => {
          return (
            item.mnemonic.indexOf(query.toUpperCase()) != -1 ||
            item.name.indexOf(query) != -1
          );
        });
        return cacheBrands
          .slice(0, 10)
          .map(item => ({ ...item, id: item.name }));
      }
    },
    handleClose(tag) {
      this.selectedBrands.splice(this.selectedBrands.indexOf(tag), 1);
      if (this.selectedBrands.length) {
        this.$emit("update:brands", [...this.selectedBrands]);
      }
    },
    addBrands(value) {
      if (!value) return;
      let index = 0;
      if (this.activeName == 1) {
        index = this.cacheVehBrands.findIndex(item => {
          return item.name == value;
        });
      } else if (this.activeName == 2) {
        index = this.cachePartBrands.findIndex(item => {
          return item.name == value;
        });
      }
      if (index < 0) return;
      if (this.selectedBrands.includes(value)) {
        this.$message({
          type: "warning",
          message: "已选择该品牌",
          showClose: true
        });
        return;
      }
      if (this.selectedBrands.length < 10) {
        this.selectedBrands.push(value);
        this.$emit("update:brands", [...this.selectedBrands]);
      } else {
        if (this.selectedBrands.includes(value)) {
          this.$message({
            type: "warning",
            message: "最多支持选择10个品牌",
            showClose: true
          });
          return;
        }
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.append-text
    flex: 1
    margin-left: 10px
    heihgt: 28px
    line-height: 28px
    text-align: left
    color: red
.tag-container
    width: 800px
</style>
