<template>
  <ht-card title="优质好货" describe="深藏好货来这里挖掘">
    <div slot="after-title" class="title-right">
      <ht-pagination
        :currentPage.sync="queryParams.page"
        :total="total.size"
        :pageCount="total.page"
        @current-change="goodsService"
      ></ht-pagination>
      <ht-button type="primary" size="mini" round @click="handlePath">查看全部</ht-button
      >
    </div>
    <div class="goods-list clearfix">
      <template v-for="(item, index) in list">
        <goods-item
          v-if="index < 10"
          :key="item.swPartId"
          :info="item"
        ></goods-item>
      </template>
    </div>
  </ht-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { HtCard, HtPagination } from "@/components/hztl";
import GoodsItem from "@/views/goods/components/goodsItem/index";
import { PageResponseResult } from "@/common/interface/commonInterface";
import { PartModel, PartParams } from "@/common/interface/goodsInterface";
import { GoodsService } from "@/common/services/goodsService";
const goodsService = new GoodsService();

@Component({
  name: "GoodsTemplate",
  components: {
    HtCard,
    HtPagination,
    GoodsItem
  }
})
export default class GoodsTemplate extends Vue {
  protected list: PartModel[] = [];

  protected queryParams: PartParams = {
    page: 1,
    pageSize: 10
  };

  protected total = {
    size: 0,
    page: 1
  };

  protected goodsService() {
    goodsService
      .getParts(this.queryParams)
      .then((res: PageResponseResult<PartModel[]>) => {
        if (res) {
          this.list = res.rows || [];
          this.total.size = res.totalSize || 0;
          this.total.page = res.totalPage || 1;
        }
      });
  }

  protected handlePath() {
    this.$router.push({ path: "/goods" });
  }

  created() {
    this.goodsService();
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
.goods-list {
  box-sizing: border-box;
  width: 100%;
  height: 708px;
  .goods-item {
    float: left;
    border-right: $border-gray;
    border-bottom: $border-gray;
    &:nth-child(5n + 0) {
      border-right: none;
    }
  }
}
</style>
