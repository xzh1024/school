<template>
  <section v-loading="loading" class="shelves-container container-box">
    <ht-tabs
      ref="refHtTabs"
      v-model="activeTab"
      :tabs="tabs"
      class="tabs-regular"
    />
    <parts-type-list
      ref="refPartsTypeList"
      :type="listName"
      :key-scope="keyScope"
      :loading.sync="loading"
      :platformKey="platformKey"
      @handle-ids="openBox"
      @hotkeysUp="hotkeysUpHandle"
    />
    <clean-parts-on-box
      :visible.sync="cleanOnBoxVisible"
      :ids="ids"
      :all="all"
      :search-condition="searchCondition"
      :platformKey="platformKey"
      @on-update="initTable"
    />
    <slot />
  </section>
</template>

<script>
import hotkeys from "hotkeys-js";
import { CleanPartsOnBox, PartsTypeList } from "./components";
import { NO_CHECK_PLATFORMS } from "../constants";

const TABS = [
  { id: 0, name: "未清洗配件" },
  { id: 1, name: "已上架配件" },
  { id: 2, name: "已下架配件" }
];

export default {
  name: "Shelves",
  components: {
    PartsTypeList,
    CleanPartsOnBox
  },
  props: {
    platformKey: String
  },
  data() {
    return {
      keyScope: Symbol("PartsOnShelves"),
      activeTab: null,
      cleanOnBoxVisible: false,
      ids: [],
      all: false,
      searchCondition: {},
      loading: false,
      tabs: TABS
    };
  },
  computed: {
    listName() {
      return (
        (this.tabs.find(item => item.id === this.activeTab) || {}).name || ""
      );
    }
  },
  watch: {
    platformKey: {
      handler(val) {
        if (NO_CHECK_PLATFORMS.includes(val)) {
          this.activeTab = 1;
          this.tabs = TABS.filter(item => item.id !== 0);
        } else {
          this.activeTab = 0;
        }
      },
      immediate: true
    }
  },
  activated() {
    hotkeys.setScope(this.keyScope);
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    hotkeysUpHandle(e) {
      switch (e.code) {
        case "ArrowRight":
        case "ArrowLeft":
          e.preventDefault();
          if (!this.loading) {
            this.$refs.refHtTabs.listenKeyboard(e);
          }
          break;
        case "F5":
          if (!this.loading) {
            this.$refs.refPartsTypeList.initTable(this.activeTab);
          }
          break;
        case "F6":
          if (!this.loading) {
            this.$refs.refPartsTypeList.resetForm();
          }
          break;
        default:
      }
    },
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    },
    initTable() {
      this.$refs.refPartsTypeList.initTable(this.activeTab);
    },
    openBox(ids, all, searchCondition) {
      this.ids = [...ids];
      this.all = all;
      this.searchCondition = searchCondition;
      if (this.tabs.map(item => item.id).includes(0)) {
        this.cleanOnBoxVisible = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.shelves-container {
  position: relative;
  &::v-deep .platform-watermark {
    left: 50%;
    top: 400px;
    transform: translate(-50%, -50%);
  }
}
</style>
