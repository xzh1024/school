<template>
  <div class="project-table" v-loading="loading">
    <div class="card-title" v-if="!notBatch">
      {{ isInclude ? '已关联的服务项目' : '全部服务项目' }}
    </div>
    <el-table
      ref="table"
      class="table-base"
      size="small"
      :data="tableData"
      stripe
      border
      height="250px"
      style="width: 100%"
      row-key="id"
      @expand-change="expandChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="expand" width="26">
        <template slot-scope="props">
          <ProjectTableExpand :row="props.row"></ProjectTableExpand>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!notEdit && !notBatch"
        type="selection"
        width="43"
        header-align="center"
      ></el-table-column>
      <el-table-column v-if="!notEdit" label="操作" width="52">
        <template slot-scope="scope">
          <el-button
            v-if="isInclude"
            class="color-error"
            size="mini"
            type="text"
            @click="handleRemove(scope.row)"
          >
            移除
          </el-button>
          <el-button
            v-else
            size="mini"
            type="text"
            @click="handleRevence(scope.row)"
          >
            关联
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="项目编码"
        prop="code"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="项目名称"
        prop="name"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="项目分类"
        prop="category"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="是否允许线上售卖"
        prop="notOnlineSale"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.notOnlineSale ? '否' : '是' }}
        </template>
      </el-table-column>
      <el-table-column
        label="线上售价"
        prop="price"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="划线价"
        prop="linePrice"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="图片"
        prop="image"
        width="57"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-image
            :z-index="3000"
            style="display: table-cell; width: 36px; height: 36px;"
            :src="scope.row.image"
            :preview-src-list="[scope.row.image]"
          >
            <img
              slot="error"
              class="not-available-img"
              :src="NotAvailableImg"
            />
          </el-image>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-bottom">
      <template v-if="!notEdit && !notBatch">
        <el-checkbox v-model="selectionAll" :disabled="!tableData.length">
          {{ isInclude ? '全选' : '全选当前查询结果' }}</el-checkbox
        >
        <el-divider direction="vertical" class="divider-base"></el-divider>
        <span>
          已选中
          {{ selectionAll ? pageData.total : selections.length }}
          条
        </span>
        <el-divider direction="vertical" class="divider-base"></el-divider>
        <span>批量操作</span>
        <el-button
          v-if="!isInclude"
          class="m-l-8"
          size="mini"
          type="primary"
          plain
          :disabled="!(selectionAll || selections.length)"
          @click="batchRelevance"
        >
          关联服务项目
        </el-button>
        <el-button
          v-if="isInclude"
          class="m-l-8"
          size="mini"
          type="danger"
          plain
          :disabled="!(selectionAll || selections.length)"
          @click="batchRemove"
        >
          移除服务项目
        </el-button>
      </template>
      <el-pagination
        class="pagination-base"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="pageData.page"
        :page-sizes="pageData.pageSizes"
        :page-size="pageData.pageSize"
        :pager-count="pageData.pagerCount"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getGoods, getGoodsInfo } from '@/api/goods';
import ProjectTableExpand from './projectTableExpand.vue';
import NotAvailableImg from '@/assets/img/store/not-available.png';

export default {
  name: 'ProjectTable',
  props: {
    type: String,
    formData: Object,
    // 查看详情时为true
    notEdit: Boolean,
    // 单个关联时为true
    notBatch: Boolean,
  },
  components: {
    ProjectTableExpand,
  },
  computed: {
    isInclude() {
      return this.type === 'include';
    },
  },
  data() {
    return {
      NotAvailableImg,
      selections: [],
      selectionAll: false,
      pageData: {
        page: 1,
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        total: 0,
        pagerCount: 5,
      },
      loading: false,
      tableData: [],
    };
  },
  methods: {
    // 关联
    handleRevence(data) {
      if (this.formData.ids) {
        this.formData.ids.push(data.id);
      }
      this.$nextTick(() => {
        this.$emit('handleQueryAll', data);
      });
    },
    // 移除
    handleRemove(data) {
      this.formData.ids.splice(
        this.formData.ids.findIndex(id => id === data.id),
        1,
      );
      this.$nextTick(() => {
        this.$emit('handleQueryAll');
      });
    },
    // 批量关联
    batchRelevance() {
      if (this.selectionAll) {
        this.getGoods();
      } else {
        this.formData.ids = Array.from(
          new Set([
            ...this.formData.ids,
            ...this.selections.map(item => item.id),
          ]),
        );
        this.$emit('submit');
      }
    },
    // 批量移除
    batchRemove() {
      if (this.selectionAll) {
        this.formData.ids = [];
        this.selectionAll = false;
      } else {
        const selectionIds = this.selections.map(item => item.id);
        const ids = [];
        this.formData.ids.forEach(id => {
          if (!selectionIds.includes(id)) {
            ids.push(id);
          }
        });
        this.formData.ids = ids;
      }
      this.$emit('submit');
    },
    // 查询
    handleQuery() {
      this.selectionAll = false;
      this.pageData.page = 1;
      this.getGoods();
    },
    getGoods() {
      this.loading = true;
      // 清除展开状态
      this.toggleRowExpansion();
      let params = {};
      if (this.isInclude) {
        // 查询指定的商品
        // params.include = true; // 查询包含商品，true:查询指定的商品;false:查询排除指定的商品
        params = {
          type: this.formData.type,
          include: true, // 查询包含商品，true:查询指定的商品;false:查询排除指定的商品
          ids: this.formData.ids, // 商品ID数组
        };
      } else {
        // 查询排除指定的商品
        params = {
          ...this.formData,
        };
        // 全选当前查询结果
        if (this.selectionAll) {
          params.respType = 1; // 只返回商品ID
        } else {
          params.respType = 0; // 商品所有信息
        }
      }
      params.page = this.pageData.page;
      params.pageSize = this.pageData.pageSize;
      getGoods(params)
        .then(res => {
          if (this.selectionAll) {
            this.selectionAll = false;
            const ids = res || [];
            this.formData.ids = [...new Set([...this.formData.ids, ...ids])];
            this.$emit('submit');
          } else {
            this.pickList(res.rows || []);
            this.pageData.total = res.totalSize || 0;
          }
          this.loading = false;
        })
        .catch(() => {
          this.pageData.page = 1;
          this.pageData.total = 0;
          this.tableData = [];
          this.loading = false;
        });
    },
    pickList(list) {
      this.tableData = list.map(item => {
        return {
          ...item,
          loading: false,
          info: {},
        };
      });
    },
    // 复选框事件
    handleSelectionChange(val) {
      this.selections = val;
    },
    handleSizeChange(val) {
      this.pageData.page = 1;
      this.pageData.pageSize = val;
      this.getGoods();
    },
    handleCurrentChange(val) {
      this.pageData.page = val;
      this.getGoods();
    },
    // 获取子层表格数据
    expandChange(row) {
      if (!row.info.id) {
        this.$set(row, 'loading', true);
        getGoodsInfo(row.id, { type: 1 })
          .then(res => {
            this.$set(row, 'loading', false);
            if (res) {
              this.$set(row, 'info', res);
            }
          })
          .catch(() => {
            this.$set(row, 'loading', false);
          });
      }
    },
    toggleRowExpansion() {
      const tableEl = this.$refs.table;
      if (tableEl) {
        this.tableData.forEach(item => {
          tableEl.toggleRowExpansion(item, false);
        });
      }
    },
  },
  created() {
    this.getGoods();
  },
};
</script>

<style lang="less" scoped>
.project-table {
  margin-top: @margin-size-secondary;
  padding: @padding-size-secondary;
  background-color: #ffffff;
  .card-title {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: @text-color-base;
  }
  /deep/ .table-base {
    margin-top: @margin-size-secondary;
    .el-table__expanded-cell {
      padding: 0;
    }
    td .cell {
      padding-top: 1px;
      padding-bottom: 1px;
    }
  }
  .table-bottom {
    display: flex;
    align-items: center;
    margin-top: @margin-size-secondary;
    height: 32px;
    position: relative;
    .pagination-base {
      align-self: flex-end;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>
