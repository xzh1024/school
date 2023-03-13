<template>
  <div class="container-box">
    <ht-tabs
      v-model="activeTab"
      :tabs="tabs"
      class="tabs-primary tabs-large"
      style="margin: 5px 0 0 0;"
      @change="changeTab"
    />
    <VideoPopover
      :videoUrl="videoUrl"
      :remark="videoPopoverRemark"
      class="video-popover"
    />
    <components :is="activeTab" />
  </div>
</template>

<script>
import settings from "./settings";
import assignment from "./assignments";
import { tabChangeMixin } from "@/mixins";
import VideoPopover from "@/components/VideoPopover";

export default {
  name: "StoreSettings",
  components: {
    settings,
    assignment,
    VideoPopover
  },
  mixins: [tabChangeMixin],
  data() {
    return {
      activeTab: "settings",
      defaultTab: "settings",
      tabs: [
        { id: "settings", name: "仓库设置" },
        { id: "assignment", name: "仓库分配" }
      ],
      videoUrl: "https://dl.hztl3.com/videos/yp_videos/make_warehouse.mp4",
      videoPopoverRemark:
        "仓库设置页面，用于管理账套内的仓位；系统支持「标准模式」、「简易模式」两种仓库管理方式（设置页面：系统->系统参数设置->仓储参数）。"
    };
  },
  mounted() {
    if (
      this.hasAutoPerm("setting.read") &&
      !this.hasAutoPerm("assignment.read")
    ) {
      this.tabs = [{ id: "settings", name: "仓库设置" }];
      this.defaultTab = "settings";
      this.activeTab = "settings";
      this.changeTab();
    } else if (
      !this.hasAutoPerm("setting.read") &&
      this.hasAutoPerm("assignment.read")
    ) {
      this.tabs = [{ id: "assignment", name: "仓库分配" }];
      this.defaultTab = "assignment";
      this.activeTab = "assignment";
      this.changeTab();
    }
  }
};
</script>

<style lang="scss" scoped>
.container-box {
  position: relative;

  .video-popover {
    position: absolute;
    top: 15px;
    right: 10px;

    ::v-deep .reference-container {
      color: #fff;
    }
  }
}
</style>
