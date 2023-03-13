<template>
  <div class="step-title">
    <h3>{{ title }}</h3>
  </div>
</template>
<script>
export default {
  name: "StepTitle",
  props: {
    title: String
  },
  data() {
    return {};
  }
};
</script>
<style lang="stylus">
.step-title {
	border-bottom: 1px solid #eee;
	color: #666;
}
</style>
