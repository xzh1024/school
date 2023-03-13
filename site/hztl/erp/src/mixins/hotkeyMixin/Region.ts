import {
  hotkeyActiveClass,
  hotkeyBlockSelectors,
  ignoreBlockHotkeysClass
} from "./constants";

import { getNextAcive, getVisibleElements } from "./utils";

class Region {
  private topRegion?: HTMLElement;
  public lastActiveRegion?: HTMLElement;
  public lastActiveBlock?: HTMLElement;
  isIgnoreTopHotkeys() {
    const region = this.getCurRegion();
    return (
      region &&
      this.topRegion !== region &&
      region.className.includes("ignore-top-hotkeys")
    );
  }
  setTopRegion(region?: HTMLElement) {
    this.topRegion = region;
  }
  getTopRegion() {
    return this.topRegion;
  }
  clearStore() {
    this.topRegion = undefined;
    this.lastActiveRegion = undefined;
    this.lastActiveBlock = undefined;
  }
  getNextActive(event: KeyboardEvent) {
    // 获取当前所有区域
    const targets = this.getAllHotkeyBlock();

    const activeIndex = targets.findIndex(item =>
      item.className.includes(hotkeyActiveClass)
    );

    if (!event.altKey) {
      if (activeIndex > -1) {
        return;
      }
    }
    const nextActiveBloclk = getNextAcive(
      targets,
      hotkeyActiveClass,
      event.keyCode
    );
    return nextActiveBloclk;
  }
  removeOtherBlockActive(element?: HTMLElement) {
    const activeBlocks: HTMLElement[] = getVisibleElements(
      `.${hotkeyActiveClass}`,
      this.getCurRegion()
    );
    activeBlocks.forEach(item => {
      if (item && item !== element) {
        item.classList.remove(hotkeyActiveClass);
        /**
         * activeElement 不在当前区域内则当前activeElement失去焦点
         * activeElement 在当前区域内，则焦点不改变
         *
         * */

        const activeElement = document.activeElement as HTMLElement;
        const nodeList =
          activeElement && element?.querySelectorAll(activeElement.tagName);
        if (!nodeList || ![...nodeList].includes(activeElement)) {
          activeElement.blur();
        }
      }
    });
  }
  getCurRegion() {
    return this.getTopDialog() || this.topRegion;
  }
  getTopDialog() {
    // 使用__wrapper这个外层元素，因为z-index设置在这个外层元素上的
    const dialogs = [
      ...getVisibleElements(".el-dialog__wrapper"),
      ...getVisibleElements(".el-message-box__wrapper")
    ];
    if (dialogs.length === 0) return;
    if (dialogs.length > 1) {
      // 按zIndex倒序排列
      dialogs.sort(function(a, b) {
        return parseInt(b.style.zIndex) - parseInt(a.style.zIndex);
      });
    }
    // 返回zIndex最大的对话框
    return dialogs[0];
  }
  getActiveBlock() {
    const allBlocks = this.getAllHotkeyBlock();
    return allBlocks.find(item => item.className.includes(hotkeyActiveClass));
  }
  getAllHotkeyBlock() {
    const targets: HTMLElement[] = [];
    const curRegion = this.getCurRegion();
    hotkeyBlockSelectors.forEach(selector => {
      targets.push(...getVisibleElements(selector, curRegion));
    });
    // ht-sidebar-content 加入底层block
    if (curRegion === this.topRegion) {
      hotkeyBlockSelectors.forEach(selector => {
        targets.push(
          ...getVisibleElements(
            selector,
            document.querySelector(".ht-sidebar-content") as HTMLElement
          )
        );
      });
    }
    return targets.filter(
      item => !item.className.includes(ignoreBlockHotkeysClass)
    );
  }
}

export default Region;
