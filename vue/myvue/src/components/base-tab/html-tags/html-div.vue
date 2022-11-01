<template>
  <view :class="htmlClass" @click.stop="htmlDivClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: "HtmlDiv",
  props: {
    htmlClass: {
      type: String | Object | Array,
      default: "",
    },
    htmlStyle: {
      type: String | Object | Array,
      default: "",
    },
    click: Function,
  },
  methods: {
    htmlDivClick(ev) {
      console.log(ev);
      this.click && this.click(ev);
    },
  },
};
</script>