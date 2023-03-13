<template>
  <ht-card icon="icon-title-goods" describe="深藏好货来这里挖掘">
    <div slot="after-title" class="title-right">
      <ht-pagination
        :currentPage.sync="queryParams.page"
        :total="total.size"
        :pageCount="total.page"
        @current-change="handleCurrentChange"
      ></ht-pagination>
      <el-button
        type="primary"
        size="mini"
        round
        @click="handlePath"
        class="gradients-button"
      >
        查看全部
      </el-button>
    </div>
    <div class="goods-list clearfix">
      <goods-item
        v-for="(item, index) in currentList"
        :key="index"
        :info="item"
      ></goods-item>
    </div>
  </ht-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { HtCard, HtPagination } from "@/components/hztl";
import GoodsItem from "@/views/goods/components/goodsItem/index";
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
  @Prop() params!: PartParams;

  protected list: PartModel[] = [];
  protected currentList: PartModel[] = [];

  protected queryParams: PartParams = {
    page: 1,
    pageSize: 10,
    orderByAreas: []
  };

  protected total = {
    size: 0,
    page: 1
  };

  protected handlePath() {
    this.$router.push({ path: "/goods" });
  }

  protected handleCurrentChange(currentPage: number) {
    const pageSize = this.queryParams.pageSize as number;
    this.currentList = this.list.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }

  public getDatas() {
    goodsService
      .getPartsRandom()
      .then((res: PartModel[]) => {
        console.log(res);
        const list = res || [];
        this.list = list;
        this.total.size = list.length;
        this.total.page = Math.ceil(
          list.length / (this.queryParams.pageSize as number)
        );
        this.handleCurrentChange(1);
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
