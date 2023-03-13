/// <reference types="vite/client" />
declare type Constructor = new (...args: any) => any;

// eslint-disable-next-line no-var
declare var CONFIG: Readonly<{
  homeTile: string;
  loginFormLogoShow: boolean;
  loginFormDesc: string;
  loginFormBtnBgColor: string;
  menuItemHoverColor: string;
}>;
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare type Recordable<T = any> = Record<string, T>;
declare type Nullable<T> = T | null;
declare type Fn<T = any, R = T> = {
  (...arg: T[]): R;
};
declare type EmitType = (event: string, ...arg: any[]) => void;
declare type UseActionsConfig = {
  // 成功完成回调
  completeCallback?: () => void;
  // 成功和失败都会执行的回调
  finallyCallback?: () => void;
};
declare type ComponentPropsType<T extends Constructor> =
  InstanceType<T>['$props'];

declare module 'ejs';
declare module 'bpmn-js/lib/Modeler';
declare module '@har/flowable';

declare module '@form-create/utils/*';
declare module 'vuedraggable/src/vuedraggable';
declare module 'vue-qr/src/packages/vue-qr.vue';

declare module '@/components/form-create';
declare module 'webcamjs';
