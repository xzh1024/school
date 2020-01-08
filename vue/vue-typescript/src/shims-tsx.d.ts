import Vue, { VNode } from "vue";

declare global {
  // 命名空间
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}

    // 固有元素使用特殊的接口JSX.IntrinsicElements来查找。
    // 默认地，如果这个接口没有指定，会全部通过，不对固有元素进行类型检查。
    // 然而，如果这个接口存在，那么固有元素的名字需要在JSX.IntrinsicElements接口的属性里查找。
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
