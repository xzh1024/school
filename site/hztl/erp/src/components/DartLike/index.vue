<template>
  <div class="dart-like-card">
    <i
      v-if="closable"
      class="el-icon-close close-dart-icon"
      @click.stop="close"
    />
    <i class="dart-like-cricle" />
    <i class="dart-like-triangle" />
    <span class="name-title">
      <slot />
    </span>
  </div>
</template>
<script>
export default {
  name: "DartLike",
  props: {
    closable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.dart-like-card {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #3aa7ff;
  @include font_color("color-primary");
  text-align: center;
  margin: 6px 5px 0 0;
  background: #e5c3b2;
  margin-left: 14px;
  border-width: 1px;
  border-style: solid solid solid none;
  border-color: #d9eeff;
  background: #e0f1ff;
  position: relative;
  border-radius: 0 4px 4px 0;
  &:hover .close-dart-icon {
    display: inline-block;
    cursor: pointer;
  }
  .close-dart-icon {
    position: absolute;
    right: 0;
    top: 8px;
    display: none;
  }
  .dart-like-cricle {
    position: absolute;
    top: 11px;
    left: 0;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    border: 1px solid #3aa7ff;
    @include font_color("color-primary");
  }
  .dart-like-triangle {
    border-right: 14px solid #e0f1ff;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    left: -14px;
  }
  .name-title {
    display: inline-block;
    margin-left: 18px;
    padding-right: 16px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
