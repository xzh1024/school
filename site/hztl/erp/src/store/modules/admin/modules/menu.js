import setting from "@/setting";

import { mainIndexRoutes } from "@/router/router";
import { cloneDeep } from "lodash";

function formatter(data, hasEntryPerm, parentPerm) {
  if (!data) {
    return undefined;
  }

  return data
    .map(item => {
      if (!item.name) {
        return null;
      }
      const result = {
        ...item,
        perm: (item.meta && item.meta.perm) || parentPerm,
        tags: item.meta ? item.meta.tags : false,
        hasBelongs: item.meta && item.meta.hasBelongs
      };
      if (item.children) {
        result.children = formatter(item.children, hasEntryPerm, result.perm);
        const arr = [];
        result.children.forEach(item => {
          if (!item.isTitle && !item.hidden) {
            arr.push(item.meta.title);
          }
        });
        result.children.forEach((item, ind) => {
          if (item.isTitle) {
            if (item.list) {
              const repeat = item.list.filter(x => {
                return arr.includes(x);
              });
              if (repeat.length == 0) {
                result.children.splice(ind, 1);
              }
            }
          }
        });
        // console.log(result.name, result.children);
      }
      return result;
    })
    .filter(
      item =>
        !item.isHide && hasEntryPerm(item.perm, item.tags, item.hasBelongs)
    );
}

//导入本地存储方式
export default {
  namespaced: true,
  state: {
    // 侧边菜单
    platformList: [],
    menuListAside: [],
    // 侧边是否收缩
    asideCollapse: setting.menuFlag.asideCollapse,
    // 问题反馈数量
    feedbackNum: null
  },
  actions: {
    /**
     * 设置侧边栏
     * */

    async menuAsideSet({ state }, hasEntryPerm) {
      let menuList = cloneDeep(mainIndexRoutes);

      menuList = formatter(menuList, hasEntryPerm);
      // 只考虑两层结构，超出两层需要调整
      state.menuListAside = menuList.filter(item =>
        item.children ? item.children.length : item.component
      );
    },
    isCollapseSet({ state }, collapse) {
      state.asideCollapse = collapse;
      localStorage.menuCollapse = state.asideCollapse;
    }
  },
  mutations: {
    loadLocalSave(state) {
      if (localStorage.menuCollapse) {
        state.asideCollapse = localStorage.menuCollapse === "true";
      }
    },
    collapseToggle(state) {
      state.asideCollapse = !state.asideCollapse;
    }
  }
};
