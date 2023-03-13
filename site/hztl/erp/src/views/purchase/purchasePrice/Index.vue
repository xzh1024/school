<template>
  <div class="container-box" style="position: relative">
    <ht-tabs
      v-model="activeTab"
      :tabs="tabList"
      class="tabs-primary tabs-large"
      style="margin-top: 5px;"
      @change="changeTab"
    />
    <priority-setting
      class="priority-setting"
      @toSort="toSort"
      ref="priority"
    />
    <!-- <VideoPopover
      :videoUrl="videoUrl"
      :remark="videoPopoverRemark"
      class="video-popover"
    /> -->
    <keep-alive>
      <components :is="activeTab" @referenceSettings="referenceSettings" />
    </keep-alive>
  </div>
</template>

<script>
import { hotkeyMixin, tabChangeMixin } from "@/mixins";
import PrioritySetting from "./PrioritySetting";
import Define from "./Define";
import Fixed from "./Fixed";
import Sort from "./Sort";
//import VideoPopover from "@/components/VideoPopover";

export default {
  name: "PurchasePrice",
  components: {
    PrioritySetting,
    Define,
    Fixed,
    Sort
    //    VideoPopover
  },
  mixins: [hotkeyMixin, tabChangeMixin],
  data() {
    return {
      defaultTab: "Define",
      tabList: [
        { name: "自定义价格公式", id: "Define" },
        { name: "固定价格", id: "Fixed" },
        { name: "售价取值优先级", id: "Sort" }
      ],
      videoUrl: "https://dl.hztl3.com/videos/yp_videos/sale_prices.mp4",
      videoPopoverRemark:
        "售价制定页面，用于制定售价设置公式，采购时，根据进价以及匹配上的售价结算公式可自动计算出该批次进货的售价。"
    };
  },
  methods: {
    toSort() {
      this.activeTab = "Sort";
      this.changeTab();
    },
    referenceSettings(arr) {
      this.$refs.priority.refreshData(arr);
    }
  }
};
</script>

<style lang="scss" scoped>
.priority-setting {
  position: absolute;
  top: 5px;
  right: 12px;
  height: 40px;
  line-height: 40px;
  text-align: right;
  color: #fbfbfb;
}
.video-popover {
  position: absolute;
  top: 15px;
  right: 10px;

  ::v-deep .reference-container {
    color: #fff;
  }
}
</style>
