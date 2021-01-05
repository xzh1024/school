<template>
  <div class="company-double" v-popover:companyDoublePopover>
    <img class="company-img" :src="info.pics ? info.pics[0] : ''" />
    <div class="company-content">
      <div :title="info.name" class="company-name">
        {{ info.name }}
      </div>
      <div class="company-merge">
        <div title="电话号码" class="company-cell nowrap">
          <i class="icon-phone-gray"></i>
          <span class="cell-text">
            {{ info.phone }}
          </span>
        </div>
        <div title="主营" class="company-cell nowrap">
          <i class="icon-house-gray"></i>
          <span class="cell-text cell-assist">
            主营：
            {{ info.vehBrands ? info.vehBrands.join("、") : "" }}
          </span>
        </div>
      </div>
      <div title="地址" class="company-cell">
        <i class="icon-site-gray"></i>
        <span class="cell-text-double cell-assist">
          地址：
          {{ info.address }}
        </span>
      </div>
    </div>
    <el-popover
      ref="companyDoublePopover"
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

@Component({ name: "CompanyDouble", components: { CompanyInfo } })
export default class CompanyDouble extends Vue {
  @Prop() protected info!: CompanyModel;
}
</script>

<style lang="scss" scoped>
.company-double {
  display: inline-block;
  box-sizing: border-box;
  width: 458px;
  height: 272px;
  border: $border-gray;
  &:hover {
    border: $border-primary;
  }
  .company-img {
    display: inline-block;
    width: 100%;
    height: 174px;
  }
  .company-content {
    padding: 0 $margin-size-main;
    .company-name {
      @extend .lip-1;
      margin-bottom: 3px;
    }
    .company-merge {
      display: flex;
      .nowrap {
        flex: 1;
      }
    }
    .company-cell {
      display: flex;
      margin: 3px 0;
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
