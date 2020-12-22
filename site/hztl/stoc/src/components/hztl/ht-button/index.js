import HtButton from "./index.vue";

/* istanbul ignore next */
HtButton.install = function(Vue) {
  Vue.component(HtButton.name, HtButton);
};

export default HtButton;
