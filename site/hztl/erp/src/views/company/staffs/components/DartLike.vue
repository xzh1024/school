<template>
  <div class="dart-like-card">
    <i
      v-if="closable"
      class="el-icon-close close-dart-icon"
      @click.stop="close"
    />
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
<style lang="stylus" scoped>
.dart-like-card
    display inline-block
    height 30px
    width 98px
    line-height 30px
    font-size 14px
    color #FFF
    text-align center
    margin 2px 4px 0 0
    background-color #00A7FB
    position relative
    border-radius 4px
    .close-dart-icon
        display inline-block
        cursor pointer
        position absolute
        right 0
        top 8px
    .name-title
        display inline-block
        // width 80px
        // overflow-x hidden
        // text-overflow ellipsis
        // white-space nowrap
</style>
