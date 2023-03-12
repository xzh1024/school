<template>
  <div class="customer_query">
    <!-- 客户查询 -->
    <div class="search">
      <Search
        style="width: 652px"
        @onSearchFn="searchFn"
        @onResetFn="resetFn"
        @onMoreSeacrh="moreSeacrhFn"
        :placeholder="placeholder"
      />
      <el-button
        size="small"
        type="primary"
        @click="exportExcel"
        :disabled="!tableData.length"
        >导出Excel</el-button
      >
    </div>
    <el-row class="more_search_box" v-if="moreSearch">
      <el-col class="search_item_4">
        <div class="search_item">
          <span class="label">归属员工</span>
          <el-select
            v-model="searchObj.businessManId"
            size="small"
            filterable
            collapse-tags
            placeholder="请选择"
            class="search_item_cont"
          >
            <el-option
              v-for="(item, index) in businessManList"
              :key="index"
              :label="
                item.userId
                  ? item.userName + '-' + item.userPhone
                  : item.userName
              "
              :value="item.userId"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col class="search_item_4">
        <div class="search_item">
          <span class="label">加入日期</span>
          <el-date-picker
            class="search_item_cont"
            v-model="applyTime"
            type="daterange"
            unlink-panels
            range-separator="至"
            size="small"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00']"
            @change="changeTime"
          >
          </el-date-picker>
        </div>
      </el-col>
      <el-col class="search_item_4">
        <div class="search_item">
          <span class="label">所在地区</span>
          <SelectArea
            style="width: 204px"
            :areaData="searchObj.areaIds"
            @change="areaChange"
          />
        </div>
      </el-col>
      <el-col class="search_item_4">
        <div class="search_item">
          <span class="label">客户类型</span>
          <el-select
            v-model="searchObj.customerType"
            size="small"
            placeholder="请选择"
            class="search_item_cont"
          >
            <el-option
              v-for="(item, index) in customerTypeList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col class="search_item_4">
        <div class="search_item">
          <span class="label">客户标签</span>
          <el-select
            v-model="labelIds"
            size="small"
            multiple
            filterable
            collapse-tags
            placeholder="请选择"
            class="search_item_cont"
          >
            <el-option
              v-for="(item, index) in labelList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col class="search_item_4">
        <div class="search_item">
          <span class="label">会员等级</span>
          <el-select
            v-model="searchObj.memberGradeId"
            size="small"
            filterable
            placeholder="请选择"
            class="search_item_cont"
          >
            <el-option
              v-for="(item, index) in memberGradeList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

    <el-table
      ref="multipleTable"
      class="xtable"
      size="small"
      :data="tableData"
      border
      stripe
      tooltip-effect="dark"
      height="400px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" align="center" width="55">
      </el-table-column>
      <el-table-column
        prop="CustomerName"
        label="客户名称"
        align="center"
        show-overflow-tooltip
        width="220"
      >
        <template slot-scope="scope">
          <!-- <el-tooltip  effect="dark" :content="renderAppyer(scope.row)" placement="top"> -->
          <p class="ellipsis">{{ renderAppyer(scope.row) }}</p>
          <!-- </el-tooltip> -->
          <p :style="{ color: scope.row.memberGradeColor }">
            {{ scope.row.memberGradeName }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="客户电话" align="center" width="160">
        <template slot-scope="scope">
          {{
            scope.row.customerType == 0
              ? scope.row.phone
              : scope.row.contactsPhone
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="areaName"
        label="所在地区"
        align="center"
        show-overflow-tooltip
        width="220"
      >
      </el-table-column>
      <el-table-column
        prop="businessMan"
        label="归属员工"
        align="center"
        width="220"
      >
      </el-table-column>
      <el-table-column
        prop="typeName"
        label="客户类型"
        align="center"
        width="120"
      >
        <!-- <template slot-scope="scope">
          <span>
            {{scope.row.customerType==0?"个人":'公司'}}
          </span>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="customerStatus"
        label="客户状态"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <span>
            {{
              scope.row.customerStatus == 0
                ? '待审核'
                : scope.row.customerStatus == 1
                ? '正常'
                : '停用'
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="加入日期"
        prop="createdAt"
        width="170"
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.createdAt
              .split('.')[0]
              .split('T')
              .join(' ')
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="labelNames"
        label="客户标签"
        align="center"
        min-width="199"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.labelNames ? scope.row.labelNames.join('、') : ''
          }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="170">
        <template slot-scope="scope">
          <el-button @click="lookDetail(scope.row)" type="text" size="small"
            >查看资料</el-button
          >
          <el-dropdown
            trigger="click"
            @command="
              command => {
                handleCommand(command, scope.row);
              }
            "
            style="margin-left: 8px; cursor: pointer"
          >
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="basicSet">基础设置</el-dropdown-item>
              <el-dropdown-item command="searchSet">查件设置</el-dropdown-item>
              <el-dropdown-item command="memberGrade"
                >会员等级</el-dropdown-item
              >
              <el-dropdown-item command="addLabel">客户标签</el-dropdown-item>
              <el-dropdown-item command="openCard">开卡</el-dropdown-item>
              <el-dropdown-item command="grantCoupon" v-if="couponEnable">发放优惠券</el-dropdown-item>
              <el-dropdown-item command="delete">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <div class="page_footer">
      <div>
        <el-checkbox v-model="checkedAll" @change="selectAllFn"
          >全选当前查询结果</el-checkbox
        >
        <span
          style="
						margin: 0px 6px;
						padding: 0px 6px;
						border-left: 1px solid #000;
						border-right: 1px solid #000;
					"
        >
          已选中 {{ selectLen }} 条
        </span>
        <span>批量操作</span>
        <el-button
          plain
          size="small"
          type="primary"
          style="margin-left: 5px"
          :disabled="btnDisabled"
          @click="allBaseSetFn"
          >基础设置</el-button
        >
        <el-button
          plain
          size="small"
          type="primary"
          style="margin-left: 5px"
          :disabled="btnDisabled"
          @click="allVipGradeFn"
          >会员等级</el-button
        >
        <el-button
          plain
          size="small"
          type="primary"
          style="margin-left: 5px"
          :disabled="btnDisabled"
          @click="allAddLabelFn"
          >加标签</el-button
        >
        <el-button
          v-if="couponEnable"
          plain
          size="small"
          type="primary"
          style="margin-left: 5px"
          :disabled="btnDisabled"
          @click="showBatchCouponGrantDialog"
          >发放优惠券</el-button
        >
        <el-button
          plain
          size="small"
          type="danger"
          style="margin-left: 5px"
          :disabled="btnDisabled"
          @click="allDeleteFn"
          >删除</el-button
        >
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, prev, pager, next, jumper, sizes"
        :total="pageInfo.totalSize"
      >
      </el-pagination>
    </div>

    <BasicSetDialog
      ref="basicSet"
      :selectData="selData"
      :searchAll="checkedAll"
      :searchCond="searchObj"
      @onRefresh="refreshFn"
    />

    <SetVipGrade
      ref="VipGrade"
      :selectData="selData"
      :searchAll="checkedAll"
      :searchCond="searchObj"
      @onRefresh="refreshFn"
    />

    <AddLabelPop
      ref="addlabel"
      :isSingle="isSingle"
      :selectData="selData"
      :searchAll="checkedAll"
      :searchCond="searchObj"
      @onRefresh="refreshFn"
    />

    <CouponGrantDialog
      v-if="couponGrantVisible"
      :customerIds="customerIds"
      :customerCond="customerCond"
      @hide="hideCouponGrantDialog"
    />
  </div>
</template>

<script>
import Search from '@/components/search/SearchCom.vue';
import SelectArea from '@/components/selectArea/SelectArea.vue';
import AddLabelPop from './components/addLabelPop.vue';
import SetVipGrade from '@/components/customer/setVipGrade.vue';
import BasicSetDialog from './components/basicSetDialog.vue';
import CouponGrantDialog from '@/views/marketing/coupon/grantDialog/index.vue';
import { getCouponSetting } from '@/views/marketing/coupon/services';

import { CustomerApi } from './services';
const customerApi = new CustomerApi();
export default {
  name: 'customerQuery',
  components: {
    Search,
    SelectArea,
    AddLabelPop,
    SetVipGrade,
    BasicSetDialog,
    CouponGrantDialog,
  },
  data() {
    return {
      couponGrantVisible: false,
      placeholder: '客户单位名称/联系人/电话等',
      moreSearch: false, //更多筛选
      applyTime: [], //申请日期
      businessManList: [], //归属员工
      //客户类型
      customerTypeList: [
        // {label:'全部',value:''},
        { label: '个人', value: 0 },
        // {label:'公司',value:1},
        { label: '公司-经销商', value: 2 },
        { label: '公司-汽修厂', value: 3 },
        { label: '公司-生产厂家', value: 4 },
      ],
      labelIds: [],
      labelList: [], //客户标签
      //会员等级
      memberGradeList: [
        { name: 'VIP1', id: '1' },
        { name: 'VIP2', id: '2' },
        { name: 'VIP3', id: '3' },
      ],
      searchObj: {
        keyword: '',
      },
      tableData: [],
      pageInfo: {
        page: 1,
        totalSize: 0,
        pageSize: 20,
      },
      selData: [],
      checkedAll: false,
      selectionData: [], //已选中
      selectLen: 0, //选中条数
      btnDisabled: true,
      customerQueryObj: {},
      isSingle: null,
      customerIds: [], // 发放优惠券所需的客户关系IDs
      customerCond: '', // 客户查询条件
      couponEnable: false,
    };
  },
  created() {
    this.getCouponSetting();
    this.getVipGradeList(); //会员等级
    if (this.customerQueryObj && this.customerQueryObj.labelList) {
      this.labelList = this.customerQueryObj.labelList;
    } else {
      this.getLabelList(); //客户标签
    }
    if (this.customerQueryObj && this.customerQueryObj.businessManList) {
      this.businessManList = this.customerQueryObj.businessManList;
    } else {
      this.getBusinessManList(); //归属员工
    }
  },
  mounted() {
    if (this.$route.query.memberGradeId) {
      this.searchObj.memberGradeId = Number(this.$route.query.memberGradeId);
    }
    if (this.$route.query.labelId) {
      this.labelIds.push(Number(this.$route.query.labelId));
      this.searchObj.labelIds = this.labelIds.join(',');
    }
    this.initData();
  },
  destroyed() {
    // sessionStorage.removeItem('customerQueryObj');
  },
  methods: {
    renderAppyer(row) {
      let customerType = row.customerType;
      let str = '';
      if (customerType == 0) {
        str += row.applyer;
      } else {
        str += row.CustomerName + '-' + row.contacts;
      }
      return str;
    },
    exportExcel() {
      let params = {
        status: 1,
        ...this.searchObj,
        ...this.pageInfo,
      };
      customerApi.exportCustomersList(params).then(res => {
        this.$message.success('导出成功！');
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement('a');
        link.href = url;
        let name = `客户导出列表_${this.$dayjs().format('YYYY-MM-DD')}.xls`;
        link.setAttribute('download', name);
        link.click();
      });
    },
    getLabelList() {
      let params = {
        page: 1,
        pageSize: 100,
      };
      customerApi
        .getLabelList(params)
        .then(res => {
          this.customerQueryObj.labelList = res.rows;
          sessionStorage.setItem(
            'customerQueryObj',
            JSON.stringify(this.customerQueryObj),
          );
          this.labelList = res.rows;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBusinessManList() {
      let params = {
        companyId: this.$store.state.base.companyId,
      };
      this.businessManList = [];
      customerApi
        .getStaffsBycid(params)
        .then(res => {
          if (res) {
            let obj = {
              userId: 0,
              userName: '请选择',
              userPhone: '',
            };
            this.businessManList.push(obj);
            res.forEach(p => {
              this.businessManList.push(p);
            });
            this.customerQueryObj.businessManList = this.businessManList;
            sessionStorage.setItem(
              'customerQueryObj',
              JSON.stringify(this.customerQueryObj),
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getVipGradeList() {
      let params = {
        // keyword:''
      };
      customerApi
        .getMemberGradeList(params)
        .then(res => {
          this.memberGradeList = res ? res : [];
          this.customerQueryObj.memberGradeList = res ? res : [];
          sessionStorage.setItem(
            'customerQueryObj',
            JSON.stringify(this.customerQueryObj),
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    initData() {
      this.tableData = [];
      let obj = { ...this.searchObj };
      let params = {
        ...obj,
        ...this.pageInfo,
        status: 3,
      };
      customerApi
        .getCustomersList(params)
        .then(res => {
          if (res) {
            this.tableData = res.rows;
            this.pageInfo.totalSize = res.totalSize;
          }

          this.checkedAll = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchFn(data) {
      this.searchObj.keyword = data;
      this.searchObj.labelIds = this.labelIds.join(',');
      this.pageInfo.page = 1;
      this.initData();
    },
    resetFn() {
      //重置
      this.searchObj = {
        keyword: '',
        areaIds: [],
      };
      this.labelIds = [];
      this.applyTime = [];
      this.initData();
    },
    moreSeacrhFn(data) {
      this.moreSearch = data;
      // let keyword = this.searchObj.keyword;
      // this.searchObj = {
      //   keyword:keyword
      // }
    },
    changeTime(time) {
      if (time) {
        this.searchObj.joinStartTime = this.$dayjs(time[0]).format(
          'YYYY-MM-DD',
        );
        this.searchObj.joinEndTime = this.$dayjs(time[1]).format('YYYY-MM-DD');
      } else {
        this.searchObj.joinStartTime = '';
        this.searchObj.joinEndTime = '';
      }
    },
    areaChange(dataObj) {
      this.searchObj.provinceId = dataObj.areaIds[0];
      this.searchObj.cityId = dataObj.areaIds[1];
      this.searchObj.countyId = dataObj.areaIds[2];
    },
    handleSelectionChange(val) {
      this.selectionData = val;
      this.checkedAll = false;
      this.selectLen = val.length;
      this.btnDisabled = val.length ? false : true;
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.pageInfo.page = 1;
      this.initData();
    },
    handleCurrentChange(val) {
      this.pageInfo.page = val;
      this.initData();
    },

    handleCommand(command, row) {
      if (command == 'basicSet') {
        this.baseSetFn(row);
      }
      if (command == 'searchSet') {
        let url =
          '/customer/customerQuery/pollablePartsSetting?' +
          row.id +
          '-' +
          row.customerId +
          '-' +
          row.customerType +
          '-' +
          row.CustomerName +
          '-' +
          row.applyer +
          '-' +
          row.contacts +
          '-' +
          row.CustomerName +
          '-' +
          row.contactsPhone;
        this.$router.push(url);
      }
      if (command == 'memberGrade') {
        this.VipGradeFn(row);
      }
      if (command == 'addLabel') {
        this.addLabelFn(row);
      }
      if (command == 'openCard') {
        let obj = {
          path: '/customer/vipCard',
          query: {
            id: row.id,
          },
        };
        this.$router.push(obj);
      }
      if (command == 'grantCoupon') {
        this.showCouponGrantDialog(row);
      }
      if (command == 'delete') {
        this.delClick(row);
      }
    },

    selectAllFn(foo) {
      if (foo) {
        this.selectLen = this.pageInfo.totalSize;
        this.btnDisabled = false;
      } else {
        this.selectLen = 0;
        this.$refs.multipleTable.clearSelection(); //清空用户的选择
        this.btnDisabled = true;
      }
    },

    delClick(row, index) {
      //删除
      this.checkedAll = false;
      this.$confirm(`确定要删除客户【${row.CustomerName}】吗`)
        .then(_ => {
          //调用删除接口

          this.deleteFn(row, 0);
        })
        .catch(_ => {});
    },
    deleteFn(delData, type) {
      let params = {};
      if (!type) {
        params = {
          searchAll: this.checkedAll,
          searchCond: this.searchObj,
          ids: [delData.id],
        };
      } else {
        params = {
          searchAll: this.checkedAll,
          searchCond: this.searchObj,
          ids: [],
        };
        delData.forEach(p => {
          params.ids.push(p.id);
        });
      }
      customerApi
        .delCustomersApi(params)
        .then(res => {
          this.$message({
            message: '删除成功',
            type: 'success',
          });
          this.searchFn();
        })
        .catch(error => {
          console.log(error ? error : '删除失败');
        });
    },
    allDeleteFn() {
      //批量删除
      if (!this.selectionData.length) {
        this.$message({
          message: '你还没有选择数据',
          type: 'warning',
        });
        return false;
      }
      this.$confirm('确定要删除选中的客户吗？')
        .then(_ => {
          //调用删除接口
          this.deleteFn(this.selectionData, 1);
        })
        .catch(error => {
          console.log(error);
        });
    },
    baseSetFn(row) {
      //基础设置
      this.selData = [row];
      this.searchAll = false;
      this.$refs.basicSet.show();
    },
    allBaseSetFn() {
      //基础设置
      this.selData = this.selectionData;
      this.$refs.basicSet.show();
    },
    VipGradeFn(row) {
      //会员等级
      this.selData = [row];
      this.searchAll = false;
      this.$refs.VipGrade.show();
    },
    allVipGradeFn() {
      //会员等级
      this.selData = this.selectionData;
      this.$refs.VipGrade.show();
    },
    addLabelFn(row) {
      //加标签
      this.isSingle = true;
      this.selData = [row];
      this.searchAll = false;
      this.$refs.addlabel.show();
    },
    allAddLabelFn() {
      //加标签
      this.isSingle = false;
      this.selData = this.selectionData;
      this.$refs.addlabel.show();
    },
    refreshFn() {
      this.initData();
    },

    lookDetail(row) {
      //查看资料
      let obj = {
        path: '/customer/customerQuery/customerInfo',
        query: {
          id: row.id,
          type: 1, //已审核客户
        },
      };
      this.$router.push(obj);
    },
    showCouponGrantDialog(row) {
      this.customerCond = '';
      this.customerIds = [row.id];
      this.couponGrantVisible = true;
    },
    showBatchCouponGrantDialog() {
      // 按当前查询条件
      if (this.checkedAll) {
        const searchObj = this.searchObj;
        let customerCond = '';
        for (const key in searchObj) {
          if (Object.hasOwnProperty.call(searchObj, key)) {
            const value = searchObj[key];
            if (value) {
              customerCond += `${key}=${value}&`;
            }
          }
        }
        this.customerCond = customerCond;
        this.customerIds = [];
        this.couponGrantVisible = true;
      } else {
        this.customerCond = '';
        this.customerIds = this.selectionData.map(item => item.id);
        this.couponGrantVisible = true;
      }
    },
    hideCouponGrantDialog() {
      this.couponGrantVisible = false;
    },
    // 获取优惠券状态
    getCouponSetting() {
      getCouponSetting().then(res => {
        this.couponEnable = !!res;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.customer_query {
  box-sizing: border-box;
  height: 100%;
  padding: 0 @padding-size-main;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .search {
    margin-top: @margin-size-secondary;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  /deep/.el-date-editor .el-range-input {
    width: 50%;
  }
  .more_search_box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    /deep/.el-col {
      margin: 4px 0;
    }
    .search_item_4 {
      width: 284px;
    }
    .search_item {
      .label {
        width: 70px;
        margin-right: 4px;
        display: inline-block;
      }
      .search_item_cont {
        width: 204px;
      }
    }
  }

  .el-dropdown-link {
    color: @color-link;
    font-weight: 500;
  }
  .xtable {
    flex: 1;
    margin-top: 10px;
    .ellipsis {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .page_footer {
    margin-bottom: 10px;
  }
}
</style>
