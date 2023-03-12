<template>
  <el-dialog
    title="选择优惠券"
    :visible.sync="visible"
    v-loading="loading"
    :close-on-click-modal="false"
    append-to-body
    width="1200px"
    @close="close"
    class="coupon-grant-dialog"
  >
    <SearchTemplate
      :formData="formData"
      placeholderText="请输入优惠券名称"
      labelWidth="96px"
      @handleQuery="handleQuery"
      @handleReset="handleReset"
      :moreVisible="false"
    >
      <el-button
        slot="right"
        size="small"
        type="primary"
        plain
        @click="goCoupon"
      >
        优惠券管理
      </el-button>
    </SearchTemplate>
    <el-table
      class="table-base coupon-grant-table"
      size="small"
      :data="list"
      stripe
      border
      style="width: 100%"
      height="400px"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column
        label="优惠券名称"
        prop="name"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="适用商品"
        prop="limitTypeName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="优惠内容"
        prop="content"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="领取门槛"
        prop="getThresholdName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="剩余数量" width="90" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.total - scope.row.picked }}
        </template>
      </el-table-column>
      <el-table-column label="发券数" width="180" show-overflow-tooltip>
        <el-input size="small" value="1" disabled></el-input>
      </el-table-column>
    </el-table>
    <el-pagination
      class="coupon-grant-pagination"
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
    <div slot="footer" style="text-align: center;">
      <el-button size="small" @click="close">取消</el-button>
      <el-button
        size="small"
        type="primary"
        @click="confirm"
        :disabled="!checkedList.length"
      >
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import SearchTemplate from '@/components/search/SearchTemplate.vue';
import { getCouponList, grantCoupons } from '@/views/marketing/coupon/services';

const defaultFormData = {
  keyword: '', // 关键字
  status: 'ongoing', // 状态，ongoing:进行中,finished:已结束
};

export default {
  name: 'CouponGrantDialog',
  components: { SearchTemplate },
  props: {
    customerIds: {
      type: Array,
      required: true,
    },
    customerCond: {
      type: String,
    },
  },
  created() {
    this.getList();
  },
  data() {
    return {
      visible: true,
      loading: false,
      list: [],
      checkedList: [],
      formData: JSON.parse(JSON.stringify(defaultFormData)),
      pageData: {
        page: 1,
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        total: 0,
        pagerCount: 5,
      },
      statusList: [
        {
          id: '',
          name: '全部',
        },
        {
          id: 'ongoing',
          name: '进行中',
        },
        {
          id: 'finished',
          name: '已结束',
        },
      ],
      typeList: [
        {
          id: '',
          name: '全部',
        },
        {
          id: 'reduce',
          name: '满减券',
        },
        {
          id: 'discount',
          name: '折扣券',
        },
      ],
    };
  },
  methods: {
    close() {
      this.$emit('hide');
    },
    confirm() {
      const params = {
        ids: this.checkedList.map(item => item.id),
        customerIds: [...this.customerIds],
        customerCond: this.customerCond,
      };
      grantCoupons(params)
        .then(() => {
          this.$message.success('发放优惠券成功！');
          this.$emit("handleUpdate");
          this.close();
        })
        .catch(err => {
          if (err && err.message) {
            this.$message.error(err.message);
          }
        });
    },
    handleQuery() {
      this.pageData.page = 1;
      this.checkedList = [];
      this.getList();
    },
    handleReset() {
      this.formData = JSON.parse(JSON.stringify(defaultFormData));
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
      const params = {
        ...this.formData,
        page: this.pageData.page,
        pageSize: this.pageData.pageSize,
      };
      getCouponList(params)
        .then(res => {
          this.list = res.rows || [];
        })
        .catch(() => {
          this.list = [];
        });
    },
    // 复选框事件
    selectionChange(list) {
      this.checkedList = list;
    },
    // 跳转优惠券管理
    goCoupon() {
      this.$router.push('/marketing/coupon/list');
    },
  },
};
</script>
<style lang="less" scoped>
.coupon-grant-dialog {
  /deep/ .el-dialog__body {
    padding: @padding-size-main @padding-size-main 0;
    background: #ffffff;
    .coupon-grant-table {
      margin-top: @margin-size-main;
    }
    .coupon-grant-pagination {
      text-align: right;
      padding: 12px 0;
      background-color: #ffffff;
    }
  }
  /deep/ .el-dialog__footer {
    padding: 12px 0;
    border-top: 1px solid @border-color-base;
  }
}
</style>
