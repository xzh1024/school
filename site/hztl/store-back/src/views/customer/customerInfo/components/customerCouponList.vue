<template>
  <div class="customer-coupon-list" v-loading="loading">
    <el-table
      class="table-base"
      size="small"
      :data="list"
      stripe
      border
      style="width: 100%"
      v-loading=""
    >
      <el-table-column
        label="优惠券名称"
        prop="name"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="优惠内容"
        prop="content"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="领取日期"
        prop="pickedAt"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="有效期" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ `${scope.row.startDate}-${scope.row.endDate}` }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="statusName" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="发放人" prop="grantByName" show-overflow-tooltip>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="60">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status === 'normal'"
            type="text"
            size="mini"
            @click="cancelCustomerCoupon(scope.row)"
          >
            作废
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
</template>

<script>
import {
  getCustomerCouponList,
  cancelCustomerCoupon,
} from '@/views/marketing/coupon/services';

export default {
  props: {
    customerId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      list: [],
      pageData: {
        page: 1,
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        total: 0,
        pagerCount: 5,
      },
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.pageData.page = 1;
      this.getList();
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
    getList() {
      this.loading = true;
      getCustomerCouponList(this.customerId, {
        page: this.pageData.page,
        pageSize: this.pageData.pageSize,
      })
        .then(res => {
          this.loading = false;
          this.list = res.rows || [];
          this.pageData.total = res.totalSize || 0;
        })
        .catch(() => {
          this.loading = false;
          this.list = [];
          this.pageData.total = 0;
        });
    },
    // 作废用户优惠券
    cancelCustomerCoupon(row) {
      this.$confirm(
        '作废后当前客户将不能使用此优惠券，优惠券状态会更新为‘已失效’，您确定要作废吗？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false,
        },
      )
        .then(() => {
          cancelCustomerCoupon(row.id, {
            customerId: this.customerId,
          })
            .then(() => {
              this.$message.success('作废用户优惠券成功！');
              this.initData();
            })
            .catch(err => {
              if (err && err.message) {
                this.$message.error(err.message);
              }
            });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
.pagination-base {
  margin-top: 12px;
  text-align: right;
}
</style>
