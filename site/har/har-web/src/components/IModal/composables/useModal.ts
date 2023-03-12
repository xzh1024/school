import { ModalActionType } from './../typings/modal';
import { ref, unref, nextTick } from 'vue';
import { useToggle } from '@har/use';
import type { BasicModalProps } from '@/components/IModal';

export function useModal<T = BasicModalProps>(props?: T) {
  type ActionType = ModalActionType<T>;
  const modalRef = ref<ActionType>();
  const [loaded, toggle] = useToggle();
  async function getModal(): Promise<ActionType> {
    const modal = unref(modalRef);
    if (!modal) {
      throw new Error('未找到当前弹窗实例！');
    }
    await nextTick();
    return modal;
  }
  function register(modalInstance: ActionType) {
    if (loaded.value) return;
    toggle(true);
    modalRef.value = modalInstance;
  }
  const methods = {
    scrollTop(top = 0) {
      getModal().then((modal) => {
        modal.scrollTop(top);
      });
    }
  };
  return [register, methods];
}
