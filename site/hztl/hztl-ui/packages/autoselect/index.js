import Autoselect from "./src/autoselect";

/**
 * 回车 下拉时候原element的 emit  select ， 下拉没选中项和输入框时候 emit intput-enter 
 * 
 */

Autoselect.install = function(Vue) {
    Vue.component(Autoselect.name, Autoselect);
};

export default Autoselect;
