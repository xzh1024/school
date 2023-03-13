import { dateFormat } from "./date";

const defaultDateRange = {
  getSumDefaultDateRange(val) {
    if (val) {
      const end = new Date();
      const start = new Date(new Date().setMonth(end.getMonth() - val, 1));
      return [dateFormat(start), dateFormat(end)];
    } else {
      return [dateFormat(new Date()), dateFormat(new Date())];
    }
  },
  getBillDefaultDateRange(val) {
    if (val) {
      const end = new Date();
      const start = new Date();
      start.setTime(end.getTime() - 3600 * 1000 * 24 * val);
      return [dateFormat(start), dateFormat(end)];
    } else {
      return [dateFormat(new Date()), dateFormat(new Date())];
    }
  }
};

export default defaultDateRange;
