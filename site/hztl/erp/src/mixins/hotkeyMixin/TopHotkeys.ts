import hotkeys from "hotkeys-js";
import { KEY_MAP } from "@/constants";
import {
  allFunctsKeys,
  hotkeyActiveClass,
  hotkeyBlockSelectors,
  ignoreBlockHotkeysClass
} from "./constants";

import {
  getDefaultFocusNode,
  getVisibleElements,
  handleFormKeys
} from "./utils";
import Region from "./Region";

// 在区域中生效的快捷键
const blockKeys = [
  KEY_MAP.left,
  KEY_MAP.up,
  KEY_MAP.right,
  KEY_MAP.down,
  KEY_MAP.enter,
  KEY_MAP.del
];

// 功能键绑定在全局，保证只绑定一次，采取计数方式，绑定时大于0不再绑定，取消绑定时等于0才取消
let bindFunctions = 0;

export default class TopHotkeys {
  private topScope = Symbol("topHotkey");
  private regionInstance: Region = new Region();
  private bindClickBlockListener = this.clickBlockListener.bind(this);
  private bindCheckRegionAndBlock = this.checkRegionAndBlock.bind(this);
  public setDefaultHotkey() {
    const allBlocks = this.regionInstance.getAllHotkeyBlock() as HTMLElement[];
    const nextActiveBloclk =
      allBlocks.find(item => item.className.includes("autofocus")) ||
      allBlocks[0];
    if (nextActiveBloclk) {
      nextActiveBloclk.click();
    }
  }
  private clickBlockListener(e: MouseEvent) {
    let curBlock: HTMLElement | null = null;
    hotkeyBlockSelectors.forEach(item => {
      if (curBlock) {
        return;
      }
      curBlock =
        e.target && ((e.target as HTMLElement).closest(item) as HTMLElement);
    });

    // 切换样式设置默认focus，区域切换除form表单外绑定在组件click上
    if (curBlock === null) {
      return;
    }
    curBlock = curBlock as HTMLElement;
    if (
      !curBlock.className.includes(ignoreBlockHotkeysClass) &&
      (!curBlock.className.includes(hotkeyActiveClass) ||
        curBlock !== this.regionInstance.lastActiveBlock)
    ) {
      this.regionInstance.removeOtherBlockActive(curBlock);
      curBlock.classList.add(hotkeyActiveClass);
      this.regionInstance.lastActiveBlock = curBlock;

      if (curBlock.className.includes("el-form")) {
        hotkeys.setScope(this.topScope);
      }

      // 设置默认焦点
      const defaultNode = getDefaultFocusNode(curBlock);
      defaultNode && defaultNode.focus();
    }
  }
  private checkRegionAndBlock(e?: KeyboardEvent) {
    if (this.regionInstance.isIgnoreTopHotkeys()) {
      return;
    }

    if (
      e &&
      !blockKeys
        .filter(item => ![KEY_MAP.left, KEY_MAP.right].includes(item))
        .includes(e.keyCode)
    ) {
      return;
    }

    e && e.preventDefault();

    const curRegion = this.regionInstance.getCurRegion() as HTMLElement;
    if (this.regionInstance.lastActiveRegion !== curRegion) {
      if (this.regionInstance.lastActiveRegion) {
        this.regionInstance.lastActiveRegion.removeEventListener(
          "click",
          this.bindClickBlockListener
        );
      }
      if (curRegion) {
        curRegion.addEventListener("click", this.bindClickBlockListener);
      }
      this.regionInstance.lastActiveRegion = curRegion;
    }

    const allBlocks = this.regionInstance.getAllHotkeyBlock() as HTMLElement[];
    const activeBlock = allBlocks.find(item =>
      item.className.includes(hotkeyActiveClass)
    );
    let nextActiveBloclk;
    if (!activeBlock) {
      nextActiveBloclk =
        allBlocks.find(item => item.className.includes("autofocus")) ||
        allBlocks[0];
    } else if (e && e.altKey && blockKeys.includes(e.keyCode)) {
      nextActiveBloclk = this.regionInstance.getNextActive(e);
    } else if (activeBlock !== this.regionInstance.lastActiveBlock) {
      /**
       * 切换region后，block与之前不一致， 没有默认焦点的不阻止事件传递，有默认焦点阻止事件传递并且选中默认焦点
       * 默认焦点在
       *  */
      if (getDefaultFocusNode(activeBlock)) {
        nextActiveBloclk = activeBlock;
      } else {
        activeBlock.click();
      }
    }
    if (nextActiveBloclk) {
      nextActiveBloclk.click();
      e && e.stopPropagation();
    }
  }
  bindHotkeys(element: HTMLElement) {
    if (element.className.includes("ignore-top-hotkeys")) {
      element.classList.add("use-out-funtions-keys");
    }
    this.regionInstance.setTopRegion(element);
    window.addEventListener("keydown", this.bindCheckRegionAndBlock, true);
    if (bindFunctions === 0) {
      this.bindFuntsHotkeys();
    }
    bindFunctions += 1;
    this.bindFormHotkeys();
    // 初始化焦点处理
    setTimeout(() => {
      this.bindCheckRegionAndBlock();
    }, 100);
  }
  //在弹框中调用unbindHotkeys关闭弹框需要手动调用bindHotkeys
  unbindHotkeys(element: HTMLElement) {
    element.removeEventListener("click", this.bindClickBlockListener);
    bindFunctions -= 1;
    if (bindFunctions === 0) {
      hotkeys.unbind(allFunctsKeys, "all");
    }
    window.removeEventListener("keydown", this.bindCheckRegionAndBlock, true);
    hotkeys.deleteScope(this.topScope);
    this.regionInstance.removeOtherBlockActive(element);
    this.regionInstance.clearStore();
  }
  private bindFormHotkeys() {
    hotkeys(
      "up,down,enter",
      {
        scope: this.topScope
      },
      (e, hotkeysEvent) => {
        if (this.regionInstance.isIgnoreTopHotkeys()) {
          return;
        }
        e.preventDefault();
        handleFormKeys(e, hotkeysEvent, this.regionInstance.getActiveBlock());
      }
    );
  }
  private bindFuntsHotkeys() {
    // 功能快捷键
    hotkeys(allFunctsKeys, (event, hotkeysEvent) => {
      const region = this.regionInstance.getCurRegion();
      if (
        this.regionInstance.isIgnoreTopHotkeys() &&
        !region?.className.includes("use-out-funtions-keys")
      ) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      this.handleFunctionKeys(hotkeysEvent);
    });
  }
  private handleFunctionKeys(hotkeysEvent: HotkeysEvent) {
    const region = this.regionInstance.getCurRegion();
    const buttons = [];
    // 将sidebar按钮和模块放入底层，sidebar内部按钮快捷优先（关闭时销毁内部区域）
    if (region === this.regionInstance.getTopRegion()) {
      const sidebarContent = document.querySelector(
        ".ht-sidebar-content"
      ) as HTMLElement;
      buttons.push(
        ...getVisibleElements(
          "button:not([disabled]).el-button",
          sidebarContent
        )
      );
    }
    buttons.push(
      ...getVisibleElements("button:not([disabled]).el-button", region),
      ...getVisibleElements(
        "label.el-checkbox:not(.is-disabled) .el-checkbox__label",
        region
      )
    );

    const key = hotkeysEvent.key === "Insert" ? "Ins" : hotkeysEvent.key;
    const curBtn = buttons.find(item =>
      item.innerText.match(
        new RegExp("[(（]" + key.replace("+", "\\+") + "[)）]", "i")
      )
    );
    curBtn?.click();
  }
}
