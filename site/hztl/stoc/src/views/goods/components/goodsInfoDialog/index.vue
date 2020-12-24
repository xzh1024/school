<template>
  <el-dialog
    class="goods-info-dialog"
    title="配件详情"
    :visible.sync="visible"
    :close-on-click-modal="false"
    width="900px"
    @closed="closed"
  >
    <div class="part-container">
      <div class="part-imgs"></div>
      <div class="part-content">
        <el-row :gutter="16">
          <el-col :span="8">
            <div class="cell">
              <div class="cell-label">配件名称：</div>
              <div class="cell-content">{{ info.name || "" }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="cell">
              <div class="cell-label">配件分类：</div>
              <div class="cell-content">{{ info.category || "" }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="cell">
              <div class="cell-label">生产码：</div>
              <div class="cell-content">{{ info.productionCode || "" }}</div>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="cell">
              <div class="cell-label">配件编码：</div>
              <div class="cell-content">{{ info.code || "" }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="cell">
              <div class="cell-label">产地：</div>
              <div class="cell-content">{{ info.productionPlace || "" }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="cell">
              <div class="cell-label">库存：</div>
              <div class="cell-content">{{ info.qty || "" }}</div>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="cell">
              <div class="cell-label">配件品牌：</div>
              <div class="cell-content">{{ info.brand || "" }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="cell">
              <div class="cell-label">规格：</div>
              <div class="cell-content">{{ info.model || "" }}</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="cell">
              <div class="cell-label">订货价：</div>
              <div class="cell-content">
                {{ info.brand === null ? "请询价" : info.brand || "" }}
              </div>
            </div>
          </el-col>

          <el-col :span="24">
            <div class="cell">
              <div class="cell-label">促销信息：</div>
              <div class="cell-content">
                买3赠1；满5个订购价3000.00；满10个订购价2900.00
              </div>
            </div>
          </el-col>

          <el-col :span="24">
            <div class="cell">
              <div class="cell-label">车型：</div>
              <div class="cell-content">{{ info.vehModel || "" }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="company-container">
      <div class="company-left">
        <div class="company-title">
          {{ companyInfo.name || "" }}
        </div>
        <div
          class="company-banner"
          v-if="companyInfo.pics && companyInfo.pics.length"
        >
          <Banner
            :banners="pics || companyInfo.pics"
            :swiperOption="swiperOption"
          ></Banner>
        </div>
        <div class="cell">
          <i class="icon-site"></i>
          <div class="cell-wrap cell-lip-1 text-assist">
            地址：{{ companyInfo.address || "" }}
          </div>
        </div>
        <div class="cell">
          <i class="icon-sedan"></i>
          <div class="cell-wrap cell-lip-2 text-assist">
            主营车型：{{
              companyInfo.vehBrands && companyInfo.vehBrands.join("/")
            }}
          </div>
        </div>
        <div class="cell">
          <i class="icon-house"></i>
          <div class="cell-wrap cell-lip-2 text-assist">
            主营内容：{{ companyInfo.partType || "" }}
          </div>
        </div>
      </div>
      <div class="company-right">
        <div class="company-title">
          联系方式
        </div>
        <div class="cell">
          <span class="cell-left">联系人：</span>
          <span class="cell-center" title="姓名">{{
            companyInfo.contacts || ""
          }}</span>
          <span class="cell-right" title="电话">{{
            companyInfo.phone || ""
          }}</span>
        </div>
        <div class="cell">
          <span class="cell-left">联系人1：</span>
          <span class="cell-center" title="姓名">{{
            companyInfo.contacts1 || ""
          }}</span>
          <span class="cell-right" title="电话">{{
            companyInfo.phone1 || ""
          }}</span>
        </div>
        <div class="cell">
          <span class="cell-left">联系人2：</span>
          <span class="cell-center" title="姓名">{{
            companyInfo.contacts2 || ""
          }}</span>
          <span class="cell-right" title="电话">{{
            companyInfo.phone2 || ""
          }}</span>
        </div>
        <div class="cell">
          <span class="cell-left">联系人3：</span>
          <span class="cell-center" title="姓名">{{
            companyInfo.contacts3 || ""
          }}</span>
          <span class="cell-right" title="电话">{{
            companyInfo.phone3 || ""
          }}</span>
        </div>
        <div class="cell">
          <span class="cell-label">微信：</span>
          <span class="cell-content">
            {{ companyInfo.wechat || "" }}
          </span>
        </div>
        <div
          class="cell cell-img-wrap"
          v-if="companyInfo.wechatPics && companyInfo.wechatPics.length"
        >
          <img
            class="cell-img"
            v-for="(pic, index) in companyInfo.wechatPics"
            :key="index"
            :src="pic"
          />
        </div>
        <div class="cell">
          <span class="cell-label">QQ：</span>
          <span class="cell-content">
            {{ companyInfo.qq }}
          </span>
        </div>
        <div
          class="cell cell-img-wrap"
          v-if="companyInfo.qqPics && companyInfo.qqPics.length"
        >
          <img
            class="cell-img"
            v-for="(pic, index) in companyInfo.qqPics"
            :key="index"
            :src="pic"
          />
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { PartModel } from "@/common/interface/goodsInterface";
import Banner from "@/components/banner/index";

@Component({ name: "GoodsInfoDialog", components: { Banner } })
export default class GoodsInfoDialog extends Vue {
  protected visible = true;
  @Prop() protected info!: PartModel;

  get companyInfo() {
    if (this.info.company) {
      console.log(this.info.company.pics);
    }
    return this.info.company || {};
  }

  pics = [
    {
      name: "name01",
      pic:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg",
      url: ""
    },
    {
      name: "name01",
      pic:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2449931680,3849919497&fm=26&gp=0.jpg",
      url: ""
    }
  ];

  protected swiperOption = {
    // 分页器配置
    pagination: {
      el: ".swiper-pagination",
      // bulletClass : "bullet",
      bulletActiveClass: "bullet-active",
      clickable: true
    },
    // 设定初始化时slide的索引
    initialSlide: 0,
    //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
    direction: "horizontal",
    // 自动切换图配置
    // autoplay: {
    //   delay: 3000,
    //   stopOnLastSlide: false,
    //   disableOnInteraction: false
    // },
    // 箭头配置
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    // 环状轮播
    loop: true,
    slidesPerView: "auto",
    loopedSlides: 3
    // loopAdditionalSlides: 0,
  };

  protected closed() {
    this.$emit("hide");
  }
}
</script>

<style lang="scss" scoped>
.goods-info-dialog {
  .part-container {
    display: flex;
    .part-imgs {
      width: 168px;
      margin-right: $margin-size-main;
    }
    .part-content {
      box-sizing: border-box;
      flex: 1;
      min-height: 212px;
      line-height: 20px;
      padding: 16px;
      background: #f8f8f8;
      border-radius: 6px;
      border-radius: 6px;
      .el-row {
        .el-col {
          .cell {
            display: flex;
            margin-bottom: 16px;
            .cell-label {
              width: 70px;
            }
            .cell-content {
              flex: 1;
            }
          }
        }
      }
    }
  }
  .company-container {
    margin-top: 16px;
    display: flex;
    .company-left {
      width: 320px;
      margin-right: 70px;
    }
    .company-right {
      flex: 1;
    }
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
    .company-banner {
      height: 184px;
      margin-top: $margin-size-main;
    }
    .cell {
      display: flex;
      margin-top: $margin-size-main;
      line-height: 18px;
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
      .text-assist {
        font-size: $font-size-12;
        color: $color-dim;
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
}
</style>
