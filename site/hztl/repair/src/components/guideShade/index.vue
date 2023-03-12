<template>
  <div class="guide-shade" v-if="baseInfo.needGuide">
    <div class="ht-container">
      <div class="guide-img-wrap">
        <div class="guide-img">
          <div class="guide-button" @click="guideConfirm"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { BaseInfoModel } from "@/store/modules/base/interface";
import { namespace } from "vuex-class";
const BaseStore = namespace("base");
import { CommonService } from "@/common/services/commonService";
const commonService = new CommonService();

@Component({ name: "GuideShade" })
export default class GuideShade extends Vue {
  @BaseStore.Getter("baseInfo")
  protected baseInfo!: BaseInfoModel;
  @BaseStore.Action("loadBase")
  protected loadBase!: Function;

  @Watch("baseInfo.needGuide", { immediate: true })
  protected watchBaseInfo(val: BaseInfoModel) {
    if (val) {
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      } else {
        document.body.scrollTop = 0;
      }
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
      document.body.style.height = "auto";
      document.documentElement.style.overflow = "visible";
    }
  }

  protected guideConfirm() {
    commonService.updeteGuided().then(() => {
      this.loadBase();
    });
  }
}
</script>

<style lang="scss" scoped>
.guide-shade {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  background-color: rgba($color: #000000, $alpha: 0.3);
  .ht-container {
    position: relative;
    .guide-img-wrap {
      width: 287px;
      height: 322px;
      position: absolute;
      right: 377px;
      top: 33px;
      transform: translateX(10%);
      .guide-img {
        width: 100%;
        height: 100%;
        background-image: url("~@/assets/img/guide.png");
        background-size: 100% 100%;
        position: relative;
        .guide-button {
          width: 90px;
          height: 36px;
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-62%);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
