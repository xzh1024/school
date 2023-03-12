<template>
  <ht-card>
    <el-form
      ref="searchFormRef"
      :model="searchForm"
      label-width="60px"
      label-position="left"
      size="mini"
      class="form-item-small-margin-bottom"
    >
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label-width="75px">
            <ht-select
              slot="label"
              v-model="searchForm.dateType"
              :options="dateTypes"
              :clearable="false"
              class="date-label"
            />
            <ht-date-range v-model="searchForm.billDate" shortcuts-type="all" />
          </el-form-item>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="业务类型" label-width="75px">
                <ht-select
                  v-model="searchForm.sourceTypes"
                  :options="sourceTypes"
                  :clearable="false"
                  multiple
                  collapse-tags
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="配件名称" prop="partName" label-width="75px">
                <ht-autocomplete
                  v-model="searchForm.partName"
                  :fetch-suggestions="autocompleteSearchPartName"
                  :trigger-on-focus="false"
                  placeholder="配件名称"
                  clearable
                  highlight-first-item
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="业务单号" prop="billNo" label-width="75px">
                <ht-input
                  v-model="searchForm.billNo"
                  placeholder="急件到货单号/销售单号/维修工单号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="配件编码" prop="code" label-width="75px">
                <ht-input v-model="searchForm.code" placeholder="配件编码" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5">
          <el-form-item label="配件品牌" prop="brand">
            <ht-autoselect
              v-model="searchForm.brand"
              :options="store().partBrandDictionary()"
              :trigger-on-focus="false"
              placeholder="配件品牌"
              clearable
              highlight-first-item
            />
          </el-form-item>
          <el-form-item label="产地" prop="productionPlace">
            <ht-autoselect
              v-model="searchForm.productionPlace"
              :options="store().productionPlaceDictionary()"
              :trigger-on-focus="false"
              placeholder="产地"
              clearable
              highlight-first-item
            />
          </el-form-item>
          <el-form-item label="规格" prop="model">
            <ht-input v-model="searchForm.model" placeholder="规格" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="供应商" prop="cooperatorName">
            <ht-autocomplete
              v-model="searchForm.cooperatorName"
              :fetch-suggestions="autocompleteSearchAllSuppliers"
              :trigger-on-focus="false"
              clearable
              highlight-first-item
              placeholder="供应商"
            />
          </el-form-item>
          <el-form-item label="单据状态" prop="status">
            <ht-select
              v-model="searchForm.status"
              :options="statusOptions"
              clearable
              collapse-tags
              filterable
              multiple
              has-selecte-all-val
              placeholder="请选择"
            />
          </el-form-item>
          <div style="text-align: right">
            <el-button type="primary" size="mini" @click.stop="searchHandle">
              查询（F5）
            </el-button>
            <el-button type="primary" size="mini" @click.stop="resetHandle">
              重置（F6）
            </el-button>
          </div>
        </el-col>
        <!-- <el-col :span="4">
          <el-form-item class="placeholder-form-item">
            <br class="placeholder-form-item" />
          </el-form-item>
          <el-form-item class="placeholder-form-item">
            <br class="placeholder-form-item" />
          </el-form-item>

        </el-col>
        <el-col :span="3">
          <span
            class="text-danger"
            style="cursor:pointer;float:right"
            @click.stop="openManualDialog"
            ><i class="el-icon-question"></i>如何使用急件处理</span
          >
        </el-col> -->
      </el-row>
    </el-form>
  </ht-card>
</template>

<script>
import { PURCHASE_URGENT_STATUS } from "@/constants/states/purchase";
import { searchMixin } from "@/mixins";
import eventBus from "@/event";
import baseIndexJump from "@/utils/baseIndexJump";
import { mapGetters } from "vuex";
import * as store from "@/utils/store";

const defaultSearchForm = {
  dateType: "bill",
  billDate: [],
  sourceTypes: ["销售单", "维修工单"],
  billNo: "",
  code: "",
  partName: "",
  brand: "",
  productionPlace: "",
  model: "",
  cooperatorName: "",
  status: Object.keys(PURCHASE_URGENT_STATUS).map(item => Number(item))
};

export default {
  name: "SearchForm",
  mixins: [searchMixin],
  data() {
    return {
      statusOptions: PURCHASE_URGENT_STATUS,
      searchForm: {
        ...defaultSearchForm
      },
      dateTypes: [
        { id: "bill", name: "业务日期" },
        { id: "create", name: "制单日期" }
      ],
      sourceTypes: [
        { id: "销售单", name: "销售单" },
        { id: "维修工单", name: "维修工单" }
      ]
    };
  },
  computed: {
    ...mapGetters("admin/systemParams", ["billQueryDefaultDateRange"])
  },
  watch: {
    $route(to, from) {
      if (
        to.path === "/PurchaseDispatch" &&
        to.query.tabName === "Settlement" &&
        to.query.time &&
        to.query.time !== from.query.time
      ) {
        this.toDoHandle();
      }
    },
    billQueryDefaultDateRange(val) {
      defaultSearchForm.billDate = val;
      this.searchForm.billDate = val;
    }
  },
  mounted() {
    defaultSearchForm.billDate = this.billQueryDefaultDateRange;
    this.resetHandle();
  },
  activated() {
    this.toDoHandle();
  },
  methods: {
    store() {
      return store;
    },
    toDoHandle() {
      const { jumpId, jumpData } = baseIndexJump.getInfo();
      if (jumpId === "submitOrReceivePurchaseDispatch" && jumpData) {
        this.searchForm = {
          ...defaultSearchForm,
          billNo: jumpData,
          billDate: []
        };
        this.$emit("get-jump-id", jumpId);
        baseIndexJump.clearInfo();
        this.searchHandle();
      } else {
        const query = this.$route.query;
        if (query && query.status && query.status.length) {
          const status = query.status.map(item => Number(item));
          //拼接初始化查询条件
          this.searchForm.status = Object.keys(PURCHASE_URGENT_STATUS)
            .map(item => Number(item))
            .filter(item => status.includes(item));
        }
        this.$nextTick(() => {
          this.searchHandle();
        });
      }
    },
    openManualDialog() {
      eventBus.$emit("open-manual-dialog", 28);
    },
    getSearchReq(page, pageSize) {
      const req = {
        ...this.searchForm,
        cooperatorId: (
          this.searchedData.suppliers.find(
            item => item.name === this.searchForm.cooperatorName
          ) || {}
        ).id
      };
      req.page = page || 1;
      req.pageSize = pageSize || 10;
      if (req.billDate && req.billDate.length) {
        if (req.dateType == "bill") {
          req.billDateStart = req.billDate[0];
          req.billDateEnd = req.billDate[1];
          delete req.createdAtStart;
          delete req.createdAtEnd;
        } else {
          req.createdAtStart = req.billDate[0];
          req.createdAtEnd = req.billDate[1];
          delete req.billDateStart;
          delete req.billDateEnd;
        }
      }
      delete req.billDate;
      return req;
    },
    searchHandle() {
      this.$emit("search");
    },
    resetHandle() {
      this.searchForm = { ...defaultSearchForm };
    }
  }
};
</script>
