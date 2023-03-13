"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setFocus;

function setFocus(focusElement) {
  if (!focusElement) {
    return;
  }

  var targetDom;

  if (["BUTTON"].includes(focusElement.tagName)) {
    // 使用当前层原生事件
    targetDom = focusElement;
  } else if (focusElement.__vue__ && focusElement.__vue__.focus) {
    // 使用dom绑定事件
    targetDom = focusElement.__vue__;
  } else {
    // 使用底层原生事件
    targetDom = focusElement.querySelector("input") || focusElement.querySelector("textarea");
  }

  if (targetDom) {
    targetDom.focus();
  }
}