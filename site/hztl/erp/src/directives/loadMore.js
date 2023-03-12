import Vue from "vue";

Vue.directive("loadmore", {
  bind(el, binding) {
    const selectWrap = el.querySelector(".el-table__body-wrapper");
    selectWrap.addEventListener("scroll", function() {
      const sign = 0;
      const scrollDistance =
        this.scrollHeight - this.scrollTop - this.clientHeight;
      if (scrollDistance <= sign) {
        binding.value();
      }
    });
  }
});
