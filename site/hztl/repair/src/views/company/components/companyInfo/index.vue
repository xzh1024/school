<template>
  <div class="company-info" v-if="info">
    <div class="company-title" v-if="info.name">
      <div class="company-title-text">{{ info.name }}</div>
      <slot>
        <el-button
          v-if="info.partCount"
          type="primary"
          size="mini"
          round
          @click="handlePath(info.companyId)"
          >查看全部商品</el-button
        >
      </slot>
    </div>
    <div
      class="company-description"
      v-if="(info.pics && info.pics.length) || info.description"
    >
      <img
        v-if="info.pics && info.pics.length"
        class="company-img"
        :src="info.pics ? (info.pics.length ? info.pics[0] : '') : ''"
      />
      <div
        class="description-wrap"
        v-if="info.description"
        :title="info.description"
      >
        <p class="description-text text-assist">
          {{ info.description }}
        </p>
      </div>
    </div>
    <div class="cell" v-if="info.address" :title="info.address">
      <i class="icon-site"></i>
      <p class="cell-wrap cell-lip-1 text-assist">地址：{{ info.address }}</p>
    </div>
    <div
      class="cell"
      v-if="info.vehBrands && info.vehBrands.length"
      :title="info.vehBrands.join('、')"
    >
      <i class="icon-sedan"></i>
      <p class="cell-wrap cell-lip-2 text-assist">
        主营车型：{{ info.vehBrands.join("、") }}
      </p>
    </div>
    <div class="cell" v-if="areaNames.length" :title="areaNames.join('、')">
      <i class="icon-trucks"></i>
      <p class="cell-wrap cell-lip-2 text-assist">
        发货地区：{{ areaNames.join("、") }}
      </p>
    </div>
    <div class="company-title">
      联系方式
    </div>
    <div class="cell" v-if="info.contacts || info.phone">
      <span class="cell-left">联系人：</span>
      <span class="cell-center" title="姓名">{{ info.contacts }}</span>
      <span class="cell-right" title="电话">{{ info.phone }}</span>
    </div>
    <div class="cell" v-if="info.contacts1 || info.phone1">
      <span class="cell-left">联系人1：</span>
      <span class="cell-center" title="姓名">{{ info.contacts1 }}</span>
      <span class="cell-right" title="电话">{{ info.phone1 }}</span>
    </div>
    <div class="cell" v-if="info.contacts2 || info.phone2">
      <span class="cell-left">联系人2：</span>
      <span class="cell-center" title="姓名">{{ info.contacts2 }}</span>
      <span class="cell-right" title="电话">{{ info.phone2 }}</span>
    </div>
    <div class="cell" v-if="info.contacts3 || info.phone3">
      <span class="cell-left">联系人3：</span>
      <span class="cell-center" title="姓名">{{ info.contacts3 }}</span>
      <span class="cell-right" title="电话">{{ info.phone3 }}</span>
    </div>
    <div class="cell" v-if="info.wechat">
      <span class="cell-label">微信：</span>
      <span class="cell-content">
        {{ info.wechat }}
      </span>
    </div>
    <div
      class="cell cell-img-wrap"
      v-if="info.wechatPics && info.wechatPics.length"
    >
      <img
        class="cell-img"
        v-for="(pic, index) in info.wechatPics"
        :key="index"
        :src="pic"
      />
    </div>
    <div class="cell" v-if="info.qq">
      <span class="cell-label">QQ：</span>
      <span class="cell-content">
        {{ info.qq }}
      </span>
    </div>
    <div class="cell cell-img-wrap" v-if="info.qqPics && info.qqPics.length">
      <img
        class="cell-img"
        v-for="(pic, index) in info.qqPics"
        :key="index"
        :src="pic"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { CompanyModel, AreaModel } from "@/common/interface/companyInterface";

@Component({ name: "CompanyInfo" })
export default class CompanyInfo extends Vue {
  @Prop() protected info!: CompanyModel;

  get areaNames() {
    const areas = (this.info && this.info.areas) || [];
    return areas.map((area: AreaModel) => area.name);
  }

  protected handlePath(companyId: string) {
    if (!companyId) return;
    this.$router.push({ path: "/goods", query: { companyId } });
  }
}
</script>

<style lang="scss" scoped>
.company-info {
  width: 100%;
  .company-title {
    position: relative;
    margin-top: 20px;
    padding-left: $margin-size-main;
    font-size: $font-size-16;
    @extend .lip;
    display: flex;
    align-items: flex-end;
    &:first-child {
      margin-top: 0;
    }
    &::before {
      content: " ";
      width: 0;
      height: 14px;
      border-left: 4px solid $color-primary;
      position: absolute;
      left: 0;
      bottom: 3px;
    }
    .company-title-text {
      flex: 1;
    }
  }
  .text-assist {
    font-size: $font-size-12;
    color: $color-dim;
    line-height: 18px;
  }
  .company-description {
    margin-top: $margin-size-main;
    display: flex;
    height: 110px;
    overflow: hidden;
    .company-img {
      width: 190px;
      height: 100%;
    }
    .description-wrap {
      flex: 1;
      margin-left: $margin-size-main;
      height: 100%;
      overflow: hidden;
      .description-text {
        width: 100%;
        @extend .lip;
        -webkit-line-clamp: 6;
      }
    }
  }
  .cell {
    display: flex;
    margin-top: $margin-size-main;
    .cell-wrap {
      flex: 1;
      margin-top: 1px;
    }
    .cell-lip-1 {
      @extend .lip-1;
    }
    .cell-lip-2 {
      @extend .lip-2;
    }
    .cell-label {
      color: $color-gray;
    }
    .cell-content {
      flex: 1;
    }
    .cell-left {
      color: $color-gray;
      width: 70px;
    }
    .cell-center {
      color: $color-dark;
      width: 70px;
      @extend .lip;
    }
    .cell-right {
      flex: 1;
      color: $color-dark;
    }
    .cell-img {
      width: 87px;
      height: 87px;
      margin-left: $margin-size-main;
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
