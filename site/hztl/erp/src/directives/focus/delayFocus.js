import Vue from "vue";
import setFocus from "./setFocus";

const delayTime = 100;
let timer = null;
Vue.directive("delay-focus", {
  inserted: function(el, { value }) {
    if (value) {
      timer = setTimeout(() => {
        setFocus(el);
      }, delayTime);
    }
  },
  update: function(el, { value, oldValue }) {
    if (value) {
      if (!oldValue) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          setFocus(el);
        }, delayTime);
      }
    } else if (!value) {
      clearTimeout(timer);
    }
  }
});
