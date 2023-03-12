<template>
  <div class="parts-table layout-container">
    <div class="layout-main">
      <el-table
        v-loading="loading"
        class="el-table-primary"
        ref="partsTable"
        :data="tableData"
        border
        size="mini"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="partId" label="配件ID" width="150">
        </el-table-column>
        <el-table-column prop="partNo" label="配件编码" min-width="150">
        </el-table-column>
        <el-table-column prop="partName" label="配件名称" min-width="150">
        </el-table-column>
        <el-table-column prop="brand" label="配件品牌" min-width="150">
        </el-table-column>
        <el-table-column prop="factory" label="配件产地" min-width="150">
        </el-table-column>
        <!-- <el-table-column prop="" label="生产码" min-width="150">
      </el-table-column> -->
        <el-table-column
          prop="insurCertType"
          label="保险认证分类"
          min-width="150"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrap">
      <div class="button-group">
        <el-button
          type="primary"
          size="mini"
          :disabled="!selectDatas.length"
          @click="toggleParts(selectDatas)"
        >
          {{ isUp ? "下架选中的配件" : "上架选中的配件" }}
        </el-button>
        <el-button
          type="primary"
          size="mini"
          :disabled="!tableData.length"
          @click="toggleParts()"
        >
          {{ isUp ? "下架全部配件" : "上架全部配件" }}
        </el-button>
      </div>
      <ht-pagination
        style="text-align: right;"
        :pageInfo="pageInfo"
        @load="getParts"
      ></ht-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { PageResponseResult } from "@/common/interface/commonInterface";
import {
  PartsParams,
  PartsModel,
  PartsPublishParams
} from "@/common/interface/commodityInterface";
import { CommodityService } from "@/common/services/commodityService";
const commodityService = new CommodityService();
import { namespace } from "vuex-class";
const TablePageStore = namespace("tablePage");
import { Table } from "element-ui";
import HtPagination from "@/components/ht-pagination/index.vue";

@Component({
  name: "PartsTableComponent",
  components: {
    HtPagination
  }
})
export default class PartsTableComponent extends Vue {
  @TablePageStore.Getter("pageSize")
  private pageSize!: number;

  private loading = false;

  protected pageInfo = {
    page: 1,
    totalSize: 0
  };

  @Prop() protected searchForm!: PartsParams;

  get isUp() {
    return this.searchForm.isUp;
  }

  protected tableData: PartsModel[] = [];
  protected selectDatas: PartsModel[] = [];

  private get partsTable(): Table {
    return this.$refs.partsTable as Table;
  }

  protected handleSelectionChange(val: PartsModel[]) {
    this.selectDatas = val;
  }

  private toggleParts(list: PartsModel[]) {
    const params: PartsPublishParams = {};
    if (list) {
      params.partIds = list.map(item => item.partId);
    } else {
      params.isAll = true;
    }
    let service = commodityService.partsPublish;
    let msg = "上架操作成功";
    if (this.isUp) {
      service = commodityService.partsUnpublish;
      msg = "下架操作成功";
    }
    service(params).then(() => {
      this.$message.success(msg);
      this.pageInfo.page = 1;
      this.getParts();
    });
  }

  public clearSelection() {
    this.partsTable.clearSelection();
    this.selectDatas = [];
  }

  public getParts() {
    this.loading = true;
    const params = {
      ...this.searchForm,
      page: this.pageInfo.page,
      pageSize: this.pageSize
    };
    commodityService
      .getParts(params)
      .then((res: PageResponseResult<PartsModel[]>) => {
        this.tableData = res.rows || [];
        this.pageInfo.totalSize = res.totalSize || 0;
        this.loading = false;
      })
      .catch(() => {
        this.pageInfo.page = 1;
        this.pageInfo.totalSize = 0;
        this.tableData = [];
        this.loading = false;
      });
  }

  created() {
    this.getParts();
  }
}
</script>

<style lang="scss" scoped>
.parts-table {
  .pagination-wrap {
    position: relative;
    margin-top: 10px;
    .button-group {
      position: absolute;
      left: 0;
      top: 0;
      height: 32px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
