<template>
  <div class="search-bar">
    <div class="search-tabs">
      <div
        class="search-tab"
        v-for="tag in tabs"
        :key="tag.type"
        :class="{ 'tab-active': type === tag.type }"
        @click="handleType(tag.type)"
      >
        {{ tag.name }}
      </div>
    </div>
    <div class="search-input">
      <el-input
        type="text"
        size="small"
        placeholder="输入配件名称/OE号、品牌等关键字查询"
        clearable
        v-model.trim="keyword"
        v-on:keyup.enter.native="handleSearch"
      />
      <button class="search-button" @click="handleSearch">
        搜索<i class="icon-soso-white"></i>
      </button>
    </div>
    <!-- <div class="search-history-wrap"> -->
    <div class="search-history">
      <span
        class="search-history-item"
        v-for="item in historyKeywords"
        :key="item"
        @click="handleKeyword(item)"
        >{{ item }}</span
      >
    </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
@Component({
  name: "SearchBar"
})
export default class SearchBar extends Vue {
  @Inject("reload") reload: any;
  // goods、brand、company
  protected type = "/goods";
  protected keyword = "";
  protected historyKeywords: string[] = [];

  protected tabs = [
    {
      name: "商品",
      type: "/goods"
    },
    {
      name: "品牌",
      type: "/brand"
    },
    {
      name: "商家",
      type: "/company"
    }
  ];

  protected handleSearch() {
    this.updateHistoryKeywords(this.keyword);
    this.$router.push({
      path: this.type,
      query: {
        keyword: this.keyword,
        version: new Date().getTime().toString()
      }
    });
    this.reload();
  }

  private handleType(value: string) {
    this.type = value;
  }
  private handleKeyword(value: string) {
    this.keyword = value;
    this.handleSearch();
  }
  protected updateHistoryKeywords(value: string) {
    if (!value) return;
    let list = [...this.historyKeywords];
    const deleteIndex = list.findIndex(item => value === item);
    if (deleteIndex > -1) {
      list.splice(deleteIndex, 1);
    }
    list.unshift(value);
    const maxLength = 30;
    if (list.length > maxLength) {
      list = list.slice(0, maxLength);
    }
    this.historyKeywords = list;

    localStorage.historyKeywords = JSON.stringify(this.historyKeywords);
  }

  private init() {
    const historyKeywords =
      localStorage.historyKeywords && JSON.parse(localStorage.historyKeywords);
    if (Array.isArray(historyKeywords)) {
      this.historyKeywords = historyKeywords;
    }
    const { keyword } = this.$route.query;
    if (keyword) {
      this.keyword = keyword as string;
    }
    const path = this.$route.path;
    this.tabs.some(tab => {
      const result = path === tab.type;
      if (result) {
        this.type = path;
      }
      return result;
    });
  }

  created() {
    this.init();
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  width: 486px;
  .search-tabs {
    display: flex;
    font-size: $font-size-12;
    padding-left: 14px;
    .search-tab {
      padding: 4px 6px;
      color: $color-primary;
      background: $color-white;
      border-radius: 4px 4px 0 0;
      cursor: pointer;
    }
    .tab-active {
      color: $color-white;
      background-image: $gradients-primary;
    }
  }
  .search-input {
    display: flex;
    align-items: center;
    border: $border-primary;
    border-radius: 16px;
    overflow: hidden;
    ::v-deep .el-input {
      box-sizing: border-box;
      width: 422px;
      height: 30px;
      // padding: 0 12px;
      line-height: 30px;
      outline: none;
      border: none;
      .el-input__inner {
        outline: none;
        border: none;
      }
    }
    .search-button {
      height: 30px;
      color: $color-white;
      background-color: transparent;
      background-image: $gradients-primary;
      border: none;
      border-left: $border-primary;
      outline: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      i {
        margin-left: 4px;
      }
    }
  }
  .search-history {
    width: 100%;
    margin-top: $margin-size-main;
    font-size: $font-size-12;
    color: $color-dim;
    @extend .lip-1;
    .search-history-item {
      display: inline-block;
      margin-left: $margin-size-main;
      padding: 0 8px;
      line-height: 22px;
      border-radius: 11px 11px;
      color: $color-gray;
      background-color: $bg-color-gray;
      cursor: pointer;
      &:first-child {
        margin-left: 0;
      }
      &:hover {
        color: $color-primary;
        background-color: rgba($color: $color-primary, $alpha: 0.2);
      }
    }
  }
}
</style>
