import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_LIST
} from "@/common/entity/store";
import { TablePageModel } from "./interface";

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
  getters: {
    tablePageInfo: (state: TablePageModel) => {
      return state;
    },
    pageSize: (state: TablePageModel) => {
      return state.pageSize;
    }
  },
  mutations: {
    changePageSize(state: TablePageModel, data: number) {
      state.pageSize = data;
      localStorage.pageSize = data;
    }
  }
};
