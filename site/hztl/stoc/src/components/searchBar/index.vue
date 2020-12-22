<template>
  <div class="search-bar">
    <ul class="search-tabs">
      <li
        class="search-tab"
        v-for="tag in tabs"
        :key="tag.value"
        :class="{ 'tab-active': type === tag.value }"
        @click="changeType(tag.value)"
      >
        {{ tag.name }}
      </li>
    </ul>
    <div class="search-input">
      <input type="text" placeholder="输入配件名称/OE号、品牌等关键字查询" />
      <button>搜索<i class="icon-soso-white"></i></button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "SearchBar"
})
export default class SearchBar extends Vue {
  // goods、brand、company
  protected type = "goods";

  protected tabs = [
    {
      name: "商品",
      value: "goods"
    },
    {
      name: "品牌",
      value: "brand"
    },
    {
      name: "商家",
      value: "company"
    }
  ];

  private changeType(value: string) {
    this.type = value;
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
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
      // background: $color-primary;
      background-image: $gradients-primary;
    }
  }
  .search-input {
    display: flex;
    align-items: center;
    border: $border-primary;
    border-radius: 16px;
    overflow: hidden;
    input {
      box-sizing: border-box;
      width: 422px;
      height: 30px;
      padding: 0 12px;
      line-height: 30px;
      outline: none;
      border: none;
    }
    button {
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
}
</style>
