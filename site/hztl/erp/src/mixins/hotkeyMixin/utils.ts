import { KEY_MAP } from "@/constants";

import { hotkeyBlockSelectors } from "./constants";

// 判断一个元素是否可见
function isVisible(elem: HTMLElement) {
  // https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js
  return !!(
    elem.offsetWidth ||
    elem.offsetHeight ||
    elem.getClientRects().length
  );
}
// 获取所有可见的元素
export function getVisibleElements(selector: string, container?: HTMLElement) {
  if (!container) container = document.body;
  const nodes = [
    ...(container.querySelectorAll(selector) as NodeListOf<HTMLElement>)
  ];
  return nodes.filter(item => isVisible(item));
}

function submitForm(form: HTMLElement) {
  const container = (form.closest(".ht-dialog") || form) as HTMLElement;
  const buttons = getVisibleElements(
    "button:not([disabled]).el-button",
    container
  );
  const curButton = buttons.find(
    button =>
      /^\s*确\s*定/.test(button.innerText) ||
      /^\s*查\s*询/.test(button.innerText)
  );
  if (curButton) {
    curButton.click();
  } else {
    console.error("hotkeyMixin: 没有找到表单的提交按钮。");
  }
}

export function getCanFocusInputs(element: HTMLElement) {
  let inputs = getVisibleElements(
    "input:not([disabled]), textarea:not([disabled])",
    element
  ) as HTMLElement[];
  // 排除选择框、日期选择框、switch
  inputs = inputs.filter(
    item =>
      !item.closest(
        ".el-select, .el-date-editor, .el-switch, .el-radio, .el-cascader"
      )
  );
  return inputs as HTMLInputElement[];
}

function shouldSubmitForm(form: HTMLElement) {
  if (form.hasAttribute("submit-on-enter")) {
    const inputs = getCanFocusInputs(form);
    return inputs.some(
      input =>
        !input.hasAttribute("submit-on-enter-ignore") &&
        input.value.trim() !== ""
    );
  }
  return false;
}

export function getNextAcive(
  elements: HTMLElement[],
  active: HTMLElement | string,
  keyCode: number
) {
  const curIndex = [...elements].findIndex(ele =>
    typeof active === "string" ? ele.className.includes(active) : ele === active
  );
  let nextIndex = curIndex;
  if ([KEY_MAP.up, KEY_MAP.left].includes(keyCode)) {
    nextIndex--;
  } else {
    nextIndex++;
  }
  if (nextIndex < 0) {
    nextIndex = elements.length - 1;
  } else if (nextIndex >= elements.length) {
    nextIndex = 0;
  }
  return nextIndex === curIndex ? null : elements[nextIndex];
}

export function getDefaultFocusNode(activeBlock: HTMLElement) {
  let defaultNode;
  if (activeBlock.className.includes("el-form")) {
    const inputs = getCanFocusInputs(activeBlock) as HTMLInputElement[];
    const inputNode = inputs.find(item => item.autofocus) || inputs[0];
    if (
      inputNode &&
      !inputs.includes(document.activeElement as HTMLInputElement)
    ) {
      defaultNode = inputNode;
    }
  } else if (activeBlock.className.includes("ht-tree")) {
    const allTreeNode = getVisibleElements(
      ".el-tree-node.is-focusable",
      activeBlock
    );
    const treeNode =
      allTreeNode.find((item: HTMLElement) =>
        item.className.includes("is-current")
      ) || allTreeNode[0];
    if (
      treeNode &&
      !allTreeNode.includes(document.activeElement as HTMLElement)
    ) {
      defaultNode = treeNode;
    }
  }
  return defaultNode;
}

export function handleFormKeys(
  event: KeyboardEvent,
  hotkeysEvent: HotkeysEvent,
  activeBlock?: HTMLElement
) {
  const target = document.activeElement as HTMLElement;

  if (!activeBlock || !activeBlock.className.includes("el-form")) return;

  if (hotkeysEvent.key === "enter" && target.closest(".el-select")) return;

  if (hotkeysEvent.key === "enter" && shouldSubmitForm(activeBlock)) {
    submitForm(activeBlock);
    return;
  }

  const inputs = getCanFocusInputs(activeBlock);
  if (inputs.length === 0) return;

  const nextInput = getNextAcive(inputs, target, event.keyCode);
  nextInput && nextInput.focus();
}

(function() {
  // 创建活跃区域样式
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerText = `
        ${hotkeyBlockSelectors
          .filter(item => !item.includes("el-form"))
          .join(", ")} {
            border-top: 1px solid transparent;
    }
    ${hotkeyBlockSelectors
      .filter(item => !item.includes("el-form"))
      .map(item => `${item}.is-hotkey-active`)
      .join(", ")} { 
        border-top-color: #409EFF;
    }`;
  document.head.appendChild(style);
})();
