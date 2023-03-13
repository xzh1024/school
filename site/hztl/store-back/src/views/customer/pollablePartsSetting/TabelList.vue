<template>
  <div v-loading="loading" class="table-container">
    <el-table
      ref="table"
      class="parts-table"
      :data="tableData"
      border
      stripe
      size="mini"
      height="400"
      @selection-change="onSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column
        v-for="(column, index) in tableColumns"
        :key="index"
        :label="column.label"
        :prop="column.prop"
        :min-width="column.width"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="column.prop === 'controls'">
            <el-tooltip
              :enterable="false"
              effect="dark"
              content="设置查件权限"
              placement="top"
            >
              <el-button
                circle
                size="mini"
                class="btn-controls"
                @click="onSearchPermSet([scope.row])"
              >
                <i class="icon-search-perm" />
              </el-button>
            </el-tooltip>
            <el-tooltip
              :enterable="false"
              effect="dark"
              content="设置价格"
              placement="top"
            >
              <el-button
                circle
                size="mini"
                class="btn-controls"
                @click="onPriceTypeSet([scope.row])"
              >
                <i class="icon-price-type" />
              </el-button>
            </el-tooltip>
            <el-tooltip
              :enterable="false"
              effect="dark"
              content="设置限购"
              placement="top"
            >
              <el-button
                circle
                size="mini"
                class="btn-controls"
                @click="onLimitInfoSet([scope.row])"
              >
                <i class="icon-limit-info" />
              </el-button>
            </el-tooltip>
          </div>

          <div v-else-if="column.prop === 'canSearch'">
            {{ scope.row[column.prop] ? "是" : "否" }}
          </div>

          <div v-else-if="column.prop === 'priceType'">
            <span>{{ scope.row[column.prop] }}</span>
            <el-tag
              v-show="scope.row[column.prop] && scope.row.useDefault"
              effect="plain"
              size="mini"
            >
              默认
            </el-tag>
          </div>

          <div v-else-if="column.prop === 'purchaseLimit'">
            <el-tooltip
              v-if="scope.row.purchaseLimitType === 4 && scope.row.purchaseLimitDetails && scope.row.purchaseLimitDetails.length"
              placement="bottom"
              effect="dark"
              :enterable="false"
            >
              <div>
                <span class="text-font-primary">
                  {{ scope.row.purchaseLimitDetails[0].startTime }} - {{ scope.row.purchaseLimitDetails[0].endTime }}
                </span>
                <span
                  v-show="scope.row.purchaseLimitDetails[0].purchaseLimitQty || scope.row.purchaseLimitDetails[0].purchaseLimitQty === 0"
                  class="text-font-warning"
                >
                  【{{ scope.row.purchaseLimitDetails[0].purchaseLimitQty }}】{{ scope.row.swUnitName }}
                </span>
              </div>
              <div
                slot="content"
                style="width: 470px; text-align: center; font-size: 14px;"
              >
                <div v-for="(item, index) in scope.row.purchaseLimitDetails" :key="index">
                  <span>
                    {{ item.startTime }} - {{ item.endTime }}
                  </span>
                  <span
                    v-show="item.purchaseLimitQty || item.purchaseLimitQty === 0"
                    class="text-font-warning"
                  >
                    【{{ item.purchaseLimitQty }}】{{ scope.row.swUnitName }}
                  </span>
                </div>
              </div>
            </el-tooltip>
            <div v-if="scope.row.purchaseLimitType !== 4">
              {{ PURCHASE_LIMIT_TYPE_MAP[scope.row.purchaseLimitType] }}
              <span
                v-show="scope.row.purchaseLimitQty || scope.row.purchaseLimitQty === 0"
                class="text-font-warning"
              >
                【{{ scope.row.purchaseLimitQty }}】{{ scope.row.swUnitName }}
              </span>
            </div>
          </div>

          <div v-else-if="column.prop === 'swOeName'">
            <span v-show="scope.row.hasPromotion">【促销】</span>
            <span>{{ scope.row[column.prop] }}</span>
          </div>

          <div v-else>{{ scope.row[column.prop] }}</div>
        </template>
      </el-table-column>
    </el-table>

    <div class="table-pagination">
      <div style="flex: none">
        <el-checkbox
          :disabled="!tableData.length"
          v-model="isAll"
        >
          全选当前查询结果｜已选择 {{ isAll ? totalSize : selectedRows.length }} 条｜批量操作
        </el-checkbox>
        <el-button
          :disabled="!(selectedRows && selectedRows.length || isAll)"
          plain
          size="mini"
          @click="onSearchPermSet(selectedRows)"
        >设置查件权限</el-button>
        <el-button
          :disabled="!(selectedRows && selectedRows.length || isAll)"
          plain
          size="mini"
          @click="onPriceTypeSet(selectedRows)"
        >设置价格</el-button>
        <el-button
          :disabled="!(selectedRows && selectedRows.length || isAll)"
          plain
          size="mini"
          @click="onLimitInfoSet(selectedRows)"
        >设置限购</el-button>
      </div>
      <el-pagination
        :current-page="page"
        :page-sizes="PAGE_SIZES"
        :page-size="pageSize"
        :total="totalSize"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        style="flex: 1; text-align: right;"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { PollablePartsSettingApi } from './services'
const pollablePartsSettingApi = new PollablePartsSettingApi();

import { TABEL_LIST_COLUMNS } from "./constants";

const PAGE_SIZES = [10, 20, 50, 100]

const PURCHASE_LIMIT_TYPE_MAP = {
  0: "",
  1: "每天",
  2: "每月",
  3: "每年"
}

export default {
  name: "TabelList",
  props: {
    searchData: {
      required: true
    },
    customerType: {
      required: true
    },
    customerId: {
      required: true
    }
  },
  data() {
    return {
      PAGE_SIZES,
      PURCHASE_LIMIT_TYPE_MAP,
      loading: false,
      tableData: [{}],
      tableColumns: TABEL_LIST_COLUMNS,
      selectedRows: [],
      page: 1,
      pageSize: 20,
      totalSize: 0,
      isAll: false
    };
  },
  watch: {
    searchData(val) {
      if (val) {
        this.loadData();
      }
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      let params = {
        ...this.searchData,
        customerId: this.customerId,
        customerType: this.customerType,
        page: this.page,
        pageSize: this.pageSize
      }
      pollablePartsSettingApi.customerSettings(params).then(res =>{
        this.totalSize = res.totalSize;
        this.tableData = res.rows || [];
        this.loading = false;
        this.isAll = false;
        this.selectedRows = [];
      })
      .catch(() => {
        this.loading = false;
      })
    },
    onSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.loadData();
    },
    onCurrentChange(page) {
      this.page = page;
      this.loadData();
    },
    onSelectionChange(val) {
      this.selectedRows = val;
    },
    onSearchPermSet(rows) {
      let arr = [];
      if(!this.isAll) {
        arr = rows;
      }
      this.$emit("search-perm-set", arr);
    },
    onPriceTypeSet(rows) {
      let arr = [];
      if(!this.isAll) {
        arr = rows;
      }
      this.$emit("price-type-set", arr);
    },
    onLimitInfoSet(rows) {
      let arr = [];
      if(!this.isAll) {
        arr = rows;
      }
      this.$emit("limit-info-set", arr);
    }
  }
}
</script>

<style lang="less" scoped>
.table-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  .parts-table {
    flex: 1;
    display: flex;
    flex-direction: column;
    .el-table__body-wrapper {
      flex: 1;
    }
  }
}
.btn-controls {
  padding: 0 !important;
  height: 20px !important;
  width: 20px !important;
  vertical-align: middle !important;
  border: 0 !important;

  .icon-search-perm {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url('../../../assets/img/inquiry/icon-search-perm.png');
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .icon-price-type {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url('../../../assets/img/inquiry/icon-price-type.png');
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .icon-limit-info {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url('../../../assets/img/inquiry/icon-limit-info.png');
    background-repeat: no-repeat;
    background-size: 100%;
  }
}
.table-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  
  /deep/.el-button.is-plain {
    color: #409eff;
    background: #f0f3fe;
    border-color: #c1d0fc;
  }
  /deep/.el-button.is-disabled, .el-button.is-disabled:hover{
    color: #409eff91;
    background-color: #f0f3fe;
    border-color: #e0e7fe;
    cursor: not-allowed;
  }
}
.text-font-primary {
  color: #409eff;
}
.text-font-warning {
  color: #e6a23c;
}
</style>