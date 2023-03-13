import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_LIST
} from "@/constants";

const LAYOUT = "total, sizes, prev, pager, next, jumper";

const pageSize = Number(localStorage.getItem("pageSize"));

export default {
  namespaced: true,
  state: {
    page: DEFAULT_CURRENT_PAGE,
    layout: LAYOUT,
    pageSizeList: PAGE_SIZE_LIST,
    pageSize: PAGE_SIZE_LIST.includes(pageSize) ? pageSize : DEFAULT_PAGE_SIZE
  },
  actions: {},
  mutations: {
    changePageSize(state, data) {
      state.pageSize = data;
      localStorage.setItem("pageSize", data);
    }
  }
};
