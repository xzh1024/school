<template>
  <div class="container-box">
    <ht-card>
      <el-form
        ref="stationSearhForm"
        :model="formsQuery"
        label-width="60px"
        size="mini"
        class="form-item-no-margin-bottom"
        @click.native.stop="setFormKeyScope"
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
                查询(F5)
              </el-button>
              <el-button type="primary" plain @click="resetForm">
                重置(F6)
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card class="auto-card" no-background no-padding>
      <el-row :gutter="5" class="branch-box">
        <el-col
          :span="6"
          style="height: 100%;"
          @click.stop.native="setKeyScope(keyScopes.branchCompanyList)"
        >
          <ht-card title="分公司列表" no-padding>
            <div class="branch-list">
              <BranchCompanyList
                ref="branchCompanyList"
                :loading="loading"
                :list="companyList"
                :seletion-index.sync="seletionIndex"
                :keyScope="keyScopes.branchCompanyList"
                @seletionChange="handleBranchCompanyListSeletionChange"
                @hotkeysUp="bindKeyScope"
              />
            </div>
          </ht-card>
        </el-col>
        <el-col :span="18" style="height: 100%;">
          <ht-card title="工位设置" no-padding>
            <StationList :companyId="companyData.companyId" />
          </ht-card>
        </el-col>
      </el-row>
    </ht-card>
  </div>
</template>

<script>
import debounce from "throttle-debounce/debounce";
import hotkeys from "hotkeys-js";
import BranchCompanyList from "./components/BranchCompanyList"; // 分公司列表
import StationList from "./components/stationList"; // 工位设置
import { getFinancialsCompanys } from "@/api/finance/basicSetting";
import { searchMixin } from "@/mixins";

export default {
  name: "StationSet",
  components: { BranchCompanyList, StationList },
  mixins: [searchMixin],
  data() {
    return {
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      keyScopes: {
        branchCompanyList: Symbol("companyFundBranchCompanyList"),
        accountList: Symbol("accountList"),
        stationSet: Symbol("stationSet")
      },
      formsQuery: { company: [] }, // 查询数据
      loading: false,
      companyOptions: [], // 分公司搜索
      companyList: [], // 分公司列表
      companyLists: [],
      seletionIndex: 0, // 当前选中的分公司
      companyData: {} // 分公司信息
    };
  },
  async mounted() {
    await this.loadData();
    this.setKeyScope(this.keyScopes.stationSet);
    hotkeys("f5, f6", { scope: this.keyFormScope }, e => {
      switch (e.code) {
        case "F5":
          this.handleSearchStation();
          break;
        case "F6":
          this.resetForm();
          break;
        default:
          break;
      }
    });
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScopes.stationSet);
  },
  methods: {
    bindKeyScope(e) {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          if (e.altKey) {
            this.setKeyScope(this.keyScopes.accountList);
          }
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          if (e.altKey) {
            this.setKeyScope(this.keyScopes.branchCompanyList);
          }
          break;
        default:
          break;
      }
    },
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    },
    loadData() {
      this.loading = true;
      return getFinancialsCompanys()
        .then(res => {
          this.companyList = res || [];
          this.companyLists = res || [];
          this.companyOptions = res;
          if (this.companyList.length) {
            this.seletionIndex = this.companyList.findIndex(
              item => item.id === this.companyData.companyId
            );
          }
          if (this.seletionIndex < 0) {
            this.seletionIndex = 0;
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleBranchCompanyListSeletionChange(seletion) {
      this.seletion = seletion || {};
      this.companyData = {
        companyId: this.seletion.id,
        companyName: this.seletion.name,
        isOpened: this.seletion.isOpened
      };
      if (!this.companyList.length) {
        this.seletionIndex = 0;
        this.$refs.branchCompanyList &&
          this.$refs.branchCompanyList.seletionChange(this.seletionIndex);
      }
    },
    setFormKeyScope() {
      hotkeys.setScope(this.keyFormScope);
      this.selection = [];
    },
    // 查询按钮
    handleSearchStation() {
      const companyArr = this.formsQuery.company;
      let arr = [];
      if (companyArr.length) {
        arr = this.companyLists.filter(item => companyArr.includes(item.id));
        this.companyList = arr;
      } else {
        this.companyList = this.companyLists;
      }
    },
    // 重置按钮
    resetForm() {
      this.formsQuery.company = [];
      this.companyList = this.companyLists;
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
