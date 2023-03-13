<template>
  <div class="container-box">
    <ht-card :no-padding="true" class="auto-card" title="财务核算公司设置">
      <template v-slot:after-title>
        <el-popover
          placement="top"
          width="500"
          style="float:right;color:#FF5454"
          trigger="click"
        >
          <p>
            业务单据由公司自行结算，若未勾选则需在选择一家分公司进行财务核算，财务账目将计入该指定分公司资金账户中
          </p>
          <span slot="reference" class="text-danger" style="cursor:pointer;"
            ><i class="el-icon-question"></i>什么是财务核算公司设置</span
          >
        </el-popover>
      </template>
      <ht-table :data="tableData" :loading="loading" height="100%">
        <el-table-column :min-width="80" prop="status" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status ? "停用" : "正常" }}
          </template>
        </el-table-column>
        <el-table-column
          :min-width="CELL_WIDTH.companyName"
          prop="companyName"
          label="公司名称"
        />
        <el-table-column
          :min-width="CELL_WIDTH.companySortName"
          prop="companyShortName"
          label="简称"
        />
        <el-table-column
          :min-width="110"
          prop="isIndependent"
          label="是否独立核算"
          align="center"
        >
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.isIndependent"
              :disabled="!canWrite(scope.row.belongs)"
              @change="independentChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          :min-width="CELL_WIDTH.companyName"
          prop="byCompanyId"
          label="代核算公司"
        >
          <template slot-scope="scope">
            <ht-select
              v-model="scope.row.byCompanyId"
              :options="store().allCompanies()"
              :disabled="
                scope.row.isIndependent || !canWrite(scope.row.belongs)
              "
              size="mini"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              :disabled="!canWrite(scope.row.belongs)"
              size="mini"
              @click="saveHandle(scope.row)"
              >保存</el-button
            >
          </template>
        </el-table-column>
      </ht-table>
    </ht-card>
  </div>
</template>

<script>
import {
  loadCompanySeting,
  updateCompanySeting
} from "@/api/finance/basicSetting";
import { CELL_WIDTH } from "@/constants";
import { searchMixin } from "@/mixins";
import * as store from "@/utils/store";

export default {
  name: "CompanySettings",
  mixins: [searchMixin],
  data() {
    return {
      CELL_WIDTH,
      companyId: null,
      tableData: [],
      totalSize: null,
      loading: false
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    store() {
      return store;
    },
    loadData() {
      // 初始化列表数据
      this.loading = true;
      loadCompanySeting()
        .then(({ companies, companyId }) => {
          this.tableData = companies || [];
          this.companyId = companyId;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    canWrite(belongs) {
      return this.hasBelongsPerm("write", belongs);
    },
    saveHandle(row) {
      this.handleByCompanyIdChange(row.byCompanyId, row);
    },
    independentChange(row) {
      if (row.isIndependent) {
        row.byCompanyId = row.companyId;
      }
    },
    handleByCompanyIdChange(key, row) {
      row.byCompanyId = row.byCompanyId || null;
      if (row.byCompanyId != row.companyId) {
        row.isIndependent = false;
      } else {
        row.isIndependent = true;
      }
      updateCompanySeting(row).then(() => {
        this.$message({
          message: "保存成功",
          type: "success",
          showClose: true
        });
      });
    }
  }
};
</script>
