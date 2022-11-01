<template>
  <text :class="htmlClass">
    <slot></slot>
  </text>
</template>

<script>
export default {
  name: "HtmlSpan",
  props: {
    htmlClass: {
      type: String | Object | Array,
      default: "",
    },
  },
};
</script>