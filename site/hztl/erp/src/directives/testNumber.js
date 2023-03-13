import store from "@/store/store";

import Vue from "vue";

import numberDecimalFormat from "./numberDecimalFormat";

Vue.directive("filterNumber", {
  inserted: function(el) {
    el.addEventListener("input", function(e) {
      const _nums = store.state.admin.systemParams.precisions.qtyPrecision;
      const dpnum = numberDecimalFormat(e.target.value, _nums);
      if (dpnum != e.target.value) {
        e.target.value = dpnum;
      }
    });
  }
});
