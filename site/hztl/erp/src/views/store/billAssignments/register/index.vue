<template>
  <div class="container-box">
    <RegisterSearch
      :searchForm="searchForm"
      @handleSearch="handleSearch"
      @handleReset="handleReset"
    ></RegisterSearch>
    <ht-card no-padding class="no-margin">
      <ht-tabs
        v-model="activeTab"
        :tabs="tabs"
        class="tabs-regular"
        @change="changeTab"
      />
    </ht-card>
    <ht-card no-padding class="auto-card">
      <RegisterIn
        v-if="activeTab === 'RegisterIn'"
        ref="registerIn"
        :searchForm="searchForm"
        @updateTabsCount="updateTabsCount"
      ></RegisterIn>
      <RegisterOut
        v-if="activeTab === 'RegisterOut'"
        ref="registerOut"
        :searchForm="searchForm"
        @updateTabsCount="updateTabsCount"
      ></RegisterOut>
    </ht-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import RegisterSearch from "./components/RegisterSearch.vue";
import RegisterIn from "./registerIn/index.vue";
import RegisterOut from "./registerOut/index.vue";
import TabChangeMixin from "@/mixins/tabChangeMixin";
import PrecisionsFixed from "@/mixins/tabChangeMixin";
import { SearchFormModule, TabsCountModel } from "./interface";
import eventBus from "@/event";
import { namespace } from "vuex-class";
import { WAREHOUSE_STATUS_ENUM } from "./interface/enum";

const h = eventBus.$createElement;
const SystemParamsStore = namespace("admin/systemParams");
const searchForm: SearchFormModule = {
  dateType: 0,
  ownerCompanyIds: [],
  oppositeCooperatorIds: [],
  oppositeCompanyIds: [],
  timeRange: [],
  companyIds: [],
  storageCompanyIds: [],
  status: Object.keys(WAREHOUSE_STATUS_ENUM).map(item => Number(item)),
  billNo: "",
  warehouseIds: [],
  printStatus: []
};

@Component({
  name: "Register",
  components: {
    RegisterSearch,
    RegisterIn,
    RegisterOut
  }
})
export default class Register extends Mixins(TabChangeMixin, PrecisionsFixed) {
  get registerRef(): RegisterIn | RegisterOut {
    if (this.activeTab === "RegisterIn") {
      return this.$refs["registerIn"] as RegisterIn;
    } else {
      return this.$refs["registerOut"] as RegisterOut;
    }
  }

  @SystemParamsStore.Getter("billQueryDefaultDateRange")
  private billQueryDefaultDateRange!: [string, string];
  @Watch("billQueryDefaultDateRange")
  private onBillQueryDefaultDateRangeChange() {
    searchForm.timeRange = this.billQueryDefaultDateRange;
    this.searchForm.timeRange = this.billQueryDefaultDateRange;
  }

  handleSearch() {
    (this.registerRef as any).handlePageChange(1);
  }
  handleReset() {
    Object.assign(this.searchForm, JSON.parse(JSON.stringify(searchForm)));
  }
  public routeParamsName = "childTabName";
  public activeTab = "RegisterIn";
  public defaultTab = "RegisterIn";
  public tabsCount: TabsCountModel = {
    enter: 0,
    out: 0,
    max: 99
  };

  public updateTabsCount(data: TabsCountModel) {
    Object.assign(this.tabsCount, data);
  }
  public tabs = [
    {
      id: "RegisterIn",
      name: "入库单",
      render: (name: string) => {
        return h("span", {}, [
          name,
          h("el-badge", {
            attrs: {
              value: this.tabsCount.enter,
              max: this.tabsCount.max,
              hidden: !this.tabsCount.enter
            }
          })
        ]);
      }
    },
    {
      id: "RegisterOut",
      name: "出库单",
      render: (name: string) => {
        return h("span", {}, [
          name,
          h("el-badge", {
            attrs: {
              value: this.tabsCount.out,
              max: this.tabsCount.max,
              hidden: !this.tabsCount.out
            }
          })
        ]);
      }
    }
  ];

  public searchForm: SearchFormModule = { ...searchForm };

  mounted() {
    if (
      this.hasAutoPerm("register.in.read") &&
      !this.hasAutoPerm("register.out.read")
    ) {
      this.tabs = [
        {
          id: "RegisterIn",
          name: "入库单",
          render: (name: string) => {
            return h(
              "span",
              {
                // attrs: { id: "RegisterIn" },
              },
              [
                name,
                h("el-badge", {
                  attrs: {
                    value: this.tabsCount.enter,
                    max: this.tabsCount.max,
                    hidden: !this.tabsCount.enter
                  }
                })
              ]
            );
          }
        }
      ];
      this.defaultTab = "RegisterIn";
      this.activeTab = "RegisterIn";
      this.changeTab();
    } else if (
      this.hasAutoPerm("register.out.read") &&
      !this.hasAutoPerm("register.in.read")
    ) {
      this.tabs = [
        {
          id: "RegisterOut",
          name: "出库单",
          render: (name: string) => {
            return h("span", {}, [
              name,
              h("el-badge", {
                attrs: {
                  value: this.tabsCount.out,
                  max: this.tabsCount.max,
                  hidden: !this.tabsCount.out
                }
              })
            ]);
          }
        }
      ];
      this.defaultTab = "RegisterOut";
      this.activeTab = "RegisterOut";
      this.changeTab();
    }
    searchForm.timeRange = this.billQueryDefaultDateRange;
    this.handleReset();
  }
}
</script>

<style lang="scss" scoped>
.container-box {
  & > .no-margin {
    margin-bottom: 0 !important;
  }
}
</style>
