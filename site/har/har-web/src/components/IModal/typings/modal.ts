import type { ButtonProps } from '@arco-design/web-vue';
import type { Component } from 'vue';

export type ActionButtonOptions = ButtonProps & {
  iconRender?: Component;
  text?: string;
};

export type ModalProps = {
  // 显示影藏（v-model）
  visible?: boolean;
  // 标题
  title?: string;
  loading?: boolean;
  loadingTip?: string;
  // 内容高度
  height?: number;
  // 最小高度
  minHeight?: number;
  // 开启后自适应高度，开启后会跟随屏幕变化自适应内容，并出现滚动条
  useWrapper?: boolean;
  // 弹窗关闭前
  beforeClose?: () => Promise<boolean> | boolean;
  // 提交按钮loading状态
  submitLoading?: boolean;
  // 是否显示底部
  footer?: boolean;
};
export type BasicModalProps = ModalProps & {
  showCancelButton?: boolean;
  cancelButtonOptions?: ActionButtonOptions;
  showOkButton?: boolean;
  okButtonOptions?: ActionButtonOptions;
};
export type ModalActionType<T = BasicModalProps> = {
  scrollTop: (top?: number) => void;
  setProps: (props: Partial<T>) => void;
  changeVisible: (status?: boolean) => void;
};
