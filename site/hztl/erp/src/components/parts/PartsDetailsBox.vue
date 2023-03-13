<template>
  <ht-dialog
    v-bind="$attrs"
    title="配件详情"
    width="1200px"
    top="7vh"
    v-on="$listeners"
  >
    <el-form size="mini" label-width="20px">
      <el-row>
        <el-col :span="8" :offset="1">
          <el-carousel
            :autoplay="false"
            @change="carouselChange"
            indicator-position="none"
            trigger="click"
            class="button-rounded"
            ref="carouselImg"
            height="400px"
          >
            <el-carousel-item v-for="item in parts.imageUrls" :key="item">
              <img
                :src="item"
                @click="handlePictureCardPreview(item)"
                style="margin-top: 50%;transform: translateY(-50%);"
              />
            </el-carousel-item>
          </el-carousel>
          <div
            class="img-indicator"
            v-if="parts.imageUrls && parts.imageUrls.length > 0"
          >
            {{ activeIndex + 1 }}/{{
              parts.imageUrls && parts.imageUrls.length
            }}
          </div>
          <div class="img-indicator" v-else>无图片</div>
          <div class="img-tab">
            <img
              :src="item"
              :class="{ 'img-item': true, active: index == activeIndex }"
              @click="changeImg(index)"
              v-for="(item, index) in parts.imageUrls"
              :key="index"
              alt=""
            />
          </div>
        </el-col>
        <el-col :span="15">
          <el-form-item>
            <span class="name font-16">{{ parts.name }}</span>
            <span class="font-16">{{ parts.code }}</span>
            <span v-if="parts.brand" class="border-b">{{ parts.brand }}</span>
            <span v-if="parts.productionPlace" class="border-g">{{
              parts.productionPlace
            }}</span>
          </el-form-item>
          <div class="part-base">
            <div>
              <el-col :span="8">
                <span>计量单位：{{ parts.unit }}</span>
              </el-col>
              <el-col :span="8">
                <span>库存上限：{{ parts.stockTopLimit }}</span>
              </el-col>
              <el-col :span="8">
                <span>保险认证分类：{{ parts.insurCertType }}</span>
              </el-col>
            </div>
            <div>
              <el-col :span="8">
                <span>规 格：{{ parts.model }}</span>
              </el-col>
              <el-col :span="8">
                <span>库存下限：{{ parts.stockLowerLimit }}</span>
              </el-col>
              <el-col :span="8">
                <span>英文名：{{ parts.enName }}</span>
              </el-col>
            </div>
            <div>
              <el-col :span="8">
                <span>生产码：{{ parts.productionCode }}</span>
              </el-col>
              <el-col :span="8">
                <span>起订量：{{ parts.minOrderQty }}</span>
              </el-col>
              <el-col :span="8">
                <span>长：{{ parts.length }}</span>
              </el-col>
            </div>
            <div>
              <el-col :span="8">
                <span>部位码：{{ parts.posCode }}</span>
              </el-col>
              <el-col :span="8">
                <span>正厂价币种：{{ parts.currency }}</span>
              </el-col>
              <el-col :span="8">
                <span>宽：{{ parts.width }}</span>
              </el-col>
            </div>
            <div>
              <el-col :span="8">
                <span>条形码：{{ parts.barCode }}</span>
              </el-col>
              <el-col :span="8">
                <span>正厂价：{{ parts.priceFactory }}</span>
              </el-col>
              <el-col :span="8">
                <span>高：{{ parts.height }}</span>
              </el-col>
            </div>
            <div>
              <el-col :span="8">
                <span
                  >特征码：
                  <el-tooltip
                    v-if="parts.featureCode"
                    class="item"
                    effect="dark"
                    :content="parts.featureCode"
                    placement="top"
                  >
                    <span class="overflow-text"> {{ parts.featureCode }}</span>
                  </el-tooltip>
                </span>
              </el-col>
              <el-col :span="8">
                <span>人民币价：{{ parts.priceRmb }}</span>
              </el-col>
              <el-col :span="8">
                <span>重量：{{ parts.weight }}</span>
              </el-col>
            </div>
            <div>
              <el-col :span="8">
                <span>配件分类：{{ parts.categoryName }}</span>
              </el-col>
              <el-col :span="8">
                <span>发动机型号：{{ parts.engineNo }}</span>
              </el-col>

              <el-col :span="8">
                <span>体积：{{ parts.volume }}</span>
              </el-col>
            </div>
            <div>
              <el-col :span="8">
                <span>配件类别：{{ parts.partType }}</span>
              </el-col>
              <el-col :span="8">
                <span>每车用量：{{ parts.dosagePerCar }}</span>
              </el-col>
              <el-col :span="8">
                <span>包装数：{{ parts.packingNum }}</span>
              </el-col>
            </div>
            <div>
              <span
                :class="[parts.isCollection ? 'can' : 'not']"
                style="marginTop:10px"
                >集采配件</span
              >
              <span :class="[parts.isPurchase ? 'can' : 'not']">可采购</span>
              <span :class="[parts.isSale ? 'can' : 'not']">可销售</span>
            </div>
          </div>
          <div class="part-over">
            <ht-card title="车型信息">
              <div class="font-12">车型：{{ parts.vehModel }}</div>
              <div class="font-12">适用车型：{{ parts.avaVehModel }}</div>
            </ht-card>
            <ht-card title="配件备注">
              <div class="font-12">{{ parts.remark }}</div>
            </ht-card>
            <ht-card title="图号">
              <div class="font-12">
                <span
                  v-for="(item, index) in parts.customCodes"
                  :key="index"
                  :class="{ 'is-defualt': index == 0, 'item-code': true }"
                  >{{ item }}</span
                >
              </div>
            </ht-card>
            <ht-card title="标准适用车型">
              <div class="font-12">
                <span
                  v-for="(item, index) in avaVehModels"
                  :key="index"
                  class="item-code"
                  >{{ item.facBrand }} {{ item.vehicleGroup
                  }}{{ item.displacementEngine }}</span
                >
              </div>
            </ht-card>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer-align">
      <el-button type="primary" size="mini" @click="hideBox">
        关闭（Esc）
      </el-button>
    </div>
    <el-dialog
      :visible.sync="imgPreviewVisible"
      append-to-body
      :show-close="false"
      class="ht-light-box"
    >
      <i
        class="close-btn el-icon-circle-close"
        @click="imgPreviewVisible = false"
      ></i>
      <img v-show="imgPreviewUrl" :src="imgPreviewUrl" alt="正在加载..." />
    </el-dialog>
  </ht-dialog>
</template>
<script>
import { reqPartsDetails } from "@/api/parts";
import { searchAvaVehModels } from "@/api/parts/partsModels";
export default {
  name: "PartsDetailsBox",
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: -1
    }
  },
  data() {
    return {
      imgPreviewVisible: false,
      imgPreviewUrl: "",
      parts: {
        partsImgs: []
      },
      activeIndex: 0,
      avaVehModels: []
    };
  },
  computed: {
    partsSize() {
      return (
        this.parts.length + "*" + this.parts.width + "*" + this.parts.height
      );
    }
  },
  watch: {
    "$attrs.visible"(val) {
      if (val) {
        this.detailsHandle();
      }
    },
    value() {
      if (this.$attrs.visible) {
        this.detailsHandle();
      }
    }
  },
  methods: {
    detailsHandle() {
      if (!this.value || this.value < 0) {
        return;
      }
      reqPartsDetails(this.value)
        .then(data => {
          this.parts = data;
        })
        .catch(() => {});
      searchAvaVehModels({
        partId: this.value,
        page: 1,
        pageSize: 10000
      })
        .then(data => {
          this.avaVehModels = data.rows;
        })
        .catch(() => {});
    },
    handlePictureCardPreview(file) {
      this.imgPreviewUrl = file;
      this.imgPreviewVisible = true;
    },
    hideBox() {
      this.$emit("update:visible", false);
      this.$emit("close");
    },
    changeImg(index) {
      this.activeIndex = index;
      this.$refs.carouselImg.setActiveItem(index);
    },
    carouselChange(newIndex) {
      this.activeIndex = newIndex;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";

.font-16 {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}
.name::before {
  content: "<";
}
.name::after {
  content: ">";
}
.border-b {
  margin-left: 8px;
  border: 1px solid #3aa7ff;
  @include border_color("color-primary");
  border-radius: 11px;
  padding: 0 8px;
  color: #3aa7ff;
  @include font_color("color-primary");
  font-size: 12px;
}
.border-g {
  margin-left: 8px;
  border: 1px solid #02b946;
  border-radius: 11px;
  padding: 0 8px;
  color: #02b946;
  font-size: 12px;
}
.part-base {
  padding-left: 10px;
}
.part-base span {
  font-size: 12px;
  color: #666666;
  line-height: 25px !important;
}
.part-base > div {
  margin-left: 20px;
}
.part-base .can,
.part-base .not {
  width: 64px;
  height: 22px;
  line-height: 22px !important;
  display: inline-block;
  margin-right: 8px;
  background: #c4c4c4;
  border-radius: 11px;
  font-size: 12px;
  color: #ffffff !important;
  text-align: center;
}
.part-base .can {
  background: #3aa7ff;
  @include background_color("color-primary");
}
.part-over {
  overflow-y: auto;
  padding-top: 40px;
  width: 100%;
  height: 305px;
  padding-left: 20px;
}
.font-12 {
  font-size: 12px;
  color: #666666;
}
.item-code {
  margin-right: 16px;
}
.is-defualt {
  color: #3aa7ff;
  @include font_color("color-primary");
}
.img-indicator {
  width: 100%;
  height: 24px;
  line-height: 24px;
  background: rgba(63, 158, 255, 0.4);
  border-radius: 0 0 6px 6px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  margin: 8px 0;
}
.img-tab {
  overflow-x: auto;
  white-space: nowrap;
}
.img-item {
  width: 119px;
  height: 119px;
  border-radius: 6px;
  margin-right: 8px;
}
.active {
  border: 1px solid #3f9eff;
  @include border_color("color-primary");
}
.overflow-text {
  width: 150px;
  height: 17px;
  line-height: 17px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.close-btn {
  position: absolute;
  right: 0;
  font-size: 48px;
  color: #fff;
}
</style>
