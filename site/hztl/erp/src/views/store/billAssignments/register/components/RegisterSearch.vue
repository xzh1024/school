<template>
  <ht-card>
    <el-form
      :model="searchForm"
      class="form-item-small-margin-bottom"
      label-position="left"
      label-width="60px"
      size="mini"
    >
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label-width="98px">
            <ht-select
              slot="label"
              v-model="searchForm.dateType"
              :options="dateTypes"
              :clearable="false"
              class="date-label"
            />
            <ht-date-range
              v-model="searchForm.timeRange"
              shortcuts-type="all"
            />
          </el-form-item>
          <el-form-item label="单据状态" prop="status" label-width="98px">
            <ht-select
              v-model="searchForm.status"
              :options="warehouseStatusOptions"
              clearable
              collapse-tags
              filterable
              multiple
              has-selecte-all-val
              placeholder="请选择"
            />
          </el-form-item>
          <el-form-item label="单据号" prop="billNo" label-width="98px">
            <ht-input v-model="searchForm.billNo" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="业务公司" prop="companyIds">
            <ht-select
              v-model="searchForm.companyIds"
              :options="currentCompanies"
              clearable
              filterable
              multiple
              has-selecte-all-val
              collapse-tags
            />
          </el-form-item>
          <el-form-item label="货主公司" prop="ownerCompanyIds">
            <ht-select
              v-model="searchForm.ownerCompanyIds"
              :options="currentCompanies"
              clearable
              filterable
              multiple
              has-selecte-all-val
              collapse-tags
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item
            label="仓储公司"
            prop="storageCompanyIds"
            label-width="80px"
          >
            <ht-select
              v-model="searchForm.storageCompanyIds"
              :options="storageCompanyOptions"
              clearable
              filterable
              multiple
              has-selecte-all-val
              collapse-tags
            />
          </el-form-item>
          <el-form-item prop="ownerCompanyIds" label-width="80px">
            <ht-select
              slot="label"
              v-model="oppositeCompanyTypeValue"
              :options="oppositeCompanyType"
              :clearable="false"
              class="date-label"
            />

            <ht-autoselect
              v-model="oppositeCompanyName"
              :fetch-suggestions="syncFetchSearch"
              :trigger-on-focus="false"
              filterZero
              remote
              multiple
              clearable
              collapse-tags
              filterable
              has-selecte-all-val
              highlight-first-item
              placeholder="请选择"
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="仓库" prop="warehouseId" label-width="98px">
            <ht-select
              v-model="searchForm.warehouseIds"
              :options="warehouseOptions"
              clearable
              filterable
              multiple
              has-selecte-all-val
              collapse-tags
            />
          </el-form-item>
          <el-form-item label="打印状态" prop="printStatus" label-width="98px">
            <ht-select
              v-model="searchForm.printStatus"
              :options="printStatusOptions"
              placeholder="打印状态"
              clearable
              filterable
              multiple
              has-selecte-all-val
              collapse-tags
            />
          </el-form-item>
          <div style="text-align: right;">
            <el-button type="primary" size="mini" @click.stop="searchData">
              查询（F5）
            </el-button>
            <el-button type="primary" size="mini" @click.stop="resetParams">
              重置（F6）
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </ht-card>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Emit, Watch } from "vue-property-decorator";
import SearchMixin from "@/mixins/searchMixin";
import { SearchFormModule, SelectSearchModel, PersonModel } from "../interface";
import {
  WAREHOUSE_STATUS_ENUM,
  PRINT_STATUS_ENUM,
  OPPOSITE_COMPANY_TYPE_ENUM,
  OPPOSITE_TYPE
} from "../interface/enum";
import registerService from "../services/registerService";
import { selectCompanys } from "@/api/company/company";
import { searchAllCooperators } from "@/api/communion/communion";
@Component({ name: "RegisterSearch" })
export default class RegisterSearch extends Mixins(SearchMixin) {
  @Prop() searchForm!: SearchFormModule;
  @Emit("handleSearch") handleSearch() {}
  @Emit("handleReset") handleReset() {
    this.oppositeCompanyName = [];
  }

  private dateTypes: Array<string> = ["出/入库日期", "业务日期"];
  private warehouseStatusOptions = WAREHOUSE_STATUS_ENUM;
  private printStatusOptions = PRINT_STATUS_ENUM;
  private oppositeCompanyType = OPPOSITE_COMPANY_TYPE_ENUM;
  private storageCompanyOptions: PersonModel[] = [];
  private warehouseOptions: PersonModel[] = [];
  private oppositeCompanyTypeValue: OPPOSITE_TYPE = "oppositeCompanyIds";
  private oppositeCompanyName = [];

  get currentCompanies() {
    return this.$store.state.admin.baseData.companies;
  }

  @Watch("oppositeCompanyName")
  companyNameChange(companyIds: number) {
    this.searchForm.oppositeCompanyIds = [];
    this.searchForm.oppositeCooperatorIds = [];
    if (typeof companyIds != "number") return;
    this.searchForm[this.oppositeCompanyTypeValue].push(companyIds);
  }
  @Watch("oppositeCompanyTypeValue")
  oppositeCompanyTypeValueChange() {
    this.oppositeCompanyName = [];
  }
  public created() {
    this.getStorageCompany();
    this.getWarehouses();
  }

  private searchData() {
    this.handleSearch();
  }
  private resetParams() {
    this.handleReset();
  }

  private async getStorageCompany(query = "") {
    const params: SelectSearchModel = { name: query };
    registerService.getStorageCompany(params).then((res: PersonModel[]) => {
      this.storageCompanyOptions = res || [];
    });
  }
  private async getWarehouses(query = "") {
    const params: SelectSearchModel = { name: query };
    registerService.getWarehouses(params).then((res: PersonModel[]) => {
      this.warehouseOptions = res || [];
    });
  }
  //searchLoadAllSupplierCooperators
  private async syncFetchSearch(kw: string) {
    if (!this.oppositeCompanyTypeValue) return;
    const searchFn =
      this.oppositeCompanyTypeValue == "oppositeCompanyIds"
        ? selectCompanys
        : searchAllCooperators;
    return (await searchFn({ type: "", kw })) || [];
  }
}
</script>
