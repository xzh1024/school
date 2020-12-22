<template>
  <div class="ht-pagination" v-show="total > 0">
    <i
      :class="internalCurrentPage > 1 ? 'icon-left' : 'icon-left-gray'"
      @click="prev"
    ></i>
    <span class="pagination-layout">
      {{ internalCurrentPage }}
      /
      {{ internalPageCount }}
    </span>
    <i
      :class="
        internalCurrentPage < internalPageCount
          ? 'icon-right'
          : 'icon-right-gray'
      "
      @click="next"
    ></i>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "HtPagination"
})
export default class HtPagination extends Vue {
  @Prop({ default: 10 }) protected pageSize!: number;

  // @Prop() protected small!: boolean;

  @Prop() protected total!: number; // 总条目数

  @Prop({ default: 1 }) protected pageCount!: number; // 总页数

  @Prop({ default: 1 }) protected currentPage!: number; // 当前页数

  // @Prop({ default: () => [10, 20, 30, 40, 50, 100] })
  // protected pageSizes!: number;

  // @Prop() protected disabled!: boolean;

  protected internalPageCount = 1;
  protected internalCurrentPage = 1;

  @Watch("pageCount", { immediate: true, deep: true })
  protected changePageCount(newVal: number) {
    console.log(newVal);
    this.internalPageCount = newVal;
  }
  @Watch("currentPage")
  protected changeCurrentPage(newVal: number) {
    this.internalCurrentPage = newVal;
  }
  @Watch("internalCurrentPage")
  protected changeInternalCurrentPage(newVal: number) {
    this.$emit("update:currentPage", newVal);
  }

  protected prev() {
    if (this.internalCurrentPage > 1) {
      this.internalCurrentPage--;
      this.$emit("current-change", this.internalCurrentPage);
    }
  }
  protected next() {
    if (this.internalPageCount > this.internalCurrentPage) {
      this.internalCurrentPage++;
      this.$emit("current-change", this.internalCurrentPage);
    }
  }
}
</script>

<style lang="scss" scoped>
.ht-pagination {
  display: flex;
  align-items: center;
  i[class^="icon-"] {
    cursor: pointer;
  }
  .pagination-layout {
    line-height: 20px;
    margin: 0 10px;
  }
}
</style>
