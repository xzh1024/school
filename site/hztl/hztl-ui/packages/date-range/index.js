import DateRange from "./src/date-range";

DateRange.install = function (Vue) {
    Vue.component(DateRange.name, DateRange);
};

export default DateRange;