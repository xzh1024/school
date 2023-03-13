<template>
  <ht-dialog
    v-bind="$attrs"
    v-on="$listeners"
    append-to-body
    title="视频教程"
    top="60px"
    width="80%"
  >
    <video
      v-if="$attrs.visible"
      :src="videoUrl"
      controls
      autoplay
      class="video"
    />
  </ht-dialog>
</template>

<script>
export default {
  name: "VideoBox",
  props: {
    videoUrl: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog .el-dialog__body {
  padding: 0;
}
.video {
  margin: 0;
  padding: 0;
  width: 100%;
  height: auto;
}
</style>
