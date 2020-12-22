<template>
  <div class="company-info" v-if="info">
    <div class="company-title" v-if="info.name">{{ info.name }}</div>
    <div
      class="company-description"
      v-if="(info.pics && info.pics.length) || info.description"
    >
      <img
        v-if="info.pics && info.pics.length"
        class="company-img"
        :src="info.pics ? (info.pics.length ? info.pics[0] : '') : ''"
      />
      <div class="description-wrap" v-if="info.description">
        <p class="description-text text-assist">
          {{ info.description }}
        </p>
      </div>
    </div>
    <div class="cell" v-if="info.address">
      <i class="icon-site"></i>
      <p class="cell-wrap cell-lip-1 text-assist">
        地址：{{ info.address + info.address + info.address }}
      </p>
    </div>
    <div class="cell" v-if="info.vehBrands && info.vehBrands.length">
      <i class="icon-sedan"></i>
      <p class="cell-wrap cell-lip-2 text-assist">
        主营车型：{{ info.vehBrands.join("/") }}
      </p>
    </div>
    <div class="cell" v-if="areas.length"></div>
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
  // protected info: CompanyModel = {
  //   name: "上海优士汽车零部件有限公司",
  //   pics: [
  //     "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg"
  //   ],
  //   description:
  //     "这里是公司介绍这里是公司介绍这里是公司介绍这里是公司介绍这里是公司介绍这里是公司介绍这里是公司介绍这里是公司介绍这里是公司介绍这里是公司介绍这里是公司介绍这里是公司介绍这里是公司介绍这里是公司介绍这里是公司介绍这里是公司介绍这里是公司介绍",
  //   address: "四川省/成都市/高新区/人民南路北段37号301房间",
  //   vehBrands: [""],
  //   areas: [
  //     {
  //       type: "County",
  //       id: 1,
  //       name:
  //         "区域名称1区域名称1区域名称1区域名称1区域名称1区域名称1区域名称1区域名称1区域名称1"
  //     },
  //     {
  //       type: "County",
  //       id: 2,
  //       name: "区域名称2"
  //     },
  //     {
  //       type: "County",
  //       id: 3,
  //       name:
  //         "区域名称3区域名称3区域名称3区域名称3区域名称3区域名称3区域名称3区域名称3区域名称3区域名称3区域名称3区域名称3"
  //     }
  //   ],
  //   contacts: "欧阳围墙",
  //   phone: "12345678900",
  //   contacts1: "xxx1",
  //   phone1: "12345678901",
  //   contacts2: "xxx2",
  //   phone2: "12345678902",
  //   contacts3: "xxx3",
  //   phone3: "12345678903",
  //   wechat: "13800087877，8767665，82672877，13800087877，8767665，82672877，13800087877，8767665，82672877，13800087877，8767665，82672877",
  //   wechatPics: [
  //     "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg",
  //     "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg",
  //     "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg",
  //     "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg"
  //   ],
  //   qq: "13800087877，8767665，82672877，13800087877，8767665，82672877，13800087877，8767665，82672877，13800087877，8767665，82672877",
  //   qqPics: [
  //     "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg",
  //     "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg",
  //     "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg",
  //     "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg"
  //   ]
  // } as CompanyModel;

  get areas() {
    const areas = (this.info && this.info.areas) || [];
    return areas.map((area: AreaModel) => area.name);
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
  }
  .text-assist {
    font-size: $font-size-12;
    color: $color-dim;
    line-height: 18px;
  }
  .company-description {
    margin-top: $margin-size-main;
    display: flex;
    height: 112px;
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
        // line-height: 18px;
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
      margin-right: $margin-size-main;
    }
    &.cell-vertical-center {
      justify-content: center;
    }
  }
}
</style>
