import type { PropType } from 'vue';
import type { ActionButtonOptions } from '../typings/modal';
export const modalProps = {
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  loading: Boolean,
  loadingTip: String,
  height: Number,
  minHeight: Number,
  useWrapper: {
    type: Boolean,
    default: true
  },
  beforeClose: {
    type: Function as PropType<() => Promise<boolean> | boolean>
  },
  submitLoading: {
    type: Boolean,
    default: false
  },
  footer: {
    type: Boolean,
    default: true
  }
};
export const basicModalProps = {
  ...modalProps,
  showCancelButton: {
    type: Boolean,
    default: true
  },
  cancelButtonOptions: {
    type: Object as PropType<ActionButtonOptions>,
    default: () => ({})
  },
  showOkButton: {
    type: Boolean,
    default: true
  },
  okButtonOptions: {
    type: Object as PropType<ActionButtonOptions>,
    default: () => ({})
  }
};
