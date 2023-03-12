<template>
  <div class="container-box">
    <ht-card>
      <el-form
        ref="stationSearhForm"
        :model="formsQuery"
        label-width="60px"
        size="mini"
        class="form-item-no-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item prop="status" label="分公司">
              <ht-select
                multiple
                collapse-tags
                filterable
                v-model="formsQuery.company"
                :options="companyOptions"
                :trigger-on-focus="false"
                class="switch-focus focus-number"
                placeholder="分公司"
                highlight-first-item
                has-selecte-all-val
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="0px">
              <el-button
                type="primary"
                plain
                class="ml-1"
                @click="handleSearchStation"
              >
                查询 (F5)
              </el-button>
              <el-button type="primary" plain @click="resetForm">
                重置 (F6)
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card class="auto-card" no-background no-padding>
      <el-row :gutter="5" class="branch-box">
        <el-col :span="6" style="height: 100%;">
          <ht-card title="设备分类" no-padding>
            <div class="branch-list">
              <BranchCompanyList
                ref="branchCompanyList"
                :tableLength="tableSum"
              />
            </div>
          </ht-card>
        </el-col>
        <el-col :span="18" style="height: 100%;">
          <ht-card title="设备管理（云诊车诊断仪）">
            <equipmentList
              v-if="companyOptions"
              :companyIds="companyIds"
              :companyList="companyOptions"
              @tableLn="tableCount"
            />
          </ht-card>
        </el-col>
      </el-row>
    </ht-card>
  </div>
</template>

<script>
import BranchCompanyList from "./components/BranchCompanyList"; // 分公司列表
import equipmentList from "./components/equipmentList"; // 设备列表
import { getCompanyList } from "@/api/finance/basicSetting";
import { hotkeyMixin, searchMixin } from "@/mixins";

export default {
  name: "Equipment",
  components: { BranchCompanyList, equipmentList },
  mixins: [hotkeyMixin, searchMixin],
  data() {
    return {
      formsQuery: { company: [] }, // 查询数据
      loading: false,
      companyOptions: [], // 搜索下拉
      companyIds: [],
      tableSum: 0
    };
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    loadData() {
      this.loading = true;
      getCompanyList()
        .then(res => {
          this.companyOptions = res.rows || [];
          this.companyOptions.forEach(item => {
            this.formsQuery.company.push(item.id);
          });
          this.companyIds = this.formsQuery.company;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 查询按钮
    handleSearchStation() {
      this.companyIds = this.formsQuery.company;
    },
    // 重置按钮
    resetForm() {
      this.formsQuery.company = [];
      this.companyOptions.forEach(item => {
        this.formsQuery.company.push(item.id);
      });
      this.companyIds = this.formsQuery.company;
    },
    tableCount(num) {
      this.tableSum = num;
    }
  }
};
</script>
<style lang="scss" scoped>
.container-box {
  ::v-deep {
    .el-form-item {
      margin-bottom: 0;
    }
    .branch-box {
      height: 100%;
      .box-card {
        height: 100%;
        .el-card__body {
          height: calc(100% - 40px);
          .branch-list {
            height: 100%;
            overflow: auto;
          }
        }
      }
    }
  }
}
</style>
