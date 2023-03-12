<template>
  <div class="search-bar">
    <div class="search-input-wrap clearfix">
      <el-select size="mini" v-model="datas.path">
        <el-option
          v-for="item in tabs"
          :key="item.path"
          :label="item.name"
          :value="item.path"
        >
        </el-option>
      </el-select>
      <el-input
        path="text"
        size="small"
        class="search-input"
        :placeholder="placeholderText"
        clearable
        v-model.trim="datas.keyword"
        v-on:keyup.enter.native="handleSearch"
      />
      <button class="search-button" @click="handleSearch">
        搜索<i class="icon-soso-white"></i>
      </button>
    </div>
    <div class="search-history" v-if="history">
      <span
        class="search-history-item"
        v-for="item in historyKeywords"
        :key="item"
        @click="handleKeyword(item)"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { SearchBarModel } from "@/common/interface/commonInterface";

@Component({
  name: "SearchBar"
})
export default class SearchBar extends Vue {
  @Prop({ type: Boolean, default: true })
  protected history!: boolean;
  @Prop()
  protected datas!: SearchBarModel;

  get placeholderText(): string {
    let text = "";
    const datas = this.datas || {};
    switch (datas.path) {
      case "/goods":
        text = "输入配件名称/OE号、品牌等关键字查询";
        break;
      case "/company":
        text = "输入商家名称";
        break;
      default:
        text = "";
    }
    return text;
  }

  protected historyKeywords: string[] = [];

  protected tabs = [
    {
      name: "查商品",
      path: "/goods"
    },
    // {
    //   name: "品牌",
    //   path: "/brand"
    // },
    {
      name: "查商家",
      path: "/company"
    }
  ];

  protected handleSearch() {
    this.updateHistoryKeywords(this.datas.keyword);
    this.$router.replace({
      path: "/redirect" + this.datas.path,
      query: {
        keyword: this.datas.keyword
      }
    });
  }

  private handlePath(value: string) {
    this.datas.path = value;
  }
  private handleKeyword(value: string) {
    this.datas.keyword = value;
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
      this.datas.keyword = keyword as string;
    }
    const path = this.$route.path;
    this.tabs.some(tab => {
      const result = path === tab.path;
      if (result) {
        this.datas.path = path;
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
  .search-input-wrap {
    border: 2px solid $color-primary;
    border-radius: 18px;
    overflow: hidden;
    ::v-deep .el-select {
      float: left;
      width: 86px;
      .el-input__inner {
        border-radius: 0;
        background-color: #f8f8f8;
        border: 1px solid #f8f8f8;
        padding-right: 25px;
        height: 32px;
        line-height: 32px;
        font-size: $font-size-14;
      }
      .el-input__suffix {
        right: 0;
      }
    }
    ::v-deep .search-input {
      float: left;
      width: 330px;
      box-sizing: border-box;
      height: 30px;
      line-height: 30px;
      outline: none;
      border: none;
      .el-input__inner {
        outline: none;
        border: none;
      }
    }
    .search-button {
      float: left;
      width: 66px;
      height: 32px;
      font-size: $font-size-14;
      color: $color-white;
      background-color: transparent;
      background-image: $gradients-primary;
      border: none;
      border-left: $border-primary;
      outline: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      .icon-soso-white {
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
