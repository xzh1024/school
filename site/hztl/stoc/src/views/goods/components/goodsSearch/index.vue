<template>
  <div class="goods-search">
    <div class="cell">
      <div class="cell-left">配件品牌:</div>
      <div class="cell-right">
        <div class="check-list">
          <el-checkbox-group v-model="queryParams.brands" size="small">
            <el-checkbox-button
              size="mini"
              v-for="brand in brands"
              :key="brand"
              :label="brand"
            ></el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="cell">
      <div class="cell-left">供应商:</div>
      <div class="cell-right">
        <div class="check-list">
          <el-checkbox-group v-model="queryParams.companyIds" size="small">
            <el-checkbox-button
              size="mini"
              v-for="company in companys"
              :key="company.id"
              :label="company.id"
              >{{ company.name }}</el-checkbox-button
            >
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="cell">
      <div class="cell-left">保险认证分类:</div>
      <div class="cell-right">
        <div class="check-list">
          <el-checkbox-group v-model="queryParams.insurCertTypes" size="small">
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
    <el-button size="mini" @click="$emit('search')">
      搜索
    </el-button>
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

  protected brands: string[] = [];
  protected companys: NameModel[] = [];
  protected insurCertTypes: string[] = [];

  protected getPartFilter() {
    brandService.getPartFilter().then((res: PartFilterModel) => {
      console.log(res);
      if (res) {
        const { brands, companies, insurCertTypes } = res;
        this.brands = brands || [];
        this.companys = companies || [];
        console.log(this.companys);
        this.insurCertTypes = insurCertTypes || [];
      }
    });
  }

  created() {
    this.getPartFilter();
  }
}
</script>

<style lang="scss" scoped>
.goods-search {
  margin-bottom: $margin-size-main;
  border-top: $border-gray;
  border-left: $border-gray;
  .cell {
    display: flex;
    border-right: $border-gray;
    border-bottom: $border-gray;
    .cell-left {
      width: 114px;
      padding: $padding-size-main;
    }
    .cell-right {
      flex: 1;
      padding: $padding-size-main;
      border-left: $border-gray;
      .check-list {
        ::v-deep .el-checkbox-group {
          .el-checkbox-button--small {
            // margin-top: 8px;
            margin-right: 8px;
            margin-bottom: 8px;
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
    }
  }
}
</style>
