<template>
  <ht-card title="商家">
    <div slot="after-title">
      <ht-pagination
        :currentPage.sync="queryParams.page"
        :total="total.size"
        :pageCount="total.page"
        @current-change="getCompanies"
      ></ht-pagination>
    </div>
    <div class="company-list clearfix">
      <template v-for="item in list">
        <company-item :key="item.companyId" :info="item"></company-item>
      </template>
    </div>
  </ht-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { HtCard, HtPagination } from "@/components/hztl";
import CompanyItem from "@/views/company/components/companyItem/index";
import { PageResponseResult } from "@/common/interface/commonInterface";
import {
  CompanyModel,
  CompanyParams
} from "@/common/interface/companyInterface";
import { CompanyService } from "@/common/services/companyService";
const companyService = new CompanyService();

@Component({
  name: "CompanyList",
  components: {
    HtCard,
    HtPagination,
    CompanyItem
  }
})
export default class CompanyList extends Vue {
  protected list: CompanyModel[] = [];

  protected queryParams: CompanyParams = {
    page: 1,
    pageSize: 9
  };

  protected total = {
    size: 0,
    page: 1
  };

  protected getCompanies() {
    companyService
      .getCompanies(this.queryParams)
      .then((res: PageResponseResult<CompanyModel[]>) => {
        // console.log(res);
        if (res) {
          this.list = res.rows || [];
          this.total.size = res.totalSize || 0;
          this.total.page = res.totalPage || 1;
        }
      });
  }

  created() {
    this.getCompanies();
  }
}
</script>

<style lang="scss" scoped>
.company-list {
  box-sizing: border-box;
  width: 100%;
  min-height: 582px;
  padding: 16px 2px 8px 16px;
  .company-item,
  .company-double {
    float: left;
    margin-right: 14px;
    margin-bottom: $margin-size-main;
  }
}
</style>
