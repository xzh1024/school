<template>
  <section class="container-box wrap flex-container column-flex">
    <ul class="collect-box">
      <li v-for="(item, index) in commonUseList" :key="index">
        <div
          :class="{
            'icon-img-main-1': index % 1 == 0,
            'icon-img-main-2': index % 2 == 0,
            'icon-img-main-3': index % 3 == 0,
            'icon-img-main-4': index % 4 == 0
          }"
          class="icon-main-box"
          @click="$router.push({ path: item.path })"
          :title="item.text.length > 5 ? item.text : ''"
        >
          <i
            class="menu-icon"
            :class="item.icons ? item.icons : 'icon-img-workbench-white'"
          />
          <p class="collect-name">{{ item.text }}</p>
        </div>
      </li>
    </ul>
    <div class="base-index-box auto-block">
      <div class="base-index-left">
        <ht-card
          v-loading="loading"
          title="待办事项"
          no-padding
          class="auto-card"
        >
          <div slot="after-title" class="flex flex-col-end flex-row-center">
            <div>来源公司：</div>
            <div style="width:260px">
              <ht-select
                size="mini"
                v-model="companyIds"
                :options="store().allCompanies()"
                filterable
                multiple
                collapse-tags
                @change="companyIdsChange"
                has-selecte-all-val
              />
            </div>
          </div>
          <ht-tabs
            v-model="activeTab"
            :tabs="filterTabList"
            class="ht-tabs tabs-regular"
            @change="changeTab"
          />
          <div class="btn-container">
            <el-button size="mini" type="primary" @click="refreshHandle">
              刷新
            </el-button>
          </div>
          <ht-setting-table
            :data="tableData"
            :columns="tableColumns"
            :tableName="tableName"
            :total="totalSize"
            :current-page="currentPage"
            pagination
            style="height: calc(100% - 35px);"
            @pageChange="pageChange"
            @rowOperation="handleDeal"
          />
        </ht-card>
      </div>
      <div class="base-index-right">
        <ht-tabs
          v-model="activeTabs"
          :tabs="tabLists"
          class="tabs-primary tabs-large"
        />
        <div v-if="activeTabs == 'oa'" style="height: calc( 100% - 45px)">
          <!-- OA审批 -->
          <SystemOfficeAutomation class="base-index-right-oa">
          </SystemOfficeAutomation>
          <ht-card
            no-padding
            class="no-margin oa-box"
            title="发现商机"
            style="height:245px"
          >
            <Banner class="base-index-right-banner"></Banner>
          </ht-card>
        </div>
        <div v-if="activeTabs == 'wx'" style="height: calc( 100% - 45px)">
          <repaireKanban></repaireKanban>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {
  workBenchListMenu,
  workBenchMenuTableList,
  workBenchMenuTabsCount,
  deleteNotices
} from "@/api/workbench";
import { NOTICE_TYPE } from "@/constants";
import { tabChangeMixin } from "@/mixins";
import { noticeSolve } from "@/mixins";
import { mapState } from "vuex";
import { CELL_WIDTH } from "@/constants";
import SystemOfficeAutomation from "@/views/officeAutomation/officeAutomationApproval/system/systemOfficeAutomation";
import Banner from "./components/banner";
import repaireKanban from "./components/repaireKanban";
import { userMsg } from "@/utils/store";
import { uiConfig } from "envConfigPath";
import * as store from "@/utils/store";
export default {
  name: "BaseIndex",
  components: {
    SystemOfficeAutomation,
    Banner,
    repaireKanban
  },
  mixins: [tabChangeMixin, noticeSolve],
  data() {
    return {
      uiConfig,
      defaultTab: "toDo",
      loading: false,
      tabsCount: {},
      tableData: [],
      tableName: "BaseIndexNoticeList",
      totalSize: null,
      commonUseList: [],
      tabMenuList: [],
      secondsMenus: [],
      activeTabs: "oa",
      tabLists: [],
      columns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "category",
          label: "待办类型",
          width: 80,
          formatter: value => {
            return NOTICE_TYPE[value];
          }
        },
        { prop: "content", label: "待办内容", width: 430 },
        {
          prop: "controls",
          label: "操作",
          type: "controls",
          width: 130,
          cantExport: true
        }
      ],
      currentPage: 1,
      reportsInfo: {},
      reportType: {
        1: "management",
        2: "financial",
        3: "sales",
        4: "purchase",
        5: "store_houses"
      },
      companyIds: []
    };
  },
  computed: {
    ...mapState("admin", {
      menuListAside: state => state.menu.menuListAside,
      pageSizes: state => state.table.pageSize,
      openedPlatform: state => state.user.userInfoMsg.openedPlatform
    }),
    tabList() {
      const arr = [
        {
          id: "toDo",
          name: "全部",
          render: name => (
            <span>
              {name}
              <el-badge
                value={this.tabsCount.toDo}
                max={99}
                hidden={!this.tabsCount.toDo}
              />
            </span>
          )
        },
        {
          id: "sales",
          name: "销售",
          render: name => (
            <span>
              {name}
              <el-badge
                value={this.tabsCount.sales}
                max={99}
                hidden={!this.tabsCount.sales}
              />
            </span>
          )
        },
        {
          id: "purchases",
          name: "采购",
          render: name => (
            <span>
              {name}
              <el-badge
                value={this.tabsCount.purchases}
                max={99}
                hidden={!this.tabsCount.purchases}
              />
            </span>
          )
        },
        {
          id: "allocation",
          name: "调拨",
          render: name => (
            <span>
              {name}
              <el-badge
                value={this.tabsCount.allocation}
                max={99}
                hidden={!this.tabsCount.allocation}
              />
            </span>
          )
        },
        {
          id: "transaction",
          name: "交易",
          render: name => (
            <span>
              {name}
              <el-badge
                value={this.tabsCount.transaction}
                max={99}
                hidden={!this.tabsCount.transaction}
              />
            </span>
          )
        },
        {
          id: "financials",
          name: "出纳",
          render: name => (
            <span>
              {name}
              <el-badge
                value={this.tabsCount.financials}
                max={99}
                hidden={!this.tabsCount.financials}
              />
            </span>
          )
        },
        {
          id: "storage",
          name: "仓储",
          render: name => (
            <span>
              {name}
              <el-badge
                value={this.tabsCount.storage}
                max={99}
                hidden={!this.tabsCount.storage}
              />
            </span>
          )
        },
        {
          id: "personnel",
          name: "人事",
          render: name => (
            <span>
              {name}
              <el-badge
                value={this.tabsCount.personnel}
                max={99}
                hidden={!this.tabsCount.personnel}
              />
            </span>
          )
        }
      ];
      if (userMsg().hasYx) {
        arr.push({
          id: "repair",
          name: "维修",
          render: name => (
            <span>
              {name}
              <el-badge
                value={this.tabsCount.repair}
                max={99}
                hidden={!this.tabsCount.repair}
              />
            </span>
          )
        });
      }
      return arr;
    },
    filterTabList() {
      return this.tabList.filter(
        item => item.name === "全部" || this.hasCompletePerm(item.id)
      );
    },
    tableColumns() {
      const handleDeal = (row, e) => {
        e.stopPropagation();
        this.handleDeal(row);
      };
      return this.columns.map(item => {
        if (item.type === "controls") {
          return {
            ...item,
            render: (value, row) => (
              <el-dropdown
                split-button
                type="primary"
                size="mini"
                on-click={e => handleDeal(row, e)}
                on-command={() => this.deleteItem(row)}
              >
                前往处理
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>删除待办</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            )
          };
        }
        return item;
      });
    }
  },
  watch: {
    menuListAside(arr) {
      this.filterMenus(arr);
    },
    activeTab() {
      this.refreshHandle();
    }
  },
  created() {
    // 电装就不改tilte了吧
    if (!(uiConfig && uiConfig.uiTheme === "denso")) {
      document.title = userMsg().hasYx
        ? "思锐云修管家--全力打造的下一代智能轻量汽配SAAS系统"
        : "思锐云配管家--卖配件，用云配管家！全力打造的下一代智能轻量汽配SAAS系统";
    }
    if (
      userMsg().hasYx &&
      (this.hasBelongsPermWithoutRoute("read", "workbench.retainVehicle") ||
        this.hasBelongsPermWithoutRoute("read", "workbench.repairStatistic"))
    ) {
      this.tabLists = [
        { id: "wx", name: "维修看板" },
        { id: "oa", name: "OA审批" }
      ];
      this.activeTabs = "wx";
    } else {
      this.tabLists = [{ id: "oa", name: "OA审批" }];
      this.activeTabs = "oa";
    }
  },
  mounted() {
    this.companyIds = [store.userInfoMsg().companyId];
    this.filterMenus(this.menuListAside);
  },
  methods: {
    store() {
      return store;
    },
    refreshHandle() {
      this.loadTabsCount();
      this.currentPage = 1;
      this.loadList();
    },
    loadTabsCount() {
      this.loading = true;
      workBenchMenuTabsCount({ companyIds: this.companyIds })
        .then(res => {
          this.tabsCount = {
            toDo: res.toDo,
            sales: res.sales,
            purchases: res.purchases,
            transaction: res.transaction,
            financials: res.financials,
            storage: res.storage,
            personnel: res.personnel,
            allocation: res.allocation,
            repair: res.repair
          };
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    companyIdsChange() {
      this.loadList();
      this.loadTabsCount();
    },
    loadList() {
      this.loading = true;
      workBenchMenuTableList({
        type: this.activeTab,
        page: this.currentPage,
        pageSize: this.pageSizes,
        companyIds: this.companyIds
      })
        .then(res => {
          this.tableData = res.rows || [];
          this.totalSize = res.totalSize;
          this.tabsCount[this.activeTab] = res.totalSize;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    pageChange(page) {
      this.currentPage = page;
      this.loadList();
    },
    handleDeal(row) {
      if (!row.id) return;
      this.goRouteFromNotice(row);
    },
    deleteItem(row) {
      if (!row.id) return;
      this.loading = true;
      deleteNotices(row.id)
        .then(() => {
          this.loading = false;
          this.$message({
            type: "success",
            message: "删除待办成功！",
            showClose: true
          });
          this.loadList();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    loadMenus() {
      workBenchListMenu().then(data => {
        this.commonUseList = [];
        const commonUseList = data.commonMenus || [];
        if (commonUseList && commonUseList.length) {
          commonUseList.forEach(item => {
            const _routerItem = this.secondsMenus.find(
              child => child.path == item
            );
            if (_routerItem) {
              this.commonUseList.push({
                name: _routerItem.name,
                path: _routerItem.path,
                icons: _routerItem.icons,
                meta: _routerItem.meta,
                text:
                  (_routerItem.meta &&
                    (_routerItem.meta.tagName || _routerItem.meta.title)) ||
                  _routerItem.name
              });
            }
          });
        }
      });
    },
    filterMenus(arr) {
      this.tabMenuList = arr;
      this.tabMenuList.forEach(child => {
        if (child.children && child.children.length) {
          child.children.forEach(item => {
            item.icons = child.icons || "";
            item.disabled = false;
            this.secondsMenus.push(item);
          });
        }
      });
      this.loadMenus();
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .base-index-box {
    width: 100%;
    min-width: 1260px;
    padding: 5px;
    .el-select__tags-text {
      white-space: nowrap;
      overflow: hidden;
      display: inline-block;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      max-width: 140px;
      vertical-align: middle;
    }
    .el-tag__close {
      display: inline-block;
      vertical-align: middle;
    }
    .base-index-left {
      float: left;
      width: 52%;
      height: 100%;
      position: relative;
      ::v-deep.el-card__body {
        height: 100%;
      }
      .btn-container {
        position: absolute;
        top: 40px;
        right: 10px;
        text-align: center;
        width: 57px;
      }
    }
    .base-index-right {
      float: left;
      width: calc(48% - 5px);
      height: 100%;
      margin-left: 5px;
      .base-index-right-oa {
        margin: 5px 0 !important;
        height: calc(100% - 250px);
      }
    }
    ::v-deep .auto-card {
      position: relative;
      margin: 0 !important;
    }
    .btn-container {
      position: absolute;
      top: 40px;
      right: 10px;
      text-align: center;
      width: 57px;
    }
    .base-index-right-oa {
      margin: 0 0 0 5px !important;
      flex: 1;
    }
    .base-index-right-banner-container {
      margin: 5px 0 0 5px !important;
      .base-index-right-banner {
        height: 208px;
      }
    }
    .oa-box {
      .el-card__body {
        height: 208px;
      }
    }
  }
}

::v-deep.collect-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 5px 5px 0;
  margin: 0px;

  li {
    margin-right: 4px;
    color: #fff;
    cursor: pointer;

    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .collect-name {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
    }
  }
}
</style>
