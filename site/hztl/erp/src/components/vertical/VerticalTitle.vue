<template>
  <span :class="{ isPadding: flag == true }" class="vertical-line-title">
    <i />
    {{ contentText }}
  </span>
</template>
<script>
export default {
  name: "VerticalTitle",
  props: {
    // eslint-disable-next-line vue/require-prop-types
    contentText: {
      default: ""
    },
    // eslint-disable-next-line vue/require-prop-types
    flag: {
      default: false
    }
  }
};
</script>
<style lang="stylus" scoped>
.vertical-line-title {
    display: inline-block;
    height: 14px;
    line-height: 14px;
    font-size: 18px;
    color: #171F24;

    i {
        display: inline-block;
        width: 4px;
        height: 100%;
        background: #3AA7FF;
        border-radius: 3px;
    }
}

.isPadding {
    margin: 20px 0;
}
</style>
