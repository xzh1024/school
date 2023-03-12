<template>
  <div class="sku-sort-list">
    <div
      class="sort"
      v-for="(item, index) in sorts"
      :key="index"
      :class="{
        'is-active': item.active
      }"
      @click="changeSort(item)"
    >
      {{ item.name }}
      <div class="sort-button-group">
        <i
          class="sort-icon sort-up"
          v-if="item.switchable && (!item.sort || !item.active)"
        ></i>
        <i
          class="sort-icon sort-up-active"
          v-if="item.switchable && item.sort && item.active"
        ></i>
        <i
          class="sort-icon sort-down"
          v-if="item.switchable && (item.sort || !item.active)"
        ></i>
        <i
          class="sort-icon sort-down-active"
          v-if="item.switchable && !item.sort && item.active"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkuSortList",
  props: {
    sorts: Array
  },
  methods: {
    changeSort(sort) {
      this.$emit("changeSort", sort);
    }
  }
};
</script>

<style lang="less" scoped>
.triangle {
  content: " ";
  width: 0;
  height: 0;
  border: 6px solid transparent;
}

.sku-sort-list {
  display: flex;
  font-size: 14px;
  padding: 8px 0;
  background-color: #fff;
  display: flex;
  .sort {
    height: 24px;
    line-height: 24px;
    // padding: 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;

    &.is-active {
      color: #ff6e4c;
    }
    .sort-button-group {
      display: flex;
      flex-direction: column;
      .sort-icon {
        display: inline-block;
        width: 6px;
        height: 6px;
        margin-left: 4px;
      }
      .sort-down {
        color: #999;
        background: url(~@/assets/svg/downnor.svg) no-repeat;
        background-size: 100% 100%;
      }
      .sort-down-active {
        color: #ff6e4c;
        background: url(~@/assets/svg/downsel.svg) no-repeat;
        background-size: 100% 100%;
      }
      .sort-up {
        color: #999;
        background: url(~@/assets/svg/upnor.svg) no-repeat;
        background-size: 100% 100%;
      }
      .sort-up-active {
        color: #ff6e4c;
        background: url(~@/assets/svg/upsel.svg) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
