<template>
  <div class="company-item" v-popover:companyItemPopover>
    <img
      class="company-img"
      :src="info.pics && info.pics.length ? info.pics[0] : ''"
      @error="defaultImg"
    />
    <div class="company-content">
      <div class="company-name" :title="info.name">
        {{ info.name }}
      </div>
      <div class="company-cell nowrap" :title="info.phone">
        <i class="icon-mobile-gray"></i>
        <span class="cell-text">
          {{ info.phone }}
        </span>
      </div>
      <div
        class="company-cell nowrap"
        :title="info.vehBrands ? info.vehBrands.join('、') : ''"
      >
        <i class="icon-house-gray"></i>
        <span class="cell-text cell-assist">
          主营:
          {{ info.vehBrands ? info.vehBrands.join("、") : "" }}
        </span>
      </div>
      <div class="company-cell" :title="info.address">
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
      trigger="click"
    >
      <company-info :info="info"></company-info>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { CompanyModel } from "@/common/interface/companyInterface";
import CompanyInfo from "@/views/company/components/companyInfo";
import { defaultImgRectangle } from "@/common/utils/defaultImg";

@Component({ name: "CompanyItem", components: { CompanyInfo } })
export default class CompanyItem extends Vue {
  @Prop() protected info!: CompanyModel;

  private defaultImg = defaultImgRectangle;
}
</script>

<style lang="scss" scoped>
.company-item {
  display: inline-block;
  box-sizing: border-box;
  width: 222px;
  height: 272px;
  border: $border-gray;
  cursor: pointer;
  transition: border 0.15s ease-in 0.05s;
  &:hover {
    border: $border-primary;
  }
  .company-img {
    display: inline-block;
    width: 100%;
    height: 130px;
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
