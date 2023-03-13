<template>
  <ht-card icon="icon-title-company" describe="不光是品质还有服务">
    <div slot="after-title" class="title-right">
      <ht-pagination
        :currentPage.sync="queryParams.page"
        :total="total.size"
        :pageCount="total.page"
        @current-change="getDatas"
      ></ht-pagination>
      <el-button
        type="primary"
        size="mini"
        round
        @click="handlePath"
        class="gradients-button"
        >进入商家黄页</el-button
      >
    </div>
    <div class="company-list clearfix">
      <company-item
        v-for="item in list"
        :key="item.companyId"
        :info="item"
      ></company-item>
    </div>
  </ht-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
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
  name: "CompanyTemplate",
  components: {
    HtCard,
    HtPagination,
    CompanyItem
  }
})
export default class CompanyTemplate extends Vue {
  @Prop() params!: CompanyParams;

  protected list: CompanyModel[] = [];

  protected queryParams: CompanyParams = {
    page: 1,
    pageSize: 10,
    orderByAreas: []
  };

  protected total = {
    size: 0,
    page: 1
  };

  protected handlePath() {
    this.$router.push({ path: "/company" });
  }

  public getDatas() {
    const params = {
      ...this.queryParams,
      ...this.params
    };
    companyService
      .getCompanies(params)
      .then((res: PageResponseResult<CompanyModel[]>) => {
        if (res) {
          this.list = res.rows || [];
          this.total.size = res.totalSize || 0;
          this.total.page = res.totalPage || 1;
        }
      })
      .catch(() => {
        this.list = [];
        this.queryParams.page = 1;
        this.total.size = 0;
        this.total.page = 1;
      });
  }
}
</script>

<style lang="scss" scoped>
.title-right {
  display: flex;
  align-items: center;
  .ht-pagination {
    margin-right: $margin-size-main;
  }
}
.company-list {
  box-sizing: border-box;
  width: 100%;
  height: 582px;
  padding: 16px 2px 8px 16px;
  .company-item,
  .company-double {
    float: left;
    margin-right: 14px;
    margin-bottom: $margin-size-main;
  }
}
</style>
