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
      <!-- <ht-pagination
        style="text-align: right;"
        :pageInfo="pageInfo"
        @load="getParts"
      ></ht-pagination> -->
      <el-pagination
        style="text-align: right;"
        class="pagination-base"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="pageInfo.page"
        :page-sizes="pageInfo.pageSizes"
        :page-size="pageInfo.pageSize"
        :pager-count="pageInfo.pagerCount"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getParts,
  partsPublish,
  partsUnpublish
} from "../../services/index.js";

export default {
  props: {
    searchForm: {
      type: Object,
      required: true
    }
  },
  computed: {
    isUp() {
      return this.searchForm.isUp;
    }
  },
  data() {
    return {
      loading: false,
      // pageInfo: {
      //   page: 1,
      //   totalSize: 0
      // },
      pageInfo: {
        page: 1,
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        total: 0,
        pagerCount: 5
      },
      tableData: [],
      selectDatas: []
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageInfo.page = 1;
      this.pageInfo.pageSize = val;
      this.getDatas();
    },
    handleCurrentChange(val) {
      this.pageInfo.page = val;
      this.getDatas();
    },
    handleSelectionChange(val) {
      this.selectDatas = val;
    },
    clearSelection() {
      this.$refs.partsTable.clearSelection();
      this.selectDatas = [];
    },
    toggleParts(list) {
      const params = {};
      if (list) {
        params.partIds = list.map(item => item.partId);
      } else {
        params.isAll = true;
      }
      let service = partsPublish;
      let msg = "上架操作成功";
      if (this.isUp) {
        service = partsUnpublish;
        msg = "下架操作成功";
      }
      service(params).then(() => {
        this.$message.success(msg);
        this.pageInfo.page = 1;
        this.getParts();
      });
    },
    getParts() {
      this.loading = true;
      const params = {
        ...this.searchForm,
        page: this.pageInfo.page,
        pageSize: this.pageInfo.pageSize
      };
      getParts(params)
        .then(res => {
          this.tableData = res.rows || [];
          this.pageInfo.total = res.totalSize || 0;
          this.loading = false;
        })
        .catch(() => {
          this.pageInfo.page = 1;
          this.pageInfo.total = 0;
          this.tableData = [];
          this.loading = false;
        });
    }
  },
  created() {
    this.getParts();
  }
};
</script>

<style lang="less" scoped>
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
