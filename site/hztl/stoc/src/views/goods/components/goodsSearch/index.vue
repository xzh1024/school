<template>
  <div class="goods-search">
    <div class="cell">
      <div class="cell-left">配件品牌:</div>
      <div class="cell-right">
        <div class="check-list" :class="{ 'max-height-60': !brandVisible }">
          <el-checkbox-group
            size="small"
            v-model="queryParams.brands"
            @change="handleSearch"
          >
            <el-checkbox-button
              size="mini"
              v-for="brand in brands"
              :key="brand"
              :label="brand"
            ></el-checkbox-button>
          </el-checkbox-group>
        </div>

        <div class="button-plus" @click="handleScreenVisible">
          <span>{{ brandVisible ? "收起" : "更多" }}</span>
          <i
            :class="brandVisible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
          ></i>
        </div>
      </div>
    </div>
    <div class="cell">
      <div class="cell-left">供应商:</div>
      <div class="cell-right">
        <el-select
          v-model="queryParams.companyIds"
          size="mini"
          filterable
          clearable
          multiple
          collapse-tags
          placeholder="请选择供应商"
          @change="handleSearch"
        >
          <el-option
            v-for="city in companys"
            :key="city.id"
            :label="city.name"
            :value="city.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="cell">
      <div class="cell-left">车型：</div>
      <div class="cell-right">
        <el-cascader
          size="mini"
          :props="vehProps"
          @change="handleVehModelChange"
          clearable
        ></el-cascader>
      </div>
    </div>
    <div class="cell">
      <div class="cell-left">保险认证分类:</div>
      <div class="cell-right">
        <div class="check-list">
          <el-checkbox-group
            size="small"
            v-model="queryParams.insurCertTypes"
            @change="handleSearch"
          >
            <el-checkbox-button
              size="mini"
              v-for="type in insurCertTypes"
              :key="type"
              :label="type"
            ></el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { NameModel } from "@/common/interface/commonInterface";
import { PartFilterModel } from "@/common/interface/brandInterface";
import { BrandService } from "@/common/services/brandService";
const brandService = new BrandService();
import {
  PartParams,
  VehModelParams,
  VehModelEnergy
} from "@/common/interface/goodsInterface";
import { GoodsService } from "@/common/services/goodsService";
const goodsService = new GoodsService();

@Component({ name: "GoodsSearch" })
export default class GoodsSearch extends Vue {
  @Prop() protected queryParams!: PartParams;

  protected brandVisible = false;

  protected brands: string[] = [];
  protected companys: NameModel[] = [];
  protected insurCertTypes: string[] = [];

  protected getPartFilter() {
    brandService.getPartFilter().then((res: PartFilterModel) => {
      if (res) {
        const { brands, companies, insurCertTypes } = res;
        this.brands = brands || [];
        this.companys = companies || [];
        this.insurCertTypes = insurCertTypes || [];
      }
    });
  }

  protected vehProps = {
    // multiple: true,
    checkStrictly: true,
    lazy: true,
    lazyLoad(node: any, resolve: Function) {
      const { level } = node;
      if (level === 0) {
        const params: VehModelParams = {
          type: "factoryBrand"
        };
        goodsService
          .getVehModels(params)
          .then((resp: string[]) => {
            const nodes = resp.map((item: string) => {
              return {
                value: item,
                label: item,
                leaf: false
              };
            });
            resolve(nodes);
          })
          .catch(() => {
            resolve();
          });
      } else if (level === 1) {
        const params: VehModelParams = {
          type: "series",
          factoryBrand: node.value
        };
        goodsService
          .getVehModels(params)
          .then((resp: string[]) => {
            const nodes = resp.map((item: string) => {
              return {
                value: item,
                label: item,
                leaf: false
              };
            });
            resolve(nodes);
          })
          .catch(() => {
            resolve();
          });
      } else if (level === 2) {
        const params: VehModelParams = {
          type: "year",
          factoryBrand: node.parent.value,
          series: node.value
        };
        goodsService
          .getVehModels(params)
          .then((resp: string[]) => {
            const nodes = resp.map((item: string) => {
              return {
                value: item,
                label: item,
                leaf: false
              };
            });
            resolve(nodes);
          })
          .catch(() => {
            resolve();
          });
      } else if (level === 3) {
        goodsService
          .getVehModels({
            type: "combine",
            factoryBrand: node.parent.parent.value,
            series: node.parent.value,
            year: node.value
          })
          .then((resp: VehModelEnergy[]) => {
            const nodes = resp.map((item: VehModelEnergy) => {
              const data = `${item.displacement} ${item.gearbox}`;
              return {
                value: data,
                label: data,
                leaf: true
              };
            });
            resolve(nodes);
          })
          .catch(() => {
            resolve();
          });
      } else {
        resolve();
      }
    }
  };
  protected handleVehModelChange(value: string[]) {
    const vehModelParams = {
      factoryBrand: "",
      series: "",
      year: "",
      displacement: "",
      gearbox: ""
    };
    value.forEach((item: string, index: number) => {
      if (index === 0) {
        vehModelParams.factoryBrand = item || "";
      } else if (index === 1) {
        vehModelParams.series = item || "";
      } else if (index === 2) {
        vehModelParams.year = item || "";
      } else if (index === 3) {
        const arr = item.split(" ");
        vehModelParams.displacement = arr[0] || "";
        vehModelParams.gearbox = arr[1] || "";
      }
    });

    Object.assign(this.queryParams, vehModelParams);

    this.handleSearch();
  }

  protected handleSearch() {
    this.$emit("search");
  }

  protected handleScreenVisible() {
    this.brandVisible = !this.brandVisible;
  }

  created() {
    this.getPartFilter();
  }
}
</script>

<style lang="scss" scoped>
.goods-search {
  border-top: $border-gray;
  border-left: $border-gray;
  .cell {
    display: flex;
    border-right: $border-gray;
    border-bottom: $border-gray;
    .cell-left {
      width: 114px;
      padding: $padding-size-main;
      line-height: 28px;
    }
    .cell-right {
      flex: 1;
      box-sizing: border-box;
      padding: $padding-size-main;
      border-left: $border-gray;
      display: flex;
      align-items: flex-start;
      .check-list {
        flex: 1;
        ::v-deep .el-checkbox-group {
          .el-checkbox-button--small {
            margin: 4px 8px 4px 0;
            .el-checkbox-button__inner {
              color: $color-gray;
              padding: 4px 10px;
              border: $border-gray;
              border-radius: 12px;
            }
          }
          .el-checkbox-button.is-checked {
            .el-checkbox-button__inner {
              color: $color-primary;
              border-color: $color-primary;
              background-color: $color-white;
              box-shadow: none;
            }
          }
        }
      }
      .max-height-60 {
        max-height: 60px;
        overflow: hidden;
      }
      .button-plus {
        height: 30px;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }
}
</style>
