<template>
  <div class="parts-container" v-loading="loading">
    <PartsSearch
      isShelvesButton
      :formData="formData"
      @handleQuery="handleQuery"
      @handleReset="handleReset"
    >
    </PartsSearch>
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
        <!-- 没有id则不展示详情 -->
        <template slot-scope="props" v-if="props.row.id">
          <PartsTableExpand :row="props.row"></PartsTableExpand>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        header-align="center"
        width="43"
        :selectable="handleSelectable"
      ></el-table-column>
      <el-table-column
        label="配件编码"
        prop="code"
        width="144"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="配件名称"
        prop="name"
        min-width="146"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="性质"
        prop="property"
        min-width="68"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="产地"
        prop="productionPlace"
        min-width="68"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="配件品牌"
        prop="brand"
        min-width="88"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="配件分类"
        prop="swCategory"
        min-width="88"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="配件属性"
        prop="partProperty"
        min-width="180"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="可订货数量"
        prop="orderQty"
        width="92"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="零售价"
        prop="priceRetail"
        min-width="89"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="划线价"
        prop="linePrice"
        min-width="89"
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
      <el-table-column
        label="单位"
        prop="unitName"
        width="50"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.id"
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

    <!-- 批量编辑弹框 -->
    <!-- <PartsEditDialog
      v-if="partsEditVisible"
      @hide="hideEditDialog"
    ></PartsEditDialog> -->
    <PartsEditDialog
      v-if="partsEditVisible"
      :batchEditParam="batchEditParam"
      @update="handleQuery"
      @hide="hideEditDialog"
    ></PartsEditDialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { queryGoods, getGoodsInfo } from '@/api/goods';
import PartsSearch from '@/components/goods/parts/partsSearch.vue';
import PartsTableExpand from '@/components/goods/parts/partsTableExpand.vue';
import NotAvailableImg from '@/assets/img/store/not-available.png';
import PartsEditDialog from './components/partsEditDialog.vue';
const defaultFormData = {
  type: 0,
  keyword: '', // 配件名称/编码/规格/车型/生产码等关键字
  partType: '', // 配件类别
  productionPlace: '', // 产地
  vehBrand: '', // 汽车品牌
  brand: '', // 配件品牌
  priceField: 'retail', // 价格字段 零售价:retail;平台价:alliance;批发价:p;批发价一:p1;批发价二:p2;批发价三:p3;批发价四:p4
  priceType: '0', // 价格对比类型 1,等于 2.大于 3.小于 4.大于等于 5.小于等于 0.查询全部
  priceValue: '', // 价格值
  partProperty: '', // 配件属性
  qtyField: 'qty', // 库存字段 qty:实际库存;lockedQty:锁定库存;orderQty:可订货库存数量
  qtyType: '0', // 库存对比类型 1,等于 2.大于 3.小于 4.大于等于 5.小于等于 0.查询全部
  qtyValue: '', // 库存数量
  image: '0', // 图片上传情况 1.已上传 2.未上传 0.全部
  cleaned: '0', // 标准化 1.已标准化 2.未标准化 0.查询全部
  include: false, // 查询包含商品，true:查询指定的商品;false:查询排除指定的商品
  respType: '0', // 返回数据类型,不传或0:商品所有信息;1:只返回商品ID
  swCategory: '', // 配件分类
};

export default {
  components: {
    PartsSearch,
    PartsTableExpand,
    PartsEditDialog,
  },
  data() {
    return {
      NotAvailableImg,
      type: 0,
      partsEditVisible: false,
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
      this.partsEditVisible = true;
    },
    hideEditDialog() {
      this.partsEditVisible = false;
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
    // 没有id时无法勾选
    handleSelectable(row) {
      return !!row.id;
    },
    // 获取子层表格数据
    expandChange(row) {
      if (row.id) {
        // 判断是否已经获取过详情
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
    // 编辑
    handleEdit(row) {
      let url = `/goodsManage/goodsEdit?id=${row.id}&type=${this.formData.type}`;
      sessionStorage.setItem('oldPath', url);
      this.$router.push({
        path: '/goodsManage/goodsEdit',
        query: {
          id: row.id,
          type: this.formData.type,
        },
      });
    },
    handleCopy(row) {
      if (this.shareInfo.link) {
        const text = `${this.shareInfo.link}/skuDetail?id=${row.id}&type=${this.formData.type}`;
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
.parts-container {
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
