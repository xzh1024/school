<template>
  <div class="coupon-container">
    <MenuCard name="优惠券" text="这里是一行描述" icon="ico-coupons">
      <el-button
        slot="last"
        size="small"
        :type="isType"
        @click.stop="changeEnable"
      >
        {{ this.enable ? '关闭功能' : '开启功能' }}
      </el-button>
    </MenuCard>
    <div class="coupon-body" v-if="enable">
      <div class="coupon-list clearfix">
        <CouponCard
          name="满减券"
          text="例：满100元减20元 便于合理控制活动成本"
          @click="addCoupon('reduce')"
        ></CouponCard>
        <CouponCard
          name="折扣券"
          text="例：满100元打9折 提高店铺销量和客单价"
          @click="addCoupon('discount')"
        ></CouponCard>
        <CouponCard name="更多优惠券" text="敬请期待..." disabled></CouponCard>
      </div>
      <el-divider></el-divider>
      <div class="coupon-content">
        <div class="coupon-title">优惠券列表</div>
        <SearchTemplate
          class="coupon-search"
          :formData="formData"
          placeholderText="请输入优惠券名称"
          labelWidth="96px"
          @handleQuery="handleQuery"
          @handleReset="handleReset"
        >
          <el-button
            slot="right"
            type="primary"
            plain
            size="small"
            @click="goCustomerQuery">
            给客户手动发券
          </el-button>
          <template slot="more">
            <el-form-item label="优惠券状态">
              <el-select v-model="formData.status" placeholder="">
                <el-option
                  v-for="item in statusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="优惠券类型">
              <el-select v-model="formData.type" placeholder="">
                <el-option
                  v-for="item in typeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </SearchTemplate>
        <el-table
          class="table-base"
          size="small"
          :data="list"
          stripe
          border
          style="width: 100%"
          height="400px"
        >
          <el-table-column
            label="优惠券名称"
            prop="name"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="类型" prop="type" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ getTypeName(scope.row.type) }}
            </template>
          </el-table-column>
          <el-table-column
            label="优惠内容"
            prop="content"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="已领取/剩余" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ `${scope.row.picked}/${scope.row.total - scope.row.picked}` }}
            </template>
          </el-table-column>
          <el-table-column
            label="已使用"
            prop="used"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="状态"
            prop="statusName"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="143">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status === 'finished'"
                type="text"
                size="mini"
                @click="infoCoupon(scope.row)"
              >
                查看
              </el-button>
              <template v-else>
                <el-button
                  type="text"
                  size="mini"
                  @click="editCoupon(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="finishCoupon(scope.row)"
                >
                  结束
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="showShare(scope.row)"
                >
                  分享
                </el-button>
              </template>
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
    </div>
    <CouponShareDialog ref="couponGrantDialog"></CouponShareDialog>
  </div>
</template>

<script>
import MenuCard from '../components/menuCard.vue';
import CouponCard from './components/couponCard.vue';
import {
  getCouponSetting,
  setCouponSetting,
  getCouponList,
  finishCoupon,
} from './services';
import SearchTemplate from '@/components/search/SearchTemplate.vue';
import CouponShareDialog from './couponShareDialog/index.vue';

const defaultFormData = {
  keyword: '', // 关键字
  status: '', // 状态，ongoing:进行中,finished:已结束
  type: '', // 类型，reduce:满减券,discount:折扣券
};

export default {
  components: { MenuCard, CouponCard, SearchTemplate, CouponShareDialog },
  data() {
    return {
      enable: false,
      list: [],
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
  computed: {
    isType() {
      return this.enable ? '' : 'primary';
    },
  },
  created() {
    this.getCouponSetting();
    this.getList();
  },
  methods: {
    // 跳转客户查询
    goCustomerQuery() {
      this.$router.push('/customer/customerQuery/list');
    },
    changeEnable() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      const enable = !this.enable;
      setCouponSetting({
        enable,
      })
        .then(() => {
          loading.close();
          if (enable) {
            this.$message.success('开启功能成功！');
          } else {
            this.$message.success('关闭功能成功！');
          }
          this.enable = enable;
        })
        .catch(() => loading.close());
    },
    getTypeName(type) {
      let name = '';
      if (type) {
        const findData = this.typeList.find(item => item.id === type);
        name = findData ? findData.name : '';
      }
      return name;
    },
    getCouponSetting() {
      getCouponSetting().then(res => {
        this.enable = !!res;
      });
    },
    handleQuery() {
      this.pageData.page = 1;
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
          this.pageData.total = res.totalSize || 0;
        })
        .catch(() => {
          this.list = [];
          this.pageData.total = 0;
        });
    },
    addCoupon(type) {
      this.$router.push({
        path: '/marketing/coupon/add',
        query: { type: type },
      });
    },
    editCoupon(data) {
      this.$router.push({
        path: '/marketing/coupon/edit',
        query: {
          type: data.type,
          id: data.id,
        },
      });
    },
    infoCoupon(data) {
      this.$router.push({
        path: '/marketing/coupon/info',
        query: {
          type: data.type,
          id: data.id,
        },
      });
    },
    finishCoupon(data) {
      this.$confirm(
        '结束后此优惠券将不在继续向客户发放，但不影响已领取此优惠券的客户使用此券，你确定现在要结束此优惠券吗？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false,
        },
      )
        .then(() => {
          finishCoupon(data.id)
            .then(() => {
              this.$message.success('结束优惠券成功！');
              this.handleQuery();
            })
            .catch(err => {
              if (err && err.message) {
                this.$message.error(err.message);
              }
            });
        })
        .catch(() => {});
    },
    showShare(row) {
      this.$refs.couponGrantDialog.show(row.id);
    },
  },
};
</script>

<style lang="less" scoped>
.coupon-container {
  height: 100%;
  background: #f5f5f5;
  .menu-card {
    height: 80px;
    border-color: #ffffff;
    cursor: default;
    &:hover {
      box-shadow: none;
    }
  }
  .coupon-body {
    margin-top: @margin-size-secondary;
    padding: @padding-size-main;
    background: #ffffff;
    .coupon-list {
      .coupon-card {
        float: left;
        margin-right: @margin-size-main;
        margin-bottom: @margin-size-main;
      }
    }
    .coupon-content {
      padding-top: @margin-size-main;
      .coupon-title {
        font-size: 16px;
        font-weight: 700;
      }
      .coupon-search {
        margin-top: @margin-size-main;
      }
      .table-base {
        margin-top: @margin-size-main;
      }
      .pagination-base {
        text-align: right;
        padding-top: 12px;
      }
    }
  }
}
</style>
