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
import { BrandModel, PartFilterModel } from "@/common/interface/brandInterface";
import { BrandService } from "@/common/services/brandService";
const brandService = new BrandService();
import { PageResponseResult } from "@/common/interface/commonInterface";
import { CompanyModel } from "@/common/interface/companyInterface";
import { PartParams } from "@/common/interface/goodsInterface";
import { CompanyService } from "@/common/services/companyService";
const companyService = new CompanyService();

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
