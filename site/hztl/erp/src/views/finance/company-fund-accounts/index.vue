<template>
  <div class="container-box" v-loading="loading">
    <div class="header flex-container">
      <div>
        <el-button
          :disabled="!canCreate"
          type="primary"
          size="mini"
          @click="createHandle"
        >
          新增账户（F2）
        </el-button>
        <el-button
          :disabled="!canUpdate"
          type="primary"
          size="mini"
          @click="updateHandle"
        >
          编辑（F3）
        </el-button>
        <el-button
          :disabled="!canDelete"
          type="primary"
          size="mini"
          @click="deleteHandle"
        >
          删除（F4）
        </el-button>
        <el-button
          :disabled="!canOpen"
          type="primary"
          size="mini"
          @click="openHandle"
        >
          开账
        </el-button>
      </div>

      <VideoPopover :videoUrl="videoUrl" :remark="videoPopoverRemark" />
    </div>
    <ht-card no-background no-padding class="auto-card">
      <el-row :gutter="5" style="height: 100%;">
        <el-col
          :span="6"
          style="display: flex; height: 100%;"
          @click.stop.native="setKeyScope(keyScopes.branchCompanyList)"
        >
          <ht-card title="分公司列表" no-padding class="auto-card">
            <BranchCompanyList
              ref="branchCompanyList"
              :loading="loading"
              :list="companyList"
              :seletion-index.sync="seletionIndex"
              :keyScope="keyScopes.branchCompanyList"
              @seletionChange="handleBranchCompanyListSeletionChange"
              @hotkeysUp="bindKeyScope"
            />
          </ht-card>
        </el-col>
        <el-col
          :span="18"
          style="display: flex; height: 100%;"
          @click.stop.native="setKeyScope(keyScopes.accountList)"
        >
          <ht-card title="账户列表" no-padding class="auto-card">
            <AccountList
              ref="AccountList"
              :loading.sync="loading"
              :seletion="seletion"
              :keyScope="keyScopes.accountList"
              @hotkeysUp="bindKeyScope"
              @rows-change="handleAccountListRowsChange"
              @readCashierWater="readCashierWaterHandle"
            />
          </ht-card>
        </el-col>
      </el-row>
    </ht-card>

    <AccountAddBox
      :visible.sync="showAccountAddBox"
      :companyData="companyData"
      :accountData="accountData"
      :isEdit="isEdit"
      @on-success="loadAccountsData"
    />
    <AccountOpeningBox
      :visible.sync="showAcountOpeningBox"
      :companyData="companyData"
      @on-success="loadData"
    />
    <CashierWaterBox
      :visible.sync="showCashierWaterBox"
      :companyFundAccount="companyFundAccount"
    />
  </div>
</template>

<script>
import hotkeys from "hotkeys-js";
import {
  deleteCompanyFundAccount,
  getFinancialsCompanys
} from "@/api/finance/basicSetting";
import { searchMixin } from "@/mixins";
import BranchCompanyList from "./components/BranchCompanyList";
import AccountList from "./components/AccountList";
import AccountOpeningBox from "./components/AccountOpeningBox";
import AccountAddBox from "./components/AccountAddBox";
import CashierWaterBox from "./components/CashierWaterBox";
import VideoPopover from "@/components/VideoPopover";

export default {
  name: "CompanyFundAccount",
  components: {
    BranchCompanyList,
    AccountList,
    AccountOpeningBox,
    AccountAddBox,
    CashierWaterBox,
    VideoPopover
  },
  mixins: [searchMixin],
  data() {
    return {
      keyScopes: {
        branchCompanyList: Symbol("companyFundBranchCompanyList"),
        accountList: Symbol("companyFundAccountsList")
      },
      loading: false,
      companyList: [],
      seletion: {},
      seletionIndex: 0,
      selectedRows: [],
      showAccountAddBox: false,
      isEdit: false,
      accountData: {},
      companyData: {},
      showAcountOpeningBox: false,
      showCashierWaterBox: false,
      companyFundAccount: {},
      videoUrl: "https://dl.hztl3.com/videos/yp_videos/fund_accounts.mp4",
      videoPopoverRemark:
        "资金账户设置页面，用于管理各个分公司的资金账户，提供期初开帐功能。"
    };
  },
  computed: {
    canCreate() {
      return this.seletion.id && this.hasBelongsPerm("create");
    },
    canDelete() {
      return (
        this.selectedRows.length &&
        this.hasBelongsPerm("deleteDisable", this.selectedRows[0].belongs)
      );
    },
    canUpdate() {
      return (
        this.selectedRows.length &&
        this.hasBelongsPerm("update", this.selectedRows[0].belongs)
      );
    },
    canOpen() {
      return !this.seletion.isOpened;
    }
  },
  async mounted() {
    await this.loadData();
    this.setKeyScope(this.keyScopes.branchCompanyList);
  },
  methods: {
    bindKeyScope(e) {
      switch (e.key) {
        case "F2":
          this.createHandle();
          break;
        case "F3":
          this.updateHandle();
          break;
        case "F4":
          this.deleteHandle();
          break;
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
    handleAccountListRowsChange(rows) {
      this.selectedRows = rows || [];
    },
    openHandle() {
      if (!this.canOpen || this.loading) return;
      this.showAcountOpeningBox = true;
    },
    createHandle() {
      if (!this.canCreate || this.loading) return;
      this.isEdit = false;
      this.showAccountAddBox = true;
    },
    updateHandle() {
      if (!this.updateHandle || this.loading) return;
      this.isEdit = true;
      this.accountData = { ...this.selectedRows[0] };
      this.showAccountAddBox = true;
    },
    deleteHandle() {
      if (!this.canDelete || this.loading) return;
      this.$confirm("确定要删除该账户吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          deleteCompanyFundAccount({ ids: [this.selectedRows[0].id] })
            .then(() => {
              this.$message({
                message: "删除账户成功!",
                type: "success",
                showClose: true
              });
              this.loading = false;
              this.loadAccountsData();
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {});
    },
    loadAccountsData() {
      this.$refs.AccountList && this.$refs.AccountList.loadData();
    },
    readCashierWaterHandle(row) {
      this.companyFundAccount = {
        companyId: this.seletion.id,
        companyName: this.seletion.name,
        fundAccountId: row.id,
        fundAccountName: row.fundAccountName
      };
      this.showCashierWaterBox = true;
    }
  }
};
</script>

<style lang="stylus" scoped>
.container-box .el-form-item {
    margin-bottom: 0;
}
</style>
