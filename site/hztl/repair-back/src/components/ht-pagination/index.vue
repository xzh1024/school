<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="pageInfo.page"
    :page-sizes="storePageInfo.pageSizeList"
    :page-size.sync="storePageInfo.pageSize"
    :layout="storePageInfo.layout"
    :total="pageInfo.totalSize"
  >
  </el-pagination>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { namespace } from "vuex-class";
const TablePageStore = namespace("tablePage");
import { TablePageModel } from "@/store/modules/tablePage/interface";

interface PageInfoModel {
  page: number;
  totalSize: number;
}

@Component({ name: "HtPagination" })
export default class HtPagination extends Vue {
  @TablePageStore.Getter("tablePageInfo")
  protected storePageInfo!: TablePageModel;
  @TablePageStore.Mutation("changePageSize")
  protected changePageSize(pageSize: number) {
    return pageSize;
  }

  @Prop({
    default: () => {
      return {
        page: 1,
        totalSize: 0
      };
    }
  })
  protected pageInfo!: PageInfoModel;

  @Emit("load")
  protected handleload() {
    return;
  }
  @Emit("size-change")
  protected handleSizeChange(val: number) {
    this.changePageSize(val);
    this.handleload();
    return val;
  }
  @Emit("current-change")
  protected handleCurrentChange(val: number) {
    this.handleload();
    return val;
  }
}
</script>
