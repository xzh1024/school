<template>
  <div class="company-double">
    <img class="company-img" :src="info.pics ? info.pics[0] : ''" alt="" />
    <div class="company-content">
      <div :title="info.name" class="company-name">
        {{ info.name }}
      </div>
      <div class="company-merge">
        <div title="电话号码" class="company-cell nowrap">
          <i class="icon-phone"></i>
          <span class="cell-text">
            {{ info.phone }}
            asdadadadada就打算打算的撒大
          </span>
        </div>
        <div title="主营" class="company-cell nowrap">
          <i class="icon-house"></i>
          <span class="cell-text cell-assist">
            {{ info.phone }}
          </span>
        </div>
      </div>
      <div title="地址" class="company-cell">
        <i class="icon-site"></i>
        <span class="cell-text-double cell-assist">
          大数据减肥咖啡是你克拉饭卡和康师傅哈看了法赫卡里舒服啦哈风飒风撒发生阿法更多
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { CompanyModel } from "@/common/interface/companyInterface";

@Component({ name: "CompanyDouble" })
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
  .company-img {
    display: inline-block;
    width: 100%;
    height: 174px;
    transition: all 0.15s ease-in 0.05s;
    &:hover {
      transform: scale(1.1);
    }
  }
  .company-content {
    padding: 8px;
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
