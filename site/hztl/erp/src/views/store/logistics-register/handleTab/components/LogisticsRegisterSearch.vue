<template>
  <el-form
    :model="searchForm"
    class="form-item-small-margin-bottom"
    label-position="left"
    label-width="60px"
    size="mini"
  >
    <el-row :gutter="10">
      <el-col :span="6">
        <el-form-item label-width="75px">
          <ht-select
            slot="label"
            v-model="searchForm.dateType"
            :options="dateTypes"
            :clearable="false"
            class="date-label"
          />
          <ht-date-range v-model="searchForm.timeRange" shortcuts-type="all" />
        </el-form-item>
        <el-form-item
          label="物流公司"
          prop="logisticsCompanyId"
          label-width="75px"
        >
          <ht-autoselect
            v-model="searchForm.logisticsCompanyId"
            :fetch-suggestions="
              query => searchLoadAllLogisticsCooperators(query)
            "
            :trigger-on-focus="false"
            remote
            clearable
            filter-zero
            highlight-first-item
          />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="往来单位" prop="cooperatorId">
          <ht-autoselect
            v-model="searchForm.cooperatorId"
            :fetch-suggestions="query => searchLoadAllTypesCooperators(query)"
            :trigger-on-focus="false"
            remote
            clearable
            filter-zero
            highlight-first-item
          />
        </el-form-item>
        <el-form-item label="运单号" prop="freightNo">
          <ht-input v-model="searchForm.freightNo" />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="业务单号" prop="billNo">
          <ht-input v-model="searchForm.billNo" />
        </el-form-item>
        <el-form-item label="登记状态" prop="statuses">
          <ht-select
            v-model="searchForm.statuses"
            :options="LOGISTICS_REGISTER_STATUS"
            filterable
            multiple
            has-selecte-all-val
            collapse-tags
          />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="登记人" prop="createdBy">
          <ht-autoselect
            v-model="searchForm.createdBy"
            :options="store().allStaffs()"
            :trigger-on-focus="false"
            clearable
            filter-zero
            highlight-first-item
          />
        </el-form-item>
        <el-form-item v-if="isReceive" label="收货人" prop="receiverName">
          <ht-autocomplete
            v-model="searchForm.receiverName"
            :fetch-suggestions="autocompleteSearchStaffs"
            :trigger-on-focus="false"
            placeholder="收货人"
            clearable
            highlight-first-item
          />
        </el-form-item>
        <el-form-item v-else label="发货人" prop="senderName">
          <ht-autocomplete
            v-model="searchForm.senderName"
            :fetch-suggestions="autocompleteSearchStaffs"
            :trigger-on-focus="false"
            placeholder="发货人"
            clearable
            highlight-first-item
          />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item class="placeholder-form-item">
          <br class="placeholder-form-item" />
        </el-form-item>
        <div>
          <el-button type="primary" size="mini" @click.stop="searchHandle">
            查询（F5）
          </el-button>
          <el-button type="primary" size="mini" @click.stop="resetHandle">
            重置（F6）
          </el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import { dateFormat } from "@/utils/date";
import { searchMixin } from "@/mixins";
import { LOGISTICS_REGISTER_STATUS } from "@/constants";
import baseIndexJump from "@/utils/baseIndexJump";
import * as store from "@/utils/store";

const defaultSearchForm = {
  dateType: 0,
  timeRange: [],
  logisticsCompanyId: null,
  cooperatorId: null,
  freightNo: "",
  billNo: "",
  statuses: Object.keys(LOGISTICS_REGISTER_STATUS).map(key => Number(key)),
  createdBy: null,
  senderName: "",
  receiverName: ""
};

export default {
  name: "LogisticsRegisterSearch",
  mixins: [searchMixin],
  props: {
    isReceive: Boolean
  },
  data() {
    return {
      LOGISTICS_REGISTER_STATUS,
      searchForm: {
        ...defaultSearchForm
      },
      dateTypes: ["登记日期", "发货日期"]
    };
  },
  computed: {
    ...mapGetters("admin/systemParams", ["billQueryDefaultDateRange"])
  },
  watch: {
    $route(to, from) {
      if (
        ["DeliverTab", "ReceiveTab"].includes(to.path) &&
        to.query.tabName === "Logistics" &&
        to.query.time &&
        to.query.time !== from.query.time
      ) {
        this.toDoHandle();
      }
    },
    billQueryDefaultDateRange(val) {
      defaultSearchForm.timeRange = val;
      this.searchForm.timeRange = val;
    }
  },
  mounted() {
    defaultSearchForm.timeRange = this.billQueryDefaultDateRange;
    this.resetHandle();
    this.toDoHandle();
  },
  methods: {
    store() {
      return store;
    },
    toDoHandle() {
      const { jumpId, jumpData } = baseIndexJump.getInfo();
      if (jumpId === "logisticsRegisterConfirmOrSignFor" && jumpData) {
        this.searchForm = {
          ...defaultSearchForm,
          billNo: jumpData,
          timeRange: []
        };
        baseIndexJump.clearInfo();
        this.searchHandle();
      } else {
        this.searchHandle();
      }
    },
    searchHandle() {
      let searchForm = { ...this.searchForm };
      if (searchForm.timeRange && searchForm.timeRange.length) {
        searchForm = {
          ...searchForm,
          startDate: dateFormat(searchForm.timeRange[0]),
          endDate: dateFormat(searchForm.timeRange[1])
        };
      }
      searchForm.timeRange = undefined;
      this.$emit("on-search", { ...searchForm });
    },
    resetHandle() {
      this.searchForm = { ...defaultSearchForm };
    },
    handelBaseIndexJump(id, billNo) {
      if (id === "logisticsRegisterConfirmOrSignFor") {
        this.searchForm = { ...defaultSearchForm, billNo };
        this.searchHandle();
      }
    }
  }
};
</script>
