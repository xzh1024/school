<template>
  <el-popover placement="bottom-start" width="220" trigger="click">
    <div class="video-img-container">
      <div>
        <div class="el-icon-video-play" @click="showVideoBox" />
        <div>点击播放</div>
      </div>
    </div>
    <div class="text-container">
      <div class="text-header">页面功能说明：</div>
      <div>{{ remark }}</div>
    </div>

    <div slot="reference" class="reference-container">
      <i class="el-icon-video-camera" />视频教程
    </div>

    <VideoBox :visible.sync="videoBoxVisible" :videoUrl="videoUrl" />
  </el-popover>
</template>

<script>
import VideoBox from "../VideoBox";

export default {
  name: "VideoPopover",
  components: { VideoBox },
  props: {
    videoUrl: {
      type: String,
      required: true
    },
    remark: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      videoBoxVisible: false
    };
  },
  methods: {
    showVideoBox() {
      this.videoBoxVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";

.el-popover {
  display: inline-block;

  .video-img-container {
    box-sizing: border-box;
    width: 200px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: solid 1px $color-text-regular;
    text-align: center;
    color: $color-text-secondary;
    background-color: black;

    .el-icon-video-play {
      font-size: 35px;
      cursor: pointer;
    }
  }

  .text-container {
    margin-top: 10px;

    .text-header {
      margin-bottom: 5px;
    }
  }
}
.reference-container {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  color: $color-primary;

  .el-icon-video-camera {
    display: inline-block;
    vertical-align: middle;
    margin-top: -3px;
    margin-right: 3px;
    font-size: 24px;
  }
}
</style>
