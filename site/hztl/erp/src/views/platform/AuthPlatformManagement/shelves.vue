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
      :type="activeTab"
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
      :platformKey="platformKey"
      :search-condition="searchCondition"
      @on-update="initTable"
    />
    <slot />
  </section>
</template>

<script>
import hotkeys from "hotkeys-js";
import { CleanPartsOnBox, PartsTypeList } from "./components";

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
      activeTab: "on",
      tabs: [
        { id: "on", name: "已上架配件" },
        { id: "off", name: "未上架配件" }
      ],
      cleanOnBoxVisible: false,
      ids: [],
      all: false,
      searchCondition: {},
      loading: false
    };
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
            this.$refs.refPartsTypeList.reloadData();
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
      this.cleanOnBoxVisible = false;
      this.$refs.refPartsTypeList.reloadData();
    },
    openBox(ids, all, searchCondition) {
      this.ids = [...ids];
      this.all = all;
      this.searchCondition = searchCondition;
      this.cleanOnBoxVisible = true;
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
