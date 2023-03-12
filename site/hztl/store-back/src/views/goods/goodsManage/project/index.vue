<template>
  <div class="project-container" v-loading="loading">
    <ProjectSearch
      :formData="formData"
      @handleQuery="handleQuery"
      @handleReset="handleReset"
    >
    </ProjectSearch>
    <el-table
      ref="table"
      class="table-base"
      size="small"
      :data="tableData"
      stripe
      border
      style="width: 100%"
      height="400px"
      row-key="id"
      @expand-change="expandChange"
      @selection-change="selectionChange"
    >
      <el-table-column type="expand" width="26">
        <template slot-scope="props">
          <ProjectTableExpand :row="props.row"></ProjectTableExpand>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        width="43"
        header-align="center"
      ></el-table-column>
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
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            style="margin-right: 16px"
            @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-popover
            v-if="scope.row.id"
            placement="bottom"
            width="50"
            trigger="click"
          >
            <div
              style="
								display: flex;
								flex-direction: column;
								width: 100%;
							"
            >
              <el-button
                type="text"
                size="small"
                @click="handleCopy(scope.row)"
                icon="el-icon-paperclip"
                >复制链接</el-button
              >
              <div
                style="
									width: 140px;
									font-size: 14px;
									color: #666666;
								"
              >
                <span>点击复制商品链接可发送给微信好友或朋友圈</span>
              </div>
            </div>
            <el-button slot="reference" size="mini" type="text">分享</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-bottom">
      <template>
        <el-checkbox v-model="selectionAll" :disabled="!tableData.length">
          全选当前查询结果
        </el-checkbox>
        <el-divider direction="vertical" class="divider-base"></el-divider>
        <span>
          已选中
          {{ selectionAll ? pageData.total : selections.length }}
          条
        </span>
        <el-divider direction="vertical" class="divider-base"></el-divider>
        <span>批量操作</span>
        <el-button
          class="m-l-8"
          size="mini"
          type="primary"
          :disabled="!(selectionAll || selections.length)"
          @click="showEditDialog"
        >
          编辑
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
    <!-- 批量操作弹框 -->
    <ProjectEditDialog
      v-if="projectEditVisible"
      :batchEditParam="batchEditParam"
      @update="handleQuery"
      @hide="hideEditDialog"
    ></ProjectEditDialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { queryGoods, getGoodsInfo } from '@/api/goods';
import ProjectSearch from '@/components/goods/project/projectSearch.vue';
import ProjectTableExpand from '@/components/goods/project/projectTableExpand.vue';
import NotAvailableImg from '@/assets/img/store/not-available.png';
import ProjectEditDialog from './components/projectEditDialog.vue';
const defaultFormData = {
  type: 1, // 类型 0:零配件;1:服务项目;2:项目套餐
  keyword: '', // 项目编码/名称/卖点等关键字
  category: '', // 分类编码
  priceType: '0', // 价格类型 1.等于 2.大于 3.小于 0.查询全部
  priceValue: '', // 价格数值
  onlineSale: 0, // 是否允许线上售卖 1.是 2.否 0.全部
  uploadImage: 0, // 图片上传情况 1.已上传 2.未上传 0.全部
};

export default {
  components: {
    ProjectSearch,
    ProjectTableExpand,
    ProjectEditDialog,
  },
  data() {
    return {
      NotAvailableImg,
      projectEditVisible: false,
      formData: JSON.parse(JSON.stringify(defaultFormData)),
      selections: [],
      selectionAll: false,
      batchEditParam: {
        type: '',
        ids: [],
        searchCond: {},
      },
      pageData: {
        page: 1,
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        total: 0,
        pagerCount: 5,
      },
      loading: false,
      tableData: [],
      link: '', // 店铺H5的地址
    };
  },
  computed: {
    ...mapState({
      shareInfo: (state) => state.shareInfo,
    }),
  },
  created() {
    this.getList();
  },
  methods: {
    // 显示批量编辑弹框
    showEditDialog() {
      const batchEditParam = this.batchEditParam;
      // 按查询结果
      if (this.selectionAll) {
        batchEditParam.type = 'searchResult';
        batchEditParam.searchCond = JSON.parse(JSON.stringify(this.formData));
      } else if (this.selections.length) {
        batchEditParam.type = 'selection';
        batchEditParam.ids = this.selections.map(item => item.id);
      }
      this.projectEditVisible = true;
    },
    hideEditDialog() {
      this.projectEditVisible = false;
    },
    // 查询
    handleQuery() {
      this.selectionAll = false;
      this.pageData.page = 1;
      this.getList();
    },
    // 重置
    handleReset() {
      Object.assign(this.formData, JSON.parse(JSON.stringify(defaultFormData)));
    },
    // 编辑
    handleEdit(row) {
      this.$router.push({
        path: '/goodsManage/projectEdit',
        query: {
          id: row.id,
        },
      });
    },
    getList() {
      this.loading = true;
      // 清除展开状态
      this.toggleRowExpansion();
      const params = {
        ...this.formData,
        type: this.formData.type,
        page: this.pageData.page,
        pageSize: this.pageData.pageSize,
      };
      queryGoods(params)
        .then(res => {
          this.loading = false;
          this.pickList(res.rows || []);
          this.pageData.total = res.totalSize || 0;
        })
        .catch(() => {
          this.loading = false;
          this.pageData.page = 1;
          this.pageData.total = 0;
          this.tableData = [];
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
    selectionChange(val) {
      this.selections = val;
    },
    handleSizeChange(val) {
      this.pageData.page = 1;
      this.pageData.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageData.page = val;
      this.getList();
    },
    // 获取子层表格数据
    expandChange(row) {
      if (!row.info.id) {
        this.$set(row, 'loading', true);
        getGoodsInfo(row.id, { type: this.formData.type })
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
    handleCopy(row) {
      if (this.shareInfo.link) {
        const text = `${this.shareInfo.link}/projectDetail?id=${row.id}&goodsType=${this.formData.type}`;
        this.$copyText(text).then(
          () => {
            this.$message.success('已复制到剪贴板');
          },
          () => {
            this.$message.error('复制失败');
          },
        );
      } else {
        this.$message.error('链接不存在');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.project-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .table-base {
    margin-top: @margin-size-main;
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
