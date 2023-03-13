import "vue-tsx-support/enable-check";
export * from "element-ui/types";

import * as ElementUI from "element-ui/types";
export default ElementUI;

export interface PromiseDialogParams<T> {
  title?: string;
  topClass?: string;
  disabledHotkeys?: boolean;
  width?: string | number;
  sureText?: string;
  model: T;
  afterVisible?: Function;
  beforeConfirm?: (data?: T) => boolean | Promise<boolean>;
  contentRender: (data: T) => JSX.Element | string;
}

export interface SidebarBox {
  addSidebar: (options: {
    shortcutsKey: string;
    contentRender: () => JSX.Element | string;
    title: string;
    btnClass?: string;
    width?: string;
    height?: string;
  }) => void;
  removeSidebar: (shortcutsKey: string) => void;
  showSidebar: (shortcutsKey: string) => void;
  rebindShortcutsKey: (shortcutsKey: string) => void;
  hideSidebar: () => void;
}

declare module "vue/types/vue" {
  interface Vue {
    $sidebarBox: SidebarBox;
    $promiseDialog<T>(params: PromiseDialogParams<T>): Promise<T>;
    closePage: () => void;
  }
}