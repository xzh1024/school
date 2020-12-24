<template>
  <ht-card title="热门品牌" describe="众多热门车型品牌来袭">
    <div slot="after-title" class="title-right">
      <ht-pagination
        :currentPage.sync="queryParams.page"
        :total="total.size"
        :pageCount="total.page"
        @current-change="getBrands"
      ></ht-pagination>
      <ht-button type="primary" size="mini" round @click="handlePath"
        >查看全部</ht-button
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
  protected list: BrandModel[] = [
    {
      name: "test1",
      pic:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg", // 品牌图片
      companyCount: 1 //商家数
    },
    {
      name: "test2",
      pic:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg",
      companyCount: 5
    },
    {
      name: "test3",
      pic:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg",
      companyCount: 100
    },
    {
      name: "test4",
      pic:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg", // 品牌图片
      companyCount: 10000
    },
    {
      name: "test5",
      pic:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg", // 品牌图片
      companyCount: 10000
    },
    {
      name: "test6",
      pic:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg", // 品牌图片
      companyCount: 10000
    },
    {
      name: "test7",
      pic:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg", // 品牌图片
      companyCount: 10000
    },
    {
      name: "test8",
      pic:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg", // 品牌图片
      companyCount: 10000
    },
    {
      name: "test9",
      pic:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg", // 品牌图片
      companyCount: 10000
    },
    {
      name: "test10",
      pic:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg", // 品牌图片
      companyCount: 10000
    },
    {
      name: "test11",
      pic:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg", // 品牌图片
      companyCount: 10000
    },
    {
      name: "test12",
      pic:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg", // 品牌图片
      companyCount: 10000
    },
    {
      name: "test13",
      pic:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg", // 品牌图片
      companyCount: 10000
    },
    {
      name: "test14",
      pic:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg", // 品牌图片
      companyCount: 10000
    },
    {
      name: "test15",
      pic:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg", // 品牌图片
      companyCount: 10000
    }
  ];

  protected queryParams: BrandParams = {
    page: 1,
    pageSize: 29
  };

  protected total = {
    size: 0,
    page: 1
  };

  protected getBrands() {
    brandService
      .getBrands(this.queryParams)
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

  protected handlePath() {
    this.$router.push({ path: "/brand" });
  }

  created() {
    this.getBrands();
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
