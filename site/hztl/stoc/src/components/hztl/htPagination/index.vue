<template>
  <div class="ht-pagination" v-show="total > 0">
    <i
      :class="internalCurrentPage > 1 ? 'icon-left' : 'icon-left-gray'"
      @click="prev"
    ></i>
    <p class="ht-pager">
      <span class="">{{ internalCurrentPage }}</span>
      <span>/</span>
      <span class="">{{ internalPageCount }}</span>
    </p>
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

  @Watch("pageCount", { immediate: true })
  protected changePageCount(newVal: number) {
    this.internalPageCount = newVal;
  }
  @Watch("internalCurrentPage", { immediate: true })
  protected wInternalCurrentPage(newVal: number) {
    this.$emit("update:currentPage", newVal);
    this.$emit("current-change", newVal);
  }

  protected prev() {
    if (this.internalCurrentPage > 1) {
      this.internalCurrentPage--;
    }
  }
  protected next() {
    if (this.internalPageCount > this.internalCurrentPage) {
      this.internalCurrentPage++;
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
  .ht-pager {
    span {
      line-height: 20px;
    }
  }
}
</style>
