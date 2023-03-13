declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "vue-awesome-swiper";
declare module "vue-fragment";
declare module "vue-html2canvas";
declare module "*.png";
declare module "awe-dnd";
declare module "@/*";

// 重置hotkeys-js

interface HotkeysEvent {
  key: string;
  method: KeyHandler;
  mods: number[];
  scope: string | symbol;
  shortcut: string;
}

interface KeyHandler {
  (keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent): void;
}

interface FilterEvent {
  target?: {
    tagName?: string;
  };
  srcElement?: {
    tagName?: string;
  };
}

type Options = {
  scope?: string | symbol;
  element?: HTMLElement | null;
  keyup?: boolean | null;
};

interface Hotkeys {
  (key: string, method: KeyHandler): void;
  (key: string, scope: string | symbol, method: KeyHandler): void;
  (key: string, options: Options, method: KeyHandler): void;

  shift: boolean;
  ctrl: boolean;
  alt: boolean;
  option: boolean;
  control: boolean;
  cmd: boolean;
  command: boolean;

  setScope(scopeName: string | symbol): void;
  getScope(): string | symbol;
  deleteScope(scopeName: string | symbol): void;

  noConflict(): void;

  unbind(key: string): void;
  unbind(key: string, scopeName: string | symbol): void;
  unbind(key: string, scopeName: string | symbol, method: KeyHandler): void;
  unbind(key: string, method: KeyHandler): void;

  isPressed(keyCode: number): boolean;
  isPressed(keyCode: string): boolean;
  getPressedKeyCodes(): number[];

  filter(event: FilterEvent): boolean;
}

declare module "hotkeys-js" {
  const hotkeys: Hotkeys;
  export default hotkeys;
  export const HotkeysEvent: HotkeysEvent;
  export const FilterEvent: FilterEvent;
  export const KeyHandler: KeyHandler;
}
