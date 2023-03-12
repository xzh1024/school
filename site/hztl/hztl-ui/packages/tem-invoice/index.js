import TemInvoice from "../custom-invoice/src/tem-invoice";

TemInvoice.install = function(Vue) {
    Vue.component(TemInvoice.name, TemInvoice);
};

export default TemInvoice;
