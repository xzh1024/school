<template>
  <ht-card title="热门品牌" describe="众多热门车型品牌来袭">
    <div slot="after-title" class="title-right">
      <ht-pagination
        :currentPage.sync="queryParams.page"
        :total="total.size"
        :pageCount="total.page"
        @current-change="getDatas"
      ></ht-pagination>
      <el-button type="primary" size="mini" round @click="handlePath"
        >查看全部</el-button
      >
    </div>
    <div class="brand-list clearfix">
      <template v-for="(item, index) in list">
        <brand-double
          v-if="index === 0"
          :key="item.swPartId"
          :info="item"
        ></brand-double>
        <brand-item
          v-if="index > 0 && index < 29"
          :key="item.swPartId"
          :info="item"
        ></brand-item>
      </template>
    </div>
  </ht-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { HtCard, HtPagination } from "@/components/hztl";
import BrandItem from "@/views/brand/components/brandItem/index";
import BrandDouble from "@/views/brand/components/brandItem/brandDouble";
import { PageResponseResult } from "@/common/interface/commonInterface";
import { BrandModel, BrandParams } from "@/common/interface/brandInterface";
import { BrandService } from "@/common/services/brandService";
const brandService = new BrandService();

@Component({
  name: "BrandTemplate",
  components: {
    HtCard,
    HtPagination,
    BrandItem,
    BrandDouble
  }
})
export default class BrandTemplate extends Vue {
  protected list: BrandModel[] = [];

  protected queryParams: BrandParams = {
    page: 1,
    pageSize: 29
  };

  protected total = {
    size: 0,
    page: 1
  };

  protected handlePath() {
    this.$router.push({ path: "/brand" });
  }

  public getDatas() {
    const params = {
      ...this.queryParams
    };
    brandService
      .getBrands(params)
      .then((res: PageResponseResult<BrandModel[]>) => {
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

  created() {
    this.getDatas();
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
.brand-list {
  box-sizing: border-box;
  width: 100%;
  // height: 264px;
  height: 528px;
  .brand-item,
  .brand-double {
    float: left;
  }
}
</style>
