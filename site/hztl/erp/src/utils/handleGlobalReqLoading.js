import hotkeys from "hotkeys-js";
import { KEY_MAP } from "@/constants";

// 重置hotkeysFilter
// eslint-disable-next-line @typescript-eslint/no-use-before-define
hotkeys.filter = hotkeysFilter;

export function createGlobalReqLoading(config) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  if (isReadonlyRequest(config)) return;

  if (!document.querySelector(".gloabal-loading")) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    document.getElementById("app").appendChild(getGloabalLoadingNode());

    hotkeys.filter = function(e) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      preventHotKeys(e);
      return false;
    };
  }
}

export function deleteGlobalReqLoading(config) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  if (isReadonlyRequest(config)) return;

  const gloabalLoading = document.querySelector(".gloabal-loading");
  if (gloabalLoading) {
    gloabalLoading.remove();

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    hotkeys.filter = hotkeysFilter;
  }
}

function isReadonlyRequest(config) {
  // 排除所有的只读请求
  return config && (config.readonly || config.method === "get");
}

function getGloabalLoadingNode() {
  const node = document.createElement("div");
  node.innerHTML = `
        <div class="gloabal-loading">
            <div class="gloabal-progress"></div>
        </div>
    `;
  return node.firstElementChild;
}

function hotkeysFilter(event) {
  const target = event.target || event.srcElement;

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  preventHotKeys(event);

  // 这些按键 始终触发快捷键事件
  if (
    event.ctrlKey ||
    event.altKey ||
    event.keyCode === KEY_MAP.tab || // Tab键
    event.keyCode === KEY_MAP.esc || // Esc键
    event.keyCode === KEY_MAP.insert || // Insert键
    event.key === "Insert" || // 小键盘Ins/Insert键
    (event.keyCode >= KEY_MAP.f1 && event.keyCode <= KEY_MAP.f12) || // F1-F12
    event.keyCode === KEY_MAP.left || // 方向键
    event.keyCode === KEY_MAP.right ||
    event.keyCode === KEY_MAP.up ||
    event.keyCode === KEY_MAP.down ||
    event.keyCode === KEY_MAP.enter // 回车键
  ) {
    return true;
  }

  // 可以输入文本的input、textarea，不触发快捷键事件
  if (
    (target.isContentEditable ||
      target.tagName === "TEXTAREA" ||
      (target.tagName === "INPUT" &&
        !["radio", "button", "checkbox", "image", "range"].includes(
          target.type
        ))) &&
    !target.readOnly
  ) {
    return false;
  }
  return true;
}

function preventHotKeys(event) {
  /**
   * 屏蔽默认事件
   * 1、alt+d 导出，alt+i 导入，alt+o 过滤零库存，alt+方向
   * 2、f1-f11
   *
   * */
  if (
    (event.altKey &&
      [
        KEY_MAP.o,
        KEY_MAP.i,
        KEY_MAP.d,
        KEY_MAP.left,
        KEY_MAP.up,
        KEY_MAP.right,
        KEY_MAP.down
      ].includes(event.keyCode)) ||
    (event.keyCode >= KEY_MAP.f1 && event.keyCode <= KEY_MAP.f11)
  ) {
    event.preventDefault();
  }
}
