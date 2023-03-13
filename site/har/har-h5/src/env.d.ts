/// <reference types="vite/client" />

declare namespace JSX {
  import { ButtonHTMLAttributes } from "vue";
  // 添加部分uniapp button声明
  interface Button extends ButtonHTMLAttributes {
    type?: "primary" | "default" | "warn";
    onGetphonenumber?: Handler; // 获取用户手机号回调
  }
  interface IntrinsicElements {
    button: Button;
  }
}
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;

  // interface Button extends ButtonHTMLAttributes {
  //   type: "primary" | "default" | "warn";
  // }

  export default component;
}
