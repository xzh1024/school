<template>
  <div class="company-item" v-popover:companyItemPopover>
    <img class="company-img" :src="info.pics ? info.pics[0] : ''" />
    <div class="company-content">
      <div :title="info.name" class="company-name">
        {{ info.name }}
      </div>
      <div title="电话号码" class="company-cell nowrap">
        <i class="icon-phone-gray"></i>
        <span class="cell-text">
          {{ info.phone }}
        </span>
      </div>
      <div title="主营" class="company-cell nowrap">
        <i class="icon-house-gray"></i>
        <span class="cell-text cell-assist">
          主营:
          {{ info.vehBrands ? info.vehBrands.join("、") : "" }}
        </span>
      </div>
      <div title="地址" class="company-cell">
        <i class="icon-site-gray"></i>
        <span class="cell-text-double cell-assist">
          地址:
          {{ info.address }}
        </span>
      </div>
    </div>
    <el-popover
      ref="companyItemPopover"
      placement="right"
      width="426"
      trigger="hover"
    >
      <company-info :info="info"></company-info>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { CompanyModel } from "@/common/interface/companyInterface";
import CompanyInfo from "@/views/company/components/companyInfo";

@Component({ name: "CompanyItem", components: { CompanyInfo } })
export default class CompanyItem extends Vue {
  @Prop() protected info!: CompanyModel;
}
</script>

<style lang="scss" scoped>
.company-item {
  display: inline-block;
  box-sizing: border-box;
  width: 222px;
  height: 272px;
  border: $border-gray;
  &:hover {
    border: $border-primary;
  }
  .company-img {
    display: inline-block;
    width: 100%;
    height: 132px;
  }
  .company-content {
    padding: $margin-size-main $margin-size-main 0;
    .company-name {
      margin-bottom: $margin-size-main;
      @extend .lip-1;
    }
    .company-cell {
      display: flex;
      margin-bottom: $margin-size-main;
      box-sizing: border-box;
      line-height: 18px;
      overflow: hidden;
      .cell-text {
        flex: 1;
        @extend .lip-1;
      }
      .cell-text-double {
        flex: 1;
        @extend .lip-2;
      }
      .cell-assist {
        font-size: $font-size-12;
        color: $color-gray;
      }
    }
  }
}
</style>
